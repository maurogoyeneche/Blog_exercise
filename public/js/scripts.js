/*!
 * Start Bootstrap - Clean Blog v6.0.4 (https://startbootstrap.com/theme/clean-blog)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
 */
window.addEventListener("DOMContentLoaded", () => {
  let scrollPos = 0;
  const mainNav = document.getElementById("mainNav");
  const headerHeight = mainNav.clientHeight;
  window.addEventListener("scroll", function () {
    const currentTop = document.body.getBoundingClientRect().top * -1;
    if (currentTop < scrollPos) {
      // Scrolling Up
      if (currentTop > 0 && mainNav.classList.contains("is-fixed")) {
        mainNav.classList.add("is-visible");
      } else {
        mainNav.classList.remove("is-visible", "is-fixed");
      }
    } else {
      // Scrolling Down
      mainNav.classList.remove(["is-visible"]);
      if (
        currentTop > headerHeight &&
        !mainNav.classList.contains("is-fixed")
      ) {
        mainNav.classList.add("is-fixed");
      }
    }
    scrollPos = currentTop;
  });
});

////////////////////////  MODAL   //////////////////////////////////////

const btnDestroy = document.querySelector("#btn-destroy");
let idArticleDelete;

document.querySelectorAll(".btnTrash").forEach((element) =>
  element.addEventListener("click", function (e) {
    idArticleDelete = e.target.value;
  })
);

btnDestroy.addEventListener("click", () => {
  fetch(`/admin/articulo-delete/${idArticleDelete}`)
    .then((response) => response.json())
    .then((data) => {
      const element = document.getElementById(`article_${idArticleDelete}`);
      if (data) element.style.display = "none";
    });
});
