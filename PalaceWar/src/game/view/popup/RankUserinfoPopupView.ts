/**
 * 排行榜玩家信息弹板
 * author yanyuling
 * date 2017/10/25
 * @class RankUserinfoPopupView
 */
class RankUserinfoPopupView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _bottomnodeContainer:BaseDisplayObjectContainer;

	private _shieldBtn:BaseButton;
	private _friendsBtn:BaseButton;
	private _curTitleId:string = '';
	private _curLevel:number = 1;

    public constructor() 
	{
		super();
	}

	public initView():void
	{	
		let UIData = this.param.data;
		if (!UIData)
		{
			UIData = {};
		}
		let title = App.CommonUtil.getTitleData(UIData.title);
		if(title.clothes){
			let titleCfg = Config.TitleCfg;
			let titleconfig = titleCfg.getTitleCfgById(title.clothes);
			if(titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7) ){
				this._curTitleId = title.clothes;
                this._curLevel = title.clv;
				if(this._curLevel == 0){
					this._curLevel = 1;
				}
			}
		}else{
			this._curTitleId = '';
		}

		if(!UIData.crossZone){
			UIData.crossZone = !(Number(UIData.rzid) == Number(ServerCfg.selectServer.zid)); 
			UIData.zid = UIData.rzid;
		}
		// SoundManager.playEffect(SoundConst.EFFECT_WIFE);
		//自己管理自己的节点
		this._nodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);
		this._bottomnodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._bottomnodeContainer);

		this._nodeContainer.x = GameData.popupviewOffsetX;
		this._bottomnodeContainer.x = GameData.popupviewOffsetX;

		let tarWidth = 550;
		let bg0:BaseBitmap = BaseLoadBitmap.create("playerview_bg2");
		bg0.width = 640;
		bg0.height = 595;
		bg0.setScale(tarWidth/bg0.width);
        bg0.x = 10;
		this._nodeContainer.addChild(bg0);
		
		let curLv = UIData.level;
		let posX = 20;
		let tinfo = App.CommonUtil.getTitleData(UIData.title);
		let pic = UIData.pic;
		if (tinfo.clothes != "")
		{	
			if (!Config.TitleCfg.getIsTitleOnly(tinfo.clothes))
			{
				curLv = tinfo.clothes;
				let isnew = Api.playerVoApi.getNewPalaceRole(curLv) || Config.TitleCfg.isTheKingTitleId(this._curTitleId);
				posX = isnew ? -160 : -10;
			}
			// if (Config.TitleCfg.checkHasSpecialHead(tinfo.clothes))
			// {
			// 	pic= Config.TitleCfg.getSpecialHead(tinfo.clothes,pic);
			// }
			
		}
		let userContainer = null;
		

		if(this._curTitleId){
			userContainer = new BaseDisplayObjectContainer();
			let isnew = Api.playerVoApi.getNewPalaceRole(curLv) || Config.TitleCfg.isTheKingTitleId(this._curTitleId);
			
			userContainer.mask = egret.Rectangle.create().setTo(isnew ? 170 : 20,-40,600,410);
			userContainer.x = posX;
			userContainer.y = 40;
			userContainer.name = "userContainer";
			this._nodeContainer.addChild(userContainer);
			
			let role = null;
			let myHair = null;
			let tcfg = Config.TitleCfg.getTitleCfgById(this._curTitleId);
			let resPath = "palace_db_" + this._curTitleId + (tcfg.titleType == 7 ? `_${Api.playerVoApi.getUserSex(pic)}` : ``);
			if((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && ResourceManager.hasRes(resPath + "_ske")){
				role = App.CommonUtil.getPlayerDragonRole(this._curTitleId, pic, this._curLevel);
				role.x = 340;
				role.y = 35;
				userContainer.addChild(role);
				role.name = 'role';
				// myHead.setPosition(273,0);
				// myHair.setPosition(296.5,0);
	
			}else{
				role = Api.playerVoApi.getPlayerPortrait(Number(this._curTitleId), pic,0,false,null,null,this._curLevel);
				if(Config.TitleCfg.isTheKingTitleId(this._curTitleId)){
					userContainer.x = -10;
					userContainer.mask = egret.Rectangle.create().setTo(20,-40,600,410);
				}
				userContainer.addChild(role);
			}
		}else{
			let isnew = Api.playerVoApi.getNewPalaceRole(curLv);
			userContainer = Api.playerVoApi.getPlayerPortrait(curLv,pic);
			userContainer.mask = egret.Rectangle.create().setTo(isnew ? 170 : 0,0,userContainer.width,500);
			userContainer.x = posX;
			userContainer.y = 40;
			userContainer.name = "userContainer";
			this._nodeContainer.addChild(userContainer);
		}

		
		let fanImg = BaseBitmap.create("playerview_name_bg");
		fanImg.scaleX = 0.85;
		fanImg.x = GameConfig.stageWidth -fanImg.width-40;
		fanImg.y = 240;
		this._nodeContainer.addChild(fanImg);

		// let temX = fanImg.x+100;
		let temX = this.viewBg.x+this.viewBg.width - 230-GameData.popupviewOffsetX;
		let temY = fanImg.y;

		let nameTF:BaseTextField = ComponentManager.getTextField(UIData.name,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
	
		// nameTF.border = true;
		nameTF.stroke = 1;
		nameTF.borderColor = TextFieldConst.COLOR_BLACK;
		// nameTF.x = temX - nameTF.width/2;
		nameTF.x = temX ;
		nameTF.y = temY + 7;
		this._nodeContainer.addChild(nameTF);

		let uidStr = LanguageManager.getlocal("uidTitle") + ": " + UIData.ruid;
		let uidTF:BaseTextField = ComponentManager.getTextField(uidStr,20,TextFieldConst.COLOR_LIGHT_YELLOW);
		uidTF.x = nameTF.x
		uidTF.y = nameTF.y + nameTF.height +5;
		this._nodeContainer.addChild(uidTF);

		let allName = UIData.gname;
		if(allName == "")
		{
			allName = LanguageManager.getlocal("allianceRankNoAlliance");
		}
		let alliStr = LanguageManager.getlocal("allianceCreateViewTitle") + ": ";
		let allianceTxt:BaseTextField = ComponentManager.getTextField(alliStr+allName,20,TextFieldConst.COLOR_WARN_YELLOW);
		allianceTxt.x = nameTF.x
		allianceTxt.y = uidTF.y + uidTF.height +5;
		this._nodeContainer.addChild(allianceTxt);

		let poStr = LanguageManager.getlocal("playerview_Nopo");
		let po = UIData.po;
		if(po > 0)
		{
			poStr = LanguageManager.getlocal("allianceMemberPo" + po);
		}
		
		let alliancePoTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("alliance_po") + ": "+ poStr,20,TextFieldConst.COLOR_WARN_YELLOW);
		alliancePoTxt.x = nameTF.x
		alliancePoTxt.y = allianceTxt.y + allianceTxt.height +5;
		this._nodeContainer.addChild(alliancePoTxt);

		if(UIData && UIData.crossZone){
			let serverTxt = ComponentManager.getTextField(LanguageManager.getlocal('crossranserver', [UIData.zid.toString()]), 20, TextFieldConst.COLOR_WARN_YELLOW);
			serverTxt.x = nameTF.x
			serverTxt.y = alliancePoTxt.y + alliancePoTxt.height +5;
			this._nodeContainer.addChild(serverTxt);
		}

		if(Number(UIData.ruid) == Api.playerVoApi.getPlayerID() || !UIData.hideVip){
			if (UIData.vip > 0)
			{
				// let vipbg = BaseBitmap.create("playerview_wipbg")
				// vipbg.x = nameTF.x;
				// vipbg.y = fanImg.y - 37;
				// vipbg.scaleY = 1.3;
				// this._nodeContainer.addChild(vipbg);
				
				let vipImg = Api.vipVoApi.getVipIcon2(UIData.vip);
				vipImg.setPosition(fanImg.x+(fanImg.width*fanImg.scaleX-vipImg.width)/2,fanImg.y-vipImg.height-5);
				this._nodeContainer.addChild(vipImg);
			}
		}

		//下部信息部分
		let bottomInfoX = 330;
		let bottomInfoY = 0;
		this._bottomnodeContainer.y = 410;
		//底部需要往上移动
		let btY = bg0.y + bg0.height

		let playerview_powerbg = BaseBitmap.create("playerview_powerbg")
		playerview_powerbg.x = 50;
		playerview_powerbg.y = this._bottomnodeContainer.y - 60;
		this._nodeContainer.addChild(playerview_powerbg);

		let myPowerImg = BaseBitmap.create("playerview_power_img");
		myPowerImg.x = playerview_powerbg.x + 30;
		myPowerImg.y = playerview_powerbg.y + 20;
		this._nodeContainer.addChild(myPowerImg);

		let titleText1 =  ComponentManager.getTextField(App.StringUtil.changeIntToText(UIData.power) ,24,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText1.name = "powerTxt"
		titleText1.x = myPowerImg.x + myPowerImg.width + 2;
		titleText1.y = myPowerImg.y + myPowerImg.height/2 - titleText1.height/2;
		this._nodeContainer.addChild(titleText1); 

		let officebg =  BaseBitmap.create("palace_rewardbg");//("palace_rewardbg");
		officebg.width = 260;
		officebg.height = 40;
		officebg.x = playerview_powerbg.x -10  ;
		officebg.y = myPowerImg.y - 55;
		this._nodeContainer.addChild(officebg);
		
		let officeText1 =  ComponentManager.getTextField(LanguageManager.getlocal("mainui_officer"),24,TextFieldConst.COLOR_LIGHT_YELLOW);
		officeText1.name = "powerTxt"
		officeText1.x = myPowerImg.x;
		officeText1.y = officebg.y + officebg.height/2 - officeText1.height/2;
		this._nodeContainer.addChild(officeText1); 

		let officeTF:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(Api.playerVoApi.getPlayerOfficeByLevel(UIData.level), "office_fnt",0xfff000);
		officeTF.name = "officeTF";
		officeTF.setScale(0.9);
		officeTF.x = officeText1.x + officeText1.width-5;
		if (Api.switchVoApi.checkOpenBMFont())
		{
			officeTF.y = officeText1.y + officeText1.height/2 - officeTF.height/2-2;
		}
		else
		{	
			officeTF.x = officeText1.x + officeText1.width;
			officeTF.y = officeText1.y + officeText1.height/2 - officeTF.height/2+3;
		}
		
		this._nodeContainer.addChild(officeTF);
		
		let playerview_probg = BaseBitmap.create("playerview_probg");
		playerview_probg.x = 10  ;
		playerview_probg.height = 106;
		playerview_probg.scaleX = tarWidth/playerview_probg.width;
		playerview_probg.y = bottomInfoY;
		
		let servant_mask = BaseBitmap.create("servant_mask");
		servant_mask.width = tarWidth;
		servant_mask.x = 10;
		
		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_bg22");
		bottomBg.scaleX = tarWidth/bottomBg.width;
        bottomBg.height =182+50+40;
		bottomBg.x = 10;
		bottomBg.y = playerview_probg.y + playerview_probg.height-10;
		servant_mask.y = bottomBg.y - servant_mask.height;
		this._bottomnodeContainer.addChild(servant_mask);
		this._bottomnodeContainer.addChild(bottomBg);
		this._bottomnodeContainer.addChild(playerview_probg);

		let proPosY = playerview_probg.y + 60-50;
		let proPosX = GameConfig.stageWidth/2;
		for (var index = 1; index <= 8; index++) {
			// let tmpprocfg = proCfg[index-1]; tmpprocfg.proValue
			let proText = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
			proText.name = "proText" + index
			let ModT = 0;
			let offX = 5;
			if(index == 1 || index == 4 || index == 7)
			{
				ModT = -1;
				offX = 0;
			}else if(index == 3 || index == 6 || index == 8)
			{
				ModT = 1;
			}
			proPosX = GameConfig.stageWidth/2 + ModT*180 - 30;
			// proPosX = tarWidth/2 + ModT*180;
			if (PlatformManager.checkIsRuLang()){
				proPosX = GameConfig.stageWidth/2 + ModT*180 - 30 + offX;
			}
			if ( index > 1 && index%3 == 1)
			{
				proPosY += 25;
			}
			let imgIdx = index;
			if(index >=7)
			{
				imgIdx +=1;
			}
			let img = BaseBitmap.create("playerview_pro"+imgIdx)
			img.x = proPosX-img.width-20;
			img.y = proPosY;
			this._bottomnodeContainer.addChild(img);
			if(Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(`playerview_pro${index}_blueType`)){
				img.setRes(`playerview_pro${index}_blueType`);
			}


			proText.x = proPosX-15;
			proText.y = img.y+2;
			// proText.y = img.y + img.height/2 - proText.height/2 ;
			this._bottomnodeContainer.addChild(proText);
			if(index == 7 && UIData.crossZone){
				proText.visible = false;
				img.visible = false;
			}
			if(PlatformManager.checkIsEnLang())
			{
				proText.x += 20;
				img.x += 20;
			}
		}
		this.refreshProTxt();

		//下面部分改成整体滑动

		let bottomScrollNode : BaseDisplayObjectContainer = new BaseDisplayObjectContainer();

		


		let posY = 15;

		if (UIData.bio && Object.keys(UIData.bio).length>0)
		{
			let lineb = BaseBitmap.create("public_line3");
			lineb.width = 500;
			lineb.x = tarWidth/2  - lineb.width/2 + bottomBg.x;
			lineb.y = posY;
			bottomScrollNode.addChild(lineb);

			let bio_titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("biography_title"),22,0x272727);
			bio_titleTxt.x =  tarWidth/2 - bio_titleTxt.width/2 + bottomBg.x;
			bio_titleTxt.y = lineb.y + lineb.height/2 - bio_titleTxt.height/2;
			bottomScrollNode.addChild(bio_titleTxt);

			let probgb = BaseBitmap.create("public_9_bg21");
			probgb.width = 500;
			probgb.height = 190;
			probgb.x =  tarWidth/2 - probgb.width/2+bottomBg.x;
			probgb.y = lineb.y + 30;
			bottomScrollNode.addChild(probgb);

			let infoObject = UIData.bio;
			let keys:string[] = Object.keys(infoObject);

			keys.sort(function(a: string,b: string):number
			{	
				let cfga = Config.BiographyCfg.getCfgBgId(infoObject[a].id);
				let cfgb = Config.BiographyCfg.getCfgBgId(infoObject[b].id);

				if (cfga.type != cfgb.type)
				{
					return cfgb.type - cfga.type;
				}

				if(cfga.sortID > cfgb.sortID) 
				{
					return 1;
				}
				else if(cfga.sortID == cfga.sortID) 
				{
					return infoObject[b].st - infoObject[a].st;
				}
				return -1;
			});

			for (let i=0; i<keys.length; i+=2)
			{	
				let info1 = infoObject[keys[i]];
				let key1 = info1.id;
				

				let leftContainer = Api.biographyVoApi.getBookInfoContainerByInfo(info1,true,UIData.ruid,UIData.name);
				leftContainer.setPosition(56,posY+45);
				leftContainer.setScale(0.8);
				bottomScrollNode.addChild(leftContainer);

				if (keys[i+1])
				{	
					let info2 = infoObject[keys[i+1]];
					let key2 = info2.id;
					let rightContainer = Api.biographyVoApi.getBookInfoContainerByInfo(info2,true,UIData.ruid,UIData.name);
					rightContainer.setPosition(290,leftContainer.y);
					rightContainer.setScale(0.8);
					bottomScrollNode.addChild(rightContainer);
				}
				posY+= 172;
			}

			let bHeight = posY-probgb.y+45;
			if (bHeight>=probgb.height)
			{
				probgb.height = bHeight;
			}

			posY = probgb.y+probgb.height + 30;
		}

		let line1 = BaseBitmap.create("public_line3");
		line1.width = 500;
		line1.x = tarWidth/2  - line1.width/2+bottomBg.x;
		line1.y = posY-2;
		bottomScrollNode.addChild(line1);

		let playerRank_titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("playerRank_title"),22,0x272727);
		playerRank_titleTxt.x =  tarWidth/2 - playerRank_titleTxt.width/2+bottomBg.x;
		playerRank_titleTxt.y = line1.y - 1 + line1.height/2 - playerRank_titleTxt.height/2;
		bottomScrollNode.addChild(playerRank_titleTxt);

		let probg1 = BaseBitmap.create("public_9_bg21");
		probg1.width = 500;
		probg1.height = 138;
		probg1.x =  tarWidth/2 - probg1.width/2+bottomBg.x;
		probg1.y = line1.y + 30;
		bottomScrollNode.addChild(probg1)

		// bottomInfoY += 10;

		// let titleinfo = UIData.titleinfo;
		let titleinfo = this.sortTitleInfo(UIData.titleinfo);
		let startX = probg1.x + 10;
		let startY =  probg1.y+5+10;
		let addH = 0;
		
		let titleNum = 0;
		// let titleNode = new BaseDisplayObjectContainer();
		for (var key in titleinfo) {
			if (titleinfo[key]["isHas"] >= 1)
			{

				if (!ResourceManager.hasRes("user_title_" + titleinfo[key].id +"_3"))
				{
					continue;
				}

				titleNum ++;
				let officerImg = App.CommonUtil.getTitlePic(titleinfo[key].id, titleinfo[key]["isHas"]);//BaseLoadBitmap.create("user_title_" + titleinfo[key].id +"_3");
				let deltaV = 0.8;
				officerImg.width = 155 * deltaV;
				officerImg.height = 59 * deltaV;
				if (startX > probg1.x + probg1.width-100)
				{
					startX = probg1.x+10;
					startY += 40;
					addH += 40;
				}
				officerImg.setScale(deltaV);
				officerImg.x =  startX;
				officerImg.y = startY ;
				bottomScrollNode.addChild(officerImg);
				startX += 120;
			}
		}

		let bgHeight = startY-probg1.y+45;
		if (bgHeight>probg1.height)
		{
			probg1.height = bgHeight;
		}
		bottomScrollNode.height = probg1.y+probg1.height+10;
		let rectb = new egret.Rectangle(0,0,this.viewBg.width,bottomBg.height-40);
		let bottomScrollView = ComponentManager.getScrollView(bottomScrollNode,rectb);
		bottomScrollView.x = 0;
		bottomScrollView.y = bottomBg.y+20; 
		bottomScrollView.horizontalScrollPolicy = "off";
		this._bottomnodeContainer.addChild(bottomScrollView); 

		// let rect = new egret.Rectangle(0,0,this.viewBg.width,probg1.height-10);
		// let titleScrollView = ComponentManager.getScrollView(titleNode,rect);
		// titleScrollView.x = 0;
		// titleScrollView.y = probg1.y+5; 
		// titleScrollView.horizontalScrollPolicy = "off";
		// this._bottomnodeContainer.addChild(titleScrollView); 
		if (titleNum == 0)
		{
			let noTitleTipTxt =  ComponentManager.getTextField(LanguageManager.getlocal("rankUserinfo_noTitle"),20,TextFieldConst.COLOR_BROWN);
			noTitleTipTxt.x = tarWidth/2 - noTitleTipTxt.width/2;
			noTitleTipTxt.y = probg1.y + probg1.height/2 - noTitleTipTxt.height/2;
			bottomScrollNode.addChild(noTitleTipTxt); 
		}
		// bottomBg.height += addH;
		// this.cacheAsBitmap=true;
		if(UIData.promoteType){
			let api = Api.promoteVoApi;
			if(api.isKing()){
				let xrenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'PromotePlayersPopViewcancel', this.cancelPosConfirm, this);
				xrenBtn.x = (this.viewBg.width - xrenBtn.width) / 2-this._bottomnodeContainer.x;//-GameData.popupviewOffsetX;
				xrenBtn.y = bottomBg.y + bottomBg.height  + 15;
				this._bottomnodeContainer.addChild(xrenBtn);
			}
			let DesctText = ComponentManager.getTextField(LanguageManager.getlocal('PromotePlayersPopViewText', [LanguageManager.getlocal(`promoteType${UIData.promoteType}`),LanguageManager.getlocal(`promoteType${UIData.promoteType}eff`)]), 20);
			DesctText.lineSpacing = 7;
			this.setLayoutPosition(LayoutConst.righttop, DesctText, bg0, [-20,50]);
			this.addChildToContainer(DesctText);
		}
		else{
			//是自己就不显示按钮
			if(UIData.ruid == Api.playerVoApi.getPlayerID())
			{
				return ;
			}
			let dinnerBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"dinner_shotJoin",this.dinerBtnHandler,this);
			dinnerBtn.x = this.viewBg.x + this.viewBg.width - dinnerBtn.width+5-this._bottomnodeContainer.x-GameData.popupviewOffsetX;
			dinnerBtn.y = bottomBg.y + bottomBg.height  + 10;

			let priBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"chatViewTab3Title",this.priBtnHandler,this);
			priBtn.x = dinnerBtn.x - 5 - priBtn.width;
			priBtn.y = dinnerBtn.y;
			
			if(UIData.ruid == Api.playerVoApi.getPlayerID() || this.param.data.isDinnerHost)
			{	
				dinnerBtn.visible = false;
			}else{
				dinnerBtn.visible = true;
			}
			this._bottomnodeContainer.addChild(dinnerBtn);
			this._bottomnodeContainer.addChild(priBtn);
			this._shieldBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"chatShield",this.shieldBtnHandler,this);
			this._shieldBtn.x = priBtn.x - 2*this._shieldBtn.width - 10;
			this._shieldBtn.y = bottomBg.y + bottomBg.height  + 10;
			
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

			priBtn.visible = dinnerBtn.visible = !UIData.crossZone;

			if(!Api.friendVoApi.isShowNpc()){
				return ;
			}
			let friendflag = UIData.friendflag;
			let btnImg = ButtonConst.BTN_SMALL_RED;
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
			this._friendsBtn.x = this._shieldBtn.x + this._shieldBtn.width + 5;
			this._friendsBtn.y = this._shieldBtn.y ;
			this._bottomnodeContainer.addChild(this._friendsBtn);
			this._friendsBtn.visible = !UIData.crossZone;
		}


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
		if(data.data.ret){
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
	}
	private doBreakupCallback(data: egret.Event): void
	{
		if(data.data.ret){
			App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_UNFRIEND),this.doBreakupCallback,this);
			let rData = data.data.data;
			if( rData.ret == 0)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("friends_breakupTip2",[this.param.data.name]));
			}
		}
	}
	 
	private doBreakup()
	{
		this._friendsBtn.setText("friendsBtnTxt12");
		this._friendsBtn.setBtnBitMap(ButtonConst.BTN_SMALL_YELLOW);
		this.param.data.friendflag = -1;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_UNFRIEND),this.doBreakupCallback,this);
		NetManager.request(NetRequestConst.REQUEST_FRIEND_UNFRIEND,{fuid:this.param.data.ruid});
	}
	private cancelPosConfirm():void{
		let view = this;
		let cfg = Config.PromoteCfg;
		let UIData = view.param.data;

		let mesObj = {
			 confirmCallback: view.cancel,
			 handler : view, 
			 icon : "itemicon1",
			 iconBg:"itembg_1", 
			 num: Api.playerVoApi.getPlayerGem(), 
			 msg: LanguageManager.getlocal("PromotePlayersPopViewCancelConfirm",[cfg.promoteCost.toString(), UIData.name, LanguageManager.getlocal(`promoteType${UIData.promoteType}`)]),
			 id : 1,
			 useNum : cfg.promoteCost,
			 linespacing : 6,
			 height : 250
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );	
        // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,mesObj);
	}

	private priBtnHandler():void{
		let view = this;
		let UIData = view.param.data;
		ViewController.getInstance().openView(ViewConst.POPUP.PRICHATVIEW, {
			isread : 1,
			issender : 0,
			sender : UIData.ruid,
			sendername : UIData.name,
		});
		view.hide();
	}

	private cancel():void{
		let view = this;
		let UIData = view.param.data;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_CANCEL), this.cancelCallback, this);
		NetManager.request(NetRequestConst.REQUEST_PROMOTE_CANCEL, {
			position : UIData.promoteType
		});
	}

	private cancelCallback(evt : egret.Event):void{
		let view = this;
		let data = evt.data.data;
		if(data.ret < 0){
			App.CommonUtil.showTip(LanguageManager.getlocal('PromotePlayersPopViewcancelFail'));
			return;
		}
		App.CommonUtil.showTip(LanguageManager.getlocal('PromotePlayersPopViewCancelSuccess'));
		Api.promoteVoApi.initListData(evt.data.data.data);
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CANCEL_SUCCESS);
		view.hide();
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
			let maxShieldPlayer = GameConfig.config.friendCfg.maxShieldPlayer;
			if(num >= maxShieldPlayer){
				App.CommonUtil.showTip(LanguageManager.getlocal("chatblockCountMax"));
				return;
			}

			this.request(NetRequestConst.REQUEST_CHAT_BLOCK, {fuid:UIData.ruid});
		}
		
		
	
		// if(LocalStorageManager.get("shield" + UIData.ruid)){

	}
	/**称号排序 */
	private sortTitleInfo(titleinfo:any)
	{	
		// let sorttitleinfo = {};
		let titleCfgList: Config.TitleItemCfg[] = [];
		for (var key in titleinfo) {
			let titleItemcfg = Config.TitleCfg.getTitleCfgById(key);
			titleItemcfg["isHas"] = titleinfo[key]; //isHas 不属于配置里面的 暂且加一个字段
			titleCfgList.push(titleItemcfg);
		}
		titleCfgList.sort((a, b) => { return a.sortId - b.sortId });
		// for (let i = 0; i < titleCfgList.length; i++) {
		// 	sorttitleinfo[titleCfgList[i].id] = titleCfgList[i]["isHas"];
		// }
		return titleCfgList;
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{	
		if(data.data.cmd == NetRequestConst.REQUEST_CHAT_BLOCK){
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldMsg2"));
		}else if(data.data.cmd == NetRequestConst.REQUEST_CHAT_UNBLOCK){
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldMsg3"));
		}
		if(Api.chatVoApi.getIsBlock(this.param.data.ruid)){
			this._shieldBtn.setText("chatCancelShield")
		}
		else{
			this._shieldBtn.setText("chatShield");
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_PRICHAT_FRESHVIEW);
	}

	protected dinerBtnHandler()
	{
		if(Api.playerVoApi.getPlayerLevel() < Config.DinnerCfg.getNeedLv())
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

   	protected getShowHeight():number
	{
		return 795+50;
	}

    protected getResourceList():string[]
	{	

		 let resArray:string[] = [
			"playerview_wipbg","playerview_name_bg","playerview_powerbg","playerview_probg",
			"playerview_pro1","playerview_pro2","playerview_pro3","playerview_pro4","playerview_pro5","playerview_pro6",
			"playerview_pro_inmg2","playerview_infobg","playerview_arrow","playerview_pro7","playerview_pro8","playerview_pro9",
			"progress3","progress3_bg","playerview_lvupBtn","playerview_lvupBtn_down","playerview_power_img",
			"office_fnt","playerview_lvup_word","palace_rewardbg","servant_mask","playerview_pro3_blueType","playerview_pro6_blueType"
		];
		let UIData = this.param.data;
        if ( UIData.bio && Object.keys(UIData.bio).length>0)
        {
            resArray = resArray.concat(["biographyview"]);
        }

		return super.getResourceList().concat(resArray);
	}

	public dispose():void
	{
        this._nodeContainer = null;
		this._bottomnodeContainer = null;
		this.cacheAsBitmap=true;
		this._shieldBtn = null;
		this._friendsBtn = null;
		this._curTitleId = '';
		this._curLevel = 1;
        super.dispose();
    }
}