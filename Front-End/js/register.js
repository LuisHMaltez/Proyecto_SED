// register.js

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        const password = data.password;

        // Reglas de validación
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            alert('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.');
            return;
        }

        fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                console.error('Error al registrar:', result.error);
                alert('Error al registrar: ' + result.error);
            } else {
                console.log('Usuario registrado:', result);
                alert('Usuario registrado con éxito');
                window.location.href = 'login.php'; // Redirigir al inicio de sesión
            }
        })
        .catch(error => {
            console.error('Error al registrar:', error);
            alert('Error al registrar: ' + error);
        });
    });
});
