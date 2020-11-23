import MASTER from '../services/masterApi/http-common'

export class TransductorGraphControl {
  constructor () {
    this.dimensions = [
      'Corrente',
      'Custo',
      'Consumo',
      'DHT Corrente',
      'DHT Tensão',
      'Energia Captativa',
      'Energia Indutiva',
      'Fator de Potência',
      'Geração',
      'Potência Aparente',
      'Potência Ativa',
      'Potência Reativa',
      'Tensão'
    ]
  }

  async getGraph (filter) {
    const graphOptions = await this.getGraphOptions(filter.dimension)
    const startDate = await this.getDate(filter.startDate)
    const endDate = await this.getDate(filter.endDate)
    const type = graphOptions.url === 'cost-consumption' ? 'daily' : 'hourly'
    const url = `/graph/${graphOptions.url}/?id=${filter.transductor}&start_date=${startDate}&end_date=${endDate}&type=${type}`
    const graph = {
      unit: graphOptions.unit,
      dimension: filter.dimension,
      // Linechart options
      phase_a: [],
      phase_b: [],
      phase_c: [],

      // Barchart options
      values: [],
      min: 0,
      max: 0,

      status: false,
      graphType: graphOptions.graphType
    }

    if (this.hasAllData(filter, graphOptions)) {
      switch (graphOptions.graphType) {
        case 'linechart':
          await MASTER
            .get(url)
            .then((response) => {
              const [measurements] = response.data
              graph.phase_a = measurements.phase_a
              graph.phase_b = measurements.phase_b
              graph.phase_c = measurements.phase_c
              graph.status = true
            })
            .catch((error) => {
              console.log('catch', error)
            })
          break

        case 'barchart':
          await MASTER
            .get(url)
            .then((response) => {
              graph.values = response.data[graphOptions.nameValue]
              graph.min = response.data.min
              graph.max = response.data.max
              graph.status = true
            })
            .catch((error) => {
              console.log('catch', error)
            })
          break

        default:
          break
      }
    }

    return graph
  }

  hasAllData (filter, options) {
    if (options.url !== '' &&
      filter.transductor &&
      filter.startDate &&
      filter.endDate) {
      return true
    } else {
      return false
    }
  }

  getDate (date) {
    if (date !== '' && date !== undefined) {
      const [day, month, year] = date.split('/')

      return year + '-' + month + '-' + day + ' ' + '00:00:00'
    } else {
      return undefined
    }
  }

  getGraphOptions (dimension) {
    switch (dimension) {
      case this.dimensions[0]: // Corrente
        return {
          url: 'minutely-threephase-current',
          unit: 'A',
          graphType: 'linechart'
        }
      case this.dimensions[1]: // Custo
        return {
          url: 'cost-consumption',
          unit: 'R$',
          graphType: 'barchart',
          nameValue: 'cost'
        }
      case this.dimensions[2]: // Consumo
        return {
          url: 'quarterly-total-consumption',
          unit: 'kWh',
          graphType: 'barchart',
          nameValue: 'consumption'
        }
      case this.dimensions[3]: // DHT Corrente
        return {
          url: 'minutely-dht-current',
          unit: 'A',
          graphType: 'linechart'
        }
      case this.dimensions[4]: // DHT Tensão
        return {
          url: 'minutely-dht-voltage',
          unit: 'V',
          graphType: 'linechart'
        }
      case this.dimensions[5]: // Energia Captativa
        return {
          url: 'quarterly-total-capacitive-power',
          unit: 'kVArh',
          graphType: 'barchart',
          nameValue: 'capacitive_power'
        }
      case this.dimensions[6]: // Energia Indutiva
        return {
          url: 'quarterly-total-inductive-power',
          unit: 'kVArh',
          graphType: 'barchart',
          nameValue: 'inductive_power'
        }
      case this.dimensions[7]: // Fator de Potencia
        return {
          url: 'minutely-power-factor',
          unit: ' ', // Não possui unidade, é uma grandeza adimensional
          graphType: 'linechart'
        }
      case this.dimensions[8]: // Geração
        return {
          url: 'quarterly-total-generation',
          unit: 'kWh',
          graphType: 'barchart',
          nameValue: 'generation'
        }
      case this.dimensions[9]: // Potencia Aparente
        return {
          url: 'minutely-apparent-power',
          unit: 'kVA',
          graphType: 'linechart'
        }
      case this.dimensions[10]: // Potencia Ativa
        return {
          url: 'minutely-active-power',
          unit: 'W',
          graphType: 'linechart'
        }
      case this.dimensions[11]: // Potencia Reativa
        return {
          url: 'minutely-reactive-power',
          unit: 'kVAr',
          graphType: 'linechart'
        }
      case this.dimensions[12]: // Tensão
        return {
          url: 'minutely-threephase-voltage',
          unit: 'V',
          graphType: 'linechart'
        }
      default:
        return {
          url: '',
          unit: '',
          graphType: ''
        }
    }
  }
}
