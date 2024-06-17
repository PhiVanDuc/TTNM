document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    console.log(`Poster ID: ${id}`);  // Debugging: Check the value of id

    if (!id) {
        console.error('No ID provided in query parameter');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/posters/${id}`);
        if (!response.ok) {
            console.error(`Failed to fetch poster details. Status: ${response.status}`);
            return;
        }

        const posterData = await response.json();

        // Debugging: Check the fetched data
        console.log(posterData);

        // Update UI with poster data
        const posterImage = document.querySelector('.poster-image1 img');
        const posterName = document.querySelector('.name-poster');
        const posterContent = document.querySelector('.content');

        // Set the image source
        posterImage.src = posterData.files[0];
        posterImage.alt = posterData.name;

        posterName.textContent = posterData.name;
        posterContent.textContent = posterData.content;

    } catch (error) {
        console.error('Error fetching and displaying poster details:', error);
    }
});
