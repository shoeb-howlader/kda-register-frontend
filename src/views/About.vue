<template lang="">
  <Toast position="top-left" />
  <div class="p-d-inline-flex p-mt-3">
        <Card style="width: 25rem; margin-bottom: 2em">
            <template #title>
                About
            </template>
            <template #content>
                <p>Design and developed By </p>
                <p>Md Shoeb Howlader</p>
                <p>Assistant programmer, KDA</p>
            </template>
        </Card>
        

  </div>
</template>
<script>
import EditForm from '../components/editForm.vue'
import InputForm from '../components/InputForm.vue'

export default {
    components: { InputForm, EditForm

    },
    data() {
        return {
        }
    },
    methods: {
        
}}
</script>
<style lang="">

</style>
