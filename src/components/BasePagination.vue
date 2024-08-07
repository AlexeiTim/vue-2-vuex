<template>
  <div class="pagination">
    <div class="pagination__left">
      <p>
        {{ params.page_size * params.page - params.page_size + 1 }}-{{
          params.page_size * params.page - (params.page_size - appeals.length)
        }}
        из {{ totalCount }} записей
      </p>
      {{ params.page_size }}
      <BaseSelect v-model="params.page_size" @change="handleChangePageSize">
        <option :value="pageSize" v-for="pageSize in pageSizes" :key="pageSize">
          {{ pageSize }}
        </option>
      </BaseSelect>
    </div>

    <div class="pagination__right">
      <BaseButton
        :class="{ active: page === activePage }"
        @click="$emit('change-page', page)"
        v-for="page in pagesCount"
        :key="page"
      >
        {{ page }}
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import BaseSelect from "./BaseSelect.vue";

export default {
  name: "BasePagination",
  components: {
    BaseSelect,
    BaseButton,
  },
  props: {
    pageSizes: {
      type: Array,
      default: () => [10, 25, 50, 100],
    },
    pagesCount: {
      type: String || Number,
      default: 0,
    },
    activePage: {
      type: String,
      default: "",
    },
  },
  emits: ["change-page"],
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
