<template>
  <div>
    AppealsView
    <div v-if="isLoading">Loading...</div>
    <input placeholder="Search" />
    <button @click="isVisible = true">show modal</button>
    <select>
      <option />
    </select>
    <table border>
      <thead>
        <tr>
          <th>Номер</th>
          <th>Создана</th>
          <th>Адрес</th>
          <th>Заявитель</th>
          <th>Описание</th>
          <th>Срок</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appeal in appeals" :key="appeal.id">
          <th>{{ appeal.number }}</th>
          <th>{{ appeal.created_at }}</th>
          <th>{{ appeal?.premise?.address }} {{  appeal?.apartment?.label }}</th>
          <th>{{ appeal.applicant?.first_name }} {{ appeal.applicant?.last_name }} {{ appeal.applicant?.patronymic_name }}</th>
          <th>{{ appeal.description }}</th>
          <th>{{ appeal.due_date }}</th>
          <th>{{ appeal.status?.name }}</th>
        </tr>
      </tbody>
    </table>
    <AppealModal :is-visible="isVisible" @close="isVisible = false" />
  </div>
</template>

<script>
import AppealModal from '@/components/AppealModal.vue';
import { mapState } from 'vuex';

  export default {
    components: {
      AppealModal
    },
    name: 'AppealsView',
    computed: {
      ...mapState('appeal', {
        appeals: state => state.appeals,
        isLoading: state => state.isLoading
      })
    },
    data() {
      return {
        isVisible: false
      }
    },
    mounted() {
      this.$store.dispatch('appeal/getAll')
    }
  }
</script>

<style lang="scss" scoped>

</style>