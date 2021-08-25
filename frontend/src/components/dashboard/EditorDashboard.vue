<template>
  <div>
    <div>
      <!-- <h3>{{ getGreetings() }} {{ user.name }} !!</h3> -->
    </div>
    <div v-loading="pageLoad">
      <el-row :gutter="20">
        <el-col :span="10">
          <DashBoardCard
            type="totalFarmers"
            title="FARMERS TOTAL"
            :total="farmersTotal"
            titleText="Total Number of Farmers you've registered so far."
            bgColor="farmersBg"
            progColor="#2cb96b"
            :yrExpert="200"
            :percentage="getPercentageData(farmersTotal, 200)"
          />
        </el-col>
        <el-col :span="10">
          <DashBoardCard
            title="TOTAL ACTIVITIES"
            :total="activities"
            titleText="Total Number of activities performed."
            bgColor="userBg"
            progColor="#0cd0e1"
            :yrExpert="50"
            :percentage="getPercentageData(activities, 50)"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DashBoardCard from './DashBoardCard';
import dashboardService from '@/api/reports';

export default {
  name: 'EditorDashboard',
  components: {
    DashBoardCard,
  },
  data() {
    return {
      farmersTotal: 0,
      activities: 0,
      pageLoad: true,
    };
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  mounted() {
    this.getDashboardData();
  },
  methods: {
    getDashboardData() {
      dashboardService
        .getUserReports(this.user.id)
        .then((response) => {
          this.farmersTotal = response.data.userAddedfarmers;
          this.activities = response.data.userActivities;
          this.pageLoad = false;
        })
        .catch((errors) => this.errorMessage(errors.error));
    },
  },
};
</script>
