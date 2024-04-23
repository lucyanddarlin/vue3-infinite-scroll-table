<template>
  <div class="scroll-table-header-wrapper" :style="{color: tableHeaderCellFontColor}">
    <table
      class="scroll-table-header"
      :style="{
        backgroundColor: tableHeaderCellBgColor,
        borderLeft: `1px solid ${tableHeaderCellBorderColor}`,
        borderRight: `1px solid ${tableHeaderCellBorderColor}`,
        }"
      >
      <colgroup>
        <col
          v-for="column in store"
          :key="column.id"
          :width="column.width"
        >
      </colgroup>
      <thead>
        <tr class="tr">
          <th
            v-for="(column) in store"
            :key="column.id"
            colspan="1"
            rowspan="1"
            class="th"
            :style="{
              borderLeft: `1px solid ${tableHeaderCellBorderColor}`,
              borderRight: `1px solid ${tableHeaderCellBorderColor}`,
            }"
          >
            <div class="cell">
                {{ column.label }}
            </div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script lang='ts' setup>
import {  PropType, ref } from 'vue';
import { StoreItem } from '../../types';
import { defaultBorderColor, defaultTableHeaderCellBgColor, defaultTableHeaderCellFontColor } from '../constant';

defineProps({
  store: {
    type: Array as PropType<StoreItem[]>,
    default: () => []
  }
});

const tableHeaderCellFontColor = ref(defaultTableHeaderCellFontColor)
const tableHeaderCellBgColor = ref(defaultTableHeaderCellBgColor)
const tableHeaderCellBorderColor = ref(defaultBorderColor)
</script>

<style lang="scss">
.scroll-table-header-wrapper {
  .scroll-table-header {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    /* border-left: 1px solid pink;
    border-top: 1px solid pink; */
    /* background-color: #fff; */
    .tr {
      .th {
        text-align: center;
        /* border-bottom: 1px solid blue;
        border-right: 1px solid blue; */
        font-weight: 400;
        padding: 12px 0;
        .cell {
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
