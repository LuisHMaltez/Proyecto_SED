document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token no encontrado');
        alert('Error: No se encontró el token de autenticación');
        return;
    }

    // Obtener y mostrar los datos del perfil actual
    fetch('http://localhost:3000/auth/user', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ruta no encontrada');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            console.error('Error al obtener el perfil:', data.error);
            alert('Error al obtener el perfil');
        } else {
            const user = data.user;
            document.getElementById('username').value = user.nombre_usuario || '';
            document.getElementById('name').value = user.nombre || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('phone').value = user.telefono || '';
            document.getElementById('birthdate').value = user.fecha_nacimiento || '';
        }
    })
    .catch(error => {
        console.error('Error al cargar el perfil:', error);
        alert('Error al cargar el perfil');
    });

    // Enviar los cambios del perfil al servidor con confirmación
    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            const confirmation = confirm('¿Estás seguro de que quieres guardar estos cambios?');
            if (!confirmation) {
                return;
            }

            console.log('Datos que se enviarán:', data); // Muestra los datos en la consola

            fetch('http://localhost:3000/auth/user', {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el perfil');
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    console.error('Error al actualizar el perfil:', data.error);
                    alert('Error al actualizar el perfil');
                } else {
                    alert('Perfil actualizado exitosamente');
                    window.location.href = 'profile.php'; // Redirigir a la página de perfil
                }
            })
            .catch(error => {
                console.error('Error al actualizar el perfil:', error);
                alert('Error al actualizar el perfil');
            });
        });
    } else {
        console.error('Formulario de edición de perfil no encontrado');
        alert('Error: No se encontró el formulario de edición de perfil');
    }
});
