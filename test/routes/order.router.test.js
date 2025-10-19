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

describe('Test router /api/order', function(){
    this.timeout(10000)
    
    after(async()=>{
        await mongoose.connection.collection("orders").deleteMany({
            buyerId: '683e5135c96d8104ae22b7aa'
        });
    })
    
    it('if i execute the route /api/order, with method GET, it should return an array of orders', async function(){
        const {_body, statusCode} = await requester.get('/api/order')
        expect(statusCode).to.be.equal(200)
        expect(_body).to.be.an('array')
        if(Array.isArray(_body.payload)){   
            _body.payload.forEach(order=>{          
                expect(isValidObjectId(order._id)).to.be.true
                expect(order).to.have.property('buyerId')
                expect(order).to.have.property('status')
            })
        }
    })

    it('if i execute the route /api/order/:id, with method GET, and the id is valid, it should return an order', async function(){
        const {_body, statusCode} = await requester.get('/api/order/683e5135c96d8104ae22b7aa')
        expect(statusCode).to.be.equal(200)
        expect(isValidObjectId(_body.payload._id)).to.be.true
        expect(_body.payload).to.have.property('buyerId')
        expect(_body.payload).to.have.property('status')
    })

    it('if i execute the route /api/order/buyer/:idBuyer, with method GET, it should return orders for a buyer', async function(){
        const {_body, statusCode} = await requester.get('/api/order/buyer/683e5135c96d8104ae22b7aa')
        expect(statusCode).to.be.equal(200)
        expect(_body).to.be.an('array')
        if(Array.isArray(_body.payload)){   
            _body.payload.forEach(order=>{          
                expect(isValidObjectId(order._id)).to.be.true
                expect(order).to.have.property('buyerId')
            })
        }
    })

    it('if i execute the route /api/order/business/:idBusiness, with method GET, it should return orders for a business', async function(){
        const {_body, statusCode} = await requester.get('/api/order/business/683e5135c96d8104ae22b7aa')
        expect(statusCode).to.be.equal(200)
        expect(_body).to.be.an('array')
        if(Array.isArray(_body.payload)){   
            _body.payload.forEach(order=>{          
                expect(isValidObjectId(order._id)).to.be.true
                expect(order).to.have.property('businessId')
            })
        }
    })

    it('if i execute the route /api/order, with method POST, it should create a new order', async function(){
        const {_body, statusCode} = await requester.post('/api/order').send({
            buyerId: '683e5135c96d8104ae22b7aa',
            cartId: '683e5135c96d8104ae22b7aa',
            businessId: '683e5135c96d8104ae22b7aa'
        })
        expect(statusCode).to.be.equal(200)
        expect(isValidObjectId(_body.payload._id)).to.be.true
        expect(_body.payload).to.have.property('buyerId')
        expect(_body.payload).to.have.property('status')
    })

    it('if i execute the route /api/order/:id, with method POST, it should resolve an order', async function(){
        const {_body, statusCode} = await requester.post('/api/order/683e5135c96d8104ae22b7aa').send({
            status: 'completed'
        })
        expect(statusCode).to.be.equal(200)
        expect(isValidObjectId(_body.payload._id)).to.be.true
        expect(_body.payload).to.have.property('status')
    })

})
