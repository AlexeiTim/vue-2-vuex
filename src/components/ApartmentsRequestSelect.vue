<template>
  <select :value="value" @change="handleChangeApartment">
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
    value: {
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
      params: {
        premises_id: this.premises_id || "",
        search: "",
      },
    };
  },
  methods: {
    handleChangeApartment(event) {
      const selectedValue = event.target.value;
      this.$emit("input", selectedValue);
      this.$emit("change", selectedValue);
    },
  },
  watch: {
    premises_id(newValue) {
      this.params.premises_id = newValue;
      this.$store.dispatch("apartments/getAll", this.params);
    },
  },
  mounted() {
    this.$store.dispatch("apartments/getAll", this.params);
  },
};
</script>

<style lang="scss" scoped></style>
