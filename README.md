# Projet API Firestore

Ce projet est une API REST utilisant Express.js et Google Cloud Firestore pour gérer des tâches (tasks) et des utilisateurs (utilisateurs).

## Configuration initiale

Pour démarrer le projet, suivez ces étapes pour le faire avec Docker Compose : 

1. Clonez le dépôt :
   ```
   git clone url_du_dépôt
   ```
2. Lancez le conteneur depuis la racine du projet : 
   ```
   docker-compose up
   ```

Pour démarrer le projet, suivez ces étapes pour le faire manuellement :

1. Clonez le dépôt :
   ```
   git clone [url_du_dépôt](https://github.com/MiloAnton/API---Firebase---Projet-EFREI.git)
   ```
2. Installez les dépendances :
   ```
   cd chemin_du_projet
   npm install
   ```
3. Ajoutez votre fichier de configuration Firebase Admin SDK (`serviceAccountKey.json`) à la racine du projet.

4. Démarrez le serveur :
   ```
   npm start
   ```
   ou si vous utilisez Nodemon pour le développement :
   ```
   nodemon start
   ```

## API Endpoints

### Tasks

- **Obtenir toutes les tâches**

  ```
  GET /tasks
  ```

  Exemple : `http://localhost:4000/tasks`

- **Obtenir une tâche par ID**

  ```
  GET /tasks/:id
  ```

  Exemple : `http://localhost:4000/tasks/cnmpKQ26dDRm1k1fN38`

- **Créer une nouvelle tâche**

  ```
  POST /tasks
  ```

  Corps de la requête (JSON) :

  ```json
  {
    "title": "Titre de la tâche",
    "description": "Description de la tâche",
    "date": "2023-11-09T00:00:00Z",
    "tag": "Tag"
  }
  ```

  Exemple : `http://localhost:4000/tasks`

- **Supprimer une tâche**

  ```
  DELETE /tasks/:id
  ```

  Exemple : `http://localhost:4000/tasks/cnmpKQ26dDRm1k1fN38`

- **Modifier une tâche existante**
  ```
  PUT /tasks/:id
  ```
  Corps de la requête (JSON) :
  ```json
  {
    "title": "Nouveau Titre",
    "description": "Nouvelle description",
    "date": "2023-11-10T00:00:00Z",
    "tag": "Nouveau Tag"
  }
  ```
  Exemple : `http://localhost:4000/tasks/cnmpKQ26dDRm1k1fN38`

### Utilisateurs

- **Obtenir tous les utilisateurs**

  ```
  GET /users/utilisateurs
  ```

  Exemple : `http://localhost:4000/users/utilisateurs`

- **Obtenir un utilisateur par ID**

  ```
  GET /users/utilisateur/:id
  ```

  Exemple : `http://localhost:4000/users/utilisateur/123`

- **Créer un nouvel utilisateur**

  ```
  POST /users/utilisateur
  ```

  Corps de la requête (JSON) :

  ```json
  {
    "email": "nouvel.utilisateur@example.com",
    "name": "Prénom",
    "password": "MotDePasse",
    "surname": "Nom"
  }
  ```

  Exemple : `http://localhost:4000/users/utilisateur`

- **Supprimer un utilisateur**

  ```
  DELETE /users/utilisateur/:id
  ```

  Exemple : `http://localhost:4000/users/utilisateur/123`

- **Modifier un utilisateur existant**
  ```
  PUT /users/utilisateur/:id
  ```
  Corps de la requête (JSON) :
  ```json
  {
    "email": "utilisateur.modifié@example.com",
    "name": "PrénomModifié",
    "password": "NouveauMotDePasse",
    "surname": "NomModifié"
  }
  ```
  Exemple : `http://localhost:4000/users/utilisateur/123`

---
