import ScrollTable from './ScrollTable/index.vue'
import ScrollTableColumn from './ScrollTableColumn/index.vue'
import type { App } from 'vue'

const components = [ScrollTable, ScrollTableColumn]

const install = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name!, component)
  })
}

export * from './types'

export { ScrollTable, ScrollTableColumn }

export default { install }
