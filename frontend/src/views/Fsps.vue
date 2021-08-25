<template>
  <div>
    <div class="mb-2 flex_justify_between">
      <h3>{{ title }}</h3>

      <el-button
        icon="el-icon-plus"
        plain
        type="primary"
        @click="showAddFspModal = true"
      >
        Add Fsp
      </el-button>
    </div>

    <div>
      <el-tabs
        v-model="activeTab"
        type="border-card"
        style="background:#E6E6E6"
      >
        <el-tab-pane name="bank">
          <span slot="label"> {{ bankTab }}</span>
          <FspList type="bank" v-on:loaded="fspLoaded" />
        </el-tab-pane>

        <el-tab-pane name="rural">
          <span slot="label"> {{ ruralTab }}</span>
          <FspList type="rural" v-on:loaded="fspLoaded" />
        </el-tab-pane>

        <el-tab-pane name="savingLoans">
          <span slot="label"> {{ savingsTab }}</span>
          <FspList type="sl" v-on:loaded="fspLoaded" />
        </el-tab-pane>

        <el-tab-pane name="credit">
          <span slot="label"> {{ creditTab }}</span>
          <FspList type="credit" v-on:loaded="fspLoaded" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog :visible.sync="showAddFspModal" width="30%" title="Add Fsp">
      <el-form :model="fspDetails" ref="fspDetails">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item prop="name">
              <el-input
                v-model="fspDetails.name"
                placeholder="Enter fsp name"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item prop="type">
              <el-select
                v-model="fspDetails.type"
                class="full-width"
                placeholder="Select fsp type"
              >
                <el-option label="Bank" value="bank"></el-option>
                <el-option label="Savings & Loans" value="sl"></el-option>
                <el-option label="Credit Union" value="credit"></el-option>
                <el-option label="Rural Bank" value="rural"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-button
          class="full-width"
          type="primary"
          icon="el-icon-office-building"
          :loading="btnLoading"
          @click="addFsp"
          >Add Fsp</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import FspList from '@/components/FspList';
import fspService from '@/api/fsps';

export default {
  name: 'Fsps',
  components: {
    FspList,
  },
  data() {
    return {
      activeTab: 'bank',
      ruralTab: 'Rural Banks',
      savingsTab: 'Savings & Loans',
      creditTab: 'Credit Unions',
      bankTab: 'Banks',
      title: 'Fsps',
      search: '',
      bankTotal: '',
      savingsTotal: '',
      creditTotal: '',
      ruralTotal: '',
      totalFsps: 0,
      tableData: [],
      tableLoading: false,
      showAddFspModal: false,
      btnLoading: false,
      fspDetails: {
        name: '',
        type: '',
      },
    };
  },
  watch: {
    totalFsps: function(v) {
      this.title = 'Fsps (' + v + ')';
    },
  },
  methods: {
    fspLoaded(args) {
      let type = args.type;
      let total = args.total;

      if (type == 'bank') {
        this.bankTab = 'Banks (' + total + ')';
        this.bankTotal = total;
      } else if (type == 'rural') {
        this.ruralTab = 'Rural Bank (' + total + ')';
        this.ruralTotal = total;
      } else if (type == 'sl') {
        this.savingsTab = 'Savings & Loans (' + total + ')';
        this.savingsTotal = total;
      } else if (type == 'credit') {
        this.creditTab = 'Credit Unions (' + total + ')';
        this.creditTotal = total;
      }

      this.totalFsps =
        this.bankTotal + this.ruralTotal + this.savingsTotal + this.creditTotal;
    },
    addFsp() {
      this.btnLoading = true;
      fspService
        .addFsp(this.fspDetails)
        .then(() => {
          this.btnLoading = false;
          this.showAddFspModal = false;
          this.$router.go();
          this.successNotification('Success', 'Fsp added successfully');
        })
        .catch((errors) => {
          this.btnLoading = false;
          this.errorMessage(errors.error);
        });
    },
  },
};
</script>
