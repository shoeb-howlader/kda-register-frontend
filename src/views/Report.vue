<template lang="">
<div>
        <div class="p-float-label">
              <Calendar id="date" v-model="date" :showIcon="true" required="true" dateFormat="dd.mm.yy" autocomplete="off" :class="{'p-invalid':!date && submitted}"/>
              <label for="date">Purchase Date</label>
              <small id="date-help" class="p-error" v-if="!date && submitted">Purchase date is required.</small>
            </div>
        <h5>Popup</h5>
        <div class="p-fluid p-grid p-formgrid">
            <div class="p-field p-col-12 p-md-4">
                <label for="basic">Basic</label>
                <Calendar id="basic" v-model="date1" autocomplete="off" />
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="dateformat">DateFormat</label>
                <Calendar id="dateformat" v-model="date2"  dateFormat="mm-dd-yy" />
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="icon">Icon</label>
                <Calendar id="icon" v-model="date3" :showIcon="true" />
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="minmax">MinMax</label>
                <Calendar id="minmax" v-model="date4" :minDate="minDate" :maxDate="maxDate" :manualInput="false" />
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="disableddays">Disabled Days</label>
                <Calendar id="disableddays" v-model="date5" :disabledDates="invalidDates" :disabledDays="[0,6]" :manualInput="false" />
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="multiple">Multiple</label>
                <Calendar id="multiple" v-model="dates1" selectionMode="multiple" :manualInput="false" />
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="range">Range</label>
                <Calendar id="range" v-model="dates2" selectionMode="range" :manualInput="false" />
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="buttonbar">Button Bar</label>
                <Calendar id="buttonbar" v-model="date6" :showButtonBar="true" />
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="time24">Time / 24h</label>
                <Calendar id="time24" v-model="date7" :showTime="true" :showSeconds="true" />
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="time12">Time / 12h</label>
                <Calendar id="time12" v-model="date8" :timeOnly="true" hourFormat="12" />
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="monthpicker">Month Picker</label>
                <Calendar id="monthpicker" v-model="date9" view="month" dateFormat="mm/yy" />
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="yearpicker">Year Picker</label>
                <Calendar id="yearpicker" v-model="date10" view="year" dateFormat="yy"/>
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="multiplemonths">Multiple Months</label>
                <Calendar id="multiplemonths" v-model="date11" :numberOfMonths="3" :responsiveOptions="responsiveOptions" />
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="datetemplate">Date Template</label>
                <Calendar id="datetemplate" v-model="date12">
                    <template #date="slotProps">
                        <strong v-if="slotProps.date.day > 10 && slotProps.date.day < 15" class="special-day">{{slotProps.date.day}}</strong>
                        <template v-else>{{slotProps.date.day}}</template>
                    </template>
                </Calendar>
            </div>
            <div class="p-field p-col-12 p-md-4">
                <label for="touchUI">TouchUI</label>
                <Calendar id="touchUI" v-model="date13" :touchUI="true" />
            </div>
        </div>

        <h5>Inline</h5>
        <Calendar v-model="date14" :inline="true" :showWeek="true" />
    </div>
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