const burger_btn = document.querySelector(".burger-menu");
const side_menu = document.querySelector(".side-menu");
const close_btn = document.querySelector(".close-button");
const close_btn_alt = document.querySelector(".closing_btn");

burger_btn.addEventListener("click", () => {
  side_menu.style.translate = "225px";
  document.body.style.overflow = "hidden";
  console.log("hello");
});

close_btn_alt.addEventListener("click", () => {
  side_menu.style.translate = "-225px";
  document.body.style.overflow = "visible";
  console.log("close");
});

$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});
