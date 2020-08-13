/**
 * 酒神诗仙
 * author ycg
 * date 2020.2.19
 * @class AcSkinOfLibaiView
 */
class AcSkinOfLibaiView extends AcCommonView{
    private _timeBg:BaseBitmap = null;
    private _acTimeTf:BaseTextField = null;
    private _bottomBg:BaseBitmap = null;
    private _detailBtn:BaseButton = null;
    private _toolNum:BaseTextField = null;
    private _playBtnContainer:BaseDisplayObjectContainer = null;
    private _playBtnTxt:BaseBitmap = null;
    private _proNumBg:BaseBitmap = null;
    private _proNum:BaseTextField = null;
    private _progressBar:BaseBitmap = null;
    private _progressLight:BaseBitmap = null;
    private _boxList:any[] = [];
    private _isPlay:boolean = false;
    private _rewardData:any = null;
    private _lotteryBoneList:BaseLoadDragonBones[] =[];
    private _progressMaskRect:egret.Rectangle = null;

    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACSKINOFLIBAI_LOTTERY, this.lotteryCallback, this);

        let infoBgStr = ResourceManager.hasRes("ac_skinoflibai_infobg-"+this.getTypeCode()) ? "ac_skinoflibai_infobg-"+this.getTypeCode() : "ac_skinoflibai_infobg-1";
        let infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.titleBg.x + this.titleBg.width/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height - 7 - 75);
        this.addChildToContainer(infoBg);

        //活动时间
        let acDate = ComponentManager.getTextField(LanguageManager.getlocal("acSkinoflibaiTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDate.setPosition(infoBg.x + 20, this.titleBg.y + this.titleBg.height + 3);
        this.addChildToContainer(acDate);
         
        //活动说明
        let acDescStr = LanguageManager.getlocal("acSkinoflibaiInfo-"+this.getTypeCode());
        let acDesc = ComponentManager.getTextField(acDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.setPosition(acDate.x , acDate.y + acDate.height + 6);
        acDesc.width = 600;
        acDesc.lineSpacing = 6;
        this.addChildToContainer(acDesc);
        
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2 - 2;
		this.addChildToContainer(this._timeBg);
		this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acSkinoflibaiTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);

        //bottom
        let bottomBgStr = ResourceManager.hasRes("ac_skinoflibai_bottombg-"+this.getTypeCode()) ? "ac_skinoflibai_bottombg-"+this.getTypeCode() : "ac_skinoflibai_bottombg-1";
        let bottomBg = BaseBitmap.create(bottomBgStr);
        bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2, GameConfig.stageHeigth - bottomBg.height);
        this._bottomBg = bottomBg;

        //门客衣装
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.show);
        let boneName = null;
        if (skinCfg && skinCfg.bone){
            boneName = skinCfg.bone + "_ske";
        }
        let servantSkin = null;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            servantSkin = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            servantSkin.setScale(1.1);
            servantSkin.x = GameConfig.stageWidth/2;
            servantSkin.y = bottomBg.y + 10;
            
            this.addChildToContainer(servantSkin);
        }
        else {
            servantSkin = BaseLoadBitmap.create(skinCfg.body);
            servantSkin.width = 406;
            servantSkin.height = 467;
            servantSkin.setScale(1);
            servantSkin.anchorOffsetY = servantSkin.height;
            servantSkin.anchorOffsetX = servantSkin.width / 2;
            servantSkin.x = GameConfig.stageWidth/2;
            servantSkin.y = bottomBg.y + 10;   
        }
        this.addChildToContainer(servantSkin);
        this.addChildToContainer(bottomBg);

        //道具数量
        let toolNumBg = BaseBitmap.create("ac_skinoflibai_toolnumbg");
        toolNumBg.setPosition(bottomBg.x + bottomBg.width - toolNumBg.width - 50, bottomBg.y + bottomBg.height - toolNumBg.height - 2);
        this.addChildToContainer(toolNumBg);

        let toolNumIconStr = ResourceManager.hasRes("ac_skinoflibai_smallitemicon-"+this.getTypeCode()) ? "ac_skinoflibai_smallitemicon-"+this.getTypeCode() : "ac_skinoflibai_smallitemicon-1";
        let toolNumIcon = BaseBitmap.create(toolNumIconStr);
        toolNumIcon.setPosition(toolNumBg.x - 3, toolNumBg.y - 4);
        this.addChildToContainer(toolNumIcon);

        let currNum = this.vo.getToolNum();
        let toolNum = ComponentManager.getTextField(""+currNum, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        toolNum.anchorOffsetX = toolNum.width/2;
        toolNum.setPosition(toolNumBg.x + 86, toolNumBg.y + toolNumBg.height/2 - toolNum.height/2 + 3);
        this.addChildToContainer(toolNum);
        this._toolNum = toolNum;

        //衣装预览
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(bottomBg.x + bottomBg.width/2 - skinTxtEffect.width/2, bottomBg.y - 110);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxt1.anchorOffsetX = skinTxt1.width / 2;
		skinTxt1.anchorOffsetY = skinTxt1.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
		this.addChildToContainer(skinTxt1);
		skinTxt1.blendMode = egret.BlendMode.ADD;
		skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
		skinTxt1.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSKINOFLIBAIDETAILPOPUPVIEW4, {aid: this.aid, code: this.code});
        }, this);

        //活动详情
        let detailBtnBg = ResourceManager.hasRes("ac_skinoflibai_detailbtn-"+this.getTypeCode()) ? "ac_skinoflibai_detailbtn-"+this.getTypeCode() : "ac_skinoflibai_detailbtn-1";
        let detailBtn = ComponentManager.getButton(detailBtnBg, "", ()=>{
            //详情
            ViewController.getInstance().openView(ViewConst.POPUP.ACSKINOFLIBAIDETAILPOPUPVIEW, {aid:this.aid, code:this.code});
        }, this);
        detailBtn.setPosition(bottomBg.x + 20, bottomBg.y + bottomBg.height - 55 - detailBtn.height);
        this.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward()){
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            let detailRed = <BaseBitmap>this._detailBtn.getChildByName("reddot");
            if (detailRed){
                detailRed.setPosition(this._detailBtn.width/2, this._detailBtn.height/2);
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }

        //按钮相关
        let playBtnContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(playBtnContainer);
        this._playBtnContainer = playBtnContainer;
        let playBtnImg = ResourceManager.hasRes("ac_skinoflibai_playbtn-"+this.getTypeCode()) ? "ac_skinoflibai_playbtn-"+this.getTypeCode() : "ac_skinoflibai_playbtn-1";
        let playBtn = ComponentManager.getButton(playBtnImg, "", this.playBtnClick, this);
        playBtnContainer.width = playBtn.width;
        playBtnContainer.height = playBtn.height;
        
        let btnLightImg = ResourceManager.hasRes("ac_skinoflibai_playbtnlight-"+this.getTypeCode()) ? "ac_skinoflibai_playbtnlight-"+this.getTypeCode() : "ac_skinoflibai_playbtnlight-1";
        let btnLight = BaseBitmap.create(btnLightImg);
        btnLight.anchorOffsetX = btnLight.width/2;
        btnLight.anchorOffsetY = btnLight.height/2;
        btnLight.setScale(2.2);
        btnLight.setPosition(playBtnContainer.width/2 - 15, playBtnContainer.height/2);
        playBtnContainer.addChild(btnLight);
        btnLight.name = "btnLight";

        egret.Tween.get(btnLight, {loop: true}).to({rotation: 360}, 4000);
        playBtnContainer.addChild(playBtn);
        playBtnContainer.setPosition(GameConfig.stageWidth - playBtnContainer.width - 20, bottomBg.y - 85);
        
        let playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_playoncebtnname-"+this.getTypeCode()) ? "ac_skinoflibai_playoncebtnname-"+this.getTypeCode() : "ac_skinoflibai_playoncebtnname-1";
        let playBtnTxt = BaseBitmap.create(playBtnTxtImg);
        playBtnTxt.setPosition(playBtnContainer.width/2 - playBtnTxt.width/2 - 15,  playBtnContainer.height - playBtnTxt.height/2);
        playBtnContainer.addChild(playBtnTxt);
        this._playBtnTxt = playBtnTxt;

        if (this.vo.isFree()){
            playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_free-"+this.getTypeCode()) ? "ac_skinoflibai_free-"+this.getTypeCode() : "ac_skinoflibai_free-1";
        }
        else{
            let toolNum = this.vo.getToolNum();
            if (toolNum >= this.cfg.consume1 * 10){
                playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_playmultibtnname-"+this.getTypeCode()) ? "ac_skinoflibai_playmultibtnname-"+this.getTypeCode() : "ac_skinoflibai_playmultibtnname-1";
            }
            else{
                playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_playoncebtnname-"+this.getTypeCode()) ? "ac_skinoflibai_playoncebtnname-"+this.getTypeCode() : "ac_skinoflibai_playoncebtnname-1";
            }
            if (toolNum <= 0){
                btnLight.visible = false;
            }
        }
        playBtnTxt.setRes(playBtnTxtImg);
        
        //进度条相关
        let proNumbg = BaseBitmap.create("public_9_bg97");
        this.addChildToContainer(proNumbg);
        proNumbg.setPosition(20, bottomBg.y - proNumbg.height);
        this._proNumBg = proNumbg;

        //进度数量TF
        let processNum = this.vo.getProcessNum();
        if (this.vo.isSecond() && processNum > this.vo.getCurrMaxProNum()){
            processNum = this.vo.getCurrMaxProNum();
        }
        let proNum = ComponentManager.getTextField(LanguageManager.getlocal("acSkinoflibaiProcessNum-"+this.getTypeCode(), [""+processNum, ""+this.vo.getCurrMaxProNum()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        proNumbg.width = proNum.width + 30;
        proNum.setPosition(proNumbg.x + proNumbg.width / 2 - proNum.width / 2, proNumbg.y + proNumbg.height/2 - proNum.height/2);
        this.addChildToContainer(proNum);
        this._proNum = proNum;

        //进度条相关
        // this._progressBar = ComponentManager.getProgressBar("progress12", "progress12_bg", 400);
        // this._progressBar.rotation = -90;
        // this._progressBar.setPosition(40, proNumbg.y - 5);
        // this.addChildToContainer(this._progressBar);
        let progressBgImg = ResourceManager.hasRes("ac_skinoflibai_progressbg-"+this.getTypeCode()) ? "ac_skinoflibai_progressbg-"+this.getTypeCode() : "ac_skinoflibai_progressbg-1";
        let progressBg = BaseBitmap.create(progressBgImg);
        progressBg.setPosition(60, proNumbg.y - progressBg.height - 15);
        this.addChildToContainer(progressBg);

        let progressImg = ResourceManager.hasRes("ac_skinoflibai_progress-"+this.getTypeCode()) ? "ac_skinoflibai_progress-"+this.getTypeCode() : "ac_skinoflibai_progress-1";
        let progress = BaseBitmap.create(progressImg);
        progress.setPosition(progressBg.x + progressBg.width/2 - progress.width/2 + 1, progressBg.y + progressBg.height/2 - progress.height/2);
        this.addChildToContainer(progress);
        this._progressBar = progress;
        let proMaskRect = new egret.Rectangle(0, progress.height, progress.width, progress.height);
        this._progressMaskRect = proMaskRect;
        
        let percent = processNum / this.vo.getCurrMaxProNum();
        if (this.vo.isSecond()){
            percent = 1;
        }
        if (percent > 1){
            percent = 1;
        }
        // this._progressBar.setPercentage(percent);
        proMaskRect.setTo(0, (1-percent)*progress.height, progress.width, progress.height);
        progress.mask = proMaskRect;

        this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
        this._progressLight.anchorOffsetX = this._progressLight.width;
        this._progressLight.anchorOffsetY = this._progressLight.height / 2;
        this._progressLight.rotation = -90;
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width/2, this._progressBar.y + this._progressBar.height * (1 - percent));
        this.addChildToContainer(this._progressLight);
        if (percent <= 0){
            this._progressLight.visible = false;
        }
        else{
            this._progressLight.visible = true;
        }

        let progressMask = BaseBitmap.create("ac_skinoflibai_processmask-1");
        // progressMask.anchorOffsetX = progressMask.width/2;
        // progressMask.anchorOffsetY = progressMask.height;
        progressMask.setPosition(this._progressBar.x + this._progressBar.width/2 - progressMask.width/2, progressBg.y + progressBg.height - 20); //14
        this.addChildToContainer(progressMask);

        this.initBox();
        this.refreshBox();
    }

    //进度box
    public initBox():void{
        let dataList = this.cfg.getAchieveCfg();
        let index = this.vo.getSeprateIndex();
        let maxNum = this.vo.getSeprateProNum();
        for (let i=0; i < index; i++){
            let data = dataList[i];
            let boxImg = "ac_skinoflibai_scroll_1-"+this.getTypeCode();
            let boxOpeImg = "ac_skinoflibai_scroll_2-"+this.getTypeCode();
            if (i == index -1){
                boxImg = "ac_skinoflibai_scroll_max1-"+this.getTypeCode();
                boxOpeImg = "ac_skinoflibai_scroll_max2-"+this.getTypeCode();
            }
            let box = BaseBitmap.create(boxImg);
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            this.addChildToContainer(box);

            let boxOpen = BaseBitmap.create(boxOpeImg);
            boxOpen.anchorOffsetX = boxOpen.width / 2;
            boxOpen.anchorOffsetY = boxOpen.height / 2;
            this.addChildToContainer(boxOpen);
            boxOpen.visible = false;

            let per = data.specialnum / maxNum;
            box.setPosition(this._progressBar.x + this._progressBar.width/2, this._progressBar.y + this._progressBar.height * (1 - per));

            boxOpen.setPosition(this._progressBar.x + this._progressBar.width/2, this._progressBar.y + this._progressBar.height * (1 - per));

            let boxAni = ComponentManager.getCustomMovieClip("acskinoflibai_scrolleff", 7, 70);
            boxAni.playWithTime(0);
            boxAni.visible = false;
            boxAni.blendMode = egret.BlendMode.ADD;

            let boxAlpha = BaseBitmap.create("public_alphabg");
            boxAlpha.width = box.width;
            boxAlpha.height = box.height;
            boxAlpha.anchorOffsetX = boxAlpha.width/2;
            boxAlpha.anchorOffsetY = boxAlpha.height/2;
            boxAlpha.setPosition(box.x, box.y);
            this.addChildToContainer(boxAlpha);

            if ( i == index - 1){
                // box.y = this._progressBar.y - this._progressBar.width * per - box.height * box.scaleY / 2 + 45;
                boxAni.setScale(1.1);
                boxOpen.y = this._progressBar.y + this._progressBar.height * (1 - per) - 15;
                boxAni.setPosition(boxOpen.x - 36 * boxAni.scaleX + 10, boxOpen.y - 30 * boxAni.scaleY - 5);
            }
            else{
                boxAni.setPosition(box.x - 36 * boxAni.scaleX + 10, box.y - 30 * boxAni.scaleY - 5);
            }

            this.addChildToContainer(boxAni);
           
            boxAlpha.addTouchTap(() => {
                let id = data.id;
                if (this.vo.isSecond()){
                    let achieveId = this.vo.getAchieveRewardId();
                    if (achieveId){
                        id = achieveId;
                    }
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACSKINOFLIBAIDETAILPOPUPVIEW2, { aid: this.aid, code: this.code, id: id});
            }, this);
            this._boxList[i] = {box:box, boxOpen: boxOpen, boxAni:boxAni};
        }
    }

    public refreshBox():void{
        let dataList = this.cfg.getAchieveCfg();
        let currPro = this.vo.getProcessNum();
        let isSecond = this.vo.isSecond();
        for (let i=0; i < this._boxList.length; i++){
            if (isSecond){
                this._boxList[i].box.visible = false;
                this._boxList[i].boxOpen.visible = true;
                if (!this.vo.isGetAchieveRewardById(dataList[i].id) && currPro >= dataList[i].specialnum){
                    this._boxList[i].boxAni.visible = true;
                }
                else{
                    this._boxList[i].boxAni.visible = false;
                }
            }
            else{
                if (this.vo.isGetAchieveRewardById(dataList[i].id)){
                    this._boxList[i].box.visible = false;
                    this._boxList[i].boxOpen.visible = true;
                    this._boxList[i].boxAni.visible = false;
                }
                else{
                    if (currPro >= dataList[i].specialnum){
                        this._boxList[i].box.visible = false;
                        this._boxList[i].boxOpen.visible = true;
                        this._boxList[i].boxAni.visible = true;
                    }
                    else{
                        this._boxList[i].box.visible = true;
                        this._boxList[i].boxOpen.visible = false;
                        this._boxList[i].boxAni.visible = false;
                    }
                }
            }
        }
        if (isSecond){
            let isHaveReward = false;
            for (let i=0; i < dataList.length; i++){
                if (!this.vo.isGetAchieveRewardById(dataList[i].id) && currPro >= dataList[i].specialnum){
                    isHaveReward = true;
                    break;
                }
            }
            App.LogUtil.log("isHaveReward: "+isHaveReward);
            if (isHaveReward){
                this._boxList[this._boxList.length - 1].boxAni.visible = true;
            }
            else{
                this._boxList[this._boxList.length - 1].boxAni.visible = false;
            }
        }
    }

    //饮酒
    private playBtnClick():void{
        if (!this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return;
        }
        if (this._isPlay){
            return;
        }
        let toolNum = this.vo.getToolNum();
        let isTenplay = 0;
        if (this.vo.isFree()){
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACSKINOFLIBAI_LOTTERY, { activeId: this.vo.aidAndCode, isFree: 1, isTenPlay: 0});
        }
        else if (toolNum > 0){
            if (toolNum >= this.cfg.consume1 * 10){
                this._isPlay = true;
                isTenplay = 1;
            }
            NetManager.request(NetRequestConst.REQUEST_ACSKINOFLIBAI_LOTTERY, { activeId: this.vo.aidAndCode, isFree: 0, isTenPlay: isTenplay});
        }
        else{
            this.showRechargeTipView();
        }
    }

    private lotteryCallback(event:egret.Event):void{
        if (!event.data.ret){
            return ;
        }
        let view = this;
        let rData = event.data.data.data;
        view._rewardData = rData;
        this.showViewMask();
        let bone = "jiubei";
        let boneName = bone+"_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            this._playBtnContainer.visible = false;
            let jiubeiBone = App.DragonBonesUtil.getLoadDragonBones(bone, 1, "appear");
            jiubeiBone.setPosition(view._bottomBg.x + view._bottomBg.width/2 - 30, view._bottomBg.y + 70);
            view.addChildToContainer(jiubeiBone);
            jiubeiBone.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
                view.container.removeChild(jiubeiBone);
                view._lotteryBoneList.push(jiubeiBone);
                view.showPoemAni();
            }, view);
        }
        else{
            view.showPoemAni();
        }
    }

    private showPoemAni():void{
        let poemContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(poemContainer);
        let poemBgImg = ResourceManager.hasRes("ac_skinoflibai_poem_bg-"+this.getTypeCode()) ? "ac_skinoflibai_poem_bg-"+this.getTypeCode() : "ac_skinoflibai_poem_bg-1";
        let poemBg = BaseBitmap.create(poemBgImg);
        poemContainer.addChild(poemBg);
        let poemBg_ = BaseBitmap.create(poemBgImg);
        poemContainer.addChild(poemBg_);
        poemBg_.anchorOffsetX = poemBg_.width/2;
        poemBg_.anchorOffsetY = poemBg_.height;
        poemBg_.setPosition(poemBg.x + poemBg.width/2, poemBg.y + poemBg.height - 1);
        poemBg_.rotation = 180;

        poemContainer.width = poemBg.width;
        poemContainer.height = poemBg.height * 2;
        poemContainer.setPosition(this._bottomBg.x + this._bottomBg.width - poemContainer.width - 20, this._bottomBg.y - poemContainer.height - 40);

        if (PlatformManager.checkIsTextHorizontal()){
            poemBg.anchorOffsetX = poemBg.width/2;
            poemBg.anchorOffsetY = poemBg.height;
            poemBg.rotation = -90;
            poemBg_.rotation = 90;
            poemContainer.height = poemBg.width;
            poemContainer.width = poemBg.height * 2;
            poemBg.setPosition(poemContainer.width/2, poemContainer.height/2);
            poemBg_.setPosition(poemContainer.width/2 - 1, poemContainer.height/2);
            poemContainer.setPosition(this._bottomBg.x + this._bottomBg.width/2 - poemContainer.width/2, this._bottomBg.y - poemContainer.height - 60);
        }
        //poem 
        let randIndex = App.MathUtil.getRandom(1, 9);
        let poemImg = ResourceManager.hasRes("ac_skinoflibai_poem"+randIndex+"-"+this.getTypeCode()) ? "ac_skinoflibai_poem"+randIndex+"-"+this.getTypeCode() : "ac_skinoflibai_poem"+randIndex+"-1";
        let poem = BaseBitmap.create(poemImg);
        poemContainer.addChild(poem);
        let poemMask = new egret.Rectangle(poem.width/2, 0, poem.width/2, 60);
        poem.mask = poemMask;

        let poem_ = BaseBitmap.create(poemImg);
        poemContainer.addChild(poem_);
        let poemMask_ = new egret.Rectangle(0, 0, poem_.width/2, 60);
        poem_.mask = poemMask_;
        
        //笔刷
        let brushImg = ResourceManager.hasRes("ac_skinoflibai_poem_brush-"+this.getTypeCode()) ? "ac_skinoflibai_poem_brush-"+this.getTypeCode() : "ac_skinoflibai_poem_brush-1";
        let brush = BaseBitmap.create(brushImg);
        brush.anchorOffsetY = brush.height;
        poemContainer.addChild(brush);
        brush.setPosition(poem.x + poem.width/2, poem.y + 80);  //35
        let brushTime = 150;
        if (PlatformManager.checkIsTextHorizontal()){
            poemMask = new egret.Rectangle(0, 0, 35, poem.height/2);
            poem.mask = poemMask;

            poemMask_ = new egret.Rectangle(0, poem.height/2, 35, poem.height/2);
            poem_.mask = poemMask_;
            brush.setPosition(poem.x + 80, poem.y + poem.height/2);
            let offY = 35;
            egret.Tween.get(brush).call(()=>{this.setPoemMask(poem, poemMask, null)})
            .to({y: brush.y - offY, x: brush.x + 30}, brushTime)
            .to({y: brush.y, x: brush.x + 60}, brushTime)
            .to({y: brush.y - offY, x: brush.x + 90}, brushTime)
            .to({y: brush.y, x: brush.x + 120}, brushTime)
            .to({y: brush.y - offY, x: brush.x + 150}, brushTime)
            .to({y: brush.y, x: brush.x + 180}, brushTime)
            .to({y: brush.y - offY, x: brush.x + 210}, brushTime)
            .to({y: brush.y, x: brush.x + 240}, brushTime)
            .to({y: brush.y - offY, x: brush.x + 270}, brushTime)
            .to({y: brush.y, x: brush.x + 300}, brushTime)
            .to({y: brush.y + 10, x: brush.x}, 0)
            .call(()=>{this.setPoemMask(poem_, poemMask_, null)})
            .to({y: brush.y + 10 + offY, x: brush.x + 30}, brushTime)
            .to({y: brush.y + 10, x: brush.x + 60}, brushTime)
            .to({y: brush.y + 10 + offY, x: brush.x + 90}, brushTime)
            .to({y: brush.y + 10, x: brush.x + 120}, brushTime)
            .to({y: brush.y + 10 + offY, x: brush.x + 150}, brushTime)
            .to({y: brush.y + 10, x: brush.x + 180}, brushTime)
            .to({y: brush.y + 10 + offY, x: brush.x + 210}, brushTime)
            .to({y: brush.y + 10, x: brush.x + 240}, brushTime)
            .to({y: brush.y + 10 + offY, x: brush.x + 270}, brushTime)
            .to({y: brush.y + 10, x: brush.x + 300}, brushTime)
            .call(()=>{
                poemContainer.dispose();
                this.showRewardView();
            });
        }
        else{
            let offX = 35;
            egret.Tween.get(brush).call(()=>{this.setPoemMask(poem, poemMask, null)})
            .to({x: brush.x + offX, y: brush.y + 30}, brushTime)
            .to({x: brush.x, y: brush.y + 60}, brushTime)
            .to({x: brush.x + offX, y: brush.y + 90}, brushTime)
            .to({x: brush.x, y: brush.y + 120}, brushTime)
            .to({x: brush.x + offX, y: brush.y + 150}, brushTime)
            .to({x: brush.x, y: brush.y + 180}, brushTime)
            .to({x: brush.x + offX, y: brush.y + 210}, brushTime)
            .to({x: brush.x, y: brush.y + 240}, brushTime)
            .to({x: brush.x + offX, y: brush.y + 270}, brushTime)
            .to({x: brush.x, y: brush.y + 300}, brushTime)
            .to({x: brush.x - 10, y: brush.y}, 0)
            .call(()=>{this.setPoemMask(poem_, poemMask_, null)})
            .to({x: brush.x - 10 - offX, y: brush.y + 30}, brushTime)
            .to({x: brush.x - 10, y: brush.y + 60}, brushTime)
            .to({x: brush.x - 10 - offX, y: brush.y + 90}, brushTime)
            .to({x: brush.x - 10, y: brush.y + 120}, brushTime)
            .to({x: brush.x - 10 - offX, y: brush.y + 150}, brushTime)
            .to({x: brush.x - 10, y: brush.y + 180}, brushTime)
            .to({x: brush.x - 10 - offX, y: brush.y + 210}, brushTime)
            .to({x: brush.x - 10, y: brush.y + 240}, brushTime)
            .to({x: brush.x - 10 - offX, y: brush.y + 270}, brushTime)
            .to({x: brush.x - 10, y: brush.y + 300}, brushTime)
            .call(()=>{
                poemContainer.dispose();
                this.showRewardView();
            });
        }
    }

    private setPoemMask(obj:BaseBitmap, mask:egret.Rectangle, callback:Function):void{
        egret.Tween.get(this).wait(50).call(()=>{
            if (PlatformManager.checkIsTextHorizontal()){
                egret.Tween.get(obj, {loop:true}).call(()=>{
                    let maskW = mask.width;
                    let maskY = mask.y;
                    if (maskW >= 395){
                        egret.Tween.removeTweens(obj);
                        if (callback){
                            callback.apply(this);
                        }
                    }
                    else{
                        let offW = maskW + 30;
                        mask.setTo(0, maskY, offW, obj.height/2);
                        obj.mask = mask;
                    }
                }).wait(150);
            }
            else{
                egret.Tween.get(obj, {loop:true}).call(()=>{
                    let maskH = mask.height;
                    let maskX = mask.x;
                    if (maskH >= 370){
                        egret.Tween.removeTweens(obj);
                        if (callback){
                            callback.apply(this);
                        }
                    }
                    else{
                        let offH = maskH + 30;
                        mask.setTo(maskX, 0, obj.width/2, offH);
                        obj.mask = mask;
                    }
                }).wait(150);
            }
        });    
    }

    private showRewardView():void{
        let view = this;
        let rData = view._rewardData;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPGETREWARDPOPUPVIEW, {
            rewards: rData.rewards, otherRewards: rData.otherrewards, criArr: rData.criArr, code: view.getTypeCode(), aid: view.aid, isPlayAni: true, aidCode: view.vo.aidAndCode, msgStr: "acSkinoflibaiRewardMsg-"+view.getTypeCode(),callback:()=>{
                view.refreshUI();
                view.hideViewMask();
                view._isPlay = false;
            }, handler: view}); 
        
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    }

    private refreshUI():void{
        //play btn
        let toolNum = this.vo.getToolNum();
        this._playBtnContainer.visible = true;
        let btnLight = <BaseBitmap>this._playBtnContainer.getChildByName("btnLight");
        btnLight.visible = true;
        let playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_playoncebtnname-"+this.getTypeCode()) ? "ac_skinoflibai_playoncebtnname-"+this.getTypeCode() : "ac_skinoflibai_playoncebtnname-1";;
        if (this.vo.isFree()){
            playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_free-"+this.getTypeCode()) ? "ac_skinoflibai_free-"+this.getTypeCode() : "ac_skinoflibai_free-1";
        }
        else if (toolNum > 0){
            if (toolNum > this.cfg.consume1 * 10){
                playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_playmultibtnname-"+this.getTypeCode()) ? "ac_skinoflibai_playmultibtnname-"+this.getTypeCode() : "ac_skinoflibai_playmultibtnname-1";
            }
            else{
                playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_playoncebtnname-"+this.getTypeCode()) ? "ac_skinoflibai_playoncebtnname-"+this.getTypeCode() : "ac_skinoflibai_playoncebtnname-1";
            }
        }
        else{
            btnLight.visible = false;
        }
        this._playBtnTxt.setRes(playBtnTxtImg);

        //进度条
        let processNum = this.vo.getProcessNum();
        if (this.vo.isSecond() && processNum > this.vo.getCurrMaxProNum()){
            processNum = this.vo.getCurrMaxProNum();
        }
        this._proNum.text = LanguageManager.getlocal("acSkinoflibaiProcessNum-"+this.getTypeCode(), [""+processNum, ""+this.vo.getCurrMaxProNum()]);
        this._proNumBg.width = this._proNum.width + 30;
        this._proNum.x = this._proNumBg.x + this._proNumBg.width/2 - this._proNum.width/2;

        let percent = processNum / this.vo.getCurrMaxProNum();
        if (this.vo.isSecond()){
            percent = 1;
        }
        if (percent > 1){
            percent = 1;
        }
        this._progressMaskRect.setTo(0, (1-percent)*this._progressBar.height, this._progressBar.width, this._progressBar.height);
        this._progressBar.mask = this._progressMaskRect;
        // this._progressBar.setPercentage(percent);
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width/2, this._progressBar.y + this._progressBar.height * (1 - percent));

        //宝箱
        this.refreshBox();
    }

    public refreshView():void{
        let toolNum = this.vo.getToolNum();
        this._toolNum.text = ""+toolNum;
        this._toolNum.anchorOffsetX =this._toolNum.width/2;

        //红点
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward()){
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            let detailRed = <BaseBitmap>this._detailBtn.getChildByName("reddot");
            if (detailRed){
                detailRed.setPosition(this._detailBtn.width/2, this._detailBtn.height/2);
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }

        if (!this._isPlay){
            this.refreshUI();
        }
    }

    public showRechargeTipView():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"acSkinoflibaiRechargeTipTitle-"+this.getTypeCode(),
            msg:LanguageManager.getlocal("acSkinoflibaiRechargeTipMsg-"+this.getTypeCode()),
            callback:() =>{
                ViewController.getInstance().openView(ViewConst.POPUP.ACSKINOFLIBAIDETAILPOPUPVIEW, {aid: this.aid, code: this.code});
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
        touchPos.name = "viewMaskTouchPos";
        touchPos.touchEnabled = true;
    }

    public hideViewMask():void{
        let touchPos = <BaseBitmap>this.getChildByName("viewMaskTouchPos");
        if (touchPos){
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    }

    public tick():void{
        this._acTimeTf.text = LanguageManager.getlocal("acSkinoflibaiTimeCountDown", [this.vo.getCountDown()]);
    }

    private get cfg() : Config.AcCfg.SkinOfLibaiCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcSkinOfLibaiVo{
        return <AcSkinOfLibaiVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected getBgName():string{
        return ResourceManager.hasRes("ac_skinoflibai_bg-"+this.getTypeCode()) ? "ac_skinoflibai_bg-"+this.getTypeCode() : "ac_skinoflibai_bg-1";
    }

    protected getTitleBgName():string{
        return ResourceManager.hasRes("ac_skinoflibai_titlebg-"+this.getTypeCode()) ? "ac_skinoflibai_titlebg-"+this.getTypeCode() : "ac_skinoflibai_titlebg-1";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getTitleStr():string{
        return "";
    }

    protected getRuleInfo():string{
        return "acSkinoflibaiRuleInfo-"+this.getTypeCode();
    }

    protected getProbablyInfo():string
	{
		return "acSkinoflibaiProbablyInfo-" + this.getTypeCode();
	}

    public getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    protected getResourceList():string[]{
        let list = [];
        if (this.getTypeCode() != "1"){
            list = [
                "acskinoflibai_code1"
            ];
        }
        else{
            list = [
                "jiubei_ske", "jiubei_tex_json", "jiubei_tex_png"
            ];
        }
        return super.getResourceList().concat([
            "acwealthcomingview_progresslight", "ac_skinoflibai_toolnumbg", "acwealthcarpview_servantskintxt", "progress12", "progress12_bg",
            "acskinoflibai_code"+this.getTypeCode(),
            "ac_skinoflibai_bg-"+this.getTypeCode(),
            "ac_skinoflibai_infobg-"+this.getTypeCode(),
            "ac_skinoflibai_titlebg-"+this.getTypeCode(),

        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACSKINOFLIBAI_LOTTERY, this.lotteryCallback, this);

        this._timeBg = null;
        this._acTimeTf = null;
        this._bottomBg = null;
        this._detailBtn = null;
        this._toolNum = null;
        this._playBtnContainer = null;
        this._playBtnTxt = null;
        this._proNumBg = null;
        this._proNum = null;
        this._progressBar = null;
        this._progressLight = null;
        this._boxList = [];
        this._isPlay = false;
        this._rewardData = null;
        if (this._lotteryBoneList.length > 0){
            for (let i=0; i < this._lotteryBoneList.length; i++){
                this._lotteryBoneList[i].dispose();
            }
        }
        this._lotteryBoneList = [];
        this._progressMaskRect = null;

        super.dispose();
    }
}