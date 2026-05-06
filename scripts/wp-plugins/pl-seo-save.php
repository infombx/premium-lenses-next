<?php
/**
 * Plugin Name: Premium Lenses SEO Save
 * Description: REST endpoint POST /wp-json/pl/v1/save-seo to write seo_title and seo_description via update_field().
 * Version: 1.0.0
 * Author: Premium Lenses
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'pl/v1', '/save-seo', array(
        'methods'             => 'POST',
        'callback'            => 'pl_seo_save_handler',
        'permission_callback' => function () {
            return current_user_can( 'edit_pages' );
        },
        'args' => array(
            'page_id'         => array( 'required' => true,  'type' => 'integer' ),
            'seo_title'       => array( 'required' => false, 'type' => 'string', 'default' => '' ),
            'seo_description' => array( 'required' => false, 'type' => 'string', 'default' => '' ),
        ),
    ) );
} );

function pl_seo_save_handler( WP_REST_Request $req ) {
    $page_id         = (int) $req->get_param( 'page_id' );
    $seo_title       = sanitize_text_field( $req->get_param( 'seo_title' ) );
    $seo_description = sanitize_textarea_field( $req->get_param( 'seo_description' ) );

    if ( ! get_post( $page_id ) ) {
        return new WP_Error( 'not_found', 'Page not found', array( 'status' => 404 ) );
    }

    if ( function_exists( 'update_field' ) ) {
        update_field( 'seo_title',       $seo_title,       $page_id );
        update_field( 'seo_description', $seo_description, $page_id );
    } else {
        // Fallback: write raw post meta + ACF reference keys
        update_post_meta( $page_id, 'seo_title',        $seo_title );
        update_post_meta( $page_id, '_seo_title',       'field_seo_title' );
        update_post_meta( $page_id, 'seo_description',  $seo_description );
        update_post_meta( $page_id, '_seo_description', 'field_seo_description' );
    }

    return array(
        'ok'              => true,
        'page_id'         => $page_id,
        'seo_title'       => $seo_title,
        'seo_description' => $seo_description,
    );
}
