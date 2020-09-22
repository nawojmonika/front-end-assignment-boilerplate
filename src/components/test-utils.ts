import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Setup enzyme only once when first import is invoked.
configure({ adapter: new Adapter() });

export const flushPromises = async (): Promise<NodeJS.Immediate> => {
  return new Promise(
    (resolve: () => void): NodeJS.Immediate => setImmediate(resolve),
  );
};
