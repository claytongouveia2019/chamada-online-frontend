console.log('App.js funcionando');
const API_URL = 'https://chamadaonline-backend.up.railway.app/api';

console.log('App.js funcionando');

// Exemplo de chamada à API:
async function login(email, senha) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();
        console.log('Login OK:', data);
    } catch (error) {
        console.error('Erro ao conectar no backend:', error);
    }
}
