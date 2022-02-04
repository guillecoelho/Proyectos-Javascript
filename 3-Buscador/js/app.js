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
	mostrarAutos();

	llenarSelect();
});

selectMarca.addEventListener('change', (e) => {
	filtroBusqueda.marca = e.target.value;
});

selectYear.addEventListener('change', (e) => {
	filtroBusqueda.year = e.target.value;
});

selectMinimo.addEventListener('change', (e) => {
	filtroBusqueda.minPrecio = e.target.value;
});

selectMaximo.addEventListener('change', (e) => {
	filtroBusqueda.maxPrecio = e.target.value;
});

selectPuertas.addEventListener('change', (e) => {
	filtroBusqueda.puertas = e.target.value;
});

selectTransmision.addEventListener('change', (e) => {
	filtroBusqueda.transmision = e.target.value;
});

selectColor.addEventListener('change', (e) => {
	filtroBusqueda.color = e.target.value;
});

//	FUNCIONES

//	Muestra los autos en db.js en el <div> con id=resultado
function mostrarAutos() {
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
