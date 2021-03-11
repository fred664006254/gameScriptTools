class ItemViewTab1 extends CommonViewTab
{
	// 当前选中的索引
	private _selectedIndex:number = null;
	// 当前选中的itemvo
	private _selectedItemInfoVo:ItemInfoVo = null;
	// 道具选中框
	private _selectedBg:BaseBitmap = null;
	// 当前选中道具名称文本
	private _selectedNameTextF:BaseTextField = null;
	// 数量文本
	private _selectedNumTextF:BaseTextField = null;
	// 道具icon
	private _selectedIcon:BaseLoadBitmap = null;
	private _selectedNode:BaseDisplayObjectContainer = null;
	// 道具iconbg
	private _selectedIconBg:BaseBitmap = null;
	// 描述文本
	private _selectedDescTextF:BaseTextField = null;
	// 掉落文本
	private _selectedDropTextF:BaseTextField = null;
	// 使用按钮
	private _useBtn:BaseButton = null;
	// 合成按钮
	private _hechengBtn:BaseButton = null;
	// 没有按钮时的说明文字
	private _noButtonText:BaseTextField = null;
	private _itemInfoVoList:Array<ItemInfoVo> = null;
	private _scrollList:ScrollList;
	// 当前选中的item
	private _curItemScrollItem:ItemScrollItem;
	private _errorTF:BaseTextField = null;
	private _bottomBg:BaseBitmap;
	private _buttomContainer:BaseDisplayObjectContainer;
	private _lastUseNum:number=0;
	public constructor() 
	{
		super();
		this.initView();
	}

	protected getListType():number
	{
		return 1;
	}

	protected getNetRequestConst():string
	{
		return NetRequestConst.REQUEST_USE_ITEM;
	}

	protected initView():void
	{	
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ITEM_HECHENG),this.useCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ITEM_CHOOSE),this.useCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(this.getNetRequestConst()),this.useCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_CHANGENAME),this.useCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_CHANGEPIC),this.useCallback,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG,this.changeImgNotify,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND,this.refreshItemsAfterCompound,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WEAPON_UPLEVEL2,this.refreshItemsAfterCompound,this);

		this._itemInfoVoList = Api.itemVoApi.getItemVoListByType(this.getListType());
		if(this._itemInfoVoList.length > 0 &&this._itemInfoVoList[0])
		{
			this._selectedIndex = 0;
			this._selectedItemInfoVo = this._itemInfoVoList[0];
		}
		else
		{
			this._selectedIndex = -1;
		}
		

		let bg1:BaseBitmap = BaseBitmap.create("public_9_bg23");
		// bg1.y = 5;
		bg1.width = GameConfig.stageWidth-20;
		bg1.x = 10;
		bg1.height = GameConfig.stageHeigth - 470;
		bg1.name="bg1";
		this.addChild(bg1);
		bg1.visible = false;

	 
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,640 - 30,bg1.height );
		this._scrollList = ComponentManager.getScrollList(ItemScrollItem,this._itemInfoVoList,rect,1,null,true);
		this.addChild(this._scrollList); 
		this._scrollList.setPosition(20,bg1.y + 10);
		this._scrollList.addTouchTap(this.clickItemHandler,this);
	 

		this._errorTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		this._errorTF.x = bg1.x + bg1.width/2 - this._errorTF.width/2;
		this._errorTF.y = bg1.y + bg1.height/2 - this._errorTF.height/2;
		this.addChild(this._errorTF);

		if(this._selectedItemInfoVo)
		{
			this.initButtomContainer(bg1);
		}
		else
		{
			this.noItemTip();
		}

		if(Api.rookieVoApi.getIsGuiding()){
			Api.rookieVoApi.checkNextStep();
		}
	}

	private initButtomContainer(bg1:BaseBitmap):void
	{
		this._buttomContainer = new BaseDisplayObjectContainer();
		this._buttomContainer.y = bg1.y + bg1.height + 8;
		this.addChild(this._buttomContainer);

		let bar = BaseBitmap.create("commonview_bottom_bar");
		this._buttomContainer.addChild(bar);

		this._bottomBg = BaseBitmap.create("commonview_screen");	
		this._bottomBg.y = bar.height-7;
		this._buttomContainer.addChild(this._bottomBg);


		let line1 = BaseBitmap.create("commonview_smalltitlebg");
		line1.x = GameConfig.stageWidth/2 - line1.width/2;
		line1.y = 30;
		this._buttomContainer.addChild(line1);

		let itembg = BaseBitmap.create("commonview_itembg");
		itembg.setPosition(20,63);
		this._buttomContainer.addChild(itembg);

		let numbg = BaseBitmap.create("public_9_bg80");
		numbg.alpha = 0.6;
		numbg.width = 136;
		numbg.height = 32;
		numbg.setPosition(itembg.x+itembg.width/2-numbg.width/2,itembg.y+163);
		this._buttomContainer.addChild(numbg);

		this._selectedNameTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		
		this._buttomContainer.addChild(this._selectedNameTextF);

		if(this._selectedItemInfoVo.iconBg&&this._selectedItemInfoVo.icon)
		{
			this._selectedIconBg = BaseBitmap.create(this._selectedItemInfoVo.iconBg);
			this._selectedIconBg.x = itembg.x+itembg.width/2-this._selectedIconBg.width/2;
			this._selectedIconBg.y = this._bottomBg.y + 90;
			this._buttomContainer.addChild(this._selectedIconBg);

			this._selectedIcon = BaseLoadBitmap.create(this._selectedItemInfoVo.icon);
			this._selectedIcon.x = this._selectedIconBg.x+5;
			this._selectedIcon.y = this._selectedIconBg.y+3;
			this._buttomContainer.addChild(this._selectedIcon);
			this._selectedIcon.visible = false;
		}
		
		

		this._selectedNumTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._buttomContainer.addChild(this._selectedNumTextF);
		this._selectedNumTextF.x =  numbg.x;
		this._selectedNumTextF.width = numbg.width;
		this._selectedNumTextF.textAlign = egret.HorizontalAlign.CENTER;
		this._selectedNumTextF.y = numbg.y+6;
		

		this._selectedDescTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._selectedDescTextF.x = 222;
		this._selectedDescTextF.width = 382;
		this._selectedDescTextF.y = 78;
		this._selectedDescTextF.lineSpacing = 4;
		this._buttomContainer.addChild(this._selectedDescTextF);

		this._selectedDropTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._selectedDropTextF.x = this._selectedDescTextF.x;
		this._selectedDropTextF.width =this._selectedDescTextF.width;
		this._selectedDropTextF.y = this._selectedDescTextF.y + 77;
		this._selectedDropTextF.lineSpacing = 4;
		this._buttomContainer.addChild(this._selectedDropTextF);


		

		this._useBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW,"useBtn",this.clickUseBtnHandler,this);
		this._useBtn.x = 394 - this._useBtn.width/2;
		this._useBtn.y = GameConfig.stageHeigth - this._useBtn.height - 185;
		this._useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChild(this._useBtn);
		this._useBtn.visible = false;

		this._hechengBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW,"composeBtn",this.clickHechengBtnHandler,this);
		this._hechengBtn.x = this._useBtn.x;
		this._hechengBtn.y = this._useBtn.y;
		this._hechengBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChild(this._hechengBtn);
		this._hechengBtn.visible = false;

		this._noButtonText = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_RED);
		this._noButtonText.width = 380;
		this._noButtonText.lineSpacing = 4;
		this._noButtonText.textAlign = egret.HorizontalAlign.CENTER;
		this._noButtonText.setPosition(394-this._noButtonText.width/2,this._useBtn.y);
		this.addChild(this._noButtonText);
		this.updateItem(this._selectedIndex);
	}

	private clickItemHandler(event:egret.TouchEvent):void
	{
		let index:number = Number(event.data);
		if (!this._itemInfoVoList[index])
		{
			return;
		}
		this.updateItem(index);
		
	}

	// 刷新数据
	/**
	 * 
	 * @param index 
	 * @param ifRefresh 是否需要强制刷新 true，强制刷新
	 */
	private updateItem(index:number,ifRefresh:boolean=false):void
	{	
		
		if(this._selectedIndex == -1)
		{	
			if (this._selectedNode)
			{
				this._selectedNode.dispose();
				this._selectedNode = null;
			}
			if(this._buttomContainer)
			{
				this._buttomContainer.visible = false;
			}
			this.noItemTip();
			if(this._selectedNameTextF)
			{
				this._selectedNameTextF.text = "";
			}
			if(this._selectedNumTextF)
			{
				this._selectedNumTextF.text = "";
			}
			if(this._selectedDescTextF)
			{
				this._selectedDescTextF.text = "";
			}
			if(this._selectedDropTextF)
			{
				this._selectedDropTextF.text = "";
			}
			if(this._useBtn)
			{
				this._useBtn.visible = false;
			}
			if(this._hechengBtn)
			{
				this._hechengBtn.visible = false;
			}
			if(this._selectedIcon)
			{
				this._selectedIcon.visible = false;
			}
			if(this._selectedIconBg)
			{
				this._selectedIconBg.visible = false;
			}
			if (this._noButtonText)
			{
				this._noButtonText.text = "";
			}
			return;
		}
		this._buttomContainer.visible = true;
		
		if(this._selectedIndex && this._selectedIndex == index && this._selectedItemInfoVo && ifRefresh == false)
		{
			if(this._selectedBg)
			{
				if(this._curItemScrollItem && !this._curItemScrollItem.contains(this._selectedBg))
				{
					this._curItemScrollItem.addChild(this._selectedBg);
				}
			}
			this._selectedNumTextF.text = LanguageManager.getlocal("numTitle") + String(this._selectedItemInfoVo.num);
			/**
			 * 蛮王
			 */
			if(this._selectedItemInfoVo.id == 1950 )
			{
				if (Api.servantVoApi.isOwnServantDailyBoss())
				{
					this._useBtn.visible = false;
				}else{
					this._useBtn.visible = true;
				}
			}
			/**
		 	* 周年折扣代金券
		 	*/
			if (this._selectedItemInfoVo.id == 2115){
				if(Api.itemVoApi.isStart(this._selectedItemInfoVo.id)==false){
					this._useBtn.visible = false;
				}
				else{
					this._useBtn.visible = true;
				}
			} 
			return;
		}
		this._noButtonText.text = "";
		if(this._selectedBg == null)
		{
			this._selectedBg = BaseBitmap.create("itembg_selected");
			this._selectedBg.x = 4;
			this._selectedBg.y = 4;
		}
		else
		{
			if(this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg))
			{
				this._curItemScrollItem.removeChild(this._selectedBg);
			}
		}
		
		this._selectedIndex = index;
		this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
		this._curItemScrollItem = <ItemScrollItem>this._scrollList.getItemByIndex(this._selectedIndex);
		if(this._curItemScrollItem && !this._curItemScrollItem.contains(this._selectedBg))
		{
			this._curItemScrollItem.addChild(this._selectedBg);
		}
		
		if(this._selectedItemInfoVo&&this._selectedItemInfoVo.name)
		{
			this._selectedNameTextF.text = this._selectedItemInfoVo.name;
			this._selectedNumTextF.text = LanguageManager.getlocal("numTitle") + String(this._selectedItemInfoVo.num);
			this._selectedDescTextF.text = LanguageManager.getlocal("effectTitle") + this._selectedItemInfoVo.desc;
			this._selectedDropTextF.text = LanguageManager.getlocal("dropTitle") + this._selectedItemInfoVo.dropDesc;
			this._useBtn.visible = this._selectedItemInfoVo.isShowUseBtn;

			this._hechengBtn.setEnable(this._selectedItemInfoVo.isShowHechengBtn);
			this._hechengBtn.visible = this._selectedItemInfoVo.itemCfg.costHeCheng ? true:false;

			
		}
	
		/**
		 * 蛮王
		 */
		if(this._selectedItemInfoVo.id == 1950 )
		{
			if (Api.servantVoApi.isOwnServantDailyBoss())
			{
				this._useBtn.visible = false;
			}else{
				this._useBtn.visible = true;
			}
		}

		/**
		 * 周年折扣代金券
		 */
		if (this._selectedItemInfoVo.id == 2115){
			if(Api.itemVoApi.isStart(this._selectedItemInfoVo.id)==false)
			{
				this._useBtn.visible = false;
			}
			else{
				this._useBtn.visible = true;
			}
		} 
		
		let itemCfg  = Config.ItemCfg.getItemCfgById(this._selectedItemInfoVo.id);
		this._useBtn.setText("useBtn");
		if(itemCfg.getRewards)
		{
			let rewardVo = GameData.formatRewardItem(itemCfg.getRewards)[0]
			// 衣装
			if(rewardVo.type == 19)
			{
				if((Api.servantVoApi.getHaveServantForSerVantSkinId(String(rewardVo.id)))&&Api.switchVoApi.checkIsServantSkinState(String(rewardVo.id)))
				{
					this._useBtn.visible = true;
				}
				else
				{
					this._useBtn.visible = false;

					if(!Api.servantVoApi.getHaveServantForSerVantSkinId(String(rewardVo.id)))
					{	
						let skcfg =  Config.ServantskinCfg.getServantSkinItemById(String(rewardVo.id));
						this._noButtonText.text = LanguageManager.getlocal("newitem_no_servant",[LanguageManager.getlocal("servant_name"+skcfg.servantId)]);
					}
				}
			}
			else if(rewardVo.type == 23) //神器
			{	
				if (Api.switchVoApi.checkWeaponFunction() && !Api.weaponVoApi.haveWeaponById(rewardVo.id) 
				&& Api.servantVoApi.getServantObj(String(Config.ServantweaponCfg.getWeaponItemById(rewardVo.id).servantID))
				&& Config.ServantweaponCfg.lvNeed <= Api.playerVoApi.getPlayerLevel()
				)

				{
					this._useBtn.visible = true;
					this._useBtn.setText("changebg_unlock");
				}
				else
				{
					this._useBtn.visible = false;
					if(Api.playerVoApi.getPlayerLevel() < Config.ServantweaponCfg.lvNeed){
						this._noButtonText.text = LanguageManager.getlocal(`weapon_not_tip`, [Api.playerVoApi.getPlayerOfficeByLevel(Config.ServantweaponCfg.lvNeed)]);
					}
					else if(!Api.servantVoApi.getServantObj(String(rewardVo.id)))
					{	
						this._noButtonText.text = LanguageManager.getlocal("newitem_no_servant",[LanguageManager.getlocal("servant_name"+rewardVo.id)]);
					}
					else if(Api.weaponVoApi.haveWeaponById(rewardVo.id) )
					{	
						this._noButtonText.text = LanguageManager.getlocal("newitem_had_weapon");
					}

				}
			}
			else if(itemCfg.target == 7)//门客书籍等级
			{	
				let obj = Api.servantVoApi.getServantObj(String(itemCfg.targetId));
				if (!obj)
				{
					this._useBtn.visible = false;
					this._noButtonText.text = LanguageManager.getlocal("newitem_no_servant",[LanguageManager.getlocal("servant_name"+itemCfg.targetId)]);
				}
				else
				{
					if (rewardVo.type == 31)
					{
						let arry = itemCfg.getRewards.split("_");
						if (obj.getBookCanLevelUpNum(arry[1])<=0)
						{
							this._useBtn.visible = false;
							this._noButtonText.text = LanguageManager.getlocal("newitem_book_lv_max",[LanguageManager.getlocal("servant_name"+itemCfg.targetId),itemCfg.name]);
						}
					}
				}
				
			}
			else if(itemCfg.target == 8)//红颜亲密/魅力
			{
				if (!Api.wifeVoApi.getWifeInfoVoById(rewardVo.id))
				{
					this._useBtn.visible = false;
					this._noButtonText.text = LanguageManager.getlocal("newitem_no_servant",[LanguageManager.getlocal("wifeName_"+rewardVo.id)]);
				}
			}
		}

		if (this._selectedNode)
		{
			this._selectedNode.dispose();
			this._selectedNode = null;
			this._selectedIcon.setload("");
		}

		this._selectedIconBg.visible = true;
		if(this._selectedItemInfoVo&&this._selectedItemInfoVo.iconBg)
		{
			this._selectedIconBg.texture = ResourceManager.getRes(this._selectedItemInfoVo.iconBg);
			this._selectedIcon.visible = true;
			// this._selectedIcon.texture = BaseLoadBitmap.create(this._selectedItemInfoVo.icon).texture;
			this._selectedIcon.setload(this._selectedItemInfoVo.icon);
			this._selectedIcon.setScale(1);
			this._selectedNode = new BaseDisplayObjectContainer();
			this._buttomContainer.addChild(this._selectedNode);
			this._selectedNode.setPosition(this._selectedIconBg.x+1,this._selectedIconBg.y);
			let itemVo = this._selectedItemInfoVo;
			let icon = this._selectedIcon;
			if (itemVo.target == 7)
			{	
				
				let picstr = "servant_half_"+itemVo.targetId;
				let rect = new egret.Rectangle();
				rect.setTo(0,0,100,100);
				icon.setload(picstr,rect);
				// icon.y = this._bottomBg.y + 96;

				let arry = itemVo.getRewards.split("_");
				let abcfg = GameConfig.config.abilityCfg[arry[1]];
				let framepic = "itemframe"+arry[0]+"_"+abcfg.type;
				let framebg = BaseLoadBitmap.create(framepic);
				this._selectedNode.addChild(framebg);

				let star = BaseLoadBitmap.create("servant_star");
				star.setPosition(3,77);
				this._selectedNode.addChild(star);

				let starnum = ComponentManager.getBitmapText(String(abcfg.num),"tip_fnt");
				starnum.setPosition(star.x+27,star.y);
				this._selectedNode.addChild(starnum);
			}
			else if (itemVo.target == 8)
			{
				let arry = itemVo.getRewards.split("_");
				let picstr = "wife_half_"+arry[1];
				let rect = new egret.Rectangle();
				rect.setTo(0,0,100,100);
				icon.setload(picstr,rect);
				// icon.y = this._bottomBg.y + 98;

				let framepic = "itemframe"+arry[0];
				let framebg = BaseLoadBitmap.create(framepic);

				this._selectedNode.addChild(framebg);
			}
		}
		
		this._selectedNameTextF.x = this._bottomBg.width/2 - this._selectedNameTextF.width/2;
		this._selectedNameTextF.y = this._bottomBg.y + 26;
	}

	// 点击合成按钮
	private clickHechengBtnHandler(param:any):void
	{
		if(this._selectedItemInfoVo)
		{
			if (this._selectedItemInfoVo.costHecheng > this._selectedItemInfoVo.num)
			{	
				App.CommonUtil.showTip(LanguageManager.getlocal("hechengItemNotEnough"));
				return ;
			}
			if (this._selectedItemInfoVo.num >= this._selectedItemInfoVo.costHecheng*5)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMHECHENGPOPUPVIEW,{
								itemId:this._selectedItemInfoVo.id,
				});
			}
			else
			{
				NetManager.request(NetRequestConst.REQUEST_ITEM_HECHENG,{itemId:this._selectedItemInfoVo.id});
			}
		}
	}

	// 点击使用按钮
	private clickUseBtnHandler(param:any):void
	{
		let num:number = 1;
		if(this._selectedItemInfoVo)
		{
			let data;
			let itemId = this._selectedItemInfoVo.id; 
		
			/**
			 * 特殊道具 
			 */
			if(itemId == 1021 || itemId == 1029 || itemId == 1361 || itemId == 1362 ||itemId==2103 ||itemId==2104||itemId==2105||itemId==2106)
			{
				if( (itemId == 1361 || itemId == 1362) && Api.wifeVoApi.getWifeNum() == 0 )
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("itemUse_noWifeTip"));
					return;
				}
				//春季送礼活动特殊道具
				if(itemId==2103||itemId==2104||itemId==2105||itemId==2106)
				{  
					//过期 
				 	if(Api.itemVoApi.isEnd(itemId)==true)
					{
						App.CommonUtil.showTip(LanguageManager.getlocal("acspringTouchdes2"));
						return;
					}

					if(Api.itemVoApi.isStart(itemId)==false)
					{
						App.CommonUtil.showTip(LanguageManager.getlocal("acspringTouchdes"));
						return;
					}
				}

				if(this._selectedItemInfoVo.num >= ItemView.MAX_NUM)
				{
					ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:this._selectedItemInfoVo.id,callback:this.sendRequest,handler:this});
				}
				else
				{
					this.sendRequest(num,this._selectedItemInfoVo.id);
				}
				return ;
			}

			if(itemId == 1952){
				ViewController.getInstance().openView(ViewConst.POPUP.CHOOSESERVANTVIEW);
				return;
			}
			//不批量使用
			let canBatch  = true;
			let itemCfg  = Config.ItemCfg.getItemCfgById(this._selectedItemInfoVo.id);
			if(itemCfg && itemCfg.getRewards)
			{
				let rewardVo = GameData.formatRewardItem(itemCfg.getRewards)[0]
				if(rewardVo.type == 23)
				{
					canBatch = false;
				}
			}
			if (GameData.isInArray(this._selectedItemInfoVo.id,[1251,1252,1253]))
			{
				canBatch = false;
				if (!Api.switchVoApi.checkOpenExile())
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("exileCard_notopen2"));
					return;
				}
				if (Api.servantVoApi.getServantCount() < Config.ExileCfg.numNeed)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("exileCard_notopen", [String(Config.ExileCfg.numNeed)]));
					return;
				}
				
				if (Api.servantExileVoApi.getCardSeatNumber()>= Config.ExileCfg.maxPos)
				{	
					App.CommonUtil.showTip(LanguageManager.getlocal("exileCard_seatMax"));
					return;
				}

				let days={1251:7,1252:15,1253:30};
				let day = days[this._selectedItemInfoVo.id];
				let useSeat = Api.servantExileVoApi.getCardSeatNumber();
				let totalSeat = Config.ExileCfg.maxPos;
				let tipstr = LanguageManager.getlocal("exileBuff_use_tip",[String(day),String(useSeat),String(totalSeat)]);

				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"itemUseConstPopupViewTitle",
					msg:tipstr,
					callback:()=>{
						this.sendRequest(1,this._selectedItemInfoVo.id);
					},
					handler:this,
					needCancel:true
				});			
			}

			else if((this._selectedItemInfoVo instanceof ItemInfoVo) && this._selectedItemInfoVo.target == 2)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW,{type:ServantSelectedPopupView.TYPE_USE_ITEM,"itemId":this._selectedItemInfoVo.id,callback:this.sendRequest,handler:this});
				// todo 使用门客道具
				// let servantId:number = 
				// data = {"itemId":this._selectedItemInfoVo.id,"itemNum":num,"servantId":servantId};
			}
			else if((this._selectedItemInfoVo instanceof ItemInfoVo) && this._selectedItemInfoVo.target == 6)
			{	
				// if (this._selectedItemInfoVo.id == 1359 && !Api.wifeVoApi.hasNotSkillLevelMaxWife())
				// {	
				// 	App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillLevelAllMax"));
				// 	return;
				// }
				ViewController.getInstance().openView(ViewConst.POPUP.WIFESELECTEDPOPUPVIEW,{type:WifeSelectedPopupView.TYPE_USE_ITEM,"itemId":this._selectedItemInfoVo.id,callback:this.sendRequest,handler:this});
				// todo 使用门客道具
				// let servantId:number = 
				// data = {"itemId":this._selectedItemInfoVo.id,"itemNum":num,"servantId":servantId};
			}
			else if(this._selectedItemInfoVo.id == 1902){
				//改形象
				 ViewController.getInstance().openView(ViewConst.COMMON.CHOOSEROLEVIEW,{changeImg:true,callBack:this.sendRequest,obj:this});
			}
			else if((this._selectedItemInfoVo instanceof ItemInfoVo) && this._selectedItemInfoVo.id == 1901)
			{
				//改名卡
				ViewController.getInstance().openView(ViewConst.POPUP.USERNAMEPOPUPVIEW)
			}
			else if((this._selectedItemInfoVo instanceof ItemInfoVo) && this._selectedItemInfoVo.itemCfg.servantSkinID)
			{
				//门客皮肤
				let skinId = this._selectedItemInfoVo.itemCfg.servantSkinID;
				let skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
				let servant:ServantInfoVo = Api.servantVoApi.getServantObj(skincfg.servantId);
				let skinvo : ServantSkinVo = null;
				if (servant.skin)
				{
					skinvo = servant.skin[Number(skinId)];
				}
				if (!skinvo || skinvo.hasBookCanGet())
				{
					ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECHOOSEBOOKPOPUPVIEW,{skinId:skinId,itemid:this._selectedItemInfoVo.id});
				}
				else
				{
					NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE,{itemId:this._selectedItemInfoVo.id});
				}
				return;
			}
			else if ((this._selectedItemInfoVo instanceof ItemInfoVo && this._selectedItemInfoVo.itemCfg.chooseRewards)){
				ViewController.getInstance().openView(ViewConst.POPUP.CHOOSESERVANTVIEW, {itemId: itemId});
			}
			else
			{
				if(itemId >= 1013 && itemId <= 1017){
					let bookroomCfg = GameConfig.config.bookroomCfg;
					let booknum = bookroomCfg.temporaryMax - Api.bookroomVoApi.geItemNum;
					if(booknum <= 0){
						App.CommonUtil.showTip(LanguageManager.getlocal(`bookRoom_useSeatTip1`, [Api.bookroomVoApi.geItemNum.toString(),bookroomCfg.temporaryMax.toString()]));
						return;
					}
					else{
						let obj = {
							1013 : 1,
							1014 : 3,
							1015 : 7,
							1016 : 15,
							1017 : 30
						}
						if(canBatch && this._selectedItemInfoVo.num >= ItemView.MAX_NUM && this._selectedItemInfoVo.id != 1950)
						{
							ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{
								itemId:this._selectedItemInfoVo.id,
								callback:(selnum,selid)=>{
									ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
										title:"itemUseConstPopupViewTitle",
										msg:LanguageManager.getlocal("bookRoom_useSeatTip2", [selnum,obj[itemId],Api.bookroomVoApi.geItemNum.toString(),bookroomCfg.temporaryMax.toString()]),
										callback:()=>{
											this.sendRequest(selnum,selid);
										},
										handler:this,
										needCancel:true
									});	
								},
								handler:this});
						}
						else
						{
							ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
								title:"itemUseConstPopupViewTitle",
								msg:LanguageManager.getlocal("bookRoom_useSeatTip2", [`1`,obj[itemId],Api.bookroomVoApi.geItemNum.toString(),bookroomCfg.temporaryMax.toString()]),
								callback:()=>{
									this.sendRequest(1,this._selectedItemInfoVo.id);
								},
								handler:this,
								needCancel:true
							});							
						}	
					}
				}
				else{
					if(canBatch && this._selectedItemInfoVo.num >= ItemView.MAX_NUM && this._selectedItemInfoVo.id != 1950)
					{
						ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:this._selectedItemInfoVo.id,callback:this.sendRequest,handler:this});
					}
					else
					{
						this.sendRequest(num,this._selectedItemInfoVo.id);
					}
				}
			}
		}
	}
	protected changeImgNotify()
	{
		this.updateItem(this._selectedIndex,true);
		if(this._selectedItemInfoVo&&this._selectedItemInfoVo.num > 0)
		{
			if(this._curItemScrollItem)
			{
				this._curItemScrollItem.update();
			}
		}
	}

	//合成后刷新
	private refreshItemsAfterCompound():void
	{	
		let ifRefresh:boolean = false;
		
		if(this._selectedItemInfoVo.num > 0 )
		{
			if(this._curItemScrollItem)
			{
				this._curItemScrollItem.update();
			}
			this._itemInfoVoList = Api.itemVoApi.getItemVoListByType(1);
			if(this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg))
			{
				this._curItemScrollItem.removeChild(this._selectedBg);
			}
			this._scrollList.refreshData(this._itemInfoVoList,1);
			ifRefresh = true;
		}
		else
		{
			ifRefresh = true;
			this._itemInfoVoList = Api.itemVoApi.getItemVoListByType(1);
			if(this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg))
			{
				this._curItemScrollItem.removeChild(this._selectedBg);
			}
			this._scrollList.refreshData(this._itemInfoVoList,1);
			if(this._itemInfoVoList.length > this._selectedIndex)
			{
				this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
			}
			else if(this._selectedIndex > 0 )
			{
				this._selectedIndex -= 1;
				this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
			}
			else
			{
				this._selectedIndex = -1;
				this._selectedItemInfoVo = null;
			}
		}

		this.updateItem(this._selectedIndex,ifRefresh);
}


	// 数据请求
	protected sendRequest(itemNum:number,itemId:number,servantId?:number):void
	{
		this._lastUseNum = itemNum;
		let data = {"itemNum":itemNum,"itemId":itemId};
		if(servantId)
		{
			data["servantId"] = servantId;
		}
		NetManager.request(this.getNetRequestConst(),data);
	}


	// 刷新道具数量
	private useCallback(event:egret.Event):void
	{
		let ifRefresh:boolean = false;
		let isGetItem:boolean = false;
		let itemId = this._selectedItemInfoVo.id;
		if (event && event.data && event.data.ret){
			let rdata = event.data.data.data;
			if(itemId >= 1013 && itemId <= 1017){
				App.CommonUtil.showTip(LanguageManager.getlocal(`bookRoom_useSeatTip3`));
			}
			if(itemId >= 1251 && itemId <= 1253){
				App.CommonUtil.showTip(LanguageManager.getlocal(`exileCard_useSeatTip`));
			}
			if(rdata && rdata.rewards)
			{
				let rewardList = GameData.formatRewardItem(rdata.rewards);
				// let list = [];
				let array = [23,31,32,33,34];
				for(let i = 0;i < rewardList.length;i++)
				{
					let rewardItemVo:RewardItemVo = rewardList[i];
					if (rewardItemVo.type == 6) {
						isGetItem = true;
					}
					
					if (GameData.isInArray(rewardItemVo.type,array)) 
					{	
						ifRefresh= true;
						rewardList.splice(i,1);
					}
				}
				App.CommonUtil.playRewardFlyAction(rewardList);
			}
			if (rdata && rdata.replacerewards && rdata.replacerewards.length > 0) {
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rdata.replacerewards });
			}
		
			/**
			 * 特殊道具
			 */
			if(rdata && rdata.servantArr && (this._selectedItemInfoVo.target == 4))
			{
				ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW,[rdata.servantArr,this._lastUseNum,this._selectedItemInfoVo])
			}
			if(rdata && rdata.wifeArr && this._selectedItemInfoVo.target == 3)
			{
				ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW,[rdata.wifeArr,this._lastUseNum,this._selectedItemInfoVo])
			}

			if(rdata && rdata.rewards && (this._selectedItemInfoVo.target == 7 || this._selectedItemInfoVo.target == 8))
			{	
				let type,sid,str;
				let rewardItemVo:RewardItemVo = GameData.formatRewardItem(rdata.rewards)[0];
				let arry = this._selectedItemInfoVo.getRewards.split("_");
				if (this._selectedItemInfoVo.target ==7)
				{
					type = 1;
					sid = this._selectedItemInfoVo.targetId;
					
					str = LanguageManager.getlocal("newitem_desc31",[LanguageManager.getlocal(`servant_attrNameTxt${arry[1]}`),String(rewardItemVo.num)]);
				}
				else if (this._selectedItemInfoVo.target ==8)
				{	
					type = 2;
					sid  = arry[1];
					str = LanguageManager.getlocal("newitem_desc"+arry[0],[String(rewardItemVo.num)]);
				}
				ViewController.getInstance().openView(ViewConst.BASE.NEWITEMUSESUCCESSVIEW,{
					type:type,
					sid : sid,
					text : 	str
				});
			}
		}
		
		if(this._selectedItemInfoVo.num > 0 && isGetItem==false)
		{
			if(this._curItemScrollItem)
			{
				this._curItemScrollItem.update();
			}
		}
		else
		{
			ifRefresh = true;
			this._itemInfoVoList = Api.itemVoApi.getItemVoListByType(1);
			if(this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg))
			{
				this._curItemScrollItem.removeChild(this._selectedBg);
			}
			this._scrollList.refreshData(this._itemInfoVoList,1);
			if(this._itemInfoVoList.length > this._selectedIndex)
			{
				this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
			}
			else if(this._selectedIndex > 0 )
			{
				this._selectedIndex -= 1;
				this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
			}
			else
			{
				this._selectedIndex = -1;
				this._selectedItemInfoVo = null;
			}
		}

		this.updateItem(this._selectedIndex,ifRefresh);
		if(Api.rookieVoApi.getIsGuiding()){
			Api.rookieVoApi.checkNextStep();
		}
	}

	// 暂无道具
	private noItemTip():void
	{
		if(this._itemInfoVoList.length <= 0)
		{
			this._errorTF.text = LanguageManager.getlocal("itemNotHasDesc");
			this._errorTF.x = GameConfig.stageWidth/2 - this._errorTF.width/2;
			this._errorTF.y =GameConfig.stageHeigth -610;
			if(this.getChildByName("bg1"))
			{
				this.getChildByName("bg1").height=GameConfig.stageHeigth - 170;
			}
		}
		else
		{
			this._errorTF.text = "";
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ITEM_CHOOSE),this.useCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(this.getNetRequestConst()),this.useCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_CHANGENAME),this.useCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_CHANGEPIC),this.useCallback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG,this.changeImgNotify,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND,this.refreshItemsAfterCompound,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ITEM_HECHENG),this.useCallback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WEAPON_UPLEVEL2,this.refreshItemsAfterCompound,this);

		this._selectedIndex = null;
		if(this._selectedItemInfoVo)
		{
			this._selectedItemInfoVo = null;
		}
		if(this._selectedBg)
		{
			if(this._selectedBg.parent && this._selectedBg.parent.contains(this._selectedBg))
			{
				this._selectedBg.parent.removeChild(this._selectedBg);
			}
			BaseBitmap.release(this._selectedBg);
			this._selectedBg = null;
		}
		if(this._selectedNameTextF)
		{
			this._buttomContainer.removeChild(this._selectedNameTextF);
			this._selectedNameTextF.dispose();
			this._selectedNameTextF = null;
		}
		if(this._selectedNumTextF)
		{
			this._buttomContainer.removeChild(this._selectedNumTextF);			
			this._selectedNumTextF.dispose();
			this._selectedNumTextF = null;
		}
		if(this._selectedIcon)
		{
			this._buttomContainer.removeChild(this._selectedIcon);
			BaseBitmap.release(this._selectedIcon);
			this._selectedIcon = null;
		}
		if(this._selectedIconBg)
		{
			this._buttomContainer.removeChild(this._selectedIconBg);
			BaseBitmap.release(this._selectedIconBg);
			this._selectedIconBg = null;
		}
		if(this._selectedDescTextF)
		{
			this._buttomContainer.removeChild(this._selectedDescTextF);
			this._selectedDescTextF.dispose();
			this._selectedDescTextF = null;
		}
		if(this._selectedDropTextF)
		{
			this._buttomContainer.removeChild(this._selectedDropTextF);
			this._selectedDropTextF.dispose();
			this._selectedDropTextF = null;
		}
		if(this._useBtn)
		{
			this.removeChild(this._useBtn);
			this._useBtn.dispose();
			this._useBtn = null;
		}
		if(this._hechengBtn)
		{
			this._hechengBtn.dispose();
			this._hechengBtn = null;
		}
		if(this._curItemScrollItem)
		{
			this._curItemScrollItem = null;
		}
		if(this._scrollList)
		{
			this.removeChild(this._scrollList);
			this._scrollList.dispose();
			this._scrollList = null;
		}
		if(this._errorTF)
		{
			this.removeChild(this._errorTF);
			this._errorTF.dispose();
			this._errorTF = null;
		}
		// if(this._bg4)
		// {
		// 	this._buttomContainer.removeChild(this._bg4);
		// 	this._bg4.dispose();
		// 	this._bg4 = null;
		// }
		if(this._buttomContainer)
		{
			this.removeChild(this._buttomContainer);
			this._buttomContainer.dispose();
			this._buttomContainer = null;
		}
		this._itemInfoVoList = null;
		this._lastUseNum = 0;
		this._selectedNode = null;
		this._noButtonText = null;
		super.dispose();
	}
}