/**
 * 登录错误弹板
 * author dmj
 * date 2017/9/20
 * @class ErrorPopupView
 */
class ErrorPopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

	private _callback = null;

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerManager.maskLayer;
	}

	// 打开该面板时，需要传参数msg
	public initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 124;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 29;
		this.addChildToContainer(bg);


		let messageStr:string = this.param.data.msg;

		let messageTF:BaseTextField = new BaseTextField();
		messageTF.text = messageStr;
		messageTF.width=400;
		messageTF.wordWrap=true;
		messageTF.size = TextFieldConst.FONTSIZE_CONTENT_COMMON;
		messageTF.x = this.getShowWidth()/2 - messageTF.width/2;
		messageTF.y = bg.y+bg.height/2-messageTF.height/2;
		this.height = 200;
		this.addChildToContainer(messageTF);

		if(this.param.data.title){
			this.titleTF.text = this.param.data.title;
		}
	}

	// protected getConfirmBtnStr():string
	// {

	// 	return "confirmBtn";
	// }

	protected resetBgSize():void
	{
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 83,this.container.height+20);
	}

    protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}
    protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}
    protected getTitleStr(){
        return "loginFail"
    }
	protected getCloseBtnName():string
	{
		if(this.param&&this.param.data&&this.param.data.showCloseBtn)
		{
			return super.getCloseBtnName();
		}
		return  null;
	}

	private _isApply : boolean = false;
	public hide()
	{
		if(!this._isApply){
			this._isApply = true;
			if(this.param.data.callback){
				this.param.data.callback.apply();
			}
			super.hide()
		}
		else{
			this._isApply = false;
		}
	}

	protected getBgExtraHeight():number
	{
		return 0;
	}

	public dispose():void
	{
		this._callback = null;
		this._isApply = false;
		super.dispose();
	}
}