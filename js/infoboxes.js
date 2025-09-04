// ***************                          INDEX.HTML *                         **************
// ***************  CONTROL DE ESTADOS EN INFOBOXES DE LA PÁGINA PRINCIPAL SIGED ***************
// Array con los sufijos de ID de los botones y las cajas
const elementos = [2, 3, 4];

elementos.forEach((num) => {
  // Obtener referencias al botón y su caja asociada
  const btn = document.getElementById(`btn${num}`);
  const box = document.getElementById(`box${num}`);

  // Si alguno no existe en el DOM, saltar esta iteración
  if (!btn || !box) return;

  // Añadir manejador de evento click
  btn.addEventListener("click", () => {
    // Ocultar el botón
    btn.style.visibility = "hidden";
    btn.style.opacity = "1";

    // Mostrar la caja de información
    box.style.visibility = "visible";
  });
});
