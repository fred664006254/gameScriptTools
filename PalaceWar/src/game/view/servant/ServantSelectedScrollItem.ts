/**
 * 选择门客弹板单个模块，可继承
 * author dmj
 * date 2017/9/28
 * @class ServantSelectedScrollItem
 */
class ServantSelectedScrollItem extends ScrollListItem
{
	// 属性文本
	protected _attrTF:BaseTextField;
	protected _selectedIndex:number = 0;
	protected _servantInfoVo:ServantInfoVo;
	public _data : any;
	public _code : string;

	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any,itemparam)
    {
		this._selectedIndex = index;
		this._data = data;
		this._code = itemparam;
		let servantInfoVo:ServantInfoVo = data;
		this._servantInfoVo = servantInfoVo;
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg1");
		bg.width = 500;
		bg.height = 107;
		this.addChild(bg);

		this.initServantIcon(servantInfoVo);
		this.initServantInfo();

		let useBtn:BaseButton = ComponentManager.getButton(this.getBtnResName(),this.getBtnLocalName(),this.clickBtnHandler,this);
		useBtn.setColor(TextFieldConst.COLOR_BLACK);
		useBtn.x = bg.width - useBtn.width - 10;
		useBtn.y = bg.height/2 - useBtn.height/2;
		this.addChild(useBtn);
	}



	protected initServantIcon(servantInfoVo:ServantInfoVo):void
	{	
		let temW:number = 100;
		let iconBgBt:BaseBitmap = BaseLoadBitmap.create(servantInfoVo.qualityBoxImgPath);
		iconBgBt.x = 10;
		iconBgBt.y = 3.5;
		this.addChild(iconBgBt);
		iconBgBt.scaleX = temW/194;
		iconBgBt.scaleY = temW/192;

		let iconBt:BaseBitmap = BaseLoadBitmap.create(servantInfoVo.halfImgPath);
		iconBt.x = iconBgBt.x + 5;
		iconBt.y = iconBgBt.y + 5;
		this.addChild(iconBt);
		iconBt.scaleX = (temW-10)/180;
		iconBt.scaleY = (temW-10)/177;

		if (servantInfoVo.isServantExile()) {
			let exileBM = BaseBitmap.create("public_servantexilelogo");
			exileBM.setScale(iconBgBt.scaleX)
			exileBM.setPosition(iconBgBt.x + 194 * iconBgBt.scaleX - exileBM.width * iconBgBt.scaleX, iconBgBt.y);
			this.addChild(exileBM);
		}
	}


	/**重写该方法 */
	protected initServantInfo():void
	{
		let nameTF:BaseTextField = ComponentManager.getTextField(this._servantInfoVo.servantName,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		nameTF.setColor(TextFieldConst.COLOR_WHITE);
		nameTF.x = 120;
		nameTF.y = 15;
		this.addChild(nameTF);

		let levelTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("servant_infoLv") + this._servantInfoVo.level,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		levelTF.setColor(TextFieldConst.COLOR_WHITE);
		levelTF.x = 120;
		levelTF.y = 45;
		this.addChild(levelTF);

		this._attrTF = ComponentManager.getTextField(this.getAttrStr(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._attrTF.setColor(TextFieldConst.COLOR_WHITE);
		this._attrTF.x = 120;
		this._attrTF.y = 75;
		this.addChild(this._attrTF);
	}

	protected getAttrStr()
	{
		let attrStr = "servant_infoAttr";
		let tarItemId = ServantSelectedPopupView.USE_TYOE_ITEMID
		if (tarItemId == 1020 || tarItemId == 1021 )
		{
			attrStr =LanguageManager.getlocal("servant_bookAttr",[String(this._servantInfoVo.abilityExp)]);
		}else if (tarItemId == 1029 || tarItemId == 1030 )
		{
			attrStr =LanguageManager.getlocal("servant_skillAttr",[String(this._servantInfoVo.skillExp)]);
		}
		else
		{
			attrStr =LanguageManager.getlocal("servant_infoAttr") + this._servantInfoVo.total;
		}
		if(this._data.type && this._data.type == ServantSelectedPopupView.TYPE_EMPWAR){
			attrStr = LanguageManager.getlocal("servant_infoAttr") + this._servantInfoVo.total;
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
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_SERVANT,{"index":this._selectedIndex,"id":this._servantInfoVo.servantId});
	}
	/**刷新数据 */
	public update():void
	{
		this._servantInfoVo = Api.servantVoApi.getServantObj(this._servantInfoVo.servantId);
		this._attrTF.text = this.getAttrStr();
	}

	public getSpaceY():number
	{
		return 10;
	}
	public dispose():void
    {
		this._attrTF = null;
		this._selectedIndex = null;
		this._servantInfoVo = null;
        super.dispose();
    }
}