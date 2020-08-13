/**
 * 宴会排行榜
 * author shaoliang
 * date 2017/10/31
 * @class DinnerRankPopupView
 */

class WifebattleRankPopupView extends PopupView
{

	private _scrollList:ScrollList;
	private _infoList:any[] = null;
	protected _scroRect:egret.Rectangle;
	private _merank:number = 0;
	private _mepoint:number=0;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rank_line",
			"dinner_rankbg",
			"rank_biao",
			"rank_1",
			"rank_2",
			"rank_3"
        ]);
	}
	

	protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_WIFEBATTLE_RANK,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		this._infoList = data.data.data.rankarr;
		this._merank = data.data.data.merank;
		this._mepoint = data.data.data.mepoint;
		
	}


	protected initView():void
	{
		// let tabName = ["dinnerRank"];

        // let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB,tabName,null,null);
        // tabbarGroup.x = 50;
        // tabbarGroup.y = 10;
        // this.addChildToContainer(tabbarGroup);

		// let rankDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerRankDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		// rankDesc.setPosition(this.viewBg.width - 40 - rankDesc.width, 22);
		// this.addChildToContainer(rankDesc);

		let outBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		outBg.width = 538;
		outBg.height = 521 + 84 + 30 + 50;
		outBg.setPosition(this.viewBg.width/2  - outBg.width/2, 10);
		// outBg.setPosition(this.viewBg.width/2  - outBg.width/2, tabbarGroup.y + tabbarGroup.height);
		this.addChildToContainer(outBg);

		let topBg= BaseBitmap.create("public_tc_bg03");
        topBg.width = outBg.width - 20 ;
        topBg.height = 521+ 50;
        topBg.x = this.viewBg.width/2 - topBg.width/2;
        topBg.y = outBg.y + 10;
        this.addChildToContainer(topBg);


		let titleBg:BaseBitmap = BaseBitmap.create("rank_biao");
		titleBg.width = outBg.width -20;
		titleBg.x = this.viewBg.width/2 - titleBg.width/2;
		titleBg.y = topBg.y + 12;
		this.addChildToContainer(titleBg);

		this._scroRect = new egret.Rectangle(0, 0, topBg.width,topBg.height - 12 - titleBg.height - 8);
		this._scrollList  = ComponentManager.getScrollList(WifebattleRankPopupScrollList,this._infoList,this._scroRect);
		this._scrollList.x = this.viewBg.width/2 - this._scrollList.width/2;
		this._scrollList.y = titleBg.y + titleBg.height + 5;
		this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceBossRank_emptyTip"),TextFieldConst.COLOR_BROWN);
		this.addChildToContainer(this._scrollList);

		let bottomBg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bottomBg.width = topBg.width;
		bottomBg.height = 84;
		bottomBg.x = this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = topBg.y + topBg.height + 10;
		
		this.addChildToContainer(bottomBg);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(100 , titleBg.y+titleBg.height/2 - rankText.height/2);
		this.addChildToContainer(rankText);

		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(225 , rankText.y);
		this.addChildToContainer(nameText);

		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleRankScore"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(400 , rankText.y);
		this.addChildToContainer(scoreText);

		let nickName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleRankBottomName",[Api.playerVoApi.getPlayerName()]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		nickName.setPosition(bottomBg.x+30 , bottomBg.y + 9);
		this.addChildToContainer(nickName);



		// let rankStr :string = null;
		// if(this._merank > 100){
		// 	rankStr = "100+";
		// } else {

		// }
		let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleRankBottomOrder",[String(this._merank)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		rankText2.setPosition(nickName.x , nickName.y + nickName.height +3);
		this.addChildToContainer(rankText2);



		// let rankStr:string;
		// if (this._merank>300) {
		// 	rankStr = "10000+";
		// }
		// else {
		// 	rankStr = this._merank.toString();
		// }


		
		let socreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleRankBottomScore",[String(this._mepoint)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		socreText.setPosition(nickName.x, rankText2.y + rankText2.height + 3);
		this.addChildToContainer(socreText);
	}

	public dispose():void
	{
		 this._scrollList = null;
		 this._scroRect = null;
		 this._infoList =null;
		 this._merank = 0;
		 this._mepoint = 0;

		super.dispose();
	}
}