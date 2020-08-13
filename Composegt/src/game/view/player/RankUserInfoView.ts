/**
 * 用户信息主界面
 * author dmj
 * date 2017/9/18
 * @class RankUserInfoView
 */
class RankUserInfoView extends CommonView
{
	protected _nodeContainer:BaseDisplayObjectContainer;
	protected _bottomnodeContainer:BaseDisplayObjectContainer;
	private _upgradeClip:CustomMovieClip;
	private _upgradeOfficeBtn:BaseButton;
	private _progressBar:ProgressBar;
	private _expTipTxt:BaseTextField;
	private _changeVTxtList = [];
	private _mainTaskHandKey:string = null;


	private _shieldBtn:BaseButton;
	private _friendsBtn:BaseButton;
	public constructor() 
	{
		super();
	}

	public initView():void
	{	

		// SoundManager.playEffect(SoundConst.EFFECT_WIFE);

		let UIData = this.param.data;
		if(!UIData.crossZone){
			UIData.crossZone = !(Number(UIData.rzid) == Number(ServerCfg.selectServer.zid)); 
			UIData.zid = UIData.rzid;
		}

		let isCrossWifeBattle = false;
		if(UIData.isCrossWifeBattle){
			isCrossWifeBattle = true;
		}


		//自己管理自己的节点
		this._nodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);
		this._bottomnodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._bottomnodeContainer);






		let bg0:BaseBitmap = BaseLoadBitmap.create("playerview_bg2");
		bg0.width = 640;
		bg0.height = 741;
		bg0.y = -20;
		this._nodeContainer.addChild(bg0);

		//角色形象
        let curLv = UIData.level;
		let posX = 20;
		if (UIData.title != "")
		{
			curLv = UIData.title;
			posX = -10;
		}
		let userContainer = Api.playerVoApi.getPlayerPortrait(curLv,UIData.pic);
		userContainer.x = posX;
		userContainer.name = "userContainer";
		this._nodeContainer.addChild(userContainer);
		
		let fanImg = BaseBitmap.create("public_9v_bg10")
		fanImg.width = 208;
		fanImg.height = 224 + 50 ;
		fanImg.x = GameConfig.stageWidth -fanImg.width-20;
		fanImg.y = 75 + (GameConfig.stageHeigth - 960);//160;
		this._nodeContainer.addChild(fanImg);
		
		if(Api.switchVoApi.checkOpenPrestigeShow()){
			fanImg.y = fanImg.y - 8 - 28;
			fanImg.height = fanImg.height + 8 + 28;
		}
		if(UIData.crossZone){
			fanImg.y = fanImg.y - 8 - 28;
			fanImg.height = fanImg.height + 8 + 28;
		}


		let markLeft = BaseBitmap.create("public_v_huawen02");
		markLeft.anchorOffsetX = 4;
		markLeft.scaleX = -1;
		markLeft.x = fanImg.x + fanImg.width/2;
		markLeft.y = fanImg.y + 50 + 50;
		this._nodeContainer.addChild(markLeft);

		let markRight = BaseBitmap.create("public_v_huawen02");
		markRight.anchorOffsetX = 4;
		markRight.x = fanImg.x + fanImg.width/2;
		markRight.y = fanImg.y + 50 + 50;
		this._nodeContainer.addChild(markRight);

		let temX = fanImg.x+100;
		let temY = fanImg.y;



		let nameTF:BaseTextField = ComponentManager.getTextField(UIData.name,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		// nameTF.border = true;
		nameTF.stroke = 1;
		nameTF.borderColor = TextFieldConst.COLOR_BLACK;
		nameTF.x = temX - nameTF.width/2;
		nameTF.y = temY + 20;
		this._nodeContainer.addChild(nameTF);


		let officeText1 =  ComponentManager.getTextField(LanguageManager.getlocal("playerview_officer",[Api.playerVoApi.getPlayerOfficeByLevel(UIData.level)]),24,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		
		officeText1.x = fanImg.x + fanImg.width/2 - officeText1.width/2;
		officeText1.y = nameTF.y + nameTF.height + 10;
		this._nodeContainer.addChild(officeText1); 

		let uidIcon = BaseBitmap.create("playerview_pro13");
		uidIcon.x = 412//422
		uidIcon.y = nameTF.y + nameTF.height + 25 + 50;
		this._nodeContainer.addChild(uidIcon);
		let uidStr = UIData.ruid;

		let textSize = 20;
		if(PlatformManager.checkIsViSp()){
			textSize = 18;
		}
		let uidTF:BaseTextField = ComponentManager.getTextField(uidStr,textSize,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		// uidTF.text = "爽肤水地方是";
		uidTF.anchorOffsetX = uidTF.width;
		uidTF.x = uidIcon.x + 198;//172;
		uidTF.y = uidIcon.y +5;
		if(PlatformManager.checkIsViSp()){
			uidTF.y = uidIcon.y + 8;
		}
		this._nodeContainer.addChild(uidTF);

        let allName = UIData.gname;
		if(allName == "")
		{
			allName = LanguageManager.getlocal("allianceRankNoAlliance");
		}

		let alliIcon = BaseBitmap.create("playerview_pro11");
		alliIcon.x = uidIcon.x;
		alliIcon.y = uidIcon.y + alliIcon.height + 8;
		this._nodeContainer.addChild(alliIcon);


		let allianceTxt:BaseTextField = ComponentManager.getTextField(allName,textSize,TextFieldConst.COLOR_WARN_GREEN_NEW);
		allianceTxt.anchorOffsetX = allianceTxt.width;
		allianceTxt.x = alliIcon.x + 198;
		allianceTxt.y = alliIcon.y +5;
		if(PlatformManager.checkIsViSp()){
			allianceTxt.y = alliIcon.y +8;
		}
		this._nodeContainer.addChild(allianceTxt);


		let poIcon = BaseBitmap.create("playerview_pro12");
		poIcon.x = alliIcon.x;
		poIcon.y = alliIcon.y + poIcon.height + 8;
		this._nodeContainer.addChild(poIcon);

		let poStr = LanguageManager.getlocal("playerview_Nopo");
		let po = UIData.po;
		if(po > 0)
		{
			poStr = LanguageManager.getlocal("allianceMemberPo" + po);
		}
		
		let alliancePoTxt:BaseTextField = ComponentManager.getTextField(poStr,textSize,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		alliancePoTxt.anchorOffsetX = alliancePoTxt.width;
		alliancePoTxt.x = poIcon.x + 198;
		alliancePoTxt.y = poIcon.y+5;
		if(PlatformManager.checkIsViSp()){
			alliancePoTxt.y = poIcon.y+8;
		}
		this._nodeContainer.addChild(alliancePoTxt);
		let vipIcon = null;
		if (UIData.vip > 0)
		{
			vipIcon = BaseBitmap.create("playerview_pro10");
			vipIcon.x = poIcon.x;
			vipIcon.y = poIcon.y + vipIcon.height + 8;
			if(PlatformManager.checkIsViSp()){
				vipIcon.y = poIcon.y + vipIcon.height + 10;
			}
			this._nodeContainer.addChild(vipIcon);



			
            let vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(UIData.vip).icon);
			vipImg.width = 65;
			vipImg.height = 27;
			vipImg.anchorOffsetX = vipImg.width;
			vipImg.x = vipIcon.x + 201;
			vipImg.y = vipIcon.y;
			// vipImg.setScale(0.7)
			this._nodeContainer.addChild(vipImg);
		}
		// mainui_funicon


		let prestigeIcon = null;
		if(Api.switchVoApi.checkOpenPrestigeShow()){
			prestigeIcon = BaseBitmap.create("playerview_pro17");
			prestigeIcon.x = poIcon.x;
			if(vipIcon == null){
				prestigeIcon.y = poIcon.y + poIcon.height + 8;
			} else {
				
				prestigeIcon.y = vipIcon.y + vipIcon.height + 8;
			}
			this._nodeContainer.addChild(prestigeIcon);

			let prestigeTF:BaseTextField = ComponentManager.getTextField(UIData.pem,textSize,TextFieldConst.COLOR_LIGHT_YELLOW);
			// uidTF.text = "爽肤水地方是";
			prestigeTF.anchorOffsetX = prestigeTF.width;
			prestigeTF.x = prestigeIcon.x + 198;
			prestigeTF.y = prestigeIcon.y + 5;
			if(PlatformManager.checkIsViSp()){
				prestigeTF.y = prestigeIcon.y + 8;
			}
			this._nodeContainer.addChild(prestigeTF);


		}

        if(UIData.crossZone){
			let serIcon =  BaseBitmap.create("playerview_pro16");
			serIcon.x = alliIcon.x;

			if(prestigeIcon){
				serIcon.y = prestigeIcon.y + prestigeIcon.height + 8;
			} else {
				if(vipIcon){
					serIcon.y = vipIcon.y + vipIcon.height + 8;
				}else{
					serIcon.y = poIcon.y + poIcon.height + 8;
				}
			}


			
			this._nodeContainer.addChild(serIcon);
			let zidname = Api.mergeServerVoApi.getAfterMergeSeverName(UIData.ruid,false,null);
			let serverTxt = ComponentManager.getTextField(zidname, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
			serverTxt.anchorOffsetX = serverTxt.width;
			serverTxt.x = serIcon.x + 198;
			serverTxt.y = serIcon.y + 5;
			this._nodeContainer.addChild(serverTxt);
		}
		/*
		//称帝入口
		if (Api.switchVoApi.checkOpenPrestige()  && !Api.practiceVoApi.isPracticeOPen() )
		{
			let prestigeBtn:BaseButton = ComponentManager.getButton("btn_prestige","",this.clickPrestigeHandler,this);
			prestigeBtn.setPosition(5, -7);
			this._nodeContainer.addChild(prestigeBtn);
			prestigeBtn.name = "prestige";
			if (Api.prestigeVoApi.isShowRedDot)
			{
				App.CommonUtil.addIconToBDOC(prestigeBtn);
				let dot = prestigeBtn.getChildByName("reddot");
				if (dot)
				{
					dot.x -= 7;
					dot.y += 7;
				}
			}
		}
		*/
		//底部需要往上移动
		let promoDeltaH = 0;
		let probgPath = "playerview_probg";

		
		let _bContainerY =  GameConfig.stageHeigth - this.container.y - 466 -10;
		let btHeight = 0;

		let btY = bg0.y + bg0.height
		this._bottomnodeContainer.y = _bContainerY; //-promoDeltaH
	


		let playerview_powerbg = BaseBitmap.create("playerview_canvas01")
		playerview_powerbg.x = 40;
		playerview_powerbg.y = this._bottomnodeContainer.y - 95;
		this._nodeContainer.addChild(playerview_powerbg);

		// let myPowerImg = ComponentManager.getTextField(LanguageManager.getlocal("playerview_quanshi",[String(Api.playerVoApi.getPlayerPower())]),24,TextFieldConst.COLOR_WARN_YELLOW);
		// myPowerImg.x = playerview_powerbg.x + 30;
		// myPowerImg.y = playerview_powerbg.y + 20 - 7;
		// this._nodeContainer.addChild(myPowerImg);

		let titleText1 = ComponentManager.getTextField(LanguageManager.getlocal("playerview_quanshi",[App.StringUtil.changeIntToText(UIData.power)]),24,TextFieldConst.COLOR_WARN_YELLOW_NEW);;

		titleText1.name = "powerTxt"
		titleText1.x = playerview_powerbg.x + playerview_powerbg.width /2 - titleText1.width/2;
		titleText1.y = playerview_powerbg.y + playerview_powerbg.height /2 - titleText1.height/2;
		// if(PlatformManager.checkIsViSp()){
		// 	titleText1.y += 3 ;
		// }
		this._nodeContainer.addChild(titleText1); 


		//下部信息部分
		let bottomInfoX = bg0.x+29;
		let bottomInfoY = 0;


		// let playerview_probg = BaseBitmap.create(probgPath);
		// playerview_probg.x = 0  ;
		// playerview_probg.y = bottomInfoY;

		let servant_mask = BaseBitmap.create("playerview_centerinfobg");
		servant_mask.width = GameConfig.stageWidth;
		servant_mask.height = 100;
		servant_mask.y = -40;
		this._bottomnodeContainer.addChild(servant_mask);
		// this._bottomnodeContainer.addChild(playerview_probg);
		let proPosY = servant_mask.y + 10;
		let proPosX = GameConfig.stageWidth/2;
		for (var index = 1; index <= 8; index++) {
			// let tmpprocfg = proCfg[index-1]; tmpprocfg.proValue
			let fontSize = 20;
			if(PlatformManager.checkIsViSp()){
				fontSize = 18;
			}

			let proText = ComponentManager.getTextField("",fontSize,TextFieldConst.COLOR_LIGHT_YELLOW);
			proText.name = "proText" + index
			let ModT = 0;
			if(index == 1 || index == 4 || index == 7)
			{
				ModT = -1;
			}else if(index == 3 || index == 6 || index == 8)
			{
				ModT = 1;
			}
			proPosX = GameConfig.stageWidth/2 + ModT*180 ;
			// proPosX = tarWidth/2 + ModT*180;
			if ( index > 1 && index%3 == 1)
			{
				proPosY += 29;
			}
			let imgIdx = index;
			if(index >=7)
			{
				imgIdx +=1;
			}
			let img = BaseBitmap.create("playerview_pro"+imgIdx)
			img.x = proPosX-img.width-5;
			img.y = proPosY - 5;
			this._bottomnodeContainer.addChild(img);

			proText.x = proPosX;
			if(PlatformManager.checkIsViSp()){
				proText.y = img.y+7;
			} else {
				proText.y = img.y+2;
			}
			if(index == 7 && UIData.crossZone){
				proText.visible = false;
				img.visible = false;
			}
			// proText.y = img.y + img.height/2 - proText.height/2 ;
			this._bottomnodeContainer.addChild(proText);
		}
		this.refreshProTxt();
				//下面属性背景
		let bottomBg:BaseBitmap = BaseBitmap.create("public_9v_bg14");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth - this._bottomnodeContainer.y - this.container.y - 69 - 5; // - this.container.y;
		bottomBg.x = 0;
		bottomBg.y = 0 + 65 + 5;
		this._bottomnodeContainer.addChild(bottomBg);


		//拼接 tab下背景
		let bottomBorder = BaseBitmap.create("commonview_border1");
		bottomBorder.width = GameConfig.stageWidth;
		bottomBorder.height = bottomBg.height;
		bottomBorder.x = 0;
		bottomBorder.y = bottomBg.y;
		// this.addChildToContainer(bottomBorder);
		this._bottomnodeContainer.addChild(bottomBorder);

	    
		let bottomTop = BaseBitmap.create("commonview_border2");
		bottomTop.width = GameConfig.stageWidth;
		bottomTop.scaleY = -1;
		bottomTop.x = 0;
		bottomTop.y = bottomBorder.y + 25;
		// this.addChildToContainer(bottomTop);
		this._bottomnodeContainer.addChild(bottomTop);

		let bottomB = BaseBitmap.create("commonview_bottom");
		bottomB.width = GameConfig.stageWidth;
		bottomB.x = 0;
		bottomB.y = bottomBg.y + bottomBg.height - bottomB.height;//GameConfig.stageHeigth - bottomB.height;//bottomBorder.y + bottomBorder.height - bottomB.height;
		// this.addChildToContainer(bottomB);
		this._bottomnodeContainer.addChild(bottomB);
		


		let officeBg = BaseBitmap.create("public_ts_bg01");
		officeBg.width = 343;
		// officeBg.height = 33;
		officeBg.x = GameConfig.stageWidth/2-officeBg.width/2 - 10;
		officeBg.y = bottomBg.y + 20;//bottomBg.y + innerTopBg.height/2 - officeBg.height/2 -10;
		this._bottomnodeContainer.addChild(officeBg);
		//我的官位
		let officeImg = ComponentManager.getTextField(LanguageManager.getlocal("playerRank_title"),24,TextFieldConst.COLOR_BROWN_NEW);
		officeImg.x =GameConfig.stageWidth/2 - officeImg.width /2 ;
		officeImg.y = officeBg.y  + officeBg.height /2 - officeImg.height/2;
		this._bottomnodeContainer.addChild(officeImg);
		

		let innerbg = BaseBitmap.create("public_9v_bg12");
		innerbg.width = 590

		innerbg.height = bottomBg.height - 120 - 10 - 50 + 10;
		innerbg.x = bottomBg.width/2 - innerbg.width/2;
		innerbg.y = officeBg.y + officeBg.height + 10;//bottomBg.y +26;
		this._bottomnodeContainer.addChild(innerbg);
		this._bottomnodeContainer.addChild(officeImg);

        //称号---------------

        let tarWidth = 537;
	    let titleinfo = UIData.titleinfo;
		let tupinfo = UIData.tupinfo || [];
		let startX = 25;//probg1.x+10;
		let startY = 10;//probg1.y + 65;
		let addH = 0;
		let titleNode = new BaseDisplayObjectContainer();
        titleNode.width = innerbg.width- 20;
		let titleNum = 0;
		let keys = [];
		for (var key in titleinfo) {
			if (titleinfo.hasOwnProperty(key)) {
				if (Config.TitleCfg.getTitleCfgById(key)) {
					keys.push(key);
				}
			}
		}
		keys.sort((kaya:string,kayb:string)=>{
			let tacfg = Config.TitleCfg.getTitleCfgById(kaya);
			let tbcfg = Config.TitleCfg.getTitleCfgById(kayb);
			return tacfg.sortId - tbcfg.sortId;
		});
        let pwidth = titleNode.width / 3;
        console.log(pwidth);
		for (var index = 0; index < keys.length; index++) {
			let  key = keys[index];
		// for (var key in titleinfo) {
			if (titleinfo[key] >= 1)
			{
				if(Number(key) >= 4001)
				{
					continue;
				}
				titleNum ++;
				let tlv = tupinfo[key] ? tupinfo[key].tlv : "";
				let titlepath = Config.TitleCfg.getTitleIcon3WithLv(key,tlv);
				let officerImg = BaseLoadBitmap.create( titlepath);
				let deltaV = 1;//0.8;
				officerImg.width = 186 * deltaV;
				officerImg.height = 42 * deltaV;

                officerImg.x = ((titleNum-1) % 3) * pwidth + pwidth/2 - officerImg.width/2;
                officerImg.y = startY;//10 + Math.floor(titleNum / 3) * 50;
                titleNode.addChild(officerImg);
                if((titleNum-1)%3 == 2){
                    startY += 50;
                }
				// if (startX > innerbg.x + innerbg.width-100)
				// {
				// 	startX = 10;//probg1.x+10;
				// 	startY += 50;
				// 	addH += 40;
				// }
				// officerImg.x = startX;
				// officerImg.y = startY ;
				// 
				// titleNode.addChild(officerImg);
                // startX += (590 - 20 )/3;
			}
		}
		titleNode.height += 40;
        let touchPanel = BaseBitmap.create("public_alphabg");
        touchPanel.width = titleNode.width;
        touchPanel.height = titleNode.height;
        titleNode.addChild(touchPanel);
		let rect = new egret.Rectangle(0,0,innerbg.width - 20,innerbg.height- 20);
		let titleScrollView = ComponentManager.getScrollView(titleNode,rect);
		titleScrollView.x = GameConfig.stageWidth / 2 - titleScrollView.width/2;
		titleScrollView.y = innerbg.y+10; 
		titleScrollView.verticalScrollPolicy = "on";
		titleScrollView.horizontalScrollPolicy = "off";
		// titleScrollView.$setTouchEnabled
		this._bottomnodeContainer.addChild(titleScrollView);
		
		if (titleNum == 0)
		{
			let noTitleTipTxt =  ComponentManager.getTextField(LanguageManager.getlocal("rankUserinfo_noTitle"),20,TextFieldConst.COLOR_BROWN);
			noTitleTipTxt.x = GameConfig.stageWidth/2 -  noTitleTipTxt.width/2;
			noTitleTipTxt.y = innerbg.y + innerbg.height/2 - noTitleTipTxt.height/2;
			this._bottomnodeContainer.addChild(noTitleTipTxt); 
		}
		// bottomBg.height += addH;
		// this.cacheAsBitmap=true;
		//是自己就不显示按钮
		if(UIData.ruid == Api.playerVoApi.getPlayerID())
		{
			return ;
		}
		let dinnerBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_ORANGE,"dinner_shotJoin",this.dinerBtnHandler,this);
		dinnerBtn.x = GameConfig.stageWidth/2 + tarWidth/2  - dinnerBtn.width;
		dinnerBtn.y = innerbg.y + innerbg.height + 15;//this._bottomnodeContainer.height - dinnerBtn.height - 15
		
		if(UIData.ruid == Api.playerVoApi.getPlayerID() || this.param.data.isDinnerHost ||  this.param.data.cantjoindinner)
		{	
			dinnerBtn.visible = false;
		}else{
			dinnerBtn.visible = true;
		}
		this._bottomnodeContainer.addChild(dinnerBtn);

		let priBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"chatViewTab3Title",this.priBtnHandler,this);
		priBtn.x = dinnerBtn.x - 5 - priBtn.width;
		priBtn.y = dinnerBtn.y;
		
		// if(UIData.ruid == Api.playerVoApi.getPlayerID() || this.param.data.isDinnerHost)
		// {	
		// 	dinnerBtn.visible = false;
		// }else{
		// 	dinnerBtn.visible = true;
		// }
		this._bottomnodeContainer.addChild(priBtn);

		this._shieldBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"chatShield",this.shieldBtnHandler,this);
		this._shieldBtn.x =  GameConfig.stageWidth/2 - tarWidth/2;
		this._shieldBtn.y = dinnerBtn.y;
		
		if(UIData.ruid == Api.playerVoApi.getPlayerID())
		{	
			this._shieldBtn.visible = false;
		}else{
			this._shieldBtn.visible = true;
		}

		// if(LocalStorageManager.get("shield" + UIData.ruid)){
		// 	this._shieldBtn.setText("chatCancelShield")
		// }
		if(Api.chatVoApi.getIsBlock(UIData.ruid)){
			this._shieldBtn.setText("chatCancelShield")
		}
		else{
			this._shieldBtn.setText("chatShield");
		}

		this._bottomnodeContainer.addChild(this._shieldBtn);

		let friendflag = UIData.friendflag;
		let btnImg = ButtonConst.BTN_SMALL_BLUE;
		let btnTxt = "";
		if(friendflag == 1){
			btnTxt = "friendsBtnTxt20";
		}else if(friendflag == 0){
			btnImg = ButtonConst.BTN_SMALL_YELLOW;
			btnTxt = "friendsBtnTxt13";
		}else if(friendflag == -1){
			btnImg = ButtonConst.BTN_SMALL_YELLOW;
			btnTxt = "friendsBtnTxt12";
		}
		this._friendsBtn = ComponentManager.getButton(btnImg,btnTxt,this.friendsBtnHandler,this);
		if(friendflag == 0){
			this._friendsBtn.setEnable(false);
		}
		// this._friendsBtn.x = tarWidth/2 -  this._friendsBtn.width/2; //this._shieldBtn.x + this._shieldBtn.width + 10;
		this._friendsBtn.x = this._shieldBtn.x + this._shieldBtn.width + 5
		this._friendsBtn.y = this._shieldBtn.y ;
		this._bottomnodeContainer.addChild(this._friendsBtn);
		this._friendsBtn.visible = !UIData.crossZone;
		// priBtn.visible = dinnerBtn.visible = !UIData.crossZone;
		priBtn.visible = !UIData.crossZone && Api.switchVoApi.openChatType3();

		if(isCrossWifeBattle){
			this._friendsBtn.visible = false;
			priBtn.visible = false;
			this._shieldBtn.visible = false;
			dinnerBtn.visible = false;
		}

	}
	protected shieldBtnHandler()
	{
		let UIData = this.param.data;
		if(Api.chatVoApi.getIsBlock(UIData.ruid)){
			// LocalStorageManager.remove("shield" + UIData.ruid);
			// App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldMsg3"));
			// this._shieldBtn.setText("chatShield");
			// return;
			let rewardStr = LanguageManager.getlocal("chatCancelBlockDesc",[UIData.name]);
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"chatCancelShield",
				msg:rewardStr,
				callback:this.doShield,
				handler:this,
				needCancel:true
			});
			return;
		}
		
		let rewardStr = LanguageManager.getlocal("chatShieldDesc",[UIData.name]);
		// let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
		ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"chatShield",
			msg:rewardStr,
			callback:this.doShield,
			handler:this,
			needCancel:true
		});
	}
	private priBtnHandler():void{
		let view = this;
		let UIData = view.param.data;
		if(Api.switchVoApi.checkOpenchatvsvip()&&Api.playerVoApi.getPlayerVipLevel() < UIData.vip)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatPirvateVipTip"));
			return;
		}
		if(Api.switchVoApi.checkCloseChat())
		{
			App.CommonUtil.showTip("很抱歉，聊天系统维护中");
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.PRICHATVIEW, {
			isread : 1,
			issender : 0,
			sender : UIData.ruid,
			sendername : UIData.name,
		});
		view.hide();
	}
	private doShield()
	{
		let UIData = this.param.data;
		// LocalStorageManager.set("shield" + UIData.ruid,"true")
		if(Api.chatVoApi.getIsBlock(UIData.ruid))
		{
			this.request(NetRequestConst.REQUEST_CHAT_UNBLOCK, {fuid:UIData.ruid});
		}
		else{
			let num = 0;
			if(Api.chatVoApi.getChatBlockVo().info)
			{
				num = Api.chatVoApi.getChatBlockVo().info.length;
				if(!num)
				{
					num = 0;
				}
			}
			let snum = GameConfig.config.friendCfg.maxShieldPlayer;
			if(num >= snum){
				App.CommonUtil.showTip(LanguageManager.getlocal("chatblockCountMax"));
				return;
			}

			this.request(NetRequestConst.REQUEST_CHAT_BLOCK, {fuid:UIData.ruid});
		}
		
		
	
		// if(LocalStorageManager.get("shield" + UIData.ruid)){

	}
	private friendsBtnHandler()
	{
		
		let friendflag = this.param.data.friendflag;
		if(friendflag == 1){ //1 好友
			let breakMsg = LanguageManager.getlocal("friends_breakupTip1",[this.param.data.name]);
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				"msg": breakMsg ,
				"needCancel":true,
				"title":"itemUseConstPopupViewTitle",
				"callback":this.doBreakup,
				"handler":this,
			});
		}else if(friendflag == 0){ //0 已申请
			// NetManager.request(NetRequestConst.REQUEST_FRIEND_APPLY,{fuid:this.param.data.ruid});
		}else if(friendflag == -1){ //-1 未申请
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
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_APPLY),this.applyCallback,this);
			NetManager.request(NetRequestConst.REQUEST_FRIEND_APPLY,{fuid:this.param.data.ruid});
			this._friendsBtn.setText("friendsBtnTxt13");
			this._friendsBtn.setEnable(false);
		}
	}    
    protected applyCallback(data: egret.Event): void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_APPLY),this.applyCallback,this);
		let rData = data.data.data;
       	if( rData.ret == 0)
        {
			let friendFlag = rData.data.friendFlag;
			if(friendFlag){
				Api.friendVoApi.showFriendsNetFlags(friendFlag);
			}else{
				App.CommonUtil.showTip(LanguageManager.getlocal("friends_applyTip1",[this.param.data.name]));
			}
		}
	}
	protected dinerBtnHandler()
	{
		if(Api.composemapVoApi.getMaxLv() < Config.DinnerCfg.getNeedLv())
		{
			App.CommonUtil.showTip(Api.dinnerVoApi.getLockedString());
			return;
		}
		if(this.param.data.ishavedinner == 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("dinner_shotJoinTip"));
			return;
		}
		//触发宴会引导
		if(Api.rookieVoApi.curGuideKey == "dinner")
		{
			this.hide();
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DINNER_GUIDE);
			return;
		}
		ViewController.getInstance().openView(ViewConst.BASE.GOTODINNEREDVIEW, {"info":{uid:this.param.data.ruid,name:this.param.data.name}});

		if (this.param.data.isFromDinner) {
			this.hide();
		}
	}
	private doBreakupCallback(data: egret.Event): void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_UNFRIEND),this.doBreakupCallback,this);
		let rData = data.data.data;
       	if( rData.ret == 0)
        {
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_breakupTip2",[this.param.data.name]));
		}
	}
    private doBreakup()
	{
		this._friendsBtn.setText("friendsBtnTxt12");
		this._friendsBtn.setBtnBitMap(ButtonConst.BTN_SMALL_YELLOW);
		this._friendsBtn.setColor(TextFieldConst.COLOR_BTN_YELLOW);
		this.param.data.friendflag = -1;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_UNFRIEND),this.doBreakupCallback,this);
		NetManager.request(NetRequestConst.REQUEST_FRIEND_UNFRIEND,{fuid:this.param.data.ruid});
	}
	protected refreshProTxt()
	{
		let UIData = this.param.data;
		let bcid:number =  Api.challengeVoApi.getBigChannelIdByCid(UIData.cid);
		let proCfg=[
			{
				txt : LanguageManager.getlocal("playerview_force") ,//"武力: ",
				proValue: App.StringUtil.changeIntToText(UIData.atk),
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_inte") ,
				proValue:App.StringUtil.changeIntToText( UIData.inte),
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_wife") ,
				proValue:UIData.wifenum,
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_policy") ,
				proValue:App.StringUtil.changeIntToText(UIData.politics),
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_charm") ,
				proValue:App.StringUtil.changeIntToText(UIData.charm),
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_child") ,
				proValue:UIData.childnum,
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("rank_challenge")+": "  ,
				proValue: bcid +"."+ LanguageManager.getlocal("challengeTitle"+ bcid),
				proIcon:"public_icon4",
			},{
				txt : LanguageManager.getlocal("rank_imacy2"),
				proValue: UIData.imacy,
				proIcon:"public_icon3",
			}
		]
		for (var index = 0; index < proCfg.length; index++) {
			let proText = <BaseTextField>this._bottomnodeContainer.getChildByName("proText"+(index+1));
			proText.text = String(proCfg[index].proValue);
		}
	}

	// private prestignBtnListener(){
	// 	ViewController.getInstance().openView(ViewConst.COMMON.BETHEKINGVIEW);
	// }

	protected refreshLvCfg(bottomInfoY?:number)
	{
		let curLv = Api.playerVoApi.getPlayerLevel();
		let curLvCfg = Config.LevelCfg.getCfgByLevel(curLv.toString())
		let nextLvCfg = Config.LevelCfg.getCfgByLevel((curLv+1).toString())

		let priTxtStr= []
		// if(nextLvCfg.servant)
		// {
			priTxtStr = [[
				LanguageManager.getlocal("promotion_privilege6_1"),
				LanguageManager.getlocal("servant_name"+curLvCfg.servant) 
			]]
		// }
		priTxtStr = priTxtStr.concat([
			[LanguageManager.getlocal("promotion_privilege1"),"gold",  ],
			[LanguageManager.getlocal("promotion_privilege2"),"food"  ],
			[LanguageManager.getlocal("promotion_privilege3"),"soldier"  ],
			[LanguageManager.getlocal("promotion_privilege4"), "affair"  ],
			[LanguageManager.getlocal("promotion_privilege7",[""]),"gem"  ],
		])
		let descTxtSize = 20;
		let descPerHeight = 36;
		let proBgHeight = 34;
		if(PlatformManager.checkIsViSp()){
			descTxtSize = 18;
		}
		if( Api.practiceVoApi.isPracticeOPen() )
		{
			let plv = Api.playerVoApi.getPlayerLevel();
			let plvcfg = GameConfig.config.practicebaseCfg.level
			let addV = plvcfg[plv-1];
			let addV2 = plvcfg[plv];
			if(!addV)
			{
				addV = plvcfg[plvcfg.length-1];
			}
			if(!addV2)
			{
				addV2 = addV;
			}
			descTxtSize = 18;
			descPerHeight = 34;
			proBgHeight = 34;
			// priTxtStr = priTxtStr.concat([ 
				
			// ]);

			let storeLimit = GameConfig.config.practicebaseCfg.storeLimit;
			let addV3 = storeLimit[plv-1];
			let addV4 = storeLimit[plv];
			if(!addV3)
			{
				addV3 = storeLimit[storeLimit.length-1];
			}
			if(!addV4)
			{
				addV4 = addV3;
			}
			priTxtStr = priTxtStr.concat([ 
				[LanguageManager.getlocal("promotion_privilege8"),App.StringUtil.changeIntToText2(addV),App.StringUtil.changeIntToText2(addV2)] ,
				[LanguageManager.getlocal("promotion_privilege9"),App.StringUtil.changeIntToText2(addV3),App.StringUtil.changeIntToText2(addV4)],
			]);
		}
		let strIdx = 0;
		for (var index = 0; index < priTxtStr.length; index++) {
			let procfg = priTxtStr[index];
			if(index != 0){
				let line = BaseBitmap.create("public_line4");
				line.width = 540;
				line.x = GameConfig.stageWidth/2 - line.width/2;
				line.y = bottomInfoY - line.height/2+24;
				this._bottomnodeContainer.addChild(line);
					
			}
			// if(index%2 == 1 && bottomInfoY)
			// {
			// 	// if (index == 5){
			// 	// 	let probg = BaseBitmap.create("public_left2");
				
			// 	// 	probg.width =598 ;
			// 	// 	probg.height = 35;
			
			// 	// 	probg.anchorOffsetX = 598/2;
			// 	// 	probg.anchorOffsetY = 17;

			// 	// 	probg.x =GameConfig.stageWidth/2;// - probg.width /2 ;
			// 	// 	probg.y = bottomInfoY + 26 + 13;
			// 	// 	this._bottomnodeContainer.addChild(probg);


			// 	// } else {
			// 	// 	let probg =  BaseBitmap.create("public_ditu");
			// 	// 	probg.width = 598;
			// 	// 	probg.height = 34;
			// 	// 	// probg.scaleY = proBgHeight/45;
			// 	// 	probg.x =GameConfig.stageWidth/2 - probg.width /2 ;
			// 	// 	probg.y = bottomInfoY + 26;
			// 	// 	this._bottomnodeContainer.addChild(probg);
			// 	// }

			// }
			let proTxt = undefined;
			let nowVTxt1 = undefined;
			let nowVTxt2 =  undefined;
			let proArrow =  undefined;
			
			proTxt = this._changeVTxtList[strIdx++];
			if(!proTxt)
			{
				proTxt = ComponentManager.getTextField((index+1) + "."+ procfg[0],descTxtSize,TextFieldConst.COLOR_BROWN_NEW);
				proTxt.x = 90;
				proTxt.y = bottomInfoY + proBgHeight/2 - proTxt.height/2 + 26;
				this._bottomnodeContainer.addChild(proTxt);
				this._changeVTxtList.push(proTxt);
			}
			proTxt.text = (index+1) + "."+ procfg[0];

			proArrow = this._bottomnodeContainer.getChildByName("proArrow" + index);
			if(!proArrow){
				proArrow = BaseBitmap.create("playerview_arrow");
				proArrow.x =GameConfig.stageWidth - 200;
				proArrow.y = proTxt.y + proTxt.height/2 - proArrow.height/2;
				this._bottomnodeContainer.addChild(proArrow);
				proArrow.name = "proArrow" + index;
			}
			nowVTxt1 = this._changeVTxtList[strIdx++];
			if(!nowVTxt1){
				nowVTxt1 = ComponentManager.getTextField( curLvCfg[procfg[1]],18,TextFieldConst.COLOR_BROWN_NEW);
				this._changeVTxtList.push(nowVTxt1);
				this._bottomnodeContainer.addChild(nowVTxt1);
			}
			nowVTxt1.text =  curLvCfg[procfg[1]];
			if(index >= 6)
			{
				nowVTxt1.text =  procfg[1];
			}
			// nowVTxt1.text =  curLvCfg[procfg[1]];
			if(index == 0 )
			{
				nowVTxt1.text = "";
			}
			nowVTxt1.anchorOffsetX = nowVTxt1.width;
			nowVTxt1.x = proArrow.x -10;
			nowVTxt1.y = proArrow.y + proArrow.height/2 - nowVTxt1.height/2;

			nowVTxt2 = this._changeVTxtList[strIdx++];
			if(!nowVTxt2)
			{
				nowVTxt2 = ComponentManager.getTextField("",18,TextFieldConst.COLOR_WARN_GREEN_NEW);
				nowVTxt2.x = proArrow.x + proArrow.width+10;
				nowVTxt2.y = nowVTxt1.y;
				this._bottomnodeContainer.addChild(nowVTxt2);
				this._changeVTxtList.push(nowVTxt2);
			}
			
			if(nextLvCfg )
			{
				if(index == 0 && nextLvCfg.servant)
				{
					nowVTxt2.text = LanguageManager.getlocal("servant_name"+nextLvCfg.servant)
					// nowVTxt2.anchorOffsetX = nowVTxt2.width/2;
					nowVTxt2.x = proArrow.x + proArrow.width/2 - nowVTxt2.width/2;
					proArrow.visible = false;
				}else{
					nowVTxt2.text = nextLvCfg[procfg[1]];
					if(index >= 6 )
					{
						nowVTxt2.text =  procfg[2];
					}
				}
				nowVTxt2.y = proArrow.y + proArrow.height/2 - nowVTxt2.height/2;
			}else{
				nowVTxt2.visible = false;
				proArrow.visible = false;
			}
			bottomInfoY += descPerHeight;
		}
		return bottomInfoY;
	}

	protected refreshProgressAndTxt()
	{	
		let curLv = Api.playerVoApi.getPlayerLevel()
		let nextLvCfg =  Config.LevelCfg.getCfgByLevel((curLv+1).toString());
		if (nextLvCfg)
		 {
			this._progressBar.setPercentage( Api.playerVoApi.getPlayerExp()/ nextLvCfg.exp);
			this._expTipTxt.text = LanguageManager.getlocal("playerview_exp") + Api.playerVoApi.getPlayerExp() + " / "+ nextLvCfg.exp;
		 }else
		 {
			this._progressBar.setPercentage(1);
			this._expTipTxt.text =  LanguageManager.getlocal("promotion_topLevel")
			this._expTipTxt.x =  GameConfig.stageWidth/2 - this._expTipTxt.width/2;
		 }
		let powerTxt = <BaseTextField>this._nodeContainer.getChildByName("powerTxt"); 
		
		powerTxt.text = LanguageManager.getlocal("playerview_quanshi",[App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerPower())]);
		//""+App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerPower());
	}



	private clickPrestigeHandler(param:any):void
	{	
		ViewController.getInstance().openView(ViewConst.COMMON.PRESTIGEVIEW);
		let prestigeBtn = <BaseDisplayObjectContainer>this._nodeContainer.getChildByName("prestige");
		App.CommonUtil.removeIconFromBDOC(prestigeBtn);
	}

	private clickUpgradeHandler(param:any):void
	{	

		let curLv = Api.playerVoApi.getPlayerLevel()
		let nextLvCfg =  Config.LevelCfg.getCfgByLevel((curLv+1).toString());
		if(!nextLvCfg)
		{
			//已升到最大官阶
			App.CommonUtil.showTip(LanguageManager.getlocal("promotion_upgradeTip1"));
			return;
		}
		if (Api.playerVoApi.getPlayerExp()  <  nextLvCfg.exp)
		{
			// ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONSUCCESSVIEW);
			//政绩不足，无法升级
			App.CommonUtil.showTip(LanguageManager.getlocal("promotion_upgradeTip2"));
			return;
		}

		PlatformManager.analytics37Point("custom_active","player_levelup",1);
		NetManager.request(NetRequestConst.REQUEST_USER_UPGRADE,{});
		//功能解锁
		// if(Api.otherInfoVoApi.getFunctionRedhot())
		// {
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
		// }
		
	
		// App.LogUtil.log("clickUpgradeHandler");
		// ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONVIEW);
	
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		

			"playerview_powerbg",
			"playerview_probg",
			"playerview_pro1",
			"playerview_pro2",
			"playerview_pro3",
			"playerview_pro4",
			"playerview_pro5",
			"playerview_pro6",
			"playerview_pro7",
			"playerview_pro8",
			"playerview_pro9",
			"playerview_pro10",
			"playerview_pro11",
			"playerview_pro12",
			"playerview_pro13",
			"playerview_pro16",
			"playerview_pro17",
			// "playerview_pro_inmg2",
		
			"playerview_arrow",
			
			// "playerview_power_img",
			"office_fnt",
			// "servant_mask",

			
			"wifeview_xinxibanbg",
			"wifeview_balckbg",
			
			"progress_type1_yellow","progress_type1_bg",
			"guide_hand",
			"playerview_canvas01",
			"commonview_border1",
            "commonview_bottom",
            "commonview_border2",
			"progress_type3_bg",
			"progress_type1_yellow2",
			"playerview_centerinfobg"
		]);
	}

	public closeHandler():void
	{
		PlayerBottomUI.getInstance().hide(true);
		super.hide();
	}

	public dispose():void
	{

		this._nodeContainer = null;
		this._bottomnodeContainer = null;
		this._progressBar = null;
		this._expTipTxt = null;
		this._changeVTxtList = [];
		// this._playerview_lvup_word = null;
		if (this._upgradeClip)
		{
			this._upgradeClip.stop();
			this._upgradeClip.dispose();
			this._upgradeClip = null;
		}

		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		this._mainTaskHandKey = null;
		super.dispose();
	}

}