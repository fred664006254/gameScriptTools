/**
 * author:qianjun
 * desc:进入跨服权势活动
*/
class AcCrossServerPowerEnterView extends CommonView
{
	private _scrollList:ScrollList=null;
	private _scoreTextTab:(BaseBitmapText|BaseTextField)[] = [];
	private _countDownText:BaseTextField = null;
	private _serverList:ScrollList=null;
	private _atkracedes1:BaseTextField = null;
	private _atkracedes2:BaseTextField = null;
	private _chatTxt :BaseTextField = null;

	private _isCanJoin:boolean = false;
	private _cdType : number = 0;

	public constructor() 
	{
		super();
	}

	private get api() : CrossPowerVoApi{
        return Api.crossPowerVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	

	protected getResourceList():string[]
	{
		let baseRes = [
			"crossserverintienterbg-1","atkracecross_award_text","atkracecross_award","atkracecross_top",
			"rankinglist_rankbg",,"forpeople_bottom","atkracecross_rankbg","atkracecross_rank","atkracecross_explain",
			,"arena_rank","arena_rank_text","crosspowerdetailbg",
			"dinner_line", "rankinglist_rank1", "rankinglist_rank2", "rankinglist_rank3", "public_9_wordbg2","crosspowerbg",
			"punish_reward_icon",
				"punish_rank_icon",
				"punish_rank_name",
			"atkracecross_rewatdbg3"
		];
		let resList = null;
		
		if(this.cfg.specialReward){
			resList = baseRes.concat([
				"crosspowerenterbg_special",
				"atkracecross_namebg",
				"atkracecross_showbtnbg",
				// "atkracecross_showbtnicon",
				this.getDefaultRes("crosspowerenterbg_showbtnicon","10"),
				"atkracecross_showbtntxt",
				"atkracecross_threetip",
				"atkracecross_threetipflower",
		
			]);
		} else {
			resList = baseRes;
		}
		return super.getResourceList().concat(resList);


		// return super.getResourceList().concat([
		// "crossserverintienterbg-1","atkracecross_award_text","atkracecross_award","atkracecross_top",
		// "rankinglist_rankbg",,"forpeople_bottom","atkracecross_rankbg","atkracecross_rank","atkracecross_explain",
		// ,"arena_rank","arena_rank_text","crosspowerdetailbg",
		// "dinner_line", "rankinglist_rank1", "rankinglist_rank2", "rankinglist_rank3", "public_9_wordbg2","crosspowerbg",
		// "punish_reward_icon",
		// 	"punish_rank_icon",
		// 	"punish_rank_name",
		// "atkracecross_rewatdbg3"
		// ]);
	}

	protected getBgName():string
	{
		return "crosspowerbg";
	}


	protected getTitleStr():string
	{
		return `crossPowerTitle-${this.param.data.code}`;
	}

	protected isShowOpenAni():boolean
	{
		return false;
	}
	// 初始化背景
	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseLoadBitmap.create(bgName);
			this.viewBg.y = (GameConfig.stageHeigth - 1136);
			this.addChild(this.viewBg); 
		}

		
	}


	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		console.log("enter---->",data.data.data);
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
		let zrankinfo = view.api.zonerankinfos;
		let arr = [];
		for(let i in zrankinfo){
			arr.push(zrankinfo[i]);
		}
		if(arr.length){//arr.length
			if(zrankinfo.length > 2){
				view.init_top2();
			}
			else{
				view.init_top1();
			}
		}
		else{
			view.init_top2();
		}
		//中间
		view.init_middle();
		//底部个人排行榜
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK, {});
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.useCallback, this);
		if(LocalStorageManager.get(LocalStorageConst.LOCAL_POWER_RULE) == ''){
			view.clickDetailBtnHandler(1);
			LocalStorageManager.set(LocalStorageConst.LOCAL_POWER_RULE, '1');
		}
	}

	//两区对战
	private init_top1():void{
		let view = this;
		let api = view.api;

		let topBg = BaseBitmap.create("atkracecross_top");
		topBg.x = 0;
		topBg.y = 98;
		topBg.height = 167;
		topBg.width = 640;
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
			serverId1.setPosition(56 - serverId1.width / 2, topBg.y + 46+30);
			this.addChild(serverId1);

			let serverName2 = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,otherSerInfo.zid);
			let serverId2:BaseTextField = ComponentManager.getTextField(serverName2,TextFieldConst.FONTSIZE_CONTENT_COMMON);
			serverId2.setPosition(GameConfig.stageWidth - 56 - serverId2.width / 2, serverId1.y);
			this.addChild(serverId2);
	
			this._scoreTextTab.length = 0;
	
			let serverScore1:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(String(myServerInfo.point),TextFieldConst.FONTNAME_ITEMTIP);
			serverScore1.setPosition(114, topBg.y + 97);
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

		let topBg = BaseBitmap.create("public_v_bg01");
		topBg.y = this.container.y-20;
		topBg.height = 224;
		this.addChild(topBg);

		
		let serverText:BaseBitmap = BaseBitmap.create("atkracecross_rank");
		serverText.setPosition(GameConfig.stageWidth/2-serverText.width/2,topBg.y+8);
		this.addChild(serverText);


		let huaImg1 =  BaseBitmap.create("public_v_huawen01");
		huaImg1.setPosition(GameConfig.stageWidth/2 - huaImg1.width - 80,serverText.y+serverText.height/2 - huaImg1.height/2);
		this.addChild(huaImg1);

		let huaImg2 =  BaseBitmap.create("public_v_huawen01");
		huaImg2.anchorOffsetX = huaImg2.width;
		huaImg2.scaleX = -1;
		huaImg2.setPosition(GameConfig.stageWidth/2 + 80,  huaImg1.y);
		this.addChild(huaImg2);

		let winbg = BaseBitmap.create("atkracecross_rewatdbg3");
		winbg.width = GameConfig.stageWidth;
		winbg.y = serverText.y + serverText.height+5;
		winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
		this.addChild(winbg);


		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(GameConfig.stageWidth/2 - 155 - rankText.width/2, winbg.y + winbg.height/2 - rankText.height/2);
		this.addChild(rankText);

		let qufuText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		qufuText.setPosition(GameConfig.stageWidth/2 - qufuText.width/2, rankText.y);
		this.addChild(qufuText);

		let pointText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`croessPowerScore-${this.vo.code}`),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
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
		this._serverList.y = winbg.height+winbg.y + 5;

		//描述
		let atkracedes = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
		atkracedes.x = (GameConfig.stageWidth - atkracedes.textWidth) / 2;
		atkracedes.y = this._serverList.y + 50;
		this.addChild(atkracedes);
		this._atkracedes1 = atkracedes;
		this._atkracedes1.visible = arr.length == 0;
	}

	private init_middle():void{
		let view = this;
		let api = this.api;
		let vo = this.vo;
		let wordsBg = BaseBitmap.create("public_9_downbg");
		wordsBg.width = 450;
		wordsBg.height = 180;
		wordsBg.x = (GameConfig.stageWidth - wordsBg.width) / 2
		wordsBg.y = GameConfig.stageHeigth / 2 - 125 / 2;
		this.addChild(wordsBg);

		let countDownTime = view.api.getCountDownTime();
		let str = LanguageManager.getlocal(vo.getIsCanJoin() ? `croessPowerJoin-${this.param.data.code}` : `croessPowerNotJoin-${this.param.data.code}`, [LanguageManager.getlocal(`crossIntimacyCDTime${view._cdType}`) + vo.getCountTimeStr(countDownTime)]);
		let wordsText:BaseTextField = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
		wordsText.lineSpacing = 6;
		wordsText.setPosition(wordsBg.x + wordsBg.width / 2 , wordsBg.y + (125 - 78) / 2 + 7);
		wordsText.textAlign = egret.HorizontalAlign.CENTER;
		wordsText.anchorOffsetX =  wordsText.textWidth / 2;
		this._countDownText = wordsText;
		this.addChild(wordsText);
		
		if(this.cfg.specialReward){
			this.createSpecial(wordsBg.y - 85);
		}

		this.tick();
	}

	public tick():void
	{	
		let view = this;
		let vo = view.vo;

		view._cdType = vo.judgeTimeProcess();
		if(view._cdType > 0 && view._cdType < 4){
			let time = 0;
			if(view._cdType == 1){
				time = vo.st + 2 * 3600 - GameData.serverTime;
			}
			else if(view._cdType == 2){
				time = vo.et - 24 * 3600 - GameData.serverTime;
			}
			else{
				time = vo.et - GameData.serverTime;
			}
			view.api.setCountDownTime(time);
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
			this._chatTxt.text = showStr;
		}
		if (view._countDownText) {
			let countDownTime = view.api.getCountDownTime();
			if(countDownTime <= 0){
				view._cdType = view.vo.judgeTimeProcess();
				if(view._cdType == 4){
					// view.hide();
					ViewController.getInstance().hideAllView()
					App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
					return;
				}
			}
			if(view._cdType >= 3){
				view._countDownText.text = LanguageManager.getlocal(  `croessPowerJoin_over-${this.param.data.code}`,[LanguageManager.getlocal(`crossIntimacyCDTime${view._cdType}`) + vo.getCountTimeStr(countDownTime)]);
			}else{
				view._countDownText.text = LanguageManager.getlocal(vo.getIsCanJoin() ? `croessPowerJoin-${this.param.data.code}` : `croessPowerNotJoin-${this.param.data.code}`, [LanguageManager.getlocal(`crossIntimacyCDTime${view._cdType}`) + vo.getCountTimeStr(countDownTime)]);
			}
			view._countDownText.anchorOffsetX =  view._countDownText.textWidth / 2;
		}
	}

	private refreshEnterBtn():void
	{
		
	}
	//根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
		// let crossVo = this.vo;//Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");

        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes(resName+"-"+this.param.data.code)){
            return resName+"-"+this.param.data.code;
        } else {
            return resName+"-"+defaultCode;
        }
    }
	private detailBtnClick():void
	{

		let rewardItemVo = GameData.formatRewardItem(this.cfg.specialReward);

		ViewController.getInstance().openView(ViewConst.COMMON.SERVANTWIFEDETAILVIEW,{servantId: rewardItemVo[0].id, wifeId: rewardItemVo[0].id});
	}
	private createSpecial(y:number):void
	{
		// let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		// let cfg = Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", crossVo.code);
		let rewardItemVo = GameData.formatRewardItem(this.cfg.specialReward);

		let tip = BaseBitmap.create("atkracecross_threetip");
		tip.x = GameConfig.stageWidth / 2 - tip.width/2;
		tip.y = y;
		this.addChild(tip);



		let btn = ComponentManager.getButton("atkracecross_showbtnbg",null,this.detailBtnClick,this);
		btn.x = tip.x - btn.width +135;
		btn.y = tip.y + tip.height/2 - btn.height/2;
		this.addChild(btn);

		let btnIcon = BaseBitmap.create(this.getDefaultRes("crosspowerenterbg_showbtnicon","10"));
		btnIcon.x = btn.width/2 - btnIcon.width/2;
		btnIcon.y = btn.height/2 - btnIcon.height/2;
		btn.addChild(btnIcon);

		let btnTxt = BaseBitmap.create("atkracecross_showbtntxt");
		btnTxt.x = btn.width/2 - btnTxt.width / 2 ;
		btnTxt.y = btn.height - btnTxt.y - 40;
		btn.addChild(btnTxt);

	}
	//底部
	private initBottom():void
	{	
		let bottomBg : BaseBitmap = BaseBitmap.create("public_v_bg01");
		bottomBg.height = 200; 
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.y = GameConfig.stageHeigth - 200;
		this.addChild(bottomBg);
		
		//个人排行榜
		let rankListText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankListText.setPosition(40 , bottomBg.y + 20);
		rankListText.textAlign = "left";
		this.addChild(rankListText);
		var moveX:number = 0;
	 
		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(224, rankListText.y); 
		nameText.x = 224-nameText.width/2; 
		this.addChild(nameText); 
		
		//标题区服
		let quText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		quText.setPosition(390 , rankListText.y); 
		quText.x =  390-quText.width/2; 
		this.addChild(quText); 
		
		//亲密涨幅
		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`croessPowerScore-${this.param.data.code}`),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(500, rankListText.y);
		scoreText.textAlign = "right";
		this.addChild(scoreText);
		 
		// if(PlatformManager.checkIsJPSp())
		// {
		// 	nameText.setPosition(rankListText.x + rankListText.textWidth + 140+moveX, rankListText.y);
		// }
		
		//列表数据
		let scroRect = new egret.Rectangle(bottomBg.x, rankListText.y + rankListText.textHeight, bottomBg.width, 100);
		let arr = [];
		for(let i in this.api.prankinfos){
			let unit = this.api.prankinfos[i];
			unit.type = 'enterIn';
			unit.crosspower = true;
			arr.push(unit);
		}
		this._scrollList = ComponentManager.getScrollList(AcCorssImacyPRankItem, arr, scroRect);
		this._scrollList.x = bottomBg.x;
		this._scrollList.y = rankListText.y + rankListText.textHeight + 10;
		this.addChild(this._scrollList);
		//描述
		let atkracedes = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
		atkracedes.x = (GameConfig.stageWidth - atkracedes.textWidth) / 2;
		atkracedes.y = this._scrollList.y + 50;
		this.addChild(atkracedes);
		this._atkracedes2 = atkracedes;
		this._atkracedes2.visible = arr.length == 0;

		//分割线
		let lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = (bottomBg.width - lineImg.width) / 2;
        lineImg.y = this._scrollList.y + scroRect.height + 7;
		this.addChild(lineImg);
		
		if(PlatformManager.checkIsEnSp())
		{
			rankListText.x -= 18;
			nameText.x -= 42;
			quText.x -= 31;
			scoreText.x-= 13;
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
		let rank:BaseTextField = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN2);
		rank.setPosition(rankListText.x + (rankListText.textWidth - rank.textWidth) / 2, lineImg.y + lineImg.height + 10);
		this.addChild(rank);

		//自己名字
		let name:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
		name.setPosition(nameText.x + (nameText.textWidth - name.textWidth) / 2, rank.y);
		this.addChild(name);

		//自己区服
		//let currZid:any = Api.mergeServerVoApi.getTrueZid();//ServerCfg.selectServer.zid;
		let servaername = Api.mergeServerVoApi.getAfterMergeSeverName();
		let serveText:BaseTextField = ComponentManager.getTextField(servaername,TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
		serveText.setPosition(quText.x + (quText.textWidth - serveText.textWidth) / 2, name.y); 
		this.addChild(serveText);

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
		let qinmiText:BaseTextField = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
		qinmiText.setPosition(scoreText.x + (scoreText.textWidth - qinmiText.textWidth) / 2, serveText.y);
		this.addChild(qinmiText);

		let chatbg = null;
		// if(1){
		// 	//跨服聊天消息
		// 	chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
		// 	chatbg.width = GameConfig.stageWidth;
		// 	chatbg.height = 35;
		// 	chatbg.x = 0;
		// 	chatbg.y = bottomBg.y - 10 - chatbg.height - 3;
		// 	this.addChild(chatbg);
		// 	chatbg.touchEnabled = true;
		// 	chatbg.addTouchTap(this.chatBgClickHandler,this);

		// 	let chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
		// 	chatIcon.anchorOffsetX = chatIcon.width/2;
		// 	chatIcon.anchorOffsetY = chatIcon.height/2;
		// 	chatIcon.x =  chatIcon.width/2+10;
		// 	chatIcon.y = chatbg.y + chatbg.height/2;
		// 	this.addChild(chatIcon);
		// 	egret.Tween.get(chatIcon, {
		// 		loop: true,//设置循环播放
		// 	}).to({scaleX:0.8,scaleY:0.8},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360
			
		// 	let showStr:any=Api.chatVoApi.getLastAcCrossMessage();
		// 	if(!showStr)
		// 	{
		// 		showStr="";
		// 	}
		// 	else{
		// 		let zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,showStr.zoneid);
		// 		showStr=LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
		// 	}
		// 	this._chatTxt = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// 	this._chatTxt.width = 480;
		// 	this._chatTxt.height = 20;
		// 	this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.x + chatIcon.width + 5, 0]);
		// 	this.addChild(this._chatTxt);
		// }
		//活动奖励按钮
		let awardBg:BaseButton = ComponentManager.getButton("mainui_bottombtnbg",null,this.rewardHandle,this,null,0);
		awardBg.setPosition(10,bottomBg.y - 10 - awardBg.height - (chatbg ? chatbg.height : 0));
		this.addChild(awardBg);
		// awardBg

		let awardIcon:BaseBitmap = BaseBitmap.create("punish_reward_icon");
		awardIcon.setPosition(awardBg.width/2-awardIcon.width/2,awardBg.height/2-awardIcon.height/2-5);
		awardBg.addChild(awardIcon);

		let awardText:BaseBitmap = BaseBitmap.create("atkracecross_award_text");
		awardText.setPosition(awardBg.width/2-awardText.width/2,awardIcon.y + awardIcon.height -20);
		awardBg.addChild(awardText);
		//排行榜按钮
		let rankBg:BaseButton = ComponentManager.getButton("mainui_bottombtnbg",null,this.rankHandle,this,null,0);
		rankBg.setPosition(GameConfig.stageWidth - rankBg.width - 15, awardBg.y);
		this.addChild(rankBg);

		let rankIcon:BaseBitmap = BaseBitmap.create("punish_rank_icon");
		rankIcon.setPosition(rankBg.width/2-rankIcon.width/2,rankBg.height/2-rankIcon.height/2-5);
		rankBg.addChild(rankIcon);

		let rankText:BaseBitmap = BaseBitmap.create("punish_rank_name");
		rankText.setPosition(rankBg.width/2-rankText.width/2,rankIcon.y + rankIcon.height -20);
		rankBg.addChild(rankText);



		
		let ruleBg = BaseBitmap.create("commonview_titlebg02");
		ruleBg.x = 0;
		ruleBg.y = 0;
		this.addChild(ruleBg);
		ruleBg.visible = false;

		let ruleBtn:BaseButton = ComponentManager.getButton("btn_rule","",this.clickDetailBtnHandler,this);
		ruleBtn.x = 3 + (PlatformManager.hasSpcialCloseBtn()?90:0);
		ruleBtn.y = 0; 
		this.addChild(ruleBtn);

		if(LocalStorageManager.get(LocalStorageConst.LOCAL_IMACY_RULE) == ''){
			this.clickDetailBtnHandler(1);
			LocalStorageManager.set(LocalStorageConst.LOCAL_IMACY_RULE, '1');
		}
		if(PlatformManager.hasSpcialCloseBtn()){
			this.setLayoutPosition(LayoutConst.horizontalCentertop, ruleBg, rankBg, [0, -ruleBg.height - 10]);
		}
		else{
			ruleBtn.x = 12;
			ruleBtn.y = 0;
		}
	}
  	 
	// protected resetBgSize():void
	// { 
	// 	if(PlatformManager.hasSpcialCloseBtn()||1)
	// 	{
	// 		this.closeBtn.y =this.closeBtn.y+120;
	// 	}
	// }
	private chatBgClickHandler():void{
		if(Api.switchVoApi.checkCloseChat())
		{
			App.CommonUtil.showTip("很抱歉，聊天系统维护中");
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, {activeID : this.vo.aidAndCode});
	}
	 
	public useCallback(event: egret.Event): void  
	{
		Api.crossPowerVoApi.setPRankInfo(event.data.data.data);
		if(!this._scrollList){
			this.initBottom();
		}
	}

	private rankHandle():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERPOWERRANKLISTVIEW,{
			aid : this.param.data.aid,
			code : this.param.data.code,
		});
	}

	private rewardHandle():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERPOWERREWARDVIEW,{
			aid : this.param.data.aid,
			code : this.param.data.code,
		});
	}

	private refreshServant():void
	{	
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK, {});
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK, {});
	}


	private clickDetailBtnHandler(param:any):void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSPOWERDETAILPOPUPVIEW,{
			aid : this.param.data.aid,
			code : this.param.data.code,
		});
	}

	public hide():void{
		super.hide();
		// ViewController.getInstance().hideAllView();
	}

	public dispose():void
	{
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.useCallback, this);
		this._scrollList = null;
		this._scoreTextTab = [];
		this._scoreTextTab.length = 0;
		this._countDownText = null;
		this._serverList = null;
		this._isCanJoin = false;
		this._atkracedes1 = null;
		this._atkracedes2 = null;
		this._chatTxt = null;
		super.dispose();
	}
}