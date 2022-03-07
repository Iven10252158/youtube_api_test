<template>
  <iframe
    :ref="playerPosition"
    :src="playerSrc"
    width="1024" height="600"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen
  />
</template>

<script>
import player from 'youtube-player'
export default {
  props: {
    playerSrc: {
      type: String,
      default: ''
    },
    playerPosition: {
      type: String,
      default: ''
    },
    alwaysMuted: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    console.log(player)
  }
}
</script>
