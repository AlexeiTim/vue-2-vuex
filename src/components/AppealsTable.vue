<template>
  <table class="table" border>
    <thead>
      <tr>
        <th>Номер</th>
        <th>Создана</th>
        <th>Адрес</th>
        <th>Заявитель</th>
        <th>Описание</th>
        <th>Срок</th>
        <th>Статус</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="appeal in appeals" :key="appeal.id">
        <th>
          <button @click="$emit('select-appeal', appeal)">
            {{ appeal.number }}
          </button>
        </th>
        <th>
          {{ $moment(appeal.created_at).format("DD.MM.YYYY") }}
        </th>
        <th>{{ appeal?.premise?.address }} {{ appeal?.apartment?.label }}</th>
        <th>
          {{ appeal.applicant?.first_name }}
          {{ appeal.applicant?.last_name }}
          {{ appeal.applicant?.patronymic_name }}
        </th>
        <th>{{ appeal.description }}</th>
        <th>
          {{ $moment(appeal.due_date).format("DD.MM.YYYY HH:mm:ss") }}
        </th>
        <th>{{ appeal.status?.name }}</th>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "AppealsTable",
  props: {
    appeals: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["select-appeal"],
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
}
</style>
