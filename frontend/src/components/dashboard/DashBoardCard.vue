<template>
  <el-card>
    <div slot="header" class="clearfix flex_justify_between">
      <span class="dashboard_card_head" :id="bgColor">
        {{ title }}
      </span>
      <span class="dashboard-dropdown">
        <el-dropdown>
          <el-button
            icon="el-icon-arrow-down"
            size="mini"
            type="text"
          ></el-button>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="type == 'amountSupported'">
              <span @click="showBarChart = true">View Chart</span>
            </el-dropdown-item>
            <el-dropdown-item v-else
              ><span @click="goToTable(type)">View Data</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
    <p>{{ titleText }}</p>
    <div class="flex_justify_between">
      <span class="dashboard_card_total">
        <b v-show="bgColor == 'amntBg'">GH₵</b> {{ total }}
      </span>
      <span class="dashboard_card_text">
        <span
          ><i class="el-icon-info"></i> Expect(Yearly):
          <b>{{ yrExpert }}</b></span
        >
        <br />
        <span><i class="el-icon-arrow-down"></i> % of what we have. </span>
      </span>
    </div>
    <div>
      <el-progress :percentage="percentage" :color="progColor"></el-progress>
    </div>

    <el-dialog
      title="Yearly Data for Input Supports (GH₵)"
      :visible.sync="showBarChart"
      width="40%"
    >
      <div>
        <BarChart :chartData="chartData" />
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import BarChart from '@/components/charts/BarChart';

export default {
  name: 'DashBoardCard',
  props: {
    type: String,
    title: String,
    total: Number,
    titleText: String,
    bgColor: String,
    progColor: String,
    yrExpert: Number,
    percentage: Number,
    chartData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {
    BarChart,
  },
  data() {
    return {
      showBarChart: false,
    };
  },
  methods: {
    goToTable(type) {
      switch (type) {
        case 'totalFarmers':
          this.$router.push('/farmers');
          break;
        case 'totalSupport':
          this.$router.push('/farmer-input-support');
          break;
        case 'totalUsers':
          this.$router.push('/users');
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard_card_head {
  border-radius: 5px;
  color: whitesmoke;
  padding: 15px 8px;
  width: 100%;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

#farmersBg {
  background-color: #2cb96b;
}

#suppBg {
  background-color: #4fc2ab;
}

#userBg {
  background-color: #0cd0e1;
}

#amntBg {
  background-color: #52725f;
}
.dashboard_card_total {
  font-size: 40px;
  font-weight: bold;
  color: grey;
}

.dashboard_card_text span {
  font-size: 12px;

  b {
    font-size: 12px;
  }
}
</style>
