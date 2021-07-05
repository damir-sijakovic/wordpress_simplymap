<?php

namespace dsijak;

require_once __DIR__ . "/../System/jsonstorage.php";

function compileAdminPage()
{    
    if (isset($_SESSION['dsijak_csrf']))
    {
        $csrfToken = $_SESSION['dsijak_csrf'];
    }
    else
    {
        $csrfToken = bin2hex(random_bytes(16));
        $_SESSION['dsijak_csrf'] = $csrfToken;        
    }
        
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $requestToken = bin2hex(random_bytes(16));
            $_SESSION['dsijak_requestToken'] = $requestToken;
    }  
    
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
    $string .= file_get_contents(DS_WP_PLUGIN_PREFS_DIR . '/main.css');   
    $string .= '</style>'; 
    $string .= file_get_contents(DS_WP_PLUGIN_PREFS_DIR . '/main.html');   
    $string .= '<script>'; 
    $string .= file_get_contents(DS_WP_PLUGIN_PREFS_DIR . '/header.js'); 
    $string .= 'window.dsijak.csrfToken = "' . $csrfToken . '";';
    $string .= 'window.dsijak.requestToken = "' . $requestToken . '";';
    $string .= 'window.dsijak.pluginDirUrl = "' . plugin_dir_url( __FILE__ ) . '";';   
    $string .= 'window.dsijak.rootPluginDirUrl = "' . plugin_dir_url(dirname(__FILE__)) . '";';   
    
    // if json doesn't exists, its null
    $string .= "window.dsijak.mapData = JSON.parse('" . json_encode($mapData) . "');";   
    $string .= "window.dsijak.mapSettings = JSON.parse('" . json_encode($mapSettings) . "');";   
    $string .= file_get_contents(DS_WP_PLUGIN_PREFS_DIR . '/functions.js'); 
    $string .= file_get_contents(DS_WP_PLUGIN_PREFS_DIR . '/main.js'); 
    $string .= '</script>'; 
    echo $string;       
}


function connectMenu()
{
    //(browser title, menu label, user group, identify menu slug, construct page function
    \add_menu_page( 'Simply Map', 'Simply Map', 'manage_options', 'dsijak-simply-map', 'dsijak\compileAdminPage' );
}
