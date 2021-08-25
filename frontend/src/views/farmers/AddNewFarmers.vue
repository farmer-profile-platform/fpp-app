<template>
  <div style="margin-top:-40px;">
    <el-form
      label-position="top"
      label-width="100px"
      :model="addFamerDetails"
      :rules="rules"
      ref="addFamerDetails"
    >
      <el-tabs
        v-model="activeTab"
        class="mt-4 px-2"
        stretch
        type="card"
        v-loading="loading"
      >
        <el-tab-pane name="personal">
          <span slot="label"><i class="el-icon-user"></i> Personal Bio</span>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="Title">
                <el-select
                  v-model="addFamerDetails.title"
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
                <el-input v-model="addFamerDetails.firstName" />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="Last Name">
                <el-input v-model="addFamerDetails.lastName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="AKA">
                <el-input v-model="addFamerDetails.aka" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Date of Birth" prop="dob">
                <el-date-picker
                  type="date"
                  placeholder="Date of birth"
                  style="width: 100%; margin-top:-12px"
                  v-model="addFamerDetails.dob"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Phone Number" prop="phone">
                <el-input
                  v-model="addFamerDetails.phone"
                  placeholder="(054) 54153324"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="Email Address">
                <el-input v-model="addFamerDetails.e_address" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Home Town">
                <el-input v-model="addFamerDetails.hometown" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Nationality" prop="nationality">
                <el-input
                  v-model="addFamerDetails.nationality"
                  placeholder="Ghanaian"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Education" prop="education">
                <el-select
                  v-model="addFamerDetails.education"
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
              <el-form-item label="Community/Town of Residence">
                <el-input v-model="addFamerDetails.townOfResidence" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Residential Address">
                <el-input v-model="addFamerDetails.res_address" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="FBO Membership Position">
                <el-input v-model="addFamerDetails.fbo_position" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Name of FBO Membership">
                <el-input v-model="addFamerDetails.fboMember_name" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="National ID Type" prop="national_id">
                <el-select
                  v-model="addFamerDetails.national_id"
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
                <el-input v-model="addFamerDetails.id_number" />
              </el-form-item>
            </el-col> </el-row
          ><br />
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="d-flex">
                <div>
                  <img
                    :src="getImageFile(addFamerDetails.photo)"
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
                    <b style="color:#2fa512;">
                      <i class="el-icon-upload"></i> Upload Photo</b
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
                    @click="addFamerDetails.photo = 'no-photo.jpg'"
                  >
                    Remove Photo
                  </el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div>
                  <img
                    :src="getImageFile(addFamerDetails.idCard)"
                    alt="photo"
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
                    <b style="color:#2fa512;">
                      <i class="el-icon-upload"></i>
                      Upload Id Card
                    </b>
                  </el-button>
                  <p>
                    Photo should be photocopy of a national ID
                  </p>
                  <br />
                  <el-button
                    type="danger"
                    size="mini"
                    @click="addFamerDetails.idCard = 'no-photo.jpg'"
                  >
                    Remove ID card
                  </el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div>
                  <img
                    :src="getImageFile(addFamerDetails.fingerprint)"
                    alt="photo"
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
                      <i class="el-icon-upload"></i> Upload Thumbprint /
                      Signature</b
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
                    @click="addFamerDetails.fingerprint = 'no-photo.jpg'"
                    >Remove Finger print</el-button
                  >
                </div>
              </div>
            </el-col> </el-row
          ><br />
          <div class="mt-3 mb-3 d-flex">
            <el-button class="full-width">Cancel and reset form</el-button>
            <el-button
              class="full-width"
              type="primary"
              @click="handleContinue('household')"
              >Save and Continue</el-button
            >
          </div>
        </el-tab-pane>

        <!-- House Hold information -->
        <el-tab-pane name="household">
          <span slot="label"
            ><i class="el-icon-s-home"></i> Household Info</span
          >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Marital Status">
                <el-radio-group v-model="addFamerDetails.marital_status">
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
            <h3 class="mb-1">Spouse ( {{ addFamerDetails.spouse.length }} )</h3>
            <div v-for="(spouse, spIdx) in addFamerDetails.spouse" :key="spIdx">
              <el-row :gutter="20">
                <el-col :span="7">
                  <el-form-item label="Spouse First Name">
                    <el-input v-model="spouse.firstName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="Spouse Last Name">
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
                      @click="addFamerDetails.spouse.splice(spIdx, 1)"
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
                        addDuplicateField(addFamerDetails.spouse, 'spouse')
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
            Children ( {{ addFamerDetails.children.length }} )
          </h3>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="Number of Children">
                <el-input-number
                  v-model="addFamerDetails.num_children"
                  :min="0"
                  :max="100"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div v-for="(child, cIdx) in addFamerDetails.children" :key="cIdx">
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
                  @click="addDuplicateField(addFamerDetails.children, 'child')"
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
                  @click="addFamerDetails.children.splice(cIdx, 1)"
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
          <div class="mt-3 mb-3 d-flex">
            <el-button class="full-width">Cancel and reset form</el-button>
            <el-button
              class="full-width"
              type="primary"
              @click="handleContinue('farm')"
              >Continue</el-button
            >
          </div>
        </el-tab-pane>

        <!-- Farm Information -->
        <el-tab-pane name="farm">
          <span slot="label">
            <i class="el-icon-map-location"></i>
            Farm Info
          </span>
          <h3 class="mb-1">Farm History</h3>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="Years of Farming">
                <el-input-number v-model="addFamerDetails.years_farming" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Type of Farmland Ownership">
                <el-input v-model="addFamerDetails.farmLandOwnershipType" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Total Num. of Farmland Cultivated">
                <el-input type="number" v-model="addFamerDetails.num_farmLands">
                  <template slot="append">acres</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="GEO Location">
                <el-input v-model="addFamerDetails.farm_location" />
              </el-form-item>
            </el-col>
          </el-row>
          <hr />
          <br />
          <h3 class="mb-1">
            Crop ( {{ addFamerDetails.harvestYield.length }} )
          </h3>
          <div
            v-for="(harvest, harvestIdx) in addFamerDetails.harvestYield"
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
                  <el-input type="number" v-model="harvest.acres">
                    <template slot="append">acres</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <div
                  class="button-add-details"
                  v-if="harvestIdx > 0"
                  @click="addFamerDetails.harvestYield.splice(harvestIdx, 1)"
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
                <el-form-item label="Minor Season (50kg/bag)">
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
            <el-button class="full-width">Cancel and reset form</el-button>
            <el-button
              class="full-width"
              type="primary"
              @click="handleContinue('income')"
              >Continue</el-button
            >
          </div>
        </el-tab-pane>

        <!-- Farm yield Income -->
        <el-tab-pane name="income">
          <span slot="label">
            <i class="el-icon-grape"></i>
            Farm Yield Income
          </span>
          <h3 class="mb-1">
            Crop ( {{ addFamerDetails.harvestYield.length }} )
          </h3>
          <div
            v-for="(yieldIncome, idx) in addFamerDetails.harvestYield"
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
                  <el-input type="number" v-model="yieldIncome.acres" disabled>
                    <template slot="append">acres</template>
                  </el-input>
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
                  <el-input
                    type="number"
                    v-model="year.year"
                    placeholder="2013"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Major Season">
                  <el-input
                    v-model.number="year.major_season_income"
                    @input="setYieldTotal(year)"
                  >
                    <template slot="prepend">GH₵</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Minor Season">
                  <el-input
                    v-model.number="year.minor_season_income"
                    @input="setYieldTotal(year)"
                  >
                    <template slot="prepend">GH₵</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Yearly Income">
                  <el-input type="number" v-model="year.yearly_income" disabled
                    ><template slot="prepend">GH₵</template></el-input
                  >
                </el-form-item>
              </el-col>
            </el-row>
            <hr />
          </div>
          <br />
          <div class="mt-3 mb-3 d-flex">
            <el-button class="full-width">Cancel</el-button>
            <el-button
              class="full-width"
              type="primary"
              @click="handleContinue('bank')"
              >Continue</el-button
            >
          </div>
        </el-tab-pane>

        <!-- Bank Information -->
        <el-tab-pane name="bank">
          <span slot="label"><i class="el-icon-eleme"></i> Bank Details</span>
          <h3 class="mb-1">
            Banks Details ( {{ addFamerDetails.bank.length }} )
          </h3>
          <div
            v-for="(bank, bankIndex) in addFamerDetails.bank"
            :key="bankIndex"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="FSP type">
                  <el-radio-group
                    v-model="addFamerDetails.fsp_type"
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
                  @click="addDuplicateField(addFamerDetails.bank, 'bank')"
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
                  @click="addFamerDetails.bank.splice(bankIndex, 1)"
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
            Mobile Money Details ( {{ addFamerDetails.momo.length }} )
          </h3>
          <el-row
            :gutter="20"
            v-for="(momo, momoIndex) in addFamerDetails.momo"
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
                  <el-option
                    label="Airtel Tigo"
                    value="Airtel Tigo"
                  ></el-option>
                  <el-option label="Vodafone." value="Vodafone"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div
                class="button-add-details"
                v-if="momoIndex < 1"
                @click="addDuplicateField(addFamerDetails.momo, 'Momo')"
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
                @click="addFamerDetails.momo.splice(momoIndex, 1)"
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
          <div class="mt-3 mb-3 d-flex">
            <el-button class="full-width" icon="el-icon-cancel"
              >Cancel</el-button
            >
            <el-button
              class="full-width"
              type="primary"
              @click="confirmFarmerAddition()"
              >Add a new farmer</el-button
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
  name: 'AddNewFarmers',
  data() {
    return {
      addFamerDetails: {
        title: '',
        firstName: '',
        lastName: '',
        aka: '',
        dob: '',
        phone: '',
        e_address: '',
        marital_status: 'Single',
        hometown: '',
        nationality: 'Ghanaian',
        education: '',
        townOfResidence: '',
        res_address: '',
        fbo_position: '',
        fboMember_name: '',
        national_id: '',
        id_number: '',
        photo: 'no-photo.jpg',
        fingerprint: 'no-photo.jpg',
        idCard: 'no-photo.jpg',
        num_children: 0,
        years_farming: 1,
        farmLandOwnershipType: '',
        num_farmLands: 0,
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
            acres: 0,
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
            acc_number: '000',
            swift_code: 'None',
          },
        ],
        momo: [
          {
            phone: '024444444',
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
          { min: 2, message: 'Length should be 2 or more', trigger: 'blur' },
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
        education: [
          {
            required: true,
            message: 'Enter education qualification',
            trigger: ['blur', 'change'],
          },
        ],
      },
    };
  },
  computed: {
    married: function() {
      return this.addFamerDetails.marital_status == 'Married';
    },
    ...mapGetters({
      internetStatus: 'internetStatus',
    }),
  },
  methods: {
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

      fspService
        .getFsps(this.queryParams)
        .then((response) => {
          this.fsps = response.data;
          this.fspLoading = false;
        })
        .catch((errors) => {
          this.errorMessage(errors.error);
          this.fspLoading = false;
        });
    },
    addCropHarvest() {
      this.infoMessage('Added another crop');
      this.addFamerDetails.harvestYield.push({ years: [{}] });
    },
    updateImage(e, type) {
      let self = this;
      const files = e.target.files;
      const formData = new FormData();
      formData.append('file', files[0]);

      // console.log(files[0]);

      if (this.internetStatus == true) {
        farmersService
          .uploadFarmerFiles(formData)
          .then((response) => {
            if (type == 'photo') {
              self.addFamerDetails.photo = response.data;
            } else if (type == 'idCard') {
              self.addFamerDetails.idCard = response.data;
            } else if (type == 'fingerPrint') {
              self.addFamerDetails.fingerprint = response.data;
            }
            self.successNotification('Uploaded Successfully');
          })
          .catch((errors) => {
            self.errorMessage(errors.error);
          });
      } else {
        let file = files[0];
        // let urlSrc = URL.createObjectURL(file);
        self.updateImageOffline(type, file);
      }
    },
    updateImageOffline(type, file) {
      let self = this;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      if (file['size'] < 2111775) {
        if (type == 'photo') {
          reader.onloadend = () => {
            self.addFamerDetails.photo = reader.result;
            self.addFamerDetails.photoFileName = file['name'];
          };
        } else if (type == 'idCard') {
          reader.onloadend = () => {
            self.addFamerDetails.idCard = reader.result;
            self.addFamerDetails.idCardFileName = file['name'];
          };
        } else if (type == 'fingerPrint') {
          reader.onloadend = () => {
            self.addFamerDetails.fingerprint = reader.result;
            self.addFamerDetails.fingerprintFileName = file['name'];
          };
        }
        this.successNotification('Uploaded Successfully');
      } else {
        this.$alert('Use images less than 2megabyte', 'Error', {
          confirmButtonText: 'OK',
          type: 'warning',
        });
      }
    },
    confirmFarmerAddition() {
      this.$confirm(
        'Are you sure you want add data to famers profile',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          this.$refs['addFamerDetails'].validate((valid) => {
            if (valid) {
              this.addFarmer();
            } else {
              this.errorMessage('Make sure all required fields are filled');
              return false;
            }
          });
        })
        .catch(() => {
          this.errorMessage('Farmer not added, contact admin');
        });
    },
    addFarmer() {
      this.loading = true;
      if (this.internetStatus === true) {
        farmersService
          .addFarmer(this.addFamerDetails)
          .then((response) => {
            this.addActivity(response.data, 'Added');
            this.loading = false;
            this.successNotification('Success', 'Farmer added successfully');
            this.$emit('addedFarmer');
          })
          .catch(() => {
            this.loading = false;
            this.errorMessage('Failed to save farmer data, contact admin');
          });
      } else {
        this.loading = false;
        this.$store.dispatch('addFarmerOffline', this.addFamerDetails);
        this.successNotification('Success', 'Farmer added successfully');
        this.$emit('addedFarmer');
      }
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
