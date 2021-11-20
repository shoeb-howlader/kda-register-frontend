export default class ProductService {

    getProductsSmall() {
		return fetch('products-small.json').then(res => res.json()).then(d => d.data);
	}

	async getProducts() {
		//return fetch('./products.json').then(res => res.json()).then(d => d.data);

    let api=process.env.VUE_APP_API
        let response = await fetch(api);
        let data = await response.json();
        //data=data.data;
        //console.log(data);
        data.forEach(product =>{ product.date = new Date(product.date)
        product.userDetails.forEach(user=>user.date = new Date(user.date))
        });
       
        return data;
    }

    getProductsWithOrdersSmall() {
		return fetch('products-orders-small.json').then(res => res.json()).then(d => d.data);
	}
}