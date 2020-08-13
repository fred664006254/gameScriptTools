/**
 * 东郊狩猎
 * author yangchengguo
 * date 2019.8.5
 * @class AcHuntingView
 */
class AcHuntingView extends AcCommonView{
    public _timeBg:BaseBitmap = null;
    public _acTimeTF:BaseTextField = null;
    public _acProgress:ProgressBar = null;
    public _currTitleBg:BaseBitmap = null;
    public _currNumTitle:BaseTextField = null;
    public _arrowNum:BaseTextField = null;
    public _freeDesc:BaseTextField = null;
    public _isSelectedBtn:boolean = false;
    public _hitPos:number = 1;
    public _isPlayTen:boolean = false;
    public _rewardBtn:BaseButton = null;
    public _sightFlag:BaseBitmap = null;
    public _arrowAni:any = null;
    public _isDead:boolean = false;
    public _bossAni:any = null;
    public _bossContainer:BaseDisplayObjectContainer = null;
    public _multiNum:number = 5;
    public _playMultiCount:number = 0;
    public _killRewards:string = null;
    public _bossAnisArr:any[] = [];
    public _bossHitImgArr:any[] = [];
    public _progressIcon:BaseBitmap = null;
    public _arrowDown:BaseBitmap = null;
    public _currSightPos:{x:number, y:number} = {x:0, y:0};
    public _skinEffect:any = null;
    // public _hitPosX:number[] = [];
    public _sightTimeArr:number[] = [];
    public _forestBehindBg:BaseBitmap = null;
    public _forestBehindBg_:BaseBitmap = null;
    public _forestFrontBg:BaseBitmap = null;
    public _forestFrontBg_:BaseBitmap = null;
    public _isNeedLoadBoss:boolean = false;
    public _qingyuanBtn:BaseButton = null;
    public _heartBoneList:BaseLoadDragonBones[] = [];

    // public _sightMovePos = [
    //     {x:91, y:29}, {x:12, y:70}, {x:84, y:122}, {x:245, y:29},
    //     {x:400, y:98}, {x:324, y:182}, {x:12, y:55}, {x:38, y:29},
    //     {x:186, y:182}, {x:312, y:29}, {x:400, y:71}, {x:247, y:182},
    // ];

    public constructor(){
        super();
    }

    private get _sightMovePos():any[]{
        if (this.getTypeCode() == "3"){
            return [
                {x:128, y:99}, {x:69, y:124}, {x:125, y:152}, {x:225, y:65},
                {x:270, y:182}, {x:322, y:100}, {x:353, y:142}, {x:318, y:182},
                {x:268, y:76}, {x:215, y:179}, {x:181, y:70}, {x:161, y:173},
            ];
        }
        else if (this.getTypeCode() == "4"){
            return [
                {x:184, y:56}, {x:225, y:20}, {x:128, y:46}, {x:192, y:92},
                {x:122, y:120}, {x:192, y:142}, {x:103, y:171}, {x:228, y:191},
                {x:56, y:234}, {x:255, y:432}, {x:192, y:333}, {x:56, y:306},
            ];
        }
        return [
            {x:91, y:29}, {x:12, y:70}, {x:84, y:122}, {x:245, y:29},
            {x:400, y:98}, {x:324, y:182}, {x:12, y:55}, {x:38, y:29},
            {x:186, y:182}, {x:312, y:29}, {x:400, y:71}, {x:247, y:182},
        ];
    }

    //不同部位的分隔点
    private get _hitPosX():number[]{
        if (this.getTypeCode() == "3"){
            return [155, 300, 364];
        }
        else if (this.getTypeCode() == "4"){
            //y轴
            return [133, 228, 306];
        }
        return [80, 300, 405];
    }

    //亲亲特效的位置
    private get _heartPosY():number[]{
        return [60, 160, 280];
    }

