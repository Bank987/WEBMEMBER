require("dotenv").config({path: ".env.local"});
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    const Gang = mongoose.connection.collection("gangs");
    Gang.find({}).toArray().then(gangs => {
      console.log("Gangs with their youtube urls:");
      gangs.forEach(g => {
        console.log(`Subdomain: ${g.subdomain}, URL: ${g.youtubeMusicUrl}`);
      });
      process.exit(0);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
