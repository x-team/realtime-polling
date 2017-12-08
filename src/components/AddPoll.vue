<template>
  <div class="add-poll">
    <h1>Add new poll!</h1>
    <el-form :inline="true" :model="poll" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="poll.first.value" placeholder="First Option"></el-input>
      </el-form-item>
       <el-form-item>
        <el-input v-model="poll.second.value" placeholder="Second Option"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Add Poll</el-button>
      </el-form-item>
    </el-form>
    <ul class="polls" v-loading="isLoading" :data="polls">
      <li v-for="poll in polls" v-bind:key="poll.id" >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Poll</span>
            <el-button style="float: right; padding: 3px" type="text" @click="removePoll(poll)">Remove poll</el-button>
            <el-button style="float: right; padding: 3px" type="text" @click="getPollLink(poll)">Get Link</el-button>
          </div>
          <el-row>
            <results :pollId="poll['.key']"></results>
            <a :href="`/#/vote/${poll['.key']}`" target="_blank">Open Poll</a>
          </el-row>
        </el-card>
      </li>
    </ul>
  </div>
</template>
<script>
import db from '../services/firebase';
import Results from './Results.vue';

const polls = db.ref('/');

export default {
  name: 'AddPoll',
  data() {
    return {
      isLoading: true,
      poll: {
        isOpen: true,
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
    Results,
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
    onSubmit() {
      polls.push(this.poll);

      this.poll = {
        first: {
          value: '',
          votes: 0,
        },
        second: {
          value: '',
          votes: 0,
        },
      };
    },
    removePoll: (poll) => {
      polls.child(poll['.key']).remove();
    },
  },
};
</script>
<style>
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
