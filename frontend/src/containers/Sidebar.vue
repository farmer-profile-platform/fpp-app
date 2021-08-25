<template>
  <el-aside class="sidebar sideDrawer" style="width: 330px;">
    <div class="sidebar_top_logo">
      <img src="../assets/images/fpplogo.png" alt="logo" width="175px" />
      <p>Authorized Personnel</p>
    </div>
    <div class="sidebar_userInfo mb-3">
      <span @click="userProfile(user._id, user.name)" class="pointer">
        <span id="user_photo">
          <img
            :src="getImageFile(user.profile_pic)"
            alt=""
            style="width:40px;"
          />
        </span>
        <span id="user_name">
          <b>{{ user.name }}</b> <br />
          <span style="font-size:12px;">{{ user.email }}</span>
        </span>
      </span>

      <span class="logout" @click="logout">
        <el-tag size="small" type="info">Logout</el-tag>
      </span>
    </div>
    <hr />
    <el-menu :default-openeds="['1']">
      <router-link to="/dashboard">
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          Dashboard
        </el-menu-item>
      </router-link>
      <hr />
      <router-link to="/farmers">
        <el-menu-item index="2">
          <i class="el-icon-user-solid"></i>
          Farmers Profile
        </el-menu-item>
      </router-link>
      <hr />
      <router-link to="/farmer-input-support">
        <el-menu-item index="3">
          <i class="el-icon-s-flag"></i>
          Farmer Input Support
        </el-menu-item>
      </router-link>
      <hr />
      <router-link to="/users">
        <el-menu-item index="4" v-if="isAdmin">
          <i class="el-icon-s-custom"></i>
          Users
        </el-menu-item>
      </router-link>
      <hr />
      <router-link to="/fsps">
        <el-menu-item index="5">
          <i class="el-icon-office-building"></i>
          FSPs
        </el-menu-item>
      </router-link>
    </el-menu>
    <hr />

    <div class="sidebar_activities">
      <RecentActivity />
    </div>

    <div class="sidebar_footer">
      <el-button size="mini" icon="el-icon-setting" type="text"
        >Settings</el-button
      >
      <el-button type="text" @click="showHelpDialog = true"
        ><span style="color: #2fa512;">Report</span></el-button
      >
    </div>

    <el-dialog
      title="Report an issue"
      :visible.sync="showHelpDialog"
      width="27%"
    >
      <div>
        <el-form :model="issueReport" ref="issueReport" :rules="validation">
          <el-row :gutter="10" style="margin-top: -20px;">
            <el-col :md="24">
              <el-form-item prop="type" label="Issue Type">
                <el-select
                  class="full-width mt_1 form-select"
                  v-model.number="issueReport.type"
                  placeholder="Select issue type"
                >
                  <el-option
                    v-for="issue in issueTypes"
                    :key="issue"
                    :label="issue"
                    :value="issue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="24" style="margin-top: -10px;">
              <el-form-item prop="action" label="Action">
                <el-input
                  v-model="issueReport.action"
                  placeholder="adding farmer data"
                  type="textarea"
                  :rows="2"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="24" style="margin-top: -10px;">
              <el-form-item prop="description" label="Description">
                <el-input
                  v-model="issueReport.description"
                  placeholder="Describe issue or any app malfunction you've experinced."
                  type="textarea"
                  :rows="3"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="mini"
            class="full-width"
            :loading="btnLoading"
            icon="el-icon-question"
            @click="reportIssue"
            >Report Issue</el-button
          >
        </span>
      </div>
    </el-dialog>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex';
import issueService from '@/api/issues';
import RecentActivity from '@/components/RecentActivity';

export default {
  name: 'Sidebar',
  components: {
    RecentActivity,
  },
  data() {
    return {
      btnLoading: false,
      showHelpDialog: false,
      issueTypes: [
        'App Malfunction',
        'Offline Issue',
        'Dashboard Issue',
        "Can't query data",
        'Other',
      ],
      issueReport: {
        type: '',
        description: '',
        action: '',
      },
      validation: {
        type: [
          {
            required: true,
            message: 'Select issue type',
            trigger: ['change'],
          },
        ],
        description: [
          {
            required: true,
            message: 'Description is required',
            trigger: ['change'],
          },
        ],
        action: [
          {
            required: true,
            message: 'Help us know want you did.',
            trigger: ['change'],
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      isAdmin: 'getAdmin',
    }),
  },
  methods: {
    reportIssue() {
      let self = this;
      this.btnLoading = true;
      this.$refs['issueReport'].validate((valid) => {
        if (valid) {
          console.log(this.issueReport);
          issueService
            .addIssues(this.issueReport)
            .then(() => {
              self.btnLoading = false;
              self.showHelpDialog = false;
              self.successNotification(
                'Success',
                'Issue reported successfully'
              );
            })
            .catch((error) => self.errormessage(error.message));
        } else {
          return false;
        }
      });
    },
  },
};
</script>
