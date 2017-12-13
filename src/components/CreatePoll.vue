<template>
  <div class="create-poll">
    <el-form :inline="true" :model="poll" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="poll.name" placeholder="Poll name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="createPoll">Activate</el-button>
      </el-form-item>
    </el-form>
    <h3>{{ this.voteUrl }}</h3>
    <el-button type="primary" @click="copyToClipboard">Copy URL to clipboard</el-button>
    <p><a :href="this.voteUrl" target="_blank" @click="copyToClipboard">Open</a></p>
    <p>This is your share link</p>
  </div>
</template>
<script>

import copy from 'copy-to-clipboard';
import ResultsNew from './ResultsNew';
import db from '../services/firebase';

const polls = db.ref('/');

export default {
  name: 'CreatePoll',
  data() {
    return {
      isLoading: true,
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
    voteUrl() {
      return `${location.href}vote-new/${this.poll.id}`;
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
      },
    },
  },
  methods: {
    createPoll() {
      this.poll.isActive = true;
      polls.child(this.poll.id).set(this.poll);
      this.$router.push(`/polls/${this.poll.id}`);
    },
    copyToClipboard() {
      copy(this.voteUrl);
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
