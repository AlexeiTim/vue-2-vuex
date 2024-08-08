<template>
  <div class="root">
    <header class="header">Список заявок</header>
    <main class="main">
      <div class="card">
        <div class="card__header">
          <BaseButton
            @click="handleOpenAppealModal"
            class="card__header-button"
          >
            СОЗДАТЬ
          </BaseButton>
        </div>
        <div class="card__filters">
          <BaseInput
            placeholder="Поиск (№ заявки, название)"
            search
            v-model="params.search"
            @input="handleInputSearch"
          />
          <PremisesRequestSelect
            v-model="params.premise_id"
            @change="handleChangePremise"
          />
        </div>
        <div class="card__table">
          <BaseLoadingSpinner v-if="isLoading" />
          <AppealsTable
            v-else
            :appeals="appeals"
            @select-appeal="handleSelectAppeal"
          />
        </div>
        <div class="card__pagination">
          <BasePagination
            v-if="appeals && appeals.length"
            :page-size="+params.page_size"
            :totalCount="+totalCount"
            :page="+params.page"
            :pages-count="+pagesCount"
            @page-changed="handlePageChange"
          />
        </div>

        <AppealModal
          v-if="isVisible"
          :is-visible="isVisible"
          :appeal="selectedAppeal"
          @close="isVisible = false"
        />
      </div>
    </main>
  </div>
</template>

<script>
import AppealModal from "@/components/AppealModal.vue";
import { mapState } from "vuex";
import { debounce } from "@/utils/debounce.js";
import PremisesRequestSelect from "@/components/PremisesRequestSelect.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import AppealsTable from "@/components/AppealsTable.vue";
import BaseLoadingSpinner from "@/components/BaseLoadingSpinner.vue";
import BasePagination from "@/components/BasePagination.vue";

export default {
  components: {
    AppealModal,
    PremisesRequestSelect,
    BaseInput,
    BaseButton,
    BasePagination,
    AppealsTable,
    BaseLoadingSpinner,
  },
  name: "AppealsView",
  computed: {
    ...mapState("appeal", {
      appeals: (state) => state.appeals,
      isLoading: (state) => state.isLoading,
      totalCount: (state) => state.totalCount,
      pagesCount: (state) => state.pagesCount,
    }),
  },
  methods: {
    handleInputSearch() {
      this.params.page = 1;
      this.debounceLoadAppeals();
    },
    loadAppeals() {
      this.$store.dispatch("appeal/getAll", this.params);
    },
    handleChangePage(page) {
      this.params.page = page;
      this.loadAppeals();
    },
    handlePageChange({ page, page_size }) {
      console.log(page, page_size);
      this.params.page = page;
      this.params.page_size = page_size;
      this.loadAppeals();
    },
    handleChangePageSize(value) {
      this.params.page = 1;
      this.params.page_size = value;
      this.loadAppeals();
    },
    handleOpenAppealModal() {
      this.selectedAppeal = null;
      this.isVisible = true;
    },
    handleChangePremise() {
      this.params.page = 1;
      this.loadAppeals();
    },
    handleSelectAppeal(appeal) {
      this.isVisible = true;
      this.selectedAppeal = appeal;
    },
  },
  created() {
    this.debounceLoadAppeals = debounce(this.loadAppeals, 300);
  },
  data() {
    return {
      isVisible: false,
      test: "",
      pageSizes: ["10", "25", "50", "100"],
      selectedAppeal: null,
      params: {
        page: 1,
        page_size: 10,
        search: "",
        premise_id: "",
      },
    };
  },
  mounted() {
    this.$store.dispatch("appeal/getAll", this.params);
  },
};
</script>

<style lang="scss" scoped>
.root {
  .header {
    padding: 23px 32px;
    width: 100%;
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 24px;
  }
  .main {
    padding: 27px 15px;
  }
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    &__right {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .card {
    background: white;
    border-radius: 20px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: end;
      &-button {
        box-shadow: 0 4px 4px rgba(106, 174, 94, 25%);
      }
    }

    &__filters {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      & > * {
        flex-basis: 50%;
      }
    }
  }
  button {
    cursor: pointer;
  }

  .active {
    background: green;
  }
}
</style>
