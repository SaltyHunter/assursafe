# patchakwak's API 

# Authentification : 

LOCAL : S'inscrire POST : http://localhost:8080/api/authenticate/signup

PROD : S'inscrire POST : https:/patchakwak.herokuapp.com/api/authenticate/signup

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

PROD : Se connecter POST : https:/patchakwak.herokuapp.com/api/authenticate/signin


    {
        "username": ,
        "password":  
    }

# Profil : 

LOCAL : Voir son profil GET : http://localhost:8080/api/users/{uuid}

PROD : Voir son profil GET : https://patchakwak.herokuapp.com//api/users/{uuid}

LOCAL : Modifier son profil PUT : http://localhost:8080/api/users/{uuid}

PROD : Modifier son profil PUT : https://patchakwak.herokuapp.com//api/users/{uuid}

    {
        "username": ,
        "mail": ,
        "n_tel": ,
        "nom": ,
        "prenom": ,
        "password": , 
        "passwordConfirmation":
    }

# Bucket :

LOCAL : Voir ses dossiers  GET : http://localhost:8080/api/users/{uuid}/buckets

PROD : Voir ses dossiers GET : https://patchakwak.herokuapp.com//api/users/{uuid}/dossiers

LOCAL : Poster un dossier POST : http://localhost:8080/api/users/{uuid}/dossiers

PROD : Poster un dossier POST : https://patchakwak.herokuapp.com//api/users/{uuid}/dossiers

    {
        "name":
    }

LOCAL : Modifier son file PUT : http://localhost:8080/api/users/{uuid}/dossiers/{id_dossier}

PROD : Modifier son file PUT : https://patchakwak.herokuapp.com//api/users/{uuid}/dossiers/{id_dossier}

    {
        "name":
    }
    
LOCAL : Supprimer son file DELETE : http://localhost:8080/api/users/{uuid}/dossiers/{id_dossier}

PROD : Supprimer son file DELETE : https://patchakwak.herokuapp.com//api/users/{uuid}/dossiers/{id_dossier}

# Blob :

LOCAL : Voir un dossier GET : http://localhost:8080/api/users/{uuid}/dossiers/{id_dossier}/blobs/{id_file}

PROD : Voir un dossier GET : https://patchakwak.herokuapp.com//api/users/{uuid}/dossiers/{id_dossier}/files/{id_file}

LOCAL : Poster un dossier POST : http://localhost:8080/api/users/{uuid}/dossiers/files

PROD : Poster un dossier POST : https://patchakwak.herokuapp.com//api/users/{uuid}/dossiers/files

    {
        "name":
        "path":,
        "mimetype":,
        "dossier":,
        "size":
    }

LOCAL : Modifier son file PUT : http://localhost:8080/api/users/{uuid}/dossiers/{id_dossier}/files/{id_file_}

PROD : Modifier son file PUT : https://patchakwak.herokuapp.com//api/users/{uuid}/dossiers/{id_dossier}/files/{id_file}

    {
        "name":
        "path":,
        "mimetype":,
        "dossier":,
        "size":
    }
    
LOCAL : Supprimer son file DELETE : http://localhost:8080/api/users/{uuid}/dossiers/{id_dossier}/files/{id_file}

PROD : Supprimer son file DELETE : https://patchakwak.herokuapp.com//api/users/{uuid}/dossiers/{id_dossier}/files/{id_file}