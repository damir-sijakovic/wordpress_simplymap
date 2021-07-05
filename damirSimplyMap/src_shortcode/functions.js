dsijak.openAllLeaflets = function()
{
    
    if (!dsijak.mapData.length)
    {
        dsijak.map.errorMessage('No map data!');
    }    
        
    if (dsijak.leaflet && dsijak.leaflet.remove) {
        dsijak.leaflet.off();
        dsijak.leaflet.remove();
    }
    
    const height = dsijak.mapSettings.height;
    const width = dsijak.mapSettings.width;
    const xCoords = dsijak.mapSettings.xCoords;
    const yCoords = dsijak.mapSettings.yCoords;
    const zoom = dsijak.mapSettings.zoom;
    const mapBoxToken = dsijak.mapSettings.mapBoxToken;
    
    var mapElement = document.getElementById('dsijak-simply-map-id');
    mapElement.style.height = height + 'px';
    mapElement.style.width = width + 'px';
    

	dsijak.leaflet = L.map('dsijak-simply-map-id').setView([xCoords, yCoords], zoom);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGVsZXZpY2FsYXJpZWwiLCJhIjoiY2tvemE1MDhpMGJ0YzJ3bnpycG9pMm50eiJ9.gMiP0-2PNMaGxutz71_4Aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(dsijak.leaflet);

    for (var i=0; i<dsijak.mapData.length; i++)
    {
        L.marker([dsijak.mapData[i][2], dsijak.mapData[i][3]]).addTo(dsijak.leaflet).bindPopup( decodeURIComponent(escape(window.atob(dsijak.mapData[i][4]))) ).openPopup();
    }

    
}