    private get vo(): AcHuntingVo {
        return <AcHuntingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashRewardIcon, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_HUNTIN_KILLBOSS, this.killBossHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HUNTING_GETCHARGE), this.refreshView, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_KILLREWARD), this.refreshView, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL,this.checkQingyuanRed, this);

        this._sightTimeArr = this.vo.getArrowMoveTime(this._sightMovePos);

        if (this.getTypeCode() != "4"){
            //后景 森林
            let behindBgStr = ResourceManager.hasRes("achuntingview_behindbg_"+this.getTypeCode()) ? "achuntingview_behindbg_"+this.getTypeCode() : "achuntingview_behindbg_1";
            let forestBehindBg = BaseBitmap.create(behindBgStr);
            forestBehindBg.setPosition(GameConfig.stageWidth - forestBehindBg.width, 0);
            this.addChildToContainer(forestBehindBg);
            let forestBehindBg_ = BaseBitmap.create(behindBgStr);
            forestBehindBg_.setPosition(forestBehindBg.x - forestBehindBg_.width + 2, forestBehindBg.y);
            this.addChildToContainer(forestBehindBg_);
            this._forestBehindBg = forestBehindBg;
            this._forestBehindBg_ = forestBehindBg_;
            
            //前景 草地
            let frontBgStr = ResourceManager.hasRes("achuntingview_frontbg_"+this.getTypeCode()) ? "achuntingview_frontbg_"+this.getTypeCode() : "achuntingview_frontbg_1";
            // let frontBgStr = "achuntingview_frontbg_"+this.getTypeCode();
            let forestFrontBg = BaseBitmap.create(frontBgStr);
            forestFrontBg.setPosition(GameConfig.stageWidth - forestFrontBg.width, 0);
            this.addChildToContainer(forestFrontBg);
            let forestFrontBg_ = BaseBitmap.create(frontBgStr);
            forestFrontBg_.setPosition(forestFrontBg.x - forestFrontBg_.width + 2, 0);
            this.addChildToContainer(forestFrontBg_);
            this._forestFrontBg = forestFrontBg;
            this._forestFrontBg_ = forestFrontBg_;

            let bgOffX = 2;
            if (this.getTypeCode() == "3"){
                bgOffX = 3;
            }
            egret.Tween.get(forestFrontBg,{loop : true}).
            to({x : GameConfig.stageWidth}, 4000). 
            to({x : GameConfig.stageWidth - forestFrontBg.width * 2 + bgOffX}, 1).
            to({x : GameConfig.stageWidth}, 8000). 
            to({x : GameConfig.stageWidth - forestFrontBg.width * 2 + bgOffX}, 1).
            to({x : GameConfig.stageWidth - forestFrontBg.width}, 4000);
            egret.Tween.get(forestFrontBg_, {loop : true}).
            to({x : GameConfig.stageWidth}, 8000).
            to({x : GameConfig.stageWidth - forestFrontBg_.width * 2 + bgOffX}, 1);

            egret.Tween.get(forestBehindBg,{loop : true}).
            to({x : GameConfig.stageWidth}, 4000). 
            to({x : GameConfig.stageWidth - forestBehindBg.width * 2 + bgOffX}, 1).
            to({x : GameConfig.stageWidth}, 8000). 
            to({x : GameConfig.stageWidth - forestBehindBg.width * 2 + bgOffX}, 1).
            to({x : GameConfig.stageWidth - forestBehindBg.width}, 4000);
            egret.Tween.get(forestBehindBg_, {loop : true}).
            to({x : GameConfig.stageWidth}, 8000).
            to({x : GameConfig.stageWidth - forestBehindBg_.width * 2 + bgOffX}, 1);
        }
        else{
            let bg = BaseBitmap.create("achuntingview_bg-4");
            bg.setPosition(0, 0);
            this.addChildToContainer(bg);
        }

        //背景左移
        // egret.Tween.get(forestFrontBg,{loop : true}).
        // to({x : -forestFrontBg.width}, 4000). 
        // to({x : forestFrontBg.width - 1}, 1).
        // to({x : 0}, 4000);
        // egret.Tween.get(forestFrontBg_, {loop : true}).
        // to({x : - forestFrontBg_.width}, 8000).
        // to({x : forestFrontBg_.width - 1}, 1);

        // egret.Tween.get(forestBehindBg,{loop : true}).
        // to({x : -forestBehindBg.width}, 8000). 
        // to({x : forestBehindBg.width - 1}, 1).
        // to({x : 0}, 8000);
        // egret.Tween.get(forestBehindBg_, {loop : true}).
        // to({x : - forestBehindBg_.width}, 16000).
        // to({x : forestBehindBg_.width - 1}, 1);

        let infoBgStr = "achuntingview_infobg_" + this.getTypeCode();
        let infoBg:BaseBitmap = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(0, this.titleBg.y + this.titleBg.height);
        if (this.getTypeCode() != "1"){
            infoBg.y = this.titleBg.y + this.titleBg.height - 7;
        }

        //底部
        let bottomBgStr = "arena_bottom";
        if (this.getTypeCode() == "4"){
            bottomBgStr = "achuntingview_table-"+this.getTypeCode();
        }
        let bottomBg = BaseBitmap.create(bottomBgStr);
        if (this.getTypeCode() != "4"){
            bottomBg.width = 640;
            bottomBg.height = 140;
        }
        bottomBg.setPosition(0, GameConfig.stageHeigth - bottomBg.height);

        if (this.getTypeCode() != "4"){
            for (let i=1; i <= 5; i++){
                let arr:string[] = [];
                for (let k=1; k < 9; k++){
                    arr[k-1] = "achunting_bear_effect-"+this.getTypeCode()+"_"+i+"_"+k;
                }
                this._bossAnisArr[i-1] = arr;
            }

            for (let i=1; i <= 5; i++){
                let arr:string[] = [];
                arr[0] = "achunting_bear_hit-"+this.getTypeCode()+"_"+i;
                this._bossHitImgArr[i-1] = arr;
            }

            //熊动画
            let bossContainer = new BaseDisplayObjectContainer();
            bossContainer.width = 517;
            bossContainer.height = 268;
            bossContainer.setPosition(GameConfig.stageWidth/2 - bossContainer.width/2, infoBg.y + infoBg.height + 30 + 90);
            this.addChildToContainer(bossContainer);
            this._bossContainer = bossContainer;

            //熊投影
            let bossBlackStr = ResourceManager.hasRes("achunting_bear_black-"+this.getTypeCode()) ? "achunting_bear_black-"+this.getTypeCode() : "achunting_bear_black-1";
            let bossBlack = BaseBitmap.create(bossBlackStr);
            bossBlack.setPosition(bossContainer.width/2 - bossBlack.width/2, bossContainer.height - bossBlack.height/2 - 20)
            bossContainer.addChild(bossBlack);
            
            //boss
            let bossAniStr = "achunting_bear_effect-"+this.getTypeCode()+"_"+this.vo.getBossId()+"_";
            if (this.vo.getBossId() > 5){
                bossAniStr = "achunting_bear_effect-"+this.getTypeCode()+"_"+(this.vo.getBossId() - 5)+"_";
            }
            let bossAni = ComponentManager.getCustomMovieClip(bossAniStr, 8, 100);
            bossContainer.addChild(bossAni);
            bossAni.playWithTime(0);
            this._bossAni = bossAni;

            //准星
            let sightFlagStr = ResourceManager.hasRes("achuntingview_frontsinht_"+this.getTypeCode()) ? "achuntingview_frontsinht_"+this.getTypeCode() : "achuntingview_frontsinht_1";
            let sightFlag = BaseBitmap.create(sightFlagStr);
            sightFlag.anchorOffsetX = sightFlag.width/2;
            sightFlag.anchorOffsetY = sightFlag.height/2;
            sightFlag.setPosition(this._sightMovePos[0].x, this._sightMovePos[0].y);
            bossContainer.addChild(sightFlag);
            this._sightFlag = sightFlag;
            this.playSightMoveTween();
            
            //箭
            let arrowAniStr = ResourceManager.hasRes("achuntingview_arrow_"+this.getTypeCode()+"_") ? "achuntingview_arrow_"+this.getTypeCode()+"_" : "achuntingview_arrow_1_";
            let arrowAni = ComponentManager.getCustomMovieClip(arrowAniStr, 5, 50);
            this.addChildToContainer(arrowAni);
            arrowAni.setStopFrame(0);
            arrowAni.anchorOffsetX = arrowAni.width/2;
            arrowAni.anchorOffsetY = arrowAni.height;
            arrowAni.setPosition(bottomBg.x + bottomBg.width/2, bottomBg.y);

            let arrowDownStr = ResourceManager.hasRes("achunting_arrow_down-"+this.getTypeCode()) ? "achunting_arrow_down-"+this.getTypeCode() : "achunting_arrow_down-1";
            let arrowDown = BaseBitmap.create(arrowDownStr);
            arrowDown.anchorOffsetX = arrowDown.width/2;
            arrowDown.anchorOffsetY = arrowDown.height;
            arrowDown.setPosition(0, 0);
            this.addChildToContainer(arrowDown);
            arrowDown.visible = false;
            this._arrowDown = arrowDown;
            this._arrowAni = arrowAni;
        }
        else{
            let bossContainer = new BaseDisplayObjectContainer();
            // bossContainer.width = 517;
            // bossContainer.height = 268;
            // bossContainer.setPosition(GameConfig.stageWidth/2 - bossContainer.width/2, infoBg.y + infoBg.height + 30 + 90);
            this.addChildToContainer(bossContainer);
            this._bossContainer = bossContainer;

            let bossAniStr = "achunting_wife_"+this.vo.getBossId()+"-"+this.getTypeCode();
            if (this.vo.getBossId() > 5){
                bossAniStr = "achunting_wife_"+(this.vo.getBossId() - 5)+"-"+this.getTypeCode();
            }
            let boss = BaseLoadBitmap.create(bossAniStr);
            boss.width = 640;
            boss.height = 840;
            boss.setScale(0.6);
            bossContainer.width = boss.width * boss.scaleX;
            bossContainer.height = boss.height * boss.scaleY;
            bossContainer.setPosition(GameConfig.stageWidth/2 - bossContainer.width/2, bottomBg.y + 185 - bossContainer.height + 100);
            bossContainer.addChild(boss);
            this._bossAni = boss;

            //准星
            let sightFlagStr = ResourceManager.hasRes("achuntingview_frontsinht_"+this.getTypeCode()) ? "achuntingview_frontsinht_"+this.getTypeCode() : "achuntingview_frontsinht_1";
            let sightFlag = BaseBitmap.create(sightFlagStr);
            sightFlag.anchorOffsetX = sightFlag.width/2;
            sightFlag.anchorOffsetY = sightFlag.height/2;
            sightFlag.setPosition(this._sightMovePos[0].x, this._sightMovePos[0].y);
            bossContainer.addChild(sightFlag);
            this._sightFlag = sightFlag;
            this.playSightMoveTween();
        }

        this.addChildToContainer(infoBg);
        this.addChildToContainer(bottomBg);

        //活动时间
        let huntingTimeStr = LanguageManager.getlocal("achuntingTimeDesc", [this.vo.acTimeAndHour]);
        let huntingTime:BaseTextField = ComponentManager.getTextField(huntingTimeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        huntingTime.setPosition(infoBg.x + infoBg.width/2 - 80, infoBg.y + 10);
        this.addChildToContainer(huntingTime);
        //活动介绍
        // let
        let huntingDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("achuntingDesc-"+this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        huntingDesc.width = 390;
        huntingDesc.lineSpacing = 6;
        huntingDesc.setPosition(huntingTime.x, huntingTime.y + huntingTime.height + 3);
        this.addChildToContainer(huntingDesc);
        //活动倒计时
		this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2 - 2;
		this.addChildToContainer(this._timeBg);
		this._acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("achuntingTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._acTimeTF.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTF.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTF.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTF.height / 2);
        this.addChildToContainer(this._acTimeTF);

        /**衣装预览 start */
		let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(infoBg.x, infoBg.y - 40 + skinTxtEffectBM.height / 2);
        if (this.getTypeCode() == "4"){
            skinTxtEffect.x = infoBg.x - 10;
        }
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
		skinTxtEffect.addTouchTap(() => {
            if (this.getTypeCode() == "4"){
                let skinId = Config.WifeskinCfg.formatRewardItemVoStr(this.vo.cfg.show);;
                let topMsg = LanguageManager.getlocal("achuntingSkinGetDesc-"+this.code);
                let data = {data:[
                    {idType: skinId, topMsg:topMsg, bgName:"", scale: 0.63},
                ]};
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            }
            else{
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSKINVIEW, {
                    skinId : this.vo.cfg.show,
                    needTxt : "achuntingSkinGetDesc-"+this.code,
                    need : 0,
                });
            }
        }, this);

		let skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		skinTxt.setPosition(infoBg.x + 100, infoBg.y + 115);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
		/**衣装预览 end */

        //进度条
        let progress = ComponentManager.getProgressBar("progress8", "progress3_bg", 450);
        progress.x = infoBg.x + GameConfig.stageWidth/2 - progress.width/2 + 25; 
        progress.y = infoBg.y + infoBg.height + 30;
        this.addChildToContainer(progress);
        this._acProgress = progress;
        //进度条图标
        let progressIconStr = ResourceManager.hasRes("achuntingview_progress_icon_"+this.getTypeCode()) ? "achuntingview_progress_icon_"+this.getTypeCode() : "achuntingview_progress_icon_1";
        let progressIcon = BaseBitmap.create(progressIconStr);
        progressIcon.setPosition(progress.x - progressIcon.width + 9, progress.y + progress.height/2 - progressIcon.height/2);
        this.addChildToContainer(progressIcon);
        this._progressIcon = progressIcon;

        if (this.vo.isLastBoss()){
            progress.visible = false;
            progressIcon.visible = false;
        }
        else{
            progress.visible = true;
            progressIcon.visible = true;
            let bossId = this.vo.getBossId();
            let progrssNum = (this.vo.getBossTotalBloodById(bossId) - this.vo.getDamage())/this.vo.getBossTotalBloodById(bossId);
            let progressStr = String(this.vo.getBossTotalBloodById(bossId) - this.vo.getDamage());
            if (this.getTypeCode() == "4"){
                progrssNum = this.vo.getDamage()/this.vo.getBossTotalBloodById(bossId);
                progressStr = String(this.vo.getDamage());
            }
            // let progressStr = LanguageManager.getlocal("achuntingBloodPer", [String(this.vo.getDamage()), String(this.vo.getBossTotalBloodById(bossId))]);
            
            progress.setPercentage(progrssNum, progressStr);
        }
        

        //当前第几轮
        let currTitleBg = BaseBitmap.create("public_9_mainicontimebg");
        this.addChildToContainer(currTitleBg);
        this._currTitleBg = currTitleBg;
        let currNumTitle = ComponentManager.getTextField(LanguageManager.getlocal("achuntingAnimalName_"+this.vo.getBossId() + "-" + this.getTypeCode()),  TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        currTitleBg.width = currNumTitle.width + 60;
        currTitleBg.height = currNumTitle.height + 10;
        currTitleBg.setPosition(GameConfig.stageWidth/2 - currTitleBg.width/2, progress.y + progress.height + 10);
        currNumTitle.setPosition(currTitleBg.x + currTitleBg.width/2 - currNumTitle.width/2, currTitleBg.y + currTitleBg.height/2 - currNumTitle.height/2);
        this.addChildToContainer(currNumTitle);
        this._currNumTitle = currNumTitle;

        //箭图标
        let arrowIconStr = ResourceManager.hasRes("achuntingview_arrow_icon_" + this.getTypeCode()) ? "achuntingview_arrow_icon_" + this.getTypeCode() : "achuntingview_arrow_icon_1";
        let arrowIcon = BaseBitmap.create(arrowIconStr);
        arrowIcon.setScale(0.7);
        arrowIcon.setPosition(bottomBg.width/2 - arrowIcon.width/2 - 20, bottomBg.y);
        this.addChildToContainer(arrowIcon);

        let arrowName = ComponentManager.getTextField(LanguageManager.getlocal("achuntingArrow-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        arrowName.setPosition(arrowIcon.x + arrowIcon.width * arrowIcon.scaleX + 5, arrowIcon.y + 22);
        this.addChildToContainer(arrowName);
        if (this.getTypeCode() == "4"){
            arrowIcon.setScale(0.55);
            arrowIcon.setPosition(bottomBg.width/2 - arrowIcon.width/2 - 24, bottomBg.y + bottomBg.height - 135);
            arrowName.setPosition(arrowIcon.x + arrowIcon.width * arrowIcon.scaleX + 5, arrowIcon.y + 22);
        }

        let arrowNum = ComponentManager.getTextField(String(this.vo.getArrowNum()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        arrowNum.setPosition(arrowName.x + arrowName.width, arrowName.y);
        this.addChildToContainer(arrowNum);
        this._arrowNum = arrowNum;
        //一次
        let oneDescStr = LanguageManager.getlocal("achuntingLaunchNum-"+this.code, ["1"]);
        let playBtnImg = ButtonConst.BTN_BIG_YELLOW;
        let oneBtnStr = null;
        let mulBtnStr = null;
        if (this.getTypeCode() == "4"){
            playBtnImg = ButtonConst.BTN2_BIG_YELLOW;
            oneBtnStr = "achuntingLaunchNum_1-"+this.getTypeCode();
            mulBtnStr = "achuntingLaunchNum_2-"+this.getTypeCode();
        }
        let playOneBtn = ComponentManager.getButton(playBtnImg, oneBtnStr, this.playBtnClick, this, ["0"]);
        playOneBtn.setPosition(60, bottomBg.y + bottomBg.height - playOneBtn.height - 20);
        this.addChildToContainer(playOneBtn);
        let oneBtnDesc = ComponentManager.getTextField(oneDescStr, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
        oneBtnDesc.setPosition(playOneBtn.x + playOneBtn.width/2 - oneBtnDesc.width/2, playOneBtn.y + playOneBtn.height/2 - oneBtnDesc.height/2);
        this.addChildToContainer(oneBtnDesc);
        //免费
        let freeDesc = ComponentManager.getTextField(LanguageManager.getlocal("achuntingFree"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        freeDesc.setPosition(playOneBtn.x + playOneBtn.width/2 - freeDesc.width/2, playOneBtn.y - freeDesc.height - 3);
        this.addChildToContainer(freeDesc);
        this._freeDesc = freeDesc;
        if (this.vo.isFree()){
            freeDesc.visible = true;
        }
        else{
            freeDesc.visible = false;
        }
        
        //十次
        let multiDescStr = LanguageManager.getlocal("achuntingLaunchNum-"+this.code, [String(this._multiNum)]);
        let playMultiBtn = ComponentManager.getButton(playBtnImg, mulBtnStr, this.playBtnClick, this, ["1"]);
        playMultiBtn.setPosition(GameConfig.stageWidth - 60 - playMultiBtn.width, playOneBtn.y);
        this.addChildToContainer(playMultiBtn);
        let multiBtnDesc = ComponentManager.getTextField(multiDescStr, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
        multiBtnDesc.setPosition(playMultiBtn.x + playMultiBtn.width/2 - multiBtnDesc.width/2, playMultiBtn.y + playMultiBtn.height/2 - multiBtnDesc.height/2);
        this.addChildToContainer(multiBtnDesc);
        //暴击
        let critDesc = ComponentManager.getTextField(LanguageManager.getlocal("achuntingCrit-"+this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        critDesc.setPosition(playMultiBtn.x + playMultiBtn.width/2 - critDesc.width/2, playMultiBtn.y - critDesc.height - 3);
        this.addChildToContainer(critDesc);
        if (this.getTypeCode() == "4"){
            oneBtnDesc.visible = false;
            multiBtnDesc.visible = false;
        }

        //奖池展示
        let rewardPoolBtn = ComponentManager.getButton("achuntingrewardbtn", null, this.rewardPoolBtnClick, this);
        rewardPoolBtn.setPosition(20, bottomBg.y + bottomBg.height - 140 - rewardPoolBtn.height - 40);
        this.addChildToContainer(rewardPoolBtn);
        //活动奖励
        let chargeRewardBtn = ComponentManager.getButton("achuntingviewchargebtn", null, this.chargeRewardBtnClick, this);
        chargeRewardBtn.setPosition(20, rewardPoolBtn.y - 20 - chargeRewardBtn.height);
        this.addChildToContainer(chargeRewardBtn);
        this._rewardBtn = chargeRewardBtn;
        if(this.code == "3" || this.code == "4"){
            if (Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.switchVoApi.checkOpenQingYuan("winterIsComing")) {
                let openOtherBtn = ComponentManager.getButton("destroyshopbtn-3", "", () => {
                    if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
                        ViewController.getInstance().openViewByFunName("qingyuan");
                    }
                    else {
                        App.CommonUtil.showTip(LanguageManager.getlocal("mianUIFriendBtnTip", [LanguageManager.getlocal("officialTitle" + Config.CareerCfg.getStoryNeedLv())]));
                    }
                }, this);
                this.addChildToContainer(openOtherBtn);
                this._qingyuanBtn = openOtherBtn;
                this.checkQingyuanRed();
                openOtherBtn.setPosition(20, chargeRewardBtn.y - 20 - openOtherBtn.height);
            }
        }
        
        //首次进入view
        if (this.vo.isShowFirstInView()){
            this.showFirstInView();
        }
        this.refreshView();
    }

    public playSightMoveTween():void{
        egret.Tween.get(this._sightFlag, {loop: true}).
        to({x:this._sightMovePos[1].x, y:this._sightMovePos[1].y}, this._sightTimeArr[0]).
        to({x:this._sightMovePos[2].x, y:this._sightMovePos[2].y}, this._sightTimeArr[1]).
        to({x:this._sightMovePos[3].x, y:this._sightMovePos[3].y}, this._sightTimeArr[2]).
        to({x:this._sightMovePos[4].x, y:this._sightMovePos[4].y}, this._sightTimeArr[3]).
        to({x:this._sightMovePos[5].x, y:this._sightMovePos[5].y}, this._sightTimeArr[4]).
        to({x:this._sightMovePos[6].x, y:this._sightMovePos[6].y}, this._sightTimeArr[5]).
        to({x:this._sightMovePos[7].x, y:this._sightMovePos[7].y}, this._sightTimeArr[6]).
        to({x:this._sightMovePos[8].x, y:this._sightMovePos[8].y}, this._sightTimeArr[7]).
        to({x:this._sightMovePos[9].x, y:this._sightMovePos[9].y}, this._sightTimeArr[8]).
        to({x:this._sightMovePos[10].x, y:this._sightMovePos[10].y}, this._sightTimeArr[9]).
        to({x:this._sightMovePos[11].x, y:this._sightMovePos[11].y}, this._sightTimeArr[10]).
        to({x:this._sightMovePos[0].x, y:this._sightMovePos[0].y}, this._sightTimeArr[11]);
    }

    public removeSightMoveTween():void{
        egret.Tween.removeTweens(this._sightFlag);
    }

    public stopBgTween():void{
        egret.Tween.pauseTweens(this._forestBehindBg);
        egret.Tween.pauseTweens(this._forestBehindBg_);
        egret.Tween.pauseTweens(this._forestFrontBg);
        egret.Tween.pauseTweens(this._forestFrontBg_);
    }

    public resumeBgTween():void{
        egret.Tween.resumeTweens(this._forestBehindBg);
        egret.Tween.resumeTweens(this._forestBehindBg_);
        egret.Tween.resumeTweens(this._forestFrontBg);
        egret.Tween.resumeTweens(this._forestFrontBg_);
    }

    public tick():void{
        this._acTimeTF.text = LanguageManager.getlocal("achuntingTimeCountDown", [this.vo.getCountDown()]);
		this._timeBg.width = 60 + this._acTimeTF.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTF.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTF.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTF.height / 2);
    }

    public playBtnClick(btnType:any){
        if (this.vo.checkIsInEndShowTime()) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
        if (this._isSelectedBtn){
            return;
        }
        this._isSelectedBtn = true;
        if (btnType == "0"){
            //一次
            if (!this.vo.isFree() && this.vo.getArrowNum() <= 0){
                this.showTipView();
                this._isSelectedBtn = false;
                return;
            }
            this._isPlayTen = false;
            this._hitPos = this.getHitPos();
            egret.Tween.pauseTweens(this._sightFlag);
            let damage = this.vo.getSingleDamageByHitPos(this._hitPos);
            this._isDead = this.vo.isDead(damage);
            let freeFlag = 0;
            if (this.vo.isFree()){
                freeFlag = 1;
            }
            this.request(NetRequestConst.REQUEST_ACTIVITY_HUNTIN_KILLBOSS, {activeId: this.aid + "-" + this.code, isFree:freeFlag, isTenPlay:0, hitPos:this._hitPos + 1});
        }
        else if (btnType == "1"){
            //十次
            if (this.vo.getArrowNum() < 5){
                this.showTipView();
                this._isSelectedBtn = false;
                return;
            }
            this._isPlayTen = true;
            this._hitPos = 0;
            this._currSightPos = {x:50, y:50};
            egret.Tween.pauseTweens(this._sightFlag);
            this._sightFlag.setPosition(this._sightMovePos[0].x, this._sightMovePos[0].y);
            if (this.getTypeCode() == "4"){
                this._sightFlag.setPosition(this._sightMovePos[0].x - 10, this._sightMovePos[0].y + 60);
            }
            let damage = this.vo.getSingleDamageByHitPos(this._hitPos);
            this._isDead = this.vo.isDead(damage * this._multiNum);
            this.request(NetRequestConst.REQUEST_ACTIVITY_HUNTIN_KILLBOSS, {activeId: this.aid + "-" + this.code, isFree:0, isTenPlay:1});
        }
    }

    //弹窗提示
    public showTipView():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"achuntingTipTitle",
			msg:LanguageManager.getlocal("achuntgingTipDesc-"+this.code),
			callback:()=>{
                ViewController.getInstance().openView(ViewConst.POPUP.ACHUNTINGREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
            },
			handler:this,
            needCancel:true,
            }); 
    }

    public getHitPos():number{
        this._currSightPos = {x:this._sightFlag.x, y:this._sightFlag.y};
        let desPos = this._sightFlag.x;
        if (this.getTypeCode() == "4"){
           desPos = this._sightFlag.y;
        }
        if (desPos < this._hitPosX[0]){
            return 0;
        }
        else if (desPos < this._hitPosX[1]){
            return 1;
        }
        else{
            return 2;
        }
    }

     //mask
     public showViewMask():void{
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "huntingTouchPos";
        touchPos.touchEnabled = true;
    }

    public hideViewMask():void{
        let touchPos = <BaseBitmap>this.getChildByName("huntingTouchPos");
        if (touchPos){
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    }

    //击杀boss回调
    public killBossHandler(event:egret.Event){
        if (event.data.ret){
            let data = event.data.data.data;
            let playNum = 1;
            this.showViewMask();
            if (this._isPlayTen){
                playNum = this._multiNum;
            }
            App.LogUtil.log("data.rewards: "+data.rewards);
            if (data.rewards){
                this._killRewards = data.rewards;
            }
            if (this.getTypeCode() == "4"){
                for (let i = 0; i < playNum; i++){
                    egret.Tween.get(this._bossContainer).wait(400*i).call(this.playHeartAni, this);
                }
            }
            else{
                for (let i = 0; i < playNum; i++){
                    egret.setTimeout(this.playArrowAni, this, 400*i);
                }
            }
        }
        else{
            this._isSelectedBtn = false;
            egret.Tween.resumeTweens(this._sightFlag);
        }
    }

    /**佳人受击特效 */
    public playHeartAni():void{
        let meetBone = "acyiyibusheview_barbecue";
        let meetBoneName = meetBone+"_ske";
        let view = this;
        if (App.CommonUtil.check_dragon() && ResourceManager.hasRes(meetBoneName)){
            let dragonDB = App.DragonBonesUtil.getLoadDragonBones(meetBone, 1, "kiss");
            view.addChildToContainer(dragonDB);
            let posY = this._bossContainer.y - 488 + this._heartPosY[this._hitPos];
            App.LogUtil.log("this._hitPos "+this._hitPos);
            dragonDB.setPosition(0, posY);
            egret.Tween.get(dragonDB).wait(500).call(()=>{
                view.playBossReduceBloodAni();
                view.playBossAttackAni();
                dragonDB.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
                    App.LogUtil.log("heart dispose");
                    egret.Tween.removeTweens(dragonDB);
                    // dragonDB.dispose();
                    this.container.removeChild(dragonDB);
                    this._heartBoneList.push(dragonDB);
                }, view);
            });
        }
        else{
            view.playBossReduceBloodAni();
            view.playBossAttackAni();
        }
    }

    //播放箭的动画完成之后 掉血 播一次掉一次
    public playArrowAni():void{
        this.closeBtn.setEnable(false);
        let view = this;
        this._arrowAni.playWithTime(1);
        SoundManager.playEffect(SoundConst.EFFECT_ACHUNTING_ARROW);
        this._arrowAni.setEndCallBack(()=>{
            if (this._isPlayTen == false){
                this._arrowAni.setStopFrame(0);
            }
            let desPosX = this._bossContainer.x + this._sightFlag.x;
            let desPosY = this._bossContainer.y + this._sightFlag.y;
            this._arrowDown.setPosition(desPosX, 0);
            this._arrowDown.visible = true;
            egret.Tween.get(this._arrowDown).wait(10).to({y:desPosY}, 200).call(()=>{
                view.playAttackLightAni();
            }, view);
        }, view);
    }

    //箭攻击效果
    public playAttackLightAni():void{
        let view = this;
        let attackL = this._bossContainer.getChildByName("attackLight");
        if (!attackL){
            let attackLightStr = ResourceManager.hasRes("achuntingview_attack_efect-"+this.getTypeCode()) ? "achuntingview_attack_efect-"+this.getTypeCode() : "achuntingview_attack_efect-1";
            let attackLight = BaseBitmap.create(attackLightStr);
            attackLight.anchorOffsetX = attackLight.width/2;
            attackLight.anchorOffsetY = attackLight.height/2;
            attackLight.setPosition(this._sightFlag.x, this._sightFlag.y);
            this._bossContainer.addChild(attackLight);
            attackLight.name = "attackLight";
            attackLight.setScale(0.1);
            egret.Tween.get(attackLight).
            to({scaleX: 0.5, scaleY:0.5}, 50).
            to({scaleX: 1.2, scaleY:1.2}, 70).
            to({scaleX: 1, scaleY:1}, 20).wait(80).call(()=>{
                SoundManager.playEffect(SoundConst.EFFECT_ACHUNTING_ATTACK);
                view.stopBgTween();
                let bossId = this.vo.getBossId();
                if (this._isDead){
                    bossId -= 1;
                }
                if (bossId > 5){
                    this._bossAni.frameImages = this._bossHitImgArr[bossId - 5 - 1];
                }
                else{
                    this._bossAni.frameImages = this._bossHitImgArr[bossId - 1];
                }
                view.playBossReduceBloodAni();
                //播放熊受击效果 150
                view.playBossAttackAni();
                this._arrowDown.visible = false;
                // this._bossContainer.removeChild(attackLight);
            },view);
        } 
        else{
            SoundManager.playEffect(SoundConst.EFFECT_ACHUNTING_ATTACK);
            view.playBossReduceBloodAni();
            view.playBossAttackAni();
            this._arrowDown.visible = false;
        } 
    }

    //熊受击效果
    public playBossAttackAni():void{
        if (this._isPlayTen){
            this._playMultiCount += 1;
        }
        //播放结束 减血 血条 死亡 
        if (this._playMultiCount == this._multiNum || this._isPlayTen == false){
            // this._arrowAni.setStopFrame(0);
            //血条
            if (this._isDead){
                let bossId = this.vo.getBossId();
                if (this.getTypeCode() == "4"){
                    let bossBlood = this.vo.getBossTotalBloodById(bossId - 1);
                    let progressStr = LanguageManager.getlocal("achuntingKillBlood-" + this.code, [""+bossBlood, String(bossBlood)]);
                    this._acProgress.setPercentage(1, progressStr);
                }
                else{
                    let progressStr = LanguageManager.getlocal("achuntingKillBlood-" + this.code, ["0", String(this.vo.getBossTotalBloodById(bossId - 1))]);
                    this._acProgress.setPercentage(0, progressStr);
                }
            }else{
                this.refreshView();
            }
            let view = this;
            App.LogUtil.log("playBossAttackAni 1");
            if (this._killRewards){
                App.LogUtil.log("playBossAttackAni 2");
                egret.setTimeout(()=>{
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":view._killRewards,"isPlayAni":true, "callback":view.rewardEnterCallBack, "handler":view});
                    view._killRewards = null;
                    view._isSelectedBtn = false;
                    if (view._isDead){
                        view._isNeedLoadBoss = true;
                        view._isDead = false;
                        view.refreshView();
                    }
                    App.LogUtil.log("playBossAttackAni 奖励");
                    let attackLight = this._bossContainer.getChildByName("attackLight");
                    if (attackLight){
                        this._bossContainer.removeChild(attackLight);
                    }
                }, view, 1000);
            }
            else
            {
                this._killRewards = null;
                this._isSelectedBtn = false;
                this.rewardEnterCallBack();
            }
            this._playMultiCount = 0; 
        }
    }

    public rewardEnterCallBack():void{
        App.LogUtil.log("playBossAttackAni 3");
        this.hideViewMask();
        this.closeBtn.setEnable(true);
        if (this.getTypeCode() != "4"){
            this._arrowAni.setStopFrame(0);
            if (this._isPlayTen){
                this.removeSightMoveTween();
                this.playSightMoveTween();
            }
            else{
                egret.Tween.resumeTweens(this._sightFlag);
            }
            App.LogUtil.log("playBossAttackAni 4");
            if (this._isNeedLoadBoss){
                this.loadBossImg();
            }
            else{
                let bossId = this.vo.getBossId();
                let bossFrameImage = this._bossAnisArr[bossId - 1];
                if (bossId > 5){
                    bossFrameImage = this._bossAnisArr[bossId - 5 - 1];
                }  
                this._bossAni.frameImages = bossFrameImage;
            }
            this.resumeBgTween();
        }
        else{
            let bossId = this.vo.getBossId();
            if (bossId > 5){
                bossId -= 5;
            } 
            if (this._isNeedLoadBoss){
                let imgStr = "achunting_wife_"+bossId+"-"+this.getTypeCode();
                this._bossContainer.visible = false;
                this._bossContainer.x = GameConfig.stageWidth;
                this._bossAni.setload(imgStr);
                egret.Tween.get(this._bossContainer).wait(50).call(()=>{this._bossContainer.visible = true;}).to({x: GameConfig.stageWidth/2 - this._bossContainer.width/2}, 150).call(()=>{
                    if (this._isPlayTen){
                        this.removeSightMoveTween();
                        this.playSightMoveTween();
                    }
                    else{
                        egret.Tween.resumeTweens(this._sightFlag);
                    }
                    this._isNeedLoadBoss = false;
                });
            }
            else{
                if (this._isPlayTen){
                    this.removeSightMoveTween();
                    this.playSightMoveTween();
                }
                else{
                    egret.Tween.resumeTweens(this._sightFlag);
                }
            }
        } 
    }

    public loadBossImg():void{
        let bossId = this.vo.getBossId();
        if (bossId > 5){
            bossId -= 5;
        } 
        let imgStr = "achunting_bear_effect-"+this.getTypeCode()+"_"+bossId+"_";
        ResourceManager.loadItem(imgStr, this.loadBossImgComplete, this);
    }

    public loadBossImgComplete():void{
        this._isNeedLoadBoss = false;
        let bossId = this.vo.getBossId();
        let bossFrameImage = this._bossAnisArr[bossId - 1];
        if (bossId > 5){
            bossFrameImage = this._bossAnisArr[bossId - 5 - 1];
        }  
        this._bossAni.frameImages = bossFrameImage;
    }

    //掉血飘字
    public playBossReduceBloodAni():void{
        let damage = this.vo.getSingleDamageByHitPos(this._hitPos);
        this.showFlyDamage(this._hitPos + 1, damage); 
    }

    //伤害飘字 type 1 暴击  2 重创  3 轻创
    public showFlyDamage(type:number, damageNum:number){
        let container = new BaseDisplayObjectContainer();
        let dStr = "-"+damageNum;
        if (this.getTypeCode() == "4"){
            dStr = "+"+damageNum;
        }
        let damegeInfo = ComponentManager.getBitmapText(dStr, "damage_fnt");
        container.addChild(damegeInfo);
        let typeImaStr = ResourceManager.hasRes("achuntingview_kill_type_" + type + "-" + this.getTypeCode()) ? "achuntingview_kill_type_" + type + "-" + this.getTypeCode() : "achuntingview_kill_type_" + type + "-1";
        // let typeImaStr = "achuntingview_kill_type_" + type + "-" + this.getTypeCode();
        let typeImg = BaseBitmap.create(typeImaStr);
        container.addChild(typeImg);
        container.width = damegeInfo.width + typeImg.width;
        container.height = damegeInfo.height > typeImg.height ? damegeInfo.height : typeImg.height;
        damegeInfo.x = container.width/2;
        damegeInfo.y = container.height/2 - damegeInfo.height/2;
        typeImg.x = container.width/2 - typeImg.width;
        typeImg.y = container.height/2 - typeImg.height/2;
        container.anchorOffsetX = container.width/2;
        container.anchorOffsetY = container.height/2;
        container.setPosition(GameConfig.stageWidth/2, this._currTitleBg.y + this._currTitleBg.height + 200);
        this.addChildToContainer(container);
        
        let scales:number[] = [];
        if (type == 1){
            container.setScale(1);
            scales = [1.5, 1];
        }
        else if (type == 2){
            container.setScale(0.85);
            scales = [1.3, 0.85];
        }
        else if (type == 3){
            container.setScale(0.7);
            scales = [1.1, 0.7];
        }
        egret.Tween.get(container).wait(1).to({scaleX:scales[0] ,scaleY:scales[0] , y:container.y - 150}, 100).wait(200).to({scaleX:scales[1] ,scaleY:scales[1], alpha:0}, 150).call(()=>{
            this.container.removeChild(container);
        }, this);
    }

    public refreshView():void{
        let bossId = this.vo.getBossId();
        this._currNumTitle.text = LanguageManager.getlocal("achuntingAnimalName_"+bossId+ "-" + this.code);
        this._currTitleBg.width = this._currNumTitle.width + 60;
        this._currTitleBg.x = GameConfig.stageWidth/2 - this._currTitleBg.width/2
        this._currNumTitle.x = this._currTitleBg.x + this._currTitleBg.width/2 - this._currNumTitle.width/2;

        if (this.vo.isLastBoss()){
            this._acProgress.visible = false;
            this._progressIcon.visible = false;
            this._currTitleBg.y = this._acProgress.y + this._acProgress.height + 10 - 25;
            this._currNumTitle.y = this._currTitleBg.y + this._currTitleBg.height/2 - this._currNumTitle.height/2;
        }
        else{
            let progrssNum = (this.vo.getBossTotalBloodById(bossId) - this.vo.getDamage())/this.vo.getBossTotalBloodById(bossId);
            if (this.getTypeCode() == "4"){
                progrssNum = this.vo.getDamage()/this.vo.getBossTotalBloodById(bossId);
            }
            if (this._isDead){
                if (this.getTypeCode() == "4"){
                    this._acProgress.setPercentage(1, LanguageManager.getlocal("achuntingKillBlood-" + this.code, [""+this.vo.getBossTotalBloodById(bossId - 1), String(this.vo.getBossTotalBloodById(bossId - 1))]), TextFieldConst.COLOR_WHITE);
                }
                else{
                    this._acProgress.setPercentage(0, LanguageManager.getlocal("achuntingKillBlood-" + this.code, ["0", String(this.vo.getBossTotalBloodById(bossId - 1))]), TextFieldConst.COLOR_WHITE);
                }
            }
            else{
                let progressStr = LanguageManager.getlocal("achuntingKillBlood-" + this.code, [String(this.vo.getBossTotalBloodById(bossId) - this.vo.getDamage()), String(this.vo.getBossTotalBloodById(bossId))]);
                if (this.getTypeCode() == "4"){
                    progressStr = LanguageManager.getlocal("achuntingKillBlood-" + this.code, [String(this.vo.getDamage()), String(this.vo.getBossTotalBloodById(bossId))]);
                }
                this._acProgress.setPercentage(progrssNum, progressStr);   
            }
            this._acProgress.visible = true;
            this._progressIcon.visible = true;
        }

        this._arrowNum.text = String(this.vo.getArrowNum());
        if (!this.vo.isFree()){
            this._freeDesc.visible = false;
        }
        else{
            this._freeDesc.visible = true;
        }
        this.refreashRewardIcon();
        this.checkQingyuanRed();
    }

    //奖池
    public rewardPoolBtnClick(){
        ViewController.getInstance().openView(ViewConst.POPUP.ACHUNTINGREWARDPOOLVIEW, { aid: this.aid, code: this.code });
    }

    //充值奖励
    public chargeRewardBtnClick(){
        ViewController.getInstance().openView(ViewConst.POPUP.ACHUNTINGREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
    }

    public showFirstInView():void{
        let firstViewContainer = new BaseDisplayObjectContainer();
        firstViewContainer.width = GameConfig.stageWidth;
        firstViewContainer.height = GameConfig.stageHeigth - 85;
        firstViewContainer.setPosition(0, 85);
        this.addChildToContainer(firstViewContainer);
        firstViewContainer.touchEnabled = true;

        let mask = BaseBitmap.create("public_9_viewmask");
        mask.width = firstViewContainer.width;
        mask.height = firstViewContainer.height;
        firstViewContainer.addChild(mask);
        let skinImage = null;
        if (this.getTypeCode() == "4"){
            //佳人衣装
            let skinId = this.vo.cfg.show;
            App.LogUtil.log("skinId: "+skinId);
            let skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
            let boneName = null;
            if (skinCfg && skinCfg.bone){
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                skinImage = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                skinImage.setScale(0.9);  //0.53
                skinImage.anchorOffsetY = skinImage.height;
                skinImage.anchorOffsetX = skinImage.width / 2;
                skinImage.x = - skinImage.width / 2;
                skinImage.y = firstViewContainer.height - 140;
            }
            else {
                skinImage = BaseLoadBitmap.create(skinCfg.body);
                skinImage.width = 640;
                skinImage.height = 840;
                skinImage.setScale(0.6);
                skinImage.anchorOffsetY = skinImage.height;
                skinImage.anchorOffsetX = skinImage.width / 2;
                skinImage.x = - skinImage.width / 2;
                skinImage.y = firstViewContainer.height - 140;
            }
            firstViewContainer.addChild(skinImage);
        }
        
        else{
            let skinCfg =  Config.ServantskinCfg.getServantSkinItemById(this.vo.cfg.show);
            let boneName = undefined;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                skinImage = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                skinImage.scaleY = 0.9;
                skinImage.scaleX = 0.9;
                skinImage.anchorOffsetY = skinImage.height;
                skinImage.anchorOffsetX = skinImage.width / 2;
                // skinImage.x = firstViewContainer.width / 2;
                skinImage.x = - skinImage.width / 2;
                skinImage.y = firstViewContainer.height - 160;
                firstViewContainer.addChild(skinImage);
            }
            else {
                skinImage = BaseLoadBitmap.create(skinCfg.body);
                skinImage.width = 405;
                skinImage.height = 467;
                skinImage.anchorOffsetY = skinImage.height;
                skinImage.anchorOffsetX = skinImage.width / 2;
                skinImage.setScale(0.87);
                // skinImage.x = firstViewContainer.width / 2;
                skinImage.x = - skinImage.width / 2;
                skinImage.y =  firstViewContainer.height - 160;
                firstViewContainer.addChild(skinImage);
            }
        }

        let chatContainer = new BaseDisplayObjectContainer();
        firstViewContainer.addChild(chatContainer);

        let chatBg = BaseBitmap.create("public_9_bg36");
        chatBg.width = 280;
        chatContainer.addChild(chatBg);
        
        let chatTail = BaseBitmap.create("public_9_bg13_tail");
        chatContainer.addChild(chatTail);

        let viewDesc = ComponentManager.getTextField(LanguageManager.getlocal("achuntingStartViewDesc-"+this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        viewDesc.width = chatBg.width - 30;
        chatBg.height = viewDesc.height + 20;
        chatTail.setPosition(chatBg.x + 60, chatBg.y + chatBg.height);
        viewDesc.setPosition(15, 10);
        chatContainer.addChild(viewDesc);
        chatContainer.visible = false;
        chatContainer.setPosition(firstViewContainer.width/2 - chatBg.width/2 + 30, skinImage.y - 440 - chatBg.height - 15);
        if (this.getTypeCode() == "4"){
            chatContainer.setPosition(firstViewContainer.width/2 - chatBg.width/2 + 40, skinImage.y - 440 - chatBg.height - 70);
        }

        let bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = 140;
        bottomBg.setPosition(0, firstViewContainer.height - bottomBg.height);
        firstViewContainer.addChild(bottomBg);

        let viewStartBtn = ComponentManager.getButton("btn_big_yellow", "achuntingStartBtnDesc-"+this.code, ()=>{
            firstViewContainer.visible = false;
            firstViewContainer.dispose();
            // this.container.removeChild(firstViewContainer);
        }, this);
        viewStartBtn.visible = false;
        viewStartBtn.setPosition(bottomBg.x + bottomBg.width/2 - viewStartBtn.width/2, bottomBg.y + bottomBg.height/2 - viewStartBtn.height/2);
        firstViewContainer.addChild(viewStartBtn);
        let offX = firstViewContainer.width/2 - skinImage.width/2 - 70;
        if (this.getTypeCode() == "3"){
            offX = firstViewContainer.width/2 - skinImage.width/2 - 20;
        }
        egret.Tween.get(skinImage).wait(100).
        to({x:offX}, 200).
        wait(300).
        call(()=>{
            chatContainer.visible = true;
        }).
        wait(300).
        call(()=>{
            viewStartBtn.visible = true;
        });
    }

    //刷新奖励按钮红点
    public refreashRewardIcon():void{
        if (this.vo.isShowChargeRewardRedDot() || this.vo.isShowKillRewardRedDot()){
            App.CommonUtil.addIconToBDOC(this._rewardBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._rewardBtn);
        }
        if (!this.vo.isFree() && this.vo.isInActivity()){
            this._freeDesc.visible = false;
        }
        else{
            this._freeDesc.visible = true;
        }
    }

    public checkQingyuanRed():void{
        if (this.code == "3" || this.code == "4"){
            if (this._qingyuanBtn){
                if (this.vo.isShowQingyuanRedDot()){
                    App.CommonUtil.addIconToBDOC(this._qingyuanBtn);
                }
                else{
                    App.CommonUtil.removeIconFromBDOC(this._qingyuanBtn);
                }
            }
        }
    }

    public getTypeCode():string{
        if (this.code == "1" || this.code == "2"){
            return "1";
        }
        return this.code;
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getSoundBgName(){
        return "music_achunting";
    }

    //标题背景名称
    protected getTitleBgName(): string {
        return "achuntingview_titlebg_" + this.getTypeCode();
    }

    protected getTitleStr():string{
        return "";
    }

    //规则
    protected getRuleInfo(): string {
        return "achuntingRuleInfo-" + this.code;
    }

    protected getProbablyInfo():string
	{
		return "achuntingProbablyInfo-" + this.code;
	}

    //资源
    protected getResourceList():string[]{
        let list:string[] = [];
        if (this.code == "1" || this.code == "2"){
            list = ["servant_full2_10351_ske", "servant_full2_10351_tex_json","servant_full2_10351_tex_png"];
        }
        else if (this.code == "3"){
            list = ["destroyshopbtn-3",`destroyshopbtn-3_down`];
        }
        else if (this.code == "4"){
            list = ["destroyshopbtn-3",`destroyshopbtn-3_down`, "achuntingview_table-4", "achuntingview_bg-4", "acyiyibusheview_barbecue_ske", "acyiyibusheview_barbecue_tex_json", "acyiyibusheview_barbecue_tex_png"];
        }
        
        return super.getResourceList().concat([
           "achuntingview_titlebg_" + this.getTypeCode(),
           "achuntingview_infobg_" + this.getTypeCode(),
           "achuntingview_frontbg_" + this.getTypeCode(),
           "achuntingview_behindbg_" + this.getTypeCode(),
           "achuntingview_progress_icon_" + this.getTypeCode(),
           "achuntingview_arrow_icon_" + this.getTypeCode(),
           "achuntingview_frontsinht_" + this.getTypeCode(),
           "achuntingview_kill_type_1-"+ this.getTypeCode(), 
           "achuntingview_kill_type_2-"+ this.getTypeCode(), 
           "achuntingview_kill_type_3-"+ this.getTypeCode(), 
           "achunting_bear_effect-"+this.getTypeCode()+"_1_",
           "achuntingview_attack_efect-"+this.getTypeCode(),
           "achunting_bear_black-"+this.getTypeCode(),
           "progress8","progress3_bg","arena_bottom",
           "achuntingrewardbtn", "achuntingrewardbtn_down",
           "achuntingviewchargebtn", "achuntingviewchargebtn_down",
           "acsearchproofview_common_skintxt",
           "damage_fnt", "achuntingview_frontsinht_1", "achunting_arrow_down-1",
           "achuntingview_arrow_1_", "achuntingview_attack_efect-1","acwealthcarpview_skineffect", 
           "achunting_bear_black-1", "achuntingview_arrow_icon_1", "achuntingview_frontbg_1", "achuntingview_behindbg_1", "achuntingview_progress_icon_1",
           "achuntingview_kill_type_1-1", 
           "achuntingview_kill_type_2-1", 
           "achuntingview_kill_type_3-1",
        ]).concat(list);
    }

    public dispose():void{
        this._timeBg = null;
        this._acTimeTF = null;
        this._acProgress = null;
        this._currTitleBg = null;
        this._currNumTitle = null;
        this._arrowNum = null;
        this._freeDesc = null;
        this._isSelectedBtn = false;
        this._isPlayTen = false;
        this._hitPos = 0;
        this._rewardBtn = null;
        this._sightFlag = null;
        this._isDead = false;
        this._killRewards = null;
        this._playMultiCount = 0;
        this._progressIcon = null;
        this._arrowDown = null;
        this._forestBehindBg = null;
        this._forestBehindBg_ = null;
        this._forestFrontBg = null;
        this._forestFrontBg_ = null;
        this._qingyuanBtn = null;
        for (let i=0; i < this._heartBoneList.length; i++){
            this._heartBoneList[i].dispose();
        }
        this._heartBoneList = [];
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_HUNTIN_KILLBOSS, this.killBossHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HUNTING_GETCHARGE), this.refreshView, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_KILLREWARD), this.refreshView, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashRewardIcon, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL,this.checkQingyuanRed, this);
        super.dispose();
    }
}