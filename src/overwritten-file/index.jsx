import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
  mergeConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage, PageRoute } from '@edx/frontend-platform/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from 'react-router-dom';

import { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

import appMessages from '@edx/frontend-app-learning/src/i18n';
import { UserMessagesProvider } from '@edx/frontend-app-learning/src/generic/user-messages';

import './index.scss';
import '@edx/frontend-app-learning/src/assets/favicon.ico';
import OutlineTab from '@edx/frontend-app-learning/src/course-home/outline-tab';
import { CourseExit } from '@edx/frontend-app-learning/src/courseware/course/course-exit';
import CoursewareContainer from '@edx/frontend-app-learning/src/courseware';
import CoursewareRedirectLandingPage from '@edx/frontend-app-learning/src/courseware/CoursewareRedirectLandingPage';
import DatesTab from '@edx/frontend-app-learning/src/course-home/dates-tab';
import ProgressTab from '@edx/frontend-app-learning/src/course-home/progress-tab/ProgressTab';
import { TabContainer } from '@edx/frontend-app-learning/src/tab-page';

import { fetchDatesTab, fetchOutlineTab, fetchProgressTab } from '@edx/frontend-app-learning/src/course-home/data';
import { fetchCourse } from '@edx/frontend-app-learning/src/courseware/data';
import initializeStore from '@edx/frontend-app-learning/src/store';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={initializeStore()}>
      <UserMessagesProvider>
        <h1>COURSEWARE MODIFIED</h1>
        <Footer />
      </UserMessagesProvider>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  handlers: {
    config: () => {
      mergeConfig({
        INSIGHTS_BASE_URL: process.env.INSIGHTS_BASE_URL || null,
        STUDIO_BASE_URL: process.env.STUDIO_BASE_URL || null,
        SUPPORT_URL: process.env.SUPPORT_URL || null,
        TWITTER_URL: process.env.TWITTER_URL || null,
        ENTERPRISE_LEARNER_PORTAL_HOSTNAME: process.env.ENTERPRISE_LEARNER_PORTAL_HOSTNAME || null,
      }, 'LearnerAppConfig');
    },
  },
  // TODO: Remove this once the course blocks api supports unauthenticated
  // access and we are prepared to support public courses in this app.
  requireAuthenticatedUser: true,
  messages: [
    appMessages,
    headerMessages,
    footerMessages,
  ],
});
