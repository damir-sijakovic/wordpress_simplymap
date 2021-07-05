<?php

namespace dsijak;

function compileShortcodeComponent($atts) 
{ 
    
    if (file_exists(DS_WP_PLUGIN_ROOT_DIR . '/markers.json'))
    {
        $jstor = new JsonStorage(DS_WP_PLUGIN_ROOT_DIR . '/markers.json');
        $mapSettings = $jstor->get('settings');            
        $mapData = $jstor->get('data'); 
        
        error_log(print_r(json_encode($mapSettings), true));
    }
    else
    {
        $mapSettings = null;            
        $mapData = null; 
    }    
    
    $string = '';    
    $string .= '<style>'; 
    $string .= file_get_contents(DS_WP_PLUGIN_SHORTCODE_DIR . '/main.css');   
    $string .= '</style>'; 
    $string .= file_get_contents(DS_WP_PLUGIN_SHORTCODE_DIR . '/main.html');   
    $string .= '<script>'; 
    $string .= file_get_contents(DS_WP_PLUGIN_SHORTCODE_DIR . '/header.js');       
    $string .= file_get_contents(DS_WP_PLUGIN_SHORTCODE_DIR . '/functions.js');       
    $string .= 'window.dsijak.rootPluginDirUrl = "' . plugin_dir_url(dirname(__FILE__)) . '";';  
    $string .= "window.dsijak.mapData = JSON.parse('" . json_encode($mapData) . "');";   
    $string .= "window.dsijak.mapSettings = JSON.parse('" . json_encode($mapSettings) . "');";  
    $string .= file_get_contents(DS_WP_PLUGIN_SHORTCODE_DIR . '/main.js');   
    $string .= '</script>'; 
    
    return $string;  
}

\add_shortcode('dsijak-simply-map', 'dsijak\compileShortcodeComponent');
