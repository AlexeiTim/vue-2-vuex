import { AppealService } from "@/services/api/rest/appeal.service";

const state = {
  isLoading: false,
  error: null,
  appeals: [],
  totalCount: 0,
  pagesCount: 0,
};

const mutations = {
  SET_LOADING(state, flag) {
    state.isLoading = flag;
  },
  SET_APPEALS(state, appeals) {
    state.appeals = appeals;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_TOTAL_COUNT(state, count) {
    state.totalCount = count;
  },
  SET_PAGES_COUNT(state, count) {
    state.pagesCount = count;
  },
};

const actions = {
  async getAll({ commit }, params) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const response = await AppealService.getAll(params);
      commit("SET_APPEALS", response.data.results);
      commit("SET_TOTAL_COUNT", response.data.count);
      commit("SET_PAGES_COUNT", response.data.pages);
      return response.data;
    } catch (e) {
      commit("SET_ERROR", e);
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async create({ commit }, data) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const response = await AppealService.create(data);
      return response.data;
    } catch (e) {
      commit("SET_ERROR", e);
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async update({ commit }, { id, data }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const response = await AppealService.update(id, data);
      return response.data;
    } catch (e) {
      commit("SET_ERROR", e);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
