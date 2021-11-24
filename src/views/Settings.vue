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
            <Column field="name" header="Name"></Column>
            <Column field="value" header="Value"></Column>
        </DataTable>

    <div class="p-formgroup-inline p-mt-5">
       <div class="p-field">
       <span class="p-float-label">
              <InputText id="name" type="text" v-model="name" required="true"  :class="{'p-invalid':!name && submitted}" />
              <label for="name">Name </label>
              
            </span>
        </div>
        <div class="p-field ">
        <span class="p-float-label">
              <InputText id="value" type="text" v-model="value" required="true"  :class="{'p-invalid':!value && submitted}" />
              <label for="value">Value </label>
              
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
       api:process.env.VUE_APP_API_CATEGORY,
      categories: [],
      name:'',
      value:'',
      theme:localStorage.getItem('theme'),
      submitted:false,
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
      /*console.log(this.categories);*/

    });
  },
  methods: {
      addCategory() {
        this.submitted=true;
        if(!this.name||!this.value){
        this.$toast.add({ severity: 'error', summary: 'Empty field can not inserted' ,life: 3000});
        return }
        else{
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
                    this.submitted=false;
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