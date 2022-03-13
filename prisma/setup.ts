import { Prisma, PrismaClient } from "@prisma/client";
import { create } from "ts-node";

const prisma = new PrismaClient()

const users: Prisma.UserCreateInput[] = [
    {
        name: 'Elidon',
        email: 'elidon@live.com',

        orders: {
            create: [
                { item: { connect: { title: 'Jeans' } }, quantity: 3 },
                { item: { connect: { title: 'T-Shirt' } }, quantity: 5 }
            ]
        }
    },
    {
        name: 'Ed',
        email: 'ed@live.com',

        orders: {
            create: [
                { item: { connect: { title: 'Cat Ears' } }, quantity: 5 },
                { item: { connect: { title: 'Cat Ears' } }, quantity: 5 },
                { item: { connect: { title: 'Cat Ears' } }, quantity: 5 }
            ]
        }
    },
    {
        name: 'Visard',
        email: 'wizard@live.com',

        orders: {
            create: [
                { item: { connect: { title: 'Gucci Belt' } }, quantity: 5 },
                { item: { connect: { title: 'Jeans' } }, quantity: 5 },
                { item: { connect: { title: 'Cat Ears' } }, quantity: 1 },
                {
                    item: {
                        connectOrCreate: {
                            where: { title: 'Socks' },
                            create: { Image: 'socks.jpg', price: 2, title: 'Socks' }
                        }
                    },
                    quantity: 20
                }
            ]
        }
    }
]

const items: Prisma.ItemCreateInput[] = [
    {
        title: 'Jeans',
        Image: 'jeans.jpg',
        price: 60
    },
    {
        title: 'Cat Ears',
        Image: 'catears.jpg',
        price: 7
    },
    {
        title: 'Gucci Belt',
        Image: 'guccibelt.jpg',
        price: 240
    },
    {
        title: 'T-Shirt',
        Image: 'tshirt.jpg',
        price: 5
    },
    {
        title: 'Underwear',
        Image: "underwear.jpg",
        price: 3
    }
]

async function populateDB() {
    for (const item of items) {
        await prisma.item.create({ data: item })
    }

    for (const user of users) {
        await prisma.user.create({ data: user })
    }
}

populateDB()