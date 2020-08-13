/**
 * 擂台排行榜
 */

class AcJadeRankListView extends PopupView
{	
	private _scrollList:ScrollList;

	protected _scroRect:egret.Rectangle;


    private _code:string = "1";
    private _aid:string ="";

    private _myrankArr = null;
    private _rankArr = null;
    // private _emptyTxt:BaseTextField = null;

	// private isShowTextBoo:boolean =false;

    public constructor() 
	{
		super();
	}
    public get vo ()
    {
       return <AcJadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid,this.param.data.code);
    }
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rankinglist_line",
			"rankinglist_rankbg", 
			"rank_1",
			"rank_2",
			"rank_3",
			"rank_biao",
			
        ]);
	}
    
    public initView():void
	{
	
        this._aid = this.param.data["aid"];
        this._code = this.param.data["code"];

		let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		rankBg.width = 540;
		rankBg.height = 626;
		rankBg.setPosition(39,20);
		this.addChildToContainer(rankBg);

		let innerBg = BaseBitmap.create("public_tc_bg03");
        innerBg.height = 500;
        innerBg.width = 520;
		innerBg.x = rankBg.x+10;
		innerBg.y = rankBg.y+5; 
        this.addChildToContainer(innerBg);

		let titleBg:BaseBitmap = BaseBitmap.create("rank_biao");
		titleBg.width = 502;
		titleBg.height = 36;
		titleBg.setPosition(59 ,35);
		this.addChildToContainer(titleBg);

        // this._emptyTxt = ComponentManager.getTextField();

		this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width,440);
		this._scrollList  = ComponentManager.getScrollList(AcJadeRankListScrollItem,this._rankArr,this._scroRect);
		this._scrollList.x = titleBg.x;
		this._scrollList.y = titleBg.y + titleBg.height;
		this._scrollList.setEmptyTip(LanguageManager.getlocal("atkracedes5"),TextFieldConst.COLOR_BROWN);
		this.addChildToContainer(this._scrollList);

		let bottomBg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bottomBg.width = 516;
		bottomBg.height = 104;
		bottomBg.setPosition(this.viewBg.width/2  - bottomBg.width/2, 535);
		this.addChildToContainer(bottomBg);

		//  //标头
        // let titleBg2 = BaseBitmap.create("rank_biao");
        // titleBg2.width = innerBg.width - 20;
        // titleBg2.x = 100;
        // titleBg2.y = 200;
		// this.addChildToContainer(titleBg2);

		 let suffix = this._code;
        if(this._code == "1"  ){
            suffix = "1";
        }

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acJadeRankListName1_"+ suffix),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(125 , titleBg.y+titleBg.height/2 - rankText.height/2+2);
		this.addChildToContainer(rankText);

		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acJadeRankListName2_"+ suffix),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(rankText.x+145, rankText.y);
		this.addChildToContainer(nameText);

		//擂台分数
		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acJadeRankListName3_"+ suffix),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(rankText.x+312 , rankText.y);
		this.addChildToContainer(scoreText);


		//下面玩家昵称
		let desc1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acJadeRankListDesc1_"+ suffix,[Api.playerVoApi.getPlayerName()]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		desc1.setPosition(60 , bottomBg.y+bottomBg.height/2 -5 -desc1.height-13);
		this.addChildToContainer(desc1);
		
        let valueText = "0";

        if(this._myrankArr && this._myrankArr.value){
            valueText = this._myrankArr.value.toString();
        }
		//分数
		let desc2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acJadeRankListDesc2_"+ suffix,[valueText]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		desc2.setPosition(350 ,desc1.y);
		this.addChildToContainer(desc2);

        let rankNumText = "1000+";
        if(this._myrankArr && this._myrankArr.myrank){
            rankNumText = this._myrankArr.myrank.toString();
        }
		//排名
		let desc3:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acJadeRankListDesc3_"+ suffix,[rankNumText]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		desc3.setPosition(60 , desc1.y+desc1.height+5);
		this.addChildToContainer(desc3);
		
		//元宝
		let desc4:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acJadeRankListDesc4_"+ suffix,[this.vo.getRechargeValue().toString()]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		desc4.setPosition(350 ,desc3.y);
		this.addChildToContainer(desc4);

		//排名
		let desc5:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acJadeRankListDesc5_"+ suffix),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED);
		desc5.setPosition(GameConfig.stageWidth/2 - desc5.width/2 ,desc4.y+desc4.height+5);
		this.addChildToContainer(desc5);


	
    }
    protected getTitleStr():string
	{
		return App.StringUtil.firstCharToLower(this.getClassName()) + "Title_" + this.param.data.code;
	}
	protected getRequestData():{requestType:string,requestData:any}
	{	
       
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_GETJADERANK,requestData:{activeId:this.param.data.aid+"-"+this.param.data.code}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{

        if(data.ret){
            this._myrankArr = data.data.data.myrankArr;
            this._rankArr = data.data.data.rankArr;
        }
        
	}
 


    public dispose():void
	{	
		this._scrollList = null;

	    this._scroRect = null;


        this._code = "1";
        this._aid ="";

        this._myrankArr = null;
        this._rankArr = null;

		super.dispose();
	}
}