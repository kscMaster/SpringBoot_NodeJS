

export class ConvertUtils {
   

    /**
     * string类型转date 时间戳
     * @param date
     */

    public str_date(date) {

        console.log("日期转换：");
        console.log(date);


        //前台数据转换获得时间戳 传给后台
        // @ts-ignore
        var date_m = Date.parse(date);
        // console.log(date_m);

        //将时间戳转换为GMT 格式时间
        var strDate = new Date(date_m);
        // console.log(strDate);

        //得到正常北京时间
        // @ts-ignore
        let GMTDate = this.GMTToStr(strDate);
        // console.log(GMTDate);

        //返回时间戳
        return date_m;
    }


}