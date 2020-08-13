/**
 * 册封选择列表
 * author dky
 * date 2018/4/26
 * @class WifestatusWifePopupView
 */
class WifestatusWifePopupView extends PopupView
{
	// public _achId:string;
	private _redDotSp:BaseBitmap = null;
	public static itemId:string;
	private _achIndex:number;

	private _oldList:Array<number>;

	private _wifeIcon:BaseLoadBitmap;
	private _droWifeIcon:BaseLoadDragonBones;
	private _wifeInfoVo: WifeInfoVo;

	private _progressBar1: ProgressBar;
	private _progressBar2: ProgressBar;

	private _levelTxt1: BaseTextField;
	private _levelTxt2: BaseTextField;

	private _oldStar:number;

	private _bgbb:BaseBitmap = null;
	private _nameTxt: BaseTextField = null;
	private _namebg:BaseBitmap = null;

	private _isDouble:boolean = false;
	private _droWifeIcon2:BaseLoadDragonBones;
	private _doubleContainer:BaseDisplayObjectContainer = null;

	public constructor() 
	{
		super();
	}

	private checkBoneName(name:string):string
	{	
		if (this._isDouble)
		{
			return name+"_1";
		}
		return name;
	}

	private getDoubleBoneByName(name:string):string
	{	
		if (this._isDouble)
		{
			let doubleName = name.substr(0,name.length-1)+"2";
			return doubleName;
		}
		return name;
	}

