import { mount } from '@vue/test-utils';
import Spinner from './Spinner.vue';

// Props padrão para o componente Spinner
const spinnerProps = {
  size: 'regular',
  color: '#00417e',
};

const SpinnerComponent = mount(Spinner, {
  propsData: spinnerProps,
});

describe('Spinner', () => {

  // Testa se o componente está renderizado
  test('Componente está renderizado', () => {
    expect(SpinnerComponent.exists()).toBe(true);
  });

  // Testa se o Spinner tem o tamanho e a cor corretos
  test('Spinner tem tamanho e cor corretos', () => {
    const spinnerElement = SpinnerComponent.find('.lds-ripple');
    expect(spinnerElement.exists()).toBe(true);
    expect(spinnerElement.attributes('style')).toContain(`--size: 1;`);
    expect(spinnerElement.attributes('style')).toContain(`--color: #00417e;`);
  });


  test('Spinner tem dois elementos div filhos', () => {
    const childDivs = SpinnerComponent.findAll('.lds-ripple div');
    expect(childDivs.length).toBe(2);
  });

  test('cssVars retorna valores corretos', () => {
    const sizeMap = {
      small: 0.5,
      regular: 1,
      big: 2.5,
    };
    const expectedCssVars = {
      '--size': sizeMap[spinnerProps.size],
      '--color': spinnerProps.color,
    };
    expect(SpinnerComponent.vm.cssVars).toEqual(expectedCssVars);
  });


















});

