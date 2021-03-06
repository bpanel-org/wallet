/*
 * bwallet entrypoint
 *
 */

import { MainContainer } from './containers';

import { PLUGIN_NAMESPACE, BASE_PATH } from './constants';

export { middleware } from './middleware';
import { reducers } from './reducers';

export const pluginReducers = {
  [PLUGIN_NAMESPACE]: reducers,
};

export const metadata = {
  name: 'bwallet',
  author: 'bcoin team',
  description: 'bitcoin wallet management tool',
  pathName: BASE_PATH,
  displayName: 'bWallet',
  sidebar: true,
  order: 0,
  icon: 'money',
  version: require('../package.json').version,
};

export const decoratePanel = (Panel, { React, PropTypes }) => {
  return class extends React.Component {
    static displayName() {
      return metadata.name;
    }

    static get propTypes() {
      return {
        customChildren: PropTypes.array,
      };
    }

    render() {
      const { customChildren = [] } = this.props;
      const pluginData = {
        metadata,
        Component: MainContainer,
      };

      return (
        <Panel
          {...this.props}
          customChildren={customChildren.concat(pluginData)}
        />
      );
    }
  };
};
