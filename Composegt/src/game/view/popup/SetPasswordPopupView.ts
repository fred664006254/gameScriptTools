/**
 * 至劲 设置密码
 * author shaoliang
 * date 2018/03/15
 * @class SetPasswordPopupView
 */

class SetPasswordPopupView extends PopupView
{
	private _inputTextField:BaseTextField = null;
	private _inputTextField2:BaseTextField = null;

	private _urlPre:string = null;
	private _gameId:string = null;
	private _userId:string = null;

	public constructor() 
	{
		super();
	}

	protected getTitleStr():string
	{
		return "setPasswordTitle";
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected initView():void
	{	
		let typeBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		typeBg.width = 518;
		typeBg.height = 435;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 12);
		this.addChildToContainer(typeBg);

		let titleText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("setPasswordDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		titleText.setPosition(52 , 27 + typeBg.y);
		titleText.width = 468;
		titleText.lineSpacing = 6;
		this.addChildToContainer(titleText);

		let rankBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 500;
		rankBg.height = 240;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, typeBg.y + 105);
		this.addChildToContainer(rankBg);

		let infoText1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("setPasswordPlayer"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		infoText1.setPosition(titleText.x+12 , rankBg.y+24);
		this.addChildToContainer(infoText1);

		let infoText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("setPasswordAccount"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		infoText2.setPosition(infoText1.x , infoText1.y+52);
		this.addChildToContainer(infoText2);

		let infoText3:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("setPassword1"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		infoText3.setPosition(infoText1.x , infoText2.y+52);
		this.addChildToContainer(infoText3);

		let infoText4:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("setPassword2"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		infoText4.setPosition(infoText1.x , infoText3.y+52);
		this.addChildToContainer(infoText4);

		let accountText:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		accountText.setPosition(infoText1.x+infoText1.width+12 , infoText1.y);
		this.addChildToContainer(accountText);

		let nameText:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		nameText.setPosition(infoText2.x+infoText2.width+12 , infoText2.y);
		this.addChildToContainer(nameText);

		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_TITLE_SMALL,304,44,"public_9_bg5",null,0xa4917f);
		inputTF.x = infoText3.x+infoText3.width;
		inputTF.y = infoText3.y-15;
		
		this.addChildToContainer(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.restrict = "A-Z a-z 0-9";
		this._inputTextField.maxChars = 20;

		let inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_TITLE_SMALL,304,44,"public_9_bg5",null,0xa4917f);
		inputTF2.x = infoText4.x+infoText4.width;
		inputTF2.y = infoText4.y-15;
		
		this.addChildToContainer(inputTF2);


		this._inputTextField2 = <BaseTextField>inputTF2.getChildByName("textField");
		this._inputTextField2.restrict = "A-Z a-z 0-9";
		this._inputTextField2.maxChars = 20;

		let gotoBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"confirmBtn",this.gotoHandle,this);
		gotoBtn.setPosition(this.viewBg.width/2  - gotoBtn.width/2, rankBg.y+rankBg.height + 14);
		this.addChildToContainer(gotoBtn);


		this._userId = PlatformManager.userId.split("_")[1];

		let that = this;
		//iOS:403，安卓402
		this._gameId = "403";
		if (App.DeviceUtil.isAndroid() == true)
		{
			this._gameId = "402";
		}

		this._urlPre = "http://gt-cn-in.raygame3.com/tank-global/index.php"; //正式
		// this._urlPre = "http://192.168.103.123:93/tank-global/index.php";//测试



		NetLoading.show();
		NetManager.http.get(this._urlPre,{t:"3kolduserget",ct:"import",ac:"getinfo",userid:this._userId,gameid:this._gameId,service_id:ServerCfg.selectServer.zid},(data:any)=>{
			NetLoading.hide();
			if(data && data.data)
			{	
				that._userId = data.data.userid;
				accountText.text = data.data.username;
				nameText.text = data.data.userid;
				if (data.data.changePassowrd == 1)
				{
					ViewController.getInstance().openView(ViewConst.POPUP.DOWNLOADPACKAGEPOPUPVIEW);
				}
			}
			},()=>{
				NetLoading.hide();
		},PlatformManager);

	}

	private gotoHandle():void
	{	
		let text1:string = this._inputTextField.text;
		let text2:string = this._inputTextField2.text;
		if (!text1 || !text2)
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("setPasswordError1"));
			return;
		}
		else if (text1 != text2)
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("setPasswordError2"));
			return;
		}
		else if (text1.length < 6)
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("setPasswordError3"));
			return;
		}
		//this.gotoDownload();

		NetLoading.show();
		NetManager.http.get(this._urlPre,{t:"3koldusersetpwd",ct:"import",ac:"ChangePassword",userid:this._userId,gameid:this._gameId,password:text1,service_id:ServerCfg.selectServer.zid},(data:any)=>{
			NetLoading.hide();
			if(data && data.code == 0)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.DOWNLOADPACKAGEPOPUPVIEW);
			}
			else {
				if (data && data.code == -1 && data.msg)
				{
					App.CommonUtil.showTip(data.msg);
				}
			}
			},()=>{
				NetLoading.hide();
		},PlatformManager);

	}

	// private gotoDownload():void
	// {
	// 	ViewController.getInstance().openView(ViewConst.POPUP.DOWNLOADPACKAGEPOPUPVIEW);
	// }

	protected getBgExtraHeight():number
	{
		return 10;
	}


	public dispose():void
	{	 
		this._inputTextField = null;
		this._inputTextField2 = null;
		this._urlPre = null;
		this._gameId = null;
		this._userId = null;

		super.dispose();
	}
}