/**
 * 跨服权势排行榜
 */

class AcCrossServerPowerRankListView extends PopupView
{	
	private _scrollList:ScrollList;
	private _scrollList2:ScrollList;
	private _infoList:any[] = [];
	protected _scroRect:egret.Rectangle;
	private atkracedes5:any =null;
	private isShowTextBoo:boolean =false;
	private _curTabIdx : number = 0;
	private _nickName : BaseTextField = null;
	private _nickNameTxt : BaseTextField = null;
	private _serverTxt : BaseTextField = null;
	private _playerName : BaseTextField = null;
	private _playerServer : BaseTextField = null;
	private _playerRank : BaseTextField = null;
	private _playerScore : BaseTextField = null;
	private _atkracedes5 : BaseTextField = null;
	private _currZidTxt: BaseTextField = null;

	private _scroeTxt: BaseTextField = null;

    public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rankinglist_line",
			"rankinglist_rankbg",
			// "rankinglist_rank1",
			// "rankinglist_rank2",
			// "rankinglist_rank3",
			"rank_biao",
			"rank_1","rank_2","rank_3","public_tc_bg05",
			
        ]);
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

    public initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.fresh_view, this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK), this.fresh_view, this);
		let tabName = ["crossServerImacyRankListViewTab1", "crossServerImacyRankListViewTab2"];

		let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = 40;
        tabbarGroup.y = 10;
		tabbarGroup.setSpace(5);
        this.addChildToContainer(tabbarGroup);


		let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		rankBg.width = 540;
		rankBg.height = 720;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, tabbarGroup.y + tabbarGroup.height);
		this.addChildToContainer(rankBg);
		
		let tcbg2= BaseBitmap.create("public_tc_bg03");
        tcbg2.width = rankBg.width-20;
        tcbg2.height = 590;
        tcbg2.x = rankBg.x+10;
        tcbg2.y = rankBg.y + 10;
        this.addChildToContainer(tcbg2);



		let bottomBg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bottomBg.width = 516;
		bottomBg.height = 100;
		bottomBg.setPosition(this.viewBg.width/2  - bottomBg.width/2, tcbg2.y + tcbg2.height+10);
		this.addChildToContainer(bottomBg);


		let titleBg:BaseBitmap = BaseBitmap.create("rank_biao");
		titleBg.setPosition(this.viewBg.width/2  - titleBg.width/2 , tcbg2.y+10);
		this.addChildToContainer(titleBg);

		let deltaX = 30;

	
		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(65 + deltaX , titleBg.y+titleBg.height/2 - rankText.height/2);
		this.addChildToContainer(rankText);

	
		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(160+deltaX , rankText.y);
		this.addChildToContainer(nameText); 
		this._nickNameTxt = nameText;
		this._nickNameTxt.visible = false;
		
		//标题区服
		let quText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		quText.setPosition(((516 - quText.textWidth) / 2 + deltaX +3) , rankText.y);
		this.addChildToContainer(quText); 
		this._serverTxt = quText;

		//亲密涨幅
		if(PlatformManager.checkIsJPSp())
		{
			deltaX=60;
		}
		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`croessPowerScore-${this.vo.code}`),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(387 +deltaX , rankText.y);
		this.addChildToContainer(scoreText);

		//描述
		let atkracedes5 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20,TextFieldConst.COLOR_BROWN);
		atkracedes5.x = rankBg.x + (rankBg.width - atkracedes5.textWidth) / 2;
		atkracedes5.y = rankBg.y + rankBg.height/2 -20;
		atkracedes5.visible = false;
		this.addChildToContainer(atkracedes5);

		//玩家名字
		let nickName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		nickName.setPosition(rankText.x-20 , bottomBg.y+bottomBg.height/2 -5 -nickName.height);
		this.addChildToContainer(nickName);
		this._nickName = nickName;
		this._nickName.visible = false;
		let name:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		name.setPosition(nickName.x + nickName.width +12 , nickName.y);
		this.addChildToContainer(name);
		this._playerName = name;
		this._playerName.visible = false;
		
		//排行
		let rankStr:string;
		let rankOrder = 0;
		let rankPoint = 0;
		for(let i in this.api.zonerankinfos){
			let unit = this.api.zonerankinfos[i];
			if(Api.mergeServerVoApi.judgeIsSameServer(unit.zid, Api.mergeServerVoApi.getTrueZid())){
				rankOrder = Number(i) + 1;
				rankPoint = Number(unit.point);
				break;
			}
		}
		if(rankOrder)
		{
			if (rankOrder > 300) {
				rankStr = "10000+";
			}
			else {
				rankStr = rankOrder.toString();
			}
		}
		else
		{	//未上榜
			rankStr =LanguageManager.getlocal("atkracedes4");// this._merank.toString();
		}
		//排名
		let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		rankText2.setPosition(this._nickName.x , bottomBg.y+bottomBg.height/2 +5);
		this.addChildToContainer(rankText2);
		let rank:BaseTextField = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		rank.setPosition(rankText2.x + rankText2.width + 12 , rankText2.y);
		this.addChildToContainer(rank);
		this._playerRank = rank;

		//亲密涨幅
		let str:string ="";
		if(rankPoint)
		{
			str	= rankPoint.toString();
		}else
		{
			str = "0";
		}
		let socre:BaseTextField = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		socre.setPosition(bottomBg.x + bottomBg.width - 60 -  socre.width, rankText2.y);
		this.addChildToContainer(socre);
		this._playerScore = socre;
		
		let socreText:BaseTextField = ComponentManager.getTextField((LanguageManager.getlocal(`croessPowerScore-${this.vo.code}`)+': '), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		socreText.setPosition(socre.x - socreText.width, rankText2.y);
		this.addChildToContainer(socreText);
		this._scroeTxt = socreText;

		//玩家区服
		let serveText:BaseTextField = ComponentManager.getTextField('',TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		serveText.setPosition(this._nickName.x, name.y); 
		let currZid:any = Api.mergeServerVoApi.getTrueZid();
		let servaername = Api.mergeServerVoApi.getAfterMergeSeverName(null,false,null);
		console.log(servaername);
		serveText.text = LanguageManager.getlocal("rankServer") + ": ";
		this.addChildToContainer(serveText);
		this._playerServer = serveText;

        // let sidname = '';
        // if(data.uid){
        //     sidname = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        // }
        // else{
        //     sidname = LanguageManager.getlocal("ranserver2",[data.zid.toString()]);
        // }


		this._currZidTxt= ComponentManager.getTextField('',TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
		// this._currZidTxt.text = " " + currZid;
		this._currZidTxt.text = " " + servaername;
		this._currZidTxt.setPosition(serveText.x + serveText.width, serveText.y);  
		this.addChildToContainer(this._currZidTxt);


		this._infoList = [];
		for(let i in this.api.zonerankinfos){
			let unit = this.api.zonerankinfos[i];
			this._infoList.push({
				zid : unit.zid,
				point : unit.point,
				type : 'rank',
				acid : this.vo.aid
			});
		}
		this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, 500,530);
		this._scrollList = ComponentManager.getScrollList(AcCorssImacyServer2Item,this._infoList,this._scroRect);
		this._scrollList.x = titleBg.x;
		this._scrollList.y = titleBg.y + titleBg.height;
		this.addChildToContainer(this._scrollList);

		
		this._scrollList2 = ComponentManager.getScrollList(AcCorssImacyPRank2Item,[],this._scroRect);
		this._scrollList2.x = titleBg.x;
		this._scrollList2.y = titleBg.y + titleBg.height;
		this._scrollList2.visible = false;
		this.addChildToContainer(this._scrollList2);

		this._atkracedes5 = atkracedes5;
		this._atkracedes5.visible = this._infoList.length == 0;
    }

	private tabBtnClickHandler(params : any) : void{
		this._curTabIdx = params.index;
		NetManager.request(this._curTabIdx == 0 ? NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK : NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK, {});
	}

	private fresh_view(event: egret.Event):void{
		this._scrollList.visible = this._curTabIdx == 0;
		this._scrollList2.visible = this._nickNameTxt.visible = this._playerName.visible = this._nickName.visible = !this._scrollList.visible;
		let rankStr:string;
		let score:any = 0;
		this._infoList = [];
		
		if(this._curTabIdx == 0){
			let rankOrder = 0;
			this.api.setZoneRankInfo(event.data.data.data);
			for(let i in this.api.zonerankinfos){
				let unit = this.api.zonerankinfos[i];
				this._infoList.push({
					zid : unit.zid,
					point : unit.point,
					type : 'rank',
					acid : this.vo.aid
				});
				if(Api.mergeServerVoApi.judgeIsSameServer(unit.zid, Api.mergeServerVoApi.getTrueZid())){
					rankOrder = Number(i) + 1;
					score = Number(unit.point).toString();
				}
			}
			this._scrollList.refreshData(this._infoList);
			if(rankOrder)
			{
				if (rankOrder > 300) {
				rankStr = "10000+";
				}
				else {
					rankStr = rankOrder.toString();
				}
			}
			else
			{	//未上榜
				rankStr =LanguageManager.getlocal("atkracedes4");// this._merank.toString();
			}
		}
		else{
			this.api.setPRankInfo(event.data.data.data);
			for(let i in this.api.prankinfos){
				let unit = this.api.prankinfos[i];
				unit.type = 'rank';
				unit.crosspower = true;
				this._infoList.push(unit);
			}
			this._scrollList2.refreshData(this._infoList);
			let meRank = this.api.merank;
			score = this.api.mepoint || '0';
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
		}
		this._atkracedes5.visible = this._infoList.length == 0;
		this._playerRank.text = rankStr;
		this._playerScore.text = Number(score).toString();
		this._serverTxt.x = this._curTabIdx == 0 ? ((516 - this._serverTxt.textWidth) / 2 + 32) : 333;
		this._playerServer.x = this._curTabIdx == 0 ? this._nickName.x :this._scroeTxt.x
		this._currZidTxt.x = this._playerServer.x + this._playerServer.width ;
	}

    public dispose():void
	{	
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.fresh_view, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK), this.fresh_view, this);
		this._scrollList = null;
		this._scrollList2 = null;
		this. _scroRect = null;
		this._nickName = null;
		this._nickNameTxt = null;
	 	this._serverTxt = null;
		this._playerName = null;
		this._playerServer = null;
		this._playerRank = null;
		this._playerScore = null;
		this._atkracedes5  = null;
		this._infoList = [];
		super.dispose();
	}
}