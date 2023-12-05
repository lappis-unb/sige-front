import { mount, createLocalVue } from '@vue/test-utils'
import LMap from 'vue2-leaflet'
import LMarker from 'vue2-leaflet'
import LIcon from 'vue2-leaflet'
import LTileLayer from 'vue2-leaflet'
import LPolyline from 'vue2-leaflet'
import MapComponent from './MapComponent.vue'

// Crie uma instância local do Vue para testes
const localVue = createLocalVue()
localVue.component('l-map', LMap)
localVue.component('l-marker', LMarker)
localVue.component('l-icon', LIcon)
localVue.component('l-tile-layer', LTileLayer)
localVue.component('l-line', LPolyline)

describe('MapComponent', () => {
  it('renderiza o componente', () => {
    const wrapper = mount(MapComponent, {
      localVue,
      propsData: {
        transductors: [],
        occurences: [],
        unifilarDiagram: [],
        currentCampus: {},
        selectedTransductor: {}
      }
    })

    // Verifica se o componente está renderizado
    expect(wrapper.exists()).toBe(true)
  })

  it('verifica se o mapa é renderizado corretamente', () => {
    const wrapper = mount(MapComponent, {
      localVue,
      propsData: {
        transductors: [],
        occurences: [],
        unifilarDiagram: [],
        currentCampus: {},
        selectedTransductor: {}
      }
    })

    // Verifica se o elemento do mapa está presente
    expect(wrapper.find('#region-map').exists()).toBe(true)
  })

  it('verifica se os marcadores são renderizados corretamente', () => {
    const wrapper = mount(MapComponent, {
      localVue,
      propsData: {
        transductors: [
          {
            id: 1,
            name: 'Transductor 1',
            geolocation_latitude: -15.7650,
            geolocation_longitude: -47.8665
          },
          {
            id: 2,
            name: 'Transductor 2',
            geolocation_latitude: -15.7651,
            geolocation_longitude: -47.8666
          }
        ],
        occurences: [],
        unifilarDiagram: [],
        currentCampus: {},
        selectedTransductor: {}
      }
    })

    // Verifica se os marcadores estão presentes
    const markers = wrapper.findAllComponents(LMarker)
    expect(markers.length).toBe(2)

    // Verifica se os ícones estão presentes
    const icons = wrapper.findAllComponents(LIcon)
    expect(icons.length).toBe(2)
  })

  it('verifica se as linhas são renderizadas corretamente', () => {
    const wrapper = mount(MapComponent, {
      localVue,
      propsData: {
        transductors: [],
        occurences: [],
        unifilarDiagram: [
          {
            id: 1,
            start_lat: -15.7650,
            start_lng: -47.8665,
            end_lat: -15.7651,
            end_lng: -47.8666
          },
          {
            id: 2,
            start_lat: -15.7652,
            start_lng: -47.8667,
            end_lat: -15.7653,
            end_lng: -47.8668
          }
        ],
        currentCampus: {},
        selectedTransductor: {}
      }
    })

    // Verifica se as linhas estão presentes
    const lines = wrapper.findAllComponents(LPolyline)
    expect(lines.length).toBe(2)
  })
})
