import './sentry';
import Resolver from 'ember-resolver';
import Application from '@ember/application';
import config from 'corn-calculator/config/environment';
import loadInitializers from 'ember-load-initializers';

export default class App extends Application {
  podModulePrefix = config.podModulePrefix;
  modulePrefix = config.modulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
