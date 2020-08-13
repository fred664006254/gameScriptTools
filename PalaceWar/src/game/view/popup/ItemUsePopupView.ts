/**
 * 道具使用弹板
 * author dmj
 * date 2017/9/25
 * @class ItemUsePopupView
 */
class ItemUsePopupView  extends PopupView
{
	protected _useCallback:Function;
	protected _handler:any;
	protected _useNum:number = 1;
	protected _selectedNumTF:BaseTextField;
	protected _maxNumTF:BaseTextField;
	protected _maxNum:number = 0;
	protected _numBg:BaseBitmap;
	protected _itemvo:ItemInfoVo = null;
	protected _desc:BaseTextField = null;
	protected _effect:BaseTextField = null;
	protected _useBtn:BaseButton = null;
	protected _useTipKey:string = null;
	protected _effectNum:number = 0;

	public constructor() 
	{
		super();
	}

	protected get uiType():string
	{
		return "2";
	}

	protected getFrameName():string
	{
		return "popup_frame1";
	}
	

	protected initView():void
	{
		let itemId:number = this.param.data.itemId
		let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
		this._itemvo = itemInfoVo;
		this._useCallback = this.param.data.callback;
		this._handler = this.param.data.handler;
		let itemName:string = itemInfoVo.name;
		let iconPic:string = itemInfoVo.icon;
		let effectDesc:string = itemInfoVo.desc;
		this._maxNum = itemInfoVo.num;
		if(this.param.data.maxNum){
			this._maxNum = Math.min(this.param.data.maxNum,Api.itemVoApi.getItemNumInfoVoById(itemId));
		} 
		if(this._maxNum >100)
		{
			this._maxNum = 100;
		}
		if(itemId >= 1013 && itemId <= 1017){
			let bookroomCfg = GameConfig.config.bookroomCfg;
			this._maxNum = Math.min(bookroomCfg.temporaryMax - Api.bookroomVoApi.geItemNum, this._maxNum);
		}

		if (this._itemvo.target == 7)
		{
			let arry = this._itemvo.getRewards.split("_");
			if (arry[0]=="31")
			{
				let obj = Api.servantVoApi.getServantObj(String(this._itemvo.targetId));
				let num = obj.getBookCanLevelUpNum(arry[1]);
				if(this._maxNum >num)
				{
					this._maxNum = num;
				}
			}
		}

		if (this.param.data.useTipKey){
			this._useTipKey = this.param.data.useTipKey;
		}
		if (this.param.data.effectNum){
			this._effectNum = this.param.data.effectNum;
		}

		let effectTitle:string = LanguageManager.getlocal("effectTitle");

		let bg:BaseBitmap = BaseBitmap.create("popupview_itemsbg");
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 0;
		this.addChildToContainer(bg);

		// let temX = 35;
		// let temY = 23;
		// let temW = 100;
		// let temH = 100;

		// let itembg:BaseBitmap = BaseBitmap.create(itemInfoVo.iconBg);
		// itembg.x = temX
		// itembg.y = temY;
		// this.addChildToContainer(itembg);
		
		//点击物品增加文字说明 添加物品iconitem
		let itemCfg : any  = Config.ItemCfg.getItemCfgById(Number(itemId));
		if(!itemCfg){
			itemCfg = GameData.getRewardItemVoByIdAndType(itemId);
		}
		let iconItem = GameData.getItemIcon(itemCfg,true,null,null,itemInfoVo.num);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconItem, bg);
		this.addChildToContainer(iconItem);
		
		// let numLb:BaseTextField = ComponentManager.getTextField( String(itemInfoVo.num),16,TextFieldConst.COLOR_WHITE);
        // numLb.name="numLb";

        // let numbg:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
        // if (itemInfoVo.num>99)
        // {
        //     numbg.width = numLb.width+18;
        // }
        // numbg.name="numbg";
        // numbg.setPosition(itembg.x+itembg.width-numbg.width-4,itembg.y+itembg.height-numbg.height-4);
        // numLb.setPosition(itembg.x+itembg.width-numLb.width-12, numbg.y+numbg.height/2-numLb.height/2 );

        // this.addChildToContainer(numbg);
        // this.addChildToContainer(numLb);

