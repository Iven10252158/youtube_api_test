<script>
export default {
  methods: {
    templateAPI () {
      this.$router.push({ path: 'about', query: { uuid: 'c5898923-dee3-459f-9a36-0ef06c268903' } })
    }
  },
  mounted () {
    this.templateAPI()
    // console.log('環境變數', process.env.VUE_APP_UUID)
  }
}
// c5898923-dee3-459f-9a36-0ef06c268903
</script>
