<template>
  <div>
    <span @click="userProfile(user._id, user.name)" class="pointer"
      >{{ user.name }} <el-tag size="mini">{{ capitalize(user.role) }}</el-tag>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
};
</script>
