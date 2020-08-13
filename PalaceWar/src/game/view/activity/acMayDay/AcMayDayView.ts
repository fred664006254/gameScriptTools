/*
author : qianjun
date : 2018.4.14
desc : 转盘活动
*/
class AcMayDayView extends AcCommonView{
    public constructor(){
        super();
    }

    private _nodeContainer:BaseDisplayObjectContainer;
    private _activityTimerText: BaseTextField = null;
    private _activityDescText: BaseTextField = null;
    private _topBg : BaseBitmap = null;
    private _topMan : BaseBitmap = null;
    private _topName : BaseBitmap = null;
    private _descBg : BaseBitmap = null;
    private _bottomBg : BaseBitmap = null;
    private public_dot1:BaseBitmap =null;
    private public_dot2:BaseBitmap =null;
    private public_dot3:BaseBitmap =null;

    private _skinEffectContainer:BaseDisplayObjectContainer = null;
    private _corner:BaseDisplayObjectContainer = null;
    
    private get cfg() : Config.AcCfg.MayDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcMayDayVo{
        return <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected getContainerY():number
	{
		return 0;
	}

    private get typeCode():string
    {
        let code = this.code;
        if(code == "5")
        {
            code ="3"
        }
        if(code == "6")
        {
            code ="4"
        }
        if(code == "8")
        {
            code ="4"
        }
        return code;

    }

    public initView(){

        let view = this;
        view.height = GameConfig.stageHeigth;
        view.width = GameConfig.stageWidth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 
        // AcMayDayView.AID = view.aid;
        // AcMayDayView.CODE = view.code; 
        view._nodeContainer = new BaseDisplayObjectContainer(); 
        view.addChildToContainer(view._nodeContainer);

        //最底部背景
        let bottomBg = BaseBitmap.create(Number(view.code) < 9 ? "servant_bottombg" : "dragonboattab1bg");
        bottomBg.width = GameConfig.stageWidth+16;
        
        if (Number(view.code) < 9)
        {
            bottomBg.x = -8; 
        }
        else
        {
            bottomBg.x = -10; 
        }
        bottomBg.y = -30; 
        bottomBg.height = GameConfig.stageHeigth - 60;
        view._nodeContainer.addChild(bottomBg); 
        view._bottomBg = bottomBg;
        //top背景图
        let topresName:string;
        if(Number(view.code) < 9){
            let _topBg:BaseBitmap = null;
            if(ResourceManager.getRes(`acturntable_top_bg1_${this.typeCode}`)){
                _topBg = BaseBitmap.create(`acturntable_top_bg1_${this.typeCode}`);
                topresName = `acturntable_top_bg1_${this.typeCode}`;
            }
            else{
                _topBg = BaseBitmap.create(`acturntable_top_bg1_1`);
                 topresName = `acturntable_top_bg1_1`;
            }
            _topBg.y = -241-4;
            _topBg.height +=6;
            view.addChildToContainer(_topBg);
            view._topBg = _topBg;
            //武将
            view._topMan = BaseBitmap.create((this.typeCode == '7' || this.typeCode == '1' || this.typeCode == '3') ? `acmaydayman1_1` : `acmaydayman1_${this.typeCode}`);//
            view._topMan.x = 0;
            view._topMan.y = (this.typeCode == '1' || this.typeCode == '3' || this.typeCode == '7')  ? -230 : -240;
            this.addChildToContainer(view._topMan);
            //武将名
            let _topName:BaseBitmap = null;
            if(ResourceManager.getRes(`acturntable_tab1_${this.typeCode}text`)){
                _topName = BaseBitmap.create(`acturntable_tab1_${this.typeCode}text`);
            }
            else{
                _topName = BaseBitmap.create(`acturntable_tab1_1text`);
            }
            _topName.x = GameConfig.stageWidth - 351 - 19;
            _topName.y = ((Number(this.typeCode) == 7 || Number(this.typeCode) == 1 || Number(this.typeCode) == 4 || Number(this.typeCode) == 3)) ? -245 : -210;
            this.addChildToContainer(_topName);
            this._topName = _topName;
            //descbg
            let descbg:BaseBitmap =  BaseBitmap.create("acturntabletop_descbg");
            descbg.width = Number(this.typeCode) == 1 || Number(this.typeCode) == 3 ? 456 : 440;
            descbg.x = GameConfig.stageWidth - descbg.width - 5;
            descbg.y = -150;
            descbg.height = 122;
            this.addChildToContainer(descbg);
            this._descBg = descbg;
            //活动时间   
            let vo = this.vo;
            let stTxt = App.DateUtil.getFormatBySecond(vo.st, 7);
            let etTxt = App.DateUtil.getFormatBySecond(vo.et - 86400 * 1, 7);
            view._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTime`,[vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
                view._activityTimerText.x = descbg.x + 20;
            view._activityTimerText.y = -140;
            view.addChildToContainer(view._activityTimerText);
            //活动描述
            let type = view.code == '8' ? '8' : view.typeCode;
            view._activityDescText = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTabDesc1_${type}`), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
            view._activityDescText.width = 456 - 24; 
            view._activityDescText.lineSpacing = 6;
            view._activityDescText.x = descbg.x + 15;
            view._activityDescText.y = -110;
            view.addChildToContainer(view._activityDescText);

            bottomBg.height = GameConfig.stageHeigth - view.tabbarGroup.y - 36 + 60;

            if (this.code == "1"||this.code == "7") {
                this._skinEffectContainer = new BaseDisplayObjectContainer();
                this.addChildToContainer(this._skinEffectContainer);
                let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                skinTxtEffect.setPosition(this._topBg.x + 93 - skinTxtEffectBM.width / 2, this._topBg.y + 200 - skinTxtEffectBM.height / 2);
                skinTxtEffect.blendMode = egret.BlendMode.ADD;
                this._skinEffectContainer.addChild(skinTxtEffect);
                skinTxtEffect.playWithTime(-1);

                let skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
                skinTxt.anchorOffsetX = skinTxt.width / 2;
                skinTxt.anchorOffsetY = skinTxt.height / 2;
                skinTxt.setPosition(this._topBg.x + 93, this._topBg.y + 200);
                this._skinEffectContainer.addChild(skinTxt);
                egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
                skinTxt.addTouchTap(() => {
                    let topMsg = LanguageManager.getlocal("acMayDayViewWifeSkinTopMsg-" + this.code);
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONWIFESKINREWARDPOPUPVIEW, { skinId: "2021", topMsg: topMsg });
                }, this);

                let skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
                skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
                skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
                skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
                this._skinEffectContainer.addChild(skinTxteffect);
                skinTxteffect.blendMode = egret.BlendMode.ADD;
                skinTxteffect.alpha = 0;
                egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
                this._skinEffectContainer.setVisible(false);

            }
            if (topresName == "acturntable_top_bg1_1"||  topresName == "acturntable_top_bg1_3" || topresName == "acturntable_top_bg1_4")
            {
                let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById("2015");
                if(servantCfg.quality2)
                {	
                    let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
                    cornerImg.x = 20;
                    cornerImg.y = 230;
                    cornerImg.setScale(1.3);
                    this.addChild(cornerImg);

                    this._corner = cornerImg;
                }
            }
                
            // }
        }
        else{
            let bg = BaseBitmap.create('public_9_bg8');
            bg.width = 610;
            bg.height = 35;
            view._nodeContainer.addChild(bg);
            //活动时间   
            let vo = this.vo;
            let stTxt = App.DateUtil.getFormatBySecond(vo.st, 7);
            let etTxt = App.DateUtil.getFormatBySecond(vo.et - 86400 * 1, 7);
            view._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTime2`,[vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
            view._nodeContainer.addChild(view._activityTimerText);

            view.tabbarGroup.y = 100-14;
            view.container.y = view.tabbarGroup.y + view.tabbarGroup.height;
            bottomBg.width = GameConfig.stageWidth;
            bottomBg.height = GameConfig.stageHeigth - view.container.y;

            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottomBg, view.container, [0,0], true);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._activityTimerText, bottomBg, [0,20]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, bottomBg, [0,15]);
            view._nodeContainer.x = 10;
            view._nodeContainer.y = 30;
        }
        //红点1
        let public_dot1 =BaseBitmap.create("public_dot2");
        this.addChild(public_dot1); ;
        public_dot1.x = this.tabbarGroup.getChildAt(0).x + this.tabbarGroup.getChildAt(0).width + 2;
        public_dot1.y = this.tabbarGroup.y + 10; 
		this.public_dot1 = public_dot1;

        //红点2
        let public_dot2 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot2); ;
        public_dot2.x = this.tabbarGroup.getChildAt(1).x + this.tabbarGroup.getChildAt(1).width + 2;
        public_dot2.y = this.tabbarGroup.y + 10; 
		this.public_dot2 = public_dot2;

         //红点3
        let public_dot3 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot3); ;
        public_dot3.x = this.tabbarGroup.getChildAt(2).x + this.tabbarGroup.getChildAt(2).width + 2;
        public_dot3.y = this.tabbarGroup.y + 10; 
        this.public_dot3 = public_dot3; 

        this.update();
    }

    protected clickTabbarHandler(data:any):void
	{    
        let view = this;
        super.clickTabbarHandler(data);
        if(Number(view.code) > 8){
            return;
        }
        let picNmae = Number(data.index) + 1;
        view._topName.visible = false;
        view._descBg.visible = view._topMan.visible = (picNmae == 1);
        if(ResourceManager.getRes(`acturntable_top_bg${picNmae}_${this.typeCode}`)){
            view._topBg.setRes(`acturntable_top_bg${picNmae}_${this.typeCode}`);
        }
        else{
            view._topBg.setRes(`acturntable_top_bg${picNmae}_1`);
        }
        let type = view.code == '8' ? '8' : view.typeCode;
        view._activityDescText.text =  LanguageManager.getlocal(`AcTurnTableViewTabDesc${picNmae}_${type}`);
        if(ResourceManager.getRes(`acturntable_tab${picNmae}_${this.typeCode}text`)){
            view._topName.setRes(`acturntable_tab${picNmae}_${this.typeCode}text`);
            view._topName.x = picNmae == 3 ? (GameConfig.stageWidth - 440) : (GameConfig.stageWidth - 351 - 19);
            if(Number(this.typeCode) == 7 || Number(this.typeCode) == 4 || Number(this.typeCode) == 3 || Number(this.typeCode) == 1){
                view._topName.y = picNmae == 1 ? -245 : -210;
            }
            else{
                view._topName.x = picNmae == 3 ? (GameConfig.stageWidth - 340) : (GameConfig.stageWidth - 351 - 19);
                view._topName.y = picNmae == 3 ? -230 : -210;
            }
            
            view._topName.visible = true;
            if(PlatformManager.checkIsThSp()){
                view._topName.x = 180;
            }
        }
        else{
            view._topName.setRes(`acturntable_tab${picNmae}_1text`);
            view._topName.x = picNmae == 3 ? (GameConfig.stageWidth - 440) : (GameConfig.stageWidth - 351 - 19);
            view._topName.y = picNmae == 1 ? -245 : -210;
            view._topName.visible = true;
        }
        view._activityTimerText.y = picNmae == 1 ? -140 : -150;
        view._activityDescText.y = picNmae == 1 ? -110 : -120;
        if (this._skinEffectContainer) {
            if (data.index == 0) {
                this._skinEffectContainer.setVisible(false);
            }
            else {
                this._skinEffectContainer.setVisible(true);
            }
        }

        if (data.index == 0) {
            if (this._corner )
            {
                this._corner.visible = true;
            }
        }
        else {
            if (this._corner )
            {
                this._corner.visible = false;
            }
        }
    } 
    
    protected getTabbarTextArr():Array<string>
	{
		return [`AcTurnTableViewTab1_${this.typeCode}`, 
                `AcTurnTableViewTab2_${this.typeCode}`,
                `AcTurnTableViewTab3_${this.typeCode}`
		];
	}
 
    protected getTabbarGroupY():number
	{
		return Number(this.code) > 8 ? 50 : 232-5;
    }
    
    protected getTitleButtomY():number
	{
		return 335;
	}

    protected getRuleInfo():string
	{
        let type = Number(this.code) > 8 ? this.code : this.typeCode;
        return "acMatDatRule" + type;
    } 
    
    protected getResourceList():string[]
	{
        let arr = [];
        if(Number(this.code) > 8){
            arr = [
                `acmaydaydiscount`,`acmaydayrank`,`acmaydaytab1bg_${this.code}`,`acturntable_bg_${this.code}`,`acturntable_point2`,`dragonboattab1bg`,'progress3','progress3_bg'
            ]
        }
        return super.getResourceList().concat([
            "activity_charge_red","shopview_corner","servant_bottombg","recharge_fnt","accarnivalview_tab_red","accarnivalview_tab_green","wifeview_bottombg","mainui_bottombtnbg","progress5","progress3_bg",
            "acturantable_task_arrow","acturantable_task_box1_1","acturantable_task_box1_2","acturantable_task_box1_3","acturantable_task_box2_1","acturantable_task_box2_2","acturantable_task_box2_3","acturantable_taskbox_light","acturntable_tab1_1text","acturntable_bg","acturntable_line","acturntable_point","acturntable_rankicon","acturntable_tab2_1text","acturntable_tjbg","acturntable_top_bg1_1","acturntable_top_bg2_1","acturntable_top_bg3_1","acturntabletop_descbg",
            "progress10","progress10_bg","btn_upgrade_yellow","btn_upgrade_yellow_down", "shopview_line", "acturntable_rankicon_down", "acmaydayman1_1", "acturntable_tab3_1text", "acturntable_tab1_2text","acturntable_tab2_2text","acturntable_tab3_2text","acturntable_top_bg2_2","acturntable_top_bg3_2","acmaydayman1_2",
            "acturntable_tab1_4text","acturntable_top_bg1_4","acturntable_top_bg2_4","acturntable_top_bg3_4","acsearchproofview_common_skintxt","acwealthcarpview_skineffect"
        ]).concat(arr);
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
    }
    protected getTitleStr():string
	{
        let type = Number(this.code) > 8 ? this.code : this.typeCode;
        return "acMayDay-"+ type + "_Title";
	}

    // 概率内容
	protected getProbablyInfo():string
	{
		let ruleStr="acturntableProbablyInfo"+this.typeCode;
		if(LanguageManager.checkHasKey(ruleStr))
		{
			return ruleStr;
		}
		else
        {
            return super.getProbablyInfo();
        }
	}

    public dispose():void
	{   
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 
        let view = this;
        view._topBg = null;
        view._topName = null;
        view._descBg = null;
        view._activityDescText = view._activityTimerText = null;
        view._nodeContainer = null;
        view._activityTimerText = null;
        view._activityDescText = null;
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        view._bottomBg = null;
        this._skinEffectContainer = null;
        this._corner = null;
        super.dispose();
    }
}