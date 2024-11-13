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

      <template v-if="filteredDudesData.length > 0"> 
        <DataTable :value="filteredDudesData" size="small" rowGroupMode="rowspan" groupRowsBy="Name" sortField="Name" :sortOrder="1">
          <Column field="Name" header="Nimi" sortable style="width: 40%"></Column>
          <Column field="Diff" header="Diff" sortable style="width: 20%"></Column>
          <Column field="ClassName" header="Divikas" sortable style="width: 20%" class="truncate text-ellipsis"></Column>
          <Column field="Place" header="Koht" sortable style="width: 20%"></Column>
        </DataTable>
      </template>
      <p v-else>No matching players found.</p> 
    </div>

    <div class="flex flex-col items-center p-8 gap-4">
      <div class="text-sm italic">Viimased andmed: {{ lastUpdate }}</div>
      <Button @click="fetchData" v-if="eventInput && dudesInput" label="Uuenda" />
    </div>
    
    <div class="fixed right-8 bottom-8">
      <Button label="Seaded" @click="showMenu = true" severity="secondary" size="small" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputNumber from 'primevue/inputnumber';
import Sidebar from 'primevue/sidebar';
import Textarea from 'primevue/textarea';

const event = ref(null);
const eventInput = ref(null);
const dudes = ref([]); // Store dudes as an array
const dudesInput = ref(null);
const lastUpdate = ref("");
const showMenu = ref(false);

const filteredDudesData = computed(() => {
  if (!event.value || !dudes.value.length) return [];

  if (event.value.Competition.HasSubcompetitions === 0) {
    console.log("filteredResults");
    return event.value.Competition.Results.filter(player =>
      dudes.value.some(dude => dude.toUpperCase() === player.Name.toUpperCase())
    );
  } else {
    // Handle sub-competitions
    let filteredResults = [];
    event.value.Competition.SubCompetitions.forEach(subCompetition => {
      const subResults = subCompetition.Results.filter(player =>
        dudes.value.some(dude => dude.toUpperCase() === player.Name.toUpperCase())
      );
      filteredResults = [...filteredResults, ...subResults];
    });
    console.log(filteredResults);
    return filteredResults;
  }
});

const fetchData = async () => {
  const query = `https://discgolfmetrix.com/api.php?content=result&id=${eventInput.value}`;

  try {
    const response = await fetch(query);
    const data = await response.json();

    event.value = data;
    lastUpdate.value = new Date().toString();

    // Format Diff after fetching data
    filteredDudesData.value.forEach(dude => {
      if (dude.Diff > 0) {
        dude.Diff = `+${dude.Diff}`;
      }
    });

  } catch (e) {
    console.error("Error fetching data:", e);
  }
};

const setEvent = () => {
  localStorage.setItem("savedEvent", eventInput.value);
  fetchData();
};

const setDudes = () => {
  localStorage.setItem("savedDudes", dudesInput.value);
  dudes.value = dudesInput.value.split(",").map(dude => dude.trim()); 
  fetchData();
};

const getEvent = () => {
  eventInput.value = localStorage.getItem("savedEvent");
};

const getDudes = () => {
  dudesInput.value = localStorage.getItem("savedDudes");
  if (dudesInput.value) {
    dudes.value = dudesInput.value.split(",").map(dude => dude.trim()); 
  }
};

const getStuffReady = () => {
  getEvent();
  getDudes();
};

onMounted(getStuffReady);
</script>
