<template>
  <div>
    <div>
      <el-input
        placeholder="Search farmers by thier names"
        v-model="search"
        class="mt-1 mb-1"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-card class="">
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
            <div class="d-flex">
              <span style="margin-right: 10px;">
                <img
                  :src="getImageFile(props.row.photo)"
                  alt=""
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
              <el-button type="primary" round plain size="mini" class="mr-1">{{
                crop.crop_name
              }}</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Support Info" width="200">
          <template slot-scope="props">
            <span>
              <span style="font-size:11px;">
                Year: {{ props.row.inputSupports[0].year }}
              </span>
              <br />
              <span style="font-size:11px;">
                Grand Total: GH₵
                {{ props.row.inputSupports[0].grand_total }} </span
              ><br />
              <el-button
                type="text"
                icon="el-icon-view"
                size="mini"
                @click="showInputs(props.row.inputSupports)"
                >View all</el-button
              >
            </span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="props">
            <el-dropdown class="ml-1">
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
                  <span @click="showSupportUpdate(props.row)">
                    <i class="el-icon-s-flag" style="margin-right: 10px"></i>
                    Update Support
                  </span>
                </el-dropdown-item>
                <!-- <el-dropdown-item>
                  <span @click="showEditModal(props.row)">
                    <i class="el-icon-edit" style="margin-right: 10px"></i>
                    Edit Farmer Details
                  </span>
                </el-dropdown-item> -->
                <el-dropdown-item divided>
                  <span @click="confirmDelete(props.row._id)">
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

    <!-- Edit farmer details -->
    <el-dialog :visible.sync="showEditFarmerModal" fullscreen>
      <template slot="title">
        <h3>{{ editTitle }}</h3>
        <p>Edit field and make sure all required fields has data.</p>
      </template>
      <EditFarmerDetails
        v-if="showEditFarmerModal"
        :farmer.sync="farmer"
        v-on:editedFarmer="farmerEdited"
      />
    </el-dialog>

    <!-- Update farmer Input Support -->
    <el-dialog :visible.sync="showUpdateSupportModal" width="58%">
      <template slot="title">
        <h3>{{ inputSupportTitle }}</h3>
        <p>Take note of the unit details and amounts.</p>
      </template>
      <UpdateFarmInputSupport
        v-if="showUpdateSupportModal"
        :selectedFarmerId.sync="selectedFarmerId"
        :selectedName="selectedName"
        :selectedInputs.sync="selectedInputs"
        v-on:updateInput="inputUpdated"
      />
    </el-dialog>

    <!-- Show Inputs details -->
    <el-dialog
      :visible.sync="showInputsModal"
      width="58%"
      title="Support Information"
    >
      <div>
        <el-table :data="supportData" style="width: 100%" stripe>
          <el-table-column label="Year & Total">
            <template slot-scope="props">
              <span
                >Year:
                <el-tag size="mini" type="warning">{{
                  props.row.year
                }}</el-tag></span
              >
              <br />
              <span
                >Grand Total:
                <el-tag size="mini"
                  >GH₵ {{ props.row.grand_total }}</el-tag
                ></span
              >
            </template>
          </el-table-column>
          <el-table-column label="Inputs Info" width="550">
            <template slot-scope="props">
              <div
                v-for="(input, index) in props.row.inputs"
                :key="index"
                class="flex_justify_between"
                style="border-bottom: 1px solid #E6E6E6; margin-bottom: 5px;"
              >
                <div class="support_table">
                  <span><b>Type</b></span>
                  <span class="support_value">{{ input.type }}</span>
                </div>
                <div class="support_table">
                  <span><b>Name</b></span>
                  <span class="support_value">{{ input.name }}</span>
                </div>
                <div class="support_table">
                  <span><b>Unit Price</b></span>
                  <span class="support_value"
                    ><el-tag size="mini" type="success"
                      >GH₵ {{ input.unit_price }}</el-tag
                    >
                  </span>
                </div>
                <div class="support_table">
                  <span><b>Quantity</b></span>
                  <span class="support_value">{{ input.quantity }}</span>
                </div>
                <div class="support_table">
                  <span><b>Total</b></span>
                  <span class="support_value"
                    ><el-tag size="mini" type="success"
                      >GH₵ {{ input.total }}</el-tag
                    >
                  </span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import farmersService from '../../api/farmers';
import EditFarmerDetails from './EditFarmerDetails';
import UpdateFarmInputSupport from '../../components/UpdateFarmInputSupport';

export default {
  name: 'farmers',
  components: {
    EditFarmerDetails,
    UpdateFarmInputSupport,
  },
  data() {
    return {
      tableData: [],
      supportData: [],
      tableLoading: false,
      showEditFarmerModal: false,
      showInputsModal: false,
      showUpdateSupportModal: false,
      inputSupportTitle: '',
      selectedName: '',
      selectedFarmerId: '',
      selectedInputs: [],
      editTitle: '',
      farmer: {},
      currentPage: 1,
      total: 3,
      search: '',
    };
  },
  created() {
    this.getFarmers();
  },
  methods: {
    getFarmers() {
      let self = this;
      this.tableLoading = true;
      farmersService
        .getFarmersWithSupport()
        .then(response => {
          this.tableLoading = false;
          this.tableData = response.data;
          this.total = response.total;
        })
        .catch(errors => {
          self.errorMessage(errors.error);
          self.tableLoading = false;
        });
    },
    showInputs(supportData) {
      this.supportData = supportData;
      this.showInputsModal = true;
    },
    confirmDelete(id) {
      this.$confirm('This will permanently delete farmer data', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          this.deleteFarmer(id);
        })
        .catch(() => {
          this.errorMessage('Delete cancelled');
        });
    },
    deleteFarmer(id) {
      farmersService.deleteFarmer(id).then(() => {
        this.successNotification('Success', 'Farmer deleted successfully');
        this.getFarmers();
      });
    },
    showEditModal(farmer) {
      this.editTitle = `Edit Farmer Details for ${farmer.name} (${farmer.farmerId})`;
      this.farmer = farmer;
      this.showEditFarmerModal = true;
    },
    showSupportUpdate(farmer) {
      this.inputSupportTitle = 'Update Farm Support for ' + farmer.name;
      this.selectedFarmerId = farmer._id;
      this.selectedName = farmer.name;
      this.selectedInputs = farmer.inputSupports;
      this.showUpdateSupportModal = true;
    },
    farmerEdited() {
      this.showEditFarmerModal = false;
      this.getFarmers();
    },
    inputUpdated() {
      this.showUpdateSupportModal = false;
      this.getFarmers();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
  },
};
</script>
