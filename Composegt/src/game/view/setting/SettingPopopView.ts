/**
 * 设置
 * author dky
 * date 2017/11/10
 * @class SettingPopopView
 */
class SettingPopopView  extends PopupView
{   
    private _type:string = "";

	private _soundBB:BaseBitmap;
	private _soundState:BaseTextField;
	private _soundText:BaseTextField;
	private _serviceType:number = 0;

	public constructor() 
	{
		super();
	}

	protected initView():void
	{

		
		// itemInfo.ic
		let bg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		bg.width = 520;
		bg.height = 370;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 15;
		this.addChildToContainer(bg);

		// let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		// bg2.width = 500;
		// bg2.height = 280;
		// bg2.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2+10;
		// bg2.y = 95;
		// this.addChildToContainer(bg2);

		let descBg = BaseBitmap.create("public_ts_bg01");
		descBg.width = 280;
		descBg.y = bg.y + 15;
		descBg.x = this.viewBg.width/2 - descBg.width/2;
		this.addChildToContainer(descBg);
	
		let descText = ComponentManager.getTextField(LanguageManager.getlocal("settingAcountInfo"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
		descText.x = this.viewBg.width / 2 - descText.width/2;
		descText.y = descBg.y + descBg.height/2 - descText.height/2;// bg.y + 20;
		this.addChildToContainer(descText);

		// let leftLine = BaseBitmap.create("public_v_huawen01");
		// leftLine.x = descText.x - 40 - leftLine.width;
		// leftLine.y = descText.y + descText.height/2 - leftLine.height/2

		// let rightLine = BaseBitmap.create("public_v_huawen01");
		// rightLine.scaleX = -1;
		// rightLine.x = descText.x + descText.width + 40 + rightLine.width;
		// rightLine.y = descText.y + descText.height/2 - rightLine.height/2
		// this.addChildToContainer(leftLine);
		// this.addChildToContainer(rightLine);


		let nameTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingUserName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
		nameTitleText.x = bg.x + 50;//90;//descText.x;
		nameTitleText.y = bg.y + 70;//145; //descText.y + nameTitleText.height + 15;
		this.addChildToContainer(nameTitleText);

		let nameText = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
		nameText.x = nameTitleText.x + nameTitleText.width;
		nameText.y = nameTitleText.y ;
		this.addChildToContainer(nameText);


		if(PlatformManager.checkIs3KSubSp()&&Api.switchVoApi.checkOpenShenhe()==false)
		{
			let guidTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingUserGUID"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
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
		

		let idTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingID"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
		idTitleText.x = nameTitleText.x;
		idTitleText.y = nameTitleText.y + idTitleText.height + 10;
		this.addChildToContainer(idTitleText);

		let idText = ComponentManager.getTextField(Api.playerVoApi.getPlayerID().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
		idText.x = idTitleText.x + idTitleText.width;
		idText.y = idTitleText.y ;
		this.addChildToContainer(idText);

		let zoneTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingZone"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
		zoneTitleText.x = nameTitleText.x;
		zoneTitleText.y = idText.y + zoneTitleText.height + 10;
		this.addChildToContainer(zoneTitleText);

		let zoneText = ComponentManager.getTextField(Api.mergeServerVoApi.getAfterMergeSeverName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
		zoneText.x = zoneTitleText.x + zoneTitleText.width;
		zoneText.y = zoneTitleText.y ;
		this.addChildToContainer(zoneText);


		this._soundText = ComponentManager.getTextField(LanguageManager.getlocal("settingSound"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
		this._soundText.x = nameTitleText.x;
		this._soundText.y = zoneText.y + this._soundText.height + 25;
		this.addChildToContainer(this._soundText);


		this._soundBB = BaseBitmap.create("btn_swicth_new");
		this._soundBB.x = this._soundText.x + this._soundText.width ;
		this._soundBB.y = this._soundText.y + this._soundText.height/2 - this._soundBB.height/2;
		this.addChildToContainer(this._soundBB);
		this._soundBB.addTouchTap(this.sonndHander,this);
		// this._soundBB.addTouch(this.sonndHander,this,null);	


		this._soundState = ComponentManager.getTextField("ON", 18, TextFieldConst.COLOR_BROWN_NEW);
		this._soundState.x = this._soundBB.x + 25;
		this._soundState.y = this._soundBB.y + this._soundBB.height/2 - this._soundState.height/2;
		this.addChildToContainer(this._soundState);

		this._type = LocalStorageManager.get(LocalStorageConst.LOCAL_SOUND_SWITCH);
		let color = TextFieldConst.COLOR_WHITE;
		if(this._type == ""){
			this._type = "ON";
		}
		if(this._type != "ON"){
			this._soundBB.skewY = 180;
			this._soundBB.x = this._soundBB.x + this._soundBB.width;
			this._soundState.x = this._soundBB.x - 55;
			color = 0xead39c;
		}else{
			
		}
		this._soundState.text = this._type;
		this._soundState.textColor = color;

		if(Api.switchVoApi.checkOpenSettingWife())
		{

			let wifeSwitchTxt = ComponentManager.getTextField(LanguageManager.getlocal("settingWife"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
			wifeSwitchTxt.x = 280;
			wifeSwitchTxt.y = zoneTitleText.y;
			this.addChildToContainer(wifeSwitchTxt);


			let wifeSwitch = ComponentManager.getSwith(GameData.wifeSwitch,this.wifeSwitch,this)
			wifeSwitch.x = wifeSwitchTxt.x + wifeSwitchTxt.width ;
			wifeSwitch.y = wifeSwitchTxt.y + wifeSwitchTxt.height/2 - wifeSwitch.height/2;
			this.addChildToContainer(wifeSwitch);
		}

		if(Api.switchVoApi.checkOpenBuleWife())
		{

			let bulewitchTxt = ComponentManager.getTextField(LanguageManager.getlocal("setting_buleswitch"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
			bulewitchTxt.x = nameTitleText.x;
			bulewitchTxt.y = this._soundText.y + this._soundText.height + 30;
			this.addChildToContainer(bulewitchTxt);

			let open =true;
			if(Api.gameinfoVoApi.getSexswitch()!=1)
			{
				open = false;
			}
			let wifeSwitch = ComponentManager.getSwith(open,this.blueWifeSwitch,this)
			wifeSwitch.x = bulewitchTxt.x + bulewitchTxt.width ;
			wifeSwitch.y = bulewitchTxt.y + bulewitchTxt.height/2 - wifeSwitch.height/2;
			this.addChildToContainer(wifeSwitch);
		}

		let line = BaseBitmap.create("public_line4");
		line.width = 463;
		line.x = this.viewBg.width/2 - line.width/2;
		line.y = bg.y + 270;
		this.addChildToContainer(line);
		
		let btnIndex:number=0;
		let btnX:number=bg.x+25;
		let btnY:number=line.y + line.height + 15;
		let setBtnPos=function(btn:BaseButton)
		{
			btn.x = btnX+(btnIndex%3)*(btn.width + 30);
			btn.y = btnY+Math.floor(btnIndex/3)*70;
			btnIndex++;
		};
		// if(PlatformManager.checkIsLocal())
		// {
			let changeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"settingChangeAchount",this.changeHandler,this);
			setBtnPos(changeBtn);
			// changeBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(changeBtn);
			// btnX=changeBtn.x + changeBtn.width + 30;
		// }

		let isShowWxCdk = true;
		if(!PlatformManager.checkIsWxH5Sp()&&PlatformManager.checkIsWxmgSp()&&!PlatformManager.fk_cdk)
		{
			isShowWxCdk = false;
		}
 
		if(isShowWxCdk&& Api.switchVoApi.checkOpenShenhe()==false&& Api.switchVoApi.checkTWShenhe()==false&&!PlatformManager.checkIsJPSp()&&!PlatformManager.checkIsKRNewSp())
		{	
			let cdkBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"settingCDK",this.cdkHander,this);
			setBtnPos(cdkBtn);
			// cdkBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(cdkBtn);
		}
		if(Api.switchVoApi.checkOpenShenhe()==false&&PlatformManager.checkIsJPSp())
		{
			let jumpjpBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.jumpJP,this);
			jumpjpBtn.setText("公式サイト",false);
			setBtnPos(jumpjpBtn);
			// cdkBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(jumpjpBtn);

			let twitter = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.jumpTwitter,this);
			twitter.setText("Twitter",false);
			setBtnPos(twitter);
			// cdkBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(twitter);
		}
	
		let contact:string[]=PlatformManager.getContact();
		this._serviceType = PlatformManager.getCustomerServiceType();
		console.log("QAZ fkcw getCustomerServiceType "+this._serviceType);
		if( this._serviceType>0 || ((contact&&contact.length>0) || PlatformManager.checkIsTWBSp() || PlatformManager.checkIs3KSubSp())&&Api.switchVoApi.checkOpenShenhe()==false)
		{
			let contactBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"settingContact",this.contackHander,this);
			setBtnPos(contactBtn);
			// contactBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(contactBtn);
		}

		if(PlatformManager.checkIsKRNewSp()|| PlatformManager.checkIsTWBSp()==true && PlatformManager.checkIsWeiduan()==true)
		{
			let contactBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"settingUserCenter",this.openUserCenter,this);
			setBtnPos(contactBtn);
			// contactBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(contactBtn);
		}

		// let chatblockBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"chatblockViewTitle",this.blockHander,this);
		// setBtnPos(chatblockBtn);
		// this.addChildToContainer(chatblockBtn);
		if(PlatformManager.checkIsTWBSp()&&!Api.switchVoApi.checkTWShenhe())
		{
			let urlBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.jumpFacebook,this);
			urlBtn.setText("FB粉絲頁",false);
			setBtnPos(urlBtn);
			// urlBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(urlBtn);
		}

		if(PlatformManager.checkIsKRSp())
		{


			// if(App.DeviceUtil.isIOS()&& Api.switchVoApi.checkOpenShenhe())
			// {

			// }
			// else{
			// 	let urlBtn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.jumpKR2,this);
			// 	urlBtn2.setText("고객센터",false);
			// 	setBtnPos(urlBtn2);
			// 	// urlBtn2.setColor(TextFieldConst.COLOR_BLACK);
			// 	this.addChildToContainer(urlBtn2);
			// }

			if(PlatformManager.checkIsWeiduan())
			{
				let userCenter = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.KRUserCenter,this);
				userCenter.setText("고객센터",false);
				setBtnPos(userCenter);
				// urlBtn1.setColor(TextFieldConst.COLOR_BLACK);
				this.addChildToContainer(userCenter);
			}
			
			// let logout = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.logout,this);
			// logout.setText("logout",false);
			// setBtnPos(logout);
			// // urlBtn1.setColor(TextFieldConst.COLOR_BLACK);
			// this.addChildToContainer(logout);


			let urlBtn1 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.jumpKR1,this);
			urlBtn1.setText("설문조사",false);
			setBtnPos(urlBtn1);
			// urlBtn1.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(urlBtn1);
			
		}

		
	}
	// private logout()
	// {
	// 	LoginManager.changeAccount();
	// }

	private jumpFacebook():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open("https://www.facebook.com/hswswws/");
		}
	}

