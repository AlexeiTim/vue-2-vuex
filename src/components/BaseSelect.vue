<template>
  <div class="root">
    <select :value="value" @change="handleChange">
      <slot />
    </select>
    <ArrowDownIcon />
  </div>
</template>

<script>
import ArrowDownIcon from "./icons/ArrowDownIcon.vue";

export default {
  name: "BaseSelect",
  components: {
    ArrowDownIcon,
  },
  props: ["value"],
  emits: ["input", "change"],
  methods: {
    handleChange(event) {
      const value = event.target.value;
      this.$emit("change", value);
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
  padding: 8px 12px 8px 0;
  border-bottom: 1px solid $secondary-color-200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  select {
    flex-grow: 1;
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    &::placeholder {
      color: $secondary-color-300;
    }
  }

  select:after {
    width: 14px;
    height: 8px;
    position: absolute;
    background: red;
  }
}
</style>
