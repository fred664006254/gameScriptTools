/**
 * 通用确认面板
 * author dky
 * date 2017/11/24
 * @class ConfirmPopupView
 * 参数 ：title,msg,callback,handler  needCancel
 * 
 */
class ConfirmPopupView extends PopupView
{
	// private _useCallback:Function;
	// private _handler:any;
	private _bgHeight:number = 0
	public constructor() 
	{
		super();
	}

	private _callback = null;
	// 打开该面板时，需要传参数msg
	public initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 528;
		bg.height = 320;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);


		let topBg = BaseBitmap.create("public_tc_bg03");
		topBg.width = 512;
		topBg.height = 294;
		topBg.x = this.viewBg.x + this.viewBg.width/2 - topBg.width/2;
		topBg.y = bg.y + 13;
		this.addChildToContainer(topBg);

		let cor1 = BaseBitmap.create("public_tcdw_bg01");
		// cor1.skewX = 180;
		cor1.x = topBg.x;
		cor1.y = topBg.y ;
		this.addChildToContainer(cor1);

		let cor2 = BaseBitmap.create("public_tcdw_bg02");
		cor2.x = topBg.x + topBg.width-cor2.width;
		cor2.y = topBg.y;
		this.addChildToContainer(cor2);

		this._bgHeight = bg.height;

		let messageStr:string = this.param.data.msg;

		let msgTF:BaseTextField = ComponentManager.getTextField(messageStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		msgTF.width = 480;
		msgTF.lineSpacing = 10;
		msgTF.setColor(TextFieldConst.COLOR_BROWN);
		msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
		msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		msgTF.y = topBg.y + topBg.height/2 - msgTF.height/2;

		this.addChildToContainer(msgTF);


		let yesKey:string=this.param.data.yesKey?this.param.data.yesKey:"confirmBtn";
		let conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,yesKey,this.clickConHandler,this);
		// conBtn.setColor(TextFieldConst.COLOR_BLACK);
		conBtn.x = bg.x + bg.width/2 - conBtn.width/2;
		conBtn.y = bg.y + bg.height + 20;
		this.addChildToContainer(conBtn);
		

		if(this.param.data.needCancel)
		{
			let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"cancelBtn",this.clickCancelHandler,this);	
			// cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
			cancelBtn.x = 80;
			cancelBtn.y = bg.y + bg.height + 20;
			this.addChildToContainer(cancelBtn);
			conBtn.x = 330;
		}
		

	}

	// protected getConfirmBtnStr():string
	// {

	// 	return "confirmBtn";
	// }

	protected resetBgSize():void
	{
		// this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
		super.resetBgSize();
		
	}

	protected isTouchMaskClose():boolean
	{
		return (this.param&&this.param.data&&this.param.data.touchMaskClose)?true:false;
	}

	protected clickConHandler(data:any):void
	{
		let param=this.param;
		if (!param.data.clickNotAutoHide) {
			this.hide();
		}
		if(param.data.callback){
			param.data.callback.apply(param.data.handler,[this]);
		}
	}
	protected clickCancelHandler(data:any):void
	{
		let param = this.param;
		if(param.data.cancelcallback){
			param.data.cancelcallback.apply(param.data.handler,[this]);
		}
		this.hide();
	}
    // protected getConfirmBtnStr():string
	// {
	// 	return "sysConfirm";
	// }
    // protected getConfirmBtnName():string
	// {
	// 	return ButtonConst.BTN_NORMAL_YELLOW;
	// }
    protected getTitleStr(){
        
        return this.param.data.title;
    }
	protected getCloseBtnName():string
	{
		if(this.param.data.showCloseBtn)
		{
			return super.getCloseBtnName();
		}
		return  null;
	}

	public hide()
	{
		// if(this.param.data.callback){
		// 	this.param.data.callback.apply();
		// }
		super.hide()
	}
	protected getParent():egret.DisplayObjectContainer
	{
		if (this.param.data.inLayer) {
			return this.param.data.inLayer;
		} else {
			return super.getParent();
		}
	}
	public dispose():void
	{
		this._callback = null;
		super.dispose();
	}
}