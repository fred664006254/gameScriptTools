/**
 * author:qianjun
 * desc:世界杯活动积分商店item
*/
class AcWorldCupTab3Item extends ScrollListItem
{
    private _data : any = null;
    private _curIdx : number = 0;
    private _limitTxt : BaseTextField = null;
    private _lastReqIdx : number = null;
    private _buyBtn : BaseButton = null;
	public constructor() {
		super();
    }
    
	private get cfg() : Config.AcCfg.WorldCupCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACWORLDCUP, this._code);
    }

    private get vo() : AcWorldCupVo{
        return <AcWorldCupVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACWORLDCUP, this._code);
    }

    private get acTivityId() : string{
        return `${AcConst.AID_ACWORLDCUP}-${this._code}`;
    }

	private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 600;
		view.height = 140 + 10;
		view._data = data;
		view._curIdx = index;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPUSE),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
		let rewardsArr:Array<RewardItemVo> = GameData.formatRewardItem(data.goods);

		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
		wordsBg.width  = 598;
		wordsBg.height = 140; 
		this.addChild(wordsBg); 

		let icon : any = data.rewardIcons[0];
		let bindData : any = icon.bindData;
		view.setLayoutPosition(LayoutConst.leftverticalCenter, icon, wordsBg, [22,0]);
		view.addChild(icon);

		let itemNameBg:BaseBitmap = BaseBitmap.create("public_9_bg15");
		itemNameBg.width = 180;
		view.setLayoutPosition(LayoutConst.lefttop, itemNameBg, icon, [icon.width + 10,5]);
		view.addChild(itemNameBg);

		let itemNameTF:BaseTextField = ComponentManager.getTextField(bindData.name,TextFieldConst.FONTSIZE_TITLE_SMALL,rewardsArr[0].nameColor);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemNameTF, itemNameBg);
		view.addChild(itemNameTF);

		let itemDescTF:BaseTextField = ComponentManager.getTextField(rewardsArr[0].desc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		itemDescTF.textAlign = egret.HorizontalAlign.LEFT;
		itemDescTF.width = 200;
		view.setLayoutPosition(LayoutConst.lefttop, itemDescTF, itemNameBg, [0,itemNameBg.height + 2]);
		view.addChild(itemDescTF);

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"nothing",this.buyHandler,this)
		let str = data.needCoin.toString(); 
		btn.setText(str,false);
		btn.addTextIcon("worldcupfootball",1);
		view.setLayoutPosition(LayoutConst.rightverticalCenter, btn, view, [22,0]);
		view.addChild(btn);
		view._buyBtn = btn;
		if(!view.vo.isInActivity()){
			btn.setGray(true);
		}

		//折扣
        if(data.discount){
            let tag = BaseBitmap.create('shopview_corner');
            view.setLayoutPosition(LayoutConst.lefttop, tag, view);
			view.addChild(tag);
			
            let tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('discountTitle',[(data.discount * 10).toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
            tagTxt.rotation = -45;
            view.setLayoutPosition(LayoutConst.lefttop, tagTxt, icon, [-18,11]);
			view.addChild(tagTxt);
			let itemicon = BaseBitmap.create('worldcupfootball');//
			let oldTxt = ComponentManager.getTextField(LanguageManager.getlocal('acMayDayOldProce'), 18, TextFieldConst.COLOR_BLACK);
			let priceTxt = ComponentManager.getTextField(data.originalCost.toString(), 18, TextFieldConst.COLOR_BLACK);
			let desc = (btn.width - (oldTxt.textWidth + 40 + priceTxt.textWidth))/2;

			view.setLayoutPosition(LayoutConst.lefttop, oldTxt, btn, [desc,0-oldTxt.textHeight-8]);
			view.addChild(oldTxt);

			view.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, oldTxt, [oldTxt.textWidth,0]);
			view.addChild(itemicon);

			view.setLayoutPosition(LayoutConst.lefttop, priceTxt, oldTxt, [100*0.4+oldTxt.textWidth,0]);
			view.addChild(priceTxt);

			let line = BaseBitmap.create('shopview_line');
			view.setLayoutPosition(LayoutConst.leftverticalCenter, line, oldTxt, [(line.width - (oldTxt.textWidth + 40 + priceTxt.textWidth))/2,0]);
			view.addChild(line);
        }

        //限购
        if(data.limit){
            let curNum = data.limit - view.vo.getBuyLimitnum(data.sortId + 1);
            let limitTxt = ComponentManager.getTextField(LanguageManager.getlocal('DragonBoatDayLimit',[curNum.toString()]), 20, TextFieldConst.COLOR_BLACK);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, btn, [0, btn.height + 5]);
            view.addChild(limitTxt);
			view._limitTxt = limitTxt;
			if(curNum <= 0){
				view._buyBtn.setEnable(false);
			}
        }
		//this.update();
	} 

	private buyHandler(evt:egret.TouchEvent):void
	{
		let vo = this.vo; 
		if(!vo)
		{
			return;
		}
		let period = this.vo.getCurPeriod();
		if(period != 3){
			App.CommonUtil.showTip(LanguageManager.getlocal(period == 4 ? "acPunishEnd" : "AcWorldCupShopNotIn"));
			return;
		}
		// if(this.vo.et < GameData.serverTime){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
        //     return;
		// }
		let view = this;
        let curNum = view._data.limit - view.vo.getBuyLimitnum(view._data.sortId + 1);
        if(curNum <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
        }
        
        if(view.vo.getCurPoints() < view._data.needCoin){
            App.CommonUtil.showTip(LanguageManager.getlocal('AcWorldCupShopNotEnough'));
            return;
		}

		view.confirmCallbackHandler();
	}

	//弹出消费提示框显示确认
	private confirmCallbackHandler(): void
	{
		let view = this;
		view._lastReqIdx = this._curIdx;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPUSE, {
            activeId : view.acTivityId,
            mid : view._data.sortId + 1
        });	
	}

	protected eventCollectHandlerCallBack(event:egret.Event)
    {
		let view = this;
		let rData = event.data.data.data;
		if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        if (view._lastReqIdx != this._curIdx)
        {
            return;
        }
        view._lastReqIdx = null;
        // //this.update();
        // let rewards = rData.rewards
        // let rewardList =  GameData.formatRewardItem(rewards);
        // let pos =  AcDragonBoatDayTab4ScrollItem._lastPos;
		// App.CommonUtil.playRewardFlyAction(rewardList,pos);
		let data = event.data;
		let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
        let pos = view._buyBtn.localToGlobal(view._buyBtn.width/2, view._buyBtn.y/2);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        let curNum = view._data.limit - view.vo.getBuyLimitnum(view._data.sortId + 1);
		view._limitTxt.text = LanguageManager.getlocal('DragonBoatDayLimit',[curNum.toString()]);
		if(curNum <= 0){
			view._buyBtn.setEnable(false);
        }
        if(Number(view._data.sortId) == 1){
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._limitTxt, view._buyBtn, [0, view._buyBtn.height + 5]);
    }

   
	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
    {
        let view = this;
        view._limitTxt = null;
        view._buyBtn = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPUSE),this.eventCollectHandlerCallBack,this);
        super.dispose();
    }
}