/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 回归签到itemrender
 */
class PlayerReturnViewTab1ScrollItem extends ScrollListItem
{
	private _data=null; 
	private _lqBtn : BaseButton = null;
	private _lqImg : BaseBitmap = null;
 
	private _curIdx:number=0;
	private static _lastReqIdx:number = null;
    private static _lastPos: any = null;

	public constructor() 
	{
		super();
	}

	private get cfg(){
        return Config.PlayerreturnCfg;
    }

    private get api(){
        return Api.playerReturnVoApi;
    }
	
	
	private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 608;
		view.height = 180 + 10;
		view._data = data;
		view._curIdx = index;
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
		let wordsBg : BaseBitmap = BaseBitmap.create("activity_db_01");  
		wordsBg.width  = view.width;
		wordsBg.height = view.height - 10; 
		view.setLayoutPosition(LayoutConst.horizontalCentertop, wordsBg, view);
		view.addChild(wordsBg); 

		let line = BaseBitmap.create("activity_charge_red");
		line.width = 384
        line.y = 3;
        this.addChild(line);

		// let topbg : BaseBitmap = BaseBitmap.create("acmidautumnview_titlebg");  
		// view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, wordsBg, [0,5]);
		// view.addChild(topbg); 

		let datTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`PlayerReturnSignDay`,[data.days]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, datTxt, line,[20,0]);
		view.addChild(datTxt); 

		//创建奖励列表
		let rewardArr : Array<RewardItemVo> = GameData.formatRewardItem(`${data.getReward}|${data.getRewardVIP}`);
		let scroStartY = 45;
		let tmpX = 15;
		for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true,false);
			let signGet = BaseBitmap.create('playersign');
			// tmpX =  20+ index * (iconItem.width+10);
			if(index >= (rewardArr.length - data.getRewardVIP.split('|').length)){

				if(view.cfg.needVip != 0){
					let vipbg = BaseBitmap.create(`playerreturnvipbg`);
					iconItem.setLayoutPosition(LayoutConst.horizontalCentertop, vipbg, iconItem, [0,0], true);
					iconItem.addChild(vipbg);

					let vipTxt = ComponentManager.getTextField(LanguageManager.getlocal('PlayerReturnVipCondition', [view.cfg.needVip.toString()]),16,TextFieldConst.COLOR_LIGHT_YELLOW);
					iconItem.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, vipTxt, vipbg);
					iconItem.addChild(vipTxt);
				}

				signGet.visible = view.api.isGetSignAllReward(view._data.key);
			}else{
				signGet.visible = view.api.isGetSignOdReward(view._data.key) || view.api.isGetSignAllReward(view._data.key);
			}

			iconItem.setScale(0.8);
			iconItem.x = tmpX;
			iconItem.y = scroStartY;
			if(signGet.visible){
				App.DisplayUtil.changeToGray(iconItem);
			}
			tmpX += (iconItem.width * iconItem.scaleX + 10);
			if (tmpX > (15 + 4 * 108 * iconItem.scaleX + 4 * 10))
			{
				tmpX = 15;
				scroStartY += (iconItem.height * iconItem.scaleY + 10);
				iconItem.x = tmpX;
				iconItem.y = scroStartY;
				tmpX += (iconItem.width * iconItem.scaleX + 10);
			}
			view.addChild(iconItem);
			view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, signGet, iconItem, [0,0]);
			view.addChild(signGet);
		}
		scroStartY += (108 * 0.8);
        wordsBg.height = scroStartY + 20;
        view.height = wordsBg.height;

		//进度
		let curDay = view.api.getSignDay();
		let jinduTxt = ComponentManager.getTextField(`${curDay}/${data.days}`,24,(curDay >= data.days ? 0x3e9b00 : TextFieldConst.COLOR_BLACK));
		view.setLayoutPosition(LayoutConst.righttop, jinduTxt, view, [80,40]);
		view.addChild(jinduTxt);

		let lqBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'taskCollect', view.lqBtnClick, view);
		view.setLayoutPosition(LayoutConst.righttop, lqBtn, view, [10,  70]);
		view.addChild(lqBtn);
		view._lqBtn = lqBtn;

		let lqimg = BaseBitmap.create(`collectflag`);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lqimg, lqBtn);
		view.addChild(lqimg);
		view._lqImg = lqimg;
	
		if(view.api.isGetSignAllReward(data.key)){
			view._lqImg.visible = true;
			view._lqBtn.visible = false;
		}
		else{
			view._lqImg.visible = false;
			view._lqBtn.visible = true;
			if(view.api.isGetSignOdReward(data.key)){
				lqBtn.setGray(Api.playerVoApi.getPlayerVipLevel() < view.cfg.needVip);
			}
			else{
				lqBtn.setGray(curDay < view._data.days);
			}
		}
		if(!view.api.isInActTime()){
			lqBtn.setGray(true);
		}

		view._lqImg.visible = view.api.isGetSignAllReward(data.key);
		view._lqBtn.visible = !view._lqImg.visible;
	}

	private lqBtnClick(evt : egret.Event){
		let view = this;
		if(view.api.isInActTime()){
			if(Api.playerVoApi.getPlayerLevel() >= view.cfg.playerStatusneed){
				let curDay = view.api.getSignDay();
				if(curDay >= view._data.days){
					if(view._lqBtn.getIsGray()){
						App.CommonUtil.showTip(LanguageManager.getlocal("PlayerReturnTip4",[view.cfg.needVip.toString()]));
					}
					else{
						view.api.setClickIdx(view._curIdx);
						NetManager.request(NetRequestConst.REBACK_GETSIGNREWARD,{
							"keyid" : view._data.key
						});
					}
				}
				else{
					App.CommonUtil.showTip(LanguageManager.getlocal("PlayerReturnTip5"));
				}	
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal("PlayerReturnTip3", [Api.playerVoApi.getPlayerOfficeByLevel(view.cfg.playerStatusneed)]));
			}
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
			view._lqBtn.setGray(true);
		}
	}

	// private buyCallBack(evt){
    //     let view = this;
    //     App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BUY),view.buyCallBack,view);
    //     let data = evt.data;
    //     if(data.data.ret < 0){
    //         return;
    //     }
    //     if (data.data.data.myemperor)
    //     {
    //         Api.emperorwarVoApi.setDataInfo(data.data.data.myemperor);
    //     }
    //     let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
    //     let pos = view._limitTxt.localToGlobal(view._limitTxt.textWidth + 20,20);
    //     App.CommonUtil.playRewardFlyAction(rewardList, pos);
    //     let curNum = view._data.limit - view.api.getBuyLimitnum(view._data.sortId);
    //     view._limitTxt.text = LanguageManager.getlocal('shopLimitBuy3',[curNum.toString()]);
    // }

	protected eventCollectHandlerCallBack(event:egret.Event)
    {
		let view = this;
		let rData = event.data.data.data;
		if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        if ( PlayerReturnViewTab1ScrollItem._lastReqIdx != this._curIdx)
        {
            return;
        }
        PlayerReturnViewTab1ScrollItem._lastReqIdx = null;
        // //this.update();
        // let rewards = rData.rewards
        // let rewardList =  GameData.formatRewardItem(rewards);
        // let pos =  AcDragonBoatDayTab4ScrollItem._lastPos;
		// App.CommonUtil.playRewardFlyAction(rewardList,pos);
		let data = event.data;
		let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
        let pos = view._lqBtn.localToGlobal(view._lqBtn.width/2, 20);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    }

   
	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {
		let view = this;
		view._data = null; 
		view._lqBtn = null;
		view._lqImg = null;
		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
		super.dispose();
	}
}