class RechargeVipViewTab2 extends CommonViewTab {


	private _receiveItemBtn: BaseBitmap =null;
	private _alreadyReceived: BaseBitmap;
	private _curShowVipLevel: number = -1;

	private _scrollList: ScrollList;
	private _vipBtnList: Array<any> = [];
	public static currNum: number = -1;
	private currLevel: number = -1;
	private isTouch:boolean =false;
	private newCurrIndex:number  =-1 ;
	private nextVipCfg:Config.VipItemCfg= null;
	private titleTxt:BaseTextField=null;
	private txt: BaseTextField  =null;
	private downBg:BaseBitmap =null;
	private upBg: BaseLoadBitmap =null;
	public static lastVipLevel:number =0;
	private boo:boolean =false;
	private currCountainer:BaseDisplayObjectContainer =null;

	private groupArr:Array<BaseBitmap|BaseDisplayObjectContainer> =[];
	private scrollView:any =null;

	private _receiveItemBtnType:number =0;  //0 默认 充值  1 可以领取   2已经领取  
	private receiveImg:BaseBitmap =null;
	private rechargevie_effects:BaseBitmap =null;
	private _light:BaseBitmap =null;
	private _light2:BaseBitmap =null;
	
	private _slideCountainer:BaseDisplayObjectContainer =null;
	private _scrollRect1:any =null;
	private _vipNum:string="1_privilege";
	private	_vip1Boo:boolean =false; 
	/** 打开对话框的时候，vip折扣活动是否开启 */
	private _openDialogDiscountEnabled=false;
	private _isWxStr:string ="";

	private _bottomBox: BaseDisplayObjectContainer;
	private _servantInfoBox: BaseDisplayObjectContainer;
	private _servantSkillInfo: BaseDisplayObjectContainer;
	// private _skillList: {servant: string, skillid: string, icon: string, des: string}[];
	// private _onshowSkill: {servant: string, skillid: string, icon: string, des: string};

	/**
	 * 展示门客时品质Icon位置
	 */
	private readonly _servantCfg: {[index: string]: {quaIcon: number[]}} = {
		"vip3": {
			quaIcon: [282, -19]
		},
		"vip5": {
			quaIcon: [282, -25]
		},
		"vip7": {
			quaIcon: [282, -25]
		},
		"vip9": {
			quaIcon: [-33, -11]
		},
		"vip10": {
			quaIcon: [298, -26]
		}
	}

	public constructor() 
	{
		super();
		this.initView();
		this.refreshView();
	}

	public refreshWhenSwitchBack(): void 
	{
		let currLevel:number=Api.playerVoApi.getPlayerVipLevel();
		this.currLevel =currLevel;
		if(RechargeVipViewTab2.lastVipLevel!=currLevel)
		{
			RechargeVipViewTab2.currNum =-1;
			RechargeVipViewTab2.lastVipLevel= currLevel; 
			this.refreshButton();

			this.refresh();
			this.newCurrIndex =Api.playerVoApi.getPlayerVipLevel();
			this.refreshView();
		
			if(this._vip1Boo&&RechargeVipViewTab2.lastVipLevel==1)
			{
				this.upBg.setload("vip_details_"+this._vipNum+this._isWxStr);
			}
			else
			{	
				this.upBg.setload("vip_details_"+RechargeVipViewTab2.lastVipLevel+this._isWxStr);	
			}
		
			this.showItemList();
		}	
	}
	private refreshButton():void
	{
		this._vipBtnList = [];
		let btnNum:number=Api.vipVoApi.getMaxbtnNum();
		for (var i: number = 0; i < btnNum; i++) {
			this._vipBtnList.push(i);
		}
		this._scrollList.refreshData(this._vipBtnList);
		this.freshButtonType();

	}
	private freshButtonType():void
	{
		if (RechargeVipViewTab2.currNum != -1) {
			var _vipBtnScrollItem: VipBtnScrollItem = <VipBtnScrollItem>this._scrollList.getItemByIndex(RechargeVipViewTab2.currNum);
			_vipBtnScrollItem.setType();
		}
		else {
			if (this.currLevel == 0) {
				var _vipBtnScrollItem: VipBtnScrollItem = <VipBtnScrollItem>this._scrollList.getItemByIndex(this.currLevel);
				_vipBtnScrollItem.setType();
			}
			else {
				RechargeVipViewTab2.currNum = this.currLevel - 1;
				var _vipBtnScrollItem: VipBtnScrollItem = <VipBtnScrollItem>this._scrollList.getItemByIndex(this.currLevel - 1);
				_vipBtnScrollItem.setType();
			}
		} 
	}

