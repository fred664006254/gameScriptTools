/**
 * 离线消息弹版
 * author shaoliang
 * date 2017/11/2
 * @class DinnerMessagePopupView
 */

class DinnerMessagePopupView extends PopupView
{
	protected _scrollList:ScrollList;
	public constructor() {
		super();
	}

	protected initView():void
	{
		let myInfo:any[] = this.param.data.info;
		let totalGuset:number = 0;
		let bagGust:number = 0;
		let totalScore:number = 0;
		for (let k in myInfo) 
		{
			let info:any = myInfo[k];
			let dinnerCfg = Config.DinnerCfg.getGoToFeastItemCfg(info.dtype);
			if (dinnerCfg.getPoint < 0) {
				bagGust+=1;
			}
			totalScore+= dinnerCfg.getPoint;
			totalGuset+=1;
		}
		let titleStr:string = "";
		if (totalScore >= 0) {
			titleStr = LanguageManager.getlocal("dinnerMessage1",[totalGuset.toString(),bagGust.toString(),totalScore.toString()]);
		}
		else {
			titleStr = LanguageManager.getlocal("dinnerMessage2",[totalGuset.toString(),bagGust.toString(),totalScore.toString()]);
		}

		let typeBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		typeBg.width = 526;
		typeBg.height = 426;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 12);
		this.addChildToContainer(typeBg);

		let titleText:BaseTextField = ComponentManager.getTextField(titleStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText.width = this.viewBg.width - 104;
		titleText.lineSpacing = 6;
		titleText.setPosition(52 , 14 + typeBg.y);
		this.addChildToContainer(titleText);

		let rankBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 498;
		rankBg.height = 340;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, typeBg.y + 69);
		this.addChildToContainer(rankBg);

		let titleBg:BaseBitmap = BaseBitmap.create("dinner_rank_titlebg");
		titleBg.width = rankBg.width;
		titleBg.height = 36;
		titleBg.setPosition(rankBg.x , rankBg.y);
		this.addChildToContainer(titleBg);

		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerPlayerName"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameText.setPosition(120 , titleBg.y + titleBg.height/2 - nameText.height/2);
		this.addChildToContainer(nameText);

		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("playerScore"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		scoreText.setPosition(370 , nameText.y);
		this.addChildToContainer(scoreText);

		
		let scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width,rankBg.height -titleBg.height - 8);
		this._scrollList  = ComponentManager.getScrollList(DinnerMessageItem,myInfo,scroRect);
		this._scrollList.x = titleBg.x;
		this._scrollList.y = titleBg.y + titleBg.height;
		this.addChildToContainer(this._scrollList);

	}

	public dispose():void
	{
		 this._scrollList = null;
		super.dispose();
	}
}