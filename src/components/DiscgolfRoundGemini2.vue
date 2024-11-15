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
        <div v-for="player in filteredDudesData" :key="player.name">
          <h2>{{ player.name }}</h2>
          <DataTable :value="player.rounds" size="small" sortField="Diff" :sortOrder="1">
            <Column field="RoundName" header="Round" sortable style="width: 40%">
              <template #body="slotProps">
                {{ slotProps.data.RoundName || `Round ${slotProps.$index + 1}` }}
              </template>
            </Column>
            <Column field="Diff" header="Diff" sortable style="width: 20%">
              <template #body="slotProps">
                {{ slotProps.data.Diff > 0 ? '+' + slotProps.data.Diff : slotProps.data.Diff }}
              </template>
            </Column>
            <Column field="ClassName" header="Divikas" sortable style="width: 20%" class="truncate text-ellipsis"></Column>
            <Column field="Place" header="Koht" sortable style="width: 20%"></Column>
          </DataTable>
        </div>
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
const dudes = ref([]); 
const dudesInput = ref(null);
const lastUpdate = ref("");
const showMenu = ref(false);

const filteredDudesData = computed(() => {
  if (!event.value || !dudes.value.length) return [];

  const players = {};

  const processResults = (results, roundName = null) => {
    results.forEach(playerResult => {
      // const playerName = playerResult.Name.toUpperCase();
      const playerName = playerResult.Name;
      if (dudes.value.includes(playerName)) {
        if (!players[playerName]) {
          players[playerName] = {
            name: playerResult.Name,
            rounds: []
          };
        }
        playerResult.RoundName = roundName; // Add round name to the result
        players[playerName].rounds.push(playerResult);
      }
    });
  };

  if (event.value.Competition.HasSubcompetitions === 0) {
    processResults(event.value.Competition.Results);
  } else {
    event.value.Competition.SubCompetitions.forEach(subCompetition => {
      processResults(subCompetition.Results, subCompetition.Name); // Pass sub-competition name
    });
  }
  console.log(players);
  // return players;
  return Object.values(players);
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
