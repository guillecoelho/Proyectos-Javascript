/*
	Hecho por Guillermo Coelho
	Terminado: 25/07/2021
*/

//  Variables

const botonReset = document.querySelector('#resetBtn');
const botonEnviar = document.querySelector('#enviar');
const campoEmail = document.querySelector('#email');
const campoAsunto = document.querySelector('#asunto');
const campoMensaje = document.querySelector('#mensaje');
const formEmail = document.querySelector('#enviar-mail');

eventListeners();
function eventListeners() {
	//  Se inicia la pagina
	document.addEventListener('DOMContentLoaded', iniciar);

	// Campos del formulario
	campoEmail.addEventListener('blur', validarCampo);
	campoAsunto.addEventListener('blur', validarCampo);
	campoMensaje.addEventListener('blur', validarCampo);

	//  Botones
	botonReset.addEventListener('click', resetearCampos);

	//	Enviar Email
	formEmail.addEventListener('submit', enviarEmail);
}

//  Funciones

function iniciar() {
	botonEnviar.disable = true;
	botonEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarCampo(e) {
	if (e.target.value.length > 0) {
		const errores = document.querySelector('p.error');
		if (errores != null) {
			errores.remove();
		}

		e.target.classList.remove('border', 'border-red-500');
		e.target.classList.add('border', 'border-green-500');
	} else {
		e.target.classList.remove('border', 'border-green-500');
		e.target.classList.add('border', 'border-red-500');

		mostrarError('Todos los campos son obligatorios');
	}

	const er =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (
		er.test(campoEmail.value) &&
		campoEmail.value != '' &&
		campoAsunto.value != '' &&
		campoMensaje.value != ''
	) {
		botonEnviar.disable = false;
		botonEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
	} else if (!er.test(campoEmail.value)) {
		campoEmail.classList.remove('border', 'border-green-500');
		campoEmail.classList.add('border', 'border-red-500');
		mostrarError('Email no valido');
	}
}

function resetearCampos(e) {
	e.preventDefault();

	const campos = document.querySelectorAll('.border');

	campos.forEach((limpiar) => {
		limpiar.classList.remove('border', 'border-red-500', 'border-green-500');
	});

	formEmail.reset();

	botonEnviar.disable = true;
	botonEnviar.classList.add('cursor-not-allowed', 'opacity-50');

	const errores = document.querySelector('p.error');
	if (errores != null) {
		errores.remove();
	}
}

function enviarEmail(e) {
	e.preventDefault();

	const spinner = document.querySelector('#spinner');
	spinner.style.display = 'flex';

	const mensajeEnviado = document.createElement('p');
	mensajeEnviado.textContent = 'El mensaje fue enviado correctamente';
	mensajeEnviado.classList.add(
		'border',
		'border-green-500',
		'background-color-100',
		'text-green-500',
		'p-3',
		'mt-5',
		'text-center',
		'enviado'
	);

	const enviado = document.querySelectorAll('.enviado');

	setTimeout(() => {
		spinner.style.display = 'none';
		if (enviado.length === 0) {
			//formEmail.appendChild(mensajeEnviado);
			formEmail.insertBefore(mensajeEnviado, spinner);
		}

		setTimeout(() => {
			mensajeEnviado.remove();

			const campos = document.querySelectorAll('.border');

			campos.forEach((limpiar) => {
				limpiar.classList.remove(
					'border',
					'border-red-500',
					'border-green-500'
				);
			});

			formEmail.reset();

			iniciar();
		}, 5000);
	}, 3000);
}

function mostrarError(mensaje) {
	const mensajeError = document.createElement('p');
	mensajeError.textContent = mensaje;
	mensajeError.classList.add(
		'border',
		'border-red-500',
		'background-color-100',
		'text-red-500',
		'p-3',
		'mt-5',
		'text-center',
		'error'
	);

	const errores = document.querySelectorAll('.error');
	if (errores.length === 0) {
		formEmail.appendChild(mensajeError);
	}
}
