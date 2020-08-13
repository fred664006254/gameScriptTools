/**
 * 擂台排行榜
 */

class AtkraceRankListView extends PopupView
{	
	private _scrollList:ScrollList;
	private _infoList:AtkraceRankItemInfo[] = null;
	protected _scroRect:egret.Rectangle;
	private _merank:number = 0;
	private _mepoint:number = 0;
	private atkracedes5:any =null;
	// private isShowTextBoo:boolean =false;

    public constructor() 
	{
		super();
	}
	/**生成新标头 */
	protected isHaveTitle():boolean
	{
		return true;
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
	
		let tabName = ["atkraceRank"]; 

		// let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		// rankBg.width = 540;
		// rankBg.height = 620;
		// // rankBg.setPosition(39,20);
		// rankBg.x = this.viewBg.width/2  - rankBg.width/2;//GameConfig.stageWidth/2 - rankBg.width/2;
		// rankBg.y = 20;
		// this.addChildToContainer(rankBg);

		let innerBg = BaseBitmap.create("public_9v_bg12");
        innerBg.height = 500;
        innerBg.width = 530;
		innerBg.x = this.viewBg.width/2 - innerBg.width/2;
		innerBg.y = 75; 
        this.addChildToContainer(innerBg);

		// let titleBg:BaseBitmap = BaseBitmap.create("rank_biao");
		// titleBg.width = 502;
		// titleBg.height = 36;
		// titleBg.setPosition(this.viewBg.width/2 - titleBg.width/2 ,35);
		// this.addChildToContainer(titleBg);


		this._scroRect = new egret.Rectangle(0, 0, innerBg.width ,innerBg.height - 20);
		this._scrollList  = ComponentManager.getScrollList(AtkraceRankItem,this._infoList,this._scroRect);
		this._scrollList.x = this.viewBg.width/2 - this._scrollList.width/2;
		this._scrollList.y = innerBg.y + innerBg.height/2 - this._scrollList.height/2;
		this._scrollList.setEmptyTip(LanguageManager.getlocal("atkracedes5"),TextFieldConst.COLOR_BROWN);
		this.addChildToContainer(this._scrollList);

		let bottomBg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		bottomBg.width = 530;
		bottomBg.height = 104;
		bottomBg.setPosition(this.viewBg.width/2  - bottomBg.width/2, innerBg.y + innerBg.height + 5);
		this.addChildToContainer(bottomBg);

		//  //标头
        // let titleBg2 = BaseBitmap.create("rank_biao");
        // titleBg2.width = innerBg.width - 20;
        // titleBg2.x = 100;
        // titleBg2.y = 200;
		// this.addChildToContainer(titleBg2);


		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		rankText.setPosition(130 - rankText.width/2 , 32);
		this.addChildToContainer(rankText);

		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		nameText.setPosition(300 - nameText.width/2, rankText.y);
		this.addChildToContainer(nameText);

		//擂台分数
		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceScore"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		scoreText.setPosition(470 - scoreText.width/2, rankText.y);
		this.addChildToContainer(scoreText);


		//下面玩家昵称
		let nickName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		nickName.setPosition(rankText.x , bottomBg.y+bottomBg.height/2 -5 -nickName.height-13);
		this.addChildToContainer(nickName);
		
		//排名
		let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		rankText2.setPosition(rankText.x ,nickName.y+nickName.height+5);
		this.addChildToContainer(rankText2);

		//玩家名字
		let name:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		name.setPosition(nickName.x + nickName.width +12 , nickName.y);
		this.addChildToContainer(name);

		// //描述
		// let atkracedes5 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
		// atkracedes5.x =250;
		// atkracedes5.y =GameConfig.stageHeigth -530;
		// this.addChild(atkracedes5);
		// atkracedes5.visible =this.isShowTextBoo;

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
		
		let rank:BaseTextField = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN_NEW);
		rank.setPosition(rankText2.x + rankText2.width + 12 , rankText2.y);
		this.addChildToContainer(rank);


		let socreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceScore")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		socreText.setPosition(rankText.x, rankText2.y+rankText2.height+5);
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
		let socre:BaseTextField = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN_NEW);
		socre.setPosition(socreText.x+socreText.width+5, rankText2.y+rankText2.height+5);
		this.addChildToContainer(socre);
		
	
    }
	
	protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_ATKRACE_RANK,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.ret&&data.data.data.rankArr[0])	
		{
			 
			this._infoList = data.data.data.rankArr;
			this._merank = data.data.data.myrankArr.prank;
			this._mepoint = data.data.data.myrankArr.point;
			// this.isShowTextBoo =false;
		}
		else
		{	
			// this.isShowTextBoo =true;
		
		}
	}
 


    public dispose():void
	{	
		this. _scrollList =null;
		this._infoList =null;
		this._merank  =0;
		super.dispose();
	}
}