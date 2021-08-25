<template>
  <div>
    <el-form
      label-position="top"
      label-width="100px"
      :model="inputSupportForm"
      ref="inputSupportForm"
    >
      <div v-for="(year, index) in inputSupportForm.inputSupport" :key="index">
        <el-button
          v-if="index > 0"
          icon="el-icon-delete"
          type="text"
          style="color:red; margin-top: 30px;"
          size="mini"
          @click="removeInputSupport(index)"
          >Delete all input support for this year( {{ year.year }} )</el-button
        >
        <el-row :gutter="20" v-for="(support, idx) in year.inputs" :key="idx">
          <el-col :span="8">
            <el-form-item label="Input Type">
              <el-select
                v-model="support.type"
                style="width:100%; margin-top:-12px"
              >
                <el-option
                  v-for="(type, tidx) in inputTypes"
                  :key="tidx"
                  :label="type"
                  :value="type"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="Input Name">
              <el-input v-model="support.name" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="Unit Price">
              <el-input
                v-model="support.unit_price"
                type="number"
                @input="setTotal(support, year)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div
              class="button-add-details"
              v-if="idx < 1"
              @click="addDuplicateField(year.inputs, 'input')"
            >
              <i
                class="el-icon-circle-plus"
                style="color: grey; font-size: 20px;"
              ></i>
              <br />
              <el-button type="text" size="mini">Add Input</el-button>
            </div>
            <div
              class="button-add-details"
              v-else
              @click="year.inputs.splice(idx, 1)"
            >
              <i
                class="el-icon-delete"
                style="color: red; font-size: 20px;"
              ></i>
              <br />
              <el-button type="text" size="mini">Remove</el-button>
            </div>
          </el-col>
          <el-col :span="5">
            <el-form-item label="Quantity">
              <el-input
                v-model="support.quantity"
                type="number"
                @input="setTotal(support, year)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Total Amount">
              <el-input v-model="support.total" type="number" disabled>
                <template slot="prepend">GH₵</template>
              </el-input>
            </el-form-item>
          </el-col>
          <hr />
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Year">
              <el-select
                v-model="year.year"
                style="width:100%; margin-top:-12px"
              >
                <el-option label="2019" value="2019"></el-option>
                <el-option label="2020" value="2020"></el-option>
                <el-option label="2021" value="2021"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Season">
              <el-select v-model="year.season" placeholder="Select">
                <el-option label="Major Season" value="major" />
                <el-option label="Minor Season" value="minor" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Grand Total">
              <el-input v-model="year.grand_total" type="number" disabled>
                <template slot="prepend">GH₵</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <hr class="sp" />
      </div>
      <br />
      <div>
        <el-button
          icon="el-icon-plus"
          type="info"
          class="full-width"
          @click="addInputSupportField"
          >Add Input Support for Another Year</el-button
        >
      </div>
      <br /><br />
      <h5>
        Comment: Grand total is the sum of the total amount for each input
        entered.
      </h5>
      <div class="mt-3 d-flex">
        <el-button
          class="full-width"
          type="primary"
          :loading="btnLoading"
          @click="loopOverSupports"
          >Save Details</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import supportService from '../api/inputSupports';

export default {
  name: 'AddInputSupport',
  props: {
    selectedName: String,
    selectedFarmerId: String,
  },
  data() {
    return {
      btnLoading: false,
      inputSupportForm: {
        inputSupport: [
          {
            farmer: '',
            year: '2020',
            season: '',
            grand_total: 0,
            inputs: [
              {
                type: '',
                name: '',
                unit_price: 0,
                quantity: 1,
                total: 0,
              },
            ],
          },
        ],
      },
      inputTypes: [
        'Seeds',
        'FarmTech',
        'Training',
        'Fertilizers',
        'Crop Insurance',
      ],
    };
  },
  created() {
    this.inputSupportForm.inputSupport[0].farmer = this.selectedFarmerId;
  },
  methods: {
    addInputSupportField() {
      let s = {
        farmer: this.selectedFarmerId,
        year: '2020',
        season: '',
        grand_total: 0,
        inputs: [
          {
            type: 'None',
            name: 'None',
            unit_price: 0,
            quantity: 1,
            total: 0,
          },
        ],
      };
      this.inputSupportForm.inputSupport.push(s);
      this.infoMessage('Added another year');
    },
    setTotal(input, yrs) {
      input.total = input.unit_price * input.quantity;
      const grandTotal = yrs.inputs.reduce(
        (a, b) => ({ total: a.total + b.total }),
        { total: 0 }
      ).total;
      yrs.grand_total = grandTotal;
    },
    loopOverSupports() {
      this.inputSupportForm.inputSupport.forEach((support) =>
        this.addInputSupport(support)
      );
    },
    addInputSupport(support) {
      this.btnLoading = true;
      supportService
        .addInputSupport(support)
        .then(() => {
          this.addActivity(
            { _id: this.selectedFarmerId, name: this.selectedName },
            'Support Added'
          );
          this.btnLoading = false;
          this.$emit('addedInput');
        })
        .catch((errors) => {
          this.btnLoading = false;
          this.errorMessage(errors.error);
        });
    },
    removeInputSupport(index) {
      this.inputSupportForm.inputSupport.splice(index, 1);
    },
  },
};
</script>
