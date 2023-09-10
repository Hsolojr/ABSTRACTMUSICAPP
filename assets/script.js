// Define a function to create a music card element
function createMusicCard(result) {
    const article = document.createElement('article');
    const artist = document.createElement('p');
    const song = document.createElement('h4');
    const img = document.createElement('img');
    const audio = document.createElement('audio');
    const audioSource = document.createElement('source');

    artist.innerHTML = result.artistName;
    song.innerHTML = result.trackName;
    img.src = result.artworkUrl100;
    audioSource.src = result.previewUrl;
    audio.controls = true;

    article.appendChild(img);
    article.appendChild(artist);
    article.appendChild(song);
    article.appendChild(audio);
    audio.appendChild(audioSource);

    return article;
}

// Define a function to display search results
function displaySearchResults(results) {
    const songContainer = document.getElementById('songs');
    while (songContainer.firstChild) {
        songContainer.removeChild(songContainer.firstChild);
    }

    results.forEach((result) => {
        const musicCard = createMusicCard(result);
        songContainer.appendChild(musicCard);
    });
}

// Define a function to handle the search
function handleSearch() {
    const searchTerm = document.getElementById('searchTerm').value;

    if (!searchTerm || searchTerm === '') {
        alert('Please enter a search term');
        return;
    }

    const url = `https://itunes.apple.com/search?term=${searchTerm}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const artists = data.results;
            displaySearchResults(artists);
        })
        .catch((error) => console.error('Request failed:', error));
}

// Attach the search function to the button click event
const searchBtn = document.getElementById('searchTermBtn');
searchBtn.addEventListener('click', handleSearch);