	public refresh():void
	{
		this.currLevel = Api.playerVoApi.getPlayerVipLevel();
		if(this.newCurrIndex==-1)
		{
			this.newCurrIndex =this.currLevel;
		}
	}
	protected initView(): void 
	{
		PlatformManager.analytics37Point("custom_recharge_check","check_vip",1);

		if(Api.otherInfoVoApi.getOtherInfoVo().kvmap&&Api.otherInfoVoApi.getOtherInfoVo().kvmap["check_vip"])
		{

		}else{
			PlatformManager.analytics37JPPoint("custom_recharge_check","check_vip",1);
			if(PlatformManager.checkIsJPSp())
			{
				this.request(NetRequestConst.REQUEST_OTHERINFO_SETKV,{k:"check_vip",v:"1"});
			}
			
		}
		

		if(PlatformManager.checkIsWxCfg())
		{	
			this._isWxStr = "_wx";
		}
		else 
		{
			this._isWxStr = "";
		}

		this._vip1Boo=Api.switchVoApi.checkVip1Privilege();
		this._slideCountainer =new BaseDisplayObjectContainer();
		
		this._slideCountainer.width = 492;
		this._slideCountainer.x = 0;
		this._slideCountainer.y =30;
		this.addChild(this._slideCountainer);

		this._bottomBox = new BaseDisplayObjectContainer();
		this._servantInfoBox = new BaseDisplayObjectContainer();

		RechargeVipViewTab2.lastVipLevel= Api.playerVoApi.getPlayerVipLevel();
		this.refresh();
		this.refreshView();
		
		let leftBg: BaseBitmap = BaseBitmap.create("common_left_bg");
		leftBg.x = 0;
		leftBg.y = 80 ;
		leftBg.height = GameConfig.stageHeigth - 240 + 7;
		this.addChild(leftBg);

		let leftBg2:BaseBitmap = BaseBitmap.create("commonview_woodbg");
		leftBg2.height = GameConfig.stageHeigth - 240 + 7;
		leftBg2.x = 148;
		leftBg2.y = 80;

		// leftBg2.scaleX = (GameConfig.stageWidth-leftBg.width)/leftBg2.width;
		// leftBg2.scaleY = leftBg2.scaleX
		// leftBg2.height = GameConfig.stageHeigth - this.container.y;
		this.addChild(leftBg2);

		//背景宣传图
		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,476,542);
		if(this.currLevel==0)
		{
			this.currLevel=1;
		}
	
		if(this._vip1Boo&&this.currLevel==1)
		{
		 	this.upBg= BaseLoadBitmap.create("vip_details_"+this._vipNum+this._isWxStr);
		}
		else
		{
			this.upBg= BaseLoadBitmap.create("vip_details_"+this.currLevel+this._isWxStr);
		}

		this.upBg.x = this._slideCountainer.width/2 - this.upBg.width/2; 
		this._slideCountainer.addChild(this.upBg);
		this.upBg.y = -30;
		// this.upBg.addTouchTap(this.onSkillTap, this);

		//背景图风景
		let downBg: BaseBitmap = BaseBitmap.create("public_9v_bg14");
		downBg.width = 492;
		downBg.setPosition(0, 510);
		this._bottomBox.addChild(downBg);

