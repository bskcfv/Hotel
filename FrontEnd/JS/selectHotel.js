
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
        let select=document.getElementById('hotel_choosen')
        for(let i of data){
            select.innerHTML += `<option value="${i.id_hotel}">${i.nombre}</option>`
        }
    })
    .catch(error=>{
        console.log("El error es ",error)
    })
}

consultarApi()