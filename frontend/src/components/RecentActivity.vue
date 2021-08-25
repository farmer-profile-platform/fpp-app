<template>
  <div>
    <h4 class="mb-2">Recent Activities</h4>
    <p v-if="activities.length == 0">
      No Activities Yet!
    </p>
    <el-tag
      v-else
      type="info"
      class="sidebar_activity"
      v-for="(activity, index) in activities"
      :key="index"
    >
      <span>{{ activity.name }}</span>
      <span
        :style="`float:right; color:${getActivityColor(activity.action)};`"
        >{{ activity.action }}</span
      >
    </el-tag>

    <div class="align_center">
      <router-link to="/dashboard/activity">
        <el-button type="text">View all</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import activityService from '../api/activities';

export default {
  name: 'RecentActivity',
  data() {
    return {
      action: true,
      activities: [],
    };
  },
  created() {
    activityService
      .getActivities()
      .then((response) => {
        if (response.data.length > 5) {
          response.data.length = 5;
        }
        this.activities = response.data;
      })
      .catch((errors) => this.errorMessage(errors.error));
  },
};
</script>
