import { MapInitOption } from '../types'
import Map from 'ol/Map'
import View from 'ol/View'
import { fromLonLat } from 'ol/proj'
import { defaults as defaultsControl } from 'ol/control'
import { defaults as defaultInteractions } from 'ol/interaction'
import { register } from 'ol/proj/proj4'
import proj4 from 'proj4'
import {
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_DEFAULT_PROJ,
  EPSG_4490_WKT
} from '../config'
import { createTDTLayer } from './layerUtil'

/**
 * 地图初始化
 * @param {HTMLElement | undefined} target 地图容器对象
 * @param {MapInitOption} options 初始化参数
 * @returns {Map} Map实例
 */
export const mapInit = (
  target: HTMLElement | undefined,
  options: MapInitOption
) => {
  const { center, zoom, requireTDTBaseLayer, tdtType, tk } = options
  let { proj } = options
  if (requireTDTBaseLayer && !proj) {
    proj4.defs('EPSG:4490', EPSG_4490_WKT)
    register(proj4)
    proj = 'EPSG:4490'
  }
  let coordinate
  if (!proj) {
    // 默认使用EPSG:4326
    coordinate = center ? center : MAP_DEFAULT_CENTER
  } else {
    coordinate = center
      ? fromLonLat(center, proj)
      : fromLonLat(MAP_DEFAULT_CENTER, proj)
  }
  const map = new Map({
    target: target,
    view: new View({
      center: coordinate,
      zoom: zoom ? zoom : MAP_DEFAULT_ZOOM,
      projection: proj ? proj : MAP_DEFAULT_PROJ
    }),
    controls: defaultsControl({
      zoom: false
    }),
    interactions: defaultInteractions({
      pinchRotate: false // 移动端禁止地图旋转
    })
  })
  if (requireTDTBaseLayer) {
    addTDTLayer(map, proj!, tdtType, tk)
  }
  return map
}

const addTDTLayer = (
  map: Map,
  proj: string,
  tdtType: MapInitOption['tdtType'],
  tk: string
) => {
  let baseLayer
  let labelLayer
  switch (tdtType) {
    case '矢量':
      if (proj === 'EPSG:3857') {
        baseLayer = createTDTLayer('矢量底图', '球面墨卡托投影', tk)
        labelLayer = createTDTLayer('矢量注记', '球面墨卡托投影', tk)
      } else {
        baseLayer = createTDTLayer('矢量底图', '经纬度投影', tk)
        labelLayer = createTDTLayer('矢量注记', '经纬度投影', tk)
      }
      break
    case '影像':
      if (proj === 'EPSG:3857') {
        baseLayer = createTDTLayer('影像底图', '球面墨卡托投影', tk)
        labelLayer = createTDTLayer('影像注记', '球面墨卡托投影', tk)
      } else {
        baseLayer = createTDTLayer('影像底图', '经纬度投影', tk)
        labelLayer = createTDTLayer('影像注记', '经纬度投影', tk)
      }
      break
    case '地形':
      if (proj === 'EPSG:3857') {
        baseLayer = createTDTLayer('地形晕渲', '球面墨卡托投影', tk)
        labelLayer = createTDTLayer('地形注记', '球面墨卡托投影', tk)
      } else {
        baseLayer = createTDTLayer('地形晕渲', '经纬度投影', tk)
        labelLayer = createTDTLayer('地形注记', '经纬度投影', tk)
      }
      break
    default:
      return
  }
  let iboLayer
  if (proj === 'EPSG:3857') {
    iboLayer = createTDTLayer('全球境界', '球面墨卡托投影', tk)
  } else {
    iboLayer = createTDTLayer('全球境界', '经纬度投影', tk)
  }
  map.addLayer(baseLayer)
  map.addLayer(labelLayer)
  map.addLayer(iboLayer)
}
