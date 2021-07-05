
//namespace
if (!window.dsijak)
{
    window.dsijak = {};
    window.dsijak.map = {};
    window.dsijak.mapData = {};
    window.dsijak.mapEl = {};
    window.dsijak.mapToken = null;
    window.dsijak.csrfToken = null;
    window.dsijak.leaflet = null;
    window.dsijak.onError = false;
    window.dsijak.mapSettings = null;
    window.dsijak.newMapData = null;
}
else
{
    window.dsijak.map = {};
    window.dsijak.mapData = {};
    window.dsijak.mapEl = {};
    window.dsijak.mapToken = null;
    window.dsijak.csrfToken = null;
    window.dsijak.leaflet = null;
    window.dsijak.mapSettings = null;
    window.dsijak.newMapData = null;
}


//html elements
dsijak.mapEl.mapMainHtml = document.getElementById('ds-map-plugin');
dsijak.mapEl.mapMapboxTokenPre = document.getElementById('ds-mapbox-token'); 
dsijak.mapEl.mapMapboxPreToken = document.getElementById('ds-map-mapbox-token-pre'); 
dsijak.mapEl.mapMapboxPreTokenMessage = document.getElementById('ds-map-mapbox-token-pre-message'); 
dsijak.mapEl.modalCloseButton = document.getElementById('ds-modal-map-close');
dsijak.mapEl.modalMain = document.getElementById('ds-modal-main');
dsijak.mapEl.modalMainTitle = document.getElementById('ds-modal-title');
dsijak.mapEl.modalMainBody = document.getElementById('ds-modal-body');
dsijak.mapEl.modalMainButton = document.getElementById('ds-modal-title-button');
dsijak.mapEl.modalContent = document.getElementById('ds-modal-content');
dsijak.mapEl.mapListTbody = document.getElementById('ds-map-list-tbody');
dsijak.mapEl.mapListTable = document.getElementById('ds-map-list');
dsijak.mapEl.mapLeafletContainer = document.getElementById('ds-modal-map');
dsijak.mapEl.mapSettingsUserX = document.getElementById('ds-map-user-x');
dsijak.mapEl.mapSettingsUserY = document.getElementById('ds-map-user-y');
dsijak.mapEl.mapSettingsHeight = document.getElementById('ds-map-height');
dsijak.mapEl.mapSettingsWidth = document.getElementById('ds-map-width');
dsijak.mapEl.mapSettingsZoom = document.getElementById('ds-map-zoom');
dsijak.mapEl.mapSettingsToken = document.getElementById('ds-map-mapbox-token');


