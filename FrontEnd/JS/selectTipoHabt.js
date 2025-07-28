
async function consultarApi(){
    await fetch('http://127.0.0.1:8000/consultar_tipo_habt')
    .then(respuesta =>{
        if(!respuesta.ok){
            throw new Error("Error no se encotro la APi")
        }
        return respuesta.json()
    })
    .then(data =>{
        console.log(data)
        let select=document.getElementById('habt_type')
        for(let i of data){
            select.innerHTML += `<option value="${i.id_tipo}">${i.nombre}</option>`
        }
    })
    .catch(error=>{
        console.log("El error es ",error)
    })
}

consultarApi()
