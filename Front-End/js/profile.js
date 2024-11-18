// profile.js

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return;
    }
    const user = parseJwt(token);

    const profileDetails = document.getElementById('profileDetails');
    if (!profileDetails) {
        console.error('Element with id "profileDetails" not found');
        return;
    }

    profileDetails.innerHTML = `
        <p><strong>Nombre de Usuario:</strong> ${user.nombre_usuario || 'N/A'}</p>
        <p><strong>Nombre:</strong> ${user.nombre || 'N/A'}</p>
        <p><strong>Email:</strong> ${user.email || 'N/A'}</p>
        <p><strong>Teléfono:</strong> ${user.telefono || 'N/A'}</p>
        <p><strong>Fecha de Nacimiento:</strong> ${user.fecha_nacimiento || 'N/A'}</p>
        <p><strong>Rol:</strong> ${user.rol_id || 'N/A'}</p>
    `;
});
