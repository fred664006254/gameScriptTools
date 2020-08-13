/**
 * 投石破敌
 * author yangchengguo
 * date 2019.8.27
 * @class AcTravelWithBeautyView
 */
class AcTravelWithBeautyView extends AcCommonView{
    private _timeBg:BaseBitmap = null;
    private _acTimeTf:BaseTextField = null;
    private _toolNum:BaseTextField = null;
    
    public _progressBar:ProgressBar = null;
    public _progressTF:BaseTextField = null;
    public _progressBM:BaseBitmap = null;
    public _progressLight:BaseBitmap = null;
    public _numTF:BaseTextField = null;
    public _boxBM:BaseBitmap = null;
    public _boxLightBM:BaseBitmap = null;
    public _boxRedDot:BaseBitmap = null;
    public _boxList:any = [];
    public _marryFlag:any = [];
    public _maxProNum:number = 0;
    public _startPercent:number = 0;
    public _seprateIndex:number = 5;
    public _isSecond:boolean = false;
    public _isPlay:boolean = false;
    public _isTenPlay:boolean = false;
    public _roleBubbleTip:BaseDisplayObjectContainer = null;
    public _handlerData:any = null;
    public _proNumBg:BaseBitmap = null;
    public _randFlagNum:number = 0;

    private _freeDesc:BaseTextField = null;
    private _onceNeedContainer:BaseDisplayObjectContainer = null;
    private _isSelectPlayBtn:boolean = false;
    private _rechargeBtn:BaseButton = null;
    private _lihuaIndex:number = 0;
    private _lihuaContainer:BaseDisplayObjectContainer = null;

    private _oldScore:number = 0;

