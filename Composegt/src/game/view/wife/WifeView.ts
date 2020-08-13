/**
 * 红颜
 * author dmj
 * date 2017/10/9
 * @class WifeView
 */
class WifeView extends CommonView
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

	// private _selectWifeId:number;

	private _rewardData:any;
	private _redDotSp:BaseBitmap = null;

	//cef
	private _wifeStatusBtn:BaseButton

	//服务器随机宠幸返回数据
	private _loveData:any;

	//随机宠幸列表滚动位置
	private _scrollIndex:number;
	private _checkBox:CheckBox;

	public static wifeId;
	public static isMoveing = false;


	public constructor() 
	{
		super();
	}
	public initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHILD_GUIDE,this.doGuide,this);
		// SoundManager.playEffect(SoundConst.EFFECT_WIFE);
		this.playEffect(SoundConst.EFFECT_WIFE,true);
		Api.rookieVoApi.checkNextStep();
		Api.mainTaskVoApi.isKeepGuide = true;
		Api.mainTaskVoApi.checkShowGuide();
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_CALL),this.callWifeCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERENERGY),this.recoverEnergyCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshItem,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshItem,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE),this.refreshItem,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP),this.refreshItem,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_WIFESEXSETTING, this.setSexCallback, this);

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFESTATUS,this.checkRedPoint,this);
		//大背景
		let bigBg:BaseLoadBitmap = BaseLoadBitmap.create("wife_listbg");
		bigBg.y = -15;
		this.addChildToContainer(bigBg);

		let titleBg:BaseBitmap = BaseBitmap.create("wifeview_bottom");
		// titleBg.width = GameConfig.stageWidth;
		// titleBg.height = 70;
		titleBg.y = GameConfig.stageHeigth - this.container.y - titleBg.height;
		this.addChildToContainer(titleBg);

		// let bottom:BaseBitmap = BaseBitmap.create("public_daoju_bg01");
		// bottom.y = GameConfig.stageHeigth - this.container.y - bottom.height;
		// this.addChildToContainer(bottom);


	

		this._wifVoApi = Api.wifeVoApi;
		this._wifeInfoVoList = this._wifVoApi.getWifeInfoVoList();
		if(this._wifeInfoVoList.length <= 0)
		{
			return;
		}
		

		// let bottomBg = BaseBitmap.create("public_9v_bg02");
		// bottomBg.width = GameConfig.stageWidth-10;
		// bottomBg.height = GameConfig.stageHeigth - 230;
		// bottomBg.x = 5;
		// bottomBg.y = 0;
		// this.addChildToContainer(bottomBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 14,GameConfig.stageHeigth - 152);//165

		let wifeList = new Array<WifeInfoVo>();
		wifeList.push(null);
		wifeList=wifeList.concat(this._wifeInfoVoList);
		wifeList.push(null);
		// let wife1 = new Array<WifeInfoVo>;
		// [wifeList].concat(this._wifeInfoVoList).concat(wifeList);
		// egret.log(wifeList.length)
		this._scrollList = ComponentManager.getScrollList(WifeScrollItem1,wifeList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(7,-16);
		// this._scrollList.addTouchTap(this.clickItemHandler,this);

		// this._scrollList.setScrollTop(300,0);
		

		let vigorTF = ComponentManager.getTextField(LanguageManager.getlocal("vigorDesc") + ":",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		vigorTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;
		vigorTF.x = 40;
		vigorTF.y = titleBg.y + 30;//this._scrollList.y + this._scrollList.height + 30;
		this.addChildToContainer(vigorTF);

		this._vigorNumTF = ComponentManager.getTextField(this._wifVoApi.getEnergyNum() + "/" + this._wifVoApi.getEnergyMaxNum(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._vigorNumTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;	
		this._vigorNumTF.x = vigorTF.x + vigorTF.width + 15;
		this._vigorNumTF.y = vigorTF.y;
		this.addChildToContainer(this._vigorNumTF);
		
		let vipTipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		vipTipTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
		vipTipTxt.x = 430;
		vipTipTxt.y = vigorTF.y ;
		this.addChildToContainer(vipTipTxt);

		let needVip = Api.vipVoApi.getNeedVip("wifeBatch"); //GameConfig.config.wifebaseCfg.needVip;
		if(needVip&&Api.playerVoApi.getPlayerVipLevel() >= needVip)
		{
			vipTipTxt.text = LanguageManager.getlocal("wifeBatchTxt2");
			vipTipTxt.x = vipTipTxt.x + 30;
			let checkbox = ComponentManager.getCheckBox();
			checkbox.x = vipTipTxt.x + vipTipTxt.width+5;
			checkbox.y = vipTipTxt.y + vipTipTxt.height/2  - checkbox.height/2;
			this.addChildToContainer(checkbox);
			this._checkBox = checkbox;
			this._checkBox.addTouchTap(this.selectHandler,this);
		}else
		{
			vipTipTxt.text = LanguageManager.getlocal("wifeBatchTxt",[needVip+""]);
		}

		this._callBtn = ComponentManager.getButton("btn_big_yellow2","callBtn",this.clickCallBtn,this);
		this._callBtn.x = titleBg.x + titleBg.width/2 - this._callBtn.width/2; //+ this.container.x ;
		this._callBtn.y = titleBg.y + 7;//vigorTF.y - 0
		this.addChildToContainer(this._callBtn);
		this._callBtn.setColor(TextFieldConst.COLOR_BTN_YELLOW);

		this._recoverBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE,"recoverVigor",this.clickCallBtn,this);
		this._recoverBtn.x = titleBg.x + titleBg.width/2 - this._recoverBtn.width/2;  //this._callBtn.x;
		this._recoverBtn.y = this._callBtn.y 
		this.addChildToContainer(this._recoverBtn);
		// this._recoverBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._recoverBtn.visible = false;
		this.tick();

		let unLockBtn = ComponentManager.getButton("wifelookbtn",null,this.unLockClick,this);
		unLockBtn.x = 5;
		unLockBtn.y = 0;
		// unLockBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(unLockBtn);

		if(Api.switchVoApi.checkOpenWifeStatus())
		{
			this._wifeStatusBtn = ComponentManager.getButton("wifestatus_btn",null,this.wifestatusClick,this);
			this._wifeStatusBtn.x = 640 - this._wifeStatusBtn.width - 5;
			this._wifeStatusBtn.y = unLockBtn.y ;
			// this._wifeStatusBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(this._wifeStatusBtn);
		}
		

		// let servant_mask = BaseBitmap.create("servant_mask");
		// servant_mask.width = GameConfig.stageWidth;
		// servant_mask.x = 0;
		// servant_mask.y = GameConfig.stageHeigth - this.container.y - bottom.height - 140;
		// this.addChildToContainer(servant_mask);

		this.checkRedPoint();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					// // "servant_mask",
					// "wifeview_namebg","wifeview_charmicon",
					// "wifeview_vigoricon","wifeview_unlockmask","wife_listbg",
					// "arena_bottom","wifehalfbg","wifelookbtn",
					// "wifeview_itembg","wifeview_lockbg",
					// "wifestatus_btn",
					"wifeview_charmicon",
					"wifeview_vigoricon",
					"wifeview_artistryicon",
					"wifeview_namebg",
					"wifeview_namebg_male",
					"wifeview_bottom"
					]);
	}

	private unLockClick()
	{
		ViewController.getInstance().openView(ViewConst.COMMON.WIFEUNLOCKVIEW)
	}

	private wifestatusClick()
	{
		ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW)
		this.hide();
	}

	private checkRedPoint(){
		//一键册封
		if(Api.wifestatusVoApi.getIsConfer())
		{
			if(this._redDotSp == null && this._wifeStatusBtn)
			{
				this._redDotSp = BaseBitmap.create("public_dot2");
				this._redDotSp.x = this._wifeStatusBtn.x + this._wifeStatusBtn.width - this._redDotSp.width -30;
				this._redDotSp.y = this._wifeStatusBtn.y +20;
				this.addChildToContainer(this._redDotSp);
			}
			else
			{
				if(this._redDotSp)
				{
					this._redDotSp.visible = true;
				}
			}
		}
		else
		{
			if(this._redDotSp)
			{
				this._redDotSp.visible = false;
			}
		}
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
		if(WifeView.isMoveing){
			return;
		}
		Api.rookieVoApi.checkNextStep();
		// todo随机传唤
		if(this._wifVoApi.getEnergyNum() > 0)
		{
			let batchV = false
			if (this._checkBox && this._checkBox.checkSelected())
			{
				batchV = true;
			}
			PlatformManager.analytics37Point("custom_active","call_beauty",1);
			NetManager.request(NetRequestConst.REQUEST_WIFE_CALL,{autoFlag:batchV});
		}
		else
		{
			let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(GameConfig.config.wifebaseCfg.needItem));
			if((Api.switchVoApi.checkLimitedGift() || Api.switchVoApi.checkLimitedGift2())){
				let list = ["g32","g62"];
				let isOver = true;
				let vo = null;
				let cfg = null;
				for(let i = 0;i<list.length;i++){
					vo = Api.shopVoApi.getPayInfoById2(list[i]);
					cfg = Config.RechargeCfg.getRechargeItemCfgByKey(list[i]);
					if(!vo){
						isOver = false;
						// break;
					}
					if(vo && cfg && vo.isbuy == 0){
						let timeTmp = vo.st + cfg.lastTime - GameData.serverTime;
						if (timeTmp > 0 ){
							isOver = false;
							// break;
						}
					} 
				}
				
				if(itemInfoVo && itemInfoVo.num > 0)
				{
					let message:string = LanguageManager.getlocal("useItemMsg",[itemInfoVo.name + "x1",LanguageManager.getlocal("vigorDesc")]);
					ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{confirmCallback:this.confirmCallbackHandler,handler:this,icon:itemInfoVo.icon,iconBg:itemInfoVo.iconBg,num:itemInfoVo.num,msg:message, id : Number(GameConfig.config.wifebaseCfg.needItem), useNum:1});
				}
				else
				{
					//没有正在运行的限时礼包的活动
					if(isOver){
						App.CommonUtil.showTip(LanguageManager.getlocal("vigorNumNoEnoughMsg"));
					} else {
						App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERSCENE),this.recoverSceneCallback,this);
						NetManager.request(NetRequestConst.REQUEST_WIFE_RECOVERSCENE,{});
					}
				}
			} else {
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
	}
	private recoverSceneCallback(event:egret.Event):void
	{	
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERSCENE),this.recoverSceneCallback,this);
		let ddata = event.data.data;
		if(ddata.ret == 0){
			//手动调用红颜限时礼包强弹  一键传唤
			Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.ENERGY_EMPTY);
			Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.ENERGY_EMPTY2);
			App.CommonUtil.showTip(LanguageManager.getlocal("vigorNumNoEnoughMsg"));
		} else {
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
		if(WifeView.isMoveing){
			return;
		}
		NetManager.request(NetRequestConst.REQUEST_WIFE_RECOVERENERGY,null);
	}

	// private clickItemHandler(event:egret.TouchEvent):void
	// {
	// 	let index:number = Number(event.data);
	// 	let wifeInfoVo = this._wifeInfoVoList[index];
	// 	let id = wifeInfoVo.id;
	// 	// todo打开宠幸妻妾界面
	// 	ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW,{id,handler:this});

	// 	SoundManager.stopEffect(SoundConst.EFFECT_WIFE);

	// 	this._selectWifeId = id;

	// }
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
		this.container.touchChildren = false;

		let index = Api.wifeVoApi.getWifeIndexVoById(id);

		WifeView.isMoveing = true;

		this._scrollIndex = index + 1;

		this._scrollList.setScrollTopByIndex(index +1,500);

		let wideItem = <WifeScrollItem1>this._scrollList.getItemByIndex(index + 1);
		
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

		// if(!WifeView.wifeId){
		// 	return;
		// }

		if (p.data.ret == true && p.data.data.data.lucky) {
			this.showLucky();
		}

		let index = Api.wifeVoApi.getWifeIndexVoById(WifeView.wifeId);
		let wideItem = <WifeGiveScrollItem>this._scrollList.getItemByIndex(index + 1);
		
		wideItem.refreshData(WifeView.wifeId);
	}

	// 列表滑动结束后
	private moveComplete(event:egret.Event):void
	{
		this.container.touchChildren = true;
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
	private getWifeIndexVoById(wifeId):number{
		let view = this;
		let idx = 0;
		let list : any = view._scrollList;
		for(let i in list._dataList){
			let unit = list._dataList[i];
			if(unit && Number(unit.id) === Number(wifeId)){
				idx = Number(i);
			}
		}
		return idx;
	}
	private setSexCallback():void{
		let index = this.getWifeIndexVoById(WifeView.wifeId);
		let wideItem = <WifeScrollItem1>this._scrollList.getItemByIndex(index);
		if(wideItem && WifeView.wifeId){
			wideItem.refreshData(WifeView.wifeId);
		}
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

	// protected getTabbarTextArr():Array<string>
	// {
	// 	return ["wifeViewTab1Title",
	// 			"wifeViewTab2Title"
	// 	];
	// }

	private doGuide()
	{
		this.hide();
	}
	protected getRuleInfo():string
	{
		if(Api.switchVoApi.checkOpenWifeBattle()){
			return "wife_description2";
		} else {
			return "wife_description";
		}
		
	}

	public hide():void
	{
		if(Api.rookieVoApi.isInGuiding && !Api.rookieVoApi.isGuiding){
			return;
		}
		if(Api.rookieVoApi.isInGuiding){
			// Api.rookieVoApi.checkWaitingGuide();
			Api.rookieVoApi.checkNextStep();
		}
		
		
		super.hide();
	}
	public dispose():void
	{
		Api.mainTaskVoApi.isKeepGuide = false;
		Api.mainTaskVoApi.hideGuide();
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHILD_GUIDE,this.doGuide,this);

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_CALL),this.callWifeCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERENERGY),this.recoverEnergyCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshItem,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshItem,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE),this.refreshItem,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP),this.refreshItem,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERSCENE),this.recoverSceneCallback,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_WIFESEXSETTING, this.setSexCallback, this);

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
		this._redDotSp = null;
		this._loveData = null;
		WifeView.wifeId = null;
		WifeView.isMoveing = false;
		this._rewardData = null;
		this._wifeStatusBtn = null;
		super.dispose();
	}
}