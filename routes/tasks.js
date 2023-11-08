const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Récupérer toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasksRef = db.collection('tasks');
    const snapshot = await tasksRef.get();
    
    let tasks = [];
    snapshot.forEach(doc => {
      tasks.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send('Erreur serveur: ' + error.message);
  }
});

// Récupérer une tâche par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection('tasks').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).send('Tâche non trouvée');
    }
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).send('Erreur serveur: ' + error.message);
  }
});

// Créer une nouvelle tâche
router.post('/', async (req, res) => {
  try {
    const newTaskRef = db.collection('tasks').doc();
    await newTaskRef.set(req.body);
    res.status(201).send(`Tâche créée avec l'ID: ${newTaskRef.id}`);
  } catch (error) {
    res.status(500).send('Erreur serveur: ' + error.message);
  }
});

// Supprimer une tâche
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection('tasks').doc(id);
    await docRef.delete();
    res.status(200).send(`Tâche supprimée avec succès`);
  } catch (error) {
    res.status(500).send('Erreur serveur: ' + error.message);
  }
});

// Modifier une tâche existante
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection('tasks').doc(id);
    await docRef.set(req.body, { merge: true });
    res.status(200).send(`Tâche mise à jour avec succès`);
  } catch (error) {
    res.status(500).send('Erreur serveur: ' + error.message);
  }
});

module.exports = router;