    private _lihuaCfg = {
        1: { color: 'hong', pos: [112, 318], scale: 1.2, wait: 0 },
        2: { color: 'huang', pos: [360, 250], scale: 1.2, wait: 200 },
        3: { color: 'lan', pos: [112, 250], scale: 0.8, wait: 400 },
        4: { color: 'huang', pos: [380, 270], scale: 1.2, wait: 650 },
        5: { color: 'hong', pos: [120, 280], scale: 1, wait: 900 },
        6: { color: 'lan', pos: [250, 320], scale: 1.2, wait: 1100 },
	}

    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_REWARD, this.getAchievementCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_GET, this.playCallback, this);
        //剧情
        this.showDialog();

        let bgStr = ResourceManager.hasRes("actravelwithbeauty_bg-"+this.getTypeCode()) ? "actravelwithbeauty_bg-"+this.getTypeCode() : "actravelwithbeauty_bg-1";
        let bg = BaseBitmap.create(bgStr);
        bg.setPosition(0, 0);
        this.addChildToContainer(bg);

        if (this.getTypeCode() == "1"){
            this._lihuaContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._lihuaContainer);
            this._lihuaContainer.setPosition(0, 0);
            egret.Tween.get(this._lihuaContainer,{loop: true}).call(()=>{
                this.showLihua();
            }).wait(1400);
        }

        //桃花姻缘
        if (this.getTypeCode() == "3"){
            this.initMarryFlag();
            let xuehuaParticle = App.ParticleUtil.getParticle("yinghua");
            xuehuaParticle.x = 0;
            xuehuaParticle.y = 120;
            xuehuaParticle.start();;
            this.addChildToContainer(xuehuaParticle);
        }

        let infoBgStr = ResourceManager.hasRes("actravelwithbeauty_infobg-"+this.getTypeCode()) ? "actravelwithbeauty_infobg-"+this.getTypeCode() : "luckydrawwordbg";
        let infoBg = BaseBitmap.create(infoBgStr);
        if (this.getTypeCode() == "1"){
            infoBg.width = GameConfig.stageWidth;
        }
        infoBg.setPosition(this.titleBg.x + this.titleBg.width/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(infoBg);

        //活动时间
        let acDate = ComponentManager.getTextField(LanguageManager.getlocal("acTravelWithBeautyTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDate.setPosition(infoBg.x + 20, infoBg.y + 10);
        this.addChildToContainer(acDate);
         
        //活动说明
        let acDescStr = LanguageManager.getlocal("acTravelWithBeautyInfo-"+this.getTypeCode());
        if (this.getTypeCode() == "3"){
            let rechargeNum = this.vo.getShowWifeSkinNeedGem();
            acDescStr = LanguageManager.getlocal("acTravelWithBeautyInfo-"+this.getTypeCode(), [""+rechargeNum]);
        }
        let acDesc = ComponentManager.getTextField(acDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.setPosition(acDate.x , acDate.y + acDate.height + 6);
        acDesc.width = 600;
        acDesc.lineSpacing = 6;
        this.addChildToContainer(acDesc);
        if (this.getTypeCode() == "1"){
            infoBg.height = acDate.height + acDesc.height + 50;
        }
        
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2 - 2;
		this.addChildToContainer(this._timeBg);
		this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acTravelWithBeautyTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);

        //toolNum
        let toolNumBgStr = ResourceManager.hasRes("actravelwithbeauty_numbg-"+this.getTypeCode()) ? "actravelwithbeauty_numbg-"+this.getTypeCode() : "actravelwithbeauty_numbg";
        let toolNumBg = BaseBitmap.create(toolNumBgStr);
        toolNumBg.setPosition(infoBg.x + infoBg.width - toolNumBg.width - 10, infoBg.y + infoBg.height + 20);
        this.addChildToContainer(toolNumBg);

        let toolNumIconStr = ResourceManager.hasRes("actravelwithbeauty_small_itemicon-"+this.getTypeCode()) ? "actravelwithbeauty_small_itemicon-"+this.getTypeCode() : "actravelwithbeauty_small_itemicon-1";
        let toolNumIcon = BaseBitmap.create(toolNumIconStr);
        toolNumIcon.setPosition(toolNumBg.x + 50, toolNumBg.y + toolNumBg.height/2 - toolNumIcon.height/2);
        this.addChildToContainer(toolNumIcon);

        let currNum = this.vo.getToolNum();
        let toolNum = ComponentManager.getTextField(""+currNum, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        toolNum.setPosition(toolNumIcon.x + toolNumIcon.width + 5, toolNumBg.y + toolNumBg.height/2 - toolNum.height/2 + 4);
        this.addChildToContainer(toolNum);
        this._toolNum = toolNum;
        if (this.getTypeCode() == "3"){
            toolNumIcon.setPosition(toolNumBg.x, toolNumBg.y + toolNumBg.height/2 - toolNumIcon.height/2);
            toolNum.setPosition(toolNumIcon.x + toolNumIcon.width + 10, toolNumBg.y + toolNumBg.height/2 - toolNum.height/2 + 2);
        }

        //bottom
        let bottomBgStr = ResourceManager.hasRes("actravelwithbeauty_bottombg-"+this.getTypeCode()) ? "actravelwithbeauty_bottombg-"+this.getTypeCode() : "arena_bottom";
        let bottomBg = BaseBitmap.create(bottomBgStr);
        if (this.getTypeCode() == "1"){
            bottomBg.width = GameConfig.stageWidth;
            bottomBg.height = 140;
        }
        bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2, GameConfig.stageHeigth - bottomBg.height);
        
        //进度条背景
        let progressBg = null;
        if (this.getTypeCode() == "1"){
            progressBg = BaseLoadBitmap.create("luckdrawprogressbg-1");
            progressBg.width = GameConfig.stageWidth;
            progressBg.height = 107;
            progressBg.setPosition(0, bottomBg.y - progressBg.height);
        }

        //佳人衣装
        let skinId = this.vo.getShowWifeSkinId();
        App.LogUtil.log("skinId: "+skinId);
        let skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        let boneName = null;
        if (skinCfg && skinCfg.bone){
            boneName = skinCfg.bone + "_ske";
        }
        let wife = null;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            wife.setScale(0.75);  //0.53
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            if (this.getTypeCode() == "1"){
                wife.x = progressBg.x + progressBg.width / 2;
                wife.y = progressBg.y + 15;
            }
            else if (this.getTypeCode() == "3"){
                wife.x = bottomBg.x + bottomBg.width/4;
                wife.y = bottomBg.y + 60;
            }
        }
        else {
            wife = BaseLoadBitmap.create(skinCfg.body);
            wife.width = 640;
            wife.height = 840;
            wife.setScale(0.6);
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            if (this.getTypeCode() == "1"){
                wife.x = progressBg.x + progressBg.width / 2;
                wife.y = progressBg.y + 10;
            }
            else if (this.getTypeCode() == "3"){
                wife.setScale(0.55);
                wife.x = bottomBg.x + bottomBg.width/4;
                wife.y = bottomBg.y + 60;
            }
        }
        this.addChildToContainer(wife);
        this.addChildToContainer(bottomBg);
        if (this.getTypeCode() == "1"){
            this.addChildToContainer(progressBg);
        }

        //一次
        let onceBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "acTravelWithBeautyPlayBtnName-"+this.getTypeCode(), this.playBtnClick, this, [0]);
        onceBtn.setPosition(bottomBg.x + 60, bottomBg.y + 60);
        if (this.getTypeCode() == "3"){
            onceBtn.y = bottomBg.y + 100;
        }
        this.addChildToContainer(onceBtn);

        //免费
        let freeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acYiyibusheFree"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        freeDesc.setPosition(onceBtn.x + onceBtn.width/2 - freeDesc.width/2, onceBtn.y - 25);
        this.addChildToContainer(freeDesc);
        this._freeDesc = freeDesc;
        //一次
        let onceNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(onceNeedContainer);
        this._onceNeedContainer = onceNeedContainer;

        let onceNeedDesc = ComponentManager.getTextField(LanguageManager.getlocal("acTravelWithBeautyNeedNum", [String(this.cfg.cost1)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        onceNeedContainer.addChild(onceNeedDesc);

        let needIconStr = ResourceManager.hasRes("actravelwithbeauty_small_itemicon-"+this.getTypeCode()) ? "actravelwithbeauty_small_itemicon-"+this.getTypeCode() : "actravelwithbeauty_small_itemicon-1";
        let oneGemIcon = BaseBitmap.create(needIconStr);
        oneGemIcon.setScale(1);
        onceNeedContainer.addChild(oneGemIcon);
        oneGemIcon.setPosition(onceNeedDesc.x + onceNeedDesc.width, onceNeedDesc.y + onceNeedDesc.height/2 - oneGemIcon.height/2 - 5);
        onceNeedContainer.width = oneGemIcon.width * oneGemIcon.scaleX + onceNeedDesc.width;
        onceNeedContainer.setPosition(onceBtn.x + onceBtn.width/2 - onceNeedContainer.width/2 + 7,  onceBtn.y - onceNeedDesc.height - 5);
        if (this.getTypeCode() == "3"){
            oneGemIcon.setPosition(0, 0);
            onceNeedDesc.setPosition(oneGemIcon.x + oneGemIcon.width, oneGemIcon.y + oneGemIcon.height/2 - onceNeedDesc.height/2 + 5);
            onceNeedContainer.width = oneGemIcon.width * oneGemIcon.scaleX + onceNeedDesc.width;
            onceNeedContainer.setPosition(onceBtn.x + onceBtn.width/2 - onceNeedContainer.width/2 + 0,  onceBtn.y - oneGemIcon.height + 8);
        }
    
        if (this.vo.isFree()){
            freeDesc.visible = true;
            onceNeedContainer.visible = false;
        }
        else{
            freeDesc.visible = false;
            onceNeedContainer.visible = true;
        }

        //十次
        let playMultiBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "acTravelWithBeautyPlayMultiBtnName-"+this.getTypeCode(), this.playBtnClick, this, [1]);
        playMultiBtn.setPosition(GameConfig.stageWidth - 60 - playMultiBtn.width, bottomBg.y + 60);
        if (this.getTypeCode() == "3"){
            playMultiBtn.y = bottomBg.y + 100;
        }
        this.addChildToContainer(playMultiBtn);

        let multiNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(multiNeedContainer);

        let multiNeedDesc = ComponentManager.getTextField(LanguageManager.getlocal("acTravelWithBeautyNeedNum", [String(this.cfg.cost1 * 10)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        multiNeedContainer.addChild(multiNeedDesc);

        let multiGemIcon = BaseBitmap.create(needIconStr);
        multiGemIcon.setScale(1);
        multiNeedContainer.addChild(multiGemIcon);
        multiGemIcon.setPosition(multiNeedDesc.x + multiNeedDesc.width, multiNeedDesc.y + multiNeedDesc.height/2 - multiGemIcon.height/2 - 5);
        multiNeedContainer.width = multiGemIcon.width * multiGemIcon.scaleX + multiNeedDesc.width;
        multiNeedContainer.setPosition(playMultiBtn.x + playMultiBtn.width/2 - multiNeedContainer.width/2 + 7,  playMultiBtn.y - multiNeedDesc.height - 5);
        if (this.getTypeCode() == "3"){
            multiGemIcon.setPosition(0, 0);
            multiNeedDesc.setPosition(multiGemIcon.x + multiGemIcon.width* multiGemIcon.scaleX, multiGemIcon.y + multiGemIcon.height/2 - multiNeedDesc.height/2 + 5);
            multiNeedContainer.width = multiGemIcon.width * multiGemIcon.scaleX + multiNeedDesc.width;
            multiNeedContainer.setPosition(playMultiBtn.x + playMultiBtn.width/2 - multiNeedContainer.width/2 + 0,  playMultiBtn.y - multiGemIcon.height + 8);
        }

        //充值任务
        let rechargeBtnBg = ResourceManager.hasRes("actravelwithbeauty_rechargebtn-"+this.getTypeCode()) ? "actravelwithbeauty_rechargebtn-"+this.getTypeCode() : "actravelwithbeauty_rechargebtn";
        let rechargeBtn = ComponentManager.getButton(rechargeBtnBg, "", ()=>{
            //充值
            ViewController.getInstance().openView(ViewConst.POPUP.ACTRAVELWITHBEAUTYRECHARGEPOPUPVIEW, {aid:this.aid, code:this.code});
        }, this);
        rechargeBtn.setPosition(infoBg.x + 15, infoBg.y + infoBg.height + 15);
        this.addChildToContainer(rechargeBtn);
        this._rechargeBtn = rechargeBtn;
        if (this.vo.isShowRechargeRedDot()){
            App.CommonUtil.addIconToBDOC(this._rechargeBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._rechargeBtn);
        }

        //奖池展示
        let poolBtnBg = ResourceManager.hasRes("actravelwithbeauty_poolbtn-"+this.getTypeCode()) ? "actravelwithbeauty_poolbtn-"+this.getTypeCode() : "actravelwithbeauty_poolbtn";
        let poolBtn = ComponentManager.getButton(poolBtnBg, "", ()=>{
            //奖池
            let topMsg = LanguageManager.getlocal("acTravelWithBeautyPoolTip-"+this.getTypeCode());
            let titleTxt = "acTravelWithBeautyPoolTitle-"+this.getTypeCode();
            let rewards = this.cfg.getPoolRewards();
            ViewController.getInstance().openView(ViewConst.POPUP.ACTRAVELWITHBEAUTYPOOLREWARDPOPUPVIEW, {rewards:rewards, topMsg:topMsg, title: titleTxt});
        }, this);
        poolBtn.setPosition(rechargeBtn.x, rechargeBtn.y + rechargeBtn.height + 10);
        this.addChildToContainer(poolBtn);
       
        //衣装预览
		let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        if (this.getTypeCode() == "1"){
            skinTxtEffect.setPosition(bottomBg.x + bottomBg.width/2 - skinTxtEffect.width/2, progressBg.y - 140);
        }
        else{
            skinTxtEffect.setPosition(bottomBg.x + 60, bottomBg.y - 70);
        }
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        let wifeSkinTopMsg = LanguageManager.getlocal("acTravelWithBeautyWifeSkinTopMsg-"+this.getTypeCode());
        if (this.getTypeCode() == "3"){
            let rechargeNum = this.vo.getShowWifeSkinNeedGem();
            wifeSkinTopMsg = LanguageManager.getlocal("acTravelWithBeautyWifeSkinTopMsg-"+this.getTypeCode(), [""+rechargeNum]);
        }
		skinTxteffect.addTouchTap(() => {
            if (skinId){
                let wifeSkinId = Config.WifeskinCfg.formatRewardItemVoStr(skinId);
                let data = {data:[
                    {idType: wifeSkinId, topMsg:wifeSkinTopMsg, bgName:"", scale: 0.6},
                ]};
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            }
        }, this);
        
        //进度条
        if (this.getTypeCode() == "1"){
            this._progressBar = ComponentManager.getProgressBar("progress12", "progress12_bg", 435);
            // if (this.getTypeCode() == "1"){
                this._progressBar.setPosition(progressBg.x + progressBg.width / 2 - this._progressBar.width / 2 - 10, progressBg.y + progressBg.height / 2 - this._progressBar.height / 2);
            // }
            this.addChildToContainer(this._progressBar);
            let percent = this.vo.getScore() / this.vo.getCurrMaxProNum();
            if (percent > 1){
                percent = 1;
            }
            this._startPercent = percent;
            this._progressBar.setPercentage(percent);

            let progressNumber = LanguageManager.getlocal("acTravelWithBeautyProNum-"+this.getTypeCode(), [String(this.vo.getScore()), String(this.vo.getCurrMaxProNum())]);
            this._progressTF = ComponentManager.getTextField(progressNumber, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            this._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 12);
            this.addChildToContainer(this._progressTF);

            this._progressBM = BaseBitmap.create("acworshipview_slider");
            this._progressBM.anchorOffsetX = this._progressBM.width / 2;
            this._progressBM.anchorOffsetY = this._progressBM.height;
            this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * percent, this._progressBar.y);
            this.addChildToContainer(this._progressBM);

            this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
            this._progressLight.anchorOffsetX = this._progressLight.width;
            this._progressLight.anchorOffsetY = this._progressLight.height / 2;
            this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * 0, this._progressBar.y + this._progressBar.height / 2);
            this.addChildToContainer(this._progressLight);
            this._progressLight.setVisible(false);
        }

        //次数this._bg  24
        if (this.getTypeCode() == "1"){
            let numbg = BaseBitmap.create("acwealthcomingview_numbg");
            numbg.setPosition(this._progressBar.x + 13 - numbg.width, this._progressBar.y + this._progressBar.height / 2 - numbg.height / 2 + 2);
            this.addChildToContainer(numbg);

            //数量TF
            let numDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acTravelWithBeautyToolNum-"+this.getTypeCode()), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            numDescTF.setPosition(numbg.x + numbg.width / 2 - numDescTF.width / 2, numbg.y + 49);
            this.addChildToContainer(numDescTF);
            numDescTF.visible = false;

            //数量TF
            let numStr = LanguageManager.getlocal("acTravelWithBeautyToolNum-"+this.getTypeCode(), [String(this.vo.getScore())]);
            this._numTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            this._numTF.width = 60;
            this._numTF.textAlign = egret.HorizontalAlign.CENTER;
            this._numTF.setPosition(numbg.x + numbg.width / 2 - this._numTF.width / 2, numbg.y + 30);
            this.addChildToContainer(this._numTF);

            //奖励宝箱
            this._boxBM = BaseBitmap.create("acwealthcomingview_box_1");
            this._boxBM.anchorOffsetX = this._boxBM.width / 2;
            this._boxBM.anchorOffsetY = this._boxBM.height;
            this._boxBM.setPosition(this._progressBar.x + this._progressBar.width + this._boxBM.width / 2 + 22, this._progressBar.y + this._progressBar.height / 2 + this._boxBM.height / 2 - 3);
            this.addChildToContainer(this._boxBM);
            this._boxBM.addTouchTap(() => {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTRAVELWITHBEAUTYACHIEVEREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
            }, this);

            //宝箱光 584 816  582.5 810
            this._boxLightBM = BaseBitmap.create("acwealthcomingview_box_light");
            this._boxLightBM.anchorOffsetX = this._boxLightBM.width / 2 - 1.5;
            this._boxLightBM.anchorOffsetY = this._boxLightBM.height / 2 + this._boxBM.width / 2 + 3;
            this._boxLightBM.setPosition(this._boxBM.x, this._boxBM.y);
            this.addChildToContainer(this._boxLightBM);
            this._boxLightBM.alpha = 0;

            //红点	
            this._boxRedDot = BaseBitmap.create("public_dot2");
            this._boxRedDot.setPosition(this._boxBM.x + this._boxBM.width / 2 - this._boxRedDot.width / 2, this._boxBM.y - this._boxBM.height + this._boxRedDot.height / 2)
            this.addChildToContainer(this._boxRedDot);
            if (this.vo.isShowAchievementRewardRedDot()) {
                this._boxBM.setRes("acwealthcomingview_box_2");
                this._boxRedDot.setVisible(true);
            }
            else {
                this._boxBM.setRes("acwealthcomingview_box_1")
                this._boxRedDot.setVisible(false);
            }

            //文字
            let boxWordBM = BaseBitmap.create("luckydrawrewardword-2")
            boxWordBM.setPosition(this._boxBM.x - boxWordBM.width / 2, this._boxBM.y - boxWordBM.height / 2 - 3);
            this.addChildToContainer(boxWordBM);
        
            //特别奖励bubbleTip
            let rewardTip = this.createBubbleTip("acTravelWithBeautyRewardTip-"+this.getTypeCode(), true);
            rewardTip.setPosition(GameConfig.stageWidth - rewardTip.width - 85 , progressBg.y - 40);
            this.addChildToContainer(rewardTip);
            egret.Tween.get(rewardTip, {loop:true}).wait(10000).to({alpha: 0}, 400).wait(20000).to({alpha: 1}, 400);
        
            //人物tip
            let roleTip = this.createBubbleTip("acTravelWithBeautyPlayerTip-"+this.getTypeCode(), false);
            roleTip.setPosition(progressBg.x + progressBg.width/2 + 30, progressBg.y - 450);
            this.addChildToContainer(roleTip);
            egret.Tween.get(roleTip, {loop:true}).wait(10000).to({alpha: 0}, 400).wait(10000).to({alpha: 1}, 400);
        }

        //宝箱
        if (this.getTypeCode() == "1"){
            this.initBox();
            this.refreshBox(this._startPercent);
        }
        else if (this.getTypeCode() == "3"){
            let numbg = BaseBitmap.create("public_9_bg97");
            this.addChildToContainer(numbg);
            this._proNumBg = numbg;

            //数量TF
            let scoreNum = this.vo.getScore();
            if (this.vo.isSecond() && scoreNum > this.vo.getCurrMaxProNum()){
                scoreNum = this.vo.getCurrMaxProNum();
            }
            let numTF = ComponentManager.getTextField(LanguageManager.getlocal("acTravelWithBeautyMarryNum-"+this.getTypeCode(), [""+scoreNum, ""+this.vo.getCurrMaxProNum()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            numbg.width = numTF.width + 30;
            numbg.setPosition(GameConfig.stageWidth - numbg.width - 10, bottomBg.y + 8);
            numTF.setPosition(numbg.x + numbg.width / 2 - numTF.width / 2, numbg.y + numbg.height/2 - numTF.height/2);
            this.addChildToContainer(numTF);
            this._numTF = numTF;
            //进度条相关
            this._progressBar = ComponentManager.getProgressBar("progress12", "progress12_bg", 400);
            this._progressBar.rotation = -90;
            this._progressBar.setPosition(GameConfig.stageWidth - 80, numbg.y - 10);
            this.addChildToContainer(this._progressBar);
            
            this._progressBar.offY = 1;
            let percent = this.vo.getScore() / this.vo.getCurrMaxProNum();
            if (this.vo.isSecond()){
                percent = 1;
            }
            if (percent > 1){
                percent = 1;
            }
            this._progressBar.setPercentage(percent);

            this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
            this._progressLight.anchorOffsetX = this._progressLight.width;
            this._progressLight.anchorOffsetY = this._progressLight.height / 2;
            this._progressLight.rotation = -90;
            this._progressLight.setPosition(this._progressBar.x + this._progressBar.height/2, this._progressBar.y - 1 - this._progressBar.width * percent);
            this.addChildToContainer(this._progressLight);
            if (percent <= 0){
                this._progressLight.visible = false;
            }
            else{
                this._progressLight.visible = true;
            }

            let progressMask = BaseBitmap.create("actravelwithbeauty_progress_mask");
            progressMask.anchorOffsetX = progressMask.width/2;
            progressMask.anchorOffsetY = progressMask.height;
            progressMask.setPosition(this._progressBar.x + this._progressBar.height/2 - 1, this._progressBar.y+1);
            this.addChildToContainer(progressMask);
            
            this.initMarryBox();
            this.refreshMarryBox();

            let bubble = this.showMarryBubbleTip("acTravelWithBeautyPlayerTip-"+this.getTypeCode());
            bubble.setPosition(bottomBg.x + bottomBg.width/2 - 70, bottomBg.y - 340);
            this.addChildToContainer(bubble);
            egret.Tween.get(bubble, {loop:true}).wait(10000).to({alpha: 0}, 400).wait(20000).to({alpha: 1}, 400);
        }
    }

    

    //一次十次点击事件
    public playBtnClick(index:number){
        if (!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isSelectPlayBtn){
            return;
        }
        if (index == 0){
            let freeFlag = 0;
            if (this.vo.isFree()){
                freeFlag = 1;
            }
            if (freeFlag == 0){
                //在此判断道具是否足够
                if (this.vo.getToolNum() < this.cfg.cost1){
                    this.showRechargeTipView();
                    return;
                }
            }
            this._isSelectPlayBtn = true;
            this._isTenPlay = false;
            this._oldScore = this.vo.getScore();
            //调接口
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_GET, { activeId: this.vo.aidAndCode, isFree:freeFlag, isTenPlay:0});
        }
        else{
            if (this.vo.getToolNum() < this.cfg.cost1 * 10){
                this.showRechargeTipView();
                return;
            }
            this._isSelectPlayBtn = true;
            this._isTenPlay = true;
            //调接口
            this._oldScore = this.vo.getScore();
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_GET, { activeId: this.vo.aidAndCode, isFree:0, isTenPlay:1});
        }
    }

    private playCallback(evt:egret.Event){
        if (!evt.data.ret){
            this._isSelectPlayBtn = false;
        }
        let rData = evt.data.data.data;
        if (rData){
            this._handlerData = rData;
            if (this.getTypeCode() == "1"){
                this.showSceneView();
            }
            else if (this.getTypeCode() == "3"){
                this.showViewMask();
                this.playMarryFlagAni();
            }
        }
    }

    //场景展示
    public showSceneView():void{
        let randNum = App.MathUtil.getRandom(1, 10);
        let bgName = "actravelwithbeauty_scenebg-"+this.getTypeCode()+"_"+randNum;
        let msgKey = "acTravelWithBeautyFavorTip-"+this.getTypeCode()+"_"+randNum;
        let view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACTRAVELWITHBEAUTYSCENEPOPUPVIEW, {bgName:bgName, msgKey:msgKey, callback: view.showRewardView, obj:view, aid:view.aid, code:view.code});
    }

    //游玩奖励
    public showRewardView():void{
        let view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":view._handlerData.rewards, "isPlayAni":true, "callback":()=>{
            view._isSelectPlayBtn = false;
            let endPercent = this.vo.getScore() / this._maxProNum;;
            
            view.playProgressBarAni(this._startPercent, endPercent);
        }});
    }

    //气泡提示
    public createBubbleTip(str:string, isSpecialTip:boolean):BaseDisplayObjectContainer{
        let tipContainer = new BaseDisplayObjectContainer();
        let tipBg = BaseBitmap.create("public_9_bg36");
        // tipBg.width = 240;
        tipContainer.addChild(tipBg);
        tipBg.name = "tipBg";
        
        let tipTail = BaseBitmap.create("public_9_bg13_tail");
        tipContainer.addChild(tipTail);
        tipTail.name = "tipTail";

        let tipDesc = ComponentManager.getTextField(LanguageManager.getlocal(str), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        // tipDesc.width = tipBg.width - 20;
        tipBg.height = tipDesc.height + 20;
        // tipDesc.lineSpacing = 5;
        tipBg.width = tipDesc.width + 20;
        if (isSpecialTip){
            tipTail.scaleX = -1;
            tipTail.setPosition(tipBg.x + tipBg.width - tipTail.width + 15, tipBg.y + tipBg.height);
        }
        else{
            tipTail.setPosition(tipBg.x + 30, tipBg.y + tipBg.height);
        }
        tipDesc.setPosition(tipBg.x + 10, tipBg.y + tipBg.height/2 - tipDesc.height/2 + 2);
        tipContainer.addChild(tipDesc);
        tipDesc.name = "tipDesc";
        tipContainer.height = tipBg.height + tipTail.height + 20;
        tipContainer.width = tipBg.width;

        return tipContainer;
    }

    private showMarryBubbleTip(str:string):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let tipBg = BaseBitmap.create("actravelwithbeauty_bubblebg-"+this.getTypeCode());
        // tipBg.width = 240;
        container.addChild(tipBg);
        tipBg.name = "tipBg";
        let tipDesc = ComponentManager.getTextField(LanguageManager.getlocal(str), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        tipDesc.lineSpacing = 6;
        if (tipBg.width - 55 < tipDesc.width + 20){
            tipBg.width = 55 + tipDesc.width + 20;
        }
        if (tipBg.height - 55 < tipDesc.height){
            tipBg.height = 55 + tipDesc.height;
        }
        tipDesc.setPosition(tipBg.x + 25, tipBg.y + (tipBg.height - 21)/2 - tipDesc.height/2);
        container.addChild(tipDesc);

        return container;
    }

    public showRechargeTipView():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"acTravelwithbeautyTipTitle-"+this.getTypeCode(),
            msg:LanguageManager.getlocal("acTravelwithbeautyTipMsg-"+this.getTypeCode()),
            callback:() =>{
                ViewController.getInstance().openView(ViewConst.POPUP.ACTRAVELWITHBEAUTYRECHARGEPOPUPVIEW, {aid:this.aid, code:this.code});
            },
            handler:this,
            needCancel:true,
            });
    }

    //mask
    public showViewMask():void{
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "yiyibusheTouchPos";
        touchPos.touchEnabled = true;
    }

    public hideViewMask():void{
        let touchPos = <BaseBitmap>this.getChildByName("yiyibusheTouchPos");
        if (touchPos){
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    }

    //初始化宝箱 camp
    public initBox():void{
        for (let i = 0; i < this._boxList.length; i++){
            this.container.removeChild(this._boxList[i].box);
            this._boxList[i].box.dispose();
        }
        let dataList = this.cfg.getAchievementList();
        let score = this.vo.getScore();
        let maxNum = dataList[dataList.length - 1].needNum;
        for (let i=0; i < dataList.length; i++){
            let data = dataList[i];
            let box = BaseBitmap.create("acworshipview_box2");
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            let per = data.needNum / maxNum;
            box.setPosition(this._progressBar.x + this._progressBar.width * per, this._progressBar.y + this._progressBar.height / 2 - 7);
            this.addChildToContainer(box);
            box.addTouchTap(() => {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTRAVELWITHBEAUTYACHIEVEREWARDPOPUPVIEW, { aid: this.aid, code: this.code, id: data.id });
            }, this);
            let isPlayAni = score >= data.needNum ? false : true;
            let boxInfo = { box:box, isPlayAni: isPlayAni, percent: Math.round(data.needNum * 1000 / maxNum)};
            this._boxList[i] = boxInfo;
        }
        this._maxProNum = this.vo.getCurrMaxProNum();
    }

    //刷新宝箱
    public refreshBox(percent:number):void{
        // 0 不可领取  1 可领取  2 已领取
        let dataList = this.cfg.getAchievementList();
        for (let i = 0; i < this._boxList.length; i++){
            let boxInfo = this._boxList[i];
            // App.LogUtil.log("fefreshBox: percent "+Math.round(percent * 1000) + "boxinfo.percent: "+boxInfo.percent + "boxInfo.isPlayAni "+boxInfo.isPlayAni);
            if (boxInfo.percent <= Math.round(percent * 1000)){
               if (this.vo.isGetAchievementById(dataList[i].id)){
                    boxInfo.box.setRes("acworshipview_box3");
                }
                else{
                    boxInfo.box.setRes("acworshipview_box1");
                }    
                if (boxInfo.isPlayAni){
                    boxInfo.isPlayAni = false;
                    this.playBoxAni(boxInfo.box, boxInfo.box.x, boxInfo.box.y, this._boxBM.x, this._boxBM.y - this._boxBM.height / 2);
                }  
            }
            else{
                boxInfo.box.setRes("acworshipview_box2");
            }
        }
    }

    public _marryFlagCfg:any = [
        {x: 180, y: 280},
        {x: 280, y: 240},
        {x: 380, y: 320},
        {x: 480, y: 310},
        // {x: 550, y: 270},
    ];

    //姻缘签
    public initMarryFlag():void{
        for (let i=0; i < this._marryFlagCfg.length; i++){
            let marryContainer = new BaseDisplayObjectContainer();
            let marryFlag = BaseBitmap.create("actravelwithbeauty_marryiconclose-"+this.getTypeCode());
            marryContainer.width = marryFlag.width;
            marryContainer.height = marryFlag.height;
            marryContainer.setPosition(this._marryFlagCfg[i].x, this._marryFlagCfg[i].y);
            this.addChildToContainer(marryContainer);
            marryFlag.setPosition(0, 0);
            marryContainer.addChild(marryFlag);
            marryContainer.anchorOffsetX = 76;

            let randNum = App.MathUtil.getRandom(2, 6);
            let rTime = randNum * 170;
            egret.Tween.get(marryContainer, {loop: true}).to({rotation: randNum}, rTime).to({rotation: -randNum}, rTime*2).to({rotation: 0}, rTime);

            let openFlag = BaseBitmap.create("actravelwithbeauty_marryiconopen-"+this.getTypeCode());
            openFlag.anchorOffsetX = 76;
            openFlag.setPosition(this._marryFlagCfg[i].x, this._marryFlagCfg[i].y);
            this.addChildToContainer(openFlag);
            openFlag.visible = false;
            let data = {marryContainer: marryContainer, close: marryFlag, open:openFlag, flagAni:null};
            this._marryFlag[i] = data;
        }
    }

    public playMarryFlagAni():void{
        let randNum = App.MathUtil.getRandom(0, 4);
        this._randFlagNum = randNum;
        if (this._isTenPlay){
            for (let i=0; i < this._marryFlag.length; i++){
                this.setMarryFlagAni(i);
            }
        }
        else{
            this.setMarryFlagAni(randNum);
        }
    }

    public setMarryFlagAni(index:number):void{
        let view = this;
        egret.Tween.pauseTweens(view._marryFlag[index].marryContainer);
        view._marryFlag[index].marryContainer.rotation = 0;
        let closeAni = ComponentManager.getCustomMovieClip("actravelbeautymarry_seleff", 8, 70);
        closeAni.setPosition(view._marryFlag[index].close.x + 24, view._marryFlag[index].close.y - 5);
        view._marryFlag[index].marryContainer.addChild(closeAni);
        closeAni.playWithTime(1);
        closeAni.setEndCallBack(()=>{
            view._marryFlag[index].close.visible = false;
            let openAni = ComponentManager.getCustomMovieClip("actravelbeauty_marryopeneff", 6, 80);
            openAni.setPosition(view._marryFlag[index].close.x, view._marryFlag[index].close.y);
            view._marryFlag[index].marryContainer.addChild(openAni);
            openAni.playWithTime(1);
            openAni.setEndCallBack(()=>{
                if (view._isTenPlay ){
                    if (index == view._marryFlag.length - 1){
                        egret.Tween.get(openAni).wait(500).call(()=>{
                            view.playMarryFlagAniEnd();
                        }).wait(100).call(()=>{
                            for (let i=0; i < this._marryFlag.length; i++){
                                egret.Tween.resumeTweens(this._marryFlag[i].marryContainer);
                                this._marryFlag[i].open.visible = false;
                                this._marryFlag[i].close.visible = true;
                            }
                            openAni.dispose();
                        });
                    }
                    else{
                        let time = (view._marryFlag.length - index) * 500;
                        egret.Tween.get(openAni).wait(time).call(()=>{openAni.dispose();});
                    }
                } 
                else{
                    egret.Tween.get(openAni).wait(500).call(()=>{
                        view.playMarryFlagAniEnd();
                        
                    }).wait(100).call(()=>{
                        for (let i=0; i < this._marryFlag.length; i++){
                            egret.Tween.resumeTweens(this._marryFlag[i].marryContainer);
                            this._marryFlag[i].open.visible = false;
                            this._marryFlag[i].close.visible = true;
                        }
                        openAni.dispose();
                    });
                }
            }, view);
            closeAni.dispose();
        }, view);
    }

    public playMarryFlagAniEnd():void{
        ViewController.getInstance().openView(ViewConst.COMMON.ACTRAVELWITHBEAUTYPLAYREWARDVIEW, {aid: this.aid, code: this.code, rewards:this._handlerData.rewards, pos: this._marryFlagCfg[this._randFlagNum], callback: this.showMarryProAni, obj: this});
        this._isSelectPlayBtn = false;
        this.hideViewMask();
        // for (let i=0; i < this._marryFlag.length; i++){
        //     egret.Tween.resumeTweens(this._marryFlag[i].marryContainer);
        //     this._marryFlag[i].open.visible = false;
        //     this._marryFlag[i].close.visible = true;
        // }
    }

    //姻缘进度box
    public initMarryBox():void{
        // let dataList = this.vo.getAchievementCfg();
        let dataList = this.cfg.getAchievementList();
        let index = this.vo.getSeprateIndex();
        let maxNum = this.vo.getSeprateProNum();
        for (let i=0; i < index; i++){
            let data = dataList[i];
            let box = BaseBitmap.create("actravelwithbeauty_heartbg-"+this.getTypeCode());
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            let boxLight = BaseBitmap.create("actravelwithbeauty_heart-"+this.getTypeCode());
            boxLight.anchorOffsetX = boxLight.width / 2;
            boxLight.anchorOffsetY = boxLight.height / 2;
            let per = data.needNum / maxNum;
            box.setPosition(this._progressBar.x + this._progressBar.height/2 - 1, this._progressBar.y - this._progressBar.width * per);
            boxLight.setPosition(this._progressBar.x + this._progressBar.height/2 -1, this._progressBar.y - this._progressBar.width * per);
            let boxAni = ComponentManager.getCustomMovieClip("actravelbeauty_cangeteff", 8, 70);
            boxAni.playWithTime(0);
            boxAni.visible = false;
            if ( i < index - 1){
                box.setScale(0.5);
                boxLight.setScale(0.5);
                boxAni.setScale(0.5);
            }
            else{
                box.y = this._progressBar.y - this._progressBar.width * per - box.height/2 + 30;
                boxLight.y = this._progressBar.y - this._progressBar.width * per - boxLight.height/2 + 30;
            }
            this.addChildToContainer(box);
            this.addChildToContainer(boxLight);
            boxLight.visible = false;
            boxAni.setPosition(box.x - 54 * boxAni.scaleX, box.y - 48 * boxAni.scaleY);
            this.addChildToContainer(boxAni);
            box.addTouchTap(() => {
                let id = data.id;
                if (this.vo.isSecond()){
                    let achieveId = this.vo.getAchieveRewardId();
                    if (achieveId){
                        id = achieveId;
                    }
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACTRAVELWITHBEAUTYACHIEVEREWARDPOPUPVIEW, { aid: this.aid, code: this.code, id: id});
            }, this);
            this._boxList[i] = {box:box, boxLight:boxLight, boxAni:boxAni};
        }
    }

    public refreshMarryBox():void{
        let dataList = this.vo.getAchievementCfg();
        let index = this.vo.getSeprateIndex();
        // let maxNum = this.vo.getSeprateProNum();
        let currScore = this.vo.getScore();
        let isSecond = this.vo.isSecond();
        for (let i=0; i < this._boxList.length; i++){
            if (isSecond){
                this._boxList[i].boxAni.visible = false;
                this._boxList[i].boxLight.visible = true;
            }
            else{
                if (this.vo.isGetAchievementById(dataList[i].id)){
                    this._boxList[i].boxLight.visible = true;
                    this._boxList[i].boxAni.visible = false;
                }
                else{
                    if (currScore >= dataList[i].needNum){
                        this._boxList[i].boxLight.visible = true;
                        this._boxList[i].boxAni.visible = true;
                    }
                    else{
                        this._boxList[i].boxLight.visible = false;
                        this._boxList[i].boxAni.visible = false;
                    }
                }
            }
        }
        if (isSecond){
            let data = this.cfg.getAchievementList();
            let lastIsHasAni = false;
            for (let i=0; i < index; i++){
                if (!this.vo.isGetAchievementById(data[i].id) && currScore >= data[i].needNum){
                    this._boxList[i].boxAni.visible = true;
                    if (i == index -1){
                        lastIsHasAni = true;
                    }
                }
                else{
                    this._boxList[i].boxAni.visible = false;
                }
            }
            let isHaveReward = false;
            for (let i=index; i < data.length; i++){
                if (!this.vo.isGetAchievementById(data[i].id) && currScore >= data[i].needNum){
                    isHaveReward = true;
                    break;
                }
            }
            App.LogUtil.log("isHaveReward: "+isHaveReward);
            if (lastIsHasAni || isHaveReward){
                this._boxList[this._boxList.length - 1].boxAni.visible = true;
            }
            else{
                this._boxList[this._boxList.length - 1].boxAni.visible = false;
            }
        }
    }

    private refreshView():void{
        if (this.vo.isFree()){
            this._freeDesc.visible = true;
            this._onceNeedContainer.visible = false;
        }
        else{
            this._freeDesc.visible = false;
            this._onceNeedContainer.visible = true;
        }
        if (this.vo.isShowRechargeRedDot()){
            App.CommonUtil.addIconToBDOC(this._rechargeBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._rechargeBtn);
        }
        this._toolNum.text = String(this.vo.getToolNum());

        if (this.getTypeCode() == "1"){
            let numStr = LanguageManager.getlocal("acTravelWithBeautyToolNum-"+this.getTypeCode(), [String(this.vo.getScore())]);
            this._numTF.text = numStr;
            let progressNumber = LanguageManager.getlocal("acTravelWithBeautyProNum-"+this.getTypeCode(), [String(this.vo.getScore()), String(this.vo.getCurrMaxProNum())]);
            this._progressTF.text = progressNumber;

            if (!this.vo.isShowAchievementRewardRedDot()) {
                this._boxRedDot.setVisible(false);
            }
        }
        else{
            let scoreNum = this.vo.getScore();
            if (this.vo.isSecond() && scoreNum > this.vo.getCurrMaxProNum()){
                scoreNum = this.vo.getCurrMaxProNum();
            }
            this._numTF.text = LanguageManager.getlocal("acTravelWithBeautyMarryNum-"+this.getTypeCode(), [""+scoreNum, ""+this.vo.getCurrMaxProNum()]);
            this._proNumBg.width = this._numTF.width + 30;
            this._proNumBg.x = GameConfig.stageWidth - this._proNumBg.width - 10;
            this._numTF.x = this._proNumBg.x + this._proNumBg.width/2 - this._numTF.width/2;
            // this._progressLight.visible = true;
            // let percent = this.vo.getScore()/this.vo.getCurrMaxProNum();
            // if (percent >1){
            //     percent = 1;
            // }
            // else if (percent <= 0 || this._progressBar.width * percent < this._progressLight.width){
            //     this._progressLight.visible = false;
            // }
            // this._progressBar.setPercentage(percent);
            // this._progressLight.setPosition(this._progressBar.x + this._progressBar.height/2, this._progressBar.y - 1 - this._progressBar.width * percent);
        }
    }

    private showMarryProAni():void{
        egret.Tween.get(this).wait(200).call(this.playMarryProAni, this);
    }

    private playMarryProAni():void{
        this._progressLight.visible = true;
        let percent = this.vo.getScore()/this.vo.getCurrMaxProNum();
        if (this.vo.isSecond()){
            percent = 1;
        }
        if (percent >1){
            percent = 1;
        }
        if (percent <= 0 || this._progressBar.width * percent < this._progressLight.width){
            this._progressLight.visible = false;
        }
        this._progressBar.setPercentage(percent);
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.height/2, this._progressBar.y - 1 - this._progressBar.width * percent);
        let currScore = this.vo.getScore();
        let dataList = this.cfg.getAchievementList();
        if (!this.vo.isSecond()){
            for (let i=0; i < this._boxList.length; i++){
                if (dataList[i].needNum > this._oldScore && dataList[i].needNum <= currScore ){
                    //播出发可领取特效
                    this.showHappenGetEffect(i);
                }
            }
        }
        else{
            let index = this.vo.getSeprateIndex();
            for (let i=index; i < dataList.length; i++){
                if (dataList[i].needNum > this._oldScore && dataList[i].needNum <= currScore ){
                    //播出发可领取特效
                    this.showHappenGetEffect(index-1);
                    break;
                }
            }
        }
        this.refreshMarryBox();
    }

    private showHappenGetEffect(index:number):void{
        let happenEff = ComponentManager.getCustomMovieClip("actravelbeauty_happenget", 7, 70);
        if (index != this._boxList.length -1){
            happenEff.setScale(0.5);
        }
        happenEff.setPosition(this._boxList[index].box.x - 50 * happenEff.scaleX, this._boxList[index].box.y -  48 * happenEff.scaleY);
        this.addChildToContainer(happenEff);
        happenEff.playWithTime(1);
        happenEff.setEndCallBack(()=>{
            happenEff.dispose();
        }, this); 
    }

    private getAchievementCallback():void{
        if (this.getTypeCode() == "1"){
            this.refreshBox(this._startPercent);
        }
        else if (this.getTypeCode() == "3"){
            this.refreshMarryBox();
        }
    }

    /**
	 * 进度条的动画
	 */
	private playProgressBarAni(startPercent: number, endPercent: number) {
		this._isPlay = true;
        //每次初始化
		this._progressBar.setPercentage(startPercent);
		egret.Tween.removeTweens(this._progressBar);
		this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y);
		this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y + this._progressBar.height / 2);
		
        let everyTimeValue = 0.005;
        let startTemp = Math.round(startPercent * 1000);
		let endTemp = Math.round(endPercent * 1000);
        let maxTemp = Math.round(1000);
        let op = true;
		if (startTemp < endTemp) {
			op = true;
		}
		else {
			op = false;
        }
        App.LogUtil.log("startTemp: "+startTemp+"  endTemp: "+endTemp+" maxTemp:"+maxTemp);
		egret.Tween.get(this._progressBar, {loop: true}).wait(0.1).call(() => {
			this._progressLight.setVisible(true);
			if (op) {
				//增量动画
				startPercent += everyTimeValue;
				this.refreshBox(startPercent);
				startTemp = Math.round(startPercent * 1000);
				if (startTemp > endTemp) {
					egret.Tween.removeTweens(this._progressBar);
					this._progressLight.setVisible(false);
					if (startTemp > maxTemp) {
						egret.Tween.removeTweens(this._progressBar);
						this._progressLight.setVisible(false);
						return;
					}
					else {
						this._isPlay = false;
					}
					return;
				}
			}
			else {
                //第二阶段动画
                let timeValue = 0.02;
                App.LogUtil.log("第二阶段动画: "+timeValue);
				startPercent -= timeValue;
				this.refreshBox(startPercent);
				startTemp = Math.round(startPercent * 1000);
				if (startTemp < endTemp) {
					egret.Tween.removeTweens(this._progressBar);
                    this._progressLight.setVisible(false);
                    this._startPercent = this.vo.getScore() / this.vo.getCurrMaxProNum();
					this.initBox();
					this.playProgressBarAni(startPercent, this._startPercent);
					this._isPlay = false;
					return;
				}
			}
			
			if (startTemp > maxTemp) {
				this.refreshBox(startPercent);
				egret.Tween.removeTweens(this._progressBar);
				this._progressLight.setVisible(false);
				this._isPlay = false;
				return;
            }
            // let currPercent = startPercent;
            // if (currPercent > 1){
            //     currPercent = 1;
            //     return;
            // }
			this.refreshBox(startPercent);
			this._progressBar.setPercentage(startPercent);
			this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y);
            this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y + this._progressBar.height / 2);
            this._startPercent = startPercent;
		}, this);
	}

    /**宝箱的动画 */
    private playBoxAni(box: BaseBitmap, startPosX: number, startPosY: number, endPosX: number, endPosY: number) {
        let boomEffect = ComponentManager.getCustomMovieClip("boxboomeffect", 8, 70);
        let boom = BaseBitmap.create("boxboomeffect1");
        boomEffect.setScale(1.25);
        boom.setScale(1.25);
        boomEffect.setPosition(startPosX - boom.width * 1.25 / 2 - 120, startPosY - boom.height * 1.25/2 - 120);
        this.addChildToContainer(boomEffect);
        boomEffect.playWithTime(1);
        boomEffect.setEndCallBack(() => {
            this.container.removeChild(boomEffect);
            boomEffect.dispose();
            let lightBall = BaseBitmap.create("acwealthcomingview_lightball");
            lightBall.anchorOffsetX = lightBall.width / 2;
            lightBall.anchorOffsetY = lightBall.height / 2;
            //oneone模式
            lightBall.blendMode = egret.BlendMode.ADD;
            this.addChildToContainer(lightBall);
            lightBall.alpha = 0;
            lightBall.setPosition(startPosX, startPosY);
            lightBall.alpha = 1;
            lightBall.setScale(0.1);
            lightBall.rotation = 0;
            let distanceX = endPosX - startPosX;
            let distanceY = endPosY - startPosY;
            egret.Tween.get(lightBall).to({
                rotation: 360 * 0.14,
                scaleX: 0.8,
                scaleY: 0.8,
                x: startPosX + distanceX * 0.3,
                y: startPosY + distanceY * 0.3
            }, 140).to({
                rotation: 360 * 0.54,
                scaleX: 1,
                scaleY: 1,
                x: startPosX + distanceX * 1,
                y: startPosY + distanceY * 1
            }, 400).call(() => {
                if (this.vo.isShowAchievementRewardRedDot()) {
                    this._boxBM.setRes("acwealthcomingview_box_2");
                }
                else {
                    this._boxBM.setRes("acwealthcomingview_box_1");
                }
                this._boxRedDot.setVisible(false);
                this._boxBM.setScale(1.1);
                this._boxLightBM.setScale(1.1);
                this._boxLightBM.alpha = 1;
                egret.Tween.get(this._boxBM).to({
                    scaleX: 1,
                    scaleY: 1,
                }, 750).call(() => {
                    if (this.vo.isShowAchievementRewardRedDot()) {
                        this._boxRedDot.setVisible(true);
                    }
                    else {
                        this._boxRedDot.setVisible(false);
                    }
                    egret.Tween.removeTweens(this._boxBM);
                    let maxNum = this.vo.getCurrMaxProNum();
                    if (this._maxProNum != maxNum) {
						this._isPlay = true;
						for (let i = 0; i < this._boxList.length; i++) {
							this._boxList[i].box.setVisible(false);
						}
                        this.playProgressBarAni(this._startPercent, this.vo.getScore() / maxNum);
                        this._maxProNum = maxNum;
					}
                }, this);
                egret.Tween.get(this._boxLightBM).to({
                    scaleX: 1,
                    scaleY: 1,
                    alpha: 0,
                }, 750).call(() => {
                    
                }, this);
            }, this).to({
                scaleX: 1.3,
                scaleY: 1,
                rotation: 360 * 1,
                alpha: 0,
            }, 460).call(() => {
                egret.Tween.removeTweens(lightBall);
                this.container.removeChild(lightBall);
                lightBall.dispose();
            }, this);
        }, this);
    }

    public tick():void{
        this._acTimeTf.text = LanguageManager.getlocal("acTravelWithBeautyTimeCountDown", [this.vo.getCountDown()]);
		this._timeBg.width = 60 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    }

    private showDialog():void{
        let key = this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + this.vo.et;
        let flag = LocalStorageManager.get(key);
        if (flag && Number(flag) == 1){
            return;
        }
        LocalStorageManager.set(key, "1");
        let view = this;
        let keyStr = "startDialog_"+this.getTypeCode();
        let startCfg = view.cfg[keyStr];
        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW,{
            aid : view.aid,
            code : ""+view.getTypeCode(),
            AVGDialog : startCfg,
            visitId : "1",
            talkKey: "acTravelWithBeautyStartTalk_",
            bgName: "actravelwithbeauty_bg-"+ view.getTypeCode()
        });
    }

    private showLihua():void {
        this._lihuaIndex++;
        let index = this._lihuaIndex;
        let item = this._lihuaCfg[index];
        if (item) {
            let lihuaclip = ComponentManager.getCustomMovieClip(`lihua_${item.color}000`, 10, 115);
			lihuaclip.setScale(item.scale);
            lihuaclip.x = item.pos[0];
            lihuaclip.y = item.pos[1];
			lihuaclip.playWithTime(1);
            this._lihuaContainer.addChild(lihuaclip);
			lihuaclip.setEndCallBack(() => {
                lihuaclip.alpha = 0;
				lihuaclip.dispose();
				lihuaclip = null;
                if (this._lihuaIndex >= 6) {
                    this._lihuaIndex = 0;
                    return;
                }
                // this.showLihua();
			}, this);
        }
        else {
            if (this._lihuaIndex >= 6) {
                this._lihuaIndex = 0;
            }
            this.showLihua();
        }
	}

    private get cfg():Config.AcCfg.TravelWithBeautyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcTravelWithBeautyVo{
        return <AcTravelWithBeautyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        else if (this.code == "4"){
            return "3";
        }
        return this.code;
    }

    protected getTitleBgName():string{
        return ResourceManager.hasRes("actravelwithbeauty_titlebg-"+this.getTypeCode()) ? "actravelwithbeauty_titlebg-"+this.getTypeCode() : "actravelwithbeauty_titlebg-1";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getTitleStr():string{
        return "";
    }

    protected getRuleInfo():string{
        return "acTravelWithBeautyRuleInfo-"+this.getTypeCode();
    }

    protected getRuleInfoParam():string[]{
        if (this.getTypeCode() == "3"){
            let rechargeNum = this.vo.getShowWifeSkinNeedGem();
            return [""+rechargeNum];
        }
        return [];
    }

    protected getProbablyInfo():string
	{
        return "acTravelWithBeautyProbablyInfo-"+this.getTypeCode();
    }

    protected getResourceList():string[]{
        let list = [];
        if (this.getTypeCode() != "1" && this.getTypeCode() != "3"){
            list = [
                "actravelwithbeauty_bg-1", "actravelwithbeauty_titlebg-1", "actravelwithbeauty_itemicon-1", "actravelwithbeauty_small_itemicon-1",
            ];
        }
        else if (this.getTypeCode() == "3"){
            list = [
                "actravelwithbeauty_bubblebg-"+this.getTypeCode(), "actravelwithbeauty_heart-"+this.getTypeCode(), "actravelwithbeauty_heartbg-"+this.getTypeCode(), "actravelwithbeauty_marrybgtitle-"+this.getTypeCode(), "actravelwithbeauty_marryiconclose-"+this.getTypeCode(), "actravelwithbeauty_marryiconopen-"+this.getTypeCode(), "actravelwithbeauty_numbg-"+this.getTypeCode(), "actravelwithbeauty_poolbtn-"+this.getTypeCode(), "actravelwithbeauty_rechargebtn-"+this.getTypeCode(), "actravelwithbeauty_infobg-"+this.getTypeCode(), "actravelwithbeauty_bottombg-"+this.getTypeCode(), "yinghua_json", "yinghua"
            ];
        }
        return super.getResourceList().concat([
            "actravelwithbeauty_numbg", "actravelwithbeauty_poolbtn", "actravelwithbeauty_rechargebtn", "luckydrawwordbg", "acwealthcarpview_servantskintxt", "collectflag", "acworshipview_slider", "acwealthcomingview_progresslight", "acwealthcomingview_numbg", "acwealthcomingview_box_1", "acwealthcomingview_box_light", "acwealthcomingview_box_2", "luckydrawrewardword-2", "acworshipview_box1", "acworshipview_box2", "acworshipview_box3", "progress12", "progress12_bg", "collectflag", "arena_bottom", "actravelwithbeauty_progress_mask",
            "actravelwithbeauty_bg-"+this.getTypeCode(), "actravelwithbeauty_titlebg-"+this.getTypeCode(), "actravelwithbeauty_itemicon-"+this.getTypeCode(),"actravelwithbeauty_small_itemicon-"+this.getTypeCode()
        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_REWARD, this.getAchievementCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_GET, this.playCallback, this);

        this._timeBg = null;
        this._acTimeTf = null;
        this._toolNum = null;
        this._freeDesc = null;
        this._onceNeedContainer = null;
        this._isSelectPlayBtn = false;
        this._rechargeBtn = null;

        this._progressBar = null;
        this._progressTF = null;
        this._progressBM = null;
        this._progressLight = null;
        this._numTF = null;
        this._boxBM = null;
        this._boxLightBM = null;
        this._boxRedDot = null;
        this._boxList = [];
        this._marryFlag = [];
        this._randFlagNum = 0;
        this._maxProNum = 0;
        this._startPercent = 0;
        this._seprateIndex = 5;
        this._isSecond = false;
        this._isPlay = false;
        this._isTenPlay = false;
        this._proNumBg = null;
        this._roleBubbleTip = null;
        this._handlerData = null;
        this._lihuaIndex = 0;
        if (this._lihuaContainer){
            egret.Tween.removeTweens(this._lihuaContainer);
        }
        this._lihuaContainer = null;
        
        super.dispose();
    }

}