document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token no encontrado');
        alert('Error: No se encontró el token de autenticación');
        return;
    }

    fetch('http://192.168.77.43:3000/auth/user', {
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
            document.getElementById('username').textContent = user.nombre_usuario || 'N/A';
            document.getElementById('name').textContent = user.nombre || 'N/A';
            document.getElementById('email').textContent = user.email || 'N/A';
            document.getElementById('phone').textContent = user.telefono || 'N/A';
            document.getElementById('birthdate').textContent = user.fecha_nacimiento || 'N/A';
            document.getElementById('role').textContent = user.rol_id || 'N/A';
        }
    })
    .catch(error => {
        console.error('Error al cargar el perfil:', error);
        alert('Error al cargar el perfil');
    });
});
