document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById('dog-image-container');
    const breedList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');
    let allBreeds = []; // Array to store all breeds for easy filtering

    // Function to add images to the DOM
    function addImages(images) {
        images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = "A cute dog";
            img.style.width = "200px";
            img.style.margin = "10px";
            imageContainer.appendChild(img);
        });
    }

    // Function to render breeds in the DOM
    function renderBreeds(breeds) {
        breedList.innerHTML = ""; // Clear the list before rendering
        breeds.forEach(breed => {
            const li = document.createElement('li');
            li.textContent = breed;
            li.style.cursor = "pointer";

            // Add event listener to change color on click
            li.addEventListener('click', () => {
                li.style.color = "blue"; // Change to your chosen color
            });

            breedList.appendChild(li);
        });
    }

    // Fetch images and add to the DOM
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => addImages(data.message))
        .catch(error => console.error("Error fetching images:", error));

    // Fetch breeds and render in the DOM
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message); // Store breeds in allBreeds array
            renderBreeds(allBreeds); // Initially render all breeds
        })
        .catch(error => console.error("Error fetching breeds:", error));

    // Filter breeds based on dropdown selection
    breedDropdown.addEventListener('change', (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
        renderBreeds(filteredBreeds);
    });
});
