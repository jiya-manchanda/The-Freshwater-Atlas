function initMap() {
  // Map options
  const mapOptions = {
    center: { lat: 28.538336, lng: -81.379234 }, // Coordinates for Orange County, FL
    zoom: 10,
  };

  // Initialize map
  const map = new google.maps.Map(document.getElementById("map"), mapOptions);

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
    markers.forEach((marker) => marker.setMap(null));
    markers = [];

    // Add new markers
    resources.forEach((resource) => {
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
              Acidity Level: <strong>${resource.acidity_level}</strong>
            </p>
            <p style="margin: 5px 0; font-size: 12px; color: #555;">
              Temperature: <strong>${resource.temperature_celsius}°C</strong>
            </p>
            <p style="margin: 5px 0; font-size: 12px; color: #555;">
              Water Clarity: <strong>${resource.water_clarity}</strong>
            </p>
            <p style="margin: 5px 0; font-size: 12px; color: #555;">
              Biodiversity Index: <strong>${resource.biodiversity_index}</strong>
            </p>
            <p style="margin: 5px 0; font-size: 12px; color: #555;">${resource.description}</p>
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
  fetch("freshwaterresources.json")
    .then((response) => response.json())
    .then((freshwaterResources) => {
      // Initialize markers
      addMarkers(freshwaterResources);

      // Attach event listeners once the DOM is ready
      const typeFilter = document.getElementById("type-filter");
      const clarityFilter = document.getElementById("clarity-filter");
      const temperatureSlider = document.getElementById("temperature-filter");
      const temperatureValue = document.getElementById("temperature-value");
      const biodiversitySlider = document.getElementById("biodiversity-index-filter");
      const biodiversityValue = document.getElementById("biodiversity-value");
      const aciditySlider = document.getElementById("acidity-filter");
      const acidityValue = document.getElementById("acidity-value");
      const applyFiltersButton = document.getElementById("apply-filters");
      const searchBar = document.getElementById("search-bar");
      const searchButton = document.getElementById("search-button");

      // Update slider labels dynamically
      temperatureSlider.addEventListener("input", () => {
        temperatureValue.textContent = `${temperatureSlider.value}°C`;
      });

      biodiversitySlider.addEventListener("input", () => {
        biodiversityValue.textContent = biodiversitySlider.value;
      });

      aciditySlider.addEventListener("input", () => {
        acidityValue.textContent = aciditySlider.value;
      });

      // Search bar functionality
      searchButton.addEventListener("click", () => {
        const searchQuery = searchBar.value.trim().toLowerCase();

        const filteredResources = freshwaterResources.filter((resource) =>
          resource.name.toLowerCase().includes(searchQuery)
        );

        addMarkers(filteredResources);
      });

      // Apply filters based on user input
      applyFiltersButton.addEventListener("click", () => {
        const selectedType = typeFilter.value;
        const selectedClarity = clarityFilter.value;

        const filteredResources = freshwaterResources.filter((resource) => {
          return (
            (selectedType === "all" || resource.type === selectedType) &&
            (selectedClarity === "" || resource.water_clarity === selectedClarity) &&
            resource.temperature_celsius >= parseFloat(temperatureSlider.min) &&
            resource.temperature_celsius <= parseFloat(temperatureSlider.value) &&
            resource.biodiversity_index >= parseFloat(biodiversitySlider.min) &&
            resource.biodiversity_index <= parseFloat(biodiversitySlider.value) &&
            resource.acidity_level >= parseFloat(aciditySlider.min) &&
            resource.acidity_level <= parseFloat(aciditySlider.value)
          );
        });

        addMarkers(filteredResources);
      });
    })
    .catch((error) => console.error("Error loading JSON data:", error));
}

// Ensure initMap runs when the window loads
window.onload = initMap;