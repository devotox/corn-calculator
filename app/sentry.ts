import config from 'corn-calculator/config/environment';

import * as Sentry from '@sentry/browser';
import * as SentryTracing from '@sentry/tracing';
import * as SentryIntegrations from '@sentry/integrations';

Sentry.init({
  tracesSampleRate: 1.0,
  dsn: config.sentry?.dsn,
  release: `${config.APP.name}@${config.APP.version}`,
  integrations: [
    new SentryIntegrations.Ember(),
    new SentryIntegrations.Dedupe(),
    new SentryIntegrations.ExtraErrorData(),
    new SentryIntegrations.ReportingObserver(),
    new SentryTracing.Integrations.BrowserTracing(),
    // new SentryIntegrations.Debug({ debugger: true, stringify: true }),
    new SentryIntegrations.CaptureConsole({ levels: ['warn', 'error'] })
  ],
  beforeSend(event) {
    event.exception && Sentry.showReportDialog({ eventId: event.event_id });
    return event;
  }
});

export default Sentry;
