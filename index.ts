import { PrismaClient } from "@prisma/client";
import express from 'express'
import cors from 'cors'
import { TSError } from "ts-node";

const prisma = new PrismaClient()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 4000

app.get('/users', async (req, res) => {

    try {
        const allUsers = await prisma.user.findMany()

        if (allUsers) {
            res.send(allUsers)
        } else {
            res.send(404).send({ error: 'No users found' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})


app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const user = await prisma.user.findUnique({ where: { id: id } })

        if (user) {
            res.send(user)
        } else {
            res.send(404).send({ error: 'User not found' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.get('/items', async (req, res) => {

    try {
        const allItems = await prisma.item.findMany()

        if (allItems) {
            res.send(allItems)
        } else {
            res.send(404).send({ error: 'No items found' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.get('/items/:title', async (req, res) => {
    const title = req.params.title

    try {
        const itemTitle = await prisma.item.findUnique({ where: { title } })
        if (itemTitle) {
            res.send(itemTitle)
        } else {
            res.sendStatus(404).send({ error: 'No item with this title was found' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`Server walking in : http://localhost:${PORT}`);
})