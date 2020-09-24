import '../test-utils';

import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import React from 'react';

import { AppComponent } from './app-component';

describe('testing app component', (): void => {
  afterEach((): void => {
    fetchMock.restore();
  });

  it('should have prediction button disabled at first', (): void => {
    expect.assertions(1);
    const component = shallow(<AppComponent/>);
    const predictButton = component.find('.app-component--predict-button');
    expect(predictButton.prop('disabled')).toBe(true);
  });
});
