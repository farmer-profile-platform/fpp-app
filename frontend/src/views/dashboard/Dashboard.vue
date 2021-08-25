<template lang="pug">
    extends ../BaseView.pug
</template>

<script>
import Vue from 'vue';
import BaseView from '../BaseView';
import Home from './Home';
import Activity from './Activity';
import Issues from './Issues';

Vue.component('home', { template: '<Home />' });
Vue.component('activity', { template: '<Activity />' });
Vue.component('issues', { template: '<Issues />' });

export default {
  name: 'Dashboard',
  extends: BaseView,
  components: { Home, Activity, Issues },
  props: {
    pages: {
      type: Array,
      default: () => {
        return [
          {
            tabName: 'analysis',
            component: 'home',
          },
          {
            tabName: 'activity',
            component: 'activity',
          },
          {
            tabName: 'issues',
            component: 'issues',
          },
        ];
      },
    },
    tabs: {
      type: Array,
      default: () => {
        return [
          { name: 'Analysis', root: 'analysis', route: '/dashboard/analysis' },
          {
            name: 'Activity Log',
            root: 'activity',
            route: '/dashboard/activity',
          },
          {
            name: 'Issues Reported',
            root: 'issues',
            route: '/dashboard/issues',
          },
        ];
      },
    },
  },
};
</script>
