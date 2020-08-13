/**
 * 用户信息主界面
 * author dmj
 * date 2017/9/18
 * @class PlayerView
 */
class PlayerView extends CommonView
{
	protected _nodeContainer:BaseDisplayObjectContainer;
	protected _bottomnodeContainer:BaseDisplayObjectContainer;
	private _upgradeClip:CustomMovieClip;
	private _upgradeOfficeBtn:BaseButton;
	private _progressBar:ProgressBar;
	private _progressBar2:ProgressBar;
	private _expTipTxt:BaseTextField;
	private _expTipTxt2:BaseTextField;
	private _changeVTxtList = [];
	private _mainTaskHandKey:string = null;
	private previewTxtCon:BaseDisplayObjectContainer = null;

	public constructor() 
	{
		super();
	}

	public initView():void
	{	
		//ViewController.getInstance().openView("ComposeNeedLvupNewView");
		Api.rookieVoApi.checkNextStep();
		Api.mainTaskVoApi.checkShowGuide();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.refreshUpgradeClip,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE),this.refreshInfoAfterUpgrade,this);

		// SoundManager.playEffect(SoundConst.EFFECT_WIFE);
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
		let curLv = Api.playerVoApi.getPlayerLevel();
		let posX = 20;
		if (Api.playerVoApi.getTitleid() > 0)
		{
			curLv = Api.playerVoApi.getTitleid();
			posX = -10;
		}
		let userContainer = Api.playerVoApi.getMyPortrait();
		userContainer.x = posX;
		userContainer.name = "userContainer";
		this._nodeContainer.addChild(userContainer);
		// userContainer.skewY = 40;
		
		let fanImg = BaseBitmap.create("public_9v_bg10")
		fanImg.width = 208;
		fanImg.height = 224;
		fanImg.x = GameConfig.stageWidth -fanImg.width-20;
		fanImg.y = 160;
		this._nodeContainer.addChild(fanImg);
		
		if(Api.switchVoApi.checkOpenPrestigeShow()){
			fanImg.y = fanImg.y - 8 - 28;
			fanImg.height = fanImg.height + 8 + 28;
		}
		


		let markLeft = BaseBitmap.create("public_v_huawen02");
		markLeft.anchorOffsetX = 4;
		markLeft.scaleX = -1;
		markLeft.x = fanImg.x + fanImg.width/2;
		markLeft.y = fanImg.y + 50;
		this._nodeContainer.addChild(markLeft);

		let markRight = BaseBitmap.create("public_v_huawen02");
		markRight.anchorOffsetX = 4;
		markRight.x = fanImg.x + fanImg.width/2;
		markRight.y = fanImg.y + 50;
		this._nodeContainer.addChild(markRight);

		let temX = fanImg.x+100;
		let temY = fanImg.y;



		let nameTF:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		// nameTF.border = true;
		nameTF.stroke = 1;
		nameTF.borderColor = TextFieldConst.COLOR_BLACK;
		nameTF.x = temX - nameTF.width/2;
		nameTF.y = temY + 20;
		this._nodeContainer.addChild(nameTF);
		let uidIcon = BaseBitmap.create("playerview_pro13");
		uidIcon.x = 412//422
		uidIcon.y = nameTF.y + nameTF.height + 25;
		this._nodeContainer.addChild(uidIcon);
		let uidStr = Api.playerVoApi.getPlayerID().toString();

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

		let allName = Api.playerVoApi.getPlayerAllianceName();
		if(allName == "")
		{
			allName = LanguageManager.getlocal("allianceRankNoAlliance");
		}
		// let alliStr = LanguageManager.getlocal("acRank_myAlliancenick");

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
		let po = Api.allianceVoApi.getMyAllianceVo().po;
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
		if (Api.playerVoApi.getPlayerVipLevel() > 0)
		{
			vipIcon = BaseBitmap.create("playerview_pro10");
			vipIcon.x = poIcon.x;
			vipIcon.y = poIcon.y + vipIcon.height + 8;
			if(PlatformManager.checkIsViSp()){
				vipIcon.y = poIcon.y + vipIcon.height + 10;
			}
			this._nodeContainer.addChild(vipIcon);



			
			let vipImg = BaseLoadBitmap.create(Api.vipVoApi.getCurLevelVipCfg().icon);
			vipImg.width = 65;
			vipImg.height = 27;
			vipImg.anchorOffsetX = vipImg.width;
			vipImg.x = vipIcon.x + 201;
			vipImg.y = vipIcon.y;
			// vipImg.setScale(0.7)
			this._nodeContainer.addChild(vipImg);
		}
		// mainui_funicon


		//开启人望显示
		if(Api.switchVoApi.checkOpenPrestigeShow()&&MainUIUnLockCfg.getIsUnLockByKey("mainuiCity")){

			let prestigeIcon = BaseBitmap.create("playerview_pro17");
			prestigeIcon.x = poIcon.x+4;
			

			let prestigeBtn = ComponentManager.getButton("mainui_funicon",null,this.prestignBtnListener,this);
			prestigeBtn.setScale(0.6)
			if(vipIcon == null){
				prestigeIcon.y = poIcon.y + poIcon.height + 8;
			} else {
				
				prestigeIcon.y = vipIcon.y + vipIcon.height + 8;
			}
			
			this._nodeContainer.addChild(prestigeIcon);


			prestigeBtn.x = prestigeIcon.x + 198 - prestigeBtn.width;
			prestigeBtn.y = prestigeIcon.y + 1;
			this._nodeContainer.addChild(prestigeBtn);
			let pValue = Api.prestigeVoApi.getPem();
			let prestigeTF:BaseTextField = ComponentManager.getTextField(pValue+"",textSize,TextFieldConst.COLOR_WARN_YELLOW_NEW);
			// uidTF.text = "爽肤水地方是";
			prestigeTF.anchorOffsetX = prestigeTF.width;
			prestigeTF.x = prestigeBtn.x - 1;//172;
			prestigeTF.y = prestigeIcon.y + 5;
			if(PlatformManager.checkIsViSp()){
				prestigeTF.y = prestigeIcon.y + 8;
			}
			this._nodeContainer.addChild(prestigeTF);

			
			

		}
		
		//底部需要往上移动
		let promoDeltaH = 0;
		let probgPath = "playerview_probg";
		// let powerimgPath = "playerview_power_img";
		
		let _bContainerY =  GameConfig.stageHeigth - this.container.y - 466 -10;
		let btHeight = 0;
		/*
		if(  Api.practiceVoApi.isPracticeOPen() )
		{
			promoDeltaH = 30*2;
		
			powerimgPath = "player_power1";
			btHeight =  PlayerBottomUI.getInstance().showHeight;
			_bContainerY = GameConfig.stageHeigth - this.container.y - 456 - btHeight ;
		}
		*/
		let btY = bg0.y + bg0.height
		this._bottomnodeContainer.y = _bContainerY; //-promoDeltaH
	
		// let upgradeOfficeBtnnBg = BaseBitmap.create("playerview_btn1_bg")
		// upgradeOfficeBtnnBg.x = bg0.x + bg0.width - 160;
		// upgradeOfficeBtnnBg.y = this._bottomnodeContainer.y - 145;
		// this._nodeContainer.addChild(upgradeOfficeBtnnBg);
		let playerview_powerbg = BaseBitmap.create("playerview_canvas01")
		playerview_powerbg.x = 40;
		playerview_powerbg.y = this._bottomnodeContainer.y - 80;
		this._nodeContainer.addChild(playerview_powerbg);

		// let myPowerImg = ComponentManager.getTextField(LanguageManager.getlocal("playerview_quanshi",[String(Api.playerVoApi.getPlayerPower())]),24,TextFieldConst.COLOR_WARN_YELLOW);
		// myPowerImg.x = playerview_powerbg.x + 30;
		// myPowerImg.y = playerview_powerbg.y + 20 - 7;
		// this._nodeContainer.addChild(myPowerImg);

		let titleText1 = ComponentManager.getTextField(LanguageManager.getlocal("playerview_quanshi",[App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerPower())]),24,TextFieldConst.COLOR_WARN_YELLOW_NEW);;
	// 	if(PlatformManager.checkIsViSp()){
	// 		titleText1 = ComponentManager.getTextField(""+App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerPower()),24,TextFieldConst.COLOR_LIGHT_YELLOW);
	// 		myPowerImg.x = playerview_powerbg.x + 20;
	// } else {
	// 		titleText1 = ComponentManager.getTextField(""+App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerPower()),24,TextFieldConst.COLOR_LIGHT_YELLOW);

	// 	}
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
		servant_mask.height = 75;
		servant_mask.y = bottomInfoY-5;
		this._bottomnodeContainer.addChild(servant_mask);

		
		servant_mask.visible = MainUIUnLockCfg.getIsUnLockByKey("mainuiCity");
		playerview_powerbg.visible =  MainUIUnLockCfg.getIsUnLockByKey("mainuiCity");
		titleText1.visible =  MainUIUnLockCfg.getIsUnLockByKey("mainuiCity");
		// this._bottomnodeContainer.addChild(playerview_probg);
		let proPosY = bottomInfoY + 10;
		let proPosX = GameConfig.stageWidth/2;

		for (var index = 1; index <= 6; index++) {
			// let tmpprocfg = proCfg[index-1]; tmpprocfg.proValue
			let proText = null;

			if(PlatformManager.checkIsViSp()){
				proText = ComponentManager.getTextField("",18,TextFieldConst.COLOR_WARN_YELLOW_NEW);
			} else {
				proText = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_YELLOW_NEW);
			}
			proText.name = "proText" + index
			let ModT = 0;
			if(index == 1 || index == 4)
			{
				ModT = -1;
			}else if(index == 3 || index == 6)
			{
				ModT = 1;
			}
			proPosX = GameConfig.stageWidth/2 + ModT*180;
			if (index%4 == 0)
			{
				proPosY += 29;
			}
			let img = BaseBitmap.create("playerview_pro"+index)
			img.x = proPosX-img.width-5;
			img.y = proPosY -5;
			this._bottomnodeContainer.addChild(img);

			proText.x = proPosX;

			
			if(PlatformManager.checkIsViSp()){
				proText.y = img.y+7;
			} else {
				proText.y = img.y+2;
			}
			// proText.y = img.y + img.height/2 - proText.height/2 ;
			this._bottomnodeContainer.addChild(proText);

			proText.visible = MainUIUnLockCfg.getIsUnLockByKey("mainuiCity");
			img.visible = MainUIUnLockCfg.getIsUnLockByKey("mainuiCity");
			
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
		officeBg.width = 421;
		// officeBg.height = 33;
		officeBg.x = GameConfig.stageWidth/2-officeBg.width/2 - 10;
		officeBg.y = bottomBg.y + 20;//bottomBg.y + innerTopBg.height/2 - officeBg.height/2 -10;
		this._bottomnodeContainer.addChild(officeBg);
		//我的官位
		let officeImg = ComponentManager.getTextField(LanguageManager.getlocal("playerview_guanwei",[Api.playerVoApi.getPlayerMinLevelStr()]),24,TextFieldConst.COLOR_BROWN_NEW);// BaseBitmap.create("playerview_guanwei_img");
		officeImg.x =GameConfig.stageWidth/2 - officeImg.width /2 ;
		officeImg.y = officeBg.y  + officeBg.height /2 - officeImg.height/2;
		this._bottomnodeContainer.addChild(officeImg);
		officeImg.name = "officeTF";

		let innerbg = BaseBitmap.create("public_9v_bg12");
		innerbg.width = 590
		// innerbg.height = 364+promoDeltaH;
		innerbg.height = bottomBg.height - 220;
		innerbg.x = bottomBg.width/2 - innerbg.width/2;
		innerbg.y = officeBg.y + officeBg.height + 10;//bottomBg.y +26;
		this._bottomnodeContainer.addChild(innerbg);

		this._bottomnodeContainer.addChild(officeImg);
		bottomInfoY = bottomBg.y +26 +20;
		bottomInfoY = this.refreshLvCfg(bottomInfoY);

		bottomInfoY += 10;

		let innerbg2 = BaseBitmap.create("public_9v_bg12");
		innerbg2.width = 590
		innerbg2.height = 120;
		innerbg2.x = bottomBg.width/2 - innerbg2.width/2;
		innerbg2.y = innerbg.y + innerbg.height + 5;
		this._bottomnodeContainer.addChild(innerbg2);

		//赚速
		let playerview_newpro2 = BaseBitmap.create("playerview_newpro2");
		playerview_newpro2.x = 60+2;// this._progressBar.x - 20;
		playerview_newpro2.y = innerbg2.y + 18;
		this._bottomnodeContainer.addChild(playerview_newpro2);
	
		this._progressBar2 = ComponentManager.getProgressBar("progress_type3_yellow2","progress_type3_bg",312);
		this._progressBar2.x = this._bottomnodeContainer.width / 2 - 287/2 - 50-2;
		this._progressBar2.y = playerview_newpro2.y+10;
		this._bottomnodeContainer.addChild(this._progressBar2);

		//政绩
		let playerview_pro7 = BaseBitmap.create("playerview_newpro1");
		playerview_pro7.x = 60;// this._progressBar.x - 20;
		playerview_pro7.y = playerview_newpro2.y + playerview_newpro2.height +10;;//GameConfig.stageHeigth - 60//this._progressBar.y + this._progressBar.height/2 - playerview_pro7.height/2;
		this._bottomnodeContainer.addChild(playerview_pro7);


		this._progressBar = ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",312);
		this._progressBar.x = this._bottomnodeContainer.width / 2 - 287/2 - 50;
		this._progressBar.y = playerview_pro7.y+10;
		this._bottomnodeContainer.addChild(this._progressBar);

		// this._expTipTxt =  ComponentManager.getTextField("",18,TextFieldConst.COLOR_WHITE);
		// this._expTipTxt.x = this._progressBar.x + this._progressBar.width/2 - this._expTipTxt.width/2 ;
        // this._expTipTxt.y = this._progressBar.y + this._progressBar.height / 2 -this._expTipTxt.height/2 ;
		// this._bottomnodeContainer.addChild( this._expTipTxt);



		// this._expTipTxt2 =  ComponentManager.getTextField("",18,TextFieldConst.COLOR_WHITE);
		// this._expTipTxt2.x = this._progressBar2.x + this._progressBar2.width/2 - this._expTipTxt2.width/2 ;
        // this._expTipTxt2.y = this._progressBar2.y + this._progressBar2.height / 2 -this._expTipTxt2.height/2 ;
		// this._bottomnodeContainer.addChild( this._expTipTxt2);

		this.refreshProgressAndTxt();
		

		//赚速



		let upgradeOfficeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"promotionViewUpd",this.clickUpgradeHandler,this);
		
		// upgradeImg.x = upgradeOfficeBtn.width/2 - upgradeImg.width/2;
		// upgradeImg.y = upgradeOfficeBtn.height/2 - upgradeImg.height/2;
		// upgradeOfficeBtn.addChild(upgradeImg);



		upgradeOfficeBtn.x = this._progressBar.x+this._progressBar.width +15;
		upgradeOfficeBtn.y = this._progressBar2.y + this._progressBar2.height + 15 -upgradeOfficeBtn.height/2 ;
		this._bottomnodeContainer.addChild(upgradeOfficeBtn);
		this._upgradeOfficeBtn = upgradeOfficeBtn
		this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this._bottomnodeContainer,upgradeOfficeBtn.x + upgradeOfficeBtn.width/2,upgradeOfficeBtn.y + upgradeOfficeBtn.height/2-20, [upgradeOfficeBtn], 105, true, function(){
			let curMinLv = Api.playerVoApi.getPlayerMinLevelId();
			let nextLvCfg =  Config.MinlevelCfg.getCfgByMinLevelId(curMinLv+1);
			if(!nextLvCfg)
			{
				//已升到最大官阶
				return false;
			} 
			else if (Api.playerVoApi.getPlayerExp()  <  nextLvCfg.exp || Api.mainTaskVoApi.getHistoryMaxLevyRate() < nextLvCfg.needRate)
			{
				return false;
			} 
			else 
			{
				return true;
			}
		}, this);



		this.refreshUpgradeClip();
	}

	protected refreshProTxt()
	{
		let proCfg=[
			{
				txt : LanguageManager.getlocal("playerview_force") ,//"武力: ",
				proValue: App.StringUtil.changeIntToText(Api.playerVoApi.getAtk()),
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_inte") ,
				proValue:App.StringUtil.changeIntToText( Api.playerVoApi.getInte()),
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_wife") ,
				proValue:Api.wifeVoApi.getWifeNum(),
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_policy") ,
				proValue:App.StringUtil.changeIntToText(Api.playerVoApi.getPolitics()),
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_charm") ,
				proValue:App.StringUtil.changeIntToText(Api.playerVoApi.getCharm()),
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_child") ,
				proValue:Api.wifeVoApi.getChildrenNum(),
				proIcon:"",
			}
		]
		for (var index = 0; index < 6; index++) {
			let proText = <BaseTextField>this._bottomnodeContainer.getChildByName("proText"+(index+1));
			proText.text = String(proCfg[index].proValue);
		}
	}

	private prestignBtnListener(){
		ViewController.getInstance().openView(ViewConst.COMMON.BETHEKINGVIEW);
	}

	protected refreshLvCfg(bottomInfoY?:number)
	{
		
		bottomInfoY = 120;
		this._changeVTxtList = [];
		if(this.previewTxtCon){
			this.previewTxtCon.dispose();
			this.previewTxtCon = null;
		}
		this.previewTxtCon = new BaseDisplayObjectContainer();
		this.previewTxtCon.width = this._bottomnodeContainer.width;
		this.previewTxtCon.height = this._bottomnodeContainer.height;
		this.previewTxtCon.x = this._bottomnodeContainer.x;
		this.previewTxtCon.y = this._bottomnodeContainer.y;
		this.addChildToContainer(this.previewTxtCon);


		let curLv = Api.playerVoApi.getPlayerLevel();
		let curMinLvId = Api.playerVoApi.getPlayerMinLevelId();
		let curLvCfg = Config.MinlevelCfg.getCfgByMinLevelId(curMinLvId)
		let nextLvCfg = Config.MinlevelCfg.getCfgByMinLevelId(curMinLvId+1)

		let priTxtStr= [

			[LanguageManager.getlocal("promotion_compose_desc1"),"personLv"  ],	
		]

		if(!nextLvCfg || nextLvCfg.gem)
		{
			priTxtStr = priTxtStr.concat([
				[LanguageManager.getlocal("promotion_compose_desc2"),"gem"  ],
			])
		}
		if(!nextLvCfg&&curLvCfg.servantShow){
			priTxtStr = priTxtStr.concat([
				[LanguageManager.getlocal("promotion_compose_desc3_2"),"" ],
			])
		}
		if(nextLvCfg&&nextLvCfg.servantShow)
		{
			priTxtStr = priTxtStr.concat([
				[LanguageManager.getlocal("promotion_compose_desc3"),"" ],
			])
		}else if(nextLvCfg&&nextLvCfg.servant){
			priTxtStr = priTxtStr.concat([
				[LanguageManager.getlocal("promotion_compose_desc4"),"" ],
			])
		}
		if(nextLvCfg && nextLvCfg.batchCompose){
			priTxtStr = priTxtStr.concat([
				[LanguageManager.getlocal("promotion_compose_desc5"),"batchCompose" ],
			])
		}
		if(nextLvCfg && nextLvCfg.oneClickBuy && nextLvCfg.oneClickBuy > 0){
			priTxtStr = priTxtStr.concat([
				[LanguageManager.getlocal("promotion_compose_desc5"),"oneClickBuy" ],
			])
		}
		if(nextLvCfg&&nextLvCfg.buyLimit&&nextLvCfg.buyLimit>0)
		{
			priTxtStr = priTxtStr.concat([
				[LanguageManager.getlocal("promotion_compose_desc6"),"buyLimit" ],
			])
		}
		let spaceY=26;
		let descPerHeight = 36;
		if(priTxtStr.length<4)
		{
			bottomInfoY = bottomInfoY + 30;
		}else if(priTxtStr.length==4){
			bottomInfoY = bottomInfoY + 10;
		}
		else if(priTxtStr.length>4)
		{
			bottomInfoY = bottomInfoY + 5;
			spaceY=16
			descPerHeight = 34;
		}
		let descTxtSize = 20;
		let proBgHeight = 34;

		let strIdx = 0;
		for (var index = 0; index < priTxtStr.length; index++) {
			let procfg = priTxtStr[index];

			let proTxt = undefined;
			let nowVTxt1 = undefined;
			let nowVTxt2 =  undefined;
			let proArrow =  undefined;
			
			proTxt = this._changeVTxtList[strIdx++];
			if(!proTxt)
			{
				proTxt = ComponentManager.getTextField(procfg[0],descTxtSize,TextFieldConst.COLOR_BROWN_NEW);
				proTxt.x = 90;
				proTxt.y = bottomInfoY + proBgHeight/2 - proTxt.height/2 + spaceY;
				this.previewTxtCon.addChild(proTxt);
				this._changeVTxtList.push(proTxt);
			}
			proTxt.text = procfg[0];

			proArrow = this.previewTxtCon.getChildByName("proArrow" + index);
			if(!proArrow){
				proArrow = BaseBitmap.create("playerview_arrow");
				proArrow.x =GameConfig.stageWidth - 200;
				proArrow.y = proTxt.y + proTxt.height/2 - proArrow.height/2;
				this.previewTxtCon.addChild(proArrow);
				proArrow.name = "proArrow" + index;
			}
			nowVTxt1 = this._changeVTxtList[strIdx++];
			if(!nowVTxt1){
				if(procfg[1] == "personLv"){
					let str = Api.composemapVoApi.getCanHaveMaxPersonLv();
					nowVTxt1 = ComponentManager.getTextField(str+'',18,TextFieldConst.COLOR_BROWN_NEW);
					this._changeVTxtList.push(nowVTxt1);
					this.previewTxtCon.addChild(nowVTxt1);
				}else{
					let str = curLvCfg[procfg[1]]
					nowVTxt1 = ComponentManager.getTextField( curLvCfg[procfg[1]],18,TextFieldConst.COLOR_BROWN_NEW);
					this._changeVTxtList.push(nowVTxt1);
					this.previewTxtCon.addChild(nowVTxt1);
				}

			}
			let str = 	 curLvCfg[procfg[1]];
			let showArrow:boolean=false;
			if(procfg[1] == "personLv"){
				str = Api.composemapVoApi.getCanHaveMaxPersonLv();
				showArrow=true;
			}
			else if(procfg[1]=="buyLimit")
			{
				str = curLvCfg.buyLimit+"";
				showArrow=true;
			}

			if(!str)
			{
				str = "0"
			}
			nowVTxt1.text =  str;
			if(index >= 6)
			{
				nowVTxt1.text =  procfg[1];
			}
			// nowVTxt1.text =  curLvCfg[procfg[1]];
			if(showArrow==false&&(index == 2||index == 3) )
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
				this.previewTxtCon.addChild(nowVTxt2);
				this._changeVTxtList.push(nowVTxt2);
			}
			
			if(nextLvCfg )
			{
				if(index == 1 && !nextLvCfg.gem &&nextLvCfg.servant)
				{
					nowVTxt1.text = LanguageManager.getlocal("servant_name"+nextLvCfg.servant)
					// nowVTxt2.anchorOffsetX = nowVTxt2.width/2;
					nowVTxt1.x = proArrow.x + proArrow.width/2 - nowVTxt2.width/2;
					proArrow.visible = false;
				}else if(index == 1 && !nextLvCfg.gem && nextLvCfg.servantShow){
					nowVTxt1.text = LanguageManager.getlocal("servant_name"+nextLvCfg.servantShow)
					// nowVTxt2.anchorOffsetX = nowVTxt2.width/2;
					nowVTxt1.x = proArrow.x + proArrow.width/2 - nowVTxt2.width/2;
					proArrow.visible = false;
				}else if(index == 2 && nextLvCfg.servant)
				{
					nowVTxt2.text = LanguageManager.getlocal("servant_name"+nextLvCfg.servant)
					// nowVTxt2.anchorOffsetX = nowVTxt2.width/2;
					nowVTxt2.x = proArrow.x + proArrow.width/2 - nowVTxt2.width/2;
					proArrow.visible = false;
				}else if(index == 2 && nextLvCfg.servantShow){
					nowVTxt2.text = LanguageManager.getlocal("servant_name"+nextLvCfg.servantShow)
					// nowVTxt2.anchorOffsetX = nowVTxt2.width/2;
					nowVTxt2.x = proArrow.x + proArrow.width/2 - nowVTxt2.width/2;
					proArrow.visible = false;
				}else if(index == 1 && nextLvCfg.gem){
					nowVTxt2.text = Config.LevelCfg.getCfgByLevel(String(nextLvCfg.lv)).gem;
				}else if(procfg[1]=="batchCompose"){
					nowVTxt2.text = LanguageManager.getlocal("promotion_compose_batchcompose")
					nowVTxt2.x = proArrow.x + proArrow.width/2 - nowVTxt2.width/2;
					proArrow.visible = false;
				}else if(procfg[1]=="oneClickBuy"){
					nowVTxt2.text = LanguageManager.getlocal("promotion_compose_oneclickbuy")
					nowVTxt2.x = proArrow.x + proArrow.width/2 - nowVTxt2.width/2;
					proArrow.visible = false;
				}
				else if(procfg[1]=="buyLimit")
				{
					// nowVTxt1.text = curLvCfg.buyLimit+"";
					nowVTxt2.text = nextLvCfg?nextLvCfg.buyLimit+"":curLvCfg.buyLimit+"";
					// nowVTxt1.x = proArrow.x + proArrow.width/2 - nowVTxt2.width/2;
					// proArrow.visible = false;
				}
				else{
					nowVTxt2.text = nextLvCfg[procfg[1]];
					if(index >= 6 )
					{
						nowVTxt2.text =  procfg[2];
					}
					if(procfg[1] == "personLv"){
						nowVTxt2.text = Api.composemapVoApi.getCanHavePreviewPersonLv();
					}
				}
				nowVTxt2.y = proArrow.y + proArrow.height/2 - nowVTxt2.height/2;
			}else{
				if((index == 2 && !nextLvCfg &&curLvCfg.servantShow)){
					nowVTxt1.text = LanguageManager.getlocal("servant_name"+curLvCfg.servantShow);
					nowVTxt1.x = proArrow.x -10 - nowVTxt1.width;
					nowVTxt1.y = proArrow.y + proArrow.height/2 - nowVTxt1.height/2;
				}
				nowVTxt2.visible = false;
				proArrow.visible = false;
			}
			bottomInfoY += descPerHeight;
		}
		return bottomInfoY;
	}

	protected refreshProgressAndTxt()
	{	
		let curMinLv = Api.playerVoApi.getPlayerMinLevelId();
		let nextLvCfg =  Config.MinlevelCfg.getCfgByMinLevelId(curMinLv+1);
		if (nextLvCfg)
		 {
			let str1 = LanguageManager.getlocal("playerview_exp") + Api.playerVoApi.getPlayerExp() + " / "+ nextLvCfg.exp;
			this._progressBar.setPercentage( Api.playerVoApi.getPlayerExp()/ nextLvCfg.exp,str1);
			// this._expTipTxt.text = '';

			let str2 = LanguageManager.getlocal("playerview_rate") + App.StringUtil.changeIntToText4(Api.mainTaskVoApi.getHistoryMaxLevyRate())  + " / "+ App.StringUtil.changeIntToText3(nextLvCfg.needRate);
			this._progressBar2.setPercentage( Api.mainTaskVoApi.getHistoryMaxLevyRate() / nextLvCfg.needRate,str2);
			// this._expTipTxt2.text = "";
		 }else
		 {
			this._progressBar.setPercentage(1,LanguageManager.getlocal("promotion_topLevel"));
			// this._expTipTxt.text =  LanguageManager.getlocal("promotion_topLevel")
			// this._expTipTxt.x =  GameConfig.stageWidth/2 - this._expTipTxt.width/2;

			this._progressBar2.setPercentage(1,LanguageManager.getlocal("playerview_maxrate"));
			// this._expTipTxt2.text =  LanguageManager.getlocal("playerview_maxrate")
			// this._expTipTxt2.x =  GameConfig.stageWidth/2 - this._expTipTxt.width/2;
		 }
		let powerTxt = <BaseTextField>this._nodeContainer.getChildByName("powerTxt"); 
		
		powerTxt.text = LanguageManager.getlocal("playerview_quanshi",[App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerPower())]);
		//""+App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerPower());
	}
	//如果能升级，则初始化帧动画
	private refreshUpgradeClip()
	{
		PlayerBottomUI.getInstance().checkRedPoints();
		let curMinLv = Api.playerVoApi.getPlayerMinLevelId();
		let nextLvCfg =  Config.MinlevelCfg.getCfgByMinLevelId(curMinLv+1);
		
		// 升级特效
		if (nextLvCfg && Api.playerVoApi.getPlayerExp() >=  nextLvCfg.exp && Api.mainTaskVoApi.getHistoryMaxLevyRate() >= nextLvCfg.needRate)
		 {
			 if (!this._upgradeClip)
			 {
				this._upgradeClip = ComponentManager.getCustomMovieClip("player_frame",8,100);
				this._upgradeClip.x = this._upgradeOfficeBtn.x + this._upgradeOfficeBtn.width/2 - 90;
				this._upgradeClip.y = this._upgradeOfficeBtn.y + this._upgradeOfficeBtn.height/2 - 50.5;
				let idx = this._bottomnodeContainer.getChildIndex(this._upgradeOfficeBtn);
				
				this._bottomnodeContainer.addChildAt(this._upgradeClip,idx+1);
				this._upgradeClip.playWithTime(0);
			 }
		 }else
		 {
			 if (this._upgradeClip)
			 {
				 this._upgradeClip.stop();
				 this._bottomnodeContainer.removeChild(this._upgradeClip);
				 this._upgradeClip = null;
			 }
		 }
	}
 	protected refreshInfoAfterUpgrade(event:egret.Event)
    {
        let rData = event.data.data;
		if(rData.ret != 0)
			return;
		SoundManager.playEffect("effect_upd");
		if(App.CommonUtil.check_dragon()){
			ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONSUCCESSDRAGONVIEW);
		}else{
			ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONSUCCESSVIEW);
		}

		if (Api.playerVoApi.getTitleid() > 0){
			
		} else {
			let userContainer = <BaseDisplayObjectContainer>this._nodeContainer.getChildByName("userContainer");
			let bodyImg = <BaseLoadBitmap>userContainer.getChildByName("myBody");
			bodyImg.setload("user_body" + Api.playerVoApi.getPlayerLevel());
		}
		
		
		let officeTF = <BaseTextField>this._bottomnodeContainer.getChildByName("officeTF")
		officeTF.text = LanguageManager.getlocal("playerview_guanwei",[Api.playerVoApi.getPlayerMinLevelStr()]);
		officeTF.x =GameConfig.stageWidth/2 - officeTF.width /2 ;

		this.refreshLvCfg();
		this.refreshProgressAndTxt();
		this.refreshProTxt();
		this.refreshUpgradeClip();
    }

	private clickPrestigeHandler(param:any):void
	{	
		ViewController.getInstance().openView(ViewConst.COMMON.PRESTIGEVIEW);
		let prestigeBtn = <BaseDisplayObjectContainer>this._nodeContainer.getChildByName("prestige");
		App.CommonUtil.removeIconFromBDOC(prestigeBtn);
	}

	private clickUpgradeHandler(param:any):void
	{	
		Api.rookieVoApi.checkNextStep();
		let curLv = Api.playerVoApi.getPlayerMinLevelId()
		let nextLvCfg =  Config.MinlevelCfg.getCfgByMinLevelId(curLv+1);
		if(!nextLvCfg)
		{
			//已升到最大官阶
			App.CommonUtil.showTip(LanguageManager.getlocal("promotion_upgradeTip1"));
			return;
		}
		//政绩或银两赚速不足，无法升级
		if (Api.mainTaskVoApi.getHistoryMaxLevyRate() < nextLvCfg.needRate)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("promotion_upgradeTip2"));
			// ViewController.getInstance().openView(ViewConst.POPUP.PLAYERUPLIMITPOPUPVIEW,{type:"rate"});
			return;
		}
		else if(Api.playerVoApi.getPlayerExp() < nextLvCfg.exp)
		{
			if(MainUI.getInstance().getUnlockIndex()>=9)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.PLAYERUPLIMITPOPUPVIEW,{type:"exp"});
			}
			else
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("promotion_upgradeTip2"));
			}
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

			"playerview_pro13","playerview_pro12","playerview_pro11","playerview_pro10",
			"playerview_pro17",
			"playerview_pro_inmg2",
		
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
			"playerview_centerinfobg",
			"playerview_newpro1",
			"playerview_newpro2",
			"progress_type3_yellow2"
		]);
	}

	public closeHandler():void
	{
		PlayerBottomUI.getInstance().hide(true);
		if (Api.rookieVoApi.curGuideKey=="batchcompose") {
			Api.rookieVoApi.checkWaitingGuide();
		}
		super.hide();
	}

	public dispose():void
	{
		Api.mainTaskVoApi.hideGuide();
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.refreshUpgradeClip,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE),this.refreshInfoAfterUpgrade,this);

		this._nodeContainer = null;
		this._bottomnodeContainer = null;
		this._progressBar = null;
		this._expTipTxt = null;
		this._progressBar2 = null;
		this._expTipTxt2 = null;
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
		this.previewTxtCon = null;
		super.dispose();
	}

}