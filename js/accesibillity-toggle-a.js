// *************** INDEX.HTML & DOCUMENTOS.HTML ***************

// ACCESIBILLITY MENU (BIG SCREENS)

const toggle1 = document.getElementById('toggle1'); 
toggle1.addEventListener('click', () => { 
// 👇️ hide button 
toggle1.style.visibility = 'hidden';
});
const toggle2 = document.getElementById('toggle2'); 
toggle2.addEventListener('click', () => { 
toggle1.style.visibility = 'visible';
});

const toggle3 = document.getElementById('toggle3'); 
toggle3.addEventListener('click', () => { 
// 👇️ hide button 
toggle3.style.visibility = 'hidden'; 
});
const toggle4 = document.getElementById('toggle4'); 
toggle4.addEventListener('click', () => { 
toggle3.style.visibility = 'visible'; 
});

const toggle5 = document.getElementById('toggle5'); 
toggle5.addEventListener('click', () => { 
// 👇️ hide button 
toggle5.style.visibility = 'hidden'; 
});
const toggle6 = document.getElementById('toggle6'); 
toggle6.addEventListener('click', () => { 
toggle5.style.visibility = 'visible'; 
});

const toggle7 = document.getElementById('toggle7'); 
toggle7.addEventListener('click', () => { 
// 👇️ hide button 
toggle7.style.visibility = 'hidden'; 
});
const toggle8 = document.getElementById('toggle8'); 
toggle8.addEventListener('click', () => { 
toggle7.style.visibility = 'visible'; 
});

const toggle9 = document.getElementById('toggle9'); 
toggle9.addEventListener('click', () => { 
// 👇️ hide button 
toggle9.style.visibility = 'hidden'; 
});
const toggle10 = document.getElementById('toggle10'); 
toggle10.addEventListener('click', () => { 
toggle9.style.visibility = 'visible'; 
});

const toggle11 = document.getElementById('toggle11'); 
toggle11.addEventListener('click', () => { 
// 👇️ hide button 
toggle11.style.visibility = 'hidden'; 
});
const toggle12 = document.getElementById('toggle12'); 
toggle12.addEventListener('click', () => { 
toggle11.style.visibility = 'visible'; 
});

const toggle13 = document.getElementById('toggle13'); 
toggle13.addEventListener('click', () => { 
// 👇️ hide button 
toggle13.style.visibility = 'hidden'; 
});
const toggle14 = document.getElementById('toggle14'); 
toggle14.addEventListener('click', () => { 
toggle13.style.visibility = 'visible'; 
});

const toggle15 = document.getElementById('toggle15'); 
toggle15.addEventListener('click', () => { 
// 👇️ hide button 
toggle15.style.visibility = 'hidden'; 
});
const toggle16 = document.getElementById('toggle16'); 
toggle16.addEventListener('click', () => { 
toggle15.style.visibility = 'visible'; 
});

const toggle17 = document.getElementById('toggle17'); 
toggle17.addEventListener('click', () => { 
// 👇️ hide button 
toggle17.style.visibility = 'hidden'; 
});
const toggle18 = document.getElementById('toggle18'); 
toggle18.addEventListener('click', () => { 
toggle17.style.visibility = 'visible'; 
});

const toggle19 = document.getElementById('toggle19'); 
toggle19.addEventListener('click', () => { 
// 👇️ hide button 
toggle19.style.visibility = 'hidden'; 
});
const toggle20 = document.getElementById('toggle20'); 
toggle20.addEventListener('click', () => { 
toggle19.style.visibility = 'visible'; 
});

// TOGGLES COLOR OF AN .SVG ELEMENT
function callcolor() {
    document.getElementById('color-change').classList.toggle("forcecolor");
}
// function callcolor1() {
//     document.getElementById('color-change1').classList.toggle("forcecolor1");
// }

function handleShowElement(elementId) { 
  const element = document.getElementById('show-accesibillity'); 
  if (element.style.display === "block") 
  { element.style.display = "none"; 
} else { element.style.display = "block"; } }



