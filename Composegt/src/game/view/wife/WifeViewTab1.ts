/**
 * 已迎娶界面
 * author dmj
 * date 2017/10/9
 * @class WifeViewTab1
 */
class WifeViewTab1 extends CommonViewTab
{
	// 滑动列表
	private _scrollList:ScrollList;
	// wife列表
	private _wifeInfoVoList:Array<WifeInfoVo>;

	private _vigorNumTF:BaseTextField;

	private _wifVoApi:WifeVoApi;
	// 随机传唤按钮
	private _callBtn:BaseButton
	// 恢复精力按钮
	private _recoverBtn:BaseButton

	private _selectWifeId:number;

	private _rewardData:any;

	//服务器随机宠幸返回数据
	private _loveData:any;

	//随机宠幸列表滚动位置
	private _scrollIndex:number;
	private _checkBox:CheckBox;
	public constructor() 
	{
		super();
		this.initView();
	}
	protected initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_CALL),this.callWifeCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERENERGY),this.recoverEnergyCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshItem,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshItem,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE),this.refreshItem,this);

		this._wifVoApi = Api.wifeVoApi;
		this._wifeInfoVoList = this._wifVoApi.getWifeInfoVoList();
		if(this._wifeInfoVoList.length <= 0)
		{
			return;
		}
		

		let bottomBg = BaseBitmap.create("public_9v_bg02");
		bottomBg.width = GameConfig.stageWidth-10;
		bottomBg.height = GameConfig.stageHeigth - 230;
		bottomBg.x = 5;
		bottomBg.y = 0;
		this.addChild(bottomBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 14,GameConfig.stageHeigth - 245);
		this._scrollList = ComponentManager.getScrollList(WifeScrollItem1,this._wifeInfoVoList,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(7,7);
		this._scrollList.addTouchTap(this.clickItemHandler,this);
		

		let vigorTF = ComponentManager.getTextField(LanguageManager.getlocal("vigorDesc") + ":",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		vigorTF.x = 20;
		vigorTF.y = this._scrollList.y + this._scrollList.height + 37;
		this.addChild(vigorTF);

		this._vigorNumTF = ComponentManager.getTextField(this._wifVoApi.getEnergyNum() + "/" + this._wifVoApi.getEnergyMaxNum(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._vigorNumTF.x = vigorTF.x + vigorTF.width + 15;
		this._vigorNumTF.y = vigorTF.y;
		this.addChild(this._vigorNumTF);
		
		let vipTipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		vipTipTxt.x = vigorTF.x + 170
		vipTipTxt.y = vigorTF.y ;
		this.addChild(vipTipTxt);

		let needVip = GameConfig.config.wifebaseCfg.needVip;
		if(Api.playerVoApi.getPlayerVipLevel() >= needVip)
		{
			vipTipTxt.text = LanguageManager.getlocal("wifeBatchTxt2");
			let checkbox = ComponentManager.getCheckBox();
			checkbox.x = vipTipTxt.x + vipTipTxt.width+5;
			checkbox.y = vipTipTxt.y + vipTipTxt.height/2  - checkbox.height/2;
			this.addChild(checkbox);
			this._checkBox = checkbox;
			this._checkBox.addTouchTap(this.selectHandler,this);
		}else
		{
			vipTipTxt.text = LanguageManager.getlocal("wifeBatchTxt",[needVip]);
		}

		this._callBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"callBtn",this.clickCallBtn,this);
		this._callBtn.x = GameConfig.stageWidth - this._callBtn.width - 60;
		this._callBtn.y = vigorTF.y - 14
		this.addChild(this._callBtn);
		// this._callBtn.setColor(TextFieldConst.COLOR_BLACK);

		this._recoverBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"recoverVigor",this.clickCallBtn,this);
		this._recoverBtn.x = GameConfig.stageWidth - this._recoverBtn.width - 60;
		this._recoverBtn.y = this._callBtn.y 
		this.addChild(this._recoverBtn);
		// this._recoverBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._recoverBtn.visible = false;
		this.tick();
	}
	private selectHandler()
	{
		if(this._checkBox.checkSelected())
		{
			this._callBtn.setText("wifeBatchTxt2");
		}else{
			this._callBtn.setText("callBtn");
		}
	}
	private clickCallBtn(param:any):void
	{	
		Api.rookieVoApi.checkNextStep();
		// todo随机传唤
		if(this._wifVoApi.getEnergyNum() > 0)
		{
			let batchV = false
			if (this._checkBox && this._checkBox.checkSelected())
			{
				batchV = true;
			}
			NetManager.request(NetRequestConst.REQUEST_WIFE_CALL,{autoFlag:batchV});
		}
		else
		{
			let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(GameConfig.config.wifebaseCfg.needItem));
			if(itemInfoVo && itemInfoVo.num > 0)
			{
				let message:string = LanguageManager.getlocal("useItemMsg",[itemInfoVo.name + "x1",LanguageManager.getlocal("vigorDesc")]);
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{confirmCallback:this.confirmCallbackHandler,handler:this,icon:itemInfoVo.icon,iconBg:itemInfoVo.iconBg,num:itemInfoVo.num,msg:message, id : Number(GameConfig.config.wifebaseCfg.needItem), useNum:1});
			}
			else
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("vigorNumNoEnoughMsg"));
			}
		}
	}

	private confirmCallbackHandler():void
	{
		NetManager.request(NetRequestConst.REQUEST_WIFE_RECOVERENERGY,null);
	}

	private clickItemHandler(event:egret.TouchEvent):void
	{
		let index:number = Number(event.data);
		let wifeInfoVo = this._wifeInfoVoList[index];
		let id = wifeInfoVo.id;
		// todo打开宠幸妻妾界面
		ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW,{id,handler:this});

		SoundManager.stopEffect(SoundConst.EFFECT_WIFE);

		this._selectWifeId = id;

	}
	// 随机传唤后端返回数据后
	private callWifeCallback(event:egret.Event):void
	{
		let rdata = event.data.data.data;
		this._loveData = rdata;
		this.tick();

		if (this._checkBox && this._checkBox.checkSelected())
		{
			let autoCallWife = rdata.autoCallWife
			// ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW,[rdata.servantArr,this._lastUseNum,this._selectedItemInfoVo.name])
			ViewController.getInstance().openView(ViewConst.BASE.WIFECALLBATCHSUCCESSVIEW,[autoCallWife])
			return 
		}

		if(rdata.lucky)
		{
			TimerManager.doTimer(2000,1,this.showLucky,this);
		}

		let id = this._loveData.callWife[0];
		this._scrollList.addEventListener(egret.Event.COMPLETE,this.moveComplete,this);
		this.touchChildren = false;

		let index = Api.wifeVoApi.getWifeIndexVoById(id);


		this._scrollIndex = index

		this._scrollList.setScrollTopByIndex(index,500);

		let wideItem = <WifeGiveScrollItem>this._scrollList.getItemByIndex(index);
		
		wideItem.refreshData(id);

		if(rdata.rewards)
		{
			this._rewardData = rdata.rewards;
			// let rewards= GameData.formatRewardItem(rdata.rewards);
			// if(rewards&&rewards.length>0)
			// {
			// 	App.CommonUtil.playRewardFlyAction(rewards);
			// }
		}
	}

	private refreshItem(p:any){

		if (p.data.ret == true && p.data.data.data.lucky) {
			this.showLucky();
		}

		let index = Api.wifeVoApi.getWifeIndexVoById(this._selectWifeId);
		let wideItem = <WifeGiveScrollItem>this._scrollList.getItemByIndex(index);
		
		wideItem.refreshData(this._selectWifeId);
	}

	// 列表滑动结束后
	private moveComplete(event:egret.Event):void
	{
		this.touchChildren = true;
		this._scrollList.removeEventListener(egret.Event.COMPLETE,this.moveComplete,this);

		let posX = this._scrollList.getItemByIndex(this._scrollIndex).x;
		let posY = this._scrollList.getItemByIndex(this._scrollIndex).y;

		var targetPoint: egret.Point = this._scrollList.getItemByIndex(this._scrollIndex).localToGlobal(0,0);
	

		// 播放召唤动画，更新数据
		let index:number = Number(event.data);
		let wifeInfoVo = this._wifeInfoVoList[index];
		let id = this._loveData.callWife[0];

		let childData:any = null;
			if(this._loveData.childArr.length > 0){
				childData = this._loveData.childArr[0]
			} 
		// if(this._rewardData)
		// {
		// 	let rewards= GameData.formatRewardItem(this._rewardData);
		// 	if(rewards&&rewards.length>0)
		// 	{
		// 		App.CommonUtil.playRewardFlyAction(rewards);
		// 	}
		// }
		ViewController.getInstance().openView(ViewConst.BASE.WIFELOVEANIVIEW,{id:id,type:1,x:targetPoint.x,y:targetPoint.y,childData:childData,rewards:this._rewardData});
	}

	private showLucky():void
	{
		App.CommonUtil.showGodbless("wife");
	}

	// 使用精力丹后端返回数据后
	private recoverEnergyCallback(event:egret.Event) 
	{
		let rdata = event.data.data.data;
		this.tick();
	}

	public tick():void
	{
		if(this._vigorNumTF == null)
		{
			return;
		}
		if(this._wifVoApi.getEnergyNum() > 0)
		{
			this._callBtn.visible = true;
			this._recoverBtn.visible = false;
			this._vigorNumTF.text = this._wifVoApi.getEnergyNum() + "/" + this._wifVoApi.getEnergyMaxNum();
		}
		else
		{
			this._callBtn.visible = false;
			this._recoverBtn.visible = true;
			this._vigorNumTF.text = App.DateUtil.getFormatBySecond(this._wifVoApi.getRecoverEnergyTime(),1);
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_CALL),this.callWifeCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERENERGY),this.recoverEnergyCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshItem,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshItem,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE),this.refreshItem,this);
		if(this._scrollList)
		{
			this._scrollList = null;
		}

		if(this._wifeInfoVoList)
		{
			this._wifeInfoVoList = null;
		}
		if(this._vigorNumTF)
		{
			this._vigorNumTF = null;
		}
		if(this._wifVoApi)
		{
			this._wifVoApi = null;
		}
		this._loveData = null;
		this._selectWifeId = null;
		this._rewardData = null;
		super.dispose();
	}
}