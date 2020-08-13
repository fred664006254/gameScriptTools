namespace Config {
	/**
	 * 省亲配置
	 */
	export namespace BigiconCfg
	{   
        export let bigIcon1:any[];
        export let bigIcon2:any[];
        export let bigIcon3:any[];
        export let bigIcon4:any[];
        export let bigIcon5:any[];
        export let bigIcon6:any[];
        export let bigIcon7:any[];
        export let bigIcon8:any[];
        export let bigIcon9:any[];
        export let bigIcon10:any[];

        export function formatData(data:any):void
		{   
            let code = 1;
            if(data){
                for(let i = 1; i < 11; ++ i){
                    if(data[`bigIcon${i}`]){
                        this[`bigIcon${i}`] = data[`bigIcon${i}`];
                    }
                }
            }
        }

        //获取左侧最大显示数目
        export function getMaxIconLength():number
		{   
            return 4;
        }
        /**
         * 获取活动大图标 
         */
        let bigIcons:any[] = [];
        export function getBigIcon():any[]
		{   
            if (Api.acVoApi.isHandled_BI)
            {
                return bigIcons;
            }
            Api.acVoApi.isHandled_BI= true;

            let arr = [];
            if(!Api.switchVoApi.checkLeftActIconOpen()){
                return arr;
            }
            //      arr.push({activity : `crossServerPower`});
            // arr.push({activity : `crossServerIntimacy`});
            // arr.push({activity : `crossServerAtkRace`});
            // arr.push({activity : `tomb`});
            let tmp = [];
            let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
            let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
            for(let i = 1;i < 11; ++ i){
                tmp = [];
                for(let j in this[`bigIcon${i}`]){
                    //--activity:活动名称
                    //--priority:优先级。按顺序排序
                    let unit = this[`bigIcon${i}`][j];
                    if(unit && unit.activity){
                        unit.type ? `` : unit.type = ``;
                        let vo = null;
                        if(unit.activity == `rankActive`){
                            vo = Api.acVoApi.checkActivityStartByAidAndType(unit.activity, unit.type);
                            if(vo && vo.isStart && ((vo.checkIsHasExtraTime() && !vo.checkIsInEndShowTime()) || (!vo.checkIsHasExtraTime()))){
                                tmp.push(unit);
                            }
                        }
                        else if(unit.activity == `battlePass`){
                            if(Api.acVoApi.checkActivityStartByAid(unit.activity)){
                                let voList = Api.acVoApi.getActivityVoListByAid(unit.activity);
                                if(voList.length == 1 && (Number(voList[0].code) == 4 || Number(voList[0].code) == 7)){
                                    continue;
                                }
                                tmp.push(unit);
                            }
                        }
                        else if(unit.activity == `firstrecharge`){
                            if (Api.switchVoApi.checkClosePay()) {
                                continue;
                            }
                            if(Api.shopVoApi.getPayFlag()==2)
                            {
                                continue;
                            }
                            else
                            {
                                tmp.push(unit);
                            }
                        }
                        else if(unit.activity == `timelimitwife`){
                            let vo = Api.shopVoApi.getPayInfoById2("g16");
                            let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
                            if (Api.switchVoApi.checkClosePay()) {
                                continue;
                            }
                            if (!GameData.checkTimeLimitWife()) {
                                continue;
                            }
                            if(PlatformManager.checkIsThSp()&&App.DeviceUtil.isIOS())
                            {
                                continue;
                            }
                            else if(cfg&&vo&&Number(vo.isbuy) == 0){
                                tmp.push(unit);
                            }
                        }
                        else if(unit.activity == `monthcard`){
                            if(!isBuyMonthCard){
                                tmp.push(unit);
                            }
                        }else if(unit.activity == `yearcard`){
                            if(isBuyMonthCard && !isBuyYearCard){
                                tmp.push(unit);
                            }
                        }
                        else{
                            vo = Api.acVoApi.getActivityVoByAidAndCode(unit.activity);
                            if(Api.acVoApi.checkActivityStartByAid(unit.activity) && vo.isStart && ((vo.checkIsHasExtraTime() && !vo.checkIsInEndShowTime()) || (!vo.checkIsHasExtraTime()))){
                                tmp.push(unit);
                            }
                        }
                    }
                }
                if(tmp.length == 0 && i != 4 && i !== 5){
                    for(let j in this[`bigIcon${i}`]){
                        //--activity:活动名称
                        //--priority:优先级。按顺序排序
                        let unit = this[`bigIcon${i}`][j];
                        unit.type ? `` : unit.type = ``;
                        let vo = null;
                        if(unit.activity == `rankActive`){
                            vo = Api.acVoApi.checkActivityStartByAidAndType(unit.activity, unit.type);
                            if(unit && unit.activity && vo && vo.isStart){
                                tmp.push(unit);
                            }
                        }
                        else{
                            vo = Api.acVoApi.getActivityVoByAidAndCode(unit.activity);
                            if(unit && unit.activity && Api.acVoApi.checkActivityStartByAid(unit.activity) && vo.isStart){
                                tmp.push(unit);
                            }
                        }
                    }
                }
    
                tmp.sort((a,b)=>{
                    return a.priority - b.priority;
                });
                if(tmp.length){
                    arr.push(tmp[0]);
                }
            }
            // arr.push({activity : `crossServerPower`});
            // arr.push({activity : `crossServerIntimacy`});
            // arr.push({activity : `crossServerAtkRace`});
            // arr.push({activity : `tomb`});
            // arr.push({activity : `conquerMainLand`});
            // arr.push({activity : `crossServerWifeBattle`});
            // arr.push({activity : `battlePass`, type : 3});
            // arr.push({activity : `crossServerPower`, type : 3});
            // arr.push({activity : `tomb`});
            // arr.push({activity : `crossServerIntimacy`});
            // arr.push({activity : `crossServerAtkRace`});
            bigIcons = arr;
            return arr;
        }
    }
}