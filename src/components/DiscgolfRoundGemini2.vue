<template class="relative">
  <Drawer v-model:visible="showMenu" header="Seaded" position="bottom" style="height: 100vh">
  <!-- <Sidebar v-model:visible="showMenu" header="Seaded" position="bottom" style="height: auto"> -->
    <div class="flex gap-8 justify-around">
      <div class="flex flex-col gap-2">
        <label for="input-competition"><b>Võistlus</b> <small>(Metrixi ID)</small></label>
        <InputNumber v-model="eventInput" inputId="input-competition" :useGrouping="false" />
        <Button @click="setEvent" label="MUUDA" /> 
      </div>
      
      <div class="flex flex-col gap-2">
        <label for="input-players"><b>Mina ja Oleg</b></label>
        <Listbox v-model="dudes" :options="club" multiple checkmark class="w-full md:w-56" listStyle="max-height:80vh" />
        <Button @click="setDudes" label="MUUDA" />

        <!-- <div v-for="(member,i) of club" :key="`member+${i}`" class="flex items-center gap-2">
          <Checkbox v-model="dudes" :inputId="`member+${i}`" name="`member+${i}`" :value="member" />
          <label :for="`member+${i}`">{{ member }}</label>
        </div> -->
      </div>
    </div>
  </Drawer>
  <!-- </Sidebar> -->
  
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
        
          <!-- @rowExpand="onRowExpand" @rowCollapse="onRowCollapse"  -->
        <DataTable :value="filteredDudesData" v-model:expandedRows="expandedRows" dataKey="name"
          
          sortField="totalDiff" :sortOrder="1" sortMode="single" >
          <Column expander style="width: 3rem" /> 
          <Column field="name" header="Nimi" sortable style="width: calc(35% - 3rem)"></Column>
            <Column field="totalDiff" header="Diff" sortable style="width: 15%">
              <template #body="slotProps">
                {{ slotProps.data.totalDiff > 0 ? '+' + slotProps.data.totalDiff : slotProps.data.totalDiff }}
              </template>
          </Column>
          <Column field="totalPlace" header="Koht" sortable style="width: 15%"></Column>
          <Column field="totalSum" header="Viskeid" sortable style="width: 15%" class="truncate text-ellipsis"></Column>
          <Column field="division" header="Divikas" sortable style="width: 20%" class="truncate text-ellipsis"></Column>
            
          <template #expansion="slotProps">
            <div style="transform:translateY(-1rem)">
                    <DataTable :value="slotProps.data.rounds" tableStyle="opacity:0.6">
                        <Column style="width: 3rem" headerStyle="display:none;"></Column> 
                        <Column field="RoundName" style="width: calc(35% - 3rem); padding-top:0.25rem; padding-bottom:0.25rem;" 
                          headerStyle="display:none;"></Column> 
                        <Column field="Diff" style="width: 15%; padding-top:0.25rem; padding-bottom:0.25rem;" 
                          headerStyle="display:none;"></Column>
                        <Column field="Place" style="width: 15%; padding-top:0.25rem; padding-bottom:0.25rem;" 
                          headerStyle="display:none;"></Column>
                        <Column field="Sum" style="width: 15%; padding-top:0.25rem; padding-bottom:0.25rem;" 
                          headerStyle="display:none;"></Column>
                        <Column style="width: 20%" 
                          headerStyle="display:none;">pss</Column> 
                    </DataTable>
                    </div>
            </template>
          </DataTable>
        
      </template>
      <p v-else>No matching players found.</p> 
    </div>

    <div class="flex flex-col items-center p-8 gap-4">
      <div class="text-sm italic">Viimased andmed: {{ lastUpdate }}</div>
      <Button @click="fetchData" v-if="eventInput" label="Uuenda" />
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
// import Checkbox from 'primevue/checkbox';
import DataTable from 'primevue/datatable';
import Drawer from 'primevue/drawer';
import InputNumber from 'primevue/inputnumber';
import Listbox from 'primevue/listbox';


const event = ref(null);
const eventInput = ref(null);
const club = ref([
  'Andres Berens', 'andro tsernobrovkin', 'Andrus Naulainen', 'Daniel Maaker', 'Ege Sepp', 'Ervin Lember', 'Gerdo Piirma', 'Ivo Raamat', 'Kristjan Jansen', 'Madis Vaher', 'Mikk Sepp', 'Oleg Tsernobrovkin', 'Oliver Maaker', 'Priit Raamat', 'Ragnar Lall', 'Samuel Oja', 'Sander Lember', 'Urmas Oja', 'Urmo Saar', 'Uku Volke', 'Ulla Volke', 'Veljo Volke'
]); 
const dudes = ref([]); 
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
        playerResult.RoundName = roundName;
        players[playerName].rounds.push(playerResult);
      }
    });
  };

  if (event.value.Competition.HasSubcompetitions === 0) {
    processResults(event.value.Competition.Results);
  } else {
    event.value.Competition.SubCompetitions.forEach(subCompetition => {
      processResults(subCompetition.Results, subCompetition.Name); 
    });
  }

  function calculateTotalScores(playersObject) {
    for (const playerName in playersObject) {
      if (playersObject.hasOwnProperty(playerName)) {
        const player = playersObject[playerName];
        let currentDiff = 0;
        let currentSum = 0;
        for (const round of player.rounds) {
          currentDiff += round.Diff;
          currentSum += round.Sum;
        }
        player.totalDiff = currentDiff;
        player.totalSum = currentSum;
        player.totalPlace = player.rounds.at(-1).Place;
        player.division = player.rounds.at(-1).ClassName;
      }
    }
  }

  calculateTotalScores(players);
  return Object.values(players);
});

const fetchData = async () => {
  const query = `https://discgolfmetrix.com/api.php?content=result&id=${eventInput.value}`;

  try {
    const response = await fetch(query);
    const data = await response.json();

    event.value = data;
    //console.log(data);
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
  localStorage.setItem("savedDudes", JSON.stringify(dudes.value));
  fetchData();
};

const getEvent = () => {
  eventInput.value = localStorage.getItem("savedEvent");
};

const getDudes = () => {
  const savedDudes = localStorage.getItem("savedDudes");
    dudes.value = JSON.parse(savedDudes); 
    // dudes.value = savedDudes.split(",").map(dude => dude.trim()); 
    // console.log(dudes.value);
    
      // fetchData();
};

const getStuffReady = () => {
  getEvent();
  getDudes();
  if(eventInput.value && dudes.value){
    fetchData();
  } else {
    showMenu.value = true;
  }
};

onMounted(getStuffReady);
</script>