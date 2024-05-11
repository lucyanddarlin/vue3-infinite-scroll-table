<template>
  <div
    ref="tableWrap"
    class="scroll-table-body-wrapper"
    :style="{
      color: tableCellFontColor,
      borderLeft: `1px solid ${tableCellBorderColor}`,
      borderBottom: ableScroll ? `1px solid ${tableCellBorderColor}` : 'none',
      borderTop: !showHeader ? `1px solid ${tableCellBorderColor}` : 'none',
    }"
  >
    <table
      ref="table"
      class="scroll-table-body"
      :style="{ backgroundColor: tableCellBgColor }"
      @mouseenter="handleHover"
      @mouseleave="handleLeave"
    >
      <colgroup>
        <col v-for="column in store" :key="column.id" :width="column.width" />
      </colgroup>
      <tbody>
        <tr
          v-for="(item, index) in tableData"
          :key="index"
          class="tr"
          :style="{ cursor: hoverStop ? 'pointer' : 'auto' }"
        >
          <td
            v-for="column in store"
            :key="column.id"
            colspan="1"
            rowspan="1"
            class="td"
            :style="{
              height:
                typeof cellHeight === 'string' ? cellHeight : `${cellHeight}px`,
              lineHeight:
                typeof cellHeight === 'string' ? `23px` : `${cellHeight - 1}px`,
              borderBottom: `1px solid ${tableCellBorderColor}`,
              borderRight: `1px solid ${tableCellBorderColor}`,
            }"
            @click="handleClick(item, column, $event)"
          >
            <div class="cell">
              {{ item[column.prop] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import {
  defaultBorderColor,
  defaultTableCellBgColor,
  defaultTableCellFontColor,
} from '../constant'
import useScroll from './useScroll'
import type { DefaultRow, StoreItem } from '../../types'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'ScrollTableBody',
  props: {
    /**
     * 列数据
     */
    store: {
      type: Array as PropType<StoreItem[]>,
      default: () => [],
    },
    /**
     * 用户传入的 data
     */
    data: {
      type: Array as PropType<DefaultRow[]>,
      default: () => [],
    },
    /**
     * 滚动间隔
     */
    interval: {
      type: Number,
      default: 2,
    },
    /**
     * 滚动过渡时间
     */
    transition: {
      type: Number,
      default: 1,
    },
    /**
     * hover 状态下是否停止滚动
     */
    hoverStop: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否显示头部
     */
    showHeader: {
      type: Boolean,
      default: true,
    },
    /**
     * 滚动个数
     */
    scrollCount: {
      type: Number,
      default: 1,
    },
    showCount: {
      type: Number,
      required: true,
    },
    /**
     * 单元格高度
     */
    cellHeight: {
      type: [Number, String] as PropType<string | number>,
      required: true,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const {
      store,
      data,
      interval,
      transition,
      hoverStop,
      scrollCount,
      showCount,
    } = toRefs(props)
    const table = ref<HTMLElement | null>(null)
    const tableWrap = ref<HTMLElement | null>(null)

    const tableCellFontColor = ref(defaultTableCellFontColor)
    const tableCellBgColor = ref(defaultTableCellBgColor)
    const tableCellBorderColor = ref(defaultBorderColor)

    const { tableData, ableScroll, pauseScroll, recoverScroll } = useScroll({
      store,
      data,
      tableWrap,
      table,
      interval,
      transition,
      scrollCount,
      showCount,
    })

    const handleHover = () => {
      if (hoverStop.value) {
        pauseScroll()
      }
    }
    const handleLeave = () => {
      if (hoverStop.value) {
        recoverScroll()
      }
    }
    const handleClick = (
      row: DefaultRow,
      column: StoreItem,
      event: MouseEvent
    ) => {
      emit('click', row, column, event)
    }
    const getItemIndex = (item: DefaultRow): number => {
      return data.value.indexOf(item)
    }

    return {
      table,
      tableWrap,
      tableData,
      ableScroll,
      handleHover,
      handleLeave,
      handleClick,
      getItemIndex,
      tableCellFontColor,
      tableCellBgColor,
      tableCellBorderColor,
    }
  },
})
</script>

<style lang="scss">
.scroll-table-body-wrapper {
  flex: 1;
  overflow: hidden;
  .scroll-table-body {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    .tr {
      /* TODO: hover 时的背景颜色 */
      /* &:hover {
        background-color: #f5f7fa;
      } */
      .td {
        text-align: center;
        word-wrap: break-word; /* 允许单词内换行 */
        overflow-wrap: break-word; /* 允许单词内换行 */
      }
    }
  }
}
</style>
