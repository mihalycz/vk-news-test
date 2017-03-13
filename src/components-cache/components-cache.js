import { INSTANCE, ExternalConstants } from '../const';
import HeaderComponent from '../components/header/header';
import MainComponent from '../components/main/main';
import FooterComponent from '../components/footer/footer';

export default function ComponentsCache () {
    if (ComponentsCache[INSTANCE]) {
        return ComponentsCache[INSTANCE];
    }

    let components = new Map();
    let cache = {
        addComponent: (componentName, component) => {
            components.set(componentName, component);
        },
        getComponent: (componentName) => {
            return components.get(componentName);
        }
    };

    return ComponentsCache[INSTANCE] = cache;
}

let componentsCache = ComponentsCache();

componentsCache.addComponent(ExternalConstants.HeaderComponent, HeaderComponent);
componentsCache.addComponent(ExternalConstants.FooterComponent, FooterComponent);
componentsCache.addComponent(ExternalConstants.MainComponent, MainComponent);


