import { AppealService } from "@/services/api/rest/appeal.service"

const state = {
  isLoading: false,
  error: null,
  appeals: [],
}

const mutations = {
  SET_LOADING(state, flag) {
    state.isLoading = flag
  },
  SET_APPEALS(state, appeals) {
    state.appeals = appeals
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async getAll({ commit }, params) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await AppealService.getAll(params)
      commit('SET_APPEALS', response.data.results)
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
  mutations,
  actions,
}