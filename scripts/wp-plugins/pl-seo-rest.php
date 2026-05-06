<?php
/**
 * Plugin Name: Premium Lenses SEO REST
 * Description: Exposes seo_title and seo_description post meta via REST API and provides a GET endpoint.
 * Version: 1.0.0
 * Author: Premium Lenses
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Register meta fields so they appear in REST API responses under 'meta'
add_action( 'init', function () {
    foreach ( array( 'seo_title', 'seo_description', 'og_image' ) as $key ) {
        register_post_meta( 'page', $key, array(
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => 'string',
            'auth_callback' => function () { return current_user_can( 'edit_pages' ); },
        ) );
    }
} );

// GET endpoint: /wp-json/pl/v1/seo?page_id=21
add_action( 'rest_api_init', function () {
    register_rest_route( 'pl/v1', '/seo', array(
        'methods'             => 'GET',
        'callback'            => function ( WP_REST_Request $req ) {
            $page_id = (int) $req->get_param( 'page_id' );
            if ( ! get_post( $page_id ) ) {
                return new WP_Error( 'not_found', 'Page not found', array( 'status' => 404 ) );
            }
            return array(
                'page_id'         => $page_id,
                'seo_title'       => (string) get_post_meta( $page_id, 'seo_title', true ),
                'seo_description' => (string) get_post_meta( $page_id, 'seo_description', true ),
                'og_image'        => (string) get_post_meta( $page_id, 'og_image', true ),
            );
        },
        'permission_callback' => '__return_true',
        'args' => array(
            'page_id' => array( 'required' => true, 'type' => 'integer' ),
        ),
    ) );
} );
