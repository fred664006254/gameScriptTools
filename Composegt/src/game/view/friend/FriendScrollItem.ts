/**
 * 好友 
 * author yanyuling
 * ddate 2018/06/21
 * @class FriendScrollItem
 */
class FriendScrollItem extends ScrollListItem
{
	public static UITYPE1:string = "UITYPE1" //我的好友
	public static UITYPE2:string = "UITYPE2" //结交好友
	public static UITYPE3:string = "UITYPE3" //好友申请
	public static UITYPE4:string = "UITYPE4" //屏蔽列表
	public static UITYPE5:string = "UITYPE5" //领取礼物
	public static UITYPE6:string = "UITYPE6" //我的申请
	public static UITYPE7:string = "UITYPE7" //亲家

	private _uiType:string = "";
	private _bg:BaseBitmap;
	private _uiData:any;
	private _titleTxt:BaseTextField;
	private _titleArrow:BaseBitmap;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any):void
	{
		this._uiData = data;
		if(this._uiData.sadTitle || this._uiData.friendsTitle){
			let titlebg = BaseBitmap.create("public_listbtn");
			titlebg.width = 622;
			this.addChild(titlebg);
			titlebg.addTouchTap(this.titlebgHandler,this);

			this._titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("friendPageName1"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
			this._titleTxt.x = titlebg.x + titlebg.width/2 - 40;
			this._titleTxt.y = titlebg.y + 15;
			this.addChild(this._titleTxt);
			this._titleArrow = BaseBitmap.create('friends_arrow2');
			this._titleArrow.x = this._titleTxt.x +45;
			this._titleArrow.y = titlebg.y + 25;
			this._titleArrow.anchorOffsetY = this._titleArrow.height / 2;
			// this._titleArrow.scaleY = -1;
			this.addChild(this._titleArrow);

			

			if(this._uiData.friendsTitle){
				this._titleTxt.text = LanguageManager.getlocal("friendPageName2");
				this._titleArrow.scaleY = Api.friendVoApi.isHideFriendsList() ? -1 : 1;
			}else{
				this._titleArrow.scaleY = Api.friendVoApi.isHideSaduList() ? -1 : 1;
			}
			
			if(PlatformManager.checkIsTextHorizontal() || PlatformManager.checkIsJPSp() || PlatformManager.checkIsKRSp() || PlatformManager.checkIsViSp()||PlatformManager.checkIsKRNewSp() )
			{
				this._titleTxt.x = titlebg.x + titlebg.width / 2 - this._titleTxt.width / 2;
				this._titleArrow.x = titlebg.x + titlebg.width - this._titleArrow.width - 15;
			}
			this.width = 622;
			this.height = titlebg.height;
			return;
		}

		this.width = 622;
		let bg = BaseBitmap.create("public_listbg");
		bg.width = 600;
		bg.height = 129;
		bg.x = 10;
		this._bg = bg;
		this.height = bg.height + this.getSpaceY();
		bg.addTouchTap(this.showUserShot,this);
		//弹窗类型
		if(data.uiType){
			this._uiType = data.uiType;
		}else{
			this._uiType = FriendScrollItem.UITYPE1;
		}
		if(this._uiType == FriendScrollItem.UITYPE4){
			data["name"] = data[4];
			data["uid"] = data[0];
			data["power"] = data[3];
			data["level"] = data[2];
			data["mygname"] = data[6];
			data["olt"] = data[1];
			data["pic"] = data[5];
			data["ptitle"] =  data[7];
		}
		
		this.addChild(bg);

		//通用信息:头像，名字，线，官职，权势，帮会，
		// let avatar = Api.playerVoApi.getPlayerCircleHead(this._uiData.pic, this._uiData.ptitle);
		let avatar = Api.playerVoApi.getPlayerCircleHead(this._uiData.pic,this._uiData.ptitle);
		avatar.x = bg.x+20;
		avatar.y = bg.y + bg.height/2 - avatar.height/2-2;
		this.addChild(avatar);

		let nameStr = data.name;
		nameStr = nameStr ? nameStr : "no-one";
		let nameTxt = ComponentManager.getTextField(nameStr,20,TextFieldConst.COLOR_BROWN);
		nameTxt.x = bg.x +130;
		nameTxt.y = bg.y + 10;
		this.addChild(nameTxt);

		let lineImg =  BaseBitmap.create("public_line1");
		lineImg.name = "lineImg";
		lineImg.y = nameTxt.y + 25;
		this.addChild(lineImg);

		let officeTxt = ComponentManager.getTextField("officeTxt",20,TextFieldConst.COLOR_BROWN);
		officeTxt.text = LanguageManager.getlocal("mainui_officer") +  LanguageManager.getlocal("officialTitle"+this._uiData.level ) ; 
		officeTxt.x = nameTxt.x;
		officeTxt.y = lineImg.y + 10;
		this.addChild(officeTxt);

		let powerTxt = ComponentManager.getTextField("powerTxt",20,TextFieldConst.COLOR_BROWN);
		powerTxt.text = LanguageManager.getlocal("mainui_shili") + this._uiData.power ; 
		powerTxt.x = nameTxt.x;
		powerTxt.y = officeTxt.y + 25;
		this.addChild(powerTxt);

		let allianceTxt = ComponentManager.getTextField("allianceTxt",20,TextFieldConst.COLOR_BROWN);
		let alliName = this._uiData.mygname;
		alliName = alliName != "" ? alliName : LanguageManager.getlocal("allianceRankNoAlliance");
		allianceTxt.text = LanguageManager.getlocal("acRank_myAlliancenick",[alliName]) ; 
		allianceTxt.x = nameTxt.x;
		allianceTxt.y = powerTxt.y + 25;
		this.addChild(allianceTxt);

		

		let onLineTxt = undefined;
		//差异信息: 在线，好感度，各种按钮，进度条，剩余时间，已申请标示
		if(this._uiType == FriendScrollItem.UITYPE1 || this._uiType == FriendScrollItem.UITYPE7){
			if(this._uiType == FriendScrollItem.UITYPE1){
				this.initUIType1();
			}
			// if(this._uiType == FriendScrollItem.UITYPE7){
			// 	let adultfriendTxt = ComponentManager.getTextField("allianceTxt",20,TextFieldConst.COLOR_BROWN);
			// 	adultfriendTxt.text = LanguageManager.getlocal("adultfriendnum",[""+this._uiData.friend]);
			// 	adultfriendTxt.x = this._bg.x + this._bg.width - 75 - adultfriendTxt.width/2 ;
			// 	adultfriendTxt.y = officeTxt.y ;
			// 	this.addChild(adultfriendTxt);

			// 	let info = Api.adultVoApi.getFreiendNums2(this._uiData.friend);
			// 	let progress = ComponentManager.getProgressBar("progress_type1_yellow","progress_type1_bg",102);
			// 	this.setLayoutPosition(LayoutConst.horizontalCentertop, progress, adultfriendTxt, [0,adultfriendTxt.textHeight + 10]);
			// 	this.addChild(progress);
			// 	progress.setPercentage(info.percent, LanguageManager.getlocal(`adultFriendDesc${info.quality}`), TextFieldConst.COLOR_WHITE);
			// }
			onLineTxt = ComponentManager.getTextField(LanguageManager.getlocal("friends_onLine"),20,TextFieldConst.COLOR_BROWN);
			let deltaT = GameData.serverTime - this._uiData.olt;
			if(deltaT > 86400*7)
			{
				deltaT = 86400*7;
			}
			let textStr =  App.DateUtil.getFormatBySecond(deltaT,4);  
			if(textStr == LanguageManager.getlocal("chat_time4")){
				textStr = LanguageManager.getlocal("friends_onLine");
				onLineTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
			}
			onLineTxt.text = textStr;
			onLineTxt.y = this._bg.y + 12;
			onLineTxt.name = "onLineTxt";
			this.addChild(onLineTxt);
		}else if(this._uiType == FriendScrollItem.UITYPE2){
			this.initUIType2();
		}else if(this._uiType == FriendScrollItem.UITYPE3){
			this.initUIType3();
		}else if(this._uiType == FriendScrollItem.UITYPE4){
			this.initUIType4();
		}else if(this._uiType == FriendScrollItem.UITYPE5){
			bg.width = 510;
			this.width = 530;
			lineImg.width *= 0.7;
			this.initUIType5();
		}else if(this._uiType == FriendScrollItem.UITYPE6){
			bg.width = 510;
			this.width = 530;
			lineImg.width *= 0.7;
			this.initUIType6();
		}
		lineImg.x = bg.x + bg.width - lineImg.width - 20;
		// this.width = bg.width;
		this.height = bg.height+8;
		if(onLineTxt){
			onLineTxt.x = this._bg.x + this._bg.width - 75 -onLineTxt.width/2;
		}

	}

	protected titlebgHandler()
	{
		if(this._uiData.sadTitle){
			Api.friendVoApi.hideSaduList(!Api.friendVoApi.isHideSaduList() );
			this._titleArrow.scaleY = Api.friendVoApi.isHideSaduList() ? -1 : 1;
		}

		if(this._uiData.friendsTitle){
			Api.friendVoApi.hideFriendsList(!Api.friendVoApi.isHideFriendsList() );
			this._titleArrow.scaleY = Api.friendVoApi.isHideFriendsList() ? -1 : 1;
		}
	}
	protected userShotCallback(event:egret.Event)
    {
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        let rData = event.data.data;
       	if( rData.ret == 0)
        {
			let data = rData.data.data;
        	ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW,data);
		}
    }

	protected showUserShot()
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._uiData.uid});
	}

	protected initUIType1()
	{
		// if(PlatformManager.checkIsKRSp()){
		// 	return;
		// }
		if(!Api.friendVoApi.isSendEnable(this._uiData.uid))
		{
			let sendFlag = BaseBitmap.create("friends_sendflag");
			sendFlag.x = this._bg.x + this._bg.width - 15 - sendFlag.width;
			sendFlag.y = this._bg.y + 40 ;
			this.addChild(sendFlag); 
		}else{
			let giftBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"friendsBtnTxt7",this.sendGiftBtnHandler,this);
			giftBtn.x = this._bg.x + this._bg.width - giftBtn.width - 10;
			giftBtn.y = this._bg.y + 55;
			giftBtn.name = "giftBtn";
			this.addChild(giftBtn);
		}
	}

	protected initUIType2()
	{
		if(Api.friendVoApi.isAppliedByUid(this._uiData.uid)){
			let applyFlag = BaseBitmap.create("friends_applyflag");
			applyFlag.x = this._bg.x + this._bg.width - 15 - applyFlag.width;
			applyFlag.y = this._bg.y + 40 ;
			this.addChild(applyFlag);
		}else{
			let applyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"friendsBtnTxt12",this.applyBtnHandler,this);
			applyBtn.x = this._bg.x + this._bg.width - applyBtn.width - 10;
			applyBtn.y = this._bg.y + 55;
			applyBtn.name = "applyBtn";
			this.addChild(applyBtn);
		}
	}

	protected initUIType3()
	{
		let acceptBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"friendsBtnTxt17",this.acceptApplyBtnHandler,this);
		acceptBtn.x = this._bg.x + this._bg.width - acceptBtn.width - 10;
		acceptBtn.y = this._bg.y + 55;
		acceptBtn.name = "acceptBtn";
		this.addChild(acceptBtn);

		let ignoreBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE,"friendsBtnTxt16",this.ignoreBtnHandler,this);
		ignoreBtn.x = acceptBtn.x  - ignoreBtn.width - 5;
		ignoreBtn.y = acceptBtn.y ;
		ignoreBtn.name = "ignoreBtn";
		this.addChild(ignoreBtn);
	}

	protected initUIType4()
	{
		let shieldCancelBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"friendsBtnTxt18",this.shieldCancelBtnHandler,this);
		shieldCancelBtn.x = this._bg.x + this._bg.width - shieldCancelBtn.width - 10;
		shieldCancelBtn.y = this._bg.y + 55;
		shieldCancelBtn.name = "shieldCancelBtn";
		this.addChild(shieldCancelBtn);
	}

	protected initUIType5()
	{
		let lastTimeTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		let st0 = App.DateUtil.getWeeTs(GameData.serverTime);
		let st1 = st0 + 86400;
		let lastStr = App.DateUtil.getFormatBySecond(st1 - GameData.serverTime,5);
		lastTimeTxt.text = LanguageManager.getlocal("friends_collectLastTime",[lastStr]);
		lastTimeTxt.y = this._bg.y + 45;
		lastTimeTxt.name = "lastTimeTxt";
		this.addChild(lastTimeTxt);

		let collectGiftBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"friendsBtnTxt9",this.collectGiftBtnHandler,this);
		if( Api.friendVoApi.isSendEnable(this._uiData.uid) ){
			collectGiftBtn.setText("friendsBtnTxt10");
		}else{
			this._uiData.send = 1; 
		}
		collectGiftBtn.x = this._bg.x + this._bg.width - collectGiftBtn.width - 15;
		collectGiftBtn.y = this._bg.y + 68;
		collectGiftBtn.name = "collectGiftBtn";
		this.addChild(collectGiftBtn);
		// if(PlatformManager.checkIsKRSp()){
		// 	collectGiftBtn.visible = false;
		// }

		lastTimeTxt.x = collectGiftBtn.x + collectGiftBtn.width/2  - lastTimeTxt.width/2;
	}

	protected initUIType6()
	{
		let applyCancelBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"friendsBtnTxt14",this.applyCancelBtnHandler,this);
		applyCancelBtn.x = this._bg.x + this._bg.width - applyCancelBtn.width - 10;
		applyCancelBtn.y = this._bg.y + 55;
		applyCancelBtn.name = "applyCancelBtn";
		this.addChild(applyCancelBtn);
	}



	protected sendGiftBtnCallback(data: egret.Event): void
    {
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_SENDGIFT),this.sendGiftBtnCallback,this);
        let rData = data.data.data;
       	if( rData.ret == 0)
        {
			let friendFlag = rData.data.friendFlag;
			if(friendFlag){
				Api.friendVoApi.showFriendsNetFlags(friendFlag);
			}else{
				let giftBtn = <BaseButton>this.getChildByName("giftBtn");
				giftBtn.visible = false;
				let sendFlag = BaseBitmap.create("friends_sendflag");
				sendFlag.x = this._bg.x + this._bg.width - 15 - sendFlag.width;
				sendFlag.y = this._bg.y + 40 ;
				this.addChild(sendFlag);
			}
		}
	}
	//赠送礼物
	protected sendGiftBtnHandler()
	{
		if(!Api.friendVoApi.isSendEnable(this._uiData.uid))
		{ 
			return;
		}
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_SENDGIFT),this.sendGiftBtnCallback,this);
		NetManager.request(NetRequestConst.REQUEST_FRIEND_SENDGIFT,{fuid:this._uiData.uid });
	}

	protected collectGiftBtnCallback(data: egret.Event): void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVEGIFT),this.collectGiftBtnCallback,this);
		let rData = data.data.data;
       	if( rData.ret == 0)
        {
			let friendFlag = rData.data.friendFlag;
			if(friendFlag){
				Api.friendVoApi.showFriendsNetFlags(friendFlag);
			}else{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_REFRESH_GIFTRED); //刷新领取礼物按钮的红点
				if(this._uiData.send ==0)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("friends_sendtip1",[this._uiData.name]));
				}
			}
		}
	}
	//领取礼物
	protected collectGiftBtnHandler()
	{
		// if(!Api.friendVoApi.isGetGiftEnableByUid(this._uiData.uid))
		// {
		// 	return;
		// }
		if (Api.friendVoApi.getGetGiftTimes() >= GameConfig.config.friendCfg.maxGetNum)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_netFlag5"));
			return;
		}
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVEGIFT),this.collectGiftBtnCallback,this);
		let _backsend = 0;
		if(Api.friendVoApi.isSendEnable(this._uiData.uid))
		{
			_backsend = 1;
		}
		NetManager.request(NetRequestConst.REQUEST_FRIEND_RECEIVEGIFT,{fuid:this._uiData.uid,backsend:_backsend});
	}

	protected applyBtnCallback(data: egret.Event): void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_APPLY),this.applyBtnCallback,this);
		let rData = data.data.data;
       	if( rData.ret == 0)
        {
			let friendFlag = rData.data.friendFlag;
			if(friendFlag){
				Api.friendVoApi.showFriendsNetFlags(friendFlag);
			}else{
				App.CommonUtil.showTip(LanguageManager.getlocal("friends_applyTip1",[this._uiData.name]));
				// let applyBtn = <BaseButton>this.getChildByName("applyBtn");
				// applyBtn.visible = false;
				// let applyFlag = BaseBitmap.create("friends_applyflag");
				// applyFlag.x = this._bg.x + this._bg.width - 15 - applyFlag.width;
				// applyFlag.y = this._bg.y +60 ;
				// this.addChild(applyFlag);	
			}	
		}
	}

	//申请结交
	protected applyBtnHandler()
	{
		if(Api.friendVoApi.isMaxFriendsNums() )
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_applyTip2"));
			return;
		}
		if(Api.friendVoApi.isMaxFriendsApply() )
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_applyTip3",["" + GameConfig.config.friendCfg.maxSendRequest]));
			return;
		}
		//已经申请过
		if(Api.friendVoApi.isAppliedByUid(this._uiData.uid))
		{
			return;
		}
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_APPLY),this.applyBtnCallback,this);
		NetManager.request(NetRequestConst.REQUEST_FRIEND_APPLY,{fuid:this._uiData.uid });
	}


	protected applyCancelCallback(data: egret.Event): void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_CANCELAPPLY),this.applyCancelCallback,this);
		let rData = data.data.data;
       	if( rData.ret == 0)
        {
			let friendFlag = rData.data.friendFlag;
			if(friendFlag){
				Api.friendVoApi.showFriendsNetFlags(friendFlag);
			}else{
				App.CommonUtil.showTip(LanguageManager.getlocal("friends_cancelApplyTip1",[this._uiData.name]));
			}
		}
	}
	//取消申请
	protected applyCancelBtnHandler()
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_CANCELAPPLY),this.applyCancelCallback,this);
		NetManager.request(NetRequestConst.REQUEST_FRIEND_CANCELAPPLY,{fuid:this._uiData.uid});
	}


	protected acceptApplyBtnCallback(data: egret.Event): void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_ACCEPT),this.acceptApplyBtnCallback,this);
		let rData = data.data.data;
       	if( rData.ret == 0)
        {
			let friendFlag = rData.data.friendFlag;
			if(friendFlag){
				Api.friendVoApi.showFriendsNetFlags(friendFlag);
			}else{
				App.CommonUtil.showTip(LanguageManager.getlocal("friends_acceptTip1",[this._uiData.name]));
				// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3);
				NetManager.request(NetRequestConst.REQUEST_FRIEND_GETINFO,{}); //成为好友后，刷新好友列表
			}
		}
	}
	//接受申请
	protected acceptApplyBtnHandler()
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_ACCEPT),this.acceptApplyBtnCallback,this);
		NetManager.request(NetRequestConst.REQUEST_FRIEND_ACCEPT,{fuid:this._uiData.uid });
	}


	protected ignoreBtnCallback(data: egret.Event): void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_REFUSE),this.ignoreBtnCallback,this);
		let rData = data.data.data;
       	if( rData.ret == 0)
        {
			let friendFlag = rData.data.friendFlag;
			if(friendFlag){
				Api.friendVoApi.showFriendsNetFlags(friendFlag);
			}else{
				App.CommonUtil.showTip(LanguageManager.getlocal("friends_ignoreTip1"));
			}
		}
	}
	//忽略
	protected ignoreBtnHandler()
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_REFUSE),this.ignoreBtnCallback,this);
		NetManager.request(NetRequestConst.REQUEST_FRIEND_REFUSE,{fuid:this._uiData.uid });
	}
	//取消屏蔽
	protected shieldCancelBtnHandler()
	{
		NetManager.request(NetRequestConst.REQUEST_CHAT_UNBLOCK, { fuid:this._uiData.uid});
		App.CommonUtil.showTip(LanguageManager.getlocal("friends_shileTip1",[this._uiData.name]));
	}
	//屏蔽	
	protected shieldBtnHandler()
	{
		// NetManager.request(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVEGIFT),{});
	}

	public getSpaceX():number
	{
		return 4;
	}

	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{	
		this._uiType = "";
		this._bg = null;
		this._uiData = null;
		this._titleTxt =null;
		this._titleArrow = null;
		super.dispose();
	}
}