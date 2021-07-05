

dsijak.map.hideMainHtmlElement = function()
{   
    dsijak.mapEl.mapMainHtml.style.display = 'none';
}

//leaflet
dsijak.map.openAllLeaflets = function()
{
    

    
    var inputData = dsijak.map.getSettings();
        
    if (!dsijak.mapData.length)
    {
        dsijak.map.errorMessage('No map data!');
    }    
    
    if (dsijak.leaflet && dsijak.leaflet.remove) {
        dsijak.leaflet.off();
        dsijak.leaflet.remove();
    }
        
    dsijak.map.openModal();
    dsijak.mapEl.mapLeafletContainer.style.display = 'inline-block';   
    dsijak.mapEl.modalContent.style.display = 'none';
        
    dsijak.leaflet = L.map('ds-modal-map').setView([inputData.xCoords, inputData.yCoords], inputData.zoom);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + inputData.mapBoxToken, {
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


dsijak.map.openSingleLeaflet = function(item)
{
     
    
    if (dsijak.leaflet && dsijak.leaflet.remove) {
        dsijak.leaflet.off();
        dsijak.leaflet.remove();
    }
    
    dsijak.map.openModal();
    dsijak.mapEl.mapLeafletContainer.style.display = 'inline-block';   
    dsijak.mapEl.modalContent.style.display = 'none';
    
	var mymap = L.map('ds-modal-map').setView([41.20717163512203, 20.110093731131318], 10);


	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGVsZXZpY2FsYXJpZWwiLCJhIjoiY2tvemE1MDhpMGJ0YzJ3bnpycG9pMm50eiJ9.gMiP0-2PNMaGxutz71_4Aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);

    L.marker([item[2], item[3]]).addTo(dsijak.leaflet).bindPopup( decodeURIComponent(escape(window.atob(item[4]))) ).openPopup();

    
    
}


//methods

dsijak.map.addItem = function(id, name, x, y, content)
{
    if (window.dsijak.mapData === null)
    {
        window.dsijak.mapData = [];
    }
    return window.dsijak.mapData.push([id, name, x, y, content]);
}

//
dsijak.map.openModal = function()
{
    dsijak.mapEl.mapLeafletContainer.style.display = 'none';   
    dsijak.mapEl.modalMain.style.display = 'flex';
    dsijak.mapEl.modalMain.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
    });
}

dsijak.map.closeModal = function()
{
    dsijak.mapEl.modalMain.style.display = 'none';
}

dsijak.map.setModalTitle = function(text)
{
    dsijak.mapEl.modalMainTitle.innerHTML = text;
}

dsijak.map.setModalBody = function(body)
{
    dsijak.mapEl.modalMainBody.innerHTML = body;
}

dsijak.map.createAddMapMarkerHtml = function()
{
    return `
        <table id="ds-map-list-add">
        <tbody>
        <tr>
        <td>Name:</td>
        <td><input id="ds-map-list-add-name" name="" type="text" value=""> </td>
        </tr>
        <tr>
        <td>Coords (X):</td>
        <td><input id="ds-map-list-add-coords-x" name="" type="text"> </td>
        </tr>
        <tr>
        <td>Coords (Y):</td>
        <td><input id="ds-map-list-add-coords-y" name="" type="text"> </td>
        </tr>
        <tr>
        <td>Content:</td>
        <td><input id="ds-map-list-add-content" name="" type="text"> </td>
        </tr>
        </tbody>
        </table>
    `;
}

dsijak.map.createAddMapMarkerHtmlWithValues = function(id, name, coordsX, coordsY, content)
{    
    return `
        <table id="ds-map-list-add" mapId="${id}">
        <tbody>
        <tr>
        <td>Name:</td>
        <td><input id="ds-map-list-add-name" name="" type="text" value="${name}"> </td>
        </tr>
        <tr>
        <td>Coords (X):</td>
        <td><input id="ds-map-list-add-coords-x" name="" type="text" value="${coordsX}"> </td>
        </tr>
        <tr>
        <td>Coords (Y):</td>
        <td><input id="ds-map-list-add-coords-y" name="" type="text" value="${coordsY}"> </td>
        </tr>
        <tr>
        <td>Content:</td>
        <td><input id="ds-map-list-add-content" name="" type="text" value="${content}"> </td>
        </tr>
        </tbody>
        </table>
    `;
}


