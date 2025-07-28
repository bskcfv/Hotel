document.addEventListener('DOMContentLoaded', function(){
    async function buscarhotel(event) {
        event.preventDefault()
        const filtro = document.getElementById('filtro').value

        try{
            const respuesta = await fetch(`http://127.0.0.1:8000/filterHotel/${filtro}`)
            if(respuesta.ok){
                const Hotel = await respuesta.json()
                console.log(Hotel)
                const resultados = document.getElementById('seccion3')
                resultados.innerHTML = ``;
                for (let i of Hotel){
                    resultados.innerHTML += `
                    <div id="hotel_box">
                        <button class="button_hotel" id="id_openhotel" data-value="${i.id_hotel}">
                            <div id="text">
                                <h5>Hotel: ${i.nombre}</h5>
                                <p>Ciudad: ${i.ciudad}</p>
                                <p>Valoracion: ${i.valoracion} Estrellas</p>
                            </div>
                            <div id="logo">
                                <img src="${i.imagen}">
                            </div>
                        </button>
                    </div>`}
                document.querySelectorAll('#id_openhotel').forEach(button => {
                    button.addEventListener('click', function () {
                        const idHotel = this.getAttribute('data-value');
                        window.location.href = `habitaciones.html?id=${idHotel}`;
                    });
                });
                
            }
            else{
                const errorrespuesta = await respuesta.json() 
                console.error(errorrespuesta)
            }
        }
        catch(error){
            console.error("El error en la consulta es: ", error)
        }
    }
    document.getElementById("formBusqueda").addEventListener("submit", buscarhotel)

})