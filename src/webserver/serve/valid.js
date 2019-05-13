/**验证说明，设置class
 * isnull：必填项
 * tel：电话号码验证
 * */
import  {Toast} from 'cube-ui'
import $ from 'jquery'
const $valid={
    state:true,
    msg:'',
    tel:function () {
        var list=$(".tel");
        $.each(list,function(i,val){
            if(!(/^1[34578]\d{9}$/.test($(val).val()))){
                $valid.msg+='<br/>电话号码有误'
                $valid.state=false;
                $(val).css("color",'red');
            }

        })


    },
    isnull:function () {
        var list=$(".isnull");
        let  msg='';
        $.each(list,function(i,val){
           if($.trim($(val).val())==''){
               msg='<br/>红色框为必填项'
                $valid.state=false;
                $(val).css("border","1px solid red");
            }

        })
        $valid.msg+=msg;
    },
    submit(){
        $valid.msg='';
        $valid.state=true;
        $valid.isnull();
        $valid.tel();
        if(!$valid.state){
            Toast.$create({
                txt:  $valid.msg,
                type: 'error',
                time:1000,
            }).show();
        }
        return  $valid.state;
    }
}
export  default  $valid
