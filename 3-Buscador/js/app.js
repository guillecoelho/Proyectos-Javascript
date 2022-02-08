/*
	Hecho por: Guillermo Coelho
	08/02/2022
*/

//	VARIABLES
const selectMarca = document.querySelector('#marca'); // Select de marca
const selectYear = document.querySelector('#year'); // Select de year
const selectMinimo = document.querySelector('#minimo'); // Select de minimo precio
const selectMaximo = document.querySelector('#maximo'); // Select de maximo precio
const selectPuertas = document.querySelector('#puertas'); // Select de puertas
const selectTransmision = document.querySelector('#transmision'); // Select de transmision
const selectColor = document.querySelector('#color'); // Select de color

const resultado = document.querySelector('#resultado'); // <div> en donde se muestran los resultados

//	Variables de year
const maxYear = new Date().getFullYear(); // Obtiene el year actual
const minYear = maxYear - 10;

//	Objecto para la busqueda
const filtroBusqueda = {
	marca: '',
	year: '',
	minPrecio: '',
	maxPrecio: '',
	puertas: '',
	transmision: '',
	color: '',
};

//	EVENTOS

//	Evento se ejecuta luego de cargar todo el archivo HTML
document.addEventListener('DOMContentLoaded', () => {
	mostrarAutos(autos);

	llenarSelect();
});

//	Eventos cuando cambian los select de busqueda
selectMarca.addEventListener('change', (e) => {
	filtroBusqueda.marca = e.target.value;

	filtroAuto();
});

selectYear.addEventListener('change', (e) => {
	filtroBusqueda.year = e.target.value;

	filtroAuto();
});

selectMinimo.addEventListener('change', (e) => {
	filtroBusqueda.minPrecio = e.target.value;

	filtroAuto();
});

selectMaximo.addEventListener('change', (e) => {
	filtroBusqueda.maxPrecio = e.target.value;

	filtroAuto();
});

selectPuertas.addEventListener('change', (e) => {
	filtroBusqueda.puertas = e.target.value;

	filtroAuto();
});

selectTransmision.addEventListener('change', (e) => {
	filtroBusqueda.transmision = e.target.value;

	filtroAuto();
});

selectColor.addEventListener('change', (e) => {
	filtroBusqueda.color = e.target.value;

	filtroAuto();
});

//	FUNCIONES

//	Muestra los autos en db.js en el <div> con id=resultado
function mostrarAutos(autos) {
	limpiarHTML();

	//	Por cada auto que haya en el array
	autos.forEach((auto) => {
		//Puedo extraer los datos de la variable a sus respectivos nombres para no tener que escribir auto.dato cada vez que lo use
		const { marca, modelo, year, puertas, transmision, color, precio } = auto;

		//	Creo un parrafo en el html para mostrar los datos
		const autoHtml = document.createElement('p');

		//	Le ingreso el contenido al elemento creado
		autoHtml.textContent = `
		${marca} ${modelo} - ${year} - ${puertas} - ${transmision} - ${color} - $${precio}
		`;

		//	Cargo el texto que cree al <div> de resultado
		resultado.appendChild(autoHtml);
	});
}

//	Limpia el html de los resultados anteriores
function limpiarHTML() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
}

//	Genera los años en el select
function llenarSelect() {
	//	Recorre desde el year actual hasta el minimo que se haya puesto
	for (let i = maxYear; i > minYear; i--) {
		const opcion = document.createElement('option'); // Creo la opcion dentro del select
		opcion.value = i; // Le asigno el valor de i
		opcion.textContent = i; // Le asigno i al texto que se muestra en el select
		year.appendChild(opcion); // Agrego el elemento al select
	}
}

//	Funciones para filtrar los select
function filtroAuto() {
	const resultado = autos
		.filter(filtroMarca)
		.filter(filtroYear)
		.filter(filtroMinprecio)
		.filter(filtroMaxprecio)
		.filter(filtroPuertas)
		.filter(filtroTransmicion)
		.filter(filtroColor);

	if (resultado.length) {
		mostrarAutos(resultado);
	} else {
		noResultado();
	}
}

function noResultado() {
	limpiarHTML();
	const noResultado = document.createElement('div');
	noResultado.classList.add('error', 'alerta');
	noResultado.textContent =
		'No hay resultados, intenta con diferentes opciones';
	resultado.appendChild(noResultado);
}

function filtroMarca(auto) {
	if (filtroBusqueda.marca) {
		return auto.marca === filtroBusqueda.marca;
	}
	return auto;
}

function filtroYear(auto) {
	if (filtroBusqueda.year) {
		return auto.year === parseInt(filtroBusqueda.year); // parseInt() convierte su contenido a number
	}
	return auto;
}

function filtroMinprecio(auto) {
	if (filtroBusqueda.minPrecio) {
		return auto.precio >= filtroBusqueda.minPrecio;
	}
	return auto;
}

function filtroMaxprecio(auto) {
	if (filtroBusqueda.maxPrecio) {
		return auto.precio <= filtroBusqueda.maxPrecio;
	}
	return auto;
}

function filtroPuertas(auto) {
	if (filtroBusqueda.puertas) {
		return auto.puertas === parseInt(filtroBusqueda.puertas);
	}
	return auto;
}

function filtroTransmicion(auto) {
	if (filtroBusqueda.transmision) {
		return auto.transmision === filtroBusqueda.transmision;
	}
	return auto;
}

function filtroColor(auto) {
	if (filtroBusqueda.color) {
		return auto.color === filtroBusqueda.color;
	}
	return auto;
}
