<template>
  <div class="create-poll">
    <el-form :inline="true" :model="poll" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="poll.name" placeholder="Poll name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createPoll">Activate</el-button>
      </el-form-item>
    </el-form>
    <h3>TODO:Link should be generated on refresh</h3>
    <p>This is your share link</p>

    <el-form :inline="true" :model="question" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="question.first.value" placeholder="Option A"></el-input>
      </el-form-item>
      OR
       <el-form-item>
        <el-input v-model="question.second.value" placeholder="Option B"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addQuestion">Publish</el-button>
      </el-form-item>
    </el-form>
    <ul class="polls">
      <li v-for="question in poll.questions">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-button style="float: right; padding: 3px" type="text">Remove question</el-button>
          </div>
          <el-row>
            <ResultsNew></ResultsNew>
          </el-row>
        </el-card>
      </li>
    </ul>
  </div>
</template>
<script>

import ResultsNew from './ResultsNew';

export default {
  name: 'CreatePoll',
  data() {
    return {
      isLoading: true,
      poll: {
        name: '',
        url: '',
        isActive: false,
        questions: [],
      },
      question: {
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
  components: {
    ResultsNew,
  },
  methods: {
    createPoll() {
      // eslint-disable-next-line
      // console.log(polls)
    },
    addQuestion() {
      this.poll.questions.push(this.question);
    },
  },
};
</script>
<style scoped>
h1, h2, h3 {
  margin: 0;
}
.polls {
  max-width: 600px;
  margin: auto;
  list-style: none;
}
.box-card {
  margin: 10px;
}
</style>
