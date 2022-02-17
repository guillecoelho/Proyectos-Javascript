/*
     Hecho por: Guillermo Coelho
     Fecha: 17/02/2022
*/

//   Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

//   Eventos
eventListeners();
function eventListeners(){
     document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

     formulario.addEventListener('submit', agregarGasto);
}

//   Clases
class Presupuesto{
     constructor(presupuesto){
          this.presupuesto = Number(presupuesto);
          this.restante = Number(presupuesto);
          this.gastos = [];
     }

     nuevoGasto(gasto){
          this.gastos = [...this.gastos, gasto];

          this.calcularRestante();
     }

     calcularRestante(){
          const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0); // Reduce itera en el array

          this.restante = this.presupuesto - gastado;
     }

     eliminarGasto(id){
          this.gastos = this.gastos.filter( gasto => gasto.id !== id );

          this.calcularRestante();
     }
}

class UI{
     insertarPresupuesto(cantidad){
          const {presupuesto, restante} = cantidad;
          document.querySelector('#total').textContent = presupuesto;
          document.querySelector('#restante').textContent = presupuesto;
     }

     imprimirAlerta(mensaje, tipo){
          const divMensaje = document.createElement('div');
          divMensaje.classList.add('text-center', 'alert');

          if( tipo === 'error' ){
               divMensaje.classList.add('alert-danger');
          }else{
               divMensaje.classList.add('alert-success');
          }

          divMensaje.textContent = mensaje;

          document.querySelector('.primario').insertBefore(divMensaje, formulario);

          setTimeout(() => {
               divMensaje.remove();
          }, 3000);
     }

     agregarGastoListado(gastos){
          //   Limpio los HTML previos
          this.limpiarHtml();

          gastos.forEach(gasto => {
               const {cantidad, nombre, id} = gasto;

               //   Crear LI
               const nuevoGasto = document.createElement('li');
               nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
               nuevoGasto.dataset.id = id;

               //   Insertar en HTML de gasto
               nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad} </span>`;

               //   Boton de borrar el gasto
               const btnBorrar = document.createElement('button');
               btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
               btnBorrar.textContent = 'Borrar';
               btnBorrar.onclick = () => {
                    eliminarGasto(id);
               }

               nuevoGasto.appendChild(btnBorrar);

               //   Agregar al HTML
               gastoListado.appendChild(nuevoGasto);
          })
     }

     //   Limpiar el HTML
     limpiarHtml() {
          while (gastoListado.firstChild) {
               gastoListado.removeChild(gastoListado.firstChild);
          }
     }

     actualizarRestante(restante){
          document.querySelector('#restante').textContent = restante;
     }

     comprobarRestante(presupuestoObj){
          const {presupuesto, restante} = presupuestoObj;

          const restanteDiv = document.querySelector('.restante');

          if( (presupuesto / 4) >= restante ){ // 25%
               restanteDiv.classList.remove('alert-success', 'alert-warning');
               restanteDiv.classList.add('alert-danger');
          }else if( (presupuesto / 2) >= restante ){ // 50%
               restanteDiv.classList.remove('alert-success', 'alert-danger');
               restanteDiv.classList.add('alert-warning');
          }else{
               restanteDiv.classList.remove('alert-danger', 'alert-warning');
               restanteDiv.classList.add('alert-success');
          }

          if(restante <= 0){
               ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
               formulario.querySelector('button[type="submit"]').disabled = true;
          }
     }
}

//   Instancias de las clases
const ui = new UI();
let presupuesto;

//   Funciones
function preguntarPresupuesto(){
     const presupuestoUsuario = prompt('Cual es tu presupuesto?');

     if( presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ){
          window.location.reload();
     }

     presupuesto = new Presupuesto(presupuestoUsuario, presupuestoUsuario);

     ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e){
     e.preventDefault();

     //   Leer datos del formulario
     const nombre = document.querySelector('#gasto').value;
     const cantidad = Number(document.querySelector('#cantidad').value);

     //   Validar campos
     if( nombre === '' || cantidad === '' ){
          ui.imprimirAlerta('Ambos campos son obligatorios', 'error');

          return;
     }else if( cantidad <= 0 || isNaN(cantidad) ){
          ui.imprimirAlerta('Cantidad no valida', 'error');

          return;
     }

     const gasto = {nombre, cantidad, id: Date.now()};

     presupuesto.nuevoGasto(gasto);

     const {gastos, restante} = presupuesto;

     ui.agregarGastoListado(gastos);

     ui.actualizarRestante(restante);

     ui.comprobarRestante(presupuesto);

     ui.imprimirAlerta('Agregado con exito', '');

     formulario.reset();
}

function eliminarGasto(id){
     //   Elimino el gasto del array
     presupuesto.eliminarGasto(id);

     //   Actualizo el HTML con el nuevo array
     const {gastos, restante} = presupuesto;
     ui.agregarGastoListado(gastos);

     //   Actualizo el restante
     ui.actualizarRestante(restante);

     ui.comprobarRestante(presupuesto);
}