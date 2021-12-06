<template lang="">
 
 
        <Card class="p-mt-3" >
            <template #title>
                Input Data Form
            </template>
            <template #content>
  <div>
    <div class="card">
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-dropdown">
          <!--Dropdown v-model="category" :options="categories"  optionLabel="name" optionValue="value"  placeholder="Select Product Type" :class="{'p-invalid':!category && submitted}"/-->
          <!--small id="supplier-help" class="p-error" v-if="!category && submitted">Category is required.</small-->
          <Dropdown
            v-model="category"
            :options="categories"
            optionLabel="name"
            optionValue="value"
            :filter="true"
            placeholder="Select Product Type"
            :showClear="true"
            :class="{ 'p-invalid': !category && submitted }"
          >
            <template #value="slotProps">
              <div
                class="country-item country-item-value"
                v-if="slotProps.value"
              >
                <div>{{ slotProps.value }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="country-item">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="p-field p-col">
          <span class="p-float-label">
            <InputText
              id="supplier"
              type="text"
              v-model="supplier"
              required="true"
              :class="{ 'p-invalid': !supplier && submitted }"
            />
            <label for="supplier">Supplier Name </label>
            <small
              id="supplier-help"
              class="p-error"
              v-if="!supplier && submitted"
              >Username is required.</small
            >
          </span>
        </div>
      </div>

      <div class="p-fluid p-formgrid p-grid p-mt-3">
        <div class="p-field p-col">
          <div class="p-float-label">
            <Calendar
              id="date"
              v-model="date"
              :showIcon="true"
              required="true"
              dateFormat="dd.mm.yy"
              :class="{ 'p-invalid': !date && submitted }"
            />
            <label for="date">Purchase Date</label>
            <small id="date-help" class="p-error" v-if="!date && submitted"
              >Purchase date is required.</small
            >
          </div>
        </div>
        <div class="p-field p-col">
          <SelectButton v-model="status" :options="statusOptions" />
        </div>
      </div>

      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col p-mt-5 p-mb-4">
          <Fieldset legend="Supply Description">
            <CustomizedEditor
              id="supplyDescription"
              v-model="supplyDescription"
              editorStyle="height: 320px"
              :class="{ 'p-invalid': !supplyDescription && submitted }"
            ></CustomizedEditor>
            <small
              id="supplyDescription-help"
              class="p-error"
              v-if="!supplyDescription && submitted"
              >product Description is required.</small
            >
          </Fieldset>
        </div>
      </div>

      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col p-mt-5 p-mb-4">
          <Fieldset legend="Product Description">
            <CustomizedEditor
              id="productDescription"
              v-model="productDescription"
              editorStyle="height: 320px"
              :class="{ 'p-invalid': !productDescription && submitted }"
            ></CustomizedEditor>
            <small
              id="productDescription-help"
              class="p-error"
              v-if="!productDescription && submitted"
              >product Description is required.</small
            >
          </Fieldset>
        </div>
      </div>

      <Fieldset legend="User Details">
        <div class="" v-for="(user, index) in userDetails" :key="index">
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col">
              <span class="p-float-label">
                <InputText id="inputtext" type="text" v-model="user.name" />
                <label for="inputtext">User Name </label>
              </span>
            </div>

            <div class="p-field p-col">
              <span class="p-float-label">
                <!--Dropdown v-model="user.designation" :options="designations"  optionLabel="name" optionValue="value"   /-->
                <Dropdown
                  id="designation"
                  v-model="user.designation"
                  :options="designations"
                  optionLabel="name"
                  optionValue="value"
                  :filter="true"
                  placeholder="Select Designation"
                  :showClear="true"
                >
                  <template #value="slotProps">
                    <div
                      class="country-item country-item-value"
                      v-if="slotProps.value"
                    >
                      <div>{{ slotProps.value }}</div>
                    </div>
                    <span v-else>
                      {{ slotProps.placeholder }}
                    </span>
                  </template>
                  <template #option="slotProps">
                    <div class="country-item">
                      <div>{{ slotProps.option.name }}</div>
                    </div>
                  </template>
                </Dropdown>
                <!--label for="designation">User Designation</!--label-->
              </span>
            </div>
            <div class="p-field p-col">
              <span class="p-float-label">
                <!--Dropdown v-model="user.department" :options="departments"  optionLabel="name" optionValue="value"   /-->
                <!--label for="inputtext">User Department</!--label-->
                <Dropdown
                  id="department"
                  v-model="user.department"
                  :options="departments"
                  optionLabel="name"
                  optionValue="value"
                  :filter="true"
                  placeholder="Select Department"
                  :showClear="true"
                >
                  <template #value="slotProps">
                    <div
                      class="country-item country-item-value"
                      v-if="slotProps.value"
                    >
                      <div>{{ slotProps.value }}</div>
                    </div>
                    <span v-else>
                      {{ slotProps.placeholder }}
                    </span>
                  </template>
                  <template #option="slotProps">
                    <div class="country-item">
                      <div>{{ slotProps.option.name }}</div>
                    </div>
                  </template>
                </Dropdown>
              </span>
            </div>
            <div class="p-field p-col">
              <div class="p-float-label">
                <Calendar
                  id="date"
                  v-model="user.date"
                  :showIcon="true"
                  dateFormat="dd.mm.yy"
                />
                <label for="date">Issue Date</label>
              </div>
            </div>

            <div class="p-field p-col">
              <span class="p-float-label">
                <Textarea id="textarea" v-model="user.comment" rows="3" />
                <label for="textarea">Comments</label>
              </span>
            </div>

            <Button
              label=""
              icon="pi pi-plus"
              iconPos="right"
              class="p-button-raised p-button-rounded p-mr-2 p-button-success"
              @click="addUser(index)"
            />
            <Button
              label=""
              icon="pi pi-times"
              iconPos="right"
              class="p-button-raised p-button-rounded p-button-danger"
              @click="removeUser(index)"
            />
          </div>
        </div>
      </Fieldset>
      <div class="p-fluid p-formgrid p-grid p-mt-3">
        <Button
          label="Update product"
          class="p-button-raised p-button-lg p-field p-mx-auto"
          style="width: 250px"
          iconPos="right"
          :loading="isLoading"
          @click="saveProduct"
        />
      </div>
    </div>
  </div>
</template>
        </Card>

<Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            
            <template #footer>
  <Button
    label="No"
    icon="pi pi-times"
    class="p-button-text"
    @click="deleteProductDialog = false"
  />
  <Button
    label="Yes"
    icon="pi pi-check"
    class="p-button-text"
    @click="deleteProduct"
  />
</template>
        </Dialog>
   

</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import CustomizedEditor from "./CustomizedEditor.vue";
import ProductService from "../service/ProductService";
export default {
  components: { CustomizedEditor },
  emits: ["emitReload"],
  props: ["product"],
  data() {
    return {
      api: process.env.VUE_APP_API_PRODUCT,
      isLoading: false,
      dummy: "",
      deleteProductDialog: false,
      category: this.product.category,
      supplyDescription: this.product.supplyDescription,
      productDescription: this.product.productDescription,
      status: this.product.status,
      supplier: this.product.supplier,
      submitted: false,
      date: this.product.date,
      userDetails: this.product.userDetails,
      statusOptions: ["Active", "Instock", "Inactive"],
    };
  },
  computed: {
    ...mapState([
      // ...
      "departments",
      "categories",
      "designations",
    ]),
  },
  created() {
    this.productService = new ProductService();
  },
  mounted() {},
  methods: {
    addUser(index) {
      this.userDetails.splice(index + 1, 0, {
        name: "",
        designation: "",
        department: "",
        date: "",
        comment: "",
      });
      /*this.userDetails.push({
              name: "",
              date: "",
              comment: "",
            });*/
    },
    removeUser(index) {
      if (index != 0) {
        this.userDetails.splice(index, 1);
      }
    },
    showlog() {
      //this.deleteProductDialog=!this.deleteProductDialog
      console.log(this.category);
      this.$toast.add({
        severity: "success",
        summary: "Data updated successfully",
      });
    },

    saveProduct() {
      this.submitted = true;
      if (
        !this.supplier ||
        !this.productDescription ||
        !this.date ||
        !this.category ||
        !this.supplyDescription
      ) {
        this.$toast.add({
          severity: "error",
          summary: "Please Insert Required Filed",
          life: 3000,
        });
        return;
      }
      this.isLoading = true;

      this.userDetails = this.userDetails.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });

      let product = {
        category: this.category,
        CurrentUser: this.userDetails[0].name,
        supplyDescription: this.supplyDescription,
        productDescription: this.productDescription,
        CurrentUserDesignation: this.userDetails[0].designation,
        CurrentUserDepartment: this.userDetails[0].department,
        status: this.status,
        supplier: this.supplier,
        date: this.date,
        userDetails: this.userDetails,
      };

      fetch(this.api + "/" + this.product._id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product),
      })
        .then(() => {
          //this.$router.push('/')
          this.isLoading = false;
          this.$emit("emitReload");
          this.$toast.add({
            severity: "success",
            summary: "Data updated successfully",
            life: 3000,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
          this.$toast.add({
            severity: "error",
            summary: "Data not updated",
            life: 3000,
          });
        });
      this.submitted = false;
    },
  },
};
</script>
<style lang=""></style>
