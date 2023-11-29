export interface Usuario {
    uid: string | any; // id para autentificación de Firebase
    uidVehiculo: string | any; // id proveniente del usuario
    email: string;
    nombre: string;
    fecha: string;
    contrasena: string;
}

