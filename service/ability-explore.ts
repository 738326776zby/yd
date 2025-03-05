import { del, get, patch, post } from './base'
import type {
  Collection,
} from '@/models/ability-explore'

export const fetchCollectionList = (app_id?: string | null) => {
  return get<Collection[]>('/workspaces/current/tool-providers')
}
