import user from "./models/user";
import sjcl from "sjcl";
import jwt from "jsonwebtoken";
import verifyToken from "./scripts/verifyToken";

export default async(fastify, options) => {
    
    fastify.post('/newuser', async (request,reply) => {
        const User = new user({
            Name: request.body.Name,
            Email : request.body.Email,
            Password: request.body.Password,
            Events: [],
            Shared: []
        });

        try{
            const resp = await User.save();
            reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send({ "User": resp })
        }
        catch(e){
            
            reply.code(400).header('Content-Type', 'application/json; charset=utf-8').send({ "Sad": `${e}` });

        }       
    });

    fastify.get('/User', {prefinder: verifyToken} ,async(request,reply) => {

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

    fastify.get('/Events', {prefinder: verifyToken} ,async(request,reply) => {

        try{

            const resp = await user.findOne({_id: request.query.id});

            const events = resp.Events;

            
            
            if(resp){
                reply.code(200).send(events);
            }

            reply.code(404).send("Not Found");

        }


        
        catch(e){
            reply.code(500).send(e);
        }

    });

    fastify.post('/Events', {prefinder: verifyToken} ,async (request,reply) => {

        try{

            

           const resp = await user.findOneAndUpdate({_id: request.query.id},{
            $push: {
                Events: {
                    Title: request.body.Title,
                    Date: request.body.Date,
                    Notes: request.body.Notes,
                    Location: request.body.Location
                }
            }
           })
           

            
            
            reply.code(200).send();

        }


        
        catch(e){
            reply.code(500).send(e);
        }

    });

    fastify.post('/verify-token', { preHandler: [verifyToken] } ,async (request, reply ) => {

        reply.send(200).send({"Message": "Approved"})

    })

    fastify.post('/login', async (request, reply) => {

        try{
            const login = await user.findOne({Email: request.body.Email});

            if(!login){
                reply.code(404).send({message: "User not Found"});
            }


            if(login.Password === request.body.Password){

                const id = login._id;
                const token = jwt.sign({id}, process.env.JWTSCRT, {
                    expiresIn: 300,
                });


                reply.code(200).send({message: "Authorised", token: token, id: login._id});
            }
            else{
                reply.code(401).send({message: "Incorrect Login Credentials"});
            }
            
        }
        catch(e){
            reply.code(500).send(e);
        }


    });



}