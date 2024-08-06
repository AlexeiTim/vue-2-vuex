import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth.module';
import appeal from './modules/appeal.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    appeal
  }
});