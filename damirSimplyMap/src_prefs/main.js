
//if no saved data, use/set defaults

if (window.dsijak.mapSettings && window.dsijak.mapSettings.height)
{
    dsijak.mapEl.mapSettingsHeight.value = window.dsijak.mapSettings.height;
}
else
{
    dsijak.mapEl.mapSettingsHeight.value = 700;
}    
    
if (window.dsijak.mapSettings && window.dsijak.mapSettings.width)
{
    dsijak.mapEl.mapSettingsWidth.value = window.dsijak.mapSettings.width;
}
else
{
    dsijak.mapEl.mapSettingsWidth.value = 700;
}
    
if (window.dsijak.mapSettings && window.dsijak.mapSettings.zoom)
{
    dsijak.mapEl.mapSettingsZoom.value = window.dsijak.mapSettings.zoom;
}
else
{
    dsijak.mapEl.mapSettingsZoom.value = 11;
}
    
if (window.dsijak.mapSettings && window.dsijak.mapSettings.xCoords)
{
    dsijak.mapEl.mapSettingsUserX.value = window.dsijak.mapSettings.xCoords;
}
else
{
    dsijak.mapEl.mapSettingsUserX.value = "";
}    
    
if (window.dsijak.mapSettings && window.dsijak.mapSettings.yCoords)
{
    dsijak.mapEl.mapSettingsUserY.value = window.dsijak.mapSettings.yCoords;
}
else
{
    dsijak.mapEl.mapSettingsUserY.value = "";
}
   
    

if (!dsijak.mapData)
{
    dsijak.mapEl.mapListTable.style.display = 'none';
}
else
{
    dsijak.map.compileMapList();
}


/*
console.log(window.dsijak.mapData);
console.log(window.dsijak.newMapData);
console.log(window.dsijak.mapToken);
*/

if (!window.dsijak.mapSettings)
{
    dsijak.mapEl.mapMainHtml.style.display = 'none';
    dsijak.mapEl.mapMapboxTokenPre.style.display = 'inline-block';
}
else
{
    dsijak.mapEl.mapSettingsToken.value = dsijak.mapSettings.mapBoxToken;
}


window.onbeforeunload = function() {
  return "Data will be lost if you leave the page, are you sure?";
};


