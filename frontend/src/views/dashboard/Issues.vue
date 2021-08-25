<template>
  <div>
    <div>
      <el-input
        placeholder="Search issues by user names"
        v-model="search"
        class="mt-3 mb-1"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <el-card>
      <el-table
        :data="issues"
        style="width: 100%"
        stripe
        v-loading="tableLoading"
      >
        <el-table-column label="User">
          <template slot-scope="props">
            <span v-if="isAdmin">{{ props.row.user.name }}</span>
            <span v-else>{{ user.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Type">
          <template slot-scope="props">
            <el-tag size="mini" :type="getIssueType(props.row.type)">{{
              props.row.type
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Description">
          <template slot-scope="props">
            <span>{{ props.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Reported" align="center">
          <template slot-scope="props">
            <span>{{ getDateFormat(props.row.createdAt) }}</span>
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
              @onConfirm="deleteIssue(props.row._id)"
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
import issueService from '@/api/issues';
import { mapGetters } from 'vuex';

export default {
  name: 'Activities',
  data() {
    return {
      search: '',
      issues: [],
      tableLoading: false,
      total: 0,
      currentPage: 1,
      params: {
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
    this.getIssues();
  },
  methods: {
    getIssues() {
      let self = this;
      this.tableLoading = true;
      if (this.isAdmin) {
        issueService
          .getIssues(this.params)
          .then(response => {
            self.issues = response.data;
            self.total = response.total;
            self.tableLoading = false;
          })
          .catch(errors => this.errorMessage(errors.error));
      } else {
        issueService
          .getUserIssues(self.user.id)
          .then(response => {
            self.issues = response.data;
            self.total = response.total;
            self.tableLoading = false;
          })
          .catch(errors => this.errorMessage(errors.error));
      }
    },
    deleteIssue(id) {
      issueService
        .deleteIssue(id)
        .then(() => this.getIssues())
        .catch(errors => this.errorMessage(errors.error));
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
  },
};
</script>