dsijak.map.createMapListItem = function(id, name, coordsX, coordsY)
{   
    dsijak.mapEl.mapListTbody.innerHTML += `
        <tr>
        <td style="width:40%"><b>${name}</b></td>
        <td style="width:40%"> ${coordsX}, ${coordsY} </td>
        <td style="width:20%" id="ds-map-list-tbody-id-${id}" > 
            <div class="button button-primary" onclick="dsijak.map.onClickMapListItem(this)">View</div> 
            <div class="button button-primary" onclick="dsijak.map.onClickMapListItem(this)">Edit</div> 
            <div class="button button-primary" onclick="dsijak.map.onClickMapListItem(this)" style="background:orangered;">Delete</div> 
        </td>
        </tr>
    `;
}





dsijak.map.onClickMapListItem = function(that)
{   
    var action = that.innerHTML;
    var id = that.parentNode.id.replace('ds-map-list-tbody-id-', '');
    id = parseInt(id);
    var itemData = dsijak.map.getMapListItemById(id); 
    
    if (action === 'View')
    {
        
       const target = 'https://www.openstreetmap.org/?mlat=' + itemData[2] + '&mlon=' + itemData[3];
       window.open(target, '_blank');

        console.log('VIEWDATA ', target);
    }
    if (action === 'Edit')
    {
        dsijak.map.modalEditMapMarker(id);
       
    }
    if (action === 'Delete')
    {
        dsijak.map.modalDeleteMapMarker(id);
    }
}



dsijak.map.compileMapList = function()
{   
    var data = window.dsijak.mapData;
    dsijak.mapEl.mapListTbody.innerHTML = '';
    if (data.length)
    {
        for (var i=0; i<data.length; i++)
        {
            dsijak.map.createMapListItem(data[i][0], data[i][1], data[i][2], data[i][3]);

        }
    }
    else
    {
        return false;
    }
}


dsijak.map.deleteMapListItemById = function(id)
{   
    var data = window.dsijak.mapData;
    if (data.length)
    {
        for (var i=0; i<data.length; i++)
        {
            if (id === data[i][0])
            {
                data.splice(i, 1);
                
                if (!data.length)
                {
                    dsijak.mapEl.mapListTable.style.display = 'none';
                }


                
                return true;
            }
        }
    }

    return false;
}


dsijak.map.getMapListItemById = function(id)
{   
    var data = window.dsijak.mapData;
    if (data.length)
    {
        for (var i=0; i<data.length; i++)
        {
            if (id === data[i][0])
            {                
                return data[i];
            }
        }
    }

    return null;
}

dsijak.map.modalAddMapMarkerButtonOnClick = function()
{
    var name = document.getElementById("ds-map-list-add-name").value;
    var coordsX = document.getElementById("ds-map-list-add-coords-x").value;
    var coordsY = document.getElementById("ds-map-list-add-coords-y").value;
    var content = document.getElementById("ds-map-list-add-content").value;
    
    if (name.length < 1 || coordsX < 1 || coordsY < 1 || content < 1)
    {
        dsijak.map.errorMessage('Empty field!');
        return false;
    }
    
    if (name.length > 64)
    {
        dsijak.map.errorMessage('Name string too long!');
        return false;
    }
    
    if (coordsX.length > 64 || coordsY.length > 64)
    {
        dsijak.map.errorMessage('Coordinate input is too long!');
        return false;
    }
    
    if (content.length > 512)
    {
        dsijak.map.errorMessage('Content input is too long!');
        return false;
    }
        
    var coordsOk = false;
    if (
        (!isNaN(coordsY) && coordsY.toString().indexOf('.') != -1) &&
        (!isNaN(coordsX) && coordsX.toString().indexOf('.') != -1)
    )
    {
        coordsOk = true;
    }
    
    if (!coordsOk)
    {
        dsijak.map.errorMessage('Bad coordinates format!');
        return false;
    }    
        
   
    
    var id = Date.now();
    content = btoa(unescape(encodeURIComponent(content)));
    dsijak.map.addItem(id, name, coordsX, coordsY, content);
    
    console.log(dsijak.mapData);
    
    dsijak.map.compileMapList();
    dsijak.map.closeModal();
    
    document.getElementById("ds-button-add-map-marker").scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
    });
    dsijak.mapEl.modalMainButton.style.display = 'none';   
    
}

