document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id_habitacion = urlParams.get('id');

    async function obtenerHabitacion() {
        try {
            const respuesta = await fetch(`http://127.0.0.1:8000/consultarhabitacion_by_id/${id_habitacion}`);
            if (respuesta.ok) {
                const habitacion = await respuesta.json();
                return Number(habitacion.precio);
            } else {
                console.error('No se encontraron detalles de habitaciones.');
                return null;
            }
        } catch (error) {
            console.error('Error al obtener las habitaciones:', error);
            return null;
        }
    }

    async function mostrarPrecio(event) {
        event.preventDefault();

        const precioHabitacion = await obtenerHabitacion();
        if (precioHabitacion === null) {
            alert('Error al obtener los datos de la habitación.');
            return;
        }

        const fechaEntrada = document.getElementById("dateinit").value;
        const fechaSalida = document.getElementById("dateend").value;

        const fechaInicio = new Date(fechaEntrada);
        const fechaFin = new Date(fechaSalida);

        const diferenciaDias = (fechaFin - fechaInicio) / (1000 * 3600 * 24);
        if (diferenciaDias <= 0) {
            alert("La fecha de salida debe ser posterior a la de entrada.");
            return;
        }
        
        const precioFinal = precioHabitacion * diferenciaDias;

        
        document.getElementById('calcular_precio').innerHTML = `   <label for="finalprice">Costo Final: ${precioFinal}</label>
        <input type="checkbox" name="precio" id="finalprice" value="${precioFinal}" checked>`;
        document.getElementById('subirfechainicio').innerHTML = ` <label for="fentrada">Fecha Entrada: ${fechaEntrada}</label>
        <input type="checkbox" id="fentrada" name="fecha_entrada" value="${fechaEntrada}" checked>`;
        document.getElementById('subirfechafinal').innerHTML = ` <label for="fsalida">Fecha Salida: ${fechaSalida}</label>
        <input type="checkbox" name="fecha_salida" id="fsalida" value="${fechaSalida}" checked>` ;
        document.getElementById('subirfk_id_habt').innerHTML = `<label for="fk_id_habt">Id Habitacion: ${id_habitacion}</label>
        <input type="checkbox" id="fk_id_habt" name="fk_id_habitacion" value="${id_habitacion}" checked>`;
    }

    async function iniciarSesion(event) {
        event.preventDefault();

        const correo = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const respuesta = await fetch(`http://127.0.0.1:8000/Login/${correo}/${password}`);
            if (respuesta.ok) {
                const usuario = await respuesta.json();
                document.getElementById('subirfk_id_user').innerHTML = ` <label for="fk_id_user">Documento del usuario: ${usuario.id_user}</label>
                <input type="checkbox" id="fk_id_user" name="fk_id_user" value="${usuario.id_user}" checked>`;
                Swal.fire({
                    title: "Felicidades",
                    text: "Ha iniciado Sesion",
                    icon: "success",
                    draggable: true,
                    confirmButtonText:'OK'
                    });
            } else {
                Swal.fire({
                    title: "Oops",
                    text: "Credenciales incorrectas",
                    icon: "error",
                    draggable: true,
                    confirmButtonText:'Intentar de nuevo'
                });
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    }

    document.getElementById("formcalcula").addEventListener("submit", mostrarPrecio);
    document.getElementById("login-form").addEventListener("submit", iniciarSesion);

});
