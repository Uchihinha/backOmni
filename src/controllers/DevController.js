const axios = require('axios');
const Dev = require('../models/Dev');
const utils = require('../utils');

module.exports = {

    async index(request, response) {

        let devs;
        let params = Object.entries(request.query).reduce((a,[k,v]) => (v ? {...a, [k]:v} : a), {})

        if (params && params.techs){
            params.techs = utils.stringToArray(params.techs);
        }

        if (Object.keys(params).length == 0){
            devs = await Dev.find();
        }else{
            devs = await Dev.find({
                techs: {
                    $in: params.techs
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [params.longitude, params.latitude]
                        },
                        $maxDistance: 10000
                    }
                }
            });
        }
        
        return response.json({data: devs});
    },

    async store(request, response)  {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (dev) {
            console.log('Dev já encontrado');
            return response.json({ data: dev, message: 'Dev cadastrado com sucesso!' });
        }

        const github_user = await axios.get(`https://api.github.com/users/${github_username}`);
    
        const { name = login, avatar_url, bio } = github_user.data;
    
        const techsArray = utils.stringToArray(techs);
    
        const location = { 
            type: 'Point',
            coordinates: [longitude, latitude] // invertido mesmo, pois é assim que o Mongo trabalha
        }
    
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });
    
        return response.json({ data: dev, message: 'Dev cadastrado com sucesso!' });
    },

    async update(request, response) {

    },

    async destroy(request, response) {
        
    }

}