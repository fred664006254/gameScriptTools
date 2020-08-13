class ItemViewTabItem extends BaseDisplayObjectContainer
{	

	public constructor() {
		super();
	}

    public initItem(key:string,upDown:number=1)
    {
		let wordsBg:BaseBitmap = BaseBitmap.create("itemtab_bg");
		this.addChild(wordsBg);

		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(key),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(wordsBg.width/2-nameText.width/2,wordsBg.height/2-nameText.height/2);
		this.addChild(nameText);

		let arrow :BaseBitmap = BaseBitmap.create("itemtab_arrow"+upDown);
		arrow.setPosition(526,wordsBg.height/2-arrow.height/2);
		this.addChild(arrow);
	}
	public dispose():void
	{
		super.dispose();
	}
}