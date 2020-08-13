class WelfareViewYearCard extends WelfareViewTab
{
	private _goToRechargeBtn:BaseButton;
	private _scrollContiner:BaseDisplayObjectContainer=undefined;
	private _openDialogDiscountEnabled = false;
	private _offsetY:number = 0;
	private _downBottom:BaseBitmap =null;
	/** 最近一次点击购买钻石的时间（防止连点） */
	private _lastClickBuyTime:number = 0;
	private _acTimeTF:BaseTextField = null;
	private _circular:BaseBitmap = null;
	private _oldPriceText:BaseTextField =null;
	private _yearcard_line:BaseBitmap =null;
	private _strWx:string ="";
	private _btnLine:BaseBitmap =null;
	private _newPriceText:BaseTextField = null;
	private _originalPriceText :BaseTextField = null;

	public constructor() 
	{
		super();
	}

	protected init():void
	{
		super.init();
		this.initNewUi();
		// let acDiscountVo = Api.acVoApi.checkIsYearCardDiscount();
		

		// this._offsetY = this.bottomBg.y+20;
		// this._scrollContiner = new BaseDisplayObjectContainer();
		// let rect:egret.Rectangle = egret.Rectangle.create();
		// rect.setTo(0,this.bottomBg.y+20,this.bottomBg.width, this.bottomBg.height - 40);
		// let scrollView:ScrollView = ComponentManager.getScrollView(this._scrollContiner,rect); 
		// this.addChild(scrollView);  
 

		// let iconSp:BaseBitmap =null;

		// 	let m_font:BaseBitmap = BaseLoadBitmap.create("yearcard_font");
		// 	m_font.height =105;
		// 	m_font.width = 324; 
		// 	this.addChild(m_font);
		// 	this.setLayoutPosition(LayoutConst.horizontalCenter,m_font,this.bottomBg);
		// 	m_font.y =this.bottomBg.y+75;
 
		// 	if(PlatformManager.checkIsWxSp())
		// 	{
		// 		this._strWx  = "_wxType";
		// 	}
		// 	else
		// 	{
		// 		this._strWx  = "";
		// 	}
			 
		// 	let fontBg	= BaseBitmap.create("yearcard_bg01"+this._strWx);
		// 	fontBg.x = 20; 
		// 	fontBg.y = m_font.y+m_font.height+50;
		// 	fontBg.width =403;
		// 	this._scrollContiner.addChild(fontBg);  

		// 	iconSp	= BaseBitmap.create("yearcard_bg1");
		// 	iconSp.x = 15; 
		// 	iconSp.y = m_font.y+m_font.height+80;
		// 	this._scrollContiner.addChild(iconSp);

			 
		// 	let  downBottom:BaseBitmap = BaseBitmap.create("monthcard_bottom");
		// 	this.addChild(downBottom);
		// 	downBottom.y = GameConfig.stageHeigth - downBottom.height-73;
		// 	downBottom.x = 5;
		// 	this._downBottom=downBottom;

		// 	let downBottomDes:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("newYearDesc1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		// 	this.addChild(downBottomDes); 
		// 	this.setLayoutPosition(LayoutConst.horizontalCenter,downBottomDes,downBottom);
		// 	downBottomDes.y = downBottom.y+185; 

		// 	let downBottomDes2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("newYearDesc2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		// 	this.addChild(downBottomDes2); 
		// 	this.setLayoutPosition(LayoutConst.horizontalCenter,downBottomDes2,downBottom)
		// 	downBottomDes2.y = downBottomDes.y+24; 

		// 	if (Api.switchVoApi.checkTWShenhe()) {
		// 			m_font.visible = false;
		// 			downBottomDes2.visible = false;
				
		// 	}
		
		 

		// let yearcard_desc = "yearcard_desc";
		// // 折扣活动
		// if ( acDiscountVo || PlatformManager.checkIsSfSp()) {
		// 	yearcard_desc = "yearcard_desc2";
		// }
		// let descSp = BaseBitmap.create(yearcard_desc);
					

		// descSp.x = this.bottomBg.width/2 - descSp.width/2+20;
		// descSp.y = iconSp.y + iconSp.height + 10;
		// this._scrollContiner.addChild(descSp);




		// 	descSp.visible =false;  
		// 	let baseY = iconSp.y+373;
		// 	let monthDes1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("yearcard_desc_1"),20);

		// 	monthDes1.x  =	iconSp.x+60;
		// 	monthDes1.y  =	baseY;//iconSp.y+383;
		// 	monthDes1.width = 345;
		// 	monthDes1.lineSpacing = 5;
		// 	this._scrollContiner.addChild(monthDes1); 
			
		// 	// let monthDes2:BaseBitmap =BaseBitmap.create("yearcard_desc_2");
		// 	if(monthDes1.height > 0){
		// 		baseY += monthDes1.height + 10;
		// 	}
		// 	let monthDes2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("yearcard_desc_2"),20);
		// 	monthDes2.x  =	iconSp.x+60;
		// 	monthDes2.y  =	baseY;//monthDes1.y+30;
		// 	monthDes2.width = 345;
		// 	monthDes2.lineSpacing = 5;
		// 	this._scrollContiner.addChild(monthDes2); 

		// 	if (Api.switchVoApi.checkTWShenhe()) {
		// 		monthDes2.visible = false;
		// 	}
		// 	let monthDes3:BaseTextField = null;
		// 	//解锁关卡跳过
		// 	// if (Api.switchVoApi.checkJumpBattle()) 
		// 	// {
		// 		// let monthDes3 = BaseBitmap.create("monthcard_desc_3");
		// 		let str = "";
		// 		if(PlatformManager.checkIsWxSp()){
		// 			str = "_wxType"
		// 		}
		// 		if(monthDes2.height > 0){
		// 			baseY += monthDes2.height + 10;
		// 		}
		// 		monthDes3 = ComponentManager.getTextField(LanguageManager.getlocal("monthcard_desc_3"+str),20);
		// 		monthDes3.x  =	iconSp.x+60;
		// 		monthDes3.y  =	baseY;//monthDes2.y+30;
		// 		monthDes3.width = 345;
		// 		monthDes3.lineSpacing = 5;
		// 		this._scrollContiner.addChild(monthDes3);
		// 	// }

		// 	if(Api.practiceVoApi.isPracticeOPen())
		// 	{
		// 		// let monthDes4 = BaseBitmap.create("yearcard_desc_4");
		// 		if(monthDes3 && monthDes3.height > 0){
		// 			baseY += monthDes3.height + 10;
		// 		}
		// 		let monthDes4:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("yearcard_desc_4"),20);
		// 		monthDes4.x  =	iconSp.x+60;
		// 		monthDes4.y  =	baseY;//monthDes2.y+30+30;
		// 		monthDes4.width = 345;
		// 		monthDes4.lineSpacing = 5;
		// 		this._scrollContiner.addChild(monthDes4);
		// 	}  

		// let isBuy = Api.shopVoApi.ifBuyYearCard();
		// if(isBuy == true)
		// {

		// 	this.showText();
		// 	let hasGetSp = BaseBitmap.create("public_buy");
		// 	hasGetSp.x = this.bottomBg.width/2 - hasGetSp.width/2+10;
		// 	hasGetSp.y = descSp.y + descSp.height + 45 - hasGetSp.height/2;

		// 		hasGetSp.y = this._downBottom.y+97;
		// 		this.addChild(hasGetSp); 
			
		
		// }
		// else
		// {
		// 	let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g8");
		// 	if(rechargeItemCfg)
		// 	{
		// 		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
		// 		let goToRechargeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"anyMoney",this.goToRechargeHandler,this);
		// 		goToRechargeBtn.x = this.bottomBg.width/2 - goToRechargeBtn.width/2+10;
				
		// 			goToRechargeBtn.y = this._downBottom.y+103;
		// 			this.addChild(goToRechargeBtn);
					
		// 		let str =LanguageManager.getlocal("anyMoney",[rechargeItemCfg.cost.toString()]);
		// 		goToRechargeBtn.setText(str,false); 
		// 		this._goToRechargeBtn = goToRechargeBtn;
				
		// 		// 折扣活动
		// 		if (acDiscountVo) {
		// 			let oldPriceText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acDiscount_oldPrice", [LanguageManager.getlocal("anyMoney",[rechargeItemCfg.cost.toString()])]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		// 			oldPriceText.x = goToRechargeBtn.x - 130;
		// 			oldPriceText.y = goToRechargeBtn.y + goToRechargeBtn.height/2 - oldPriceText.height/2;
		// 			this._scrollContiner.addChild(oldPriceText); 

		// 				let timeStr =App.DateUtil.getFormatBySecond( acDiscountVo.et - GameData.serverTime,1);
		// 				this._acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("newYearTime",[timeStr]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED2);
		// 			 	this._scrollContiner.addChild(this._acTimeTF);
		// 				this.tick();  
 		// 			 	 oldPriceText.setColor(TextFieldConst.COLOR_WARN_RED2);   
		// 				 this.setLayoutPosition(LayoutConst.horizontalCenter,this._acTimeTF,this._downBottom);
		// 				 this._acTimeTF.y = this._goToRechargeBtn.y - this._acTimeTF.height - 7;
					
					
		// 		}
		// 	}


		// 	let vo = Api.acVoApi.checkIsYearCardDiscount();
		// 	//新版本下打折
		// 	if(vo)
		// 	{ 
		// 			let rechargeItemCurrentCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g11");  
		// 			if(rechargeItemCurrentCfg)
		// 			{
		// 				let originalPrice:string = rechargeItemCurrentCfg.cost+"";
		// 				this._goToRechargeBtn.setText(originalPrice,false);   
		// 			} 

		// 			this._circular = BaseBitmap.create("yearcard_discount");
		// 			this._circular.x =335;
		// 			this._circular.y =this._goToRechargeBtn.y -20; 
		// 			this.addChild(this._circular);
		// 			this.setChildIndex(this._circular,this.getChildIndex(this._goToRechargeBtn)-1);


		// 			//原价文字 
		// 			let  originalPriceText= ComponentManager.getTextField(LanguageManager.getlocal("originalPriceTitle"), TextFieldConst.FONTSIZE_BUTTON_COMMON);
		// 			this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,originalPriceText,this._circular,[0,-13]);
		// 			this.addChild(originalPriceText);  
		// 			this._originalPriceText =  originalPriceText;

				
		// 			if(App.DeviceUtil.isWXgame())
		// 	 		{ 
		// 				//原价价格
		// 				this._newPriceText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON);
		// 				this._newPriceText.text = LanguageManager.getlocal("anyMoney",["288"]);//App.CommonUtil.getMoneyString(rechargeItemCfg.cost),false
		// 				this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,this._newPriceText,this._circular,[0,10]);
		// 				this._newPriceText.bold = true;
		// 				this._newPriceText.italic =true;
		// 				this.addChild(this._newPriceText);  
		// 			} 
		// 			else
		// 			{	
		// 				let rechargeItemCurrentCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g8");
		// 				if(rechargeItemCurrentCfg) 
		// 				{	 
		// 					let oldPriceText:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("anyMoney",[rechargeItemCurrentCfg.cost.toString()]), TextFieldConst.FONTSIZE_BUTTON_COMMON);
		// 					this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,oldPriceText,this._circular,[0,10]);
		// 					this.addChild(oldPriceText); 
		// 					oldPriceText.bold = true;
		// 					oldPriceText.italic =true;
		// 					this._oldPriceText = oldPriceText;
		// 				} 
		// 		 } 

		// 		//打折斜线
		// 		this._btnLine= BaseBitmap.create("yearcard_line");
		// 		this._btnLine.setPosition(this._circular.x-5,this._circular.y+30);
		// 		this.addChild(this._btnLine); 
		
		// 	}
		// }

		// // 折扣活动
		// if (acDiscountVo) {
		// 	this._openDialogDiscountEnabled = true;
		// } else {
		// 	this._openDialogDiscountEnabled = false;
		// }
		// if (PlatformManager.checkIsTWMCSp() == true)
		// {
		// 	let buyCardExplain:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("twBuyCardExplain"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		// 	buyCardExplain.width = 360;
		// 	buyCardExplain.height = 250;
		// 	buyCardExplain.x = this.bottomBg.width/2 - buyCardExplain.width/2;
		// 	buyCardExplain.y = descSp.y+220;
		// 	buyCardExplain.lineSpacing = 5;
		// 	this._scrollContiner.addChild(buyCardExplain);

		// }

		// let bottomBg = BaseBitmap.create("public_9v_bg03");
		// bottomBg.width = 490;
		// bottomBg.height = GameConfig.stageHeigth - 65;
		// bottomBg.x = 0;
		// bottomBg.y = 0;
		// this.addChild(bottomBg); 

		// if(PlatformManager.checkIsJPSp()&&this._acTimeTF)
		// {
		// 	this._acTimeTF.visible =false;
		// }

	}

	public initNewUi()
	{
		// this._offsetY = this.bottomBg.y+20;
		this._scrollContiner = new BaseDisplayObjectContainer();

				// this._scrollContiner = new BaseDisplayObjectContainer();
		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,this.bottomBg.y+20,this.bottomBg.width, this.bottomBg.height - 40);
		let scrollView:ScrollView = ComponentManager.getScrollView(this._scrollContiner,rect); 
		this.addChild(scrollView);  
		this._scrollContiner.y = this.bottomBg.y;
		this._scrollContiner.x = 0;
		// this.addChild(this._scrollContiner);

		let uiBg = BaseBitmap.create("yearcard_newBg");
		uiBg.x = 0;
		uiBg.y = 0;
		this._scrollContiner.addChild(uiBg);  
		if(PlatformManager.checkIsWxCfg())
		{
			this._strWx = "_wxType";
		}else
		{
			this._strWx = ""
		}
		let topBanner = BaseBitmap.create("yearcard_banner"+this._strWx);
		topBanner.x = 0;
		topBanner.y = 0;
		this._scrollContiner.addChild(topBanner);  


		for(var i =1;i<=4;i++)
		{
			this.creatCellByIndex(i);
		}

		let bottomBg = BaseBitmap.create("monthcard_down_bg");
		bottomBg.x = 0;
		bottomBg.y = this.bottomBg.height - bottomBg.height;
		bottomBg.y = 250+298+149+149
		this._scrollContiner.addChild(bottomBg);  
		this._offsetY = bottomBg.y;


		let isBuy = Api.shopVoApi.ifBuyYearCard();
		if(isBuy == true)
		{
			let hasGetSp = BaseBitmap.create("public_buy");
			hasGetSp.x = this.bottomBg.width/2 - hasGetSp.width/2;
			hasGetSp.y = bottomBg.y + 55;
			this._scrollContiner.addChild(hasGetSp); 

			this.showText();
		
		}
		else
		{

			let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g8");
			let rechargeItemCurrentCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g11");
			if(rechargeItemCfg||rechargeItemCurrentCfg)
			{
				App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
				let goToRechargeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"anyMoney",this.goToRechargeHandler,this);
				goToRechargeBtn.x = bottomBg.x + bottomBg.width/2 - goToRechargeBtn.width/2;
				goToRechargeBtn.y = bottomBg.y + 55;
				this._scrollContiner.addChild(goToRechargeBtn); 
				this._goToRechargeBtn = goToRechargeBtn;
				
				let g8Cost = 0
				if(PlatformManager.checkIsKRNewSp())
				{
					g8Cost = 50000;
				}else{
					g8Cost = rechargeItemCfg.cost;
				}

				
				

				let acDiscountVo = Api.acVoApi.checkIsYearCardDiscount();
				//终身卡打折
				if(acDiscountVo && rechargeItemCurrentCfg)
				{
					this._openDialogDiscountEnabled = true;
					
					let str =LanguageManager.getlocal("anyMoney",[rechargeItemCurrentCfg.cost.toString()])
					goToRechargeBtn.setText(str,false);
					let endTime = acDiscountVo.et;
					let timeStr =App.DateUtil.getFormatBySecond( endTime - GameData.serverTime,1);
					this._acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("newYearTime",[timeStr]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED2);
					this._scrollContiner.addChild(this._acTimeTF);
					this._acTimeTF.x = bottomBg.x + bottomBg.width/2 - this._acTimeTF.width/2;
					this._acTimeTF.y =this._goToRechargeBtn.y - this._acTimeTF.height - 7;
					this.tick();  

					this._circular = BaseBitmap.create("yearcard_discount");
					this._circular.x =goToRechargeBtn.x+goToRechargeBtn.width+10;
					this._circular.y =this._goToRechargeBtn.y -20; 
					this._scrollContiner.addChild(this._circular);
					
					//原价文字 
					let  originalPriceText= ComponentManager.getTextField(LanguageManager.getlocal("originalPriceTitle"), TextFieldConst.FONTSIZE_BUTTON_COMMON);
					originalPriceText.x = this._circular.x + this._circular.width/2 - originalPriceText.width/2;
					originalPriceText.y = this._circular.y+15;
					this._scrollContiner.addChild(originalPriceText); 
					this._originalPriceText = originalPriceText;
 				
				 	//原价价格
					this._newPriceText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON);
					this._newPriceText.text = App.CommonUtil.getMoneyString(g8Cost),false
					this._newPriceText.x = this._circular.x + this._circular.width/2 - this._newPriceText.width/2;
					this._newPriceText.y = this._circular.y+40;
					this._newPriceText.bold = true;
					this._newPriceText.italic =true;
					this._scrollContiner.addChild(this._newPriceText); 

					//打折斜线
					this._btnLine= BaseBitmap.create("yearcard_line");
					this._btnLine.setPosition(this._circular.x-5,this._circular.y+30);
					this._scrollContiner.addChild(this._btnLine); 
				}
				else
				{
					this._openDialogDiscountEnabled = false;
					if(rechargeItemCfg)
					{
						let str = App.CommonUtil.getMoneyString(g8Cost);
						goToRechargeBtn.setText(str,false);
					}
					
				}
			}
		}

		let downBottomDes:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("newYearDesc1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		downBottomDes.x = bottomBg.x + bottomBg.width/2 - downBottomDes.width/2;
		downBottomDes.y = bottomBg.y+135;
		this._scrollContiner.addChild(downBottomDes); 
		
		let downBottomDes2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("newYearDesc2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		downBottomDes2.x = bottomBg.x + bottomBg.width/2 - downBottomDes2.width/2;
		downBottomDes2.y = downBottomDes.y+downBottomDes.height+6;
		this._scrollContiner.addChild(downBottomDes2); 
				
		let boxImage = BaseBitmap.create("public_9v_bg03");
		boxImage.width = 490;
		boxImage.height = GameConfig.stageHeigth - 65;
		boxImage.x = 0;
		boxImage.y = 0;
		this.addChild(boxImage);
	}

	public creatCellByIndex(indexNum:number)
	{
		let x = 0;
		let y = 250;
		let nameStr = ""
		let descStr = ""
		if(PlatformManager.checkIsWxCfg())
		{
			this._strWx = "_wxType";
		}
		else
		{
			this._strWx = "";
		}
		let privilege_Img = "privilege_icon"+indexNum
		if(indexNum == 1)
		{
			//元宝特权
			let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g8");
			if(!cfg){
				cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g11");
			}
			nameStr = LanguageManager.getlocal("yearCardPrivilege1name");
			descStr = LanguageManager.getlocal("monthCardPrivilege1desc",[""+(cfg.gemCost),""+(cfg.dayGet)]);
		}else if(indexNum == 2)
		{
			//太学席位
			nameStr = LanguageManager.getlocal("monthCardPrivilege2name");
			descStr = LanguageManager.getlocal("monthCardPrivilege2desc");
			y = 250+149;
		}else if(indexNum == 3)
		{
			//特权解锁1
			y = 250+298;
			nameStr = LanguageManager.getlocal("monthCardPrivilege3name");
			descStr = LanguageManager.getlocal("monthCardPrivilege3desc"+this._strWx);
			if(PlatformManager.checkIsWxCfg())
			{
				privilege_Img = "privilege_icon4"
			}
			
			
		}
		else if(indexNum == 4)
		{
			//特权解锁1
			y = 250+298+149;
			nameStr = LanguageManager.getlocal("monthCardPrivilege4name");
			descStr = LanguageManager.getlocal("monthCardPrivilege4desc"+this._strWx);
			// if(PlatformManager.checkIsWxCfg())
			// {
			// 	privilege_Img = "privilege_icon5"
			// }
			privilege_Img = "privilege_icon5"
			
		}

		let cell_bg = BaseBitmap.create("yearcard_cell_bg");
		cell_bg.x = x;
		cell_bg.y = y;
		this._scrollContiner.addChild(cell_bg);  

		let privilege_icon = BaseBitmap.create(privilege_Img);
		privilege_icon.x = 20;
		privilege_icon.y = cell_bg.y;
		this._scrollContiner.addChild(privilege_icon);  

		let cell_namebg = BaseBitmap.create("monthcard_cell_namebg");
		cell_namebg.x = privilege_icon.x+privilege_icon.width/2-cell_namebg.width/2;
		cell_namebg.y = privilege_icon.y+privilege_icon.height-10;
		this._scrollContiner.addChild(cell_namebg); 

		let nameText:BaseTextField = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WHITE);
		nameText.x = cell_namebg.x+ cell_namebg.width/2 - nameText.width/2;
		nameText.y = cell_namebg.y+cell_namebg.height/2-nameText.height/2;;
		this._scrollContiner.addChild(nameText);
		
		let descText:BaseTextField = ComponentManager.getTextField(descStr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WHITE);
		descText.x = cell_bg.x+ 205;
		descText.y = cell_bg.y+45;;
		descText.lineSpacing = 5;
		this._scrollContiner.addChild(descText);

	}


	public tick(): void {
		let needRefresh = false;
		let acDiscountVo = Api.acVoApi.checkIsYearCardDiscount();
		if (acDiscountVo) {
			if (!this._openDialogDiscountEnabled) {
				needRefresh = true;
			}
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard()&&this._acTimeTF != null)
			{
				let timeStr =App.DateUtil.getFormatBySecond( acDiscountVo.et - GameData.serverTime,1);
				this._acTimeTF.text = LanguageManager.getlocal("newYearTime",[timeStr]);
			}
		} else 
		{
			if(this._acTimeTF!=null)
			{
				this._acTimeTF.setVisible(false);
			} 
			if (this._openDialogDiscountEnabled) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEndViewRefreshed"));
				this._openDialogDiscountEnabled = false;
				let rechargeItemCurrentCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g8");
				if(!rechargeItemCurrentCfg){
					rechargeItemCurrentCfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g11");
				}
				this._goToRechargeBtn.setText(LanguageManager.getlocal("anyMoney",[rechargeItemCurrentCfg.cost.toString()]),false);
				needRefresh = true;
			}
		}
		if(!Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			if (needRefresh) {
			// 刷新界面
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_YEARCARD_VIEW);	
			}
		}

		if(PlatformManager.checkIsJPSp()&&this._acTimeTF)
		{
			this._acTimeTF.visible =false;
		}
		
	}
	public showText():void
	{
		//年卡有效期
		let cardTimedeTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("lifecarTimeddes"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._scrollContiner.addChild(cardTimedeTxt);
		this.setLayoutPosition(LayoutConst.horizontalCenter,cardTimedeTxt,this.bottomBg,[0,0]);
	 	cardTimedeTxt.y = this._offsetY + 55 - cardTimedeTxt.height - 7;
	}

	private useCallback(event:egret.Event=null):void
	{
		
		let isBuy = Api.shopVoApi.ifBuyYearCard();
		if(isBuy)
		{ 
			this._goToRechargeBtn.visible = false;
			let hasGetSp = BaseBitmap.create("public_buy");
			hasGetSp.x = this._goToRechargeBtn.x + this._goToRechargeBtn.width/2 - hasGetSp.width/2;//-10;
			hasGetSp.y = this._goToRechargeBtn.y + this._goToRechargeBtn.height/2 - hasGetSp.height/2;
			this._scrollContiner.addChild(hasGetSp);
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
			{
			

				if(this._acTimeTF)
				{
					this._acTimeTF.setVisible(false);
				}
				if(this._circular)
				{
					this._scrollContiner.removeChild(this._circular);
					// this.removeChild(this._circular);
				}
				// if(this._oldPriceText)
				// {
				// 	this.removeChild(this._oldPriceText);
				// }
				// if(this._yearcard_line)
				// {
				// 	this.removeChild(this._yearcard_line);
				// }
				if(this._newPriceText)
				{
					this._newPriceText.setVisible(false);
				}
				if(this._btnLine)
				{
					this._btnLine.visible = false;
				}
				if(this._originalPriceText)
				{
					this._originalPriceText.visible =false; 
				}
				this.showText(); 
			}
			

			App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
			App.CommonUtil.showTip(LanguageManager.getlocal("sysBuySuccessDesc",[LanguageManager.getlocal("yearCard")]));
		}
	}


	private goToRechargeHandler():void
	{
		if ((! this._lastClickBuyTime) || (new Date().getTime() - this._lastClickBuyTime > 5000)) {
			this._lastClickBuyTime = new Date().getTime();
			if (this._openDialogDiscountEnabled) {
				PlatformManager.pay("g11");
			} else {
				PlatformManager.pay("g8");
			}
		}
	}

	protected getResourceList():string[]
	{
		 
		return super.getResourceList().concat([
				"yearcard_desc3",
				"yearcard_desc2",
				"unlock_challenge_skip",
				"monthcard_bottom",

				"yearcard_font",
				"yearcard_bg1",
				"yearcard_desc_1",
				"yearcard_desc_2",
				"yearcard_desc_4",
				"monthcard_desc_3",
				"yearcard_bg01",
				"yearcard_line",
				"yearcard_discount",

				"yearcard_banner",
				"yearcard_banner_wxType",
				"yearcard_cell_bg",
				"yearcard_newBg",
				"monthcard_down_bg",
				"monthcard_cell_namebg",
				"privilege_icon1",
				"privilege_icon2",
				"privilege_icon3",
				"privilege_icon4",
				"privilege_icon5"


				]); 
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
		this._goToRechargeBtn = null;
		this._offsetY = 0;
		this._circular=null;
		this._oldPriceText=null;
		this._yearcard_line = null;
		this._strWx  = "";
		this._originalPriceText  =null

		super.dispose();
	}
}