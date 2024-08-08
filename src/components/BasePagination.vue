<template>
  <div class="pagination">
    <div class="pagination__left">
      <p>
        <span class="count">{{ start }}</span
        >-<span class="count">{{ end }}</span> из
        <span class="count">{{ totalCount }}</span> записей
      </p>
      <div>
        <BaseSelect v-model="size" @change="handleChangePageSize">
          <option
            :value="pageSize"
            v-for="pageSize in pageSizes"
            :key="pageSize"
          >
            {{ pageSize }}
          </option>
        </BaseSelect>
      </div>
    </div>

    <div class="pagination__right">
      <BaseButton
        circle
        :disabled="page === 1"
        type="default"
        @click="handleChangePage(1)"
      >
        &laquo;
      </BaseButton>

      <BaseButton
        type="default"
        circle
        :disabled="page === 1"
        @click="handleChangePage(page - 1)"
      >
        &lsaquo;
      </BaseButton>
      <template v-for="pageItem in pages">
        <BaseButton
          circle
          :key="pageItem"
          :type="page === pageItem ? 'success' : 'default'"
          @click="handleChangePage(pageItem)"
        >
          {{ pageItem }}
        </BaseButton>
      </template>

      <BaseButton
        type="default"
        circle
        :disabled="page === pagesCount"
        @click="handleChangePage(page + 1)"
      >
        &rsaquo;
      </BaseButton>

      <BaseButton
        type="default"
        circle
        :disabled="page === pagesCount"
        @click="handleChangePage(pagesCount)"
      >
        &raquo;
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
    disabled: {
      type: Boolean,
      default: false,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    pagesCount: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  emits: ["page-changed"],
  computed: {
    start() {
      return (this.page - 1) * this.pageSize + 1;
    },
    end() {
      return Math.min(this.start + this.pageSize - 1, this.totalCount);
    },
    pages() {
      const pages = [];
      const maxVisiblePages = 5;
      const half = Math.floor(maxVisiblePages / 2);
      const totalPages = Math.ceil(this.totalCount / this.pageSize);

      let startPage = Math.max(2, this.page - half);
      let endPage = Math.min(totalPages - 1, this.page + half);

      if (this.page <= half) {
        endPage = Math.min(totalPages - 1, maxVisiblePages);
      }

      if (this.page > totalPages - half) {
        startPage = Math.max(2, totalPages - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 2) {
        pages.unshift("...");
      }
      pages.unshift(1);

      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      if (totalPages > 1) {
        pages.push(totalPages);
      }

      return pages;
    },
  },
  data() {
    return {
      page: this.currentPage,
      size: this.pageSize,
      pageSizes: [10, 25, 50, 100],
    };
  },
  methods: {
    handleChangePage(page) {
      if (page >= 1 && page <= this.totalCount) {
        this.page = page;
        this.$emit("page-changed", {
          page: this.page,
          page_size: this.size,
        });
      }
    },
    handleChangePageSize(pageSize) {
      this.page = 1;
      this.size = pageSize;
      this.$emit("page-changed", {
        page: +this.page,
        page_size: +pageSize,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .count {
    font-weight: 700;
  }
  &__left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
</style>
