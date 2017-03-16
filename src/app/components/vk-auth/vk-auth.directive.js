import './vk-auth.view.less';

export default function vkAuth() {
    return {
        restrict: 'E',
        template: require('./vk-auth.view.html'),
        controller: 'VkAuthController',
        controllerAs: 'context'
    }
}
