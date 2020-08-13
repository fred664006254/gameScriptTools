/*
author : qianjun
date : 2018.4.14
desc : 暗夜魅影
*/
class AcDestroySameView extends AcCommonView{
    private _timeCountTxt : BaseTextField = null;
    private _timebg : BaseBitmap = null;
    private _haveTxt : BaseTextField = null;
    private _roundBg : BaseBitmap = null;
    private _roundTxt : BaseTextField = null;
    private _progressBar : ProgressBar = null;
    private _pool : any = null;
    private _popGroup : BaseDisplayObjectContainer = null;
    private _rewardBtn : BaseButton = null;
    private _roundBtn : BaseButton = null;
    private _stop = false;

    private _dbbone : BaseLoadDragonBones = null;

    private _skipAnim:boolean = false;

    public constructor(){
        super();
    }

    protected getProbablyInfo(): string {
		return this.getCnByCode(`acDestroySameProbablyInfo`);
	}


    private get cfg() : Config.AcCfg.DestroySameCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDestroySameVo{
        return <AcDestroySameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
        protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                code = `4`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    protected preInit():void
	{
        super.preInit();
        let view = this;
        if(Number(this.getUiCode()) < 4){
            let localkey:string = this.acTivityId+this.vo.et+Api.playerVoApi.getPlayerID();
            let lastTime:number = 0;
            let timeStr:string = LocalStorageManager.get(localkey);
            if (timeStr && timeStr!="")
            {
                lastTime = Number(timeStr);
            }
    
            if (!App.DateUtil.checkIsToday(lastTime))
            {   
                LocalStorageManager.set(localkey,String(GameData.serverTime));
                ViewController.getInstance().openView(ViewConst.BASE.ACDESTROYSAMEPREVVIEW,{
                    aid: view.aid, 
                    code: view.code, 
                });
            }
        }
    }

    protected getRuleInfo():string{
        let code = this.getUiCode();
		return App.CommonUtil.getCnByCode(`acDestroySameRuleInfo`, this.code, code);
    } 
    
    protected isHideTitleBgShadow():boolean{
		return true;
    }
    
    public getStop():boolean{
        return this._stop;
    }

    protected initBg():void{
        let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        let bgName : string = this.getBgName();
		if(bgName){
			this.viewBg = BaseLoadBitmap.create(bgName);
			if(this.isTouchMaskClose()){
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = 640;
            this.viewBg.height = 1136;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this.viewBg, this);

            let boneName = ``;
            switch(Number(this.getUiCode())){
                case 1:
                    boneName = `acdestroysame_batbos`;
                    break;
                case 4:
                    boneName = `acshenqi_qinglong`;
                    break;
            }
            //(
            if(!Api.switchVoApi.checkCloseBone() && RES.hasRes(`${boneName}_tex_json`) && App.CommonUtil.check_dragon()){
                let bat = App.DragonBonesUtil.getLoadDragonBones(boneName);
                
                view._dbbone = bat;

                if(Number(code) == 1){
                    let smallbat = App.DragonBonesUtil.getLoadDragonBones(`acdestroysame_upperlayer`);
                    let zshi = App.DragonBonesUtil.getLoadDragonBones(`acdestroysame_bottomlayer`);     
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bat, this, [0,400]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, smallbat, this,[0,400]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, zshi, this, [0,400]);
                    this.addChild(zshi);
                    this.addChild(bat);
                    this.addChild(smallbat);
                }
                else{
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bat, this, [0,1136+100]);
                    this.addChild(bat);
                }
                bat.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE,this.dragonMc,this);
            }
            else{
                if(Number(code) < 3){
                    let bat = BaseLoadBitmap.create(App.CommonUtil.getResByCode(`destroysamebat`, code));
                    bat.width = 640;
                    bat.height = 1136;
                    let smallbat = BaseLoadBitmap.create(App.CommonUtil.getResByCode(`destroysamesmallbat`,code));
                    smallbat.width = 640;
                    smallbat.height = 1136;
                    let zshi = BaseLoadBitmap.create(App.CommonUtil.getResByCode(`destroysamezshi`, code));
                    zshi.width = 640;
                    zshi.height = 1136;
                    this.addChild(bat);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bat, this);
                    this.addChild(smallbat);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, smallbat, this);
                    this.addChild(zshi);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, zshi, this);
                }
            }

            if(Number(code) == 3){
                let fazhen1 = BaseBitmap.create(App.CommonUtil.getResByCode(`destroysamefazhen1`, code));
                let fazhen2 = BaseBitmap.create(App.CommonUtil.getResByCode(`destroysamefazhen2`,code));
                let fazhen3 = BaseBitmap.create(App.CommonUtil.getResByCode(`destroysamefazhen3`, code));
                fazhen1.anchorOffsetX = fazhen1.width / 2;
                fazhen1.anchorOffsetY= fazhen1.height / 2;
                fazhen2.anchorOffsetX = fazhen2.width / 2;
                fazhen2.anchorOffsetY= fazhen2.height / 2;
                fazhen3.anchorOffsetX = fazhen3.width / 2;
                fazhen3.anchorOffsetY= fazhen3.height / 2;
                this.addChild(fazhen1);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fazhen1, this);
                this.addChild(fazhen2);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fazhen2, this);
                this.addChild(fazhen3);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fazhen3, this);

                egret.Tween.get(fazhen1, {loop : true}).to({rotation : 360}, 40000);
                egret.Tween.get(fazhen2, {loop : true}).to({rotation : -360}, 30000);
                egret.Tween.get(fazhen3, {loop : true}).to({rotation : 360}, 20000);

                let eggEff = ComponentManager.getCustomMovieClip("destoysameegg", 10);
                this.addChild(eggEff);
                eggEff.width = 300;
                eggEff.height = 420;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eggEff, view, [0,-50]);
                eggEff.playWithTime(-1);
            }
        }
    }

    // 背景图名称
	protected getBgName():string{
        let code = this.getUiCode();
		return App.CommonUtil.getResByCode(`destroysamebg`, code);
    }

    protected getTitleBgName():string{
        return App.CommonUtil.getResByCode(`destroysametitle`, this.getUiCode());
    }

    // 获取container初始y坐标 		
    protected getContainerY():number{
        return 92;
    }

    protected getTitleStr():string{
        return null;
    }
    
    protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        let arr = [
            `destroysamecode1`,`acwealthcarpview_servantskintxt`,`acwealthcarpview_skineffect1`,`destroysamezshi`,
            `specialview_commoni_namebg`,`destroysamezshi2`,`destroysamebottombg`,`motherdaychargebtn-3`,`motherdaychargebtn-3_down`,`mainlandcitynamebg-1`,
            "progress8","progress7_bg",`destroysametaskbg`,`luckydrawiconbg-1`,"activitypop_check1", "activitypop_check2"
        ];
        if(RES.hasRes(`destroysamecode${code}`) && Number(code) != 1){
            arr.push(`destroysamecode${code}`);
            arr.push(`destroysamebottombg-${code}`);
        }
        if(Number(this.code) > 4 && Number(code) < 12){
            arr.push(`destroytop-${this.getTopUiCode()}`);
        }
        return super.getResourceList().concat(arr);
    }

    private getTopUiCode():string{
        let code = this.getUiCode();
        if(Number(code) == 4){
            code = Math.floor(Number(this.code) / 2) * 2 + '';
        }
        return code;
    }

    public initView(){
		let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height - 92;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, view.makePointLine, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DESTROYSAME_ATTACK),view.attackCallback,view);
        //top背景图
        let topbg = BaseBitmap.create(this.getResByCode(`destroytop`, this.getTopUiCode()));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, topbg, view.titleBg, [0]);
        topbg.y = -7;
        view.addChildToContainer(topbg);


        let timeTxt = ComponentManager.getTextField(`${view.vo.getAcLocalTime(true,String(0xffffff))}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        // 423 205
        timeTxt.width = 390;
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [Number(this.getUiCode()) < 3 ? 225 : 180,12]);
        view.addChildToContainer(timeTxt);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getCnByCode(`AcDestroySameTip4`)), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = Number(this.getUiCode()) < 3 ? 390 : 430;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0,timeTxt.textHeight + 5]);
        view.addChildToContainer(tipTxt);

        //倒计时位置 
        let timebg  = BaseBitmap.create("public_9_bg61");
        view.addChildToContainer(timebg);
        timebg.y = (topbg.y+topbg.height - 14);
        view._timebg = timebg;
 
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChildToContainer(tip2Text);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timebg.y+6; 

        timebg.width = tip2Text.width+50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
        tip2Text.x = timebg.x+(timebg.width-tip2Text.width)*0.5;

        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		// this._effect.setScale(2);
		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
		skinTxtEffect.setPosition(topbg.x + 103 - skinTxtEffectBM.width / 2, topbg.y + 130 - skinTxtEffectBM.height / 2);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create(Number(code) == 4 ? "servantweapontxt" : "acwealthcarpview_servantskintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		skinTxt.setPosition(topbg.x + 103, topbg.y + 130);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffect = BaseBitmap.create(Number(code) == 4 ? "servantweapontxt" : "acwealthcarpview_servantskintxt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		skinTxteffect.setPosition(topbg.x + 103, topbg.y + 130);
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        
        //透明点击区域
		let touchPos = BaseBitmap.create("public_alphabg");
		touchPos.width = 180;
		touchPos.height = 176;
		touchPos.setPosition(topbg.x, topbg.y);
		view.addChildToContainer(touchPos);
		touchPos.addTouchTap(() => {
            if(view._stop){
                return;
            }

            if(Number(code) == 4){

                if (view.cfg.coreReward1)
                {
                    let itemcfg = Config.ItemCfg.getItemCfgById(view.cfg.coreReward);
                    ViewController.getInstance().openView(ViewConst.POPUP.SERVANTWEAPONSHOWVIEW, {
                        weaponIds : view.cfg.coreReward1,
                        topMsg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDestroySameTip9`, this.code, code), [Number(this.code) & 1 ? '7500' : `10000`,itemcfg.name]),
                    });
                }
                else
                {
                    let weaponcfg = Config.ServantweaponCfg.getWeaponItemById(view.cfg.coreReward);
                    ViewController.getInstance().openView(ViewConst.POPUP.SERVANTWEAPONSHOWVIEW, {
                        weaponId : view.cfg.coreReward,
                        topMsg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDestroySameTip9`, this.code, code), [Number(this.code) & 1 ? '7500' : `10000`,weaponcfg.name]),
                    });
                }
               
            }
            else{
                ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMEPOPUPVIEW3, {
                    aid : view.aid,
                    code : view.code
                });
            }
        }, ViewController);

        //活动奖励
        let rewardbtn = ComponentManager.getButton(`motherdaychargebtn-3`, ``, ()=>{
            if(view._stop){
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMEPOPUPVIEW,{
                aid : view.aid,
                code : view.code
            });
        }, view);
        view.addChildToContainer(rewardbtn);
        view._rewardBtn = rewardbtn;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rewardbtn, topbg, [10,topbg.height+10]);

        if(Number(code) == 3){
            if (Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.switchVoApi.checkOpenQingYuan("winterIsComing")) {
                let openOtherBtn = ComponentManager.getButton("destroyshopbtn-3", "", () => {
                    if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
                        ViewController.getInstance().openViewByFunName("qingyuan");
                    }
                    else {
                        App.CommonUtil.showTip(LanguageManager.getlocal("mianUIFriendBtnTip", [LanguageManager.getlocal("officialTitle" + Config.CareerCfg.getStoryNeedLv())]));
                    }
                }, this);
                view.addChildToContainer(openOtherBtn);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, openOtherBtn, rewardbtn, [0,rewardbtn.height+10]);
            }
        }
        
        //当前轮数
        let roundbg = BaseBitmap.create(`mainlandcitynamebg-1`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, roundbg, rewardbtn, [rewardbtn.width+10,0]);
        view._roundBg = roundbg;

        let curround = view.vo.getCurround();
        let roundtxt = ComponentManager.getTextField(LanguageManager.getlocal(`acBattlePassRound-1`, [curround.toString()]), 16, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roundtxt, roundbg);
        view._roundTxt = roundtxt;
        //血量
        let progressbar = ComponentManager.getProgressBar("progress8","progress7_bg",367);
        view.addChildToContainer(progressbar);
        progressbar.setScale(0.9);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progressbar, roundbg, [roundbg.width-13,0]);
        view._progressBar = progressbar;

        progressbar.setPercentage(Number(code) == 3 ? 0 : 1);
        progressbar.setTextSize(18);
        progressbar.setText(Number(code) == 3 ? `0%` : `100%`);

        view.addChildToContainer(roundbg);
        view.addChildToContainer(roundtxt);

        let boxreward = ComponentManager.getButton(this.getResByCode(`destroybox`), ``, ()=>{
            if(view._stop){
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMEREWARDPOPUPVIEW, {aid : this.aid, code : this.code});
        }, view,);
        boxreward.setScale(0.8);
        view.addChildToContainer(boxreward);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, boxreward, progressbar, [progressbar.width*progressbar.scaleX,0]);
        view._roundBtn = boxreward;
        //底图修饰
        let bottomzshi = BaseBitmap.create(`destroysamezshi`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomzshi, view.container, [0,0], true);
        view.addChildToContainer(bottomzshi);

        let bottomzshi2 = BaseBitmap.create(`destroysamezshi2`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, bottomzshi2, view.container, [0,0], true);
        view.addChildToContainer(bottomzshi2);

        let bottomzshi3 = BaseBitmap.create(`destroysamezshi2`);
        bottomzshi3.anchorOffsetX = bottomzshi3.width / 2;
        bottomzshi3.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, bottomzshi3, view.container, [0,0], true);
        view.addChildToContainer(bottomzshi3);
        
        let bottombg = BaseBitmap.create(App.CommonUtil.getResByCode(`destroysamebottombg`, code));
        view.addChildToContainer(bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0,30], true);

        //跳过动画
        let skipCheck = BaseBitmap.create(this._skipAnim? "activitypop_check2" : "activitypop_check1");
        skipCheck.y = bottombg.y-skipCheck.height;
        view.addChildToContainer(skipCheck);
        skipCheck.addTouchTap(()=>{
            this._skipAnim = !this._skipAnim;
            skipCheck.texture = ResourceManager.getRes(this._skipAnim? "activitypop_check2" : "activitypop_check1");
        },this);

        let checkTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acskysoundCheckTip1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        skipCheck.x = GameConfig.stageWidth/2- skipCheck.width/2 - checkTxt1.width/2-2;
        checkTxt1.setPosition(skipCheck.x+skipCheck.width+4,skipCheck.y+skipCheck.height/2-checkTxt1.height/2);
        view.addChildToContainer(checkTxt1);

        let group = new BaseDisplayObjectContainer();
        group.width = 315;
        group.height = 315;
        view.addChildToContainer(group);
        view._popGroup = group;
        group.x = bottombg.x + 20;
        group.y = bottombg.y + 23;
        group.mask = new egret.Rectangle(0,0,330,330);

        let destroyone = ComponentManager.getButton(this.getResByCode(`destroyonebtn`), ``, ()=>{
            //消耗一次
            if(view._stop){
                return;
            }
            if(!view.vo.isInActivity()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if(view.vo.getItemNum() < 1){
                view.showTipView();
                //App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyTitle"));
            }
            else{
                //
                view._stop = true;
                NetManager.request(NetRequestConst.REQUEST_DESTROYSAME_ATTACK,{
                    activeId:view.acTivityId, 
                    pos:view.getPos(view.vo.pointidx),
                    batch:0        
                });
            }
        }, view, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, destroyone, view.container, [10,70], true);
        view.addChildToContainer(destroyone);

        let onedescbg = BaseBitmap.create(`specialview_commoni_namebg`);
        view.addChildToContainer(onedescbg);

        let useTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acLuckyDrawTip4-1`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(useTxt);

        let useIcon = BaseBitmap.create(this.getResByCode(`destroyitemicon2`));
        view.addChildToContainer(useIcon);

        let useTxt2 = ComponentManager.getTextField(`X 1`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(useTxt2);
        useTxt2.name = `useTxt2`;
        
        onedescbg.width = useTxt.width + useIcon.width + useTxt2.width + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, onedescbg, destroyone, [0,destroyone.height + 5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, useTxt, onedescbg, [10,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, useIcon, useTxt, [useTxt.textWidth,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, useTxt2, useIcon, [useIcon.width,0]);

        let destroyall = ComponentManager.getButton(this.getResByCode(`destroyallbtn`), ``, ()=>{
            //消耗10次
            if(view._stop){
                return;
            }
            if(!view.vo.isInActivity()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if(view.vo.getItemNum() < 10){
                view.showTipView();
                //App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyTitle"));
            }
            else{
                //
                view._stop = true;
                NetManager.request(NetRequestConst.REQUEST_DESTROYSAME_ATTACK,{
                    activeId:view.acTivityId, 
                    batch:1        
                });
            }
        }, view, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, destroyall, view.container, [10,70], true);
        view.addChildToContainer(destroyall);

        let adddescbg = BaseBitmap.create(`specialview_commoni_namebg`);
        view.addChildToContainer(adddescbg);

        let alluseTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acLuckyDrawTip4-1`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(alluseTxt);

        let alluseIcon = BaseBitmap.create(this.getResByCode(`destroyitemicon2`));
        view.addChildToContainer(alluseIcon);

        let alluseTxt2 = ComponentManager.getTextField(`X 10`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(alluseTxt2)

        adddescbg.width = alluseTxt.width + alluseIcon.width + alluseTxt2.width + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, adddescbg, destroyall, [0,destroyall.height + 5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, alluseTxt, adddescbg, [10,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, alluseIcon, alluseTxt, [alluseTxt.textWidth,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, alluseTxt2, alluseIcon, [alluseIcon.width,0]);

        let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(this.getCnByCode(`AcDestroySameTip5`)), 18,TextFieldConst.COLOR_WARN_GREEN);
        view.addChildToContainer(tipTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt2, adddescbg, [10,adddescbg.height + 5]);
        //当前拥有
        let havebg = BaseBitmap.create(`luckydrawiconbg-1`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, havebg, bottomzshi, [0,10]);
        view.addChildToContainer(havebg);

        let haveTxt = ComponentManager.getTextField(LanguageManager.getlocal(`sweetgiftCurrHave-1`), 20);
        view.addChildToContainer(haveTxt);

        let haveIcon = BaseBitmap.create(this.getResByCode(`destroyitemicon2`));
        view.addChildToContainer(haveIcon);

        let haveTxt2 = ComponentManager.getTextField(view.vo.getItemNum()+``, 20);
        view.addChildToContainer(haveTxt2);
        view._haveTxt = haveTxt2;

        let width = (bottomzshi.width - (haveTxt.width + haveIcon.width + haveTxt2.width)) / 2;

        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, haveTxt, bottomzshi, [width,10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, haveIcon, haveTxt, [haveTxt.textWidth,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, haveTxt2, haveIcon, [haveIcon.width,0]);

        view.initPool();
        view.freshView();
    }

     //弹窗提示
     public showTipView():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"acthrowstoneTipTitle",
			msg:LanguageManager.getlocal(this.getCnByCode("AcDestroySameTip8")),
			callback:()=>{
                ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMEPOPUPVIEW, { 
                    aid: this.aid, 
                    code: this.code 
                });
            },
			handler:this,
            needCancel:true,
            }); 
    }

    private initPool(){
        let view = this;
        view._pool = {};
        for(let i = 1; i <= 9; ++ i){
            let point = new AcDestroySamePopPoint();
            point.init(i,view.aid,view.code);
            view._popGroup.addChild(point);
            view._pool[i] = point;
            let pos = point.getPoint();
            point.x = (pos.y - 1) * 108;
            point.y = (pos.x - 1) * 108;
        }
        let id = view.findMaxPoint();
        let point : AcDestroySamePopPoint = view._pool[id];
        point.touchPoint();
    }

    private cleanupPool()
    {   
        let view = this;
        for(let key in view._pool){
            let point = view._pool[key];
            point.dispose();
        }
        view._pool = {};
    }

    private findMaxPoint():number{
        let view = this;
        let id = 1;
        let max = 0;
        for(let i = 1; i <= 9; ++ i){
            let point : AcDestroySamePopPoint = view._pool[i];
            point.touchPoint();
            let count = 0;
            for(let k = 1; k <= 9; ++ k){
                let unit : AcDestroySamePopPoint = view._pool[k];
                if(unit.getSelect()){
                    ++ count;
                    unit.setSelect(false);
                }
            }
            if(count > max){
                max = count;
                id = i;
            }
        }
        return id;
    }

    public getPoint(id : number):AcDestroySamePopPoint{
        let view = this;
        let point : AcDestroySamePopPoint = view._pool[id];
        return point;
    }

    private makePointLine(evt : egret.Event):void{
        let view = this;
        if(evt.data == 0){
            for(let i in view._pool){
                let point : AcDestroySamePopPoint = view._pool[i];
                point.setSelect(false);
                point.setInCal(false);
            }
        }
        else{
            let point = view.getPoint(evt.data);
            if(point){
                point.setSelect(true);
                if(!point.getInCal()){
                    point.makeLinePoint();
                }
            }
        }
    }

	protected getRequestData():{requestType:string,requestData:any}{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_DESTROYSAME_INFO,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
		let view = this;
		view.vo.setBosshp(data.data.data.bossHp);
    }
    
    //获取横纵坐标
	public getPos(id:number):number[]{
        let arr = [];
        arr.push(Math.ceil(id / 3));
        arr.push(id % 3 == 0 ? 3 : id % 3);
		return arr;
	}

    private freshView():void{
        let view = this;
        //当前轮数 和 血量
        let code = view.getUiCode();
        let curround = view.vo.getCurround();
        view._roundTxt.text = LanguageManager.getlocal(`acBattlePassRound-1`, [curround.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._roundTxt, view._roundBg);
        
        let percent = 0;
        let numstr = ``;
        if(curround > Object.keys(view.cfg.bossList).length){
            percent = 1;
            numstr = LanguageManager.getlocal(`prisonerInfinite`);
        }
        else{
            let curhp = Number(code) == 3 ? (view.cfg.bossList[curround].bossHp - view.vo.getCurbossHp()) : view.vo.getCurbossHp();
            percent = (curhp) / view.cfg.bossList[curround].bossHp;
            numstr = `${curhp}/${view.cfg.bossList[curround].bossHp}`;
        } 
        view._progressBar.setPercentage(percent);
        view._progressBar.setText(numstr);
        
        view._haveTxt.text = view.vo.getItemNum().toString();

        if(view.vo.getpublicRedhot1() || view.vo.getpublicRedhot2()){
            App.CommonUtil.addIconToBDOC(view._rewardBtn);
            let reddot = this._rewardBtn.getChildByName("reddot");
            reddot.x = 65;
            reddot.y = 5;
        }
        if(!view.vo.getpublicRedhot1() && !view.vo.getpublicRedhot2()){
            App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
        }
        if(view.vo.getpublicRedhot3() ){
            App.CommonUtil.addIconToBDOC(view._roundBtn);
             let reddot = this._roundBtn.getChildByName("reddot");
            reddot.x = 80;
            reddot.y = 10;
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._roundBtn);
        }

        let usetxt2 = <BaseTextField>view.container.getChildByName(`useTxt2`);
        usetxt2.text = `${view.vo.getFreeNum() > 0 ? LanguageManager.getlocal(`acYiyibusheFree`) : `X 1`}`;
    }

    public tick():void{
        let view = this;
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._timebg.x = GameConfig.stageWidth - view._timebg.width - 12;
        view._timeCountTxt.x = view._timebg.x+(view._timebg.width-view._timeCountTxt.width)*0.5;
    }

    private _destroyLog = [];
    private _rewards = ``;
    private total = 0;
    private damage = 0;
    private isbatch = false;
    private attackCallback(evt : egret.Event):void{
        let view = this;
        if(!evt.data.ret){
            view._stop = false;
            return;
        }
        let data = evt.data.data.data;
        if(data){
            if(data.hasKill){
                view._stop = false;
                App.CommonUtil.showTip(LanguageManager.getlocal(`AcDestroySameTip10-1`));
                return;
            }
            if(data.destroyLog){
                let total = 0;
                let damage = 0;
                for(let i in data.destroyLog){
                    total += (data.destroyLog[i].posSet.length);
                    damage += (data.destroyLog[i].damage);
                }
                view._destroyLog = data.destroyLog;
                view._rewards = data.rewards;
                view.total = total;
                view.damage = damage;
                view.isbatch = data.batch;
                if (this._skipAnim)
                {
                    this.skipShowMoive();
                }   
                else
                {
                    this.showMovie();
                }
                
            }
            else{
                view._stop = false;
            }
            if(data.bossHp){
                view.vo.setBosshp(data.bossHp);
                view.freshView();
            }

            // if(data.batch){

            // }
            // else{

            // }
            
        }
       
    }

    private skipShowMoive()
    {       
         let view = this;
        //  let tmp = view._destroyLog[view._destroyLog.length-1];
        //  view.fillPoint(tmp.nxtGrid);
        this.cleanupPool();
        this.initPool();

         if(view._rewards){
            ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMESHOWREWARDVIEW,{
                rewards : view._rewards, 
                tipMsg : LanguageManager.getlocal(this.getCnByCode(`AcDestroySameTip7`), [view.total.toString(),view.damage.toString()])
            });
        }
        view._stop = false;
        let id = view.findMaxPoint();
        let point : AcDestroySamePopPoint = view._pool[id];
        point.touchPoint();
    
    }

    private showMovie():void{
        let view = this;
        let tmp = view._destroyLog[0];
        if(tmp){
            //...
            // let id = (tmp.pos[0] - 1) * 3 + tmp.pos[1];
            // let point : AcDestroySamePopPoint = view._pool[id];
            // point.touchPoint();
            // 清理位置
            for(let i in view._pool){
                let tmppoint : AcDestroySamePopPoint = view._pool[i];
                tmppoint.setSelect(false);
            }
            for(let i in tmp.posSet){
                let unit = tmp.posSet[i];
                let id = (unit[0] - 1) * 3 + unit[1];
                let point : AcDestroySamePopPoint = view._pool[id];
                point.setSelect(true);
            }

            let count = 0;
            let clipname = Number(this.getUiCode()) < 3 ? `destorysamedandao` : `destorysamedandao4`;
            let framenum = 6;
            let tmpW = 200;
            let tmpH = 650;
            if(Number(this.getUiCode()) == 4){
                framenum = 9;
                tmpW = 80;
                tmpH = 350;
            }
            let clip = ComponentManager.getCustomMovieClip(clipname, framenum, 50);
            clip.width = tmpW;
            clip.height = tmpH;
            
            this.addChildToContainer(clip);
            clip.x = 220;
            clip.y = view._popGroup.y - 320;
            if(Number(this.getUiCode()) == 3){
                clip.y = view._popGroup.y - 200;
            }
            clip.blendMode = egret.BlendMode.ADD;
            if(Number(this.getUiCode()) == 4){
                clip.setScale(2);
                clip.x = 245;
            }

            framenum = 16;
            let chicun = 500;
            if(Number(this.getUiCode()) == 3){
                framenum = 10;
                chicun = 300;
            }
            if(Number(this.getUiCode()) == 4){
                framenum = 16;
                chicun = 400;
            }

            let jizhongname = Number(this.getUiCode()) < 3 ? `destroysamejizhong` : `destroysamejizhong-${this.getUiCode()}`
            let hit = ComponentManager.getCustomMovieClip(jizhongname, framenum, 50);
            hit.width = chicun;
            hit.height = chicun;
            hit.anchorOffsetX = hit.width / 2;
            hit.anchorOffsetY = hit.height / 2;
            this.addChildToContainer(hit);
            hit.x = 320;
            hit.y = 350;
            if(Number(this.getUiCode()) == 3){
                hit.setScale(2);
                let eggEff = ComponentManager.getCustomMovieClip("destoysameegg", 10);
                eggEff.width = 300;
                eggEff.height = 420;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eggEff, view, [0,-50]);
                hit.y = eggEff.y + eggEff.height / 2 - view.container.y;
            }
            hit.blendMode = egret.BlendMode.ADD;
            hit.setEndCallBack(()=>{
                hit.dispose();
                hit = null;
            }, view);
            if(Number(this.getUiCode()) == 4){
                hit.setScale(2);
            }
            clip.setFrameEvent(3,()=>{
                hit.playWithTime(1);
                if(Number(this.getUiCode()) == 4){
                    view.onHit();
                }
            }, view);

            clip.setEndCallBack(()=>{
                clip.dispose();
                clip = null;
                SoundManager.playEffect(`effect_battle_hit`);

                if(view._dbbone){
                    view._dbbone.playDragonMovie(`hit`, 1);
                }
            }, view);

            let first = true;
            SoundManager.playEffect(`effect_activity_bassbreak`);
            for(let i in view._pool){
                let tmppoint : AcDestroySamePopPoint = view._pool[i];
                let tmppos = tmppoint.getPoint();
                if(tmppoint.getSelect()){
                    if(first && !view.isbatch){
                        first = !first;
                        egret.Tween.get(clip).wait(200).call(()=>{
                            //发射子弹   
                            clip.playWithTime(1);
                        }, view);
                    }
                    tmppoint.showEffect(()=>{
                        ++ count;
                        if(count == tmp.posSet.length){
                            egret.Tween.get(view).wait(200).call(()=>{
                                //先下落
                                //第一列 147 258 369
                                this.movePoint(1,3,tmp.nxtGrid);
                            }, view);
                        }
                        tmppoint.alpha = 0;
                        tmppoint.dispose();
                        view._pool[i] = null;
                        tmppoint = null; 
                    }, view);
                }
            }
        }
        else{
            if(view.isbatch){
                //发射子弹
                let clipname = Number(this.getUiCode()) < 3 ? `destorysamedandao` : `destorysamedandao4`;
                let framenum = 6;
                let tmpW = 200;
                let tmpH = 650;
                if(Number(this.getUiCode()) == 4){
                    framenum = 9;
                    tmpW = 80;
                    tmpH = 350;
                }
                let clip = ComponentManager.getCustomMovieClip(clipname, framenum, 50);
                clip.width = tmpW;
                clip.height = tmpH;
                clip.x = 220;
                clip.y = view._popGroup.y - 320;
                clip.playWithTime(1);
                if(Number(this.getUiCode()) == 3){
                    clip.y = view._popGroup.y - 200;
                }
                clip.blendMode = egret.BlendMode.ADD;
                if(Number(this.getUiCode()) == 4){
                    clip.setScale(2);
                    clip.x = 245;
                }
    
                this.addChildToContainer(clip);

                framenum = 16;
                let chicun = 500;
                if(Number(this.getUiCode()) == 3){
                    framenum = 10;
                    chicun = 300;
                }
                if(Number(this.getUiCode()) == 4){
                    framenum = 16;
                    chicun = 400;
                }
    
                let jizhongname = Number(this.getUiCode()) < 3 ? `destroysamejizhong` : `destroysamejizhong-${this.getUiCode()}`
                let hit = ComponentManager.getCustomMovieClip(jizhongname, framenum, 50);
                hit.width = chicun;
                hit.height = chicun;
                hit.anchorOffsetX = hit.width / 2;
                hit.anchorOffsetY = hit.height / 2;
                this.addChildToContainer(hit);
                hit.x = 320;
                hit.y = 350;
                if(Number(this.getUiCode()) == 3){
                    hit.setScale(2);
                    let eggEff = ComponentManager.getCustomMovieClip("destoysameegg", 10);
                    eggEff.width = 300;
                    eggEff.height = 420;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eggEff, view, [0,-50]);
                    hit.y = eggEff.y + eggEff.height / 2 - view.container.y;
                }
                hit.blendMode = egret.BlendMode.ADD;
                hit.setEndCallBack(()=>{
                    hit.dispose();
                    hit = null;
                    if(view._rewards){
                        ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMESHOWREWARDVIEW,{
                            rewards : view._rewards, 
                            tipMsg : LanguageManager.getlocal(this.getCnByCode(`AcDestroySameTip7`), [view.total.toString(),view.damage.toString()])
                        });
                    }
                    view._stop = false;
                    let id = view.findMaxPoint();
                    let point : AcDestroySamePopPoint = view._pool[id];
                    point.touchPoint();
                }, view);
                if(Number(this.getUiCode()) == 4){
                    hit.setScale(2);
                }
                clip.setFrameEvent(3,()=>{
                    hit.playWithTime(1);
                    if(Number(this.getUiCode()) == 4){
                        view.onHit();
                    }
                }, view);

                clip.setEndCallBack(()=>{
                    clip.dispose();
                    clip = null;

                    SoundManager.playEffect(`effect_battle_hit`);
                    if(view._dbbone){
                        view._dbbone.playDragonMovie(`hit`, 1);
                    }
                }, view);
            }
            else{
                if(view._rewards){
                    ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMESHOWREWARDVIEW,{
                        rewards : view._rewards, 
                        tipMsg : LanguageManager.getlocal(this.getCnByCode(`AcDestroySameTip7`), [view.total.toString(),view.damage.toString()])
                    });
                }
                view._stop = false;
                let id = view.findMaxPoint();
                let point : AcDestroySamePopPoint = view._pool[id];
                point.touchPoint();
            }
        }
    }

    private movePoint(y : number, to : number, newmap:any, time : number = 80):void{
        let view = this;
        let newid = (to - 1) * 3 + y;
        let last = y == 3 && to == 1;
        let total = 0;
        if(view._pool[newid]){
            if(to > 1){
                this.movePoint(y, to - 1, newmap);
            }
            else{
                if(y + 1 < 4){
                    this.movePoint(y + 1,3, newmap);
                }
            }   
            if(last){
                //填充
                view.fillPoint(newmap);
            }
        }
        else{
            if(last){
                view.fillPoint(newmap);
            }
            else{
                if(to == 1){
                    if(y + 1 < 4){
                        this.movePoint(y + 1,3, newmap);
                    }
                }
                else{
                    let ismove = false;
                    for(let i = to - 1; i >= 1; -- i){
                        let id = (i - 1) * 3 + y;
                        let point = view._pool[id];
                        if(point){
                            total = Math.max(total, (to - i) * time);
                            ismove = true;
                            egret.Tween.get(point).to({y : (to - 1) * 108}, (to - i) * time).call(()=>{
                                let newpoint = new AcDestroySamePopPoint();
                                let newType = newmap[to - 1][y - 1];
                                newpoint.init(newid,view.aid,view.code,newType);
                                view._popGroup.addChild(newpoint);
                                view._pool[newid] = newpoint;
                                let newpos = newpoint.getPoint();
                                newpoint.x = (newpos.y - 1) * 108;
                                newpoint.y = (newpos.x - 1) * 108;
            
                                view._pool[id].dispose();
                                view._pool[id] = null;
        
                                if(to > 1){
                                    this.movePoint(y, to - 1, newmap);
                                }     
                                if(last){
                                    //填充
                                    view.fillPoint(newmap);
                                }
            
                            }, view);
                            break;
                        }
                        else{
                            if(to > 1 && i == 1){
                                this.movePoint(y, to - 1, newmap);
                            }  
                            if(last){
                                //填充
                                view.fillPoint(newmap);
                            }
                        }
                    }
                }

            }
        }
    }

    private fillPoint(newmap, time = 80):void{
        let view = this;
        //填充
        let totaltime = 0;
        for(let y = 1; y < 4; ++ y){
            let posy = 1;
            for(let x = 3; x > 0; -- x){
                let id = (x - 1) * 3 + y;
                if(!view._pool[id]){
                    let newpoint = new AcDestroySamePopPoint();
                    let newType = newmap[x - 1][y - 1];
                    newpoint.init(id,view.aid,view.code,newType);
                    view._popGroup.addChild(newpoint);
                    view._pool[id] = newpoint;
                    let newpos = newpoint.getPoint();
                    newpoint.x = (newpos.y - 1) * 108;
                    newpoint.y = -108 * posy;
                    ++ posy;
                    totaltime = Math.max(totaltime, (x - 1 + posy) * time);
                    egret.Tween.get(newpoint).to({y : (newpos.x - 1) * 108}, (x - 1 + posy) * time);
                }
            }
        }
        egret.Tween.get(view).wait(totaltime).call(()=>{
            view._destroyLog.splice(0,1);
            view.showMovie(); 
        }, view);
    }

    private onHit():void{
        let view = this;
        if(view._dbbone){
            let tmpY = view._dbbone.y;
            egret.Tween.get(view._dbbone).to({y : tmpY - 100}, 100).to({y : tmpY}, 100).call(()=>{
                egret.Tween.removeTweens(view._dbbone);
            }, view);
        }
    }

    private dragonMc():void
	{	
		this._dbbone.playDragonMovie("idle",0);
	
	}

    public hide():void{
        if(this._stop){
            return;
        }
        super.hide();
    }

    public dispose():void{   
        let view = this;
        view._timeCountTxt = null;
        view._timebg = null;
        view._roundTxt = null;
        view._roundBg = null;
        view._progressBar = null;
        view._popGroup.removeTouchTap();
        view._popGroup = null;
        view._pool = null;
        view._haveTxt = null;
        view._destroyLog = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, view.makePointLine, view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DESTROYSAME_ATTACK),view.attackCallback,view);
        view._stop = false;
        view.isbatch = false;
        view.total = 0;
        view.damage = 0;
        if(view._dbbone){
            view._dbbone = null;
        }
        this._skipAnim = false;
        
        super.dispose();
    }
}