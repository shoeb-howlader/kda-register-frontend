<template lang="">

<Card>
    <template #content>
    <div>
       <TabView>
	<TabPanel header="Summary">
    <Toolbar>
    <template #end>
 <Button type="button" class="p-button-outlined p-button-success" @click="print('summary')">
            <img alt="logo" src="https://img.icons8.com/color/48/000000/print.png" style="width: 1.5rem" />
            <span class="p-ml-2 p-text-bold">Print</span>
        </Button>
    </template>
</Toolbar>
    <br>
        <div id="summary" >
	<h4>All products at a glance</h4>
  <table  class="table table-bordered table-striped">
          <thead><tr>
            <th>SL. no</th>
            <th>Product Category</th>
            <th>Number(active)</th>
            <th>Number(In-active)</th>
            <th>Number(In-stock)</th>
          </tr></thead>
          <tbody>
          <tr v-for="(category,index) in categories" :key="category._id">
            <td>{{index+1}}</td>
            <td>{{category.name}}</td>
            <td>{{categoryWiseCount(category.name)}}</td>
            <td>{{ categoryWiseInactiveCount(category.name)}}</td>
            <td>{{ categoryWiseInstockCount(category.name)}}</td>
          </tr>
          </tbody>
        </table>

        <br>

        </div>
	</TabPanel>
  <TabPanel header="Summary(In-Active)">
    <Toolbar>
    <template #end>
 <Button type="button" class="p-button-outlined p-button-success" @click="print('summary_inactive')">
            <img alt="logo" src="https://img.icons8.com/color/48/000000/print.png" style="width: 1.5rem" />
            <span class="p-ml-2 p-text-bold">Print</span>
        </Button>
    </template>
</Toolbar>
    <br>
        <div id="summary_inactive" >
	<h4>All In-Active  products at a glance</h4>
  <table  class="table table-bordered table-striped">
          <thead><tr>
            <th>SL. no</th>
            <th>Product Category</th>
            <th>Number(In-active)</th>
          </tr></thead>
          <tbody>
          <tr v-for="(category,index) in categories" :key="category._id">
            <td>{{index+1}}</td>
            <td>{{category.name}}</td>
            <td>{{ categoryWiseInactiveCount(category.name)}}</td>
          </tr>
          </tbody>
        </table>

        <br>

        </div>
	</TabPanel>
   <TabPanel header="Summary(In-Stock)">
    <Toolbar>
    <template #end>
 <Button type="button" class="p-button-outlined p-button-success" @click="print('summary_instock')">
            <img alt="logo" src="https://img.icons8.com/color/48/000000/print.png" style="width: 1.5rem" />
            <span class="p-ml-2 p-text-bold">Print</span>
        </Button>
    </template>
</Toolbar>
    <br>
        <div id="summary_instock" >
	<h4>All In-Stock  products at a glance</h4>
  <table  class="table table-bordered table-striped">
          <thead><tr>
            <th>SL. no</th>
            <th>Product Category</th>
            <th>Number(In-stock)</th>
          </tr></thead>
          <tbody>
          <tr v-for="(category,index) in categories" :key="category._id">
            <td>{{index+1}}</td>
            <td>{{category.name}}</td>
            <td>{{ categoryWiseInstockCount(category.name)}}</td>
          </tr>
          </tbody>
        </table>

        <br>

        </div>
	</TabPanel>

	<TabPanel header="Department wise product list">
    <Toolbar>
    <template #start>
  <MultiSelect v-model="filteredCategories2" :options="categories" optionLabel="name" placeholder="Select Categories" display="chip" :filter="true" class="p-ml-2" />
    </template>
     <template #end>
 <Button type="button" class="p-button-outlined p-button-success" @click="print('departmentWiseProductList')">
            <img alt="logo" src="https://img.icons8.com/color/48/000000/print.png" style="width: 1.5rem" />
            <span class="p-ml-2 p-text-bold">Print</span>
        </Button>
    </template>
</Toolbar>
<div id="departmentWiseProductList">
		   
        <div v-for="category in filteredCategories2">
        <h5>{{category.name}} used by Authority</h5>
        <table class="table table-bordered table-striped">
          <thead><tr>
            <th>SL. no</th>
            <th>Section</th>
            <th>Number(active)</th>
          </tr></thead>
          <tbody>
          <tr v-for="(department,index) in departments" key:index>
            <td>{{index+1}}</td>
              <td>{{department.name}}</td>
              <td>{{departmentWiseCount(department.name, category.name)}}</td>
          </tr>
          </tbody>
         </table>
          <br>
        </div>

        </div>
	</TabPanel>
  

	<TabPanel header="Department wise user list">
    <Toolbar>
    <template #start>
 <MultiSelect v-model="filteredDepartments" :options="departments" optionLabel="name" placeholder="Select Departments" display="chip" :filter="true" />
  <MultiSelect v-model="filteredCategories" :options="categories" optionLabel="name" placeholder="Select Categories" display="chip" :filter="true" class="p-ml-2" />
    </template>
     <template #end>
 <Button type="button" class="p-button-outlined p-button-success" @click="print('departmentWiseUserList')">
            <img alt="logo" src="https://img.icons8.com/color/48/000000/print.png" style="width: 1.5rem" />
            <span class="p-ml-2 p-text-bold">Print</span>
        </Button>
    </template>
