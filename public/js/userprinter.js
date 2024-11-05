window.addEventListener("DOMContentLoaded", (event) => {
  fetch("/user")
    .then((response) => response.json())
    .then((data) => {
      console.log("Response: ", data);
      if (data.username !== null) {
        document.getElementById("current_user").innerHTML =
          "User: " + data.username;
        console.log("Done");
      } else {
        document.getElementById("current_user").innerHTML = "User: Default";
        console.log("Not Good");
      }
    })
    .catch((error) => {
      console.error("erreur: ", error);
    });
  console.log("DOM Loaded");
});
