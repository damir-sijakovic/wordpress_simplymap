<?php

namespace dsijak;

class JsonStorage
{  
    private $workFile;
    private $data;
    
    function __construct($workFile)
    {  
        $this->workFile = $workFile;  
        if (!$this->load())
        {
            $this->data = [];
        }  
    }
    
    function save()
    {
        $jsonData = json_encode($this->data);
        return file_put_contents($this->workFile, $jsonData);
    }
    
    function load()
    {
        if (file_exists($this->workFile))
        {
            $this->data = json_decode(file_get_contents($this->workFile), true);            
            return true;
        }
        
        return false;
    }
    
    function set($key, $value)
    {
        $this->data[$key] = $value;
    }
    
    function get($key)
    {
        return $this->data[$key];
    }  
    
    function isEmpty()
    {
        if (empty($this->data))
        {
            return true;
        }        
        return false;
    }  
    
    function getAllData()
    {
        return $this->data;
    }
    
    function getAllDataAsJson()
    {
        return json_encode($this->data);
    }
       
    
};



