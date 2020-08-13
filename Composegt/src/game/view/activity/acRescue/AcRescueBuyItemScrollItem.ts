/**
 * 买道具Item
 * author dky
 * date 2017/11/21
 * @class AcRescueBuyItemScrollItem
 */
class AcRescueBuyItemScrollItem extends ScrollListItem
{

	// 数量
	private _numTF:BaseTextField;
	private _itemIndex:number;

	private _key :string;
	private _itemData:any;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		// let cfg = Config.WifebaseCfg.wifeGift
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYRESCUEITEM),this.buyCallback,this);
		this._itemIndex = index;
		this._itemData = data;
		this.width = 520;
		this.height = 142 + this.getSpaceY();

		let key = (index+1).toString();

		let bgBg:BaseBitmap = BaseBitmap.create("public_listbg");
		bgBg.width = this.width;
		bgBg.height = 142;
		// bgBg.scaleY = 136/148;
		this.addChild(bgBg);

		let leftBg = BaseBitmap.create("public_left");
		leftBg.width = 126;
		leftBg.height = bgBg.height - 19;
		leftBg.x = 5.5;
		leftBg.y = 5.5;
		this.addChild(leftBg);

		this._key = key;
		let itemCfg = Config.ItemCfg.getItemCfgById(data.powerItem);
		// let itemCfg = Config.ItemCfg.getItemCfgById("1401"); 
		let itemIcon:BaseDisplayObjectContainer = itemCfg.getIconContainer(true);
		itemIcon.setPosition(15, bgBg.height/2*bgBg.scaleY - itemIcon.width/2);
		itemIcon.name = "icon";
		this.addChild(itemIcon);

		let itemName:BaseTextField = ComponentManager.getTextField(itemCfg.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		itemName.setPosition(itemIcon.x + itemIcon.width + 12,15);
		this.addChild(itemName);
		

		let acVo = <AcRescueVo>Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid,AcRescueBuyItemPopupView.code);
		
		let maxNum = data.buyLimit;
	
		if(typeof(data.buyLimit) == "number"){
			maxNum = data.buyLimit
		}else{
			if(data.buyLimit){
				// if(Api.switchVoApi.checkPunishVip()){
					maxNum = data.buyLimit[Api.playerVoApi.getPlayerVipLevel()];
					if(!maxNum)
					{
						maxNum = data.buyLimit[data.buyLimit.length-1];
					}
				// }else{
				// 	maxNum = data.buyLimit[0];
				// }
			}
		
		}

		let num = 0;
		if(acVo.item[(index + 1).toString()]){
			num = acVo.item[(index + 1).toString()];
		}
		let leftNum = maxNum -num;
		
		let numStr = LanguageManager.getlocal("acPunishBuyItemLimit",[leftNum.toString()]);
		this._numTF = ComponentManager.getTextField(numStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._numTF.setPosition(itemName.x,itemName.y + itemName.height + 7);
		this.addChild(this._numTF);
		// if(Api.switchVoApi.checkPunishVip()&& Api.playerVoApi.getPlayerVipLevel() >0 && data.buyLimit && key == "2")
		if(Api.playerVoApi.getPlayerVipLevel() >0 && data.buyLimit && key == "2")
		{
			let vipBB = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel()).icon);
			this.addChild(vipBB );
			vipBB.setScale(0.8);
			vipBB.setPosition(itemName.x-6 ,itemName.y + itemName.height + 5);
			if(!data.buyLimit){
				// this._numTF.visible = false;
				vipBB.visible = false;
			}
			this._numTF.setPosition(itemName.x + 65,itemName.y + itemName.height + 7);
		}


		// if(Api.switchVoApi.checkPunishVip()&& Api.playerVoApi.getPlayerVipLevel() >0 && key == "2")
		// if( Api.playerVoApi.getPlayerVipLevel() >0 && key == "2")
		// {
		// 	this._numTF.setPosition(itemName.x,itemName.y + itemName.height + 7);
		// }
		if(!data.buyLimit){
			this._numTF.visible = false;
			
		}

		// let score = LanguageManager.getlocal("acPunishBuyItemScore",[data.getScore]) ;
		// let itemScore:BaseTextField = ComponentManager.getTextField(score,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		// itemScore.setPosition(itemName.x,itemName.y + itemName.height + 7);
		// this.addChild(itemScore);


		let itemDescStr = LanguageManager.getlocal("rescueItemGet",[data.getPower])
		// itemDescStr
		//acPunishBuyItemGet
		let itemDesc:BaseTextField = ComponentManager.getTextField(itemDescStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		itemDesc.setPosition(itemName.x,this._numTF.y + this._numTF.height + 7);
		itemDesc.width = 250; 
		this.addChild(itemDesc);

	
		let iconStr = "public_icon2";
		let costNumStr = 0;
		if(this._itemIndex == 0){
			costNumStr = data.costGold;
		}else if(this._itemIndex == 1)
		{
			iconStr = "public_icon1";
			costNumStr = data.costGem;
		}

		let costIcon:BaseBitmap = BaseBitmap.create(iconStr);
		costIcon.x = 400;
		costIcon.y = 5;
		// costIcon.setScale(0.4)
		this.addChild(costIcon);
		let costNum:BaseTextField = ComponentManager.getTextField(costNumStr.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		costNum.setPosition(445,itemName.y + 7);
		costNum.width = 260; 
		this.addChild(costNum);

		if(this._itemIndex == 2)
		{
			itemDesc.y = itemDesc.y - 10;
			let acVo = <AcRescueVo>Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid,AcRescueBuyItemPopupView.code);
			let getNum = acVo.getRechargeText();
			let gettNum:BaseTextField = ComponentManager.getTextField(getNum,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN);
			gettNum.setPosition(itemDesc.x,itemDesc.y + itemDesc.height + 7);
			gettNum.width = 250; 
			this.addChild(gettNum);
		}

		let btnStr = "acPunishBuyItemBuy";
		let btnName = ButtonConst.BTN_SMALL_YELLOW;
		if(!data.buyLimit){
			
			costIcon.visible = false;
			costNum.visible = false;
			let state = acVo.getRechargeState();
			if(state == 1)
			{
				btnStr = "taskCollect";
			 	btnName = ButtonConst.BTN_SMALL_YELLOW;
			}else if(state == 2){
				btnStr = "acPunishBuyItemGoNow";
			 	btnName = ButtonConst.BTN_SMALL_BLUE;
			}else if(state == 3){
				// btnStr = "taskCollect";
			 	// btnName = ButtonConst.BTN_SMALL_YELLOW;
				 btnStr = "acPunishBuyItemGoNow";
			 	btnName = ButtonConst.BTN_SMALL_BLUE;
			}
		}

		let chooseBtn = ComponentManager.getButton(btnName,btnStr,this.chooseBtnClick,this);
		chooseBtn.x = 385;
		chooseBtn.y = bgBg.height/2*bgBg.scaleY - chooseBtn.height/2 + 10;
		this.addChild(chooseBtn);
		// chooseBtn.setColor(TextFieldConst.COLOR_BLACK);

	}

	private chooseBtnClick(){

		let acVo = <AcRescueVo>Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid,AcRescueBuyItemPopupView.code);
		if(acVo.et - GameData.serverTime < 86400){
			 App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }

		if(this._itemIndex != 2 && this._itemIndex != 3){
			let acVo = <AcRescueVo>Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid,AcRescueBuyItemPopupView.code);
		
			let maxNum = this._itemData.buyLimit;
	
			if(typeof(this._itemData.buyLimit) == "number"){
				maxNum = this._itemData.buyLimit
			}else{
				if(this._itemData.buyLimit){
					// if(Api.switchVoApi.checkPunishVip()){
						maxNum = this._itemData.buyLimit[Api.playerVoApi.getPlayerVipLevel()];
						if(!maxNum)
						{
							maxNum = this._itemData.buyLimit[this._itemData.buyLimit.length-1];
						}
					// }else{
					// 	maxNum = this._itemData.buyLimit[0];
					// }
				}
			
			}
			
			let num = 0;
			if(acVo.item[(this._itemIndex + 1).toString()]){
				num = acVo.item[(this._itemIndex + 1).toString()];
			}
			let leftNum = maxNum -num;
			if(!num){
				leftNum = maxNum;
			}
			if(leftNum <= 0)
			{
				// if(Api.switchVoApi.checkPunishVip()){
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyItemBuyTip2"));
				// }else{
				// 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyItemBuyTip"));
				// }
				
				return ;
			}

			if(this._itemIndex == 0){
				if(Api.playerVoApi.getPlayerGold() < this._itemData.costGold)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
					return ;
				}
				
			}else if(this._itemIndex == 1)
			{
				if(Api.playerVoApi.getPlayerGem() < this._itemData.costGem)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
					return ;
				}
			}
			let itemInfo = Api.itemVoApi.getItemInfoVoById(Number(this._itemData.powerItem));
			let itemNum = 0;
			if(itemInfo){
				itemNum = itemInfo.num;
			}
			if(itemNum >= this._itemData.holdLimit)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("rescueItemLimit"));
				return;
			}
			this.doBuy()
		}

		if(this._itemIndex == 2){
			let acVo = <AcRescueVo>Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid,AcRescueBuyItemPopupView.code);
			if(acVo.getRechargeState()==1)
			{
				NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETRESCUEREWARD, { activeId:AcRescueBuyItemPopupView.aid+ "-"+ AcRescueBuyItemPopupView.code,gtype:3});
			}
			else if(acVo.getRechargeState()==2)
			{

				ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW,{});
			}
			else if(acVo.getRechargeState()==3)
			{
				// App.CommonUtil.showTip(LanguageManager.getlocal("rescueGetMaxTip"));
				// return
				ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW,{});
			}
			
			// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESCUE_BUYITEM,{"key":this._key,"index":this._itemIndex});
			
		}


	}

	private doBuy(){
		// this._index = data.index;
		// if(this._index >= 3)
		// {
		// 	this.hide();
		// 	return;
		// }
		let acVo = <AcRescueVo>Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid,AcRescueBuyItemPopupView.code);

		 if(acVo.et - GameData.serverTime < 86400){
			 App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
		if(!acVo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYRESCUEITEM, { activeId:AcRescueBuyItemPopupView.aid+ "-"+ AcRescueBuyItemPopupView.code,itemKey:this._key});
	}

	//请求回调

	 private buyCallback(event):void
    {
        let data:{ret:boolean,data:any}=event.data;
    
        if(data.data.ret == 0){
            //领取成功
            if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}

			this.refreshData(this._itemIndex);

			let gem = Api.playerVoApi.getPlayerGemStr();
        } else {
            // App.CommonUtil.showTip(LanguageManager.getlocal("dailyGiftFailure"));
            

        }


    }

	public refreshData(index:number)
	{	
		let acVo = <AcRescueVo>Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid,AcRescueBuyItemPopupView.code);
		
		// let maxNum = this._itemData.buyLimit;
		let maxNum = this._itemData.buyLimit;
	
		if(typeof(this._itemData.buyLimit) == "number"){
			maxNum = this._itemData.buyLimit
		}else{
			if(this._itemData.buyLimit){
				// if(Api.switchVoApi.checkPunishVip()){
					maxNum = this._itemData.buyLimit[Api.playerVoApi.getPlayerVipLevel()];
					if(!maxNum)
					{
						maxNum = this._itemData.buyLimit[this._itemData.buyLimit.length-1];
					}
				// }else{
				// 	maxNum = this._itemData.buyLimit[0];
				// }
			}
		
		}

		let num = 0;
		if(acVo.item[(index + 1).toString()]){
			num = acVo.item[(index + 1).toString()];
		}
		let leftNum = maxNum -num;
		
		let numStr = LanguageManager.getlocal("acPunishBuyItemLimit",[leftNum.toString()]);
		// if(Api.switchVoApi.checkPunishVip()&& Api.playerVoApi.getPlayerVipLevel() >0   && this._key == "2")
		if( Api.playerVoApi.getPlayerVipLevel() >0   && this._key == "2")
		{
			numStr = LanguageManager.getlocal("acPunishBuyItemLimit",[leftNum.toString()]);
		}

		this._numTF.text = numStr;
	}


	private getBtnClickHandler()
	{
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,{"achId":this._achInfo.id});
	}

	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{
		 App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYRESCUEITEM),this.buyCallback,this);
		this._numTF = null;
		this._key = null;
		this._itemData = null;
		this._itemIndex = null;

		super.dispose();
	}
}