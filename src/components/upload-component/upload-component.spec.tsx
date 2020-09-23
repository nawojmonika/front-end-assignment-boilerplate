import 'isomorphic-form-data';

import { flushPromises } from '../test-utils';
import { mount, shallow } from 'enzyme';
import fetchMock from 'fetch-mock'
import React from 'react';

import { UploadComponent } from './upload-component';
import { act } from 'react-dom/test-utils';

describe('testing upload component', (): void => {
  afterEach(() => {
    fetchMock.restore();
  })
  it('isLoading should be called 2 times',  async (): Promise<void> => {
    expect.assertions(1);
    const setImageSource = jest.fn();
    const setLoading = jest.fn();
    fetchMock.postOnce('http://localhost:3000/upload-image', {
      data: {
        url: 'mockUrl'
      }
    });
    const component = shallow(<UploadComponent setImageSrc={setImageSource} setLoading={setLoading}/>);
    component.find('input').simulate('change', {
      target: {
        files: [
          'dummy'
        ]
      }
    });
    await flushPromises() ;
    expect(setLoading).toHaveBeenCalledTimes(2);
  })
  it('isLoading should be changed to true at first and then to false value',  async (): Promise<void> => {
    expect.assertions(2);
    const setImageSource = jest.fn();
    const setLoading = jest.fn();
    fetchMock.postOnce('http://localhost:3000/upload-image', {
      data: {
        url: 'mockUrl'
      }
    });
    const component = shallow(<UploadComponent setImageSrc={setImageSource} setLoading={setLoading}/>);
    component.find('input').simulate('change', {
      target: {
        files: [
          'dummy'
        ]
      }
    });
    await flushPromises() ;
    expect(setLoading.mock.calls[0][0]).toBe(true);
    expect(setLoading.mock.calls[1][0]).toBe(false);
  });

  it('setImageSource should be called with url returned from API',  async (): Promise<void> => {
    expect.assertions(1);
    const setImageSource = jest.fn();
    const setLoading = jest.fn();
    fetchMock.postOnce('http://localhost:3000/upload-image', {
      data: {
        url: 'mockUrl'
      }
    });
    const component = shallow(<UploadComponent setImageSrc={setImageSource} setLoading={setLoading}/>);
    component.find('input').simulate('change', {
      target: {
        files: [
          'dummy'
        ]
      }
    });
    await flushPromises() ;
    expect(setImageSource.mock.calls[0][0]).toBe('mockUrl');
  });

  it('should show error component when API fails', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      expect.assertions(1);
      const setImageSource = jest.fn();
      const setLoading = jest.fn();
      fetchMock.post('http://localhost:3000/upload-image', 500);
      const component = mount(<UploadComponent setImageSrc={setImageSource} setLoading={setLoading}/>);
      component.find('input').simulate('change', {
        target: {
          files: [
            'dummy'
          ]
        }
      });
      await flushPromises();
      component.update();
      expect(component.exists('.error-component')).toStrictEqual(true);
    })
    });
});
