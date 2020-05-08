const connection = require('../database/connection');

module.exports = {

    async fetch(request, response) {
        const user_id = request.headers.authorization;
        const { page = 1 } = request.query

        const [count] = await connection('item')
            .where('user_id', user_id)
            .count();
        
        const items = await connection('item')
            .where('user_id', user_id)
            .limit(5)
            .offset((page -1) * 5)
            .select('*');

        response.header('X-Total-Count', count['count(*)'])

        return response.json(items);
    },

    async index(request, response) { // get all items
        const { page = 1 } = request.query

        const [count] = await connection('item').count();

        const item = await connection('item')
            .join('user', 'user.id', '=', 'item.user_id')
            .join('address', 'address.user_id', '=', 'user.id')
            .limit(5)
            .offset((page -1) * 5)
            .select([
                'item.id',
                'item.item',
                'item.descricao',
                'item.user_id',

                'user.name',
                'user.email',
                'user.telefone',
                
                'address.cep',
                'address.cidade',
                'address.rua',
                'address.bairro',
                'address.numero',
                'address.uf'
            ]);

        response.header('X-Total-Count', count['count(*)'])

        return response.json(item);
    },

    async create(request, response) {
        const { item, descricao } = request.body;
        const user_id = request.headers.authorization;

        const [obj] = await connection('item')
        .insert({
            item,
            descricao,
            user_id
        });

        return response.json(obj);
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const item = await connection('item')
        .where('id', id)
        .select('user_id')
        .first();

        if(item.user_id !== user_id){
            return response.status(401).json({ error: 'Operation not permitted!' });
        }

        await connection('item').where('id', id).delete();

        return response.status(204).send();


    }

}