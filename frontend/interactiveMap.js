function initMap() {
    // Map options
    const mapOptions = {
      center: { lat: 28.538336, lng: -81.379234 }, // Coordinates for Orange County, FL
      zoom: 10,
    };
  
    // Initialize map
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
    // Example freshwater resource data (replace with actual data)
    const freshwaterResources = [
        { name: "Lake Apopka", lat: 28.5961, lng: -81.6347 },
        { name: "Lake Eola", lat: 28.5439, lng: -81.3739 },
        { name: "Lake Osceola", lat: 28.5986, lng: -81.3431 },
        { name: "Lake Bennet", lat: 28.5700, lng: -81.5440 },
        { name: "Mallard Lake", lat: 28.3693, lng: -81.4142 },
        { name: "St. Johns River", lat: 28.8076, lng: -81.3777 },
        { name: "Wekiva River", lat: 28.7440, lng: -81.4448 },
        { name: "Wekiwa Springs", lat: 28.7118, lng: -81.4630 },
    ];
  
    // Add markers to the map
    freshwaterResources.forEach(resource => {
      const marker = new google.maps.Marker({
        position: { lat: resource.lat, lng: resource.lng },
        map: map,
        title: resource.name,
      });
  
      // Optional: Add info windows for each marker
      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${resource.name}</h3><p>Freshwater resource in Orange County, FL.</p>`,
      });
  
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  }
  
  // Wait for the Google Maps API to load, then initialize the map
  window.addEventListener('load', () => {
    if (typeof google !== 'undefined' && google.maps) {
      initMap();
    } else {
      console.error('Google Maps API failed to load.');
    }
  });
  