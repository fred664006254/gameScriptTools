/**
 * 限时礼包api
 * author jiangliuyang
 * date 2018/9/5
 * @class LimitedGiftVoApi
 */
class LimitedGiftVoApi extends BaseVoApi
{
	//color-->1浅色字    2深色字
    public rechargeCfgMap = {
        g29: {title:"limitedGiftSoldierEmpty",img:"1",color:1},//士兵空了
		g30: {title:"limitedGiftGoldEmpty",img:"2",color:2},	//银两空了      限时银两
		g31: {title:"limitedGiftPowerEmpty",img:"3",color:2},	//体力空了      限时寻访
		g32: {title:"limitedGiftEnergyEmpty",img:"4",color:1},	//红颜精力空了   限时
		g33: {title:"limitedGiftVigourEmpty",img:"5",color:1},  //子嗣活力空了   限时培养
        g34: {title:"limitedGiftDinnerEmpty",img:"6",color:2},	//酒楼举办宴会   限时宴会

        //二期
        g85: {title:"limitedGiftSoldierEmpty2",img:"1_2",color:1,num:1},//士兵空了
        g86: {title:"limitedGiftSoldierEmpty2",img:"1_2",color:1,num:2},//士兵空了
        g87: {title:"limitedGiftSoldierEmpty2",img:"1_2",color:1,num:3},//士兵空了
        g88: {title:"limitedGiftGoldEmpty2",img:"2_2",color:2,num:1},	//银两空了      限时银两
        g89: {title:"limitedGiftGoldEmpty2",img:"2_2",color:2,num:2},	//银两空了      限时银两
        g90: {title:"limitedGiftGoldEmpty2",img:"2_2",color:2,num:3},	//银两空了      限时银两
        g91: {title:"limitedGiftPowerEmpty2",img:"3_2",color:2,num:1},	//体力空了      限时寻访
        g92: {title:"limitedGiftPowerEmpty2",img:"3_2",color:2,num:2},	//体力空了      限时寻访
        g93: {title:"limitedGiftPowerEmpty2",img:"3_2",color:2,num:3},	//体力空了      限时寻访
        g94: {title:"limitedGiftEnergyEmpty2",img:"4_2",color:1,num:1},	//红颜精力空了   限时
        g95: {title:"limitedGiftEnergyEmpty2",img:"4_2",color:1,num:2},	//红颜精力空了   限时
        g96: {title:"limitedGiftEnergyEmpty2",img:"4_2",color:1,num:3},	//红颜精力空了   限时
        g97: {title:"limitedGiftVigourEmpty2",img:"5_2",color:1,num:1},  //子嗣活力空了   限时培养
        g98: {title:"limitedGiftVigourEmpty2",img:"5_2",color:1,num:2},  //子嗣活力空了   限时培养
        g99: {title:"limitedGiftVigourEmpty2",img:"5_2",color:1,num:3},  //子嗣活力空了   限时培养
        g100: {title:"limitedGiftDinnerEmpty2",img:"6_2",color:2,num:1},	//酒楼举办宴会   限时宴会
        g101: {title:"limitedGiftDinnerEmpty2",img:"6_2",color:2,num:2},	//酒楼举办宴会   限时宴会
        g102: {title:"limitedGiftDinnerEmpty2",img:"6_2",color:2,num:3}	//酒楼举办宴会   限时宴会
	};
    public typeMap = {
        SOLDIER_EMPTY:"g29",
        GOLD_EMPTY:"g30",
        POWER_EMPTY:"g31",
        ENERGY_EMPTY:"g32",
        VIGOUR_EMPTY:"g33",
        DINNER_EMPTY:"g34",

        //二期
        SOLDIER_EMPTY_1:"g85",
        SOLDIER_EMPTY_2:"g86",
        SOLDIER_EMPTY_3:"g87",
        GOLD_EMPTY_1:"g88",
        GOLD_EMPTY_2:"g89",
        GOLD_EMPTY_3:"g90",
        POWER_EMPTY_1:"g91",
        POWER_EMPTY_2:"g92",
        POWER_EMPTY_3:"g93",
        ENERGY_EMPTY_1:"g94",
        ENERGY_EMPTY_2:"g95",
        ENERGY_EMPTY_3:"g96",
        VIGOUR_EMPTY_1:"g97",
        VIGOUR_EMPTY_2:"g98",
        VIGOUR_EMPTY_3:"g99",
        DINNER_EMPTY_1:"g100",
        DINNER_EMPTY_2:"g101",
        DINNER_EMPTY_3:"g102",
    };

