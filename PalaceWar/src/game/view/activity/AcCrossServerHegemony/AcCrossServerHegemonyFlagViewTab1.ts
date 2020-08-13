//充值奖励
class AcCrossServerHegemonyFlagViewTab1 extends CommonViewTab
{
	private _list : ScrollList = null;
	private _scoreText:BaseTextField = null;
	private _totalNum:BaseTextField = null;
	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	
    private get api() : CrossServerHegemonyVoApi
    {
        return Api.crossServerHegemonyVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected initView():void
	{
		// let view = this;
		// this.width = 600;
		// this.height = 610;
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,this.update,this);
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY),view.collectHandlerCallBack,view);

		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETALLIANCECHARGERDW,this.refreshData,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,this.refreshData,this);

		let topBg = BaseBitmap.create("public_9_bg1");
		topBg.width = 620;
		topBg.setPosition(GameConfig.stageWidth/2 - topBg.width/2, 10);
		this.addChild(topBg);

		let topInfo = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRechargeTaskInfo"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		topInfo.width = topBg.width - 20;
		topInfo.lineSpacing = 4;
		this.addChild(topInfo);
		topInfo.setPosition(topBg.x + topBg.width/2 - topInfo.width/2, topBg.y + 10);

		let totalNum = this.vo.getAllianceTotalRecharge();
		let totalRecharge = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRechargeAllianceCurrTotal", [""+totalNum]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		totalRecharge.setPosition(topInfo.x + topInfo.width/2 - totalRecharge.width/2, topInfo.y + topInfo.height + 7);
		this.addChild(totalRecharge);
		this._totalNum = totalRecharge;

		topBg.height = topInfo.height + totalRecharge.height + 27;

		let tmpRect =  new egret.Rectangle(0,0,620, GameConfig.stageHeigth - 99 - 60 - 10 - topBg.height);
		let rechargeList = this.vo.getSortAllianceRechargeData();
		let scrollList = ComponentManager.getScrollList(AcCrossServerHegemonyFlagScrollList1, rechargeList, tmpRect, {aid:this.param.data.aid,code:this.param.data.code, requestEvent: NetRequestConst.REQUEST_ACRECOVERY_CHARGE});
		//32.5
		//56.5
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [46.5, 65]);
		scrollList.x = GameConfig.stageWidth/2 - scrollList.width/2;
		scrollList.y = 10 + topBg.height;
		this.addChild(scrollList);
		this._list = scrollList;
	}

	public refreshData(event?:egret.Event):void{
		let rechargeList = this.vo.getSortAllianceRechargeData();
		this._list.refreshData(rechargeList,{aid:this.param.data.aid,code:this.param.data.code});
		if(event){
			if(event.data && event.data.ret){
				let data = event.data.data.data;
				let rewards = data.rewards;
				let rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);
			}
		}
		this._totalNum.text = LanguageManager.getlocal("acCrossServerHegemonyRechargeAllianceCurrTotal", [""+this.vo.getAllianceTotalRecharge()]);
		this._totalNum.x = GameConfig.stageWidth/2 - this._totalNum.width/2;
	}
	
	private rankClick():void{
		let view = this;
		// if(view.api.getCurpeirod() < 8){
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
		// 	return;
		// }
		ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        //
	}

    private rewardClick():void{
		let view = this;
		// if(view.api.getCurpeirod() < 8){
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
		// 	return;
		// }
		// else{
		// 	if(view.api.getIsWinner()){
		// 		NetManager.request(NetRequestConst.REQUST_SERVANTPK_GETPREWARD,{
		// 			activeId:view.api.vo.aidAndCode,
		// 		})
		// 	}
		// 	else{
		// 		App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip7"));
		// 		return;
		// 	}
		// }
    }


	public update(evt : egret.Event):void{

		if(this.api.getScoreClickType() == 'a'){
            return;
		}
		// let arr = view.vo.getArr('scoreMarket');
		// view._list.refreshData(arr, view.param.data.code);
		let index = this.api.getScoreClickIdx();
		let item : any = this._list.getItemByIndex(index);
		item.update();
	}

	private collectHandlerCallBack(evt : egret.Event):void{
		let view = this;
		let data = evt.data;
        if(data.data.ret < 0 || view.api.getScoreClickType() == 'a'){
            return;
		}
		let index = view.api.getScoreClickIdx();
		let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
		let item = view._list.getItemByIndex(index);
		let pos = item.localToGlobal(67, 195);
		App.CommonUtil.playRewardFlyAction(rewardList, pos);
	}
	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETALLIANCECHARGERDW,this.refreshData,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,this.refreshData,this);

		// let view = this;
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,view.update,view);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY),view.collectHandlerCallBack,view);
		this._list = null;
		this._scoreText = null;
		super.dispose();
	}

}