const connection = require('../database/connection');

module.exports = {

    async create(request, response) { // Login
        const { email, senha } = request.body;

        const user = await connection('user')
            .where('email', email).andWhere('senha', senha)
            .select(
                'user.name',
                'user.telefone',
                'user.email',
            )
            .first();

        if(!user){
            return response.status(400).json({ error: 'No user found' });
        }

        return response.json(user);
    }

};