		let innerBg = BaseBitmap.create("public_9v_bg12");
		innerBg.width = 460;
		innerBg.setPosition(downBg.x+downBg.width/2 - innerBg.width/2, downBg.y + 5);
		this._bottomBox.addChild(innerBg);



		let downTitleLine = BaseBitmap.create("public_ts_bg01");
		downTitleLine.width = 290;
		downTitleLine.x = downBg.x + downBg.width/2 - downTitleLine.width/2;
		downTitleLine.y = 532;
		this._bottomBox.addChild(downTitleLine);
		// let downTitleLine: BaseBitmap = BaseBitmap.create("public_v_huawen01");  
		// downTitleLine.setPosition(10, 540);
		// this._slideCountainer.addChild(downTitleLine);

		// let downTitleLine2: BaseBitmap = BaseBitmap.create("public_v_huawen01");  
		// downTitleLine2.scaleX =-1;
		// downTitleLine2.setPosition(470, 540);
		// this._slideCountainer.addChild(downTitleLine2);

		if (RechargeVipViewTab2.currNum == -1) {
			var str: string = this.currLevel +"";
		}
		else {
			var str: string = (RechargeVipViewTab2.currNum + 1).toString();
		}
		let titleTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeUnlock_3", [str]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN_NEW);
		// let pos = App.CommonUtil.getCenterPos(downTitleLine, titleTxt, false);
		titleTxt.setPosition(downTitleLine.x + downTitleLine.width/2 - titleTxt.width/2, downTitleLine.y + downTitleLine.height/2 - titleTxt.height/2);
		this._bottomBox.addChild(titleTxt);
		this.titleTxt=titleTxt;