dsijak.map.modalAddMapMarker = function()
{
    dsijak.mapEl.mapListTable.style.display = 'inline-block';
    dsijak.mapEl.modalContent.style.display = 'inline-block';
    dsijak.mapEl.modalMainTitle.innerHTML = 'Add Map Marker';
    dsijak.mapEl.modalMainBody.innerHTML = dsijak.map.createAddMapMarkerHtml();
    dsijak.mapEl.modalMainButton.innerHTML = 'Save';
    dsijak.mapEl.modalMainButton.style.display = 'inline-block';  

    dsijak.mapEl.modalMainButton.addEventListener("click", dsijak.map.modalAddMapMarkerButtonOnClick);
    
    dsijak.map.openModal();
}

dsijak.map.modalDeleteMapMarker = function(id)
{
    var itemData = dsijak.map.getMapListItemById(id); 
    dsijak.mapEl.modalContent.style.display = 'inline-block';
    dsijak.mapEl.modalMainTitle.innerHTML = 'Delete Map Marker';
    dsijak.mapEl.modalMainBody.style.minWidth = '300px';
    dsijak.mapEl.modalMainBody.innerHTML = 'Do you want to delete Map Marker: <b>"' + itemData[1] + '"</b>?';
    dsijak.mapEl.modalMainButton.style.display = 'inline-block';
    dsijak.mapEl.modalMainButton.innerHTML = 'Delete';
    dsijak.mapEl.modalMainButton.addEventListener("click", function(){
        dsijak.map.deleteMapListItemById(id);  
        dsijak.map.compileMapList();
        dsijak.map.closeModal();
    });
    dsijak.map.openModal();
}



dsijak.map.modalEditMapMarker = function(id)
{
    var itemData = dsijak.map.getMapListItemById(id); 
    
    dsijak.mapEl.modalMainTitle.innerHTML = 'Edit Map Marker';
    dsijak.mapEl.modalMainBody.innerHTML = dsijak.map.createAddMapMarkerHtmlWithValues(itemData[0],itemData[1],itemData[2],itemData[3], decodeURIComponent(escape(window.atob(itemData[4]))) );
    dsijak.mapEl.modalMainButton.style.display = 'inline-block';
    dsijak.mapEl.modalContent.style.display = 'inline-block';
    dsijak.mapEl.modalMainButton.innerHTML = 'Save';
    
    dsijak.mapEl.modalMainButton.addEventListener("click", dsijak.map.modalEditMapMarkerButtonOnClick);
    

    dsijak.map.openModal();
}

dsijak.map.modalEditMapMarkerButtonOnClick = function()
{  
    var id = document.getElementById("ds-map-list-add").getAttribute("mapId");
    var name = document.getElementById("ds-map-list-add-name").value;
    var coordsX = document.getElementById("ds-map-list-add-coords-x").value;
    var coordsY = document.getElementById("ds-map-list-add-coords-y").value;
    var content = document.getElementById("ds-map-list-add-content").value;
    
    console.log('+++ ', id);
    
    if (name.length < 1 || coordsX < 1 || coordsY < 1 || content < 1)
    {
        dsijak.map.errorMessage('Empty field!');
        return false;
    }
    
    if (name.length > 64)
    {
        dsijak.map.errorMessage('Name string too long!');
        return false;
    }
    
    if (coordsX.length > 64 || coordsY.length > 64)
    {
        dsijak.map.errorMessage('Coordinate input is too long!');
        return false;
    }
    
    if (content.length > 512)
    {
        dsijak.map.errorMessage('Content input is too long!');
        return false;
    }
    
    var coordsOk = false;
    if (
        (!isNaN(coordsY) && coordsY.toString().indexOf('.') != -1) &&
        (!isNaN(coordsX) && coordsX.toString().indexOf('.') != -1)
    )
    {
        coordsOk = true;
    }
    
    if (!coordsOk)
    {
        dsijak.map.errorMessage('Bad coordinates format!');
        return false;
    }    
           

    
    
    var newId = Date.now();
    content = btoa(unescape(encodeURIComponent(content)));

    dsijak.map.deleteMapListItemById(parseInt(id));
    dsijak.map.addItem(newId, name, coordsX, coordsY, content);   
    dsijak.map.compileMapList();
    
    dsijak.map.closeModal();
    
    document.getElementById("ds-button-add-map-marker").scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
    });
    dsijak.mapEl.modalMainButton.style.display = 'none'; 
}



