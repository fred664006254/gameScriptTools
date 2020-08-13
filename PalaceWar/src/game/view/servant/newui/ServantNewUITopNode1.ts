/**
 * 门客新UI 上部1 
 * 门客属性和升级信息
 * author shaoliang
 * date 2019/7/26
 * @class ServantNewUITopNode1
 */

class ServantNewUITopNode1 extends BaseDisplayObjectContainer
{   
	private _servantId:string = null;
	private _servantInfoObj:any = null;
	
	private _progressBar:ProgressBar;
	private _alvImg:BaseLoadBitmap;

	private _nameBgNode:BaseDisplayObjectContainer = null;
	private _nameTxt:BaseTextField;

	private _attrBtnNode:BaseDisplayObjectContainer[] = [];
	private _attrType:number = 1;//显示类型 1 属性 2 资质

	private _lvText:BaseTextField=null;
	private _attrTexts:BaseTextField[]=[];

	private _curLvNeedGold:number = 0 ;
	private _checkFlag:BaseBitmap = null;
	private _task4ClickTimes:number = 0;
	/**
	 * 丹书铁卷
	 */
	private _danshuText:BaseTextField = null;
	private _levelupBtn:BaseButton; 
	private _decreeGoldCost:number = 0;
	private _lastUseTime:number=0;
	private _oldLv:number;

	private _nameplateNode:BaseDisplayObjectContainer = null;
	private _topLine:BaseBitmap = null;
	//品质角标
	private _cornerMarker:BaseDisplayObjectContainer = null;
	private _parent:any = null;

	//非强制主线引导
	private _mainTaskHandKey1:string = null;
	private _mainTaskHandKey2:string = null;
    
