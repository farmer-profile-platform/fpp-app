<template>
  <div>
    <AppHandler ref="handleAction" model="Application"></AppHandler>
    <div class="flex_justify_between">
      <el-button
        icon="el-icon-plus"
        plain
        type="primary"
        size="small"
        @click="addFarmerModal"
        >Add New Farmer</el-button
      >
    </div>
    <div>
      <el-input
        placeholder="Search farmers by thier names"
        v-model="search"
        class="mt-4 mb-1"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-card>
      <el-table
        :data="
          tableData.filter(
            data =>
              !search ||
              data.firstName.toLowerCase().includes(search.toLowerCase())
          )
        "
        v-loading="tableLoading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        style="width: 100%"
      >
        <el-table-column label="Basic Info" width="250">
          <template slot-scope="props">
            <div class="d-flex clickable" @click="viewProfile(props.row._id)">
              <span style="margin-right: 10px;">
                <img
                  :src="getImageFile(props.row.photo)"
                  alt="pic"
                  style="width:40px;"
                />
              </span>
              <span>
                <b style="font-weight:bold; font-size: 16px">{{
                  props.row.firstName + ' ' + props.row.lastName
                }}</b>
                <br />
                <small style="font-weight:500; font-size: 12px">{{
                  props.row.farmerId
                }}</small>
                <br />
                <small style="font-size:12px;">{{
                  props.row.townOfResidence
                }}</small>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Rating" align="center">
          <template>
            <el-button type="text" size="mini">
              <i class="el-icon-star-on" style="color:gold; font-size:18px"></i>
              4.3</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="Crop Information" width="250">
          <template slot-scope="props">
            <span v-for="(crop, index) in props.row.harvestYield" :key="index">
              <el-button
                type="primary"
                round
                plain
                size="mini"
                style="margin-right:10px;"
                >{{ crop.crop_name }}</el-button
              >
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Support Status" width="200">
          <template slot-scope="props">
            <el-tag
              size="mini"
              :type="
                hasInputSupport(props.row.inputSupports) ? 'success' : 'warning'
              "
            >
              {{
                hasInputSupport(props.row.inputSupports)
                  ? 'Supported'
                  : 'Not supported'
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="right" width="68px">
          <template slot-scope="props">
            <el-tooltip
              class="item"
              effect="dark"
              content="Download PDF"
              placement="top"
            >
              <el-button
                type="primary"
                plain
                size="mini"
                icon="el-icon-download"
                @click="downloadProfile(props.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="props">
            <el-dropdown class="ml-1">
              <!-- <img src="../assets/images/morep.svg" alt="more" style="margin-top:10px;"/> -->
              <i class="el-icon-more fa-rotate-45"></i>
              <el-dropdown-menu slot="dropdown">
                <router-link
                  :to="{
                    name: 'Farmer Profile',
                    query: { farmer: props.row._id },
                  }"
                >
                  <el-dropdown-item>
                    <i class="el-icon-user" style="margin-right: 10px"></i>
                    View Profile</el-dropdown-item
                  >
                </router-link>

                <el-dropdown-item>
                  <span
                    v-if="!hasInputSupport(props.row.inputSupports)"
                    @click="addInputSupport(props.row._id, props.row.firstName)"
                  >
                    <i class="el-icon-s-flag" style="margin-right: 10px"></i>
                    Add Farm Input
                  </span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="editFarmer(props.row)">
                    <i class="el-icon-edit" style="margin-right: 10px"></i>
                    Edit Farmer Details
                  </span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span @click="confirmDelete(props.row._id, props.row.name)">
                    <i class="el-icon-delete" style="margin-right: 10px"></i>
                    Delete Farmer
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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

    <!-- add farmers dialog -->
    <el-dialog :visible.sync="showAddFarmerModal" fullscreen>
      <template slot="title">
        <h3>Add Farmer</h3>
        <p>Please fill all fields for accurate data reports.</p>
      </template>
      <AddNewFarmers v-on:addedFarmer="farmerAdded" v-if="showAddFarmerModal" />
    </el-dialog>
  </div>
</template>

<script>
import farmersService from '@/api/farmers';
import AddNewFarmers from './AddNewFarmers';
const AppHandler = () => import('../../handlers/AppHandler');

import { mapGetters } from 'vuex';

export default {
  name: 'farmers',
  components: {
    AddNewFarmers,
    AppHandler,
  },
  data() {
    return {
      tableData: [],
      tableLoading: false,
      showAddFarmerModal: false,
      currentPage: 1,
      total: 0,
      search: '',
      params: {
        page: 1,
        limit: 20,
      },
    };
  },
  computed: {
    ...mapGetters({
      farmers: 'getFarmers',
      internetStatus: 'internetStatus',
      user: 'getUser',
    }),
  },
  watch: {
    farmers: function(v) {
      this.tableData = v;
    },
  },
  created() {
    this.checkInternet();
    this.getFarmers();
  },
  methods: {
    getFarmers() {
      this.tableLoading = true;
      if (this.internetStatus) {
        this.syncOfflineFarmersData();
        farmersService
          .getFarmers(this.params)
          .then(response => {
            this.tableLoading = false;
            this.tableData = response.data;
            this.$store.dispatch('getFarmerData', response.data);
            this.total = response.total;
            // this.updateBrowserCache();
          })
          .catch(errors => {
            this.errorMessage(errors.error);
            this.tableLoading = false;
          });
      } else {
        this.tableLoading = false;
        this.tableData = this.farmers;
        this.total = this.tableData.length;
      }
    },
    // updateBrowserCache() {
    //   let self = this;
    //   if (localStorage.getItem('updated')) {
    //     console.log('true');
    //   } else {
    //     this.$alert(
    //       'We would like to update your FPP local cache to suit new FPP updates',
    //       'Updates',
    //       {
    //         confirmButtonText: 'OK',
    //         callback: (action) => {
    //           localStorage.setItem('updated', false);
    //           self.$store.dispatch('emptyFarmerData');
    //           this.$message({
    //             type: 'info',
    //             message: `${action} successfully`,
    //           });
    //         },
    //       }
    //     );
    //   }
    // },
    addInputSupport(farmerId, name) {
      this.$refs.handleAction.addInputSupportData(
        farmerId,
        name,
        this.getFarmers
      );
    },
    editFarmer(farmer) {
      this.$refs.handleAction.editFarmerInfo(farmer, this.getFarmers);
    },
    confirmDelete(id, name) {
      this.$confirm('This will permanently delete farmer data', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          this.deleteFarmer(id, name);
        })
        .catch(() => {
          this.errorMessage('Delete cancelled');
        });
    },
    deleteFarmer(id, name) {
      this.addActivity({ _id: id, name: name }, 'Deleted');
      farmersService
        .deleteFarmer(id)
        .then(() => {
          this.successNotification('Success', 'Farmer deleted successfully');
          this.getFarmers();
        })
        .catch(errors => this.errorMessage(errors.error));
    },
    addFarmerModal() {
      this.showAddFarmerModal = true;
    },
    downloadProfile(farmer) {
      this.$refs.handleAction.viewDownload(farmer, this.getFarmers);
    },
    farmerAdded() {
      this.showAddFarmerModal = false;
      this.getFarmers();
    },
    viewProfile(id) {
      this.$router.push({
        name: 'Farmer Profile',
        query: { farmer: id },
      });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.params.page = page;
      this.getFarmers();
    },
  },
};
</script>
