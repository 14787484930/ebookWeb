<template>
  <div class='file-img'>
    <input type='file' id='upload-file' @change='showImg' multiple='multiple' style='display:none'
           accept='image/*'/>
    <div class='row-boder' style='text-align: center;margin:0 auto'>
      <img class='img-responsive' @click='bindEven' src='../assets/images/upload.png'/>
      <i @click='delAll()' v-if='showDel' class='icon ion-close-circled' style='color:lightcoral '></i>
      <img class='img-responsive' v-if='curls.length===0' src='../assets/images/noImg.png'/>
      <div v-for='(item, index) in curls' :key='index'>
        <img v-press='fShowDel' class='img-responsive' @click='showImagePreview(item[ckey])' :src='item[ckey]'/>
        <i @click='delImg(item)' v-if='showDel' class='icon ion-close-circled'></i>
      </div>
    </div>
  </div>
</template>
<script>
  import lrz from 'lrz'
  import $ from 'jquery'

  let _that = '';
  export default {
    name: 'FileCom',
    props: ['urls', 'urlKey'],
    data() {
      return {
        showDel: false,
        curls: [],
        ckey: 'url',
        files: [],
        pressFlag: false  // 判断是否为按压屏幕
      }
    },
    created() {
      _that = this;
      this.initParams();
    },
    watch: {
      'urls': function () {
        this.changeUrlToBlob(this.urls)
      }
    },
    methods: {
      fShowDel() {
        this.showDel = !this.showDel;
        this.pressFlag = true;
        // console.log(e)
        // e.target.stopPropagation;
      },
      initParams() {
        // this.curls = this.urls != undefined ? this.urls : [];
        this.curls = [];
        this.ckey = (this.urlKey !== undefined) ? this.urlKey : 'url';
      },
      showImg: function (e) {
        $.each(e.target.files, (index, item) => {
          _that.readFile(item);
        });
      },
      delAll() {
        this.showDel = false;
        this.files = [];
        this.curls = [];
      },
      readFile: function (file) {
        if (file.size > 5242880) {
          alert('照片不能大于5M')
          return
        }
        _that.files.push(file);
        const data = {
          FileName: file.name.substr(0, file.name.lastIndexOf('.'))
        }
        lrz(file).then(function (rst) {
          data[_that.ckey] = rst.base64;
          _that.curls.push(data);
        }).catch(function (error) {
          alert(error)
          const reader = new FileReader();
          reader.vue = this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            data[_that.ckey] = this.result;
            _that.curls.push(data);
          }
        })
      },
      showImagePreview: function (url) {
        if (this.pressFlag === true) {
          this.pressFlag = false
          return
        }
        this.$createImagePreview({
          imgs: [url]
        }).show()
      },
      delImg(item) {
        const _index = this.curls.indexOf(item);
        this.curls.splice(_index, 1);
        this.files.splice(_index, 1);
      },
      bindEven() {
        $('#upload-file').click();
      },
      /*
       * 将img中url改为blob格式
       * @param url
       * */
      changeUrlToBlob(url) {
        for (let i = 0; i < url.length; i++) {
          this.loadImageToBlob(url[i].url, blobFile => {
            return blobFile;
            /*
              let fileReader = new FileReader();
              fileReader.readAsDataURL(blobFile);
              fileReader.onload = function() {
                  // 这里输出的数据放到url里能生成图片
                  console.log(this.result);
                  // 新建对象
                  // console.log(obj);
              };*/
          });
        }
      },
      /*
       * 向服务器请求图片数据
       * @param url
       * @param callback
       * @returns {boolean}
       */
      loadImageToBlob(url, callback) {
        if (!url || !callback) {
          return false;
        }
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function () {
          //  注意这里的this.response 是一个blob对象 就是文件对象
          // blob对象转file对象
          const FileName = 'abc.jpg';
          const contentType = this.response.type;
          const file = new File([this.response], FileName, { type: contentType, lastModified: Date.now() });
          _that.readFile(file);
          callback(Number(this.status) === 200 ? this.response : false);
        }
        xhr.open('get', url, true);
        xhr.send();
        return true;
      }
    }
  }
</script>

<style>
  .file-img img {
    margin: 4px 4px;
    float: left;
    height: 80px;
    width: 80px;
    object-fit: cover;
    border: 1px solid #c9e2b3;
  }

  .file-img i {
    float: left;
    color: #0a9dc7;
    margin-left: -10px;
    margin-top: -8px;
  }
</style>
