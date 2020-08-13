/**
 * author 陈可
 * date 2017/9/12
 * @class LoginView
 */
class LoginView extends BaseView
{
	/**选服背景 */
	private _serverBg:BaseBitmap;

	private _serverContainer:BaseDisplayObjectContainer;
	private _loginButton:BaseButton;
	private _noticeButton:BaseButton;
	private _switchAccountBtn:BaseButton;
	private _changeLineBtn:BaseButton;
	/**用户名 */
	private _username:string = "";
	/**邀请者uid */
	private _inviteUid:string = "";
	private _isnotice:boolean =false;
	private _touchNum:number=0;
	private _lastTouchTime:number=0;
	private _checkBox:BaseBitmap = null;
	private _isAgreement:boolean = false;
	private _isShowedSpecialUser:boolean = false;
	private _newAppointBtn:BaseButton = null;

	public constructor()
	{
		super();
	}

	private getCfg(successCallback:Function,callbackThisObj:any,isRetry?:boolean):void
	{
		if(!isRetry)
		{
			StatisticsHelper.reportLoadData("4_1");
		}
		NetLoading.show();
		let ths=this;
		let reqData:any={t:"getlastserver",pid:LoginManager.getLocalUserName()};
		
		if(ServerCfg.checkServerDebug())
		{
			reqData.debug=1;
		}

		let version =PlatformManager.getAppVersion();
		let channel =PlatformManager.getAppid();
		if(version)
		{
			reqData.version=version;
		}
		if(channel)
		{
			reqData.channel =channel; 
		}
		else
		{
			reqData.channel=PlatformManager.getTestAppid();
		}
		if(PlatformManager.checkIsIOSShenheSp())
		{
			reqData.isShenhe="1";
		}
		reqData.isnew =true;
		if (App.DeviceUtil.isAndroid()) {
			console.log("判断为andorid");
			reqData.os = "android";
		} else if (App.DeviceUtil.isIOS()) {
			console.log("判断为ios");
			reqData.os = "ios";
		}
		if(PlatformManager.checkIsAreaPkg())
		{
			reqData.bigType=PlatformManager.getGameArea();
		}
		console.log("getCfg os", reqData.os);
		console.log("start getcfg");
		NetManager.http.get(ServerCfg.svrCfgUrl,reqData,(newdata:any)=>{
			StatisticsHelper.reportLoadData("4_2");
			let data = newdata.server;
			this._isShowedSpecialUser = false;
			let isnewuser:boolean=newdata.isnewuser;
			LoginManager.isNewUser=Boolean(isnewuser);
			NetLoading.hide();
			if (newdata.serverTime){
				GameData.serverTime = newdata.serverTime;
			}
			if (Api.acnewappointApi){
				Api.acnewappointApi.setAcData(newdata.activeData);
				Api.acnewappointApi.setZidInfo(newdata.intervalZinfo);
			}
			if (newdata.limiisshow)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.QINAFUPOPUPVIEW, {limiisshow:newdata.limiisshow});
				return;
			}

			ServerCfg.lastServer=data;
			if(newdata.lastServer&&PlatformManager.getGameArea()&&PlatformManager.getGameArea()!=GameConfig.getSubAppIdByArea(newdata.lastServer)&&(App.CommonUtil.getOption("isFirstLogin")=="true"||LoginManager.inSDKAccountSwitching||(GameData.isGetLastLogin==false&&App.DeviceUtil.isRuntime2())))
			{
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
					msg: LanguageManager.getlocal("diffAreaTip"), title: "itemUseConstPopupViewTitle", needCancel: false, handler: this, callback: () => {
						let areaid=GameConfig.getSubAppIdByArea(newdata.lastServer);
						PlatformManager.switchAreaOrLanguage(areaid,PlatformManager.getGameLanguage());
						if(App.DeviceUtil.isRuntime2())
						{
							GameData.curBigType=areaid;
							ths.getCfg(this.refresh,ths);
						}
					}, cancelcallback: () => {
					}
				});
			}
			if(data.state)
			{
				ths.showLoginNotice(data.state,data.msg);
			}
			if(newdata&&newdata.notice&&newdata.notice.length>0&&(!isnewuser))
			{
				var noticeData:any={};
				noticeData.name ="login";
				noticeData.notice = newdata.notice;
				GameData.announcementLoginLastTime = newdata.serverTime;
				App.LogUtil.log("getLocalUserName: "+LoginManager.getLocalUserName());
				if (GameData.checkShowNoticeInLogin(newdata.notice)){
					this._isnotice =true;
					this._noticeButton.visible =true;
					let localT = LocalStorageManager.get(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW+LoginManager.getLocalUserName());
            		if (localT && GameData.checkShowNoticeIsTodayInLogin()){
						LocalStorageManager.set(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW+LoginManager.getLocalUserName(), String(newdata.serverTime));
					}
					ViewController.getInstance().openView(ViewConst.COMMON.GAMEANNOUNCEMENtVIEW,noticeData);
				}	
			}else
			{	
				this._isnotice =false;
				if(this._noticeButton)
				{
					this._noticeButton.visible = false;
				} 
			}
			GameData.closePay=Boolean(newdata.payswitch);

			//新服预约
			this.showActivityIcon();

			if(data&&data.zid)
			{
				ServerCfg.setServerData(data);
			}
			console.log("getcfg success");
			if(successCallback)
			{
				successCallback.call(callbackThisObj);
			}
			if(isnewuser)
			{
				ths.loginBtnHandler();
			}
			// 实名认证防沉迷
			GameData.idcardSwitch = false;
			GameData.idcardNormal = 0;
			GameData.idcardType = RealnameConst.USERTYPE_0;
			GameData.idcardNoFreeApiSwitch = 0;
			if (newdata.notCreated!=null&& newdata.notCreated==true) {
				GameData.notCreated = true;
			}
			if (newdata.specialUser!=null&& newdata.specialUser==1) {
				GameData.specialUser = 1;
			}
			if (newdata.phoneBindSwitch!=null&& newdata.phoneBindSwitch==1) {
				GameData.phoneBindSwitch = 1;
			}
			if (newdata.hasPhone!=null&& newdata.hasPhone==1) {
				GameData.hasPhone = 1;
			}

			if (newdata.showAgreement) {
				GameData.showAgreement = true;
				if (this._loginButton)
				{	
					if (this._checkBox)
					{
						this.resetAgreement();
					}
					else
					{
						this.creatAgreement();
					}
					this.checkSpecialUser();
				}
			}
			if (newdata&&newdata.idcardinfo && newdata.idcardinfo.switch === 1) {
				// 开关
				GameData.idcardSwitch = true;
				// 简易模式还是正常模式
				if (newdata.idcardinfo.normal) {
					GameData.idcardNormal = newdata.idcardinfo.normal;
				}
				if (newdata.idcardinfo.cantclose) {
					GameData.idcardConstraint = true;
				}
				
				
				// 是否进入过正常模式
				if (newdata.idcardinfo.info && newdata.idcardinfo.info.enternormal) {
					GameData.idcardEnterNormal = newdata.idcardinfo.info.enternormal;
				}
				// 几类用户
				if (newdata.idcardinfo.info && newdata.idcardinfo.info.usertype) {
					GameData.idcardType = newdata.idcardinfo.info.usertype;
				}
				// 是否去调收费查询接口的三态开关
				if (newdata.idcardinfo.nofreeapiswitch) {
					GameData.idcardNoFreeApiSwitch = newdata.idcardinfo.nofreeapiswitch;
				}
				// 是否是以前认证过的用户
				if (newdata.idcardinfo.info && 
					(newdata.idcardinfo.info.idnumber && newdata.idcardinfo.info.idnumber !== "null") && 
					((!newdata.idcardinfo.info.usertype) || newdata.idcardinfo.info.usertype == RealnameConst.USERTYPE_1)
					) {
					GameData.idcardType = RealnameConst.USERTYPE_3;
					Api.realnameVoApi.setIdcardInfo(newdata.idcardinfo.info.idnumber, null, GameData.idcardType, (err)=>{
						if (err) {
							App.CommonUtil.showTip(LanguageManager.getlocal("realname_neterror"));
						}
					});
				}
				// if (GameData.idcardType == RealnameConst.USERTYPE_0 || (GameData.idcardType == RealnameConst.USERTYPE_1 && GameData.idcardNormal == 1)) {
				// 	// 如果是0类用户，就弹提示 如果是1类用户在正常模式下也弹
				// 	Realname2PopupView.showTipDialog();
				// }
				if (GameData.idcardType == RealnameConst.USERTYPE_0 && GameData.idcardNormal == 0) {
					// 如果是0类用户，而且是简易模式才弹，正常模式进入游戏后再弹
					Realname2PopupView.showTipDialog();
				}
				// else if (GameData.idcardNormal==1 && GameData.idcardConstraint == true && (GameData.idcardType == RealnameConst.USERTYPE_1 || GameData.idcardType == RealnameConst.USERTYPE_0))
				// {
				// 	ViewController.getInstance().openView(ViewConst.POPUP.REALNAMECONSTRAINTPOPUPVIEW);
				// }
			}
			GameData.isGetLastLogin=true;
		},()=>{
			console.log("get serverlist error wait 1s retry");
			let tmpIdx = egret.setTimeout(()=>{
				egret.clearTimeout(tmpIdx);
				NetLoading.hide();
				ths.getCfg(successCallback,callbackThisObj,true);
			},ths,1000);
		},this);
	}
	
	protected initView():void
	{
		StatisticsHelper.reportLoadData("3_5");
		LoginLoading.hideWxgameText();
		App.LogUtil.log("iniview loginView");
		App.LogUtil.log("ready play login music");
		this.playBgMusic();
		App.LogUtil.log("play login music end");
		// 播放背景音乐
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACNEWAPPOINT_MODEL_REFRESH, this.freshActivityIcon, this);
		GameConfig.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playBgMusic,this);
		// 背景
		if(ResourceManager.getRes(PlatCfg.loginBg))
		{
			let bg=BaseBitmap.create(PlatCfg.loginBg);
			this.addChild(bg);
		}
		this.showLogoAndLoginBtn();
		App.CommonUtil.formatFullScreenBg();

		//用户协议
		if (GameData.showAgreement)
		{
			this.creatAgreement();
			this.checkSpecialUser();
		}
		//新服预约
		this.freshActivityIcon();
	}

	private checkSpecialUser():void
	{
		if (GameData.specialUser == 1 && this._isAgreement == true)
		{
			let isShow = LocalStorageManager.get("isShowAgreementSpecialUser"+PlatformManager.userId);
			if(!isShow || isShow == "")
			{	
				this.selectHandler3(false);
				ViewController.getInstance().openView(ViewConst.POPUP.AGREEMENTPOPUPVIEW,{f:this.selectHandler2,o:this});
				this._isShowedSpecialUser = true;
			}
		}
	}

	private creatAgreement():void
	{
		if (this._checkBox)
		{
			return;
		}

		this._checkBox= BaseBitmap.create("public_select");
		this._checkBox.setPosition(150,this._serverContainer.y-this._checkBox.height);
		this.addChild(this._checkBox);
		this._checkBox.addTouchTap(this.selectHandler,this);

		let circleBg:egret.Shape = new egret.Shape();
		circleBg.alpha = 0.6;
		
		this.addChild(circleBg);


		let agreementAffirm:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("agreementAffirm"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		agreementAffirm.setPosition(this._checkBox.x+this._checkBox.width+5,this._checkBox.y+this._checkBox.height/2-agreementAffirm.height/2);
		this.addChild(agreementAffirm);

		this.resetAgreement();
		
		let lookAgreement:BaseTextField = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_BLUE);   
		lookAgreement.textFlow = new Array<egret.ITextElement>(
				{ text: LanguageManager.getlocal("agreementPopupViewTitle"), style: { "underline": true} }
				);
		lookAgreement.setPosition(agreementAffirm.x+agreementAffirm.width+10,agreementAffirm.y);
		this.addChild(lookAgreement);

		lookAgreement.addTouchTap(this.showAgreement,this,null);

		circleBg.x = agreementAffirm.x - 5;
		circleBg.y  = agreementAffirm.y-5
		circleBg.graphics.beginFill(0x000000);
		circleBg.graphics.drawRoundRect(0,0,lookAgreement.width+agreementAffirm.width+20,lookAgreement.height+10,5,5);
		circleBg.graphics.endFill();
	}

	private resetAgreement():void
	{
		if(GameData.notCreated)
		{	
			let isShow = LocalStorageManager.get("isShowAgreement"+PlatformManager.userId);
			if(!isShow || isShow == "")
			{	
				this.selectHandler3(false);
				ViewController.getInstance().openView(ViewConst.POPUP.AGREEMENTPOPUPVIEW,{f:this.selectHandler2,o:this});
			}
			else
			{
				this.selectHandler3(true);
			}
		}
		else
		{	
			this.selectHandler3(true);
		}

	}

	private showAgreement():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.AGREEMENTPOPUPVIEW,{});
	}

	private selectHandler():void
	{
		if (this._isAgreement)
		{
			this._isAgreement = false;
			LocalStorageManager.set("isShowAgreement"+PlatformManager.userId,"");
			if (this._isShowedSpecialUser == true)
			{
				LocalStorageManager.set("isShowAgreementSpecialUser"+PlatformManager.userId,"");
			}
		}
		else
		{
			this._isAgreement = true;
			LocalStorageManager.set("isShowAgreement"+PlatformManager.userId,"true");
			if (this._isShowedSpecialUser == true)
			{
				LocalStorageManager.set("isShowAgreementSpecialUser"+PlatformManager.userId,"true");
			}
		}
		this._checkBox.texture=ResourceManager.getRes(this._isAgreement?"public_select_down":"public_select");
	}

	private selectHandler2():void
	{
		if (!this._isAgreement)
		{
			this._isAgreement = true;
			LocalStorageManager.set("isShowAgreement"+PlatformManager.userId,"true");
			if (this._isShowedSpecialUser == true)
			{
				LocalStorageManager.set("isShowAgreementSpecialUser"+PlatformManager.userId,"true");
			}
			this._checkBox.texture=ResourceManager.getRes("public_select_down");
		}
	}

	private selectHandler3(isSelect:boolean):void
	{
		if (isSelect == false)
		{
			this._isAgreement = false;
			LocalStorageManager.set("isShowAgreement"+PlatformManager.userId,"");
			if (this._isShowedSpecialUser == true)
			{
				LocalStorageManager.set("isShowAgreementSpecialUser"+PlatformManager.userId,"");
			}
		}
		else
		{
			this._isAgreement = true;
			LocalStorageManager.set("isShowAgreement"+PlatformManager.userId,"true");
			if (this._isShowedSpecialUser == true)
			{
				LocalStorageManager.set("isShowAgreementSpecialUser"+PlatformManager.userId,"true");
			}
		}
		this._checkBox.texture=ResourceManager.getRes(this._isAgreement?"public_select_down":"public_select");
	}
	
	private playBgMusic():void
	{
		try
		{
			SoundManager.playBg(SoundConst.MUSIC_LOGIN);
		}
		catch(e)
		{
			App.LogUtil.log("login播放背景音效报错"+e);
		}
		GameConfig.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.playBgMusic,this);
	}

	private showLogoAndLoginBtn():void
	{
		if(App.MessageHelper.hasEventListener(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST))
		{
			return;
		}
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST,this.refresh,this);


		if(this._serverContainer)
		{
			this._serverContainer.visible=true;
			if(this._serverContainer)
			{
				this._serverContainer.visible = true;
			}
			if(this._serverBg)
			{
				this._serverBg.visible = true;
			}
			if(this._switchAccountBtn)
			{
				this._switchAccountBtn.visible = true;
			}
			if(this._noticeButton)
			{
				this._noticeButton.visible = true;
			}
			return;
		}

		// logo
		if (PlatCfg.loginLogo) {
			let logo:BaseBitmap;
			logo = BaseBitmap.create(PlatCfg.loginLogo);
			logo.x = GameConfig.stageWidth/2 - logo.width/2;
			logo.y = 5;
			this.addChild(logo);
			if((PlatformManager.checkIsIOSShenheSp()||PlatformManager.checkIs3KSp())&&PlatCfg.loginLogo=="loginres_logo")
			{
				logo.visible=false;
			}
			else if (PlatformManager.checkIsShenHeTaskShowCard())
			{
				logo.visible=false;
			}
			else if (PlatformManager.checkIsTWBSp())
			{
				// logo.y = GameConfig.stageHeigth/2 + 190 - logo.height;
				logo.y = 530;
			}
			else if (PlatformManager.checkIsEnLang())
			{
				logo.y = 520;
			}
			else if(PlatformManager.checkIsThSp())
			{
				logo.y = 501;
			}
			else if (!PlatformManager.checkIsKRSp() && PlatCfg.loginBg == "loginbg")
			{
				logo.y = GameConfig.stageHeigth - 290 - logo.height;
			}
			if(GameConfig.stageHeigth<960)
			{
				logo.y-=(960-GameConfig.stageHeigth);
			}
			
		}
		this._serverContainer = new BaseDisplayObjectContainer();
		// this._serverContainer.visible = !(App.DeviceUtil.isWXgame() && !PlatformManager.isLogin);
		this.addChild(this._serverContainer);

		this._serverBg = BaseBitmap.create("loginres_9_serverbg");
		this._serverBg.width=452;
		this._serverContainer.addChild(this._serverBg);
		this._serverContainer.addTouch(this.clickSelectedHandler,this);

		this._serverContainer.setPosition(GameConfig.stageWidth/2 - this._serverBg.width/2,GameConfig.stageHeigth-290);
		if (PlatformManager.checkIsThSp())
		{
			this._serverContainer.y = GameConfig.stageHeigth/2+250;
		}
		else if (PlatformManager.checkIsTWBSp())
		{
			this._serverContainer.y =800;
		}
		else if (PlatformManager.checkIsEnLang() || (PlatformManager.checkIsRuLang()))
		{
			this._serverContainer.y = 800;
		}
		if(GameConfig.stageHeigth<960)
		{
			this._serverContainer.y-=(960-GameConfig.stageHeigth);
		}

		let textColor = TextFieldConst.COLOR_WARN_RED3;
		 let stateStr = LanguageManager.getlocal("serverListOld");
        if(ServerCfg.selectServer&&ServerCfg.selectServer.flag == 1)
        {
            stateStr = LanguageManager.getlocal("serverListNew");
			textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
		let serverStateTF = ComponentManager.getTextField( stateStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serverStateTF.textColor = textColor;
		serverStateTF.x = 30;
		serverStateTF.y = this._serverContainer.height/2 - serverStateTF.height/2;
		serverStateTF.name="serverStateTxt";
		this._serverContainer.addChild(serverStateTF);

		let serverNameTxt:BaseTextField=ComponentManager.getTextField("1",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		serverNameTxt.width=200;
		serverNameTxt.textAlign=egret.HorizontalAlign.CENTER;
		serverNameTxt.x = this._serverContainer.width/2 - serverNameTxt.width/2;
		serverNameTxt.y = this._serverContainer.height/2 - serverNameTxt.height/2;
		serverNameTxt.text=(ServerCfg.selectServer&&ServerCfg.selectServer.sname)?ServerCfg.selectServer.sname:"";
		serverNameTxt.name="serverNameTxt";
		this._serverContainer.addChild(serverNameTxt);

		let selecteBtn:BaseBitmap = BaseBitmap.create("loginres_txt1");
		selecteBtn.x = this._serverContainer.width - selecteBtn.width - 20;
		selecteBtn.y = this._serverContainer.height/2 - selecteBtn.height/2;
		this._serverContainer.addChild(selecteBtn);

	
		this._noticeButton = ComponentManager.getButton("loginres_logo_notice","",this.showNotice,this);
		// this._noticeButton.x =10;
		// this._noticeButton.y =10; 
		this.addChild(this._noticeButton); 
		this._noticeButton.visible = false;
		
		if(this._isnotice)
		{
			this._noticeButton.visible =true;
		}
		else
		{
			this._noticeButton.visible =false;
		}
		
 
		// 切换账号、联系客服

		this._switchAccountBtn = ComponentManager.getButton("loginres_btn2","",this.switchAccountHandler,this);
		this._switchAccountBtn.setPosition(PlatformManager.hasSpcialCloseBtn()?10:(GameConfig.stageWidth-this._switchAccountBtn.width-10),10);
		this.addChild(this._switchAccountBtn);
		let isLogin:boolean=PlatformManager.checkIsLoginPlat();
		if(PlatformManager.checkHideSwitchAccountBtn())
		{
			this._switchAccountBtn.visible=false;
		}
		else
		{
			this._switchAccountBtn.visible=isLogin;
		}
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_PLAT_LOGIN_SUCCESS,this.sdkLoginSuccess,this);

		let lineArr:string[]=window["gameLineArr"]||[];
		let changeLineBtn:BaseButton=null;
		if(lineArr.length>0)
		{
			changeLineBtn=ComponentManager.getButton("loginres_btn5","",()=>{
				ViewController.getInstance().openView(ViewConst.POPUP.SELECTLINEPOPUPVIEW);
			},this);
			changeLineBtn.x=this._switchAccountBtn.x;
			changeLineBtn.y=this._switchAccountBtn.y+(this._switchAccountBtn.visible?this._switchAccountBtn.height+15:0);
			this.addChild(changeLineBtn);
			this._changeLineBtn=changeLineBtn;
		}
		

		this._noticeButton.x = GameConfig.stageWidth - this._noticeButton.width-10;
		if(changeLineBtn)
		{
			this._noticeButton.y = changeLineBtn.y + changeLineBtn.height + 15;
		}
		else
		{
			if (this._switchAccountBtn.visible){
				this._noticeButton.y = this._switchAccountBtn.y + this._switchAccountBtn.height + 15; 
			}
			else{
				this._noticeButton.y = 10;
			}
		}
		
		if (PlatformManager.checkShowBackApp())
		{
			let tuyouBackToLobby:BaseButton = ComponentManager.getButton("loginres_btn4","",this.backToLobbyHandler,this);
			tuyouBackToLobby.setPosition(PlatformManager.hasSpcialCloseBtn()?10:(GameConfig.stageWidth-tuyouBackToLobby.width-10),10);
			this.addChild(tuyouBackToLobby);
		}

		// 登陆游戏
		this._loginButton = ComponentManager.getButton("loginres_btn3","",this.loginBtnHandler,this);
		this._loginButton.x = GameConfig.stageWidth/2 - this._loginButton.width/2;
		this._loginButton.y = this._serverContainer.y+this._serverContainer.height+20;
		this.addChild(this._loginButton);
		// this._loginButton.visible = !(App.DeviceUtil.isWXgame() && !PlatformManager.isLogin);

		let txt1:BaseTextField=ComponentManager.getTextField("背景故事纯属虚构，并非真实历史故事",14,TextFieldConst.COLOR_QUALITY_GRAY);

		let platStr:string=PlatformManager.getStatement();
		if (PlatformManager.checkIsShowWarning()) {
			if(!platStr)
			{
				let warnBg:BaseBitmap=BaseBitmap.create("public_9_black");
				warnBg.width=640;
				warnBg.height=88;
				warnBg.setPosition(0,GameConfig.stageHeigth-warnBg.height);
				this.addChild(warnBg);

				this.addChild(txt1);

				let warnTxt:BaseTextField=ComponentManager.getTextField("抵制不良游戏  拒绝盗版游戏  注意自我保护  谨防受骗上当\n适度游戏益脑  沉迷游戏伤身  合理安排时间  享受健康生活",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
				warnTxt.lineSpacing=5;
				warnTxt.setPosition((GameConfig.stageWidth-warnTxt.width)/2,GameConfig.stageHeigth-warnTxt.height-20);
				this.addChild(warnTxt);
				txt1.setPosition(GameConfig.stageWidth-txt1.width-5,warnBg.y-txt1.height-5);
			}
			else
			{
				let warnBg:BaseBitmap=BaseBitmap.create("public_9_black");
				warnBg.width=640;
				warnBg.height=70;
				warnBg.setPosition(0,GameConfig.stageHeigth-warnBg.height);
				this.addChild(warnBg);

				let gradualBg:BaseBitmap=BaseBitmap.create("loginres_9_gradual");
				gradualBg.width=640;
				gradualBg.setPosition(0,warnBg.y-gradualBg.height);
				this.addChild(gradualBg);

				this.addChild(txt1);

				let warnTxt:BaseTextField=ComponentManager.getTextField("抵制不良游戏  拒绝盗版游戏  注意自我保护  谨防受骗上当\n适度游戏益脑  沉迷游戏伤身  合理安排时间  享受健康生活",TextFieldConst.FONTSIZE_CONTENT_SMALL);
				warnTxt.lineSpacing=5;
				warnTxt.setPosition((GameConfig.stageWidth-warnTxt.width)/2,GameConfig.stageHeigth-warnBg.height-warnTxt.height-20);
				this.addChild(warnTxt);

				let platTxt:BaseTextField=ComponentManager.getTextField(platStr,14);
				if(platTxt.width<GameConfig.stageWidth-20)
				{
					platTxt.textAlign=egret.HorizontalAlign.CENTER;
				}
				platTxt.lineSpacing=5;
				platTxt.width=GameConfig.stageWidth-20;
				platTxt.setPosition(10,GameConfig.stageHeigth-warnBg.height+(warnBg.height-platTxt.height)/2);
				this.addChild(platTxt);

				txt1.setPosition(GameConfig.stageWidth-txt1.width-5,warnBg.y-txt1.height-3);
			}
		}
		else {
			txt1.setPosition(GameConfig.stageWidth-txt1.width-5,GameConfig.stageHeigth-txt1.height-5);
		}
		
		
		// TODO: 玩一玩，显示版本号，目前无系统性的版本号生成方案，先临时这样搞了
		if (App.DeviceUtil.isWyw()) {
			let versionText:BaseTextField=ComponentManager.getTextField("版本:modifybywywscript_loginviewversion",14,TextFieldConst.COLOR_WHITE);
			versionText.setPosition(10,txt1.y);
			this.addChild(versionText);
		}
		//qq
		if (App.DeviceUtil.isQQGame()) {
			let versionText:BaseTextField=ComponentManager.getTextField("版本:modifybyqqscript_loginviewversion",14,TextFieldConst.COLOR_WHITE);
			versionText.setPosition(10,txt1.y);
			this.addChild(versionText);
		}


		// if(this.checkNotLogin())
		// {
		// 	return;
		// }
		if(PlatformManager.checkIsUseSDK())
		{
			if(PlatformManager.isLogin==false)
			{
				if(RSDKHelper.isInit)
				{

					this.doLogin();
					
				}
				else
				{
					// App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RSDK_INIT_SUCCESS,PlatformManager.login,PlatformManager);
				}
			}
			else
			{
				if(ServerCfg.selectServer&&ServerCfg.selectServer.zid)
				{

				}
				else
				{
					this.getCfg(this.refresh,this);
				}
			}
		}
		else
		{
			if(PlatformManager.checkIsLocal()||GameData.isTest()||PlatformManager.checkIsPlatSp()||PlatformManager.checkIsIOSShenheSp()||PlatformManager.checkIsLocalSp())
			{
				PlatformManager.userId = LoginManager.getLocalUserName();
				GameData.tmpUserPassword = LoginManager.getUserPassword();
				if(!PlatformManager.userId)
				{
					this.showAccountPanel();
				}
				else
				{
					if(ServerCfg.selectServer&&ServerCfg.selectServer.zid)
					{
					}
					else
					{
						this.getCfg(this.refresh,this);
					}
				}
			}
		}
		this.initTestTouch();
		if (PlatformManager.checkIsWxSp() && App.DeviceUtil.isWXgame()) {
			RSDKHelper.showFkVipIcon();
		}
	}
	private initTestTouch():void
	{
		let leftMk:BaseShape=new BaseShape();
		leftMk.graphics.beginFill(0,0);
		leftMk.graphics.drawRect(0,0,60,130);
		leftMk.graphics.endFill();
		if(this._noticeButton&&this.contains(this._noticeButton))
		{
			this.addChildAt(leftMk,this.getChildIndex(this._noticeButton));
		}
		else
		{
			this.addChild(leftMk);
		}
		leftMk.addTouchTap((event:egret.TouchEvent)=>{
			if(this._touchNum<1)
			{
				this._touchNum++;
			}
			else
			{
				if(egret.getTimer()-this._lastTouchTime>1000)
				{
					this._touchNum=0;
				}
				else
				{
					this._touchNum++;
				}
			}
			this._lastTouchTime=egret.getTimer();
			if(this._touchNum==10)
			{
				if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
				{
					StatisticsHelper.reportOwnNameLog("touch10","testcmd");
					console.log("already in test");
					this.createPanel(()=>{
						ViewController.getInstance().openView("TestView");
					},"开始测试");
				}
			}
		},this);
	}

	private createPanel(callback:(...args)=>void,btnStr?:string):void
	{

		let maskSp = new BaseShape();
		maskSp.graphics.beginFill(TextFieldConst.COLOR_BLACK,0.5);
		maskSp.graphics.drawRect(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
		maskSp.graphics.endFill();
		maskSp.touchEnabled = true;
		this.addChild(maskSp);

		let panel:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		this.addChild(panel);

		var bg:BaseShape=new BaseShape();
		bg.graphics.beginFill(TextFieldConst.COLOR_BLACK,1);
		bg.graphics.drawRect(0,0,400,300);
		bg.graphics.endFill();
		panel.addChild(bg);
		panel.x = GameConfig.stageWidth/2  - bg.width/2;
		panel.y = GameConfig.stageHeigth/2 - bg.height/2;

		var usernameTF:BaseTextField = new BaseTextField();
		usernameTF.x = 20;
		usernameTF.y = 50;
		usernameTF.text = "验证码:";
		panel.addChild(usernameTF);

		var usernameBg:BaseShape=new BaseShape();
		usernameBg.graphics.beginFill(TextFieldConst.COLOR_LIGHT_RED,1);
		usernameBg.graphics.drawRect(0,0,250,50);
		usernameBg.graphics.endFill();

		usernameBg.graphics.beginFill(TextFieldConst.COLOR_BLACK,1);
		usernameBg.graphics.drawRect(1,1,248,48);
		usernameBg.graphics.endFill();
		usernameBg.x = 110;
		usernameBg.y = usernameTF.y + usernameTF.height/2 - usernameBg.height/2;
		panel.addChild(usernameBg);

		
		var usernameInput:BaseTextField = new BaseTextField();
		usernameInput.type = egret.TextFieldType.INPUT;
		usernameInput.width = 250;
		usernameInput.height = usernameTF.height;
		usernameInput.x = 120;
		usernameInput.y = 50;
		panel.addChild(usernameInput);

		var confirmBtn:BaseButton = ComponentManager.getButton("loginres_btn3","",()=>{
			if(!usernameInput.text)
			{
				return;
			}
			StatisticsHelper.reportOwnNameLog("trypsd:"+usernameInput.text,"testcmd");
			GameData.tstInputStr=usernameInput.text;
			NetManager.http.get(ServerCfg.getTstPidUrl(),{code:usernameInput.text},(data)=>{
				if(data&&data.status==1)
				{
					callback();
					panel.dispose();
					maskSp.dispose();
				}
			},null,this);
		},this);
		confirmBtn.setText(btnStr,false);
		confirmBtn.x = panel.width/2 - confirmBtn.width/2;
		confirmBtn.y = panel.height - 70;
		panel.addChild(confirmBtn);
	}

	private doLogin()
	{	
		PlatformManager.client.checkWeiduanUpgrade();
		PlatformManager.login();
	}
	private showNotice():void
	{
		var noticeData:any={};
		noticeData.name ="login";
		ViewController.getInstance().openView(ViewConst.COMMON.GAMEANNOUNCEMENtVIEW,noticeData);
	}


	private showLoginNotice(state:string|number,msg:string):void
	{
		if(state&&msg)
		{
			if(Number(state)==1)
			{
				let continer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
				let mask:BaseShape=new BaseShape();
				mask.graphics.beginFill(0,0.4);
				mask.graphics.drawRect(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
				mask.graphics.endFill();
				continer.addChild(mask);
				mask.touchEnabled=true;
				let shape:BaseShape=new BaseShape();
				shape.graphics.beginFill(0,0.7);
				shape.graphics.drawRoundRect(0,0,540,300,15,15);
				shape.graphics.endFill();
				shape.setPosition((continer.width-shape.width)/2,(continer.height-shape.height)/2);
				continer.addChild(shape);

				let txt:BaseTextField=ComponentManager.getTextField(msg,TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
				txt.textAlign=egret.HorizontalAlign.CENTER;
				txt.lineSpacing=5;
				txt.width=shape.width-60;
				txt.setPosition(shape.x+(shape.width-txt.width)/2,shape.y+(shape.height-txt.height)/2);
				continer.addChild(txt);
				this.addChild(continer);
				this.hideLoginBtn();
			}
		}
	}

	private sdkLoginSuccess():void
	{
		if(ServerCfg.selectServer&&ServerCfg.selectServer.zid)
		{
		}
		else
		{
			this.getCfg(this.refresh,this);
		}
		if(PlatformManager.checkHideSwitchAccountBtn())
		{
			return;
		}
		if(this._switchAccountBtn)
		{
			this._switchAccountBtn.visible=true;
			if(this._changeLineBtn)
			{
				this._changeLineBtn.y=this._switchAccountBtn.y+(this._switchAccountBtn.visible?this._switchAccountBtn.height+15:0);
			}
		}
	}

	public refresh():void
	{
		App.LogUtil.log("start refresh "+!!this._serverContainer);
		if(this._serverContainer)
		{
			App.LogUtil.log("start refresh lastserver");
			// this._serverContainer.visible = true;
			// this._loginButton.visible = true;
			let txt1:BaseTextField = <BaseTextField>this._serverContainer.getChildByName("serverStateTxt");
			if(txt1)
			{
				// txt1.text=ServerCfg.selectServer.sname;
				let textColor = TextFieldConst.COLOR_WARN_RED;
				let stateStr = LanguageManager.getlocal("serverListOld");
				if(ServerCfg.selectServer&&ServerCfg.selectServer.flag == 1)
				{
					stateStr = LanguageManager.getlocal("serverListNew");
					textColor = TextFieldConst.COLOR_WARN_GREEN;
				}
				
				txt1.textColor = textColor;
				App.LogUtil.log("find txt"+ stateStr);
				txt1.text = stateStr;
			}

			let txt:BaseTextField = <BaseTextField>this._serverContainer.getChildByName("serverNameTxt");
			if(txt)
			{
				txt.text=ServerCfg.selectServer.sname;
				App.LogUtil.log("find txt2"+ ServerCfg.selectServer.sname);
			}
		}
		this.freshActivityIcon();
	}

	// 调起sdk
	private loginBtnHandler():void
	{	
		//加载韩国条约
		if(PlatformManager.checkIsKRSp())
		{
			let isShow = LocalStorageManager.get("isShowKRAgreement")
			if(!isShow || isShow == "")
			{
				ViewController.getInstance().openView(ViewConst.BASE.KRAGREEMENTVIEW,{confirmCallback: this.loginBtnHandler2, handler: this});
				return;
			}
		}

		if(PlatformManager.checkIsUseSDK()&&PlatformManager.isLogin==false)
		{
			PlatformManager.login();
			return;
		}

		if (GameData.showAgreement)
		{
			if(!this._isAgreement)
			{	
				App.CommonUtil.showTip(LanguageManager.getlocal("agreementTip"));
				return;
			}
		}

		if (GameData.idcardNormal==1 && GameData.idcardConstraint == true && (GameData.idcardType == RealnameConst.USERTYPE_1 || GameData.idcardType == RealnameConst.USERTYPE_0))
		{
			ViewController.getInstance().openView(ViewConst.POPUP.REALNAMECONSTRAINTPOPUPVIEW);
			return;
		}

		// if (GameData.phoneBindSwitch == 1 && GameData.hasPhone != 1)
		// {
		// 	ViewController.getInstance().openView(ViewConst.POPUP.BINDINGPHONEPOPUPVIEW,{});
		// 	return;
		// }

		this._isShowedSpecialUser = false;
		if (PlatformManager.checkIsHeYue() && PlatformManager.checkIsIdnSp()==false) 
		{	
			App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_TWLOGIN,this.doLoginHandler,this);
			PlatformManager.heyueCheckServer(ServerCfg.selectServer.zid);
		}
		else {
			this.doLoginHandler();
		}

	}

	private loginBtnHandler2():void
	{	
		if(PlatformManager.checkIsUseSDK()&&PlatformManager.isLogin==false)
		{
			PlatformManager.login();
			return;
		}

		if (PlatformManager.checkIsUseSDK() && !PlatformManager.checkIsIdnSp() && (PlatformManager.checkIsTWBSp()==true || PlatformManager.checkIsTWShenheSp()==true || PlatformManager.getBigAppid() == "17004000")) 
		{	
			App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_TWLOGIN,this.doLoginHandler,this);
			PlatformManager.heyueCheckServer(ServerCfg.selectServer.zid);
			StatisticsHelper.reportLoadData("5_1");
		}
		else {
			this.doLoginHandler();
		}
	}

	private doLoginHandler():void
	{
		StatisticsHelper.reportLoadData("6_1");
		App.LogUtil.log("gotoSdk");
		// 添加loading动画
		LoginManager.login();
		// this.hideLoginBtn();

	}


	private _accountPanel:BaseDisplayObjectContainer;
	private _maskSp:egret.Shape;
	/**打开输入测试账号面板 */
	private showAccountPanel():void
	{
		this._maskSp = new egret.Shape();
		this._maskSp.graphics.beginFill(TextFieldConst.COLOR_BLACK,0.5);
		this._maskSp.graphics.drawRect(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
		this._maskSp.graphics.endFill();
		this._maskSp.touchEnabled = true;
		this.addChild(this._maskSp);
		this._accountPanel = new BaseDisplayObjectContainer();
		this.addChild(this._accountPanel);

		var bg:egret.Shape=new egret.Shape();
		bg.graphics.beginFill(TextFieldConst.COLOR_BLACK,1);
		bg.graphics.drawRect(0,0,400,300);
		bg.graphics.endFill();
		this._accountPanel.addChild(bg);
		this._accountPanel.x = GameConfig.stageWidth/2  - bg.width/2;
		this._accountPanel.y = GameConfig.stageHeigth/2 - bg.height/2;
		var usernameTF:BaseTextField = new BaseTextField();
		usernameTF.x = 20;
		usernameTF.y = 50;
		usernameTF.text = "账号：";
		this._accountPanel.addChild(usernameTF);

		var usernameBg:egret.Shape=new egret.Shape();
		usernameBg.graphics.beginFill(TextFieldConst.COLOR_LIGHT_RED,1);
		usernameBg.graphics.drawRect(0,0,250,50);
		usernameBg.graphics.endFill();

		usernameBg.graphics.beginFill(TextFieldConst.COLOR_BLACK,1);
		usernameBg.graphics.drawRect(1,1,248,48);
		usernameBg.graphics.endFill();
		usernameBg.x = 110;
		usernameBg.y = usernameTF.y + usernameTF.height/2 - usernameBg.height/2;
		this._accountPanel.addChild(usernameBg);

		
		var usernameInput:BaseTextField = new BaseTextField();
		usernameInput.type = egret.TextFieldType.INPUT;
		usernameInput.width = 250;
		usernameInput.height = usernameTF.height;
		usernameInput.x = 120;
		usernameInput.y = 50;


		var inviteUidTF:BaseTextField = new BaseTextField();
		inviteUidTF.x = 20;
		inviteUidTF.y = 150;
		inviteUidTF.text = "邀请者uid：";
		this._accountPanel.addChild(inviteUidTF);

		var inviteUidBg:egret.Shape=new egret.Shape();
		inviteUidBg.graphics.beginFill(TextFieldConst.COLOR_LIGHT_RED,1);
		inviteUidBg.graphics.drawRect(0,0,210,50);
		inviteUidBg.graphics.endFill();

		inviteUidBg.graphics.beginFill(TextFieldConst.COLOR_BLACK,1);
		inviteUidBg.graphics.drawRect(1,1,208,48);
		inviteUidBg.graphics.endFill();
		inviteUidBg.x = 150;
		inviteUidBg.y = inviteUidTF.y + inviteUidTF.height/2 - inviteUidBg.height/2;
		this._accountPanel.addChild(inviteUidBg);

		
		var inviteUidInput:BaseTextField = new BaseTextField();
		inviteUidInput.type = egret.TextFieldType.INPUT;
		inviteUidInput.width = 210;
		inviteUidInput.height = inviteUidTF.height;
		inviteUidInput.x = 160;
		inviteUidInput.y = 150;

		if(GameData.isTest())
		{
		}
		else
		{
			usernameInput.maxChars = 100;
			// usernameInput.restrict="A-Z a-z 0-9 \u4e00-\u9fa5"
		}
		usernameInput.text=PlatformManager.userId;
		this._username=usernameInput.text;
		this._accountPanel.addChild(usernameInput);
		usernameInput.addEventListener(egret.TextEvent.CHANGE, this.callbackInput, this, false, 2);


		this._accountPanel.addChild(inviteUidInput);
		inviteUidInput.addEventListener(egret.TextEvent.CHANGE, this.callbackInviteUidInput, this, false, 2);
		var confirmBtn:BaseButton = ComponentManager.getButton("loginres_btn3","",this.confirmHandler,this);
		confirmBtn.x = this._accountPanel.width/2 - confirmBtn.width/2;
		confirmBtn.y = this._accountPanel.height - 70;
		this._accountPanel.addChild(confirmBtn);

	}

	private callbackInput(event:egret.TextEvent)
	{
		this._username = event.target.text;
		App.LogUtil.log("event.target.text:" + event.target.text);
	}
	private callbackInviteUidInput(event:egret.TextEvent)
	{
		this._inviteUid = event.target.text;
		App.LogUtil.log("event.target.text:" + event.target.text);
	}

	private setLoginByPID(pid:string):void
	{
		if(this._accountPanel)
		{
			this._accountPanel.dispose();
			this._accountPanel = null;
		}
		PlatformManager.userId = pid;
		this.loginBtnHandler();
	}

	private confirmHandler():void
	{
		if(this._username.length > 100)
		{
			App.CommonUtil.showTip("账号不能超过100位字符");
			return;
		}
		else if(this._username.length < 3)
		{
			App.CommonUtil.showTip("账号最少三个字符");
			return;
		}
		if(this._accountPanel)
		{
			this._accountPanel.dispose();
			this._accountPanel = null;
		}
		if(this._maskSp && this.contains(this._maskSp))
		{
			this.removeChild(this._maskSp);
			this._maskSp = null;
		}
		PlatformManager.userId = this._username;
		PlatformManager.inviter_uid = this._inviteUid;
		if(ServerCfg.selectServer&&ServerCfg.selectServer.zid)
		{
		}
		else
		{
			this.getCfg(this.refresh,this);
		}
	}

	public hideLoginBtn():void
	{
		if(this._serverContainer)
		{
			this._serverContainer.visible = false;
		}
		if(this._serverBg)
		{
			this._serverBg.visible = false;
		}
		if(this._switchAccountBtn)
		{
			this._switchAccountBtn.visible = false;
		}
		if(this._loginButton)
		{
			this._loginButton.visible = false;
		}
		if(this._noticeButton)
		{
			this._noticeButton.visible = false;
		}
	}
	
	private switchAccountHandler(param:any):void
	{
		App.LogUtil.log("switchAccountHandler");
		if(PlatformManager.checkIsUseSDK())
		{
			App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_LOGOUT,this.hideSwitchBtn,this);
			let result:boolean = PlatformManager.logout();
			if(result)
			{
				this.hideSwitchBtn();
			}
		}
		else
		{
			ServerCfg.clear();
			this._isAgreement = false;
			GameData.notCreated = false;
			LoginManager.inSDKAccountSwitching=true;
			this.showAccountPanel();
		}
	}

	private backToLobbyHandler():void
	{	
		SoundManager.isInBackground = true;
		SoundManager.pauseBg();
		PlatformManager.logout();
	}

	protected getTitleStr():string
	{
		return null;
	}
	

	private hideSwitchBtn():void
	{
		ServerCfg.clear();
		this._isAgreement = false;
		GameData.notCreated = false;
		if(this._switchAccountBtn)
		{
			this._switchAccountBtn.visible=false;
		}
		if(PlatformManager.checkIsKRSp())
		{
			PlatformManager.login();
		}
	}

	private clickSelectedHandler(event:egret.TouchEvent):void
	{
		var target = this._serverContainer;
		let lastScaleX:number=target.scaleX;
		let lastScaleY:number=target.scaleY;
		switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				target.setScale(0.95);
				break;
			case egret.TouchEvent.TOUCH_END:
				target.setScale(1);
				// todo 打开选服界面
				ViewController.getInstance().openView(ViewConst.POPUP.SERVERLISTPOPUPVIEW);
				break;	
			case egret.TouchEvent.TOUCH_CANCEL:
				target.setScale(1);
				break;	
		}
		target.x+=(target.width*lastScaleX-target.width*target.scaleX)/2;
		target.y+=(target.height*lastScaleY-target.height*target.scaleY)/2;
	}

	protected getSoundBgName():string
	{
		// let className:string=this.getClassName().toLowerCase();
		// className=className.substring(0,className.indexOf("view"));
		// return "music_"+className;
		return null;
	}

	//新服预约
	private showActivityIcon():void{
		//新服预约活动
		App.LogUtil.log("showActivityIcon");
		if (Api.acnewappointApi && Api.acnewappointApi.isShowNpc && Api.acnewappointApi.isShowNpc()){
			App.LogUtil.log("showActivityIcon 111");
			if (!this._newAppointBtn){
				let newAppointBtn = ComponentManager.getButton("acnewappoint_previewbtn_icon-1", "", ()=>{
					ViewController.getInstance().openView(ViewConst.COMMON.ACNEWAPPOINTPREVIEWVIEW);
				}, this);
				newAppointBtn.setPosition(10, this._loginButton.y);
				this.addChild(newAppointBtn);
				this._newAppointBtn = newAppointBtn;
			}
			this.freshActivityIcon();
		}
	}

	private freshActivityIcon(evt?:egret.Event):void{
		if (Api.acnewappointApi && Api.acnewappointApi.isShowNpc && Api.acnewappointApi.isShowNpc()){
			if (!this._newAppointBtn){
				let newAppointBtn = ComponentManager.getButton("acnewappoint_previewbtn_icon-1", "", ()=>{
					ViewController.getInstance().openView(ViewConst.COMMON.ACNEWAPPOINTPREVIEWVIEW);
				}, this);
				newAppointBtn.setPosition(10, this._loginButton.y);
				this.addChild(newAppointBtn);
				this._newAppointBtn = newAppointBtn;
			}
			App.LogUtil.log("freshActivityIcon "+Api.acnewappointApi.checkRedPoint());
			if (Api.acnewappointApi.checkRedPoint()){
				App.CommonUtil.addIconToBDOC(this._newAppointBtn);
				let redDot = <BaseBitmap>this._newAppointBtn.getChildByName("reddot");
				redDot.x = this._newAppointBtn.width - 30;
				redDot.y = 2;
			}
			else{
				App.CommonUtil.removeIconFromBDOC(this._newAppointBtn);
			}
		}
		else{
			if (this._newAppointBtn){
				this._newAppointBtn.dispose();
				this._newAppointBtn = null;
			}
		}
	}

	public dispose():void
	{
		// LoginView.isShowed=false;
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RSDK_INIT_SUCCESS,PlatformManager.login,PlatformManager);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RSDK_INIT_SUCCESS,this.preInit,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_LOGOUT,this.hideSwitchBtn,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_PLAT_LOGIN_SUCCESS,this.sdkLoginSuccess,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST,this.refresh,this);
		GameConfig.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.playBgMusic,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_TWLOGIN,this.doLoginHandler,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACNEWAPPOINT_MODEL_REFRESH, this.freshActivityIcon, this);
		
		this._serverContainer=null;
		if(this._switchAccountBtn)
		{
			this._switchAccountBtn.dispose();
			this._switchAccountBtn = null;
		}
		this._touchNum=0;
		this._lastTouchTime=0;
		this._checkBox = null;
		this._isAgreement = false;
		this._isShowedSpecialUser = false;
		this._changeLineBtn=null;
		// this._isnotice = false;
		this._newAppointBtn = null;

		super.dispose();
	}
}