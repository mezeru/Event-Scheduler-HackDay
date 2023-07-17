import fastify from "fastify";
import user from "./models/user";

export default async(fastify, options) => {
    
    fastify.post('/newuser', async (request,reply) => {
        const User = new user({
            Name: request.body.Name,
            Email : request.body.Email,
            Password: request.body.Password,
            Events: []
        });

        try{
            const resp = await User.save();
            reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send({ "User": resp })
        }
        catch(e){
            
            reply.code(400).header('Content-Type', 'application/json; charset=utf-8').send({ "Sad": `${e}` });

        }       
    });

    fastify.get('/User', async(request,reply) => {

        try{

            const resp = await user.findOne({_id: request.query.id});

            resp.Password = false;
            
            if(resp){
                reply.code(200).send(resp);
            }

            reply.code(404).send("Not Found");

        }


        
        catch(e){
            reply.code(500).send(e);
        }

    });

    



}