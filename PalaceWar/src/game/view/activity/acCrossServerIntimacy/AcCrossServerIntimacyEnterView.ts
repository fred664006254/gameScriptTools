/**
 * author:qianjun
 * desc:进入跨服亲密活动
*/
class AcCrossServerIntimacyEnterView extends CommonView
{
	private _scrollList:ScrollList=null;
	private _scoreTextTab:(BaseBitmapText|BaseTextField)[] = [];
	private _countDownText:BaseTextField = null;
	private _serverList:ScrollList=null;
	private _atkracedes1:BaseTextField = null;
	private _atkracedes2:BaseTextField = null;
	private _posArr:any[] = [];
	private _chatTxt :BaseTextField = null;
	private awardBtn : BaseButton = null;
	private _zhalan:BaseBitmap=null;
	private _cheerBtn:BaseButton = null;
	private _pRankContainer:BaseDisplayObjectContainer = null;
	private _servRankContainer:BaseDisplayObjectContainer = null;
	private _middleContainer:BaseDisplayObjectContainer = null;

	private _isCanJoin:boolean = false;
	private _cdType : number = 0;

	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.CrossServerIntimacyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerIntimacyVo{
        return <AcCrossServerIntimacyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
	}
	
	private get api() : CrossImacyVoApi{
        return Api.crossImacyVoApi;
	}
	
	private get code() : string{
        return this.param.data.code;
	}
	
	protected getUiCode():string
	{
		let code = `1`;
		switch(Number(this.code)){
			default:
				code = `1`;
				if (this.vo.checkIsTianjiao()){
					code = `7`;
				}
				break;
		}
		return code;
	}

	protected getResourceList():string[]
	{
		let list:string[] = [];
		if (this.vo.checkIsTianjiao()){
			list = [
				"crossserverintititle-"+this.getUiCode(),
				"accrosspower_rankbg1-"+this.getUiCode(),
				"accrosspower_rankbg2-"+this.getUiCode(),
				"accrosspower_rankbg3-"+this.getUiCode(),
				"accrossintimacy_cheerbtnicon-"+this.getUiCode(),
				"accrosspower_cheerbtntxt-"+this.getUiCode(),
			]
		}		
		return super.getResourceList().concat([
		"crossserverintienterbg-1","atkracecross_award_text","atkracecross_award","atkracecross_top",
		"rankinglist_rankbg",,"forpeople_bottom","atkracecross_rankbg","atkracecross_rank","atkracecross_explain",
		,"arena_rank","arena_rank_text","commonview_bigframe",
		"dinner_line", "accshegemonyprank1", "accshegemonyprank2", "accshegemonyprank3"
		]).concat(list);
	}

	protected getBgName():string
	{
		if (this.getUiCode() == "7")
		{
			return "crossserverintibg-7";
		}
		return "crossserverintienterbg-"+this.param.data.getUiCode;
	}

