const nappaaData = async () => {
    // Haetaan tiedot data muuttujaan tvURL välimuuttuja, johon voidaan laittaa userinput
    const URL = `https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326`
    const response = await fetch(URL);
    const data = await response.json();
    initMap(data)
}

const initMap = (data) => {
    let map = L.map('map', {
        minZoom: -3
    })

    let geoJson = L.geoJSON(data, {
        weight: 2,
        onEachFeature: getFeature,
    }).addTo(map);

    let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: "© OpenStreetMap"
    }).addTo(map);

    map.fitBounds(geoJson.getBounds())

}

const getFeature = (feature, layer) => {
    if (!feature.properties.nimi) return;
    const nimi = feature.properties.nimi;
    layer.bindTooltip(nimi);
}

nappaaData();