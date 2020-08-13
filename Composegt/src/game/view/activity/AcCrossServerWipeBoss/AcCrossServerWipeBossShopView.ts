/**
 * author:qianjun
 * desc:活动商店
*/
class AcCrossServerWipeBossShopView extends PopupView{

    private _gemGroup : BaseDisplayObjectContainer = null;
    private _gemTxt : BaseTextField = null;
    private _pointTxt : BaseTextField = null;

	public constructor() {
		super();
	}

    private get api() : CrossServerWipeBossVoApi{
        return Api.crossServerWipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerWipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerWipeBossVo{
        return <AcCrossServerWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }
    protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_WINTAB_OLD;
	}
	protected getTabbarTextArr():Array<string>{
		return [
			"accrossserverwipeBossShopTab1",
			"accrossserverwipeBossShopTab2",
		];
	}
	protected getResourceList():string[]{
		return super.getResourceList().concat([
			"wifeview_bottombg",
            "servant_topnumbg"
		]);
    }
    // protected setTabBarPosition():void
	// {
	// 	if(this.tabbarGroup)
	// 	{
	// 		let tabX:number=0;
	// 		let tabY:number=0;
	// 		if(egret.is(this,"PopupView"))
	// 		{
	// 			tabX=this.viewBg.x+30;
	// 			tabY=this.viewBg.y+60;
	// 		}
	// 		else
	// 		{
	// 			tabX=15;

    //             tabY=this.titleBg?this.titleBg.y+this.titleBg.height:92;

	// 		}
	// 		tabY+=this.getTabbarGroupY();;
	// 		this.tabbarGroup.setPosition(tabX,tabY);
	// 	}
	// }
    protected getTabbarGroupX():number
    {
        return 17;
    }
    protected getTabbarGroupY():number
    {
        return 60;
    }
    protected clickTabbarHandler(data):void{
        let view = this;
        super.clickTabbarHandler(data);
        view._gemGroup.visible = data.index == 0;
        view._pointTxt.visible = !view._gemGroup.visible
    }

	protected initView():void{	
        let view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH,view.freshView,view);
        let Bg = BaseBitmap.create("public_tc_bg01");
		Bg.width = 526;
		Bg.height = 610;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view.viewBg, [0,115]);
        view.addChildToContainer(Bg);


        this.tabbarGroup.setSpace(10);

		let txtBg = BaseBitmap.create("public_tc_bg02");
		txtBg.x = this.viewBg.width/2 - txtBg.width/2;
		txtBg.y = 15;
		this.addChildToContainer(txtBg);

        let gemGroup = new BaseDisplayObjectContainer();
		gemGroup.width = 150;
		gemGroup.height = 35;
        gemGroup.x = txtBg.x + txtBg.width/2 - gemGroup.width/2;
        gemGroup.y = txtBg.y + txtBg.height/2 - gemGroup.height/2;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, gemGroup, txtBg, [0,0], true);
		view.addChildToContainer(gemGroup);
		view._gemGroup = gemGroup;

        // let servantNumBg = BaseBitmap.create("public_9_resbg");
        // // servantNumBg.width = 130;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servantNumBg, gemGroup, [0,0], true);
		// gemGroup.addChild(servantNumBg);

        let gemIcon = BaseBitmap.create("public_icon1");
        gemIcon.x = 0;
        gemIcon.y = gemGroup.height / 2 - gemIcon.height/2;
		gemGroup.addChild(gemIcon);

		let gemTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        gemTxt.x = gemIcon.x + gemIcon.width + 10;
        gemTxt.y = gemGroup.height / 2 - gemTxt.height/2;
        gemGroup.addChild(gemTxt); 
        view._gemTxt = gemTxt;

        let pointTxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossPoint', [App.StringUtil.changeIntToText(view.vo.getActPoints())]),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        pointTxt.visible = false;
        pointTxt.x = this.viewBg.width/2 - pointTxt.width/2;
        pointTxt.y = txtBg.y + txtBg.height/2 - pointTxt.height/2;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointTxt, view.container, [0,25], true);
        view.addChildToContainer(pointTxt);
        view._pointTxt = pointTxt;
        
        if(view.vo.getpublicRedhot2()){
			view.tabbarGroup.addRedPoint(1,null,null,5,-3);
		}
		else{
			view.tabbarGroup.removeRedPoint(1);
		}

    }

    protected getShowWidth():number{
		return 570;
    }

	protected getShowHeight():number{
		return 820;
    }
    
    public freshView():void{
        let view = this;
        if(view.vo.getpublicRedhot2()){
			view.tabbarGroup.addRedPoint(1,null,null,5,-3);
		}
		else{
			view.tabbarGroup.removeRedPoint(1);
		}
        view._gemTxt.text = Api.playerVoApi.getPlayerGemStr();
        //App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._gemTxt, servantNumBg, [gemIcon.width * gemIcon.scaleX, 0]);

        view._pointTxt.text = LanguageManager.getlocal('accrossserverwipeBossPoint', [App.StringUtil.changeIntToText(view.vo.getActPoints())]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._pointTxt, view.container, [-10,25], true);
        view._pointTxt.x = this.viewBg.width/2 - view._pointTxt.width/2;
    }

    protected getTitleStr():string{
        return 'accrossserverwipeBossShop';
    }

	public dispose():void{
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH,view.freshView,view);
        view._gemGroup.dispose();
        view._gemGroup = null;
        view._gemTxt = null;
        view._pointTxt = null;
		super.dispose();
	}
}