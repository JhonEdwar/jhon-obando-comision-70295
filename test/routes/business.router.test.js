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

describe('Test router /api/business', function(){
    this.timeout(10000)
    
    after(async()=>{
        await mongoose.connection.collection("products").deleteMany({
            name: 'Test Product'
        });
    })
    
    it('if i execute the route /api/business, with method GET, it should return an array of businesses', async function(){
        const {_body, statusCode} = await requester.get('/api/business')
        expect(statusCode).to.be.equal(200)
        expect(_body).to.be.an('array')
        if(Array.isArray(_body.payload)){   
            _body.payload.forEach(business=>{          
                expect(isValidObjectId(business._id)).to.be.true
                expect(business).to.have.property('businessName')
                expect(business).to.have.property('email')
                expect(business).to.have.property('role')
            })
        }
    })

    it('if i execute the route /api/business/:id, with method GET, and the id is valid, it should return a business', async function(){
        const {_body, statusCode} = await requester.get('/api/business/683e5135c96d8104ae22b7aa')
        expect(statusCode).to.be.equal(200)
        expect(isValidObjectId(_body.payload._id)).to.be.true
        expect(_body.payload).to.have.property('businessName')
        expect(_body.payload).to.have.property('email')
    })

    it('if i execute the route /api/business/:id/product, with method POST, it should create a product for the business', async function(){
        const {_body, statusCode} = await requester.post('/api/business/683e5135c96d8104ae22b7aa/product').send({
            name: 'Test Product',
            description: 'Test Description',
            price: 100,
            stock: 10
        })
        expect(statusCode).to.be.equal(200)
        expect(isValidObjectId(_body.payload._id)).to.be.true
        expect(_body.payload).to.have.property('name')
        expect(_body.payload).to.have.property('price')
    })

})
