const express = require("express");
const port = process.env.PORT || 3800;
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const session = require("express-session");

let initial_path = path.join(__dirname, "public");

const app = express();

app.use(express.static(initial_path));
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Utilisez `true` si vous êtes en HTTPS
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(initial_path, "/index.html"));
});

// Route pour le formulaire de connexion
app.get("/login", (req, res) => {
  res.sendFile(path.join(initial_path, "public", "connexion.html"));
});

// app.get("/qrcode", (req, res) => {
//   res.sendFile(path.join(initial_path, "code.html"));
// });

app.get("/admin", (req, res) => {
  res.sendFile(path.join(initial_path, "admin.html"));
});

//partie admin // Configuration de la connexion MySQL
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "gestion_pointage",
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion : " + err.stack);
    return;
  }
  console.log("Connexion reussie");
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
  })
);

// Route pour traiter le formulaire de connexion
app.post("/login", (req, res) => {
  const { first_name, pass_word } = req.body;

  // Requête pour vérifier les identifiants dans la base de données
  connection.query(
    "SELECT * FROM administrateur WHERE nomAdmin = ? AND passwordAdmin = ?",
    [first_name, pass_word],
    (err, results) => {
      if (err) {
        return res.status(500).send("Erreur du serveur");
      }

      if (results.length > 0) {
        // Authentification réussie
        req.session.userId = results[0].id;
        res.redirect("/admin"); // Redirection vers la page souhaitée
      } else {
        // Authentification échouée
        res.sendFile(path.join(initial_path, "error.html"));
      }
    }
  );
  //requete utilisateur
  connection.query(
    "SELECT * FROM agents WHERE nomClient = ? AND passwordClient = ?",
    [first_name, pass_word],
    (err, results) => {
      if (err) {
        return res.status(500).send("Erreur du serveur");
      }

      if (results.length > 0) {
        // Authentification réussie
        req.session.userId = results[0].id;
        res.redirect("/"); // Redirection vers la page souhaitée
      } else {
        // Authentification échouée
        res.sendFile(path.join(initial_path, "error.html"));
      }
    }
  );
});

//recuperation des informations pour le qrcode

app.get("/qrcode", (req, res) => {
  console.log("User ID:", req.session.userId); // Vérifiez la valeur ici

  if (!req.session.userId) {
    return res.status(403).send("Accès interdit"); // L'utilisateur n'est pas connecté
  }

  const userId = req.session.userId;

  connection.query(
    "SELECT * FROM agents WHERE idAgent = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).send("Erreur du serveur");
      }

      if (results.length > 0) {
        const user = results[0];
        const userInfo = {
          nom: user.nomClient,
          postnom: user.postnomClient,
          // Ajoutez d'autres informations si nécessaire
        };

        res.json(userInfo); // Renvoie les informations de l'utilisateur au client
      } else {
        res.status(404).send("Utilisateur non trouvé");
      }
    }
  );
});

app.listen(port, () => {
  console.log("server is online");
});
