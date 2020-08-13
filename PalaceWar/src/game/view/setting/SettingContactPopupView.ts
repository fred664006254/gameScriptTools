/**
 * 设置联系我们
 * author dky
 * date 201711/10
 * @class SettingContactPopupView
 */
class SettingContactPopupView  extends PopupView
{   
	private _conMsg:string;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{	
		console.log("QAZ type "+this.param.data.type);
		if (this.param.data.type == 2)
		{	
			this._conMsg = "";
			if (this.param.data.info.tel)
			{
				this._conMsg = LanguageManager.getlocal("settingContactTF",[this.param.data.info.tel]);
			}
			if (this.param.data.info.qq)
			{	
				if (this._conMsg != "")
				{
					this._conMsg+="\n";
				}
				this._conMsg += LanguageManager.getlocal("settingContactQQ",[this.param.data.info.qq]);
			}
			if (this.param.data.info.qq_group)
			{	
				if (this._conMsg != "")
				{
					this._conMsg+="\n";
				}
				this._conMsg += LanguageManager.getlocal("welfareViewQQGroup1",[this.param.data.info.qq_group]);
			}
			if (this.param.data.info.pub_account)
			{	
				if (this._conMsg != "")
				{
					this._conMsg+="\n";
				}
				this._conMsg += LanguageManager.getlocal("pub_account",[this.param.data.info.pub_account]);
			}
			if (this.param.data.info.qq_pub_account)
			{	
				if (this._conMsg != "")
				{
					this._conMsg+="\n";
				}
				this._conMsg += LanguageManager.getlocal("qq_pub_account",[this.param.data.info.qq_pub_account]);
			}
		}

		let contact1Text = ComponentManager.getTextField(this._conMsg, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
		contact1Text.multiline = true;
		contact1Text.lineSpacing = 5;
		contact1Text.width = 500;
		contact1Text.verticalAlign = egret.VerticalAlign.MIDDLE;
		contact1Text.x = 50+GameData.popupviewOffsetX;
		contact1Text.y = 40;
		this.addChildToContainer(contact1Text);
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		if (this.param.data.type == 0)
		{
			return {requestType:NetRequestConst.REQUEST_USER_GETKFMSG,requestData:{}};
		}
		else 
		{
			return null;
		}
	}
		//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		if(data.data.ret < 0){
			return;
		}
		
		if(data.data.cmd == NetRequestConst.REQUEST_USER_GETKFMSG)
		{
			this._conMsg = data.data.data.msg;
		}
	}

	protected getShowHeight():number
	{
		return 350;
	}

	public dispose():void
	{
		this._conMsg = "";
		super.dispose();
	}
}