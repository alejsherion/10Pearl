export class ClientModel{
    nit;
    firstName;
    secondName;
    firstLastName;
    secondLastName;
    fullName;
    birthDate;
    address;
    phone;
    city;
    state;
    country;
    creditLimit;
    availableCredit;
    visitsPercentage;
    visits = [];

    constructor () {
        this.nit = '';
        this.firstName = '';
        this.secondName = '';
        this.firstLastName = '';
        this.secondLastName = '';
        this.fullName = '';
        this.birthDate = '';
        this.address = '';
        this.phone = '';
        this.city = '';
        this.state = '';
        this.country = '';
        this.creditLimit = 0;        
        this.visits = [];
    }
}