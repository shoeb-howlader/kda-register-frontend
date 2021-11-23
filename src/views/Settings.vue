<template lang="">
    <div>
       <card>
          <template #content>
       <Fieldset legend="Edit Categories" :toggleable="true">
      
        <div class="p-grid p-jc-center">
            <div class="p-col-4">
                <div class="box">
                    
        <DataTable :value="categories" responsiveLayout="scroll">
            <Column field="name" header="Name"></Column>
            <Column field="value" header="Value"></Column>
        </DataTable>

    <div class="p-formgroup-inline p-mt-3">
       <div class="p-field">
        <label for="firstname" class="p-sr-only">Name</label>
        <InputText id="firstname" type="text" placeholder="Name" v-model="name"/>
        </div>
        <div class="p-field">
        <label for="lastname" class="p-sr-only">Value</label>
        <InputText id="lastname" type="text" placeholder="Value" v-model="value"/>
         </div>
         <Button
            label=""
            icon="pi pi-plus"
            iconPos="right"
            class="p-button-raised p-button-rounded p-mr-2  p-button-success"
            v-tooltip="'Add new category'"
            @click="addCategory(index)"
          />
    </div>

    


    </div>
            </div>

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
       api:process.env.VUE_APP_API_CATEGORY,
      categories: [],
      name:'',
      value:''
    };
  },
  created() {
    this.productService = new ProductService();
  },
  mounted() {
    this.productService.getCategories().then((data) => {
      this.categories = data;
      /*console.log(this.categories);*/

    });
  },
  methods: {
      addCategory() {
          let category={
              name:this.name,
              value:this.value
          }

            fetch(this.api, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(category)
            })
                .then(() => {
                    //this.$router.push('/')
                    this.isLoading=false
                    this.$toast.add({ severity: 'success', summary: 'Category inserted successfully' ,life: 3000});
                    this.categories.push(category);
                    this.name="",
                    this.value=""

                })
                .catch(err => {
                    this.isLoading=false
                    console.log(err)
                    this.$toast.add({ severity: 'error', summary: 'ERROR: Category not inserted ' ,life: 3000});
                }
                )
          
          
      }
  },
};
</script>
<style lang="">
</style>