<template>
  <div id="app" class="main__app">
    <div>
      <h1>Skateboard game!</h1>
      <h3>Rocks and scooter kids are a nightmare! Try to avoid them while you skate!</h3>
      <div class="howToPlay">
        <h3>How to play:</h3>
        <div class="ollieKey">
          Ollie (jump):
          <img class="keyImg" src="./assets/arrowUp-key.png" alt="arrow up key" />
          <img class="keyImg" src="./assets/enter-key.png" alt="enter key" />
          <img class="keyImg" src="./assets/space-key.png" alt="space key" />
        </div>
        <div class="downKey">
          Get down:
          <img class="keyImg" src="./assets/arrowDown-key.png" alt="arrow down key" />
        </div>
      </div>
    </div>
    <Game class="game" />
    <div class="footer">
      This is a WIP. Made with ❤️ by
      <a href="https://evelynstender.com" target="_blank" rel="noreferrer">Evelyn Stender</a>. See
      the source code on
      <a href="https://github.com/evelynstender/skateboard-game" target="_blank" rel="noreferrer"
        >Github</a
      >.
    </div>
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
