<template>
  <div class="poll" v-loading="isLoading">
    <el-card class="box-card" v-if="!this.isLoading">
      <div v-if="!this.isVoted">
        <el-button type="text" @click="vote(activeQuestion, 'first')">{{activeQuestion.first.value}}</el-button>
        <span>or</span>
        <el-button type="text" @click="vote(activeQuestion, 'second')">{{activeQuestion.second.value}}</el-button>
      </div>
      <el-row v-else>
        <ResultsNew :pollId="poll['.key']"></ResultsNew>
      </el-row>
    </el-card>
  </div>
</template>
<script>

import db from '../services/firebase';
import ResultsNew from './ResultsNew';

export default {
  name: 'VoteNew',
  data() {
    return {
      isLoading: true,
      isVoted: false,
    };
  },
  components: {
    ResultsNew,
  },
  firebase() {
    return {
      poll: {
        source: db.ref().child(`/${this.$route.params.id}`),
        asObject: true,
        readyCallback() {
          this.isLoading = false;
        },
      },
    };
  },
  computed: {
    activeQuestion() {
      return this.poll.questions.filter(question => (question.isActive))[0];
    },
  },
  methods: {
    vote(question, choice) {
      const pollRef = db.ref().child(`/${this.$route.params.id}`);
      this.isVoted = true;
      pollRef.transaction((poll) => {
        const updatedPoll = poll;
        if (poll) {
          const results = poll.questions.map(() => {
            const updatedQuestion = question;
            if (question.isActive) {
              updatedQuestion[choice].votes += 1;
            }
            return updatedQuestion;
          });
          updatedPoll.questions = results;
        }
        return updatedPoll;
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
