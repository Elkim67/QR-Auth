const express = require("express");
const port = process.env.PORT || 3800;
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const session = require("express-session");
const cors = require("cors");

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

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(initial_path, "/index.html"));
});

// Route pour le formulaire de connexion
app.get("/login", (req, res) => {
  res.sendFile(path.join(initial_path, "public", "connexion.html"));
});

// Route pour le formulaire de connexion
app.get("/register", (req, res) => {
  res.sendFile(path.join(initial_path, "public", "enregistrement.html"));
});

app.get("/qrcode", (req, res) => {
  res.sendFile(path.join(initial_path, "code.html"));
});

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

// Route pour traiter la soumission du formulaire
app.post("/register", (req, res) => {
  const {
    _firstname,
    _lastname,
    _nickname,
    _birthdate,
    _birthplace,
    _matricule,
    _options,
    _password,
  } = req.body;

  // Insérer les données dans la base de données
  const sql =
    "INSERT INTO agents (nomClient, postnomClient, prenomClient, datedenaissance, lieudenaissance, matricule, division, passwordClient) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [
      _firstname,
      _lastname,
      _nickname,
      _birthdate,
      _birthplace,
      _matricule,
      _options,
      _password,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error inserting data");
      }
      res.redirect("/login");
      res.send("Data inserted successfully!");
    }
  );
});

// Route pour traiter le formulaire de connexion
app.post("/login", (req, res) => {
  const { first_name, pass_word } = req.body;
  const username = req.body.first_name;

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
    // "SELECT * FROM agents WHERE nomClient = ? AND passwordClient = ?",
    "SELECT postnomClient FROM agents WHERE nomClient = ? AND passwordClient = ?",
    [first_name, pass_word],
    (err, results) => {
      if (err) {
        return res.status(500).send("Erreur du serveur");
      }

      if (results.length > 0) {
        // Authentification réussie

        req.session.userId = results[0].id;
        const user = results[0];
        req.session.first_name = username;
        req.session.postnomClient = user.postnomClient; // Stocker postnomClient dans la session
        // Récupération du postnomClient si nécessaire
        // connection.query(
        //   "SELECT postnomClient FROM agents WHERE nomClient = ?",
        //   [req.session.first_name],
        //   (err, userDetails) => {
        //     if (err) {
        //       console.log("Not good at all");
        //       return res
        //         .status(500)
        //         .json({ erreur: "Erreur lors de la récupération des détails" });
        //     }
        //     // Vous pouvez stocker d'autres informations dans la session si nécessaire
        //     req.session.postnomClient = userDetails[0]?.postnomClient; // Utilisation de l'opérateur de coalescence
        //     console.log("On est là*: " + req.session.postnomClient);
        //     res.json();
        //   }
        // );
        res.redirect("/"); // Redirection vers la page souhaitée
      } else {
        // Authentification échouée
        res.sendFile(path.join(initial_path, "error.html"));
      }
    }
  );
});

app.get("/user", (req, res) => {
  res.json({
    username: req.session.first_name || null,
    middlename: req.session.postnomClient || null,
  });
});

// recuperation des informations pour le qrcode
app.listen(port, () => {
  console.log("server is online");
});
