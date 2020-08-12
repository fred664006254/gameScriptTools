class SignInfoVo extends BaseVo {

    /**已经签到天数 */
    public days:number = 0;
    /**今日是否签到0未 1已签 */
    public hasSign:number = 0
    /**改名次数 */
    public renameNum:number = 0;
    /**是否首充 */
    public payFlag:number = 0;
    /**跨天时间 */
    public lastday:number = 0;
    /**杂项 */
    public info = null;
    public initData(data){
        if(data){
            for (const key in data) {
                this[key] = data[key]; 
                
            }
        }
    }

    public dispose(){
        this.days = 0;
        this.hasSign = 0;
        this.renameNum = 0;
        this.payFlag = 0;
        this.lastday = 0;
        this.info = null;
    }
}