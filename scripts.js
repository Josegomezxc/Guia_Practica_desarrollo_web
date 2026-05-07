

const form          = document.getElementById('registerForm');
const inputNombre   = document.getElementById('nombre');
const inputCorreo   = document.getElementById('correo');
const inputPassword = document.getElementById('password');

const errorNombre   = document.getElementById('errorNombre');
const errorCorreo   = document.getElementById('errorCorreo');
const errorPassword = document.getElementById('errorPassword');


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


/**
 * @param {HTMLInputElement} input 
 * @param {HTMLElement}      span  
 * @param {string}           msg   
 */
function mostrarError(input, span, msg) {
  input.classList.add('input-error');
  span.textContent = msg;
}

/**
 * @param {HTMLInputElement} input
 * @param {HTMLElement}      span
 */
function limpiarError(input, span) {
  input.classList.remove('input-error');
  span.textContent = '';
}


function validarFormulario() {
  let esValido = true;
  const mensajes = [];         

  const nombre = inputNombre.value.trim();

  if (nombre === '') {
    mostrarError(inputNombre, errorNombre, 'El nombre es obligatorio.');
    mensajes.push('• El nombre no puede estar vacío.');
    esValido = false;
  } else {
    limpiarError(inputNombre, errorNombre);
  }

  const correo = inputCorreo.value.trim();

  if (correo === '') {
    mostrarError(inputCorreo, errorCorreo, 'El correo es obligatorio.');
    mensajes.push('• El correo no puede estar vacío.');
    esValido = false;

  } else if (!EMAIL_REGEX.test(correo)) {
    mostrarError(inputCorreo, errorCorreo, 'Ingresa un correo válido (ej. nombre@dominio.com).');
    mensajes.push('• El formato del correo no es válido.');
    esValido = false;

  } else {
    limpiarError(inputCorreo, errorCorreo);
  }

  const password = inputPassword.value;

  if (password === '') {
    mostrarError(inputPassword, errorPassword, 'La contraseña es obligatoria.');
    mensajes.push('• La contraseña no puede estar vacía.');
    esValido = false;

  } else if (password.length < 8) {
    mostrarError(
      inputPassword,
      errorPassword,
      `La contraseña debe tener al menos 8 caracteres (tiene ${password.length}).`
    );
    mensajes.push(`• La contraseña es muy corta: ${password.length} de 8 caracteres mínimos.`);
    esValido = false;

  } else {
    limpiarError(inputPassword, errorPassword);
  }

  if (!esValido) {
    alert('Se encontraron los siguientes errores:\n\n' + mensajes.join('\n'));
  }

  return esValido;
}

form.addEventListener('submit', function (evento) {

  evento.preventDefault();

  const valido = validarFormulario();

  if (valido) {
    alert(
      '¡Registro exitoso! 🎉\n\n' +
      'Bienvenido, ' + inputNombre.value.trim() + '.\n' +
      'Tu cuenta ha sido creada con el correo: ' + inputCorreo.value.trim()
    );

    form.reset();
    limpiarError(inputNombre,   errorNombre);
    limpiarError(inputCorreo,   errorCorreo);
    limpiarError(inputPassword, errorPassword);
  }
});


inputNombre.addEventListener('input', () => limpiarError(inputNombre, errorNombre));
inputCorreo.addEventListener('input', () => limpiarError(inputCorreo, errorCorreo));
inputPassword.addEventListener('input', () => limpiarError(inputPassword, errorPassword));