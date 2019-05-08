import axios from 'axios'

export default {
  data () {
    return {
      url: './static/plugins/echarts/map/'
    }
  },
  methods: {
    map (area, callback) {
      if (area === 'world') {
        this._world(callback)
      } else if (area === 'china') {
        this._china(callback)
      } else if (Number(area)) {
        // 城市名全为数字.json格式，因此用作判断依据
        this._city(callback, area)
      } else {
        this._province(callback, area)
      }
    },
    _world (callback) {
      axios.get(this.url + 'world.json')
        .then(res => {
          echarts.registerMap('world', res.data)
          const option = {
            tooltip: {
              trigger: 'item'
            },
            dataRange: {
              show: false,
              calculable: true,
              color: ['orangered', 'yellow', 'lightskyblue']
            },
            geo: {
              map: 'world',
              label: {
                emphasis: {
                  show: false
                }
              },
              roam: false,
              silent: true,
              itemStyle: {
                normal: {
                  areaColor: '#37376e',
                  borderColor: '#000'
                },
                emphasis: {
                  areaColor: '#2a333d'
                }
              }
            },
            series: [
              {
                type: 'map',
                mapType: 'world'
              }
            ]
          }
          callback(option)
        })
        .catch(res => {
          console.log(res)
        })
    },
    _china (callback) {
      axios.get(this.url + 'china.json')
        .then(res => {
          echarts.registerMap('china', res.data)
          const option = {
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                type: 'map',
                mapType: 'china',
                roam: true,
                label: {
                  normal: {
                    show: true // 省份名称
                  },
                  emphasis: {
                    show: false
                  }
                }
              }
            ]
          }
          callback(option)
        })
        .catch(res => {
          console.log(res)
        })
    },
    _province (callback, areaCode) {
      axios.get(`${this.url}province/${areaCode}.json`)
        .then(res => {
          echarts.registerMap(areaCode, res.data)
          const option = {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (params.name) {
                  return params.name + ' : ' + params.value || ''
                }
              }
            },
            visualMap: {
              type: 'continuous',
              show: false,
              calculable: true,
              // seriesIndex: [1],
              inRange: {
                color: ['#FFFFFF', '#0099FF']
              }
            },
            geo: {
              map: areaCode,
              roam: false
            },
            series: [
              {
                type: 'map',
                mapType: areaCode,
                roam: true,
                label: {
                  normal: {
                    show: true,
                    position: 'inside',
                    textStyle: {
                      color: '#000000'
                    }
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    borderColor: 'transparent'
                  }
                }
              }
            ]
          }
          callback(option)
        })
        .catch(res => {
          console.log(res)
        })
    },
    _city (callback, areaCode) {
      axios.get(`${this.url}city/${areaCode}.json`)
        .then(res => {
          echarts.registerMap(areaCode, res.data)
          const option = {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (params.name) {
                  return params.name + ' : ' + params.value || ''
                }
              }
            },
            visualMap: {
              type: 'continuous',
              show: false,
              calculable: true,
              // seriesIndex: [1],
              inRange: {
                color: ['#FFFFFF', '#0099FF']
              }
            },
            geo: {
              map: areaCode,
              roam: false
            },
            series: [
              {
                type: 'map',
                mapType: areaCode,
                roam: true,
                label: {
                  normal: {
                    show: true,
                    position: 'inside',
                    textStyle: {
                      color: '#000000'
                    }
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    borderColor: 'transparent'
                  }
                }
              }
            ]
          }
          callback(option)
        })
        .catch(res => {
          console.log(res)
        })
    }
  }
}