    public typeMap2 = {
        SOLDIER: {SOLDIER_EMPTY:"g29", SOLDIER_EMPTY_1:"g85",SOLDIER_EMPTY_2:"g86", SOLDIER_EMPTY_3:"g87"},
        GOLD: {GOLD_EMPTY:"g30", GOLD_EMPTY_1:"g88",  GOLD_EMPTY_2:"g89", GOLD_EMPTY_3:"g90"},
        POWER:{POWER_EMPTY:"g31",POWER_EMPTY_1:"g91", POWER_EMPTY_2:"g92",POWER_EMPTY_3:"g93"},
        ENERGY:{ENERGY_EMPTY:"g32", ENERGY_EMPTY_1:"g94", ENERGY_EMPTY_2:"g95", ENERGY_EMPTY_3:"g96"},
        VIGOUR:{VIGOUR_EMPTY:"g33", VIGOUR_EMPTY_1:"g97", VIGOUR_EMPTY_2:"g98", VIGOUR_EMPTY_3:"g99"},
        DINNER:{DINNER_EMPTY:"g34", DINNER_EMPTY_1:"g100",DINNER_EMPTY_2:"g101",DINNER_EMPTY_3:"g102"}
    };
    //直接强弹
    private openList:any[] = [
        this.typeMap.GOLD_EMPTY,this.typeMap.VIGOUR_EMPTY,this.typeMap.DINNER_EMPTY,
        this.typeMap.GOLD_EMPTY_1, this.typeMap.GOLD_EMPTY_2,
        this.typeMap.GOLD_EMPTY_3, this.typeMap.VIGOUR_EMPTY_1, this.typeMap.VIGOUR_EMPTY_2 ,this.typeMap.VIGOUR_EMPTY_3, this.typeMap.DINNER_EMPTY_1,this.typeMap.DINNER_EMPTY_2,this.typeMap.DINNER_EMPTY_3
    ];

	public constructor() 
	{
		super();
	}

	

	/**
	 * 微信小程序 限时礼包强弹
	 */
	//检查是否有限时礼包  如果有返回最少剩余时间  如果没有返回0
	public checkHaveLimitedGift():number
	{
	
        let vo = null;
        let cfg = null;
        let lastTime = 0;
        for (let key in this.rechargeCfgMap){
            vo = Api.shopVoApi.getPayInfoById2(key);
            cfg = Config.RechargeCfg.getRechargeItemCfgByKey(key);
            if(vo && cfg && vo.isbuy == 0){
                let timeTmp = vo.st + cfg.lastTime - GameData.serverTime;
              
                if (timeTmp > 0 && (timeTmp < lastTime || lastTime == 0)){
                    lastTime = timeTmp;
                }
                

            }
        }

		return lastTime;
	}
    //自动检测是否开启限时礼包强弹
    public autoOpenLimitedGiftWin():void
    {
        if(Api.switchVoApi.checkLimitedGift()){
            let openKey = Api.shopVoApi.getPayShow();
            if (openKey!= null){
                let isOpen = false;
                for(let i = 0 ;i < this.openList.length; i ++){
                    if(this.openList[i] == openKey){
                        isOpen = true;
                        break;
                    }
                }
                if(isOpen){
                    ViewController.getInstance().openView(ViewConst.POPUP.LIMITEDGIFTVIEW);
                 
                }
            }
        }

    }
    
    //手动检测是否开启了限时礼包强弹
    public manualOpenLimitedGiftWin(code:any):void
    {
        if(Api.switchVoApi.checkLimitedGift()){
            let openKey = Api.shopVoApi.getPayShow();
            // if (openKey != null && openKey == code){
            //     ViewController.getInstance().openView(ViewConst.POPUP.LIMITEDGIFTVIEW);
            // }
            App.LogUtil.log("manualOpenLimitedGiftWin "+openKey);
            if (typeof code == "object" && openKey != null){
                for (let key in code){
                    if (code[key] == openKey){
                        App.LogUtil.log("manualOpenLimitedGiftWin true");
                        ViewController.getInstance().openView(ViewConst.POPUP.LIMITEDGIFTVIEW);
                        break;
                    }
                }
            }
        }
    }  
    public checkRedPoint():boolean
    {
        let redKey = Api.shopVoApi.getPayRedpoint();
  
        if(redKey){
            return true;
        } else {
            return false;
        }
    }
    public manualOpenDinnerWin():void
    {
        if(Api.switchVoApi.checkLimitedGift()){
            // let vo = Api.shopVoApi.getPayInfoById2(this.typeMap.DINNER_EMPTY);
            // let cfg = Config.RechargeCfg.getRechargeItemCfgByKey(this.typeMap.DINNER_EMPTY);
            // if((!vo) && cfg ){
            //     //首次点击宴会
            //     NetManager.request(NetRequestConst.REQUEST_DINNER_SHOWNEEDITEM,{});
            // }
            let data = this.typeMap2.DINNER;
            for (let key in data){
                let vo = Api.shopVoApi.getPayInfoById2(data[key]);
                let cfg = Config.RechargeCfg.getRechargeItemCfgByKey(data[key]);
                if( cfg && (!vo) || (vo && (vo.buyTimes && vo.buyTimes < cfg.oneDayLimit) || (vo.isbuy == 0 && ((vo.refuse && vo.refuse < cfg.maxNum) || !vo.refuse)))){
                    //首次点击宴会
                    App.LogUtil.log("点击宴会");
                    NetManager.request(NetRequestConst.REQUEST_DINNER_SHOWNEEDITEM,{});
                    return;
                }
            }
        }
    }

    //是否达到最大拒绝次数
    public isMaxLimitedGiftRefuseNum(id:string):boolean{
        if (!id || !Api.switchVoApi.checkLimitedGift2()){
            return false;
        }
        let rechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(id);
        while (rechargeCfg && rechargeCfg.lastID){
            rechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(rechargeCfg.lastID);
        }
        let vo = Api.shopVoApi.getPayInfoById2(rechargeCfg.id);
        let currCfg = Config.RechargeCfg.getRechargeItemCfgByKey(id);
        if (vo && vo.refuse && currCfg.maxNum && currCfg.maxNum <= vo.refuse + 1){
            return true;
        }
        return false;
    }



	public dispose():void
	{
		super.dispose();
	}
}