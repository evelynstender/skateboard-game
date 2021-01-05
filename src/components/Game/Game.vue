<template>
  <div class="playground__wrapper">
    <div class="score__wrapper">
      <div class="score">HI: {{ highestScoreGame }}</div>
      <div class="score">Score: {{ scoreGame }}</div>
    </div>
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
    <div class="icons">
      Icons made by
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> and
      <a href="https://www.flaticon.com/authors/vaadin" title="Vaadin">Vaadin</a> from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
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
      firstTime: true,
      highestScore: 0,
      score: 0,
      isGameRunning: false,
      scoreInterval: null,
      runningOnMobile: new RegExp(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/,
        "i"
      ).test(navigator.userAgent)
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
    touch() {
      this.ollie();
    },
    addListeners() {
      document.addEventListener("keydown", this.keyDown);

      document.addEventListener("keyup", this.keyUp);

      document.getElementById("game").addEventListener("touchstart", this.touch);
    },
    removeListeners() {
      document.removeEventListener("keydown", this.keyDown);

      document.removeEventListener("keyup", this.keyUp);

      document.getElementById("game").removeEventListener("touchstart", this.touch);
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

      this.startScore();

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
      !this.runningOnMobile && this.scooter.classList.add("scooter");

      !this.runningOnMobile && setTimeout(() => {
        this.scooter.classList.remove("invisible");
      }, 6900);
    },
    pause() {
      this.removeListeners();

      clearInterval(this.scoreInterval);

      if (this.score > this.highestScore) {
        this.highestScore = this.score;
      }
      this.score = 0;

      this.rock.classList.add("paused");
      this.cloud.classList.add("paused");
      this.scooter.classList.add("paused");
      this.skater.classList.add("paused");

      this.skater.classList.add("gameOpacity");
      this.rock.classList.add("gameOpacity");
      this.cloud.classList.add("gameOpacity");
      this.scooter.classList.add("gameOpacity");
    },
    scoreLeftZeros(score) {
      let scoreString = String(score);

      while (scoreString.length < 5) {
        scoreString = "0" + scoreString;
      }

      return scoreString;
    },

    startScore() {
      this.scoreInterval = setInterval(() => {
        this.score = this.score + 1;
      }, 50);
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
    },
    scoreGame() {
      return this.scoreLeftZeros(this.score);
    },
    highestScoreGame() {
      return this.scoreLeftZeros(this.highestScore);
    }
  }
};
</script>

<style lang="scss" src="./Game.scss"></style>
