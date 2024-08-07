<template>
  <BaseSelect :value="value" @change="handleChangeApartment">
    <option v-for="item in items" :key="item.id">
      {{ item.id }}
    </option>
  </BaseSelect>
</template>

<script>
import { mapState } from "vuex";
import BaseSelect from "./BaseSelect.vue";

export default {
  name: "ApartmentRequestSelect",
  components: {
    BaseSelect,
  },
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
    handleChangeApartment(value) {
      this.$emit("input", value);
      this.$emit("change", value);
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
