/**
 * 创建军团
 * author dky
 * date 201711/27
 * @class AllianceCreatePopupView
 */
class AllianceCreatePopupView  extends PopupView
{   
    private _type:string = "";

	private _soundBB:BaseBitmap;
	private _soundState:BaseTextField;
	private _soundText:BaseTextField;

	private _inputName:BaseTextField;
	private _inputWeixin:BaseTextField;
	private _inputQQ:BaseTextField;
	// private _inputPassWard:BaseTextField;
	private _inputMsg:BaseTextField;


	public constructor() 
	{
		super();
	}

	protected initView():void
	{

		
		// itemInfo.ic
		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 520;
		bg.height = 525;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 25;
		this.addChildToContainer(bg);
		
		let nameText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateNameTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.x = 70;
		nameText.y = bg.y + 20;
		this.addChildToContainer(nameText);

		//联盟名称
		let inputTF1 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,466,45,"public_tc_srkbg05",LanguageManager.getlocal("allianceCreateNameholder"),TextFieldConst.COLOR_WHITE);
		inputTF1.x = nameText.x;
		inputTF1.y = nameText.y + nameText.height + 10;
		this.addChildToContainer(inputTF1);
		this._inputName = <BaseTextField>inputTF1.getChildByName("textField");
		this._inputName.maxChars = 6;

