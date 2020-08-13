/**
 * 冲榜排行
 * author yanyuling
 * date 2017/11/06
 * @class AcCrossServerGemExpendPopupView
 */

class AcCrossServerGemExpendPopupView  extends PopupView
{
    private _aid:string = "";
	private _code:string = "";
	private _nodeContainer:BaseDisplayObjectContainer;
    private _acRankInfoVo:AcRankInfoVo = null;
    private _allirank:AcRankInfoVo = null;
    private _scrollView:ScrollList;

	public constructor() {
		super();
	}

	public initView():void
	{	
        console.log(this.param);
        let myrank = this.param.data.myrank;
        let myscore = this.param.data.myscore;
        let dataList = this.param.data.rankList;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = 800;
        this.addChildToContainer(this._nodeContainer);
        let startY = 20;
        
        let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height =760
        bg1.x =42;
        bg1.y =10;
        this._nodeContainer.addChild(bg1);

        
        let tcbg2= BaseBitmap.create("public_tc_bg03");
        tcbg2.width = bg1.width-30;
        tcbg2.height = 600;
        tcbg2.x = bg1.x+15;
        tcbg2.y = 25;
        this._nodeContainer.addChild(tcbg2);
    
        let bg2= BaseBitmap.create("rank_biao");
        bg2.width = 480; 
        bg2.x = bg1.x+20;
        bg2.y = 33;
        this._nodeContainer.addChild(bg2);

        let titleTxt2Str = LanguageManager.getlocal("acRankPop_title2");
        let titleTxt4Str = LanguageManager.getlocal("rankServer");
        
        let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt1.x = bg2.x+40;
        titleTxt1.y = bg2.y + 5;
        this._nodeContainer.addChild(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(titleTxt2Str,titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.name = "titleTxt2"
        titleTxt2.x = bg2.x+145;
        titleTxt2.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt2);

        let titleTxt4 = ComponentManager.getTextField(titleTxt4Str,titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt4.name = "titleTxt4"
        titleTxt4.x = bg2.x+285;
        titleTxt4.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt4);


        let titleStr3:string;
        titleStr3 = LanguageManager.getlocal("acRankPop_title3_11101");
        let titleTxt3 = ComponentManager.getTextField(titleStr3,titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW); 
        this._nodeContainer.addChild(titleTxt3);
        var moveX:number =0;
        if(titleTxt3.text.length==2)
        {
            moveX =20;
        }
        this.setLayoutPosition(LayoutConst.right, titleTxt3, bg2, [25+moveX,0]);
        titleTxt3.y = titleTxt1.y;
        titleTxt3.name = "titleTxt3"

        let bg3= BaseBitmap.create("public_tc_bg03");
        bg3.width = tcbg2.width;
        bg3.height = 120;
        bg3.x = tcbg2.x;
        bg3.y = tcbg2.y+tcbg2.height+10;
        this._nodeContainer.addChild(bg3);

        let nickTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        nickTxt.text = LanguageManager.getlocal("acRank_mynick",[Api.playerVoApi.getPlayerName()]);
        nickTxt.x = bg3.x+20;
        nickTxt.y = bg3.y + 20;
        this._nodeContainer.addChild(nickTxt);

      

        let rankV = "10000+";
        let addV = 0;
        rankV = String(myrank);
        addV = myscore;
            
        let myRankTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_BROWN)
        myRankTxt.text = LanguageManager.getlocal("acRank_myrank",[rankV]);
        myRankTxt.x = nickTxt.x;
        myRankTxt.y = nickTxt.y+30;
        myRankTxt.name = "myRankTxt";
        this._nodeContainer.addChild(myRankTxt);

        let addStr = ""
        let addvalueTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_BROWN)
        addvalueTxt.text = LanguageManager.getlocal("acRank_myaddV",[titleStr3,String(addV)]);
        addvalueTxt.x = myRankTxt.x;
        addvalueTxt.y = myRankTxt.y+30 ;
        addvalueTxt.name = "addvalueTxt";
        this._nodeContainer.addChild(addvalueTxt);

        let rect = new egret.Rectangle(0,0,this.viewBg.width,tcbg2.height -  140);
        let scrollView = ComponentManager.getScrollList(AcCrossServerGemExpendRankListScrollItem,dataList,rect);
        scrollView.y = bg2.y+50;
        scrollView.x =5;
        this._nodeContainer.addChild(scrollView);
       	scrollView.setEmptyTip(LanguageManager.getlocal("acPunishNoData"),TextFieldConst.COLOR_BROWN)
        this._scrollView = scrollView;

    }


    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
                "public_tc_bg03",
                "public_tc_bg05",
                "public_tc_bg01",
                "rank_biao"
		]);
	}
    public dispose()
    {
        this._aid = "";
        this._code = "";
        this._nodeContainer =null;
        this._acRankInfoVo = null;
        this._scrollView = null;
        this._allirank = null;

        super.dispose()
    }
}