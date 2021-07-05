<?php

namespace dsijak;

\add_action('admin_menu', 'dsijak\connectMenu');

function registerMySession()
{
    if(!session_id())  
    {
        session_start();
    }
}
\add_action('init', 'dsijak\registerMySession');

function doOnLogout()
{
    if (isset($_SESSION['dsijak_csrf']))
    {
        unset($_SESSION['dsijak_csrf']);
    }
    
    if (isset($_SESSION['dsijak_requestToken']))
    {
        unset($_SESSION['dsijak_requestToken']);
    }
}
\add_action('wp_logout','dsijak\doOnLogout');
