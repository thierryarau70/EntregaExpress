export function useSocket() {
    const { public: { wsBase } } = useRuntimeConfig()
    let socket: WebSocket | null = null


    function connect(path = '') {
        socket = new WebSocket(`${wsBase}${path}`)
    }
    function send(data: any) { socket?.send(JSON.stringify(data)) }
    function onMessage(cb: (data: any) => void) {
        if (!socket) return
        socket.onmessage = (evt) => cb(JSON.parse(evt.data))
    }
    function close() { socket?.close(); socket = null }


    return { connect, send, onMessage, close }
}