dsijak.map.collectAndSend = function()
{
    //if (!dsijak.mapData)
    if (!dsijak.mapData.length)
    {
        dsijak.map.errorMessage('Cannot save, no map data is set! <br>Please add some markers first.');
    }
    
    
    let sendObj = {};
    sendObj.settings = dsijak.map.getSettings();
    sendObj.data = dsijak.mapData;
    
    var formData = new FormData();
    formData.append("ds_form_data", JSON.stringify(sendObj) );    
    
    dsijak.map.sendData(window.dsijak.pluginDirUrl + 'entrypoint.php', formData, function(x){
        
        if (x.success)
        {
            dsijak.map.successMessage('Changes saved!');
            console.log('success');
        }
        if (x.fail)
        {
            dsijak.map.errorMessage(x.fail);
            console.log('fail');
        }
        if (x.error)
        {
            dsijak.map.errorMessage(x.error);
            console.log('error');
        }
        
    });
        
  
}

dsijak.map.testWp = function()
{
    var formData = new FormData();
    formData.append("ds_form_data", JSON.stringify({hello:'world'}));

    fetch(window.dsijak.pluginDirUrl + 'entrypoint.php', {
        method: 'POST',
        headers: {
            "X-CSRF-TOKEN": window.dsijak.csrfToken,
        },
        body: formData,
    })

    .then((response) => response.text())

    .then((text) => {
    console.log(text);
    })
}




dsijak.map.sendData = function(url, data, cb)
{        
    if (!window.dsijak.csrfToken)
    {
        dsijak.map.errorMessage('Server error: no token found.');
    }
    
    if (!window.dsijak.requestToken)
    {
        dsijak.map.errorMessage('Server error: no token found.');
    }
    
    var send = async function (url = '', data = {})    
    {    
        const response = await fetch(url, {        
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: data,
            headers: {
                "X-CSRF-TOKEN": window.dsijak.csrfToken,
                "X-Request-ID": window.dsijak.requestToken,
            }
        });
        if (response.status != 200){
            return {error: response.status +', '+ response.statusText};
        }     
        
        return response.json();
    }
    
    send(url, data)
    .then(data => { 
        if (data.error)
        {
            cb(data);
        }
        else
        {
            cb(data); 
        }        
    });  
}

dsijak.map.errorMessage = function(message)
{   
    dsijak.mapEl.modalMainTitle.innerHTML = 'Error';
    dsijak.mapEl.modalMainTitle.style.minWidth = '200px';
    dsijak.mapEl.modalMainBody.innerHTML = message;
    dsijak.mapEl.modalMainButton.innerHTML = 'Save';
    dsijak.mapEl.modalMainButton.style.display = 'none';
    dsijak.map.openModal();    
    throw message;
}

dsijak.map.criticalErrorMessage = function(message)
{   
    dsijak.mapEl.modalMainTitle.innerHTML = 'Error';
    dsijak.mapEl.modalMainTitle.style.minWidth = '200px';
    dsijak.mapEl.modalMainBody.innerHTML = message;
    dsijak.mapEl.modalMainButton.innerHTML = 'Save';
    dsijak.mapEl.modalMainButton.style.display = 'none';
    dsijak.mapEl.modalCloseButton.style.display = 'none';
    dsijak.map.openModal();    
    throw message;
}

dsijak.map.noticeMessage = function(message)
{   
    dsijak.mapEl.modalMainTitle.innerHTML = 'Notice';
    dsijak.mapEl.modalMainTitle.style.minWidth = '200px';
    dsijak.mapEl.modalMainBody.innerHTML = message;
    dsijak.mapEl.modalMainButton.innerHTML = 'Save';
    dsijak.mapEl.modalMainButton.style.display = 'none';
    dsijak.map.openModal();
    throw message;
}

