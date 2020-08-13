class AcSingleDayCouponView extends CommonView
{
	// 当前选中的索引
	private _selectedIndex:number = null;
	// 当前选中的itemvo
	private _selectedItemInfoVo:any = null;
	// 道具选中框
	private _selectedBg:BaseBitmap = null;
	// 当前选中道具名称文本
	private _selectedNameTextF:BaseTextField = null;
	// 道具icon
	private _selectedIcon:BaseDisplayObjectContainer = null;
	// 描述文本
	private _selectedDescTextF:BaseTextField = null;
	// 掉落文本
	private _selectedDropTextF:BaseTextField = null;
	// 使用按钮
	private _useBtn:BaseButton = null;
	private _itemInfoVoList:Array<any> = null;
	private _scrollList:ScrollList;
	// 当前选中的item
	private _bottomBg:BaseBitmap;
	private _curItemScrollItem:AcSingleDayCouponItem;
	private _errorTF:BaseTextField = null;
	private _buttomContainer:BaseDisplayObjectContainer;
	private _lastUseNum:number=0;

	public constructor() 
	{
		super();
	}

	protected getListType():number
	{
		return 1;
	}

	protected getRuleInfo():string{
		return '';
	}

	private get cfg() : Config.AcCfg.SingleDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcSingleDayVo{
        return <AcSingleDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.param.data.code}`;
	}

	protected getNetRequestConst():string{
		return NetRequestConst.REQUEST_USE_ITEM;
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
		]);
	}

	

	protected initView():void
	{	
		this._itemInfoVoList = this.vo.getMyRedpt();//Api.itemVoApi.getItemVoListByType(this.getListType());
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
		bg1.height = GameConfig.stageHeigth - 330;
		bg1.name="bg1";
		bg1.y = this.titleBg.height + 5;
		this.addChild(bg1);


		let rect = egret.Rectangle.create();
		rect.setTo(0,0,640 - 30,bg1.height - 30);
		this._scrollList = ComponentManager.getScrollList(AcSingleDayCouponItem,this._itemInfoVoList,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(20,bg1.y + 10);
		this._scrollList.addTouchTap(this.clickItemHandler,this);

		this._errorTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		this._errorTF.width = 400;
		this._errorTF.lineSpacing = 6;
		this._errorTF.textAlign = egret.HorizontalAlign.CENTER;
		
		this._errorTF.x = bg1.x + bg1.width/2 - this._errorTF.width/2;
		this._errorTF.y = bg1.y + bg1.height/2 - this._errorTF.height/2;
		this.addChild(this._errorTF);

		// this.initButtomContainer(bg1);
		// this.noItemTip();
		if(this._selectedItemInfoVo)
		{
			this.initButtomContainer(bg1);
		}
		else
		{
			this.noItemTip();
		}
	}

	private initButtomContainer(bg1:BaseBitmap):void
	{
		this._buttomContainer = new BaseDisplayObjectContainer();
		this._buttomContainer.y = bg1.y + bg1.height + 8;
		this.addChild(this._buttomContainer);


		this._bottomBg = BaseBitmap.create("public_9_bg22");
	
		this._bottomBg.height = GameConfig.stageHeigth - bg1.height - 160;
		this._bottomBg.y = 0;
		this._buttomContainer.addChild(this._bottomBg);

		// this._bg4 = BaseBitmap.create("public_small_titlebg1");
		// this._bg4.y = 0;
		// this._buttomContainer.addChild(this._bg4);
		let line1 = BaseBitmap.create("public_line3");
		line1.width = 480;
		line1.x = GameConfig.stageWidth/2 - line1.width/2;
		line1.y = this._bottomBg.y + 35;

		this._buttomContainer.addChild(line1);

		this._selectedNameTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BLACK);
		
		this._buttomContainer.addChild(this._selectedNameTextF);

		let info = GameData.formatRewardItem(`1002_${this._selectedItemInfoVo.id}_${this._selectedItemInfoVo.num}_${this._selectedItemInfoVo.value}`)[0]
		if(info.iconBg&&info.icon)
		{
			this._selectedIcon = GameData.getItemIcon(info);
			this._selectedIcon.x = 50;
			this._selectedIcon.y = this._bottomBg.y + 78;
			this._buttomContainer.addChild(this._selectedIcon);
			this._selectedIcon.visible = false;
		}
		
		
		



		let bg5:BaseBitmap = BaseBitmap.create("public_9_bg21");
		bg5.y = this._bottomBg.y + 70;
		bg5.x = 180;
		bg5.width = 430;
		bg5.height = 123;
		this._buttomContainer.addChild(bg5);

		this._selectedDescTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._selectedDescTextF.x = bg5.x + 10;
		// this._selectedDescTextF.stroke = 2;
		this._selectedDescTextF.width = bg5.width - 40;
		this._selectedDescTextF.y = bg5.y + 10;
		this._buttomContainer.addChild(this._selectedDescTextF);

		this._selectedDropTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._selectedDropTextF.x = bg5.x + 10;
		// this._selectedDropTextF.stroke = 2;
		this._selectedDropTextF.width = bg5.width - 40;
		this._selectedDropTextF.y = bg5.y + 70;
		this._buttomContainer.addChild(this._selectedDropTextF);

		this._useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"useBtn",this.clickUseBtnHandler,this);
		this._useBtn.x = GameConfig.stageWidth/2 - this._useBtn.width/2;
		this._useBtn.y = GameConfig.stageHeigth - this._useBtn.height - 175;
		this._useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChild(this._useBtn);
		this._useBtn.visible = false;

		this.updateItem(this._selectedIndex);
	}

	private clickItemHandler(event:egret.TouchEvent):void
	{
		let index:number = Number(event.data);
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
		if(index >= this._itemInfoVoList.length ){
			return;
		}
		if(this._selectedIndex == -1)
		{	
			
			if(this._buttomContainer){
				this._buttomContainer.visible = false;
			}
			this.noItemTip();
			if(this._selectedNameTextF){
				this._selectedNameTextF.text = "";
			}
			if(this._selectedDescTextF){
				this._selectedDescTextF.text = "";
			}
			if(this._selectedDropTextF){
				this._selectedDropTextF.text = "";
			}
			if(this._useBtn){
				this._useBtn.visible = false;
			}
			if(this._selectedIcon){
				this._selectedIcon.visible = false;
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
			// this._selectedNumTextF.text = String(info.num);
			return;
		}
		if(this._selectedBg == null)
		{
			this._selectedBg = BaseBitmap.create("itembg_selected");
			// if(!GameData.isUseNewUI)
			// {
			// 	this._selectedBg.x = 4;
			// 	this._selectedBg.y = 4;
			// }
			// else
			// {
				this._selectedBg.x = 1;
				this._selectedBg.y = 1;
			// }
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


		this._curItemScrollItem = <AcSingleDayCouponItem>this._scrollList.getItemByIndex(this._selectedIndex);
		let info = GameData.formatRewardItem(`1002_${this._selectedItemInfoVo.id}_${this._selectedItemInfoVo.num}_${this._selectedItemInfoVo.value}`)[0];
		if(this._curItemScrollItem && !this._curItemScrollItem.contains(this._selectedBg))
		{
			this._curItemScrollItem.addChild(this._selectedBg);
		}
		
		if(this._selectedItemInfoVo&&info.name)
		{
			this._selectedNameTextF.text = info.name;
			this._selectedDescTextF.text = LanguageManager.getlocal("effectTitle") + info.desc;
			this._selectedDropTextF.text = LanguageManager.getlocal("dropTitle") + info.dropDesc;
			this._selectedDropTextF.y = this._selectedDescTextF.y + this._selectedDescTextF.height + 10;
			this._useBtn.visible = false
		}
	
		if(this._selectedItemInfoVo&&info.iconBg)
		{
			let x = this._selectedIcon.x;
			let y = this._selectedIcon.y;
			this._buttomContainer.removeChild(this._selectedIcon);
			this._selectedIcon = null;
			this._selectedIcon = GameData.getItemIcon(info);
			this._selectedIcon.x = x;
			this._selectedIcon.y = y;
			this._buttomContainer.addChild(this._selectedIcon);
			this._selectedIcon.visible = true;
		}
		this._selectedNameTextF.x = this._bottomBg.width/2 - this._selectedNameTextF.width/2;
		this._selectedNameTextF.y = this._bottomBg.y + 30;

	}

	// 点击使用按钮
	private clickUseBtnHandler(param:any):void
	{
		let num:number = 1;
		
	}

	protected changeImgNotify(){
		this.updateItem(this._selectedIndex,true);
		if(this._selectedItemInfoVo &&this._selectedItemInfoVo.num > 0)
		{
			if(this._curItemScrollItem){
				this._curItemScrollItem.update();
			}
		}
	}

	// 暂无道具
	private noItemTip():void{
		
		if(this._itemInfoVoList.length <= 0)
		{
		
			this._errorTF.text = LanguageManager.getlocal("acSingleDayNoRed-1");
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

		if(this._selectedIcon)
		{
			this._buttomContainer.removeChild(this._selectedIcon);
			this._selectedIcon = null;
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
		super.dispose();
	}
}