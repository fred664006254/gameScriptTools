/**
 * 宴会排行榜
 * author shaoliang
 * date 2017/10/31
 * @class DinnerRankPopupView
 */

class DinnerRankPopupView extends PopupView
{

	private _scrollList:ScrollList;
	private _infoList:any[] = null;
	protected _scroRect:egret.Rectangle;
	private _merank:number = 0;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rank_line",
			"dinner_rankbg"
        ]);
	}
	

	protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_DINNER_TOP,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		this._infoList = data.data.data.dinnertop;
		this._merank = data.data.data.merank;
		
	}

	protected getBgExtraHeight():number
	{
		return 20;
	}

	protected initView():void
	{
		let tabName = ["dinnerRank"];

        // let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,null,null);
        // tabbarGroup.x = 40;
        // tabbarGroup.y = 10;
        // this.addChildToContainer(tabbarGroup);

		// let rankDescStr:string = "";
		// if(!this.shieldCn())
		// {
		// 	rankDescStr = LanguageManager.getlocal("dinnerRankDesc");
		// }
		// let rankDesc:BaseTextField = ComponentManager.getTextField(rankDescStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		// rankDesc.setPosition(this.viewBg.width - 40 - rankDesc.width, 22);
		// this.addChildToContainer(rankDesc);

		let rankBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 520;
		rankBg.height = 526;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, 20);
		this.addChildToContainer(rankBg);


		let titleBg:BaseBitmap = BaseBitmap.create("dinner_rank_titlebg");
		titleBg.width = rankBg.width;
		titleBg.height = 36;
		titleBg.setPosition(rankBg.x , rankBg.y);
		this.addChildToContainer(titleBg);

		this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width,rankBg.height -titleBg.height - 8);
		this._scrollList  = ComponentManager.getScrollList(DinnerRankItem,this._infoList,this._scroRect);
		this._scrollList.x = titleBg.x;
		this._scrollList.y = titleBg.y + titleBg.height;
		 this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceBossRank_emptyTip"));
		this.addChildToContainer(this._scrollList);

		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bottomBg.width = 516;
		bottomBg.height = 84;
		bottomBg.setPosition(this.viewBg.width/2  - bottomBg.width/2, rankBg.y + rankBg.height+8);
		this.addChildToContainer(bottomBg);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(65 +GameData.popupviewOffsetX, titleBg.y+titleBg.height/2 - rankText.height/2);
		this.addChildToContainer(rankText);

		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(200+GameData.popupviewOffsetX , rankText.y);
		this.addChildToContainer(nameText);

		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerScore"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(387+GameData.popupviewOffsetX , rankText.y);
		this.addChildToContainer(scoreText);

		let nickName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nickName.setPosition(rankText.x , bottomBg.y+bottomBg.height/2 -5 -nickName.height);
		this.addChildToContainer(nickName);

		let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		rankText2.setPosition(rankText.x , bottomBg.y+bottomBg.height/2 +5);
		this.addChildToContainer(rankText2);

		let name:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		name.setPosition(nickName.x + nickName.width +12 , nickName.y);
		this.addChildToContainer(name);

		let rankStr:string;
		if (this._merank>300) {
			rankStr = "10000+";
		}
		else {
			rankStr = this._merank.toString();
		}

		let rank:BaseTextField = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		rank.setPosition(rankText2.x + rankText2.width + 12 , rankText2.y);
		this.addChildToContainer(rank);

		let socre:BaseTextField = ComponentManager.getTextField(Api.dinnerVoApi.getTotalPoint().toString(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		socre.setPosition(bottomBg.x + bottomBg.width - 20 -  socre.width, rankText2.y);
		this.addChildToContainer(socre);
		
		let socreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("playerScore")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		socreText.setPosition(socre.x - 20 -  socreText.width, rankText2.y);
		this.addChildToContainer(socreText);
	}
	/**
	 * 需要屏蔽的cn字库
	 */
	private shieldCn():boolean
	{
		return PlatformManager.checkIsThSp();
	}
	public dispose():void
	{
		 this._scrollList = null;
		 this._scroRect = null;
		 this._infoList =null;
		 this._merank = 0;
		 

		super.dispose();
	}
}