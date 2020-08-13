/**
 * 设置
 * author dky
 * date 201711/10
 * @class SettingPopopView
 */
class SettingPopopView  extends PopupView
{   
    private _type:string = "";

	private _soundBB:BaseBitmap;
	private _soundState:BaseTextField;
	private _soundText:BaseTextField;
	private _voiceText:BaseTextField;
	private _nationalText:BaseTextField;
	private _serviceType:number = 0;
	private _checkFlag:BaseBitmap;
	private _checkFlag2:BaseBitmap;
	private _cantoneseText:BaseTextField;
	/**策略的开关 */
	private _strategySwitch:BaseBitmap;

	private _strategyText:BaseTextField;
	/**策略的 on or off */
	private _strategyState:BaseTextField;
	/**策略的本地数据 */
	private _strategyType:string = "";
	
	private _serverTime:BaseTextField = null;


	private _bluewifeSwitch:BaseBitmap;
	private _bluewifeText:BaseTextField;
	private _bluewifeState:BaseTextField;
	private _bluewifeType:string = "";

	private _hidewifeSwitch:BaseBitmap;
	private _hidewifeText:BaseTextField;
	private _hidewifeState:BaseTextField;
	private _hidewifeType:string = "";

	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat(
			[
			"hold_dinner_box", 
			"hold_dinner_check",
			"settingview_line",
			]);
	}

	protected initView():void
	{

		
		// itemInfo.ic
		// let bg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		let bg = BaseBitmap.create("public_9_bg93");
		bg.width = 530;
		bg.height = Api.switchVoApi.checkOpenHideVip() ? 350 : 310;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 10;
		this.addChildToContainer(bg);

		let accountTitleBg = BaseBitmap.create("public_9_bg95");
		this.addChildToContainer(accountTitleBg);
		
		let descText = ComponentManager.getTextField(LanguageManager.getlocal("settingAcountInfo"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		accountTitleBg.width = descText.width + 120;
		accountTitleBg.setPosition(bg.x + bg.width/2 - accountTitleBg.width/2, bg.y + 10);
		descText.x = accountTitleBg.x + accountTitleBg.width/2 - descText.width/2;
		descText.y = accountTitleBg.y + accountTitleBg.height/2 - descText.height/2 + 2;
		this.addChildToContainer(descText);

		if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang())
		{
			let utcDiff:number = App.DateUtil.getDiffLocalAndSvrTimeZone();
			let refreshTime:number = 0;
			if (utcDiff <= 0 )
			{	
				refreshTime = 24 - utcDiff;
			}
			else
			{
				refreshTime = utcDiff;
			}
			refreshTime = refreshTime%24;

			let refreshStr:string = refreshTime+":00";

			let zoneStr:string;
			if (GameData.timeZone <0)
			{
				zoneStr = String(GameData.timeZone);
			}
			else 
			{
				zoneStr = "+" + String(GameData.timeZone);
			}
			descText.text = LanguageManager.getlocal("refreshTimeUTC",[refreshStr,zoneStr]);
			descText.x = accountTitleBg.x + accountTitleBg.width/2 - descText.width/2;
		}
		

		let nameTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingUserName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		// nameTitleText.x = descText.x;
		nameTitleText.x = bg.x + 20;
		nameTitleText.y = descText.y + nameTitleText.height + 25;
		this.addChildToContainer(nameTitleText);

		let nameText = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0x635346);
		nameText.x = nameTitleText.x + nameTitleText.width;
		nameText.y = nameTitleText.y ;
		this.addChildToContainer(nameText);

		// let versionText = ComponentManager.getTextField(LanguageManager.getlocal("settingVersion",[GameConfig.version]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0x635346);
		// versionText.x = nameText.x + nameText.width + 50;
		// versionText.y = nameTitleText.y ;
		// this.addChildToContainer(versionText);

		if(PlatformManager.checkIs3KSubSp()&&Api.switchVoApi.checkOpenShenhe()==false)
		{
			let guidTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingUserGUID"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
			guidTitleText.textFlow=new Array<egret.ITextElement>({text:LanguageManager.getlocal("settingUserGUID"),style:{underline:true}});
			guidTitleText.x = 300;
			guidTitleText.y = nameTitleText.y ;
			guidTitleText.addTouchTap(this.idTouchHandler,this,null);
			this.addChildToContainer(guidTitleText);

			// let guidText = ComponentManager.getTextField(PlatformManager.client3k.getGUID(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			// guidText.x = guidTitleText.x + guidTitleText.width;
			// guidText.y = guidTitleText.y ;
			// this.addChildToContainer(guidText);
			// guidText.addTouchTap(this.idTouchHandler,this,null);
		}
		

		let idTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingID"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		idTitleText.x = nameTitleText.x;
		idTitleText.y = nameTitleText.y + idTitleText.height + 15;
		this.addChildToContainer(idTitleText);

		let idText = ComponentManager.getTextField(Api.playerVoApi.getPlayerID().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0x635346);
		idText.x = idTitleText.x + idTitleText.width;
		idText.y = idTitleText.y ;
		this.addChildToContainer(idText);

		let zoneTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingZone"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		zoneTitleText.x = nameTitleText.x;
		zoneTitleText.y = idText.y + zoneTitleText.height + 15;
		this.addChildToContainer(zoneTitleText);

		let zoneText = ComponentManager.getTextField(Api.mergeServerVoApi.getAfterMergeSeverName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0x635346);
		zoneText.x = zoneTitleText.x + zoneTitleText.width;
		zoneText.y = zoneTitleText.y ;
		this.addChildToContainer(zoneText);

		let line = BaseBitmap.create("settingview_line");
		line.setPosition(bg.x + bg.width/2 - line.width/2, zoneText.y + zoneText.height + 10);
		this.addChildToContainer(line);

		this._soundText = ComponentManager.getTextField(LanguageManager.getlocal("settingSound"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		this._soundText.x = nameTitleText.x;
		this._soundText.y = zoneText.y + this._soundText.height + 40;
		this.addChildToContainer(this._soundText); 

		this._soundBB = BaseBitmap.create("btn_swicth");
		this._soundBB.x = this._soundText.x + this._soundText.width + 10;
		this._soundBB.y = this._soundText.y + this._soundText.height/2 - this._soundBB.height/2;
		this.addChildToContainer(this._soundBB);
		this._soundBB.addTouchTap(this.sonndHander,this);
		// this._soundBB.addTouch(this.sonndHander,this,null);	


		this._soundState = ComponentManager.getTextField("ON", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._soundState.x = this._soundBB.x + 15;
		this._soundState.y = this._soundBB.y + this._soundBB.height/2 - this._soundState.height/2;
		this.addChildToContainer(this._soundState);

		this._type = LocalStorageManager.get(LocalStorageConst.LOCAL_SOUND_SWITCH);
		let color = TextFieldConst.COLOR_WARN_GREEN;
		if(this._type == ""){
			this._type = "ON";
		}
		if(this._type != "ON"){
			this._soundBB.skewY = 180;
			this._soundBB.x = this._soundBB.x + this._soundBB.width;
			this._soundState.x = this._soundBB.x - 53;
			color = 0xb1b1b1;
		}else{
			
		}
		this._soundState.text = this._type;
		this._soundState.textColor = color;
		
		let btnIndex:number=0;
		let btnX:number=bg.x+5;
		let btnY:number=bg.y + bg.height + 15;
		let setBtnPos=function(btn:BaseButton)
		{
			btn.x = btnX+(btnIndex%3)*(btn.width + 8);
			btn.y = btnY+Math.floor(btnIndex/3)*70;
			btnIndex++;
		};
		let btnList:BaseButton[] = []
		// if(PlatformManager.checkIsLocal())
		// {
			let changeBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"settingChangeAchount",this.changeHandler,this);
			setBtnPos(changeBtn);
			changeBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(changeBtn);
			btnList.push(changeBtn);
			// btnX=changeBtn.x + changeBtn.width + 30;
		// }

 
		if (Api.switchVoApi.checkOpenShenhe() == false && Api.switchVoApi.checkTWShenhe() == false && PlatformManager.checkIsIOSShenheSp() == false && (Number(ServerCfg.selectServer.zid) <= 990 || Number(ServerCfg.selectServer.zid) > 999))
		{	
			let cdkBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"settingCDK",this.cdkHander,this);
			setBtnPos(cdkBtn);
			cdkBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(cdkBtn);
			btnList.push(cdkBtn);
		}
	
	
		let contact:string[]=PlatformManager.getContact();
		this._serviceType = PlatformManager.getCustomerServiceType();
		console.log("QAZ fkcw getCustomerServiceType "+this._serviceType);
		if( this._serviceType>0 || 
		((contact&&contact.length>0) || 
			PlatformManager.checkIsTWBSp()||
			PlatformManager.checkIsThSp() || 
			PlatformManager.checkIsEnSp() || 
			PlatformManager.checkIsRuSp() || 
			PlatformManager.checkIs3KSubSp()|| 
			PlatformManager.checkIsFB()
		) 
		&&Api.switchVoApi.checkOpenShenhe()==false)
		{
			let contactBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"settingContact",this.contackHander,this);
			setBtnPos(contactBtn);
			contactBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(contactBtn);
			btnList.push(contactBtn);
		}

		if( (PlatformManager.checkIsTWBSp()==true || 
			PlatformManager.checkIsRuSp()==true || 
			(PlatformManager.checkIsThSp()==true && PlatformManager.checkIsThHw() == false) || 
			(PlatformManager.checkIsEnSp()==true && PlatformManager.checkIsEnHw() == false) || 
			PlatformManager.checkIsFB()
			) 
		&& (PlatformManager.checkIsWeiduan()==true||App.DeviceUtil.isRuntime2()) && PlatformManager.getAppid()!="17027004")
		{
			let contactBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"settingUserCenter",this.openUserCenter,this);
			setBtnPos(contactBtn);
			contactBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(contactBtn);
			btnList.push(contactBtn);
		}

		// let chatblockBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"chatblockViewTitle",this.blockHander,this);
		// setBtnPos(chatblockBtn);
		// chatblockBtn.setColor(TextFieldConst.COLOR_BLACK);
		// this.addChildToContainer(chatblockBtn);
		if(PlatformManager.checkIsTWBSp() && Api.switchVoApi.checkTWShenhe()==false)
		{
			let urlBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"",this.jumpFacebook,this);
			urlBtn.setText("FB粉絲頁",false);
			setBtnPos(urlBtn);
			urlBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(urlBtn);
			btnList.push(urlBtn);
		}

		if(PlatformManager.checkIsKRSp())
		{
			let urlBtn1 = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"",this.jumpKR1,this);
			urlBtn1.setText("고객센터",false);
			setBtnPos(urlBtn1);
			urlBtn1.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(urlBtn1);
			btnList.push(urlBtn1);
			if ((App.DeviceUtil.isIOS() && Api.switchVoApi.checkOpenShenhe()) || (Number(ServerCfg.selectServer.zid) > 990 && (Number(ServerCfg.selectServer.zid)<1000)))
			{

			}
			else{
				let urlBtn2 = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"",this.jumpKR2,this);
				urlBtn2.setText("역천 카페",false);
				setBtnPos(urlBtn2);
				urlBtn2.setColor(TextFieldConst.COLOR_BLACK);
				this.addChildToContainer(urlBtn2);
				btnList.push(urlBtn2);
			}
			
		}

		if(PlatformManager.checkIsKRSp())
		{
			let urlBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"",this.jumpKakao,this,null,);
			setBtnPos(urlBtn);
			this.addChildToContainer(urlBtn);
			btnList.push(urlBtn);

			let rect1:egret.Rectangle=egret.Rectangle.create();
				rect1.setTo(0,0,34,34);
			let icon:BaseLoadBitmap = BaseLoadBitmap.create("kakaoicon",rect1);
			icon.setPosition(urlBtn.width - rect1.width - 6,urlBtn.height/2 - rect1.height/2);
			urlBtn.addChild(icon);

			let urlText = ComponentManager.getTextField("카톡문의", 20, TextFieldConst.COLOR_BLACK);
			urlText.setPosition(urlBtn.width/2 - urlText.width/2 - 15,urlBtn.height/2 - urlText.height/2);
			urlBtn.addChild(urlText);
		}
		//泰国的FB粉丝 链接
		if(PlatformManager.checkIsThSp())
		{
			let urlBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"",this.jumpFacebook,this);
			urlBtn.setText("เพจเฟสบุ๊ค",false);
			setBtnPos(urlBtn);
			urlBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(urlBtn);
			btnList.push(urlBtn);
		}
		//英文版fb链接
		if(PlatformManager.checkIsEnSp())
		{
			let urlBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"",this.jumpFacebook,this);
			urlBtn.setText("Facebook",false);
			setBtnPos(urlBtn);
			urlBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(urlBtn);
			btnList.push(urlBtn);
		}

		if(Api.switchVoApi.checkOpenPushSetting() && GameData.pushToken)
		{
			let pushBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"settingPush",this.clickPushSetting,this);
			setBtnPos(pushBtn);
			pushBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(pushBtn);
			btnList.push(pushBtn);
		}
		if(PlatformManager.checkIsAreaPkg()&&App.DeviceUtil.isRuntime2()==false&&GameConfig.langList.length>1)
		{
			let changeLangBtn=ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"changeLangBtn",()=>{
				ViewController.getInstance().openView(ViewConst.POPUP.SETTINGLANGPOPUPVIEW);
			},this);
			setBtnPos(changeLangBtn);
			changeLangBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(changeLangBtn);
			btnList.push(changeLangBtn);
		}

		// if (GameData.idcardSwitch==true)
		// {
		// 	let idcardBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"realname2PopupViewTitle",this.jumpIdCard,this);
		// 	setBtnPos(idcardBtn);
		// 	idcardBtn.setColor(TextFieldConst.COLOR_BLACK);
		// 	this.addChildToContainer(idcardBtn);
		// 	btnList.push(idcardBtn);
		// }

		//屏蔽按钮
		// if(1)
		// {
		// 	let pbiBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.blockHander,this);
		// 	pbiBtn.setText(LanguageManager.getlocal('chatShield'),false);
		// 	setBtnPos(pbiBtn);
		// 	pbiBtn.setColor(TextFieldConst.COLOR_BLACK);
		// 	this.addChildToContainer(pbiBtn);
		// 	btnList.push(pbiBtn);
		// }
		//适配只有两个按钮的情况
		if(btnList.length == 2)
		{
			let btn1 = btnList[0];
			let btn2 = btnList[1];
			btn1.x = this.viewBg.width/2 - btn1.width - 30;
			btn2.x = this.viewBg.width/2 + 30;
		}
		if(Api.switchVoApi.checkOpenVoice()) //&&PlatformManager.checkIsTWSoundType()!=2
		{
			this.showSoundType();
		}
		// 游戏策略相关
		this._strategyText = ComponentManager.getTextField(LanguageManager.getlocal("setfqStrategySwitch"),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		this._strategyText.setPosition(this._soundText.x,this._soundText.y + this._soundText.height + 30);
		this.addChildToContainer(this._strategyText);

		this._strategySwitch = BaseBitmap.create("btn_swicth");
		this._strategySwitch.setPosition(this._strategyText.x + this._strategyText.width + 10,this._strategyText.y + this._strategyText.height / 2 - this._strategySwitch.height / 2);
		this.addChildToContainer(this._strategySwitch);
		this._strategySwitch.addTouchTap(this.strategySwitchClick,this);
		
		this._strategyState = ComponentManager.getTextField("ON",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		this._strategyState.setPosition(this._strategySwitch.x + this._strategySwitch.width / 4 - this._strategyState.width / 2,this._strategySwitch.y + this._strategySwitch.height / 2 - this._strategyState.height / 2);
		this.addChildToContainer(this._strategyState);

		this._strategyType = LocalStorageManager.get(LocalStorageConst.LOCAL_FQSTRATEGY_SWITCH);
		if(this._strategyType == "OFF")
		{
			this._strategySwitch.skewY = 180;
			this._strategyState.text = "OFF";
			this._strategyState.x = this._strategySwitch.x + 3 * this._strategySwitch.width / 4 - this._strategyState.width / 2;
			this._strategySwitch.x = this._strategySwitch.x + this._strategySwitch.width;
			this._strategyState.setColor(0xb1b1b1);	
		}
		//转世
		if(Api.switchVoApi.checkOpenBlueWife()){
			App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_REVERSIONSETTING,this.reversionBack,this);
			let wifeSwitchTxt = ComponentManager.getTextField(LanguageManager.getlocal("blueWife"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
			// wifeSwitchTxt.x = 270;
			wifeSwitchTxt.x = 295;
			wifeSwitchTxt.y = this._strategyText.y;
			this.addChildToContainer(wifeSwitchTxt);
			this._bluewifeText = wifeSwitchTxt;

			this._bluewifeSwitch = BaseBitmap.create("btn_swicth");
			this._bluewifeSwitch.setPosition(this._bluewifeText.x + this._bluewifeText.width + 10,this._bluewifeText.y + this._bluewifeText.height / 2 - this._bluewifeSwitch.height / 2);
			this.addChildToContainer(this._bluewifeSwitch);
			this._bluewifeSwitch.addTouchTap(this.bluewifeSwitchClick,this);
			
			this._bluewifeState = ComponentManager.getTextField("ON",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
			this._bluewifeState.setPosition(this._bluewifeSwitch.x + this._bluewifeSwitch.width / 4 - this._bluewifeState.width / 2,this._bluewifeSwitch.y + this._bluewifeSwitch.height / 2 - this._bluewifeState.height / 2);
			this.addChildToContainer(this._bluewifeState);

			this._bluewifeType = Api.gameinfoVoApi.getSexswitch() >= 1 ? "ON" : "OFF";
			if(this._bluewifeType == "OFF")
			{
				this._bluewifeSwitch.skewY = 180;
				this._bluewifeState.text = "OFF";
				this._bluewifeState.x = this._bluewifeSwitch.x + 3 * this._bluewifeSwitch.width / 4 - this._bluewifeState.width / 2;
				this._bluewifeSwitch.x = this._bluewifeSwitch.x + this._bluewifeSwitch.width;
				
				this._bluewifeState.setColor(0xb1b1b1);	
			}
		}
		//隐藏vip
		if(Api.switchVoApi.checkOpenHideVip()){
			App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHER_HIDEVIP,this.hideVipBack,this);
			let hideVipSwitchTxt = ComponentManager.getTextField(LanguageManager.getlocal("hideVip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
			hideVipSwitchTxt.x = this._strategyText.x;
			hideVipSwitchTxt.y = this._strategyText.y + this._strategyText.height + 30;
			this.addChildToContainer(hideVipSwitchTxt);
			this._hidewifeText = hideVipSwitchTxt;

			this._hidewifeSwitch = BaseBitmap.create("btn_swicth");
			this._hidewifeSwitch.setPosition(this._hidewifeText.x + this._hidewifeText.width + 10,this._hidewifeText.y + this._hidewifeText.height / 2 - this._hidewifeSwitch.height / 2);
			this.addChildToContainer(this._hidewifeSwitch);
			this._hidewifeSwitch.addTouchTap(this.hidewifeSwitchClick,this);
			
			this._hidewifeState = ComponentManager.getTextField("ON",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
			this._hidewifeState.setPosition(this._hidewifeSwitch.x + this._hidewifeSwitch.width / 4 - this._hidewifeState.width / 2,this._hidewifeSwitch.y + this._hidewifeSwitch.height / 2 - this._hidewifeState.height / 2);
			this.addChildToContainer(this._hidewifeState);

			this._hidewifeType = Api.otherInfoVoApi.getOpenHideVip() ? "ON" : "OFF";
			if(this._hidewifeType == "OFF")
			{
				this._hidewifeSwitch.skewY = 180;
				this._hidewifeState.text = "OFF";
				this._hidewifeState.x = this._hidewifeSwitch.x + 3 * this._hidewifeSwitch.width / 4 - this._hidewifeState.width / 2;
				this._hidewifeSwitch.x = this._hidewifeSwitch.x + this._hidewifeSwitch.width;
				this._hidewifeState.setColor(0xb1b1b1);	
			}
		}

	}
	/**策略开关的监听事件 */
	private strategySwitchClick()
	{
		if(this._strategyType == "OFF")
		{
			this._strategySwitch.skewY = 0;
			this._strategyState.text = "ON";
			this._strategySwitch.x = this._strategyText.x + this._strategyText.width + 10;
			this._strategyState.x = this._strategySwitch.x + this._strategySwitch.width / 4 - this._strategyState.width / 2;
			this._strategyState.setColor(TextFieldConst.COLOR_WARN_GREEN);
			this._strategyType = "ON";
		}
		else
		{
			this._strategySwitch.skewY = 180;
			this._strategyState.text = "OFF";
			this._strategyState.x = this._strategySwitch.x + 3 * this._strategySwitch.width / 4 - this._strategyState.width / 2;
			this._strategySwitch.x = this._strategySwitch.x + this._strategySwitch.width;
			this._strategyState.setColor(0xb1b1b1);
			this._strategyType = "OFF";
		}
		

	}

	/**蓝颜开关的监听事件 */
	private bluewifeSwitchClick()
	{
		let flag = 0;
		if(this._bluewifeType == "OFF"){
			flag = 1;
		}
		else{
			flag = 0;
		}
		NetManager.request(NetRequestConst.REQUEST_USER_REVERSIONSETTING,{stype:1,sflag:flag});
	}

	private hidewifeSwitchClick(){
		let flag = 0;
		if(this._hidewifeType == "OFF"){
			flag = 1;
		}
		else{
			flag = 0;
		}
		NetManager.request(NetRequestConst.REQUEST_OTHER_HIDEVIP,{hideFlag:flag});
	}

	private jumpKakao():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open("http://pf.kakao.com/_kJxkxmC");
		}
	}

	private jumpIdCard():void
	{	
		if (GameData.idcardType==RealnameConst.USERTYPE_3)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("realnameCompleted"));
		}
		else {
			// LoginManager.changeServer();
			ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
		}
	}

	private changeCheckFlagStatus(evt:egret.TouchEvent):void
	{
		this._checkFlag.alpha = (this._checkFlag.alpha+1)%2;  
		if (this._checkFlag.alpha == 1)
		{
			SoundManager.setVoiceOn(false);
			LocalStorageManager.set(LocalStorageConst.LOCAL_VIOICE_SWITCH,"false");
			this._checkFlag2.alpha =0; 
			App.CommonUtil.showTip(LanguageManager.getlocal("national"));
		} 
		 
	}
	private showSoundType():void
	{

		let type = LocalStorageManager.get(LocalStorageConst.LOCAL_VIOICE_SWITCH);  
		//声音
		this._voiceText = ComponentManager.getTextField(LanguageManager.getlocal("voice"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		// this._voiceText.x =270;
		this._voiceText.x = 295;
		this._voiceText.y = this._soundText.y;
		this.addChildToContainer(this._voiceText);
	 
		//国语
		this._nationalText = ComponentManager.getTextField(LanguageManager.getlocal("national"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		this._nationalText.x = this._voiceText.x+this._voiceText.width+10;
		this._nationalText.y = this._soundText.y; 
		this.addChildToContainer(this._nationalText);

		//勾选底
		let probg = BaseBitmap.create("hold_dinner_box")
		probg.x = this._nationalText.x+this._nationalText.width+10;
		probg.y = this._voiceText.y-10;
		this.addChildToContainer(probg);

		this._checkFlag = BaseBitmap.create("hold_dinner_check");
		this._checkFlag.x = probg.x+0;//3
		this._checkFlag.y =	probg.y;
		if(type==""||type=="false")
		{
			this._checkFlag.alpha =1;
		}
		else
		{
			this._checkFlag.alpha =0;
		}
		this.addChildToContainer(this._checkFlag);
		probg.addTouchTap(this.changeCheckFlagStatus,this);


		//粤语
		this._cantoneseText = ComponentManager.getTextField(LanguageManager.getlocal("cantonese"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		this._cantoneseText.x = probg.x+probg.width+10;
		this._cantoneseText.y = this._soundText.y; 
		this.addChildToContainer(this._cantoneseText);

		//勾选底
		let probg2 = BaseBitmap.create("hold_dinner_box")
		probg2.x = this._cantoneseText.x+this._cantoneseText.width+10;
		probg2.y = this._voiceText.y-10;
		this.addChildToContainer(probg2);

		this._checkFlag2 = BaseBitmap.create("hold_dinner_check");
		this._checkFlag2.x = probg2.x+0; //3
		this._checkFlag2.y =probg2.y;
		
		if(type=="false"||type=="")
		{
			this._checkFlag2.alpha =0;
		}
		else if(type=="true")
		{
			this._checkFlag2.alpha =1;
		} 
		else
		{
			this._checkFlag2.alpha =0;
		}
		this.addChildToContainer(this._checkFlag2);
		probg2.addTouchTap(this.changeCheckFlagStatus2,this);
	}
	private changeCheckFlagStatus2(evt:egret.TouchEvent):void
	{
		this._checkFlag2.alpha = (this._checkFlag2.alpha+1)%2;  
		if (this._checkFlag2.alpha == 1)
		{
			LocalStorageManager.set(LocalStorageConst.LOCAL_VIOICE_SWITCH,"true");
			SoundManager.setVoiceOn(true);
			this._checkFlag.alpha =0;
			App.CommonUtil.showTip(LanguageManager.getlocal("cantonese"));
		} 
	} 

	private clickPushSetting():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SETTINGPUSHPOPUPVIEW);
	}

	private jumpFacebook():void
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			if(PlatformManager.checkIsThSp())
			{
				window.open("https://www.facebook.com/com.heyyogame.gdth/?modal=admin_todo_tour");
			}
			else if(PlatformManager.checkIsTWBSp()||PlatformManager.checkIsFBTwSp())
			{
				window.open("https://www.facebook.com/com.heyyogame.gd/");
			} 
			else if(PlatformManager.checkIsEnSp()|| PlatformManager.checkIsFBEnSp()){
				window.open("https://www.facebook.com/com.heyyogame.gden/");
			}		
		}
	}

	private jumpKR1():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open("https://yccs.mayngames.co.kr/support");
		}
	}
	private jumpKR2():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open("https://cafe.naver.com/yeokcheon");
		}
	}

	protected idTouchHandler() {
		PlatformManager.client.getGUID();
	}

	protected openUserCenter() {
		PlatformManager.openUserCenter();
	}

    private changeHandler(param:any):void
	{
		LoginManager.changeServer();
	}
	private contackHander():void
	{
		// if(PlatformManager.checkIs3KSubSp())
		// {
		// 	PlatformManager.client.openServiceCenter();
		// }
		// else if (PlatformManager.checkIsTWBSp()) 
		// {
		// 	PlatformManager.client.openServiceCenter();
		// }
		// else
		// {
		// 	ViewController.getInstance().openView(ViewConst.POPUP.SETTINGCONTACTPOPUPVIEW, {});
		// }

		// if (this._serviceType == 0)
		// {
		// 	ViewController.getInstance().openView(ViewConst.POPUP.SETTINGCONTACTPOPUPVIEW, {type:0});
		// }
		// else if (this._serviceType == 1)
		// {
		// 	PlatformManager.client.openServiceCenter();
		// }
		// else {
		// 	RSDKHelper.getCustomerService((data:any)=>{
		// 		if (data) {
		// 			ViewController.getInstance().openView(ViewConst.POPUP.SETTINGCONTACTPOPUPVIEW, {type:2,info:data});
		// 		} 
		// 	});
		// }
		PlatformManager.getContackService();

	}
	private blockHander():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.CHATBLOCKVIEW, {});
	}
	private cdkHander():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SettingCDKPopupView, {});
	}
	private sonndHander(param:any):void
	{
		
		let color = TextFieldConst.COLOR_WARN_GREEN;
		if(this._type == "" || this._type == "ON" ){
			this._type = "OFF";
		}
		else{
			this._type = "ON";
		}
		LocalStorageManager.set(LocalStorageConst.LOCAL_SOUND_SWITCH,this._type);
		if(this._type != "ON"){
			this._soundBB.skewY = 180;
			this._soundBB.x = this._soundBB.x + this._soundBB.width;
			this._soundState.x = this._soundBB.x - 53;
			color = 0xb1b1b1;
			SoundManager.pauseBg()
		}else{
			this._soundBB.skewY = 0;
			this._soundBB.x = this._soundText.x + this._soundText.width + 10;
			this._soundState.x = this._soundBB.x + 15;
			SoundManager.resumeBg();
		}
		this._soundState.text = this._type;
		this._soundState.textColor = color;
	}
	

	
    // protected getTitleStr(){
    //     //  this._type = this.param.data.type 
    //     return "adultChooseTypeViewTitle";
    // }

	// protected tick():void
	// {
	// 	if (this._serverTime)
	// 	{	
	// 		let zoneStr:string;
	// 		if (GameData.timeZone <0)
	// 		{
	// 			zoneStr = String(GameData.timeZone);
	// 		}
	// 		else 
	// 		{
	// 			zoneStr = "+" + String(GameData.timeZone);
	// 		}

	// 		this._serverTime.text = LanguageManager.getlocal("serverTimeUTC",[App.DateUtil.getFormatBySecond(GameData.serverTime,2),zoneStr]);
	// 	}
	// }
	private hideVipBack(evt : egret.Event):void{
		if(evt.data.ret){
			if(this._hidewifeType == "OFF")
			{
				this._hidewifeSwitch.skewY = 0;
				this._hidewifeState.text = "ON";
				this._hidewifeSwitch.x = this._hidewifeText.x + this._hidewifeText.width + 10;
				this._hidewifeState.x = this._hidewifeSwitch.x + this._hidewifeSwitch.width / 4 - this._hidewifeState.width / 2;
				this._hidewifeState.setColor(TextFieldConst.COLOR_WARN_GREEN);
				this._hidewifeType = "ON";
			}
			else
			{
				this._hidewifeSwitch.skewY = 180;
				this._hidewifeState.text = "OFF";
				this._hidewifeState.x = this._hidewifeSwitch.x + 3 * this._hidewifeSwitch.width / 4 - this._hidewifeState.width / 2;
				this._hidewifeSwitch.x = this._hidewifeSwitch.x + this._hidewifeSwitch.width;
				this._hidewifeState.setColor(0xb1b1b1);
				this._hidewifeType = "OFF";
			}
		}
		else{
			//报错兼容
		}
	}


	private reversionBack(evt : egret.Event):void{
		if(evt.data.ret){
			let flag = 0;
			if(this._bluewifeType == "OFF")
			{
				this._bluewifeSwitch.skewY = 0;
				this._bluewifeState.text = "ON";
				this._bluewifeSwitch.x = this._bluewifeText.x + this._bluewifeText.width + 10;
				this._bluewifeState.x = this._bluewifeSwitch.x + this._bluewifeSwitch.width / 4 - this._bluewifeState.width / 2;
				this._bluewifeState.setColor(TextFieldConst.COLOR_WARN_GREEN);
				this._bluewifeType = "ON";
				flag = 1;
			}
			else
			{
				this._bluewifeSwitch.skewY = 180;
				this._bluewifeState.text = "OFF";
				this._bluewifeState.x = this._bluewifeSwitch.x + 3 * this._bluewifeSwitch.width / 4 - this._bluewifeState.width / 2;
				this._bluewifeSwitch.x = this._bluewifeSwitch.x + this._bluewifeSwitch.width;
				this._bluewifeState.setColor(0xb1b1b1);
				this._bluewifeType = "OFF";
				flag = 0;
			}
			Api.gameinfoVoApi.setSexswitch(flag);
		}
		else{
			//报错兼容
		}
	}

	protected getBgExtraHeight():number{
		return 20;
	}

	protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	public dispose():void
	{
		//有变化才存
		if(this._strategyType != "" &&this._strategyType != LocalStorageManager.get(LocalStorageConst.LOCAL_FQSTRATEGY_SWITCH))
		{
			LocalStorageManager.set(LocalStorageConst.LOCAL_FQSTRATEGY_SWITCH,this._strategyType);
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FQSTRATEG_SWITCH);
		}
		if(Api.switchVoApi.checkOpenBlueWife()){
			App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_REVERSIONSETTING,this.reversionBack,this);
		}
		if(Api.switchVoApi.checkOpenHideVip()){
			App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHER_HIDEVIP,this.hideVipBack,this);
		}
		this._strategyState = null;
		this._strategyText = null;
		this._strategySwitch = null;
		this._strategyType = "";


		this._type = null;

		this._soundBB = null;
		this._soundState = null;
		this._type = "";
		// this.removeTouchTap();
		this._serviceType = 0;
		this._voiceText=null;
		this._serverTime = null;

		super.dispose();
	}
}