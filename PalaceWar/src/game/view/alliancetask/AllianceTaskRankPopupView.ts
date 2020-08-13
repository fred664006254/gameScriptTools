/**
 *帮会任务排行榜
 * author yanyuling
 * date 2018/07/23
 * @class AllianceTaskRankPopupView

 */
class AllianceTaskRankPopupView extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
    private _acRankInfoVo:AcRankInfoVo = null;
    private _ranksData = null;
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
        
        let bg1= BaseBitmap.create("public_9_bg32");
        bg1.width = 520;
        bg1.height = 540;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        
        this._nodeContainer.addChild(bg1);

        let bg2= BaseBitmap.create("public_9_bg33");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg1.y = startY;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this._nodeContainer.addChild(bg2);
        
        let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt1.x = bg2.x+40;
        titleTxt1.y = bg2.y + 8;
        this._nodeContainer.addChild(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.name = "titleTxt2"
        titleTxt2.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt2);

        let titleStr3:string= LanguageManager.getlocal("allianceTaskRankContribution");
        if(this.param.data.alliRank)
        {
            titleTxt2.text = LanguageManager.getlocal("acRankPop_titleAlliance");
            titleStr3 = LanguageManager.getlocal("allianceTaskRank_complete_times");
        }
        let titleTxt3 = ComponentManager.getTextField(titleStr3,titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt3.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt3);
        titleTxt3.name = "titleTxt3";
       
        titleTxt2.x = bg2.x+200;
        titleTxt3.x = bg2.x+430 - titleTxt3.width/2;

        let bg3= BaseBitmap.create("public_9_bg1");
        bg3.width = bg1.width;
        bg3.height = 100;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 9;
        this._nodeContainer.addChild(bg3);

        let nickTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        nickTxt.text = LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName();
        nickTxt.x = bg3.x+20;
        nickTxt.y = bg3.y + 20;
        this._nodeContainer.addChild(nickTxt);
        if(this.param.data.alliRank)
        {
            if(Api.playerVoApi.getPlayerAllianceId() == 0){
                nickTxt.text = LanguageManager.getlocal("allianceRankMyAlliance",[LanguageManager.getlocal("allianceRankNoAlliance")])
            }
            else{
                nickTxt.text = LanguageManager.getlocal("allianceRankMyAlliance",[Api.playerVoApi.getPlayerAllianceName()])
            }
        }

        let rankV = "10000+";
        let addV = "0";
        if(this._ranksData.merank)
        {
            rankV = String(this._ranksData.merank);
            addV = String(this._ranksData.v);
        }
        let myRankTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        myRankTxt.text = LanguageManager.getlocal("acRank_myrank",[rankV]);
        myRankTxt.x = nickTxt.x;
        myRankTxt.y = nickTxt.y+40;
        myRankTxt.name = "myRankTxt";
        this._nodeContainer.addChild(myRankTxt);

        let addStr = ""
        let addvalueTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        addvalueTxt.text = LanguageManager.getlocal("acRank_myaddV",[titleStr3, addV]);
        addvalueTxt.x = myRankTxt.x + 240;
        addvalueTxt.y = myRankTxt.y ;
        addvalueTxt.name = "addvalueTxt";
        this._nodeContainer.addChild(addvalueTxt);

       

        let rect = new egret.Rectangle(0,0,this.viewBg.width,bg1.height -  60);
        let dataList = this._ranksData.ranks;
        let scrollView = ComponentManager.getScrollList(AllianceTaskRankScrollItem,dataList,rect);
        scrollView.x = GameData.popupviewOffsetX;
        scrollView.y = bg2.y+50;
        this._nodeContainer.addChild(scrollView);
       	scrollView.setEmptyTip(LanguageManager.getlocal("acPunishNoData") )
        this._scrollView = scrollView;
    }

    /**
	 * 获取活动配置
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
        let taskId = this.param.data.taskId ;
        let alliRank = this.param.data.alliRank;
        if( alliRank){
           return {requestType:NetRequestConst.REQUEST_ALLIANCETASK_RANK,requestData:{dype:1,tid:taskId} };
        }else{
            return {requestType:NetRequestConst.REQUEST_ALLIANCETASK_RANK,requestData:{dype:2,tid:taskId} };
        }
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (data && data.ret){
            this._ranksData = data.data.data;
        }
        
	}
	protected getShowHeight():number
	{
		return 750;
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rank_1","rank_2","rank_3",
		]);
	}
    public dispose()
    {
        this._nodeContainer =null;
        this._acRankInfoVo = null;
        this._scrollView = null;
        this._ranksData = null;

        super.dispose()
    }
}