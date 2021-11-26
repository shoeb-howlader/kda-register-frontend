<template lang="">
<Toast />
    <div>
       <card>
          <template #content>
       <Fieldset legend="Edit Categories" :toggleable="true">
      
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
           
           <Fieldset legend="Edit Designations" :toggleable="true">
      
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
                <Fieldset legend="Edit Departments" :toggleable="true">
      
        <div class="p-grid p-jc-center">
            <div class="p-col-5">
                <div class="box">
                    
        <DataTable :value="deparments" showGridlines responsiveLayout="scroll">
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
import ProductService from "../service/ProductService";
export default {
  data() {
    return {
      categories: [],
      deparments:[],
      designations:[],
      CategoryName:'',
      departmentName:'',
      designationName:'',
      theme:localStorage.getItem('theme'),
      categorySubmitted:false,
      departmentSubmitted:false,
      designationSubmitted:false,
      themes:['md-light-indigo','md-light-deeppurple',
      
               'md-dark-indigo','md-dark-deeppurple','mdc-light-indigo','mdc-light-deeppurple','mdc-dark-indigo','mdc-dark-deeppurple','tailwind-light',
               'fluent-light','saga-blue','saga-green','saga-orange','saga-purple',
               'nova','nova-accent','nova-vue'
               ]
    };
  },
  created() {
    this.productService = new ProductService();
  },
  mounted() {
    this.productService.getCategories().then((data) => {
      this.categories = data;
    });

this.productService.getDepartments().then((data) => {
      this.deparments = data;
    });

    this.productService.getDesignations().then((data) => {
      this.designations = data;
    });

  },
  methods: {
      addCategory() {
        this.categorySubmitted=true;
        if(!this.CategoryName){
        this.$toast.add({ severity: 'error', summary: 'Empty field can not inserted' ,life: 3000});
        return }
        else{
          let category={
              name:this.CategoryName,
              value:this.CategoryName
          }

            fetch(process.env.VUE_APP_API_CATEGORY, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(category)
            })
                .then(() => {
                    //this.$router.push('/')
                    this.isLoading=false
                    this.$toast.add({ severity: 'success', summary: 'Category inserted successfully' ,life: 3000});
                    this.categories.push(category);
                    this.CategoryName="",
                    this.categorySubmitted=false;
                })
                .catch(err => {
                    this.isLoading=false
                    console.log(err)
                    this.$toast.add({ severity: 'error', summary: 'ERROR: Category not inserted ' ,life: 3000});
                }
                )
          
          
      }},
        addDesignation() {
        this.designationSubmitted=true;
        if(!this.designationName){
        this.$toast.add({ severity: 'error', summary: 'Empty field can not inserted' ,life: 3000});
        return }
        else{
          let designation={
              name:this.designationName,
              value:this.designationName
          }

            fetch(process.env.VUE_APP_API_DESIGNATION, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(designation)
            })
                .then(() => {
                    //this.$router.push('/')
                    this.isLoading=false
                    this.$toast.add({ severity: 'success', summary: 'Category inserted successfully' ,life: 3000});
                    this.designations.push(designation);
                    this.designationName="",
                    this.designationSubmitted=false;
                })
                .catch(err => {
                    this.isLoading=false
                    console.log(err)
                    this.$toast.add({ severity: 'error', summary: 'ERROR: Category not inserted ' ,life: 3000});
                }
                )
          
          
      }},
  addDepartment() {
        this.departmentSubmitted=true;
        if(!this.departmentName){
        this.$toast.add({ severity: 'error', summary: 'Empty field can not inserted' ,life: 3000});
        return }
        else{
          let department={
              name:this.departmentName,
              value:this.departmentName
          }

            fetch(process.env.VUE_APP_API_DEPARTMENT, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(department)
            })
                .then(() => {
                    //this.$router.push('/')
                    this.isLoading=false
                    this.$toast.add({ severity: 'success', summary: 'Category inserted successfully' ,life: 3000});
                    this.deparments.push(department);
                    this.departmentName="",
                    this.departmentSubmitted=false;
                })
                .catch(err => {
                    this.isLoading=false
                    console.log(err)
                    this.$toast.add({ severity: 'error', summary: 'ERROR: Category not inserted ' ,life: 3000});
                }
                )
          
          
      }},
       changeTheme(theme) {
         console.log('theme changed')
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
    }
  },
};
</script>
<style lang="scss" scoped>
.p-button {
    margin-right: .5rem;
    margin-top:10px;
}

.p-buttonset {
    .p-button {
        margin-right: 0;
    }
}

.sizes {
    .button {
        margin-bottom: .5rem;
        display: block;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

@media screen and (max-width: 640px) {
    .p-button {
        margin-bottom: .5rem;

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
.btn{
  margin-top:0px;
}
</style>