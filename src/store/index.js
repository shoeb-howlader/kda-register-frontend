import { createStore, storeKey } from 'vuex'
import axios from 'axios'
import ProductService from "../service/ProductService";
export default createStore({
  state: {
    products: [],
    departments: [],
    categories: [],
    designations:[],
    loading1:true,
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}

  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    SET_PRODUCTS(state,products)
    {
        state.products=products
    },
    DELETE_PRODUCTS(state,product)
    {
      let _id = product._id;
      state.products = state.products.filter((product) => {
        return product._id !== _id})
    },
    DELETE_SELECTED_PRODUCTS(state,selectedProducts){
      selectedProducts.forEach((element) => {
        state.products = state.products.filter((product) => {
          return product._id !== element._id;
        });
      })
    },
    SET_DEPARTMENTS(state,departments)
    {
      state.departments=departments;
    },
    ADD_DEPARTMENT(state,department){
      state.departments.push(department)
    },
    SET_CATEGORIES(state,categories)
    {
      state.categories=categories;
    },
    ADD_CATEGORY(state,category){
      state.categories.push(category);
    },
    SET_DESIGNATIONS(state,designations){
      state.designations=designations
    },
    ADD_DESIGNATION(state,designation){
      state.designations.push(designation)
    },
    SET_LOADING(state,value)
    {
      state.loading1=value;
    },
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },

  },
  actions: {
    initiateProducts({commit}){
      if(this.getters.isLoggedIn)
      {
      this.productService = new ProductService();
      this.productService.getProducts().then((data) => {
       commit('SET_PRODUCTS',data)
       commit('SET_LOADING',false)

      });
      this.productService.getCategories().then((data) => {
        commit('SET_CATEGORIES',data)
      });
  
      this.productService.getDepartments().then((data) => {
        commit('SET_DEPARTMENTS',data)
      });

      this.productService.getDepartments().then((data) => {
        commit('SET_DESIGNATIONS',data)
      });
      }
    },
  reload({commit}){
     if(this.getters.isLoggedIn)
     {
      
    
      this.productService = new ProductService();
      this.productService.getProducts().then((data) => {
       commit('SET_PRODUCTS',data)
       commit('SET_LOADING',false)
      })
      .catch((err)=>{commit('SET_LOADING',true)});

      this.productService.getCategories().then((data) => {
        commit('SET_CATEGORIES',data)
      });
  
      this.productService.getDepartments().then((data) => {
        commit('SET_DEPARTMENTS',data)
      });

      this.productService.getDesignations().then((data) => {
        commit('SET_DESIGNATIONS',data)
      });

      this.productService.getTokenExpired();

    }
    },
   
   login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
       axios({url: process.env.VUE_APP_API_LOGIN, data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
  },
  logout({commit}){
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }



  },
  modules: {
  }
})
