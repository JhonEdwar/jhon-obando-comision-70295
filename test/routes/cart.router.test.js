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

describe('Test router /api/cart', function(){
    this.timeout(10000)
    
    after(async()=>{
        await mongoose.connection.collection("carts").deleteMany({
            buyerId: '683e5135c96d8104ae22b7aa'
        });
    })
    
    it('if i execute the route /api/cart, with method GET, it should return an array of carts', async function(){
        const {_body, statusCode} = await requester.get('/api/cart')
        expect(statusCode).to.be.equal(200)
        expect(_body).to.be.an('array')
        if(Array.isArray(_body.payload)){   
            _body.payload.forEach(cart=>{          
                expect(isValidObjectId(cart._id)).to.be.true
                expect(cart).to.have.property('buyerId')
                expect(cart).to.have.property('products')
            })
        }
    })

    it('if i execute the route /api/cart/carts, with method GET, it should return carts for a buyer', async function(){
        const {_body, statusCode} = await requester.get('/api/cart/carts')
        expect(statusCode).to.be.equal(200)
        expect(_body).to.be.an('array')
        if(Array.isArray(_body.payload)){   
            _body.payload.forEach(cart=>{          
                expect(isValidObjectId(cart._id)).to.be.true
                expect(cart).to.have.property('buyerId')
            })
        }
    })

    it('if i execute the route /api/cart, with method POST, it should create a new cart', async function(){
        const {_body, statusCode} = await requester.post('/api/cart').send({
            buyerId: '683e5135c96d8104ae22b7aa'
        })
        expect(statusCode).to.be.equal(200)
        expect(isValidObjectId(_body.payload._id)).to.be.true
        expect(_body.payload).to.have.property('buyerId')
    })

    it('if i execute the route /api/cart/products/:idCart, with method POST, it should add a product to cart', async function(){
        const {_body, statusCode} = await requester.post('/api/cart/products/683e5135c96d8104ae22b7aa').send({
            productId: '683e5135c96d8104ae22b7aa',
            quantity: 2
        })
        expect(statusCode).to.be.equal(200)
        expect(isValidObjectId(_body.payload._id)).to.be.true
        expect(_body.payload).to.have.property('products')
    })

    it('if i execute the route /api/cart/:idCart, with method DELETE, it should delete a cart', async function(){
        const {_body, statusCode} = await requester.delete('/api/cart/683e5135c96d8104ae22b7aa')
        expect(statusCode).to.be.equal(200)
        expect(_body).to.have.property('message')
    })

})
