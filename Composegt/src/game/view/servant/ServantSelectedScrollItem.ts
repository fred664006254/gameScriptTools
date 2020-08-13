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
		let bg:BaseBitmap = BaseBitmap.create("public_listbg3");
		bg.width = 524//500;
		bg.height = 135;
		this.addChild(bg);

		// let leftBg = BaseBitmap.create("public_left");
		// leftBg.width = 129;
		// leftBg.height = 106.5;
		// leftBg.x = 5.5;
		// leftBg.y = 5.5;
		// this.addChild(leftBg);

		this.initServantIcon(servantInfoVo);
		this.initServantInfo();

		let useBtn:BaseButton = ComponentManager.getButton(this.getBtnResName(),this.getBtnLocalName(),this.clickBtnHandler,this);
		// useBtn.setColor(TextFieldConst.COLOR_BLACK);
		useBtn.x = bg.width - useBtn.width - 15;
		useBtn.y = bg.height/2 - useBtn.height/2;
		this.addChild(useBtn);
	}



	protected initServantIcon(servantInfoVo:ServantInfoVo):void
	{	
		let temW:number = 100 + 10;
		let iconBgBt:BaseBitmap = BaseLoadBitmap.create(servantInfoVo.qualityBoxImgPath);
		iconBgBt.x = 20;
		iconBgBt.y = 10;
		this.addChild(iconBgBt);
		// iconBgBt.scaleX = temW/194;
		// iconBgBt.scaleY = temW/192;
		iconBgBt.scaleX = temW/194;
		iconBgBt.scaleY = temW/192;

		let iconBt:BaseBitmap = BaseLoadBitmap.create(servantInfoVo.halfImgPath);
		iconBt.x = iconBgBt.x + 5;
		iconBt.y = iconBgBt.y + 5;
		this.addChild(iconBt);
		// iconBt.scaleX = (temW-10)/180;
		// iconBt.scaleY = (temW-10)/177;
		iconBt.scaleX = (temW-15)/180;
		iconBt.scaleY = (temW-15)/177;
	}


	/**重写该方法 */
	protected initServantInfo():void
	{

		let nameBg = BaseBitmap.create("public_biaoti2");
        nameBg.width = 160;
        nameBg.x = 150;
        nameBg.y = 10 ;

		let nameTF:BaseTextField = ComponentManager.getTextField(this._servantInfoVo.servantName,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		nameTF.setColor(TextFieldConst.COLOR_BROWN);
       	nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2; //140;
        nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2; //30;
		
		this.addChild(nameBg);
		this.addChild(nameTF);

		let levelTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("servant_infoLv") + this._servantInfoVo.level,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		levelTF.setColor(TextFieldConst.COLOR_BROWN);
		levelTF.x = 140+15;
		levelTF.y = 55;
		this.addChild(levelTF);

		this._attrTF = ComponentManager.getTextField(this.getAttrStr(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._attrTF.setColor(TextFieldConst.COLOR_BROWN);
		this._attrTF.x = levelTF.x;
		this._attrTF.y = 85;
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
		return attrStr;
	}
	/** 按钮图片 */
	protected getBtnResName():string
	{
		return ButtonConst.BTN_SMALL_YELLOW;
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