<?php
/**
 * Plugin Name: Premium Lenses SEO AI
 * Description: Auto-generates seo_title and seo_description using Claude AI whenever a page is saved. Requires an Anthropic API key set in Settings > SEO AI.
 * Version: 1.0.0
 * Author: Premium Lenses
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// ── Settings page ──────────────────────────────────────────────────────────────

add_action( 'admin_menu', function () {
    add_options_page(
        'SEO AI Settings',
        'SEO AI',
        'manage_options',
        'pl-seo-ai',
        'pl_seo_ai_settings_page'
    );
} );

add_action( 'admin_init', function () {
    register_setting( 'pl_seo_ai', 'pl_seo_ai_api_key', array( 'sanitize_callback' => 'sanitize_text_field' ) );
    register_setting( 'pl_seo_ai', 'pl_seo_ai_model',   array( 'sanitize_callback' => 'sanitize_text_field', 'default' => 'claude-haiku-4-5-20251001' ) );
} );

function pl_seo_ai_settings_page() {
    ?>
    <div class="wrap">
        <h1>SEO AI Settings</h1>
        <p>Provide your Anthropic API key. SEO title and description will be auto-generated every time you save a page.</p>
        <form method="post" action="options.php">
            <?php settings_fields( 'pl_seo_ai' ); ?>
            <table class="form-table">
                <tr>
                    <th>Anthropic API Key</th>
                    <td>
                        <input type="password" name="pl_seo_ai_api_key"
                               value="<?php echo esc_attr( get_option( 'pl_seo_ai_api_key' ) ); ?>"
                               class="regular-text" placeholder="sk-ant-..." />
                        <p class="description">Get your key from <a href="https://console.anthropic.com/" target="_blank">console.anthropic.com</a></p>
                    </td>
                </tr>
                <tr>
                    <th>Model</th>
                    <td>
                        <select name="pl_seo_ai_model">
                            <?php
                            $current = get_option( 'pl_seo_ai_model', 'claude-haiku-4-5-20251001' );
                            $models  = array(
                                'claude-haiku-4-5-20251001' => 'Claude Haiku (fast, cheap)',
                                'claude-sonnet-4-6'         => 'Claude Sonnet (better quality)',
                            );
                            foreach ( $models as $val => $label ) {
                                printf(
                                    '<option value="%s"%s>%s</option>',
                                    esc_attr( $val ),
                                    selected( $current, $val, false ),
                                    esc_html( $label )
                                );
                            }
                            ?>
                        </select>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>

        <hr>
        <h2>Regenerate SEO for All Pages</h2>
        <p>Click to regenerate SEO fields for all CMS pages at once. Existing values will be overwritten.</p>
        <form method="post">
            <?php wp_nonce_field( 'pl_seo_ai_bulk' ); ?>
            <input type="hidden" name="pl_seo_ai_action" value="bulk_generate" />
            <?php submit_button( 'Generate SEO for All Pages', 'secondary' ); ?>
        </form>
        <?php
        if ( isset( $_POST['pl_seo_ai_action'] ) && $_POST['pl_seo_ai_action'] === 'bulk_generate' ) {
            check_admin_referer( 'pl_seo_ai_bulk' );
            pl_seo_ai_bulk_generate();
        }
        ?>
    </div>
    <?php
}

// ── Auto-generate on page save ─────────────────────────────────────────────────

add_action( 'save_post_page', function ( $post_id, $post ) {
    // Skip auto-saves, revisions, trashed posts
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( $post->post_status === 'trash' ) return;
    if ( wp_is_post_revision( $post_id ) ) return;

    // Schedule async generation so it doesn't block the save response
    wp_schedule_single_event( time() + 2, 'pl_seo_ai_generate_event', array( $post_id ) );
    spawn_cron();
}, 20, 2 );

add_action( 'pl_seo_ai_generate_event', 'pl_seo_ai_generate_for_page' );

// ── Core generation function ───────────────────────────────────────────────────

function pl_seo_ai_generate_for_page( $post_id ) {
    $api_key = get_option( 'pl_seo_ai_api_key' );
    if ( empty( $api_key ) ) return;
    if ( ! function_exists( 'update_field' ) ) return;

    $post    = get_post( $post_id );
    $title   = $post->post_title;
    $content = wp_strip_all_tags( $post->post_content );

    // Pull key ACF text fields for richer context
    $acf_context = '';
    if ( function_exists( 'get_fields' ) ) {
        $fields = get_fields( $post_id );
        if ( is_array( $fields ) ) {
            foreach ( $fields as $key => $value ) {
                if ( in_array( $key, array( 'seo_title', 'seo_description', 'og_image' ), true ) ) continue;
                if ( is_string( $value ) && strlen( $value ) > 0 ) {
                    $acf_context .= $key . ': ' . mb_substr( $value, 0, 200 ) . "\n";
                }
            }
        }
    }

    $summary = "Page title: {$title}\n\nACF fields:\n{$acf_context}\nPage content:\n" . mb_substr( $content, 0, 1500 );

    $model  = get_option( 'pl_seo_ai_model', 'claude-haiku-4-5-20251001' );
    $result = pl_seo_ai_call_claude( $api_key, $model, $title, $summary );

    if ( is_wp_error( $result ) ) {
        error_log( 'pl-seo-ai: ' . $result->get_error_message() );
        return;
    }

    update_field( 'seo_title',       $result['seo_title'],       $post_id );
    update_field( 'seo_description', $result['seo_description'], $post_id );
}

function pl_seo_ai_call_claude( $api_key, $model, $label, $summary ) {
    $site_context = 'You are an SEO expert for premiumlenses.mu — a premium contact lens retailer in Mauritius selling colored, prescription, daily, and toric lenses. Founded 2014.';

    $prompt = $site_context . "\n\nGenerate SEO metadata for the \"{$label}\" page:\n\n{$summary}\n\nRules:\n- seo_title: max 60 chars, include brand \"Premium Lenses\" with \" | \", e.g. \"Contact Lens Guide | Premium Lenses\"\n- seo_description: 150-160 chars, compelling, with keywords and a benefit or call to action\n\nRespond ONLY with valid JSON:\n{\"seo_title\": \"...\", \"seo_description\": \"...\"}";

    $response = wp_remote_post( 'https://api.anthropic.com/v1/messages', array(
        'timeout' => 30,
        'headers' => array(
            'x-api-key'         => $api_key,
            'anthropic-version' => '2023-06-01',
            'content-type'      => 'application/json',
        ),
        'body' => wp_json_encode( array(
            'model'      => $model,
            'max_tokens' => 256,
            'messages'   => array(
                array( 'role' => 'user', 'content' => $prompt ),
            ),
        ) ),
    ) );

    if ( is_wp_error( $response ) ) {
        return $response;
    }

    $body = json_decode( wp_remote_retrieve_body( $response ), true );

    if ( empty( $body['content'][0]['text'] ) ) {
        return new WP_Error( 'pl_seo_ai', 'Empty response from Claude: ' . wp_json_encode( $body ) );
    }

    $text = trim( $body['content'][0]['text'] );
    // Strip markdown code fences if present
    $text = preg_replace( '/^```(?:json)?\s*/i', '', $text );
    $text = preg_replace( '/\s*```$/', '', $text );

    $data = json_decode( $text, true );

    if ( empty( $data['seo_title'] ) || empty( $data['seo_description'] ) ) {
        return new WP_Error( 'pl_seo_ai', 'Invalid JSON from Claude: ' . $text );
    }

    return $data;
}

