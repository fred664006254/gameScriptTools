class AcAC2020AIDicePopupView extends PopupView 
{

    public constructor() {
		super();
	}

    private get aid(): string {
		return this.param.data.aid;
	}

	private get code(): string {
		return this.param.data.code;
	}

	private get uicode(): string {
		return this.param.data.uicode;
	}

    private get vo() : AcAnnualCelebration2020Vo{
        return <AcAnnualCelebration2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg() : Config.AcCfg.AnnualCelebration2020Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    protected getTitleStr(): string {
		return `acAC2020_ai_throw_title`;
	}

    protected getResourceList():string[]{
        let ret = super.getResourceList();
        ret = ret.concat([
            "annualcelebration_dicebg-1","annualcelebration_dicetitlebg-1",
        ]);
        return ret;
    }

    protected get uiType():string
	{
		return "2";
	}

    protected initView(): void 
    {   
        let topbg = BaseBitmap.create("annualcelebration_dicetitlebg-1");
        topbg.x = this.viewBg.width/2-topbg.width/2;
		this.addChildToContainer(topbg);

        let tipText = ComponentManager.getTextField(LanguageManager.getlocal("acAC2020_ai_throw_tips"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		tipText.y = 21;
        tipText.lineSpacing = 5;
        tipText.width = 500;
        tipText.x = this.viewBg.width/2-tipText.width/2;
		this.addChildToContainer(tipText);

        let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 530;
		itemBg.height = 480;
        itemBg.setPosition(this.viewBg.x+this.viewBg.width/2-itemBg.width/2,topbg.y+topbg.height+10);
		this.addChildToContainer(itemBg);

        let dicebg1 = BaseBitmap.create("annualcelebration_dicebg-1");
        dicebg1.setPosition(this.viewBg.x+this.viewBg.width/2-dicebg1.width/2,itemBg.y+3);
        this.addChildToContainer(dicebg1);

        let dicebg2 = BaseBitmap.create("annualcelebration_dicebg-1");
        dicebg2.setPosition(this.viewBg.x+this.viewBg.width/2-dicebg2.width/2,dicebg1.y+dicebg1.height+30);
        this.addChildToContainer(dicebg2);

        let curPos = this.vo.getCurMapId();
        let f:Function = this.param.data.confirmCallback;
        let o:any = this.param.data.handler;
        let view = this;
        for (let i=1 ; i<=6; i++)
        {
            let onedic = BaseLoadBitmap.create("acannualcelebration_aidice"+i);
            onedic.setPosition(this.viewBg.x+94+(i-1)%3*170, itemBg.y+52+Math.floor((i-1)/3)*232);
            this.addChildToContainer(onedic);
            onedic.addTouchTap(()=>{
                f.apply(o,[i]);
                view.hide();
            },this);

            let onePos = curPos+i;
            if (onePos>=25)
            {
                onePos-=24;
            }
            let unit = this.cfg.map[onePos];
            if (unit.buildingType)
            {   
                let jzhou = BaseBitmap.create(`public_9_bg87`);
                jzhou.y = onedic.y+135;
                this.addChildToContainer(jzhou);

                let name = LanguageManager.getlocal(`acEnjoyNightAward_${unit.buildingType}-1`);
                let arrive = ComponentManager.getTextField(LanguageManager.getlocal("acAC2020_ai_throw_arrive",[name]),18,TextFieldConst.COLOR_BLACK);
                jzhou.width = arrive.width+60;
                jzhou.x = onedic.x+50-jzhou.width/2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,arrive,jzhou);
                this.addChildToContainer(arrive);
            }
        }

    }

    protected getBgExtraHeight():number
	{
		return 20;
	}
}