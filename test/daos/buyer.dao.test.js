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

describe('Test router /api/buyer', function(){
    this.timeout(10000)
    
    after(async()=>{
        await mongoose.connection.collection("buyers").updateOne(
            { _id: new mongoose.Types.ObjectId("67fbeef9338dd0b198047fcd") }, 
            { $set: { firstName: 'Dani', lastName: 'Veintiuno'} }
       
          );
    })

    it('if i execute the route /api/buyer, with method GET, it should return an array of buyers', async function(){
        const {_body, statusCode} = await requester.get('/api/buyer')
        expect(statusCode).to.be.equal(200)
        expect(_body).to.be.an('array')
        if(Array.isArray(_body.payload)){   
            _body.payload.forEach(buyer=>{          
                expect(isValidObjectId(_body.payload._id)).to.be.true
                expect(buyer).to.have.property('firstName')
                expect(buyer).to.have.property('email')
                expect(buyer).to.have.property('role')
            })
        }
    })

    it('if i execute the route /api/buyer/:id, with method PATCH, and the id is valid, it should return a buyer', async function(){
        const {_body, statusCode} = await requester.patch('/api/buyer/683e5135c96d8104ae22b7aa').send({
            firstName: 'Alejandro',
            lastName: 'Garcia',
        })
        expect(statusCode).to.be.equal(200)
        expect(isValidObjectId(_body.payload._id)).to.be.true
        expect(_body.payload).to.have.property('firstName')
        expect(_body.payload).to.have.property('lastName')
    })

})