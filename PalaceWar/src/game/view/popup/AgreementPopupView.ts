
class AgreementPopupView  extends PopupView
{
    private _agreeBtn:BaseButton = null;
    private _callbackF:Function = null;
    private _obj:any = null;
    private _agreementName:string='';

    public constructor() {
		super();
	}

    protected getResourceList():string[]
	{
        let key:string = GameData.getLanguageKey("agreement");
        let agreementJson:string=key;
        if(!ResourceManager.hasRes(key))
        {
            agreementJson="cnagreement";
        }
        if(PlatformManager.checkIs3KSp()|| PlatformManager.checkIsXlySp())
        {
            agreementJson="cnagreement2";
        }
        this._agreementName=agreementJson;
		return super.getResourceList().concat([
                "public",agreementJson
        ]);
	}

    public initView():void
	{   

        if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
        let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 520;
		itemBg.height = 518;
        itemBg.setPosition(this.viewBg.width/2  - itemBg.width/2, 20);
		this.addChildToContainer(itemBg);

        let scrollContiner:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0, itemBg.width, itemBg.height-20);

		let scrollView = ComponentManager.getScrollView(scrollContiner,rect);
        scrollView.setPosition(itemBg.x,itemBg.y+10);
		this.addChildToContainer(scrollView);
        let strTab:string[] = ResourceManager.getRes(this._agreementName)||[];

        let posY:number = 5;
        for (let i:number = 0; i<strTab.length; i++)
        {
            let agreementText:BaseTextField = ComponentManager.getTextField(strTab[i],TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
            agreementText.x = 20;
            agreementText.y = posY;
            agreementText.width = itemBg.width-40;
            agreementText.lineSpacing = 6;
            scrollContiner.addChild(agreementText);

            posY+=agreementText.height+6;
        }
        
        this._agreeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm",this.doAgree,this);
        this._agreeBtn.setPosition(this.viewBg.width/2-this._agreeBtn.width/2,itemBg.y+itemBg.height+10);
        this.addChildToContainer(this._agreeBtn);

        if (!this._obj)
        {
            this.closeBtn.visible = false;
        }
        else
        {
            this._agreeBtn.setText("friendsBtnTxt17");
        }
        
    }

    public hide():void
    {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"itemUseConstPopupViewTitle",
                msg:LanguageManager.getlocal("agreementCloseTip"),
				callback:this.realClose,
				handler:this,
				needCancel:true
			});
        
    }

    private realClose():void
    {
        super.hide();
    }

    private doAgree():void
    {   
        if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
        super.hide();
    }

    protected getBgExtraHeight():number
	{
		return 10;
	}

    public dispose()
    {
        this._agreeBtn = null;
        this._callbackF = null;
        this._obj = null;
        this._agreementName='';

        super.dispose()
    }
}