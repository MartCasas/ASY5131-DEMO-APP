require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

console.log(db.url);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to demo application." });
});

// Catalogo 
app.get("/catalogo", (req, res) => {
  res.json({ message :
            "1-Taladro Baunker: $50.000"
            "2-Tornillo 8mm: $200"
            "3-Martillo: $2.000"
            "4-Destornillador Electrico: $40.000"});

//*Disponibilidad de Producto
//app.get("/", (req, res) => {
  //res.json({ message :
    //        "-Taladro Baunker: Aun en Stock"
      //      "-Tornillo 8mm: Pocos Productos"
        //    "-Martillo: Aun en Stock"
          //  "-Destornillador Electrico: Fuera de Stock"});

//Bodeguero vista de stocks
//app.get("/", (req, res) => {
  //res.json({ message :
     //       "-Taladro Baunker: En bodega se encuentra 60 productos "
       //     "-Tornillo 8mm: En bodega quedan 10 cajas de este producto"
         //   "-Martillo: En bodega aun existen 80 unidades"
           // "-Destornillador Electrico: 0 productos en bodega"});
});

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
