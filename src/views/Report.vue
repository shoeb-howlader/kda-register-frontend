<template lang="">

<Card>
    <template #content>
    <div>
       <TabView>
	<TabPanel header="Summary">
	<h4>All products at a glance</h4>
  <table class="table table-striped table-bordered">
          <thead><tr>
            <th>SL. no</th>
            <th>Product Category</th>
            <th>Number(active)</th>
          </tr></thead>
          <tbody>
          <tr v-for="(category,index) in categories" :key="category._id">
            <td>{{index+1}}</td>
            <td>{{category.name}}</td>
            <td>{{categoryWiseCount(category.name)}}</td>
          </tr>
          </tbody>
        </table>
	</TabPanel>
	<TabPanel header="department wise">
    <Toolbar>
    <template #start>
  <MultiSelect v-model="filteredCategories2" :options="categories" optionLabel="name" placeholder="Select Categories" display="chip" :filter="true" class="p-ml-2" />
    </template>

    <template #end>
        <Button icon="pi pi-search" class="p-mr-2" />
        <Button icon="pi pi-calendar" class="p-button-success p-mr-2" />
        <Button icon="pi pi-times" class="p-button-danger" />
    </template>
</Toolbar>
		   <h4>products department wise </h4>
        <div v-for="category in filteredCategories2">
        <h5>{{category.name}} used by Authority</h5>
        <table class="table table-striped table-bordered">
          <thead><tr>
            <th>SL. no</th>
            <th>Section</th>
            <th>Number(active)</th>
          </tr></thead>
          <tr v-for="(department,index) in departments" key:index>
            <td>{{index+1}}</td>
              <td>{{department.name}}</td>
              <td>{{departmentWiseCount(department.name, category.name)}}</td>
          </tr>

         </table>
        </div>
	</TabPanel>
	<TabPanel header="Department wise user list">
    <Toolbar>
    <template #start>
 <MultiSelect v-model="filteredDepartments" :options="departments" optionLabel="name" placeholder="Select Departments" display="chip" :filter="true" />
  <MultiSelect v-model="filteredCategories" :options="categories" optionLabel="name" placeholder="Select Categories" display="chip" :filter="true" class="p-ml-2" />
    </template>

    <template #end>
        <Button icon="pi pi-search" class="p-mr-2" />
        <Button icon="pi pi-calendar" class="p-button-success p-mr-2" />
        <Button icon="pi pi-times" class="p-button-danger" />
    </template>
</Toolbar>

	     <h4>products department wise user list </h4>
        <div v-for="category in filteredCategories">
          <h4>{{category.name}} user list</h4>
          <div v-for="department in filteredDepartments">
            <h4>{{department.name}}</h4>
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

          </div>
        
        
        </div>
	</TabPanel>
  <TabPanel header="Department wise product list">
    <Toolbar>
    <template #start>
 <MultiSelect v-model="filteredDepartments2" :options="departments" optionLabel="name" placeholder="Select Departments" display="chip" :filter="true" />
 
    </template>

    <template #end>
        <Button icon="pi pi-search" class="p-mr-2" />
        <Button icon="pi pi-calendar" class="p-button-success p-mr-2" />
        <Button icon="pi pi-times" class="p-button-danger" />
    </template>
</Toolbar>

	     <h4>products department wise user list </h4>
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
import ProductService from "../service/ProductService";
export default {
  data() {
    return {
      products: [],
      categories: [],
      departments: [],
      filteredDepartments:[],
      filteredCategories:[],
      filteredCategories2:[],
      filteredDepartments2:[]
    };
  },
  created() {
    this.productService = new ProductService();

    //console.log(process.env.VUE_APP_API_PRODUCT)
  },
  mounted() {
    this.productService.getProducts().then((data) => {
      this.products = data;
      //console.log(this.products);
    });

    this.productService.getCategories().then((data) => {
      this.categories = data;
      //console.log(this.categories);
    });

    this.productService.getDepartments().then((data) => {
      this.departments = data;
    });
  },
  computed: {},
  methods: {
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
    departmentUserList(department, category)
    {
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
      return value.toLocaleDateString('en-GB', {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
.p-multiselect {
    width: 18rem;
}

::v-deep(.multiselect-custom) {
    .p-multiselect-label:not(.p-placeholder) {
        padding-top: .25rem;
        padding-bottom: .25rem;
    }

    .country-item-value {
        padding: .25rem .5rem;
        border-radius: 3px;
        display: inline-flex;
        margin-right: .5rem;
        background-color: var(--primary-color);
        color: var(--primary-color-text);

        img.flag {
            width: 17px;
        }
    }
}

@media screen and (max-width: 640px) {
    .p-multiselect {
        width: 100%;
    }
}
</style>