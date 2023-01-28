/**
 * 地图初始化参数
 */
export interface MapInitOption {
  /** 中心点使用经纬度坐标*/
  center?: Array<number>
  /** 地图级别 */
  zoom?: number
  /** 地图视图坐标系 */
  proj?: string
  /** 需要天地图底图 */
  requireTDTBaseLayer?: boolean
  /** 天地图类型 */
  tdtType?: '矢量' | '影像' | '地形'
  /** 天地图密钥 */
  tk: string
}
