import { getWidth, getTopLeft } from 'ol/extent'
import WMTS from 'ol/tilegrid/WMTS'
import { WMTS as WMTSSource } from 'ol/source'
import TileLayer from 'ol/layer/Tile'
import { get as getProjection, getTransform } from 'ol/proj'
import { applyTransform } from 'ol/extent'
import Map from 'ol/Map'
import BaseLayer from 'ol/layer/Base'
/**
 * @type 天地图投影类型
 */
type TDT_PROJ = '经纬度投影' | '球面墨卡托投影'
/**
 * 天地图类型
 */
type TDT_TYPE =
  | '全球境界'
  | '地形注记'
  | '地形晕渲'
  | '影像注记'
  | '影像底图'
  | '矢量注记'
  | '矢量底图'

/**
 *
 * @param {TDT_TYPE} type 天地图图层类型
 * @param {TDT_PROJ} proj 天地图投影类型
 * @param {string} key 天地图访问密钥
 * @returns
 */
export const createTDTLayer = (type: TDT_TYPE, proj: TDT_PROJ, key: string) => {
  const layers = {
    全球境界: 'ibo',
    地形注记: 'cta',
    地形晕渲: 'ter',
    影像注记: 'cia',
    影像底图: 'img',
    矢量注记: 'cva',
    矢量底图: 'vec'
  }
  const projs = {
    经纬度投影: 'EPSG:4490',
    球面墨卡托投影: 'EPSG:900913'
  }
  const matrixSets = {
    经纬度投影: 'c',
    球面墨卡托投影: 'w'
  }
  const projection = getProjection(projs[proj])!
  const projectionExtent = projection.getExtent()
  const origin = projectionExtent ? getTopLeft(projectionExtent) : [-180, 90]
  const fromLonLat = getTransform('EPSG:4326', projection)
  const width = projectionExtent
    ? getWidth(projectionExtent)
    : getWidth(applyTransform([-180.0, -90.0, 180.0, 90.0], fromLonLat))
  const resolutions = []
  const matrixIds = []
  for (let z = 1; z < 19; z++) {
    resolutions[z] = width / (256 * Math.pow(2, z))
    matrixIds[z] = z.toString()
  }
  const wmtsTileGrid = new WMTS({
    origin: origin,
    resolutions: resolutions,
    matrixIds: matrixIds
  })
  const wmtsSource = new WMTSSource({
    url:
      'http://t{0-7}.tianditu.gov.cn/' +
      layers[type] +
      '_' +
      matrixSets[proj] +
      '/wmts?tk=' +
      key,
    layer: layers[type],
    version: '1.0.0',
    matrixSet: matrixSets[proj],
    format: 'tiles',
    projection: projection,
    requestEncoding: 'KVP',
    style: 'default',
    tileGrid: wmtsTileGrid
  })
  const wmtsLayer = new TileLayer({
    source: wmtsSource
  })
  wmtsLayer.set('id', layers[type])
  return wmtsLayer
}

/**
 * 根据id获取对应图层
 * @param {Map} map map实例对象
 * @param {string} id 图层id
 * @returns {Layer | undefined}  获取的图层对象
 */
export const findLayerById = (map: Map, id: string): BaseLayer | undefined => {
  const layers = map.getLayers()
  let layer
  layers.forEach((item) => {
    if (item.get('id') === id) {
      layer = item
    }
  })
  return layer
}
