class ServantExileBuffChooseItem extends ScrollListItem
{
	private _itemparam:any = null;
    private _sid:string = null;
	private _needCost:boolean = false;
	public constructor() {
		super();
	}

    protected initItem(index:number,sid:any,itemparam)
    {
		this._sid = sid[0];
		let type:number = sid[1];
		this._needCost = sid[2];
		this._itemparam = itemparam;

        let data = Api.servantVoApi.getServantObj(this._sid);

        let bg = BaseBitmap.create("public_popupscrollitembg");
        bg.width = 510;
        bg.height = 136;
        this.addChild(bg);

        let scaleVale = 108 / 184;
		let iconBgBt: BaseBitmap = BaseLoadBitmap.create(data.qualityBoxImgPathNew);
		iconBgBt.width = 184;
		iconBgBt.height = 184;
		iconBgBt.setScale(scaleVale);
		iconBgBt.setPosition(bg.x + 16, bg.y + bg.height / 2 - iconBgBt.height / 2 * scaleVale);
		this.addChild(iconBgBt);

        let iconBt: BaseBitmap = BaseLoadBitmap.create(data.halfImgPath);
		iconBt.width = 180;
		iconBt.height = 177;
		iconBt.setScale(scaleVale);
		iconBt.setPosition(iconBgBt.x + iconBgBt.width / 2 * scaleVale - iconBt.width / 2 * scaleVale, iconBgBt.y + iconBgBt.height / 2 * scaleVale - iconBt.height / 2 * scaleVale);
		this.addChild(iconBt);

		let itemNameBg:BaseBitmap = BaseBitmap.create("public_titlebg");
		itemNameBg.x = iconBgBt.x + 115;
		itemNameBg.y = iconBgBt.y;
		this.addChild(itemNameBg);

        let servantNameTxt = ComponentManager.getTextField(data.servantName, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		servantNameTxt.setPosition(itemNameBg.x + 15, itemNameBg.y + itemNameBg.height/2-servantNameTxt.height/2);
		this.addChild(servantNameTxt);

		let servantLevelTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantExileSelectServantPopupViewServantLevel", [String(data.level)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		servantLevelTxt.setPosition(itemNameBg.x, servantNameTxt.y + servantNameTxt.height + 13);
		this.addChild(servantLevelTxt);

		let servantSpecialityTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantExileSelectServantPopupViewServantPower", [String(data.total)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		servantSpecialityTxt.setPosition(itemNameBg.x, servantLevelTxt.y + servantLevelTxt.height + 3);
		this.addChild(servantSpecialityTxt);

		let servantFightTxt = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_servant_total", [String(data.getTotalBookValue())]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		servantFightTxt.setPosition(itemNameBg.x, servantSpecialityTxt.y + servantSpecialityTxt.height + 2);
		this.addChild(servantFightTxt);

		
		if (type != 2)
		{
			let tispstr:string = LanguageManager.getlocal("exileBuff_choosetype"+type);
			let tiptext = ComponentManager.getTextField(tispstr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
			tiptext.setPosition(bg.x + bg.width - tiptext.width/2 - 80, bg.y + bg.height / 2 );
			this.addChild(tiptext);
		}
		else 
		{
			let useServantBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "adultChoose", this.useServantClick, this);
			useServantBtn.setPosition(bg.x + bg.width - useServantBtn.width - 15, bg.y + bg.height / 2 );
			this.addChild(useServantBtn);

			if (sid[2])
			{
				let goldIcon = BaseLoadBitmap.create("itemicon1");
				goldIcon.width = 50;
				goldIcon.height = 50;
				goldIcon.x = useServantBtn.x +20 ;
				goldIcon.y = bg.y + bg.height / 2 - goldIcon.height -2;
				this.addChild(goldIcon);

				let coststr = LanguageManager.getlocal("acChristmasViewUseNum",[String(Config.ExileCfg.changeBuffCost)]);
				let tiptext = ComponentManager.getTextField(coststr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
				tiptext.setPosition(goldIcon.x + goldIcon.width, goldIcon.y + goldIcon.height / 2  - tiptext.height/2);
				this.addChild(tiptext);
			}
		}
    }

    private useServantClick():void
    {	
		let cfg = Config.ServantCfg.getServantItemById(this._sid);
		if (this._needCost)
		{
			let needgem = Config.ExileCfg.changeBuffCost;
			if (needgem > Api.playerVoApi.getPlayerGem())
			{	
				App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
				return;
			}

			let msg = LanguageManager.getlocal("exileBuff_change_tip2",[cfg.name,String(needgem)]);
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title:"itemUseConstPopupViewTitle",
                msg:msg,
                callback:this.useCallback,
                handler:this,
                needCancel:true
            });
		}
		else
		{
			let msg = LanguageManager.getlocal("exileBuff_change_tip1",[cfg.name]);
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title:"itemUseConstPopupViewTitle",
                msg:msg,
                callback:this.useCallback,
                handler:this,
                needCancel:true
            });
		}
    }

	private useCallback():void
	{
		let f:Function = this._itemparam.f;
        let o:any = this._itemparam.o;
        f.apply(o,[this._sid]);
	}

    public dispose():void
    {
        this._sid = null;
		this._itemparam = null;
		this._needCost = false;

        super.dispose();
    }
}