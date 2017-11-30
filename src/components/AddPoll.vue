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
      <li v-for="poll in polls">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Poll</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="removePoll(poll)">Remove poll</el-button>
          </div>
          <el-row>
            <el-col :span="12">
              <h2 class="grid-content">
                {{ poll.first.value }}
              </h2>
              <h3 class="grid-content">
                {{ poll.first.votes }} votes
              </h3>
            </el-col>
            <el-col :span="12">
              <h2 class="grid-content">
                {{ poll.second.value }}
              </h2>
              <h3 class="grid-content">
                {{ poll.second.votes }} votes
              </h3>
            </el-col>
            <el-col :span="24" class="bar-container" v-if="poll.first.votes + poll.first.votes != 0">
                <div v-bind:style="{width: poll.first.votes / (poll.first.votes + poll.second.votes) * 100 + '%' }" class="bar bg-red"/>
                <div v-bind:style="{width: poll.second.votes / (poll.first.votes + poll.second.votes) * 100 + '%' }" class="bar bg-blue"/>
            </el-col>
            <div v-else>
              <h3>No votes yet</h3>
            </div>
          </el-row>
        </el-card>
      </li>
    </ul>
  </div>
</template>
<script>
import db from '../services/firebase';

const polls = db.ref('/');

export default {
  name: 'AddPoll',
  data() {
    return {
      isLoading: true,
      poll: {
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
  firebase: {
    polls: {
      source: polls,
      readyCallback: function () { // eslint-disable-line
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
<style scoped>
h1, h2, h3 {
  margin: 0;
}
.polls {
  max-width: 600px;
  margin: auto;
  list-style: none;
}
.grid-content {
  border-radius: 4px;
}
.box-card {
  margin: 10px;
}
.bg-red {
  background-color: #409EFF;
}
.bg-blue {
  background-color: #67C23A;
}
.bar {
  height: 20px;
  margin-top: 5px;
}
.bar-container {
  display: flex;
}
</style>
