/**
 * FQ游戏指引item
 * author 张朝阳
 * date 2018/7/23
 * @class FqStrategyViewScollItem1
 */
class FqStrategyViewScollItem1 extends ScrollListItem {
	private _data:any = null;
	public constructor() {
		super();
	}
	protected initItem(index:number,data:any)
	{
		let titleBg =App.CommonUtil.getContainerByLeftHalfRes("fqstrategyview_titlebg");
		if(data.open == null)
		{
			data['open'] = 1;
		}
		this.addChild(titleBg);
		titleBg.addTouchTap(()=>{
			if(data.open == 1)
			{
				data.open = 0;
			}
			else
			{
				data.open = 1;
			}
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FQSTRATEGYVIEW_REFREASHITEM1);
		},this);
		// public_line3

		let lineBM = BaseBitmap.create("public_line3");
		lineBM.anchorOffsetX = lineBM.width / 2;
		lineBM.anchorOffsetY = lineBM.height / 2;
		// lineBM.setPosition(titleBg.x + titleBg.width / 2,titleBg.y + titleBg.height / 2);
		this.addChild(lineBM);

		let title = data.title;
		let titleTF = ComponentManager.getTextField(title,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2,titleBg.y + titleBg.height / 2 - titleTF.height / 2);
		this.addChild(titleTF);
		lineBM.width += titleTF.width;
		lineBM.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2,titleBg.y + titleBg.height / 2);

		if(data.open == 0)
		{
			return;
		}
		let textBg = BaseBitmap.create("public_9_managebg");
		textBg.width = 600;
		textBg.height = 142;
		textBg.setPosition(GameConfig.stageWidth / 2 - textBg.width / 2 - 4,titleBg.y + titleBg.height);
		this.addChild(textBg);

		let context = data.context;
		let textTF = ComponentManager.getTextField(context,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		textTF.width  = 570;
		textTF.lineSpacing = 3;
		textTF.setPosition(textBg.x + 15,textBg.y + 15);
		this.addChild(textTF);

		if(textTF.height + 30 > textBg.height)
		{
			textBg.height = textTF.height + 30;
		}
	}
	public dispose()
	{
		this._data = null;
		super.dispose();
	}
}