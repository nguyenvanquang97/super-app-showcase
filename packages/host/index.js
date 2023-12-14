
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { ScriptManager, Script, Federated } from '@callstack/repack/client';
import { Platform } from 'react-native';
import App from './src/App';

ScriptManager.shared.addResolver(async (scriptId, caller) => {

const containers = {
  catalog:'http://10.0.2.2:3000/[name][ext]',
  shopping:'http://10.0.2.2:9003/[name][ext]',
  auth:'http://10.0.2.2:9003/[name][ext]',
  dashboard:'http://10.0.2.2:9002/[name][ext]',
  booking:'http://10.0.2.2:9000/[name][ext]',
}
  console.log(5555555, containers)

  const resolveURL = Federated.createURLResolver({
    containers,
  });

  let url;
  let token;
  if (__DEV__ && caller === 'main' && false) {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }
  console.log('00000000', url)
  if (!url) {
    return undefined;
  }
  console.log('123123123', url)
  return {
    url,
    cache: false,
    headers: { dfe: '123' },
    query: {
      platform: Platform.OS, // only needed in development
    },
    verifyScriptSignature: 'off'

  };
});


/**
 * We can also add a listener to the ScriptManager to get notified about the loading process. This is useful for debugging.
 *
 * This is optional and can be removed.
 */
ScriptManager.shared.on('resolving', (...args) => {
  console.log('DEBUG/resolving', ...args);
});

ScriptManager.shared.on('resolved', (...args) => {
  console.log('DEBUG/resolved', ...args);
});

ScriptManager.shared.on('prefetching', (...args) => {
  console.log('DEBUG/prefetching', ...args);
});

ScriptManager.shared.on('loading', (...args) => {
  console.log('DEBUG/loading', ...args);
});

ScriptManager.shared.on('loaded', (...args) => {
  console.log('DEBUG/loaded', ...args);
});

ScriptManager.shared.on('error', (...args) => {
  console.log('DEBUG/error', '111111111111');
  console.log('DEBUG/error', ...args);
});

// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
