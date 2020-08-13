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
	private _curItemScrollItem:AcSingleDayCouponItem;
	private _errorTF:BaseTextField = null;
	private _bottomBgLeft:BaseBitmap;
	private _bottomBgRight:BaseBitmap;
	private _buttomContainer:BaseDisplayObjectContainer;
	private _lastUseNum:number=0;
	private _border: BaseBitmap;
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
            "itemview_daoju_bg01","itemview_daoju_bg02","itemview_daoju_bg03","itembg_0"
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
		

		let bottom = BaseBitmap.create("public_daoju_bg01");
		bottom.x = GameConfig.stageWidth/2 - bottom.width/2;
		bottom.y = GameConfig.stageHeigth - bottom.height;   //bg1.height + 228 + 40;
		this.addChild(bottom);

		let dotbg = BaseBitmap.create("itemview_daoju_bg03");
		dotbg.x = GameConfig.stageWidth / 2 - dotbg.width/2;
		dotbg.y = GameConfig.stageHeigth - bottom.height - dotbg.height;
		this.addChild(dotbg);

		let flower = BaseBitmap.create("public_daoju_bg02");
		flower.x = GameConfig.stageWidth - flower.width;
		flower.y  = GameConfig.stageHeigth - bottom.height - dotbg.height;
		this.addChild(flower);


		let bg1:BaseBitmap = BaseBitmap.create("public_9v_bg02");//
		// bg1.y = 5;
		bg1.width = GameConfig.stageWidth;
		// bg1.x = 10;
		bg1.height = GameConfig.stageHeigth - bottom.height - dotbg.height -228 - this.titleBg.height;//_bottomBgLeft.height ->228
		bg1.name="bg1";
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg1, this.titleBg, [0,this.titleBg.height]);
		this.addChild(bg1);

		this._border = BaseBitmap.create("public_9v_bg03");
		this._border.width = GameConfig.stageWidth;
		this._border.height = bg1.height;
		this._border.y = bg1.y;
		this.addChild(this._border);
		

	 
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,640 - 30,bg1.height - 30);


		//添加空数据
		let blankMaxNum = 0;
		let blankList = [];
		let emptyItemInfoVo = null;
		if(this._itemInfoVoList.length <= 0){
			blankMaxNum = 0 ;
		} else 
		{
			blankMaxNum = 25;

		}


		if (this._itemInfoVoList.length <= blankMaxNum){
			for(let i  = this._itemInfoVoList.length; i < blankMaxNum; i ++){
				emptyItemInfoVo = new ItemInfoVo();
				emptyItemInfoVo.id = -1;
				blankList.push(emptyItemInfoVo);
			}
		} else {
			let maxLength = Math.ceil(this._itemInfoVoList.length / 5) * 5
			for(let i = this._itemInfoVoList.length; i < maxLength; i++){
				emptyItemInfoVo = new ItemInfoVo();
				emptyItemInfoVo.id = -1;
				blankList.push(emptyItemInfoVo);	
			}
		}

		this._scrollList = ComponentManager.getScrollList(AcSingleDayCouponItem,this._itemInfoVoList.concat(blankList),rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(20,bg1.y + 10);
		this._scrollList.addTouchTap(this.clickItemHandler,this);


		this._errorTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
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
		this._buttomContainer.y =  bg1.y + bg1.height + 2;
		this.addChild(this._buttomContainer);

		this._bottomBgLeft = BaseBitmap.create("itemview_daoju_bg01");
		this._bottomBgLeft.x = 0;
		this._bottomBgLeft.y = 0;
		this._buttomContainer.addChild(this._bottomBgLeft);

		this._bottomBgRight = BaseBitmap.create("itemview_daoju_bg01");
		this._bottomBgRight.scaleX = -1;
		this._bottomBgRight.x = GameConfig.stageWidth;
		this._bottomBgRight.y = 0;
		this._buttomContainer.addChild(this._bottomBgRight);


		let line1 = BaseBitmap.create("public_v_huawen01");
		line1.x = 150 ;
		line1.y = this._bottomBgLeft.y + 30;
		this._buttomContainer.addChild(line1);

		let line2 = BaseBitmap.create("public_v_huawen01");
		line2.scaleX = -1;
		line2.x = 628;
		line2.y = line1.y;
		this._buttomContainer.addChild(line2);

		if(PlatformManager.checkIsViSp()){
			this._selectedNameTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);

		} else {
			this._selectedNameTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);

		}
		
		this._buttomContainer.addChild(this._selectedNameTextF);

		let bg5:BaseBitmap = BaseBitmap.create("public_9v_bg09");
		bg5.x = 90;
		bg5.y = this._bottomBgLeft.y + 55; //65
		
		bg5.width = 500;
		bg5.height = 133;
		this._buttomContainer.addChild(bg5);

		let itemBg = BaseBitmap.create("itemview_daoju_bg02");
		itemBg.x =20;
		itemBg.y = this._bottomBgLeft.height/2 - itemBg.height / 2;
		this._buttomContainer.addChild(itemBg);

		let info = GameData.formatRewardItem(`25_${this._selectedItemInfoVo.id}_${this._selectedItemInfoVo.num}_${this._selectedItemInfoVo.value}`)[0]
		if(this._selectedItemInfoVo&&info.iconBg&&info.icon)
		{
			this._selectedIcon = GameData.getItemIcon(info);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,this._selectedIcon,itemBg);
			// this._selectedIcon.x = itemBg.x + itemBg.width/2 - 106;
			// this._selectedIcon.y = itemBg.y + itemBg.height/2 - 106;
			// this._selectedIcon.x = 50;
			// this._selectedIcon.y = this._bottomBgLeft.height / 2 - this._selectedIconBg.width / 2;
			this._buttomContainer.addChild(this._selectedIcon);
			this._selectedIcon.visible = false;
		}

		if(PlatformManager.checkIsViSp()){
			this._selectedDescTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN);

		} else {
			this._selectedDescTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);

		}
		this._selectedDescTextF.x = 245;//bg5.x + 50;
		// this._selectedDescTextF.stroke = 2;
		this._selectedDescTextF.width = 340;
		this._selectedDescTextF.y = bg5.y + 30;
		this._buttomContainer.addChild(this._selectedDescTextF);

		if(PlatformManager.checkIsViSp())
		{
			this._selectedDropTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN);

		} else {
			this._selectedDropTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);

		}
		this._selectedDropTextF.x = 245;
		// this._selectedDropTextF.stroke = 2;
		this._selectedDropTextF.width = 340;
		this._selectedDropTextF.y = this._selectedDescTextF.y + this._selectedDescTextF.height + 10;// bg5.y + 65;
		this._buttomContainer.addChild(this._selectedDropTextF);

		this._useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"useBtn",this.clickUseBtnHandler,this);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._useBtn, this, [0,10]);
	
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
				this._selectedBg.x = -3;
				this._selectedBg.y = -3;
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
		let info = GameData.formatRewardItem(`25_${this._selectedItemInfoVo.id}_${this._selectedItemInfoVo.num}_${this._selectedItemInfoVo.value}`)[0];
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
			// this._selectedIcon.texture = BaseLoadBitmap.create(this._selectedItemInfoVo.icon).texture;
		}
		this._selectedNameTextF.x = GameConfig.stageWidth / 2 - this._selectedNameTextF.width/2 + 70;
		this._selectedNameTextF.y = this._bottomBgLeft.y + 28;

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
			this._border.height = GameConfig.stageHeigth - 89 - 69 - 8;
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
		this._border = null;
		super.dispose();
	}
}