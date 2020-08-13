/**
 * 科举答题api
 * author yangchengguo
 * date 2019.7.22
 * @class ExamVoApi
 */
class ExamVoApi extends BaseVoApi{
    public examVo:ExamVo;
    public constructor(){
        super();
    }

    public formatData(data:any):void{
        if(this.examVo == null)
		{
			this.examVo = new ExamVo();
		}
		this.examVo.initData(data)
        super.formatData(data);
    }

    /**科举答题配置 */
    public get cfg(){
        return Config.ExamCfg;
    }

    public getVersion():number{
        return this.examVo.version;
    }

    public getSaturdayOtime():number{
        let currTime = App.DateUtil.getWeeTs(GameData.serverTime);
        if (this.getWeekend() == 0){
            currTime -= 86400;
        }
        return currTime;
    }

     /**答题信息 */
     public getExamPhaseByDay(day:number){
        // return this.cfg.formatExamPhase();
        let allExamInfo = this.cfg.phase;
        let examPhase:any = null;
        let key:string;
        for (let k in allExamInfo){
            if (allExamInfo[k].day == day){
                examPhase = allExamInfo[k];
                break;
            }
        }
        if (examPhase){
            return examPhase;
        }
        return null;
    }

    /**答题类型  0 会试 1 殿试*/
    public getExamTypeByDay(day:number):number{
        let allExamInfo = this.cfg.phase;
        for (let k in allExamInfo){
            if (allExamInfo[k].day == day){
                return Number(k);
            }
        }
    }

    /**获取总分数 */
    public getScore():number{
        return this.examVo.score;
    }

    /**获取答题时间 */
    public getReplytime():number{
        return this.examVo.replytime;
    }

    /**题目信息 */
    public getExamProblemByExamType(type:string){
        let allProblems:Object[] = [];
        for (let key in this.examVo.phase){
            allProblems[key] = [];
            let currProblem = this.examVo.phase[Number(key)];
            for (let k in currProblem){
                allProblems[key].push(currProblem[Number(k)]);
            }
        }
        return allProblems[type];
    }

    /**判断是否为周六或者周日 */
    public isWeekend(){
        let currDate = App.DateUtil.getServerDate();
        let day = currDate.getDay();
        if (day == 6 || day == 0){
            return true;
        }
        return false;
    }

    /**回答过的题目信息 */
    public get answeredProblem(){
        return this.examVo.phase;
    }

    /**回答的问题是否正确 */
    public getRightScoreByProblem(type:number, problemNum:number):number{
        let currPhase = this.answeredProblem[type];
        for (let key in currPhase){
            if (Number(key) == problemNum && currPhase[key][3] > 0){
                return currPhase[key][1];
            }
        }
        return 0;
    }

    /** 本轮总积分 答对题的数目 */
    public getRightAnswerData(type:number):{score:number, rightNum:number}{
        let currPhase = this.answeredProblem[type];
        let rigthNum = 0;
        let score = 0;
        for (let key in currPhase){
            if (currPhase[key][1] > 0 && currPhase[key][3] > 0){
                score += currPhase[key][1];
                rigthNum++;
            }
        }
        return {score:score, rightNum:rigthNum}
    }

    /**获取正确答案的id */
    public getRightAnswerIdByProblemNum(problemNum:number):number{
        for (let key in this.cfg.questionBank){
            if (Number(key) + 1 == problemNum){
                return this.cfg.questionBank[Number(key)].rightAnswer;
            }
        }
    }

    /**当前考试是否已结束 */
    public isFinishExamByDay(day:number){
        let type = Api.examVoApi.getExamTypeByDay(day);
        if (this.examVo.examNum[String(type)] != 0){
            return true;
        }
        return false;
    }

    /**获取活动总的开启结束时间 */
    public getStartAndEndTime():{st:string, et:string}{
        let currTime = App.DateUtil.getWeeTs(GameData.serverTime);
        let stTime = currTime;
        let etTime = currTime;
        if (this.getWeekend() == 0){
            stTime -= 86400;
        }
        else if (this.getWeekend() == 6){
            etTime = etTime + 86400;
        }
        let sunTime = this.getExamPhaseByDay(0).time;
        let hour = App.DateUtil.formatSvrHourByLocalTimeZone(sunTime[1] / 3600).hour;
        etTime += hour * 3600;
        let stStr = App.DateUtil.getFormatBySecond(stTime, 10);
        let etStr = App.DateUtil.getFormatBySecond(etTime, 10);
        return {st:stStr, et:etStr};
    }

