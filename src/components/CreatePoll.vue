<template>
  <div class="add-poll">
    <h1>Create poll</h1>
    <el-form :inline="true" :model="poll" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="poll.first.value" placeholder="Poll name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Activate</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'CreatePoll',
  data() {
    return {
      isLoading: true,
      poll: {
        isOpen: true,
        first: {
          value: '',
          votes: 0,
        },
        second: {
          value: '',
          votes: 0,
        },
      },
    };
  },
  methods: {
    onSubmit() {
      // eslint-disable-next-line
      console.log('submitted');
    },
  },
};
</script>
<style scoped>
h1, h2, h3 {
  margin: 0;
}
</style>