		let txt: BaseTextField = ComponentManager.getTextField(this.nextVipCfg.localStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
		txt.width = 420; 
		txt.lineSpacing = 5;
		txt.y=580;
		txt.x =30;

		this._bottomBox.addChild(txt);
		this.txt =txt;
		downBg.height =500 + 15;
		innerBg.height = downBg.height - 10;
		// let scrollRect1 = new egret.Rectangle(0,0,800,GameConfig.stageHeigth-250);
		let scrollRect1 = new egret.Rectangle(0,0,492,GameConfig.stageHeigth-250);
		if(this.scrollView==null)
		{
			this.scrollView =ComponentManager.getScrollView(this._slideCountainer,scrollRect1);
			this.scrollView.x= GameConfig.stageWidth - this.scrollView.width;
			this.scrollView.y=75+5;
			this.addChild(this.scrollView);
		}

		if(Api.vipVoApi.getVipCfgByLevel(this.newCurrIndex).reward)
		{
			this.showItemList();
		}
		else
		{
			this._receiveItemBtn = BaseBitmap.create("rechargevie_btn");
			this._receiveItemBtn.addTouchTap(this.itemHandler,this);
			this._slideCountainer.addChild(this._receiveItemBtn);
			this._receiveItemBtn.setPosition(380, 410);
			var _point = new egret.Point(this._receiveItemBtn.x,this._receiveItemBtn.y);
		}
		this.showBtn();
		// vip折扣
		if (Api.acVoApi.getActivityVoByAidAndCode("discount","1") && Api.acVoApi.getActivityVoByAidAndCode("discount","1").isStart) {
			let discountIcon = BaseBitmap.create("recharge_discount_right");
			discountIcon.x = 403;
			discountIcon.y = 526;
			this._slideCountainer.addChild(discountIcon);
			// 划线
			var lineShape:egret.Shape = new egret.Shape();  
			lineShape.graphics.lineStyle(2, 0xff0000, 1);
			lineShape.graphics.moveTo(0, 0);    //将画笔移动到起点位置
			lineShape.graphics.lineTo(255, 0);   //从起点位置划线到终点
			lineShape.graphics.endFill();
			lineShape.x = this.txt.x;
			lineShape.y = this.txt.y + 10;
			this._slideCountainer.addChild(lineShape);
			this._openDialogDiscountEnabled = true;
		} else {
			this._openDialogDiscountEnabled = false;
		}

		let bottomBg = BaseBitmap.create("rechargevie_border");
		bottomBg.width = 492;
		bottomBg.height = GameConfig.stageHeigth - 300 + 70-3;
		bottomBg.x =GameConfig.stageWidth - bottomBg.width;// 148;
		bottomBg.y = 75+5;
		this.addChild(bottomBg); 


		this._slideCountainer.addChild(this._bottomBox);
		this._bottomBox.setPosition(0, 0);

		this._slideCountainer.addChild(this._servantInfoBox);
		this._servantInfoBox.setPosition(0, -30);

	}
	public showItemList():void
	{
		this.clearIconArr();
		
		 
		if(this._vip1Boo==false&&this.newCurrIndex==1)
		{
			this.nextVipCfg.reward ="";
		}
		let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(this.nextVipCfg.reward,true,true);
		if (iconList&&iconList.length>0) {
			
			//额外赠送ICON
			let startX: number = 18;
			let startY: number = 415;
			let l: number = iconList.length;
			var _icon :BaseDisplayObjectContainer;
			for (let i: number = 0; i < l; i++) {
				let icon: BaseDisplayObjectContainer = iconList[i];
				icon.scaleX =0.78;
				icon.scaleY =0.78;
				icon.setPosition(startX + i * (icon.width*icon.scaleX + 12), startY);
				this._bottomBox.addChild(icon);
				this.groupArr.push(icon);
				_icon =icon;
			}

			//领取按钮
			this._receiveItemBtn = BaseBitmap.create("rechargevie_btn");
			this._receiveItemBtn.addTouchTap(this.itemHandler,this);
			this._receiveItemBtn.anchorOffsetX =this._receiveItemBtn.width/2;
			this._receiveItemBtn.anchorOffsetY =this._receiveItemBtn.height/2;
			this._bottomBox.addChild(this._receiveItemBtn);
			this._receiveItemBtn.visible = false; 
			this._receiveItemBtn.setPosition(380, 410);

	
			if(this.rechargevie_effects==null)
			{
				//可以领取的背景发光特效
				this.rechargevie_effects = BaseBitmap.create("rechargevie_effects");
				this.rechargevie_effects.addTouchTap(this.itemHandler,this);
				this._bottomBox.addChild(this.rechargevie_effects);
				this.rechargevie_effects.anchorOffsetX =this.rechargevie_effects.width/2;
				this.rechargevie_effects.anchorOffsetY =this.rechargevie_effects.height/2;
				this.rechargevie_effects.setPosition(430, 460);
				var _index =this._bottomBox.getChildIndex(this._receiveItemBtn);
				this._bottomBox.setChildIndex(this.rechargevie_effects,_index);
				this.rechargevie_effects.touchEnabled =false;
				this.rechargevie_effects.visible =false;
			}
			
			//领取字体
			this.receiveImg = BaseBitmap.create("rechargevie_receiveImg");
			this._bottomBox.addChild(this.receiveImg);
			this.receiveImg.x= 390;
			this.receiveImg.y= 480;
			this.receiveImg.touchEnabled =false;
			this.receiveImg.visible =false;
			this.showReceive();
		 
		}
		else
		{	 //充值状态下
			if(this._receiveItemBtn ==null)
			{
				this._receiveItemBtnType =0;
				this._receiveItemBtn = BaseBitmap.create("rechargevie_btn");
				this._receiveItemBtn.addTouchTap(this.itemHandler,this);
				this._slideCountainer.addChild(this._receiveItemBtn);
				this._receiveItemBtn.setPosition(380, 410);
				var _point = new egret.Point(this._receiveItemBtn.x,this._receiveItemBtn.y);
				 
			}
		}

		this._servantInfoBox.removeChildren();
		if (this._servantCfg['vip'+this.nextVipCfg.level]) {
			let _cfg = this._servantCfg['vip'+this.nextVipCfg.level];
			this._bottomBox.setPosition(0, 111);
			let _servant = Config.ServantCfg.getServantItemById(this.nextVipCfg.getServant);
			// 品质
			// let _quaIconKey: string = Config.ServantCfg.getQualityIconKeyBySid(this.nextVipCfg.getServant);
			// let _quaIcon = BaseLoadBitmap.create(_quaIconKey);
			// if (_quaIcon) {
			// 	this._servantInfoBox.addChild(_quaIcon);
			// 	_quaIcon.setPosition(_cfg.quaIcon[0], _cfg.quaIcon[1]);
			// }
			let _quaIcon = GameData.getServantQualityIconBySid(this.nextVipCfg.getServant);
			if (_quaIcon) {
				this._servantInfoBox.addChild(_quaIcon);
				_quaIcon.x = _cfg.quaIcon[0]
				_quaIcon.y = _cfg.quaIcon[1]
			}

			// 羁绊
			let _fetterBtn = GameData.getServantFetterBtn(this.nextVipCfg.getServant);
			if (_fetterBtn) {
				this._servantInfoBox.addChild(_fetterBtn);
				_fetterBtn.setPosition(26, 456);
				_fetterBtn.setScale(72/_fetterBtn.width);
			}
			
			let skillIcons = ComponentManager.getSkillBar(this.nextVipCfg.getServant, 72);
			this._servantInfoBox.addChild(skillIcons);
			skillIcons.setPosition(116, 462);
			skillIcons.labelWidth = 280;

		} else {
			this._bottomBox.setPosition(0, 0);
		}
	}

