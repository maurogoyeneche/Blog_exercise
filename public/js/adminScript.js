const articles = [];

fetch("/api/articulos")
  .then((response) => response.json())
  .then((data) => data.map((article) => articles.push(article)));

/* FALTA TERMINAR, busqueda por titulo,id,autor, y maqueteado de tabla. */

function show(state, id) {
  if (state) document.getElementById(id).classList.remove("d-none");
  else document.getElementById(id).classList.add("d-none");
}
