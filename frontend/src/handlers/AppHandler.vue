<template>
  <div>
    <!-- Download -->
    <el-dialog
      :title="selectedTitle"
      append-to-body
      :close-on-click-modal="false"
      :before-close="closeModal"
      :visible.sync="showDownloadModal"
    >
      <FarmerProfileDownload
        :farmer.sync="selectedFarmer"
        v-if="showDownloadModal"
      />
    </el-dialog>

    <!-- Edit farmer details -->
    <el-dialog
      fullscreen
      :before-close="closeModal"
      :visible.sync="showEditFarmerModal"
    >
      <template slot="title">
        <h3>{{ selectedTitle }}</h3>
        <p>Edit field and make sure all required fields has data.</p>
      </template>
      <EditFarmerDetails
        v-if="showEditFarmerModal"
        v-bind:farmer="selectedFarmer"
        v-on:editedFarmer="farmerEdited"
      />
    </el-dialog>

    <!-- Add farmer Input Support -->
    <el-dialog
      width="58%"
      append-to-body
      :close-on-click-modal="false"
      :before-close="closeModal"
      :visible.sync="showInputSupportModal"
    >
      <template slot="title">
        <h3>{{ selectedTitle }}</h3>
        <p>Take note of the unit details and amounts.</p>
      </template>
      <AddFarmInputSupport
        v-if="showInputSupportModal"
        :selectedFarmerId.sync="selectedId"
        :selectedName="selectedName"
        v-on:addedInput="inputAdded"
      />
    </el-dialog>
  </div>
</template>

<script>
import AddFarmInputSupport from '../components/AddFarmInputSupport';
import FarmerProfileDownload from '../components/FarmerProfileDownload';
import EditFarmerDetails from '../views/farmers/EditFarmerDetails';

export default {
  name: 'AppHandler',
  components: {
    AddFarmInputSupport,
    FarmerProfileDownload,
    EditFarmerDetails,
  },
  props: {
    model: String,
  },
  data() {
    return {
      selectedId: null,
      selectedFarmer: null,
      successFunc: null,
      selectedTitle: '',
      selectedName: '',
      showDownloadModal: false,
      showInputSupportModal: false,
      showEditFarmerModal: false,
    };
  },
  methods: {
    viewDownload(farmer, refreshData) {
      this.selectedId = farmer._id;
      this.selectedTitle =
        'Download ' + farmer.name + ' Profile (' + farmer.farmerId + ')';
      this.selectedFarmer = farmer;
      this.showDownloadModal = true;
      this.successFunc = refreshData;
    },
    addInputSupportData(id, name, refreshData) {
      this.selectedId = id;
      this.selectedName = name;
      this.selectedTitle = 'Add Farm Support for ' + name;
      this.showInputSupportModal = true;
      this.successFunc = refreshData;
    },
    inputAdded() {
      this.showInputSupportModal = false;
      this.successFunc();
    },
    editFarmerInfo(farmer, refreshData) {
      this.selectedTitle = `Edit Farmer Details for ${farmer.name} (${farmer.farmerId})`;
      this.selectedFarmer = farmer;
      this.showEditFarmerModal = true;
      this.successFunc = refreshData;
    },
    closeModal(done) {
      done();
      this.successFunc();
    },
    farmerEdited() {
      this.showEditFarmerModal = false;
      this.successFunc();
    },
  },
};
</script>
