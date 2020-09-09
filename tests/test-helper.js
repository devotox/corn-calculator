import Application from 'corn-calculator/app';
import config from 'corn-calculator/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
