import { setToken } from "@/services/api/config"
import { AuthService } from "@/services/api/rest/auth.service"

const state = {
  isLoading: false,
  error: null,
  isAuth: !!localStorage.getItem('token'),
}

const getters = {
  getError: state => state.error,
  isLoading: state => state.isLoading,
  isAuth: state => state.isAuth
}

const mutations = {
  SET_LOADING(state, flag) {
    state.isLoading = flag
  },
  SET_IS_AUTH(state) {
    state.isAuth = true
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async login({ commit }, data) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await AuthService.login(data)
      localStorage.setItem('token', response.data.key)
      setToken(response.data.key)
      commit('SET_IS_AUTH', true)
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
  actions,
  mutations,
  state,
  getters
}