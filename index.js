const express = require("express");
const admin = require("firebase-admin");
const app = express();
app.use(express.json());

const serviceAccount = require("./manage-tes-pieds-firebase-adminsdk-1lai2-976d46ac36.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const userRoutes = require("./routes/users");

app.use("/users", userRoutes);

// Écoute du serveur sur le port 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
