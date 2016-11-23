var Vue = require('vue')
var Seachbar = require('../components/Searchbar.vue');


new Vue({
  el : '.seach_list',
  components: {
    'search-bar': Seachbar
  }
})