	private checkShowDoubleName():void
	{
		if (this._isDouble)
		{	
			this._namebg.visible = false;
			this._nameTxt.visible = false;

			this._doubleContainer= new BaseDisplayObjectContainer();
			this._doubleContainer.x = GameData.popupviewOffsetX;
			this.addChildToContainer(this._doubleContainer);

			if (PlatformManager.checkIsTextHorizontal())
			{
				let nameBg1:BaseBitmap = BaseBitmap.create("wife_doublefly_namebg");
				nameBg1.setPosition( 100 ,430);
				this._doubleContainer.addChild(nameBg1);

				let nameBg2:BaseBitmap = BaseBitmap.create("wife_doublefly_namebg");
				nameBg2.setPosition( nameBg1.x + nameBg1.width+ 30,nameBg1.y);
				this._doubleContainer.addChild(nameBg2);

				let nameTF1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1);
				this._doubleContainer.addChild(nameTF1);

				let nameTF2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2);
				this._doubleContainer.addChild(nameTF2);
			}
			else
			{
				let nameBg1:BaseBitmap = BaseBitmap.create("public_infobg2");
				nameBg1.setPosition(50 ,50);
				this._doubleContainer.addChild(nameBg1);

				let nameBg2:BaseBitmap = BaseBitmap.create("public_infobg2");
				nameBg2.setPosition(450 ,50);
				this._doubleContainer.addChild(nameBg2);

				let nameTF1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
				this._doubleContainer.addChild(nameTF1);

				let nameTF2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
				this._doubleContainer.addChild(nameTF2);

				nameTF1.width = 27;
				nameTF2.width = 27;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1, [5,-5]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2, [5,-5]);
			}
			
		}
	}

	public initView():void
	{		

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFE,this.setData,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP),this.refreshItem,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING,this.refreshItem,this);
		// let bgBB2:BaseBitmap = BaseBitmap.create("wifestatus_smallbg");
		// bgBB2.x = 20;
		// bgBB2.y = 10;
		// this.addChildToContainer(bgBB2);

		let bgBB:BaseBitmap = BaseBitmap.create("wifestatus_smallbg");
		bgBB.x = 20+GameData.popupviewOffsetX;
		bgBB.y = 10;
		// bgBB.mask = bgBB2;
		this.addChildToContainer(bgBB);
		this._bgbb = bgBB;

		let wifeId = this.param.data.wifeId
		WifestatusView.wifeId = wifeId;
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);

		let wifePicStr = this._wifeInfoVo.body;
		this._isDouble = (wifeId == "236");
		
		if(Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePicStr = skinCfg.body;
				let bonename = this.checkBoneName(skinCfg.bone);
				if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					// this._droWifeIcon.setScale(0.7)
					// this._droWifeIcon.x = 0;
					// this._droWifeIcon.y = 0;
					this.addChildToContainer(this._droWifeIcon);

				}
			}
			else{
				let bonename = this.checkBoneName(this._wifeInfoVo.bone);
				if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					// this._droWifeIcon.setScale(0.7)
					// this._droWifeIcon.x = this._wifeIcon.x;
					// this._droWifeIcon.y = this._wifeIcon.y;
					this.addChildToContainer(this._droWifeIcon);
				}
			}
			
		}else{
			let bonename = this.checkBoneName(this._wifeInfoVo.bone);
			if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
			{

				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
				// this._droWifeIcon.setScale(0.7)
				// this._droWifeIcon.x = this._wifeIcon.x;
				// this._droWifeIcon.y = this._wifeIcon.y;
				this.addChildToContainer(this._droWifeIcon);
			}
		}

		let wifeScale = 0.6;
		//红颜图像
		this._wifeIcon = BaseLoadBitmap.create(wifePicStr);
		this._wifeIcon.x = 100;
		
		this._wifeIcon.setScale(wifeScale);
		this.addChildToContainer(this._wifeIcon);
		this._wifeIcon.y = 12;

		// if(this._droWifeIcon)
		// {
			// let mask = new BaseShape();
			// mask.graphics.beginFill(0x000000);
			// mask.graphics.drawRect(bgBB.x,bgBB.y,bgBB.width,bgBB.height);
			// mask.graphics.endFill();
			// this.addChildToContainer(mask);
			// this._wifeIcon.visible = false;
			// this._droWifeIcon.mask = mask;
		// }

		// if(this._wifeIcon.y + 840*wifeScale <  this._bottomBg.y + 50){
		// 	this._wifeIcon.y = this._bottomBg.y + 50 - 840*wifeScale;
			
		// }
		if(this._droWifeIcon)
		{
			this._droWifeIcon.x = this._wifeIcon.x + 200;
			this._droWifeIcon.y = this._wifeIcon.y + 840*0.6 + 30;
			
			let scaleNum=0.9;
			let mask=egret.Rectangle.create();
			let offX=Math.abs(bgBB.x-this._droWifeIcon.x);
			mask.setTo(bgBB.x-this._droWifeIcon.x*1/scaleNum+5,bgBB.y-this._droWifeIcon.y*1/scaleNum,bgBB.width*1/scaleNum,bgBB.height*1/scaleNum);
			this._wifeIcon.visible = false;
			this._droWifeIcon.mask = mask;
			this._droWifeIcon.setScale(scaleNum)


			if (this._isDouble)
			{
				let twoName = this.getDoubleBoneByName(this._droWifeIcon.getBoneName());
				if(Api.wifeVoApi.isHaveBone(twoName + "_ske"))
				{
					this._droWifeIcon2=App.DragonBonesUtil.getLoadDragonBones(twoName);
					this._droWifeIcon2.x = this._droWifeIcon.x;
					this._droWifeIcon2.y = this._droWifeIcon.y;
					this.addChildToContainer(this._droWifeIcon2);
					this.removeChildFromContainer(this._droWifeIcon);
					this.addChildToContainer(this._droWifeIcon);

					this._droWifeIcon2.mask = mask;
					this._droWifeIcon2.setScale(scaleNum)
				}
			}


		}
		// this.cacheAsBitmap = true;

		//红颜名字背景
		let nameBg:BaseBitmap = BaseBitmap.create("wifeview_namebg");
		nameBg.x = 65+GameData.popupviewOffsetX;
		nameBg.y = 100;
		nameBg.setScale(0.79);
		this._namebg = nameBg;
		this.addChildToContainer(nameBg);
		//红颜名字
		let nameTF = ComponentManager.getTextField(this._wifeInfoVo.name,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WHITE);
		if(PlatformManager.checkIsTextHorizontal())
		{
			// nameTF.setPosition(GameConfig.stageWidth / 2 - nameTF.width / 2 - 20,GameConfig.stageHeigth / 2 );
			nameTF.setPosition(bgBB.x + bgBB.width / 2 -  nameTF.width / 2 ,bgBB.y + bgBB.height - nameTF.height - 20);
			nameBg.width = (nameTF.width + 20)/nameBg.scaleX;
			nameBg.setPosition(nameTF.x + nameTF.width / 2 - nameBg.width * nameBg.scaleX / 2, nameTF.y + nameTF.height / 2 - nameBg.height* nameBg.scaleY / 2 );

		}
		else
		{
			nameTF.width = 27;
			nameTF.x = nameBg.x + nameBg.width*0.79/2 - nameTF.width/2;
			nameTF.y = nameBg.y + 190/2*0.79 - nameTF.height/2;
		}
		this.addChildToContainer(nameTF);
		this._nameTxt = nameTF;

		this.checkShowDoubleName();

		let intimacyIcon:BaseBitmap = BaseBitmap.create("wifeview_vigoricon");
		intimacyIcon.x = 30+GameData.popupviewOffsetX;
		intimacyIcon.y = bgBB.y + bgBB.height + 5;
		// intimacyIcon.setScale(0.67);
		this.addChildToContainer(intimacyIcon);

		this._progressBar1 = ComponentManager.getProgressBar("progress3", "progress3_bg", 460);
		this._progressBar1.x = intimacyIcon.x + intimacyIcon.width + 10;
		this._progressBar1.y = intimacyIcon.y + 7;
		
		this.addChildToContainer(this._progressBar1);

		let wifestatusCfg = Config.WifestatusCfg.getWifestatusCfgByID(String(Number(this.param.data.level) + 1));
		if(!wifestatusCfg){
			wifestatusCfg = Config.WifestatusCfg.getWifestatusCfgByID(this.param.data.level);
		}



		let str1 = this._wifeInfoVo.intimacy + "/" + wifestatusCfg.needIntimacy;
		this._progressBar1.setPercentage(this._wifeInfoVo.intimacy/wifestatusCfg.needIntimacy);
		this._levelTxt1 = ComponentManager.getTextField(str1, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		// this._levelTxt1.text = LanguageManager.getlocal("servant_infoLv");
		this._levelTxt1.x = this._progressBar1.x + this._progressBar1.width/2 - this._levelTxt1.width/2;
		this._levelTxt1.y = this._progressBar1.y + this._progressBar1.height/2 - this._levelTxt1.height/2;
		this.addChildToContainer(this._levelTxt1);
		
		let meiliIcon:BaseBitmap = BaseBitmap.create("wifeview_charmicon");
		meiliIcon.x = intimacyIcon.x;
		meiliIcon.y = intimacyIcon.y + intimacyIcon.height + 3;
		// meiliIcon.setScale(0.67)
		this.addChildToContainer(meiliIcon);

		this._progressBar2 = ComponentManager.getProgressBar("progress3", "progress3_bg", 460);
		this._progressBar2.x = intimacyIcon.x + intimacyIcon.width + 10;
		this._progressBar2.y = meiliIcon.y + 7;
		this.addChildToContainer(this._progressBar2);

		let str2 = this._wifeInfoVo.glamour + "/" + wifestatusCfg.needGlamour;
		this._progressBar2.setPercentage(this._wifeInfoVo.glamour/wifestatusCfg.needGlamour);
		this._levelTxt2 = ComponentManager.getTextField(str2, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		// this._levelTxt2.text = LanguageManager.getlocal("servant_infoLv");
		this._levelTxt2.x = this._progressBar2.x + this._progressBar2.width/2 - this._levelTxt2.width/2;
		this._levelTxt2.y = this._progressBar2.y + this._progressBar2.height/2 - this._levelTxt2.height/2;
		this.addChildToContainer(this._levelTxt2);

		let goAddBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"childUpd",this.clickAddBtn,this);
		goAddBtn.x = 60+GameData.popupviewOffsetX;
		goAddBtn.y = meiliIcon.y + meiliIcon.height + 10;
		this.addChildToContainer(goAddBtn);
		goAddBtn.setColor(TextFieldConst.COLOR_BLACK);

		let statusBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"wifestatusViewTitle",this.statusBtn,this);
		statusBtn.x = 360+GameData.popupviewOffsetX;
		statusBtn.y = goAddBtn.y;
		this.addChildToContainer(statusBtn);
		statusBtn.setColor(TextFieldConst.COLOR_BLACK);

		this._redDotSp = BaseBitmap.create("public_dot2");
		this._redDotSp.x = statusBtn.x + statusBtn.width - this._redDotSp.width ;
		this._redDotSp.y = statusBtn.y;
		this.addChildToContainer(this._redDotSp);
		this.checkRedPoint();
	}

	private refreshItem(evt : egret.Event):void
	{
		if(!evt.data.ret){
			return;
		}
		if (this._wifeIcon)
		{
			this._wifeIcon.dispose();
			this._wifeIcon = null;
		}
		if (this._droWifeIcon)
		{
			this._droWifeIcon.dispose();
			this._droWifeIcon = null;
		}
		if (this._droWifeIcon2)
		{
			this._droWifeIcon2.dispose();
			this._droWifeIcon2 = null;
		}

		let wifePicStr = this._wifeInfoVo.body;
		if(Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePicStr = skinCfg.body;
				let bonename = this.checkBoneName(skinCfg.bone);
				if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
				{
					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					this.addChildToContainer(this._droWifeIcon);
				}
			}
			else{
				let bonename = this.checkBoneName(this._wifeInfoVo.bone);
				if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
				{
					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					this.addChildToContainer(this._droWifeIcon);
				}
			}
		}else{
			let bonename = this.checkBoneName(this._wifeInfoVo.bone);
			if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
			{
				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
				this.addChildToContainer(this._droWifeIcon);
			}
		}

		let wifeScale = 0.6;
		//红颜图像
		this._wifeIcon = BaseLoadBitmap.create(wifePicStr);
		this._wifeIcon.x = 100;
		
		this._wifeIcon.setScale(wifeScale);
		this.addChildToContainer(this._wifeIcon);
		this._wifeIcon.y = 12;

		let bgBB = this._bgbb;
		if(this._droWifeIcon)
		{
			this._droWifeIcon.x = this._wifeIcon.x + 200;
			this._droWifeIcon.y = this._wifeIcon.y + 840*0.6 + 30;
			
			let scaleNum=0.9;
			let mask=egret.Rectangle.create();
			let offX=Math.abs(bgBB.x-this._droWifeIcon.x);
			mask.setTo(bgBB.x-this._droWifeIcon.x*1/scaleNum+5,bgBB.y-this._droWifeIcon.y*1/scaleNum,bgBB.width*1/scaleNum,bgBB.height*1/scaleNum);
			this._wifeIcon.visible = false;
			this._droWifeIcon.mask = mask;
			this._droWifeIcon.setScale(scaleNum)


			if (this._isDouble)
			{
				let twoName = this.getDoubleBoneByName(this._droWifeIcon.getBoneName());
				if(Api.wifeVoApi.isHaveBone(twoName + "_ske"))
				{
					this._droWifeIcon2=App.DragonBonesUtil.getLoadDragonBones(twoName);
					this._droWifeIcon2.x = this._droWifeIcon.x;
					this._droWifeIcon2.y = this._droWifeIcon.y;
					this.addChildToContainer(this._droWifeIcon2);
					this.removeChildFromContainer(this._droWifeIcon);
					this.addChildToContainer(this._droWifeIcon);

					this._droWifeIcon2.mask = mask;
					this._droWifeIcon2.setScale(scaleNum)
				}
			}

		}
		this._nameTxt.text = this._wifeInfoVo.name;
		if(PlatformManager.checkIsTextHorizontal())
		{
			// nameTF.setPosition(GameConfig.stageWidth / 2 - nameTF.width / 2 - 20,GameConfig.stageHeigth / 2 );
			this._nameTxt.setPosition(bgBB.x + bgBB.width / 2 -  this._nameTxt.width / 2 ,bgBB.y + bgBB.height - this._nameTxt.height - 20);
			this._nameTxt.width = (this._nameTxt.width + 20)/this._nameTxt.scaleX;
			this._namebg.setPosition(this._nameTxt.x + this._nameTxt.width / 2 - this._namebg.width * this._namebg.scaleX / 2, this._nameTxt.y + this._nameTxt.height / 2 - this._namebg.height* this._namebg.scaleY / 2 );

		}
		else
		{
			this._nameTxt.width = 27;
			this._nameTxt.x = this._namebg.x + this._namebg.width*0.79/2 - this._nameTxt.width/2;
			this._nameTxt.y = this._namebg.y + 190/2*0.79 - this._nameTxt.height/2;
		}
	}

	private checkRedPoint(){
		//一键册封
		if(Api.wifestatusVoApi.getIsConferById(this.param.data.wifeId))
		{
			// if(this._redDotSp == null)
			// {
				
			// }
			// else
			// {
				if(this._redDotSp)
				{
					this._redDotSp.visible = true;
				}
			// }
		}
		else
		{
			if(this._redDotSp)
			{
				this._redDotSp.visible = false;
			}
		}
	}

	private setData()
	{
		let wifestatusCfg = Config.WifestatusCfg.getWifestatusCfgByID(String(Number(this.param.data.level) + 1));
		if(!wifestatusCfg){
			wifestatusCfg = Config.WifestatusCfg.getWifestatusCfgByID(this.param.data.level);
		}
		let wifeId = this.param.data.wifeId
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
		let str1 = this._wifeInfoVo.intimacy + "/" + wifestatusCfg.needIntimacy;
		this._progressBar1.setPercentage(this._wifeInfoVo.intimacy/wifestatusCfg.needIntimacy);
		let str2 = this._wifeInfoVo.glamour + "/" + wifestatusCfg.needGlamour;
		this._progressBar2.setPercentage(this._wifeInfoVo.glamour/wifestatusCfg.needGlamour);
		this._levelTxt1.text = str1;
		this._levelTxt2.text = str2;
		this.checkRedPoint();
	}
	private clickAddBtn()
	{
		ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW,{id:this.param.data.wifeId});
	}

	private statusBtn()
	{
		let wifestatusCfg = Config.WifestatusCfg.getWifestatusCfgByID(String(Number(this.param.data.level) + 1));
		if(!wifestatusCfg){
			wifestatusCfg = Config.WifestatusCfg.getWifestatusCfgByID(this.param.data.level);
		}
		// if(this._wifeInfoVo.intimacy < wifestatusCfg.needIntimacy ||this._wifeInfoVo.glamour < wifestatusCfg.needGlamour)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("wifeStatusLessPro"));
		// 	return;
		// }

		ViewController.getInstance().openView(ViewConst.POPUP.WIFESTATUSPOPUPVIEW,{wifeId:this.param.data.wifeId,level:this.param.data.level});
		this.hide();
	}

	private checkDro2()
	{
		if(this._droWifeIcon){

			this._droWifeIcon.resume();
		}
		else{
			this._wifeIcon.visible = true;
		}
	}
	private clickItemHandler(event:egret.TouchEvent):void
	{
		if(this.checkHaveBuff() || Api.switchVoApi.checkOpenWifeBattle()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`wifeTalentPlustip`));
			return;
		}
		let index:number = Number(event.data);
		let statusCfg = Config.WifestatusCfg.getWifestatusList()[index];
		this._oldStar = Api.wifestatusVoApi.getWifestatusVo().star;
		this.request(NetRequestConst.REQUEST_WIFESTATUS_CONFER, { wifeId:String(this.param.data.wifeId),position:statusCfg.id });

	}

	private checkHaveBuff():boolean
	{
		let modelList:AcBaseVo[] = Api.acVoApi.getRanActives();
		for(let i in modelList){
			let unit = modelList[i];
			if(unit.atype == `22`){
				let t = unit.et - GameData.serverTime - 86400 * 1;
				if(t>0){
					return true;
				}
			}
		}

		let wifebattlevo = Api.acVoApi.checkActivityStartByAid(`crossServerWifeBattle`);
		if(wifebattlevo){
			return true;
		}
		return false;
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		if(data.ret){

		}
		// let achList = Api.achievementVoApi.getAchievementInfoVoList();
		// this._scrollList.refreshData(achList);
		// let statusType = 0;//0上封 1 下封
		// if(this._oldStar > Api.wifestatusVoApi.getWifestatusVo().star)
		// {
		// 	statusType = 1;
		// }
		// ViewController.getInstance().openView(ViewConst.BASE.WIFESTATUSSHOWVIEW,{wifeId:this.param.data.wifeId,type:statusType})
		// this.hide();
		
	}


	protected getTitleStr():string
	{
		// let nameStr = LanguageManager.getlocal("wifestatusTitle" +this.param.data.level)
		return "wifestatusTitle" +this.param.data.level;
	}


	private doGetReward(event:egret.Event)
	{
		this._achIndex = event.data.achIndex;
		this.request(NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS,{aid:Api.achievementVoApi.getUIItemId()});
	}

	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
                  "wife_doublefly_namebg",
					]);
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFE,this.setData,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP),this.refreshItem,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING,this.refreshItem,this);
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD,this.doGetReward,this);
		// this.cacheAsBitmap = false;r
		this._wifeInfoVo = null
		this._wifeIcon = null;

		this._droWifeIcon = null;
		this._achIndex = null;
		this._oldList = null;
		this._oldStar = null;
		this._redDotSp = null;
		this._bgbb = null;
		this._nameTxt = null;
		this._namebg = null;
		super.dispose();
	}
}