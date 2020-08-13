class SettingPushPopupView  extends PopupView
{
    private _checkBoxes:CheckBox[] = [];

    public constructor() {
		super();
	}

    public initView():void
	{
        let bg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 520;
		bg.height = 300;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 25;
		this.addChildToContainer(bg);

        let pushArray:string[] = ["bookroom","child","dailyboss1","dailyboss2","rankActive"];
        
        let scrollContiner = new BaseDisplayObjectContainer();

		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,bg.width,bg.height);

		let scrollView = ComponentManager.getScrollView(scrollContiner,rect);
        scrollView.setPosition(bg.x,bg.y);
		this.addChildToContainer(scrollView);
        
        let puInfo:any = Api.otherInfoVoApi.getPushInfo();
        for (let i:number=0; i<pushArray.length; i++)
        {
            let cb:CheckBox = ComponentManager.getCheckBox(LanguageManager.getlocal("settingPush_"+pushArray[i]));
            cb.setPosition(50+GameData.popupviewOffsetX,20+i*50);
            cb.name = pushArray[i];
            scrollContiner.addChild(cb);
            this._checkBoxes.push(cb);

            if (puInfo[pushArray[i]]!=0)
            {
                cb.setSelected(true);
            }
        }

        let changeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"allianceInfoSave",this.saveHandler,this);
		changeBtn.x = this.viewBg.width/2 - changeBtn.width/2;
		changeBtn.y = bg.y + bg.height + 15;
		changeBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(changeBtn); 
    }

    private saveHandler():void
    {
        let pushinfo:any = {};
        for (let i:number=0; i<this._checkBoxes.length; i++)
        {   
            let cb = this._checkBoxes[i];
            let pk = cb.name;
            let value = cb.checkSelected()? 1 : 0;
            pushinfo[pk] = value;
        }
        NetManager.request(NetRequestConst.REQYEST_OTHERINFO_SETPUSHFLAG,{pushInfo:pushinfo});
        this.hide();
    }

    protected getBgExtraHeight():number
	{
		return 20;
	}

    public dispose()
    {
        this._checkBoxes.length = 0;
        super.dispose()
    }
}