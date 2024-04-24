<script lang="ts">
import {
  defineComponent,
  h,
  inject,
  onMounted,
  onUnmounted,
  toRefs,
  watch,
} from 'vue'
import uniqueId from 'lodash-es/uniqueId'
import { removeStoreItemKey, updateStoreItemKey } from '../symbols'

export default defineComponent({
  name: 'ScrollTableColumn',
  props: {
    /**
     * 列名称
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * 对应列内容的字段名
     */
    prop: {
      type: String,
      required: true,
    },
    /**
     * 列宽
     */
    width: {
      type: [String, Number],
      default: null,
    },
  },
  setup(props) {
    const { label, prop, width } = toRefs(props)
    const id = uniqueId()
    const updateStoreItem = inject(updateStoreItemKey)
    const removeStoreItem = inject(removeStoreItemKey)

    const getStoreItem = () => ({
      id,
      label: label.value,
      prop: prop.value,
      width: width.value,
    })

    watch([label, prop, width], () => {
      updateStoreItem?.(getStoreItem())
    })

    onMounted(() => {
      updateStoreItem?.(getStoreItem())
    })

    onUnmounted(() => {
      removeStoreItem?.(id)
    })
  },
  render() {
    return h('div')
  },
})
</script>

<style lang="scss"></style>
