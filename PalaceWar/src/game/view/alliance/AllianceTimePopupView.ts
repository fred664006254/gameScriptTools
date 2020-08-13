/**
 * 帮会倒计时 1转移帮主 2解散帮派
 * author dky
 * date 2017/12/2
 * @class AllianceTimePopupView
 * 参数 ：title,msg,callback,handler 
 * 
 */
class AllianceTimePopupView extends PopupView
{
	// private _useCallback:Function;
	// private _handler:any;
	private _bgHeight:number = 0
	private _msgTF:BaseTextField;
	private _startTime:number = 0;
	private _uid:any = null;
	private _type:number = 1;
	public constructor() 
	{
		super();
	}

	private _callback = null;
	private _pswd:string;
	// 打开该面板时，需要传参数msg
	public initView():void
	{
		this._uid = this.param.data.auid;
		this._type = this.param.data.type;
		this._pswd = this.param.data.pswd;

		this._startTime = GameData.serverTime + 30;

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 150;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

		this._bgHeight = bg.height;

		let messageStr:string = LanguageManager.getlocal("alliance_turnTime",["30"]);
		if(this.param.data.type == 2){
			messageStr = LanguageManager.getlocal("alliance_disTime",["30"]);
		}
		

		this._msgTF = ComponentManager.getTextField(messageStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._msgTF.width = 480;
		this._msgTF.setColor(TextFieldConst.COLOR_BLACK);
		this._msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
		this._msgTF.x = this.viewBg.x + this.viewBg.width/2 - this._msgTF.width/2;
		this._msgTF.y = bg.y + bg.height/2 - this._msgTF.height/2;
		this._msgTF.lineSpacing = 10;
		this.addChildToContainer(this._msgTF);


		let conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"cancelBtn",this.clickConHandler,this);
		conBtn.setColor(TextFieldConst.COLOR_BLACK);
		conBtn.x = this.getShowWidth()/2 - conBtn.width/2;
		conBtn.y = bg.y + bg.height + 20;
		this.addChildToContainer(conBtn);
		

	}
	public tick()
	{
		let messageStr:string = LanguageManager.getlocal("alliance_turnTime",[this._startTime - GameData.serverTime + ""]);
		if(this.param.data.type == 2){
			messageStr = LanguageManager.getlocal("alliance_disTime",[this._startTime - GameData.serverTime + ""]);
		}
		this._msgTF.text = messageStr;
		if(this._startTime - GameData.serverTime <= 0)
		{
			
			// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_TRANSFER,{"auid":this.param.data.auid});
			
			if(this._type == 1){
				
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_TRANSFER,{"auid":this._uid});
				this.hide();
			}
			if(this._type == 2){
				this.request(NetRequestConst.REQUEST_ALLIANCE_DISBAND,{pswd:this._pswd});
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceManageDisTip") );
			}
			
		}
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(!data.ret){
			return;
		}
		
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_DISBAND)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceManageDisTip") );
			this.hide();
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

	protected clickConHandler(data:any):void
	{
		if(this._type == 1){
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_turnFail"));
		}
		if(this._type == 2){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceManageDisTip2"));
		}
		if(this.param.data.callback){
			this.param.data.callback.apply(this.param.data.handler,null);
		}
		this.hide();
	}
	protected clickCancelHandler(data:any):void
	{
		// if(this.param.data.callback){
		// 	this.param.data.callback.apply(this.param.data.handler,null);
		// }
		
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
		return  null;
	}

	public hide()
	{
		if(this._type == 1){
			// App.CommonUtil.showTip(LanguageManager.getlocal("alliance_turnFail"));
		}
		super.hide()
	}

	public dispose():void
	{
		this._bgHeight = 0
		this._msgTF = null;
		this._startTime = 0;
		this._uid = null;
		this._type = 1;
		super.dispose();
	}
}