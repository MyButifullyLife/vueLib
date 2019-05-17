<script>
   import baseServie from '../../ajax/http.api'
    export default {
        data(){
            return{
                baseService:baseServie,   //接口方法
            }
        },
        components:{
        },
        mounted(){
        },
        methods:{
          /**
           * 字符串去除空格
           * @param x:String
           * @retrun {string}
           * */
            myTrim(x) {
                  return x.replace(/^\s+|\s+$/gm,'');
            },
            getCommonParam(key,isCopy){
                /*
                 * key 对象key
                 * isCopy 是否浅拷贝，默认不拷贝
                 * */
                if(isCopy){
                    let c={};
                    for (var i in this.$store.state.storage.gobleParam[key]) {
                        c[i] = this.$store.state.storage.gobleParam[key][i];
                    }
                    return c;
                }else{
                    return this.$store.state.storage.gobleParam[key];
                }

            },
            setCommonParam(key,value){
//                获取保存的参数
                return this.$store.state.storage.gobleParam[key]=value;
            },
            delCommonParam(key){
//                获取保存的参数
                delete this.$store.state.storage.gobleParam[key]
            },
          /**
           *  两个日期之间比较大小
           *  @params d1,d2 {string}
           *  @return boolean
           * */
            compareDate(d1,d2,num){
                d1 = d1.replace(/-/g,'/');
                d2 = d2.replace(/-/g,'/');
                var nd1 =new Date(d1);
                var nd2 =new Date(d2);
                var n1Time = nd1.getTime();
                if(num){
                    n1Time += num;
                }
                if(n1Time > nd2.getTime()){
                    return true;
                }else{
                    return false;
                }
            },
          /**
           *  获取数组最大值
           *  @param item{Array} noCopy{bool}
           *  @return number
           * */
            getMaxData(item,noCopy=true){
                if(noCopy){
                    item = JSON.parse(JSON.stringify(item))
                }
                for(var i=0;i<item.length-1;i++){
                    for(var j=0;j<item.length-i-1;j++){
                        if(item[j]-0  < item[j+1]-0 ){
                            var temp=item[j];
                            item[j]=item[j+1];
                            item[j+1]=temp;
                        }
                    }
                }
                return item[0]-0;
            },
          /**
           *  获取数组最小值
           *  @param item{Array} noCopy{bool}
           *  @return number
           * */
            getMinData(item,noCopy=true){
                if(noCopy){
                    item = JSON.parse(JSON.stringify(item))
                }
                for(var i=0;i<item.length-1;i++){
                    for(var j=0;j<item.length-i-1;j++){
                        if(item[j]-0  > item[j+1]-0 ){
                            var temp=item[j];
                            item[j]=item[j+1];
                            item[j+1]=temp;
                        }
                    }
                }
                return item[0]-0;
            },
          /**
           *  处理数字保留尾数问题，并用span 包裹 单位
           *  @param num bit {number} str | c1 | c2{string}
           *  @return Array
           * */
            vualeFormat(num, bit=2, str = '',c1='',c2='') {
                /*
                *  num 数字
                *  bit 保留位数
                *   str 后缀单位
                *   c1 主class
                *    C2 单位class 名字
                * */
                if (isNaN(parseInt(num))) {
                    return num || '-' // 原形返回
                } else {
                    num = num - 0 //字符串转数字类型
//                     亿以上主动转行单位
//                    if(/万/.test(str) && (num > 1000 || num < -1000)){
//                        str = str.replace(/万/,'亿');
//                        num =num/10000;
//                        bit=2;
//                    }else if(/万/.test(str) && (num <1 && num>-1)){
//                        str = str.replace(/万/,'');
//                        num =num*10000;
//                        bit =0;  //保留整数
//                    }
                    num = num.toFixed(bit || 0)
                    num ==0  && (num=0)
                    return '<span class="'+c1+'">'+num+'</span>' + '<span class="'+c2+'">'+str+'</span>'
                }
            },
          /**
           *  处理数字保留尾数问题
           *  @param num bit {number}  c1 | c2{string}
           *  @return Array
           * */
            saveTwoNumber (num, bit=2, str='') {
                if (isNaN(parseInt(num))) {
                    return '-' // 原形返回
                } else {
                    num = num - 0 //字符串转数字类型
                    //                     亿以上主动转行单位
//                    if(/万/.test(str) && (num > 1000 || num < -1000)){
//                        str = str.replace(/万/,'亿');
//                        num =num/10000;
//                        bit=2;
//                    }else if(/万/.test(str) && (num <1 &&num >-1)){
//                        str = str.replace(/万/,'');
//                        num =num*10000;
//                        bit =0;  //保留整数
//                    }
                    num = num.toFixed(bit || 0)
                    num ==0  && (num = 0)
                    return num + str
                }
             },
          /**
           *  字符串转换日期
           *  @param date | bit {string}
           *  @return Array
           * */
            dateTranslate(date,bit){
                if(!date){
                    return
                }
                let year = date.slice(0,4);
                let month = date.slice(4,6)*1;
                let day = date.slice(6,8)*1;
                month = parseInt(month);
                day =parseInt(day);
                let str =''
                if(bit){
//                    yy:mm:dd
                   bit = bit.split(':')
                    for(let i =0;i<bit.length;i++){

                       switch (bit[i].toUpperCase()){
                           case 'YY':
                               str += year +'年';
                               break;
                           case 'MM':
                               str += month +'月';
                               break;
                           case 'DD':
                               str += day +'日';
                               break;
                       }
                    }
                    return str;
                }else{
                    return year+'年'+month+'月'+day+'日';
                }
            },
          /**
           *  复制对象
           *  @param obj  {object}
           *  @return object
           * */
            cloneObj(obj) {
                var str,
                    newobj = obj.constructor === Array ? [] : {}
                if (typeof obj !== 'object') {
                    return
                } else if (window.JSON) {
                    ;(str = JSON.stringify(obj)), //序列化对象
                        (newobj = JSON.parse(str)) //还原
                } else {
                    for (var i in obj) {
                        newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]
                    }
                }
                return newobj
            }  ,
        }
    }
</script>
