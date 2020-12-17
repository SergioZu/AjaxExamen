window.onload = () => {
    document.getElementById("botonVisualizar").addEventListener("click", menu, false);
    document.getElementById("botonInsertar").addEventListener("click", menu, false);
    document.getElementById("botonBorrar").addEventListener("click", menu, false);
    document.getElementById("botonModificar").addEventListener("click", menu, false);
    selectAnimal();
};



function menu(event) {
    let url = "http://localhost:3000/animales";
    switch (event.target.value) {
        case "Visualizar Animales":
            realizarVisualiacion(url);
            break;
        case "Insertar Animal":
            realizarInsertar(url);
            break;
        case "Borrar Animales":
            realizarBorrar();
            break;
        case "Modificar Animal":
            realizarMoficacion()
            break;
        case "Comprobar Animal":
            realizarComprobacion();
        case "Select Animal":
            selectAnimal()();
        default:
            break;
    }

}

function realizarVisualiacion(url) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return "Ago ha ido mal: Error HTTP:" + response.status + "(" + response.statusText + ")";
            }
        })
        .then(datosAnimal => visualizarAnimales(datosAnimal))
        .catch(error => console.log(error));
}

function visualizarAnimales(datosAnimal) {
    let array=datosAnimal;
    console.log(array.length);
    let parrafo = document.getElementById("parrafo1");
    parrafo.innerHTML = "";
    datosAnimal.forEach(animal => {
        parrafo.innerHTML += "<p>" + animal.id + " " + animal.Tipo + " " + animal.Nombre + "<p>";
    });

}

function realizarInsertar(url) {
    let parrafo = document.getElementById("parrafo1");
    parrafo.innerHTML = "";

    let datosObjeto = {
        Tipo: "Tiburon",
        Nombre: "PedroPo",
        Observacion: "Es mayor",
        Ubicacion: "En el Fifa",
        Rasgos: "Pelo oscuro y corto, no tiene colas",
        Imagen: ""

    };

    let init = {
        method: 'POST',
        body: JSON.stringify(datosObjeto),
        headers: { 'Content-Type': 'application/json' }
    };

  
            fetch(url, init)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return "Ago ha ido mal: Error HTTP:" + response.status + "(" + response.statusText + ")";
                    }
                })
                .then(animal => alert(animal.Nombre + " ha sido añadido"))
                .catch(error => console.log(error));
        

    
}
/*Insertar con comprobacion doble

function realizarInsertar(url) {
    let parrafo = document.getElementById("parrafo1");
    parrafo.innerHTML = "";

    let datosObjeto = {
        Tipo: "Tiburon",
        Nombre: "PedroPo",
        Observacion: "Es mayor",
        Ubicacion: "En el Fifa",
        Rasgos: "Pelo oscuro y corto, no tiene colas",
        Imagen: ""

    };

    let init = {
        method: 'POST',
        body: JSON.stringify(datosObjeto),
        headers: { 'Content-Type': 'application/json' }
    };

    let arrayNombre = [];
    let arrayTipo = [];

    datosAnimal.forEach(animal => {
        arrayNombre.push(animal.Nombre);
        arrayTipo.push(animal.Tipo);
    });

    //con el indexOf te da la posicion del elemento arrayNombre.indexOf("PedroPo")
    if (arrayNombre.includes("PedroPo")) {
        alert("Este animal ya esta");
    } else {
        let index = arrayNombre.indexOf("PedroPo");
        if (arrayTipo[index] == "Tiburon") {
            alert("Este animal ya esta");
        } else {
            fetch(url, init)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return "Ago ha ido mal: Error HTTP:" + response.status + "(" + response.statusText + ")";
                    }
                })
                .then(animal => alert(animal.Nombre + " ha sido añadido"))
                .catch(error => console.log(error));
        }

    }
}
*/

function realizarBorrar() {

    let parrafo = document.getElementById("parrafo1");
    parrafo.innerHTML = "";

    let id = 18;

    let url = "http://localhost:3000/animales/" + id;

    let init = {
        method: 'DELETE',
        body: "",
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(url, init)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return "Ago ha ido mal: Error HTTP:" + response.status + "(" + response.statusText + ")";
            }
        })
        .then(datosAnimal => alert(id + " ha sido borrado"))
        .catch(error => console.log(error));
}

function realizarMoficacion() {

    let parrafo = document.getElementById("parrafo1");
    parrafo.innerHTML = "";

    let id = 99;

    let url = "http://localhost:3000/animales/" + id;

    let datosAnimal = {
        Tipo: "Serpiente",
        Nombre: "SergioPo",
        Observacion: "Es mayor",
        Ubicacion: "En el Fifa",
        Rasgos: "Pelo oscuro y corto, no tiene colas",
        Imagen: ""

    };

    let init = {
        method: 'PUT',
        body: JSON.stringify(datosAnimal),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(url, init)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return "Ago ha ido mal: Error HTTP:" + response.status + "(" + response.statusText + ")";
            }
        })
        .then(datosAnimal => alert(id + " ha sido modificado"))
        .catch(error => console.log(error));
}

function selectAnimal(){
    let url="http://localhost:3000/animales"

    fetch(url)
        .then(response=>{
            if(response.ok){
                return response.json();
            }else{
                return "Ago ha ido mal: Error HTTP:" + response.status + "(" + response.statusText + ")";
            }
        })
        .then(datosAnimal=>visualizarSelectAnimales(datosAnimal))
        .catch(error=>console.log(error));
}


function visualizarSelectAnimales(datosAnimal){
    let select=document.getElementById("selectAnimal");

    datosAnimal.forEach(animal=>{
        select.innerHTML+=" <option value='"+animal.Nombre+"'>"+animal.Nombre+"</option>"
        console.log(select.value);
    })
}