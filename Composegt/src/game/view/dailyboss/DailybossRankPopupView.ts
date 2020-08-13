class DailybossRankPopupView extends RankPopupView
{
	private _acrank:{rankList:{uid:number,value:number,name:string}[],myrank:{uid:number,value:number,myrank:number}};
	private _killrank:{name:string,level:number,time:number}[];
	protected _selectedTabIndex:number = 0;
	public constructor()
	{
		super();
	}

	//public_tc_bg01  public_tc_bg03
	protected setTabBarPosition():void
	{

		this.tabbarGroup.setSpace(15);
		let tabX:number=0;
		let tabY:number=0;

		tabX=this.viewBg.x+43;
		tabY=this.viewBg.y+60;

		
		tabY+=this.getTabbarGroupY();;
		this.tabbarGroup.setPosition(tabX,tabY);

	}

	// 页签图名称
	protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_WINTAB;
	}
	private get bossData():any
	{
		return this.param.data;
	}

	protected getTabbarTextArr():string[]
	{
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
			let nickTxt = ComponentManager.getTextField(LanguageManager.getlocal("acRank_mynick",[" "+Api.playerVoApi.getPlayerName()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
			nickTxt.x = 30;
			nickTxt.y = 10;
			this.buttomContainer.addChild(nickTxt);

			// let nameTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
			// nameTxt.x = nickTxt.x + nickTxt.width;
			// nameTxt.y = 10;
			// this.buttomContainer.addChild(nameTxt);

			let rankV = "10000+";
			let addV = 0;
			if(this._acrank.myrank.myrank)
			{
				rankV = String(this._acrank.myrank.myrank);
				addV = this._acrank.myrank.value;
			}
			let myRankTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_BROWN)
			myRankTxt.text = LanguageManager.getlocal("acRank_myrank",[rankV]);
			myRankTxt.x = nickTxt.x;
			myRankTxt.y = nickTxt.y + 30;
			this.buttomContainer.addChild(myRankTxt);

			let addvalueTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossRankValue1Desc")+LanguageManager.getlocal("syscolonDesc"),nickTxt.size,TextFieldConst.COLOR_BROWN)
			addvalueTxt.x = myRankTxt.x;
			addvalueTxt.y = myRankTxt.y + 30;
			this.buttomContainer.addChild(addvalueTxt);

			let addvalueVal= ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_BROWN)
			addvalueVal.text = App.StringUtil.formatStringColor(this._acrank.myrank.value ? this._acrank.myrank.value : 0,TextFieldConst.COLOR_WARN_GREEN);
			addvalueVal.x = addvalueTxt.x + addvalueTxt.width;
			addvalueVal.y = myRankTxt.y + 30;
			this.buttomContainer.addChild(addvalueVal);
		}
		else if(this._selectedTabIndex==1)
		{
			if(this._killrank&&this._killrank[0])
			{
				let lastkillTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossLastKillTimeDesc",[this._killrank[0].name]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
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