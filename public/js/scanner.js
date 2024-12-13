const modal = document.querySelector(".modal-box");
const scanResult = document.querySelector(".scan-result");
const scanBtn = document.querySelector(".scan-btn");

scanBtn.addEventListener("click", () => {
  const scanner = new Html5QrcodeScanner("reader", {
    qrbox: {
      width: 350,
      height: 350,
    },
    fps: 20,
  });

  scanner.render(success, error);

  function success(result) {
    scanResult.innerHTML = result;
    modal.style.visibility = "visible"; // Afficher la modale
    console.log(result);
    scanner.clear();

    setTimeout(() => {
      reload();
    }, 3500);

    // Envoie des données à l'API
    const scanData = {
      name: result,
      scan_time: new Date().toISOString(),
    };

    console.log(scanData.name);
    console.log(scanData.scan_time);
  }

  fetch("/scanner", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scanData), // Convertir scanData en JSON
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi des données.");
      }
      return response.text();
    })
    .then((data) => {
      console.log("Réponse du serveur :", data);
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });

  function error(err) {
    console.error(err);
  }
});

function reload() {
  location.reload();
}

//can be reused because you never know
// $.post("/scanner", scanData, (response) => {
//   $("#result").text(response);
// }).fail(() => {
//   $("#result").text("Erreur lors de l'enregistrement des données.");
// });
// console.log("Je s'appelle Groot !");
// fetch("/scanner", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(scanData),
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Erreur lors de l'enregistrement des données.");
//     }
//     return response.text();
//   })
//   .then((data) => {
//     document.getElementById("result").textContent = data;
//   })
//   .catch((error) => {
//     document.getElementById("result").textContent = error.message;
//   });

// console.log("Je s'appelle Groot !");

// document.getElementById("result").remove();
