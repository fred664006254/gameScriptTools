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
	// private titleTxt:BaseTextField=null;
	private _titleIcon:VipIcon2=null;
	private txt: BaseTextField  =null;
	private _downBg:BaseBitmap =null;
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

	private _dgbone:BaseLoadDragonBones =null;
	private _dgbone2:BaseLoadDragonBones =null;
	private fontImg:BaseBitmap = null;
	private _rect:egret.Rectangle = null;
	private _rect2:egret.Rectangle = null;
	private vip12peopleImg:BaseBitmap =null;
	// private _lightimage:BaseBitmap =null;
	private _connerMarker:BaseDisplayObjectContainer = null;
	private _curOpenMaxVip:number = 16;
	private _skinPreviewContainer:BaseDisplayObjectContainer = null;
	private _skinAuraContainer:BaseDisplayObjectContainer = null;
	private _roleContainer:BaseDisplayObjectContainer = null;
	
	public constructor() 
	{
		super();
		this.initView();
	}

	private vipnpc = {
		12 : {
			servant : `servant_full2_1040`,
			wife : `wife_full_309`
		},
		13: {
			servant : 'servant_full2_1041',
			wife : `wife_full_311`
		},
		14: {
			servant : 'servant_full2_1042',
			wife : `wife_full_312`
		},
		15: {
			servant : 'servant_full2_1043',
			wife : `wife_full_313`
		},
		16: {
			servant : 'servant_full2_10411',
			wife : `wife_full3_3111`
		}
	};

	public refreshWhenSwitchBack(): void 
	{
		let currLevel:number=Api.playerVoApi.getPlayerVipLevel();
		this.currLevel = currLevel;
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
				this.upBg.setload("vip_details_"+this._vipNum);
			}
			else
			{
				if (this.checkIsVipOpen(RechargeVipViewTab2.lastVipLevel) && RechargeVipViewTab2.lastVipLevel == this._curOpenMaxVip){
					this.upBg = BaseLoadBitmap.create("vip_details_"+RechargeVipViewTab2.lastVipLevel+"_extra");
				}
				else{
					this.upBg.setload("vip_details_"+RechargeVipViewTab2.lastVipLevel);	
				}
			}
		
			this.showItemList();
			if(this.checkIsVipOpen(this.newCurrIndex))
			{
				this.showAnim();
			}
		}	
	}

	public refresh():void{
		this.currLevel = Api.playerVoApi.getPlayerVipLevel();
		if(this.newCurrIndex==-1)
		{
			this.newCurrIndex =this.currLevel;
		}
	}
	protected initView(): void 
	{

		this._vip1Boo=Api.switchVoApi.checkVip1Privilege();

		this._slideCountainer =new BaseDisplayObjectContainer();
		this._slideCountainer.y =30;
		this.addChild(this._slideCountainer);

		RechargeVipViewTab2.lastVipLevel= Api.playerVoApi.getPlayerVipLevel();
		this.refresh();
		this.refreshView();
		
		let leftBg: BaseBitmap = BaseBitmap.create("common_left_bg");
		leftBg.x = 0;
		leftBg.y = -30;
		leftBg.height = GameConfig.stageHeigth - 200;
		this.addChild(leftBg);

		//背景宣传图
		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,492,549);
		if(this.currLevel==0)
		{
			this.currLevel=1;
		}
	
		if(this._vip1Boo&&this.currLevel==1)
		{
		 	this.upBg = BaseLoadBitmap.create("vip_details_"+this._vipNum,rect);
		}
		else
		{
			if (this.checkIsVipOpen(this._curOpenMaxVip) && this.currLevel == this._curOpenMaxVip){
				this.upBg = BaseLoadBitmap.create("vip_details_"+this.currLevel+"_extra" ,rect);
			}
			else{
				this.upBg = BaseLoadBitmap.create("vip_details_"+this.currLevel,rect);
			}
		}
		this.upBg.x =0; 
		this._slideCountainer.addChild(this.upBg);
		this.upBg.y = -30;

		var rect2:egret.Rectangle = egret.Rectangle.create();
		rect2.setTo(-492/2,-434,492,434);
		this._rect2 =rect2;

		var rect3:egret.Rectangle = egret.Rectangle.create();
		rect3.setTo(-492/2,-434*10/8-125*10/8,492,434*10/8);
		this._rect =rect3;

		// this._lightimage = BaseBitmap.create("lightimage");
		// this._slideCountainer.addChild(this._lightimage);
		// this._lightimage.visible =false;

		if(this.checkIsVipOpen(this.newCurrIndex))
		{
			this.showAnim();
		}
	  
		//背景图风景
		let downBg: BaseBitmap = BaseBitmap.create("common_9_bg");
		downBg.width = 400;
		downBg.setPosition(this.upBg.x, this.upBg.y + this.upBg.height);
		this._slideCountainer.addChild(downBg);
		this._downBg =downBg;


		let downTitleLine: BaseBitmap = BaseBitmap.create("public_line3");
		downTitleLine.width = downBg.width - 60;
		downTitleLine.setPosition(downBg.x + (downBg.width - downTitleLine.width) / 2, downBg.y + 32);
		this._slideCountainer.addChild(downTitleLine);

		if (RechargeVipViewTab2.currNum == -1) {
			var str: string = this.currLevel +"";
		}
		else {
			var str: string = (RechargeVipViewTab2.currNum + 1).toString();
		}
		// let titleTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeUnlock_3", [str]), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BLACK);
		// let pos = App.CommonUtil.getCenterPos(downTitleLine, titleTxt, false);
		// titleTxt.setPosition(pos.x, pos.y);
		// this._slideCountainer.addChild(titleTxt);
		// this.titleTxt=titleTxt;
		let titleIcon:VipIcon2=Api.vipVoApi.getVipIcon2(Number(str));
		let pos = App.CommonUtil.getCenterPos(downTitleLine, titleIcon, false);
		titleIcon.setPosition(pos.x, pos.y-5);
		this._slideCountainer.addChild(titleIcon);
		this._titleIcon=titleIcon;


		let txt: BaseTextField = ComponentManager.getTextField("\n"+this.nextVipCfg.localStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		txt.width =400; 
		txt.lineSpacing = 5;
		txt.y=580 - 17;
		txt.x =30;
		if(App.DeviceUtil.isRuntime2()==false)
		{
			txt.cacheAsBitmap = true;
		}
		this._slideCountainer.addChild(txt);
		this.txt =txt;
		// downBg.height = 500;
		if(Api.switchVoApi.checkOpenVipTxtpop())
		{
			let txtTouchBg:BaseBitmap = BaseBitmap.create("public_9_bg11");
			this.addChild(txtTouchBg);
			txtTouchBg.x= txt.x;
			txtTouchBg.y= txt.y;
			txtTouchBg.width= txt.width; 
			txtTouchBg.alpha =0;
			txtTouchBg.addTouch(this.openTxtPopup,this);
			if(Api.acVoApi.checkIsVipDiscount())
			{
				txtTouchBg.height = 45;
			}
			this._slideCountainer.addChild(txtTouchBg);
		} 
		downBg.height = txt.height + 100 > 500 ? (txt.height + 100) : 500;
		let scrollRect1 = new egret.Rectangle(0,0,492,GameConfig.stageHeigth-190);
		if(this.scrollView==null)
		{
			this.scrollView =ComponentManager.getScrollView(this._slideCountainer,scrollRect1);
			this.scrollView.x=150;
			this.scrollView.y=-30;
			this.scrollView.horizontalScrollPolicy="off";
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
			this._receiveItemBtn.setPosition(385, 410);
			var _point = new egret.Point(this._receiveItemBtn.x,this._receiveItemBtn.y);
		}
		this.showBtn();
		// vip折扣
		if (Api.acVoApi.checkIsVipDiscount()) {
			let discountIcon = BaseBitmap.create("recharge_discount_right");
			discountIcon.x = 414;
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
		this._slideCountainer.height = this._downBg.y + this._downBg.height + 35;

		let vipcfg = Config.VipCfg.getVipCfgByLevel(this.newCurrIndex);
		if (vipcfg.getServant)
		{
			let servantCfg = Config.ServantCfg.getServantItemById(vipcfg.getServant);
			if(servantCfg.quality2 )
			{	
				let posArrayL:number[] = [9];
				let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
				cornerImg.x = 405;
				if (GameData.isInArray(this.newCurrIndex,posArrayL))
				{
					cornerImg.x = 20;
				}
				cornerImg.y = 290;
				if (this.newCurrIndex>8)
				{
					cornerImg.y = 260;
				}
				if (PlatformManager.checkIsRuSp())
				{
					cornerImg.y = 225;
				}
				cornerImg.setScale(1.3);
				this._slideCountainer.addChild(cornerImg);
				this._connerMarker = cornerImg;
			}
		}
	}
	private openTxtPopup():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.VIPTXTPOPUPVIEW); 
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
			let startX: number = 10;
			let startY: number = 421;
			let l: number = iconList.length;
			var _icon :BaseDisplayObjectContainer;
			for (let i: number = 0; i < l; i++) {
				let icon: BaseDisplayObjectContainer = iconList[i];
				icon.scaleX =0.78;
				icon.scaleY =0.78;
				icon.setPosition(startX + i * (icon.width*icon.scaleX + 12), startY);
				this._slideCountainer.addChild(icon);
				this.groupArr.push(icon);
				_icon =icon;
			}

			//领取按钮
			this._receiveItemBtn = BaseBitmap.create("rechargevie_btn");
			this._receiveItemBtn.addTouchTap(this.itemHandler,this);
			this._receiveItemBtn.anchorOffsetX =this._receiveItemBtn.width/2;
			this._receiveItemBtn.anchorOffsetY =this._receiveItemBtn.height/2;
			this._slideCountainer.addChild(this._receiveItemBtn);
			this._receiveItemBtn.visible = false; 
			this._receiveItemBtn.setPosition(385, 410);

	
			if(this.rechargevie_effects==null)
			{
				//可以领取的背景发光特效
				this.rechargevie_effects = BaseBitmap.create("rechargevie_effects");
				this.rechargevie_effects.addTouchTap(this.itemHandler,this);
				this._slideCountainer.addChild(this.rechargevie_effects);
				this.rechargevie_effects.anchorOffsetX =this.rechargevie_effects.width/2;
				this.rechargevie_effects.anchorOffsetY =this.rechargevie_effects.height/2;
				this.rechargevie_effects.setPosition(440, 460);
				var _index =this._slideCountainer.getChildIndex(this._receiveItemBtn);
				this._slideCountainer.setChildIndex(this.rechargevie_effects,_index);
				this.rechargevie_effects.touchEnabled =false;
				this.rechargevie_effects.visible =false;
			}
			
			//领取字体
			this.receiveImg = BaseBitmap.create("rechargevie_receiveImg");
			this._slideCountainer.addChild(this.receiveImg);
			this.receiveImg.x= 400;
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
				this._receiveItemBtn.setPosition(390, 410);
				var _point = new egret.Point(this._receiveItemBtn.x,this._receiveItemBtn.y);
				 
			}
		}
	}
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
		rect.setTo(0, 0, 153, GameConfig.stageHeigth - 200);
		this._scrollList = ComponentManager.getScrollList(VipBtnScrollItem, this._vipBtnList, rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(0, -30);
		this._scrollList.addTouchTap(this.clickItemHandler, this); 
		this.freshButtonType();
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

	public clickItemHandler(event: egret.TouchEvent): void 
	{
		this.scrollView.setScrollTop(-30); 
		var num = RechargeVipViewTab2.currNum;
		RechargeVipViewTab2.currNum = event.data;
		this.newCurrIndex = event.data+1;

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
			this.upBg.setload("vip_details_"+this._vipNum);
		}
		else
		{	
			if (this.checkIsVipOpen(this._curOpenMaxVip) && this._curOpenMaxVip == this.newCurrIndex){
				this.upBg.setload("vip_details_"+this.newCurrIndex+"_extra");
			}
			else{
				this.upBg.setload("vip_details_"+this.newCurrIndex);
			}	
		}
		if(this.checkIsVipOpen(this.newCurrIndex))
		{
			this.showAnim();
		}
		else
		{
			this.clearSkinPreContainer();
			this.clearAnim();
			this.clearFontImg();
			this.clearPeople();
		} 

		this.refresh();
		this.refreshView();

		if (this._connerMarker)
		{
			this._connerMarker.dispose();
			this._connerMarker=null;
		}

		
		let vipcfg = Config.VipCfg.getVipCfgByLevel(this.newCurrIndex);
		if (vipcfg.getServant)
		{
			let servantCfg = Config.ServantCfg.getServantItemById(vipcfg.getServant);
			if(servantCfg.quality2 )
			{	
				let posArrayL:number[] = [9];
				let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
				cornerImg.x = 405;
				if (GameData.isInArray(this.newCurrIndex,posArrayL))
				{
					cornerImg.x = 20;
				}
				cornerImg.y = 290;
				if (this.newCurrIndex>8)
				{
					cornerImg.y = 260;
				}
				if (PlatformManager.checkIsRuSp())
				{
					cornerImg.y = 225;
				}
				
				cornerImg.setScale(1.3);
				this._slideCountainer.addChild(cornerImg);
				this._connerMarker = cornerImg;
			}
		}
		

		
		
	}
	private showAnim():void
	{	  
		this.clearSkinPreContainer();
		this.clearAnim(); 
		this.clearPeople();
		if(App.CommonUtil.check_dragon() && ResourceManager.hasRes(this.vipnpc[this.newCurrIndex].servant+"_ske")&&this.vipnpc[this.newCurrIndex].wife&&ResourceManager.hasRes(this.vipnpc[this.newCurrIndex].wife+"_ske"))
		{	
			
			if(this._dgbone ==null && this.vipnpc[this.newCurrIndex] && this.vipnpc[this.newCurrIndex].servant)
			{	 
				var	dgbone = App.DragonBonesUtil.getLoadDragonBones(this.vipnpc[this.newCurrIndex].servant);  
				// dgbone.playDragonMovie('idle',0);
				dgbone.x= 350;
				dgbone.y = 405;
				var index = this._slideCountainer.getChildIndex(this.upBg);
				this._dgbone = dgbone;
				if (this.newCurrIndex == 15){
					this._slideCountainer.addChildAt(dgbone,index+1);
					dgbone.y = 415;
					let rect:egret.Rectangle = egret.Rectangle.create();
					rect.setTo(-492/2,-445,492,434);
					this._dgbone.mask = rect;
				}
				else if (this.newCurrIndex == 16){
					this._roleContainer = new BaseDisplayObjectContainer();
					this._roleContainer.width = 492;
					let roleMask = new egret.Rectangle(0, 0, 492, 434);
					this._roleContainer.mask = roleMask;
					this._slideCountainer.addChildAt(this._roleContainer, index+1);
					this._roleContainer.setPosition(this.upBg.x, this.upBg.y);
					dgbone.x= 180;
					dgbone.y = 445;
					this._roleContainer.addChildAt(dgbone,index+1);
					this._dgbone = dgbone;
				}
				else{
					this._slideCountainer.addChildAt(dgbone,index+1);
					this._dgbone.mask = this._rect2;
				}
			}
			
			if(this._dgbone2 ==null && this.vipnpc[this.newCurrIndex] && this.vipnpc[this.newCurrIndex].wife)
			{
				var	dgbone2 = App.DragonBonesUtil.getLoadDragonBones(this.vipnpc[this.newCurrIndex].wife);  
				// dgbone2.playDragonMovie('idle',0);
				dgbone2.x= 160;
				dgbone2.y = 530;
				dgbone2.scaleX = 0.8;
				dgbone2.scaleY = 0.8; 
				this._dgbone2 =dgbone2;
				if (this.newCurrIndex == 16){
					dgbone2.x= 350;
					dgbone2.y = 530;
					let index = this._roleContainer.getChildIndex(this._dgbone);
					this._roleContainer.addChildAt(dgbone2, index+1);
				}
				else{
					var index = this._slideCountainer.getChildIndex(this._dgbone);
					this._slideCountainer.addChildAt(dgbone2,index+1);
					this._dgbone2.mask = this._rect;
				}
			}
		}
		else
		{	
			// this.clearPeople();
			if(this.vip12peopleImg==null)
			{
				this.vip12peopleImg = BaseBitmap.create(`vip${this.newCurrIndex}people`);
				this.vip12peopleImg.x =0;
				this.vip12peopleImg.y = -30;
				this._slideCountainer.addChild(this.vip12peopleImg); 
			} 
		}
		this.showvip12Img();

		if (this.newCurrIndex == 16 && this.checkIsVipOpen(this.newCurrIndex)){
			let vipCfg = Config.VipCfg.getVipCfgByLevel(this.newCurrIndex);
			if (this.vipnpc[this.newCurrIndex].wife && this.vipnpc[this.newCurrIndex].servant){
				let wifeSkinId = vipCfg.getWifeSkin;
				let wifeIdType = Config.WifeskinCfg.formatRewardItemVoStr(wifeSkinId);
				let wifeNeedstr = LanguageManager.getlocal("rechargeVipWifeSkinTopTip_"+this.newCurrIndex);
				let servantSkinId = vipCfg.getServantSkinId();
				let serIdType = Config.ServantskinCfg.formatRewardItemVoStr(servantSkinId);
				let serNeedstr = LanguageManager.getlocal("rechargeVipServantSkinTopTip_"+this.newCurrIndex);
				let data = {data:[
					{idType: serIdType, topMsg:serNeedstr, bgName:"", scale: 0.85, title:``,offY:0},
					{idType: wifeIdType, topMsg:wifeNeedstr, bgName:"", scale: 0.6, title:``,offY:0},
				], showType:""};
				this._skinPreviewContainer = this.getSkinPreviewBtn(()=>{
					ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
				},this);
				this._slideCountainer.addChild(this._skinPreviewContainer)
				this._skinPreviewContainer.setPosition(160, 290);

				let skinAura = App.CommonUtil.getServantSkinAuraById(servantSkinId);
				if (skinAura){
					this._skinAuraContainer = skinAura;
					skinAura.setScale(0.8);
					this._slideCountainer.addChild(skinAura);
					skinAura.setPosition(30, 250);
				}
			}
		}
	} 

	private clearSkinPreContainer():void{
		if (this._skinPreviewContainer){
			this._skinPreviewContainer.dispose();
			this._skinPreviewContainer = null;
		}
		if (this._skinAuraContainer){
			this._skinAuraContainer.dispose();
			this._skinAuraContainer = null;
		}
	}

	private clearAnim():void
	{
		if(this._dgbone &&this._slideCountainer)
		{
			// this._slideCountainer.removeChild(this._dgbone);
			this._dgbone.dispose();
			this._dgbone =null;
		
		}
		if(this._dgbone2 &&this._slideCountainer)
		{
			// this._slideCountainer.removeChild(this._dgbone2);
			this._dgbone2.dispose();
			this._dgbone2=null;
		}
		// if(this._lightimage)
		// {
		// 	egret.Tween.removeTweens(this._lightimage);

		// }
		if (this._roleContainer){
			this._roleContainer.dispose();
			this._roleContainer = null;
		}
			
	}

	private showvip12Img():void
	{	
		
		this.clearFontImg();
		if(this.fontImg==null)
		{
			this.fontImg = BaseBitmap.create(`vip${this.newCurrIndex}font`);
			this.fontImg.x = 0;
			this.fontImg.y = -30;
			this._slideCountainer.addChild(this.fontImg); 
		} 
	}
	private clearFontImg():void
	{
		if(this.fontImg&&this._slideCountainer)
		{
			this._slideCountainer.removeChild(this.fontImg);
			this.fontImg =null;
		} 
		
	}
	private clearPeople()
	{
		if(this.vip12peopleImg&&this._slideCountainer)
		{
			this._slideCountainer.removeChild(this.vip12peopleImg); 
			this.vip12peopleImg =null;
		}
	}

	
	private refreshView():void
	{
		if(this.newCurrIndex==0)
		{
			this.newCurrIndex+=1;
		}
		this.nextVipCfg = Api.vipVoApi.getVipCfgByLevel(this.newCurrIndex);
		
		// if(this.titleTxt)
		// {
	 	// 	this.titleTxt.text= LanguageManager.getlocal("wifeUnlock_3", [this.newCurrIndex+""]);
		// }
		if(this._titleIcon)
		{
			this._titleIcon.setVipLevel(this.newCurrIndex);
		}
		if(this.txt)
		{
			this.txt.text = "\n"+this.nextVipCfg.localStr;
		}

		if(this._downBg&&this.txt)
		{
			this._downBg.height = this.txt.height + 100 > 500 ? (this.txt.height + 100) : 500;
		}
		if (this._downBg){
			this._slideCountainer.height = this._downBg.y + this._downBg.height + 35;
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
			let rewards = event.data.data.data.rewards;
			let rewardList = GameData.formatRewardItem(rewards);
			for (let i=0; i < rewardList.length; i++){
				if (rewardList[i].type == 35){
					let info = {
						zid:Api.mergeServerVoApi.getTrueZid(Api.playerVoApi.getPlayerID()),
						name:Api.playerVoApi.getPlayerName(),
						level:Api.playerVoApi.getPlayerLevel(),
						uid:Api.playerVoApi.getPlayerID(),
						pic:Api.playerVoApi.getPlayePicId(),
						id: rewardList[i].id,
						st: GameData.serverTime,
						title:Api.playerVoApi.getTitleInfo(),
					}
					Api.biographyVoApi.showInfo = info;
					ViewController.getInstance().openView(ViewConst.COMMON.BIOGRAPHYSHOWVIEW,{});
					break;
				}
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
				this._slideCountainer.addChild(this._alreadyReceived);
				this._alreadyReceived.setPosition(390, 413);
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
					this._receiveItemBtn.x=440;
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
		this._receiveItemBtn.setPosition(440,460); 
		this._receiveItemBtn.visible =true;
		var _point = new egret.Point(385,410);
	
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
		if (Api.acVoApi.checkIsVipDiscount()) {
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

	private checkIsVipOpen(level : number):boolean{
		let flag = false;
		if(this.vipnpc[level] && Api.vipVoApi.getVipCfgByLevel(level) && Api.vipVoApi.getVipCfgByLevel(level).reward){
			flag = true;
		}
		return flag;
	}

	private getSkinPreviewBtn(callback:Function, obj:any):BaseDisplayObjectContainer{
		//衣装预览
		let container = new BaseDisplayObjectContainer();
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		// skinTxtEffect.setPosition(50, GameConfig.stageHeigth - 150);
		container.width = skinTxtEffect.width;
		container.height = skinTxtEffect.height;
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		container.addChild(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		container.addChild(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxt1.anchorOffsetX = skinTxt1.width / 2;
		skinTxt1.anchorOffsetY = skinTxt1.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
		container.addChild(skinTxt1);
		skinTxt1.blendMode = egret.BlendMode.ADD;
		skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
		skinTxt1.addTouchTap(() => {
            callback.apply(obj);
        }, this);
		return container;
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
		// this.titleTxt=null;
		this._titleIcon=null;
		this._downBg =null;
		this.currLevel =-1;
		this.nextVipCfg =null;
		this.upBg =null;
		RechargeVipViewTab2.lastVipLevel =0;
		this.boo =false;
		this._receiveItemBtnType =0;
		this.receiveImg =null;
		this._slideCountainer =null;
		this.scrollView = null;
		if(this._dgbone2&&this._dgbone2.mask)
		{
			this._dgbone2.mask =null;
			this._dgbone2.dispose();
			this._dgbone2=null;
		}
		if(this._dgbone&&this._dgbone.mask)
		{
			this._dgbone.mask =null;
			this._dgbone.dispose();
			this._dgbone=null;
		} 
		if(this._rect)
		{
			egret.Rectangle.release(this._rect);
			this._rect =null;
		}
		if(this._rect2)
		{
			egret.Rectangle.release(this._rect2);
			this._rect2 =null;
		}
		this.vip12peopleImg =null;
		this._connerMarker = null;
		this._skinPreviewContainer = null;
		this._skinAuraContainer = null;
		this._roleContainer = null;
		
		super.dispose();
	}
}