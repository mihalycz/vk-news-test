import './results.view.less';

export default function results() {
    return {
        restrict: 'E',
        template: require('./results.view.html'),
        controller: 'ResultsController',
        controllerAs: 'context'
    }
}
