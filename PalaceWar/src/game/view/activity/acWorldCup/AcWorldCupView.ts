/*
author : qianjun
desc : 世界杯活动
*/
class AcWorldCupView extends AcCommonView{
    public constructor(){
        super();
    }

    private _myPointsTxt : BaseTextField = null;
    private _acurFootballText: BaseTextField = null;
    private _activityTimerText: BaseTextField = null;
    private _activityDescText: BaseTextField = null;
    private _topBg : BaseBitmap = null;
    private _bottomBg : BaseBitmap = null;
    private _flower : BaseBitmap = null;
    private _pointsGroup : BaseDisplayObjectContainer = null;

    private public_dot1:BaseBitmap =null;
    private public_dot2:BaseBitmap =null;
    private public_dot3:BaseBitmap =null;
    private dayRatio : BaseLoadBitmap = null;
    private dayRatioBg : BaseLoadBitmap = null;

    private get cfg() : Config.AcCfg.WorldCupCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcWorldCupVo{
        return <AcWorldCupVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected getContainerY():number
	{
		return 0;
	}
    //
    public initView(){
        let view = this;
        view.width = GameConfig.stageWidth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WORLDCUP_FRESH_ITEM,this.update,this); 

        view._pointsGroup = new BaseDisplayObjectContainer();
        view._pointsGroup.setLayoutPosition(LayoutConst.leftbottom, view._pointsGroup, view, [40,37]);
        view.addChild(view._pointsGroup);

        let myPointsTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupVoteText2'), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, myPointsTxt, view._pointsGroup, [0,9], true);
        view._pointsGroup.addChild(myPointsTxt);
        view._myPointsTxt = myPointsTxt;

        let flower = BaseBitmap.create('worldcupfootball');
		view.setLayoutPosition(LayoutConst.leftverticalCenter, flower, myPointsTxt, [myPointsTxt.textWidth + 5,0]);
        view._pointsGroup.addChild(flower);
        view._flower = flower;
        
        let vo = view.vo;
        let havescore = vo.getCurPoints();
		let fTxt = ComponentManager.getTextField(havescore.toString(), 22, TextFieldConst.COLOR_BLACK);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, fTxt, flower, [flower.width + 10,0]);
		view._pointsGroup.addChild(fTxt);
        view._acurFootballText = fTxt;
        
