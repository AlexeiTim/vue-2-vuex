<template>
  <div class="root">
    <p class="root__count">{{ count }}</p>
    <button @click="increment">Increment</button>
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import { mapState, mapActions } from 'vuex';

export default {
  comments: {
    RouterView
  },  
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapActions(['increment'])
  }
};
</script>

<style lang="scss">
.root {
  &__count {
    color: red;
  }
}
</style>