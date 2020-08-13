/**
 * 副本
 * author yanyuling
 * date 2017/12/06
 * @class AllianceBossPopupView
 */
class AllianceBossPopupView extends PopupView
{
	// 滑动列表
	private _nodeContainer1:BaseDisplayObjectContainer;
	private _nodeContainer2:BaseDisplayObjectContainer;
	private _scrollList: ScrollList;
	private _topTipTF:BaseTextField;
	private _cdTipTF:BaseTextField;
	private _curTabIdx=0;

	private _openBtn:BaseButton;
	private _enterBtn:BaseButton;
	private _logBtn:BaseButton;
	private _nextDay:boolean = false;
	public static bossType:string="1"
	public constructor() 
	{
		super();
	}
	public initView():void
	{		
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG),this.showBossLog,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS),this.openBtnHandlerCallBack,this);
		let tabName = ["allianceBoss_tab1"];
		if( Api.allianceVoApi.getAllianceVo().level >= 6){
			tabName.push("allianceBoss_tab2");
		}
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB,tabName,this.tabBtnClickHandler,this);
		tabbarGroup.setSpace(5);
		tabbarGroup.x=this.viewBg.x+43;
		tabbarGroup.y=this.viewBg.y+10  ;
        this.addChildToContainer(tabbarGroup);

		this._nodeContainer1 = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer1);
		
		let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 620;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 56;
        this._nodeContainer1.addChild(bg1);

		this._topTipTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceBoss_tip1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._topTipTF.x = bg1.x + bg1.width/2 - this._topTipTF.width/2;
		this._topTipTF.y = bg1.y + 15;
		this._nodeContainer1.addChild(this._topTipTF);
		
		let tmpList = Config.AlliancebossCfg.getAllainceCfgIdList();
		
		let alliVo:AllianceVo = Api.allianceVoApi.getAllianceVo();
		let myAlliLv = alliVo.level;
		let dataList = []
		for (var index = 0; index < tmpList.length; index++) {
			if (Config.AlliancebossCfg.getAllianceCfgByLv(tmpList[index]).needAllianceLv <= myAlliLv)
			{
				dataList.push(tmpList[index]);
			}
		}


		let rect = egret.Rectangle.create();
		rect.setTo(0,0,bg1.width-20,bg1.y+bg1.height-40 - this._topTipTF.y);
		this._scrollList = ComponentManager.getScrollList(AllianceBossScrollItem,dataList,rect);
		this._scrollList.x = bg1.x + 10;
		this._scrollList.y = this._topTipTF.y + 30;
		this._nodeContainer1.addChild(this._scrollList);
		// this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceApplyTip"));

		let bottomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceBoss_tip2"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN)
        bottomTipTxt.x = this.viewBg.width/2 - bottomTipTxt.width/2;
        bottomTipTxt.y = bg1.y + bg1.height + 20;
        this._nodeContainer1.addChild(bottomTipTxt);

		this.tabBtnClickHandler({index:0});
		if(Api.allianceVoApi.getAllianceVo().level < 6){
			return;
		}
		//以下为帮会六级可见
		this._nodeContainer2 = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer2);
		this._nodeContainer2.visible = false;

		let monsterBoss = BaseLoadBitmap.create("alliance_monster_boss1");
		monsterBoss.width = 537;
		monsterBoss.height = 680;
		this._nodeContainer2.addChild(monsterBoss);
		monsterBoss.x = bg1.x;
		monsterBoss.y = bg1.y;

		 // 小火星
        let starBoneNode=App.DragonBonesUtil.getLoadDragonBones("actigertrappass");
		starBoneNode.scaleX = starBoneNode.scaleY = this.viewBg.width/GameConfig.stageWidth;
        starBoneNode.x =this.viewBg.width/2;// GameConfig.stageWidth/2;
        
        this._nodeContainer2.addChild(starBoneNode);

		let descBg = BaseBitmap.create("servant_middlebg"); 
		descBg.width = monsterBoss.width;
        descBg.x = monsterBoss.x;
        this._nodeContainer2.addChild(descBg); 

		let descTxt = ComponentManager.getTextField(LanguageManager.getlocal("alliance_monster_bossDesc"), 20, 0xc0a391);
		descTxt.multiline = true;
		descTxt.lineSpacing = 5;
		descTxt.textAlign = egret.HorizontalAlign.LEFT;
		descTxt.width = descBg.width - 30;
		descTxt.x = descBg.x + 15;
		this._nodeContainer2.addChild(descTxt);

		let descTopTxt = ComponentManager.getTextField(LanguageManager.getlocal("alliance_monster_bossDescTop"), 20, 0xc0a391);
		descTopTxt.x = descBg.x + descBg.width/2 - descTopTxt.width/2;
		this._nodeContainer2.addChild(descTopTxt);
		
		descBg.height = descTxt.height + descTopTxt.height + 30;
        descBg.y = monsterBoss.y + monsterBoss.height - descBg.height;
		descTopTxt.y = descBg.y + 10;
		descTxt.y = descTopTxt.y + descTopTxt.height + 10;

		let openBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBoss_btn4",this.openBossHandler,this);
		openBtn.x = monsterBoss.x + monsterBoss.width/2 - openBtn.width/2;
		openBtn.y = descBg.y - openBtn.height - 40;
		this._nodeContainer2.addChild(openBtn);
		this._openBtn = openBtn;

		this._enterBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBoss_btn2",this.enterBossHandler,this);
		this._enterBtn.x = openBtn.x + openBtn.width/2 + 10 ;
		this._enterBtn.y = openBtn.y ;
		this._nodeContainer2.addChild(this._enterBtn);
		
		let logBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE,"allianceBoss_btn1",this.logBtnhandler,this);
        logBtn.x = openBtn.x - openBtn.width/2 - 10 ;
        logBtn.y = openBtn.y;
        this._nodeContainer2.addChild(logBtn);
        this._logBtn = logBtn;
        if(Api.switchVoApi.checkOpenShenhe())
        {
            this._logBtn.visible=false;
        }
		this._logBtn.visible = this._enterBtn.visible = false;
		if(Api.allianceVoApi.getAllianceVo().isInfinityBoss()){
			this._logBtn.visible = this._enterBtn.visible = true;
			openBtn.visible = false;
		}

		this._cdTipTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
		this._cdTipTF.x = bg1.x + bg1.width/2;
		this._cdTipTF.y = openBtn.y + openBtn.height + 10;
		this._cdTipTF.anchorOffsetX = this._cdTipTF.width/2;
		this._nodeContainer2.addChild(this._cdTipTF);

		starBoneNode.y = descBg.y + 100; //monsterBoss.y + monsterBoss.height;// GameConfig.stageHeigth;
		// this.viewBg.height = 
	}

	protected getShowHeight():number
	{
		return 820;
	}
	protected logBtnhandler()
    {
        // NetManager.request(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG,{bossId:String(this._itemIndex+1)});
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSRANKOPUPVIEW);
    }

	protected tick()
	{
		if(!this._cdTipTF ){
			return true;
		}
		let nextst = Api.allianceVoApi.getAllianceVo().infinityBossTomorrow();
		if (nextst <= GameData.serverTime  ){
			this._nextDay = true;
			this._logBtn.visible = this._enterBtn.visible = false;
			this._openBtn.visible = true;
			App.DisplayUtil.changeToNormal(this._openBtn);
			this._cdTipTF.text = "";
			return true;
		}
		let ss = nextst - GameData.serverTime;
		if(Api.allianceVoApi.getAllianceVo().isInfinityBoss()){
			// let ss = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime) ;
			if(ss >=  60*30){
				let cdStr = App.DateUtil.getFormatBySecond(ss-1800,1);
				this._cdTipTF.text = LanguageManager.getlocal("allianceBoss_endTimeStr",[cdStr]);
				this._cdTipTF.anchorOffsetX = this._cdTipTF.width/2;
			}else if( ss >0 && ss <  60*30){
				App.DisplayUtil.changeToGray(this._enterBtn);
				this._cdTipTF.text = LanguageManager.getlocal("allianceInfinity_enterTip2");
				this._cdTipTF.anchorOffsetX = this._cdTipTF.width/2;
			}else if (ss == 0){
				this._nextDay = true;
				this._cdTipTF.text = LanguageManager.getlocal("allianceInfinity_enterTip2");
				this._cdTipTF.anchorOffsetX = this._cdTipTF.width/2;
				App.DisplayUtil.changeToNormal(this._openBtn);
				this._logBtn.visible = this._enterBtn.visible = false;
				this._openBtn.visible = true;
			}
		}else{
			this._cdTipTF.text = "";
		}
		

		return true;
	}

	private enterBossHandler()
	{
		let ss  = Api.allianceVoApi.getAllianceVo().infinityBossTomorrow() - GameData.serverTime;
		if(ss <  60*30){
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_infinity_tip4"));
			return;
		}
		ViewController.getInstance().openView(ViewConst.BATTLE.ALLIANCEBOSSBATTLEVIEW,{idx:null,f:null,o:this});
	}
	private openBossCallBack(event:egret.Event)
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ALLIANCE_OPENINFINITY,this.openBossCallBack,this);
		if(event)
		{
			if(event.data&&event.data.ret)
			{
				if (event.data.allianceFlag == 3 ) {
					App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentUpPopupViewAcOver"));
					this.hide();
					return;
				}
				if(Api.allianceVoApi.getAllianceVo().isInfinityBoss()){
					this._logBtn.visible = this._enterBtn.visible = true;
					this._openBtn.visible = false;
					this._nextDay = false;

					let txtStr:string=LanguageManager.getlocal("allinaceChatMsg2");
					let chatData:any = {};
					chatData.channel = Api.playerVoApi.getPlayerAllianceId();
					chatData.message = txtStr;
					NetManager.requestChat(chatData);
				}


		
			}
		}
	}

	private openBossHandler()
	{
		if(!Api.allianceVoApi.getAllianceVo().isInfinityClear()){
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_infinity_tip1"));
			return;
		}

		let myAllVo = Api.allianceVoApi.getMyAllianceVo();
		// let allVo = Api.allianceVoApi.getAllianceVo();
		if(myAllVo.po > 2)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip2"));
			return;
		}
		// if(allVo.wealth < Config.AlliancebaseCfg.infinityNeedAsset)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip3"));
		// 	return;
		// }
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ALLIANCE_OPENINFINITY,this.openBossCallBack,this);
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEINFINITYOPENPOPUPVIEW);
	}
	protected openBtnHandlerCallBack(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret == 0)
        {
			if (rdata.data.allianceFlag == 3 ) {
				App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentUpPopupViewAcOver"));
				this.hide();
				return;
			}
			var bossName =LanguageManager.getlocal("allianceBoss_monsterName"+AllianceBossPopupView.bossType);  
		
            let txtStr:string=LanguageManager.getlocal("allinaceChatMsg1",[bossName]);

			let chatData:any = {};
			chatData.channel = Api.playerVoApi.getPlayerAllianceId();
			chatData.message = txtStr;
			NetManager.requestChat(chatData);
			// this.hide();
        }
    }
	protected tabBtnClickHandler(params:any)
    {
		if(!params || this._curTabIdx == params.index){
			return;
		}
        this._curTabIdx = params.index;
		this._nodeContainer2.visible = !( this._nodeContainer1.visible = (this._curTabIdx == 0));
    }
	
	protected showBossLog(event:egret.Event)
	{
		let rdata = event.data.data;
		if(rdata.ret == 0)
		{
		
		}
	}
	// protected getBgExtraHeight():number
	// {
	// 	return -130;
	// }
	// protected getShowHeight():number
	// {
	// 	return 850;
	// }
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		 "progress_type1_bg2","servant_middlebg",
			"progress_type1_red","alliance_effect",
		"allianceBossbg",
		]);
	}


	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG),this.showBossLog,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS),this.openBtnHandlerCallBack,this);
		// 未婚滑动列表
		this._scrollList = null;
		// this._nodeContainer = null;
		this._topTipTF = null;
		this._nodeContainer1 = null;
		this._nodeContainer2 = null;
		this._curTabIdx = 0;
		this._nextDay = false;
		super.dispose();
	}
}