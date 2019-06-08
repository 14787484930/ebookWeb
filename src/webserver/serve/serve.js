import Vue from 'vue'
import $http from './http'
import $ from 'jquery'

const serve = {
  bookTypes: (back) => {
    $http.post('/booktype/booktypes', {}, res => {
      const list = [];
      $.each(res.data.page.booktypes, (index, item) => {
        list.push({ text: item.name, value: item.id })
      })
      back(list);
    })
  }
};
Vue.prototype.$serve = serve;
