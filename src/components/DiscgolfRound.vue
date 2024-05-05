<template class="relative">
    <Sidebar v-model:visible="showMenu" header="Seaded" position="bottom" style="height: auto">
      <div class="flex gap-8 justify-around">
        <div class="flex flex-col gap-2">
          <label for="input-competition"><b>Võistlus</b> <small>(Metrixi ID)</small></label>
          <InputNumber v-model="eventInput" inputId="input-competition" :useGrouping="false" />
          <Button @click="setEvent" label="MUUDA" /> 
        </div>
        <div class="flex flex-col gap-2">
          <label for="input-players"><b>Mängijad</b> <small>(eralda komadega)</small></label>
          <Textarea v-model="dudesInput" autoResize rows="4" cols="48" />
          <Button @click="setDudes" label="MUUDA" />
        </div>
      </div>
    </Sidebar>
    
    
    <section class="relative">

      
      <div v-if="event">
        <div class="flex p-8 gap-8">
          <h1 class="text-6xl">💩</h1>
          <div>
            <h2 v-html="event.Competition.Name" class="text-3xl font-bold"></h2>
            <h4><i>MINA JA OLEGI VIRTUAALNE TABEL</i></h4>
          </div>
      </div>
      <template v-if="dudesData">
        <DataTable :value="dudesData" sortField="Diff" :sortOrder="1">
          <Column field="Name" header="Nimi" sortable style="width: 50%"></Column>
          <Column field="Diff" header="Diff" sortable style="width: 25%"></Column>
          <Column field="Sum" header="Sum" sortable style="width: 25%"></Column>
        </DataTable>
      </template>
    </div>
    <div class="flex flex-col items-center p-8 gap-4">
      <div class="text-sm italic">Viimased andmed: {{lastUpdate}}</div>
      <Button @click="fetchData" v-if="eventInput && dudesInput" label="Uuenda" />
    </div>
    
    <div class="fixed right-8 bottom-8">
      <Button label="Seaded" @click="showMenu = true" severity="secondary" size="small" />
    </div>

  </section>

  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    
    
    import Button from 'primevue/button';
    import Column from 'primevue/column';
    import DataTable from 'primevue/datatable';
    import InputNumber from 'primevue/inputnumber';
    import Sidebar from 'primevue/sidebar';
    import Textarea from 'primevue/textarea';

    // import Player from './Player.vue';
  
    const event = ref(null);
    const eventInput = ref(null);
    const dudes = ref(null);
    const dudesData = ref(null);
    const dudesInput = ref(null);
    const lastUpdate = ref("")
    const query = ref(null);
    const showMenu = ref(false);
  
    const fetchData = async () => {
      query.value = `https://discgolfmetrix.com/api.php?content=result&id=${eventInput.value}`;
        // query.value = `https://discgolfmetrix.com/api.php?content=result&id=1915436`;
        try {
          await fetch(query.value)
            .then(response => response.json())
            .then(data => {
              event.value = data;
              lastUpdate.value = new Date().toString();
              // console.log("siin on ok");
              
              dudesData.value = data.Competition.Results.filter(
                player => findNames( dudes.value, player.Name)
                ).sort(function (a, b) {
                  return a.Total - b.Total;
                });
          });
        } catch (e) {
          //error.value = e;
          console.error("Nahhui, datat ei tule ju?!?", query.value);
        }
      };
  
      function findNames(arr, val) {
        return arr.some(arrVal => val.toUpperCase() === arrVal.toUpperCase());
      }
  
      function getEvent() {
        // console.log("getDudes", localStorage.getItem("savedDudes"));
        eventInput.value = localStorage.getItem("savedEvent");
        // dudes.value = localStorage.getItem("savedDudes").split(", ");
      }
      function setEvent() { 
        localStorage.setItem("savedEvent", eventInput.value);
        // console.log("setDudes" + localStorage.getItem("savedDudes"));
        // dudes.value = localStorage.getItem("savedDudes").split(", ");
        fetchData();
      }
      function getDudes() {
        // console.log("getDudes", localStorage.getItem("savedDudes"));
        dudesInput.value = localStorage.getItem("savedDudes");
        dudes.value = localStorage.getItem("savedDudes").split(", ");
      }
      function setDudes() { 
        localStorage.setItem("savedDudes", dudesInput.value);
        // console.log("setDudes" + localStorage.getItem("savedDudes"));
        dudes.value = localStorage.getItem("savedDudes").split(", ");
        fetchData();
      }
  
      function getStuffReady(){
        getEvent();
        getDudes();
      }
  
      onMounted( getStuffReady );
  
    
  </script>
  
  <style scoped>
  </style>