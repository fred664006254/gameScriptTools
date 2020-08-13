/**
 * 排名
 * author dky
 * date 2017/11/23
 * @class ConquestRankPopupView
 */
class ConquestRankPopupView extends RankPopupView
{
	// 滑动列表
	private _scrollList: ScrollList;

	private _timeTF:BaseTextField;

	private _selectChildData:any;
	private _curTabIdx=0;

	// private _acData :any;

	// private _acVo :AcPunishVo;
    private _titleTF:BaseTextField;
    private _nickNameTF:BaseTextField;
    private _myRankTF:BaseTextField;
    private _scoreTF:BaseTextField;
	// private _punishRewardList: any = {};
    private _acrank :any;

	public constructor() 
	{
		super();
	}


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
         return  ["conquestRank"];
		
	}

    protected getListItemClass():any
	{
		return ConquestRankScrollItem1
	}

    
	protected getScrollDataList():any[]
	{
		return this._acrank.conrank;
	}
	/**
	 * 获取配置
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
		
		return {requestType:NetRequestConst.REQUEST_CONQUEST_RANK,requestData:{}};
	}
		//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if(data.data.cmd == NetRequestConst.REQUEST_CONQUEST_RANK)
		{
			this._acrank  = data.data.data;
			// this._acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("punish","1");
		}

		
	}


	private rankBtnClick()
	{

	}

	protected tabBtnClickHandler(params:any)
    {
        this._curTabIdx = params.index
        // this.refreshRankList();
    }
    protected initButtomInfo()
    {
        let dataList = this._acrank.rankList;

        let nameTxt = ComponentManager.getTextField( LanguageManager.getlocal("acRank_mynick",[Api.playerVoApi.getPlayerName()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        nameTxt.x = 30;
        nameTxt.y = 10;
        this.buttomContainer.addChild(nameTxt);

        let rankV = "10000+";
        let addV = 0;
        if(this._acrank.merank)
        {
            rankV = String(this._acrank.merank);
            addV = this._acrank.merank;
        }
        let myRankTxt = ComponentManager.getTextField("",nameTxt.size,TextFieldConst.COLOR_BROWN)
        myRankTxt.text = LanguageManager.getlocal("acRank_myrank",[rankV]);
        myRankTxt.x = nameTxt.x;
        myRankTxt.y = nameTxt.y + 30;
        this.buttomContainer.addChild(myRankTxt);

        let rtext = LanguageManager.getlocal("conquestScore") + ":" + this._acrank.mepoint;
        let addvalueTxt = ComponentManager.getTextField(rtext,nameTxt.size,TextFieldConst.COLOR_BROWN)
        addvalueTxt.x = myRankTxt.x;
        addvalueTxt.y = myRankTxt.y + 30;
        this.buttomContainer.addChild(addvalueTxt);


        // if(this._curTabIdx == 0){
        //     let rankV = "10000+";
        //     let addV = 0;
        //     this._nickNameTF.text = LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName()
            
        //     this._titleTF.text = LanguageManager.getlocal("acRankPop_title2");

        //     if(this._acrank.myrank.myrank)
        //     {
        //         rankV = String(this._acrank.myrank.myrank);
        //         addV = this._acrank.myrank.value;
        //     }
        //     this._myRankTF.text = LanguageManager.getlocal("acRank_myrank",[rankV]);

        //     // this._scoreTF.text = LanguageManager.getlocal("acPunishScore",[this._acVo.v.toString()]);
        // }
        // else{
        //     dataList = this._acData.arankList
        //     this._titleTF.text = LanguageManager.getlocal("acRankPop_titleAlliance");

        //     let aName = LanguageManager.getlocal("allianceRankNoAlliance");
        //     let rankV = LanguageManager.getlocal("nothing");
        //     let score = LanguageManager.getlocal("nothing");
        //     let addV = 0;
        //     this._nickNameTF.text = LanguageManager.getlocal("acRank_myAlliancenick") + rankV;
            
        //     this._titleTF.text = LanguageManager.getlocal("acRankPop_titleAlliance");

        //     if(this._acData.amyrank.myrank)
        //     {
        //         rankV = String(this._acData.amyrank.myrank);
        //         score = String(this._acData.amyrank.value);
                
        //         // addV = this._acData.myrank.value;
        //     }
        //     if(Api.playerVoApi.getPlayerAllianceId() != 0){
        //         aName = Api.playerVoApi.getPlayerAllianceName();
        //     }
        //     this._nickNameTF.text = LanguageManager.getlocal("acRank_myAlliancenick") + aName;
        //     this._scoreTF.text = LanguageManager.getlocal("acPunishScore",[score]);
        //     this._myRankTF.text = LanguageManager.getlocal("acRank_myrank",[rankV]);

            
        // }
        // this._scrollList.refreshData(dataList);
	}

	public getTitleStr():string
	{
		return "conquestRank";
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
		// this._acVo = null;
        this._titleTF = null;
        this._nickNameTF = null;
        this._myRankTF = null;
        this._scoreTF = null;
		super.dispose();
	}
}
 class ConquestRankScrollItem1 extends RankPopupListItem
{
	public constructor()
	{
		super();
	}
}