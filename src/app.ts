import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express from 'express';
import firebase from 'firebase'
import { UserAuthDTOValidation } from "./validations/auth";
import AuthenticatedUserService from "./services/auth/AuthenticatedUserService";
import {firebaseConfig} from './config/firebase'


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const user = db.collection('users')
const hero = db.collection('hero')
const app = express();

app.use(express.json());
app.use(cors());

// CRUD DE USERS

app.get('/users', async (req, res) => {
    const snapshot = await user.get();
    const users = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    res.send(users)
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const snapshot = await user.get();
    const users = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    const userfilter = users.filter((u) => {return u.id === id}) 
    res.send(userfilter)
})

app.post('/users', async (req, res) => {
    const data = req.body;
    await user.add(data)
    res.status(201).send({msg: 'Usuário criado com sucesso'})
})

app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    await user.doc(id).update(req.body);
    res.send({msg: 'Usuário atualizado com sucesso'})
})

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    await user.doc(id).delete;
    res.send({msg: 'Usuário deletado com sucesso'})
})

//  CRUD DE HEROES

app.get('/heroes', async (req, res) => {
    const snapshot = await hero.get();
    const heroes = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    res.send(heroes)
})

app.get('/hero/:id', async (req, res) => {
    const id = req.params.id;
    const snapshot = await hero.get();
    const heroes = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    const herofilter = heroes.find((u) => {return u.id === id}) 
    res.send(herofilter)
})

app.post('/hero', async (req, res) => {
    const data = req.body;
    await hero.add(data)
    res.status(201).send({msg: 'Usuário criado com sucesso'})
})

app.put('/hero/:id', async (req, res) => {
    const id = req.params.id;
    let response = req.body
    if (response.length <= 0) {
       response = {};
    }
    // await user.doc(id).update(req.body);
    await db.collection('hero').doc(id).update(response);
    res.send({msg: 'Usuário atualizado com sucesso'})
})

app.delete('/hero/:id', async (req, res) => {
    const id = req.params.id;
    await db.collection('hero').doc(id).delete();
    
    res.send({msg: 'Usuário deletado com sucesso'})
})


// AUTH

app.post('/auth', async (req, res) => {

    try {
        const userAuth = req.body;
        await UserAuthDTOValidation.validate(userAuth).catch((err: { message: string | undefined; }) => {
        throw new Error(err.message);
    })
    const authenticatedUserService = new AuthenticatedUserService();
    const userAuthenticated = await authenticatedUserService.execute(userAuth).catch(err => {
        console.log(err)
    })
    res.json(userAuthenticated)
    } catch (error) {
        console.log(error)
    }   
  })

app.listen(process.env.PORT)
  

export default app;
