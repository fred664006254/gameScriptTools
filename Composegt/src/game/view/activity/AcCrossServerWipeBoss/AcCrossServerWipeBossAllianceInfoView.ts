/**
 * author:qianjun
 * desc:帮会详情
*/
class AcCrossServerWipeBossAllianceInfoView extends PopupView{

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
		return ButtonConst.BTN_WINTAB;
	}
	protected getTabbarTextArr():Array<string>{
		return [
			"accrossserverwipeBossAllInfo1",
			"accrossserverwipeBossAllInfo2",
		];
	}
	protected getResourceList():string[]{
		return super.getResourceList().concat([
			"wifeview_bottombg",
            "servant_topnumbg",
            "accrossserverwipeboss_box1_icon",
            "accrossserverwipeboss_box2_icon",
            "accrossserverwipeboss_box3_icon",
            "accrossserverwipeboss_box1_2",
            "accrossserverwipeboss_box2_2",
            "accrossserverwipeboss_box3_2",
            "crossserverwipeboss1","crossserverwipeboss2","crossserverwipeboss3","crossserverwipeboss4","crossserverwipeboss5","crossserverwipeboss6","crossserverwipeboss7",

            "crossserverwipeboss1_icon","crossserverwipeboss2_icon","crossserverwipeboss3_icon","crossserverwipeboss4_icon","crossserverwipeboss5_icon","crossserverwipeboss6_icon","crossserverwipeboss7_icon",
		]);
    }
    
    protected clickTabbarHandler(data):void{
        let view = this;
        super.clickTabbarHandler(data);
        view._gemGroup.visible = data.index == 0;
    }

	protected initView():void{	
        let view = this;
        let Bg = BaseBitmap.create("public_tc_bg01");
		Bg.width = 528;
		Bg.height = 526;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view.viewBg, [0,55]);
        view.addChildToContainer(Bg);
        
        this.tabbarGroup.setSpace(10);

        let gemGroup = new BaseDisplayObjectContainer();
		gemGroup.width = 150;
		gemGroup.height = 35;
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, gemGroup, view.container, [0,15], true);
		view.addChildToContainer(gemGroup);
		view._gemGroup = gemGroup;

        // let servantNumBg = BaseBitmap.create("servant_topnumbg");
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servantNumBg, gemGroup, [0,0], true);
		// gemGroup.addChild(servantNumBg);

		let gemTxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossAllInfoNum', [view.api.getAllianceInfoNum().toString(), view.cfg.maxShare.toString()]),22,TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, gemTxt, gemGroup, [0,0], true);
        gemGroup.addChild(gemTxt); 
        view._gemTxt = gemTxt;

        
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossKillTip',[view.cfg.needKillNum.toString()]), 20, TextFieldConst.COLOR_BLACK);
        tipTxt.width = Bg.width - 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, Bg, [0, Bg.height + 10]);
        view.addChildToContainer(tipTxt); 
    }

    protected getShowWidth():number{
		return 570;
    }

	protected getShowHeight():number{
		return 780;
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_WIPEBOSS_ENEMY,requestData:{
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

        view._pointTxt.text = LanguageManager.getlocal('accrossserverwipeBossPoint', [view.vo.getActPoints().toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._pointTxt, view.container, [25,25], true);
    }

    protected getTitleStr():string{
        return 'accrossserverwipeBossAllInfoTitle';
    }
    protected getTabbarGroupX():number
    {
        return 17;
    }

	public dispose():void{
        let view = this;
        view._gemGroup = null;
        view._gemTxt = null;
        view._pointTxt = null;
		super.dispose();
	}
}