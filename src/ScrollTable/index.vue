<template>
  <div
    class="scroll-table"
    :style="{ height: height === null ? 'auto' : `${height}px` }"
  >
    <div class="hidden-columns">
      <slot />
    </div>
    <table-header
      v-if="showHeader"
      :store="store"
      :cell-height="headerCellHeight"
    />
    <table-body
      :store="store"
      :data="data"
      :interval="interval"
      :transition="transition"
      :hover-stop="hoverStop"
      :show-header="showHeader"
      :scroll-count="scrollCount"
      :cell-height="cellHeight"
      @click="handleClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue'
import { removeStoreItemKey, updateStoreItemKey } from '../symbols'
import useStore from './useStore'
import TableHeader from './table-header/index.vue'
import TableBody from './table-body/index.vue'
import type { DefaultRow, StoreItem } from '../types'
import type { PropType } from 'vue'

const props = defineProps({
  /**
   * 表格数据
   */
  data: {
    type: Array as PropType<DefaultRow[]>,
    default: () => [],
  },
  /**
   * table 高，默认不滚动
   */
  height: {
    type: Number,
    default: null,
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
  /**
   * 显示个数
   */
  showCount: {
    type: Number,
    default: 5,
  },
})

const emit = defineEmits(['click'])

const { store, removeStoreItem, updateStoreItem } = useStore()

provide(removeStoreItemKey, removeStoreItem)
provide(updateStoreItemKey, updateStoreItem)

// 根据表格高度设置单元格高度
const cellHeight = computed<string | number>(() => {
  if (
    typeof props.height === 'number' &&
    props.height &&
    typeof props.showCount === 'number' &&
    props.showCount
  ) {
    return Math.floor(props.height / (props.showCount + 1))
  } else {
    return 'auto'
  }
})

const headerCellHeight = computed<string | number>(() => {
  if (typeof cellHeight.value === 'string') {
    return 'auto'
  }
  return props.height - props.showCount * cellHeight.value
})

// TODO: remove
console.log(cellHeight.value, headerCellHeight.value)

const handleClick = (row: DefaultRow, column: StoreItem, event: MouseEvent) => {
  emit('click', row, column, event)
}
</script>

<style lang="scss">
.scroll-table {
  overflow: hidden;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  .hidden-columns {
    visibility: hidden;
    position: absolute;
    z-index: -1;
  }
}
</style>
