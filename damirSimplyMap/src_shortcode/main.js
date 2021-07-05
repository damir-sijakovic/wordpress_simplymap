console.log(window.dsijak.rootPluginDirUrl);
console.log(window.dsijak.mapData);

var mainMapElement = document.getElementById('dsijak-simply-map-id');

if (!dsijak.mapData)
{
    mainMapElement.style.width = 'auto'; 
    mainMapElement.style.height = 'auto'; 
    mainMapElement.style.backgroundImage = "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.5) 35px, rgba(255,255,255,.5) 70px)";
    
    mainMapElement.innerHTML = `
        <div class="dsijak-no-data"> <div> dsijak\\simplyMap plugin<br> NO MAP DATA FOUND! </div> </div>
    `;
}
else
{
    mainMapElement.style.backgroundColor = 'slategray';
    mainMapElement.innerHTML = ``;        
    dsijak.openAllLeaflets();
}


