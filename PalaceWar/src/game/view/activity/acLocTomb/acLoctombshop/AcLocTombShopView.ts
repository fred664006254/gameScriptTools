/**
 * author:qianjun
 * desc:活动商店
*/
class AcLocTombShopView extends PopupView{

    private _gemGroup : BaseDisplayObjectContainer = null;
    private _gemTxt : BaseTextField = null;
    private _pointTxt : BaseTextField = null;

	public constructor() {
		super();
	}
	
	private get cfg() : Config.AcCfg.LocTombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLocTombVo{
        return <AcLocTombVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
    }

	
	protected getTabbarTextArr():Array<string>{
		return [
			"acwipeBossShopTab1",
			"acwipeBossShopTab2",
		];
	}
	protected getResourceList():string[]{
		return super.getResourceList().concat([
			"wifeview_bottombg",
            "servant_topnumbg"
		]);
    }
    
    protected clickTabbarHandler(data):void{
        let view = this;
        super.clickTabbarHandler(data);
        view._gemGroup.visible = data.index == 0;
        view._pointTxt.visible = !view._gemGroup.visible
    }

	protected initView():void{	
        let view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LOCTOMB_REFRESH,view.freshView,view);
        let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 526;
		Bg.height = 526;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view.viewBg, [0,55]);
        view.addChildToContainer(Bg);
        
        let gemGroup = new BaseDisplayObjectContainer();
		gemGroup.width = 150;
		gemGroup.height = 35;
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, gemGroup, view.container, [15,15], true);
		view.addChildToContainer(gemGroup);
		view._gemGroup = gemGroup;

        let servantNumBg = BaseBitmap.create("public_9_resbg");
        // servantNumBg.width = 130;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servantNumBg, gemGroup, [0,0], true);
		gemGroup.addChild(servantNumBg);

        let gemIcon = BaseBitmap.create("public_icon1");
		gemIcon.scaleX = 45/gemIcon.width;
        gemIcon.scaleY = 45/gemIcon.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemIcon, servantNumBg, [0,0]);
		gemGroup.addChild(gemIcon);

		let gemTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(),TextFieldConst.FONTSIZE_TITLE_SMALL);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemTxt, servantNumBg, [gemIcon.width * gemIcon.scaleX, 0]);
        gemGroup.addChild(gemTxt); 
        view._gemTxt = gemTxt;

        let pointTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossPoint', [App.StringUtil.changeIntToText(view.vo.getActPoints())]),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
        pointTxt.visible = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, pointTxt, view.container, [-10,25], true);
        view.addChildToContainer(pointTxt);
        view._pointTxt = pointTxt;
        
        if(view.vo.getpublicRedhot2()){
			view.tabbarGroup.addRedPoint(1);
		}
		else{
			view.tabbarGroup.removeRedPoint(1);
		}

    }

    protected getShowWidth():number{
		return 570;
    }

	protected getShowHeight():number{
		return 692;
    }
    
    public freshView():void{
        let view = this;
        if(view.vo.getpublicRedhot2()){
			view.tabbarGroup.addRedPoint(1);
		}
		else{
			view.tabbarGroup.removeRedPoint(1);
		}
        view._gemTxt.text = Api.playerVoApi.getPlayerGemStr();
        //App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._gemTxt, servantNumBg, [gemIcon.width * gemIcon.scaleX, 0]);

        view._pointTxt.text = LanguageManager.getlocal('acwipeBossPoint', [App.StringUtil.changeIntToText(view.vo.getActPoints())]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._pointTxt, view.container, [-10,25], true);
    }

    protected getTitleStr():string{
        return 'acwipeBossShop';
    }

	public dispose():void{
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LOCTOMB_REFRESH,view.freshView,view);
        view._gemGroup.dispose();
        view._gemGroup = null;
        view._gemTxt = null;
        view._pointTxt = null;
		super.dispose();
	}
}