document.addEventListener('DOMContentLoaded', function(){
    const formReserva = document.getElementById('formreserva')

    formReserva.addEventListener('submit', async(event)=>{
        alert("Verificando")
        event.preventDefault();
        const frmdata = new FormData(formReserva)
        const data = Object.fromEntries(frmdata.entries())

        try {
            const respuesta = await fetch('http://127.0.0.1:8000/insertar_reserva',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(data)
            })
            if(respuesta.ok){
                const respuestaApi = await respuesta.json()
                console.log('Respuesta de la API', respuestaApi)
                Swal.fire({
                    title: "Reserva Registrada",
                    text: "Los datos se guardaron el base de datos",
                    icon: "success",
                    draggable: true,
                    confirmButtonText:'OK'
                    });
            }
            else{
                console.error("Error en la solicitud ", respuesta.status)
                Swal.fire({
                    title: "No se ha registrado",
                    text: "Hubo problemas al Reservar",
                    icon: "error",
                    draggable: true,
                    confirmButtonText:'Intentar de nuevo'
                });
            }
        } catch (error) {
            console.error("Error en la solicitud ", error)
        }
    })
})