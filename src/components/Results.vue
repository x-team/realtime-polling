<template>
  <div v-loading="isLoading">
    <div v-if="!this.isLoading">
      <el-col :span="12">
        <h2 class="grid-content blue">
          {{ activeQuestion.first.value }}
        </h2>
        <h3 class="grid-content">
          {{ activeQuestion.first.votes }} votes
        </h3>
      </el-col>
      <el-col :span="12">
        <h2 class="grid-content green">
          {{ activeQuestion.second.value }}
        </h2>
        <h3 class="grid-content">
          {{ activeQuestion.second.votes }} votes
        </h3>
      </el-col>
      <el-col :span="24" class="bar-container">
        <div v-bind:style="{width: activeQuestion.first.votes / (activeQuestion.first.votes + activeQuestion.second.votes) * 100 + '%' }" class="bar bg-blue"/>
        <div v-bind:style="{width: activeQuestion.second.votes / (activeQuestion.first.votes + activeQuestion.second.votes) * 100 + '%' }" class="bar bg-green"/>
      </el-col>
      You voted for <span v-bind:class="{ 'blue': isFirstChoice(activeQuestion, choice), 'green': isSecondChoice(activeQuestion, choice)}">{{ activeQuestion[choice].value }}</span>
    </div>
  </div>
</template>
<script>

import db from '../services/firebase';

export default {
  name: 'Results',
  props: ['pollId', 'choice'],
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    activeQuestion() {
      return this.poll.questions.filter(question => (question.isActive))[0];
    },
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
    isFirstChoice(activeQuestion, choice) {
      return activeQuestion[choice].value === activeQuestion.first.value;
    },
    isSecondChoice(activeQuestion, choice) {
      return activeQuestion[choice].value === activeQuestion.second.value;
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
