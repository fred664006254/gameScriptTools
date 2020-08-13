//
class AcCrossServerHegemonyRewardViewTab3 extends CommonViewTab
{
	private _list : ScrollList = null;
	private _scoreText:BaseTextField = null;
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

		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFIGHTSHOP,this.refreshData,this);

        let bg = BaseBitmap.create("common_9_bg");
        bg.width = GameConfig.stageWidth;
        bg.height = GameConfig.stageHeigth - 89 - 60;
        bg.setPosition(0, 0);
        this.addChild(bg);

        // let redBg = BaseBitmap.create("accshegemony_mainredbg");
        // redBg.x = GameConfig.stageWidth/2 - redBg.width/2;
        // redBg.y = bg.y + 9;
		// this.addChild(redBg);
		
		let redBg = BaseBitmap.create("accshegemony_ranktitlebg");
		redBg.width = 600;
        redBg.x = GameConfig.stageWidth/2 - redBg.width/2;
        redBg.y = bg.y + 9;
        this.addChild(redBg);

		this._scoreText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRewardFightScoreTxt",[this.vo.resultscore]),24,TextFieldConst.COLOR_WARN_YELLOW);
		this._scoreText.x = redBg.x + redBg.width/2 - this._scoreText.width/2;
		this._scoreText.y = redBg.y + redBg.height/2 - this._scoreText.height/2;
		this.addChild(this._scoreText);

		let tmpRect =  new egret.Rectangle(0,0,612, GameConfig.stageHeigth - 221); //240
		let shopList = this.cfg.getFightScoreShopList();
		let scrollList = ComponentManager.getScrollList(AcCrossServerHegemonyRewardScrollItem3, shopList, tmpRect, {aid:this.param.data.aid,code:this.param.data.code});
		//32.5
		//56.5
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [46.5, 65]);
		scrollList.x = GameConfig.stageWidth/2 - scrollList.width/2;
		scrollList.y = 51; //70
		this.addChild(scrollList);
		this._list = scrollList;
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
	public refreshData(event:egret.Event):void{
		let shopList = this.cfg.getFightScoreShopList();
		this._list.refreshData(shopList,{aid:this.param.data.aid,code:this.param.data.code});
		this._scoreText.text = LanguageManager.getlocal("acCrossServerHegemonyRewardFightScoreTxt",[this.vo.resultscore]);
		this._scoreText.x = this.width/2 - this._scoreText.width/2;

		if(event){
			if(event.data && event.data.ret){
				let data = event.data.data.data;
				let rewards = data.rewards
				let rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);
			}
		}
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
		// let view = this;
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,view.update,view);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY),view.collectHandlerCallBack,view);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFIGHTSHOP,this.refreshData,this);
		this._list = null;
		this._scoreText = null;
		super.dispose();
	}

}