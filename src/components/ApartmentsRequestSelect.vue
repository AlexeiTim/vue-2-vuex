<template>
  <select :value="modelValue" @change="handleChangeApartment">
    <option v-for="item in items" :key="item.id">
      {{ item.id }}
    </option>
  </select>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ApartmentRequestSelect",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    premises_id: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState("apartments", {
      items: (state) => state.items,
    }),
  },
  data() {
    return {
      value: this.modelValue,
      params: {
        premises_id: this.premises_id || "",
        search: "",
      },
    };
  },
  methods: {
    handleChangeApartment() {
      this.$emit("update:modelValue", this.value);
      this.$emit("change", this.value);
    },
  },
  watch: {
    premises_id(newValue) {
      this.params.premises_id = newValue;
      console.log("change premises_id");
      this.$store.dispatch("apartments/getAll", this.params);
    },
  },
  mounted() {
    this.$store.dispatch("apartments/getAll", this.params);
  },
};
</script>

<style lang="scss" scoped></style>
