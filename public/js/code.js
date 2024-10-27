// const { response } = require("express");

// let first_name = /*document.getElementById("firstName").value*/ "KIWOY";
// let last_name = /*document.getElementById("lastName").value*/ "MUSUAMBA";

async function generateQRCode() {
  const response = await fetch("/qrcode"); // Appel à la route sans ID

  if (!response.ok) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur"
    );
    return;
  }

  const userInfo = await response.json();
  const qrData = JSON.stringify(userInfo); // Convertir les informations en JSON

  // Générer le code QR
  const qr = new QRious({
    element: document.getElementById("qrcode"),
    value: qrData,
    size: 200, // Taille du QR code
  });

  // let qr = new QRCode(document.getElementById("qrcode"), {
  //   value: qrData,
  //   width: 208,
  //   height: 208,
  // });
  // console.log(qrData);
}
// Appeler la fonction pour générer le QR code
generateQRCode();

// let qrcode = new QRCode(document.getElementById("qrcode"), {
//   text: first_name + " " + last_name,
//   width: 208,
//   height: 208,
// });
