<template>
  <div id="game">
    <div id="skater" class="gameOpacity"></div>
    <div id="rock" class="paused gameOpacity"></div>
    <div id="scooter" class="paused gameOpacity invisible"></div>
    <div id="cloud" class="paused gameOpacity"></div>
    <div v-if="firstTime" class="startRetryButton start" @click="begin">
      Start now!
    </div>
    <div v-else-if="collidedRock || collidedScooter" class="startRetryButton" @click="retry">
      <img class="retryImg" src="../../assets/retry.png" />
      You lose! Retry!
    </div>
  </div>
</template>

<script>
export default {
  name: "Game",
  data() {
    return {
      collidedRock: false,
      collidedScooter: false,
      skaterDown: false,
      firstTime: true
    };
  },
  mounted() {
    this.addListeners();
    this.addCollision();
    this.pause();
  },
  methods: {
    ollie() {
      if (![...this.skater.classList].includes("ollie")) {
        this.skater.classList.add("ollie");

        setTimeout(() => {
          if (!this.collidedRock && !this.collidedScooter) {
            this.skater.classList.remove("ollie");
          }
        }, 600);
      }
    },
    keyDown(event) {
      event.preventDefault();
      if (event.code === "Space" || event.code === "Enter" || event.code === "ArrowUp") {
        this.ollie();
      }
      if (event.code === "ArrowDown") {
        this.skater.classList.add("down");
        this.skaterDown = true;
      }
    },
    keyUp(event) {
      event.preventDefault();
      if (event.code === "ArrowDown") {
        this.skater.classList.remove("down");
        this.skaterDown = false;
      }
    },
    addListeners() {
      document.addEventListener("keydown", this.keyDown);

      document.addEventListener("keyup", this.keyUp);
    },
    removeListeners() {
      document.removeEventListener("keydown", this.keyDown);

      document.removeEventListener("keyup", this.keyUp);
    },
    addCollision() {
      setInterval(() => {
        let skateTop = parseInt(window.getComputedStyle(this.skater).getPropertyValue("top"));
        let rockLeft = parseInt(window.getComputedStyle(this.rock).getPropertyValue("left"));
        let scooterLeft = parseInt(window.getComputedStyle(this.scooter).getPropertyValue("left"));

        //collisions

        //rock
        if (rockLeft < 50 && rockLeft > 0 && skateTop >= 175) {
          this.pause();
          this.collidedRock = true;
        }

        //scooter
        if (scooterLeft < 50 && scooterLeft > 0 && !this.skaterDown) {
          this.pause();
          this.collidedScooter = true;
        }
      }, 10);
    },
    begin() {
      this.firstTime = false;
      this.startGame();
    },
    retry() {
      this.restartAnimation();
      this.startGame();
    },
    restartAnimation() {
      this.rock.style.animation = "none";
      this.rock.offsetHeight;
      this.rock.style.animation = null;

      this.cloud.style.animation = "none";
      this.cloud.offsetHeight;
      this.cloud.style.animation = null;

      this.scooter.style.animation = "none";
      this.scooter.offsetHeight;
      this.scooter.style.animation = null;

      this.skater.classList.remove("paused");
      this.skater.classList.remove("ollie");

      this.collidedRock = false;
      this.collidedScooter = false;
    },
    startGame() {
      this.addListeners();

      this.scooter.classList.add("invisible");
      this.scooter.classList.add("paused");

      this.rock.classList.remove("rock");
      this.cloud.classList.remove("cloud");
      this.scooter.classList.remove("scooter");

      this.rock.classList.remove("paused");
      this.cloud.classList.remove("paused");
      this.skater.classList.remove("paused");
      this.scooter.classList.remove("paused");

      this.skater.classList.remove("gameOpacity");
      this.rock.classList.remove("gameOpacity");
      this.cloud.classList.remove("gameOpacity");
      this.scooter.classList.remove("gameOpacity");

      this.rock.classList.add("rock");
      this.cloud.classList.add("cloud");
      this.scooter.classList.add("scooter");

      setTimeout(() => {
        this.scooter.classList.remove("invisible");
      }, 6900);
    },
    pause() {
      this.removeListeners();

      this.rock.classList.add("paused");
      this.cloud.classList.add("paused");
      this.scooter.classList.add("paused");
      this.skater.classList.add("paused");

      this.skater.classList.add("gameOpacity");
      this.rock.classList.add("gameOpacity");
      this.cloud.classList.add("gameOpacity");
      this.scooter.classList.add("gameOpacity");
    }
  },
  computed: {
    skater() {
      return document.getElementById("skater");
    },
    rock() {
      return document.getElementById("rock");
    },
    cloud() {
      return document.getElementById("cloud");
    },
    scooter() {
      return document.getElementById("scooter");
    }
  }
};
</script>

<style lang="scss" src="./Game.scss"></style>
