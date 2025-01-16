document.addEventListener('DOMContentLoaded', function(){
async function consultarApi(){
    await fetch('http://127.0.0.1:8000/consultarhotel')
    .then(respuesta =>{
        if(!respuesta.ok){
            throw new Error("Error no se encotro la APi")
        }
        return respuesta.json()
    })
    .then(data =>{
        console.log(data)
        let section=document.getElementById('seccion3')
        for(let i of data){
            section.innerHTML += `<div id="hotel_box">
                                <button class="button_hotel" id="id_openhotel" data-value="${i.id_hotel}">
                                <div id="text">
                                <h5>Hotel: ${i.nombre}</h5>
                                <p>Ciudad: ${i.ciudad}</p>
                                <p>Valoracion: ${i.valoracion} Estrellas</p>
                                </div>
                                <div id="logo">
                                <img src="${i.imagen}"></div>
                                </button>
                                </div>`
        }
        document.querySelectorAll('#id_openhotel').forEach(button => {
            button.addEventListener('click', function () {
                const idHotel = this.getAttribute('data-value');
                window.location.href = `habitaciones.html?id=${idHotel}`;
            });
        });
    })
    .catch(error=>{
        console.log("El error es ",error)
    })
}

consultarApi()

})
