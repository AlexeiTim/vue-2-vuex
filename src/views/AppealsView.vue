<template>
  <div>
    AppealsView
    <div v-if="isLoading">Loading...</div>
    <input v-model="params.search" @input="handleInputSearch" placeholder="Search" />
    <button @click="isVisible = true">show modal</button>
    <PremisesRequestSelect @change="handleChangePremise" />
    <div class="table-wrapper">
      <table class="table" border>
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
    </div>
    <div class="pagination">
      <div class="pagination__left">
        <p>{{ (params.page_size * params.page - params.page_size + 1) }}-{{ params.page_size * params.page - (params.page_size - appeals.length) }} из {{totalCount}} записей</p>
      <select v-model="params.page_size" @change="handleChangePageSize">
        <option :value="pageSize" v-for="pageSize in pageSizes" :key="pageSize">
          {{ pageSize }}
          </option>
      </select>
      </div>

      <div class="pagination__right">
        <button :class="{active: page === params.page}" @click="handleChangePage(page)" v-for="page in pagesCount" :key="page">
          {{ page }}
        </button>
      </div>
    </div>
    <AppealModal :is-visible="isVisible" @close="isVisible = false" />
  </div>
</template>

<script>
import AppealModal from '@/components/AppealModal.vue';
import { mapState } from 'vuex';
import { debounce } from '@/utils/debounce.js';
import PremisesRequestSelect from '@/components/PremisesRequestSelect.vue';


  export default {
    components: {
      AppealModal,
      PremisesRequestSelect
    },
    name: 'AppealsView',
    computed: {
      ...mapState('appeal', {
        appeals: state => state.appeals,
        isLoading: state => state.isLoading,
        totalCount: state => state.totalCount,
        pagesCount: state => state.pagesCount
      })
    },
    methods: {
      handleInputSearch() {
        this.params.page = 1
        this.debounceLoadAppeals()
      },
      loadAppeals() {
        this.$store.dispatch('appeal/getAll', this.params)
      },
      handleChangePage(page) {
        this.params.page = page
        this.loadAppeals()
      },
      handleChangePageSize() {
        this.params.page = 1
        this.loadAppeals()
      },
      handleChangePremise(value) {
        this.params.page = 1
        this.params.premise_id = value
        this.loadAppeals()
      }
    },
    created() {
      this.debounceLoadAppeals = debounce(this.loadAppeals, 300)
    },
    data() {
      return {
        isVisible: false,
        pageSizes: [10, 25, 50, 100],
        params: {
          page: 1,
          page_size: 100,
          search: '',
          premise_id: null
        }
      }
    },
    mounted() {
      this.$store.dispatch('appeal/getAll')
    },
  }
</script>

<style lang="scss" scoped>
.table-wrapper {
  overflow-y: scroll;
  max-height: 200px;
}


.pagination {
  display:flex;
  justify-content: space-between;
  align-items: center;

  &__left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

button {
  cursor: pointer;
}

.active {
  background: green;
}
</style>