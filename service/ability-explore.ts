import { del, get, patch, post } from './base'
import type {
  Collection,
} from '@/models/ability-explore'


export const fetchHyydCollectionList = () => {
  return get<Collection[]>('/hyyd/data-providers')
}
export const fetchThirdPartyToolsList = () => { 
  return get<Collection[]>('/hyyd/other-tools-providers')
}