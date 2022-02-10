/*
	Hecho por: Guillermo Coelho
	10/02/2022
*/

//   Variables
const formulario = document.querySelector('#formulario');
const misTweets = document.querySelector('#lista-tweets');
let tweets = [];

//   EventListeners
EventListeners();

function EventListeners() {
	//   Cuando se carga el html
	document.addEventListener('DOMContentLoaded', cargarTweets);

	//   Cuando el usuario agrega un tweet
	formulario.addEventListener('submit', agregarTweet);
}

//   Funciones
function agregarTweet(e) {
	e.preventDefault();

	const tweet = document.querySelector('#tweet').value;

	if (tweet === '') {
		mostrarError('El tweet no puede ser vacio');

		return;
	}

	const tweetObj = {
		id: Date.now(),
		tweet, // Es igual a tweet : tweet porque tienen el mismo nombre
	};

	tweets.push(tweetObj);

	crearHTML();

	//   Elimina el contenido del formulario
	formulario.reset();

	/*const tweetsJSON = JSON.stringify(tweets);
	localStorage.setItem('tweets', tweetsJSON);*/
}

function mostrarError(mensaje) {
	const mensajeError = document.createElement('p');
	mensajeError.textContent = mensaje;
	mensajeError.classList.add('error');

	const contenido = document.querySelector('#contenido');
	contenido.appendChild(mensajeError);

	setTimeout(() => {
		mensajeError.remove();
	}, 3000);
}

//   Muestra los tweets
function crearHTML() {
	limpiarHtml();

	if (tweets.length > 0) {
		tweets.forEach((tweet) => {
			//   Creo boton de eliminar
			const botonEliminar = document.createElement('a');
			botonEliminar.classList.add('borrar-tweet');
			botonEliminar.innerText = 'X';

			//   Añadir funcion al boton
			botonEliminar.onclick = () => {
				borrarTweet(tweet.id);
			};

			//   Creo elemento HTML
			const li = document.createElement('li');

			// Añado el texto
			li.innerText = tweet.tweet;

			//   Agrego el boton de eliminar en el listado
			li.appendChild(botonEliminar);

			//   Inserto en el html
			misTweets.appendChild(li);
		});
	}

	sincronizarStorage();
}

//   Limpiar el HTML
function limpiarHtml() {
	while (misTweets.firstChild) {
		misTweets.removeChild(misTweets.firstChild);
	}
}

//   Agrega los tweets almacenados en localStorage
function sincronizarStorage() {
	localStorage.setItem('tweets', JSON.stringify(tweets));
}

function cargarTweets() {
	tweets = JSON.parse(localStorage.getItem('tweets')) || [];
	crearHTML();
}

function borrarTweet(id) {
	tweets = tweets.filter((tweet) => tweet.id !== id);

	crearHTML();
}
