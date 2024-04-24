import type { InjectionKey } from 'vue'
import type { RemoveStoreItem, UpdateStoreItem } from './types'

export const updateStoreItemKey: InjectionKey<UpdateStoreItem> = Symbol()

export const removeStoreItemKey: InjectionKey<RemoveStoreItem> = Symbol()
