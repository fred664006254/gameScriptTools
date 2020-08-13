
class BetheKingRewardVIew  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _rewardNodeContainer:BaseDisplayObjectContainer
    private _myRankTxt:BaseTextField;
    private _rankListBtn:BaseButton;
    private _rankData:Object;
    private _acCDTxt:BaseTextField;
    private _deltaSecs = 86400;
    private _rankDescTxt:BaseTextField;

    private _aid:string;
	private _code:string;
	private _acVo:AcBeTheKingVo;
	private _cdTxt:BaseTextField;

	public constructor() 
	{
		super();
	}
    public initView()
    {   
        
        this._aid = this.param.data.aid;
		this._code = this.param.data.code;
		this._acVo = <AcBeTheKingVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid,this._code);
		let rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        if(rankcfg.rankNo1reward1){
            BetheKingRewardScrollItem.REWARD_TITLEID = rankcfg.rankNo1reward1;
        }else{
            BetheKingRewardScrollItem.REWARD_HEADID = rankcfg.rankNo1reward2;
        }

        this._nodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);
        this._nodeContainer.y =80;
        this._rewardNodeContainer = new BaseDisplayObjectContainer();
        
        let dibian:BaseBitmap=BaseBitmap.create("public_line");
		dibian.width =640;  
		dibian.y =330;
		this.addChild(dibian);
        
        let rightBg = "betheking_banner";
        let activity_rank_bg = BaseLoadBitmap.create(rightBg);
        activity_rank_bg.width =640;
        activity_rank_bg.height =280; 
        activity_rank_bg.x = 0;
        activity_rank_bg.y = -15;
        this._nodeContainer.addChildAt(activity_rank_bg,0);

        let starNum = Config.ServantCfg.getServantItemById("2019").getStarNums();
        let rewardTxt1 = ComponentManager.getTextField("",18,TextFieldConst.COLOR_LIGHT_YELLOW);
        rewardTxt1.text = LanguageManager.getlocal("betheKing_rewardTxt1",[""+starNum]);
        rewardTxt1.x = 40;
        rewardTxt1.y = activity_rank_bg.y + 236;
        this._nodeContainer.addChild(rewardTxt1);

        let glamour = Config.WifeCfg.getWifeCfgById("2019").glamour;
        let rewardTxt2 = ComponentManager.getTextField("",18,TextFieldConst.COLOR_LIGHT_YELLOW);
        rewardTxt2.text = LanguageManager.getlocal("betheKing_rewardTxt2",[""+glamour]);
        rewardTxt2.x = rewardTxt1.x;
        rewardTxt2.y = rewardTxt1.y + 20;
        this._nodeContainer.addChild(rewardTxt2);

        let rewardTxt3 = ComponentManager.getTextField("",18,TextFieldConst.COLOR_LIGHT_YELLOW);
        rewardTxt3.text = LanguageManager.getlocal("betheKing_rewardTxt3");
        rewardTxt3.x = activity_rank_bg.x + 550 - rewardTxt3.width/2;
        rewardTxt3.y = activity_rank_bg.y + 255;
        this._nodeContainer.addChild(rewardTxt3);
      
        /**
         * 下部列表
         */
		let bottomBg:BaseBitmap = BaseBitmap.create("public_9v_bg02");
		bottomBg.x = 0;
        bottomBg.width =GameConfig.stageWidth;
		bottomBg.y = activity_rank_bg.y + activity_rank_bg.height; 
		bottomBg.height = GameConfig.stageHeigth - bottomBg.y  - this.container.y;//-20; 
		this._nodeContainer.addChild(bottomBg);

        let bottomBg2 = BaseBitmap.create("adult_lowbg");
		bottomBg2.x =GameConfig.stageWidth/2 - bottomBg2.width/2;
        bottomBg2.y =GameConfig.stageHeigth -180;
		this._nodeContainer.addChild(bottomBg2);

		let bottomBgV = BaseBitmap.create("public_9v_bg03");
		bottomBgV.width = GameConfig.stageWidth;
		bottomBgV.height = GameConfig.stageHeigth - 346 ;
		bottomBgV.x = 0;
		bottomBgV.y = 345;
		this.addChildToContainer(bottomBgV);
        
        let tipTxt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_QUALITY_ORANGE);
        tipTxt.text = LanguageManager.getlocal("acRanktip");
        if(rankcfg.type == 11)
        {
            tipTxt.text = LanguageManager.getlocal("acRanktip2");
        }
        tipTxt.x = GameConfig.stageWidth/2 - tipTxt.width/2;
        tipTxt.y = bottomBg2.y+35;
        bottomBg.name = "bottomBg";
        this._nodeContainer.addChild(tipTxt);

        let rect = new egret.Rectangle(0,10,GameConfig.stageWidth,bottomBg.height-204);
        let rList = rankcfg.rankList;
        let zrankinfo = this._acVo.zidgroup;
		if(zrankinfo)
        {
            rList =rankcfg.serverList1
        }
        
        let listArr = [];
        let keys = Object.keys(rList);
        for (var index = 0; index < keys.length; index++) {
            var element = rList[keys[index]];
            listArr.push(element);
        }
        listArr.push(
            {
                isLast:1,
                reward:rankcfg.voteReward
            }
        );
        let scrollList = ComponentManager.getScrollList(BetheKingRewardScrollItem,listArr,rect);
        scrollList.x = 0;//bottomBg.x;
        scrollList.y = bottomBg.y+13;
        this._nodeContainer.addChild(scrollList);
    }


    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "activity_rank_rightBg",
            "activity_rank_cross",,
            "servant_wenzibutiao","adult_lowbg","rank_biao","rechargevie_db_01",
            ,"betheking_banner","playerview_powerbg",
		]);
	}

    // public tick():boolean
	// {
    //     let deltaT = this._acVo.et  - GameData.serverTime;
	// 	if (this._acCDTxt && deltaT > 0){
    //         this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD",[App.DateUtil.getFormatBySecond(deltaT,1)]);
	// 		return true;
    //     }else{
    //         this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD",[LanguageManager.getlocal("acRank_acCDEnd")]);
	// 	}
	// 	return false;
	// }

    protected getTitleBgName():string
	{
		return "commonview_db_04";
	}
    public dispose():void
	{

        this._nodeContainer = null;
        this._rewardNodeContainer = null;
        this._myRankTxt = null;
        this._rankListBtn = null;
        this._rankData = null;
        this._acCDTxt = null;

		super.dispose();
	}
}