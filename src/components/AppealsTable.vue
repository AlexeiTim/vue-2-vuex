<template>
  <div>
    <table v-if="appeals.length" class="table" border>
      <thead class="table__head">
        <tr>
          <th style="width: 100px">
            <div class="table__head-cell">
              <span>№</span>
              <ArrowTopIcon />
            </div>
          </th>
          <th style="width: 150px">
            <div class="table__head-cell">
              <span>Создана</span>
              <ArrowTopIcon />
            </div>
          </th>
          <th style="width: 200px">Адрес</th>
          <th style="width: 200px">Заявитель</th>
          <th style="max-width: 260px">Описание</th>
          <th style="width: 150px">Срок</th>
          <th style="width: 150px">
            <div class="table__head-cell">
              <span>Статус</span>
              <ArrowTopIcon />
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr v-for="appeal in appeals" :key="appeal.id">
          <th style="padding-left: 4px; width: 100px">
            <BaseButton size="small" @click="$emit('select-appeal', appeal)">
              {{ appeal.number }}
            </BaseButton>
          </th>
          <th style="width: 150px">
            {{ $moment(appeal.created_at).format("DD.MM.YYYY") }}
          </th>
          <th style="width: 200px">
            {{ appeal?.premise?.address }} {{ appeal?.apartment?.label }}
          </th>
          <th style="width: 200px">
            {{ appeal.applicant?.first_name }}
            {{ appeal.applicant?.last_name }}
            {{ appeal.applicant?.patronymic_name }}
          </th>
          <th style="max-width: 260px">{{ appeal.description }}</th>
          <th style="width: 150px">
            {{
              appeal.due_date
                ? $moment(appeal.due_date).format("DD.MM.YYYY HH:mm:ss")
                : "Неизвестно"
            }}
          </th>
          <th style="width: 150px">{{ appeal.status?.name }}</th>
        </tr>
      </tbody>
    </table>
    <div>Пусто</div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import ArrowTopIcon from "./icons/ArrowTopIcon.vue";

export default {
  name: "AppealsTable",
  components: {
    BaseButton,
    ArrowTopIcon,
  },
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
.table {
  width: 100%;
  font-weight: 400;
  border-collapse: collapse;
  * {
    text-align: start;
  }
  th,
  td {
    border: none;
  }

  &__head th {
    font-weight: 400;
    line-height: 20px;
    padding: 12px 0 12px 8px;
    color: green;
    border-top: none;
    border-bottom: none;
    box-shadow: 0 1px 0 0 $secondary-color-400;
  }

  &__head-cell {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  tr {
    border: none;
    box-shadow: 0 1px 0 0 $secondary-color-400;
  }

  &__body {
    th {
      padding: 8px 0px 8px 12px;
      color: $main-text-color;
      font-weight: 400;
      line-height: 20px;
      white-space: nowrap;
      text-wrap: wrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 260px;
    }
    tr:last-child {
      box-shadow: none;
    }
  }
}
</style>
