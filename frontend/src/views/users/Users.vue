<template>
  <div>
    <el-button
      icon="el-icon-plus"
      plain
      type="primary"
      size="small"
      @click="showAddUserModal = true"
      >Add New User</el-button
    >
    <div>
      <el-input
        placeholder="Search farmers by entering keywords"
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
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        v-loading="tableLoading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        style="width: 100%"
      >
        <el-table-column label="User Info" width="280">
          <template slot-scope="props">
            <span style="float:left; margin-right: 10px;">
              <img
                :src="getImageFile(props.row.profile_pic)"
                alt=""
                style="width:40px;"
              />
            </span>
            <span>
              <b style="font-weight:bold; font-size: 16px">{{
                props.row.name
              }}</b>
              <br />
              <span style="font-size:12px;">{{ props.row.email }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Role">
          <template slot-scope="props">
            <el-button type="text" size="mini">
              <i class="el-icon-user"></i>
              {{ props.row.role }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="Status">
          <template slot-scope="props">
            <el-tag
              size="mini"
              :type="props.row.suspended ? 'danger' : 'success'"
            >
              {{ props.row.suspended ? 'User Suspended' : 'Active' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Last Active">
          <template slot-scope="props">
            <span>{{ getDateFormat(props.row.lastActive) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" width="300">
          <template slot-scope="props">
            <el-button
              :type="props.row.suspended ? 'success' : 'info'"
              plain
              size="mini"
              icon="el-icon-close"
              @click="confirmSuspend(props.row.suspended, props.row._id)"
              >{{ props.row.suspended ? 'Activate' : 'Suspend' }}</el-button
            >
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showEditForm(props.row)"
            />
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="confirmDelete(props.row._id)"
            />
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

    <!-- Add user Dialog -->
    <el-dialog
      :visible.sync="showAddUserModal"
      width="30%"
      title="Add a new system user"
    >
      <el-form :model="addUserForm" :rules="rules" ref="addUserForm">
        <el-row :gutter="24">
          <el-col :span="24">
            <div style="text-align:center;">
              <el-avatar
                :size="100"
                :src="getImageFile(addUserForm.profile_pic)"
              ></el-avatar>
              <div>
                <input
                  type="file"
                  ref="addPic"
                  style="display: none"
                  @change="getUserImage($event, 'add')"
                />
                <el-button
                  @click="$refs.addPic.click()"
                  type="text"
                  icon="el-icon-edit"
                >
                  <b style="color:#2fa512;"> Update Photo</b></el-button
                >
              </div>
            </div>
            <el-form-item prop="name">
              <el-input
                v-model="addUserForm.name"
                placeholder="Enter full name"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="role">
              <el-select
                placeholder="Select user role"
                v-model="addUserForm.role"
                style="width:100%; margin-top:-12px"
              >
                <el-option label="Editor" value="editor"></el-option>
                <el-option label="User" value="user"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="email">
              <el-input
                v-model="addUserForm.email"
                placeholder="@youremail.com"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="password">
              <el-input
                v-model="addUserForm.password"
                type="password"
                placeholder="********"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-button
          class="button_full"
          type="primary"
          icon="el-icon-plus"
          @click="addUser"
          :loading="btnLoading"
          >Add User</el-button
        >
      </el-form>
    </el-dialog>

    <!-- Edit user Dialog -->
    <el-dialog
      :visible.sync="showEditUserModal"
      width="30%"
      title="Edit user details"
    >
      <el-form :model="editUserForm" :rules="rules" ref="editUserForm">
        <el-row :gutter="24">
          <el-col :span="24">
            <div style="text-align:center;">
              <el-avatar
                :size="100"
                :src="getImageFile(editUserForm.profile_pic)"
              ></el-avatar>
              <div>
                <input
                  type="file"
                  ref="editPic"
                  style="display: none"
                  @change="getUserImage($event, 'edit')"
                />
                <el-button
                  @click="$refs.editPic.click()"
                  type="text"
                  icon="el-icon-edit"
                >
                  <b style="color:#2fa512;"> Update Photo</b></el-button
                >
              </div>
            </div>
            <el-form-item prop="name">
              <el-input
                v-model="editUserForm.name"
                placeholder="Enter full name"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="role">
              <el-select
                placeholder="Select user role"
                v-model="editUserForm.role"
                style="width:100%; margin-top:-12px"
              >
                <el-option label="Editor" value="editor"></el-option>
                <el-option label="User" value="user"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="email">
              <el-input
                v-model="editUserForm.email"
                placeholder="@youremail.com"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-input
                v-model="editUserForm.password"
                type="password"
                placeholder="********"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-button
          class="button_full"
          type="primary"
          icon="el-icon-plus"
          @click="editUser"
          :loading="btnLoading"
          >Update Details</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import userService from '../../api/users';
import { mapGetters } from 'vuex';

export default {
  name: 'Users',
  data() {
    return {
      tableData: [],
      tableLoading: false,
      showAddUserModal: false,
      showEditUserModal: false,
      btnLoading: false,
      addUserForm: {
        role: 'user',
        name: '',
        email: '',
        password: '',
        profile_pic: 'no-photo.jpg',
      },
      editUserForm: {
        id: '',
        role: '',
        name: '',
        email: '',
        password: '',
        profile_pic: 'no-photo.jpg',
      },
      rules: {
        role: [
          {
            required: true,
            message: 'Select user role',
            trigger: ['blur', 'change'],
          },
        ],
        name: [
          {
            required: true,
            message: 'Select user name',
            trigger: 'blur',
          },
        ],
        email: [
          {
            type: 'email',
            required: true,
            message: 'Email is required',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please enter password',
            trigger: 'blur',
          },
          {
            min: 6,
            message: 'Length should be 6 or more characters',
            trigger: 'change',
          },
        ],
      },
      search: '',
      currentPage: 1,
      total: 3,
    };
  },
  created() {
    this.getUsers();
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  methods: {
    getUsers() {
      let self = this;
      this.tableLoading = true;
      userService
        .getUsers()
        .then((response) => {
          this.tableLoading = false;
          let users = response.data.filter(function(user) {
            return user.id !== self.user.id;
          });
          this.tableData = users;
          this.total = this.tableData.length;
        })
        .catch((errors) => {
          self.errorMessage(errors.error);
          self.tableLoading = false;
        });
    },
    addUser() {
      this.btnLoading = true;
      this.$refs['addUserForm'].validate((valid) => {
        if (valid) {
          userService
            .addUser(this.addUserForm)
            .then(() => {
              this.btnLoading = false;
              this.showAddUserModal = false;
              this.getUsers();
            })
            .catch(() => {
              this.btnLoading = false;
              this.errorMessage('User error');
            });
        } else {
          this.btnLoading = false;
          return false;
        }
      });
    },
    showEditForm(user) {
      this.editUserForm.name = user.name;
      this.editUserForm.role = user.role;
      this.editUserForm.email = user.email;
      this.editUserForm.password = '';
      this.editUserForm.id = user._id;
      this.editUserForm.profile_pic = user.profile_pic;
      this.showEditUserModal = true;
    },
    editUser() {
      this.btnLoading = true;
      this.editUserForm.password === undefined ||
      this.editUserForm.password == ''
        ? delete this.editUserForm.password
        : this.editUserForm;
      this.editUserForm.role == 'admin'
        ? delete this.editUserForm.role
        : this.editUserForm;
      this.$refs['editUserForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = false;
          userService
            .updateUser(this.editUserForm)
            .then((response) => {
              if (this.user._id == this.editUserForm.id) {
                this.$store.dispatch('get_user', response.data);
              }
              this.btnLoading = false;
              this.showEditUserModal = false;
              this.getUsers();
              this.successNotification(
                'Success',
                'Updated profile successfully'
              );
            })
            .catch(() => {
              self.errorMessage('Error Editing user details');
            });
        }
      });
    },
    confirmDelete(id) {
      this.$confirm(
        'This will permanently delete the user from the system',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          this.deleteUser(id);
        })
        .catch(() => {
          this.errorMessage('Delete cancelled');
        });
    },
    deleteUser(id) {
      userService
        .deleteUser(id)
        .then(() => {
          this.successNotification('Success', 'User deleted successfully');
          this.getUsers();
        })
        .catch((errors) => this.errorMessage(errors.error));
    },
    confirmSuspend(status, id) {
      let message;
      if (status == true) {
        message = 'Are you sure you want to activate user';
      } else {
        message = 'This will temporary suspend user for 30days';
      }
      this.$confirm(message, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          this.suspendUser(status, id);
        })
        .catch(() => {
          this.errorMessage('Suspention cancelled');
        });
    },
    suspendUser(status, id) {
      let user = {};
      user.id = id;
      user.suspended = status === true ? false : true;
      userService
        .updateUser(user)
        .then(() => {
          this.successNotification(
            'Success',
            'User status changed successfully'
          );
          this.getUsers();
        })
        .catch((errors) => {
          this.errorMessage(errors.error);
        });
    },
    getUserImage(e, action) {
      const files = e.target.files;
      const formData = new FormData();
      formData.append('file', files[0]);
      userService
        .uploadUserPhoto(this.editUserForm.id, formData)
        .then((response) => {
          if (action == 'add') {
            this.addUserForm.profile_pic = response.data;
          } else {
            this.editUserForm.profile_pic = response.data;
          }
          this.successNotification('Uploaded Successfully');
        })
        .catch((errors) => {
          this.errorMessage(errors.error);
        });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
  },
};
</script>
