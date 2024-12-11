function initMap() {
  // Map options
  const mapOptions = {
    center: { lat: 28.538336, lng: -81.379234 }, // Coordinates for Orange County, FL
    zoom: 10,
  };

  /**
   * Provides a singular object which matches the filter provided.
   * @param jsonData {String} The JSON data as a string to parse
   * @param waterbodyName {String} The "WaterbodyName" attribute from the data
   * @param filter {String} The characteristic to filter by, valid options are "Flow"; "Temperature, water"; "Cloud cover"; "Wind direction (direction from, expressed 0-360 deg)";
   */
  function filterDataSource(jsonData, waterbodyName, filter) {
    // parses the JSON provided in function arguments
    const json = JSON.parse(jsonData);
    // executes a filter on the JSON data to fetch the specific characteristic from the water body name
    const filtered = json.filter(data => data.Characteristic === filter && data.WaterbodyName === waterbodyName);
    // returns the most recent sample date for the specified filter
    return filtered.sort((a, b) => new Date(b.SampleDate) - new Date(a.SampleDate))[0]
  }


  // Initialize map
  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Custom icons for each type of water resource
  const icons = {
    lake: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    river: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    spring: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  };

  let markers = [];
  const infoWindow = new google.maps.InfoWindow();

  function addMarkers(resources) {
    // Remove existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // Add new markers
    resources.forEach(resource => {
      const marker = new google.maps.Marker({
        position: { lat: resource.lat, lng: resource.lng },
        map,
        icon: icons[resource.type],
        title: resource.name,
      });

      marker.addListener("click", () => {
        infoWindow.setContent(`
          <div style="font-family: Arial, sans-serif; font-size: 14px; max-width: 250px;">
            <h3 style="margin: 0; color: #2E86C1;">${resource.name}</h3>
            <img src="${resource.image}" alt="${resource.name}" style="width: 100%; height: auto; margin: 5px 0; border-radius: 5px;">
            <p style="margin: 5px 0; font-size: 12px; color: #555;">
              Type: <strong>${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</strong>
            </p>
            <p style="margin: 5px 0; font-size: 12px; color: #555;">
              ${resource.description}
            </p>
            ${
              resource.url
                ? `<a href="${resource.url}" target="_blank" style="text-decoration: none; color: #2E86C1;">Learn More</a>`
                : ""
            }
          </div>
        `);
        infoWindow.open(map, marker);
      });

      markers.push(marker);
    });
  }

  // Fetch data from JSON file
  fetch('freshwaterResources.json')
    .then(response => response.json())
    .then(freshwaterResources => {
      addMarkers(freshwaterResources);

      const filterItems = document.querySelectorAll('.filter-item');
      filterItems.forEach(item => {
        item.addEventListener('click', () => {
          const filterValue = item.getAttribute('data-filter');

          addMarkers(
              filterValue === 'all'
              ? freshwaterResources
              : freshwaterResources.filter(x => x.type === filterValue)
          );
          // Update dropdown to match sidebar selection
          document.getElementById('resource-type').value = filterValue;
        });
      });

      // Filter markers based on dropdown selection
      document.getElementById('resource-list').addEventListener('change', e => {
        addMarkers(
          e.target.value === 'all'
            ? freshwaterResources
            : freshwaterResources.filter(x => x.type === e.target.value)
        );
      });
    })
    .catch(error => console.error("Error loading JSON data:", error));
}

window.onload = initMap;
