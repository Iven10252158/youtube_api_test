import store from '../store'

let socket = null

export const connectSocket = (id) => {
  const WS_BASE = '20.106.156.149:8080/ws/' // 192.168.1.176:8080/ws/'
  const WS_PORT = id // 5fe69ddb-43f1-40f5-82a3-01af0e59556d'
  const WS_ADDRESS = `ws://${WS_BASE}${WS_PORT}`
  // console.log('WS_PORT', WS_PORT)
  socket = new WebSocket(WS_ADDRESS)

  socket.onopen = () => { // 連線(onopen)
    store.dispatch('ws/onOpen')
    console.log('websocket connected!!')
    if (socket.readyState === 1) {
      socket.send(JSON.stringify({ command: `get_status ${id}` }))
    }
  }
  socket.onmessage = (msg) => { // 監聽訊息(onmessage)
    store.dispatch('ws/handWsRes', JSON.parse(msg.data))
    console.log('onmessage:', JSON.parse(msg.data))
  }
  socket.onerror = (err) => { // 監聽錯誤(onerror)
    console.log('error', err)
  }
}
