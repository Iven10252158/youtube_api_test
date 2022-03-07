<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <button @click="adjustable">按我</button>
      <button @click="playCurrentVideo">Play</button>
      <button @click="stopCurrentVideo">Stop</button>
      <button @click="pauseCurrentVideo">Pause</button>
      <button @click="mute">靜音</button>
      <button @click="unMute">取消靜音</button>
    </div>
    <div class='media-block'>
      <!-- <div class="video-image bg-cover" v-show="showImage" :style="{backgroundImage:'url(' +image+ ')'}" :class="{ changeStyle: scaleBlock }"></div> -->
      <div class="video" :class="{ changeStyle: scaleBlock }">
        <Player :player-src="youtubeSrc"></Player>
      </div>
    </div>
  </div>
</template>

<script>
import { connectSocket } from '../configs/webSocket'
import Player from '@/components/Player.vue'

export default {
  data () {
    return {
      showImage: false,
      videoID: this.youtubeSrc
    }
  },
  components: {
    Player
  },
  watch: {
    image () {
      this.showImage = true
    },
    youtubeSrc () {
      this.showImage = false
    }
  },
  computed: {
    youtubeSrc () {
      return this.$store.getters['ws/video']
    },
    image () {
      return this.$store.getters['ws/image']
    },
    scaleBlock () {
      return this.$store.getters.scaleBlock
    }
  },
  methods: {
    playCurrentVideo () {
      this.$refs.youtube.player.playVideo()
    },
    stopCurrentVideo () {
      this.$refs.youtube.player.stopVideo()
    },
    pauseCurrentVideo () {
      this.$refs.youtube.player.pauseVideo()
    },
    mute () {
      this.$refs.youtube.player.mute()
    },
    unMute () {
      this.$refs.youtube.player.unMute()
    },
    adjustable () {
      this.$store.dispatch('scaleBlock')
    },
    onPlayed () {
      // this.unMute()
      this.$refs.youtube.player.playVideo()
      console.log('## OnPlayed')
    },
    onEnded () {
      this.$refs.youtube.player.seekTo(0)
    },
    getPageID () {
      this.$http.get(`http://20.106.156.149:8080/template/${this.$route.query.uuid}`)
        .then(res => {
          // console.log(res)
          connectSocket(res.data.uuid)
          this.$refs.youtube.player.mute()
          this.playCurrentVideo()
        })
    }
  },
  mounted () {
    this.getPageID()
  }
}
</script>

<style lang="scss" scoped>
.bg-cover{
  background-size: cover;
  background-position: center center;
}
  .media-block{
  transition: all .5s;
  height: 31.64vh;
  width: 100%;
  background-color: #000;
  .video{
    transition: all .5s;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: 100%;
    height: 31.64vh;
        &.changeStyle{
        transition: all .5s;
        height: 19.7vh;
        width: 62.5%;
      }
  }
  .dontTouch{
    width: 100%;
    background-color: orange;
    opacity: 0;
    position: absolute;
    z-index: 2;
    left: 50%;
    transform: translateX(-50%);
    height: 31.64vh;
      &.changeStyle{
      transition: all .5s;
      height: 19.7vh;
      width: 62.5%;
    }
  }
  .video-image{
    transition: all .5s;
    position: absolute;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 31.64vh;
    &.changeStyle{
      transition: all .5s;
      height: 19.7vh;
      width: 62.5%;
    }
  }
  &.scale{
    transition: all .5s;
    height: 19.7vh;
  }
}
</style>
