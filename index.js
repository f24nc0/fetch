function mostrarResultados(results) {
  const resultados = document.querySelector(".contenedor-resultados");
  const template = document.querySelector("#template");

  for (const r of results) {
    const imgEl = template.content.querySelector(".imagen-producto");
    const tituloEl = template.content.querySelector(".titulo-producto");
    const precioEl = template.content.querySelector(".precio-producto");
    const estadoEl = template.content.querySelector(".estado-producto");
    const vendidosEl = template.content.querySelector(".cantidad-vendida");

    imgEl.src = r.thumbnail;
    tituloEl.textContent = r.title;
    precioEl.textContent = r.price;

    if (r.condition == "new") {
      estadoEl.textContent = "Nuevo";
    } else {
      estadoEl.textContent = "Usado";
    }

    vendidosEl.textContent = r.sold_quantity;

    const clone = document.importNode(template.content, true);
    resultados.appendChild(clone);
  }
}

function main() {
  const myFormEl = document.querySelector(".form-busqueda");
  const cantidadResultadosEl = document.querySelector(".results-counter");
  myFormEl.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const textoBusqueda = evento.target.buscar.value;
    const textoModificado = textoBusqueda.replace(" ", "%20");
    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + textoModificado)
      .then((res) => res.json())
      .then((data) => {
        mostrarResultados(data.results);
        console.log(data.paging.total);
        cantidadResultadosEl.textContent = data.paging.total;
      });
  });
}

main();
