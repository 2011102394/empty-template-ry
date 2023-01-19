import http from '@/api'
import { Bzp } from './bzpInterface'

/**
 *
 * @returns
 */
export async function queryBzpList() {
  return http.get<Array<Bzp>>('/api/bzp/list')
}
