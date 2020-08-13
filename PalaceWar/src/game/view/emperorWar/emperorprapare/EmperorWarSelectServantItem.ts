/**
 * 称帝战门客弹板单个模块，可继承
 * author qianjun
 * date 2017/9/28
 */
class EmperorWarSelectServantItem extends ServantSelectedScrollItem
{
	// 属性文本
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
    {
		this._selectedIndex = index;
		this._data = data;
		let servantInfoVo:ServantInfoVo = Api.servantVoApi.getServantObj(data.servantId);
		this._servantInfoVo = servantInfoVo;
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg1");
		bg.width = 500;
		bg.height = 120;
		this.addChild(bg);

		this.initServantIcon(servantInfoVo);
		this.initServantInfo();
		
		let useBtn:BaseButton = ComponentManager.getButton(this.getBtnResName(),this.getBtnLocalName(),this.clickBtnHandler,this);
		useBtn.setColor(TextFieldConst.COLOR_BLACK);
		useBtn.x = bg.width - useBtn.width - 10;
		useBtn.y = bg.height/2 - useBtn.height/2;
		useBtn.setEnable(!this.api.haveInBuzhen(data.servantId));
		this.addChild(useBtn);
	}

	private get api(){
        return Api.emperorwarVoApi;
    }
    
	protected getAttrStr()
	{
		return this._data.text;
	}

	/**按钮文字 */
	protected getBtnLocalName():string
	{
		let view = this;
		view.api.haveInBuzhen(view._data.servantId);
		return view.api.haveInBuzhen(view._data.servantId) ? "emperorWarBuzhenHaveUp" : "emperorWarBuzhenUp";
    }
    
	public dispose():void
    {
        super.dispose();
    }
}