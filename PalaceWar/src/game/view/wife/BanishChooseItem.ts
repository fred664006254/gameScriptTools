class BanishChooseItem  extends ScrollListItem
{

    private _callbackF:Function = null;
	private _obj:any = null;
    private _wifeId:string = null;

    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 518;
        bg.height=136
        this.addChild(bg);


        let wifeHead:BaseDisplayObjectContainer = Api.wifebanishVoApi.getWifeHead(data.wifeId);
        wifeHead.setPosition(16,bg.height/2-wifeHead.height/2);
        this.addChild(wifeHead);

        let wifecfg = Config.WifeCfg.getWifeCfgById(data.wifeId);
        let wifeName:BaseTextField = ComponentManager.getTextField(wifecfg.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		wifeName.setPosition(145,25);
        this.addChild(wifeName);

        let intimacy:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("banish_Intimacy",[String(data.intimacy)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		intimacy.setPosition(wifeName.x,wifeName.y+wifeName.height+10);
        this.addChild(intimacy);

        let charm:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("banish_charm",[String(data.charm)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		charm.setPosition(wifeName.x,intimacy.y+intimacy.height+10);
        this.addChild(charm);

        if (data.isBanishing)
        {
            let banishing:BaseBitmap = BaseBitmap.create("wife_banishing");
            banishing.setPosition(378,28);
            this.addChild(banishing);
        }
        else
        {   
            this._callbackF=data.f;
            this._obj=data.o;
            this._wifeId = data.wifeId;    

            let acceptBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"banishViewTitle",this.acceptHandle,this);
            acceptBtn.setPosition(350,bg.height/2-acceptBtn.height/2);
            this.addChild(acceptBtn);
            
        }
    }

    private acceptHandle():void
    {   
        let wifecfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        let acceptStr = LanguageManager.getlocal("banish_confirm_desc",[wifecfg.name,String(Config.BanishCfg.getExileTime2()),String(Config.BanishCfg.getUnitGem())]);

        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                "msg": acceptStr ,
                "needCancel":true,
                "title":"banish_confirm",
                "callback":this.acceptHandleCallback,
                "handler":this,
        });
    }

    private acceptHandleCallback():void
    {
        this._callbackF.apply(this._obj,[this._wifeId]);
    }

	public getSpaceY():number
	{
		return 3;
	}

    public dispose():void
	{
		this._callbackF=null;
		this._obj=null;
        this._wifeId = null;

		super.dispose();
	}
}