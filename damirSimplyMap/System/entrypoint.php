<?php

namespace dsijak;

require_once __DIR__ . "/../Etc/init.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    http_response_code(404);
    die();
}

session_start();
header('Content-type:application/json;charset=utf-8');

$headers = getallheaders();

//if tokens exists, user is logged on - do work
if (isset($headers["X-CSRF-TOKEN"]) && isset($headers["X-Request-ID"]))
{
    if ($headers["X-CSRF-TOKEN"] === $_SESSION['dsijak_csrf'] && $headers["X-Request-ID"] === $_SESSION['dsijak_requestToken'])
    {
        if (isset($_POST['ds_form_data']))
        {
           
            $x = json_decode($_POST['ds_form_data']);
            $badData = false;
  
            //check values
            if (!isset($x->data) || 
                !isset($x->settings) || 
                !isset($x->settings->height) ||                
                !isset($x->settings->width) ||                
                !isset($x->settings->zoom) ||                
                !isset($x->settings->xCoords) ||                
                !isset($x->settings->yCoords) ||                
                !isset($x->settings->mapBoxToken) 
            )
            {            
                $badData = true;
            }
                        
            if (empty($x->data))
            {
                $badData = true;
            }   
            
            if (!is_array($x->data))
            {
                $badData = true;
            } 
            
            if ($badData)
            {
                echo json_encode(['fail'=> json_encode("Bad request data!")]);  
                http_response_code(405);
                die();              
            }
            
            for ($i=0; $i<count($x->data); $i++)
            {
                if (!is_int(intval($x->data[$i][0])))
                {
                    $badData = true;
                    break;
                }
                
                if (!is_string($x->data[$i][1]))
                {
                    $badData = true;
                    break;
                }
                
                if (!is_float(floatval($x->data[$i][2])))
                {
                    $badData = true;
                    break;
                }
                
                if (!is_float(floatval($x->data[$i][3])))
                {
                    $badData = true;
                    break;
                }
                
                if (!is_string($x->data[$i][4]))
                {
                    $badData = true;
                    break;
                }
                
            }
            
            if ($badData)
            {
                echo json_encode(['fail'=> json_encode("Bad request data!")]);  
                http_response_code(405);
                die();              
            }
  
            $jstor = new JsonStorage(DS_WP_PLUGIN_ROOT_DIR . '/markers.json');
            $jstor->set('settings', $x->settings);            
            $jstor->set('data', $x->data);            
            $jstor->save();            
            
            echo json_encode(['success'=> json_encode("OK")]);  
            die();
        }
    }
}
else
{    
    echo json_encode(['fail'=> json_encode("Bad token!")]);  
    die();
}


//no match, or session variables
http_response_code(404); 
die(); 

