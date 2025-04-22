// map_interaction.js
document.addEventListener('DOMContentLoaded', function() {
    const map = document.getElementById('turkey-map');

    if (map) {
        const paths = map.querySelectorAll('path');

        paths.forEach(path => {
            path.addEventListener('click', function() {
                const cityId = this.id; // Get the ID of the clicked province path

                if (cityId) {
                    // You might need to clean the ID if it's like "TR-06"
                    // const cityName = cityId.replace('TR-', ''); // Example cleaning
                    const cityName = cityId; // Assuming ID is the city name like "Ankara"

                    // Redirect to the ilanlar page with the city name as a query parameter
                    window.location.href = `ilanlar.html?city=${encodeURIComponent(cityName)}`;
                } else {
                    console.warn('Clicked path has no ID:', this);
                }
            });
        });
    } else {
        console.error('Map SVG element not found!');
    }
});