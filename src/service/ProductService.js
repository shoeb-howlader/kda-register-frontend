export default class ProductService {

    getProductsSmall() {
		return fetch('products-small.json').then(res => res.json()).then(d => d.data);
	}

	async getProducts() {
		//return fetch('./products.json').then(res => res.json()).then(d => d.data);

        let response = await fetch('http://localhost:3000/projects');
        let data = await response.json();
        data.forEach(product => product.date = new Date(product.date));
        console.log(data);
        return data;
    }

    getProductsWithOrdersSmall() {
		return fetch('products-orders-small.json').then(res => res.json()).then(d => d.data);
	}
}