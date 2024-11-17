// const html5QrCode = new Html5QrcodeScanner("reader");

// html5QrCode
//   .start(
//     { facingMode: "environment" },
//     {
//       fps: 10,
//       qrbox: { width: 250, height: 250 },
//     },
//     // (qrCodeMessage) => {
//     //   const data = JSON.parse(qrCodeMessage); // Supposons que le QR code contient un JSON
//     //   const { first_name, last_name } = data;
//     (qrCodeMessage) => {
//       // Ce qui se passe lorsque le code QR est détecté
//       $("#result").text(`Code QR détecté : ${qrCodeMessage}`);
//       console.log("Code QR détecté : ", qrCodeMessage);

//       // Envoie des données à l'API
//       const scanData = {
//         first_name: first_name,
//         last_name: last_name,
//         scan_time: new Date().toISOString(),
//       };

//       $.post("/scanner", scanData, (response) => {
//         $("#result").text(response);
//       }).fail(() => {
//         $("#result").text("Erreur lors de l'enregistrement des données.");
//       });
//       console.log("Je s'appelle Groot !");

//       // Arrêter le scanner après le premier scan
//       html5QrCode.stop();
//     },
//     (errorMessage) => {
//       // Gérer les erreurs de scan ici
//     }
//   )
//   .catch((err) => {
//     console.log("Erreur lors du démarrage du scanner : ", err);
//   });

// console.log(Html5QrcodeScanner);
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
      for (let i = 0; i <= 1; i++) {
        reload();
      }
    }, 3500);

    // Envoie des données à l'API
    const scanData = {
      name: result,
      scan_time: new Date().toISOString(),
    };

    $.post("/scanner", scanData, (response) => {
      $("#result").text(response);
    }).fail(() => {
      $("#result").text("Erreur lors de l'enregistrement des données.");
    });
    console.log("Je s'appelle Groot !");

    // document.getElementById("result").remove();
  }

  function error(err) {
    console.error(err);
  }
});

function reload() {
  location.reload();
}
