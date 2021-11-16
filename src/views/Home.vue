<template>
  <div>
    <div class="card">
      <Toolbar class="p-mb-4">
                <template #left>
                    <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="deleteSelectedProducts" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #right>
                    <!--FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" /-->
                    <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                </template>
            </Toolbar>
      <DataTable
        @value-change="countRows"
        :value="products"
        ref="dt"
        :paginator="true"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[10,20,50]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        class="p-datatable-customers"
        :resizableColumns="true" columnResizeMode="fit"
        
        stripedRows
        showGridlines
        :rows="10"
        data-key="id"
        v-model:filters="filters1"
        filterDisplay="menu"
        :loading="loading1"
        responsiveLayout="scroll"
        stateStorage="local"
        stateKey="dt-state-demo-local"
        v-model:selection="selectedProducts"
        :globalFilterFields="['CurrentUser', 'supplier','productDescription']"
      >
        <template #header>
          
          <div class="p-d-flex p-jc-between">
            <h5 class="p-mb-2 p-m-md-0 p-as-md-center">Manage Products</h5>
            <div>
              <h5 class="p-mb-2 p-m-md-0 p-as-md-center"><Badge :value="filteredRows"  size="xlarge" severity="success" class="p-mr-2"></Badge> </h5>
            </div>
            <div> <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              class="p-button-outlined p-button-raised"
              @click="clearFilter1()"
            />
            
            <span class="p-input-icon-left p-ml-2">
              <i class="pi pi-search" />
              <InputText
                v-model="filters1['global'].value"
                placeholder="Keyword Search"
              />
            </span>
            </div>
           
            
          </div>
        </template>
        <template #empty>No products found.</template>
        <template #loading>Loading Products data. Please wait.</template>
        <Column selectionMode="multiple" style="width: 3rem"  :exportable="false"></Column>
        <Column
          field="CurrentUser"
          header="Current User"
          :sortable="true"
          style="min-width: 12rem"
        >
          <template #body="{ data }">{{ data.CurrentUser }}</template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Search by name"
            />
          </template>
        </Column>
        <Column
          field="supplier"
          header="Supplier"
          filterField="supplier"
          :sortable="true"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            <span class="image-text">{{ data.supplier }}</span>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Search by supplier"
            />
          </template>
          <template #filterclear="{ filterCallback }">
            <Button
              type="button"
              icon="pi pi-times"
              @click="filterCallback()"
              class="p-button-secondary"
            ></Button>
          </template>
          <template #filterapply="{ filterCallback }">
            <Button
              type="button"
              icon="pi pi-check"
              @click="filterCallback()"
              class="p-button-success"
            ></Button>
          </template>
          <template #filterfooter>
            <div class="p-px-3 p-pt-0 p-pb-3 p-text-center p-text-bold">
              Customized Buttons
            </div>
          </template>
        </Column>
        <Column
        field="category"
          header="Category"
          filterField="category"
          :sortable="true"
          :showFilterMatchModes="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            <span class="image-text">{{ data.category }}</span>
          </template>
          <template #filter="{ filterModel }">
            <div class="p-mb-3 p-text-bold">Select Category</div>
            <MultiSelect
              v-model="filterModel.value"
              :options="categories"
              optionLabel="name"
              optionValue="value"
              placeholder="Any"
              class="p-column-filter"
            >
              <template #option="slotProps">
                <div class="p-multiselect-representative-option">
                  <span class="image-text">{{ slotProps.option.name }}</span>
                </div>
              </template>
            </MultiSelect>
          </template>
        </Column>
        <Column
        field="date"
          header="Purchase date"
          filterField="date"
          data-type="date"
          :sortable="true"
          style="min-width: 10rem"
        >
          <template #body="{ data }">{{
            formatDate(data.date)
          }}</template>
          <template #filter="{ filterModel }">
            <Calendar
              v-model="filterModel.value"
              dateFormat="dd/mm/yy"
              placeholder="dd/mm/yy"
            />
          </template>
        </Column>

        <Column
          field="status"
          header="Status"
          :sortable="true"
          :showFilterMatchModes="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            <span :class="'customer-badge status-' + data.status">{{data.status}}</span>
          </template>
          <template #filter="{ filterModel }">
            <div class="p-mb-3 p-text-bold">Select Status</div>
            <MultiSelect
              v-model="filterModel.value"
              :options="statuses"
              optionLabel="name"
              optionValue="value"
              placeholder="Any"
              class="p-column-filter"
              :showClear="true"
            >
             <template #value="slotProps">
                <div class="country-item country-item-value" v-for="option of slotProps.value" :key="option.code">
                    <span :class="'customer-badge status-' + option">
                  {{ option }}
                </span> 
                </div>
                <template v-if="!slotProps.value || slotProps.value.length === 0">
                    Any
                </template>
            </template>

              <template #option="slotProps">
                <span :class="'customer-badge status-' + slotProps.option.name">
                  {{ slotProps.option.name }}
                </span>
              </template>
            </MultiSelect>
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-eye"
              class="p-button-rounded p-button-warning p-mr-2"
              @click="viewProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success p-mr-2"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger"
              @click="confirmDeleteProduct(slotProps.data)"
            />
            
          </template>
        </Column>
        <template #paginatorLeft>
                <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="reload" />
            </template>
            <template #paginatorRight>
                <Button type="button" icon="pi pi-cloud" class="p-button-text" />
            </template>
            <template #footer>
                In total there are {{filteredRows}} products.
               
            </template>
      </DataTable>
    </div>
      <Dialog header="Input Data Form" v-model:visible="InputDialog" :style="{width: '70vw'}" :maximizable="true" :modal="true">
              <div class="  p-mt-3">
        <InputForm @emitReload="reload"/>
  </div>

        </Dialog>

        <Dialog header="Edit Data Form" v-model:visible="editDialog" :style="{width: '70vw'}" :maximizable="true" :modal="true">
              <div class=" p-shadow-10 p-mt-3">
        <editForm :product="editingProduct" @emitReload="reload"/>
  </div>

        </Dialog>


        <Dialog header="Product Details" v-model:visible="viewDialog" :style="{width: '70vw'}" :maximizable="true" :modal="true">
              <div class="  p-mt-3">
        

        <table class="table-fill">
      <tbody class="table-hover">  
          <tr>
    <td class="text-left">product Category:</td>
    <td class="text-left">{{product.category}}</td>
         </tr>
          <tr>
    <td class="text-left">product supplier :</td>
    <td class="text-left">{{product.supplier}}</td>
         </tr>
          <tr class="active-row">
    <td class="text-left">Current user :</td>
    <td class="text-left">{{product.CurrentUser}}</td>
         </tr>
          <tr>
    <td class="text-left">Purchase Date:</td>
    <td class="text-left">{{formatDate(product.date)}}</td>
         </tr>
          <tr>
    <td class="text-left">Status:</td>
    <td class="text-left" :class="'customer-badge status-' + product.status">{{product.status}}</td>
         </tr>
         </tbody> 
        </table>
        <div>
          <div class="p-mt-6">
            <Fieldset legend="Product Description">
              <div class="product-description" v-html="product.productDescription"></div>
            
            </Fieldset>
          </div>
          <div class="p-mt-3">
          <Fieldset legend="User Details">
        <DataTable :value="product.userDetails" responsiveLayout="scroll">
            
            <Column field="name" header="Name"></Column>
            <Column field="date" header="Date">
            <template #body="{ data }">{{
            formatDate(data.date)
          }}</template>
            </Column>
            <Column field="comment" header="Comment"></Column>
        </DataTable>
        </Fieldset>
        </div>
    </div>
  </div>

        </Dialog>

    <ConfirmDialog></ConfirmDialog>
    <Toast />
  </div>
