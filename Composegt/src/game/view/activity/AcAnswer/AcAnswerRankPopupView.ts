/**
 * yanyuling
 * 问卷答题
 */
class AcAnswerRankPopupView extends PopupView	
{
	private _scrollList:ScrollList;
	private _infoList:any[] = null;
	protected _scroRect:egret.Rectangle;
	private _merank:number = 0;
	private _mepoint:number =0;
	private atkracedes5:any =null;

    public constructor() 
	{
		super();
	}

    public initView():void
	{
	
		let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		rankBg.width = 540;
		rankBg.height = 700;
		rankBg.setPosition(39,20);
		this.addChildToContainer(rankBg);

		let innerBg = BaseBitmap.create("public_tc_bg03");
        innerBg.width = rankBg.width - 20;
        innerBg.height  = 570;
		innerBg.x = rankBg.x+10;
		innerBg.y = rankBg.y+10; 
        this.addChildToContainer(innerBg);

		let titleBg:BaseBitmap = BaseBitmap.create("rank_biao");
		titleBg.width = 502;
		titleBg.height = 36;
		titleBg.setPosition(59 ,45);
		this.addChildToContainer(titleBg);

		this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width,440);
		this._scrollList  = ComponentManager.getScrollList(AcAnswerScrollItem,this._infoList,this._scroRect);
		this._scrollList.x = titleBg.x;
		this._scrollList.y = titleBg.y + titleBg.height;
		this._scrollList.setEmptyTip(LanguageManager.getlocal("atkracedes5"),TextFieldConst.COLOR_BROWN);
		this.addChildToContainer(this._scrollList);

		let bottomBg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bottomBg.width = 520;
		bottomBg.height = 100;
		bottomBg.setPosition(this.viewBg.width/2  - bottomBg.width/2, innerBg.y + innerBg.height + 10 );
		this.addChildToContainer(bottomBg);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(bottomBg.x + 50 , titleBg.y+titleBg.height/2 - rankText.height/2+2);
		this.addChildToContainer(rankText);

		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(rankText.x+160, rankText.y);
		this.addChildToContainer(nameText);

		//擂台分数
		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acAnswerRankScore"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(rankText.x+330 , rankText.y);
		this.addChildToContainer(scoreText);


		//下面玩家昵称
		let nickName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		nickName.setPosition(bottomBg.x + 30 , bottomBg.y+30);
		this.addChildToContainer(nickName);
		
		//排名
		let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		rankText2.setPosition(nickName.x ,nickName.y+nickName.height+10);
		this.addChildToContainer(rankText2);

		//玩家名字
		let name:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		name.setPosition(nickName.x + nickName.width +12 , nickName.y);
		this.addChildToContainer(name);

		let rankStr:string;
		if(this._merank)
		{
			if (this._merank>300) {
			rankStr = "10000+";
			}
			else {
				rankStr = this._merank.toString();
			}
		}
		else
		{	//未上榜
			rankStr =LanguageManager.getlocal("atkracedes4");// this._merank.toString();
		}
		
		let rank:BaseTextField = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		rank.setPosition(rankText2.x + rankText2.width + 12 , rankText2.y);
		this.addChildToContainer(rank);

		let socreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("answer_rankscrore")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		socreText.setPosition(bottomBg.x + 300, nickName.y);
		this.addChildToContainer(socreText);
		//擂台分数
		let str:string ="";
		if(this._mepoint)
		{
			str	=this._mepoint+"";
		}else
		{
			str ="0";
		}
		let socre:BaseTextField = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		socre.setPosition(socreText.x+socreText.width+5, socreText.y);
		this.addChildToContainer(socre);
		
        let answer_rankTip:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acAnswerRankTip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		answer_rankTip.setPosition(bottomBg.x + bottomBg.width - answer_rankTip.width, bottomBg.y+bottomBg.height + 20);
		this.addChildToContainer(answer_rankTip);
        
	
    }
	
	protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_ACTIVITY2S_NEWANSWERRANK,requestData:{activeId:this.param.data.activeId}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.ret&&data.data.data.rank)	
		{
			this._infoList = data.data.data.rank;
			this._merank = data.data.data.merank;
			this._mepoint = this.param.data.score; 
		}
	}
 
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rankinglist_line","rankinglist_rankbg", 
			"rank_1","rank_2","rank_3","rank_biao",
        ]);
	}

    public dispose():void
	{	
		this. _scrollList =null;
		this._infoList =null;
		this._merank  =0;
		super.dispose();
	}
}