<template>
  <div v-loading="isLoading">
    <div v-if="!this.isLoading">
      <el-col :span="12">
        <h2 class="grid-content blue">
          {{ question.first.value }}
        </h2>
        <h3 class="grid-content">
          {{ question.first.votes }} votes
        </h3>
      </el-col>
      <el-col :span="12">
        <h2 class="grid-content green">
          {{ question.second.value }}
        </h2>
        <h3 class="grid-content">
          {{ question.second.votes }} votes
        </h3>
      </el-col>
      <el-col :span="24" class="bar-container">
        <div v-bind:style="{width: question.first.votes / (question.first.votes + question.second.votes) * 100 + '%' }" class="bar bg-blue"/>
        <div v-bind:style="{width: question.second.votes / (question.first.votes + question.second.votes) * 100 + '%' }" class="bar bg-green"/>
      </el-col>
      <p v-if="choice">You voted for <span v-bind:class="{ 'blue': isFirstChoice(choice), 'green': isSecondChoice(choice)}">{{ question[choice].value }}</span></p>
    </div>
  </div>
</template>
<script>

import db from '../services/firebase';
/* eslint-disable */
export default {
  name: 'Results',
  props: ['question', 'choice'],
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
  methods: {
    isFirstChoice(choice) {
      return choice === 'first';
    },
    isSecondChoice(choice) {
      return choice === 'second';
    },
  },
};
</script>
<style scoped>
.polls {
  max-width: 600px;
  margin: auto;
  list-style: none;
}
.green {
  color: #67C23A;
}
.blue {
  color: #409EFF;
}
span {
  font-weight: bold;
}
.bg-green {
  background-color: #67C23A;
}
.bg-blue {
  background-color: #409EFF;
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
