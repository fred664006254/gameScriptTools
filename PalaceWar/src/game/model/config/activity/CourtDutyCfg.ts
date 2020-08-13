namespace Config
{
	export namespace AcCfg
	{
        export class CourtDutyCfg 
        {
            /**
             * 女优活动4 依生依世
             */
            public extraTime:number;
            public needRecharge1:number;
            public yaMenTaskList:CourtDutyTaskItem[] = [];
            public needRecharge2:number;
            public huangBangTaskList:CourtDutyTaskItem[] = [];

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "yaMenTask"){
                        this.yaMenTaskList = [];
                        let count = 0;
                        let cfgArr = data[key];
                        App.LogUtil.log("cfgArr: "+cfgArr.length);
                        for (let i = 0; i < cfgArr.length; i++){
                            // let dataList:CourtDutyTaskItem[] = [];
                            for (let k = 0; k < cfgArr[i].length; k++){
                                count += 1;
                                let itemCfg = new CourtDutyTaskItem();
                                itemCfg.initData(cfgArr[i][k]);
                                itemCfg.id = count;
                                itemCfg.taskId = i+1;
                                itemCfg.rKey = k + 1;
                                // dataList[k] = itemCfg;
                                this.yaMenTaskList.push(itemCfg);
                            } 
                        }
                    }
                    else if (key == "huangBangTask"){
                        this.huangBangTaskList = [];
                        let count = 0;
                        let cfgArr = data[key];
                        App.LogUtil.log("cfgArr huangBangTask: "+cfgArr.length);
                        for (let i = 0; i < cfgArr.length; i++){
                            // let dataList:CourtDutyTaskItem[] = [];
                            for (let k = 0; k < cfgArr[i].length; k++){
                                let itemCfg = new CourtDutyTaskItem();
                                itemCfg.initData(cfgArr[i][k]);
                                count += 1;
                                itemCfg.id = count;
                                itemCfg.taskId = i+1;
                                itemCfg.rKey = k + 1;
                                // dataList[k] = itemCfg;
                                this.huangBangTaskList.push(itemCfg);
                            }
                        }
                    }
                }
            }
            public getYaMenTaskList():CourtDutyTaskItem[]{
                return this.yaMenTaskList;
            }

            public getHuangBangTaskList():CourtDutyTaskItem[]{
                return this.huangBangTaskList;
            }
        }

        /**item */
        export class CourtDutyTaskItem extends BaseItemCfg{
            /**id */
            public taskId:number = null;
            public id:number = null;
            public rKey:number = null;
            public openType:string = "";
            public questType:number = null;
            public getReward:string = null;
            public value:number = null;
            public sortId:number = 0;
        }
    }
}