// ── Bulk generation ────────────────────────────────────────────────────────────

function pl_seo_ai_bulk_generate() {
    $api_key = get_option( 'pl_seo_ai_api_key' );
    if ( empty( $api_key ) ) {
        echo '<div class="notice notice-error"><p>Please save your Anthropic API key first.</p></div>';
        return;
    }

    $page_ids = array( 21, 30, 32, 34, 36 ); // homepage, about, contact, guide, shop
    $model    = get_option( 'pl_seo_ai_model', 'claude-haiku-4-5-20251001' );
    $errors   = array();
    $success  = array();

    foreach ( $page_ids as $post_id ) {
        $post = get_post( $post_id );
        if ( ! $post ) {
            $errors[] = "Page ID {$post_id} not found.";
            continue;
        }

        $title   = $post->post_title;
        $content = wp_strip_all_tags( $post->post_content );

        $acf_context = '';
        if ( function_exists( 'get_fields' ) ) {
            $fields = get_fields( $post_id );
            if ( is_array( $fields ) ) {
                foreach ( $fields as $key => $value ) {
                    if ( in_array( $key, array( 'seo_title', 'seo_description', 'og_image' ), true ) ) continue;
                    if ( is_string( $value ) && strlen( $value ) > 0 ) {
                        $acf_context .= $key . ': ' . mb_substr( $value, 0, 200 ) . "\n";
                    }
                }
            }
        }

        $summary = "Page title: {$title}\n\nACF fields:\n{$acf_context}\nPage content:\n" . mb_substr( $content, 0, 1500 );
        $result  = pl_seo_ai_call_claude( $api_key, $model, $title, $summary );

        if ( is_wp_error( $result ) ) {
            $errors[] = "{$title}: " . $result->get_error_message();
            continue;
        }

        update_field( 'seo_title',       $result['seo_title'],       $post_id );
        update_field( 'seo_description', $result['seo_description'], $post_id );

        $success[] = array(
            'page'  => $title,
            'title' => $result['seo_title'],
            'desc'  => $result['seo_description'],
        );

        usleep( 300000 ); // 300ms pause between API calls
    }

    if ( ! empty( $success ) ) {
        echo '<div class="notice notice-success"><p><strong>Generated SEO for ' . count( $success ) . ' pages:</strong></p><ul>';
        foreach ( $success as $s ) {
            echo '<li><strong>' . esc_html( $s['page'] ) . '</strong><br>';
            echo 'Title: ' . esc_html( $s['title'] ) . '<br>';
            echo 'Desc: ' . esc_html( $s['desc'] ) . '</li>';
        }
        echo '</ul></div>';
    }

    if ( ! empty( $errors ) ) {
        echo '<div class="notice notice-error"><p><strong>Errors:</strong></p><ul>';
        foreach ( $errors as $e ) {
            echo '<li>' . esc_html( $e ) . '</li>';
        }
        echo '</ul></div>';
    }
}
