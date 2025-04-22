// filter_listings.js
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const cityFilter = params.get('city'); // Get city name from URL parameter ?city=...

    const jobListItems = document.querySelectorAll('.job-list li');
    const heading = document.getElementById('ilanlar-heading');
    const filterInfo = document.getElementById('filter-info');
    const noResultsMsg = document.getElementById('no-results');
    const showAllLink = document.getElementById('show-all-link');
    let visibleCount = 0;

    if (cityFilter) {
        const decodedCityFilter = decodeURIComponent(cityFilter); // Decode city name (e.g., if it had spaces)
        heading.textContent = `${decodedCityFilter} İçin İş İlanları`; // Update heading
        filterInfo.textContent = `Sadece "${decodedCityFilter}" şehrine ait ilanlar gösterilmektedir.`;
        showAllLink.style.display = 'inline-block'; // Show the 'Show All' link

        jobListItems.forEach(item => {
            const itemCity = item.getAttribute('data-city');

            // Case-insensitive comparison is usually safer
            if (itemCity && itemCity.toLowerCase() === decodedCityFilter.toLowerCase()) {
                item.style.display = ''; // Show item
                visibleCount++;
            } else {
                item.style.display = 'none'; // Hide item
            }
        });

        if (visibleCount === 0) {
            noResultsMsg.style.display = 'block'; // Show "no results" message
        }

    } else {
        // No city filter applied, make sure all are visible
        heading.textContent = 'Tüm Aktif İş İlanları';
        filterInfo.textContent = '';
        showAllLink.style.display = 'none';
        noResultsMsg.style.display = 'none';
        jobListItems.forEach(item => {
            item.style.display = '';
            visibleCount++;
        });
         if (visibleCount === 0) {
             // Optional: Show a different message if there are truly zero postings overall
              noResultsMsg.textContent = 'Henüz aktif ilan bulunmamaktadır.';
              noResultsMsg.style.display = 'block';
         }
    }
});