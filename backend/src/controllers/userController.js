const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = {

    async fetch(request, response) {
        const user_id = request.headers.authorization;

        const [user] = await connection('user')
            .join('address', 'address.user_id', '=', 'user.id')
            .where('user.id', user_id)
            .select([
                'user.name',
                'user.email',
                'user.senha',
                'user.telefone',
                
                'address.cep',
                'address.cidade',
                'address.rua',
                'address.bairro',
                'address.numero',
                'address.uf'
            ])

        return response.json(user);
    },
    
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
    },

    async put(request, response) {
        const user_Id = request.headers.authorization;
        const { name, email, senha, telefone, cidade, rua, bairro, numero, uf, cep } = request.body;

        const trx = await connection.transaction();

        await trx('user')
            .where('id', user_Id)
            .update({
                name,
                email,
                senha,
                telefone
            });

        await trx('address')
            .where('user_id', user_Id)
            .update({
                cep,
                cidade,
                bairro,
                rua,
                numero,
                uf
            });

        await trx.commit();

        return response.json({ user_Id });
    },

    async recover(request, response) {
        const email = request.headers.email;

        const [user] = await connection('user')
            .where('email', email)
            .select([
                'user.name',
                'user.senha'
            ]);

        if(!user){
            return response.status(404).json({ error: 'Email not found!' });
        }

        return response.json(user);
    }
}