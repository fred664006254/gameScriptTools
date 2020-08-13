/**
 * 跨服活动区服内排行榜
 */

class AcCrossRankListView extends PopupView
{	
	private _scrollList:ScrollList;
	private _infoList:any[] = null;
	protected _scroRect:egret.Rectangle;
	private atkracedes5:any =null;

    public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rankinglist_line",
			"rankinglist_rankbg",
			"rankinglist_rank1",
			"rankinglist_rank2",
			"rankinglist_rank3",
        ]);
	}
    public initView():void
	{
	
		// let tabName = ["atkraceRank"];

        // let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,null,null);
        // tabbarGroup.x = 40;
        // tabbarGroup.y = 10;
        // this.addChildToContainer(tabbarGroup);
		let rankBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 520;
		rankBg.height = 588;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, 10);
		this.addChildToContainer(rankBg);

		let titleBg:BaseBitmap = BaseBitmap.create("public_9_bg37");
		titleBg.width = rankBg.width;
		titleBg.height = 36;
		titleBg.setPosition(rankBg.x , rankBg.y);
		this.addChildToContainer(titleBg);

		this._infoList.forEach((unit)=>{
			unit.type = 'rank';
			unit.zid = this.param.data.zid;
		});
		this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width,rankBg.height -titleBg.height - 8);
		this._scrollList  = ComponentManager.getScrollList(AcCorssImacyPRankItem,this._infoList,this._scroRect);
		this._scrollList.x = titleBg.x;
		this._scrollList.y = titleBg.y + titleBg.height;
		this.addChildToContainer(this._scrollList);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		//排名
		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(65 , titleBg.y+titleBg.height/2 - rankText.height/2);
		this.addChildToContainer(rankText);

		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(160 , rankText.y);
		this.addChildToContainer(nameText); 

		//标题区服
		let quText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		quText.setPosition(300 , rankText.y);
		this.addChildToContainer(quText); 

		//擂台分数
		let score = '';
		switch(this.param.data.acid){
			case 'crossServerIntimacy':
				score = 'croessImacyScore-1';
				break;
			case 'crossServerPower':
				score = 'croessPowerScore-1';
				break;
			case 'crossServerAtkRace':
				score = 'atkraceScore';
				break;
		}
		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(score),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(407 , rankText.y);
		this.addChildToContainer(scoreText);
    }
	
	protected getRequestData():{requestType:string,requestData:any}
	{	
		let str = '';
		switch(this.param.data.acid){
			case 'crossServerIntimacy':
				str = NetRequestConst.REQUEST_ACTIVITY_IMACYRANK;
				break;
			case 'crossServerPower':
				str = NetRequestConst.REQUEST_ACTIVITY_POWERRANK;
				break;
			case 'crossServerAtkRace':
				str = NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK;
				break;
		}
		return {requestType:str,requestData:this.param.data};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		this._infoList = [];
		if(data.ret)	
		{
			for(let i in data.data.data.atkrank){
				this._infoList.push(data.data.data.atkrank[i]);
			}
			//this._infoList = data.data.data.atkrank;
		}
	}
 
    public dispose():void
	{	
		this. _scrollList =null;
		this._infoList =null;
		super.dispose();
	}
}