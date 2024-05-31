
// Debe ser nombre y apellido.
export const name = '([a-zA-Z]+) ([a-zA-Z]+)';
// Debe tener el formato de un correo electronico.
export const email: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
// Debe contener minusculas, mayusculas, numeros, caracteres especiales y tener una longitud de 6 caracteres.
export const password = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})";
