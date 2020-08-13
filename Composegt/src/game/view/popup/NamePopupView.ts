/**
 * 起名改名
 * author dky
 * date 201710/13
 * @class NamePopupView
 * 1赐名 2小孩改名 3大孩改名 4帮会改名
 */
class NamePopupView  extends PopupView
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

        let curName = this.param.data.name
		let disAdd = 0;
        if(curName){

        }else{
            curName = "测试测试";
        }
       
		if(this._type == 2){
			disAdd = 20;
		}

		let bg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		bg.width = 528;
		bg.height = 350;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);


		// let topBg = BaseBitmap.create("public_tc_bg03");
		// topBg.width = 512;
		// topBg.height = 294;
		// topBg.x = this.viewBg.x + this.viewBg.width/2 - topBg.width/2;
		// topBg.y = bg.y + 13;
		// this.addChildToContainer(topBg);

        //笔
		// let penIcon:BaseBitmap = BaseBitmap.create("public_pen_icon");
		// penIcon.x = 100;
		// penIcon.y = bg.y + bg.height/2 - penIcon.height/2 - disAdd;
		// this.addChildToContainer(penIcon);

  
        //输入框
        
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_INPUT, TextFieldConst.FONTSIZE_TITLE_SMALL,220,45,"public_tc_srkbg06");

		inputTF.x = this.viewBg.x + this.viewBg.width/2 - inputTF.width/2;
		inputTF.y = bg.y + 100;//bg.y + bg.height/2 - inputTF.height/2 - disAdd;
		this.addChildToContainer(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.maxChars = 6;
		

		this._randomBtn = ComponentManager.getButton("btn_random","",this.clickRanomHandler,this);
		this._randomBtn.x = 400;
		this._randomBtn.y = inputTF.y + inputTF.height/2 - this._randomBtn.height/2; //bg.y + bg.height/2 - this._randomBtn.height/2 - disAdd;
		// this._randomBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._randomBtn);


		let line = BaseBitmap.create("public_line4");
		line.width = 460;
		line.x = this.viewBg.width/2 - line.width/2;
		line.y = bg.y + 245;
		this.addChildToContainer(line);

		if(this._type == 1){
			this.clickRanomHandler();
		}	
		else if(this._type == 2 ){
			let childInfoVo = Api.childVoApi.getChildrenInfoVoById(this.param.data.childId)
			this._inputTextField.text = childInfoVo.name;
			this._initName = childInfoVo.name;
			

			let changeName1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
			changeName1.text = LanguageManager.getlocal("namePopupChangeName1");
			// changeName1.x = 140;
			changeName1.y = 180;
			this.addChildToContainer(changeName1);
			// if(PlatformManager.checkIsJPSp())
			// {
			// 	changeName1.visible = false;
			// }

			let gemIcon:BaseBitmap = BaseBitmap.create("public_icon1");
			// gemIcon.x = changeName1.x + changeName1.width + 20;
			gemIcon.y = changeName1.y - 10;
			this.addChildToContainer(gemIcon);

			let numTf = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN_NEW);
			numTf.text = Config.ChildbaseCfg.renameGem.toString();
			// numTf.x = gemIcon.x + gemIcon.width + 20;
			numTf.y = changeName1.y;
			this.addChildToContainer(numTf);

			let changeName2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
			changeName2.text = LanguageManager.getlocal("namePopupChangeName2");
			// changeName2.x = numTf.x + numTf.width + 20;;
			changeName2.y = changeName1.y;
			this.addChildToContainer(changeName2);

			let totalWidth = changeName1.width + 20 + gemIcon.width + 20 + changeName2.width;
			let startX = this.viewBg.width / 2 - totalWidth / 2;
			changeName1.x = startX;
			gemIcon.x = changeName1.x + changeName1.width + 20;
			numTf.x = gemIcon.x + gemIcon.width + 20;
			changeName2.x = numTf.x + numTf.width + 20;



		}
		else if(this._type == 3 ){
			let adultInfoVo = Api.adultVoApi.getAdultInfoVoById(this.param.data.childId)
			this._inputTextField.text = adultInfoVo.name;
			this._initName = adultInfoVo.name;
			
			let changeName1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
			changeName1.text = LanguageManager.getlocal("namePopupChangeName1");
			// changeName1.x = 140;
			changeName1.y = 180;
			this.addChildToContainer(changeName1);
			// if(PlatformManager.checkIsJPSp())
			// {
			// 	changeName1.visible = false;
			// }

			let gemIcon:BaseBitmap = BaseBitmap.create("public_icon1");
			// gemIcon.x = changeName1.x + changeName1.width + 20;
			gemIcon.y = changeName1.y - 10;
			this.addChildToContainer(gemIcon);

			let numTf = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN_NEW);
			numTf.text = Config.ChildbaseCfg.renameGem.toString();
			// numTf.x = gemIcon.x + gemIcon.width + 20;
			numTf.y = changeName1.y;
			this.addChildToContainer(numTf);

			let changeName2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
			changeName2.text = LanguageManager.getlocal("namePopupChangeName2");
			// changeName2.x = numTf.x + numTf.width + 20;;
			changeName2.y = changeName1.y;
			this.addChildToContainer(changeName2);

			let totalWidth = changeName1.width + 20 + gemIcon.width + 20 + changeName2.width;
			let startX = this.viewBg.width / 2 - totalWidth / 2;
			changeName1.x = startX;
			gemIcon.x = changeName1.x + changeName1.width + 20;
			numTf.x = gemIcon.x + gemIcon.width + 20;
			changeName2.x = numTf.x + numTf.width + 20;
		}

		else if(this._type == 4 ){
			let allianceVo = Api.allianceVoApi.getAllianceVo();
			this._inputTextField.text = allianceVo.name;
			this._initName = allianceVo.name+"";
			
			let index = this._initName.indexOf("@");
			if(index >= 0){
				let allianceRnameTxt =  ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
				allianceRnameTxt.text = LanguageManager.getlocal("allianceNamePopupTip2");
				allianceRnameTxt.x = this.viewBg.x + this.viewBg.width/2 - allianceRnameTxt.width/2 ;
				allianceRnameTxt.y = 200;
				this.addChildToContainer(allianceRnameTxt);
			}else{
				let changeName1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
				changeName1.text = LanguageManager.getlocal("namePopupChangeName1");
				// changeName1.x = 140;
				changeName1.y = 180;
				this.addChildToContainer(changeName1);
				// if(PlatformManager.checkIsJPSp())
				// {
				// 	changeName1.visible = false;
				// }

				let gemIcon:BaseBitmap = BaseBitmap.create("public_icon1");
				// gemIcon.x = changeName1.x + changeName1.width + 20;
				gemIcon.y = changeName1.y - 10;
				this.addChildToContainer(gemIcon);

				let numTf = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN_NEW);
				numTf.text = Config.AlliancebaseCfg.renameNeedGem.toString();
				// numTf.x = gemIcon.x + gemIcon.width + 20;
				numTf.y = changeName1.y;
				this.addChildToContainer(numTf);

				let changeName2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
				changeName2.text = LanguageManager.getlocal("namePopupChangeName3");
				// changeName2.x = numTf.x + numTf.width + 20;;
				changeName2.y = changeName1.y;
				this.addChildToContainer(changeName2);

				let totalWidth = changeName1.width + 20 + gemIcon.width + 20 + changeName2.width;
				let startX = this.viewBg.width / 2 - totalWidth / 2;
				changeName1.x = startX;
				gemIcon.x = changeName1.x + changeName1.width + 20;
				numTf.x = gemIcon.x + gemIcon.width + 20;
				changeName2.x = numTf.x + numTf.width + 20;
			}

			this._randomBtn.visible = false;

		}

        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_ORANGE,"cancelBtn",this.clickCancelHandler,this);
		// this._cancelBtn.x = this.viewBg.x + this.viewBg.width/4 - this._cancelBtn.width/2;
		this._cancelBtn.x = this.viewBg.width / 2 - 25 - this._cancelBtn.width;
		this._cancelBtn.y = line.y + line.height + 14;//bg.y + bg.height + 15;
		// this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._cancelBtn);

		
	}

	private clickRanomHandler():void
	{
		let firstName = "";
		if(this._type == 1||this._type == 2||this._type == 3)
		{
			if(PlatformManager.checkIsViSp()){

			} else {
				if(PlatformManager.checkIsJPSp())
				{
					firstName = Api.playerVoApi.getPlayerName().substring(0,2)
				}
				else{
					firstName = Api.playerVoApi.getPlayerName().substring(0,2)
				}
			}
			
		}
		else
		{
			firstName = LanguageManager.getlocal("userName_firstName" + App.MathUtil.getRandom(1,604)) ;
		}
		
		let sercondName = LanguageManager.getlocal("userName_secondName" + App.MathUtil.getRandom(1,3763)) ;
		this._inputTextField.text = firstName + sercondName;
	}

	protected clickConfirmHandler(data:any):void
	{
		let txtStr:string=this._inputTextField.text.trim();
		// if(txtStr.length > 8)
		// {
		// 	this._errorText = "名字不能超过8位字符";
		// 	App.CommonUtil.showTip(this._errorText);
		// 	return;
		// }
		// else 
		// if(txtStr.length <= 0)
		// {
			
			// this._errorText = "名字不能为空";
			// App.CommonUtil.showTip(this._errorText);
		// 	return;
		// }	

		if (txtStr.indexOf(" ") != -1)
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
		// if(PlatformManager.checkIsViSp())
		if(App.StringUtil.checkCharacter(txtStr)&&PlatformManager.checkIsViSp())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
			return;
		}
		if( txtStr.length < 2 || txtStr.length >this.getNameLength())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
			return;
		} 
		if(Config.ShieldCfg.checkShield(txtStr)==false)
		{
			return;
		}
		// if(this._type == 2 ){
		// 	let childInfoVo = Api.childVoApi.getChildrenInfoVoById(this.param.data.childId)
		// 	if(txtStr == childInfoVo.name)
		// 	{
		// 		this.hide();
		// 		return;
		// 	}
		// }
		
		if(Config.ChildbaseCfg.renameGem > Api.playerVoApi.getPlayerGem() && this._type != 1 ){
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		if(Config.AlliancebaseCfg.renameNeedGem > Api.playerVoApi.getPlayerGem() && this._type == 4 ){
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}

		if(this._initName == this._inputTextField.text ){
			App.CommonUtil.showTip(LanguageManager.getlocal("nameUnChanged"));
			return;
		}

		if(this._type == 1 || this._type == 2|| this._type == 3){
			this.request(NetRequestConst.REQUEST_CHILD_RENAME,{childId:this.param.data.childId,name:this._inputTextField.text.trim()});
		}
		if(this._type == 4){
			

			if(PlatformManager.checkIsMwSp())
			{
				this.request(NetRequestConst.REQUEST_ALLIANCE_RENAME,{ 
					server_name: ServerCfg.selectServer.sname,
					name:this._inputTextField.text.trim(),
					});
			}
			else{
				this.request(NetRequestConst.REQUEST_ALLIANCE_RENAME,{name:this._inputTextField.text.trim()});
			}
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
		if(PlatformManager.checkIsWxmgSp()&& data.data.data.msgres&&data.data.data.msgres.data.result==1)
		// if(data.data.data.msgres&&data.data.data.msgres.data.result==1)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}
		if(data.data.cmd == NetRequestConst.REQUEST_CHILD_RENAME){
			// App.LogUtil.log("123123")
			
			if(data.data.data.samename == true){
				App.CommonUtil.showTip(LanguageManager.getlocal("namePopupTip1"))
				return;
			}
			if(this.param.data.confirmCallback){
				this.param.data.confirmCallback.apply(this.param.data.handler,[]);
				App.CommonUtil.showTip(LanguageManager.getlocal("child_nameTip"));
			}
	
			this.hide();
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_RENAME){
			// App.LogUtil.log("123123")

			if(PlatformManager.checkIsWxmgSp()&& data.data.data.msgres&&data.data.data.msgres.data.result==1)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
				return;
			}
			if(data.data.data.nameFlag == 1)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceNamePopupTip1"));
				return;
			}
			
			if(PlatformManager.checkIsMwSp()&&data.data&&data.data.data.msgres)
			{
				if(data.data.data.msgres.result&&data.data.data.msgres.result == "verify_fail")
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
					return;
				}
			}
			if(data.data.data.samename == true){
				App.CommonUtil.showTip(LanguageManager.getlocal("namePopupTip1"))
				return;
			}
			if(this.param.data.confirmCallback){
				this.param.data.confirmCallback.apply(this.param.data.handler,[]);
				
			}
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_nameTip"));
			this.hide();
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
		this.setConfirmBtnPosition(this.viewBg.width / 2 + 25,this._cancelBtn.y);
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
         this._type = this.param.data.type 
        return "namePopupTitle" + this._type
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["shield_cn"]);
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