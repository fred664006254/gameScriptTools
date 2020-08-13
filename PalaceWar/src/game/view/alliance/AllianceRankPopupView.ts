/**
 * 排名
 * author dky
 * date 2017/11/28
 * @class AllianceRankPopupView
 */
class AllianceRankPopupView extends PopupView
{
	// 滑动列表
	private _scrollList: ScrollList;

	private _timeTF:BaseTextField;

	private _selectChildData:any;
	private _curTabIdx=0;

	private _rankData :any;
	private _rank :number = 0;
	private _index:number = 0;
	private _allianceVo :AllianceVo;

	// private _punishRewardList: any = {};

	private _scoreContainer:BaseDisplayObjectContainer = null;
	private _downContainer:BaseDisplayObjectContainer = null;
	private _logContainer:BaseDisplayObjectContainer = null;
	private _tabbarGroup:TabBarGroup = null;

	private _allianceTxt:BaseTextField = null;
	private _rankTxt:BaseTextField = null;
	/**
	 * 帮会战排行榜的数据
	 */
	private _rankInfo:any = null;
	/**
	 * 我的帮会战排行榜的数据
	 */
	private _myRank:any = null;

	private _myScore:any = null;
	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_APPLYALLIANCE,this.doApply,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_CANCELAPPLYALLIANCE,this.doCancel,this);
		// this._rankData = this.param.data.acData;
		this._allianceVo = Api.allianceVoApi.getAllianceVo();

		let tabName = ["allianceRankTab1"];
		//帮会战开关开启之后才会显示排行榜
		if(Api.switchVoApi.checkOpenAllianceWar())
		{
			tabName = ["allianceRankTab1","allianceRankTab2","allianceRankTab3"];
		}
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = 35+GameData.popupviewOffsetX;
        tabbarGroup.y = 15;
        this.addChildToContainer(tabbarGroup);
		this._tabbarGroup = tabbarGroup;

		let bg1= BaseBitmap.create("public_9_probiginnerbg");
        bg1.width = 520;
        bg1.height = 555;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 60;
        this.addChildToContainer(bg1);

      

        let bg3= BaseBitmap.create("public_9_probiginnerbg");
        bg3.width = bg1.width;
        bg3.height = 100;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 9;
        this.addChildToContainer(bg3);

		let allianceVo
		let allianceStr  = "";
		if(Api.playerVoApi.getPlayerAllianceId() == 0){
			allianceStr = LanguageManager.getlocal("allianceRankMyAlliance",[LanguageManager.getlocal("allianceRankNoAlliance")])
		}
		else{
			allianceStr = LanguageManager.getlocal("allianceRankMyAlliance",[Api.playerVoApi.getPlayerAllianceName()])
		}
		
		let allianceTxt = ComponentManager.getTextField(allianceStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        allianceTxt.x = bg3.x + 50;
        allianceTxt.y = bg3.y + bg3.height/2 - allianceTxt.height/2;
        this.addChildToContainer(allianceTxt);
		this._allianceTxt = allianceTxt;

		let rankeStr  = "";
		if(Api.playerVoApi.getPlayerAllianceId() == 0){
			rankeStr = LanguageManager.getlocal("allianceRankMyAllianceRank",[LanguageManager.getlocal("allianceRankNoRank")])
		}
		else{
			rankeStr = LanguageManager.getlocal("allianceRankMyAllianceRank",[this._rank.toString()]);
		}
		
		let rankTxt = ComponentManager.getTextField(rankeStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        rankTxt.x = bg3.x + 330;
        rankTxt.y = bg3.y + bg3.height/2 - rankTxt.height/2;
        this.addChildToContainer(rankTxt);
		this._rankTxt = rankTxt;

		
		let dataList = this._rankData;

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,bg1.width - 10,bg1.height - 27);
		this._scrollList = ComponentManager.getScrollList(AllianceRankScrollItem,dataList,rect);
		this.addChildToContainer(this._scrollList);
		// this._scrollList.setPosition(bg1.x + 5 ,bg1.y + 10);
		this._scrollList.x = bg1.x + 5;
		this._scrollList.y = bg1.y + 10;
		this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceRankNoAlliance"));

		//帮战开关开启之后才会显示帮会战的榜单
		if(Api.switchVoApi.checkOpenAllianceWar())
		{
			//帮战榜积分相关
			this._scoreContainer = new BaseDisplayObjectContainer();
			this.addChildToContainer(this._scoreContainer);

			this._downContainer = new BaseDisplayObjectContainer();
			this.addChildToContainer(this._downContainer);

			this._logContainer = new BaseDisplayObjectContainer();
			this.addChildToContainer(this._logContainer);


			let titleBg = BaseBitmap.create("public_9_bg37");
			titleBg.width = bg1.width;
			titleBg.height = 35;
			titleBg.setPosition(bg1.x,bg1.y);
			this._scoreContainer.addChild(titleBg);
			//排名
			let rankNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			rankNameTxt.setPosition(titleBg.x + 62 - rankNameTxt.width / 2,titleBg.y + titleBg.height / 2 - rankNameTxt.height / 2);
			this._scoreContainer.addChild(rankNameTxt);
			//帮派名字
			let rankAllianceName = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankAllianceName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			rankAllianceName.setPosition(rankNameTxt.x + rankNameTxt.width / 2 + 120 - rankAllianceName.width / 2,rankNameTxt.y + rankNameTxt.height / 2 - rankAllianceName.height / 2);
			this._scoreContainer.addChild(rankAllianceName);
			//区服
			let rankServer = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankServer"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			rankServer.setPosition(rankAllianceName.x + rankAllianceName.width / 2 + 123 - rankServer.width / 2,rankAllianceName.y + rankAllianceName.height / 2 - rankServer.height / 2);
			this._scoreContainer.addChild(rankServer);
			//分数
			let rankScore = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankScore"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			rankScore.setPosition(rankServer.x  + rankServer.width / 2 + 123 - rankScore.width / 2,rankServer.y + rankServer.height / 2 - rankScore.height / 2);
			this._scoreContainer.addChild(rankScore);
			//列表
			let rect = new egret.Rectangle(0,0,bg1.width,bg1.height - 45);
			let scoreScrollList = ComponentManager.getScrollList(AllianceWarRankScrollItem,this._rankInfo,rect);
			scoreScrollList.setPosition(bg1.x,bg1.y + 50);
			scoreScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
			this._scoreContainer.addChild(scoreScrollList);
			//名字
			let allianceName = Api.playerVoApi.getPlayerAllianceName();
			let myAllianceNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankMyAllianceName",[allianceName]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			myAllianceNameTxt.setPosition(bg3.x +40, bg3.y + 20);
			this._downContainer.addChild(myAllianceNameTxt);
			//排名
			let myRankStr = "";
			if(this._myRank > 100)
			{
				myRankStr = LanguageManager.getlocal("allianceRankNoRank");
			}
			else
			{
				myRankStr = String(this._myRank);
			}
			let myRankTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankMyRank",[myRankStr]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			myRankTxt.setPosition(myAllianceNameTxt.x ,myAllianceNameTxt.y + myAllianceNameTxt.height + 10);
			this._downContainer.addChild(myRankTxt);
			//区服
			let myServerStr = Api.mergeServerVoApi.getAfterMergeSeverName()
			let myServerTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankMyServer",[myServerStr]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			myServerTxt.setPosition(bg3.x + 320,myAllianceNameTxt.y);
			this._downContainer.addChild(myServerTxt);
			//分数
			let myScoreStr = "";
			if(this._myScore)
			{
				myScoreStr = String(this._myScore);
			}
			else
			{
				myScoreStr = LanguageManager.getlocal("allianceWarRankNotScore");
			}
		
			let myScoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankMyScore",[myScoreStr]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			myScoreTxt.setPosition(myServerTxt.x,myRankTxt.y);
			this._downContainer.addChild(myScoreTxt);


			//列表
			let rect2 = new egret.Rectangle(0,0,bg1.width,bg1.height -10);
			let logScrollList = ComponentManager.getScrollList(AllianceWarHistoryScrollItem,Api.allianceWarVoApi.history,rect2);
			logScrollList.setPosition(bg1.x,bg1.y + 5);
			logScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
			this._logContainer.addChild(logScrollList);

			this._logContainer.visible = false;
			this._scoreContainer.visible = false;
			this._logContainer.visible = false;
			this._downContainer.visible = false;

			//直接跳转tab2
			if(this.param&&this.param.tab)
			{
				let paramTem:{index:number} = {index:Number(this.param.tab)};
				this.tabBtnClickHandler(paramTem);
			}
			

			

		}
		
		
		
	}
	/**
	 * 帮会战排行榜相关
	 */
	private rankWarHandle(event:egret.Event)
	{
		if(event && event.data && event.data.ret)
		{
			this._rankInfo = event.data.data.data.rank;
			this._myRank = event.data.data.data.myrank;
			this._myScore = event.data.data.data.myscore;
		}
		
	}
	/**
	 * 获取活动配置
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
		if(Api.switchVoApi.checkOpenAllianceWar())
		{
			App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_GETRANK,this.rankWarHandle,this)
			this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETRANK,null);
		}
		return {requestType:NetRequestConst.REQUEST_ALLIANCE_GETALLIANCELIST,requestData:{}};
	}
		//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		let rData:any=data.data;
		if(data.ret==false)
		{
			return;
		}
		if (data.data.data.allianceFlag == 1 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
			this.hide();
			return;
		}
		if (data.data.data.allianceFlag == 2 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg2"));
			return;
		}
		if (data.data.data.allianceFlag == 3 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg3"));
			return;
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_GETALLIANCELIST)
		{
			this._rankData  = data.data.data.alliancelist;
			this._rank  = data.data.data.arank;
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE)
		{
			let index = this._index;
			let wideItem = <AllianceRankScrollItem>this._scrollList.getItemByIndex(index);
		
			wideItem.refreshData(index);
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplyTipSuccess"));
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_CANCELAPPLY)
		{
			let index = this._index;
			let wideItem = <AllianceRankScrollItem>this._scrollList.getItemByIndex(index);
		
			wideItem.refreshData(index);
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceCancelApplyTip"));
		}

		
	}
	private doApply(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		if(Api.allianceVoApi.isShowConfirmWhenJoin() ){
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"itemUseConstPopupViewTitle",
				msg:LanguageManager.getlocal("allianceJoinLimitTip1"),
				callback:function(){
					this.request(NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE,{aid:event.data.aid});
				},
				handler:this,
				needCancel:true
			});
		}else{
			this.request(NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE,{aid:event.data.aid});
		}
	}
	private doCancel(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_ALLIANCE_CANCELAPPLY,{aid:event.data.aid});
	}


	private rankBtnClick()
	{

	}

	protected tabBtnClickHandler(params:any)
    {
        this._curTabIdx = params.index
		this._tabbarGroup.selectedIndex = this._curTabIdx;
		if(this._curTabIdx == 0)
		{
			this._scrollList.visible = true;
			this._rankTxt.setVisible(true);
			this._allianceTxt.setVisible(true);
			this._scoreContainer.setVisible(false);
			this._logContainer.setVisible(false);
			this._downContainer.setVisible(false);
		}
		else if(this._curTabIdx == 1)
		{
			this._scrollList.visible = false;
			this._rankTxt.setVisible(false);
			this._allianceTxt.setVisible(false);
			this._scoreContainer.setVisible(true);
			this._logContainer.setVisible(false);
			this._downContainer.setVisible(true);
		}	
		else if(this._curTabIdx == 2)
		{
			this._scrollList.visible = false;
			this._rankTxt.setVisible(false);
			this._allianceTxt.setVisible(false);
			this._scoreContainer.setVisible(false);
			this._logContainer.setVisible(true);
			this._downContainer.setVisible(true);
		}

        this.refreshRankList();
    }
    protected refreshRankList()
    {
	}


	public hide():void
	{
		super.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"dinner_rankbg","dinnerrankpopupview","dinner_line","dinner_rank_titlebg","rankinglist_rankbg",
					"dinner_detail",
					]);
	}



	public dispose():void
	{

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_APPLYALLIANCE,this.doApply,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_CANCELAPPLYALLIANCE,this.doCancel,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_GETRANK,this.rankWarHandle,this)
		// 未婚滑动列表
		this._scrollList = null;

		this._timeTF = null;

		this._selectChildData = null;
		this._allianceVo = null;
		this._index = null;
		this._rank = 0;
		this._curTabIdx = 0;
		this._scoreContainer = null;
		this._tabbarGroup = null;
		this._rankTxt = null;
		this._allianceTxt = null;
		this._rankInfo = null;
		this._myRank = null;
		this._myScore = null;
		this._logContainer = null;
		this._downContainer = null;

		super.dispose();
	}
}