		// let bg1:BaseBitmap = BaseBitmap.create("public_9_bg1");
		// bg1.width = 387;
		// bg1.height = temH;
		// bg1.x = temX + temW + 10;
		// bg1.y = temY;
		// this.addChildToContainer(bg1);

		let nameTF:BaseTextField = ComponentManager.getTextField(itemName,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		let namebg = BaseBitmap.create(`public_9_bg95`);
		namebg.width = nameTF.width+80;
		namebg.x = this.viewBg.x + this.viewBg.width/2 - namebg.width/2;
		namebg.y = bg.y+bg.height+ 10;
		this.addChildToContainer(namebg);

		
		nameTF.setColor(TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF, namebg);
		this.addChildToContainer(nameTF);

		let effect = ComponentManager.getTextField(LanguageManager.getlocal("effectTitle"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_BLACK);
		effect.setPosition(64,namebg.y + namebg.height + 10);
		this.addChildToContainer(effect);
		this._effect = effect;

		let effectDescStr = itemInfoVo.desc;
		if (this._useTipKey){
			effectDescStr = LanguageManager.getlocal(this._useTipKey, ["1", ""+itemName, ""+this._effectNum]);
		}

		let effectDescTF:BaseTextField=ComponentManager.getTextField(effectDescStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
		effectDescTF.lineSpacing=4;
		effectDescTF.x = effect.x+effect.width;
		effectDescTF.y = effect.y;
		effectDescTF.width = this.viewBg.width-effect.x-effect.width-60;
		if (this._useTipKey){
			effect.visible = false;
			effectDescTF.width = this.viewBg.width-60 - 40;
			effectDescTF.textAlign = TextFieldConst.ALIGH_CENTER;
			effectDescTF.x = this.viewBg.x + this.viewBg.width/2 - effectDescTF.width/2;
			
		}
		this.addChildToContainer(effectDescTF);
		this._desc = effectDescTF;

		let descH = effectDescTF.y + effectDescTF.height;
		if (descH<80)
		{
			descH = 80;
		}
		let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress20_bg",this._maxNum,this.dragCallback,this);
		dragProgressBar.x = 115;
		dragProgressBar.y = descH + 30;
		this.addChildToContainer(dragProgressBar);

		this._numBg = BaseBitmap.create("public_9_bg5");
		this._numBg.width = 90;
		this._numBg.x = bg.x + bg.width - 20 - this._numBg.width;
		this._numBg.y = effectDescTF.y + effectDescTF.height + 20;
		this.addChildToContainer(this._numBg);

		this._selectedNumTF = ComponentManager.getTextField(this._useNum + "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
		this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
		
		this._selectedNumTF.y = this._numBg.y + this._numBg.height/2 - this._selectedNumTF.height/2;
		this.addChildToContainer(this._selectedNumTF);

		this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
		this._maxNumTF.y = this._numBg.y + this._numBg.height/2 - this._maxNumTF.height/2;
		this.addChildToContainer(this._maxNumTF);
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;

		let line = BaseBitmap.create("public_cut_line");
		line.x = bg.x + bg.width/2 - line.width/2;
		line.y = dragProgressBar.y + 40;
		this.addChildToContainer(line);

		let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW,"useBtn",this.useHandler,this);
		useBtn.x = bg.x + bg.width/2 - useBtn.width/2;
		useBtn.y = dragProgressBar.y + 58;
		useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(useBtn);
		this._useBtn = useBtn;
	}

	protected dragCallback(curNum:number):void
	{
		this._useNum = curNum;
		this._selectedNumTF.text = this._useNum + "";
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
		if (this._useTipKey){
			this._desc.text = LanguageManager.getlocal(this._useTipKey, [""+this._useNum, ""+this._itemvo.name, ""+(this._effectNum * this._useNum)]);
			this._desc.x = this.viewBg.x + this.viewBg.width/2 - this._desc.width/2;
		}

	}

	protected useHandler(param:any):void
	{
		this._useCallback.apply(this._handler,[this._useNum,this.param.data.itemId]);
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"progress20_bg","progress2","popupview_itemsbg"
		]);
	}

	protected getBgExtraHeight():number
	{
		return 25;
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
		this._itemvo = null;
		this._desc = null;
		this._useTipKey = null;
		this._effectNum = null;

		super.dispose();
	}
}