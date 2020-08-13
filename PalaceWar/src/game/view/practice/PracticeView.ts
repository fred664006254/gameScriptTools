/**
 * 修身UI
 * author yanyuling
 * date 2018/04/16
 * @class PracticeView
 */
class PracticeView extends CommonView
{
	protected _nodeContainer:BaseDisplayObjectContainer;
	private _bottomnodeContainer:BaseDisplayObjectContainer;
	private _scrollList:ScrollList;
	private _progressBar:ProgressBar;
	private _levelupBtn:BaseButton;
	private _isLvupEnable:boolean = false;
	private _refreshTxtList:BaseTextField[] = [];
	private _lvBeforeBuy:number = 0;
	private _sbookItems:ServantInfoBookItems =null;
	private _practiceSkillItem:PracticeSkillsItem =null;
	private _rewardTabBar:TabBarGroup =null;
	public constructor() 
	{
		super();
	}

	public initView():void
	{	
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UPGRADE),this.levelupCallBackHandler,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK),this.levelupCallBackHandler,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_BUY),this.levelupCallBackHandler,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.PRACTICE_UPSKILLEXP),this.checkRedPoints,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkRedPoints,this);

		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_INDEX),this.checkRedPoints,this);
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkRedPoints,this);

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
		
		let servant_infobg = BaseBitmap.create("practice_bg");
		servant_infobg.y = -20;
		this._nodeContainer.addChild(servant_infobg);

		let userContainer = Api.playerVoApi.getMyPortrait();
		userContainer.x = GameConfig.stageWidth/2 - userContainer.width/2;
		userContainer.name = "userContainer";
		this._nodeContainer.addChild(userContainer);

		this._bottomnodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._bottomnodeContainer);
		let btHeight =  PlayerBottomUI.getInstance().showHeight;
		
		
		let servant_mask = BaseBitmap.create("servant_mask");
		servant_mask.width = GameConfig.stageWidth;

		//蓝色背景图
		let servantBlueBg = BaseBitmap.create("playerview_probg")
		servantBlueBg.x = 0;
		servantBlueBg.y = 0;
		servantBlueBg.height =125;

		let bottomInfoY =0;// 457;
		let bottomBg:BaseBitmap = BaseBitmap.create("servant_bottombg");
		bottomBg.height = 390;
		bottomBg.x = 0 ;
		bottomBg.y = servantBlueBg.y + servantBlueBg.height-10;

		let tabarArr = ["servant_info_tab1"];
		if(Api.switchVoApi.checkOpenSeat())
		{
			tabarArr = ["servant_info_tab1", "servant_info_tab2"];
		} 
		
		var rewardTabBar = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabarArr, this.onTabClick, this);
		rewardTabBar.setPosition(20,bottomBg.y+23); 
		this._rewardTabBar =rewardTabBar;

		this.checkRedPoints();
		// if(Api.practiceVoApi.isShowRedForPBottom() && Api.practiceVoApi.isPracticeUnlock())
		// { 
		// 	this._rewardTabBar.addRedPoint(0);  

		// }else
		// {
		// 	this._rewardTabBar.removeRedPoint(0); 
		// }




		let targetHeight = GameConfig.stageHeigth   - this.container.y; //- //btHeight - innerbg.y - innerbg.height;
		this._bottomnodeContainer.y = targetHeight - 15;
		let infoH = servant_infobg.y + servant_infobg.height;
		if(this._bottomnodeContainer.y > infoH)
		{
			this._bottomnodeContainer.y = infoH-65;
			bottomBg.height = 305+GameConfig.stageHeigth-960; 	// targetHeight - bottomBg.y-550+960-GameConfig.stageHeigth;
		}
		this._bottomnodeContainer.addChild(servant_mask);
		this._bottomnodeContainer.addChild(bottomBg);
		this._bottomnodeContainer.addChild(rewardTabBar);
		// this._bottomnodeContainer.addChild(innerbg);
		this._bottomnodeContainer.addChild(servantBlueBg);

		let playerview_powerbg = BaseBitmap.create("playerview_powerbg")
		playerview_powerbg.x = GameConfig.stageWidth/2 - playerview_powerbg.width/2;
		playerview_powerbg.y =  - 60;
		this._bottomnodeContainer.addChild(playerview_powerbg);

		let myPowerImg = BaseBitmap.create("player_power2")
		myPowerImg.x = playerview_powerbg.x + 30;
		myPowerImg.y = playerview_powerbg.y + 20;
		this._bottomnodeContainer.addChild(myPowerImg);

		let titleText1 =  ComponentManager.getTextField(""+Api.playerVoApi.getPlayerPower(),24,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText1.name = "powerTxt"; 
		titleText1.x = myPowerImg.x + myPowerImg.width + 5;
		titleText1.y = myPowerImg.y + myPowerImg.height/2 - titleText1.height/2;
		this._bottomnodeContainer.addChild(titleText1); 
		
		//等级蓝色背景图
		let servant_levebg = BaseBitmap.create("servant_levebg2");
		servant_levebg.x = 5;
		servant_levebg.y = servantBlueBg.y;
		this._bottomnodeContainer.addChild(servant_levebg);

		//等级 文字不变
		let lvText =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		lvText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        lvText.text = LanguageManager.getlocal("servant_infoLv");
        lvText.x = servant_levebg.x + 17;
        lvText.y = servant_levebg.y + 10;
        this._bottomnodeContainer.addChild( lvText);
		

		let lvValueText =  ComponentManager.getTextField("123",42);
		lvValueText.name = "lvValueText";
		lvValueText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        lvValueText.text = "12";
		lvValueText.anchorOffsetX = lvValueText.width/2;
        lvValueText.x = servant_levebg.x + servant_levebg.width/2;
        lvValueText.y = lvText.y + 25;
        this._bottomnodeContainer.addChild( lvValueText);

		let attrCfg = [
			{
				icon:"playerview_pro1",
				value:"100",
			},
			{
				icon:"playerview_pro2",
				value:"100",
			},
			{
				icon:"playerview_pro4",
				value:"100",
			},
			{
				icon:"playerview_pro5",
				value:"100",
			},

		]
		for(var i=0;i<4;i++)
		{	
			let img = attrCfg[i].icon;
			let attribute = BaseBitmap.create(img);
			let num= i%2;
			attribute.x = 120;
			if(i%2 == 1 )
			{
				attribute.x = GameConfig.stageWidth/2;// + 50;
			}
			if(PlatformManager.checkIsEnLang())
			{
				attribute.x -= 25;
			}
			attribute.y =servant_levebg.y + 15 + 25*Math.floor(i/2);
			if(i>=2)
			{
				attribute.y=attribute.y+4;
			}
			this._bottomnodeContainer.addChild(attribute);

			let valueTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
			valueTxt.text = "100";
			valueTxt.x = attribute.x + attribute.width +5;
			valueTxt.y = attribute.y + attribute.height/2 -valueTxt.height/2;
			this._bottomnodeContainer.addChild(valueTxt);
			this._refreshTxtList.push(valueTxt);
		}

		this._progressBar = ComponentManager.getProgressBar("progress3","progress3_bg",620);
		this._progressBar.x = 10;
		this._progressBar.y = bottomBg.y + 10-40;
		this._progressBar.setTextSize(18);
		this._bottomnodeContainer.addChild(this._progressBar);

		let levelupBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"servantInfoLevelup",this.levelupBtnClickHandler,this);
		levelupBtn.x = 480; 
		levelupBtn.y = this._progressBar.y - 63;//this._progressBar.y + this._progressBar.height/2 - levelupBtn.height/2-80;
		levelupBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._bottomnodeContainer.addChild(levelupBtn);
		this._levelupBtn = levelupBtn;

		let sbookItems = new ServantInfoBookItems();
		sbookItems.y = bottomBg.y+15;
		sbookItems.init("",bottomBg.y+bottomBg.height-150,true);
		this._bottomnodeContainer.addChild(sbookItems);
		this._sbookItems = sbookItems; 

		//修身技能列表
		let practiceSkillItem = new PracticeSkillsItem();
		practiceSkillItem.y = bottomBg.y+15;
		practiceSkillItem.init("",bottomBg.y+bottomBg.height-150);
		this._bottomnodeContainer.addChild(practiceSkillItem);
		practiceSkillItem.visible =false;
		this._practiceSkillItem = practiceSkillItem;


		this.refreshTxtValue();
    }
	protected checkRedPoints()
	{	
		if(Api.practiceVoApi.isShowRedForPBottom2() && Api.practiceVoApi.isPracticeUnlock())
		{ 
			this._rewardTabBar.addRedPoint(0);   
		}else
		{
			this._rewardTabBar.removeRedPoint(0); 
		}

		if(Api.switchVoApi.checkOpenSeat())
		{
			if(Api.practiceVoApi.skillRed())
			{
				this._rewardTabBar.addRedPoint(1);  
			}
			else
			{
				this._rewardTabBar.removeRedPoint(1);
			} 
		} 
	}
	
	protected refreshTxtValue()
	{
		let isLvMax = Api.practiceVoApi.getLevel() == Config.PracticeBaseCfg.commonMaxLv();
		if(Api.practiceVoApi.isPracticeLvupEnable() && !isLvMax)
		{
			App.CommonUtil.addIconToBDOC(this._levelupBtn);
		}else{
			App.CommonUtil.removeIconFromBDOC(this._levelupBtn);
		}
		if(isLvMax)
		{
			this._levelupBtn.setEnable(false);
		}
		PlayerBottomUI.getInstance().checkRedPoints();
		
		let powerTxt:BaseTextField = <BaseTextField>this._bottomnodeContainer.getChildByName("powerTxt");
		let lvValueText:BaseTextField = <BaseTextField>this._bottomnodeContainer.getChildByName("lvValueText");
		powerTxt.text = ""+Api.practiceVoApi.getPower();
		lvValueText.text = "" +Api.practiceVoApi.getLevel();
		lvValueText.anchorOffsetX = lvValueText.width/2;

		let attrV:number[] = Api.practiceVoApi.geAttrValues();
		this._refreshTxtList[0].text = ""+attrV[0];
		this._refreshTxtList[1].text = ""+attrV[1];
		this._refreshTxtList[2].text = ""+attrV[2];
		this._refreshTxtList[3].text = ""+attrV[3];
		this.refreshProgress();
	}

	protected refreshProgress()
	{
		let isLvMax = Api.practiceVoApi.getLevel() == Config.PracticeBaseCfg.commonMaxLv();
		let value:{v1:number,v2:number} = Api.practiceVoApi.getProgressValue();
		if(isLvMax)
		{
			this._progressBar.setText(LanguageManager.getlocal("practice_expV",[""+value.v1]));
		}else{
			this._progressBar.setText(LanguageManager.getlocal("practice_expV",[value.v1+"/"+value.v2]));
		}
		let per = value.v1/value.v2;
		per = per < 1 ? per : 1;
		this._progressBar.setPercentage(per);
		this._isLvupEnable = false;
		if(per >= 1 && !isLvMax)
		{
			this._isLvupEnable = true;
		}
	}
	private onTabClick(data: any):void
	{
		if (data.index == 0) 
		{
			this._sbookItems.visible =true;
			this._practiceSkillItem.visible =false;
		}
		else
		{
			this._sbookItems .visible =false;
			this._practiceSkillItem.visible =true;
		} 
	}
	protected levelupCallBackHandler(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret != 0)
        {
            return;
        }
		if (rdata.cmd == NetRequestConst.REQUEST_REQUEST_BUY)
		{
			// this.refreshProgress();
			App.CommonUtil.showTip(LanguageManager.getlocal("practice_batchBuySuccessTip"));
			let newLv = Api.practiceVoApi.getLevel()
			if(this._lvBeforeBuy < newLv)
			{
				this.showUpgradeEffect(newLv - this._lvBeforeBuy);
			}
			this.refreshTxtValue();
			this._lvBeforeBuy = newLv;
			return;
		}
		if (rdata.cmd == NetRequestConst.REQUEST_REQUEST_UNLOCK)
		{
			this.refreshTxtValue();
			this.checkRedPoints();
			return;
		}
		
		this.refreshTxtValue();
		this.showUpgradeEffect(1);
	}

		//播放升级成功动画
	protected showUpgradeEffect(addLv:number)
	{	
		SoundManager.playEffect(SoundConst.EFFECT_UPD); 
		let servant_upgrade_word:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(LanguageManager.getlocal("servant_xLv",[String(addLv)]),TextFieldConst.FONTNAME_BOSS_SCORE,TextFieldConst.COLOR_LIGHT_YELLOW,TextFieldConst.FONTSIZE_TITLE_BIG);
		servant_upgrade_word.x = 240;
		servant_upgrade_word.y = 200
 
		let upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame",5,100);
		upgradeClip.setScale(2);
		upgradeClip.x = 110;
		upgradeClip.y = 20;
		this._nodeContainer.addChild(upgradeClip);
		upgradeClip.playWithTime(1);
		
		let txtBg:BaseLoadBitmap = null;
		let offsetY = 0;
		if(PlatformManager.checkIsThSp())
		{
			let clip = BaseBitmap.create("servant_upgrade_frame1");
			servant_upgrade_word.x = upgradeClip.x  + clip.width  - servant_upgrade_word.width / 2;

			servant_upgrade_word = <BaseTextField>servant_upgrade_word;
			servant_upgrade_word.bold = true;
			txtBg = BaseLoadBitmap.create("public_9_powertipbg2");
			txtBg.height = 49;
			txtBg.width = servant_upgrade_word.width + 90;
			txtBg.setPosition(servant_upgrade_word.x + servant_upgrade_word.width / 2 - txtBg.width / 2,servant_upgrade_word.y + servant_upgrade_word.height / 2 - txtBg.height / 2);
			this._nodeContainer.addChild(txtBg);
			offsetY = txtBg.y - 50
		}
		this._nodeContainer.addChild(servant_upgrade_word);
		egret.Tween.get(servant_upgrade_word,{loop:false}).to({y:150},800).to({alpha:0},100);
		if(txtBg)
		{
			egret.Tween.get(txtBg,{loop:false}).to({y:offsetY},800).to({alpha:0},100);
		}

		let tmpthis = this;
		egret.Tween.get(this,{loop:false}).wait(500).call(function(){
			//字体刷新加个延时
			tmpthis.refreshTxtValue();
			tmpthis._nodeContainer.removeChild(upgradeClip);
			upgradeClip = null;
			tmpthis._nodeContainer.removeChild(servant_upgrade_word);
			servant_upgrade_word = null;
			if(txtBg)
			{
				tmpthis._nodeContainer.removeChild(txtBg);
			}
		})
	}

	protected levelupBtnClickHandler()
	{
		if(this._isLvupEnable == false)
		{
			// ViewController.getInstance().openView(ViewConst.POPUP.PRACTICEBATCHBUYPOPUPVIEW);
			ViewController.getInstance().openView(ViewConst.POPUP.PRACTICEBUYPOPUPVIEW);
			this._lvBeforeBuy = Api.practiceVoApi.getLevel();
		}else{
			if (Api.practiceVoApi.getLevel() == Config.PracticeBaseCfg.commonMaxLv())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("practice_topLvTip"));
				return;
			}
			NetManager.request(NetRequestConst.REQUEST_REQUEST_UPGRADE,{});
		}
		
	}

	protected getRuleInfo()
	{ 
		if(Api.switchVoApi.checkOpenSeat())
		{
			return "practiceRuleInfo_withNewMonthYear";
		}
		return "practiceRuleInfo";
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"playerpromo_abitopbg","playerview_probg",
			"servant_levebg2","servant_infoLv","servant_attribute1","servant_attribute2",
			"servant_attribute3","servant_attribute4","progress3","progress3_bg",
			"playerview_pro1","playerview_pro2","playerview_pro4","playerview_pro5",
			"playerview_powerbg","playerview_power_img",
			"servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4",
			"servant_xLv","servant_upgrade_frame","player_power2","practice_bg","servant_star",
			"servant_bottombg",
			"practice_skill_1",
			"practice_skill_2",
		]);
	}
	public closeHandler():void
	{
		PlayerBottomUI.getInstance().hide(true);
		super.hide();
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UPGRADE),this.levelupCallBackHandler,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK),this.levelupCallBackHandler,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_BUY),this.levelupCallBackHandler,this);
		ViewController.getInstance().hideView(ViewConst.POPUP.RULEINFOPOPUPVIEW);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkRedPoints,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.PRACTICE_UPSKILLEXP),this.checkRedPoints,this);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_INDEX),this.checkRedPoints,this);
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkRedPoints,this);
		this._nodeContainer = null;
		this._bottomnodeContainer = null;
		this._scrollList = null;
		this._progressBar = null;
		this._levelupBtn = null;
		this._isLvupEnable = false;
		this._refreshTxtList = [];
		this._lvBeforeBuy = 0;
		this._practiceSkillItem =null;
		this._sbookItems =null;
		
		
		super.dispose();
	}
}