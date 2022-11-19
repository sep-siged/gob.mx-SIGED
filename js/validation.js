// *************** DOCUMENTOS.HTML ***************

// THIS CODE CONTROLS THE SHOW/HIDE BEHAVIOR OF THE VALIDATION MODULE

const showVal = document.getElementById('showVal'); 
const showVal_ = document.getElementById('showVal_'); 
const hideInfo = document.getElementById('hideInfo'); 

showVal.addEventListener('click', required);
function required()
{
    let empt = document.form.folio.value;
    if (empt === "")
    {
        // alert("No ha ingresado un folio SEP");
        document.getElementById('dialog-box1').style.display = "flex"; 
        return;
    }
    if (empt.length != 36)
    {
        // alert("Ingrese un folio SEP válido");
        document.getElementById('dialog-box2').style.display = "flex"; 
        return;
    }
    if (empt != document.getElementById("invoice_").innerHTML)
    {   
        
        document.getElementById("loader").style.display = "flex";
        setTimeout(function(){
        document.getElementById("loader").style.display = "none"; }, 2000);
        setTimeout(function(){
        document.getElementById('dialog-box3').style.display = "flex"; }, 3000);
        return;
    }
    
    window.setTimeout(() =>
    {
    // 👇️ show div 
        showVal_.style.display = 'block';
        showVal_.style.marginTop = '40px';
    // 👇️ hide div 
        hideInfo.style.display = 'none';
    },3000);

    setTimeout(function() { 
        window.scrollTo(0, 570); }, 3000);

};

// IT CLOSES THE DIALOG EVENT BY PUSHING "OK" BUTTON
function pushOk1() { 
    document.getElementById('dialog-box1').style.display = "none"; 
    }
function pushOk2() { 
    document.getElementById('dialog-box2').style.display = "none"; 
    }
function pushOk3() { 
    document.getElementById('dialog-box3').style.display = "none"; 
    }

// HIDE VALIDATION MODULE
const hideVal = document.getElementById('hideVal'); 
hideVal.addEventListener('click', () => { 
// 👇️ hide div 
const showVal_ = document.getElementById('showVal_'); 
showVal_.style.display = 'none';
// 👇️ hide div 
const hideBox_ = document.getElementById('form-reg'); 
hideBox_.style.display = 'none';
// 👇️ show div 
const hideInfo = document.getElementById('hideInfo'); 
hideInfo.style.display = 'flex';
});

// ***********************************************************

// THIS CODE ENABLES THE DATA DELETION USING "RESET BUTTON"
function erase() {
    // document.getElementById("hideVal").click();
    // localStorage.clear();
    localStorage.removeItem('fullName');
    localStorage.removeItem('invoiceData');
    localStorage.removeItem('dateData');
    
    document.getElementById("name_").innerHTML = "";
    document.getElementById("invoice_").innerHTML = "";
    document.getElementById("date_").innerHTML = "";

    document.getElementById('getName').value = ""
    document.getElementById('getInvoice').value = "" 
    document.getElementById('getDate').value = ""
}

