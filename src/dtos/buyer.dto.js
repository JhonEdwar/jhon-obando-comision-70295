export default class BuyerDTO {
    constructor(buyer){
        this.fullName = buyer.firstName + " " + buyer.lastName
        this.email=buyer.email
    }
}