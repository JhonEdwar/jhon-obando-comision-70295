import {expect} from 'chai'
import {describe, it} from 'mocha'
import supertest from 'supertest'
import mongoose,{ isValidObjectId }  from 'mongoose'
import { config } from '../../src/config/config.js'

const requester = supertest(config.FRONTEND_URL)

try {
    await mongoose.connect(config.MONGO)
} catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
}

describe('Test router /api/products', function(){
    this.timeout(10000)
    
    after(async()=>{
        await mongoose.connection.collection("products").deleteMany({
            name: 'Test Product'
        });
        await mongoose.connection.collection("products").deleteMany({
            name: 'Updated Product'
        });
    })
    
    it('if i execute the route /api/products, with method GET, it should return an array of products', async function(){
        const {_body, statusCode} = await requester.get('/api/products')
        expect(statusCode).to.be.equal(200)
        expect(_body).to.be.an('array')
        if(Array.isArray(_body.payload)){   
            _body.payload.forEach(product=>{          
                expect(isValidObjectId(product._id)).to.be.true
                expect(product).to.have.property('name')
                expect(product).to.have.property('price')
            })
        }
    })

    it('if i execute the route /api/products/:id, with method GET, and the id is valid, it should return a product', async function(){
        const {_body, statusCode} = await requester.get('/api/products/683e5135c96d8104ae22b7aa')
        expect(statusCode).to.be.equal(200)
        expect(isValidObjectId(_body.payload._id)).to.be.true
        expect(_body.payload).to.have.property('name')
        expect(_body.payload).to.have.property('price')
    })

    it('if i execute the route /api/products, with method POST, it should create a new product', async function(){
        const {_body, statusCode} = await requester.post('/api/products').send({
            name: 'Test Product',
            description: 'Test Description',
            price: 100,
            stock: 10,
            businessId: '683e5135c96d8104ae22b7aa'
        })
        expect(statusCode).to.be.equal(200)
        expect(isValidObjectId(_body.payload._id)).to.be.true
        expect(_body.payload).to.have.property('name')
        expect(_body.payload).to.have.property('price')
    })

    it('if i execute the route /api/products/:id, with method PATCH, it should update a product', async function(){
        const {_body, statusCode} = await requester.patch('/api/products/683e5135c96d8104ae22b7aa').send({
            name: 'Updated Product',
            price: 150
        })
        expect(statusCode).to.be.equal(200)
        expect(isValidObjectId(_body.payload._id)).to.be.true
        expect(_body.payload).to.have.property('name')
        expect(_body.payload).to.have.property('price')
    })

    it('if i execute the route /api/products/:id, with method DELETE, it should delete a product', async function(){
        const {_body, statusCode} = await requester.delete('/api/products/683e5135c96d8104ae22b7aa')
        expect(statusCode).to.be.equal(200)
        expect(_body).to.have.property('message')
    })

})
