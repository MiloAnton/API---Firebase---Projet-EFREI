const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

// Récupérer tous les utilisateurs
router.get('/utilisateurs', async (req, res) => {
    try {
      const utilisateursRef = db.collection('utilisateurs');
      const snapshot = await utilisateursRef.get();
      
      let utilisateurs = [];
      snapshot.forEach(doc => {
        utilisateurs.push({ id: doc.id, ...doc.data() });
      });
  
      res.status(200).json(utilisateurs);
    } catch (error) {
      res.status(500).send('Erreur serveur: ' + error.message);
    }
  });
  
  // Récupérer un utilisateur par ID
  router.get('/utilisateur/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const docRef = db.collection('utilisateurs').doc(id);
      const doc = await docRef.get();
      if (!doc.exists) {
        return res.status(404).send('Utilisateur non trouvé');
      }
      res.status(200).json(doc.data());
    } catch (error) {
      res.status(500).send('Erreur serveur: ' + error.message);
    }
  });
  
  // Récupérer un utilisateur par prénom et nom
  router.get('/utilisateur', async (req, res) => {
    const { prenom, nom } = req.query;
    try {
      const utilisateursRef = db.collection('utilisateurs');
      const snapshot = await utilisateursRef.where('name', '==', nom).where('surname', '==', prenom).get();
      
      if (snapshot.empty) {
        return res.status(404).send('Aucun utilisateur trouvé avec ce prénom et nom.');
      }
  
      let utilisateurs = [];
      snapshot.forEach(doc => {
        utilisateurs.push({ id: doc.id, ...doc.data() });
      });
  
      res.status(200).json(utilisateurs);
    } catch (error) {
      res.status(500).send('Erreur serveur: ' + error.message);
    }
  });
  
  // Créer un nouvel utilisateur
  router.post('/utilisateur', async (req, res) => {
    try {
      const newUserRef = db.collection('utilisateurs').doc();
      await newUserRef.set(req.body);
      res.status(201).send(`Utilisateur créé avec l'ID: ${newUserRef.id}`);
    } catch (error) {
      res.status(500).send('Erreur serveur: ' + error.message);
    }
  });
  
  // Supprimer un utilisateur
  router.delete('/utilisateur/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const docRef = db.collection('utilisateurs').doc(id);
      await docRef.delete();
      res.status(200).send(`Utilisateur supprimé avec succès`);
    } catch (error) {
      res.status(500).send('Erreur serveur: ' + error.message);
    }
  });
  
  // Modifier un utilisateur existant
  router.put('/utilisateur/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const docRef = db.collection('utilisateurs').doc(id);
      await docRef.set(req.body, { merge: true });
      res.status(200).send(`Utilisateur mis à jour avec succès`);
    } catch (error) {
      res.status(500).send('Erreur serveur: ' + error.message);
    }
  });

  module.exports = router;