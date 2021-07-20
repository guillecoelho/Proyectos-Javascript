// VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let productos = [];

cargarEventListeners();
function cargarEventListeners() {
	// Agrega un curso al presionar 'Agregar al carrito'
	listaCursos.addEventListener('click', agregarCurso);

	// Eliminar un curso
	carrito.addEventListener('click', eliminarCurso);

	// Vaciar el carrito
	vaciarCarrito.addEventListener('click', () => {
		productos = [];

		limpiarCarrito();
	});
}

function agregarCurso(e) {
	e.preventDefault();
	if (e.target.classList.contains('agregar-carrito')) {
		const curso = e.target.parentElement.parentElement;
		leerDatosCurso(curso);
	}
}

// Lee los datos del curso seleccionado y lo agrega al carrito
function leerDatosCurso(curso) {
	const datosCurso = {
		imagen: curso.querySelector('img').src,
		nombre: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1,
	};

	if (productos.some((dato) => dato.id == datosCurso.id)) {
		const pos = productos.findIndex((dato) => dato.id == datosCurso.id);
		console.log(productos[pos]);
		/* datosCurso.cantidad = productos[pos].cantidad + 1; */
		productos[pos].cantidad++;
		carritoHTML();
	} else {
		//Agrega articulos
		productos = [...productos, datosCurso];
		carritoHTML();
	}

	//Agrega articulos
	/* productos = [...productos, datosCurso];
	carritoHTML(); */
}

// Mostrar carrito
function carritoHTML() {
	//Limpiar el HTML
	limpiarCarrito();

	//Recorre el array y crea el html
	productos.forEach((curso) => {
		const { imagen, nombre, precio, cantidad, id } = curso;
		const row = document.createElement('tr');
		row.innerHTML = `
			<td><img src="${imagen}" width=100></td>
			<td>${nombre}</td>
			<td>${precio}</td>
			<td>${cantidad}</td>
			<td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
		`;
		// Agrega al carrito que se muestra
		contenedorCarrito.appendChild(row);
	});
}

function limpiarCarrito() {
	//Forma lenta
	//contenedorCarrito.innerHTML = ``;

	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}

// Eliminar un curso
function eliminarCurso(e) {
	if (e.target.classList.contains('borrar-curso')) {
		const idEliminar = e.target.getAttribute('data-id');
		const pos = productos.findIndex((dato) => dato.id == idEliminar);
		if (productos[pos].cantidad > 1) {
			productos[pos].cantidad--;
		} else {
			productos = productos.filter((curso) => curso.id !== idEliminar);
		}

		carritoHTML();
	}
}
