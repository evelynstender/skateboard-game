<template>
  <div id="app" class="main__app">
    <Game class="game" />
  </div>
</template>

<script>
import Game from "./components/Game";

export default {
  name: "App",
  components: {
    Game
  },
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style src="./App.css"></style>
