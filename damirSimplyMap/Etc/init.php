<?php

namespace dsijak;

require_once __DIR__ . "/consts.php";
require_once __DIR__ . "/config.php";

require_once DS_WP_PLUGIN_SYSTEM_DIR . '/jsonstorage.php';
require_once DS_WP_PLUGIN_SYSTEM_DIR . '/container.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    //error_log('POST');
}
else
{   

    require_once DS_WP_PLUGIN_SYSTEM_DIR . '/adminPage.php';
    require_once DS_WP_PLUGIN_SYSTEM_DIR . '/actions.php';
    require_once DS_WP_PLUGIN_SYSTEM_DIR . '/shortcode.php';


    function ds_onLogin() {
        $_SESSION['dsijak_csrf'] = bin2hex(random_bytes(32));
    }
    add_action('wp_login', 'ds_onLogin');


    function ds_onLogout() {
        unset($_SESSION['dsijak_csrf']);
    }
    add_action('wp_logout', 'ds_onLogout');




    container('jsonstorage', new JsonStorage(DS_WP_PLUGIN_ROOT_DIR . '/conf.json'));
    

}


