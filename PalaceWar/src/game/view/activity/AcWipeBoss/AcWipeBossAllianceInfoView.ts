/**
 * author:qianjun
 * desc:帮会详情
*/
class AcWipeBossAllianceInfoView extends PopupView{

    private _gemGroup : BaseDisplayObjectContainer = null;
    private _gemTxt : BaseTextField = null;
    private _pointTxt : BaseTextField = null;

	public constructor() {
		super();
	}

    private get api() : WipeBossVoApi{
        return Api.wipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.WipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcWipeBossVo{
        return <AcWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }
	
	protected getTabbarTextArr():Array<string>{
		return [
			"acwipeBossAllInfo1",
			"acwipeBossAllInfo2",
		];
	}
	protected getResourceList():string[]{
		return super.getResourceList().concat([
			"wifeview_bottombg",
            "servant_topnumbg",
            "wipeboss1","wipeboss2","wipeboss3","wipeboss4","wipeboss5","wipeboss6","wipeboss7",
            "wipeboss1_icon","wipeboss2_icon","wipeboss3_icon","wipeboss4_icon","wipeboss5_icon","wipeboss6_icon","wipeboss7_icon",
		]);
    }
    
    protected clickTabbarHandler(data):void{
        let view = this;
        super.clickTabbarHandler(data);
        view._gemGroup.visible = data.index == 0;
    }

	protected initView():void{	
        let view = this;
        let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 528;
		Bg.height = 526;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view.viewBg, [0,55]);
        view.addChildToContainer(Bg);
        
        let gemGroup = new BaseDisplayObjectContainer();
		gemGroup.width = 150;
		gemGroup.height = 35;
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, gemGroup, view.container, [15,15], true);
		view.addChildToContainer(gemGroup);
		view._gemGroup = gemGroup;

        let servantNumBg = BaseBitmap.create("servant_topnumbg");
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servantNumBg, gemGroup, [0,0], true);
		gemGroup.addChild(servantNumBg);

		let gemTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossAllInfoNum', [view.api.getAllianceInfoNum().toString(), view.cfg.maxShare.toString()]),TextFieldConst.FONTSIZE_TITLE_SMALL);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, gemTxt, gemGroup, [0,0], true);
        gemGroup.addChild(gemTxt); 
        view._gemTxt = gemTxt;

        
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossKillTip',[view.cfg.needKillNum.toString()]), 20, TextFieldConst.COLOR_BLACK);
        tipTxt.width = Bg.width - 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, Bg, [0, Bg.height + 10]);
        view.addChildToContainer(tipTxt); 
    }

    protected getShowWidth():number{
		return 570;
    }

	protected getShowHeight():number{
		return 754;
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSENEMY,requestData:{
			activeId : view.vo.aidAndCode,
		}};
    }
    
    private _data : any[] = [];
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        let view = this;
        view._data = [];
        if(data.data.data){
            view.api.setEnermyInfo(data.data.data);
        }
		//view.api.setBossNumInfo(data.data.data);
	}


    
    
    public freshView():void{
        let view = this;
        view._gemTxt.text = Api.playerVoApi.getPlayerGemStr();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._gemTxt, view._gemGroup);

        view._pointTxt.text = LanguageManager.getlocal('acwipeBossPoint', [view.vo.getActPoints().toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._pointTxt, view.container, [25,25], true);
    }

    protected getTitleStr():string{
        return 'acwipeBossAllInfoTitle';
    }

	public dispose():void{
        let view = this;
        view._gemGroup = null;
        view._gemTxt = null;
        view._pointTxt = null;
		super.dispose();
	}
}