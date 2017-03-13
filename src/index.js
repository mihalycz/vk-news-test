import './styles/main.less';
import Promise from 'es6-promise';
import ComponentsCache from './components-cache/components-cache';
import { ExternalConstants } from './const';

export default {
    constants: ExternalConstants,
    getComponent: function (componentName) {
        let component = ComponentsCache().getComponent(componentName);
        return component ? Promise.resolve(component) : Promise.reject(null);
    }
}