</Toolbar>
<div id="departmentWiseUserList">

        <div v-for="category in filteredCategories">
          <div v-for="department in filteredDepartments">
            <h4>{{department.name}}-{{category.name}} user list</h4>
            <table class="table table-striped table-bordered">
             <thead><tr>
            <th>SL. no</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Supply Date</th>
           
          </tr></thead>
          <tbody>
            <tr v-for="(product,index) in departmentUserList(department.name, category.name)" :key="index" >
              <td>{{index+1}}</td>
              <td>{{product.CurrentUser}}</td>
              <td>{{product.CurrentUserDesignation}}</td>
              <td>{{formatDate(product.userDetails[0].date)}}</td>
            </tr>
          </tbody>
            </table>
            <br>
            

          </div>        
        
        </div>
        </div>
	</TabPanel>
  <TabPanel header="Department at a glance">
    <Toolbar>
    <template #start>
 <MultiSelect v-model="filteredDepartments2" :options="departments" optionLabel="name" placeholder="Select Departments" display="chip" :filter="true" />
    </template>
     <template #end>
 <Button type="button" class="p-button-outlined p-button-success" @click="print('departmentAtaGlance')">
            <img alt="logo" src="https://img.icons8.com/color/48/000000/print.png" style="width: 1.5rem" />
            <span class="p-ml-2 p-text-bold">Print</span>
        </Button>
    </template>
   </Toolbar>
<div id="departmentAtaGlance">
        <div v-for="department in filteredDepartments2">
          <h4>{{department.name}} Product list</h4>
          <div >
            <table class="table table-striped table-bordered">
             <thead><tr>
            <th>SL. no</th>
            <th>Category</th>
            <th>Number (active)</th>
           
          </tr></thead>
          <tbody>
            <tr v-for="(category,index) in categories" :key="index" >
              <td>{{index+1}}</td>
              <td>{{category.name}}</td>
              <td>{{departmentWiseCount(department.name,category.name)}}</td>
            </tr>
          </tbody>
            </table>
               <br>
          </div>
        
        
        </div>
        </div>
	</TabPanel>

</TabView>
        <!--DataTable :value="products" responsiveLayout="scroll"  >
            <Column  header="Index">
             <template #body="slotProps">
                  <span>{{slotProps.index+1}}</span>
                </template>
            </Column>
            
        </!DataTable-->
        

        <!--DataTable :value="categories" responsiveLayout="scroll"  >
            <Column  header="SL. no">
             <template #body="slotProps">
                  <span>{{slotProps.index+1}}</span>
                </template>
            </Column>
             <Column field="name" header="Product Category"></Column>
             <Column  header="SL. no">
             <template #body="slotProps">
                  <span>{{categoryWiseCount(slotProps.data.name)}}</span>
                </template>
            </Column>
            
        </!--DataTable-->
    </div>


    </template>
    </Card>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import ProductService from "../service/ProductService";
export default {
  data() {
    return {
      // products: [],
      // categories: [],
      // departments: [],
      filteredDepartments: [],
      filteredCategories: [],
      filteredCategories2: [],
      filteredDepartments2: [],
    };
  },
  created() {},
  computed: {
    ...mapState([
      // ...
      "products",
      "departments",
      "categories",
    ]),
  },
  methods: {
    async print(printId) {
      // Pass the element id here
      await this.$htmlToPaper(printId);
    },
    categoryWiseCount(category) {
      // console.log(category)
      const count = this.products.filter(function (item) {
        if (item.category === category && item.status === "Active") {
          return true;
        } else {
          return false;
        }
      }).length;
      //console.log(count)
      return count;
    },
      categoryWiseInactiveCount(category) {
      // console.log(category)
      const count = this.products.filter(function (item) {
        if (item.category === category && item.status === "Inactive") {
          return true;
        } else {
          return false;
        }
      }).length;
      //console.log(count)
      return count;
    },
    categoryWiseInstockCount(category){
      // console.log(category)
      const count = this.products.filter(function (item) {
        if (item.category === category && item.status === "Instock") {
          return true;
        } else {
          return false;
        }
      }).length;
      //console.log(count)
      return count;
    },

    departmentWiseCount(department, category) {
      //console.log(category)
      const count = this.products.filter(function (item) {
        if (
          item.CurrentUserDepartment === department &&
          item.category === category &&
          item.status === "Active"
        ) {
          return true;
        } else {
          return false;
        }
      }).length;
      //console.log(count);
      return count;
    },
    departmentUserList(department, category) {
      const count = this.products.filter(function (item) {
        if (
          item.CurrentUserDepartment === department &&
          item.category === category &&
          item.status === "Active"
        ) {
          return true;
        } else {
          return false;
        }
      });
      console.log(count);
      return count;
    },
    formatDate(value) {
      return value.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
};
</script>

<style scoped src="../css/bootstarp/bootstrap.min.css"></style>

