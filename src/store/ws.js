const state = {
  mediaPicture: '',
  initData: [],
  newSticker: '',
  video: {
    src: ''
  },
  image: '',
  isLoading: false
}

const mutations = {
  open (state) {
    console.log('open mutations')
  },
  setWsRes (state, payload) {
    // console.log('payload', payload)
    if (payload.id) {
      payload.content.forEach(item => {
        switch (item.type) {
          case 'newsticker' :
            state.newSticker = item.content
            // console.log('newsticker', state.newSticker, item.listID)
            break
          case 'image' :
            state.image = item.content
            console.log('if image', state.image)
            break
          case 'video':
            item.content.replace('\n', '')
            state.video.src = `https://www.youtube.com/embed/${item.content}?wmode=opaque&autohide=1&autoplay=1&mute=0&loop=1&playlist=${item.content}`
            // state.video.src.replace('\n', '')
            console.log('if video', state.video.src)
            break
          case 'stream':
            state.video.src = item.content
            // `https://www.youtube.com/embed/${item.content}?wmode=opaque&autohide=1&autoplay=1&mute=0&loop=1&playlist=${item.content}`
            break
        }
      })
    } else {
      switch (payload.type) {
        case 'newsticker' :
          state.newSticker = payload.content
          console.log('else newsticker', state.newSticker)
          break
        case 'image' :
          state.image = payload.content
          console.log('else image', state.image)
          break
        case 'video':
          payload.content.replace('\n', '')
          state.video.src = `https://www.youtube.com/embed/${payload.content}?wmode=opaque&autohide=1&autoplay=1&mute=0&loop=1&playlist=${payload.content}`
          // state.video.src.replace('\n', '')
          // console.log('else video', state.video.src)
          break
        case 'stream':
          state.video.src = payload.content
          // `https://www.youtube.com/embed/${payload.content}?wmode=opaque&autohide=1&autoplay=1&mute=0&loop=1&playlist=${payload.content}`
          break
      }
    }
  },
  loadingState (state) {
    state.isLoading = true
  }
}

const actions = {
  onOpen ({ commit }) {
    commit('open')
  },
  handWsRes ({ commit }, message) {
    commit('setWsRes', message)
  },
  loading ({ commit }) {
    commit('loadingState')
  }
}

const getters = {
  newSticker (state) {
    return state.newSticker
  },
  video (state) {
    return state.video.src
  },
  image (state) {
    return state.image
  },
  loading (state) {
    return state.isLoading
  },
  initID (state) {
    return state.initID
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
}
