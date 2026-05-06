<?php
/**
 * Plugin Name: Premium Lenses SEO Fields
 * Description: Registers ACF SEO field group (seo_title, seo_description, og_image) on all Pages.
 * Version: 1.1.0
 * Author: Premium Lenses
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function premium_lenses_register_seo_fields() {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) {
        return;
    }

    acf_add_local_field_group( array(
        'key'    => 'group_premium_lenses_seo',
        'title'  => 'SEO',
        'fields' => array(
            array(
                'key'          => 'field_seo_title',
                'label'        => 'SEO Title',
                'name'         => 'seo_title',
                'type'         => 'text',
                'instructions' => 'Overrides the browser title tag. Keep under 60 characters. Leave blank to use the default.',
                'required'     => 0,
                'placeholder'  => 'e.g. Premium Contact Lenses in Mauritius',
                'maxlength'    => 70,
            ),
            array(
                'key'          => 'field_seo_description',
                'label'        => 'Meta Description',
                'name'         => 'seo_description',
                'type'         => 'textarea',
                'instructions' => 'Shown in Google search results. Aim for 150-160 characters. Leave blank to use the default.',
                'required'     => 0,
                'placeholder'  => 'e.g. Shop premium colored and prescription contact lenses in Mauritius.',
                'maxlength'    => 200,
                'rows'         => 3,
                'new_lines'    => '',
            ),
            array(
                'key'           => 'field_seo_og_image',
                'label'         => 'Open Graph Image',
                'name'          => 'og_image',
                'type'          => 'image',
                'instructions'  => 'Social share image (Facebook, WhatsApp, etc). Recommended: 1200x630px.',
                'required'      => 0,
                'return_format' => 'url',
                'preview_size'  => 'medium',
                'library'       => 'all',
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
        'menu_order'            => 100,
        'position'              => 'normal',
        'style'                 => 'default',
        'label_placement'       => 'top',
        'instruction_placement' => 'label',
        'active'                => true,
    ) );
}

add_action( 'acf/init', 'premium_lenses_register_seo_fields' );
add_action( 'init', 'premium_lenses_register_seo_fields', 20 );
