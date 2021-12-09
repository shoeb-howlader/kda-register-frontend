import axios from "axios";
import store from '../store'


export default class ProductService {
  constructor() {
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.state.token}`
  }

	async getProducts() {
    
        try {
          let response = await axios.get('/api/products',{headers:{Authorization:`Bearer ${store.state.token}`}});
          let data =response.data;
          data.forEach(product =>{ product.date = new Date(product.date)
            product.userDetails.forEach(user=>user.date = new Date(user.date))
            });
            return data;
        } catch (error) {
          return error;
        }  
    }

    async getCategories(){
      
      
      //let response = await fetch('/api/categories');
      try {
        let response = await axios.get('/api/categories',{headers:{Authorization:`Bearer ${store.state.token}`}});
        let data =response.data;
          return data;
      } catch (error) {
        return error;
      } 

    }

    async getDepartments(){

     try {
        let response = await axios.get('/api/departments',{headers:{Authorization:`Bearer ${store.state.token}`}});
        let data =response.data;
          return data;
      } catch (error) {
        return error;
      } 

    }

    async getDesignations(){

      try {
        let response = await axios.get('/api/designations',{headers:{Authorization:`Bearer ${store.state.token}`}});
        let data =response.data;
          return data;
      } catch (error) {
        return error;
      } 

    }

    async getTokenExpired()
    {
      axios.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            store.dispatch(logout)
          }
          throw err;
        });
      });
    }
}