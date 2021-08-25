<template>
  <div>
    <div>
      <el-input
        placeholder="Search activities by name"
        v-model="search"
        class="mt-3 mb-1"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <el-card>
      <el-table
        :data="activities"
        style="width: 100%"
        stripe
        v-loading="tableLoading"
      >
        <el-table-column label="Info">
          <template slot-scope="props">
            <span>{{ props.row.name }}</span>
            <br />
            <span style="font-size:11px;" v-if="isAdmin">
              By: <el-tag size="mini">{{ props.row.user.name }}</el-tag>
            </span>
            <span style="font-size:11px;" v-else>
              By: <el-tag size="mini">{{ user.name }}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Date" align="center">
          <template slot-scope="props">
            <span>{{ getDateFormat(props.row.createdAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Activity" align="center">
          <template slot-scope="props">
            <span :style="`color:${getActivityColor(props.row.action)};`">{{
              props.row.action
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" v-if="isAdmin">
          <template slot-scope="props">
            <el-popconfirm
              confirmButtonText="OK"
              cancelButtonText="No, Thanks"
              icon="el-icon-info"
              iconColor="red"
              title="Are you sure to delete this?"
              @onConfirm="deleteActivity(props.row._id)"
            >
              <el-button
                slot="reference"
                size="mini"
                type="danger"
                icon="el-icon-delete"
              />
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div style="text-align: center;margin-top: 10px; padding-bottom:10px;">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="20"
        layout="prev, pager, next, jumper, sizes, total"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import activityService from '@/api/activities';
import { mapGetters } from 'vuex';

export default {
  name: 'Activities',
  data() {
    return {
      search: '',
      activities: [],
      tableLoading: false,
      total: 0,
      currentPage: 1,
      query: {
        page: 1,
        limit: 20,
      },
    };
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      isAdmin: 'getAdmin',
    }),
  },
  created() {
    this.getActivities();
  },
  methods: {
    getActivities() {
      let self = this;
      this.tableLoading = true;
      if (this.isAdmin) {
        activityService
          .getActivities(this.query)
          .then((response) => this.loadTable(response))
          .catch((errors) => this.errorMessage(errors.error));
      } else {
        activityService
          .getUserActivity(self.user.id)
          .then((response) => {
            self.activities = response.data;
            self.total = response.total;
            self.tableLoading = false;
          })
          .catch((errors) => this.errorMessage(errors.error));
      }
    },
    loadTable(activity) {
      let self = this;
      let data = activity.data.map(function(act) {
        act.user.name =
          act.user._id === self.user._id ? 'Yourself' : act.user.name;
        return act;
      });
      this.activities = data;
      this.total = activity.total;
      this.tableLoading = false;
    },
    deleteActivity(id) {
      activityService
        .deleteActivity(id)
        .then(() => this.getActivities())
        .catch((errors) => this.errorMessage(errors.error));
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.query.page = page;
      this.getActivities();
    },
  },
};
</script>
