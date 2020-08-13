class WelfareViewSpCard extends WelfareViewTab
{
	private _goToRechargeBtn:BaseButton;
	private _scrollContiner:BaseDisplayObjectContainer=undefined;

	private _offsetY:number = 0;
	private _downBottom:BaseBitmap =null;

	private _newPriceText:BaseTextField = null;
	private _circular:BaseBitmap = null;
	private _btnLine:BaseBitmap = null;
	private _acTimeTF:BaseTextField = null;
	private _wxStr:string = "";
	private _originalPriceText:BaseTextField =null;

	public constructor() 
	{
		super();
	}

	protected init():void
	{ 
		super.init();  

		if(PlatformManager.checkSpCardShow() && !Api.shopVoApi.ifBuySpCard()){
			 App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SHOP_CHECKHMORDER, this.useCallback, this);
			 NetManager.request(NetRequestConst.REQUEST_SHOP_CHECKHMORDER, {});
		}


		this.initNewUi();
		
		
	}
	private refreshUI()
	{
		 App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SHOP_CHECKHMORDER, this.useCallback, this);
	}

	public initNewUi()
	{
		this._scrollContiner = new BaseDisplayObjectContainer();
		this._scrollContiner.y = this.bottomBg.y;
		this._scrollContiner.x = 8;
		this.addChild(this._scrollContiner);

		// let uiBg = BaseBitmap.create("monthcard_newbg");
		// uiBg.x = 0;
		// uiBg.y = 0;
		// this._scrollContiner.addChild(uiBg);  

		let topBanner = BaseBitmap.create("spcard_top_banner");
		topBanner.x = 0;
		topBanner.y = 0;
		this._scrollContiner.addChild(topBanner);  

		// let descTextBg = BaseBitmap.create("public_itemtipbg2");
		// this._scrollContiner.addChild(descTextBg);  

		// let  monthcard_descText= ComponentManager.getTextField(LanguageManager.getlocal("monthcard_desc_top"), TextFieldConst.FONTSIZE_BUTTON_COMMON);
		// monthcard_descText.x = topBanner.x + topBanner.width - monthcard_descText.width-3;
		// monthcard_descText.y = topBanner.y + topBanner.height - monthcard_descText.height-3;
		// this._scrollContiner.addChild(monthcard_descText);
		// descTextBg.width = monthcard_descText.width+8;
		// descTextBg.height = monthcard_descText.height+8;
		// descTextBg.x = monthcard_descText.x + monthcard_descText.width/2 - descTextBg.width/2;
		// descTextBg.y = monthcard_descText.y + monthcard_descText.height/2 - descTextBg.height/2;
		for(var i =1;i<=3;i++)
		{
			this.creatCellByIndex(i);
		}

		let bottomBg = BaseBitmap.create("spcard_down_bg");
		bottomBg.x = 0;
		bottomBg.y = this.bottomBg.height - bottomBg.height;
		this._scrollContiner.addChild(bottomBg);  
		this._offsetY = bottomBg.y;



		let isBuy = Api.shopVoApi.ifBuySpCard();
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
            // spCardBuyBtnText   "anyMoney":"{1}元",
			let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g70");
			if(rechargeItemCfg)
			{
				App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
				let goToRechargeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"",this.goToRechargeHandler,this,null,null,20);
				goToRechargeBtn.x = bottomBg.x + bottomBg.width/2 - goToRechargeBtn.width/2;
				goToRechargeBtn.y = bottomBg.y + 80;
				this._scrollContiner.addChild(goToRechargeBtn); 
				this._goToRechargeBtn = goToRechargeBtn;
				
				let str =LanguageManager.getlocal("spCardBuyBtnText",[rechargeItemCfg.cost.toString()])
                goToRechargeBtn.setText(str,false);
				

                
			}
           
		}

		if(PlatformManager.checkSpCardShow()){
			let csDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("spCardCrossServer"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
			csDesc.x = bottomBg.x + bottomBg.width/2 - csDesc.width/2;
			csDesc.textAlign = egret.HorizontalAlign.CENTER;
			csDesc.y = bottomBg.y + 25;
			csDesc.lineSpacing = 5;
			this._scrollContiner.addChild(csDesc);
		}



		let downBottomDes:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("newSpDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		downBottomDes.x = bottomBg.x + bottomBg.width/2 - downBottomDes.width/2;
		downBottomDes.y = bottomBg.y + 160;
		downBottomDes.textAlign = egret.HorizontalAlign.CENTER;
		this._scrollContiner.addChild(downBottomDes);
				
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
		let y = 218;
		let nameStr = ""
		let descStr = ""
		if(PlatformManager.checkIsWxCfg())
		{
			this._wxStr = "_wxType";
		}
		else
		{
			this._wxStr = "";
		}
		let privilege_Img = "spcard_icon"+indexNum
		if(indexNum == 1)
		{
			//元宝特权
			// let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g7");
			// nameStr = LanguageManager.getlocal("monthCardPrivilege1name");
			descStr = LanguageManager.getlocal("spCardPrivilege1desc");


		}else if(indexNum == 2)
		{
			//太学席位
			// nameStr = LanguageManager.getlocal("monthCardPrivilege2name");
			descStr = LanguageManager.getlocal("spCardPrivilege2desc");
			y = 218+145;
		}
        else if(indexNum == 3)
		{
			//特权解锁1
			y = 218+290;
			// nameStr = LanguageManager.getlocal("monthCardPrivilege3name");
			descStr = LanguageManager.getlocal("spCardPrivilege3desc");
			// if(PlatformManager.checkIsWxCfg())
			// {
			// 	privilege_Img = "privilege_icon4"
			// }
			
			
		}

		let cell_bg = BaseBitmap.create("spcard_cell_bg");
		cell_bg.x = x;
		cell_bg.y = y;
		this._scrollContiner.addChild(cell_bg);  
		if(indexNum == 1)
		{
			let upDetailBtn:BaseButton = ComponentManager.getButton("spcard_descbtn","",this.upDetailBtnHandler,this);
			upDetailBtn.x = cell_bg.x + 421;
			upDetailBtn.y = cell_bg.y + 105;
			this._scrollContiner.addChild(upDetailBtn); 

		}


		let privilege_icon = BaseBitmap.create(privilege_Img);
		privilege_icon.x = 38;
		privilege_icon.y = cell_bg.y + 15; 
		this._scrollContiner.addChild(privilege_icon);  

		// let cell_namebg = BaseBitmap.create("monthcard_cell_namebg");
		// cell_namebg.x = privilege_icon.x+privilege_icon.width/2-cell_namebg.width/2;
		// cell_namebg.y = privilege_icon.y+privilege_icon.height-10;
		// this._scrollContiner.addChild(cell_namebg); 

		// let nameText:BaseTextField = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WHITE);
		// nameText.x = cell_namebg.x+ cell_namebg.width/2 - nameText.width/2;
		// nameText.y = cell_namebg.y+cell_namebg.height/2-nameText.height/2;;
		// this._scrollContiner.addChild(nameText);
		
		let descText:BaseTextField = ComponentManager.getTextField(descStr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BLACK);
		descText.x = cell_bg.x+ 225;
		descText.y = cell_bg.y+45;;
		descText.lineSpacing = 5;
		this._scrollContiner.addChild(descText);

	}

	public showText():void
	{
		//月卡有效期
		let str = App.DateUtil.getFormatBySecond(Api.shopVoApi.getSpcardet(),6);
		let cardTimedeTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("cardTimedes",[str]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
	 
		cardTimedeTxt.name ="1";
		this._scrollContiner.addChild(cardTimedeTxt);
		this.setLayoutPosition(LayoutConst.horizontalCenter,cardTimedeTxt,this.bottomBg,[0,0]);
		cardTimedeTxt.y = this._offsetY + 55 - cardTimedeTxt.height - 7 + 105;
	 
	}

	private useCallback(event:egret.Event=null):void
	{
		
		let isBuy = Api.shopVoApi.ifBuySpCard();
		if(isBuy)
		{
			if(this._goToRechargeBtn){
				this._goToRechargeBtn.visible = false;
			}
			
			// if(this._acTimeTF)
			// {
			// 	this._acTimeTF.setVisible(false);
			// }
			// if(this._circular)
			// {
			// 	this._circular.setVisible(false);
			// }
			// if(this._btnLine)
			// {
			// 	this._btnLine.setVisible(false);
			// }
			// if(this._newPriceText)
			// {
			// 	this._newPriceText.setVisible(false);
			// }
			// if(this._originalPriceText)
			// {
			// 	this._originalPriceText.visible = false;
			// }
			let hasGetSp = BaseBitmap.create("public_buy");
			hasGetSp.x = this._goToRechargeBtn.x + this._goToRechargeBtn.width/2 - hasGetSp.width/2;
			hasGetSp.y = this._offsetY+55;
			this._scrollContiner.addChild(hasGetSp);
			this.showText();
			App.CommonUtil.showTip(LanguageManager.getlocal("sysBuySuccessDesc",[LanguageManager.getlocal("spCard")]));
			App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
		}
	}
	public tick(): void 
	{
		// let vo = Api.acVoApi.checkIsMonthCardDiscount();
		// if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard()&&vo)
		// {
		// 	if(this._acTimeTF)
		// 	{
		// 		let timeStr = App.DateUtil.getFormatBySecond( vo.et - GameData.serverTime,1);
		// 		this._acTimeTF.text = LanguageManager.getlocal("newYearTime",[timeStr]);
		// 	}
		// }
		// else
		// {
		// 	// if(this._acTimeTF)
		// 	// {
		// 	// 	this._acTimeTF.setVisible(false);
		// 	// }
		// 	// if(this._circular)
		// 	// {
		// 	// 	this._circular.setVisible(false);
		// 	// }
		// 	// if(this._btnLine)
		// 	// {
		// 	// 	this._btnLine.setVisible(false);
		// 	// }
		// 	// if(this._newPriceText)
		// 	// {
		// 	// 	this._newPriceText.setVisible(false);
		// 	// }
		// }
	}

	protected getResourceList():string[]
	{						
		return super.getResourceList().concat([
				// "monthcard_bigicon",
				// "unlock_challenge_skip",
				// "unlock_practice",

				// "monthcard_bg1" ,
				// "monthcard_desc_1",
				// "monthcard_desc_2",
				// "monthcard_desc_3",
				// "monthcard_desc_4",
				// "monthcard_bottom",
				// "yearcard_line",
				// "yearcard_discount",

				// "public_itemtipbg2",
				// "monthcard_cell_bg",
				// "monthcard_cell_namebg",
				// "monthcard_down_bg",
				// "monthcard_newbg",
				// "monthcard_top_banner",
				// "privilege_icon1",
				// "privilege_icon2",
				// "privilege_icon3",
				// "privilege_icon4"
                "spcard_btn_down",
                "spcard_btn",
                "spcard_cell_bg",
                "spcard_descbtn",
                "spcard_down_bg",
                "spcard_icon1",
                "spcard_icon2",
                "spcard_icon3",
                "spcard_top_banner",
                "public_buy",
				]);
 
	}
	private upDetailBtnHandler():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"spCardUpDetailTitle",
			msg:LanguageManager.getlocal("spCardUpDetailContent"),
            handler:this,
            needCancel:false,
        });
	}
	private goToRechargeHandler():void
	{
		// let vo = Api.acVoApi.checkIsMonthCardDiscount()
		// if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard()&&vo)
		// {
		// 	PlatformManager.pay("g35"); 
		// }
		// else
		// {
		// 	PlatformManager.pay("g7"); 
		// }

		// ViewController.getInstance().openView(ViewConst.POPUP.WELFAREVIEWSPCARDDETAILPOPUP);
		if(Api.shopVoApi.ifBuySpCard()){
			return;
		}

		if(PlatformManager.checkSpCardShow()){
			ViewController.getInstance().openView(ViewConst.POPUP.WELFAREVIEWSPCARDDETAILPOPUP);
		} else {
			PlatformManager.pay("g70"); 
		}

		
	}

	public dispose():void
	{	
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SHOP_CHECKHMORDER, this.useCallback, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
		this._goToRechargeBtn = null;
		this._scrollContiner = undefined;
		this._offsetY = 0;
		this._downBottom =null;	

		this._newPriceText = null;
		this._circular = null;
		this._btnLine = null;
		this._acTimeTF = null;
		this._wxStr = ""

		super.dispose();
	}
}