</template>

<script>
import EditForm from '../components/editForm.vue'
import InputForm from '../components/InputForm.vue'
import CustomerService from "../service/CustomerService";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import ProductService from "../service/ProductService";
export default {
  components: { InputForm, EditForm },
  data() {
    return {
      products: [],
      customers1: null,
      customers2: null,
      filters1: null,
      selectedProducts: null,
      InputDialog:false,
      viewDialog:false,
      editDialog:false,
      product:null,
      editingProduct:null,
      filteredRows:null,
      filters2: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      representatives: [
        { name: "Amy Elsner", image: "amyelsner.png" },
        { name: "Anna Fali", image: "annafali.png" },
        { name: "Asiya Javayant", image: "asiyajavayant.png" },
        { name: "Bernardo Dominic", image: "bernardodominic.png" },
        { name: "Elwin Sharvill", image: "elwinsharvill.png" },
        { name: "Ioni Bowcher", image: "ionibowcher.png" },
        { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
        { name: "Onyama Limba", image: "onyamalimba.png" },
        { name: "Stephen Shaw", image: "stephenshaw.png" },
        { name: "XuXue Feng", image: "xuxuefeng.png" },
      ],
      categories: [
        
        { name: "Computer", value: "computer" },
        { name: "UPS", value: "UPS" },
        { name: "Speaker", value: "speaker" },
        { name: "Camera", value: "camera" },
        { name: "Extension Board", value: "Extension Board" },
        { name: "Ink", value: "Ink" },

      ],
      statuses: [
        { name: "Active", value: "Active" },
        { name: "Inactive", value: "Inactive" },
        { name: "Instock", value: "Instock" },
      ],
      loading1: true,
      loading2: true,
    };
  },
  created() {
    this.customerService = new CustomerService();
    //this.initFilters1();
    this.productService = new ProductService();
    this.initFilters1();
  },
  mounted() {
    /*this.customerService.getCustomersLarge().then((data) => {
          this.customers1 = data;
          this.loading1 = false;
          this.customers1.forEach(
            (customer) => (customer.date = new Date(customer.date))
          );
        });
    
        this.customerService.getCustomersLarge().then((data) => {
          this.customers2 = data;
          this.loading2 = false;
          this.customers2.forEach(
            (customer) => (customer.date = new Date(customer.date))
          );
        });*/

    this.productService.getProducts().then((data) => {
      this.products = data;
      this.loading1 = false;
    });
    console.log(this.products);
  },
  methods: {
    countRows(data)
    {
console.log(data.length)
this.filteredRows=data.length
    },
     onColReorder() {
            this.$toast.add({severity:'success', summary: 'Column Reordered', life: 3000});
        },
    reload(){
      this.loading1 = true;
 this.productService.getProducts().then((data) => {
      this.products = data;
      this.loading1 = false;
    });
    },
    formatDate(value) {
      return value.toLocaleDateString('en-GB', {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    clearFilter1() {
      this.initFilters1();
    },
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        CurrentUser: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        supplier: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        category: { value: null, matchMode: FilterMatchMode.IN },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        balance: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        status: { value: null, matchMode: FilterMatchMode.EQUALS},
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      };
    },
     deleteSelectedProducts() {
       console.log(this.selectedProducts)
           
         this.$confirm.require({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
            
            
            this.selectedProducts.forEach(element => {
              fetch('http://localhost:3000/projects/'+element.id,{
                    method:'DELETE',}
                )
                .then(()=>{
                  this.products=this.products.filter((product)=>{
                       return product.id!==element.id
                          })
                this.$toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
                })
                .catch(err=>{
                  this.$toast.add({severity:'error', summary:'Confirmed', detail:'Something went worng', life: 3000});
                  console.log(err)})
            });

                    /*fetch('http://localhost:3000/projects/'+id,{
                    method:'DELETE',}
                )
                .then(()=>{
                   

                })
                .catch(err=>{
                  this.$toast.add({severity:'error', summary:'Confirmed', detail:'Something went worng', life: 3000});
                  console.log(err)})*/
                    
                },
                reject: () => {
                    this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
                }
            });

        },
        viewProduct(product)
        {
      this.viewDialog=!this.viewDialog;
      this.product=product
        },
        editProduct(product){
            this.editDialog=!this.editDialog;
            this.editingProduct=product;
        },
openNew(){
this.InputDialog=!this.InputDialog
},
     exportCSV() {
            this.$refs.dt.exportCSV();
        },
        confirmDeleteProduct(product)
        {
          console.log(product.id)
           let id=product.id
         this.$confirm.require({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {

                    fetch('http://localhost:3000/projects/'+id,{
                    method:'DELETE',
                })
                .then(()=>{
                   
                     this.products=this.products.filter((product)=>{
                       return product.id!==id
                          })
                  this.$toast.add({severity:'success', summary:'Confirmed', detail:'Record deleted', life: 3000});
                })
                .catch(err=>{
                  this.$toast.add({severity:'error', summary:'Confirmed', detail:'Something went worng', life: 3000});
                  console.log(err)})
                    
                },
                reject: () => {
                    this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
                }
            });
        }
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}

::v-deep(.p-progressbar) {
  height: 0.5rem;
  background-color: #d8dadc;

  .p-progressbar-value {
    background-color: #607d8b;
  }
}

::v-deep(.p-datepicker) {
  min-width: 25rem;

  td {
    font-weight: 400;
  }
}

::v-deep(.p-datatable.p-datatable-customers) {
  .p-datatable-header {
    padding: 1rem;
    text-align: left;
    font-size: 1.5rem;
  }

  .p-paginator {
    padding: 1rem;
  }

  .p-datatable-thead > tr > th {
    text-align: left;
  }

  .p-datatable-tbody > tr > td {
    cursor: auto;
  }

  .p-dropdown-label:not(.p-placeholder) {
    text-transform: uppercase;
  }
}


div.table-title {
   display: block;
  margin: auto;
  max-width: 600px;
  padding:5px;
  width: 100%;
}

.table-title h3 {
   color: #fafafa;
   font-size: 30px;
   font-weight: 400;
   font-style:normal;
   font-family: "Roboto", helvetica, arial, sans-serif;
   text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
   text-transform:uppercase;
}


/*** Table Styles **/

.table-fill {
  background: white;
  border-radius:3px;
  border-collapse: collapse;
  height: 320px;
  margin: auto;
  padding:5px;
  width: 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  animation: float 5s infinite;
}
 
th {
  color:#D5DDE5;;
  background:#1b1e24;
  border-bottom:4px solid #9ea7af;
  border-right: 1px solid #343a45;
  font-size:23px;
  font-weight: 100;
  padding:24px;
  text-align:left;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  vertical-align:middle;
}

th:first-child {
  border-top-left-radius:3px;
}
 
th:last-child {
  border-top-right-radius:3px;
  border-right:none;
}
  
tr {
  border-top: 1px solid #C1C3D1;
  border-bottom-: 1px solid #C1C3D1;
  color:#666B85;
  font-size:16px;
  font-weight:normal;
  text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
}
 
tr:hover td {
  background:#4E5066;
  color:#FFFFFF;
  border-top: 1px solid #22262e;
}
 
tr:first-child {
  border-top:none;
}

tr:last-child {
  border-bottom:none;
}
 
tr:nth-child(odd) td {
  background:#EBEBEB;
}
 
tr:nth-child(odd):hover td {
  background:#4E5066;
}

tr:last-child td:first-child {
  border-bottom-left-radius:3px;
}
 
tr:last-child td:last-child {
  border-bottom-right-radius:3px;
}
 
td {
  background:#FFFFFF;
  padding:20px;
  text-align:left;
  vertical-align:middle;
  font-weight:300;
  font-size:18px;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #C1C3D1;
}

td:last-child {
  border-right: 0px;
}

th.text-left {
  text-align: left;
}

th.text-center {
  text-align: center;
}

th.text-right {
  text-align: right;
}

td.text-left {
  text-align: left;
}

td.text-center {
  text-align: center;
}

td.text-right {
  text-align: right;
}
.product-description{

width:100%;
border: 1px solid green;
padding: 4px;
border-radius: 5px;
}
</style>