        //top背景图
        let _topBg:BaseBitmap = BaseBitmap.create(`worldcuptopbg-${this.code}`);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, _topBg, view, [0,view.titleBg.height]);
        view._topBg = _topBg;
        view.addChild(_topBg);
        view.swapChildren(view.closeBtn, _topBg);

        let _descBg:BaseBitmap = BaseBitmap.create(`acturntabletop_descbg`);
        _descBg.width = 476;
        _descBg.height = 124;
        view.setLayoutPosition(LayoutConst.rightbottom, _descBg, _topBg, [5,5]);
        view.addChild(_descBg);
        
        let period = view.vo.getCurPeriod();
        let dayRatioBg : BaseLoadBitmap = BaseLoadBitmap.create(`worldcuptopdesc-${period}`);
        view.setLayoutPosition(LayoutConst.lefttop, dayRatioBg, _descBg, [50, -55]);
        view.addChild(dayRatioBg);
        view.dayRatioBg = dayRatioBg;

        let today = Math.min(vo.getCurDay(), view.cfg.odds.length);
        let dayRatio : BaseLoadBitmap = BaseLoadBitmap.create(`worldcupratio${today}`);
        dayRatio.height = 38;
        view.setLayoutPosition(LayoutConst.lefttop, dayRatio, _descBg, [300, -52]);
        view.addChild(dayRatio);
        dayRatio.visible = period == 1;
        view.dayRatio = dayRatio;

        let btn = ComponentManager.getButton('worldcupckan', '', view.ckanclick, view);
        view.setLayoutPosition(LayoutConst.righttop, btn, _descBg, [10,-btn.height-5]);
        view.addChild(btn);
        //活动时间   
        view._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTime`,[vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
	 	view.setLayoutPosition(LayoutConst.lefttop, view._activityTimerText, _descBg, [15,10]);
        view.addChild(view._activityTimerText);

        //活动描述
        view._activityDescText = ComponentManager.getTextField(LanguageManager.getlocal(`AcWorldCupRuleInfo-${this.code}`), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        view._activityDescText.width = 456; 
        view._activityDescText.lineSpacing = 6;
        view.setLayoutPosition(LayoutConst.lefttop, view._activityDescText, view._activityTimerText, [0,6+view._activityTimerText.textHeight]);
        view.addChild(view._activityDescText);

        //targroup
        view.setLayoutPosition(LayoutConst.lefttop, view.tabbarGroup, _topBg, [15,_topBg.height + 4]);
        //bottombg
        let _bottomBg:BaseBitmap = BaseBitmap.create(`servant_bottombg`);
        _bottomBg.height = GameConfig.stageHeigth - view.tabbarGroup.y + 20;
        view._bottomBg = _bottomBg;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, _bottomBg, view, [0,_topBg.y + _topBg.height]);
        _bottomBg.x = 0;
        view.addChild(_bottomBg);
        view.swapChildren(view.tabbarGroup, _bottomBg);

        view.container.width = _bottomBg.width;
        view.container.height = _bottomBg.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.container, view, [0,view.tabbarGroup.y + view.tabbarGroup.height + 13]);
        //红点1
        let public_dot1 =BaseBitmap.create("public_dot2");
        this.addChild(public_dot1); ;
        public_dot1.x = this.tabbarGroup.getChildAt(0).x + this.tabbarGroup.getChildAt(0).width-5;
        public_dot1.y = this.tabbarGroup.y; 
		this.public_dot1 = public_dot1;

        //红点2
        let public_dot2 =BaseBitmap.create("public_dot2");
        this.addChild(public_dot2); ;
        public_dot2.x = this.tabbarGroup.getChildAt(1).x + this.tabbarGroup.getChildAt(1).width-5;
        public_dot2.y = this.tabbarGroup.y; 
		this.public_dot2 = public_dot2;

         //红点3
        let public_dot3 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot3); ;
        public_dot3.x = this.tabbarGroup.getChildAt(2).x + this.tabbarGroup.getChildAt(2).width-5;
        public_dot3.y = this.tabbarGroup.y; 
        this.public_dot3 = public_dot3; 
        this.update();
    }

    protected getRuleInfo() : string{
        return `AcWorldCupRule`
    }

    private ckanclick():void{
        let view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWORLDCUPRATIOVIEW,{
            aid : this.aid,
            code :this.code
        });
    }

    protected clickTabbarHandler(data:any):void
	{    
        let view = this;
        super.clickTabbarHandler(data);
        let tabView : any = view.getSelectedTab();
        tabView.x = 0;
        view._myPointsTxt.visible = view._flower.visible = view._acurFootballText.visible = (data.index != 1);
        view.swapChildren(view._pointsGroup, view.tabViewData[data.index]);
    } 
    
    protected getTabbarTextArr():Array<string>
	{
		return [`AcWorldCupViewTab1_1`, 
                `AcWorldCupViewTab2_1`,
                `AcWorldCupViewTab3_1`,
		];
	}
 
    protected getTitleStr():string
	{
		return "acWorldCup-1ViewTitle";
    } 
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "CHE","PRT","SAU","EGY","CRI","MEX","SRB","MAR","RUS","HRV","POL","JPN","DEU","NGA","GBR","SEN","BRA","AUS","URY","TUN","KOR","PAN","COL","BEL","FRA","SWE","ISL","DNK","IRN","PER","ESP","ARG",
            "worldcupchampbg","worldcupchamphead","worldcupckan_down","worldcupckan","worldcupfootball","worldcupin_1","worldcupin_2","worldcupin_3","worldcupline","worldcupratio1","worldcupratio2","worldcupratio3","worldcupratio4","worldcupratio5","worldcupratio6","worldcupratio7","worldcuptopbg-1","worldcuptopdesc-1",
            "acturntabletop_descbg","dragonboattarbg","shopview_corner","shopview_line","servant_bottombg",
            "worldcuptopdesc-2","worldcuptopdesc-3"
        ]);
    }
    
    public get tabHeight():number{
        let view = this;
        return view._bottomBg.height;
    }

    public get tabWidth():number{
        let view = this;
        return view.width;
    }

    private update(): void{
         //第一页 红点
        let vo = this.vo;
        if(!vo)
        {
            return;
        }	
         if(this.public_dot1)
         {
             this.public_dot1.visible = vo.getpublicRedhot1();
         }
         //第二页 红点
         if(this.public_dot2)
         {
              this.public_dot2.visible =  vo.getpublicRedhot2();
         }    
 
         //第三页 红点
         if(this.public_dot3)
         {
              this.public_dot3.visible =  vo.getpublicRedhot3();
         }    
         let view = this;
         view._acurFootballText.text = view.vo.getCurPoints().toString();
         let today = Math.min(vo.getCurDay(), view.cfg.odds.length);
         let period = view.vo.getCurPeriod();
         view.dayRatio.visible = period == 1;
         view.dayRatioBg.setload(`worldcuptopdesc-${period}`);
         view.dayRatio.setload(`worldcupratio${today}`);
         if(period == 4){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            view.hide();
         }
    }
    
    public dispose():void
	{   
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WORLDCUP_FRESH_ITEM,this.update,this); 
        let view = this;
        
        view._activityDescText = view._activityTimerText = null;
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        view._myPointsTxt = null;
        view._acurFootballText = null;
        view._topBg = null;
        view._flower = null;
        view._pointsGroup.removeChildren();
        view._pointsGroup = null;
        BaseLoadBitmap.release(view.dayRatioBg);
        view.dayRatioBg = null;
        BaseLoadBitmap.release(view.dayRatio);
        view.dayRatio = null;
        super.dispose();
    }
}

/** 
阿根廷 ARG
澳大利亚 AUS
比利时 BEL
巴西 BRA
瑞士 CHE
哥伦比亚 COL
哥斯达黎加 CRI
德国 DEU
丹麦 DNK
埃及 EGY
西班牙 ESP
法国 FRA
英国 GBR
克罗地亚 HRV
伊朗 IRN
冰岛 ISL
日本 JPN
韩国 KOR
摩洛哥 MAR
墨西哥 MEX
尼日利亚 NGA
巴拿马 PAN
波兰 POL
葡萄牙 PRT
俄罗斯 RUS
沙特 SAU
塞内加尔 SEN
塞尔维亚 SRB
瑞典 SWE
突尼斯 TUN
乌拉圭 URY
秘鲁 PER
*/