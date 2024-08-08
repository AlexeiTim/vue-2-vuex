<template>
  <BaseSelect
    :success="success"
    :label="label"
    :value="value"
    @change="handleChangeModelValue"
  >
    <option selected value="" disabled>Выберите дом</option>
    <option :value="item.id" v-for="item in items" :key="item.id">
      {{ item.address }}
    </option>
  </BaseSelect>
</template>

<script>
import { mapState } from "vuex";
import BaseSelect from "./BaseSelect.vue";

export default {
  name: "PremisesRequestSelect",
  components: {
    BaseSelect,
  },
  props: {
    success: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  emits: ["input", "change"],
  computed: {
    ...mapState("premises", {
      items: (state) => state.items,
    }),
  },
  methods: {
    handleChangeModelValue(value) {
      this.$emit("input", value);
      this.$emit("change", value);
    },
  },
  mounted() {
    this.$store.dispatch("premises/getAll");
  },
};
</script>
