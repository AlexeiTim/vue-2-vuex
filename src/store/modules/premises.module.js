import { GeoUserPremisesService } from "@/services/api/rest/geo-user-premises.service"

const state = {
  items: [],
  isLoading: false,
  error: null
}


const mutations = {
  SET_LOADING(state, flag) {
    state.isLoading = flag
  },
  SET_ITEMS(state, items) {
    state.items = items
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async getAll({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await GeoUserPremisesService.getAll()
        commit('SET_ITEMS', response.data.results)
        return response.data
      } catch(e) {
        commit('SET_ERROR', e)
      } finally {
        commit('SET_LOADING', false)
      }
}
}


export default {
  namespaced: true,
  state,
  actions,
  mutations
}