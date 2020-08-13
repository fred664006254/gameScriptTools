/**
 * 标签1 游戏指引
 * author 张朝阳
 * date 2018/7/23
 * @class FqStrategyViewTab1
 */
class FqStrategyViewTab1 extends ViewTab {
	private _scrollList:ScrollList;
	private _textTF:BaseTextField;
	public constructor() {
		super();
		this.initView();
	}
	public initView()
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_FQSTRATEGYVIEW_REFREASHITEM1,this.refreshData,this);
		let bg = BaseBitmap.create("fqstrategyview_bg");
		bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2,10);
		this.addChild(bg);

		//165 50
		let arrowBM = BaseBitmap.create("public_arrow");
		arrowBM.setPosition(bg.x + 165,bg.y + 50);

		let textBg = BaseBitmap.create("public_9_bg25");
		textBg.width = 410;
		textBg.height = 120;
		textBg.setPosition(arrowBM.x + arrowBM.width - 3.5,bg.y + 10);
		this.addChild(textBg);
		this.addChild(arrowBM);

		this._textTF = ComponentManager.getTextField(GameData.fqGameStrategyData.intro,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		this._textTF.width = 390;
		this._textTF.lineSpacing = 3;
		this._textTF.setPosition(textBg.x + 15,textBg.y + 15);
		this.addChild(this._textTF);
		//多语言版本
		if(this._textTF.height + 30 > textBg.height)
		{
			textBg.height = this._textTF.height + 30;
		}
 
		let rect = new egret.Rectangle(0,0,635,GameConfig.stageHeigth - this.getViewTitleButtomY() - bg.height - 35);
		this._scrollList = ComponentManager.getScrollList(FqStrategyViewScollItem1,GameData.fqGameStrategyData.rcontent,rect);
		this._scrollList.setPosition(3,bg.y + bg.height + 10);
		this.addChild(this._scrollList);

	}
	private refreshData()
	{
		this._scrollList.refreshData(GameData.fqGameStrategyData.rcontent);
	}
	public dispose()
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FQSTRATEGYVIEW_REFREASHITEM1,this.refreshData,this);
		this._scrollList = null;
		this._textTF = null;
		super.dispose();
	}
}