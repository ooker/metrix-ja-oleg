<template>
    <div class="player">
        <div class="player-name">
            <b>{{playerData.Name}}</b>
        </div>
        <div v-for="(e,i) in playerData.PlayerResults" :key="'k'+i">
            {{e.Diff}}
        </div>
        <div>
            <b>{{ playerData.Sum }}</b>
        </div>
        <div>
            <b>{{ playerData.Diff <= 0 ? playerData.Diff : "+"+playerData.Diff }}</b>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        playerData: Object,
        suva: "PLÖNN!"
    })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .player {
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
        border-bottom: 1px dotted var(--col-primary);
    }
    .player-name {
        flex: 0 0 30%;
        text-align: left;
    }
</style>