document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    // Decodificar el token para obtener el ID del usuario
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload._id; // Ajusta esto según la estructura de tu token
    console.log(userId)

    fetch(`http://localhost:3000/auth/user/${userId}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    console.log(userId)
    .then(response => {
        if (!response.ok) {
            throw new Error('Ruta no encontrada');
        }
        return response.json();
    })
    .then(profile => {
        if (profile.error) {
            console.error('Error al obtener el perfil:', profile.error);
            alert('Error al obtener el perfil');
        } else {
            document.getElementById('username').textContent = profile.nombre_usuario || 'N/A';
            document.getElementById('name').textContent = profile.nombre || 'N/A';
            document.getElementById('email').textContent = profile.email || 'N/A';
            document.getElementById('phone').textContent = profile.telefono || 'N/A';
            document.getElementById('birthdate').textContent = profile.fecha_nacimiento || 'N/A';
            document.getElementById('role').textContent = profile.rol_id || 'N/A';
        }
    })
    .catch(error => {
        console.error('Error al cargar el perfil:', error);
        alert('Error al cargar el perfil');
    });
});
