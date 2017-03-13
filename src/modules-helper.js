function getConstants () {
    return (SiteEnvironment.app && SiteEnvironment.app.default && SiteEnvironment.app.default.constants) || {};
}

function getComponent(componentName, onComponentLoad) {
    if (SiteEnvironment.app && SiteEnvironment.app.default && typeof SiteEnvironment.app.default.getComponent === 'function') {
        SiteEnvironment.app.default.getComponent(componentName).then(function (Component) {
            if (Component && typeof onComponentLoad === 'function') {
                onComponentLoad(Component);
            }
        });
    }
}
