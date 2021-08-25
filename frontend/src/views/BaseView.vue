<template lang="pug">
  include BaseView.pug
</template>

<script>
import is from 'is_js';

export default {
  name: 'BaseView',
  props: {
    pages: {
      type: Array,
      default: () => {
        return [];
      },
      required: true,
    },
    tabs: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    $route(to) {
      this.init(to.params.tab);
    },
  },
  data() {
    return {
      tab: '',
      routeTabs: [],
    };
  },
  created() {
    this.init(this.$route.params.tab);
  },
  methods: {
    init(tab) {
      this.tab = is.undefined(tab) ? this.$route.meta.defaultTab : tab;
    },
    isActive(tab) {
      return this.tab === tab;
    },
  },
};
</script>
