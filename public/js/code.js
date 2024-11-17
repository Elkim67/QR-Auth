const alert_btn = document.querySelector(".alert-btn");
alert_btn.style.visibility = "hidden";

window.addEventListener("DOMContentLoaded", (event) => {
  fetch("/user")
    .then((response) => response.json())
    .then((data) => {
      console.log("Response: ", data);
      if (data.username && data.middlename !== null) {
        var qrcode = new QRCode(document.getElementById("qrcode"), {
          text: data.username + " " + data.middlename,
          width: 203,
          height: 203,
        });
        console.log("Done");
      } else {
        alert_btn.style.visibility = "visible";
        document.querySelector(".no-user-text").innerHTML =
          "Aucun utilisateur trouvé";
        console.log("Not Good");
      }
    })
    .catch((error) => {
      console.error("erreur: ", error);
    });
  console.log("DOM Loaded");
});
