<template>
  <div class="poll" v-loading="isLoading">
    <el-card class="box-card" v-if="!this.isLoading">
      <div v-if="!this.isVoted">
        <el-button type="text" @click="vote(poll, 'first')">{{poll.first.value}}</el-button>
        <el-button type="text" @click="vote(poll, 'second')">{{poll.second.value}}</el-button>
      </div>
      <el-row v-else>
        <results :pollId="poll['.key']"></results>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import db from '../services/firebase';
import Results from './Results.vue';

const polls = db.ref('/');

export default {
  name: 'Vote',
  data() {
    return {
      isLoading: true,
      isVoted: false,
    };
  },
  components: {
    Results,
  },
  firebase: {
    polls: {
      source: polls,
      readyCallback() {
        this.isLoading = false;
        this.poll = this.polls.filter(poll => poll['.key'] === this.$route.params.id)[0];
      },
    },
  },
  methods: {
    vote(poll, choice) {
      this.isVoted = true;

      this.poll[choice].votes += 1;

      db.ref(`/${this.$route.params.id}/${choice}`).set({
        votes: poll[choice].votes,
        value: poll[choice].value,
      });
    },
  },
};
</script>
<style scoped>
.poll {
  max-width: 600px;
  margin: auto;
  list-style: none;
}
</style>