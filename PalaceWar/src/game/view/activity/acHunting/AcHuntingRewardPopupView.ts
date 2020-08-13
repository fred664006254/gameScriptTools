/**
  * 东郊狩猎奖励
  * author 杨成国
  * date 2019.7.24
  * @class AcHuntingRewardPopupView
  */
 class AcHuntingRewardPopupView extends PopupView{
    public _chargeScrollList:ScrollList = null;
    public _killScorllList:ScrollList = null;
    public _tabbarGroup:TabBarGroup = null;
    public constructor(){
        super();
    }

    public initView(){
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HUNTING_GETCHARGE), this.refreshChargeReward, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_KILLREWARD), this.refreshKillReward, this);

        // 奖励tabbar
        let tabName:string[] = ["achuntingRechargeReward","achuntingKillReward-" + this.code];
        let tabbarGroup:TabBarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName, this.tabBtnClickHandler,this);
        tabbarGroup.setPosition(35+GameData.popupviewOffsetX,15);
        this.addChildToContainer(tabbarGroup);
        this._tabbarGroup = tabbarGroup;
        //奖励bg 
        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardBg.width / 2, tabbarGroup.y + tabbarGroup.height);
        this.addChildToContainer(rewardBg);
       
        //充值奖励
        let chargeData = this.vo.getSortRechargeCfg();
		let rect = new egret.Rectangle(5, 0, rewardBg.width - 10, rewardBg.height - 15);
		this._chargeScrollList = ComponentManager.getScrollList(AcHuntingChargeRewardScrollItem, chargeData, rect, {aid:this.aid, code:this.code});
		this._chargeScrollList.setPosition(rewardBg.x + 5, rewardBg.y + 5);
		this.addChildToContainer(this._chargeScrollList);

        //击杀奖励
        let killRewardList:any[] = this.vo.getSortAchievementCfg();
		let rewardRect = new egret.Rectangle(5, 0, rewardBg.width - 10, rewardBg.height - 15);
		this._killScorllList = ComponentManager.getScrollList(AcHuntingKillRewardScrollItem, killRewardList, rewardRect, {aid:this.aid, code:this.code});
		this._killScorllList.setPosition(rewardBg.x + 5, rewardBg.y + 5);
		this.addChildToContainer(this._killScorllList);
        this._killScorllList.visible = false;
        
        if (this.vo.isShowChargeRewardRedDot()){
            this._tabbarGroup.addRedPoint(0);
        } 
        else{
            this._tabbarGroup.removeRedPoint(0);
        }

        if (this.vo.isShowKillRewardRedDot()){
            this._tabbarGroup.addRedPoint(1);
        } 
        else{
            this._tabbarGroup.removeRedPoint(1);
        }
    }

    public tabBtnClickHandler(params:any){
        if (params.index == 1){
            this.showKillRewardUI();
        }
        else{
            this.showChargeRewardUI();
        }
    }

    public showChargeRewardUI(){
        this._killScorllList.visible = false;
        this._chargeScrollList.visible = true;
    }

    public showKillRewardUI(){
        this._killScorllList.visible = true;
        this._chargeScrollList.visible = false;
    }

    public refreshChargeReward(event:egret.Event):void{
        if (event.data.ret){
            let data = event.data.data.data;
            let specialGift = data.specialGift;
            App.LogUtil.log("refreshChargeReward: "+specialGift+ " rewards:"+data.rewards);
            let rewards = "1023_0_" + specialGift + "_" + this.code + "|" + data.rewards;
            // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"isPlayAni":true});
            let rewardVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
            if (data.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": data.replacerewards });
            }
            if (this.vo.isShowChargeRewardRedDot()){
                this._tabbarGroup.addRedPoint(0);
            } 
            else{
                this._tabbarGroup.removeRedPoint(0);
            }
            let dataList = this.vo.getSortRechargeCfg();
            this._chargeScrollList.refreshData(dataList, {aid:this.aid, code:this.code});
        } 
    }

    public refreshKillReward(event:egret.Event):void{
        if (event.data.ret){
            let data = event.data.data.data;
            // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":data.rewards,"isPlayAni":true});
            let rewardVoList = GameData.formatRewardItem(data.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
            if (data.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": data.replacerewards });
            }
            if (this.vo.isShowKillRewardRedDot()){
                this._tabbarGroup.addRedPoint(1);
            } 
            else{
                this._tabbarGroup.removeRedPoint(1);
            }
            let dataList = this.vo.getSortAchievementCfg();
            this._killScorllList.refreshData(dataList, {aid:this.aid, code:this.code});
        }
    }

    public refreashView():void{
        if (this.vo.isShowChargeRewardRedDot()){
            this._tabbarGroup.addRedPoint(0);
        } 
        else{
            this._tabbarGroup.removeRedPoint(0);
        }
        let dataList = this.vo.getSortRechargeCfg();
        this._chargeScrollList.refreshData(dataList, {aid:this.aid, code:this.code});
    }

    /**
	 * 配置文件数据
	 */
	private get cfg() : Config.AcCfg.HuntingCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcHuntingVo{
        return <AcHuntingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

     /**标题 */
	protected getTitleStr():string
	{
		return "achuntingRewardTitle";
	}
	protected getShowHeight():number
	{
		return 830;
    }
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "accarnivalview_tab_green", "accarnivalview_tab_red",
            "progress5", "progress3_bg",
            "collectflag","progress8",
            "common_titlebg",
		]);
	}

     public dispose(){
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HUNTING_GETCHARGE), this.refreshChargeReward, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_KILLREWARD), this.refreshChargeReward, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        super.dispose();
     }

 }