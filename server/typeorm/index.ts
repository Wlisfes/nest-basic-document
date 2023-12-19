import { AppDataSource } from './data-source'

//prettier-ignore
AppDataSource.initialize().then(async () => {
    console.log('Here you can setup and run express / fastify / any other framework.')
}).catch((err: string) => {
    console.log(err)
})
