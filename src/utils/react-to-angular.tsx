import ReactDOM from 'react-dom';
import React from 'react';
import angular from 'angular';

function toBindings(propTypes) {
  const bindings = {};
  Object.keys(propTypes).forEach(key => bindings[key] = '<');
  return bindings;
}

function toProps(propTypes, controller) {
  const props = {};
  Object.keys(propTypes).forEach(key => props[key] = controller[key]);
  return props;
}

export function reactToAngularComponent(Component) {
  const propTypes = Component.propTypes || {};

  return {
    bindings: toBindings(propTypes),
    controller: /*@ngInject*/ function($element) {
      this.$onChanges = () => {
        const props = toProps(propTypes, this);
        ReactDOM.render(<Component { ...props } />, $element[0]);
      };
      this.$onDestroy = () => ReactDOM.unmountComponentAtNode($element[0]);
    }
  };
}

export function getAngularService(name) {
  const injector = angular.element(document.body).injector();
  if (!injector || !injector.get) {
    throw new Error(`Couldn't find angular injector to get "${name}" service`);
  }

  const service = injector.get(name);
  if (!service) {
    throw new Error(`Couldn't find "${name}" angular service`);
  }

  return service;
}
