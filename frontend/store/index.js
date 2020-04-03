import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const strict = false

export const state = () => ({
  role: '',
  login: true,
  lastPage: '',
  user: undefined,
  qualifications: [
    'Pflegehelfer:in',
    'Gesundheits-/Krankenpfleger:in (Plegeausbildung)',
    'Spezial: Rettung',
    'Spezial: OP',
    'Spezial: Intensiv',
    'Arzthelfer:in',
    'Student:in in med. Feld',
    'Arzt/Ärztin im Ruhestand (Innere / Intensiv)',
    'niedergelassener Anästhesist'
  ],
  showWelcome: false
})

export const mutations = {
  setRole: (state, role) => (state.role = role),
  setLogin: (state, login) => (state.login = login),
  setUser: (state, user) => (state.user = user),
  setQualifications: (state, qualifications) =>
    (state.qualifications = qualifications),
  setShowWelcome: (state, showWelcome) => (state.showWelcome = showWelcome),
  setLastPage: (state, page) => (state.lastPage = page),
  initialiseStore(state) {
    // Check if the ID exists
    if (localStorage.getItem('store')) {
      // Replace the state object with the stored item
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem('store')))
      )
    }
  }
}

export const getters = {
  // userParams: (state) => state.userParams.result.userParams
}
