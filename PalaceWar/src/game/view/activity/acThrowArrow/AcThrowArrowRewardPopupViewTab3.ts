class AcThrowArrowRewardPopupViewTab3 extends AcCommonViewTab
{
    //滑动列表
	private _scrollList:ScrollList = null; 
    public constructor() 
	{
		super();
		this.initView();
	}

    private get cfg() : Config.AcCfg.ThrowArrowCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcThrowArrowVo{
        return <AcThrowArrowVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected initView():void
    { 
        let view = this;
		view.height = 620;
		view.width = 545;


        let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 530;
		Bg.height = 660;
        Bg.x = 25;
        Bg.y = 55;
        view.addChild(Bg);

        let titleBg = BaseBitmap.create("fourpeople_bottom");
		this.addChild(titleBg);
		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowPopupView_rewardTopTitle-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleBg.width = titleTF.width + 60;
		titleBg.setPosition(Bg.x + Bg.width / 2 - titleBg.width / 2, Bg.y + 10);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
		this.addChild(titleTF);

		let listArray = this.cfg.throwArrowPoolListItemCfgList;

		// for (let i = this.cfg.throwArrowPoolListItemCfgList.length; i>0; i--)
		// {
		// 	listArray.push(this.cfg.throwArrowPoolListItemCfgList[i-1]);
		// }
		

        let rect = new egret.Rectangle(0, 0, 520, Bg.height - titleBg.height - 22);
		let scrollList = ComponentManager.getScrollList(AcThrowArrowRewardScrollItem, listArray, rect, { aid: this.aid, code: this.code ,length:listArray.length});
		scrollList.setPosition(Bg.x + Bg.width / 2 - scrollList.width / 2, titleBg.y + titleBg.height + 5);
		scrollList.bounces = false;
		this.addChild(scrollList);
    }


    public dispose():void
	{	
		this._scrollList = null;

		super.dispose();
	}
}