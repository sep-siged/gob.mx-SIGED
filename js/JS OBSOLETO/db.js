// *************** DOCUMENTOS.HTML ***************

// SEARCH FILTER
function searchFilter() {
let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("form-data");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
    txtValue = td.textContent || td.innerText;
    // console.log(txtValue)
if (txtValue.toUpperCase().indexOf(filter) > -1) {
    tr[i].style.display = "";
} else {
    tr[i].style.display = "none";
}
}       
}
}
//  ****************************************************** 
//  ****************************************************** 

// COVERTING HTML TABLE TO ARRAY (JQUERY LIBRARY SCRIPT)
var rows = [].slice.call($('table')[0].rows) 
var keys = [].map.call(rows.shift().cells, function(e) { 
    return e.textContent.replace(/\s/g, '') 
}) 
var persons = rows.map(function(row) { 
    return [].reduce.call(row.cells, function(o, e, i) { 
        o[keys[i]] = e.textContent 
        return o 
        }, {}) }) 
        console.log(persons)  
//  ******************************************************    
//  ******************************************************   

// GETTING AND PLACING THE SEARCHED INFO "FUNCTION* ON LOAD PAGE
window.onload = function getVal() { 
// GETTING VALUE FROM INPUT TEXT ELEMENT BY KEYUP FUNCTION
const val = document.querySelector('input[name="folio"]').value;
// console.log(val);
// GETTING ADJACENT VALUE ACCORDING TO SERCH CRITERIA
let person = persons.find(person => person.ID === val);

//  PLACING ARRAY VALUES INTO AN HTML ELEMENT BY ID BASED ON SEARCH CRITERIA
if (person === undefined)
{
    return;
}
document.getElementById("invoice_").innerHTML = person.ID;
document.getElementById("name_").innerHTML = person.NOMBRE;
document.getElementById("authority_").innerHTML = person.AUTORIDAD;
document.getElementById("promedy_").innerHTML = person.PROMEDIO;
document.getElementById("promedy2_").innerHTML = person.PROMEDIO2;
document.getElementById("date_").innerHTML = person.FECHA + " " + person.HORA;   

console.log(person.ID);
console.log(person.NOMBRE);
console.log(person.AUTORIDAD);
console.log(person.PROMEDIO);
console.log(person.PROMEDIO2);
console.log(person.FECHA); 
console.log(person.HORA);
console.log(document.getElementById("invoice_").innerHTML + " " + "TEST 1");

// THIS CODE SHOWS ELEMENTONLY WHEN IT FITS WITH THE CONDITION
if (val.length = 36) {
document.getElementById('showVal_').style.display = "block";
document.getElementById('hideInfo').style.display = "none";
document.getElementById('showVal_').style.marginTop = '40px';
console.log(val.length);
return;
} else if (val.length != 36) {
document.getElementById('showVal_').style.display = "none";
document.getElementById('hideInfo').style.display = "flex";
console.log(val.length);
return;
} else {
document.getElementById('showVal_').style.display = "none";
document.getElementById('hideInfo').style.display = "flex";
console.log(val.length);
}

}

// GETTING AND PLACING THE SEARCHED INFO "FUNCTION* ON CLICK BUTTON
function getVal2() { 
// GETTING VALUE FROM INPUT TEXT ELEMENT BY KEYUP FUNCTION
const val = document.querySelector('input[name="folio"]').value;
// console.log(val);
// GETTING ADJACENT VALUE ACCORDING TO SERCH CRITERIA
let person = persons.find(person => person.ID === val);

//  PLACING ARRAY VALUES INTO AN HTML ELEMENT BY ID BASED ON SEARCH CRITERIA
if (person === undefined)
{
    return;
}
document.getElementById("invoice_").innerHTML = person.ID;
document.getElementById("name_").innerHTML = person.NOMBRE;
document.getElementById("authority_").innerHTML = person.AUTORIDAD;
document.getElementById("promedy_").innerHTML = person.PROMEDIO;
document.getElementById("promedy2_").innerHTML = person.PROMEDIO2;
document.getElementById("date_").innerHTML = person.FECHA + " " + person.HORA;      

}




