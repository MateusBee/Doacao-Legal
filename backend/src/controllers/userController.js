const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = {
    
    async create(request, response) { //create an user

        const { name, email, senha, telefone, cidade, rua, bairro, numero, uf, cep } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
        const user_id = id;

        await connection('user').insert({
            id,
            name,
            email,
            senha,
            telefone
        });

        await connection('address').insert({
            cep,
            cidade,
            bairro,
            rua,
            numero,
            uf,
            user_id
        });

        return response.json({ id });
    }
}