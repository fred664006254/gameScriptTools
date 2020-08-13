/**
 * 世界杯投票活动查看赔率
 * author 钱竣
 */
class AcWorldCupRatioView extends PopupView
{
	public constructor() 
	{
		super();
	}
	private get cfg() : Config.AcCfg.WorldCupCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcWorldCupVo{
        return <AcWorldCupVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.param.data.code}`;
	}
	
	protected getTitleStr() : string{
		return 'AcWorldCupRatioTitle3';
	}

	protected resetBgSize() : void{
		if (this.getBgName() != "public_rule_bg") {
			this.closeBtn.y = this.viewBg.y - 15;
			this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 15);
		}
		else {
			this.closeBtn.y = this.viewBg.y - 18;
			this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
		}
	}

	protected initView():void
	{
		let view = this;
		view.viewBg.height = 550;
		
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0,24]);

		let kuang : BaseBitmap = BaseBitmap.create("public_9_bg4");
		kuang.width = 518;
		kuang.height = 454;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, view.viewBg, [0,70]);
		view.addChild(kuang);

		let bg : BaseBitmap = BaseBitmap.create("public_9_bg44");
		bg.width = 498;
		bg.height = 430;
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, kuang);
		view.addChild(bg);
		
		let titleBg:BaseBitmap = BaseBitmap.create("public_9_bg37");
        titleBg.width = bg.width;
        titleBg.height = 30;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, titleBg, bg);
		view.addChild(titleBg);
		
		let desc = (titleBg.width - 2 * 24 * 2) / 3;
		let posArr = [];
        for(let i = 1; i < 3; ++i){
            var guessTxtTitle = ComponentManager.getTextField(LanguageManager.getlocal(`AcWorldCupRatioTitle${i}`), 24, TextFieldConst.COLOR_QUALITY_WHITE);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, guessTxtTitle, titleBg, [desc * i + 48 * (i - 1),0]);
            posArr.push(guessTxtTitle.x);
            view.addChild(guessTxtTitle);
		}
		
		let arr = [];
        for(let i in view.cfg.odds){
            let unit = view.cfg.odds[i];
            arr.push({
                'day' : Number(i) + 1,
				'ratio' : unit,
				'pos_arr' : posArr
            });
        }
        let tmpRect =  new egret.Rectangle(0,30,430,380);
		let scrollList = ComponentManager.getScrollList(AcWorldCupGuessRatioItem, arr, tmpRect, this.param.data.code);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, titleBg, [0, titleBg.height]);
		view.addChild(scrollList); 
	}

	public dispose():void
	{
		super.dispose();
	}
}