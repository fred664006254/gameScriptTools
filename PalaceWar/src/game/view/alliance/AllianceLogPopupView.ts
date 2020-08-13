class AllianceLogPopupView extends PopupView
{
	public constructor() {
		super();
	}

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

        let infoList = Api.allianceVoApi.getExpLog();
		let infoArray:any[] = [];
		for (let i:number = infoList.length-1; i>=0; i--)
		{
			infoArray.push(infoList[i]);
		}


		infoArray.sort((a,b)=>{

			return b[2] - a[2];
		});
		
		let scrollList = ComponentManager.getScrollList(AllianceExpLogItem,infoArray,rect);
		this.addChildToContainer(scrollList);
		scrollList.setPosition(21 +GameData.popupviewOffsetX,10);

		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") )
    }

    protected getBgExtraHeight():number
	{
		return 5;
	}
}