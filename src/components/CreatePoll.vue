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
    <h3>{{ this.hostUrl }}</h3>
    <p>This is your share link</p>
  </div>
</template>
<script>

import ResultsNew from './ResultsNew';
import db from '../services/firebase';

const polls = db.ref('/');

export default {
  name: 'CreatePoll',
  data() {
    return {
      isLoading: true,
      port: (process.env.SHOW_PORT) ? `:${process.env.PORT}` : '',
      host: process.env.HOST,
      poll: {
        id: polls.push().key,
        name: '',
        isActive: false,
        hasQuestions: false,
        questions: [],
      },
    };
  },
  computed: {
    hostUrl() {
      return `${this.host}${this.port}/#/vote-new/${this.poll.id}`;
    },
  },
  components: {
    ResultsNew,
  },
  firebase: {
    polls: {
      source: polls,
      readyCallback() {
        this.isLoading = false;
        // eslint-disable-next-line
        console.log(process.env.NODE_ENV);
        // eslint-disable-next-line
        console.log(process.env.FIREBASE_URL);
        // eslint-disable-next-line
        console.log(process.env.HOST);
        // eslint-disable-next-line
        console.log(process.env.SHOW_PORT);
        // eslint-disable-next-line
        console.log(process.env.PORT);
      },
    },
  },
  methods: {
    createPoll() {
      this.poll.isActive = true;
      polls.child(this.poll.id).set(this.poll);
      this.$router.push(`/polls/${this.poll.id}`);
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
