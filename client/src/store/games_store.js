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
            //console.log("Store", state.game)
        },
        setSocket(state, socket){
            state.socket = socket
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