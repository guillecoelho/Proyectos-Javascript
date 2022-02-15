/*
	Hecho por: Guillermo Coelho
	Fecha: 15/02/2022
*/

//   Constructores
function Seguro(marca, year, tipo) {
	this.marca = marca;
	this.year = year;
	this.tipo = tipo;
}

//   Realiza la cotizacion del seguro
Seguro.prototype.cotizarSeguro = function () {
	/*
          1 = Americano 1.15
          2 = Asiatico 1.05
          3 = Europeo 1.35
     */

	let cantidad;
	const base = 2000;

	switch (this.marca) {
		case '1':
			cantidad = base * 1.15;
			break;
		case '2':
			cantidad = base * 1.05;
			break;
		case '3':
			cantidad = base * 1.35;
			break;
		default:
			break;
	}

	//   Leer el año
	//   Cada año que pasa el costo se reduce un 3%
	const diferencia = new Date().getFullYear() - this.year;
	cantidad -= ((diferencia * 3) * cantidad) / 100;

	/*
		Si el seguro es basico se incrementa por un 30%
		Si el seguro es completo se incrementa por un 50%
	*/

	if(this.tipo === 'basico'){
		cantidad *= 1.30;
	}else{
		cantidad *= 1.50;
	}

	return cantidad;
};

function UI() {}

//   Prototypes
UI.prototype.llenarOpciones = () => {
	const max = new Date().getFullYear(),
		min = max - 20;

	const selectYear = document.querySelector('#year');

	for (let i = max; i > min; i--) {
		let option = document.createElement('option');
		option.value = i;
		option.textContent = i;
		selectYear.appendChild(option);
	}
};

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
	const div = document.createElement('div');

	if (tipo === 'error') {
		div.classList.add('error');
	} else {
		div.classList.add('correcto');
	}

	div.classList.add('mensaje', 'mt-10');
	div.textContent = mensaje;

	//   Insertar en el HTML
	const formulario = document.querySelector('#cotizar-seguro');
	formulario.insertBefore(div, document.querySelector('#resultado'));

	setTimeout(() => {
		div.remove();
	}, 3000);
};

UI.prototype.mostrarResultado = (total, seguro) => {
	//	Crear el resultado
	const div = document.createElement('div');
	div.classList.add('mt-10');

	const {marca, year, tipo} = seguro;
	let textoMarca;

	switch (marca) {
		case '1':
			textoMarca = 'Americano';
			break;
		case '2':
			textoMarca = 'Asiatico';
			break;
		case '3':
			textoMarca = 'Europeo';
			break;
		default:
			break;
	}

	div.innerHTML = `
		<p class="header">Tu Resumen</p>
		<p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
		<p class="font-bold">Year: <span class="font-normal">${year}</span></p>
		<p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
		<p class="font-bold">Total: <span class="font-normal">$ ${total}</span></p>
	`;

	const resultadoDiv = document.querySelector('#resultado');

	//	Mostrar spinner
	const spinner = document.querySelector('#cargando');
	spinner.style.display = 'block';

	setTimeout(() => {
		spinner.style.display = 'none';	// Se borra el spinner
		resultadoDiv.appendChild(div); // Aparece el resultado
	}, 3000);
}

//   Instanciar UI
const ui = new UI();

//   EventListeners
document.addEventListener('DOMContentLoaded', () => {
	ui.llenarOpciones(); //  Llena el select de years
});

eventListeners();
function eventListeners() {
	const formulario = document.querySelector('#cotizar-seguro');
	formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
	e.preventDefault();

	//   Leer la marca seleccionada
	const marca = document.querySelector('#marca').value;

	//   Leer el year
	const year = document.querySelector('#year').value;

	//   Leer cobertura
	const tipo = document.querySelector('input[name="tipo"]:checked').value;

	if (marca === '' || year === '' || tipo === '') {
		ui.mostrarMensaje('No puede dejar campos sin seleccionar', 'error');
		return;
	}

	ui.mostrarMensaje('Cotizando', 'correcto');

	//	Ocultar los resultados anteriores
	const resultado = document.querySelector('#resultado div');
	if( resultado != null ){
		resultado.remove();
	}

	//   Instanciar el seguro
	const seguro = new Seguro(marca, year, tipo);
	const total = seguro.cotizarSeguro();

	ui.mostrarResultado(total, seguro);
}
