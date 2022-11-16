let cp = document.getElementById('inputCP')
let colonia = document.getElementById('inputColonia')
let URL_API = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code%40public&q=';
let URL_Paises = 'https://restcountries.com/v3.1/all';

fetch(URL_Paises)
.then(response => response.json())
.then(data_p => {
    let element1 = document.getElementById('inputPais')
    element1.innerHTML = "";
    for(var i = 0; i < data_p.length; i++) {
        element1.innerHTML += `<option value="${data_p[i].cca2}" selected>${data_p[i].translations.spa.common}</option>`
    }
})

cp.addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        let code = event.target.value; //Recupera el codigo postal
        let pais = document.getElementById('inputPais').value;  //Recupera el valor del pais
        getdata(URL_API + pais + "+" + code);
    }
})

function getdata(URL){
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        let element = document.getElementById('inputColonia')
        element.innerHTML = "";
        for(var i = 0; i < data.nhits; i++) {
            element.innerHTML += `<option value="${data.records[i].fields.place_name},${data.records[i].fields.admin_name2},${data.records[i].fields.admin_name1},${data.records[i].geometry.coordinates[0]},${data.records[i].geometry.coordinates[1]}"
            selected>${data.records[i].fields.place_name},
            ${data.records[i].fields.admin_name2}, ${data.records[i].fields.admin_name1}</option>`
        }
        console.log(data)
    })
}

colonia.addEventListener('click', (event) => {
    let cad = colonia.value.split(',')
    document.getElementById('inputEstado').value = cad[2];
    document.getElementById('inputLocalidad').value = cad[1];
    document.getElementById('inputMunicipio').value = cad[1];
    document.getElementById('inputGeoreferencia').value = cad[4] + ', ' + cad[3]
    console.log(cad)
})