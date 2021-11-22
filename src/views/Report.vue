<template lang="">

<Card>
    <template #content>
    <div>
        <h5>Default</h5>
        <Editor v-model="value1" editorStyle="height: 320px"/>

        <h5>Customized</h5>
        <CustomizedEditor v-model="value2" editorStyle="height: 320px" >

            
        </CustomizedEditor>

        
        
        <div v-html="value2"></div>
{{value2}}
        
        
    </div>


    </template>
    </Card>
</template>
<script>

import CustomizedEditor from '../components/CustomizedEditor.vue'
export default {
    components: { CustomizedEditor},
    mounted () {
        
    },
    data() {
        return {
            value1: null,
            value2:'hello',
        formats:['bold', 'italic', 'underline', 'color'],
        customFonts:['times-new-roman', 'arial']
        }
    },
}
</script>
<style lang="scss">
.ql-editor .ql-font-arial {
  font-family: Arial;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before {
  content: 'Arial';
}
 #toolbar-container .ql-font span[data-label="Sans Serif"]::before {
    font-family: "Sans Serif";
  }
  
  #toolbar-container .ql-font span[data-label="Inconsolata"]::before {
    font-family: "Inconsolata";
  }
  
  #toolbar-container .ql-font span[data-label="Roboto"]::before {
    font-family: "Roboto";
  }
  
  #toolbar-container .ql-font span[data-label="Mirza"]::before {
    font-family: "Mirza";
  }
  
  #toolbar-container .ql-font span[data-label="Arial"]::before {
    font-family: "Arial";
  }
    .ql-font-inconsolata {
    font-family: "Inconsolata";
  }
  
  .ql-font-roboto {
    font-family: "Roboto";
  }
  
  .ql-font-mirza {
    font-family: "Mirza";
  }
  
  .ql-font-arial {
    font-family: "Arial";
  }
</style>