	private jumpKR1():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open("https://ko.surveymonkey.com/r/QV8GYX7");
		}
	}
	private jumpKR2():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			// window.open("https://cafe.naver.com/yeokcheon");
			RSDKHelper.callNaver();
		}

	}

	private jumpJP():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open("https://jp.37games.com/beauty");
		}
	}


	private jumpTwitter():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open("https://twitter.com/37games_beauty");
		}
	}
	private KRUserCenter():void
	{
		RSDKHelper.sqSDKPresentUserCenterView();
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
		// 		console.log("QAZ fkcw getCustomerService 结果"+data);
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
		
		let color = TextFieldConst.COLOR_WHITE;
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
			this._soundState.x = this._soundBB.x - 55;
			color = 0xead39c;
			SoundManager.pauseBg()
		}else{
			this._soundBB.skewY = 0;
			this._soundBB.x = this._soundText.x + this._soundText.width + 10;
			this._soundState.x = this._soundBB.x + 25;
			if(SoundManager.currBg)
			{
				SoundManager.resumeBg();
			}else{
				SoundManager.playBg("music_city")
			}
			
		}
		this._soundState.text = this._type;
		this._soundState.textColor = color;
	}
	private wifeSwitch(sw:boolean)
	{
		GameData.wifeSwitch = sw;
		if(GameData.wifeSwitch)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				"msg": LanguageManager.getlocal("settingWifeDesc") ,
				"needCancel":false,
				"title":"settingWifeTitle",
				"callback":null,
				"handler":this,
			});
		}

	}

	private blueWifeSwitch(sw:boolean)
	{
		let sflag=0
		if(sw)
		{
			sflag = 1;
		}
		// this._blueWifeSwitch= sflag;
		
		if(Api.gameinfoVoApi.getSexswitch()!=1)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				"msg": LanguageManager.getlocal("setting_buleswitchDesc") ,
				"needCancel":false,
				"title":"blueWife",
				"callback":this.setBlueWifeSwitch,
				"handler":this,
			});
		}
		else{
			Api.gameinfoVoApi.setSexswitch(0);
			this.request(NetRequestConst.REQUEST_USER_REVERSIONSETTING,{stype:1,sflag:0});
		}

	}
	private setBlueWifeSwitch()
	{
		Api.gameinfoVoApi.setSexswitch(1);
		this.request(NetRequestConst.REQUEST_USER_REVERSIONSETTING,{stype:1,sflag:1});
	}

	
    // protected getTitleStr(){
    //     //  this._type = this.param.data.type 
    //     return "adultChooseTypeViewTitle";
    // }


	public dispose():void
	{
		this._type = null;

		this._soundBB = null;
		this._soundState = null;
		this._type = "";
		// this.removeTouchTap();
		this._serviceType = 0;
		// this._blueWifeSwitch=0;

		super.dispose();
	}
}