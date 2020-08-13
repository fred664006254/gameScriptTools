class GivejdpeasPopupView extends PopupView
{   
    public constructor() {
		super();
	}

    protected getResourceList():string[]
	{
		let resArray:string[] = ["givejdpeas_bg"];
		return super.getResourceList().concat(resArray);
	}

    protected initView():void
	{
        let bg:BaseBitmap = BaseBitmap.create("givejdpeas_bg");
        bg.x = 12;
        this.addChildToContainer(bg);
    }

    protected getBgExtraHeight():number
	{
		return 0;
	}
}