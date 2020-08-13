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

        g60: {title:"limitedGiftSoldierEmpty2",img:"1_2",color:1},//士兵空了
		g61: {title:"limitedGiftGoldEmpty2",img:"2_2",color:1},	//银两空了      限时银两
		g62: {title:"limitedGiftPowerEmpty2",img:"3_2",color:1},	//体力空了      限时寻访
		g63: {title:"limitedGiftEnergyEmpty2",img:"4_2",color:1},	//红颜精力空了   限时
		g64: {title:"limitedGiftVigourEmpty2",img:"5_2",color:1},  //子嗣活力空了   限时培养
		g65: {title:"limitedGiftDinnerEmpty2",img:"6_2",color:1}	//酒楼举办宴会   限时宴会
	};
    public typeMap = {
        SOLDIER_EMPTY:"g29",
        GOLD_EMPTY:"g30",
        POWER_EMPTY:"g31",
        ENERGY_EMPTY:"g32",
        VIGOUR_EMPTY:"g33",
        DINNER_EMPTY:"g34",

        SOLDIER_EMPTY2:"g60",
        GOLD_EMPTY2:"g61",
        POWER_EMPTY2:"g62",
        ENERGY_EMPTY2:"g63",
        VIGOUR_EMPTY2:"g64",
        DINNER_EMPTY2:"g65"

    };
    public lockTypeMap = {
        g60:true,
        g61:true,
        g62:true,
        g63:true,
        g64:true,
        g65:true
    };

    //直接强弹
    private openList:any[] = [
                                this.typeMap.GOLD_EMPTY,    this.typeMap.VIGOUR_EMPTY,  this.typeMap.DINNER_EMPTY,
                                this.typeMap.GOLD_EMPTY2,   this.typeMap.VIGOUR_EMPTY2, this.typeMap.DINNER_EMPTY2
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

            if(this.lockTypeMap[key]){
                if(!Api.switchVoApi.checkLimitedGift2()){
                    continue;
                }
            }

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
                    if (this.lockTypeMap[openKey])
                    {
                        if(Api.switchVoApi.checkLimitedGift2()){
                            ViewController.getInstance().openView(ViewConst.POPUP.LIMITEDGIFTVIEW);
                        }
                    } else {
                        ViewController.getInstance().openView(ViewConst.POPUP.LIMITEDGIFTVIEW);
                    }
                }
            }
        }

    }
    
    //手动检测是否开启了限时礼包强弹
    public manualOpenLimitedGiftWin(code:string):void
    {
        if(Api.switchVoApi.checkLimitedGift()){
            let openKey = Api.shopVoApi.getPayShow();
            if (openKey != null && openKey == code)
            {
                if(this.lockTypeMap[code])
                {
                    if(Api.switchVoApi.checkLimitedGift2())
                    {
                       ViewController.getInstance().openView(ViewConst.POPUP.LIMITEDGIFTVIEW); 
                    }
                } else {
                    ViewController.getInstance().openView(ViewConst.POPUP.LIMITEDGIFTVIEW);
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
            let vo = Api.shopVoApi.getPayInfoById2(this.typeMap.DINNER_EMPTY);
            let cfg = Config.RechargeCfg.getRechargeItemCfgByKey(this.typeMap.DINNER_EMPTY);
            if((!vo) && cfg ){
                //首次点击宴会
                NetManager.request(NetRequestConst.REQUEST_DINNER_SHOWNEEDITEM,{});
            } else {
                if (Api.switchVoApi.checkLimitedGift2()){
                    let vo2 = Api.shopVoApi.getPayInfoById2(this.typeMap.DINNER_EMPTY2);
                    let cfg2 = Config.RechargeCfg.getRechargeItemCfgByKey(this.typeMap.DINNER_EMPTY2);
                    if((!vo2) && cfg2 ){
                        //首次点击宴会
                        NetManager.request(NetRequestConst.REQUEST_DINNER_SHOWNEEDITEM,{});
                    } 
                }
            }
        }
    }



	public dispose():void
	{
		super.dispose();
	}
}