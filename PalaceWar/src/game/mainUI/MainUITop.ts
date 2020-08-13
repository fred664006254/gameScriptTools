class MainUITop extends BaseLoadDisplayObjectContiner
{
	// private headImg:BaseLoadBitmap;
	// private headBg:BaseBitmap;
	private _headContainer:HeadContainer = null;
	private _nickNameText:BaseTextField;
	private _powerValueText:BaseTextField;
	private _officerText:BaseTextField;
	private _soldierValueText:BaseTextField;
    private _foodValueText:BaseTextField;
    private _goldValueText:BaseTextField;
	private _gemValueText:BaseTextField;
	private _isShowName:boolean;
	private _upgradeClip:CustomMovieClip;
	public constructor(data:{showName:boolean})
	{
		super();
		this._isShowName=data?data.showName:false;
		egret.callLater(this.show,this);
	}

	protected getResourceList():string[]
	{
		return [
			"mainui_topinfobg",
			"mainui_topresbg"
		];
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return null;
	}

	// protected preInit():void
	// {
	// 	this.init();
	// }

	public show(data?:any):void
	{
		super.show(data);
	}

	protected init():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.refresh,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG,this.changeImgNotify,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR,this.changeImgNotify,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.refreshUpgradeClip,this);

		let curButtomY:number=0;
		let isShowTopName:boolean=false;
		if(this._isShowName)
		{
			isShowTopName=true;
			let nameBg:BaseBitmap=BaseBitmap.create("mainui_topnamebg");
			nameBg.touchEnabled=true;
			this.addChild(nameBg);
			curButtomY=nameBg.y+nameBg.height-5;

			this._nickNameText =  ComponentManager.getTextField("1",26,TextFieldConst.COLOR_BLACK);
			this._nickNameText.width=200;
			this._nickNameText.textAlign=egret.HorizontalAlign.CENTER;
			let {x,y}=App.CommonUtil.getCenterPos(nameBg,this._nickNameText,false);
			this._nickNameText.setPosition(x,y-1);
			this._nickNameText.text=Api.playerVoApi.getPlayerName();
			this.addChild(this._nickNameText);
		}
		let topinfobg:BaseBitmap = BaseBitmap.create("mainui_topinfobg");
		topinfobg.touchEnabled=true;
		topinfobg.y = curButtomY;
		this.addChildAt(topinfobg,0);
		curButtomY=topinfobg.y+topinfobg.height;
		
		let headBg:BaseBitmap=BaseBitmap.create("mainui_headbg");
		headBg.setPosition(60,App.CommonUtil.getCenterY(topinfobg,headBg,false));
		headBg.name = "headBg";
		this.addChild(headBg);

		// let headImg = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());
		// // BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPath()); 
		// headImg.width = 112;
		// headImg.height = 135;
		// headImg.setPosition(3,headBg.y-5);
		// this.addChild(headImg);
		// headImg.addTouchTap(this.roleHeadClickHandler,this);
		// this.headImg = <BaseLoadBitmap>headImg.getChildByName("myHead");
		// this.headBg = <BaseBitmap>headImg.getChildByName("myBody");
		this._headContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),Api.playerVoApi.getPlayerPtitle());
		this._headContainer.setPosition(3,headBg.y - 10);
		this.addChild(this._headContainer);
		this._headContainer.addTouchTap(this.roleHeadClickHandler,this);

		//势力 官职
		this._powerValueText = ComponentManager.getTextField(LanguageManager.getlocal("mainui_shili")+Api.playerVoApi.getPlayerPowerStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON,0xfdf2e8);
		this._powerValueText.setPosition(this._headContainer.x+100,headBg.y+12);
		this.addChild(this._powerValueText);

		this._officerText = ComponentManager.getTextField(LanguageManager.getlocal("mainui_officer")+Api.playerVoApi.getPlayerOffice(),this._powerValueText.size,this._powerValueText.textColor);
		this._officerText.x = this._powerValueText.x;
		this._officerText.y = this._powerValueText.y +42;
		this.addChild(this._officerText);

		let cfg = {
			
			["0"]:{
				iconImg:"public_icon2",
				iconValue:Api.playerVoApi.getPlayerGold(),
			},
			["1"]:{
				iconImg:"public_icon4",
				iconValue:Api.playerVoApi.getSoldier(),
			},
			["2"]:{
				iconImg:"public_icon3",
				iconValue:Api.playerVoApi.getFood(),
			},
			["3"]:{
				iconImg:"public_icon1",
				iconValue:Api.playerVoApi.getPlayerGem(),
			}
		};
		
		for (let i=0;i<4;i++)
		{
			let iconBg:BaseBitmap=BaseBitmap.create("mainui_topresbg");
			iconBg.setPosition(headBg.x+headBg.width+i%2*150,headBg.y+10+Math.floor(i/2)*42);
			this.addChild(iconBg);
			curButtomY=iconBg.y+iconBg.height/2;
			let tmpCfg = cfg[i.toString()];
			
			let resImg = BaseBitmap.create(tmpCfg.iconImg);
			resImg.setPosition(iconBg.x-resImg.width/2,iconBg.y+iconBg.height-resImg.height+5);
			this.addChild(resImg);
			
			let resValueText =  ComponentManager.getTextField(App.StringUtil.changeIntToText(tmpCfg.iconValue),TextFieldConst.FONTSIZE_CONTENT_SMALL,this._powerValueText.textColor);
			resValueText.setPosition(resImg.x+resImg.width+5,App.CommonUtil.getCenterY(iconBg,resValueText,false))
			this.addChild(resValueText);

			if (i == 0)
			{
				this._goldValueText = resValueText;
			}
			else if (i == 1)
			{
				this._soldierValueText = resValueText;
			}
			else if (i == 2)
			{
				this._foodValueText = resValueText;
			}
			else if (i == 3)
			{
				this._gemValueText = resValueText;
			}
		}
		
		//购买金币按钮
		// btn1
		let addGoldBtn = ComponentManager.getButton("mainui_btn1","",this.addGoldBtnClickHandler,this);
		addGoldBtn.x = GameConfig.stageWidth -52;
		addGoldBtn.y = curButtomY-addGoldBtn.height/2;
		this.addChild(addGoldBtn);
		if(Api.switchVoApi.checkClosePay()||Api.switchVoApi.checkIsOlyShenheFile())
		{
			addGoldBtn.visible=false;
		}
		this.refreshUpgradeClip();
	}

	protected refreshUpgradeClip()
	{
		let curLv = Api.playerVoApi.getPlayerLevel()
		let nextLvCfg =  Config.LevelCfg.getCfgByLevel((curLv+1).toString());
		let qingyuanflag = false;
        //情缘绘卷红点
        if(Api.switchVoApi.checkOpenOfficialCareer() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()){
            if(Api.encounterVoApi.isShowNpc() && Api.switchVoApi.checkOpenQingYuanHuiJuan())
            {
                if(Api.practiceVoApi.isPracticeOPen())
                {  
                    qingyuanflag = true;
                }
            
            }else{
                qingyuanflag = false;
            }
        }

        let titleupgradeflag = false;
        //帝王霸业红点
        if(Api.switchVoApi.checkOpenOfficialCareer() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()){
            if((Api.titleupgradeVoApi.checkNpcMessage() || (Api.switchVoApi.checkOpenEmperorsAchievement() &&Api.emperorAchieveVoApi.isShowKingAchieveRedDot())) && Api.switchVoApi.checkTitleUpgrade())
            {
                if(Api.practiceVoApi.isPracticeOPen())
                {  
                    titleupgradeflag = true;
                }
            
            }else{
                titleupgradeflag = false;
                
            }
		}
		if (nextLvCfg && Api.playerVoApi.getPlayerExp() >=  nextLvCfg.exp || Api.practiceVoApi.isShowRedForPBottom()  || Api.prestigeVoApi.isShowRedForPBottom() || (qingyuanflag || titleupgradeflag))
		 {
			 if (!this._upgradeClip)
			 {
				this._upgradeClip = ComponentManager.getCustomMovieClip("mainui_fg",10,100);
				this._upgradeClip.anchorOffsetX = this._upgradeClip.width/2;
				this._upgradeClip.anchorOffsetY = this._upgradeClip.height;
				this._upgradeClip.x = -17;
				this._upgradeClip.y = -13;
				if (this._isShowName)
				{
					this._upgradeClip.y = 38;
				}
				let tmpIdx = this.getChildIndex(this.getChildByName("headBg"));
				this.addChildAt(this._upgradeClip,tmpIdx);
				this._upgradeClip.playWithTime(0); 
			 }
		 }else
		 {
			 if (this._upgradeClip)
			 {
				 this._upgradeClip.stop();
				 this.removeChild(this._upgradeClip);
				 this._upgradeClip = null;
			 }
		 }
	}

	private addGoldBtnClickHandler():void
	{
		// App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
		// ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIEW);
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);

		//test code
		// NetManager.request("test.wbpushmsg",{fuid:1000000023}); //Api.playerVoApi.getPlayerID()
	}

	private roleHeadClickHandler():void
	{
		PlayerBottomUI.getInstance().show();
		// ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);
	}

	public refresh():void
	{
		this._gemValueText.text = Api.playerVoApi.getPlayerGemStr();
		this._soldierValueText.text = Api.playerVoApi.getSoldierStr();
		this._foodValueText.text = Api.playerVoApi.getFoodStr();
		this._goldValueText.text = Api.playerVoApi.getPlayerGoldStr();
		this._officerText.text = LanguageManager.getlocal("mainui_officer")+Api.playerVoApi.getPlayerOffice();
		this._powerValueText.text = LanguageManager.getlocal("mainui_shili")+Api.playerVoApi.getPlayerPowerStr();
		if(this._isShowName)
		{
			this._nickNameText.text = Api.playerVoApi.getPlayerName();
			this._nickNameText.x = this.width/2 - this._nickNameText.width/2;
		}
		this.refreshUpgradeClip();
	}
	protected changeImgNotify()
	{
		// let res = "user_head" + Api.playerVoApi.getPlayePicId();
		// this.headImg.setload(res);
		// let headBg = Api.playerVoApi.getVipHeadBg() ;
		// if(headBg){
		// 	this.headBg.texture = ResourceManager.getRes(headBg);	
		// }
		let headName = Api.playerVoApi.getUserHeadImgPath();
		let headbginfo = Api.playerVoApi.getPlayerPtitle();
		this._headContainer.setRes(headName,headbginfo);
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.refresh,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG,this.changeImgNotify,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR,this.changeImgNotify,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.refreshUpgradeClip,this);

		// this.headImg=null;
		this._nickNameText=null;
		this._powerValueText=null;
		this._officerText=null;
		this._soldierValueText=null;
		this._foodValueText=null;
		this._goldValueText=null;
		this._gemValueText=null;
		this._isShowName=false;
		this._upgradeClip=null;
		// this.headBg = null;
		this._headContainer = null;
		super.dispose();
	}
}