<template>
  <div>
    <h1 class="title is-5" v-html="contentArticle.title.rendered"></h1>
    <div v-html="contentArticle.content.rendered"></div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
        baseUrl: 'http://igaman.studio/yolo-api/wp/v2/posts/' + this.id,
        contentArticle: null,
    }
  },
  methods: {
    getArticle() {
      axios.get(this.baseUrl)
        .then(response => {
          console.log('good')
          console.table(response.data)
          this.contentArticle = response.data;
        })
        .catch(response => {
          console.log(response);
        });
    },
  },
  mounted() {
    console.log('mounted' + this.baseUrl)
    this.getArticle();
  },
}
</script>
