<template lang="">
<Toast />
    <div>
       <card>
          <template #content>
            <Fieldset legend="Add new user" :toggleable="true" >
              <Button label="Add user" class="p-button-raised p-button-success" @click="goToRegister()" >
                </Button>
          
            </Fieldset>
       <Fieldset legend="Edit Categories" :toggleable="true" class="p-mt-5">
      
        <div class="p-grid p-jc-center">
            <div class="p-col-5">
                <div class="box">
                    
        <DataTable :value="categories" showGridlines responsiveLayout="scroll">
            <Column field="name" header="Categories"></Column>
            
        </DataTable>

    <div class="p-fluid p-formgrid p-grid p-mt-5">
       <div class="p-field p-col">
       <span class="p-float-label">
              <InputText id="CategoryName" type="text" v-model="CategoryName" required="true"  :class="{'p-invalid':!CategoryName && categorySubmitted}" />
              <label for="CategoryName">Add new category</label>
              
            </span>
        </div>
        
         <div class="p-field">
         <Button
            label=""
            icon="pi pi-plus"
            iconPos="right"
            class="p-button-raised p-button-rounded  btn"
            v-tooltip="'Add new category'"
            @click="addCategory()"
          />
          </div>
    </div>

    </div>
            </div>

          </div>
          </Fieldset> 
           
           <Fieldset legend="Edit Designations" :toggleable="true" class="p-mt-5">
      
        <div class="p-grid p-jc-center">
            <div class="p-col-5">
                <div class="box">
                    
        <DataTable :value="designations" showGridlines responsiveLayout="scroll">
            <Column field="name" header="Designations"></Column>
            
        </DataTable>

    <div class="p-fluid p-formgrid p-grid p-mt-5">
       <div class="p-field p-col">
       <span class="p-float-label">
              <InputText id="designationName" type="text" v-model="designationName" required="true"  :class="{'p-invalid':!designationName && designationSubmitted}" />
              <label for="designationName">Add new designation</label>
              
            </span>
        </div>
        
         <div class="p-field">
         <Button
            label=""
            icon="pi pi-plus"
            iconPos="right"
            class="p-button-raised p-button-rounded  btn"
            v-tooltip="'Add new designation'"
            @click="addDesignation()"
          />
          </div>
    </div>

    </div>
            </div>

          </div>
          </Fieldset> 
                <Fieldset legend="Edit Departments" :toggleable="true" class="p-mt-5">
      
        <div class="p-grid p-jc-center">
            <div class="p-col-5">
                <div class="box">
                    
        <DataTable :value="departments" showGridlines responsiveLayout="scroll">
            <Column field="name" header="Departments"></Column>
            
        </DataTable>

    <div class="p-fluid p-formgrid p-grid p-mt-5">
       <div class="p-field p-col">
       <span class="p-float-label">
              <InputText id="departmentName" type="text" v-model="departmentName" required="true"  :class="{'p-invalid':!departmentName && departmentSubmitted}" />
              <label for="departmentName">Add new department</label>
              
            </span>
        </div>
        
         <div class="p-field">
         <Button
            label=""
            icon="pi pi-plus"
            iconPos="right"
            class="p-button-raised p-button-rounded  btn"
            v-tooltip="'Add new department'"
            @click="addDepartment()"
          />
          </div>
    </div>

    </div>
            </div>

          </div>
          </Fieldset> 
          
          <Fieldset legend="Themes" :toggleable="true" class="p-mt-4">
            <p>Current theme: {{theme}}</p>
            <div >
	       <Button :label="item" v-for="item in themes" :key="item" @click="changeTheme(item)"/>
 
        </div>
