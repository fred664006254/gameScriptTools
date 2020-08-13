class BuyMonthCardPopupView  extends PopupView
{
    public constructor() 
	{
		super();
	}

    protected getBgName():string
    {
         return "popupview_bg2";   
    }

    protected getTitleStr():string
	{
        return "itemUseConstPopupViewTitle";
    } 

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"popupview_bg2",
        ]);
    }
		

    public initView():void
    {
        NetManager.request(NetRequestConst.REQUEST_SHOP_SHOWMONTHCARDNOTICE,{});

        let descbg = BaseBitmap.create("public_9_bg8");
        descbg.width = 520;
        descbg.height = 120;
        descbg.setPosition(this.viewBg.width/2-descbg.width/2,55);
        this.addChildToContainer(descbg);

        let desc = ComponentManager.getTextField(LanguageManager.getlocal("buymonthcarddesc"),20,TextFieldConst.COLOR_BLACK);
        desc.width = descbg.width-60;
        desc.lineSpacing = 4;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        desc.setPosition(descbg.x+30,descbg.y+20);
        this.addChildToContainer(desc);


        let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);
		cancelBtn.setPosition(this.viewBg.x + 80, descbg.y + descbg.height + 12);
		this.addChildToContainer(cancelBtn);

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acChristmasConfirmPopupViewBtn", ()=>{
			ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD);
			this.hide();
		}, this);
		confirmBtn.setPosition(this.viewBg.x + this.viewBg.width - confirmBtn.width - 80, descbg.y + descbg.height + 12);
		this.addChildToContainer(confirmBtn);

    }

    public resetBgSize(){
        super.resetBgSize();
        this.titleTF.y = this.viewBg.y + 12;
        this.titleTF.setColor(0x3e1f0f);
    }

    protected getBgExtraHeight():number
	{
		return 20;
	}

    public dispose():void
	{	 
		super.dispose();
	}
}