	protected getTitleStr():string
	{
		if (this.getUiCode() == "7"){
			return null;
		}
		return App.CommonUtil.getCrossLeagueCn(`crossImacyTitle-${this.getUiCode()}`, this.vo.isCrossLeague());
	}
	protected getTitleBgName():string
	{
		if (this.getUiCode() == "7")
		{
			return "crossserverintititle-7";
		}
		return "commonview_titlebg"+this.uiType;
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
			if (this.getUiCode() == "7"){
				this.viewBg.y = 0;
			}
			this.addChild(this.viewBg); 
		}
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view.api.setZoneRankInfo(data.data.data);
	}

	public initView():void
	{	
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);
		let view = this;
		let vo = view.vo;
		//当前时间段
		view._cdType = vo.judgeTimeProcess();
		//顶部
		if (this.getUiCode() != "7")
		{
			let zrankinfo = view.api.zonerankinfos;
			let arr = [];
			for(let i in zrankinfo){
				arr.push(zrankinfo[i]);
			}
			if(arr.length){//arr.length
				if(zrankinfo.length == 2){
					view.init_top1();
				}
				else{
					view.init_top2();
				}
			}
			else{
				view.init_top2();
			}
		}
		//中间
		view.init_middle();
		//底部个人排行榜
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK, {});
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK), this.useCallback, this);
	
		if (this.getUiCode() == "7")
		{
			this.setBigFameY(0);
			if (!view.vo.isInAcPreTime())
			{
				view._middleContainer.visible = false;
			}
		}
	}

	//两区对战
	private init_top1():void{
		let view = this;
		let api = view.api;

		let topBg = BaseLoadBitmap.create("atkracecross_top");
		topBg.x = 0;
		topBg.y = 89;
		this.addChild(topBg);

		let zonerankinfos:any = api.zonerankinfos;
		let myServerInfo:any;
		let otherSerInfo:any;
		if(zonerankinfos.length){
			if(Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid()))
			{
				myServerInfo = zonerankinfos[0];
				otherSerInfo = zonerankinfos[1];
			}
			else 
			{
				myServerInfo = zonerankinfos[1];
				otherSerInfo = zonerankinfos[0];
			}
			let serverName1 = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,myServerInfo.zid);
			let serverId1:BaseTextField = ComponentManager.getTextField(serverName1,TextFieldConst.FONTSIZE_CONTENT_COMMON);
			serverId1.setPosition(56 - serverId1.width / 2, topBg.y + 46);
			this.addChild(serverId1);

			let serverName2 = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,otherSerInfo.zid);
			let serverId2:BaseTextField = ComponentManager.getTextField(serverName2,TextFieldConst.FONTSIZE_CONTENT_COMMON);
			serverId2.setPosition(GameConfig.stageWidth - 56 - serverId2.width / 2, serverId1.y);
			this.addChild(serverId2);
	
			this._scoreTextTab.length = 0;
	
			let serverScore1:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(String(myServerInfo.point),TextFieldConst.FONTNAME_ITEMTIP);
			serverScore1.setPosition(114, topBg.y + 67);
			this.addChild(serverScore1);
			this._scoreTextTab.push(serverScore1);
	
			let serverScore2:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(String(otherSerInfo.point),TextFieldConst.FONTNAME_ITEMTIP);
			serverScore2.setPosition(GameConfig.stageWidth - 110 - serverScore2.width, serverScore1.y);
			this.addChild(serverScore2);
			this._scoreTextTab.push(serverScore2);
		}
	}

	//区服排行
	private init_top2():void{
		let view = this;
		let api = view.api;
		let zonerankinfos:any = api.zonerankinfos;

		let topBg = BaseBitmap.create("atkracecross_rankbg");
		topBg.y = 89;
		topBg.height = 224;
		this.addChild(topBg);

		let serverText:BaseBitmap = BaseBitmap.create("atkracecross_rank");
		serverText.setPosition(GameConfig.stageWidth/2-serverText.width/2,topBg.y+8);
		this.addChild(serverText);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(GameConfig.stageWidth/2 - 155 - rankText.width/2, topBg.y + 50);
		this.addChild(rankText);

		let qufuText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		qufuText.setPosition(GameConfig.stageWidth/2 - qufuText.width/2, rankText.y);
		this.addChild(qufuText);

		let pointText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`croessImacyScore-${this.getUiCode()}`),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		pointText.setPosition(GameConfig.stageWidth/2 + 155 - pointText.width/2, rankText.y);
		this.addChild(pointText);

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 640, 144);
		let arr = [];
		for(let unit of zonerankinfos){
			arr.push({
				zid : unit.zid,
				point : unit.point,
				type : 'enterIn'
			});
		}
		this._serverList = ComponentManager.getScrollList(AcCorssImacyServerItem, arr, rect);
		this.addChild(this._serverList);
		this._serverList.y = topBg.y + 80;

		//描述
		let atkracedes = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
		atkracedes.x = (GameConfig.stageWidth - atkracedes.textWidth) / 2;
		atkracedes.y = this._serverList.y + 50;
		this.addChild(atkracedes);
		this._atkracedes1 = atkracedes;
		this._atkracedes1.visible = arr.length == 0;
	}

	private init_middle():void
	{
		let view = this;
		let api = this.api;
		let vo = this.vo;

		let middleContainer = new BaseDisplayObjectContainer();
		this.addChild(middleContainer);
		this._middleContainer = middleContainer;
		let wordsBg = BaseBitmap.create("public_9_wordbg2");
		wordsBg.height = 125;
		middleContainer.width = wordsBg.width;
		middleContainer.height = wordsBg.height;
		middleContainer.x = (GameConfig.stageWidth - wordsBg.width) / 2
		middleContainer.y = GameConfig.stageHeigth / 2 - 125 / 2;
		middleContainer.addChild(wordsBg);

		let countDownTime = view.api.getCountDownTime();
		let str = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(vo.getIsCanJoin() ? App.CommonUtil.getCnByCode(`croessImacyJoin`, this.getUiCode()) : App.CommonUtil.getCnByCode(`croessImacyNotJoin`, this.getUiCode()), vo.isCrossLeague()), [LanguageManager.getlocal(`crossIntimacyCDTime${view._cdType}`) + vo.getCountTimeStr(countDownTime)]);
		let wordsText:BaseTextField = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
		wordsText.lineSpacing = 6;
		wordsText.setPosition(wordsBg.x + wordsBg.width / 2 - wordsText.textWidth / 2, wordsBg.y + (125 - 78) / 2 + 7);
		wordsText.textAlign = egret.HorizontalAlign.CENTER;
		this._countDownText = wordsText;
		middleContainer.addChild(wordsText);
	}

	public tick():void
	{	
		let view = this;
		let vo = view.vo;
		
		if(vo.checkZoneRewardDeddot())
		{
			App.CommonUtil.addIconToBDOC(view.awardBtn);
		}
		else
		{
			App.CommonUtil.removeIconFromBDOC(view.awardBtn);
		}

		if (view.getUiCode() == "7" && view._cheerBtn){
			if (vo.isCheerRedDot()){
				App.CommonUtil.addIconToBDOC(view._cheerBtn);
			}
			else{
				App.CommonUtil.removeIconFromBDOC(view._cheerBtn);
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

		if (view._countDownText) {
			if (view.getUiCode() == "7" && (!view.vo.isInAcPreTime())){
				view._middleContainer.visible = false;
				return;
			}
			view._middleContainer.visible = true;
			let countDownTime = view.api.getCountDownTime();
			if(countDownTime <= 0){
				view._cdType = view.vo.judgeTimeProcess();
				if(view._cdType == 4){
					view.hide();
					App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
					return;
				}
			}
			view._countDownText.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(vo.getIsCanJoin() ? App.CommonUtil.getCnByCode(`croessImacyJoin`, this.getUiCode()) : App.CommonUtil.getCnByCode(`croessImacyNotJoin`, this.getUiCode()), this.vo.isCrossLeague()), [LanguageManager.getlocal(`crossIntimacyCDTime${view._cdType}`) + vo.getCountTimeStr(countDownTime)]);
		}
	}

	private refreshEnterBtn():void
	{
		
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
			let bg = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_rankbg"+(i+1), this.getUiCode(), "7"));
			bg.x = infoPos[i];
			if (i == 0){
				// bg.x = GameConfig.stageWidth/2 - bg.width/2;
				bg.y = GameConfig.stageHeigth - 560;
			}
			else{
				// bg.x = GameConfig.stageWidth/2 + (i%2 == 0 ? 1 : -1) * 200;
				bg.y = GameConfig.stageHeigth - 545;
			}
			this.addChild(bg);
			let name = ComponentManager.getTextField(arr[i].name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
			name.setPosition(bg.x + bg.width/2 - name.width/2, bg.y + 30);
			this.addChild(name);

			let sidname = '';
			if(arr[i].uid){
				sidname = Api.mergeServerVoApi.getAfterMergeSeverName(arr[i].uid);
			}
			else{
				sidname = LanguageManager.getlocal("ranserver2",[arr[i].zid.toString()]);
			}
			let server = ComponentManager.getTextField(sidname, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			server.setPosition(bg.x + bg.width/2 - server.width/2, name.y + name.height + 4);
			this.addChild(server);

			let power = ComponentManager.getTextField(arr[i].point, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_GREEN);
			power.setPosition(bg.x + bg.width/2 - power.width/2, bg.y + 80);
			this.addChild(power);

			let rank = BaseBitmap.create("accshegemonyprank"+(i+1));
			rank.setPosition(bg.x + bg.width/2 - rank.width/2, power.y + power.height + 2);
			this.addChild(rank);

			let role = this.getRoleContainer(arr[i]);
			
			if (i==0){
				role.setScale(0.7);
				role.y = GameConfig.stageHeigth - 750;
			}
			else{
				role.setScale(0.65);
				role.y = GameConfig.stageHeigth - 730;
			}
			role.x = rolePosX[i];
			this.addChildAt(role, this.getChildIndex(this._zhalan) - 1);
		}
	}	

	//底部
	private initBottom():void
	{	
		let personRankCon = new BaseDisplayObjectContainer();
		this._pRankContainer = personRankCon;

		let bottomBg : BaseBitmap = BaseBitmap.create("public_9_downbg");
		bottomBg.height = 200; 
		bottomBg.width = 620;
		bottomBg.x = 10;
		personRankCon.width = GameConfig.stageWidth;
		personRankCon.height = bottomBg.height;
		personRankCon.setPosition(0, GameConfig.stageHeigth - 200);
		personRankCon.addChild(bottomBg);
		//个人排行榜
		let rankListText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankListText.setPosition(30 , bottomBg.y + 20);
		personRankCon.addChild(rankListText);
		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(rankListText.x + rankListText.textWidth + 100, rankListText.y);
		personRankCon.addChild(nameText); 
		//标题区服
		let quText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		quText.setPosition(nameText.x + nameText.textWidth + 100 , rankListText.y);
		personRankCon.addChild(quText); 
		//亲密涨幅
		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`croessImacyScore-${this.getUiCode()}`),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(quText.x + quText.textWidth + 100, rankListText.y);
		personRankCon.addChild(scoreText);

		if(PlatformManager.checkIsEnLang())
		{
			rankListText.x = 40 + (44 - rankListText.width) / 2;
			nameText.x = 184 + (88 - nameText.width) / 2;
			quText.x = 372 + (44 - quText.width) / 2;
			scoreText.x =516 + (88 - scoreText.width) / 2;
		}
		//列表数据
		let scroRect = new egret.Rectangle(bottomBg.x, rankListText.y + rankListText.textHeight, bottomBg.width, 100);
		let arr = [];
		for(let i in this.api.prankinfos){
			let unit = this.api.prankinfos[i];
			unit.type = 'enterIn';
			unit.imacy = true;
			arr.push(unit);
		}

		this._scrollList = ComponentManager.getScrollList(AcCorssImacyPRankItem, arr, scroRect);
		this._scrollList.x = personRankCon.width/2 - this._scrollList.width/2 - 20;
		this._scrollList.y = rankListText.y + rankListText.textHeight + 10;
		personRankCon.addChild(this._scrollList);
		
		//描述
		let atkracedes = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
		atkracedes.x = (GameConfig.stageWidth - atkracedes.textWidth) / 2;
		atkracedes.y = this._scrollList.y + 50;
		personRankCon.addChild(atkracedes);
		this._atkracedes2 = atkracedes;
		this._atkracedes2.visible = arr.length == 0;

		//分割线
		let lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = (bottomBg.width - lineImg.width) / 2;
        lineImg.y = this._scrollList.y + scroRect.height + 7;
		personRankCon.addChild(lineImg);

		if(PlatformManager.checkIsKRSp())
		{
			if (this.getUiCode() == "7"){
				nameText.x += 12;
				quText.x += 23;
				scoreText.x += 5;
			}
		}
		else if (PlatformManager.checkIsRuLang()){
			if (this.getUiCode() == "7"){
				nameText.x += 20;
				quText.x += 40;
				scoreText.x -= 20;
			}
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
			rankStr = LanguageManager.getlocal(this.vo.getIsCanJoin() ? "atkracedes4" : `crossImacyNoAccess`);// this._merank.toString();
		}
		let rank:BaseTextField = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		rank.setPosition(rankListText.x + (rankListText.textWidth - rank.textWidth) / 2, lineImg.y + lineImg.height + 10);
		personRankCon.addChild(rank);

		//自己名字
		let name:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
		name.setPosition(nameText.x + (nameText.textWidth - name.textWidth) / 2, rank.y);
		personRankCon.addChild(name);

		//自己区服
		let currZid:any = Api.mergeServerVoApi.getTrueZid();
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

		let chatContainer = new BaseDisplayObjectContainer();
		let chatbg = null;
		if(1){
			//跨服聊天消息
			chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
			chatbg.width = GameConfig.stageWidth;
			chatbg.height = 35;
			if (this.getUiCode() == "7"){
				chatbg.width = 620;
			}			
			chatbg.x = GameConfig.stageWidth/2 - chatbg.width/2;
			chatContainer.width = GameConfig.stageWidth;
			chatContainer.height = chatbg.height;
			chatContainer.setPosition(0, personRankCon.y - 7 - chatbg.height);			
			chatContainer.addChild(chatbg);
			chatbg.touchEnabled = true;
			chatbg.addTouchTap(this.chatBgClickHandler,this);

			let chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
			chatIcon.anchorOffsetX = chatIcon.width/2;
			chatIcon.anchorOffsetY = chatIcon.height/2;
			chatIcon.x =  chatIcon.width/2+10;
			chatIcon.y = chatbg.y + chatbg.height/2;
			chatContainer.addChild(chatIcon);
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
			// this._chatTxt.x = chatIcon.x + 20;
			// this._chatTxt.y = chatIcon.y - this._chatTxt.height/2;
			this._chatTxt.width = 480;
			this._chatTxt.height = 20;
			// this._chatTxt.lineSpacing = 50;
			this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.x + chatIcon.width + 5, 0]);
			chatContainer.addChild(this._chatTxt);
		}

		if (this.getUiCode() == "7")
		{
			let zhalan = BaseBitmap.create(`crossserverintizhalan-7`);
			zhalan.y = GameConfig.stageHeigth - 240 - zhalan.height + 255;
			this.addChild(zhalan);
			this._zhalan = zhalan;

			this.showTopRankInfo();
		}
		this.addChild(chatContainer);
		this.addChild(personRankCon);

		let btnContainer = new BaseDisplayObjectContainer();
		btnContainer.width = GameConfig.stageWidth;
		this.addChild(btnContainer);

		//活动奖励按钮
		let awardBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.rewardHandle,this,null,0);
		btnContainer.height = awardBg.height;
		btnContainer.setPosition(0, personRankCon.y - 10 - awardBg.height - chatContainer.height);
		if (this.getUiCode() == "7"){
			btnContainer.setPosition(0, 100);
			let frame = BaseBitmap.create("commonview_bigframe");
			frame.width = GameConfig.stageWidth;
			frame.height = 302;
			frame.y = GameConfig.stageHeigth - frame.height;
			this.addChild(frame);		
		}
		// awardBg.setPosition(0,bottomBg.y - 10 - awardBg.height - (chatbg ? chatbg.height : 0));
		btnContainer.addChild(awardBg);
		this.awardBtn = awardBg;

		let awardIcon:BaseBitmap = BaseBitmap.create("atkracecross_award");
		awardIcon.setPosition(awardBg.width/2-awardIcon.width/2,awardBg.height/2-awardIcon.height/2-5);
		awardBg.addChild(awardIcon);

		let awardText:BaseBitmap = BaseBitmap.create("atkracecross_award_text");
		awardText.setPosition(awardBg.width/2-awardText.width/2,awardIcon.y + awardIcon.height -30);
		awardBg.addChild(awardText);
		//排行榜按钮
		let rankBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.rankHandle,this,null,0);
		rankBg.setPosition(GameConfig.stageWidth - rankBg.width - 5, awardBg.y);
		btnContainer.addChild(rankBg);

		let rankIcon:BaseBitmap = BaseBitmap.create("arena_rank");
		rankIcon.setPosition(rankBg.width/2-rankIcon.width/2,rankBg.height/2-rankIcon.height/2-5);
		rankBg.addChild(rankIcon);

		let rankText:BaseBitmap = BaseBitmap.create("arena_rank_text");
		rankText.setPosition(rankBg.width/2-rankText.width/2,rankIcon.y + rankIcon.height -30);
		rankBg.addChild(rankText);

		//详情按钮
		let ruleBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.clickDetailBtnHandler,this);
		btnContainer.addChildAt(ruleBg,100);

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
			ruleBg.x = 122;
			ruleBg.y = awardBg.y;
		}

		if (this.getUiCode() == "7"){
			//活动助威按钮
			let cheerBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.cheerHandler,this,null,0);
			cheerBg.setPosition(rankBg.x - cheerBg.width - 23, awardBg.y);
			btnContainer.addChild(cheerBg);
			this._cheerBtn = cheerBg;
			let cheerIcon:BaseBitmap = BaseBitmap.create(App.CommonUtil.getResByCode("accrossintimacy_cheerbtnicon", this.getUiCode()));
			cheerIcon.setPosition(cheerBg.width/2-cheerIcon.width/2,cheerBg.height/2-cheerIcon.height/2-5);
			cheerBg.addChild(cheerIcon);

			let cheerText:BaseBitmap = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_cheerbtntxt", this.getUiCode()));
			cheerText.setPosition(awardBg.width/2-cheerText.width/2,cheerIcon.y + cheerIcon.height -30);
			cheerBg.addChild(cheerText);

			chatContainer.setPosition(0, GameConfig.stageHeigth - chatContainer.height - 10);
			personRankCon.y = chatContainer.y - personRankCon.height;

			this.initServerRank();
			//tab
			let tabTextArr = [
				App.CommonUtil.getCnByCode("acCrossserverPowerPlayerRank", this.getUiCode()),
				App.CommonUtil.getCnByCode("acCrossserverPowerServerRank", this.getUiCode())
			];

			let tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabTextArr, this.tabbarGroupClick, this);
			tabbarGroup.setSpace(0);
			tabbarGroup.setPosition(GameConfig.stageWidth/2 - tabbarGroup.width/2, personRankCon.y - tabbarGroup.height + 4);
			this.addChild(tabbarGroup);
			tabbarGroup.selectedIndex = 0;
			tabbarGroup.setColor(0xe1ba86, 0x472c26);
			if(this.getTabbarName() == ButtonConst.BTN2_TAB || this.getTabbarName() == ButtonConst.BTN_BIG_TAB2){
				tabbarGroup.addZshi();
			}
			this.tabbarGroupClick({index: 0});
			//btncon
		}		
	}
	private cheerHandler():void{
		if (!this.vo.isStart){
			this.vo.showAcEndTip();
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERINITMACYCHEERVIEW2 ,{
			aid : this.param.data.aid,
			code : this.param.data.code,
		});
	}
	private chatBgClickHandler():void{
		ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, {activeID : this.vo.aidAndCode});
	}
	 
	public useCallback(event: egret.Event): void  
	{
		Api.crossImacyVoApi.setPRankInfo(event.data.data.data);
		if(!this._scrollList){
			this.initBottom();
		}
	}
	private tabbarGroupClick(data:any):void{
		App.LogUtil.log("tabbarGroupClick "+data.index);
		if (data.index == 0){
			this._pRankContainer.visible = true;
			this._servRankContainer.visible = false;
		}
		else if (data.index == 1){
			this._pRankContainer.visible = false;
			this._servRankContainer.visible = true;
		}
	}
	//底部区服排行
	private initServerRank():void{
		let container = new BaseDisplayObjectContainer();
		this.addChild(container);
		this._servRankContainer = container;
		let bottomBg : BaseBitmap = BaseBitmap.create("public_9_downbg");
		bottomBg.height = 200; 
		bottomBg.width = 620;
		bottomBg.x = 10;
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

		let pointText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`croessImacyScore`, this.getUiCode())),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
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
		let serverList = ComponentManager.getScrollList(AcCorssImacyServerItem, arr, rect);
		container.addChild(serverList);
		serverList.y = pointText.y + pointText.height + 10;
		serverList.x = container.width/2 - serverList.width/2;
		serverList.setEmptyTip(LanguageManager.getlocal("atkracedes5"));
	}

	private rankHandle():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERINTIMACYRANKLISTVIEW,{
			aid : this.param.data.aid,
			code : this.param.data.code
		});
	}

	private rewardHandle():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERINTIMACYREWARDVIEW,{
			aid : this.param.data.aid,
			code : this.param.data.code
		});
	}

	private refreshServant():void
	{	
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK, {});
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK, {});
	}


	private clickDetailBtnHandler(param:any):void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERDETAILPOPUPVIEW,{
			aid : this.param.data.aid,
			code : this.param.data.code,
			getUiCode : this.param.data.getUiCode,
			
		});
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
	public hide():void{
		super.hide();
		ViewController.getInstance().hideAllView();
	} 

	public dispose():void
	{
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK), this.useCallback, this);
		this._scrollList = null;
		this._scoreTextTab = [];
		this._scoreTextTab.length = 0;
		this._countDownText = null;
		this._serverList = null;
		this._isCanJoin = false;
		this._atkracedes1 = null;
		this._atkracedes2 = null;
		this._chatTxt = null;
		this.awardBtn = null;
		this._pRankContainer = null;
		this._servRankContainer = null;
		this._middleContainer = null;
		this._cheerBtn = null;
		this._zhalan = null;		
		Api.chatVoApi.clearAcCrossChatList();
		super.dispose();
	}
}