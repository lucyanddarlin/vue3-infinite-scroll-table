<template>
  <div
    class="scroll-table-header-wrapper"
    :style="{ color: tableHeaderCellFontColor }"
  >
    <table
      class="scroll-table-header"
      :style="{
        ...headerStyle,
        borderLeft: `1px solid ${
          headerStyle.borderColor || tableHeaderCellBorderColor
        }`,
        borderRight: `1px solid ${
          headerStyle.borderColor || tableHeaderCellBorderColor
        }`,
      }"
    >
      <colgroup>
        <col v-for="column in store" :key="column.id" :width="column.width" />
      </colgroup>
      <thead>
        <tr class="tr">
          <th
            v-for="column in store"
            :key="column.id"
            colspan="1"
            rowspan="1"
            class="th"
            :style="{
              height:
                typeof cellHeight === 'string' ? cellHeight : `${cellHeight}px`,
              borderLeft: `1px solid ${
                headerStyle.borderColor || tableHeaderCellBorderColor
              }`,
              borderRight: `1px solid ${
                headerStyle.borderColor || tableHeaderCellBorderColor
              }`,
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

<script lang="ts" setup>
import { ref } from 'vue'
import {
  defaultBorderColor,
  defaultTableHeaderCellFontColor,
} from '../constant'
import type { CSSProperties, PropType } from 'vue'
import type { StoreItem } from '../../types'

defineProps({
  store: {
    type: Array as PropType<StoreItem[]>,
    default: () => [],
  },
  cellHeight: {
    type: [Number, String] as PropType<number | string>,
    required: true,
  },
  headerStyle: {
    type: Object as PropType<CSSProperties>,
    required: true,
  },
})

const tableHeaderCellFontColor = ref(defaultTableHeaderCellFontColor)
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
        .cell {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
