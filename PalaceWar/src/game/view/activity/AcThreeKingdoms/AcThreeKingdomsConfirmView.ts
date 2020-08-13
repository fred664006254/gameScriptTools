/**
 * 三国加入确认面板
 * author qianjun
 * date 2017/11/24
 * @class ConfirmPopupView
 * 参数 ：title,msg,callback,handler  needCancel
 * 
 */
class AcThreeKingdomsConfirmView extends PopupView
{
	// private _useCallback:Function;
	// private _handler:any;
	private _bgHeight:number = 0;
	private _checkBox:CheckBox = null;
	public constructor() 
	{
		super();
    }
    
    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	private _callback = null;
	// 打开该面板时，需要传参数msg
	public initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg94");
		bg.width = 515;
		bg.height = 210;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

		this._bgHeight = bg.height;

		let messageStr:string = this.param.data.msg;

		let msgTF:BaseTextField = ComponentManager.getTextField(messageStr,18);
		msgTF.width = 490;
		msgTF.setColor(this.param.data.txtcolor ? this.param.data.txtcolor : TextFieldConst.COLOR_BROWN);
		msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
		msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		msgTF.lineSpacing = 10;
		msgTF.y = bg.y + 20;
        this.addChildToContainer(msgTF);
        
        if(this.param.data.recommand){
            let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip19`, '1')),18,TextFieldConst.COLOR_WARN_GREEN2);
            tipTxt.x = this.viewBg.x + this.viewBg.width/2 - tipTxt.width/2;
            tipTxt.y = msgTF.y + msgTF.height + 45;
			this.addChildToContainer(tipTxt);
			
			bg.height = tipTxt.y + tipTxt.textHeight + 20 - 5;
		}
		else{
			bg.height = 160;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, msgTF, bg);
		}
        


		let conBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,this.param.data.confirmTxt?this.param.data.confirmTxt:"confirmBtn",this.clickConHandler,this);
		conBtn.setColor(TextFieldConst.COLOR_BROWN);
		conBtn.x = bg.x+bg.width - conBtn.width - 60;
		conBtn.y = bg.y + bg.height + 20;
		this.addChildToContainer(conBtn);
		

		if(this.param.data.needCancel)
		{
			let canelStr = "cancelBtn";
			if(this.param.data.canelTxt)
			{
				canelStr = this.param.data.canelTxt;
			}
			let cancelBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED,canelStr,this.clickCancelHandler,this);	
			cancelBtn.setColor(TextFieldConst.COLOR_BROWN);
			cancelBtn.x = bg.x+60
			cancelBtn.y = bg.y + bg.height + 20;
			this.addChildToContainer(cancelBtn);
		}

		if(this.param.data.needCheck){
			let checkBox:CheckBox=ComponentManager.getCheckBox(LanguageManager.getlocal("activityPopTip"));
			msgTF.y = bg.y + bg.height/2 - msgTF.textHeight/2 - checkBox.height/2 - 10;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, checkBox, msgTF, [0,msgTF.textHeight + 10]);
			checkBox.name="onekeyCheckBox"
			this.addChildToContainer(checkBox);
			checkBox.setSelected(false);
			this._checkBox = checkBox;
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
		if(this.param.data.bgRes){
			let viewbg : any = this.viewBg;
			viewbg.setRes(this.param.data.bgRes);
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
        this.hide();
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
		super.dispose();
	}
}