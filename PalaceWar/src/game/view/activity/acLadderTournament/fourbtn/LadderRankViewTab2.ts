class LadderRankViewTab2 extends CommonViewTab
{  

    //滑动列表
    private _scrollList:ScrollList = null; 
    private _myrank:BaseTextField = null;
    public constructor() 
	{
		super();
		this.initView();
	}

    private get vo() : AcLadderTournamentVo{
        return <AcLadderTournamentVo>Api.acVoApi.getActivityVoByAidAndCode("ladderTournament", "1");
    }

    protected initView():void
    {   
        let view = this;   
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK),this.resetInfo,this);

        let listbg = BaseBitmap.create("public_9_bg24");
        listbg.width = 624;
        listbg.height = GameConfig.stageHeigth - 268;
        listbg.setPosition(8,0);
        this.addChild(listbg);


        let tmpRect =  new egret.Rectangle(0,0,listbg.width,listbg.height-16);
		let scrollList = ComponentManager.getScrollList(LadderRankViewTab2Item,this.vo.getArr("rankReward"),tmpRect);
        view._scrollList = scrollList;     
		scrollList.setPosition(listbg.x,listbg.y+8)
        view.addChild(scrollList); 
        scrollList.bounces = false;


        let bottomBg = BaseBitmap.create("emparena_bottom");
        bottomBg.height = 120;
        bottomBg.y = listbg.y+listbg.height+7;
        this.addChild(bottomBg);

        let bottomText1 = ComponentManager.getTextField(LanguageManager.getlocal("acRank_myrank1",["1"]), 20, TextFieldConst.COLOR_WHITE);
		bottomText1.setPosition(65, bottomBg.y+30);
        this.addChild(bottomText1);

        let bottomText2 = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_rank_refresh_tip"), 20, TextFieldConst.COLOR_WHITE);
		bottomText2.setPosition(bottomText1.x, bottomBg.y+73);
        this.addChild(bottomText2);

        this._myrank = bottomText1;
        this.resetInfo();
    }

    private resetInfo():void
    {   
        let myinfo:any = Api.laddertournamentVoApi.getMyRankArray();
        let ranknum:number = myinfo.myrank;
        let rankstr:string;
        if (ranknum)
        {
            rankstr = String(ranknum);
        }
        else
        {
            rankstr = LanguageManager.getlocal("acLadder_notJoin");
        }
        this._myrank.text = LanguageManager.getlocal("acRank_myrank1",[rankstr]);
    }

    public dispose()
    {   
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK),this.resetInfo,this);
        this._scrollList = null;
        this._myrank= null;

        super.dispose();
    }
}