import BaseComponent from '../base/base';
import * as angular from 'angular';
import module from '../../app/components/base/base.module';

export default class MainComponent extends BaseComponent {
    init(container, moduleToInit) {
        if (container) {
            container.appendChild(document.createElement(moduleToInit));
            angular.bootstrap(container, [module]);
        }
    }
}