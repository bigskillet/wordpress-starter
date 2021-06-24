<?php
/**
 * Enqueue Assets
 */
add_action( 'wp_enqueue_scripts', function() {
  wp_enqueue_script( 'main-scripts', get_template_directory_uri() . '/dist/main.js', [], filemtime( get_template_directory() . '/dist/main.js' ), true );
  wp_enqueue_style( 'main-styles', get_template_directory_uri() . '/dist/main.css', [], filemtime( get_template_directory() . '/dist/main.css' ) );
});

/**
 * Gutenberg Assets
 */
add_action( 'enqueue_block_editor_assets', function() {
  wp_enqueue_script('editor-scripts', get_template_directory_uri() . '/dist/editor.js', [ 'wp-blocks', 'wp-dom' ], filemtime( get_template_directory() . '/dist/editor.js' ), true );
  
  // Full Screen False 
  $script = "window.onload = function() { const isFullscreenMode = wp.data.select( 'core/edit-post' ).isFeatureActive( 'fullscreenMode' ); if ( isFullscreenMode ) { wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fullscreenMode' ); } }";
	wp_add_inline_script( 'wp-blocks', $script );
});

/**
 * Theme Settings
 */
add_action( 'after_setup_theme', function() {
  
  // Editor Styles
  add_theme_support( 'editor-styles' );
  add_editor_style( 'dist/editor.css' );

  /*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
  add_theme_support( 'title-tag' );

  /*
	 * Enable Post Thumbnails
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
  add_theme_support( 'post-thumbnails' );

  // Gutenberg
  remove_theme_support( 'core-block-patterns' );
});

/**
 * Admin Favicon
 */
function favicon() {
  echo '<link rel="icon" href="' . get_template_directory_uri() . '/favicon.ico" />';
}
add_action('admin_head', 'favicon');
add_action('login_head', 'favicon');