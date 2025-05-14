console.log('App.js funcionando');

// URL da API do backend em produção
const API_URL = 'https://chamadaonline-backend.up.railway.app/api';

// Função de login chamando a API do backend
async function login(email, senha) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        // Verifica se o login foi bem-sucedido
        if (!response.ok) {
            throw new Error(`Erro no login: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Login OK:', data);

        // Aqui você pode redirecionar ou armazenar o token, exemplo:
        // localStorage.setItem('token', data.token);
        // window.location.href = '/dashboard.html';

    } catch (error) {
        console.error('Erro ao conectar no backend:', error);
        alert('Erro ao conectar no servidor. Tente novamente.');
    }
}

// Exemplo de evento no botão de login (se existir um form no HTML):
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.querySelector('input[type="email"]').value;
            const senha = document.querySelector('input[type="password"]').value;

            login(email, senha);
        });
    }
});
