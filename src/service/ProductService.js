export default class ProductService {

    getProductsSmall() {
		return fetch('products-small.json').then(res => res.json()).then(d => d.data);
	}

	async getProducts() {
		//return fetch('./products.json').then(res => res.json()).then(d => d.data);

        let response = await fetch('http://localhost:3000/projects');
        let data = await response.json();
        data.forEach(product => product.purchaseDate = new Date(product.purchaseDate));
        console.log(data);
        return data;
    }

    getProductsWithOrdersSmall() {
		return fetch('products-orders-small.json').then(res => res.json()).then(d => d.data);
	}
}