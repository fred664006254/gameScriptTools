
class DailybossDamageRankPopupView extends PopupView
{
	// 滑动列表
	private _nodeContainer:BaseDisplayObjectContainer;
	private _scrollList: ScrollList;

    private _rankList:any = null;
    private _myrank:any = null;

	public constructor() 
	{
		super();
	}

	protected getTitleStr():string
	{
		
        if (PlatformManager.checkIsEnLang()||PlatformManager.checkIsRuLang()){
            return "acCrossServerPowerRankListViewTitle";
        } else {
            return "dailybossDamageRankTitle2";
        }
	}

    protected getRequestData():{requestType:string,requestData:any}
	{   
        if (this.param && this.param.data.isnewboss)
        {
            return {requestType:NetRequestConst.REQUEST_NEWBOSS_GETATTACKRANK,requestData:{}};
        }
        else
        {
            return {requestType:NetRequestConst.REQUEST_DAILYBOSS_GETATTACKRANK,requestData:{}};
        }
	}

    protected receiveData(data:{ret:boolean,data:any})
	{
		this._rankList=data.data.data.bossData.rankList;
		this._myrank=data.data.data.bossData.myrank;
	}


	public initView():void
	{	

        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = 810;
        this.addChildToContainer(this._nodeContainer);

		let startY = 20;
		let topTipTF:BaseTextField =  ComponentManager.getTextField(LanguageManager.getlocal("dailybossDamageRankTittle"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN)
        topTipTF.x = 30+GameData.popupviewOffsetX;
        topTipTF.y = startY;
        this._nodeContainer.addChild(topTipTF);

		startY += 30;
        let bg1= BaseBitmap.create("public_9_bg32");
        bg1.width = 520;
        bg1.height = 700-35;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = startY;
        this._nodeContainer.addChild(bg1);
		bg1.name = "bg1";

        let bg2= BaseBitmap.create("public_9_bg33");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this._nodeContainer.addChild(bg2);
		bg2.name = "bg2";

		let bg3= BaseBitmap.create("public_9_bg1");
        bg3.width = bg1.width;
        bg3.height = 100;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 9;
        this._nodeContainer.addChild(bg3);
		bg3.name = "bg3";
		
        let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossRank_title1"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt1.x = bg2.x+30;
        titleTxt1.y = bg2.y + 8;
        this._nodeContainer.addChild(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossRank_title2"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.x = bg2.x+180;
        titleTxt2.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt2);


		let titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossRank_title3"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt4.x = bg2.x+410 - titleTxt4.width/2;
        titleTxt4.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt4);

	


		// let dataList = this.param.data.rankList;
        // let myrData =  this.param.data.myrank;
        let dataList = this._rankList;
        let myrData =  this._myrank;
        if(Object.keys(myrData).length<1)
        {
            myrData={uid:Api.playerVoApi.getPlayerID(),title:Api.playerVoApi.getTitleid(),value:0,myrank:"10000+",name:Api.playerVoApi.getPlayerName()};
        }

		let myName = Api.playerVoApi.getPlayerName();
		
		for (let key in dataList) {
			if(dataList[key][0] == myName)
			{
				myrData[0] = String(Number(key) +1);
				myrData[1] = dataList[key][1];
				myrData[2] = dataList[key][2];
				break;
			}
		}
        let nickTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        nickTxt.text = LanguageManager.getlocal("allianceBossRank_title5",[Api.playerVoApi.getPlayerName()]);
        nickTxt.x = bg3.x+20;
        nickTxt.y = bg3.y + 20;
        this._nodeContainer.addChild(nickTxt);

        let myRankTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_LIGHT_YELLOW)
		myRankTxt.text = LanguageManager.getlocal("allianceBossRank_title6",[String(myrData.myrank)]);
        myRankTxt.x = myRankTxt.x + 320;
        myRankTxt.y = nickTxt.y ;
        this._nodeContainer.addChild(myRankTxt);

        let hurtvalueTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        hurtvalueTxt.text = LanguageManager.getlocal("allianceBossRank_title7",[String(myrData.value)]);
        hurtvalueTxt.x = nickTxt.x
        hurtvalueTxt.y = nickTxt.y +40;
        this._nodeContainer.addChild(hurtvalueTxt);


        let rect = new egret.Rectangle(0,0,this.viewBg.width,bg1.height -  60);
        
        let scrollView = ComponentManager.getScrollList(RankPopupListItem,dataList,rect);
        scrollView.setEmptyTip(LanguageManager.getlocal("allianceBossRank_emptyTip"));
		scrollView.x = 25+GameData.popupviewOffsetX;
		scrollView.y = bg2.y+50;
        this._nodeContainer.addChild(scrollView);
	}

	// protected getResourceList():string[]
	// {
	// 	return super.getResourceList().concat([
	// 	,"searchbinfowifebg","progress5","progress3_bg","alliance_effect",
	// 	]);
	// }


	public dispose():void
	{
		this._scrollList = null;
		this._nodeContainer = null;
        this._rankList = null;
        this._myrank = null;

		super.dispose();
	}
}