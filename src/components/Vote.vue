<template>
  <div class="poll" v-loading="isLoading">
    <el-card class="box-card" v-if="!this.isLoading && activeQuestion">
      <div v-if="!this.isVoted">
        <el-button type="text" @click="vote(activeQuestion, 'first')">{{activeQuestion.first.value}}</el-button>
        <span>or</span>
        <el-button type="text" @click="vote(activeQuestion, 'second')">{{activeQuestion.second.value}}</el-button>
      </div>
      <el-row v-else>
        <Results :pollId="poll['.key']"></Results>
      </el-row>
    </el-card>
    <div v-else>Please wait for first question.</div>
  </div>
</template>
<script>

import db from '../services/firebase';
import Results from './Results';

export default {
  name: 'Vote',
  data() {
    return {
      isLoading: true,
      isVoted: false,
      poolOFQuestions: 0,
    };
  },
  components: {
    Results,
  },
  firebase() {
    return {
      poll: {
        source: db.ref().child(`/${this.$route.params.id}`),
        asObject: true,
        readyCallback() {
          const pollRef = db.ref().child(`/${this.$route.params.id}`);
          pollRef.on('value', (snapshot) => {
            if (snapshot.val().questions && snapshot.val().questions.length > 0) {
              this.isLoading = false;
              if (this.poolOFQuestions !== snapshot.val().questions.length) {
                this.poolOFQuestions = snapshot.val().questions.length;
                this.isVoted = false;
              }
            }
          });
        },
      },
    };
  },
  computed: {
    activeQuestion() {
      return (this.poll.questions) ?
        this.poll.questions.filter(question => (question.isActive))[0] : null;
    },
  },
  methods: {
    vote(question, choice) {
      const pollRef = db.ref().child(`/${this.$route.params.id}`);
      this.isVoted = true;
      pollRef.transaction((poll) => {
        const updatedPoll = poll;
        if (poll) {
          const results = poll.questions.map((newQuestion) => {
            const updatedQuestion = newQuestion;
            if (newQuestion.isActive) {
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
