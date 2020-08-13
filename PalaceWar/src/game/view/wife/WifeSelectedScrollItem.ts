/**
 * 选择红颜弹板单个模块，可继承
 * author qianjun
 */
class WifeSelectedScrollItem extends ScrollListItem
{
	// 属性文本
	protected _attrTF:BaseTextField;
	protected _levelTF:BaseTextField;
	protected _selectedIndex:number = 0;
	protected _wifeInfoVo:WifeInfoVo;
	protected _banishing:BaseBitmap=null;
	protected _useBtn:BaseButton=null;
	public _data : any;
	public _type : number = 0;

	public constructor()
	{
		super();
	}

	protected initItem(index:number,data:any,itemparam)
    {
		this._selectedIndex = index;
		this._data = data;
		this._type = itemparam;
		let wifeInfoVo:WifeInfoVo = data;
		this._wifeInfoVo = wifeInfoVo;
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg14");
		bg.width = 500;
		bg.height = 120;
		this.addChild(bg);

		let wifeHead:BaseDisplayObjectContainer = Api.wifebanishVoApi.getWifeHead(wifeInfoVo.id.toString());
        wifeHead.setPosition(16,bg.height/2-wifeHead.height/2);
		this.addChild(wifeHead);
		
		let banishing:BaseBitmap = BaseBitmap.create("wife_banishing");
		banishing.setPosition(bg.width - banishing.width - 10,bg.height/2 - banishing.height/2);
		this.addChild(banishing);
		this._banishing = banishing;
		banishing.visible = Api.wifebanishVoApi.getIsWifeBanishing(this._wifeInfoVo.id.toString()) == 1;

		this.initWifeInfo();

		let useBtn:BaseButton = ComponentManager.getButton(this.getBtnResName(),this.getBtnLocalName(),this.clickBtnHandler,this);
		useBtn.setColor(TextFieldConst.COLOR_BLACK);
		useBtn.x = bg.width - useBtn.width - 10;
		useBtn.y = bg.height/2 - useBtn.height/2;
		this.addChild(useBtn);
		useBtn.visible = !banishing.visible;
		this._useBtn = useBtn;

		if (this._type == 2)
		{	
			if (banishing.visible)
			{
				let banishContainer = new BaseDisplayObjectContainer();
				banishContainer.setPosition(wifeHead.x+7,wifeHead.y+18);
				this.addChild(banishContainer);
				let banishingbg:BaseBitmap = BaseBitmap.create("public_9_bg60");
				banishingbg.y= 64;
				banishingbg.height = 24;
				banishingbg.width = 50;
				banishContainer.addChild(banishingbg);

				let banishingbg2:BaseBitmap = BaseBitmap.create("public_9_bg60");
				banishingbg2.y= 64;
				banishingbg2.height = 24;
				banishingbg2.width = 50;
				banishingbg2.scaleX = -1;
				banishingbg2.x = banishingbg.width+banishingbg2.width;
				banishContainer.addChild(banishingbg2);

				let banishingText:BaseBitmap = BaseBitmap.create("wife_banishing_text");
				banishingText.setPosition(banishingbg.width-banishingText.width/2,64);
				banishContainer.addChild(banishingText);

				useBtn.visible = true;
				banishing.visible = false;
			}
			
		}
	}

	/**重写该方法 */
	protected initWifeInfo():void
	{
		let nameTF:BaseTextField = ComponentManager.getTextField(this._wifeInfoVo.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		nameTF.x = 140;
		nameTF.y = 25;
		this.addChild(nameTF);

		let levelTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_speciality4") + "：" + this._wifeInfoVo.glamour,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		levelTF.x = 140;
		levelTF.y = 55;
		this.addChild(levelTF);
		this._levelTF = levelTF;

		this._attrTF = ComponentManager.getTextField(this.getAttrStr(),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		this._attrTF.x = 140;
		this._attrTF.y = 85;
		this.addChild(this._attrTF);
	}

	protected getAttrStr()
	{
		let attrStr = "";
		let tarItemId = WifeSelectedPopupView.USE_TYOE_ITEMID;
		if (this._type == 2)
		{
			attrStr = LanguageManager.getlocal("servant_skilllExp",[String(this._wifeInfoVo.exp)]);
		}
		else
		{
			attrStr = LanguageManager.getlocal("childIntimacy",[String(this._wifeInfoVo.intimacy)]);
		}
		
		return attrStr;
	}
	/** 按钮图片 */
	protected getBtnResName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}
	/**按钮文字 */
	protected getBtnLocalName():string
	{
		return "useBtn";
	}

	/**等级按钮事件，可重写 */
	protected clickBtnHandler(param:any):void
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_WIFE,{"index":this._selectedIndex,"id":this._wifeInfoVo.id});
	}
	/**刷新数据 */
	public update():void
	{
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeInfoVo.id);
		this._attrTF.text = this.getAttrStr();
		this._levelTF.text = LanguageManager.getlocal("servantInfo_speciality4") + "：" + this._wifeInfoVo.glamour;
		this._banishing.visible = Api.wifebanishVoApi.getIsWifeBanishing(this._wifeInfoVo.id.toString()) == 1;
		this._useBtn.visible = !this._banishing.visible;
		if (this._type == 2)
		{	
			if (this._banishing.visible)
			{
				this._useBtn.visible = true;
				this._banishing.visible = false;
			}
			
		}
	}

	public getSpaceY():number
	{
		return 10;
	}
	public dispose():void
    {
		this._attrTF = null;
		this._selectedIndex = null;
		this._wifeInfoVo = null;
		this._levelTF = null;
		this._banishing = null;
		this._useBtn = null;
		this._type = 0;
        super.dispose();
    }
}