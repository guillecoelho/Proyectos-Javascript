/*
     Hecho por: Guillermo Coelho
     Fecha: 19/02/2022
*/

//   Variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//   UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

//   Objeto con datos de la cita
const citaObj = {
     mascota: '',
     propietario: '',
     telefono: '',
     fecha: '',
     hora: '',
     sintomas: ''
}

//   Clases
class UI{
     mostrarMensaje(mensaje, tipo){
          const divMensaje = document.createElement('div');
          divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12', 'font-weight-bolder');

          if(tipo === 'error'){
               divMensaje.classList.add('alert-danger');
          }else{
               divMensaje.classList.add('alert-success');
          }

          divMensaje.textContent = mensaje;

          document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

          setTimeout(() => {
               divMensaje.remove();
          }, 3000);
     }

     limpiarHTML(){
          while (contenedorCitas.firstChild) {
               contenedorCitas.removeChild(contenedorCitas.firstChild);
          }
     }

     imprimirCitas({citas}){ // Aplico destructuring dentro de los parametros de la funcion
          ui.limpiarHTML();

          citas.forEach(cita => {
               const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

               const divCita = document.createElement('div');
               divCita.classList.add('cita', 'p-3');
               divCita.dataset.id = id;

               //   Scripting de los elementos de la cita
               const mascotaParrafo = document.createElement('h2');
               mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
               mascotaParrafo.textContent = mascota;

               const propietarioParrafo = document.createElement('p');
               propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

               const telefonoParrafo = document.createElement('p');
               telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono: </span> ${telefono}`;

               const fechaParrafo = document.createElement('p');
               fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

               const horaParrafo = document.createElement('p');
               horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

               const sintomasParrafo = document.createElement('p');
               sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`;

               //   Boton de eliminar
               const btnEliminar = document.createElement('button');
               btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
               btnEliminar.textContent = `Eliminar`;
               btnEliminar.onclick = () => eliminarCita(id);

               //   Boton de editar
               const btnEditar = document.createElement('button');
               btnEditar.classList.add('btn', 'btn-primary', 'mr-2');
               btnEditar.textContent = `Editar`;
               btnEditar.onclick = () => editarCita(cita);

               divCita.appendChild(mascotaParrafo);
               divCita.appendChild(propietarioParrafo);
               divCita.appendChild(telefonoParrafo);
               divCita.appendChild(fechaParrafo);
               divCita.appendChild(horaParrafo);
               divCita.appendChild(sintomasParrafo);
               divCita.appendChild(btnEditar);
               divCita.appendChild(btnEliminar);

               contenedorCitas.appendChild(divCita);
          });
     }
}

class Citas{
     constructor(){
          this.citas = [];
     }

     crearCita(cita){
          this.citas = [...this.citas, cita];

          console.log(this.citas);
     }

     eliminarCita(id){
          this.citas = this.citas.filter( cita => cita.id !== id );
     }

     editarCita(citaActualizada){
          this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita );
     }
}

const ui = new UI();
const administrarCitas = new Citas();

//   Event Listeners
eventListener();
function eventListener(){
     mascotaInput.addEventListener('input', datosCitas);
     propietarioInput.addEventListener('input', datosCitas);
     telefonoInput.addEventListener('input', datosCitas);
     fechaInput.addEventListener('input', datosCitas);
     horaInput.addEventListener('input', datosCitas);
     sintomasInput.addEventListener('input', datosCitas);

     formulario.addEventListener('submit', nuevaCita);
}

//   Funciones
function datosCitas(e){
     citaObj[e.target.name] = e.target.value;
}

//   Valida y agrega nueva cita
function nuevaCita(e){
     e.preventDefault();

     //   Extraigo los datos del objeto
     const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

     //   Valido los campos
     if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ){
          ui.mostrarMensaje('Todos los campos son obligatorios', 'error');

          return;
     }

     if( editando ){
          administrarCitas.editarCita({...citaObj});

          ui.mostrarMensaje('Editado con exito', '');

          formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

          editando = false;
     }else{
          //   Generar un id
          citaObj.id = Date.now();

          //   Crear cita
          administrarCitas.crearCita({...citaObj});

          ui.mostrarMensaje('Se agrego con exito', '');
     }

     reiniciarObjeto();

     formulario.reset();

     //   Mostrar las citas en el HTML
     ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto(){
     citaObj.mascota = '';
     citaObj.propietario = '';
     citaObj.telefono = '';
     citaObj.fecha = '';
     citaObj.hora = '';
     citaObj.sintomas = '';
}

function eliminarCita(id){
     //   Eliminar la cita
     administrarCitas.eliminarCita(id);

     //   MostrarMensaje
     ui.mostrarMensaje('La cita ha sido eliminada', '');

     //   Actualizar contenedorcitas
     ui.imprimirCitas(administrarCitas);
}

function editarCita(cita){
     const {mascota, propietario, telefono, fecha, hora, sintomas} = cita;

     mascotaInput.value = mascota;
     propietarioInput.value = propietario;
     telefonoInput.value = telefono;
     fechaInput.value = fecha;
     horaInput.value = hora;
     sintomasInput.value = sintomas;

     citaObj.mascota = mascota;
     citaObj.propietario = propietario;
     citaObj.telefono = telefono;
     citaObj.fecha = fecha;
     citaObj.hora = hora;
     citaObj.sintomas = sintomas;

     formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

     editando = true;
}
