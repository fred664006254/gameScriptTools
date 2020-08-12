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
	private _bgHeight:number = 0;
	private _checkBox:CheckBox = null;
	private _conBtn:BaseButton = null;
	private _cancelBtn:BaseButton = null;
	public constructor() 
	{
		super();
	}

	private _callback = null;
	// 打开该面板时，需要传参数msg
	public initView():void
	{
		let view = this;
		let bg:BaseBitmap = BaseBitmap.create("popupview_content1");
		bg.width = 520;
		bg.x = view.viewBg.x + view.viewBg.width/2 - bg.width/2;
		bg.y = 10;

		let messageStr:string = this.param.data.msg;

		let msgTF:BaseTextField = ComponentMgr.getTextField(messageStr,TextFieldConst.SIZE_CONTENT_COMMON);
		msgTF.width = 480;
		msgTF.setColor(this.param.data.txtcolor ? this.param.data.txtcolor : ColorEnums.black);
		msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
		if (this.param.data.msgAlign) {
			msgTF.textAlign = this.param.data.msgAlign;
		}
		msgTF.x = bg.x + bg.width/2 - msgTF.width/2;
		msgTF.lineSpacing = 10;
		this.addChildToContainer(msgTF);

		bg.height = msgTF.textHeight + 70;
		msgTF.y = bg.y + bg.height/2 - msgTF.textHeight/2;

		let conBtn:BaseButton;

		if(this.param.data.iconURL){
			conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM,"",this.clickConHandler,this);
			conBtn.setColor(ColorEnums.white);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, bg, [0,bg.height+20]);
			this.addChild(conBtn);
			
			let btnIcon = BaseBitmap.create(this.param.data.iconURL);
			conBtn.addChild(btnIcon);
			btnIcon.y = (conBtn.height - btnIcon.height) / 2 - 5;

			let txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
			conBtn.addChild(txt);
			txt.text = this.param.data.confirmTxt;
			txt.y = btnIcon.y + (btnIcon.height - txt.height) / 2 + 3;
			txt.strokeColor = ColorEnums.btnStrokeOrange;
			txt.stroke = 2;
			txt.bold = true;
			txt.setColor(ColorEnums.white);

			btnIcon.x = (conBtn.width - btnIcon.width - txt.width) / 2;
			txt.x = btnIcon.x + btnIcon.width + 5;

		} else {
			conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM,this.param.data.confirmTxt?this.param.data.confirmTxt:LangMger.getlocal(`confirmBtn`),this.clickConHandler,this);
			conBtn.setColor(ColorEnums.white);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, bg, [0,bg.height+20]);
			this.addChild(conBtn);
		}
		conBtn.x = 245;
		this._conBtn = conBtn;
		

		if(this.param.data.needCancel)
		{
			let canelStr = "canelStr";
			if(this.param.data.canelTxt)
			{
				canelStr = this.param.data.canelTxt;
			}
			let cancelBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL,LangMger.getlocal(canelStr),this.clickCancelHandler,this);	
			cancelBtn.setColor(ColorEnums.white);
			cancelBtn.x = 130;
			cancelBtn.y = conBtn.y;
			// cancelBtn.y = 330;
			this.addChild(cancelBtn);
			conBtn.x = 350;
			this._cancelBtn = cancelBtn;
		}

		if(this.param.data.needCheck){
			let checkBox:CheckBox=ComponentMgr.getCheckBox(LangMger.getlocal("activityPopTip"));
			msgTF.y = bg.y + bg.height/2 - msgTF.textHeight/2 - checkBox.height/2 - 10;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, checkBox, msgTF, [0,msgTF.textHeight + 10]);
			checkBox.name="onekeyCheckBox"
			this.addChildToContainer(checkBox);
			checkBox.setSelected(false);
			this._checkBox = checkBox;
		}
		// conBtn.y = 330;

	}

	protected resetBgSize():void
	{
		// this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
		super.resetBgSize();
		if(this.param.data.bgRes){
			let viewbg : any = this.viewBg;
			viewbg.setRes(this.param.data.bgRes);
		}
		let th = this.container.height + 165 + this._titleBg.height;
		this.viewBg.height = (th > this.viewBg.height) ? th : this.viewBg.height;
		if(this._conBtn){
			App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, this._conBtn, this.viewBg, [0,17]);
		}
		if(this._cancelBtn){
			App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, this._cancelBtn, this.viewBg, [0,17]);
		}
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
		// if(this.param.data.callback){
		// 	this.param.data.callback.apply(this.param.data.handler,null);
		// }
		let param = this.param;
		if(param.data.cancelcallback){
			param.data.cancelcallback.apply(param.data.handler,[this]);
		}
		this.hide();
	}

	protected isShowOpenAni():boolean
	{
		let param = this.param;
		let openAni=((param&&param.data)?(!param.data.notShowOpenAni):true);
		return openAni;
	}

	// protected getShowHeight(){
	// 
	// 	return 500;
	// }
    // protected getConfirmBtnStr():string
	// {
	// 	return "sysConfirm";
	// }
    // protected getConfirmBtnName():string
	// {
	// 	return ButtonConst.BTN_LONG_YELLOW;
	// }
    protected getTitleStr(){
        
        return this.param.data.title;
    }
	protected getCloseBtnName():string
	{
		return this.param.data.needClose === 0 ? null : super.getCloseBtnName();
	}
	protected closeHandler()
	{

		let param = this.param;
		if(param.data.closecallback){
			param.data.closecallback.apply(param.data.handler,[this]);
		}
		super.closeHandler();
	}
	public hide()
	{		
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
		let param = this.param;
		if(this._checkBox && this._checkBox.checkSelected()){
			param.data.checkcallback.apply(param.data.handler);
		}
		this._callback = null;
		this._conBtn = null;
		this._cancelBtn = null;
		super.dispose();
	}
}