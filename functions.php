<?php
/**
 * Enqueue Assets
 */
add_action( 'wp_enqueue_scripts', function() {
  wp_enqueue_script( 'scripts', get_template_directory_uri() . '/assets/main.js', [], filemtime( get_template_directory() . '/assets/main.js' ), true );
  wp_enqueue_style( 'styles', get_template_directory_uri() . '/assets/main.css', [], filemtime( get_template_directory() . '/assets/main.css' ) );
});

/**
 * Theme Settings
 */
add_action( 'after_setup_theme', function() {
  add_theme_support( 'editor-styles' );
	add_editor_style( get_template_directory_uri() . '/assets/editor.css' );
  add_theme_support( 'title-tag' );
  add_theme_support( 'post-thumbnails' );
});

/**
 * Admin Favicon
 */
function favicon() {
  echo '<link rel="icon" href="' . get_template_directory_uri() . '/favicon.ico" />';
}
add_action('admin_head', 'favicon');
add_action('login_head', 'favicon');