import '../../utils/test-utils';

import { shallow } from 'enzyme';
import React from 'react';

import { ErrorComponent } from './error-component';


describe('testing error component', (): void => {
  it('should display message: Ups! There was an error!', (): void => {
    expect.assertions(1);
    const message = 'Ups! There was an error!'
    const onClose = jest.fn();
    const component = shallow(<ErrorComponent message={message} onClose={onClose}/>);
    const messageContainer = component.find('.error-component--message');
    expect(messageContainer.text()).toBe(message);
  });
});