	/**羁绊详情 */
	private onFetterTap() {
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTJIBANBUFFPOPUPVUEW,{sid : this.nextVipCfg.getServant})
	}
	// /**技能详情 */
	// private onSkillTap(e, param?: {servant: string, skillid: string, icon: string, des: string}) {
	// 	if (!param || !param.skillid) {
	// 		this._onshowSkill = null;
	// 	} else if (this._onshowSkill && this._onshowSkill.skillid == param.skillid) {
	// 		this._onshowSkill = null;
	// 	} else {
	// 		this._onshowSkill = param;
	// 	}

	// 	this._skillDetails.onShow(this._onshowSkill);
	// 	this._skillDetails.setPosition(72, 450 - this._skillDetails.height);
	// }


	public clearIconArr():void
	{
		for(let i:number=this.groupArr.length-1;i>=0;i--)
		{
			let itemIcon=this.groupArr[i];
			if(	itemIcon&&itemIcon.parent)
			{
				if(itemIcon instanceof BaseDisplayObjectContainer)
				{
					itemIcon.dispose();
				}
				else
				{
					BaseBitmap.release(itemIcon);
				}
				this.groupArr.pop();
			}
		}

		if(this.rechargevie_effects)
		{
			egret.Tween.removeTweens(this.rechargevie_effects);
			BaseBitmap.release(this.rechargevie_effects);
			this.rechargevie_effects =null;
		}
		if(this.receiveImg)
		{
			BaseBitmap.release(this.receiveImg);
			this.receiveImg=null;
		}
		if(this._receiveItemBtn)
		{
			BaseBitmap.release(this._receiveItemBtn);
			this._receiveItemBtn=null;
		}

	}
	
	public showBtn(): void {
		this._vipBtnList = [];
		let btnNum:number=Api.vipVoApi.getMaxbtnNum();//this.getMaxbtnNum();
		for (var i: number = 0; i < btnNum; i++) {
			this._vipBtnList.push(i);
		}

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 180, GameConfig.stageHeigth - 230);
		this._scrollList = ComponentManager.getScrollList(VipBtnScrollItem, this._vipBtnList, rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(0, 75 + 5);
		this._scrollList.addTouchTap(this.clickItemHandler, this);
		
		this.freshButtonType(); 
		
	}
	public clickItemHandler(event: egret.TouchEvent): void 
	{
		this.scrollView.setScrollTop(-30 + 5); 
		var num = RechargeVipViewTab2.currNum;
		RechargeVipViewTab2.currNum = event.data;
		this.newCurrIndex = event.data+1;

		if (num == RechargeVipViewTab2.currNum) return;

		if (RechargeVipViewTab2.currNum != -1) {
			if (num != -1) {
				var _vipBtnScrollItem: VipBtnScrollItem = <VipBtnScrollItem>this._scrollList.getItemByIndex(num);
				_vipBtnScrollItem.removeBitmap();
			}else
			{
				var _vipBtnScrollItem: VipBtnScrollItem = <VipBtnScrollItem>this._scrollList.getItemByIndex(0);
				_vipBtnScrollItem.removeBitmap();
			}
		}
		var _vipBtnScrollItem: VipBtnScrollItem = <VipBtnScrollItem>this._scrollList.getItemByIndex(event.data);
		_vipBtnScrollItem.setType();
		
	
		if(this._vip1Boo&&this.newCurrIndex==1)
		{
			this.upBg.setload("vip_details_"+this._vipNum+this._isWxStr);
		}
		else
		{
			this.upBg.setload("vip_details_"+this.newCurrIndex+this._isWxStr);
		}
	

		this.refresh();
		this.refreshView(); 
	}
	
	private refreshView():void
	{
		if(this.newCurrIndex==0)
		{
			this.newCurrIndex+=1;
		}
		this.nextVipCfg = Api.vipVoApi.getVipCfgByLevel(this.newCurrIndex);
		
		if(this.titleTxt)
		{
	 		this.titleTxt.text= LanguageManager.getlocal("wifeUnlock_3", [this.newCurrIndex+""]);
		}
		if(this.txt)
		{
			this.txt.text =this.nextVipCfg.localStr;
		}

		this.showItemList();

	}
	private itemHandler(): void {
		if (RechargeVipViewTab2.currNum != -1&&this._receiveItemBtnType==1) {

			if (Api.playerVoApi.getPlayerVipLevel() >=this.newCurrIndex) 
			{
				App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_VIP_VIPWELFARE), this.useVipCallback, this);
				NetManager.request(NetRequestConst.REQUEST_VIP_VIPWELFARE, { "vip": this.newCurrIndex + "", });
			}
		}
		else
		{	
			if(this._receiveItemBtnType==0)
			{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RECHARFGE_RE);	
	
			}
		}
	}

	private useVipCallback(event: egret.Event): void {
		if (event.data.ret) {
			if(this._scrollList)
			{
				var _vipBtnScrollItem: VipBtnScrollItem = <VipBtnScrollItem>this._scrollList.getItemByIndex(this.newCurrIndex-1);
				_vipBtnScrollItem.setRedhot();
			}
			let curr_point = new egret.Point(GameConfig.stageWidth/2,GameConfig.stageHeigth/2+100);
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards),curr_point);
			this.showReceive();

			if(Api.switchVoApi.checkVip1Privilege()){
				let titleVo = Api.itemVoApi.getTitleInfoVoById(4001);
				let titleVo2 = Api.itemVoApi.getTitleInfoVoById(4004);
				if(titleVo && titleVo.num >0||titleVo2&&titleVo2.num>0){
					App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR);
				}
			}
		}
	}

	private removeLightEffect():void
	{
		if(this._light)
		{
			if(this._light.mask)
			{
				let bmp:BaseBitmap=<BaseBitmap>this._light.mask;
				if(bmp)
				{
					BaseBitmap.release(bmp);
				}
			}
			BaseBitmap.release(this._light);
			this._light =null;
		}
	}
	//领取按钮状态
	private showReceive(): void {

			if (Api.shopVoApi.getVipRewardInfo(this.newCurrIndex)) {
				//已经领取状态
				this._receiveItemBtn.visible = false;
				egret.Tween.removeTweens(this._receiveItemBtn);
				this._receiveItemBtnType =2;
				this.receiveImg.visible =false;


				this._alreadyReceived = BaseBitmap.create("rechargevie_received");
				this._bottomBox.addChild(this._alreadyReceived);
				this._alreadyReceived.setPosition(380, 413);
				this.groupArr.push(this._alreadyReceived);

				if(this.rechargevie_effects)
				{
					egret.Tween.removeTweens(this.rechargevie_effects);
					this.rechargevie_effects.visible =false;
				}
			
			}
			else {

				if(!Api.vipVoApi.getVipCfgByLevel(this.newCurrIndex).reward){
				 	this.rechargeState();
					return
				}
				// 可领取状态
				if (Api.playerVoApi.getPlayerVipLevel() >= this.newCurrIndex) 
				{
					this.removeLightEffect();
					this._receiveItemBtn.texture  =  ResourceManager.getRes("rechargevie_receivebtn");
					this._receiveItemBtn.x=430;
					this._receiveItemBtn.y=470;
					this._receiveItemBtn.visible =true;
					this._receiveItemBtnType =1;
					this.receiveImg.visible =true;
					//光效转圈特效
					if(	this.rechargevie_effects)
					{
						this.rechargevie_effects.visible =true;
						egret.Tween.get(this.rechargevie_effects,{loop:true}).to({rotation:	this.rechargevie_effects.rotation+360},10000);
					}
					egret.Tween.get(this._receiveItemBtn,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
				
				}
				else 
				{	
					this.rechargeState();
				}
			} 
	}
	private rechargeState():void
	{
		this._receiveItemBtn.texture  =  ResourceManager.getRes("rechargevie_btn");
		this._receiveItemBtn.setPosition(430,460); 
		this._receiveItemBtn.visible =true;
		var _point = new egret.Point(380,410);
	
		this._receiveItemBtnType =0;
		this.receiveImg.visible =false;
		egret.Tween.removeTweens(this._receiveItemBtn);
		
		if(this.rechargevie_effects)
		{
			egret.Tween.removeTweens(this.rechargevie_effects);
			this.rechargevie_effects.visible =false;
		}

	}
	private getShowVipLevel(): number {
		if (this._curShowVipLevel < 0) {
			this._curShowVipLevel = Api.vipVoApi.getShowVipLevel();
			if (this._curShowVipLevel >= Config.VipCfg.getMaxLevel()) {
				this._curShowVipLevel = Config.VipCfg.getMaxLevel();
			}
		}
		return this._curShowVipLevel;
	}

	private getNextShowVipLevel(): number {
		let nextVipLevel: number = Math.min(Math.max(0, this.getShowVipLevel() + 1), Config.VipCfg.getMaxLevel());
		return nextVipLevel;
	}

	private rechargeHandler(): void {
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
	}
	public tick(): void {
		let needRefresh = false;
		if (Api.acVoApi.getActivityVoByAidAndCode("discount","1") && Api.acVoApi.getActivityVoByAidAndCode("discount","1").isStart) {
			if (!this._openDialogDiscountEnabled) {
				needRefresh = true;
			}
		} else {
			if (this._openDialogDiscountEnabled) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEndViewRefreshed"));
				needRefresh = true;
			}
		}
		if (needRefresh) {
			// 刷新界面
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_RECHARGE_VIEW);	
		}
	}
	public dispose(): void {

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_VIP_VIPWELFARE), this.useVipCallback, this);
		this._receiveItemBtn = null;
		this._alreadyReceived = null;
		this._curShowVipLevel = -1;
		this._vipBtnList = [];
		this._scrollList = null;
		RechargeVipViewTab2.currNum = -1;
		this.newCurrIndex =-1;
		this.txt =null;
		this.titleTxt=null;
		this.downBg =null;
		this.currLevel =-1;
		this.nextVipCfg =null;
		this.upBg =null;
		RechargeVipViewTab2.lastVipLevel =0;
		this.boo =false;
		this._receiveItemBtnType =0;
		this.receiveImg =null;
		this._slideCountainer =null;
		this.scrollView = null;
		this._isWxStr = "";

		super.dispose();
	}
}