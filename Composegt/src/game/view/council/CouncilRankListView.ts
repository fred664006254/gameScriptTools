/**
 * 奖励排行榜
 */

class CouncilRankListView extends PopupView
{	
	private _scrollList:ScrollList;

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
			"atkracecross_rewatdbg3",
			"discussline",
        ]);
	}

	private get api() : CouncilVoApi{
		return Api.councilVoApi;
    }

    public initView():void
	{
		let view = this;
		let tipTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("councilRankListTip1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view.viewBg, [0,20]);
		view.addChildToContainer(tipTxt);

		let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		rankBg.width = 530;
		rankBg.height = 580;
		rankBg.setPosition(view.viewBg.width/2 - rankBg.width/2, tipTxt.y + tipTxt.textHeight + 10);
		view.addChildToContainer(rankBg);

		let rankBg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		rankBg2.width = rankBg.width - 20;
		rankBg2.height = rankBg.height - 20;
		rankBg2.setPosition(rankBg.x + 10, rankBg.y + 10);
		view.addChildToContainer(rankBg2);

		// let titleBg:BaseBitmap = BaseBitmap.create("public_9_bg41");
		// titleBg.width = rankBg.width;
		// titleBg.height = 36;
		// titleBg.setPosition(rankBg.x , rankBg.y);
		// this.addChildToContainer(titleBg);

		// let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		// view.setLayoutPosition(LayoutConst.leftverticalCenter, rankText, titleBg, [40,0]);
		// this.addChildToContainer(rankText);

		// //玩家奖励
		// let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("councilRankListParam1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		// view.setLayoutPosition(LayoutConst.leftverticalCenter, nameText, titleBg, [195,0]);
		// this.addChildToContainer(nameText); 
		
		// //每名门客奖励
		// let quText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("councilRankListParam2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		// view.setLayoutPosition(LayoutConst.rightverticalCenter, quText, titleBg, [40,0]);
		// this.addChildToContainer(quText); ;

		let arr = [];
		let temp = view.api.getArr('rankList');
		for(let i in temp){
			let unit : Config.CoucilRankItemCfg = temp[i];
			arr.push({
				exp : unit.exp,
				bookexp : unit.bookExp,
				maxRank : unit.maxRank,
				minRank : unit.minRank
			});
		}
		let scroRect = new egret.Rectangle(rankBg.x, rankBg.y, rankBg.width,rankBg2.height - 20);
		this._scrollList = ComponentManager.getScrollList(CouncilRewardRankItem,arr,scroRect);
		this._scrollList.x = rankBg2.x;
		this._scrollList.y = rankBg2.y+10;
		this.addChildToContainer(this._scrollList);
	}
	
	public getShowWidth():number{
		return 570;
	}

	public getShowHeight():number{
		return 740;
	}

    public dispose():void
	{	
		this._scrollList = null;
		super.dispose();
	}
}