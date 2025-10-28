export default {
    namespaced: true,
    state:{
        game:null,
        socket: null,
        example_board: null,
    },
    // Mutations are responsible fro changing state
    mutations: {
        setGame(state, game){
            state.game = game
        },
        setSocket(state, socket){
            state.socket = socket
        },
        setCountdown(state, data){
            state.game.intervalCountdown = data.intervalCountdown
            state.game.isCountdown = data.isCountdown
            state.game.countdown = data.countdown
        },
        setStart(state, data){
            state.game.isStart = data.isStart
        },
        setExample(state, example_board){
            console.log("store")
            state.example_board = example_board
        }
    },
    actions: {

    },
    // getters are use to retrieve state data
    getters: {
        getSocket: (state) => state.socket,
        getGame: (state) => state.game
    }
}