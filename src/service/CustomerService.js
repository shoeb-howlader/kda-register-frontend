export default class CustomerService {

    async getCustomersSmall() {
        let response = await fetch('http://localhost:3000/cars');
        let data = await response.json();
        data.forEach(product => product.purchaseDate = new Date(product.purchaseDate));
        console.log(data);
        return data;
    }

    async getCustomersMedium() {
        let response = await fetch('http://localhost:3000/cars');
        let data = await response.json();
        data.forEach(product => product.purchaseDate = new Date(product.purchaseDate));
        console.log(data);
        return data;
    }

    async  getCustomersLarge() {
        let response = await fetch('http://localhost:3000/cars');
        let data = await response.json();
        //data.forEach(product => product.purchaseDate = new Date(product.purchaseDate));
        console.log(data);
        return data;
    }

    async  getCustomersXLarge() {
        let response = await fetch('http://localhost:3000/cars');
        let data = await response.json();
        data.forEach(product => product.purchaseDate = new Date(product.purchaseDate));
        console.log(data);
        return data;
    }

    async getCustomers(params) {
        let response = await fetch('http://localhost:3000/cars');
        let data = await response.json();
        data.forEach(product => product.purchaseDate = new Date(product.purchaseDate));
        console.log(data);
        return data;
    }
}
    