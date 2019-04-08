<template>
  <div>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll">
        <template>
          <label class="form-group item item-input teach-tabs">
            <li class="teach-tab" :class="{active: !type}">辅导</li>
            <li class="teach-tab" :class="{active: type}">讲座</li>
          </label>
          <ul class="list">
            <li class="item item-input ">
              <span>名称：</span>
              <span>{{teach.name}}</span>>
            </li>
            <li class="item item-input ">
              <span>{{ type?"开始时间：":"辅导截止时间：" }}</span>
              <span>{{teach.startTime}}</span>
            </li>
            <li class="item item-input ">
              <span>结束时间：</span>
              <span>{{teach.endTime}}</span>
            </li>
            <li class="item item-input " v-if="power">
              <span>电话：</span>
              <span>{{teach.phone}}</span>
            </li>
            <li class="item item-input " v-if="power">
              <span>微信号：</span>
              <span>{{teach.weiXin}}</span>
            </li>
            <li class="item item-input ">
              <span>{{ type?"讲座地点：":"辅导地点：" }}</span>
              <span>{{teach.place}}</span>
            </li>
            <li class="item item-input ">
              <span>{{ type?"报酬(元)：":"辅导价格：" }}</span>
              <span>{{teach.price}}</span>
            </li>
            <li class="item item-input ">
              <span>描述：</span>
              <span>{{teach.des}}</span>
            </li>
          </ul>
        </template>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
    import $ from "jquery";
    import { parse } from 'path';
    let _that;

    export default {
        //name: "view",
        data() {
            return {
                //获取详细信息
                flag: "",
                teach: {
                    id: 0,
                    name: "",
                    type: "0",
                    price: "10",
                    startTime: "2018-12-01 15:52:46",
                    endTime: "2018-12-08 15:52:51",
                    place: "A栋",
                    phone: "14787484930",
                    weiXin: "",
                    des: "123"
                }
            };
        },
        created() {
            _that = this;
            this.teach.id = this.$route.query.id;
            if (parseInt(this.teach.id) != 0) this.initData();
            else console.log("[error]选择的物品id为0，请检查物品id是否正确!");
        },
        computed: {
            power() {
                return this.$store.getters.power;
            },
            type: function() {
                return parseInt(this.teach.type);
            },
            flagC() {
                return this.flag
            }
        },
        mounted() {
            //this.$(".scroll-list-wrap").height = this.$(".scroll-list-wrap").height(screen.availHeight - this.$(".tabs-icon-top", window.parent.parent.document).height()) + 80;
        },

        methods: {
            initData() {
                this.$http.post("/tutoring/getById/" + this.teach.id).then(res => {
                    _that.teach = res.data.page.info;
                    this.teach = res.data.page.info;
                    _that.teach.startTime = _that.$toDate(
                        _that.teach.startTime,
                        "yyyy-MM-dd HH:mm"
                    );
                    _that.teach.endTime = _that.$toDate(
                        _that.teach.endTime,
                        "yyyy-MM-dd HH:mm"
                    );
                    _that.teach.teachType = 1; //先不做处理后面要删除
                });
            }
        }
    };
</script>

<style scoped>
  .teach-tabs.item-input {
    display: flex;
    height: 70px;
    padding: 0 2rem;
    justify-content: space-between;
  }
  .teach-tab {
    font-size: 19px;
  }
  .active {
    color: #387ef5;
  }
</style>
