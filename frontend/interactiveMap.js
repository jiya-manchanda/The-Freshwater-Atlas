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
        // Initialize markers
        addMarkers(freshwaterResources);

        // Attach event listeners once the DOM is ready
        const searchButton = document.getElementById('search-button');
        const searchbar = document.getElementById('search-bar');
        const filterItems = document.querySelectorAll('.filter-item');
        const resourceList = document.getElementById('resource-list');

        if (searchButton && searchbar) {
          searchButton.addEventListener('click', () => {
            const query = searchbar.value.toLowerCase().trim();
            const filteredResources = freshwaterResources.filter(r =>
                r.name.toLowerCase().includes(query)
            );
            addMarkers(filteredResources);
          });
        }

        // Add event listeners for filters
        filterItems.forEach(item => {
          item.addEventListener('click', () => {
            const filterValue = item.getAttribute('data-filter');
            addMarkers(
                filterValue === 'all'
                    ? freshwaterResources
                    : freshwaterResources.filter(r => r.type === filterValue)
            );
          });
        });

        // Dropdown filter
        if (resourceList) {
          resourceList.addEventListener('change', e => {
            const filterValue = e.target.value;
            addMarkers(
                filterValue === 'all'
                    ? freshwaterResources
                    : freshwaterResources.filter(r => r.type === filterValue)
            );
          });
        }
      })
      .catch(error => console.error("Error loading JSON data:", error));
}

// Ensure initMap runs when the window loads
window.onload = initMap;
