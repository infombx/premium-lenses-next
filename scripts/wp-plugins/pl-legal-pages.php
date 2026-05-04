<?php
/**
 * Plugin Name: Premium Lenses Legal Pages
 * Description: Registers ACF legal_content field, creates Privacy Policy and Terms pages, exposes a save endpoint.
 * Version: 1.3.0
 * Author: Premium Lenses
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// ---------------------------------------------------------------------------
// 1. Register the ACF "legal_content" field on all pages
// ---------------------------------------------------------------------------

function pl_register_legal_fields() {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) {
        return;
    }

    acf_add_local_field_group( array(
        'key'    => 'group_pl_legal_content',
        'title'  => 'Legal Page Content',
        'fields' => array(
            array(
                'key'          => 'field_pl_legal_content',
                'label'        => 'Content (HTML)',
                'name'         => 'legal_content',
                'type'         => 'textarea',
                'instructions' => 'Managed via the front-end editor. Do not edit manually unless necessary.',
                'required'     => 0,
                'rows'         => 20,
                'new_lines'    => '',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'page',
                ),
            ),
        ),
        'menu_order'            => 50,
        'position'              => 'normal',
        'style'                 => 'default',
        'label_placement'       => 'top',
        'instruction_placement' => 'label',
        'active'                => true,
    ) );
}

add_action( 'acf/init', 'pl_register_legal_fields' );

// ---------------------------------------------------------------------------
// 2. Custom REST endpoint: POST /wp-json/pl/v1/save-legal
//    Uses update_field() directly — works with ACF Free (no REST write needed)
// ---------------------------------------------------------------------------

add_action( 'rest_api_init', function () {
    register_rest_route( 'pl/v1', '/save-legal', array(
        'methods'             => 'POST',
        'callback'            => 'pl_save_legal_handler',
        'permission_callback' => function () {
            return current_user_can( 'edit_pages' );
        },
        'args' => array(
            'page_id' => array(
                'required'          => true,
                'type'              => 'integer',
                'sanitize_callback' => 'absint',
            ),
            'value' => array(
                'required'          => true,
                'type'              => 'string',
                'sanitize_callback' => 'wp_kses_post',
            ),
        ),
    ) );
} );

function pl_save_legal_handler( WP_REST_Request $req ) {
    $page_id = (int) $req->get_param( 'page_id' );
    $value   = $req->get_param( 'value' ); // already sanitized by wp_kses_post

    if ( ! get_post( $page_id ) ) {
        return new WP_Error( 'not_found', 'Page not found', array( 'status' => 404 ) );
    }

    if ( function_exists( 'update_field' ) ) {
        update_field( 'legal_content', $value, $page_id );
    } else {
        // Fallback: write raw post meta with ACF reference key
        update_post_meta( $page_id, 'legal_content',  $value );
        update_post_meta( $page_id, '_legal_content', 'field_pl_legal_content' );
    }

    return array( 'ok' => true, 'page_id' => $page_id );
}

// ---------------------------------------------------------------------------
// 3. Create the legal pages on activation (if they don't already exist)
// ---------------------------------------------------------------------------

function pl_create_legal_pages() {
    $pages = array(
        array( 'slug' => 'privacy-policy', 'title' => 'Privacy Policy' ),
        array( 'slug' => 'terms',          'title' => 'Terms & Conditions' ),
    );

    foreach ( $pages as $page ) {
        $existing = get_page_by_path( $page['slug'], OBJECT, 'page' );
        if ( $existing ) {
            continue;
        }

        wp_insert_post( array(
            'post_title'   => $page['title'],
            'post_name'    => $page['slug'],
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'post_content' => '',
        ) );
    }
}

register_activation_hook( __FILE__, 'pl_create_legal_pages' );