    public constructor()
	{
		super();
	}
	public init(servantId:string,p:any):void
	{	
		//穿皮肤
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP),this.resetName,this);
		//升级
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT),this.refreshInfoAfterUpdate,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN),this.refreshInfoAfterUpdate,this);
		//书籍提升
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.resetAttr,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.resetAttr,this);
		//使用丹药
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.resetAttr,this);
		//佳人技能升级
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.resetAttr,this);
		//神器
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE),this.resetAttr,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN),this.resetAttr,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY),this.resetAttr,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL),this.resetAttr,this);
		//换衣服
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.refreshInfoAfterUpdate,this);
		//突破
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.resetAttr,this);

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKINSPECIALAURA),this.resetAttr,this);

		this._servantId = servantId;
		let servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
		this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
		this.resetServantId(this._servantId)

		this._parent = p;

		//属性铭牌
		this._nameplateNode = new BaseDisplayObjectContainer();
		this.addChild(this._nameplateNode);

		let specialAbility  = servantCfg.speciality;
		let len = specialAbility.length;

		let topLine = BaseBitmap.create("servant_speciality_line");
		topLine.setPosition(38,13);
		this._nameplateNode.addChild(topLine);
		this._topLine = topLine;

		for (let i = 1; i < len; i++) 
		{
			let middleLine = BaseBitmap.create("servant_speciality_line");
			middleLine.setPosition(topLine.x,topLine.y+89*i);
			this._nameplateNode.addChild(middleLine);
		}

		let downLine = BaseBitmap.create("servant_speciality_line");
		downLine.setPosition(topLine.x,topLine.y+89*(len-1)+73);
		this._nameplateNode.addChild(downLine);

		for (var index = 0; index < len; index++) {
			
			var element = specialAbility[index];
			//图 
			let nameKey = element;
			if (Number(element)>4)
			{
				nameKey = 5;
			}
			let specialityBg = BaseBitmap.create("servant_attr_bg"+nameKey);
			specialityBg.setPosition(27,topLine.y+88*index+78);
			this._nameplateNode.addChild(specialityBg);
			//英 泰 俄 葡
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()){
				specialityBg.setPosition(433 - specialityBg.width - 5, 20 + (specialityBg.height + 5)*index);
			}
			
			let spText = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_speciality"+nameKey),20,TextFieldConst.COLOR_WHITE);
			spText.setPosition(specialityBg.x,specialityBg.y-1);
			spText.width = specialityBg.width;
			spText.height = specialityBg.height;
			spText.textAlign = egret.HorizontalAlign.CENTER;
			spText.verticalAlign = egret.VerticalAlign.MIDDLE;
			this._nameplateNode.addChild(spText);
		}

		this._alvImg = BaseLoadBitmap.create("servant_alv_0");
		this._alvImg.width = 91;
		this._alvImg.height = 81;
		// this._alvImg.visible = false;
		this.addChild(this._alvImg);
		// if (this._servantInfoObj.clv > 0){
		// 	this._alvImg.visible = true;
		// 	this._topLine.visible = true;
		// }
		// else
		// {
		// 	// this._nameplateNode.y = -70;
		// 	this._topLine.visible = false;
		// }
		this._alvImg.setPosition(5,3);

		//名字
		this._nameBgNode = new BaseDisplayObjectContainer();
		this.addChild(this._nameBgNode);

		//详情
		let detailImg = ComponentManager.getButton("servant_info_detail","",this.detailClickHandler,this)
		detailImg.x = 276;
		detailImg.y = 396;
		this.addChild(detailImg);
		if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang() || PlatformManager.checkIsKRSp()){
			detailImg.y = 407;
		}

		

		// 属性
		let rightBg = BaseBitmap.create("servant_attr_bg");
		rightBg.width = 193;
		rightBg.height = 500;
		rightBg.setPosition(433, -10);
		this.addChild(rightBg);

		//勾选底
		let probg = BaseBitmap.create("hold_dinner_box")
		probg.x = rightBg.x+35;
		probg.y = 328;
		probg.name = "probg";
		this.addChild(probg);

		//连升十级
		let tenTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		tenTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        tenTxt.text = LanguageManager.getlocal("servantInfo_tenTips");
        tenTxt.x = probg.x+40;
        tenTxt.y = probg.y+10;
		tenTxt.name = "tenText";
        this.addChild( tenTxt);

		this._checkFlag = BaseLoadBitmap.create("hold_dinner_check");
		this._checkFlag.width = this._checkFlag.height = 38;
		this._checkFlag.x = probg.x;
		this._checkFlag.y = tenTxt.y - 10;
		this._checkFlag.alpha = ServantInfoView.CALPHA;
		this.addChild(this._checkFlag);
		this._checkFlag.addTouchTap(this.changeCheckFlagStatus,this);
		
		let levelupBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.levelupBtnClickHandler,this);
		levelupBtn.x = 467;//probg.x + probg.width/2 - levelupBtn.width/2;
		levelupBtn.y = 380;//proY + 12 + 55;
		levelupBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChild(levelupBtn);
		this._levelupBtn = levelupBtn;
		if (!Api.rookieVoApi.isGuiding && !Api.rookieVoApi.isInGuiding){
			let curTaskId = Api.mainTaskVoApi.getCurMainTaskId();
			let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(curTaskId);
			if (taskCfg){
				if (taskCfg.need && (taskCfg.questType == 201 || taskCfg.questType == 202)){
					if (servantId == taskCfg.need && taskCfg.questType == 201 || (taskCfg.questType == 202 && this._servantInfoObj.level < taskCfg.need)){
						if (this._checkFlag.alpha == 0){
							this.getMainTaskHandLvTenFlag(taskCfg.questType);
						}
						else{
							this.getMainTaskHandLvUp(taskCfg.questType);
						}
					}
				}
				else if (taskCfg.questType == 206){
					let needClv = taskCfg.need;
					let servantLvList = Config.ServantBaseCfg.getServantLvList();
					let topLv = servantLvList[String(needClv-1)].upLv;
					if (this._servantInfoObj.clv < needClv && this._servantInfoObj.level <= topLv){
						if (this._servantInfoObj.level == topLv){
							this.getMainTaskHandLvUp(taskCfg.questType);
						}
						else{
							if (this._checkFlag.alpha == 0){
								this.getMainTaskHandLvTenFlag(taskCfg.questType);
							}
							else{
								this.getMainTaskHandLvUp(taskCfg.questType);
							}
						}
					}
				}
			}
		}
		
		let attrNode1 = new BaseDisplayObjectContainer();
		attrNode1.x = rightBg.x;
		this.addChild(attrNode1);
		let attrNode2 = new BaseDisplayObjectContainer();
		attrNode2.x = rightBg.x;
		this.addChild(attrNode2);

		this._attrBtnNode= [attrNode1,attrNode2];

		let divisor1 = BaseBitmap.create("servant_attr_divisor");
		divisor1.setPosition(92,74);
		attrNode1.addChild(divisor1);

		let divisor2 = BaseBitmap.create("servant_attr_divisor");
		divisor2.setPosition(divisor1.x,divisor1.y);
		attrNode2.addChild(divisor2);

		let attr1Node1 = BaseBitmap.create("servant_attr_left1");
		attr1Node1.setPosition(16,62);
		attrNode1.addChild(attr1Node1);

		let attr2Node1 = BaseBitmap.create("servant_attr_right1");
		attr2Node1.setPosition(98,62);
		attrNode1.addChild(attr2Node1);
		attr2Node1.addTouchTap(this.clickSwitchAttr,this,[2]);

		let attr1Node2 = BaseBitmap.create("servant_attr_left2");
		attr1Node2.setPosition(16,62);
		attrNode2.addChild(attr1Node2);
		attr1Node2.addTouchTap(this.clickSwitchAttr,this,[1]);

		let attr2Node2 = BaseBitmap.create("servant_attr_right2");
		attr2Node2.setPosition(98,62);
		attrNode2.addChild(attr2Node2);

		let attrLine = BaseBitmap.create("servant_attr_line");
		attrLine.setPosition(rightBg.x+rightBg.width/2-attrLine.width/2,101);
		this.addChild(attrLine);
		
		this._lvText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._lvText.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
		this._lvText.setPosition(rightBg.x+15,122);
		this.addChild(this._lvText);
		this._lvText.bold = true;

		let label1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		label1.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
		label1.setPosition(this._lvText.x,this._lvText.y+30);
		this.addChild(label1);
		this._attrTexts.push(label1);
		label1.bold = true;

		for (let i = 0; i<4; i++)
		{
			let labelone = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
			labelone.textColor = TextFieldConst.COLOR_WHITE;
			labelone.setPosition(label1.x,195+i*29);
			this.addChild(labelone);
			this._attrTexts.push(labelone);
			labelone.bold = true;
		}

		this._progressBar = ComponentManager.getProgressBar("servant_info_bar_1","servant_info_bar_bg",GameConfig.stageWidth);
		this._progressBar.y = 470;
		this._progressBar.setTextSize(18);
		this.addChild(this._progressBar);
		this.changeProgressText();


		if(servantCfg.quality2 )
        {
            let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
            cornerImg.x = 360;
            cornerImg.y = 15;
			cornerImg.setScale(1.3);
            this.addChild(cornerImg);
			this._cornerMarker = cornerImg;
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()){
				cornerImg.x = 12;
            	cornerImg.y = topLine.y + 83;
			}
        }

		this.resetName();
		this.resetLv();
		this.resetAttr();
		this.refreshBaseUIInfo();
	}
	
	private getMainTaskHandLvTenFlag(type:number){
		egret.callLater(()=>{
			this._mainTaskHandKey1 = App.MainTaskHandUtil.addHandNode(
			// this.parent.parent.parent,
			this,
			this._checkFlag.x + 10,
			this._checkFlag.y - 10, 
			[this._checkFlag],
			type, 
			true, 
			function() {
				this.parent.parent.parent.setChildIndex(this.parent.parent, 999);
				return true;
			}, 
			this
		)}, this,null);
	}

	private getMainTaskHandLvUp(type:number):void{
		egret.callLater(()=>{
			this._mainTaskHandKey2 = App.MainTaskHandUtil.addHandNode(
			this,
			this._levelupBtn.x + this._levelupBtn.width/2 - 20,
			this._levelupBtn.y - 10, 
			[this._levelupBtn],
			type, 
			true, 
			function() {	
				this.parent.parent.parent.setChildIndex(this.parent.parent, 999);			
				return true;
			}, 
			this
		)}, this,null);
	}

	protected refreshBaseUIInfo()
	{
		this._progressBar.setPercentage(this._servantInfoObj.hasexp/this._curLvNeedGold);
		this.resreshUITextInfoAndBtnStatus();
	}

	private resetName():void
	{
		this._nameBgNode.removeChildren();
		let wearId = Api.servantVoApi.getservantSkinIdInWear(this._servantId) || null ;
		if (wearId)
		{	
			let nameBg = BaseBitmap.create("servant_name_advanced");
			nameBg.setPosition(94,400);
			this._nameBgNode.addChild(nameBg);

			let clip = ComponentManager.getCustomMovieClip("servant_name_ef",12);
            clip.x = nameBg.x-8;
            clip.y = nameBg.y-16;
			clip.blendMode = egret.BlendMode.ADD;
            this._nameBgNode.addChild(clip);
            clip.playWithTime(0);
			if (PlatformManager.checkIsEnSp() ||PlatformManager.checkIsRuSp())
            {
                clip.x = nameBg.x-11;
                clip.y = nameBg.y-19;
            }

			this._nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._nameTxt.width = 180;
			this._nameTxt.textAlign = egret.HorizontalAlign.CENTER;
			this._nameTxt.multiline = true;
			this._nameTxt.text = LanguageManager.getlocal("servant_newui_skinname",[LanguageManager.getlocal("servantSkinName"+wearId),LanguageManager.getlocal("servant_name"+this._servantId)]);
			this._nameTxt.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
			this._nameTxt.setPosition(nameBg.x+15,nameBg.y+14);
			this._nameBgNode.addChild(this._nameTxt);
		}
		else
		{
			let nameBg = BaseLoadBitmap.create("wifestatus_namebg");
			nameBg.width = 220;
			nameBg.height = 36;
			nameBg.setPosition(104,409);
			this._nameBgNode.addChild(nameBg);

			this._nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._nameTxt.width = 180;
			this._nameTxt.textAlign = egret.HorizontalAlign.CENTER;
			this._nameTxt.multiline = true;
			this._nameTxt.text = LanguageManager.getlocal("servant_name"+this._servantId);
			this._nameTxt.textColor = TextFieldConst.COLOR_QUALITY_WHITE;;
			this._nameTxt.setPosition(nameBg.x+20,nameBg.y+nameBg.height/2-this._nameTxt.height/2);
			this._nameBgNode.addChild(this._nameTxt);
		}
	}

	protected resetServantId(newServantId:string)
	{
		this._servantId = newServantId;
		let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
		this._servantInfoObj = servantInfoObj;
		this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level-1];
	}

	private clickSwitchAttr(event,type:number):void
	{
		this._attrType = type;
		this.resetAttr();
	}

	private resetLv():void
	{
		this._lvText.text = LanguageManager.getlocal("itemLevel",[String(this._servantInfoObj.level)]);
	}

	private resetAttr():void
	{	
		if (this._attrType == 1)
		{
			this._attrBtnNode[0].visible = true;
			this._attrBtnNode[1].visible = false;
		}
		else
		{
			this._attrBtnNode[0].visible = false;
			this._attrBtnNode[1].visible = true;
		}

		if (this._attrType ==1)
		{
			for (let i = 0; i<=4; i++)
			{
				this._attrTexts[i].text = LanguageManager.getlocal("servant_newui_attr"+i,[this.getAttr1ById(i)]);
			}
		}
		else
		{
			for (let i = 0; i<=4; i++)
			{
				this._attrTexts[i].text = LanguageManager.getlocal("servant_newui_zizhi"+i,[this.getAttr2ById(i)]);
			}
		}
		this._lvText.text = LanguageManager.getlocal("itemLevel",[String(this._servantInfoObj.level)]);

	}

	protected changeCheckFlagStatus()
	{
		this._task4ClickTimes = 1;
		this._checkFlag.alpha = (this._checkFlag.alpha+1)%2;
		ServantInfoView.CALPHA = this._checkFlag.alpha;
		if (this._checkFlag.alpha == 1){
			App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_tenTips2"));
		}
		this.changeProgressText();
		if (Api.rookieVoApi.curGuideKey == "maintask" ){
			Api.rookieVoApi.checkNextStep();
		}
		if (this._checkFlag.alpha == 1 && this._mainTaskHandKey1){
			App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
			this._mainTaskHandKey1 = null;
			let curTaskId = Api.mainTaskVoApi.getCurMainTaskId();
			let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(curTaskId);
			this.getMainTaskHandLvUp(taskCfg.questType);
		}
	}

	protected resreshUITextInfoAndBtnStatus()
	{
		// if (this._servantInfoObj.clv > 0){
			this._alvImg.setload("servant_alv_" + this._servantInfoObj.clv);
			// this._alvImg.visible = true;
			this._nameplateNode.y = 0;
			if(!PlatformManager.checkIsTextHorizontal()){ 
			}
		// }else{
		// 	if(!PlatformManager.checkIsTextHorizontal()){
		// 	}
		// 	// this._alvImg.visible = false;
		// }
		this._nameTxt.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
		//ServantScrollItem.getQualityColor(this._servantInfoObj.clv);
		// this._lvText.text = LanguageManager.getlocal("itemLevel",[String(this._servantInfoObj.level)]);
		

		this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
		this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level-1];

		//400级以上，不显示十连升，显示道具数量。
		if (this._servantInfoObj.clv > Config.ServantBaseCfg.commonMaxClv())
		{
			if (this._checkFlag)
			{
				let tenText = <BaseTextField>this.getChildByName("tenText");
				tenText.dispose();
				let probg = <BaseBitmap>this.getChildByName("probg");
				probg.dispose();
				
				this._checkFlag.dispose();
				this._checkFlag = null;
			}
			if (!this._danshuText)
			{
				let danshuSp:BaseLoadBitmap = BaseLoadBitmap.create("servant_item1740");
				danshuSp.x = 470;
				danshuSp.y = 325;
				danshuSp.name = "danshuSp";
				this.addChild(danshuSp);

				this._danshuText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL);
				this._danshuText.setPosition(danshuSp.x+60,danshuSp.y+18);
				this.addChild(this._danshuText);
			}
			let itemNum:number = Api.itemVoApi.getItemNumInfoVoById(Config.ServantBaseCfg.getDanShuID());
			let needNum:number = Config.ServantBaseCfg.getLvUpNeedItemNum(this._servantInfoObj.level);
			this._danshuText.text = itemNum +"/"+ needNum;
			if (itemNum>=needNum)
			{
				this._danshuText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
			}
			else
			{
				this._danshuText.textColor = TextFieldConst.COLOR_WARN_RED;
			}
		}
		else
		{
			if (this._danshuText)
			{
				let danshuSp = <BaseBitmap>this.getChildByName("danshuSp");
				danshuSp.dispose();
				
				this._danshuText.dispose();
				this._danshuText = null;
			}
			if (!this._checkFlag)
			{
				//勾选底
				let probg = BaseBitmap.create("hold_dinner_box")
				probg.x = 480;
				probg.y = 465;
				probg.name = "probg";
				this.addChild(probg);

				//连升十级
				let tenTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
				tenTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
				tenTxt.text = LanguageManager.getlocal("servantInfo_tenTips");
				tenTxt.x = 525;
				tenTxt.y = 470;
				tenTxt.size =24;
				tenTxt.name = "tenText";
				this.addChild( tenTxt);

				this._checkFlag = BaseLoadBitmap.create("hold_dinner_check");
				this._checkFlag.width = this._checkFlag.height = 38;
				this._checkFlag.x = 480;
				this._checkFlag.y = tenTxt.y - 10;
				this._checkFlag.alpha = ServantInfoView.CALPHA;
				this.addChild(this._checkFlag);
				this._checkFlag.addTouchTap(this.changeCheckFlagStatus,this);
				this.changeProgressText();
			}
		}
		

		this.changeProgressText();
		this.changeLvBtnStatus();
	}

	protected changeLvBtnStatus()
	{
		if (this._servantInfoObj.isLvEnableForAdvance()){
			this._levelupBtn.setText("servant_clvUpBtn");
		}else{
			this._levelupBtn.setText("servantInfoLevelup");
		}

		if(this._servantInfoObj.isAdvanceEnable()){
			App.DisplayUtil.changeToNormal(this._levelupBtn);
		}else{
			// if(this._curLvNeedGold - this._servantInfoObj.hasexp - this._decreeGoldCost > Api.playerVoApi.getPlayerGold() || this._servantInfoObj.isAtTopLv() ){
			let needGold:number = (this._curLvNeedGold - this._servantInfoObj.hasexp);
			if((Api.playerVoApi.getPlayerGold() == 0 && needGold>0) || this._servantInfoObj.isAtTopLv() ){
				App.DisplayUtil.changeToGray(this._levelupBtn);
			}else{
				App.DisplayUtil.changeToNormal(this._levelupBtn);
			}
		}
		this.checkRedPoint();
	}

	protected changeProgressText()
	{
		let needGold = (this._curLvNeedGold - this._servantInfoObj.hasexp) ;
		let cnKey = "servantInfo_levelupNeed" ;

		let attrInfo = Api.servantVoApi.getDecreePolicyAddAttrInfo();
		let attrStr = "";
		let subNeed = 0;
		let totalSubNeed = 0;
		let deltaT = 0;
		if(attrInfo.lastTimes > 0){
			subNeed = Math.floor(this._curLvNeedGold *attrInfo.addExtent);
			totalSubNeed += subNeed;
			deltaT ++;
		}

		if (this._checkFlag && this._checkFlag.alpha == 1){
			cnKey = "servantInfo_levelupNeed2" ;
			let curLv = this._servantInfoObj.level;
			for (var index = curLv; index < curLv+9; index++) {
				let needNextLv = GameConfig.config.servantbaseCfg.upgradeNeed[index];
				if(needNextLv){
					needGold += needNextLv;
					if(deltaT < attrInfo.lastTimes){
						totalSubNeed +=  Math.floor(needNextLv *attrInfo.addExtent);
					}
					deltaT ++;
				}else{
					break;
				}
			}
		}
		this._decreeGoldCost = 0;
		if(attrInfo.lastTimes > 0){
			let keyStr:string = attrInfo.strKey;
			if (keyStr == "decreeAttrAddTxt0")
			{
				keyStr = "decreeAttrAddTxt00"
			}
			this._decreeGoldCost = totalSubNeed;
		 	attrStr = "<font color=0x65eb5d>" + LanguageManager.getlocal(keyStr,[attrInfo.strKey2,"-"+totalSubNeed]) + "</font>";
		}
		this._progressBar.setText(LanguageManager.getlocal(cnKey) + needGold + LanguageManager.getlocal("servantInfo_levelupNeedGold") + attrStr);
	}


	protected detailClickHandler()
	{
		if(Api.rookieVoApi.getIsGuiding()){
			return;
		} 

		if(Api.switchVoApi.checkBiography())
		{
			ViewController.getInstance().openView(ViewConst.POPUP.SERVANTATTRDETAILSPOPUPVIEW,this._servantId);
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.POPUP.SERVANTATTRDETAILPOPUPVIEW,this._servantId);
		}
	}

	protected getAttr1ById(id:number):string
	{
		if(!this._servantInfoObj){
			return;
		}

		if(id == 0){
			return App.StringUtil.changeIntToText(this._servantInfoObj.total);
		}
		if(id == 1){
			return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.forceTotal);//LanguageManager.getlocal("servant_force",[String(this._servantInfoObj.attrVo.forceTotal)]) ;
		}
		if(id == 2){
			return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.brainsTotal);
		}
		if(id == 3){
			return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.politicsTotal);
		}
		if(id == 4){
			return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.charmTotal);
		}
		return "";
	}

	protected getAttr2ById(id:number):string
	{
		if(!this._servantInfoObj){
			return;
		}
		if(id == 0){
			return App.StringUtil.changeIntToText(this._servantInfoObj.getTotalBookValue());
		}
		if(id == 1){
			return App.StringUtil.changeIntToText(this._servantInfoObj.getTotalBookValue(1));
		}
		if(id == 2){
			return App.StringUtil.changeIntToText(this._servantInfoObj.getTotalBookValue(2));
		}
		if(id == 3){
			return App.StringUtil.changeIntToText(this._servantInfoObj.getTotalBookValue(3));
		}
		if(id == 4){
			return App.StringUtil.changeIntToText(this._servantInfoObj.getTotalBookValue(4));
		}
		return "";
	}

	protected levelupBtnClickHandler()
	{
		if (Api.rookieVoApi.curStep == "servant2_6" ){
			Api.rookieVoApi.checkNextStep();
		}
		
		if (this._mainTaskHandKey2){
			App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey2);
			this._mainTaskHandKey2 = null;
		}
		
		if (this._servantInfoObj.isLvEnableForAdvance()){

			if (this._servantInfoObj.clv >= Config.ServantBaseCfg.commonMaxClv())
			{	
				if (Api.playerVoApi.getPlayerLevel()<14)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip5"));
					return;
				}
			}

			ViewController.getInstance().openView(ViewConst.POPUP.SERVANTADVANCEPOPUPVIEW,this._servantId);
			return;
		}

		let newT = egret.getTimer();
		if (newT - this._lastUseTime < 800){
			return;
		}
		this._lastUseTime = newT;
		if(this._servantInfoObj.isAtTopLv()){
			App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip1"));
			return;
		}
		// if(this._curLvNeedGold - this._servantInfoObj.hasexp - this._decreeGoldCost > Api.playerVoApi.getPlayerGold()){
		
		this._task4ClickTimes = 2;
		this._oldLv = this._servantInfoObj.level;

		if (this._oldLv>=Config.ServantBaseCfg.commonMaxLv())
		{	
			let needGold:number = (this._curLvNeedGold - this._servantInfoObj.hasexp);
			let itemNum:number = Api.itemVoApi.getItemNumInfoVoById(Config.ServantBaseCfg.getDanShuID());
			let needNum:number = Config.ServantBaseCfg.getLvUpNeedItemNum(this._servantInfoObj.level);
			if (needGold<=0 && (itemNum<needNum))
			{	
				App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip4"));
				return;
			}
			if (Api.playerVoApi.getPlayerGold() == 0 && needGold>0){
				App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
				//需要判断资源是否足够当前银两不足，提示：银两不足 servantInfo_levelupTip3
				return
			}

			NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT,{servantId:this._servantId});
		}
		else
		{
			if (Api.playerVoApi.getPlayerGold() == 0 ){
				App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
				//需要判断资源是否足够当前银两不足，提示：银两不足 servantInfo_levelupTip3
				return
			}

			if (this._checkFlag.alpha == 0){
				NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT,{servantId:this._servantId});
			}else{
				NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN,{servantId:this._servantId});
			}
		}

		
	}
	//升级之后刷新数据
	protected refreshInfoAfterUpdate(p:any)
	{
		Api.rookieVoApi.checkNextStep();
		this.resreshUITextInfoAndBtnStatus();

		let newPer = this._servantInfoObj.hasexp/this._curLvNeedGold
		let oldPer = this._progressBar.getPercent();
		let deltaT = 500;
		if (this._oldLv < this._servantInfoObj.level){
			let addLv = this._servantInfoObj.level - this._oldLv;
			egret.Tween.get(this._progressBar,{loop:false}).to({percent:1},(1-oldPer)*deltaT).set({percent:0},0).to({percent:newPer},deltaT*newPer);

			if (p.data.ret == true && p.data.data.data.lucky) {
				App.CommonUtil.showGodbless("servantLv");
			}
			this.showUpgradeEffect(addLv)
		}else{
			egret.Tween.get(this._progressBar,{loop:false}).to({percent:newPer},(newPer-oldPer)*deltaT);
		}

		//功能解锁
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);

		this.checkRedPoint();
	}

	private checkRedPoint():void
	{
		if (this._servantInfoObj.isAdvanceEnable())
		{
			App.CommonUtil.addIconToBDOC(this._levelupBtn);
		}
		else
		{
			App.CommonUtil.removeIconFromBDOC(this._levelupBtn);
		}
	}

		//播放升级成功动画
	protected showUpgradeEffect(addLv:number)
	{	
		SoundManager.playEffect(SoundConst.EFFECT_UPD); 

		let servant_upgrade_word = ComponentManager.getBitmapText(LanguageManager.getlocal("servant_xLv",[String(addLv)]),TextFieldConst.FONTNAME_BOSS_SCORE,TextFieldConst.COLOR_LIGHT_YELLOW,TextFieldConst.FONTSIZE_TITLE_BIG);
		servant_upgrade_word.x = 240-120;
		servant_upgrade_word.y = 200

		let upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame",5,100);
		upgradeClip.setScale(2);
		upgradeClip.x = 110-120;
		upgradeClip.y = 20;
		this.addChild(upgradeClip);
		upgradeClip.playWithTime(1);
		let txtBg:BaseBitmap = null;
		let offsetY = 0;
		if(PlatformManager.checkIsThSp() || PlatformManager.checkIsRuSp())
		{
			let clip = BaseBitmap.create("servant_upgrade_frame1");
			servant_upgrade_word.x = upgradeClip.x  + 213  - servant_upgrade_word.width / 2;

			servant_upgrade_word = <BaseTextField>servant_upgrade_word;
			servant_upgrade_word.bold = true;
			txtBg = BaseBitmap.create("public_9_powertipbg2");
			txtBg.height = 49;
			txtBg.width = servant_upgrade_word.width + 90;
			txtBg.setPosition(servant_upgrade_word.x + servant_upgrade_word.width / 2 - txtBg.width / 2,servant_upgrade_word.y + servant_upgrade_word.height / 2 - txtBg.height / 2);
			this.addChild(txtBg);
			offsetY = txtBg.y - 50
		}
		this.addChild(servant_upgrade_word);
		egret.Tween.get(servant_upgrade_word,{loop:false}).to({y:150},800).to({alpha:0},100);
		if(txtBg)
		{
			egret.Tween.get(txtBg,{loop:false}).to({y:offsetY},800).to({alpha:0},100);
		}

		let tmpthis = this;
		egret.Tween.get(this,{loop:false}).wait(500).call(function(){
			tmpthis._parent.text = Api.playerVoApi.getPlayerGoldStr();
			//字体刷新加个延时

			let sweeplight = ComponentManager.getCustomMovieClip("sweeplight_effect",8,80);
			sweeplight.x = 433;
			sweeplight.y = 0;
			sweeplight.scaleX = 193/185;
			tmpthis.addChild(sweeplight);
			sweeplight.playWithTime(1);
			sweeplight.setEndCallBack(()=>{
				sweeplight.dispose();
			},tmpthis);

			tmpthis.changeProgressText();
			tmpthis.resetAttr();
			tmpthis.removeChild(upgradeClip);
			upgradeClip = null;
			tmpthis.removeChild(servant_upgrade_word);
			servant_upgrade_word = null;
			if(txtBg)
			{
				tmpthis.removeChild(txtBg);
			}

		})
	}


	public dispose()
    {
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP),this.resetName,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT),this.refreshInfoAfterUpdate,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN),this.refreshInfoAfterUpdate,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.resetAttr,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.resetAttr,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.resetAttr,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.resetAttr,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE),this.resetAttr,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN),this.resetAttr,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY),this.resetAttr,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL),this.resetAttr,this);

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.refreshInfoAfterUpdate,this);

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.resetAttr,this);

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKINSPECIALAURA),this.resetAttr,this);
		this._servantId = null;
		this._servantInfoObj = null;
		this._progressBar = null;
		this._alvImg = null;
		this._nameBgNode = null;
		this._nameTxt = null;
		this._attrBtnNode.length = 0;
		this._attrType = 1;
		this._attrTexts.length = 0;
		this._curLvNeedGold = 0; 
		this._checkFlag = null;
		this._danshuText = null;
		this._task4ClickTimes = null;
		this._levelupBtn = null;
		this._decreeGoldCost = 0;
		this._lastUseTime = 0;
		this._oldLv = null;
		this._parent = null;
		this._nameplateNode = null;
		this._topLine = null;
		this._cornerMarker = null;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
		this._mainTaskHandKey1 = null;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey2);
		this._mainTaskHandKey2 = null;

		super.dispose();
    }
}