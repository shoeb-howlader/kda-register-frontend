<template>
  <div>
    <div class="card">
      <h5>All Products </h5>
      <p>Filters are displayed in an overlay.</p>
      <DataTable
        :value="products"
        ref="dt"
        :paginator="true"
        class="p-datatable-customers"
        showGridlines
        :rows="10"
        data-key="id"
        v-model:filters="filters1"
        filterDisplay="menu"
        :loading="loading1"
        responsiveLayout="scroll"
        :globalFilterFields="['CurrentUser', 'supplier']"
      >
        <template #header>
          
          <div class="p-d-flex p-jc-between">
            <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" class="p-button-raised p-ml-2" />
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
        <template #empty>No customers found.</template>
        <template #loading>Loading Products data. Please wait.</template>
        <Column
          field="CurrentUser"
          header="Current User"
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
              placeholder="Search by country"
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
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success p-mr-2"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <ConfirmDialog></ConfirmDialog>
    <Toast />
  </div>
</template>

<script>
import CustomerService from "../service/CustomerService";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import ProductService from "../service/ProductService";
export default {
  data() {
    return {
      products: [],
      customers1: null,
      customers2: null,
      filters1: null,
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
</style>
