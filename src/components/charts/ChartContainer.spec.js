import { mount } from '@vue/test-utils';
import ChartContainer from './ChartContainer.vue'; 

describe('ChartContainer', () => {
  test('Renderiza corretamente com loadingStatus falso', () => {
    const wrapper = mount(ChartContainer, {
      propsData: {
        loadingStatus: false,
      },
      slots: {
        default: '<p>Conteúdo do slot</p>',
      },
    });

    // Verifica se o componente está renderizado corretamente
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.apex-container').exists()).toBe(true);
    expect(wrapper.find('.chart-sppiner').exists()).toBe(false); // Não deve mostrar o spinner
    expect(wrapper.find('p').text()).toBe('Conteúdo do slot'); // Verifica o conteúdo do slot
    expect(Number(wrapper.vm.cssProps['--opacity'])).toBe(1); // Verifica a propriedade de estilo como número
  });

  test('Renderiza corretamente com loadingStatus verdadeiro', () => {
    const wrapper = mount(ChartContainer, {
      propsData: {
        loadingStatus: true,
      },
    });

    // Verifica se o componente está renderizado corretamente
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.apex-container').exists()).toBe(true);
    expect(wrapper.find('.chart-sppiner').exists()).toBe(true); // Deve mostrar o spinner
    expect(Number(wrapper.vm.cssProps['--opacity'])).toBe(0.4); // Verifica a propriedade de estilo como número
  });
});

