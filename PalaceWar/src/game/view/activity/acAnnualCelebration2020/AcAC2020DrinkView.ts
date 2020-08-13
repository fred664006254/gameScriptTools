class AcAC2020DrinkView extends PopupView 
{
     public constructor() {
		super();
	}

    protected getResourceList():string[]
    {	
        let guidePic:string[] = [];

        return guidePic.concat([
            "acac2020_drink_bg",
		]);
    }

    protected getCloseBtnName():string
	{
		return null;
	}

    protected getTitleStr():string
	{
		return null;
	}

    protected getTitleBgName():string
	{
		return null;
	}

    protected getBgName():string
	{	
		return "acac2020_drink_bg";
	}

    protected initView(): void 
    {

        egret.Tween.get(this.container).wait(1000).call(this.hide,this);
    }

    public hide(isDispose?:boolean):void
	{	
		let view = this;
		
		if (this.param.data.callBack)
        {
            this.param.data.callBack.apply(this.param.data.obj);
        }
		super.hide();
	}
}