dsijak.map.successMessage = function(message)
{   
    dsijak.mapEl.modalMainTitle.innerHTML = 'Success';
    dsijak.mapEl.modalMainTitle.style.minWidth = '200px';
    dsijak.mapEl.modalMainBody.innerHTML = message;
    dsijak.mapEl.modalMainButton.innerHTML = 'Save';
    dsijak.mapEl.modalMainButton.style.display = 'none';
    dsijak.map.openModal();
}

dsijak.map.getSettings = function()
{   
    var height = dsijak.mapEl.mapSettingsHeight.value;
    var width = dsijak.mapEl.mapSettingsWidth.value;
    var zoom = dsijak.mapEl.mapSettingsZoom.value;
    var xCoords = dsijak.mapEl.mapSettingsUserX.value;
    var yCoords = dsijak.mapEl.mapSettingsUserY.value;
    var mapBoxToken = dsijak.mapEl.mapSettingsToken.value;

    if (height.length < 1 || height.length < 1 || zoom.length < 1 || xCoords.length < 1 || yCoords.length < 1 || mapBoxToken.length < 1)
    {
        dsijak.map.errorMessage('All input fields must be set!');
        return null;
    }

    height = parseInt(height);

    if (height >= 100 && height <= 2000) {}
    else
    {        
        dsijak.map.errorMessage('Height must be in range between 100 and 2000 px!');
        return null;        
    }

    width = parseInt(width);

    if (width >= 100 && width <= 2000) {}
    else
    {        
        dsijak.map.errorMessage('Width must be in range between 100 and 2000 px!');
        return null;        
    }

    var coordsOk = false;
    if (
        (!isNaN(yCoords) && yCoords.toString().indexOf('.') != -1) &&
        (!isNaN(xCoords) && xCoords.toString().indexOf('.') != -1)
    )
    {
        coordsOk = true;
    }
    
    if (!coordsOk)
    {
        dsijak.map.errorMessage('Bad coordinates format!');
        return null;
    }    
    
    const a = mapBoxToken.split('.');
    if (!a.length === 3)
    {
        dsijak.map.errorMessage('Bad token string format!');
        return null;
    }
    
    zoom = parseInt(zoom);
    if (zoom >= 0 && zoom <= 19) {}
    else
    {        
        dsijak.map.errorMessage('Zoom number must be in range between 0 and 19!');
        return null;        
    }
    
    return {
        height: height,
        width: width,
        zoom: zoom,
        xCoords: xCoords,
        yCoords: yCoords,
        mapBoxToken: mapBoxToken,
    }

}

dsijak.map.getMapboxToken = function()
{   
    dsijak.map.errorMessage('<p>You need to get mapbox token from <a href="https://account.mapbox.com/access-tokens/" target="_blank">here</a> .</p>');
}

dsijak.map.validateJwtToken = function(str) 
{
    const a = str.split('.');
    if (a.length === 3)
    {
        return true;
    }
    
    return false;
}


dsijak.map.preJwtTokenOkButton = function() 
{
    var value = dsijak.mapEl.mapMapboxPreToken.value;
    if (value.length)
    {
        if (dsijak.map.validateJwtToken(value)) 
        {
            dsijak.mapToken = value;
            dsijak.mapEl.mapMainHtml.style.display = 'inline-block';
            dsijak.mapEl.mapMapboxTokenPre.style.display = 'none';
            dsijak.mapEl.mapSettingsToken.value = value;
        }
        else
        {
            dsijak.mapEl.mapMapboxPreTokenMessage.style.display = 'block';
            dsijak.mapEl.mapMapboxPreTokenMessage.innerHTML = '<b>Error:</b> Bad token value!';   
        }
    }    
    else
    {
        dsijak.mapEl.mapMapboxPreTokenMessage.style.display = 'block';
        dsijak.mapEl.mapMapboxPreTokenMessage.innerHTML = '<b>Error:</b> Bad token value!';        
    }    
}

dsijak.map.preJwtTokenOnFocus = function() 
{  
    dsijak.mapEl.mapMapboxPreTokenMessage.style.display = 'none';
    
}
