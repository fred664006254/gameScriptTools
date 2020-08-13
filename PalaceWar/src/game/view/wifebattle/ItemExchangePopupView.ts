/**
 * 道具使用弹板
 * author jiangliuyang
 * date 2019/7/1
 * @class ItemExchangePopupView
 */
class ItemExchangePopupView  extends PopupView
{
	private _useCallback:Function;
	private _handler:any;
	private _useNum:number = 1;
	private _selectedNumTF:BaseTextField;
	private _maxNumTF:BaseTextField;
	private _maxNum:number = 0;
	private _numBg:BaseBitmap;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let itemId:number = this.param.data.itemId;
		let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
		this._useCallback = this.param.data.callback;
		this._handler = this.param.data.handler;
		let itemName:string = '';
		let iconPic:string = '';
		let effectDesc:string = '';
		this._maxNum = 0;
		let iconbg = ``;
		let num = 0;
		let descTxt = null;
		this._maxNum = this.param.data.maxNum;
		if(itemInfoVo){
			itemName = itemInfoVo.name;
			iconPic = itemInfoVo.icon;
			effectDesc = itemInfoVo.desc;
			iconbg = itemInfoVo.iconBg;
			num = itemInfoVo.num;
			descTxt = itemInfoVo.getDescTxt(true);
		}
		else{
			let cfg = Config.ItemCfg.getItemCfgById(itemId);
			itemName = cfg.name;
			iconPic = cfg.icon;
			effectDesc = cfg.desc;
			iconbg = cfg.iconBg;
			descTxt = cfg.getDescTxt(true);
		}
	
		if(this._maxNum >100)
		{
			this._maxNum = 100;
		}
		let effectTitle:string = LanguageManager.getlocal("effectTitle");

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 224;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

		let temX = 35+GameData.popupviewOffsetX;
		let temY = 23;
		let temW = 100;
		let temH = 100;

		let itembg:BaseBitmap = BaseBitmap.create(iconbg);
		itembg.x = temX
		itembg.y = temY;
		this.addChildToContainer(itembg);
		
		//点击物品增加文字说明 添加物品iconitem
		let itemCfg : any  = Config.ItemCfg.getItemCfgById(Number(itemId));
		if(!itemCfg){
			itemCfg = GameData.getRewardItemVoByIdAndType(itemId);
		}
		let iconItem = GameData.getItemIcon(itemCfg,true);
		iconItem.x =  temX;
		iconItem.y =  temY;
		this.addChildToContainer(iconItem);

		let numTF:BaseTextField = ComponentManager.getTextField(num.toString(),16);
		let numBg:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
		if (num>99)
		{
			numBg.width = numTF.width+22;
		}
		numBg.name="numBg";
		numBg.setPosition(temX + itembg.width - numBg.width - 4, itembg.y + itembg.height - numBg.height - 4);
		this.addChildToContainer(numBg);

		numTF.x = temX + itembg.width - numTF.width - 12;
		numTF.y = numBg.y + numBg.height/2 - numTF.height/2;
		this.addChildToContainer(numTF);
		
		

		let bg1:BaseBitmap = BaseBitmap.create("public_9_bg1");
		bg1.width = 387;
		bg1.height = temH;
		bg1.x = temX + temW + 10;
		bg1.y = temY;
		this.addChildToContainer(bg1);

		let nameTF:BaseTextField = ComponentManager.getTextField(itemName,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTF.setColor(TextFieldConst.COLOR_LIGHT_RED);
		nameTF.x = bg1.x + 8;
		nameTF.y = bg1.y + 8;
		this.addChildToContainer(nameTF);


		let effectDescTF:BaseTextField = descTxt;
		effectDescTF.x = nameTF.x;
		effectDescTF.y = nameTF.y + nameTF.height + 5;
		effectDescTF.width = 366;
		this.addChildToContainer(effectDescTF);

		let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress2_bg",this._maxNum,this.dragCallback,this);
		dragProgressBar.x = temX + 55;
		dragProgressBar.y = bg1.y + bg1.height + 27;
		this.addChildToContainer(dragProgressBar);

		this._numBg = BaseBitmap.create("public_9_bg5");
		this._numBg.width = 90;
		this._numBg.x = bg.x + bg.width - 10 - this._numBg.width;
		this._numBg.y = bg1.y + bg1.height + 20;
		this.addChildToContainer(this._numBg);

		this._selectedNumTF = ComponentManager.getTextField(this._useNum + "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
		this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
		
		this._selectedNumTF.y = this._numBg.y + this._numBg.height/2 - this._selectedNumTF.height/2;
		this.addChildToContainer(this._selectedNumTF);

		this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
		// this._maxNumTF.x = this._numBg.x + this._numBg.width/2;
		this._maxNumTF.y = this._numBg.y + this._numBg.height/2 - this._maxNumTF.height/2;
		this.addChildToContainer(this._maxNumTF);
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;

		let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"exchange",this.useHandler,this);
		useBtn.x = bg.x + bg.width/2 - useBtn.width/2;
		useBtn.y = bg.y + bg.height + 15;
		useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(useBtn);
	}

	private dragCallback(curNum:number):void
	{
		this._useNum = curNum;
		this._selectedNumTF.text = this._useNum + "";
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
	}
	// protected getContainerY():number
	// {
	// 	return 0;
	// }

	private useHandler(param:any):void
	{
		this._useCallback.apply(this._handler,[this._useNum,this.param.data.idx]);
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"progress2_bg","progress2"
		]);
	}

	public dispose():void
	{
		this._useCallback = null;
		this._useNum = 1;
		if(this._selectedNumTF)
		{
			this.removeChildFromContainer(this._selectedNumTF);
			this._selectedNumTF.dispose();
			this._selectedNumTF = null;
		}
		if(this._maxNumTF)
		{
			this.removeChildFromContainer(this._maxNumTF);
			this._maxNumTF.dispose();
			this._maxNumTF = null;
		}
		this._maxNum = 0;
		if(this._numBg)
		{
			this.removeChildFromContainer(this._numBg);
			this._numBg.dispose();
			this._numBg = null;
		}
		this._handler = null;
		super.dispose();
	}
}