		//联盟微信
		let weixinText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateWeixinTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		weixinText.x = nameText.x;
		weixinText.y = inputTF1.y + inputTF1.height + 10;
		this.addChildToContainer(weixinText);
		let inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,466,45,"public_tc_srkbg05",LanguageManager.getlocal("allianceCreateWeixinholder"),TextFieldConst.COLOR_WHITE);
		inputTF2.x = nameText.x;
		inputTF2.y = weixinText.y + weixinText.height + 10;
		this.addChildToContainer(inputTF2);
		this._inputWeixin = <BaseTextField>inputTF2.getChildByName("textField");
		this._inputWeixin.maxChars = 15;

		//联盟Q群
		let qqText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateQQTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		qqText.x = nameText.x;
		qqText.y = inputTF2.y + inputTF2.height + 10;
		this.addChildToContainer(qqText);
		let inputTF3 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,466,45,"public_tc_srkbg05",LanguageManager.getlocal("allianceCreateQQholder"),TextFieldConst.COLOR_WHITE);
		inputTF3.x = nameText.x;
		inputTF3.y = qqText.y + qqText.height + 10;
		this.addChildToContainer(inputTF3);
		this._inputQQ = <BaseTextField>inputTF3.getChildByName("textField");
		this._inputQQ.maxChars = 15;


		// //联盟密码
		// let passwordText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreatePasswordTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		// passwordText.x = nameText.x;
		// passwordText.y = inputTF3.y + inputTF3.height + 10;
		// this.addChildToContainer(passwordText);
		// let inputTF4 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,466,45,"public_tc_srkbg05",LanguageManager.getlocal("allianceCreatePasswordholder"),TextFieldConst.COLOR_WHITE);
		// inputTF4.x = nameText.x;
		// inputTF4.y = passwordText.y + passwordText.height + 10;
		// this.addChildToContainer(inputTF4);
		// this._inputPassWard = <BaseTextField>inputTF4.getChildByName("textField");
		// this._inputPassWard.maxChars = 6;

		//联盟公告
		let msgText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateMsgTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		msgText.x = nameText.x;
		msgText.y = inputTF3.y + inputTF3.height + 10;

		if(Api.allianceVoApi.isHideQQ())
		{
			qqText.visible = false;
			inputTF3.visible = false;
			msgText.y = inputTF2.y + inputTF2.height + 10;
		}
		this.addChildToContainer(msgText);
		let inputTF5 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,466,134,"public_tc_srkbg05",LanguageManager.getlocal("allianceCreateMsgholder"),TextFieldConst.COLOR_WHITE);
		inputTF5.x = nameText.x;
		inputTF5.y = msgText.y + msgText.height + 15;
		this.addChildToContainer(inputTF5);
		this._inputMsg = <BaseTextField>inputTF5.getChildByName("textField");
		this._inputMsg.y = 10;
        this._inputMsg.height = 130;
        this._inputMsg.width = 456;
		this._inputMsg.maxChars = 80;
		this._inputMsg.multiline = true;

		this._soundText = ComponentManager.getTextField(LanguageManager.getlocal("allianceJoinTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._soundText.x = nameText.x;
		this._soundText.y = inputTF5.y + inputTF5.height + 10;
		this.addChildToContainer(this._soundText);


		this._soundBB = BaseBitmap.create("btn_swicth");
		this._soundBB.x = this._soundText.x + this._soundText.width + 10;
		this._soundBB.y = this._soundText.y + this._soundText.height/2 - this._soundBB.height/2;
		this.addChildToContainer(this._soundBB);
		this._soundBB.addTouchTap(this.sonndHander,this);
		// this._soundBB.addTouch(this.sonndHander,this,null);	


		this._soundState = ComponentManager.getTextField("ON", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._soundState.x = this._soundBB.x + 15;
		this._soundState.y = this._soundBB.y + this._soundBB.height/2 - this._soundState.height/2;
		this.addChildToContainer(this._soundState);

		// this._type = LocalStorageManager.get(LocalStorageConst.LOCAL_SOUND_SWITCH);
		let color = TextFieldConst.COLOR_WARN_GREEN2;
		// if(this._type == ""){
			this._type = "ON";
		// }
		// if(this._type != "ON"){
		// 	this._soundBB.skewY = 180;
		// 	this._soundBB.x = this._soundBB.x + this._soundBB.width;
		// 	this._soundState.x = 390;
		// 	color = TextFieldConst.COLOR_WHITE;
		// }else{
			
		// }
		this._soundState.text = this._type;
		this._soundState.textColor = color;

		let gemBg = BaseBitmap.create("public_icon1");
		// gemBg.setScale(0.5);
		gemBg.x = 230;
		gemBg.y = bg.y + bg.height + 5;
		this.addChildToContainer(gemBg);

		let gem = Config.AlliancebaseCfg.createNeedGem;
		let gemText = ComponentManager.getTextField(gem.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		gemText.x = 280;
		gemText.y = bg.y + bg.height + 15;
		this.addChildToContainer(gemText);
		
        let changeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"allianceCreateCreateBtn",this.createHandler,this);
		changeBtn.x = this.viewBg.width/2 - changeBtn.width/2;
		changeBtn.y = gemText.y + gemText.height + 15;
		// changeBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(changeBtn);

		
	}

    private createHandler(param:any):void
	{
		if(!this._inputName.bindData){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceCreateNameTip"));
			return;
		}
		// if(!this._inputPassWard.bindData){
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("allianceCreatePassWordTip"));
		// 	return;
		// }
		//名字检测
		let txtStr:string=this._inputName.text;
		if (txtStr.indexOf(" ") != -1)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
			return;
		}
		if(!App.StringUtil.userNameCheck(txtStr))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
			return;
		}
		if( txtStr.length < 2 || txtStr.length > 6)
		{

			App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
			return;
		}
		if(Config.ShieldCfg.checkShield(txtStr)==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}
		
		// //密码检测
		// let passworStr:string=this._inputPassWard.text;
		// if(!App.StringUtil.numberCheck(passworStr))
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("allianceCreatePassWordTip2"));
		// 	return;
		// }
		// if( passworStr.length != 6)
		// {

		// 	App.CommonUtil.showTip(LanguageManager.getlocal("allianceCreatePassWordTip2"));
		// 	return;
		// }
		//公告检查
		let msg:string=this._inputMsg.text;
		 if(Config.ShieldCfg.checkOnlyShield(msg)==false)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
		let weixin  = this._inputWeixin.text;
		let qq = this._inputQQ.text;
		if(!this._inputWeixin.bindData){
			weixin  = "";
		}
		//检查
		 if(Config.ShieldCfg.checkOnlyShield(weixin)==false)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
		if(!this._inputQQ.bindData){
			qq  = "";
		}
		 if(Config.ShieldCfg.checkOnlyShield(qq)==false)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
		if(!this._inputMsg.bindData){
			msg  = "";
		}
		
		let joinSwitch = 0;
		if(this._type == "OFF")
		{
			joinSwitch = 1;
		}

		if(Config.AlliancebaseCfg.createNeedGem > Api.playerVoApi.getPlayerGem()){
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		
	
		if(PlatformManager.checkIsMwSp())
		{
			this.request(NetRequestConst.REQUEST_ALLIANCE_CREATEALLIANCE,{ 
				name: txtStr,cweixin:weixin,cqq:qq,intro:msg,switch:joinSwitch,
				server_name: ServerCfg.selectServer.sname,
				});
		}
		else{
			this.request(NetRequestConst.REQUEST_ALLIANCE_CREATEALLIANCE, { name: txtStr,cweixin:weixin,cqq:qq,intro:msg,switch:joinSwitch });
		}
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(!data.ret ){
			return;
		}
		if(data.data.data.nameFlag == 1)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceNamePopupTip1"));
			return;
		}
		if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_CREATEALLIANCE) {
			if(PlatformManager.checkIsWxmgSp()&& data.data.data.msgres&&data.data.data.msgres.data.result==1)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
				return;
			}
			if(PlatformManager.checkIsWxmgSp()&& data.data.data.introres&&data.data.data.introres.data.result==1)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
				return;
			}

			if(PlatformManager.checkIsMwSp()&&data.data&&data.data.data.msgres)
			{
				if(data.data.data.msgres.result&&data.data.data.msgres.result == "verify_fail")
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
					return;
				}
			}
			if(this.param.data.callback){
				this.param.data.callback.apply(this.param.data.handler,[]);
				this.hide();
			}
			
		}
	}
	
	private sonndHander(param:any):void
	{
		
		let color = TextFieldConst.COLOR_WARN_GREEN2;
		if(this._type == "" || this._type == "ON" ){
			this._type = "OFF";
		}
		else{
			this._type = "ON";
		}
		// LocalStorageManager.set(LocalStorageConst.LOCAL_SOUND_SWITCH,this._type);
		if(this._type != "ON"){
			this._soundBB.skewY = 180;
			this._soundBB.x = this._soundBB.x + this._soundBB.width;
			this._soundState.x = this._soundBB.x - 50;
			color = TextFieldConst.COLOR_WHITE;
		}else{
			this._soundBB.skewY = 0;
			this._soundBB.x = this._soundText.x + this._soundText.width + 10;
			this._soundState.x = this._soundBB.x + 15;
		}
		this._soundState.text = this._type;
		this._soundState.textColor = color;
	}
	

	
    // protected getTitleStr(){
    //     //  this._type = this.param.data.type 
    //     return "adultChooseTypeViewTitle";
    // }
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"shield_cn"
					]);
	}

	public dispose():void
	{
		this._type = "";

		this._soundBB = null;
		this._soundState = null;

		this._inputName = null;
		this._inputWeixin = null;
		this._inputQQ = null;
		// this._inputPassWard = null;
		this._inputMsg = null;
		// this.removeTouchTap();

		super.dispose();
	}
}