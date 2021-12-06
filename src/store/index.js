import { createStore, storeKey } from 'vuex'
import ProductService from "../service/ProductService";
export default createStore({
  state: {
    products: [],
    departments: [],
    categories: [],
    designations:[],
    loading1:true

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
    }

  },
  actions: {
    initiateProducts({commit}){
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
    },
  reload({commit}){
    
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


    },
   
  },
  modules: {
  }
})
