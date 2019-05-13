import $http from "./http";
import $ from 'jquery'
import {Picker, DatePicker, Dialog} from 'cube-ui'
import Vue from 'vue'
//import $format from './format'
import priceInput from '../../components/common/priceInput'
//引入缓存
import storage from '../../assets/storage/index'

const picker = {
    state: {
        picker: {},
        dialog: {},
        datePicker: {},
        dateEndPicker: {},
        timePicker: {},
        timeEndPicker: {},
    },
    show: () => picker.state.picker.show(),
    showDate: () => picker.state.datePicker.show(),
    showDateEnd: () => picker.state.dateEndPicker.show(),
    showTime: () => picker.state.timePicker.show(),
    showEndTime: () => picker.state.timeEndPicker.show(),
    showDialog: () => picker.state.dialog.show(),
    electronicType: (back) => {
        $http.post('/electronicstype/electronicsTypes', {}, res => {
            let list = [];
            $.each(res.data.page.electronicsType, (index, item) => {
                list.push({text: item.name, value: item.id})
            });
            picker.state.picker = Picker.$create({
                title: "电子类型",
                data: [list],
                onSelect: (val, index, text) => back(val, index, text),
            });
            //将类型存入缓存
            storage.setSession('electronicsType', list);
        })
    },
    bookTypes: (back) => {
        $http.post('/booktype/booktypes', {}, res => {
            let list = [];
            $.each(res.data.page.booktypes, (index, item) => {
                list.push({text: item.name, value: item.id})
            })
            picker.state.picker = Picker.$create({
                title: "图书类型",
                data: [list],
                onSelect: (val, index, text) => back(val, index, text),
            });
            //将类型存入缓存
            storage.setSession('bookType', list);
        })
    },
    teachTypes: (back) => {
        let list = [{
            'text': '辅导',
            value: 0
        }, {
            'text': '讲座',
            value: 1
        }];
        picker.state.picker = Picker.$create({
            title: "类型",
            data: [list],
            onSelect: (val, index, text) => back(val, index, text),
        });
    },
    selectTypes: (list, back) => {
        if (list == null) {
            list = [{
                'text': '有',
                value: 0
            }, {
                'text': '没有',
                value: 1
            }];
        }
        picker.state.picker = Picker.$create({
            title: "是否有发票",
            data: [list],
            onSelect: (val, index, text) => back(val, index, text),
        });
    },
    datePicker(back) {
        picker.state.datePicker = DatePicker.$create({
            title: '请选择开始日期',
            min: new Date(1980, 1, 1),
            max: new Date(new Date().getFullYear(), 12, 12),
            value: new Date(),
            onSelect: (val, index, text) => back(val, index, text),
        })
    },
    //结束日期选择，只有年月日 -by gpj
    dateEndPicker(back) {
        picker.state.dateEndPicker = DatePicker.$create({
            title: '请选择结束日期',
            min: new Date(1980, 1, 1),
            max: new Date(new Date().getFullYear(), 12, 12),
            value: new Date(),
            onSelect: (val, index, text) => back(val, index, text),
        })
    },
    //开始日期时间选择，年月日时分 -by gpj
    timePicker(back) {
        picker.state.timePicker = DatePicker.$create({
            title: '选择开始时间',
            min: new Date(2008, 1, 8, 8, 0),
            max: new Date(2020, 12, 20, 20, 59),
            value: new Date(),
            format: {
                year: 'YY年',
                month: 'MM月',
                date: 'D日',
                hour: "hh时",
                minute: "mm分",
            },
            columnCount: 5,
            onSelect: (val, index, text) => back(val, index, text),
        })
    },
    //结束日期时间选择，年月日时分 -by gpj
    timeEndPicker(back) {
        picker.state.timeEndPicker = DatePicker.$create({
            title: '选择结束时间',
            min: new Date(2008, 1, 8, 8, 0),
            max: new Date(2020, 12, 20, 20, 59),
            value: new Date(),
            format: {
                year: 'YY年',
                month: 'MM月',
                date: 'D日',
                hour: "hh时",
                minute: "mm分",
            },
            columnCount: 5,
            onSelect: (val, index, text) => back(val, index, text),
        })
    },
    dialogPicker(back) {
        let low = 0, up = 0;
        picker.state.dialog = Dialog.$create({
            title: '填写价格区间',
            onConfirm: () => {
                back(low, up);
            }
        }, (fun) => {
            return [fun(priceInput, {
                on: {
                    change: (prices) => {
                        low = prices[0];
                        up = prices[1];
                    }
                },
                slot: 'content',
            })];
        })
    },
}
Vue.prototype.$picker = picker;

