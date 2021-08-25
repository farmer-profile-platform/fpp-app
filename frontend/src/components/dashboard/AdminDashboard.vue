<template>
  <div v-loading="pageLoad">
    <el-row :gutter="20">
      <el-col :span="8">
        <DashBoardCard
          type="totalFarmers"
          title="FARMERS TOTAL"
          :total="farmersTotal"
          titleText="Total Number of Farmers registered on platform."
          bgColor="farmersBg"
          progColor="#2cb96b"
          :yrExpert="1000"
          :percentage="getPercentageData(farmersTotal, 1000)"
        />
      </el-col>
      <el-col :span="8">
        <DashBoardCard
          type="totalSupport"
          title="FARMERS SUPPORT TOTAL"
          :total="supportTotal"
          titleText="Total Number of Farmers we're providing support"
          bgColor="suppBg"
          progColor="#4fc2ab"
          :yrExpert="500"
          :percentage="getPercentageData(supportTotal, 500)"
        />
      </el-col>
      <el-col :span="8">
        <DashBoardCard
          type="totalUsers"
          title="USERS TOTAL"
          :total="usersTotal"
          titleText="Total Number of users working on the platform."
          bgColor="userBg"
          progColor="#0cd0e1"
          :yrExpert="50"
          :percentage="getPercentageData(usersTotal, 50)"
        />
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg">
      <el-col :span="24">
        <el-card class="box-card mt-2">
          <div slot="header" class="clearfix">
            <span>Input Support Metrics</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >Support Type</el-button
            >
          </div>

          <el-row type="flex" class="row-bg">
            <el-col :span="10">
              <DashBoardCard
                type="amountSupported"
                title="TOTAL AMOUNT SUPPORTED (GH₵)"
                :total="amountTotal"
                titleText="Total Amount we've supported farmers with and our % expectations for the year."
                bgColor="amntBg"
                progColor="#52725f"
                :yrExpert="20000"
                :percentage="getPercentageData(amountTotal, 20000)"
                :chartData="barChartData"
              />
            </el-col>
            <el-col :span="14">
              <div>
                <DoughnutChart :chartData="pieChartData" v-if="loaded" />
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dashboardService from '@/api/reports';
import DashBoardCard from './DashBoardCard';
import DoughnutChart from '@/components/charts/DoughnutChart';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminDashboard',
  components: {
    DashBoardCard,
    DoughnutChart,
  },
  data() {
    return {
      loaded: false,
      pageLoad: true,
      farmersTotal: 0,
      usersTotal: 0,
      supportTotal: 0,
      amountTotal: 0,
      pieChartData: [{ y: 0, label: 'Seedling' }],
      barChartData: [{ y: 0, label: '2020' }],
    };
  },
  mounted() {
    this.getDashboardData();
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  methods: {
    getDashboardData() {
      dashboardService
        .getReports()
        .then((response) => {
          this.farmersTotal = response.data.totalFarmers;
          this.usersTotal = response.data.usersTotal;
          this.supportTotal = response.data.totalSupports;
          this.amountTotal = response.data.totalAmountSupported;
          this.loadPieChartdata(response.data.inputSupportTypes);
          this.loadBarChartdata(response.data.supportsYearly);

          this.pageLoad = false;
        })
        .catch((errors) => this.errorMessage(errors.error));
    },
    loadBarChartdata(data) {
      const cxd = data.map((element) => {
        delete element._id;
        return element;
      });
      this.barChartData = cxd;
    },
    loadPieChartdata(data) {
      const cxd = data.map((element) => {
        delete element._id;
        return element;
      });
      this.pieChartData = cxd;
      this.loaded = true;
    },
  },
};
</script>
