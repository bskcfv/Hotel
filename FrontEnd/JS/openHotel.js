const urlParams = new URLSearchParams(window.location.search);
const idHotel = urlParams.get('id');
        
async function obtenerHabitaciones() {
    try {
        const respuesta = await fetch(`http://127.0.0.1:8000/consultarhabitacion_by_idhotel/${idHotel}`);
        if (respuesta.ok) {
            const habitaciones = await respuesta.json();
            console.log(habitaciones);
            const habitacionesContainer = document.getElementById('habitaciones');
            habitacionesContainer.innerHTML = ``;

            habitaciones.forEach(habitacion => {
                console.log(habitacion);
                habitacionesContainer.innerHTML += `
                    <div>
                        <button id="select_habitacion" data-value="${habitacion.id_habitacion}">
                            <h2>${habitacion.no_habitacion}</h2>
                            <p>Tipo: ${habitacion.fk_id_tipo}</p>
                            <p>Estado: ${habitacion.estado}</p>
                            <p>Precio: $${habitacion.precio}</p>
                        </button>
                    </div>
                        `;
                    });
            document.querySelectorAll('#select_habitacion').forEach(button =>{
                button.addEventListener('click', function(){
                    const id_habitacion = this.getAttribute('data-value');
                    window.location.href = `Reservar.html?id=${id_habitacion}`;
                    });
                });
            } 
            else {
                console.error('No se encontraron habitaciones para este hotel.');
                }
            } 
            catch (error) {
                console.error('Error al obtener las habitaciones:', error);
            }
        }

obtenerHabitaciones();