import BaseController from '../base/base.controller';

export default class VkAuthController extends BaseController {
    constructor(...parentDependencies) {
        super(...parentDependencies);
        this.scope.isNotLogin = true;
        this.widgetInitialized = false;
        this.vkApi.getLoginStatus ().then(this.onCheckLoginStatus.bind(this));
    }

    onCheckLoginStatus (isLogin) {
        this.scope.isNotLogin = !isLogin;
        if (this.scope.isNotLogin && !this.widgetInitialized) {
            this.vkApi.initAuthWidget ('vk_auth').then(this.onCheckLoginStatus.bind(this));
            this.widgetInitialized = true;
        }
    }
}