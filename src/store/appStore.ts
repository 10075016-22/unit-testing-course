import { defineStore } from "pinia"

export const useAppStore = defineStore('appStore', {
    state: () => ({ MyMessage: '' }),
    getters: {
        MyMessageComplete: (state) => state.MyMessage,
    },
    actions: {
        changeMessage(msg: string) {
            this.MyMessage = msg
        },
    },
})