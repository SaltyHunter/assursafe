# AssurSafe's API Version 1.0.1

# Configuration du .env

HOST=

PORT=

DATABASE_URL=

JWT_ENCRYPTION=

SENDGRID_API_KEY=

# Gestion des mails : SENDGRID :

Envoie de mail lors de la création d'un utilisateur, et suppression d'un utilisateur.

# Log (log4j):

- Configuration des logs sur le terminal de commande via log.ts

- Configuration du fichier de log (/log/api.log) via log4j.ts

Utilisation d'un fonction "transform" dans utils.ts pour indiquer l'emplacement de l'info, erreur etc...

# Authentification : 

LOCAL : S'inscrire POST : http://localhost:8080/api/authenticate/signup

PROD : S'inscrire POST : https://patchakwak.herokuapp.com/api/authenticate/signup

    {
        "username": ,
        "mail": ,
        "n_tel": ,
        "nom": ,
        "prenom": ,
        "password": , 
        "passwordConfirmation":
    }
    
LOCAL : Se connecter POST : http://localhost:8080/api/authenticate/signin

PROD : Se connecter POST : https://patchakwak.herokuapp.com/api/authenticate/signin


    {
        "username": ,
        "password":  
    }

# Profil : 

LOCAL : Voir son profil GET : http://localhost:8080/api/users/{uuid}

PROD : Voir son profil GET : https://patchakwak.herokuapp.com/api/users/{uuid}

LOCAL : Modifier son profil PUT : http://localhost:8080/api/users/{uuid}

PROD : Modifier son profil PUT : https://patchakwak.herokuapp.com/api/users/{uuid}

    {
        "username": ,
        "mail": ,
        "n_tel": ,
        "nom": ,
        "prenom": ,
        "password": , 
        "passwordConfirmation":
    }

LOCAL : Supprimer son profil DEL : http://localhost:8080/api/users/{uuid}

PROD : Supprimer son profil DEL : https://patchakwak.herokuapp.com/api/users/{uuid}

# Dossier :

LOCAL : Voir ses dossiers  GET : http://localhost:8080/api/users/{uuid}/buckets

PROD : Voir ses dossiers GET : https://patchakwak.herokuapp.com/api/users/{uuid}/dossiers

LOCAL : Poster un dossier POST : http://localhost:8080/api/users/{uuid}/dossiers

PROD : Poster un dossier POST : https://patchakwak.herokuapp.com/api/users/{uuid}/dossiers

    {
        "name":
    }

LOCAL : Modifier son dossier PUT : http://localhost:8080/api/users/{uuid}/dossiers/{id_dossier}

PROD : Modifier son dossier PUT : https://patchakwak.herokuapp.com/api/users/{uuid}/dossiers/{id_dossier}

    {
        "name":
    }
    
LOCAL : Supprimer son dossier DELETE : http://localhost:8080/api/users/{uuid}/dossiers/{id_dossier}

PROD : Supprimer son dossier DELETE : https://patchakwak.herokuapp.com/api/users/{uuid}/dossiers/{id_dossier}

# Fichier :

LOCAL : Voir ses fichiers GET : http://localhost:8080/api/users/{uuid}/dossiers/{id_dossier}/files

PROD : Voir ses fichiers GET : https://patchakwak.herokuapp.com/api/users/{uuid}/dossiers/{id_dossier}/files

LOCAL : Poster un fichier POST : http://localhost:8080/api/users/{uuid}/dossiers/{id_dossier}/files

PROD : Poster un fichier POST : https://patchakwak.herokuapp.com/api/users/{uuid}/dossiers/{id_dossier}/files

    {
        "path":,
        "mimetype":,
        "content";,
        "dossier":
    }

LOCAL : Modifier son fichier PUT : http://localhost:8080/api/users/{uuid}/dossiers/{id_dossier}/files/{id_file}

PROD : Modifier son fichier PUT : https://patchakwak.herokuapp.com/api/users/{uuid}/dossiers/{id_dossier}/files/{id_file}

    {
        "path":,
        "mimetype":,
        "content";,
        "dossier":
    }
    
LOCAL : Supprimer son fichier DELETE : http://localhost:8080/api/users/{uuid}/dossiers/{id_dossier}/files/{id_file}

PROD : Supprimer son fichier DELETE : https://patchakwak.herokuapp.com/api/users/{uuid}/dossiers/{id_dossier}/files/{id_file}
