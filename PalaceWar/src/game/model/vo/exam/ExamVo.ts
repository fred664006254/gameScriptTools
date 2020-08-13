/**
 * 科举答题vo
 * author yangchengguo
 * date 2019.7.22
 * @class ExamVo
 */

class ExamVo extends BaseVo{
    /** 科举答题数目 */
    public examNum:Object = {};
    /**是否开启 */
    public open:number = 0;
    /**题目 {0,0,0,0} --题号，得分，耗时，时间戳*/
    public phase:Object = {};
    /**答题时间 */
    public replytime:number = 0;
    /**总积分 */
    public score:number = 0;
    /**版本 */
    public version:number = 0;
    constructor(){
        super()
    }

    public initData(data:any):void{
        if (data.info.examNum){
            this.examNum = data.info.examNum;
        }
        if (data.open){
            this.open = data.open;
        }
        if (data.phase){
            this.phase = data.phase;
        }
        if (data.replytime){
            this.replytime = data.replytime;
        }
        if (data.score){
            this.score = data.score;
        }
        if (data.version){
            this.version = data.version;
        }
    }

    public dispose(){

    }
}