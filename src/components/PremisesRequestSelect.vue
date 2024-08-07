<template>
  <div>
    <select :value="value" @change="handleChangeModelValue">
      <option selected value="" disabled>Выберите дом</option>
      <option :value="item.id" v-for="item in items" :key="item.id">
        {{ item.address }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PremisesRequestSelect",
  props: {
    value: {
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
    handleChangeModelValue(event) {
      const selectedValue = event.target.value;
      this.$emit("input", selectedValue);
      this.$emit("change", selectedValue);
    },
  },
  mounted() {
    this.$store.dispatch("premises/getAll");
  },
  watch: {
    value: {
      handler(newValue) {
        console.log(newValue, "newModelValue");
      },
      immediate: true,
    },
  },
};
</script>
