const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'chamadaonline2025';

app.use(bodyParser.json());

const usuarios = [
    { id: 1, nome: 'André Lima', email: 'andre@empresa.com', senha: 'Senha123', perfil: 'gestor' },
    { id: 2, nome: 'Luciana Costa', email: 'luciana@empresa.com', senha: 'Senha123', perfil: 'rh' },
    { id: 3, nome: 'Carlos Silva', email: 'carlos@empresa.com', senha: 'Senha123', perfil: 'lider' }
];

const presencas = [
    { id: 1, nome: 'João Silva', departamento: 'Produção', status: 'Presente', cracha: '12345' },
    { id: 2, nome: 'Maria Oliveira', departamento: 'RH', status: 'Presente', cracha: '67890' },
    { id: 3, nome: 'Carlos Souza', departamento: 'Financeiro', status: 'Ausente', cracha: '54321' }
];

app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (!usuario) return res.status(401).json({ success: false, message: 'Credenciais inválidas' });

    const token = jwt.sign({ id: usuario.id, perfil: usuario.perfil }, SECRET_KEY, { expiresIn: '2h' });
    res.json({ success: true, token, perfil: usuario.perfil });
});

function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.get('/api/presencas', autenticarToken, (req, res) => {
    res.json({ success: true, data: presencas });
});

app.post('/api/checkin', autenticarToken, (req, res) => {
    const { cracha } = req.body;
    const colaborador = presencas.find(p => p.cracha === cracha);
    if (colaborador) {
        colaborador.status = 'Presente';
        return res.json({ success: true, message: 'Check-in realizado', data: colaborador });
    } else {
        return res.status(404).json({ success: false, message: 'Colaborador não encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});