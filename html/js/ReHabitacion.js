document.addEventListener('DOMContentLoaded', function(){

    const formularioHabitacion = document.getElementById('formhabitacion')

    formularioHabitacion.addEventListener('submit', async(event)=>{
        alert("Verificando")
        event.preventDefault();
        const frmdata = new FormData(formularioHabitacion)
        const data = Object.fromEntries(frmdata.entries())

        try {
            const respuesta = await fetch('http://127.0.0.1:8000/insertar_habitacion', {
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
                    title: "Habitacion Registrada",
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
                    text: "Hubo problemas al registrar",
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