<?php

/**
 * Asset Manifest
 */
function get_asset_path( $filename ) {
  static $manifest = null;
  if ( null === $manifest ) {
    $path = get_stylesheet_directory() . '/dist/manifest.json';
    $manifest = file_exists( $path ) ? json_decode( file_get_contents( $path ), true ) : [];
  }
  if ( array_key_exists( $filename, $manifest ) ) {
    return '/dist' . $manifest[ $filename ];
  }
  return $filename;
}

/**
 * Enqueue Assets
 */
add_action( 'wp_enqueue_scripts', function() {
  wp_enqueue_script( 'scripts', get_template_directory_uri() . get_asset_path( '/main.js' ), [], null );
  wp_enqueue_style( 'styles', get_template_directory_uri() . get_asset_path( '/main.css' ), [], null );
});

/**
 * Script Attributes
 */
add_filter( 'script_loader_tag', function( $tag, $handle, $src ) {
  $defer = array( 'scripts' );
  if ( in_array($handle, $defer ) ) {
    return str_replace( 'src', 'defer src', $tag );
  }
  return $tag;
}, 10, 3 );

/**
 * Admin Favicon
 */
function favicon() {
  echo '<link rel="icon" href="' . get_template_directory_uri() . '/favicon.ico" />';
}
add_action('admin_head', 'favicon');
add_action('login_head', 'favicon');

/**
 * Theme Settings
 */
add_action( 'after_setup_theme', function() {
  add_theme_support( 'title-tag' );
  add_theme_support( 'post-thumbnails' );
});
