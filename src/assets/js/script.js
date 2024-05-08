let bars = document.getElementById("bars");
let cross = document.getElementById("cross");
let container = document.getElementById("container");
let crossActive = false;
let listContainer = document.getElementById("list-container");
let links = document.getElementsByClassName("link");
let navHeader = document.getElementById("nav-header")



/*Función presionar barras*/
function pressBars() {
  document.body.style.overflowY = "hidden";
  container.style.height = "100vh";
  bars.style.display = "none";
  cross.style.display = "block";
  crossActive = true;
  listContainer.style.top = "0%";
}

/*Función presionar cruces*/
function pressCross() {
  document.body.style.overflowY = "auto";
  bars.style.display = "block";
  cross.style.display = "none";
  container.style.height = "160px";
  container.style.transition = "1s";
}

/*Evento para cuando se pulse las barras*/
bars.addEventListener("click", function (event) {
  pressBars();
});

/*Evento para cuando se pulse las cruces*/
cross.addEventListener("click", function (event) {
  pressCross();
});

/*For para detectar cuando se pulsa un enlace y cerrar el nav*/
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (event) {
    pressCross();
    ajustarSegunTamañoDePantalla()
  });
}

/* Función para detectar cuando la pantalla es mas pequeña
 * de X y ocultar los botones
 */
function ajustarSegunTamañoDePantalla() {
  let displayWidth = window.innerWidth;

  if (displayWidth < 942) {
    if (crossActive === false) {
      bars.style.display = "block";
      navHeader.style.color= "red";
    }
  } else {
    document.body.style.overflowY = "auto";
    container.style.height = "100px";
    cross.style.display = "none";
    crossActive = false;
    listContainer.style.top = "-100%";
    bars.style.display = "none";
  }
}

/* Evento para detectar cuando se pulsa 'ESC'
 * para cerrar el nav
 */
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && crossActive === true) {
    pressCross();
  }
});

/*Ejecuta por primera verpara ajustar*/
ajustarSegunTamañoDePantalla();

/*Evento que ejecuta para ejustar en todo momento*/
window.addEventListener("resize", ajustarSegunTamañoDePantalla);


/*--------------------------------------------------------------------------------------------------------*/

/* ANIME JS - Animación logo SVG */


document.getElementById("objectSVG").addEventListener("load", function () {
  // Accede al documento SVG cargado
  let svgDocument = this.contentDocument;
  let puerta = svgDocument.getElementById("puerta");
  let marco = svgDocument.getElementById("marco-puerta");
  var centerX = (svgDocument.getElementById("circulo2").getBBox().x + svgDocument.getElementById("circulo2").getBBox().width / 2);
  var centerY = (svgDocument.getElementById("circulo2").getBBox().y + svgDocument.getElementById("circulo2").getBBox().height / 2);
  
  anime({
    targets: [
      svgDocument.getElementById("circulo2"),
      svgDocument.getElementById("path59"),
      svgDocument.getElementById("rect8"),
      svgDocument.getElementById("rect7")
    ],
    scale: {
      value: 1.12,
      duration: 2000,
    },
    easing: "linear",
    loop: true,
    direction: "alternate",
    update: function (animation) {
      animation.animatables.forEach(function (animatable) {
        animatable.target.style.transformOrigin = centerX + "px " + centerY + "px";
      });
    },
  });

  function animarPuerta() {
    anime({
      targets: [puerta, marco],
      fill: "#9c813f",
      duration: 2500,
      easing: "easeInOutQuad",
      opacity: 1,

      complete: function () {
        anime({
          targets: puerta,
          fill: "#57371f",
          rotateY: "-115deg",
          rotateZ: "+2deg",
          duration: 2000,
          easing: "easeInOutQuad",
          update: function () {
            // Obtener las coordenadas del borde derecho de la puerta en relación con el SVG
            var doorRight = puerta.getBBox().x + puerta.getBBox().width;
            // Establecer el origen en el borde derecho de la puerta
            puerta.style.transformOrigin = doorRight + "px 50%";
          },
          complete: function () {
            anime({
              targets: [puerta, marco],
              opacity: 0,
              duration: 3000, 
              easing: "linear",
              complete: function () {
                anime({
                  targets: [puerta],
                  rotateY: "0deg",
                  rotateZ: "0deg",
                  fill: "#9c813f",
                  complete: function () {
                    animarPuerta();
                  },
                });
              },
            });
          },
        });
      },
    });
  }
  animarPuerta();
});