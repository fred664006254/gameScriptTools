/**
 * 排名
 * author dky
 * date 2017/11/23
 * @class AcRescueRankPopupView
 */
class AcRescueRankPopupView extends RankPopupView
{
	// 滑动列表
	private _scrollList: ScrollList;

	private _timeTF:BaseTextField;

	private _selectChildData:any;
	private _curTabIdx=0;

	private _acrank :any;

	private _acVo :AcRescueVo;
    private _titleTF:BaseTextField;
    private _nickNameTF:BaseTextField;
    private _myRankTF:BaseTextField;
    private _scoreTF:BaseTextField;
	// private _punishRewardList: any = {};
    static aid:string ="";
	static code:string="";

    private _allianceRankTip:BaseTextField;

	public constructor() 
	{
		
		super();
		// this.initTab();
	}

	// public initView():void
	// {	

	// 	super.initView();
	// 	this.selectedTabIndex = this.param.data.tab?parseInt(this.param.data.tab):0;
	// 	let data = {index:this.selectedTabIndex}
	// 	this.clickTabbarHandler(data)
	// }
	// private initTab()
	// {
	// 	// this._selectedTabIndex = this.param.tt;
	// }
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
	protected getTabbarTextArr():string[]
	{
        if(Api.switchVoApi.checkPunishAllianceRank())
        {
            
           return  ["acPunishRankTab1"];
        }else{
            return ["acPunishRankTab1","acPunishRankTab2"];
        }
		
	}

    protected getListItemClass():any
	{
		if(this._selectedTabIndex==0)
		{
			return AcRescueRankScroll1Item;
		}
		else if(this._selectedTabIndex==1)
		{
			return AcRescueRankScroll2Item;
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
			return this._acrank.arankList;
		}
	}

	protected initButtomInfo():void
	{
        this._acVo = <AcRescueVo>Api.acVoApi.getActivityVoByAidAndCode(AcRescueRankPopupView.aid, AcRescueRankPopupView.code);
		// let nickTxt = ComponentManager.getTextField(LanguageManager.getlocal("acRank_mynick"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        // nickTxt.x = 30;
        // nickTxt.y = 10;
        // this.buttomContainer.addChild(nickTxt);

        let nameTxt = ComponentManager.getTextField( LanguageManager.getlocal("acRank_mynick",[Api.playerVoApi.getPlayerName()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        nameTxt.x = 30;
        nameTxt.y = 10;
        this.buttomContainer.addChild(nameTxt);

        let rankV = "10000+";
        let addV = 0;
        if(this._acrank.myrank.myrank)
        {
            rankV = String(this._acrank.myrank.myrank);
            addV = this._acrank.myrank.value;
        }
        let myRankTxt = ComponentManager.getTextField("",nameTxt.size,TextFieldConst.COLOR_BROWN)
        myRankTxt.text = LanguageManager.getlocal("acRank_myrank",[rankV]);
        myRankTxt.x = nameTxt.x;
        myRankTxt.y = nameTxt.y + 30;
        this.buttomContainer.addChild(myRankTxt);

        let rtext = LanguageManager.getlocal("acPunishScore",[this._acVo.v.toString()]);
        let addvalueTxt = ComponentManager.getTextField(rtext,nameTxt.size,TextFieldConst.COLOR_BROWN)
        addvalueTxt.x = myRankTxt.x;
        addvalueTxt.y = myRankTxt.y + 30;
        this.buttomContainer.addChild(addvalueTxt);

        if(this._selectedTabIndex==0)
		{
			
		}
		else if(this._selectedTabIndex==1)
		{
            let aName = LanguageManager.getlocal("allianceRankNoAlliance");
            let rankV = LanguageManager.getlocal("nothing");
            let score = LanguageManager.getlocal("nothing");
            if(this._acrank.amyrank.myrank)
            {
                rankV = String(this._acrank.amyrank.myrank);
                score = String(this._acrank.amyrank.value);
                
                // addV = this._acData.myrank.value;
            }
            if(Api.playerVoApi.getPlayerAllianceId() != 0){
                aName = Api.playerVoApi.getPlayerAllianceName();
            }
			nameTxt.text =  LanguageManager.getlocal("acRank_myAlliancenick",[aName])  ;

            myRankTxt.text = LanguageManager.getlocal("acRank_myrank",[rankV]);
            addvalueTxt.text = LanguageManager.getlocal("acPunishScore",[score]);
		}
	}

	protected getBgExtraHeight():number
	{
		return 10;
	}

	/**
	 * 获取活动配置
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
		
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_GETRESCUEACTIVE,requestData:{activeId: AcRescueRankPopupView.aid+"-"+ AcRescueRankPopupView.code}};
	}
		//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if(data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_GETRESCUEACTIVE)
		{
			this._acrank  = data.data.data.rescueActive;
			this._acVo = <AcRescueVo>Api.acVoApi.getActivityVoByAidAndCode( AcRescueRankPopupView.aid, AcRescueRankPopupView.code);
		}

		
	}
   

	private rankBtnClick()
	{

	}

	


	public hide():void
	{
		super.hide();
	}


	public dispose():void
	{

		
		// 未婚滑动列表
		this._scrollList = null;

		this._timeTF = null;

		this._selectChildData = null;
		this._acVo = null;
        this._titleTF = null;
        this._nickNameTF = null;
        this._myRankTF = null;
        this._scoreTF = null;
        this._allianceRankTip = null;

		super.dispose();
	}
    
}
 class AcRescueRankScroll1Item extends RankPopupListItem
{
	public constructor()
	{
		super();
	}
}

class AcRescueRankScroll2Item extends RankPopupListItem
{
	public constructor()
	{
		super();
	}
}