    /**获取当前是周几 */
    public getWeekend(){
        let currDate = App.DateUtil.getServerDate();
        return currDate.getDay();
    }

    /**截止时间戳 不包含展示期*/
    public getEndTimeByDay(day:number){
        let examInfo = this.getExamPhaseByDay(day);
        let endTime = examInfo.time[1];
        let currTime = App.DateUtil.getWeeTs(GameData.serverTime);
        if (day == 0 ){
            if (this.getWeekend() == 6){
                return currTime + endTime + 86400;
            }
        }
        else{
            if (this.getWeekend() == 0){
                return 0;
            }
        }   
        return currTime + endTime;
    }

    /**开始时间戳 */
    public getStartTimeByDay(day:number){
        let examInfo = this.getExamPhaseByDay(day);
        let stTime = examInfo.time[0];
        let currTime = App.DateUtil.getWeeTs(GameData.serverTime)
        if (this.getWeekend() == 6 && day == 0){
            return currTime + stTime + 86400;
        }
        return currTime + stTime;
    }

    /**距离活动开启剩余时间 */
    public getStartTimeCountDownByDay(day:number){
        let stTime = this.getStartTimeByDay(day);
        let delta = stTime - GameData.serverTime;
        if (delta <= 0){
			return null;
		}
		return App.DateUtil.getFormatBySecond(delta, 1);
    }

    /**活动结束时间倒计时 */
    public getEndTimeCountDownByDay(day:number):string{
        let delta = this.getEndTimeByDay(day) - GameData.serverTime;
        if (delta <= 0){
			return LanguageManager.getlocal("examinationTimeEndStr");
		}
		return App.DateUtil.getFormatBySecond(delta, 1);
    }

    /** 格式化显示时间 */
    public getFormatTime(time:number){
        let currSt = App.DateUtil.getWeeTs(GameData.serverTime);
        let hour = App.DateUtil.formatSvrHourByLocalTimeZone(time / 3600).hour;
        return App.DateUtil.getFormatBySecond(currSt + hour * 3600, 12);
    }

    /**是否在活动期间 */
    public isInPeriod():boolean{
        if (!this.isWeekend()){
            return false;
        }
        let currSt:number = App.DateUtil.getWeeTs(GameData.serverTime);
        let endTime:number = 0;
        if (this.getWeekend() == 6){
            endTime = currSt + this.cfg.showTime;
        }
        else if (this.getWeekend() == 0){
            endTime = currSt + 86400;
        }
        if (endTime > GameData.serverTime){
            return true;
        } 
        return false;     
    }

    /**活动版本是否一致 */
    public isInVersion():boolean{
        if (this.getVersion() == this.getSaturdayOtime()){
            return true;
        }
        return false;
    }

    /**某天的活动是否正在进行中 */
    public isInShow(day:number){
        let time0:number = App.DateUtil.getWeeTs(GameData.serverTime);
        if (this.getWeekend() == day){
            let examInfo = this.getExamPhaseByDay(day);
            if (examInfo.time[0] + time0 < GameData.serverTime && examInfo.time[1] + time0 > GameData.serverTime){
                return true;
            }
        }
        return false;
    }

    /**是否显示小红点 */
    public isShowRedDot():boolean{
        if (this.isInShow(6) == true && !this.isFinishExamByDay(6)){
            return true;
        }
        else if (this.isInShow(0) == true && !this.isFinishExamByDay(0)){
            return true;
        }
        return false;
    }

    /**获取答案随机位置数 */
    public getAnswerRandPos():number[]{
        let arr = [1, 2, 3, 4];
        let newArr:number[] = [];
        let k = 0;
        while (k < arr.length){
            let rand = Math.floor(Math.random()*10)%4;
            if (arr[rand] > 0){
                newArr[k] = arr[rand];
                arr[rand] = 0;
                k++;
            }
        }
        return newArr;
    }

    /**获取当前是周几 */
    public getWeekendByType(type:number):number{
        let allExamInfo = this.cfg.phase;
        for (let k in allExamInfo){
            if (k == String(type)){
                return allExamInfo[k].day;
            }
        }
    }

    /**获取活动总的结束时间 */
    public getExamEndTime():number{
        let currTime = App.DateUtil.getWeeTs(GameData.serverTime);
        let time = 0;
        if (this.getWeekend() == 0){
            time = currTime + 86400;
        }
        else if (this.getWeekend() == 6){
            time = currTime + 86400 * 2;
        } 
        return time;
    }

    public dispose():void{
        super.dispose();
    }
}
