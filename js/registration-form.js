// *************** DOCUMENTOS.HTML ***************

// CODE TO GET DATA SAVE IT TO LOCAL STORAGE AND PUT IT IN AN ITEM  (IN DISUSE)

function send() {
let nombre = document.getElementById('getName').value;
console.log(nombre);
// SUSTITUIR EL TEXTO CON EL NOMBRE COMPLETO
// localStorage.setItem('fullName', 'ESCRIBE AQUÍ EL NOMBRE');
localStorage.setItem('fullName', nombre);
console.log(localStorage.getItem('fullName'));

const full_name = localStorage.getItem('fullName');

// INSERCIÓN MEDIANTE MÉTODO TEXTCONTENT-APPENDCHILD
const insertName = document.querySelector('#name_');
const newName = document.createElement('p');
newName.textContent = full_name;
insertName.appendChild(newName);

// *************************************************************
let cadena = document.getElementById('getInvoice').value;
console.log(cadena);
// SUSTITUIR EL TEXTO CON EL NOMBRE COMPLETO
// localStorage.setItem('fullName', 'ESCRIBE AQUÍ EL NOMBRE');
localStorage.setItem('invoiceData', cadena);
console.log(localStorage.getItem('invoiceData'));

const full_invoice = localStorage.getItem('invoiceData');

// INSERCIÓN MEDIANTE MÉTODO TEXTCONTENT-APPENDCHILD
const insertInvoice = document.querySelector('#invoice_');
const newInvoice = document.createElement('p');
newInvoice.textContent = full_invoice;
insertInvoice.appendChild(newInvoice);

// *************************************************************
let fecha = document.getElementById('getDate').value;
console.log(fecha);
// SUSTITUIR EL TEXTO CON EL NOMBRE COMPLETO
// localStorage.setItem('fullName', 'ESCRIBE AQUÍ EL NOMBRE');
localStorage.setItem('dateData', fecha);
console.log(localStorage.getItem('dateData'));

const full_date = localStorage.getItem('dateData');

// INSERCIÓN MEDIANTE MÉTODO TEXTCONTENT-APPENDCHILD
const insertDate = document.querySelector('#date_');
const newDate = document.createElement('p');
newDate.textContent = full_date;
insertDate.appendChild(newDate);

document.getElementById("showVal").click();

let inputValue = document.getElementById("form-data");
inputValue.value = full_invoice;

// setTimeout(function() { 
//     window.scrollTo(0, 850); }, 3000);
}
// *************************************************************
const full_name_ = localStorage.getItem('fullName');

// INSERCIÓN MEDIANTE MÉTODO INNERHTML
document.getElementById('getName').value = full_name_;
document.getElementById("name_").innerHTML = full_name_;

// *************************************************************
const full_invoice_ = localStorage.getItem('invoiceData');

// INSERCIÓN MEDIANTE MÉTODO INNERHTML
document.getElementById('getInvoice').value = full_invoice_;
document.getElementById("invoice_").innerHTML = full_invoice_;

// *************************************************************
const full_date_ = localStorage.getItem('dateData');

// INSERCIÓN MEDIANTE MÉTODO INNERHTML
document.getElementById('getDate').value = full_date_;
document.getElementById("date_").innerHTML = full_date_;

// *************************************************************


// FUNCIÓN PARA MOSTRAR Y OCULTAR FORMULARIO 
function handleShowBox(elementId) { 
    const element = document.getElementById('form-reg'); 
    if (element.style.display === "flex") 
    { element.style.display = "none"; 
} else { element.style.display = "flex"; } }

// *************************************************************
// THIS CODE ALLOWS A BUTTON TO EXECUTE THE FUNCTION OF ANOTHER BUTTON
function buttonTrigger() {
    document.getElementById("hideVal").click();
}