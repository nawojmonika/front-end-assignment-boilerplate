import { mount } from 'enzyme';
import fetchMock from 'fetch-mock'
import React from 'react';
import { act } from 'react-dom/test-utils';

import { flushPromises } from '../test-utils';
import { GalleryComponent } from './gallery-component';

describe('testing gallery component', (): void => {
  afterEach((): void => {
    fetchMock.restore();
  });
  it('should have gallery with 9 dog photos', async (): Promise<void> => {
    expect.assertions(1);
    await act(async (): Promise<void> => {
      fetchMock.getOnce("https://dog.ceo/api/breed/husky/images/random/9", {
        message: [
          "husky",
          "husky",
          "husky",
          "husky",
          "husky",
          "husky",
          "husky",
          "husky",
          "husky"
        ]
      });
      fetchMock.getOnce("https://dog.ceo/api/breed/cairn/images/random/9", {
        message: [
          "cairn",
          "cairn",
          "cairn",
          "cairn",
          "cairn",
          "cairn",
          "cairn",
          "cairn",
          "cairn"
        ]
      });
      const component = mount(<GalleryComponent breedName={'husky'}/>);
      component.setProps({breedName: 'cairn'});
      await flushPromises();
      component.update();
      expect(component.find('picture')).toHaveLength(9);
    })
  });

  it('should shouw error message when API is down', async (): Promise<void> => {
    expect.assertions(1);
    await act(async (): Promise<void> => {
      fetchMock.getOnce("https://dog.ceo/api/breed/husky/images/random/9",500);
      fetchMock.getOnce("https://dog.ceo/api/breed/cairn/images/random/9",500);
      const component = mount(<GalleryComponent breedName={'husky'}/>);
      component.setProps({breedName: 'cairn'});
      await flushPromises();
      component.update();
      expect(component.exists('.error-component')).toBe(true);
    })
  });

});
