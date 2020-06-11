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
            .join('images', 'images.item_id', '=', 'item.id')
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
            .join('images', 'images.item_id', '=', 'item.id')
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
                'address.uf',

                'images.id as image_id',
                'images.uri'
            ]);

        // const images = await  connection('images')
        //     .where('item_id', '=', )

        response.header('X-Total-Count', count['count(*)'])

        return response.json(item);
    },

    async create(request, response) {
        const { item, descricao, photos } = request.body;
        const user_id = request.headers.authorization;
        const pictures = photos.map(photo => photo.uri);
        const images = pictures.toString();

        const trx = await connection.transaction();

        const [item_id] = await trx('item')
        .insert({
            item,
            descricao,
            user_id
        });

        if(photos) {
            await trx('images').insert({
                uri: images,
                item_id
            });
        }

        await trx.commit();

        return response.json(item_id);
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