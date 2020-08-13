/**
 * author:qianjun
 * desc:港台美女冲榜活动
*/
class AcDraftView extends CommonView{
	private _enterBtn : BaseButton = null;

	public constructor() 
	{
		super();
	}

	public static AID:string = null;
	public static CODE:string = null;
	private get cfg() : Config.AcCfg.DraftConfig{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcDraftView.AID, AcDraftView.CODE);
    }

    private get vo() : AcDraftVo{
        return <AcDraftVo>Api.acVoApi.getActivityVoByAidAndCode(AcDraftView.AID, AcDraftView.CODE);
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"draftenterbg",
			"crossserverinti_enterin-1","crossserverinti_enterin-1_down",
			"public_9_wordbg2",
		]);
	}

	protected getBgName():string
	{
		return `draftenterbg`;
	}

	// protected getCloseBtnName():string
	// {
	// 	return ButtonConst.POPUP_CLOSE_BTN_1;
	// }
	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            //this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
			// 
            // this.viewBg.height = GameConfig.stageHeigth;
            // let mask = BaseLoadBitmap.create('empvsmask');
            // this.addChild(mask);
			// mask.width = GameConfig.stageWidth;
            // mask.height = GameConfig.stageHeigth;
		}
	}
    
	public initView():void
	{	
		let view = this;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, view.viewBg, view.titleBg, [0,this.titleBg.height]);
		// AcDraftView.AID = view.aid;
		// AcDraftView.CODE = view.code; 
		//底部
		let vo = view.vo;
		let bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.height = 179;
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
		//bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
		view.addChild(bottomBg);

		view._enterBtn = ComponentManager.getButton(`crossserverinti_enterin-1`, '', view.enterInHandler,this);
		//进入按钮
		//view._enterBtn.setPosition(GameConfig.stageWidth / 2 - 208 / 2, bottomBg.y - 179 - 5);
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._enterBtn, bottomBg, [0,bottomBg.height+10]);
		view.addChild(this._enterBtn);
		//活动时间
		let timeDesc : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", ['']), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		timeDesc.x = 10;
		timeDesc.y = bottomBg.y + 20;
		view.addChild(timeDesc);
		//规则描述
		let ruleDesc : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`draftRule-1`), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleDesc.width = GameConfig.stageWidth - 100;
		ruleDesc.lineSpacing = 6;
		ruleDesc.x = timeDesc.x;
		ruleDesc.y = timeDesc.y + timeDesc.textHeight + 5;
		view.addChild(ruleDesc);
	}

	protected getTitleStr():string{
		return 'AcDraftViewTitle';
	}


	private enterInHandler() : void{
		let view = this;
		ViewController.getInstance().openView(ViewConst.COMMON.ACDRAFTVOTEVIEW);
		// else{
		// 	App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime0`));
		// }
	}

	public dispose():void
	{
		let view = this;
		view._enterBtn.removeTouchTap();
		view._enterBtn = null;
		super.dispose();
	}
}