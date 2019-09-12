<template>
<div>
  <app-modal @closeModal="closeModal"
    :showModal="showModal"
    :contentArticle="contentArticle"></app-modal>
    <div class="container">
      <div>{{ showModal }}</div>
      <article @click="activeModal(post)"
        class="post columns is-mobile is-vcentered"
        v-for="post in displayedPosts"
        :key="post.id"
        :data-id="post.id"
      >
        <div class="column is-one-third-mobile is-one-quarter-tablet is-one-fifth-desktop">
          <p class="image">
            <img src="https://via.placeholder.com/400">
          </p>
        </div>
        <div class="column is-two-thirds-mobile is-three-quarters-tablet is-four-fifths-desktop">
          <h2 class="title is-4 is-size-6-mobile">{{ post.title.rendered }}</h2>
          <div class="resume is-hidden-mobile" v-html="post.excerpt.rendered">
          </div>
          <button class="button is-primary is-hidden-mobile" @click="showModal = true">
            Lire la suite
          </button>
        </div>
      </article>
      <nav class="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
          <li><a class="pagination-previous" v-if="page != 1" @click="page--"><</a></li>
          <li v-if="page != 1" @click="page = 1">
            <a class="pagination-link"
              :class="{ 'is-current' : page == pageNumber}">{{1}}</a>
          </li>
          <li v-for="pageNumber in pages.slice(page-1, page+2)" @click="page = pageNumber">
            <a class="pagination-link"
              :class="{ 'is-current' : page == pageNumber}">{{pageNumber}}</a>
          </li>
          <li v-if="page < pages.length - 2" @click="page = pages.length">
            <a class="pagination-link"
              :class="{ 'is-current' : page == pageNumber}">{{pages.length}}</a>
          </li>
          <li><a class="pagination-next" @click="page++" v-if="page < pages.length">></a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import modal from './Modal.vue';

export default {
  components: {
    appModal: modal,
  },
  data() {
    return {
        posts: [],
        baseUrl: 'http://igaman.studio/yolo-api/wp/v2/',
        page: 1,
        perPage: 5,
        pages: [],
        pageNumber: null,
        contentArticle: null,
        showModal: false,
    }
  },
  methods: {
    activeModal(post) {
      this.showModal = true;
      this.contentArticle =  {
        title: post.title.rendered,
        content: post.content.rendered,
      };
      document.body.style.overflow = 'hidden';
    },
    closeModal(arg) {
      this.showModal = arg;
      document.body.style.overflow = '';
    },
    getPosts() {
      axios.get(this.baseUrl+'posts'+'?per_page=100')
        .then(response => {
          console.log('good')
          console.table(response.data)
          this.posts = response.data;
        })
        .catch(response => {
          console.log(response);
        });
    },
    setPages () {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate (posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  posts.slice(from, to);
    }
  },
  mounted() {
    console.log('mounted')
    this.getPosts();
  },
  watch: {
    posts () {
      this.setPages();
    }
  },
  computed: {
    displayedPosts () {
      return this.paginate(this.posts);
    }
  },
}
</script>

