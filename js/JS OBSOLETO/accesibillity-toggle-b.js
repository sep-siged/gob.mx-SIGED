// *************** INDEX.HTML & DOCUMENTOS.HTML ***************

// ACCESIBILLITY MENU (MOBILE SCREENS)

const toggleA = document.getElementById('toggleA'); 
toggleA.addEventListener('click', () => { 
// 👇️ hide button 
toggleA.style.visibility = 'hidden';
});
const toggleB = document.getElementById('toggleB'); 
toggleB.addEventListener('click', () => { 
toggleA.style.visibility = 'visible';
});

const toggleC = document.getElementById('toggleC'); 
toggleC.addEventListener('click', () => { 
// 👇️ hide button 
toggleC.style.visibility = 'hidden'; 
});
const toggleD = document.getElementById('toggleD'); 
toggleD.addEventListener('click', () => { 
toggleC.style.visibility = 'visible'; 
});

const toggleE = document.getElementById('toggleE'); 
toggleE.addEventListener('click', () => { 
// 👇️ hide button 
toggleE.style.visibility = 'hidden'; 
});
const toggleF = document.getElementById('toggleF'); 
toggleF.addEventListener('click', () => { 
toggleE.style.visibility = 'visible'; 
});

const toggleG = document.getElementById('toggleG'); 
toggleG.addEventListener('click', () => { 
// 👇️ hide button 
toggleG.style.visibility = 'hidden'; 
});
const toggleH = document.getElementById('toggleH'); 
toggleH.addEventListener('click', () => { 
toggleG.style.visibility = 'visible'; 
});

const toggleI = document.getElementById('toggleI'); 
toggleI.addEventListener('click', () => { 
// 👇️ hide button 
toggleI.style.visibility = 'hidden'; 
});
const toggleJ = document.getElementById('toggleJ'); 
toggleJ.addEventListener('click', () => { 
toggleI.style.visibility = 'visible'; 
});

const toggleK = document.getElementById('toggleK'); 
toggleK.addEventListener('click', () => { 
// 👇️ hide button 
toggleK.style.visibility = 'hidden'; 
});
const toggleL = document.getElementById('toggleL'); 
toggleL.addEventListener('click', () => { 
toggleK.style.visibility = 'visible'; 
});

const toggleM = document.getElementById('toggleM'); 
toggleM.addEventListener('click', () => { 
// 👇️ hide button 
toggleM.style.visibility = 'hidden'; 
});
const toggleN = document.getElementById('toggleN'); 
toggleN.addEventListener('click', () => { 
toggleM.style.visibility = 'visible'; 
});

const toggleO = document.getElementById('toggleO'); 
toggleO.addEventListener('click', () => { 
// 👇️ hide button 
toggleO.style.visibility = 'hidden'; 
});
const toggleP = document.getElementById('toggleP'); 
toggleP.addEventListener('click', () => { 
toggleO.style.visibility = 'visible'; 
});

const toggleQ = document.getElementById('toggleQ'); 
toggleQ.addEventListener('click', () => { 
// 👇️ hide button 
toggleQ.style.visibility = 'hidden'; 
});
const toggleR = document.getElementById('toggleR'); 
toggleR.addEventListener('click', () => { 
toggleQ.style.visibility = 'visible'; 
});

const toggleS = document.getElementById('toggleS'); 
toggleS.addEventListener('click', () => { 
// 👇️ hide button 
toggleS.style.visibility = 'hidden'; 
});
const toggleT = document.getElementById('toggleT'); 
toggleT.addEventListener('click', () => { 
toggleS.style.visibility = 'visible'; 
});



// TOGGLES COLOR OF AN .SVG ELEMENT
function callcolor() {
    document.getElementById('color-change').classList.toggle("forcecolor");
}
// function callcolor1() {
//     document.getElementById('color-change1').classList.toggle("forcecolor1");
// }

// SHOWS THE SETED HTML ELEMENT
  function handleShowElement_(elementId) { 
    const element = document.getElementById('show-accesibillity_'); 
    if (element.style.display === "block") 
    { element.style.display = "none"; 
  } else { element.style.display = "block"; } }
