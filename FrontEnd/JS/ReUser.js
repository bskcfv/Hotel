document.addEventListener('DOMContentLoaded', function(){

    const formularioUser = document.getElementById('formUser')

    formularioUser.addEventListener('submit', async(event)=>{
        alert("Verificando")
        event.preventDefault();
        const frmdata = new FormData(formularioUser)
        const data = Object.fromEntries(frmdata.entries())

        try {
            const respuesta = await fetch('http://127.0.0.1:8000/insertar_user', {
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
                    title: "User Registrado",
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