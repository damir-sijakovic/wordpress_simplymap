<?php

/*
* Object Container
* Usage:
* Set:   container('one', new One());
* Get:   $one = container('one');
* Empty: container();
*/

function container($key=null, $obj=null)
{
    static $x;
    
    if (isset($x))
    {
        if ($key === null)
        {
            $x = [];
            return null;  
        }
   
        if ($obj === null)
        {
            if (isset($x[$key]))
            {
                return $x[$key];   
            }
            else
            {
                return null;
            }
        }   
        $x[$key] = $obj;
        return null;  
    }
    else
    {
        if ($obj === null)
        {
            return null;
        }
        else
        {
            $x = [];
            $x[$key] = $obj;
            return $obj;
        }
    }    
}
