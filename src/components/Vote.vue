<template>
  <div class="poll" v-loading="isLoading">
    <div v-if="poll.isActive">
      <img :style="{ backgroundImage: `url(${poll.backgroundImageUrl})` }" class="background-image" />
      <el-card class="box-card" v-if="!this.isLoading && activeQuestion">
        <div v-if="!this.isVoted">
          <el-button type="text" @click="vote(activeQuestion, 'first')">{{activeQuestion.first.value}}</el-button>
          <span>or</span>
          <el-button type="text" @click="vote(activeQuestion, 'second')">{{activeQuestion.second.value}}</el-button>
        </div>
        <el-row v-else>
          <Results :question="activeQuestion" :choice="choice"></Results>
        </el-row>
      </el-card>
      <div v-else>
        Waiting for question.
      </div>
    </div>
    <div v-else>
      Poll is not active.
    </div>
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
      poolOFQuestions: 0,
      choice: null,
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
          this.isLoading = false;
          const pollRef = db.ref().child(`/${this.$route.params.id}`);
          pollRef.on('value', (snapshot) => {
            console.log(snapshot.val());
            if (snapshot.val() && snapshot.val().questions && snapshot.val().questions.length > 0) {
              if (this.poolOFQuestions !== snapshot.val().questions.length) {
                this.poolOFQuestions = snapshot.val().questions.length;
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
    isVoted() {
      const cookieExists = document.cookie.match(`${this.poll.id}${this.activeQuestion.id}`);
      return (cookieExists && cookieExists.index > -1);
    },
  },
  methods: {
    vote(question, choice) {
      const pollRef = db.ref().child(`/${this.$route.params.id}`);
      this.choice = choice;
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
      document.cookie = `${this.poll.id}${question.id}=1`;
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
.background-image {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-size: cover;
  top: 0;
  left: 0;
  z-index: -1000;
}
</style>
