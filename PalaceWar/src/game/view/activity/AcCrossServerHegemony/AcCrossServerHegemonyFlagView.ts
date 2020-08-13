/**
 * 
 * desc:奖励弹窗
*/
class AcCrossServerHegemonyFlagView extends CommonView
{
	public constructor() {
		super();
	}

	protected get uiType():string
	{
		return "2";
	}

	protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}

	protected getTitleBgName():string{
		return ResourceManager.hasRes("achegemonyflag_titlebg-"+this.param.data.code) ? "achegemonyflag_titlebg-"+this.param.data.code : "achegemonyflag_titlebg-1";
	}

	protected getTitleStr():string{
		return "";
	}

	protected addTabbarGroupBg():boolean{
		return true;
	}

	protected isHideTitleBgShadow():boolean{
		return true;
	}

	protected getCloseBtnName():string{
        return ButtonConst.COMMON_CLOSE_1;
    }
	
	protected getTabbarTextArr():Array<string>
	{
		return [
			"acCrossServerHegemonyFlagTab4",
			"acCrossServerHegemonyFlagTab3",
			"acCrossServerHegemonyFlagTab1",
			"acCrossServerHegemonyFlagTab2",
		];
	}
    private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }	
	private get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }
	    /**
	 * 获取活动配置
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{

		if(this.param.data.aid && this.param.data.code)
		{
			return {requestType:NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGRANK,requestData:{activeId:this.param.data.aid + "-" + this.param.data.code}};
		}
		
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (!data.ret){
			return;
		}
		let rankData = data.data.data;
		// console.log(rankData);
		if(rankData){
			Api.crossServerHegemonyVoApi.setFlagRankData(rankData);
		}
	}
	protected getResourceList():string[]
	{ 
		return super.getResourceList().concat([
			"accshegemony_taskitemtitlebg", "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green", "arena_bottom","accshegemony_ranktitlebg",
			"achegemonyflag_titlebg-1","accshegemony_alliancecharge_lock", "accshegemony_alliancecharge_infobg",
		]);
	} 

	// 背景图名称
	// protected getBgName():string
	// {
	// 	return "commonview_woodbg";
	// }
	protected initView():void
	{	
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,this.refreshRed,this);
		// App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGSCORE,this.refreshRed,this);
		// App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_USEWARFLAG,this.refreshRed,this);
		// App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFLAGSHOP,this.refreshRed,this);
		// App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETTASKREWARD,this.refreshRed,this);
		// App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFLAGSHOP,this.refreshRed,this);
		
		this.tabbarGroup.setSpace(0);
		this.setTabBarPosition();
		this.tabbarGroup.x = GameConfig.stageWidth/2 - this.tabbarGroup.width/2;
		this.tabbarGroup.y = this.titleBg.y + this.titleBg.height - 12;
		if(this.tabbarGroupBg){
			this.tabbarGroupBg.x = GameConfig.stageWidth/2 - this.tabbarGroupBg.width/2;
			this.tabbarGroupBg.y = this.titleBg.y + this.titleBg.height - 3;
		}
		this.setBigFameY(-(this.tabbarGroup.y + this.tabbarGroup.height));
		this.setBigFameHeight(GameConfig.stageHeigth - 5);

		if(!this.vo.isCanJoin()){
			let unit = this.tabbarGroup.getTabBar(0);
			App.DisplayUtil.changeToGray(unit);
			this.selectedTabIndex = 1;
            this.tabbarGroup.selectedIndex = 1;
		}
		
		this.refreshRed();
	}

	protected checkTabCondition(index:number):boolean{
        let view = this;
        if(index == 0){
			if(view.vo.isCanJoin()){
				return true;
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal(`acCrossServerHegemonyAllianceRechargeNotTip`));
				return false;
			}
        }
        return true;
	}
	
	private refreshRed():void
	{
		if (this.vo.checkTaskRed()) {
			this.tabbarGroup.addRedPoint(1);
		} else {
			this.tabbarGroup.removeRedPoint(1);
		}
		//人气榜
		if (this.vo.canGetScore() > 0) {
			this.tabbarGroup.addRedPoint(2);
		} else {
			this.tabbarGroup.removeRedPoint(2);
		}
		if (this.vo.isCanGetAllianceRechargeReward()){
			this.tabbarGroup.addRedPoint(0);
		}
		else{
			this.tabbarGroup.removeRedPoint(0);
		}

	}
    // private canGetScore():number{

    //     let rankData = Api.crossServerHegemonyVoApi.getFlagRankData().rank;
    //     let needGetNum = 0;
    //     for(let i = 0;i < rankData.length; i++){
    //         let rData = rankData[i];
    //         if(Number(rData.endflag) != 0){
    //             if(this.vo.checkGetFlagByAid(rData.aid)){
    //                 let sendFlagNum = this.vo.getFlagNumByAid(rData.aid);
    //                 let rebate = this.cfg.getFlagRebateByRank(i + 1);
                    
    //                 needGetNum += sendFlagNum * rebate;
    //             }
    //         }
    //     }
    //     return needGetNum * this.cfg.flagScoreNum;

    // }
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,this.refreshRed,this);
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGSCORE,this.refreshRed,this);
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_USEWARFLAG,this.refreshRed,this);
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFLAGSHOP,this.refreshRed,this);
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETTASKREWARD,this.refreshRed,this);
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFLAGSHOP,this.refreshRed,this);

		super.dispose();
	}
}