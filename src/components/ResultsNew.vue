<template>
  <div v-loading="isLoading">
    <div v-if="!this.isLoading">
      <el-col :span="12">
        <h2 class="grid-content">
          {{ question.first.value }}
        </h2>
        <h3 class="grid-content">
          {{ question.first.votes }} votes
        </h3>
      </el-col>
      <el-col :span="12">
        <h2 class="grid-content">
          {{ question.second.value }}
        </h2>
        <h3 class="grid-content">
          {{ question.second.votes }} votes
        </h3>
      </el-col>
    </div>
  </div>
</template>
<script>

import db from '../services/firebase';

export default {
  name: 'ResultsNew',
  props: ['pollId', 'questionId'],
  data() {
    return {
      isLoading: false,
    };
  },
  firebase() {
    return {
      poll: {
        source: db.ref().child(`/${this.pollId}`),
        asObject: true,
        readyCallback() {
          this.isLoading = false;
        },
      },
    };
  },
};
</script>
<style scoped>
.polls {
  max-width: 600px;
  margin: auto;
  list-style: none;
}
.bg-red {
  background-color: #409EFF;
}
.bg-blue {
  background-color: #67C23A;
}
.bar {
  height: 20px;
  margin-top: 5px;
}
.bar-container {
  display: flex;
  margin: 10px 0 30px;
}
</style>