</Fieldset>

    
    </template>
     </card> 
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import ProductService from "../service/ProductService";
export default {
  data() {
    return {
      //categories: [],
      //deparments: [],
      //designations: [],
      CategoryName: "",
      departmentName: "",
      designationName: "",
      theme: localStorage.getItem("theme"),
      categorySubmitted: false,
      departmentSubmitted: false,
      designationSubmitted: false,
      themes: [
        "tailwind-light",
        "fluent-light",
        "saga-blue",
        "saga-green",
        "saga-orange",
        "saga-purple",
        "nova",
        "nova-accent",
        "nova-vue",
      ],
    };
  },
  created() {
    this.productService = new ProductService();
  },
  mounted() {},
  computed: {
    ...mapState([
      // ...
      "departments",
      "categories",
      "designations",
    ]),
  },
  methods: {
    ...mapMutations(["ADD_DEPARTMENT", "ADD_CATEGORY", "ADD_DESIGNATION"]),
    goToRegister() {
      this.$router.push("/register");
    },
    addCategory() {
      this.categorySubmitted = true;
      if (!this.CategoryName) {
        this.$toast.add({
          severity: "error",
          summary: "Empty field can not inserted",
          life: 3000,
        });
        return;
      } else {
        let category = {
          name: this.CategoryName,
          value: this.CategoryName,
        };

        this.$http
          .post(process.env.VUE_APP_API_CATEGORY, category)
          .then(() => {
            //this.$router.push('/')
            this.isLoading = false;
            this.$toast.add({
              severity: "success",
              summary: "Category inserted successfully",
              life: 3000,
            });
            this.ADD_CATEGORY(category);
            (this.CategoryName = ""), (this.categorySubmitted = false);
          })
          .catch((err) => {
            this.isLoading = false;
            console.log(err);
            this.$toast.add({
              severity: "error",
              summary: "ERROR: Category not inserted ",
              life: 3000,
            });
          });
      }
    },
    addDesignation() {
      this.designationSubmitted = true;
      if (!this.designationName) {
        this.$toast.add({
          severity: "error",
          summary: "Empty field can not inserted",
          life: 3000,
        });
        return;
      } else {
        let designation = {
          name: this.designationName,
          value: this.designationName,
        };

        this.$http
          .post(process.env.VUE_APP_API_DESIGNATION, designation)
          .then(() => {
            //this.$router.push('/')
            this.isLoading = false;
            this.$toast.add({
              severity: "success",
              summary: "Category inserted successfully",
              life: 3000,
            });
            this.ADD_DESIGNATION(designation);
            (this.designationName = ""), (this.designationSubmitted = false);
          })
          .catch((err) => {
            this.isLoading = false;
            console.log(err);
            this.$toast.add({
              severity: "error",
              summary: "ERROR: Category not inserted ",
              life: 3000,
            });
          });
      }
    },
    addDepartment() {
      this.departmentSubmitted = true;
      if (!this.departmentName) {
        this.$toast.add({
          severity: "error",
          summary: "Empty field can not inserted",
          life: 3000,
        });
        return;
      } else {
        let department = {
          name: this.departmentName,
          value: this.departmentName,
        };

        this.$http
          .post(process.env.VUE_APP_API_DEPARTMENT, department)
          .then(() => {
            //this.$router.push('/')
            this.isLoading = false;
            this.$toast.add({
              severity: "success",
              summary: "Category inserted successfully",
              life: 3000,
            });
            this.ADD_DEPARTMENT(department);
            (this.departmentName = ""), (this.departmentSubmitted = false);
          })
          .catch((err) => {
            this.isLoading = false;
            console.log(err);
            this.$toast.add({
              severity: "error",
              summary: "ERROR: Category not inserted ",
              life: 3000,
            });
          });
      }
    },
    changeTheme(theme) {
      console.log("theme changed");
      let themeElement = document.getElementById("theme-link");
      themeElement.setAttribute(
        "href",
        themeElement.getAttribute("href").replace(this.theme, theme)
      );
      this.theme = theme;
      //this.activeMenuIndex = null;
      //EventBus.emit("change-theme", event);
      //this.$appState.darkTheme = event.dark;
      if (theme.startsWith("md")) {
        this.$primevue.config.ripple = true;
      }
      localStorage.setItem("theme", this.theme);
    },
  },
};
</script>
<style lang="scss" scoped>
.p-button {
  margin-right: 0.5rem;
  margin-top: 10px;
}

.p-buttonset {
  .p-button {
    margin-right: 0;
  }
}

.sizes {
  .button {
    margin-bottom: 0.5rem;
    display: block;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

@media screen and (max-width: 640px) {
  .p-button {
    margin-bottom: 0.5rem;

    &:not(.p-button-icon-only) {
      display: flex;
      width: 100%;
    }
  }

  .p-buttonset {
    .p-button {
      margin-bottom: 0;
    }
  }
}
.btn {
  margin-top: 0px;
}
</style>