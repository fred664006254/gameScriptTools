class PrestigeLogPopupView extends PopupView
{
	public constructor() {
		super();
	}

	protected getTitleStr():string
	{
		return "prestigeLog";
	}

	// 规则说明内容
	// protected getRuleInfo():string
	// {
	// 	return "prestigeRuleInfo";
	// }


	protected initView():void
	{
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,526,530);

		let maskBg:BaseBitmap = BaseBitmap.create("public_9_bg11");
		maskBg.height = rect.height;
		maskBg.width = rect.width;
		maskBg.setPosition(21+GameData.popupviewOffsetX ,10);
		this.addChildToContainer(maskBg);
		maskBg.alpha = 0;

		let infoList = Api.prestigeVoApi.getLog();
		// infoList = [{dtype:0 ,st:12334,v:888},{dtype:0 ,st:12334,v:888},{dtype:5 ,st:12334,v:888},{dtype:4 ,st:12334,v:888},{dtype:3 ,st:12334,v:888},{dtype:2 ,st:12334,v:888},{dtype:1 ,st:12334,v:888}];
		let infoArray:any[] = [];
		for (let i:number = infoList.length-1; i>=0; i--)
		{
			infoArray.push(infoList[i]);
		}
		
		let scrollList = ComponentManager.getScrollList(PrestigeLogPopupScollItem,infoArray,rect);
		this.addChildToContainer(scrollList);
		scrollList.setPosition(21+GameData.popupviewOffsetX ,10);

		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") )

	}

	protected getBgExtraHeight():number
	{
		return 10;
	}
	public dispose():void
	{
		super.dispose();
	}
}