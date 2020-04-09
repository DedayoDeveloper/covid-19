/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import mainpage from './components/mainpage';
import {name as appName} from './app.json';



// import countryscreen from './components/countryscreen';
AppRegistry.registerComponent(appName, () => mainpage);

