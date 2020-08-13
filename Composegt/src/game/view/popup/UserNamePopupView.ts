/**
 * 起名改名
 * author dky
 * date 201710/13
 * @class UserNamePopupView
 */
class UserNamePopupView  extends PopupView
{   
    private _type:number;
	private _useCallback:Function;
	private _handler:any;

	private _inputTextField:BaseTextField;

    private _cancelBtn:BaseButton;
	private _errorText:string;
	private _randomBtn:BaseButton;
	private _initName = "";

	public constructor() 
	{
		super();
	}

	protected initView():void
	{

		let bg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		bg.width = 530;
		bg.height = 343;
		bg.x = this.viewBg.width/2 - bg.width/2;
		bg.y = 10;
		this.addChildToContainer(bg);



  
        //输入框
        
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,230,45,"public_tc_srkbg06");

		inputTF.x = this.viewBg.width/2 - inputTF.width/2;
		inputTF.y = bg.y + 107;
		this.addChildToContainer(inputTF);


        //笔
		let penIcon:BaseBitmap = BaseBitmap.create("popupview_pen");
		penIcon.x = inputTF.x + inputTF.width - 10;
		penIcon.y = inputTF.y + inputTF.height / 2 - penIcon.height/2;
		this.addChildToContainer(penIcon);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.text = Api.playerVoApi.getPlayerName();
		this._inputTextField.maxChars = this.getNameLength();
		

		let line = BaseBitmap.create("public_line4")
		line.width = 460;
		line.x = this.viewBg.width/2 - line.width/2;
		line.y = bg.y + 244
		this.addChildToContainer(line);

        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"cancelBtn",this.clickCancelHandler,this);
		// this._cancelBtn.x = this.viewBg.x + this.viewBg.width/4 - this._cancelBtn.width/2;
		// this._cancelBtn.y = this._confirmBtn.y//line.y + 27;  //bg.y + bg.height + 15;
// this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y
		this._cancelBtn.x = this.viewBg.width/2 - 25 - this._cancelBtn.width; //this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35;
		this._cancelBtn.y = line.y + 27;//this.container.height - this._cancelBtn.height - 10;
		// this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._cancelBtn);

		
	}


	protected clickConfirmHandler(data:any):void
	{
		let txtStr:string=this._inputTextField.text.trim();
		if(txtStr == Api.playerVoApi.getPlayerName()){
			this.hide()
			return;
		}
		// if(txtStr.length > 8)
		// {
		// 	this._errorText = "名字不能超过8位字符";
		// 	App.CommonUtil.showTip(this._errorText);
		// 	return;
		// }
		// else if(txtStr.length <= 0)
		// {
			
		// 	this._errorText = "名字不能为空";
		// 	App.CommonUtil.showTip(this._errorText);
		// 	return;
		// }	
		//正则表达式
		if (txtStr.indexOf(" ") != -1)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
			return;
		}
		if(App.StringUtil.checkCharacter(txtStr)&&PlatformManager.checkIsViSp())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
			return;
		}

		//正则表达式
		if(!App.StringUtil.userNameCheck(txtStr))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
			return;
		}
		if(App.StringUtil.checkCharacter(txtStr))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
			return;
		}
		if( txtStr.length < 2 || txtStr.length > this.getNameLength())
		{

			App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
			return;
		}
		if(Config.ShieldCfg.checkShield(txtStr)==false)
		{
			return;
		}

		if(PlatformManager.checkIsMwSp())
		{
			this.request(NetRequestConst.REQUEST_USER_CHANGENAME,{ 
				 server_name: ServerCfg.selectServer.sname,
				 name:this._inputTextField.text.trim(),
				});
		}
		else{
			this.request(NetRequestConst.REQUEST_USER_CHANGENAME,{name:this._inputTextField.text.trim()});
		}
		
		
		// this.hide();
	}
	private getNameLength(type:number=0):number
	{
		if(PlatformManager.checkIsEnSp()||PlatformManager.checkIsViSp())
		{
			return GameData.nameLength;
		}
		else
		{	
			//输入限制
			if(type==1)
			{
				return 8;
			}
			return 6; 
		} 
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{	
		if(data.data.cmd == NetRequestConst.REQUEST_USER_CHANGENAME){
			// App.LogUtil.log("123123"
			if(PlatformManager.checkIsWxmgSp()&& data.data.data.msgres&&data.data.data.msgres.data.result==1)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
				return;
			}
			if(PlatformManager.checkIsMwSp()&&data.data.data.msgres)
			{
				if(data.data.data.msgres.result&&data.data.data.msgres.result == "verify_fail")
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
					return;
				}
			}
			if(data.data.data.nameflag == 0)
			{	

				App.CommonUtil.showTip(LanguageManager.getlocal("user_changeName"));
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI);
				this.hide();
			}

			else{
				App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError" + data.data.data.nameflag));
				return;
			}
			
		}
		
	}
    private clickCancelHandler(param:any):void
	{
		// if(this._cancelCallback)
		// {
		// 	this._cancelCallback.apply(this._handler,[]);
		// }


		this.hide();
	}

	// protected getContainerY():number
	// {
	// 	return 0;
	// }
    protected resetBgSize():void
	{
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.width/2 + 25 ,this._cancelBtn.y);
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
		
        return "namePopupTitle2"
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["shield_cn","popupview_pen"]);
	}
	
	public dispose():void
	{
		this._type = null;
		this._useCallback = null;
		this._handler = null;

		this._inputTextField = null;

		this._cancelBtn = null;
		this._errorText = null;
		this._randomBtn = null;
		this._initName = "";
		super.dispose();
	}
}