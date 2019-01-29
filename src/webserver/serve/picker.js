import $http from "./http";
import  $ from  'jquery'
import  {Picker,DatePicker,Dialog,Input } from 'cube-ui'
import  Vue from 'vue'
import $format from './format'
import priceInput from  '../../components/common/priceInput'
const picker={
    state:{
        picker:{},
        dialog:{},
        datePicker:{}
    },
    show:()=> picker.state.picker.show(),
    showDate:()=>picker.state.datePicker.show(),
    showDialog:()=>picker.state.dialog.show(),
    bookTypes:(back)=>{
        $http.post('/booktype/booktypes',{},res=>{
            let list=[];
            $.each(res.data.page.booktypes,(index,item)=>{
                list.push({text:item.name,value:item.id})
            })
            picker.state.picker= Picker.$create({
                title: "图书类型",
                data:[list] ,
                onSelect:(val, index,text)=>back(val, index,text),
            });

        })
    },
    datePicker(back){
        picker.state.datePicker = DatePicker.$create({
            title: '请选择日期',
            min: new Date(1980, 1, 1),
            max: new Date(new Date().getFullYear(), 12, 12),
            value: new Date(),
            onSelect:(val, index,text)=>back(val, index,text),
        })
    },
    dialogPicker(back){
        let low=0,up=0;
        console.log(priceInput)
        picker.state.dialog=Dialog.$create({
            title: '填写价格区间',
            onConfirm:()=>{
                back(low, up);
            }
        },(fun) => {
            return [fun(priceInput,{
                on:{
                    change:(prices)=>{
                        low=prices[0];
                        up=prices[1];
                    }
                },
                slot: 'content',
            })];
        })
    },
}
Vue.prototype.$picker=picker;

