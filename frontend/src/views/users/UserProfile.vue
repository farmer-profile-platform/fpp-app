<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div>
          <div style="text-align:center;">
            <el-avatar
              :size="100"
              :src="getImageFile(user.profile_pic)"
            ></el-avatar>
            <div>
              <input
                type="file"
                ref="file"
                style="display: none"
                @change="getUserImage"
              />
              <el-button
                @click="$refs.file.click()"
                type="text"
                icon="el-icon-edit"
                :disabled="!isAdmin"
              >
                <b style="color:#2fa512;"> Update Photo</b></el-button
              >
            </div>
          </div>
          <el-button
            v-if="isAdmin"
            type="text"
            icon="el-icon-edit"
            @click="isEditing = true"
            size="mini"
            >Edit Details</el-button
          >
          <el-form :model="editForm" :rules="rules" ref="editForm">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item prop="name">
                  <el-input
                    v-model="editForm.name"
                    :disabled="!isEditing"
                    placeholder="Enter full name"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="role">
                  <el-select
                    placeholder="Select user role"
                    v-model="editForm.role"
                    :disabled="!isEditing"
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
                    v-model="editForm.email"
                    placeholder="@youremail.com"
                    :disabled="!isEditing"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="password">
                  <el-input
                    v-model="editForm.password"
                    type="password"
                    placeholder="********"
                    :disabled="!isEditing"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-button
              class="button_full"
              type="primary"
              icon="el-icon-plus"
              :disabled="!isEditing"
              @click="editUser"
              :loading="btnLoading"
              >Save Details</el-button
            >
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import userService from '../../api/users';

export default {
  name: 'UsersProfile',
  data() {
    return {
      btnLoading: false,
      isEditing: false,
      userId: null,
      editForm: {
        id: '',
        role: '',
        name: '',
        email: '',
        password: '',
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
            message: 'Select user role',
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
    this.userId = this.$route.params.id;
    this.getUser(this.userId);
  },
  methods: {
    getUser(id) {
      userService
        .getUser(id)
        .then((response) => {
          let user = response.data;
          this.editForm.name = user.name;
          this.editForm.role = user.role;
          this.editForm.email = user.email;
          this.editForm.password = '';
          this.editForm.id = user._id;
        })
        .catch((errors) => this.errorMessage(errors.error));
    },
    editUser() {
      let self = this;
      this.btnLoading = true;
      this.editForm.password === undefined || this.editForm.password == ''
        ? delete this.editForm.password
        : this.editForm;
      this.editForm.role == 'admin' ? delete this.editForm.role : this.editForm;
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          userService
            .updateUser(this.editForm)
            .then((response) => {
              self.$store.dispatch('get_user', response.data);
              self.isEditing = false;
              self.btnLoading = false;
              self.successNotification(
                'Success',
                'Updated profile successfully'
              );
            })
            .catch(() => {
              self.errorMessage('Error Editing user details');
            });
        } else {
          self.btnLoading = false;
          return false;
        }
      });
    },
    getUserImage(e) {
      const files = e.target.files;
      const formData = new FormData();
      formData.append('file', files[0]);
      userService
        .uploadUserPhoto(this.userId, formData)
        .then((response) => {
          this.$store.dispatch('update_pic', response.data);
          this.successNotification('Profile Pic Updated');
          setTimeout(function() {
            location.reload();
          }, 1000);
        })
        .catch((errors) => {
          this.errorMessage(errors.error);
        });
    },
  },
};
</script>
