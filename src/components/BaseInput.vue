<template>
  <div class="root">
    <div class="root__input">
      <div :class="{ apendLabel: hasAppend }">
        <div />
        <label v-if="label" :class="{ success }" class="label">{{
          label
        }}</label>
      </div>

      <div class="input-wrapper" :class="{ append: hasAppend }">
        <slot name="append"> </slot>
        <input
          :type="type"
          :placeholder="placeholder"
          class="input"
          :value="value"
          @input="handleInput"
        />
        <slot name="prefix">
          <SearchIcon v-if="search" />
        </slot>
      </div>
    </div>
    <div v-if="error" class="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import SearchIcon from "@/components/icons/SearchIcon.vue";
export default {
  components: {
    SearchIcon,
  },
  name: "BaseInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    success: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasAppend() {
      return !!this.$slots.append;
    },
  },
  emits: ["input"],
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  position: relative;
  padding: 11px 0;
  border-bottom: 1px solid $secondary-color-200;
  display: flex;
  justify-content: space-between;

  .label {
    color: $secondary-color-300;
    font-size: 12px;
    line-height: 18px;
    &.success {
      color: $success-color;
    }
  }

  .apendLabel {
    display: flex;
    align-items: center;
    gap: 28px;
    margin-bottom: 8.5px;
  }

  .input {
    flex-grow: 1;
    width: 100%;
    &::placeholder {
      color: $secondary-color-300;
    }
    color: $main-text-color;
  }
  &__input {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .input-wrapper {
    display: flex;
    &.append {
      gap: 8px;
    }
  }

  .error {
    position: absolute;
    bottom: -16px;
    color: red;
    font-size: 12px;
    z-index: 16;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
}
</style>
