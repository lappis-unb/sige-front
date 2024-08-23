import MASTER from '../services/masterApi/http-common'

export const dimensions = [
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

export async function getGraph (filter) {
  const graphOptions = getGraphOptions(filter.dimension)
  const startDate = getDate(filter.startDate, true)
  const endDate = getDate(filter.endDate, false)
  const url = `/graph/instant/?transductor=${filter.transductor}&fields=${graphOptions.fields}&start_date=${startDate}&end_date=${endDate}`
  const graph = {
    unit: graphOptions.unit,
    dimension: filter.dimension,
    // Linechart options
    phase_a: [],
    phase_b: [],
    phase_c: [],

    timestamp: [],

    // Barchart options
    values: [],
    min: 0,
    max: 0,

    status: false,
    graphType: graphOptions.graphType,

    decimals: graphOptions.decimals
  }
  if (hasAllData(filter, graphOptions)) {
    switch (graphOptions.graphType) {
      case 'linechart':
        await MASTER
          .get(url)
          .then((res) => {
            const measurements = res.data
            graph.timestamp = formatTimestamp(measurements.timestamp)
            graph.phase_a = measurements.traces[0].values.reverse()
            graph.phase_b = measurements.traces[1].values.reverse()
            graph.phase_c = measurements.traces[2].values.reverse()
            graph.status = true
          })
          .catch((err) => {
            console.log('catch', err)
          })
        break

      case 'barchart':
        await MASTER
          .get(url)
          .then((res) => {
            graph.values = res.data[graphOptions.nameValue]
            graph.min = res.data.min
            graph.max = res.data.max
            graph.status = true
          })
          .catch((err) => {
            console.log('catch', err)
          })
        break

      default:
        break
    }
  }
  return graph
}

export function hasAllData (filter, options) {
  if (options.url &&
    filter.transductor &&
    filter.startDate &&
    filter.endDate) {
    return true
  } else {
    return false
  }
}

export function getDate (date, isStartDate) {
  if (date) {
    const dateParts = date.split('/')
    const res = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + 'T' + (isStartDate ? '00:00:00' : '23:59:00')

    return res
  } else {
    return undefined
  }
}

function formatTimestamp(timestampList){
  const timestamp = timestampList.map((t) => new Date(t).toString())

  return timestamp.reverse()
}

export function getGraphOptions (dimension) {
  switch (dimension) {
    case dimensions[0]: // Corrente
      return {
        url: 'minutely-threephase-current',
        unit: 'A',
        graphType: 'linechart',
        fields: 'current_a,current_b,current_c'
      }
    case dimensions[1]: // Custo
      return {
        url: 'cost-consumption',
        unit: 'R$',
        graphType: 'barchart',
        nameValue: 'cost',
        fields: ''
      }
    case dimensions[2]: // Consumo
      return {
        url: 'quarterly-total-consumption',
        unit: 'kWh',
        graphType: 'barchart',
        nameValue: 'consumption',
        fields: ''
      }
    case dimensions[3]: // DHT Corrente
      return {
        url: 'minutely-dht-current',
        unit: 'A',
        graphType: 'linechart',
        fields: 'dht_current_a,dht_current_b,dht_current_c'
      }
    case dimensions[4]: // DHT Tensão
      return {
        url: 'minutely-dht-voltage',
        unit: 'V',
        graphType: 'linechart',
        fields: 'dht_voltage_a,dht_voltage_b,dht_voltage_c'
      }
    case dimensions[5]: // Energia Captativa
      return {
        url: 'quarterly-total-capacitive-power',
        unit: 'kVArh',
        graphType: 'barchart',
        nameValue: 'capacitive_power',
        fields: ''
      }
    case dimensions[6]: // Energia Indutiva
      return {
        url: 'quarterly-total-inductive-power',
        unit: 'kVArh',
        graphType: 'barchart',
        nameValue: 'inductive_power',
        fields: ''
      }
    case dimensions[7]: // Fator de Potencia
      return {
        url: 'minutely-power-factor',
        unit: ' ', // Não possui unidade, é uma grandeza adimensional
        graphType: 'linechart',
        decimals: 2,
        fields: 'power_factor_a,power_factor_b,power_factor_c'
      }
    case dimensions[8]: // Geração
      return {
        url: 'quarterly-total-generation',
        unit: 'kWh',
        graphType: 'barchart',
        nameValue: 'generation',
        fields: ''
      }
    case dimensions[9]: // Potencia Aparente
      return {
        url: 'minutely-apparent-power',
        unit: 'kVA',
        graphType: 'linechart',
        fields: 'apparent_power_a,apparent_power_b,apparent_power_c'
      }
    case dimensions[10]: // Potencia Ativa
      return {
        url: 'minutely-active-power',
        unit: 'W',
        graphType: 'linechart',
        fields: 'active_power_a,active_power_b,active_power_c'
      }
    case dimensions[11]: // Potencia Reativa
      return {
        url: 'minutely-reactive-power',
        unit: 'kVAr',
        graphType: 'linechart',
        fields: 'reactive_power_a,reactive_power_b,reactive_power_c'
      }
    case dimensions[12]: // Tensão
      return {
        url: 'minutely-threephase-voltage',
        unit: 'V',
        graphType: 'linechart',
        fields: 'voltage_a,voltage_b,voltage_c'
      }
    default:
      return {
        url: '',
        unit: '',
        graphType: '',
        fields: ''
      }
  }
}
