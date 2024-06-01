//BUSCAR ANIME CON LA API JIKAN

document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault(); //para prevenir que la página se recargue, es decir evitar comportamientos predeterminados.
  const query = document.getElementById('query').value; //obtener el valor de el id query y que se almacene en la constante query
  searchAnime(query); //llamada a la función searchAnime con el parametro de query (la función searchAnime está definida después).
});

function searchAnime(query) {
  const url = `https://api.jikan.moe/v4/anime?q=${query}&limit=10`; //url de base

  fetch(url) //método fetch
    .then((response) => response.json()) //se parsea a json
    .then((data) => {
      displayResults(data.data);
    })

    .catch((error) => {
      console.error('Error al buscar anime:', error);
      document.getElementById(
        'results'
      ).innerHTML = `<p>Error al buscar anime. Intenta de nuevo.</p>`;
    });
}

function displayResults(animes) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; //limpiar el div de resultados

  if (animes.length === 0) {
    resultsDiv.innerHTML = '<p>No se encontraron animes.</p>';
    return;
  }

  animes.forEach((anime) => {
    const animeDiv = document.createElement('div');
    animeDiv.classList.add('anime');

    const animeImg = document.createElement('img');
    animeImg.src = anime.images.jpg.image_url;
    animeImg.alt = anime.title;

    const animeInfo = document.createElement('div');
    animeInfo.classList.add('anime-info');

    const animeTitle = document.createElement('h2');
    animeTitle.textContent = anime.title;

    const animeSynopsis = document.createElement('p');
    animeSynopsis.textContent = anime.synopsis || 'Sinopsis no disponible';

    animeInfo.appendChild(animeTitle);
    animeInfo.appendChild(animeSynopsis);

    animeDiv.appendChild(animeImg);
    animeDiv.appendChild(animeInfo);

    resultsDiv.appendChild(animeDiv);
  });
}

// RANKING DE ANIMES
function getTopAnimes() {
  const url = 'https://api.jikan.moe/v4/top/anime';

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayRanking(data.data);
    })
    .catch((error) => {
      console.error('Error al obtener el ranking de animes:', error);
    });
}

function displayRanking(animes) {
  const rankingTable = document
    .getElementById('rankingTable')
    .getElementsByTagName('tbody')[0];
  rankingTable.innerHTML = '';

  if (animes.length === 0) {
    const row = rankingTable.insertRow();
    const cell = row.insertCell(0);
    cell.colSpan = 4;
    cell.textContent = 'No se encontraron animes en el ranking.';
    return;
  }

  animes.slice(0, 10).forEach((anime, index) => {
    const row = rankingTable.insertRow();

    const cellRank = row.insertCell(0);
    cellRank.textContent = index + 1;

    const cellImage = row.insertCell(1);
    const img = document.createElement('img');
    img.src = anime.images.jpg.image_url;
    img.alt = anime.title;
    img.style.width = '50px';
    cellImage.appendChild(img);

    const cellTitle = row.insertCell(2);
    cellTitle.textContent = anime.title;

    const cellScore = row.insertCell(3);
    cellScore.textContent = anime.score;
  });
}

// Llama a la función para obtener el ranking de animes cuando se carga la página
window.onload = function () {
  getTopAnimes();
};

//NAVBAR

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

const navLink = document.querySelectorAll('.nav-link');

navLink.forEach((n) => n.addEventListener('click', closeMenu));

function closeMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}

//SLIDER

document.addEventListener('DOMContentLoaded', function () {
  new Glide('.glide', {
    type: 'carousel', // tipo de slider (carousel, slider, etc.)
    perView: 3, // número de slides por vista
    focusAt: 'center', // enfoque en el centro
    autoplay: 2000, // auto-reproducción cada 3000ms
    animationDuration: 800, // duración de la animación
    animationTimingFunc: 'ease-in-out', // tipo de animación
  }).mount();
});
