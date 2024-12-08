function initMap() {
  // Map options
  const mapOptions = {
    center: { lat: 28.538336, lng: -81.379234 }, // Coordinates for Orange County, FL
    zoom: 10,
  };

  // Initialize map
  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Custom icons for each type of water resource
  const icons = {
    lake: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    river: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    spring: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  };

  // Freshwater resource data
  const freshwaterResources = [
    // Lakes
    { name: "Lake Apopka", lat: 28.5961, lng: -81.6347, type: "lake" },
    { name: "Lake Eola", lat: 28.5439, lng: -81.3739, type: "lake" },
    { name: "Lake Conway", lat: 28.4683, lng: -81.3492, type: "lake" },
    { name: "Lake Underhill", lat: 28.5389, lng: -81.3370, type: "lake" },
    { name: "Lake Baldwin", lat: 28.5728, lng: -81.3228, type: "lake" },
    { name: "Lake Jessamine", lat: 28.4711, lng: -81.3728, type: "lake" },
    { name: "Lake Ivanhoe", lat: 28.5634, lng: -81.3791, type: "lake" },
    { name: "Lake Fairview", lat: 28.5892, lng: -81.3986, type: "lake" },
    { name: "Lake Hart", lat: 28.3731, lng: -81.1793, type: "lake" },
    { name: "Lake Mary Jane", lat: 28.3731, lng: -81.1793, type: "lake" },
    { name: "Lake Pickett", lat: 28.6046, lng: -81.1125, type: "lake" },
    { name: "Lake Butler", lat: 28.4883, lng: -81.5514, type: "lake" },
    { name: "Lake Tibet", lat: 28.4675, lng: -81.5386, type: "lake" },
    { name: "Lake Sheen", lat: 28.4683, lng: -81.5236, type: "lake" },
    { name: "Lake Virginia", lat: 28.5921, lng: -81.3456, type: "lake" },
    { name: "Lake Mizell", lat: 28.5950, lng: -81.3450, type: "lake" },
    { name: "Lake Osceola", lat: 28.5986, lng: -81.3431, type: "lake" },
    { name: "Lake Maitland", lat: 28.6168, lng: -81.3508, type: "lake" },
    { name: "Lake Estelle", lat: 28.5736, lng: -81.3761, type: "lake" },
    { name: "Lake Rowena", lat: 28.5686, lng: -81.3650, type: "lake" },
    { name: "Lake Sue", lat: 28.5686, lng: -81.3525, type: "lake" },
    { name: "Lake Highland", lat: 28.5598, lng: -81.3705, type: "lake" },
    { name: "Lake Formosa", lat: 28.5686, lng: -81.3686, type: "lake" },
    { name: "Lake Lorna Doone", lat: 28.5486, lng: -81.4050, type: "lake" },
    { name: "Lake Lucerne", lat: 28.5345, lng: -81.3783, type: "lake" },
    { name: "Lake Davis", lat: 28.5314, lng: -81.3668, type: "lake" },
    { name: "Lake Cherokee", lat: 28.5335, lng: -81.3712, type: "lake" },
    { name: "Lake Copeland", lat: 28.5264, lng: -81.3764, type: "lake" },
    { name: "Lake Holden", lat: 28.5086, lng: -81.3836, type: "lake" },
    { name: "Lake Jennie Jewel", lat: 28.5014, lng: -81.3586, type: "lake" },
    { name: "Lake Gatlin", lat: 28.4892, lng: -81.3586, type: "lake" },
    { name: "Lake George", lat: 28.6125, lng: -81.1125, type: "lake" },
    { name: "Lake Rose", lat: 28.5178, lng: -81.5715, type: "lake" },
    { name: "Lake Roberts", lat: 28.5178, lng: -81.5715, type: "lake" },
    { name: "Lake Speer", lat: 28.4791, lng: -81.5987, type: "lake" },
    { name: "Lake Rouse", lat: 28.6046, lng: -81.1125, type: "lake" },
    { name: "Lake Price", lat: 28.6046, lng: -81.1125, type: "lake" },
    { name: "Lake Waunatta", lat: 28.5389, lng: -81.3370, type: "lake" },
    { name: "Lake Georgia", lat: 28.6046, lng: -81.1125, type: "lake" },
    { name: "Lake Lee", lat: 28.6046, lng: -81.1125, type: "lake" },
    { name: "Lake Martha", lat: 28.6046, lng: -81.1125, type: "lake" },
    { name: "Lake Pearl", lat: 28.6043, lng: -81.2642, type: "lake" },
    { name: "Lake Shannon", lat: 28.5648, lng: -81.3412, type: "lake" },
    { name: "Lake Barton", lat: 28.5514, lng: -81.3100, type: "lake" },
    { name: "Lake Arnold", lat: 28.5389, lng: -81.3370, type: "lake" },
    { name: "Lake Como", lat: 28.5358, lng: -81.3520, type: "lake" },
    { name: "Lake Weldona", lat: 28.5264, lng: -81.3668, type: "lake" },
    { name: "Lake Emerald", lat: 28.5382, lng: -81.3792, type: "lake" },
    { name: "Lake Adair", lat: 28.5633, lng: -81.3886, type: "lake" },
    { name: "Lake Fairlane", lat: 28.5891, lng: -81.3300, type: "lake" },
    { name: "Lake Olympia", lat: 28.5894, lng: -81.5356, type: "lake" },
    { name: "Lake Nona", lat: 28.3793, lng: -81.2601, type: "lake" },
    { name: "Lake Cane", lat: 28.4868, lng: -81.4603, type: "lake" },
    { name: "Lake Sheen", lat: 28.4671, lng: -81.5404, type: "lake" },
    { name: "Lake Tibet Butler", lat: 28.4592, lng: -81.5481, type: "lake" },
    { name: "Lake Burden", lat: 28.4518, lng: -81.5748, type: "lake" },
    { name: "Lake Crescent", lat: 28.5487, lng: -81.4764, type: "lake" },
    { name: "Lake Blanche", lat: 28.4689, lng: -81.5409, type: "lake" },
    { name: "Lake Mabel", lat: 28.4099, lng: -81.5913, type: "lake" },

    // Rivers
    { name: "St. Johns River", lat: 28.8076, lng: -81.3777, type: "river" },
    { name: "Wekiva River", lat: 28.7440, lng: -81.4448, type: "river" },
    { name: "Econlockhatchee River", lat: 28.5700, lng: -81.1093, type: "river" },
    { name: "Little Econ River", lat: 28.5842, lng: -81.2854, type: "river" },
    { name: "Middle River", lat: 28.6512, lng: -81.3301, type: "river" },
    { name: "South Fork Little Econ", lat: 28.5394, lng: -81.2853, type: "river" },

    // Springs
    { name: "Wekiwa Springs", lat: 28.7118, lng: -81.4630, type: "spring" },
    { name: "Rock Springs", lat: 28.7453, lng: -81.5112, type: "spring" },
    { name: "Blue Springs", lat: 28.9486, lng: -81.3374, type: "spring" },
    { name: "Sanlando Springs", lat: 28.6776, lng: -81.3975, type: "spring" },
    { name: "Island Springs", lat: 28.6272, lng: -81.4772, type: "spring" },
    { name: "Sweetwater Springs", lat: 28.6944, lng: -81.4450, type: "spring" },
    { name: "Palm Springs", lat: 28.5912, lng: -81.2902, type: "spring" },
    { name: "Bear Springs", lat: 28.7485, lng: -81.5416, type: "spring" },
    { name: "Turtle Springs", lat: 28.5712, lng: -81.3928, type: "spring" },
  ];

  // Add markers to the map
  freshwaterResources.forEach(resource => {
    const marker = new google.maps.Marker({
      position: { lat: resource.lat, lng: resource.lng },
      map: map,
      title: resource.name,
      icon: icons[resource.type],
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; max-width: 250px;">
          <h3 style="margin: 0; color: #2E86C1;">${resource.name}</h3>
          <p style="margin: 5px 0; font-size: 12px; color: #555;">
            Type: <strong>${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</strong>
          </p>
          <p style="margin: 5px 0; font-size: 12px; color: #555;">
            Description: A beautiful ${resource.type} located in Orange County, FL.
          </p>
        </div>`,
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  });
}

// Initialize the map
window.addEventListener('load', () => {
  if (typeof google !== 'undefined' && google.maps) {
    initMap();
  } else {
    console.error('Google Maps API failed to load.');
  }
});
