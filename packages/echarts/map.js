import axios from 'axios'

export default {
  data () {
    return {
      geoCoordMap: {},
      url: './static/plugins/echarts/map/'
    }
  },
  methods: {
    map (area, callback) {
      if (area === 'world') {
        this._world(callback, area)
      } else if (area === 'china') {
        this._china(callback, area)
      } else if (Number(area)) {
        // 城市名全为数字.json格式，因此用作判断依据
        this._city(callback, area)
      } else {
        this._province(callback, area)
      }
    },
    _world (callback, area) {
      axios.get(this.url + area + '.json')
        .then(res => {
          echarts.registerMap(area, res.data)
          this._geoCoordMap(area)
          const option = {
            tooltip: {
              trigger: 'item'
            },
            geo: {
              map: area,
              label: {
                emphasis: {
                  show: true
                }
              },
              roam: true
            },
            visualMap: {
              show: false,
              type: 'continuous',
              left: 'left',
              top: 'bottom',
              text: ['高', '低'],
              calculable: true,
              inRange: {
                color: ['#FFFFFF', '#0099FF']
              }
            }
          }
          const series = {
            type: 'map',
            mapType: area,
            roam: true,
            geoIndex: 0
          }
          callback(option, series)
        })
        .catch(res => {
          console.log(res)
        })
    },
    _china (callback, area) {
      axios.get(this.url + area + '.json')
        .then(res => {
          echarts.registerMap(area, res.data)
          this._geoCoordMap(area)
          const option = {
            tooltip: {
              trigger: 'item'
            },
            visualMap: {
              show: false,
              type: 'continuous',
              left: 'left',
              top: 'bottom',
              text: ['高', '低'],
              calculable: true,
              inRange: {
                color: ['#FFFFFF', '#0099FF']
              }
            }
          }
          // series可能有多维数据，只需将默认的合并到地图一列即可
          const series = {
            type: 'map',
            mapType: area,
            roam: true,
            label: {
              normal: {
                show: true // 地图名称
              }
            }
          }
          callback(option, series)
        })
        .catch(res => {
          console.log(res)
        })
    },
    _province (callback, areaCode) {
      axios.get(`${this.url}province/${areaCode}.json`)
        .then(res => {
          echarts.registerMap(areaCode, res.data)
          this._geoCoordMap(areaCode)
          const option = {
            tooltip: {
              trigger: 'item'
            },
            geo: {
              map: areaCode,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              roam: true
            },
            visualMap: {
              show: false,
              type: 'continuous',
              left: 'left',
              top: 'bottom',
              text: ['高', '低'],
              calculable: true,
              inRange: {
                color: ['#FFFFFF', '#0099FF']
              }
            }
          }
          const series = {
            type: 'map',
            mapType: areaCode,
            roam: true,
            geoIndex: 0,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            }
          }
          callback(option, series)
        })
        .catch(res => {
          console.log(res)
        })
    },
    _city (callback, areaCode) {
      axios.get(`${this.url}city/${areaCode}.json`)
        .then(res => {
          echarts.registerMap(areaCode, res.data)
          this._geoCoordMap(areaCode)
          const option = {
            tooltip: {
              trigger: 'item'
            },
            geo: {
              map: areaCode,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              roam: true
            },
            visualMap: {
              show: false,
              type: 'continuous',
              left: 'left',
              top: 'bottom',
              text: ['高', '低'],
              calculable: true,
              inRange: {
                color: ['#FFFFFF', '#0099FF']
              }
            }
          }
          const series = {
            type: 'map',
            mapType: areaCode,
            roam: true,
            geoIndex: 0,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            }
          }
          callback(option, series)
        })
        .catch(res => {
          console.log(res)
        })
    },
    _geoCoordMap (mapName) {
      // 返回地图经纬度，为地图上其它散点图提供坐标
      console.log('_geoCoordMap')
      let geoMap = {}
      const mapFeatures = echarts.getMap(mapName).geoJson.features
      mapFeatures.forEach(function (v) {
        // 地区名称
        const name = v.properties.name
        // 地区经纬度
        geoMap[name] = v.properties.cp
      })
      console.log(geoMap)
      this.geoCoordMap = geoMap
    }
  }
}
