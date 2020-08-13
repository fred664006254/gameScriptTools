/**
 * 皮肤
 * author yanyuling
 * date 2018/08/13
 * @class SkinRankPopupView
 */

class SkinRankPopupView  extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
    private _allirank:any[] = [];
    private _scrollView:ScrollList;
	public constructor() {
		super();
	}

	public initView():void
	{	
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = 800;
        this.addChildToContainer(this._nodeContainer);
        let startY = 20;
        
        let bg1= BaseBitmap.create("public_9_probiginnerbg");
        bg1.width = 520;
        bg1.height = 600;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        this._nodeContainer.addChild(bg1);
        
        let bg2= BaseBitmap.create("dinner_rank_titlebg");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg1.y = startY;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this._nodeContainer.addChild(bg2);
        
        let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt1.x = bg2.x+30;
        titleTxt1.y = bg2.y + 8;
        this._nodeContainer.addChild(titleTxt1);

		let titleTxt2Str = LanguageManager.getlocal("ranknickName");
        let titleTxt2 = ComponentManager.getTextField(titleTxt2Str,titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.x = bg2.x+155;
        titleTxt2.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt2);

        let titleStr3 = LanguageManager.getlocal("rankServer");
        let titleTxt3 = ComponentManager.getTextField(titleStr3,titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt3.x = bg2.x+330 - titleTxt3.width/2;
        titleTxt3.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt3);

        let titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("rank_imacy"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        if(this.param.data.rtype == 1)
        {
            titleTxt4.text = LanguageManager.getlocal("attributeName");
        }
        titleTxt4.x = bg2.x+ 450 - titleTxt4.width/2;
        titleTxt4.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt4);

        let bg3= BaseBitmap.create("public_9_probiginnerbg");
        bg3.width = bg1.width;
        bg3.height = 90;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 7;
        this._nodeContainer.addChild(bg3);

        let nickTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE)
        nickTxt.text = LanguageManager.getlocal("acRank_mynick")
        nickTxt.x = bg3.x+60;
        nickTxt.y = bg3.y + 17;
        this._nodeContainer.addChild(nickTxt);

        let nickTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        nickTxt2.text =  Api.playerVoApi.getPlayerName();
        nickTxt2.x = nickTxt.x+nickTxt.width +2;
        nickTxt2.y = nickTxt.y
        this._nodeContainer.addChild(nickTxt2);

        let rankV = LanguageManager.getlocal("allianceRankNoRank");
        let addV = this._allirank["userinfo"].attr || 0;
        let resrank = this._allirank["resrank"];
        for (var key in resrank) {
            if (resrank.hasOwnProperty(key)) {
                let tmpData = resrank[key];
                if(tmpData.uid == Api.playerVoApi.getPlayerID()){
                    rankV = "" + (Number(key) +1);
                    break;
                }
            }
        }
        let myRankTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_WHITE)
        myRankTxt.text = LanguageManager.getlocal("acRank_myrank",[rankV]);
        myRankTxt.x = nickTxt.x;
        myRankTxt.y = nickTxt.y+40;
        this._nodeContainer.addChild(myRankTxt);

       
		let ZoneTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_WHITE)
		ZoneTxt.text = LanguageManager.getlocal("rankServer") + ": ";
        ZoneTxt.x = myRankTxt.x + 260;
        ZoneTxt.y = nickTxt.y ;
        this._nodeContainer.addChild(ZoneTxt);

        let ZoneTxt2 = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        ZoneTxt2.text = Api.mergeServerVoApi.getAfterMergeSeverName();
        // LanguageManager.getlocal("ranserver2", [""+ServerCfg.selectServer.zid]);
        ZoneTxt2.x = ZoneTxt.x + ZoneTxt.width;
        ZoneTxt2.y = ZoneTxt.y;
        this._nodeContainer.addChild(ZoneTxt2);

        let addStr = "";
        let addvalueTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_WHITE);
        addvalueTxt.text = LanguageManager.getlocal("rank_imacy") + ": " + App.StringUtil.changeIntToText(addV);
        if(this.param.data.rtype == 1)
        {
            addvalueTxt.text = LanguageManager.getlocal("attributeName") + ": " + App.StringUtil.changeIntToText(addV);
        }
        addvalueTxt.x = ZoneTxt.x;
        addvalueTxt.y = myRankTxt.y ;
        this._nodeContainer.addChild(addvalueTxt);

        let rect = new egret.Rectangle(0,0,this.viewBg.width,bg1.height -  60);
        let scrollView = ComponentManager.getScrollList(SkinRankScrollItem,resrank,rect);
        scrollView.y = bg2.y+50;
        scrollView.x = GameData.popupviewOffsetX;
        this._nodeContainer.addChild(scrollView);
       	scrollView.setEmptyTip(LanguageManager.getlocal("acPunishNoData") )
        this._scrollView = scrollView;

        let tipTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        tipTxt.text = LanguageManager.getlocal("skinRankTipTxt");
        tipTxt.x = this.viewBg.x + this.viewBg.width - tipTxt.width -30 ;
        tipTxt.y = bg3.y + bg3.height + 20;
        this._nodeContainer.addChild(tipTxt);
    }

    protected getShowHeight()
    {
        return 800;
    }
    /**
	 * 获取活动配置
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUST_CROSSSKIN_GETSKINRANK,requestData:this.param.data};
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if(data.ret){
            this._allirank = data.data.data;
        }
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "dinner_rankbg","dinner_rank_titlebg",
             "rank_line",
		]);
	}
    public dispose()
    {
        this._nodeContainer =null;
        this._scrollView = null;
        this._allirank = null;

        super.dispose()
    }
}