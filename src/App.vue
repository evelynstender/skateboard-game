<template>
  <div id="app">
    <div id="skater"></div>
    <div id="rock"></div>
    <div id="scooter"></div>
    <div id="cloud"></div>

    <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->


  </div>
</template>

<script>

import image from './assets/scooter60.png'

export default {
  name: 'App',
  data() {
    return {
      // isScooterVisible
    }
  },
  mounted() {
    document.addEventListener('keydown', (event) => {
      this.ollie();
    })

    this.rock.classList.add('rock')
    this.cloud.classList.add('cloud')

    // setInterval(() => {
    //     let skateTop = parseInt(window.getComputedStyle(this.skater).getPropertyValue('top'));
    //     let rockLeft = parseInt(window.getComputedStyle(this.rock).getPropertyValue('left'));

    //     //collision
    //     if(rockLeft < 26 && rockLeft > 0 && skateTop >= 175) {
    //       console.log('collision')
    //       this.rock.classList.remove('rock')
    //        this.cloud.classList.remove('cloud')
    //     }
    // }, 10)
  },
  methods: {
    ollie() {
      if(![...this.skater.classList].includes('ollie')) {
        this.skater.classList.add('ollie')

      setTimeout(() => {
        this.skater.classList.remove('ollie') ;
      }, 300)
      }

    }
  },
  computed: {
    skater() {
      return document.getElementById('skater')
    },
    rock() {
      return document.getElementById('rock')
    },
    cloud() {
      return document.getElementById('cloud')
    }
  }
};
</script>

<style src="./App.css"></style>
