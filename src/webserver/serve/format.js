/**这个文件主要用来进行数据转换的**/
import vue from 'vue'
const  $format={
    toInt(val,defaultValue=0){
        if(val==null||val===undefined||isNaN( parseInt(val))){
            return defaultValue;
        }
        return parseInt(val);
    },
    toFloat(val,defaultValue=0){
        if(val==null||val===undefined||isNaN(parseFloat(val))){
            return defaultValue;
        }
        return parseFloat(val);
    },
    toStr(val,defaultValue=''){
        if(val==null||val===undefined){
            return defaultValue;
        }
        return val.toString();
    },
    toArray(val,defaultValue={}){
        if(val==null||val===undefined){
            return defaultValue;
        }
        return val;
    },
    toBool(val){
        return !(val == null || val === undefined || parseInt(val) === 0 || val.toString().toLowerCase() === 'false');

    },
    /**
     * 时间戳、字符串转成时间格式
     * @param {[string]} value        [时间戳]
     * @param {[string]} formatString [转换格式 默认'YYYY-MM-dd HH:mm']
     * @param {[string]} isString	  [true:[value]是字符串 false：[value]是时间戳] 此参数一般不用传
     */
    toDate(value, formatString, isString) {
        if (value === undefined || value == null || value.length === 0)
            return value;

        if (typeof (value) === "object") {
            value = value.toString();
        }

        if (formatString === undefined || formatString == null || formatString.length === 0)
            formatString = "yyyy-MM-dd";
        value=value.toString();
        var ret = '', d = "";
        if (value.indexOf("/Date(") > -1 || value.indexOf(")/") > -1||parseInt(value)>0) {  // 时间戳格式
            value = value.replace("/Date(", "").replace(")/", "");
            d = new Date(parseInt(value, 10));
        } else { // 普通字符串格式
            d = new Date(value);
        }

        var second = '' + d.getSeconds(),
            minutes = '' + d.getMinutes(),
            hours = '' + d.getHours(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hours.length < 2) hours = '0' + hours;
        if (minutes.length < 2) minutes = '0' + minutes;
        if (second.length < 2) second = '0' + second;
        if (formatString === 'yyyy-MM-dd HH:mm:ss')
            ret = [year, month, day].join('-') + " " + [hours, minutes, second].join(':');
        else if (formatString === 'yyyy-MM-dd HH:mm')
            ret = [year, month, day].join('-') + " " + [hours, minutes].join(':');
        else if (formatString === 'MM-dd')
            ret = [month, day].join('-');
        else if (formatString === 'HH:mm')
            ret = [hours, minutes].join(':');
        else if (formatString === 'MM-dd HH:mm') {
            if (isString && value.length <= 10) {
                ret = [month, day].join('-');
            }
            else {
                ret = [month, day].join('-') + " " + [hours, minutes].join(':');
            }
        } else
            ret = [year, month, day].join('-');

        return ret;
    }
}
vue.prototype.$toInt=$format.toInt;
vue.prototype.$toBool=$format.toBool;
vue.prototype.$toDate=$format.toDate;
vue.prototype.$toFloat=$format.toFloat;
vue.prototype.$toStr=$format.toStr;
vue.prototype.$toArray=$format.toArray;

export default  $format
