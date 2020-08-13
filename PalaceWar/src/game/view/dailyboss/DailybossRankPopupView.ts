class DailybossRankPopupView extends RankPopupView
{
	private _acrank:{rankList:{uid:number,value:number,name:string}[],myrank:{uid:number,value:number,myrank:number}};
	private _killrank:{name:string,level:number,time:number}[];
	public constructor()
	{
		super();
	}

	private get bossData():any
	{
		return this.param.data;
	}

	protected getTabbarTextArr():string[]
	{	
		if (Api.switchVoApi.checkNewDailyBoss())
		{
			return ["dailybossScoreRankTitle"];
		}
		return ["dailybossScoreRankTitle","dailybossKillRankTitle"];
	}

	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_DAILYBOSS_GETRANK,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any})
	{
		this._acrank=data.data.data.acrank;
		this._killrank=data.data.data.killrank;
	}

	protected getTitleValueStr():string
	{
		if(this._selectedTabIndex==0)
		{
			return LanguageManager.getlocal("dailybossRankValue1Desc");
		}
		else if(this._selectedTabIndex==1)
		{
			return LanguageManager.getlocal("dailybossRankValue2Desc");
		}
	}

	protected getListItemClass():any
	{
		if(this._selectedTabIndex==0)
		{
			return DailybossRankList1Item;
		}
		else if(this._selectedTabIndex==1)
		{
			return DailybossRankList2Item;
		}
	}

	protected getScrollDataList():any[]
	{
		if(this._selectedTabIndex==0)
		{
			return this._acrank.rankList;
		}
		else if(this._selectedTabIndex==1)
		{
			return this._killrank;
		}
	}

	protected initButtomInfo():void
	{
		if(this._selectedTabIndex==0)
		{
			let nickTxt = ComponentManager.getTextField(LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			nickTxt.x = 20;
			nickTxt.y = 20;
			this.buttomContainer.addChild(nickTxt);
			let rankV = "10000+";
			let addV = 0;
			if(this._acrank.myrank.myrank)
			{
				rankV = String(this._acrank.myrank.myrank);
				addV = this._acrank.myrank.value;
			}
			let myRankTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_LIGHT_YELLOW)
			myRankTxt.text = LanguageManager.getlocal("acRank_myrank",[rankV]);
			myRankTxt.x = nickTxt.x;
			myRankTxt.y = nickTxt.y+40;
			this.buttomContainer.addChild(myRankTxt);

			let addvalueTxt = ComponentManager.getTextField( "",nickTxt.size,TextFieldConst.COLOR_LIGHT_YELLOW)
			addvalueTxt.text = LanguageManager.getlocal("dailybossRankValue1Desc")+LanguageManager.getlocal("syscolonDesc")+App.StringUtil.formatStringColor(this._acrank.myrank.value ? this._acrank.myrank.value : 0,TextFieldConst.COLOR_WARN_GREEN);
			addvalueTxt.x = myRankTxt.x + 240;
			addvalueTxt.y = myRankTxt.y ;
			this.buttomContainer.addChild(addvalueTxt);
		}
		else if(this._selectedTabIndex==1)
		{
			if(this._killrank&&this._killrank[0])
			{
				let lastkillTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossLastKillTimeDesc",[this._killrank[0].name]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
				lastkillTxt.setPosition((this.buttomContainer.width-lastkillTxt.width)/2,(this.buttomContainer.height-lastkillTxt.height)/2);
				this.buttomContainer.addChild(lastkillTxt);
			}
		}
	}

	protected getBgExtraHeight():number
	{
		return 10;
	}
}
class DailybossRankList1Item extends RankPopupListItem
{
	public constructor()
	{
		super();
	}
}

class DailybossRankList2Item extends RankPopupListItem
{
	public constructor()
	{
		super();
	}
}