<template>
  <div style="margin-top:-40px;">
    <el-form
      v-loading="loading"
      label-position="top"
      label-width="100px"
      :model="editFamerDetails"
      :rules="rules"
      ref="editFamerDetails"
    >
      <el-tabs v-model="activeTab" class="mt-4 px-2" stretch type="card">
        <el-tab-pane name="personal">
          <span slot="label"><i class="el-icon-user"></i> Personal Bio</span>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="Title">
                <el-select
                  v-model="editFamerDetails.title"
                  style="width:100%; margin-top:-12px"
                >
                  <el-option label="Mr." value="Mr."></el-option>
                  <el-option label="Mrs." value="Mrs."></el-option>
                  <el-option label="Madam." value="Madam"></el-option>
                  <el-option label="Miss." value="Miss."></el-option>
                  <el-option label="Sir." value="Sir."></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="First Name" prop="firstName">
                <el-input v-model="editFamerDetails.firstName" />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="Last Name">
                <el-input v-model="editFamerDetails.lastName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="AKA">
                <el-input v-model="editFamerDetails.aka" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Date of Birth" prop="dob">
                <el-date-picker
                  type="date"
                  placeholder="Date of birth"
                  style="width: 100%; margin-top:-12px"
                  v-model="editFamerDetails.dob"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Phone Number" prop="phone">
                <el-input
                  v-model="editFamerDetails.phone"
                  placeholder="(054) 54153324"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Email Address">
                <el-input v-model="editFamerDetails.e_address" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Home Town">
                <el-input v-model="editFamerDetails.hometown" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Nationality" prop="nationality">
                <el-input
                  v-model="editFamerDetails.nationality"
                  placeholder="Ghanaian"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Community/Town of Residence">
                <el-input v-model="editFamerDetails.townOfResidence" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Residential Address">
                <el-input v-model="editFamerDetails.res_address" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Education" prop="education">
                <el-select
                  v-model="editFamerDetails.education"
                  placeholder="Select"
                  style="width:100%; margin-top:-12px"
                >
                  <el-option
                    v-for="item in education"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Name of FBO Membership">
                <el-input v-model="editFamerDetails.fboMember_name" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="National ID Type" prop="national_id">
                <el-select
                  v-model="editFamerDetails.national_id"
                  placeholder="Select"
                  style="width:100%; margin-top:-12px"
                >
                  <el-option
                    v-for="item in idcardTypes"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="ID Number" prop="id_number">
                <el-input v-model="editFamerDetails.id_number" />
              </el-form-item>
            </el-col> </el-row
          ><br />
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="d-flex">
                <div>
                  <img
                    :src="getImageFile(editFamerDetails.photo)"
                    alt="photo"
                    style="width:50px; margin-right: 20px"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    ref="photo"
                    style="display: none"
                    @change="updateImage($event, 'photo')"
                  />
                  <el-button @click="$refs.photo.click()" type="text">
                    <b style="color:#2fa512;"> Upload Photo</b></el-button
                  >
                  <p>
                    Photo should be in standard format JPG, PNG and no more than
                    2MB
                  </p>
                  <br />
                  <el-button
                    type="danger"
                    size="mini"
                    @click="editFamerDetails.photo = 'no-photo.jpg'"
                    >Remove Photo</el-button
                  >
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div>
                  <img
                    :src="getImageFile(editFamerDetails.idCard)"
                    alt="id card"
                    style="width:50px; margin-right: 20px"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    ref="idCard"
                    style="display: none"
                    @change="updateImage($event, 'idCard')"
                  />
                  <el-button @click="$refs.idCard.click()" type="text">
                    <b style="color:#2fa512;"> Upload ID Card</b></el-button
                  >
                  <p>
                    Photo should be photocopy of a national ID
                  </p>
                  <br />
                  <el-button
                    type="danger"
                    size="mini"
                    @click="editFamerDetails.idCard = 'no-photo.jpg'"
                    >Remove Photo</el-button
                  >
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div>
                  <img
                    :src="getImageFile(editFamerDetails.fingerprint)"
                    alt="finger print"
                    style="width:50px; margin-right: 20px"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    ref="fingerprint"
                    style="display: none"
                    @change="updateImage($event, 'fingerPrint')"
                  />
                  <el-button @click="$refs.fingerprint.click()" type="text">
                    <b style="color:#2fa512;">
                      Upload Thumbprint / Signature</b
                    ></el-button
                  >
                  <p>
                    Photo should be in standard format JPG, PNG and no more than
                    2MB
                  </p>
                  <br />
                  <el-button
                    type="danger"
                    size="mini"
                    @click="editFamerDetails.fingerprint = 'no-photo.jpg'"
                    >Remove Finger print</el-button
                  >
                </div>
              </div>
            </el-col> </el-row
          ><br />
          <div class="mt-3 d-flex">
            <el-button class="full-width" @click="handleContinue('household')"
              >Continue (Next tab)</el-button
            >
            <el-button
              class="full-width"
              type="primary"
              @click="updateFarmerDetails()"
              >Update Details</el-button
            >
          </div>
        </el-tab-pane>

        <!-- House Hold information -->
        <el-tab-pane name="household">
          <span slot="label"
            ><i class="el-icon-s-home"></i> Household Info</span
          >
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="Marital Status">
                <el-radio-group v-model="editFamerDetails.marital_status">
                  <el-radio
                    v-for="status in maritalStatus"
                    :key="status"
                    border
                    size="small"
                    :label="status"
                    >{{ status }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="married">
            <h3 class="mb-1">
              Spouse ( {{ editFamerDetails.spouse.length }} )
            </h3>
            <div
              v-for="(spouse, spIdx) in editFamerDetails.spouse"
              :key="spIdx"
            >
              <el-row :gutter="20">
                <el-col :span="7">
                  <el-form-item label="Spouse First Name">
                    <el-input v-model="spouse.firstName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="Spouse First Name">
                    <el-input v-model="spouse.lastName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="Date of Birth">
                    <el-date-picker
                      type="date"
                      placeholder="Date of birth"
                      style="width: 100%; margin-top:-12px"
                      v-model="spouse.dob"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <div class="button-add-details" v-if="spIdx > 0">
                    <i
                      class="el-icon-delete"
                      style="color: red; font-size: 20px;"
                    ></i>
                    <br />
                    <el-button
                      type="text"
                      size="mini"
                      @click="editFamerDetails.spouse.splice(spIdx, 1)"
                      >Delete</el-button
                    >
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="7">
                  <el-form-item label="Phone Number">
                    <el-input
                      v-model="spouse.phone"
                      placeholder="(054) 54153324"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="7"> </el-col>
                <el-col :span="7"> </el-col>
                <el-col :span="3">
                  <div class="button-add-details" v-if="spIdx < 1">
                    <i
                      class="el-icon-circle-plus"
                      style="color: grey; font-size: 20px;"
                    ></i>
                    <br />
                    <el-button
                      type="text"
                      size="mini"
                      @click="
                        addDuplicateField(editFamerDetails.spouse, 'spouse')
                      "
                      >Add Spouse</el-button
                    >
                  </div>
                </el-col>
              </el-row>
              <hr />
            </div>
          </div>
          <br />

          <!-- Children Information -->
          <h3 class="mb-1">
            Children ( {{ editFamerDetails.children.length }} )
          </h3>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="Number of Children">
                <el-input-number
                  v-model="editFamerDetails.num_children"
                  :min="0"
                  :max="10"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div v-for="(child, cIdx) in editFamerDetails.children" :key="cIdx">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Child's Name">
                  <el-input v-model="child.name" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="Child's Year of Birth">
                  <el-date-picker
                    v-model="child.dob"
                    type="year"
                    placeholder="Pick a year"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <div
                  class="button-add-details"
                  v-if="cIdx < 1"
                  @click="addDuplicateField(editFamerDetails.children, 'child')"
                >
                  <i
                    class="el-icon-circle-plus"
                    style="color: grey; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Add Children</el-button>
                </div>
                <div
                  class="button-add-details"
                  v-else
                  @click="editFamerDetails.children.splice(cIdx, 1)"
                >
                  <i
                    class="el-icon-delete"
                    style="color: red; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Delete</el-button>
                </div>
              </el-col>
            </el-row>
            <hr />
          </div>

          <br />
          <div class="mt-3 d-flex">
            <el-button class="full-width" @click="handleContinue('farm')"
              >Continue (Next tab)</el-button
            >
            <el-button
              class="full-width"
              type="primary"
              @click="updateFarmerDetails()"
              >Update Details</el-button
            >
          </div>
        </el-tab-pane>

        <!-- Farm Information -->
        <el-tab-pane name="farm">
          <span slot="label"
            ><i class="el-icon-map-location"></i> Farm Info</span
          >
          <h3 class="mb-1">Farm History</h3>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="Years of Farming">
                <el-input v-model="editFamerDetails.years_farming" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Type of Farmland Ownership">
                <el-input v-model="editFamerDetails.farmLandOwnershipType" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Total number of Farmland Cultivated">
                <el-input v-model="editFamerDetails.num_farmLands">
                  <template slot="append">acres</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="GEO Location">
                <el-input v-model="editFamerDetails.farm_location" />
              </el-form-item>
            </el-col>
          </el-row>
          <hr />
          <br />
          <h3 class="mb-1">
            Crop ( {{ editFamerDetails.harvestYield.length }} )
          </h3>
          <div
            v-for="(harvest, harvestIdx) in editFamerDetails.harvestYield"
            :key="harvestIdx"
          >
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Crop Name">
                  <el-input v-model="harvest.crop_name" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="Acres">
                  <el-input v-model="harvest.acres" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <div
                  class="button-add-details"
                  v-if="harvestIdx > 0"
                  @click="editFamerDetails.harvestYield.splice(harvestIdx, 1)"
                >
                  <i
                    class="el-icon-delete"
                    style="color: red; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Delete Crop</el-button>
                </div>
              </el-col>
            </el-row>
            <br />
            <h4 class="ml-1 mb-1">Harvest Yield Info</h4>
            <el-row :gutter="20" v-for="(year, i) in harvest.years" :key="i">
              <el-col :span="5">
                <el-form-item label="Year">
                  <el-select
                    v-model="year.year"
                    style="width:100%; margin-top:-12px"
                    placeholder="2021"
                  >
                    <el-option label="2019" value="2019"></el-option>
                    <el-option label="2020" value="2020"></el-option>
                    <el-option label="2021" value="2021"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Major Season(50kg/bag)">
                  <el-input
                    @input="setHarvestTotal(year)"
                    v-model.number="year.major_season_harvest"
                    placeholder="50kg/bag"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Minor Season(50kg/bag)">
                  <el-input
                    @input="setHarvestTotal(year)"
                    v-model.number="year.minor_season_harvest"
                    placeholder="50kg/bag"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Yearly Harvest">
                  <el-input
                    disabled
                    type="number"
                    v-model="year.yearly_harvest"
                    placeholder="In bags"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <div
                  class="button-add-details"
                  v-if="i < 1"
                  @click="addDuplicateField(harvest.years, 'years')"
                >
                  <i
                    class="el-icon-circle-plus"
                    style="color: grey; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Add Year</el-button>
                </div>
                <div
                  class="button-add-details"
                  v-else
                  @click="harvest.years.splice(i, 1)"
                >
                  <i
                    class="el-icon-delete"
                    style="color: red; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Remove Year</el-button>
                </div>
              </el-col>
            </el-row>
            <hr />
          </div>
          <br />
          <div>
            <el-button
              icon="el-icon-plus"
              type="info"
              class="full-width"
              @click="addCropHarvest"
              >Add Crop</el-button
            >
          </div>
          <br />
          <div class="mt-3 d-flex">
            <el-button class="full-width" @click="handleContinue('income')"
              >Continue (Next tab)</el-button
            >
            <el-button
              class="full-width"
              type="primary"
              @click="updateFarmerDetails()"
              >Update Details</el-button
            >
          </div>
        </el-tab-pane>

        <!-- Farm yield Income -->
        <el-tab-pane name="income">
          <span slot="label"
            ><i class="el-icon-grape"></i> Farm Yield Income</span
          >
          <h3 class="mb-1">
            Crop ( {{ editFamerDetails.harvestYield.length }} )
          </h3>
          <div
            v-for="(yieldIncome, idx) in editFamerDetails.harvestYield"
            :key="idx"
          >
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Crop Name">
                  <el-input v-model="yieldIncome.crop_name" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="Acres">
                  <el-input v-model="yieldIncome.acres" disabled />
                </el-form-item>
              </el-col>
            </el-row>

            <br />
            <h4 class="ml-1 mb-1">Yield Income</h4>
            <el-row
              :gutter="20"
              v-for="(year, yearindex) in yieldIncome.years"
              :key="yearindex"
            >
              <el-col :span="5">
                <el-form-item label="Year">
                  <el-input v-model="year.year" placeholder="2013" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Major Season">
                  <el-input
                    v-model.number="year.major_season_income"
                    @input="setYieldTotal(year)"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Minor Season">
                  <el-input
                    v-model.number="year.minor_season_income"
                    @input="setYieldTotal(year)"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Yearly Income">
                  <el-input type="number" v-model="year.yearly_income" disabled>
                    <template slot="prepend">GH₵</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <hr />
          </div>
          <br />
          <div class="mt-3 d-flex">
            <el-button class="full-width" @click="handleContinue('bank')"
              >Continue</el-button
            >
            <el-button
              class="full-width"
              type="primary"
              @click="updateFarmerDetails()"
              >Update Details</el-button
            >
          </div>
        </el-tab-pane>

        <!-- Bank Information -->
        <el-tab-pane name="bank">
          <span slot="label"><i class="el-icon-eleme"></i> Bank Details</span>
          <h3 class="mb-1">
            Banks Details ( {{ editFamerDetails.bank.length }} )
          </h3>
          <div
            v-for="(bank, bankIndex) in editFamerDetails.bank"
            :key="bankIndex"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="FSP type">
                  <el-radio-group
                    v-model="editFamerDetails.fsp_type"
                    @change="searchFsp"
                  >
                    <el-radio
                      v-for="fsp in fspTypes"
                      :key="fsp"
                      border
                      size="small"
                      :label="fsp"
                      >{{ fsp }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="FSP Name">
                  <el-select
                    v-model="bank.name"
                    clearable
                    filterable
                    allow-create
                    default-first-option
                    :loading="fspLoading"
                    style="width:100%; margin-top:-12px"
                  >
                    <el-option
                      v-for="b in fsps"
                      :key="b._id"
                      :label="b.name"
                      :value="b.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="Branch">
                  <el-input v-model="bank.branch" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="Swift Code">
                  <el-input
                    v-model="bank.swift_code"
                    placeholder="Leave empty is not provide"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Account Name">
                  <el-input v-model="bank.acc_name" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="Account Number">
                  <el-input v-model="bank.acc_number" />
                </el-form-item>
              </el-col>

              <el-col :span="4">
                <div
                  class="button-add-details"
                  v-if="bankIndex < 1"
                  @click="addDuplicateField(editFamerDetails.bank, 'bank')"
                >
                  <i
                    class="el-icon-circle-plus"
                    style="color: grey; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Add Bank</el-button>
                </div>
                <div
                  class="button-add-details"
                  v-else
                  @click="editFamerDetails.bank.splice(bankIndex, 1)"
                >
                  <i
                    class="el-icon-delete"
                    style="color: red; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Delete</el-button>
                </div>
              </el-col>
            </el-row>
            <hr />
          </div>
          <br />
          <!-- Mobile Money -->
          <h3 class="mb-1">
            Mobile Money Details ( {{ editFamerDetails.momo.length }} )
          </h3>
          <el-row
            :gutter="20"
            v-for="(momo, momoIndex) in editFamerDetails.momo"
            :key="momoIndex"
          >
            <el-col :span="7">
              <el-form-item label="Phone Number">
                <el-input v-model="momo.phone" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Name">
                <el-input v-model="momo.name" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Network">
                <el-select
                  v-model="momo.network"
                  style="width:100%; margin-top:-12px"
                >
                  <el-option label="MTN" value="MTN"></el-option>
                  <el-option label="Tigo" value="Tigo"></el-option>
                  <el-option label="Vodafone." value="Vodafone"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div
                class="button-add-details"
                v-if="momoIndex < 1"
                @click="addDuplicateField(editFamerDetails.momo, 'Momo')"
              >
                <i
                  class="el-icon-circle-plus"
                  style="color: grey; font-size: 20px;"
                ></i>
                <br />
                <el-button type="text" size="mini">Add MoMo</el-button>
              </div>
              <div
                class="button-add-details"
                v-else
                @click="editFamerDetails.momo.splice(momoIndex, 1)"
              >
                <i
                  class="el-icon-delete"
                  style="color: red; font-size: 20px;"
                ></i>
                <br />
                <el-button type="text" size="mini">Delete</el-button>
              </div>
            </el-col>
          </el-row>
          <br />
          <div class="mt-3 d-flex">
            <el-button class="full-width" @click="handleContinue('personal')"
              >Continue (Next tab)</el-button
            >
            <el-button
              class="full-width"
              type="primary"
              @click="updateFarmerDetails()"
              >Update Details</el-button
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import farmersService from '@/api/farmers';
import fspService from '@/api/fsps';
import { mapGetters } from 'vuex';

export default {
  name: 'EditFarmer',
  props: {
    farmer: Object,
  },
  data() {
    return {
      editFamerDetails: {
        title: '',
        firstName: '',
        lastName: '',
        aka: '',
        dob: '',
        phone: '',
        e_address: '',
        marital_status: 'Single',
        hometown: '',
        nationality: '',
        education: '',
        townOfResidence: '',
        res_address: '',
        fbo_position: '',
        fboMember_name: '',
        national_id: '',
        id_number: '',
        photo: '',
        fingerprint: '',
        idCard: '',
        num_children: 0,
        years_farming: 1,
        farmLandOwnershipType: '',
        num_farmLands: '',
        farm_location: '',
        fsp_type: 'Rural Bank',
        spouse: [
          {
            firstName: '',
            lastName: '',
            dob: '',
            phone: '',
          },
        ],
        children: [
          {
            name: '',
            dob: '',
          },
        ],
        harvestYield: [
          {
            crop_name: '',
            acres: '',
            years: [
              {
                year: '',
                major_season_harvest: 0,
                minor_season_harvest: 0,
                yearly_harvest: 0,
                major_season_income: 0,
                minor_season_income: 0,
                yearly_income: 0,
              },
            ],
          },
        ],
        bank: [
          {
            name: '',
            branch: '',
            acc_name: '',
            acc_number: '',
            swift_code: 'None',
          },
        ],
        momo: [
          {
            phone: '',
            name: '',
            network: '',
          },
        ],
      },
      loading: false,
      activeTab: 'personal',
      idcardTypes: [
        'Passport',
        'Voters ID',
        'Birth Certificate',
        'Health Insurance',
        'Ghana Card',
      ],
      education: [
        'Masters',
        'College Degree',
        'Professional Certificate',
        'WASSCE',
        'O/A Level',
        'Basic',
        'BECE',
        'None',
      ],
      queryParams: {
        type: '',
      },
      fspLoading: false,
      fsps: [],
      maritalStatus: ['Single', 'Married', 'Divorced', 'Windowed'],
      fspTypes: ['Savings & Loans', 'Bank', 'Rural Bank', 'Credit Union'],
      rules: {
        firstName: [
          {
            required: true,
            message: 'Please enter a name',
            trigger: ['blur', 'change'],
          },
          { min: 2, message: 'Length should be 5 or more', trigger: 'blur' },
        ],
        dob: [
          {
            required: true,
            message: 'Please enter a Date of birth',
            trigger: ['blur', 'change'],
          },
        ],
        national_id: [
          {
            required: true,
            message: 'Please enter valid national ID',
            trigger: ['blur', 'change'],
          },
        ],
        phone: [
          {
            required: true,
            message: 'Phone number field is required',
            trigger: ['blur', 'change'],
          },
        ],
      },
    };
  },
  created() {
    this.loading = true;
    this.getFarmerDetails();
  },
  computed: {
    married: function() {
      return this.editFamerDetails.marital_status == 'Married';
    },
    ...mapGetters({
      internetStatus: 'internetStatus',
    }),
  },
  beforeDestroy: function() {
    this.farmer = null;
  },
  methods: {
    getFarmerDetails() {
      this.editFamerDetails.id = this.farmer._id;
      this.editFamerDetails.title = this.farmer.title;
      this.editFamerDetails.firstName = this.farmer.firstName;
      this.editFamerDetails.lastName = this.farmer.lastName;
      this.editFamerDetails.name =
        this.editFamerDetails.firstName + ' ' + this.editFamerDetails.lastName;
      this.editFamerDetails.aka = this.farmer.aka;
      this.editFamerDetails.dob = this.farmer.dob;
      this.editFamerDetails.phone = this.farmer.phone;
      this.editFamerDetails.e_address = this.farmer.e_address;
      this.editFamerDetails.marital_status = this.farmer.marital_status;
      this.editFamerDetails.hometown = this.farmer.hometown;
      this.editFamerDetails.nationality = this.farmer.nationality;
      this.editFamerDetails.education = this.farmer.education;
      this.editFamerDetails.townOfResidence = this.farmer.townOfResidence;
      this.editFamerDetails.res_address = this.farmer.res_address;
      this.editFamerDetails.fbo_position = this.farmer.fbo_position;
      this.editFamerDetails.fboMember_name = this.farmer.fbo_position;
      this.editFamerDetails.national_id = this.farmer.national_id;
      this.editFamerDetails.id_number = this.farmer.id_number;
      this.editFamerDetails.photo = this.farmer.photo;
      this.editFamerDetails.fingerprint = this.farmer.fingerprint;
      this.editFamerDetails.idCard = this.farmer.idCard;
      this.editFamerDetails.num_children = this.farmer.num_children;
      this.editFamerDetails.years_farming = this.farmer.years_farming;
      this.editFamerDetails.farmLandOwnershipType = this.farmer.farmLandOwnershipType;
      this.editFamerDetails.farm_location = this.farmer.farm_location;
      this.editFamerDetails.num_children = this.farmer.num_children;
      this.editFamerDetails.years_farming = this.farmer.years_farming;
      this.editFamerDetails.num_farmLands = this.farmer.num_farmLands;
      this.editFamerDetails.spouse = this.farmer.spouse;
      this.editFamerDetails.fsp_type = this.farmer.fsp_type;
      this.editFamerDetails.children = this.farmer.children;
      this.editFamerDetails.harvestYield = this.farmer.harvestYield;
      this.editFamerDetails.bank = this.farmer.bank;
      this.editFamerDetails.momo = this.farmer.momo;

      this.loading = false;
    },
    updateFarmerDetails() {
      this.loading = true;
      this.$refs['editFamerDetails'].validate((valid) => {
        if (valid) {
          farmersService
            .updateFarmer(this.editFamerDetails)
            .then((response) => {
              this.addActivity(response.data, 'Edited');
              this.loading = false;
              this.successNotification('Success', 'Farmer edited successfully');
              this.$emit('editedFarmer');
            })
            .catch((errors) => {
              this.loading = false;
              this.errorMessage(errors.error);
            });
        } else {
          this.loading = false;
          return false;
        }
      });
    },
    searchFsp(type) {
      this.fspLoading = true;
      this.queryParams.type =
        type == 'Savings & Loans'
          ? 'sl'
          : type == 'Bank'
          ? 'bank'
          : type == 'Rural Bank'
          ? 'rural'
          : type == 'Credit Union'
          ? 'credit'
          : '';

      fspService.getFsps(this.queryParams).then((response) => {
        this.fsps = response.data;
        this.fspLoading = false;
      });
    },
    updateImage(e, type) {
      let self = this;
      const files = e.target.files;
      const formData = new FormData();
      formData.append('file', files[0]);
      farmersService
        .uploadFarmerFiles(formData)
        .then((response) => {
          if (type == 'photo') {
            self.editFamerDetails.photo = response.data;
          } else if (type == 'idCard') {
            self.editFamerDetails.idCard = response.data;
          } else if (type == 'fingerPrint') {
            self.editFamerDetails.fingerprint = response.data;
          }
          self.successNotification('Uploaded Successfully');
        })
        .catch((errors) => {
          self.errorMessage(errors.error);
        });
    },
    addCropHarvest() {
      this.infoMessage('Added another crop');
      this.editFamerDetails.harvestYield.push({ years: [{}] });
    },
    addCropYieldIncome() {
      this.infoMessage('Added another crop');
      this.editFamerDetails.yieldIncome.push({ years: [{}] });
    },
    setYieldTotal(year) {
      year.yearly_income = year.major_season_income + year.minor_season_income;
    },
    setHarvestTotal(year) {
      year.yearly_harvest =
        year.major_season_harvest + year.minor_season_harvest;
    },
    handleContinue(nextTab) {
      this.activeTab = nextTab;
    },
  },
};
</script>
