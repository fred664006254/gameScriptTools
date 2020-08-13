class AtkracecrossView extends CommonView
{
	private _moreArrow:BaseBitmap = null;
	private bottomBg:BaseBitmap =null;
	private _isShowMore:boolean = false;
	private touchBoo:boolean =true;
	private moveContainer:BaseDisplayObjectContainer =null;
	private listconditions:BaseTextField = null;
	private describeTxt:BaseTextField =null;
	private _nameTxt:BaseTextField =null;
	private _currMaskBmp:BaseBitmap =null;
	private _touchBg:BaseBitmap =null;
	private moreBg:BaseBitmap =null;
	private isData:boolean =false;
	private _scrollList:ScrollList=null;
	private _serverScrollList:ScrollList=null;
	private _atkraceInfoVoList:Array<any>=[];
	private _topBg:BaseBitmap = null;
	private _scoreTextTab:(BaseBitmapText|BaseTextField)[] = [];
	private _listconditions:BaseTextField = null;
	private _rewwardTime:BaseTextField =null;
	private _rewardCDTime:number = 0
	private _countDownTime:number = 0;
	private _infoContainer:BaseDisplayObjectContainer = null;
	private _countDownText:BaseTextField = null;
	private _fightflag:boolean = null;
	private _topType:number = 0; // 顶部显示类型， 1:两个服， 2:多个服
	private _serverList:ScrollList=null;
	private _chatTxt :BaseTextField = null;
	private awardBtn : BaseButton = null;

	private _pRankContainer:BaseDisplayObjectContainer = null;
	private _sRankContainer:BaseDisplayObjectContainer = null;

	private _isCanJoin:boolean = false;
	private _isFightEnd:boolean = false;

	private _fightbtn:BaseButton = null;
	private _fightEff:CustomMovieClip = null;
	private _roleContainer:BaseDisplayObjectContainer = null;
	private _roleContainer2:BaseDisplayObjectContainer = null;
	private _cheerBtn : BaseButton = null;

	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		let arr = [];
		if(this.vo.checkIsFengyun())
		{
			arr = ["atkracecross_fightbtn_fengyun","commonview_bigframe","accrosspower_cheerbtnicon-7",
				"accrosspower_cheerbtntxt-7","accrosspower_rankbg1-7","accrosspower_rankbg2-7",
			"accrosspower_rankbg3-7","accshegemonyprank1","accshegemonyprank2","accshegemonyprank3",
			"atkracecross_upflag","atkracecross_moretxt","atkracecross_bottombg"];
		}
		return super.getResourceList().concat([
		"atkracecross_bg2","atkracecross_award_text","atkracecross_award","atkracecross_loss","atkracecross_top","atkracecross_win",
 
		"atkrace_morale","rankinglist_rankbg",
		"arena_bottom","servant_mask","arena_visit","arena_visit_text","forpeople_bottom","arena_rank","arena_rank_text","arena_more","arena_arrow","arena_bottom_bg",
 
		"atkrace_morale","atkracecross_rankbg","atkracecross_rank","atkracecross_explain",
		"arena_bottom","servant_mask","arena_visit","arena_visit_text","forpeople_bottom","arena_rank","arena_rank_text","arena_more","arena_arrow",
		"rankinglist_line"
		]).concat(arr);
	}

	//规则说明内容
	protected getRuleInfo():string
	{
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		if(this.vo.checkIsFengyun())
		{
			return "atkracecrossInfo_fengyun";
		}
		let key = `atkracecrossInfo`;
		if(Api.switchVoApi.checkServantRefuseBattle()){
			key = "atkracecrossInfo_withOpenRefusal";
		}
		return App.CommonUtil.getCrossLeagueCn(key, crossVo.isCrossLeague());
	}
	protected getRuleBtnName():string
	{	
		if(this.vo.checkIsFengyun())
		{
			return ButtonConst.BTN2_RULE;
		}
		return ButtonConst.BTN_RULE;
	}
	protected getBgName():string
	{
		if(this.vo.checkIsFengyun())
		{
			return "atkracecross_bgfengyun";
		}
		return "atkracecross_bg2";
	}

	protected getTitleStr():string
	{
		if(this.vo.checkIsFengyun())
		{
			return null;
		}
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		return App.CommonUtil.getCrossLeagueCn(`atkracecross`, crossVo.isCrossLeague());
	}
    protected getTitleBgName(): string 
	{
		if(this.vo.checkIsFengyun())
		{
			return "atkracecross_title2_fengyun";
		}
        return super.getTitleBgName();
    }	
	// 初始化背景
	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,640,1136);
			this.viewBg = BaseLoadBitmap.create(bgName,rect);
			this.viewBg.setPosition(0,(GameConfig.stageHeigth-this.viewBg.height)*0.1);
			this.addChild(this.viewBg); 
		}
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		let timeNumber2:number = 3600*24;
		if (crossVo.et - GameData.serverTime <= timeNumber2)
		{
			this._isFightEnd = true;
		}
		return {requestType:NetRequestConst.REQUEST_ATKRACECROSS_INDEX,requestData:{activeId:crossVo.aidAndCode}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if (data.data.data.fightflag == false) {
			this._fightflag= false;
		}
		else {
			this._fightflag= true;
		}
		Api.atkracecrossVoApi.zonerankinfos = data.data.data.zonerankinfos;
		if (this._topType == 2 && this._serverList && Api.atkracecrossVoApi.zonerankinfos)
		{
			this._serverList.refreshData(Api.atkracecrossVoApi.zonerankinfos);
		}
		else if (this._topType == 1 && this._scoreTextTab.length>0 && Api.atkracecrossVoApi.zonerankinfos)
		{
			for (let i:number = 0; i<this._scoreTextTab.length ; i++)
			{	
				let zonerankinfos:any = Api.atkracecrossVoApi.zonerankinfos;
				let myServerInfo:any;
				let otherSerInfo:any;
				if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid()))
				{
					myServerInfo = zonerankinfos[0];
					otherSerInfo = zonerankinfos[1];
				}
				else 
				{
					myServerInfo = zonerankinfos[1];
					otherSerInfo = zonerankinfos[0];
				}
				this._scoreTextTab[0].text = String(myServerInfo.point);
				this._scoreTextTab[1].text = String(otherSerInfo.point);
			}
			this._scoreTextTab[1].setPosition(GameConfig.stageWidth - 110 - this._scoreTextTab[1].width, this._scoreTextTab[0].y);
		}

		if (data.data.data.iscanjoin == 0) {
			this._isCanJoin= false;
		}
		else {
			this._isCanJoin= true;
		}
		Api.atkracecrossVoApi.isCanJoin = this._isCanJoin;

		if (this._infoContainer) {
			this.resetInfo();
		}
	}

	public initView():void
	{	

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESET_ATKRACECROSS,this.battleCallback,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND,this.fightendCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_CHALLENGE), this.challengeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REVENGE), this.challengeCallback, this);
    	App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_KILL), this.challengeCallback, this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);

		this.initBottom();

		if(this.vo.checkIsFengyun())
		{
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_RANK), this.getPRank, this);
			NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_RANK, {});

			let frame = BaseBitmap.create("commonview_bigframe");
			frame.width = GameConfig.stageWidth;
			frame.height = 375;
			frame.y = GameConfig.stageHeigth - frame.height;
			this.addChildAt(frame,this.getChildIndex(this.bottomBg));

			let fightbtn = ComponentManager.getButton("atkracecross_fightbtn_fengyun",null,this.fightbtnHandler,this,null,0);
			fightbtn.setScale(1);
			fightbtn.x = GameConfig.stageWidth/2 - fightbtn.width/2;
			fightbtn.y = 200;
			this.addChildToContainer(fightbtn);
			this._fightbtn = fightbtn;
			this._fightbtn.visible = false;

			let eff = ComponentManager.getCustomMovieClip(`atkracecrossbtneff`, 10);
			eff.width = 300;
			eff.height = 120;
			eff.x = fightbtn.x + fightbtn.width/2 - eff.width/2;
			eff.y = fightbtn.y + fightbtn.height/2 - eff.height/2;
			eff.playWithTime(-1);
			this.addChildToContainer(eff);
			this._fightEff = eff;
			this._fightEff.visible = false;

			this._roleContainer2 = new BaseDisplayObjectContainer();
			this.addChild(this._roleContainer2);
		}else
		{
			if (Api.atkracecrossVoApi.zonerankinfos.length != 2)
			{
				this.initTop2();
			}
			else {
				this.initTop1();
			}
		}
		
		//检查有没有没有领取的奖励
		if (this._fightflag && this._isCanJoin && this._isFightEnd == false) {
			let rewardc:any = Api.atkracecrossVoApi.getRewardc()
			if (rewardc && rewardc.flag && rewardc.flag> 0) {
				ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSREWARDPOPUPVIEW,{});
			} 
		}

		NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_LIST, {});
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_LIST), this.useCallback, this);

		if (this._isCanJoin || this._isFightEnd) {
			this.resetInfo();
		}
		else {
			this.initCannotJoin();
		}
	}

	private fightbtnHandler():void
	{
		if(this._isCanJoin)
		{
			this.clickServant();
		}else
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("atkraceNoDes_crossfengyun"));
		}
	}

		//重置信息
	private resetInfo():void
	{	
		this._countDownTime = 0;
		if (this._infoContainer) {
			this.removeChildFromContainer(this._infoContainer);
			this._infoContainer=null;
		}

		if (this._countDownText) {
			this._countDownText=null;
		}
		this._infoContainer = new BaseDisplayObjectContainer();
		this._infoContainer.y = GameConfig.stageHeigth-1136;
		this.addChildToContainer(this._infoContainer);

		if(this.vo.checkIsFengyun())
		{
			this._infoContainer.y = 0;
		}

		let isShowFightBtn = false;

		//是否无法出战
		if (this._fightflag == false) {
			//对话框
			let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg25");
			wordsBg.width = 260;
			wordsBg.height=78;
			wordsBg.setPosition(GameConfig.stageWidth/2 - wordsBg.width/2,250+1136-GameConfig.stageHeigth);
			this._infoContainer.addChild(wordsBg);

			if(this.vo.checkIsFengyun())
			{
				wordsBg.y = 200;
			}
			
			let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg25_tail");
			wordsCornerBg.x = wordsBg.x+wordsBg.width/2+20;
			wordsCornerBg.y = wordsBg.y +wordsBg.height -3;
			this._infoContainer.addChild(wordsCornerBg);

			let wordsText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceNoServant"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
			wordsText.width = 224;
			wordsText.lineSpacing = 6;
			wordsText.setPosition(wordsBg.x + wordsBg.width/2 - wordsText.width/2, wordsBg.y + wordsBg.height/2 - wordsText.height/2);
			this._infoContainer.addChild(wordsText);
		}
		else if (this._isFightEnd == false) {
			//检查是否已有门客
			let myAtkInfo:AtkraceAtkInfoVo = Api.atkracecrossVoApi.getMyFightInfo();
			if (myAtkInfo && myAtkInfo.mesid && myAtkInfo.mesid.sid) 
			{
				if(this.vo.checkIsFengyun())
				{
					isShowFightBtn = true;
				}else
				{
					//有门客
					let sid:string = myAtkInfo.mesid.sid;
					let servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(sid));
					servantFullImg.width = 405;
					servantFullImg.height = 467;
					servantFullImg.x = GameConfig.stageWidth/2 - servantFullImg.width/2;
					servantFullImg.y = this.viewBg.height - 180 - servantFullImg.height;
					this._infoContainer.addChild(servantFullImg);
					servantFullImg.addTouchTap(this.clickServant,this);

					//对话框
					let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg25");
					wordsBg.width = 260;
					wordsBg.height=78;
					wordsBg.setPosition(GameConfig.stageWidth/2 - wordsBg.width/2,servantFullImg.y - 80);
					this._infoContainer.addChild(wordsBg);

					let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg25_tail");
					wordsCornerBg.x = wordsBg.x+wordsBg.width/2+20;
					wordsCornerBg.y = wordsBg.y +wordsBg.height -3;
					this._infoContainer.addChild(wordsCornerBg);

					let textStr:string;
					if (myAtkInfo.handle == 1 || myAtkInfo.atype != 1) {
						textStr	= LanguageManager.getlocal("arenaServantSpeak2");
					}
					else {
						textStr	= LanguageManager.getlocal("arenaServantSpeak1",[LanguageManager.getlocal("servant_name"+myAtkInfo.mesid.sid)]);
					}

					let wordsText:BaseTextField = ComponentManager.getTextField(textStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
					wordsText.width = 224;
					wordsText.lineSpacing = 6;
					wordsText.setPosition(wordsBg.x + wordsBg.width/2 - wordsText.width/2, wordsBg.y + wordsBg.height/2 - wordsText.height/2);
					this._infoContainer.addChild(wordsText);
				}
			}
			else {
				//出战次数
				let itemCfg = Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code);
				let maxCount:number = itemCfg.getDailyNum();
				let myInfo:AtkraceInfoVo = Api.atkracecrossVoApi.getMyInfo();

				//对话框
				let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg25");
				wordsBg.width = 260;
				wordsBg.height=78;
				wordsBg.setPosition(GameConfig.stageWidth/2 - wordsBg.width/2,250+1136-GameConfig.stageHeigth);
				this._infoContainer.addChild(wordsBg);

				if(this.vo.checkIsFengyun())
				{
					wordsBg.y = 190;
				}

				let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg25_tail");
				wordsCornerBg.x = wordsBg.x+wordsBg.width/2+20;
				wordsCornerBg.y = wordsBg.y +wordsBg.height -3;
				this._infoContainer.addChild(wordsCornerBg);

				let myNum:number = myInfo.num;
				let textStr:string;
				if (myNum >= maxCount) {
					//次数已满
					let lv60plus:number = Api.servantVoApi.getServantCountLevel60Plus();
					let extraCoefficient:number =  Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code).getParameter1();
					let extraMax:number = Math.floor(lv60plus/extraCoefficient);

					if (myInfo.extranum >= extraMax) {
						//没次数了
						textStr = LanguageManager.getlocal("arenaMaxNum");
						wordsBg.addTouchTap(this.clickDialog2,this);
					}
					else {
						textStr = LanguageManager.getlocal("arenaAddNum",[myInfo.extranum.toString(),extraMax.toString()]);
						wordsBg.addTouchTap(this.clickDialog,this);
					}

					let wordsText:BaseTextField = ComponentManager.getTextField(textStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
					wordsText.width = 224;
					wordsText.lineSpacing = 6;
					wordsText.setPosition(wordsBg.x + wordsBg.width/2 - wordsText.width/2, wordsBg.y + wordsBg.height/2 - wordsText.height/2);
					this._infoContainer.addChild(wordsText);
				}
				else {
					//倒计时
					this._countDownTime = myInfo.lasttime + Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code).getIntervalTime() -  GameData.serverTime;
					let wordsText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceCountDowning"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
					wordsText.width = 224;
					wordsText.lineSpacing = 6;
					wordsText.setPosition(wordsBg.x + wordsBg.width/2 - wordsText.width/2, wordsBg.y + wordsBg.height/2 - wordsText.height/2 - 15);
					this._infoContainer.addChild(wordsText);

					this._countDownText = ComponentManager.getTextField(this.getCountTimeStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_RED);
					this._countDownText.setPosition(wordsBg.x + wordsBg.width/2 - this._countDownText.width/2, wordsText.y + wordsText.height+7);
					this._infoContainer.addChild(this._countDownText);
				}
			}
		}
		else {
			this.initResult();
		}

		if(this.vo.checkIsFengyun())
		{
			this._fightbtn.visible = isShowFightBtn;
			this._fightEff.visible = isShowFightBtn;
		}
	}

	private clickDialog2():void
	{
		App.CommonUtil.showTip(LanguageManager.getlocal("atkrace_extro_no_times"));
	}

	private clickDialog():void
	{
		let itemId:string = Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code).getFightAdd();
        let needNum:number = 1;
		let itemVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
		let numItem:number = 0;
		if (itemVo) {
			numItem = itemVo.num;
		}
		
		let message = LanguageManager.getlocal("atkRace_buyChallenge",[LanguageManager.getlocal("itemName_"+itemId)]);
		let mesObj = {
			 confirmCallback: this.buyChallenge, 
			 handler: this, 
			 icon:  "itemicon"+itemId,
			 iconBg: Config.ItemCfg.getItemCfgById(itemId).iconBg, 
			 num: numItem, 
             useNum:needNum,
			 msg: message ,
			 id : itemId,
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );
	}

	private buyChallenge():void
	{	
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		this.request(NetRequestConst.REQUEST_ATKRACECROSS_USEEXTRA,{activeId:crossVo.aidAndCode});
	}

	//点击门客 进入战斗
	private clickServant():void
	{
		let myAtkInfo:AtkraceAtkInfoVo = Api.atkracecrossVoApi.getMyFightInfo();
		if (myAtkInfo.handle == 1 || myAtkInfo.atype != 1) {
			ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSARRESTVIEW,{f:this.refreshServant,o:this});
		}
		else {
			let nameStr:string = myAtkInfo.getFName();
			ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSAGREEPOPUPDIALOG,{type:1 , name: nameStr ,sid:myAtkInfo.mesid.sid,f:this.refreshServant,o:this});
		}
	}

	//顶部
	private initTop1():void
	{	
		this._topType = 1;

		this._topBg = BaseBitmap.create("atkracecross_top");
		this._topBg.y = -16;
		this.addChildToContainer(this._topBg);

		let zonerankinfos:any = Api.atkracecrossVoApi.zonerankinfos;
		let myServerInfo:any;
		let otherSerInfo:any;
		if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid()))
		{
			myServerInfo = zonerankinfos[0];
			otherSerInfo = zonerankinfos[1];
		}
		else 
		{
			myServerInfo = zonerankinfos[1];
			otherSerInfo = zonerankinfos[0];
		}

		let server1name = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, myServerInfo.zid);
		let serverId1:BaseTextField = ComponentManager.getTextField(server1name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serverId1.setPosition(56 - serverId1.width/2, this._topBg.y + 46);
		this.addChildToContainer(serverId1);

		let server2name = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, otherSerInfo.zid);
		let serverId2:BaseTextField = ComponentManager.getTextField(server2name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serverId2.setPosition(GameConfig.stageWidth - 56 - serverId2.textWidth/2, serverId1.y);
		this.addChildToContainer(serverId2);

		this._scoreTextTab.length = 0;

		let serverScore1:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(String(myServerInfo.point),TextFieldConst.FONTNAME_ITEMTIP);
		serverScore1.setPosition(114, this._topBg.y + 67);
		this.addChildToContainer(serverScore1);
		this._scoreTextTab.push(serverScore1);

		let serverScore2:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(String(otherSerInfo.point),TextFieldConst.FONTNAME_ITEMTIP);
		serverScore2.setPosition(GameConfig.stageWidth - 110 - serverScore2.width, serverScore1.y);
		this.addChildToContainer(serverScore2);
		this._scoreTextTab.push(serverScore2);
	}
	private initTop2():void
	{
		this._topType = 2;

		this._topBg = BaseBitmap.create("atkracecross_rankbg");
		this._topBg.y = -16;
		this._topBg.height = 224;
		this.addChildToContainer(this._topBg);

		let serverText:BaseBitmap = BaseBitmap.create("atkracecross_rank");
		serverText.setPosition(GameConfig.stageWidth/2-serverText.width/2,this._topBg.y+8);
		this.addChildToContainer(serverText);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(GameConfig.stageWidth/2 - 155 - rankText.width/2, this._topBg.y + 50);
		this.addChildToContainer(rankText);

		let qufuText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		qufuText.setPosition(GameConfig.stageWidth/2 - qufuText.width/2, rankText.y);
		this.addChildToContainer(qufuText);

		let pointText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("pointNumber"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		pointText.setPosition(GameConfig.stageWidth/2 + 155 - pointText.width/2, rankText.y);
		this.addChildToContainer(pointText);

		let zonerankinfos:any = Api.atkracecrossVoApi.zonerankinfos;

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 640, 134);
		this._serverList = ComponentManager.getScrollList(AtkracecrossServerItem, zonerankinfos, rect);
		this.addChildToContainer(this._serverList);
		this._serverList.y = this._topBg.y + 80;
	}
	private get api() : AtkracecrossVoApi{
        return Api.atkracecrossVoApi;
    }
	private showFengYunPersonRank():void
	{
		if(this._pRankContainer)
		{
			let arr = [];
			for(let i in this.api.prankinfos){
				let unit = this.api.prankinfos[i];
				unit.type = 'enterIn';
				unit.crosspower = true;
				arr.push(unit);
			}
			this._scrollList.refreshData(arr);		

			let rankTxt = <BaseTextField>this._pRankContainer.getChildByName("rankTxt");
			let qinmiTxt = <BaseTextField>this._pRankContainer.getChildByName("qinmiTxt");
			if(rankTxt)
			{
				let rankStr:string;
				let meRank = this.api.merank;
				if(meRank)
				{
					if (meRank > 300) {
						rankStr = "10000+";
					}
					else {
						rankStr = meRank.toString();
					}
				}
				else
				{	//未上榜
					rankStr = LanguageManager.getlocal(this._isCanJoin ? "atkracedes4" : `crossImacyNoAccess`);
				}	
				rankTxt.text = rankStr;
			}
			if(qinmiTxt)
			{
				let str:string = "";
				let mePoint = this.api.mepoint;
				if(mePoint)
				{
					str	= mePoint.toString();
				}else
				{
					str = "0";
				}	
				qinmiTxt.text = str;				
			}			
			this.showFengYunServerRank();
			return;
		}
		this.showTopRankInfo();

		let botY = GameConfig.stageHeigth - 80;

		let personRankCon = new BaseDisplayObjectContainer();
		this.addChild(personRankCon);
		this._pRankContainer = personRankCon;
		let bottomBg : BaseBitmap = BaseBitmap.create("public_9_downbg");
		bottomBg.height = 200; 
		bottomBg.width = 620;
		personRankCon.width = 620;
		personRankCon.height = bottomBg.height;
		personRankCon.setPosition(0, botY - 236);
		personRankCon.addChild(bottomBg);
		bottomBg.x = GameConfig.stageWidth/2 - bottomBg.width/2;
		
		//个人排行榜
		let rankListText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankListText.setPosition(40 , bottomBg.y + 20);
		personRankCon.addChild(rankListText);
		
		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(rankListText.x + rankListText.textWidth + 100, rankListText.y);
		personRankCon.addChild(nameText); 
		
		//标题区服
		let quText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		quText.setPosition(nameText.x + nameText.textWidth + 100 , rankListText.y);
		personRankCon.addChild(quText); 
		
		//擂台分数
		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossAtkraceRankNumTxt"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(quText.x + quText.textWidth + 100, rankListText.y);
		personRankCon.addChild(scoreText);

		//列表数据
		let scroRect = new egret.Rectangle(bottomBg.x, rankListText.y + rankListText.textHeight, bottomBg.width, 100);
		let arr = [];
		for(let i in this.api.prankinfos){
			let unit = this.api.prankinfos[i];
			unit.type = 'enterIn';
			unit.crosspower = true;
			arr.push(unit);
		}
		this._scrollList = ComponentManager.getScrollList(AcCorssAtkracePRankItem, arr, scroRect);
		this._scrollList.x = personRankCon.width/2 - this._scrollList.width/2;
		this._scrollList.y = rankListText.y + rankListText.textHeight + 10;
		personRankCon.addChild(this._scrollList);
		//描述
		let atkracedes = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
		atkracedes.x = (GameConfig.stageWidth - atkracedes.textWidth) / 2;
		atkracedes.y = this._scrollList.y + 50;
		personRankCon.addChild(atkracedes);
		atkracedes.visible = arr.length == 0;

		//分割线
		let lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = (bottomBg.width - lineImg.width) / 2;
        lineImg.y = this._scrollList.y + scroRect.height + 7;
		personRankCon.addChild(lineImg);
		
		if(PlatformManager.checkIsEnSp())
		{
			quText.x += 34;
			scoreText.x += 56;
		}
		else if (PlatformManager.checkIsThSp())
		{
			rankListText.x -= 6;
			quText.x += 6;
			scoreText.x += 15;
		}
		//自己排名
		let rankStr:string;
		let meRank = this.api.merank;
		if(meRank)
		{
			if (meRank > 300) {
				rankStr = "10000+";
			}
			else {
				rankStr = meRank.toString();
			}
		}
		else
		{	//未上榜
			rankStr = LanguageManager.getlocal(this._isCanJoin ? "atkracedes4" : `crossImacyNoAccess`);
		}
		let rank:BaseTextField = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		rank.setPosition(rankListText.x + (rankListText.textWidth - rank.textWidth) / 2, lineImg.y + lineImg.height + 10);
		personRankCon.addChild(rank);
		rank.name = "rankTxt";

		//自己名字
		let name:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
		name.setPosition(nameText.x + (nameText.textWidth - name.textWidth) / 2, rank.y);
		personRankCon.addChild(name);

		//自己区服
		//let currZid:any = Api.mergeServerVoApi.getTrueZid();//ServerCfg.selectServer.zid;
		let servaername = Api.mergeServerVoApi.getAfterMergeSeverName();
		let serveText:BaseTextField = ComponentManager.getTextField(servaername,TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
		serveText.setPosition(quText.x + (quText.textWidth - serveText.textWidth) / 2, name.y); 
		personRankCon.addChild(serveText);

		//自己分数
		let str:string = "";
		let mePoint = this.api.mepoint;
		if(mePoint)
		{
			str	= mePoint.toString();
		}else
		{
			str = "0";
		}
		let qinmiText:BaseTextField = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
		qinmiText.setPosition(scoreText.x + (scoreText.textWidth - qinmiText.textWidth) / 2, serveText.y);
		personRankCon.addChild(qinmiText);
		qinmiText.name = "qinmiTxt";

		let tabTextArr = [
			App.CommonUtil.getCnByCode("acCrossserverPowerPlayerRank", "7"),
			App.CommonUtil.getCnByCode("acCrossserverPowerServerRank", "7")
		];

		let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_BIG_TAB2, tabTextArr, this.tabbarGroupClick, this);
		tabbarGroup.setSpace(0);
		tabbarGroup.setPosition(GameConfig.stageWidth/2 - tabbarGroup.width/2, personRankCon.y - tabbarGroup.height + 4);
		this.addChild(tabbarGroup);
		tabbarGroup.selectedIndex = 0;
		tabbarGroup.setColor(0xe1ba86, 0x472c26);
		tabbarGroup.addZshi();

		this.showFengYunServerRank();
		this.tabbarGroupClick({index: 0});
	}
	private tabbarGroupClick(data:any):void
	{
		if (data.index == 0){
			this._pRankContainer.visible = true;
			this._sRankContainer.visible = false;
		}
		else if (data.index == 1){
			this._pRankContainer.visible = false;
			this._sRankContainer.visible = true;
		}	
	}
	private showFengYunServerRank():void
	{
		if(this._sRankContainer)
		{
			let zonerankinfos:any = this.api.zonerankinfos;
			let arr = [];
			for(let unit of zonerankinfos){
				arr.push({
					zid : unit.zid,
					point : unit.point,
					type : 'enterIn'
				});
			}
			this._serverScrollList.refreshData(arr);
			return;
		}
		let container = new BaseDisplayObjectContainer();
		this.addChild(container);
		this._sRankContainer = container;
		let bottomBg : BaseBitmap = BaseBitmap.create("public_9_downbg");
		bottomBg.height = 200; 
		bottomBg.width = 620;
		container.addChild(bottomBg);
		container.width = GameConfig.stageWidth;
		container.height = bottomBg.height;
		container.setPosition(this._pRankContainer.x, this._pRankContainer.y);
		bottomBg.x = container.width/2 - bottomBg.width/2;

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(GameConfig.stageWidth/2 - 155 - rankText.width/2, bottomBg.y + 20);
		container.addChild(rankText);

		let qufuText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		qufuText.setPosition(GameConfig.stageWidth/2 - qufuText.width/2, rankText.y);
		container.addChild(qufuText);

		let pointText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossAtkraceRankNumTxt"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		pointText.setPosition(GameConfig.stageWidth/2 + 155 - pointText.width/2, rankText.y);
		container.addChild(pointText);

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 640, 124);

		let zonerankinfos:any = this.api.zonerankinfos;
		let arr = [];
		for(let unit of zonerankinfos){
			arr.push({
				zid : unit.zid,
				point : unit.point,
				type : 'enterIn'
			});
		}
		let serverList = ComponentManager.getScrollList(AcCorssAtkraceServerItem, arr, rect);
		container.addChild(serverList);
		serverList.y = pointText.y + pointText.height + 10;
		serverList.x = container.width/2 - serverList.width/2;
		serverList.setEmptyTip(LanguageManager.getlocal("atkracedes5"));
		this._serverScrollList = serverList;		
	}
	//前三名信息
	private showTopRankInfo():void{
		if (this.vo.isInAcPreTime()){
			return ;
		}
		let arr:any[] = [];
		for(let i in this.api.prankinfos){
			let unit = this.api.prankinfos[i];
			arr.push(unit);
		}
		if (arr.length < 3){
			return;
		}
		let count = 3;
		//信息
		let infoPos = [232, 20, 444];
		let rolePosX = [80, -115, 310];
		for (let i=0; i < count; i++){
			let bg = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_rankbg"+(i+1), this.vo.code+"", "7"));
			bg.x = infoPos[i];
			if (i == 0){
				// bg.x = GameConfig.stageWidth/2 - bg.width/2;
				bg.y = GameConfig.stageHeigth - 560;
			}
			else{
				// bg.x = GameConfig.stageWidth/2 + (i%2 == 0 ? 1 : -1) * 200;
				bg.y = GameConfig.stageHeigth - 545;
			}
			this._roleContainer2.addChild(bg);
			let name = ComponentManager.getTextField(arr[i].name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
			name.setPosition(bg.x + bg.width/2 - name.width/2, bg.y + 30);
			this._roleContainer2.addChild(name);

			let sidname = '';
			if(arr[i].uid){
				sidname = Api.mergeServerVoApi.getAfterMergeSeverName(arr[i].uid);
			}
			else{
				sidname = LanguageManager.getlocal("ranserver2",[arr[i].zid.toString()]);
			}
			let server = ComponentManager.getTextField(sidname, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			server.setPosition(bg.x + bg.width/2 - server.width/2, name.y + name.height + 4);
			this._roleContainer2.addChild(server);

			let power = ComponentManager.getTextField(arr[i].point, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_GREEN);
			power.setPosition(bg.x + bg.width/2 - power.width/2, bg.y + 80);
			this._roleContainer2.addChild(power);

			let rank = BaseBitmap.create("accshegemonyprank"+(i+1));
			rank.setPosition(bg.x + bg.width/2 - rank.width/2, power.y + power.height + 2);
			this._roleContainer2.addChild(rank);

			let role = this.getRoleContainer(arr[i]);
			
			if (i==0){
				role.setScale(0.7);
				role.y = GameConfig.stageHeigth - 740;
			}
			else{
				role.setScale(0.65);
				role.y = GameConfig.stageHeigth - 730;
			}
			role.x = rolePosX[i];
			this._roleContainer.addChildAt(role,0);
		}

		this._roleContainer.y = -90 + (1136-GameConfig.stageHeigth)*1;
		this._roleContainer2.y = -90 + (1136-GameConfig.stageHeigth)/11*5;

	}	
	public getRoleContainer(data:any):BaseDisplayObjectContainer{
		if (!data){
			return null;
		}
        let titleData = App.CommonUtil.getTitleData(data.title);
		let curLevel = 1;
		if (titleData.clv){
			curLevel = titleData.clv;
		}
		let titleconfig = null;
		let curTitleId = null;
        if (titleData.clothes){
			titleconfig = Config.TitleCfg.getTitleCfgById(titleData.clothes);
			curTitleId = titleData.clothes;
        }
        
		if(titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7) ){
            curTitleId = titleData.clothes;
            curLevel = titleData.tlv;
			if(curLevel == 0){
				curLevel = 1;
			}
        }
		let userContainer:BaseDisplayObjectContainer = null;
		App.LogUtil.log("EmperorOutFirstAniView:curTitleId "+curTitleId);
		if(curTitleId){
			userContainer = new BaseDisplayObjectContainer();
			userContainer.name = "userContainer";
			this.addChildToContainer(userContainer);

			let role = null;
			let tcfg = Config.TitleCfg.getTitleCfgById(curTitleId);
			let resPath = "palace_db_" + curTitleId + (tcfg.titleType == 7 ? `_${Api.playerVoApi.getUserSex(data.pic)}` : ``);
			if((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && ResourceManager.hasRes(resPath + "_ske")){
				App.LogUtil.log("aaa dragonbone ");
				role = App.CommonUtil.getPlayerDragonRole(curTitleId, data.pic, curLevel, true);
				role.x = 340; //w432, h508
				role.y = 35;
				userContainer.addChild(role);
				role.name = 'role';
				userContainer.height = 790;
			}else{
				role = Api.playerVoApi.getPlayerPortrait(Number(curTitleId), data.pic,null,null,null,null,null,true);
				role.y = -30;
				let isnew = Api.playerVoApi.getNewPalaceRole(curTitleId);
				if (isnew){
					role.x = 0;
				}
				else{
					role.x = 155;
				}
				userContainer.addChild(role);
				userContainer.height = 765;
			}
		}else{
			userContainer = new BaseDisplayObjectContainer();
			// let role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic,0,false,null,null,curLevel);
			let role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic);
			role.width = 300;
			role.y = -30;
			role.x = 190;
			userContainer.name = "userContainer";
			userContainer.addChild(role);
			userContainer.height = 765;
		}
        return userContainer;
    }	
	private initCannotJoin()
	{
		let cannotJoinBg:BaseBitmap = BaseBitmap.create("public_9_downbg");
		cannotJoinBg.width = 410;
		cannotJoinBg.height = 125;
		cannotJoinBg.setPosition(GameConfig.stageWidth/2 - cannotJoinBg.width/2, GameConfig.stageHeigth/2 - 220);
		this.addChildToContainer(cannotJoinBg);

		if(this.vo.checkIsFengyun())
		{
			this._fightbtn.visible = false;
			this._fightEff.visible = false;
			cannotJoinBg.width = 410;
			cannotJoinBg.height = 80;
			cannotJoinBg.setPosition(GameConfig.stageWidth/2 - cannotJoinBg.width/2,200)
		}

		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		let rcannotJoinDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(`atkracecrossNotJoin`, crossVo.isCrossLeague())),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		if(this.vo.checkIsFengyun())
		{
			rcannotJoinDesc.text = LanguageManager.getlocal("atkracecrossNotJoin_fengyun");
		}
		rcannotJoinDesc.width = cannotJoinBg.width ;
		rcannotJoinDesc.setPosition(GameConfig.stageWidth/2 -rcannotJoinDesc.width/2, cannotJoinBg.y+cannotJoinBg.height/2 - rcannotJoinDesc.height/2);
		rcannotJoinDesc.lineSpacing = 6;
		rcannotJoinDesc.textAlign = "center";
		this.addChildToContainer(rcannotJoinDesc);
	}
	
	private initResult():void
	{	
		if (this._topType == 1) 
		{	
			let resultIcon1:string ;
			let resultIcon2:string ;

			let zonerankinfos:any = Api.atkracecrossVoApi.zonerankinfos;
	
			if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid()))
			{
				resultIcon1 = "atkracecross_win";
				resultIcon2 = "atkracecross_loss";
			}
			else 
			{
				resultIcon2 = "atkracecross_win";
				resultIcon1 = "atkracecross_loss";
			}

			let result1:BaseBitmap = BaseBitmap.create(resultIcon1);
			result1.setPosition(185, this._topBg.y+15);
			this.addChildToContainer(result1);

			let result2:BaseBitmap = BaseBitmap.create(resultIcon2);
			result2.setPosition(424, result1.y);
			this.addChildToContainer(result2);
			if(PlatformManager.checkIsThSp())
			{
				result1.x += 25; 
				result2.x -= 44;
			}
		}

		let endCDBg:BaseBitmap = BaseBitmap.create("public_9_downbg");
		endCDBg.width = 410;
		endCDBg.height = 218;
		endCDBg.setPosition(GameConfig.stageWidth/2 - endCDBg.width/2, GameConfig.stageHeigth/2 - 220);
		this.addChildToContainer(endCDBg);

		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		let servername = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, Api.atkracecrossVoApi.zonerankinfos[0].zid);
		let rewardDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(`atkracecrossRewardDesc`, crossVo.isCrossLeague()),[servername]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		if(this.vo.checkIsFengyun())
		{
			rewardDesc.text = LanguageManager.getlocal("atkracecrossRewardDesc_fengyun",[servername])
		}
		rewardDesc.width = endCDBg.width ;
		rewardDesc.setPosition(GameConfig.stageWidth/2 -rewardDesc.width/2, endCDBg.y+40);
		rewardDesc.lineSpacing = 6;
		rewardDesc.textAlign = "center";
		this.addChildToContainer(rewardDesc);
		
		this._rewardCDTime = crossVo.et - GameData.serverTime;
		this._rewwardTime = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossRewardTime",[this.getCountTimeStr2()]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED);
		this._rewwardTime.setPosition(GameConfig.stageWidth/2 -this._rewwardTime .width/2, rewardDesc.y+rewardDesc.height + 30);
		this.addChildToContainer(this._rewwardTime);

		if(this.vo.checkIsFengyun())
		{
			endCDBg.y = 180;

			rewardDesc.y = endCDBg.y + 10;
			rewardDesc.lineSpacing = 3;

			this._rewwardTime.y = rewardDesc.y+rewardDesc.height + 5;

			endCDBg.height = this._rewwardTime.y+this._rewwardTime.height + 10 - endCDBg.y;
		}
	}

	private getCountTimeStr():string
	{	
		let time:number = this._countDownTime;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	private getCountTimeStr2():string
	{	
		let time:number = this._rewardCDTime;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	public tick():void
	{	
		let view = this;
		let vo = <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		if(vo.showZonerward())
		{
			App.CommonUtil.addIconToBDOC(view.awardBtn);
			let reddot = <BaseBitmap>view.awardBtn.getChildByName("reddot");
			if(reddot)
			{
				reddot.setPosition(80,0);
			}
		}
		else
		{
			App.CommonUtil.removeIconFromBDOC(view.awardBtn);
		}
		if(view._cheerBtn)
		{
			if(vo.isCheerRedDot())
			{
				App.CommonUtil.addIconToBDOC(view._cheerBtn);
				let reddot = <BaseBitmap>view._cheerBtn.getChildByName("reddot");
				if(reddot)
				{
					reddot.setPosition(80,0);
				}				
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(view._cheerBtn);
			}
		}
		//领奖倒计时
		if (this._rewwardTime) {
			this._rewardCDTime--;
			this._rewwardTime.text = LanguageManager.getlocal("atkracecrossRewardTime",[this.getCountTimeStr2()]);

			if (this._rewardCDTime < 0) {
				this.refreshEnterBtn();
			}
		}

		//出战倒计时
		if (this._countDownText) {
			this._countDownTime--;
			this._countDownText.text = this.getCountTimeStr();

			if (this._countDownTime < 0) {
				this.refreshServant();
			}
		}
		if(this._chatTxt){
			let showStr:any=Api.chatVoApi.getLastAcCrossMessage();
			if(!showStr)
			{
				showStr="";
			}
			else{
				let zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,showStr.zoneid);
				showStr=LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
			}
			let emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
			if (emoticonStr){
				showStr = emoticonStr;
			}
			this._chatTxt.text = showStr;
		}
	}

	private refreshEnterBtn():void
	{
		
	}

	//底部
	private initBottom():void
	{	
		let bottomRes = this.vo.checkIsFengyun() ? "arena_bottom" : "arena_bottom";
		let bottom:BaseBitmap = BaseBitmap.create(bottomRes);
		if(this.vo.checkIsFengyun())
		{
			this._roleContainer = new BaseDisplayObjectContainer();
			this.addChild(this._roleContainer);

			let zhalan = BaseBitmap.create("atkracecross_zhalan_fengyun");
			zhalan.y = GameConfig.stageHeigth - bottom.height - zhalan.height;
			this.addChild(zhalan);
		}

		let maskDown:BaseBitmap = BaseBitmap.create("servant_mask");
        maskDown.width = GameConfig.stageWidth;
        maskDown.y = GameConfig.stageHeigth - bottom.height - maskDown.height;
		this.addChildAt(maskDown,this.getChildIndex(this.container)-1);
		let chatbg = null;
		let chatIcon = null;
		if(1){
			//跨服聊天消息
			chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
			chatbg.width = GameConfig.stageWidth;
			chatbg.height = 35;
			chatbg.x = 0;
			chatbg.y = GameConfig.stageHeigth-bottom.height-chatbg.height-11;
			this.addChild(chatbg);
			chatbg.touchEnabled = true;
			chatbg.addTouchTap(this.chatBgClickHandler,this);

			chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
			chatIcon.anchorOffsetX = chatIcon.width/2;
			chatIcon.anchorOffsetY = chatIcon.height/2;
			chatIcon.x =  chatIcon.width/2+10;
			chatIcon.y = chatbg.y + chatbg.height/2;
			this.addChild(chatIcon);
			egret.Tween.get(chatIcon, {
				loop: true,//设置循环播放
			}).to({scaleX:0.8,scaleY:0.8},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360
			
			let showStr:any=Api.chatVoApi.getLastAcCrossMessage();
			if(!showStr)
			{
				showStr="";
			}
			else{
				let zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,showStr.zoneid);
				showStr=LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
			}
			let emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
			if (emoticonStr){
				showStr = emoticonStr;
			}
			this._chatTxt = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._chatTxt.width = 480;
			this._chatTxt.height = 20;
			this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.x + chatIcon.width + 5, 0]);
			this.addChild(this._chatTxt);
		}
		
		//来访消息
		let visitBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.visitHandle,this,null,0);
		visitBg.setPosition(24,GameConfig.stageHeigth - 200 - (chatbg ? chatbg.height : 0));
		this.addChild(visitBg);

		//活动奖励
		let awardBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.rewardHandle,this,null,0);
		awardBg.setPosition(24,visitBg.y - 115);
		this.addChild(awardBg);
		this.awardBtn = awardBg;

		let visitIcon:BaseBitmap = BaseBitmap.create("arena_visit");
		visitIcon.setPosition(visitBg.width/2-visitIcon.width/2,visitBg.height/2-visitIcon.height/2-5);
		visitBg.addChild(visitIcon);

		let visitText:BaseBitmap = BaseBitmap.create("arena_visit_text");
		visitText.setPosition(visitBg.width/2-visitText.width/2,visitIcon.y + visitIcon.height -30);
		visitBg.addChild(visitText);

		let awardIcon:BaseBitmap = BaseBitmap.create("atkracecross_award");
		awardIcon.setPosition(awardBg.width/2-awardIcon.width/2,awardBg.height/2-awardIcon.height/2-5);
		awardBg.addChild(awardIcon);

		let awardText:BaseBitmap = BaseBitmap.create("atkracecross_award_text");
		awardText.setPosition(awardBg.width/2-awardText.width/2,awardIcon.y + awardIcon.height -30);
		awardBg.addChild(awardText);		

		if(this.vo.checkIsFengyun())
		{
			chatbg.y += 15;
			chatIcon.y = chatbg.y + chatbg.height/2;
			this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.x + chatIcon.width + 5, 0]);

			awardBg.setScale(0.9);
			awardBg.x = 5;
			awardBg.y = 100;

			visitBg.setScale(0.9);
			visitBg.x = awardBg.x + awardBg.width*awardBg.scaleX + 15;
			visitBg.y = awardBg.y;
		}		

		if(!Api.switchVoApi.checkOpenShenhe())
		{
			//排行榜
			let rankBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.rankHandle,this,null,0);
			rankBg.setPosition(GameConfig.stageWidth-rankBg.width-24,visitBg.y);
			this.addChild(rankBg);

			let rankIcon:BaseBitmap = BaseBitmap.create("arena_rank");
			rankIcon.setPosition(rankBg.width/2-rankIcon.width/2,rankBg.height/2-rankIcon.height/2-5);
			rankBg.addChild(rankIcon);

			let rankText:BaseBitmap = BaseBitmap.create("arena_rank_text");
			rankText.setPosition(rankBg.width/2-visitText.width/2,rankIcon.y + rankIcon.height -30);
			rankBg.addChild(rankText);

			//详情按钮
			let ruleBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.clickDetailBtnHandler,this);
			this.addChildAt(ruleBg,100);

			let ruleicon:BaseBitmap = BaseBitmap.create("atkracecross_explain");
			ruleBg.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ruleicon, ruleBg, [0,0], true);
			ruleBg.addChild(ruleicon);
			if(LocalStorageManager.get(LocalStorageConst.LOCAL_IMACY_RULE) == ''){
				this.clickDetailBtnHandler(1);
				LocalStorageManager.set(LocalStorageConst.LOCAL_IMACY_RULE, '1');
			}
			if(PlatformManager.hasSpcialCloseBtn()){
				this.setLayoutPosition(LayoutConst.horizontalCentertop, ruleBg, rankBg, [0, -ruleBg.height - 10]);
			}
			else{
				ruleBg.x = 24;
				ruleBg.y = awardBg.y-awardBg.height-5;
			}

			if(this.vo.checkIsFengyun())
			{
				ruleBg.visible = false;
				ruleicon.visible = false;

				rankBg.setScale(0.9);
				rankBg.setPosition(GameConfig.stageWidth-rankBg.width*rankBg.scaleX-10,visitBg.y);
				rankIcon.setPosition(rankBg.width/2-rankIcon.width/2,rankBg.height/2-rankIcon.height/2-5);
				rankText.setPosition(rankBg.width/2-visitText.width/2,rankIcon.y + rankIcon.height -30);

				let cheerBtn:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.cheerHandle,this,null,0);
				cheerBtn.setPosition(rankBg.x - cheerBtn.width-5,visitBg.y);
				this.addChild(cheerBtn);
				this._cheerBtn = cheerBtn;

				let cheerIcon:BaseBitmap = BaseBitmap.create("accrosspower_cheerbtnicon-7");
				cheerIcon.setPosition(cheerBtn.width/2-cheerIcon.width/2,cheerBtn.height/2-cheerIcon.height/2-5);
				cheerBtn.addChild(cheerIcon);

				let cheerText:BaseBitmap = BaseBitmap.create("accrosspower_cheerbtntxt-7");
				cheerText.setPosition(cheerBtn.width/2-visitText.width/2,cheerIcon.y + cheerIcon.height -20);
				cheerBtn.addChild(cheerText);	

				cheerBtn.setScale(0.9);
			}
		}

		// if(this.vo.checkIsFengyun())
		// {
		// 	return;
		// }
		
		bottom.y = GameConfig.stageHeigth - bottom.height;
		this.addChild(bottom);
		this.bottomBg = bottom;

		let showMoreRes = this.vo.checkIsFengyun() ? "atkracecross_moretxt" : "arena_more";
		let showMore:BaseButton = ComponentManager.getButton(showMoreRes,null,this.showMoreHandle,this);
		showMore.setPosition(GameConfig.stageWidth-showMore.width-18,GameConfig.stageHeigth - bottom.height/2  - showMore.height/2);
		this.addChild(showMore);

		let moreArrowRes = this.vo.checkIsFengyun() ? "atkracecross_upflag" : "arena_arrow";
		this._moreArrow = BaseBitmap.create(moreArrowRes);
		this._moreArrow.setPosition(showMore.x - this._moreArrow.width - 5, GameConfig.stageHeigth - bottom.height/2  - this._moreArrow.height/2);
		this.addChild(this._moreArrow);

		if(this.vo.checkIsFengyun())
		{
			showMore.y = showMore.y - 6;
			showMore.x = showMore.x - 30;
			this._moreArrow.x = showMore.x - this._moreArrow.width+10;
			this._moreArrow.y -= 3;
		}
	}

	private cheerHandle():void
	{
		if (!this.vo.isStart){
			this.vo.showAcEndTip();
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSATKRACECHEERVIEWTAB2 ,{
			aid : this.param.data.aid,
			code : this.param.data.code,
		});
	}

	private chatBgClickHandler():void
	{
		if(Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace"))
		{
			var activeStr:string ="crossServerAtkRace-"+ Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code;
			ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, {activeID : activeStr});
		}  
	}
	 
	public useCallback(event: egret.Event): void  
	{
		if(event.data.ret)
		{
			if(event.data.data.data.atklist)
			{
				this._atkraceInfoVoList =event.data.data.data.atklist;
				this.showText();
				this.refreshText();
			} 
		
			if(this.listconditions)
			{
				this.listconditions.visible =false;
			} 
			
			if(this._atkraceInfoVoList.length>0)
			{
				this.isData =true;
			}
			else
			{
				this.isData =false;
			}
		}
		else
		{
			this.isData =false;
		}  
	}
	private showText():void
	{	
		// if(this.vo.checkIsFengyun())
		// {
		// 	return;
		// }		
		if(this.describeTxt==null)
		{
			let describeTxt  =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			describeTxt.width=450;
			describeTxt.x = 20;
			describeTxt.y =	 GameConfig.stageHeigth-40;
			this.describeTxt= describeTxt;
			this.addChild(describeTxt); 

			if(this.vo.checkIsFengyun())
			{
				describeTxt.width = 425;
				describeTxt.y =	 GameConfig.stageHeigth-47;
			}
		}

		if(this._nameTxt==null)
		{	 
			let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
			nameTxt.size = TextFieldConst.FONTSIZE_CONTENT_SMALL;
			nameTxt.x = 20;
			nameTxt.y =GameConfig.stageHeigth-65;
			this.addChild(nameTxt);
			this._nameTxt =nameTxt;

			if(this.vo.checkIsFengyun())
			{
				nameTxt.y =	 GameConfig.stageHeigth-72;
			}
		}  
	}

	private refreshText():void
	{ 
		// if(this.vo.checkIsFengyun())
		// {
		// 	return;
		// }
		if(this._atkraceInfoVoList.length>0&&this._atkraceInfoVoList[0].info)
		{
			var  data:any =this._atkraceInfoVoList[0];
			//击败｜｜全歼
			let str = "";
			if(this.isData&&data.info.type==1){
				str =LanguageManager.getlocal("atkracebeat");
			}
			else
			{
				str =LanguageManager.getlocal("atkraceAnnihilation");
			} 
		
			var currName =Config.ServantCfg.getServantItemById(data.info.sid).name;
				//追杀文字
			if(data.info.streak&&data.info.streak>=3)
			{	
				var desStr:string ="actrackStraight"
				if(data.info.atype&&data.info.atype==2)
				{
					 desStr ="actrackStraight_1";
				} 
				else if(data.info.atype&&data.info.atype==4)
				{
					 desStr ="actrackStraight_4";//追杀  全歼了
				}
				else if(data.info.atype&&data.info.atype==3)
				{
					 desStr ="actrackStraight_3";//追杀  全歼了
				}
				this.describeTxt.text =LanguageManager.getlocal(desStr,[LanguageManager.getlocal(`actrackservant`),currName,str,data.info.uname2,data.info.fightnum,data.info.streak]);
			}
			else
			{	
				var desStr2:string ="actrackDescription"
				if(data.info.atype&&data.info.atype==2)
				{
					 desStr2 ="actrackDescription_1";
				} 
				else if(data.info.atype&&data.info.atype==4)
				{
					 desStr2 ="actrackStraight_4_2";//追杀 
				}
				else if(data.info.atype&&data.info.atype==3)
				{
					 desStr2 ="actrackDescription_3";//追杀 
				}
				this.describeTxt.text =LanguageManager.getlocal(desStr2,[LanguageManager.getlocal(`actrackservant`),currName,str,data.info.uname2,data.info.fightnum]);
			}  

			if(this._nameTxt)
			{
				let sidname = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,data.info.zid);
				let zidStr = LanguageManager.getlocal("atkraceCrossServeDes",[sidname]);
				this._nameTxt.text = zidStr+this._atkraceInfoVoList[0].info.name;
			} 
		
		}
	}

	private rankHandle():void
	{
		if(this.vo.checkIsFengyun())
		{
			ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSFENGYUNRANKLISTVIEW);
		}else
		{
			ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSRANKLISTVIEW);
		}
	}

	private visitHandle():void
	{	
		if (this._isCanJoin== false)
		{	
			let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
            let key = App.CommonUtil.getCrossLeagueCn(`atkraceNoDes`,crossVo.isCrossLeague());
            if(this.vo.checkIsFengyun())
            {
                key = "atkraceNoDes_fengyun";
            }
			App.CommonUtil.showTip(LanguageManager.getlocal(key));
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSVISITVIEW);
	}

	private rewardHandle():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSACTIVITYREWARDVIEW);
	}

	private showMoreHandle():void
	{
		if(this.touchBoo)
		{
			this._isShowMore = !this._isShowMore;
			if (this._isShowMore == true) {
				this._moreArrow.scaleY = -1;
				this._moreArrow.y += this._moreArrow.height;
				
					this.showList();
			}
			else {
				this._moreArrow.scaleY = 1;
				this._moreArrow.y -= this._moreArrow.height;
				this.closeList();
			}
		}
		
	}


	private showList():void
	{	
		
			this.moveContainer= new BaseDisplayObjectContainer();
			this.addChild(this.moveContainer);

			this.moreBg = BaseBitmap.create("arena_bottom_bg");
			this.moreBg.width = 640;
			this.moreBg.height =GameConfig.stageHeigth - 330;
			this.moveContainer.addChild(this.moreBg);

			this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
			this._currMaskBmp.width=GameConfig.stageWidth;
			this._currMaskBmp.height=GameConfig.stageHeigth;
			this._currMaskBmp.touchEnabled = true;
			this.addChild(this._currMaskBmp);
			this.setChildIndex(this._currMaskBmp,this.getChildIndex(this.bottomBg));


			// 增加 点击区域
			this._touchBg = BaseBitmap.create("public_9_bg25");  
			this._touchBg.width = 640;
			this._touchBg.height =260;
			this._touchBg.x=0;
			this._touchBg.y=-240;
			this._touchBg.alpha =0;
			this._touchBg.addTouchTap(this.showMoreHandle,this);
			this.moveContainer.addChild(this._touchBg);

			if(this.isData)
			{
				let rect = egret.Rectangle.create();
				rect.setTo(0, 10, 640, GameConfig.stageHeigth -340);
				this._scrollList = ComponentManager.getScrollList(ActrackCrossMoreItem, this._atkraceInfoVoList, rect);
				this.moveContainer.addChild(this._scrollList);
				this._scrollList.y =5;
			}
			else
			{
				let atkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20);
				atkracedes3.x =250;
				atkracedes3.y =300;
				this.moveContainer.addChild(atkracedes3);
			}	
			this.moveContainer.y =1150;
			this.touchBoo=false;
		

			//描述文字：击败门客20
		 	var num =Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code).getbeatNum();
			let listconditions = ComponentManager.getTextField(LanguageManager.getlocal("atkracelistconditions",[num+""]), 20);
			listconditions.x =100
			listconditions.y = GameConfig.stageHeigth - 50;
			if(this.vo.checkIsFengyun())
			{
				listconditions.text = LanguageManager.getlocal("atkracelistconditions_fengyun",[num+""]);
				listconditions.y = GameConfig.stageHeigth - 50;
			}
			this.addChild(listconditions);
			this.listconditions = listconditions;

			if(this.listconditions)
			{
				this.listconditions.visible =false;
			}
			if(this.describeTxt)
			{
				this.describeTxt.visible =false;
				this._nameTxt.visible =false;
			}
			
			egret.Tween.get(this.moveContainer).to({y:250},500).call(function()
			{
				egret.Tween.removeTweens(this.moveContainer);
				this.touchBoo =true;
				if(this.listconditions)
				{
					this.listconditions.visible =true;
				}
			},this);
	}

	private closeList():void
	{
		this.touchBoo=false;
		this.listconditions.visible =false;
		if(this.describeTxt)
		{
			this.describeTxt.visible =true;
			this._nameTxt.visible =true;
		}
		
		if(this.moveContainer)
		{	
			egret.Tween.get(this.moveContainer).to({y:1150},500).call(function(){
			this.touchBoo=true;
			egret.Tween.removeTweens(this.moveContainer);
		
		},this);
		}

		if(this._currMaskBmp&&this._currMaskBmp.parent)
		{
			this._currMaskBmp.parent.removeChild(this._currMaskBmp);
			this._currMaskBmp.dispose();
			this._currMaskBmp =null;
		}
		if(this._touchBg&&this._touchBg.parent)
		{
			this._touchBg.parent.removeChild(this._touchBg);
			this._touchBg.dispose();
			this._touchBg =null;
		}
	}

	private battleCallback():void
	{	 
		 this.resetInfo(); 
		 NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_LIST, {});
		 App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_LIST), this.useCallback, this);
	
		  NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_RANK, {});
	}

	private fightendCallback():void
	{
		if(this.vo.checkIsFengyun())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("atkracecrossFightEndTip_fengyun"));
		}else
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("atkracecrossFightEndTip"));
		}
		this._isFightEnd = true;
		ViewController.getInstance().hideView(ViewConst.COMMON.ATKRACECROSSARRESTVIEW);
		ViewController.getInstance().hideView(ViewConst.POPUP.CONFIRMPOPUPVIEW);
		ViewController.getInstance().hideView(ViewConst.POPUP.ATKRACECROSSAGREEPOPUPDIALOG);
		ViewController.getInstance().hideView(ViewConst.BASE.BATTLEWIN);
		ViewController.getInstance().hideView(ViewConst.BASE.PROMPTVIEW);
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		this.request(NetRequestConst.REQUEST_ATKRACECROSS_INDEX,{activeId:crossVo.aidAndCode});
	}

	private challengeCallback(data:any):void
    {
        if(data.data.ret)
        {
			if(AtkraceCrossChallengeItem.data&&AtkraceChallengeItem.data.type==1)
			{
				 if(this.touchBoo)
				 {
					 this.moveContainer.y=1150;
					 this._currMaskBmp.visible =false;

					 this._isShowMore =false;
					 this.closeList();
					 this._moreArrow.scaleY = 1;
					 this._moreArrow.y = GameConfig.stageHeigth - 94/2  - this._moreArrow.height/2;
				 }
			}
			 this.refreshServant();
			 ViewController.getInstance().hideView(ViewConst.POPUP.ATKRACECROSSCHALLENGEVIEW);
        	 this.clickServant();
        }
    }

	public refreshServant():void
	{	
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		this.request(NetRequestConst.REQUEST_ATKRACECROSS_INDEX,{activeId:crossVo.aidAndCode});
	}

	private getPRank(evt):void
	{
		if (evt && evt.data && !evt.data.ret)
		{
			return;
		}
		let data = evt.data.data.data;
		this.api.setPRankInfo(data);
		this.showFengYunPersonRank();
	}

	private clickDetailBtnHandler(param:any):void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSDETAILPOPUPVIEW);
	}
    private get vo() : AcCrossServerAtkRaceVo{
        return <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
    }
	private get cfg() : Config.AcCfg.CrossServerAtkRaceCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", this.vo.code);
    }
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESET_ATKRACECROSS,this.battleCallback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND,this.fightendCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_CHALLENGE), this.challengeCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REVENGE), this.challengeCallback, this);
    	App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_KILL), this.challengeCallback, this);
 		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_LIST), this.useCallback, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_RANK), this.getPRank, this);

		this._moreArrow = null;
		this.bottomBg = null;
		this._isShowMore = false;
		this.touchBoo=true;
		this.moveContainer =null;
		this.listconditions =null;
		this.describeTxt =null;
		this._nameTxt =null;
		this._currMaskBmp  =null;
		this._touchBg =null;
		this.moreBg =null;
		this.isData = false;
		this._scrollList = null;
		this._atkraceInfoVoList = null;
		this._topBg = null;
		this._scoreTextTab.length = 0;
		this._rewwardTime = null;
		this._countDownTime = 0;
		this._infoContainer = null;
		this._countDownText = null;
		this._fightflag = null;
		this._topType = 0;
		this._serverList = null;
		this._isCanJoin = false;
		this._rewardCDTime = 0;
		this._isFightEnd = false;
		this._chatTxt = null;
		this.awardBtn = null;
		this._pRankContainer = null;
		this._sRankContainer = null;
		this._cheerBtn = null;
		this._roleContainer = null;
		this._roleContainer2 = null;
		this._fightbtn = null;
		if(this._fightEff)
		{
			this._fightEff.dispose();
			this._fightEff = null;
		}
		Api.chatVoApi.clearAcCrossChatList();
		super.dispose();
	}
}