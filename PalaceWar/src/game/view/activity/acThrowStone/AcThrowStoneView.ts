/**
 * 投石破敌
 * author yangchengguo
 * date 2019.8.27
 * @class AcThrowStoneView
 */
class AcThrowStoneView extends AcCommonView{
    public _timeBg:BaseBitmap = null;
    public _acTimeTf:BaseTextField = null;
    public _killNumText:BaseTextField = null;
    public _progress:ProgressBar = null;
    public _stoneNum:BaseTextField = null;
    public _freeDesc:BaseTextField = null;
    public _playOneNeedContainer:BaseDisplayObjectContainer = null;
    public _isSelectPlayBtn:boolean = false;
    public _isPlayTen:boolean = false;
    public _rewardBtn:BaseButton = null;
    public _wifeContainer:BaseDisplayObjectContainer = null;
    public _servantContainer:BaseDisplayObjectContainer = null;
    public _isShowWife:Boolean = false;
    public _campContainers:BaseDisplayObjectContainer[] = [];
    public _bubbleTipIndexs:number[] = [1, 2, 3, 4, 5];
    public _playTenRewards:string = null;
    public _bubbleTip:BaseDisplayObjectContainer = null;
    public _skinTxt:BaseBitmap = null;
    public _skinTxtEffect:BaseBitmap = null;
    public _progressBar:ProgressBar = null;
    public _progressTF:BaseTextField = null;
    public _progressBM:BaseBitmap = null;
    public _progressLight:BaseBitmap = null;
    public _numTF:BaseTextField = null;
    public _boxBM:BaseBitmap = null;
    public _boxLightBM:BaseBitmap = null;
    public _boxRedDot:BaseBitmap = null;
    public _boxList:any = [];
    public _maxProNum:number = 0;
    public _isPlay:boolean = false;
    public _oldScore:number = 0;
    public _startPercent:number = 0;
    public _isSecond:boolean = false;
    public _mainCampSmoke:any = null;
    public _seprateIndex:number = 5;
    public _bg:BaseBitmap = null;

    public constructor(){
        super();
    }

    protected getContainerY():number
	{
		return 0;
	}

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWSTONE_LOTTERY, this.throwStoneCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_THROWSTONE_CHANGEVIEW, this.showStoneEffect, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWSTONE_GETACHIEVEMENT, this.getAchievementCallback, this);
        
        let bgImg = ResourceManager.hasRes("acthrowstone_bg-"+this.getTypeCode())?"acthrowstone_bg-"+this.getTypeCode() : "acthrowstone_bg-1";
        let bg = BaseBitmap.create(bgImg);
        bg.anchorOffsetY = bg.height;
        bg.y = GameConfig.stageHeigth - 100;
        this.addChildToContainer(bg);
        this._bg = bg;

        let acDescBg = BaseBitmap.create("forpeople_top");
        acDescBg.y = 0;
        // this.addChildToContainer(acDescBg);

        //活动时间
        let acDate = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneDate", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        acDate.setPosition(20, 10);
        // this.addChildToContainer(acDate);
         
        //活动说明
        let acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneDesc-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        acDesc.setPosition(acDate.x , acDate.y + acDate.height + 10+8);
        acDesc.width = 600;
        acDesc.lineSpacing = 6;
        // this.addChildToContainer(acDesc);
        let acInfoHeight = acDate.height + acDesc.height + 30;
        if (acDescBg.height >= acInfoHeight){
            acDescBg.y = acDate.y - (acDescBg.height - acInfoHeight);
        }

        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = acDescBg.y + acDescBg.height - this._timeBg.height / 2 - 2;
		// this.addChildToContainer(this._timeBg);
		this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        // this.addChildToContainer(this._acTimeTf);
       
        //当前物品数量
        let stoneNumBg = BaseBitmap.create("public_9_resbg");
        stoneNumBg.setPosition(GameConfig.stageWidth - stoneNumBg.width - 15, acDescBg.y + acDescBg.height + stoneNumBg.height - 20);
        // this.addChildToContainer(stoneNumBg);
        //score icon
        let stoneIconImg = ResourceManager.hasRes("acthrowstone_stone_icon-"+this.getTypeCode())?"acthrowstone_stone_icon-"+this.getTypeCode() : "acthrowstone_stone_icon-1";
        let stoneIcon = BaseBitmap.create(stoneIconImg);
        stoneIcon.setPosition(stoneNumBg.x - 3, stoneNumBg.y + 0);
        // this.addChildToContainer(stoneIcon);
        //score num
        let scoreNum = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        scoreNum.setPosition(stoneIcon.x + stoneIcon.width - 5, stoneNumBg.y + stoneNumBg.height/2 - scoreNum.height/2 + 2);
        // this.addChildToContainer(scoreNum);
        this._stoneNum = scoreNum;

        let wallImg = ResourceManager.hasRes("acthrowstone_wall-"+this.getTypeCode())?"acthrowstone_wall-"+this.getTypeCode() : "acthrowstone_wall-1";
        let wallBg = BaseBitmap.create(wallImg);

        // new bottom
        let bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = 140;
        bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2, GameConfig.stageHeigth - bottomBg.height - this.titleBg.height - 14);

        this._isSecond = this.vo.isSecond();
        //进度条背景
        let progressBg = BaseLoadBitmap.create("luckdrawprogressbg-1");
        progressBg.width = 640;
        progressBg.height = 107;
        progressBg.setPosition(0, bottomBg.y - progressBg.height);
        wallBg.setPosition(progressBg.x, progressBg.y - 65);
        
        //兵营
        this.createCamp();

        //兵营烟 左边
        let campSmokeLeft = ComponentManager.getCustomMovieClip("battlegroundsmapsmoke", 10, 70);
        campSmokeLeft.setPosition(bg.x + 108, bg.y - 916);
        this.addChildToContainer(campSmokeLeft);
        campSmokeLeft.playWithTime(0);

        //兵营烟 右下边
        let campSmokeRight = ComponentManager.getCustomMovieClip("battlegroundsmapsmoke", 10, 70);
        campSmokeRight.setPosition(bg.x + 376, bg.y - 646);
        this.addChildToContainer(campSmokeRight);
        campSmokeRight.playWithTime(0);

        //兵营烟 右上边
        let campSmokeRightUp = ComponentManager.getCustomMovieClip("battlegroundsmapsmoke", 10, 70);
        campSmokeRightUp.setPosition(bg.x + 525, bg.y - 776);
        this.addChildToContainer(campSmokeRightUp);
        campSmokeRightUp.playWithTime(0);

        //主阵 烟
        let mainCampSmoke = ComponentManager.getCustomMovieClip("battlegroundsmoke3_", 10, 70);
        mainCampSmoke.setPosition(bg.x + 291, bg.y - 805);
        mainCampSmoke.setScale(1.4);
        this.addChildToContainer(mainCampSmoke);
        mainCampSmoke.playWithTime(0);
        this._mainCampSmoke = mainCampSmoke;
        mainCampSmoke.visible = false;

        this.addChildToContainer(acDescBg);
        this.addChildToContainer(acDate);
        this.addChildToContainer(acDesc);
        this.addChildToContainer(this._timeBg);
        this.addChildToContainer(this._acTimeTf);
        this.addChildToContainer(stoneNumBg);
        this.addChildToContainer(stoneIcon);
        this.addChildToContainer(scoreNum);

        //红颜
        this._wifeContainer = this.createWifeOrServant(String(this.cfg.show1));
        this._wifeContainer.setPosition(progressBg.x, progressBg.y - 20);
        this.addChildToContainer(this._wifeContainer);
        //门客
        this._servantContainer = this.createWifeOrServant(String(this.cfg.show2));
        this._servantContainer.setPosition(progressBg.x, progressBg.y - 20);
        this.addChildToContainer(this._servantContainer);

        //底部
        this.addChildToContainer(wallBg);
        this.addChildToContainer(bottomBg);
        this.addChildToContainer(progressBg);

        //一次
        let playOneBtn = ComponentManager.getButton("btn_big_yellow", "acthrowstoneOne-"+this.getTypeCode(), this.playBtnClick, this, ["0"]);
        playOneBtn.setPosition(60, bottomBg.y + 40);
        this.addChildToContainer(playOneBtn);
        //免费
        let freeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneFree"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        freeDesc.setPosition(playOneBtn.x + playOneBtn.width/2 - freeDesc.width/2, playOneBtn.y + playOneBtn.height + 10);
        this.addChildToContainer(freeDesc);
        this._freeDesc = freeDesc;
        //一次消耗
        let playOneNeedContainer = new BaseDisplayObjectContainer();
        let playNeedIcon = BaseBitmap.create(stoneIconImg);
        playOneNeedContainer.addChild(playNeedIcon);
        let playOneNeedDesc = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneNeedNum-"+this.getTypeCode(), ["1"]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        playOneNeedDesc.setPosition(playNeedIcon.x + playNeedIcon.width/2 + 13, playNeedIcon.y + playNeedIcon.height/2 - 7);
        playOneNeedContainer.addChild(playOneNeedDesc);
        playOneNeedContainer.width = playOneNeedDesc.x + playOneNeedDesc.width - playNeedIcon.x;
        playOneNeedContainer.setPosition(playOneBtn.x + playOneBtn.width/2 - playOneNeedContainer.width/2, playOneBtn.y + playOneBtn.height);
        this._playOneNeedContainer = playOneNeedContainer;
        this.addChildToContainer(playOneNeedContainer);
        if (this.vo.isFree()){
            freeDesc.visible = true;
            playOneNeedContainer.visible = false;
        }
        else{
            freeDesc.visible = false;
            playOneNeedContainer.visible = false;
        }

        //投石十次
        let playMultiBtn = ComponentManager.getButton("btn_big_yellow", "acthrowstoneMulti-"+this.getTypeCode(), this.playBtnClick, this, ["1"]);
        playMultiBtn.setPosition(GameConfig.stageWidth - 60 - playMultiBtn.width, bottomBg.y + 40);
        this.addChildToContainer(playMultiBtn);
        let playMultiNeedIcon = BaseBitmap.create(stoneIconImg);
        this.addChildToContainer(playMultiNeedIcon);
        let playMultiNeedDesc = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneNeedNum-"+this.getTypeCode(), ["10"]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        playMultiNeedIcon.x = playMultiBtn.x + playMultiBtn.width/2 - (playMultiNeedIcon.width/2 + playMultiNeedDesc.width + 13)/2;
        playMultiNeedIcon.y = playMultiBtn.y + playMultiBtn.height;
        playMultiNeedDesc.setPosition(playMultiNeedIcon.x + playMultiNeedIcon.width/2 + 13, playMultiBtn.y + playMultiBtn.height + playMultiNeedIcon.height/2 -7);
        this.addChildToContainer(playMultiNeedDesc);
        //十次必得
        let playEnterDesc = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneEnterDesc-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        playEnterDesc.setPosition(playMultiBtn.x + playMultiBtn.width/2 - playEnterDesc.width/2, playMultiBtn.y - playEnterDesc.height - 3);
        this.addChildToContainer(playEnterDesc);

        //进度条
        this._progressBar = ComponentManager.getProgressBar("progress12", "progress12_bg", 435);
        this._progressBar.setPosition(progressBg.x + progressBg.width / 2 - this._progressBar.width / 2 - 10, progressBg.y + progressBg.height / 2 - this._progressBar.height / 2);
        this.addChildToContainer(this._progressBar);
        let percent = this.vo.getScore() / this.vo.getCurrMaxProNum();
        if (percent > 1){
            percent = 1;
        }
        this._startPercent = percent;
        this._progressBar.setPercentage(percent);

        let progressNumber = LanguageManager.getlocal("acthrowstonePercentNum-"+this.getTypeCode(), [String(this.vo.getScore()), String(this.vo.getCurrMaxProNum())]);
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

        //次数this._bg
        let numbg = BaseBitmap.create("acthrowstone_score_numbg");
        numbg.setPosition(this._progressBar.x + 24 - numbg.width, this._progressBar.y + this._progressBar.height / 2 - numbg.height / 2 + 2);
        this.addChildToContainer(numbg);

        //数量TF
        let numDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneKillTitle-" + this.getTypeCode()), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        numDescTF.setPosition(numbg.x + numbg.width / 2 - numDescTF.width / 2, numbg.y + 49);
        this.addChildToContainer(numDescTF);

        //数量TF
        let numStr = LanguageManager.getlocal("acthrowstoneNum-"+this.getTypeCode(), [String(this.vo.getScore())]);
        if (this.vo.getScore() == 0){
            numStr = "0";
        }
        this._numTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._numTF.width = 60;
        this._numTF.textAlign = egret.HorizontalAlign.CENTER;
        this._numTF.setPosition(numDescTF.x + numDescTF.width / 2 - this._numTF.width / 2, numDescTF.y - numDescTF.height - 9);
        this.addChildToContainer(this._numTF);

        //奖励宝箱
        this._boxBM = BaseBitmap.create("acwealthcomingview_box_1");
        this._boxBM.anchorOffsetX = this._boxBM.width / 2;
        this._boxBM.anchorOffsetY = this._boxBM.height;
        this._boxBM.setPosition(this._progressBar.x + this._progressBar.width + this._boxBM.width / 2 + 22, this._progressBar.y + this._progressBar.height / 2 + this._boxBM.height / 2 - 3);
        this.addChildToContainer(this._boxBM);
        this._boxBM.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWSTONEACHIEVEREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
            // let data = {id: "6501", type:"11"};
            // ViewController.getInstance().openView("SpecialChatBoxGetView", data);
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

        //宝箱
        this.initBox();
        this.refreshBox(this._startPercent);

        //活动奖励
        let rewardBtn = ComponentManager.getButton("acthrowstone_reward_icon", "", ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWSTONEREWARDPOPVIEW, {aid:this.aid, code:this.code});
        }, this);
        rewardBtn.setPosition(GameConfig.stageWidth - rewardBtn.width - 20, wallBg.y - rewardBtn.height + 33);
        this.addChildToContainer(rewardBtn);
        this._rewardBtn = rewardBtn;
        /**衣装预览 start */
		let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
		skinTxtEffect.setPosition(30, progressBg.y - 125);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
		skinTxtEffect.addTouchTap(() => {
            if (this._isShowWife){
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWSTONEREWARDPOPVIEW4, {aid:this.aid, code:this.code});
            }
            else{
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWSTONEREWARDPOPVIEW3, {aid:this.aid, code:this.code});
            }
        }, this);

		let skinTxt = BaseBitmap.create("acthrowstone_common_wife_txt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		skinTxt.setPosition(skinTxtEffect.x + 100, progressBg.y - 50);
		this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        this._skinTxt = skinTxt;

		let skinTxteffect = BaseBitmap.create("acthrowstone_common_wife_txt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        this._skinTxtEffect = skinTxteffect;
        /**衣装预览 end */

        let aa = 12/3;
        App.LogUtil.log("aa is: "+aa.toFixed(3));

        //气泡
        this.showBubbleTip();

        this.changeWifeStatus();
        this.refreshCamp();
        this.refreshView();
        this.refreshMainSmoke();
    }

    //投石按钮回调
    public playBtnClick(btnType:any):void{
        if (this._isSelectPlayBtn){
            return;
        }
        if (!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (btnType == "0"){
            if (!this.vo.isFree() && this.vo.getStoneNum() < 1){
                this.showTipView();
                return;
            }
            if (this._isPlay){
                return;
            }
            this._isPlayTen = false;
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWSTONELAUNCHPOPUPVIEW, { aid: this.aid, code: this.code});
        }
        else{
            if (this.vo.getStoneNum() < 10){
                this.showTipView();
                return;
            }
            if (this._isPlayTen){
                return;
            }
            if (this._isPlay){
                return;
            }
            this._isPlayTen = true;
            this._isSelectPlayBtn = true;
            this.touchMask(true);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_THROWSTONE_LOTTERY, { activeId: this.vo.aidAndCode, isTenPlay:1});
        }
    }

    private throwStoneCallback(evt:egret.Event){
        if (!this._isPlayTen){
            this.changeWifeStatus();
            //切换皮肤
            return;
        }
        let rData = evt.data.data.data;
        this._playTenRewards = rData.rewards;
        //播放火石特效 完成后展示奖励
        // this.playBombEffect(3, 0, 3);
        for (let i = 0; i < 3; i++){
            egret.setTimeout(()=>{
                this.playBombEffect(3, 0, i);
            },this, 500 * i);
        }
    }

    //初始化宝箱 camp
    public initBox():void{
        for (let i = 0; i < this._boxList.length; i++){
            this.container.removeChild(this._boxList[i].box);
            this._boxList[i].box.dispose();
        }
        let dataList = this.vo.getCurrAchievementCfg();
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
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWSTONEACHIEVEREWARDPOPUPVIEW, { aid: this.aid, code: this.code, id: data.id });
            }, this);
            let isPlayAni = score >= data.needNum ? false : true;
            App.LogUtil.log("inti box: "+ (data.needNum * 1000 / maxNum));
            let boxInfo = { box:box, isPlayAni: isPlayAni, percent: Math.round(data.needNum * 1000 / maxNum)};
            this._boxList[i] = boxInfo;
        }
        this._maxProNum = this.vo.getCurrMaxProNum();
        this._oldScore = this.vo.getScore();
    }

    //刷新宝箱
    public refreshBox(percent:number):void{
        // 0 不可领取  1 可领取  2 已领取
        let dataList = this.vo.getCurrAchievementCfg();
        for (let i = 0; i < this._boxList.length; i++){
            let boxInfo = this._boxList[i];
            App.LogUtil.log("fefreshBox: percent "+Math.round(percent * 1000) + "boxinfo.percent: "+boxInfo.percent + "boxInfo.isPlayAni "+boxInfo.isPlayAni);
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
        this._oldScore = this.vo.getScore();
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
				startPercent -= everyTimeValue;
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
        boomEffect.setPosition(startPosX - boom.width * 1.25 / 2, startPosY - boom.height * 1.25 / 2);
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

    //兵营位置
    public _campPos = [
        // {x:285, y:385},
        // {x:265, y:367},
        // {x:486, y:367},
        // {x:486, y:503},
        // {x:265, y:503},
        // {x:265, y:503},
        {x:285, y:701},
        {x:265, y:719},
        {x:486, y:719},
        {x:486, y:583},
        {x:265, y:583},
    ];

    //创建兵营
    public createCamp():void{
        for (let i=0; i < 5; i++){
            let container = new BaseDisplayObjectContainer();
            container.setPosition(this._campPos[i].x, this._bg.y - this._campPos[i].y);
            this.addChildToContainer(container);
            let campWholeImg = ResourceManager.hasRes("acthrowstone_army-"+this.getTypeCode()+"_1")?"acthrowstone_army-"+this.getTypeCode()+"_1" : "acthrowstone_army-1_1";
            let campBrokeImg = ResourceManager.hasRes("acthrowstone_army-"+this.getTypeCode()+"_2")?"acthrowstone_army-"+this.getTypeCode()+"_2" : "acthrowstone_army-1_2";
            if (i == 0){
                campWholeImg = ResourceManager.hasRes("acthrowstone_armey_home-"+this.getTypeCode()+"_1")?"acthrowstone_armey_home-"+this.getTypeCode()+"_1" : "acthrowstone_armey_home-1_1";
                campBrokeImg = ResourceManager.hasRes("acthrowstone_armey_home-"+this.getTypeCode()+"_2")?"acthrowstone_armey_home-"+this.getTypeCode()+"_2" : "acthrowstone_armey_home-1_2";
            }
            let wholeCamp = BaseBitmap.create(campWholeImg);
            container.addChild(wholeCamp);
            wholeCamp.name = "wholeCamp";

            let brokeCamp = BaseBitmap.create(campBrokeImg);
            container.addChild(brokeCamp);
            brokeCamp.name = "brokeCamp";
            brokeCamp.visible = false;
            this._campContainers[i] = container;
        }
    }

    //刷新兵营
    public refreshCamp():void{
        let data = this.cfg.getAchievementList();
        let score = this.vo.getScore();
        for (let i=0; i < this._campContainers.length; i++){
            let container = this._campContainers[i];
            let wholeCamp = <BaseBitmap>container.getChildByName("wholeCamp");
            let brokeCamp = <BaseBitmap>container.getChildByName("brokeCamp");
            if (i == 0){
                if (data[this._seprateIndex-1].needNum <= score){
                    wholeCamp.visible = false;
                    brokeCamp.visible = true;
                }
                else{
                    wholeCamp.visible = true;
                    brokeCamp.visible = false;
                }
            }
            else{
                if (data[i-1].needNum <= score){
                    wholeCamp.visible = false;
                    brokeCamp.visible = true;
                }
                else{
                    wholeCamp.visible = true;
                    brokeCamp.visible = false;
                }
            }
        }
    }

    //刷新助阵的烟
    public refreshMainSmoke():void{
        let data = this.cfg.getAchievementList();
        if (data[this._seprateIndex-1].needNum <= this.vo.getScore()){
            this._mainCampSmoke.visible = true;
        }
        else{
            this._mainCampSmoke.visible = false;
        }
    }

    //领取宝箱奖励回调
    private getAchievementCallback(evt:egret.Event){
        let rData = evt.data.data.data;
        let rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    }

    private refreshView():void{
        // this.refreshBox();
        if (this.vo.isFree()){
            this._freeDesc.visible = true;
            this._playOneNeedContainer.visible = false;
        }
        else{
            this._freeDesc.visible = false;
            this._playOneNeedContainer.visible = false;
        }
        if (this.vo.isShowChargeRewardRedDot()){
            App.CommonUtil.addIconToBDOC(this._rewardBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._rewardBtn);
        }
        this._stoneNum.text = String(this.vo.getStoneNum());

        let numStr = LanguageManager.getlocal("acthrowstoneNum-"+this.getTypeCode(), [String(this.vo.getScore())]);
        if (this.vo.getScore() == 0){
            numStr = "0";
        }
        this._numTF.text = numStr;
        let progressNumber = LanguageManager.getlocal("acthrowstonePercentNum-"+this.getTypeCode(), [String(this.vo.getScore()), String(this.vo.getCurrMaxProNum())]);
        this._progressTF.text = progressNumber;

        if (this.vo.isShowAchievementRewardRedDot()) {
            // this._boxRedDot.setVisible(true);
        }
        else {
            this._boxRedDot.setVisible(false);
        }
    }

    //弹道位置
    public _bulletRoadPos = [
        // {x:-250, y:125},
        // {x:-350, y:50},
        // {x:-150, y:50},
        // {x:-150, y:200},
        // {x:-350, y:200},
        {x:-350, y:1011},
        {x:-450, y:1086},
        {x:-250, y:1086},
        {x:-250, y:936},
        {x:-450, y:936},
    ];

    //弹道空位置
    public _bulletRoadEmptyPos = [
        // {x:-350, y:125},
        // {x:-250, y:50},
        // {x:-150, y:125},
        // {x:-250, y:200},
        {x:-400, y:1011},
        {x:-300, y:1086},
        {x:-200, y:1011},
        {x:-320, y:936},
    ];

    //爆炸空位置 170 300
    public _bombEmptyPos = [
        // {x:265, y:435},
        // {x:375, y:337},
        // {x:486, y:435},
        // {x:375, y:503},
        {x:265, y:621},
        {x:375, y:719},
        {x:486, y:621},
        {x:375, y:553},
    ];

    //播放火石攻击特效
    public showStoneEffect(param:any):void{
        if (param && param.data && param.data.isLaunch){
            this.changeWifeStatus();
            App.LogUtil.log("param.data:"+param.data.hitPos);
            egret.Tween.pauseTweens(this._bubbleTip);
            let randNum = 1;
            if (param.data.hitPos == 1){
                randNum = App.MathUtil.getRandom(0, 4);
            }
            else if (param.data.hitPos == 2){
                randNum = App.MathUtil.getRandom(1, 5); 
            }
            if (param.data.rewards){
                this._playTenRewards = param.data.rewards;
            }
            // for (let i = 0; i < param.data.hitPos; i++){
            //     egret.setTimeout(()=>{
            //         this.playBombEffect(param.data.hitPos, randNum, i);
            //     },this, 1000 * i);
            // }
            this.playBombEffect(param.data.hitPos, randNum);
        }
        else{
            this.changeWifeStatus();
        }
    }

    //播放爆炸特效
    public playBombEffect(hitPos:number, randNum:number, count?:number):void{
        let bulletPos = this._bulletRoadPos[0];
        let bombPos = this._campPos[0];
        if (hitPos == 1){
            // let randNum = App.MathUtil.getRandom(0, 4);
            App.LogUtil.log("hitos: "+hitPos + "randnum: "+randNum);
            bombPos = this._bombEmptyPos[randNum];
            bulletPos = this._bulletRoadEmptyPos[randNum];
        }
        else if (hitPos == 2){
            // let randNum = App.MathUtil.getRandom(1, 5);
            bombPos = this._campPos[randNum];
            bulletPos = this._bulletRoadPos[randNum];
        }
        else{
            bombPos = this._campPos[0];
            bulletPos = this._bulletRoadPos[0];
        }

        let view = this;
        let bulletRoadEffect = ComponentManager.getCustomMovieClip("acthrowstone_effect_bulletroad", 12, 50);
        bulletRoadEffect.setScale(1.5);
        bulletRoadEffect.rotation = -65;
        bulletRoadEffect.setPosition(this._bg.x + bulletPos.x, this._bg.y - bulletPos.y);
        // this.addChildToContainer(bulletRoadEffect);
        this.container.addChildAt(bulletRoadEffect, 1);
        bulletRoadEffect.playWithTime(1);
        bulletRoadEffect.setFrameEvent(7, ()=>{
            if (hitPos == 2 || hitPos == 3){
                let redEffectImg = ResourceManager.hasRes("acthrowstone_army_home_bomb-"+this.getTypeCode())?"acthrowstone_army_home_bomb-"+this.getTypeCode() : "acthrowstone_army_home_bomb-1";
                if (hitPos == 2){
                    redEffectImg = ResourceManager.hasRes("acthrowstone_army_bomb-"+this.getTypeCode())?"acthrowstone_army_bomb-"+this.getTypeCode() : "acthrowstone_army_bomb-1";
                }
                let bombRedEffect = BaseBitmap.create(redEffectImg);
                bombRedEffect.setPosition(this._bg.x + bombPos.x, this._bg.y - bombPos.y);
                bombRedEffect.blendMode = egret.BlendMode.ADD;
                this.addChildToContainer(bombRedEffect);
                egret.Tween.get(bombRedEffect, {loop:true}).to({alpha: 0}, 100).to({alpha: 1}, 100).to({alpha: 0}, 100).to({alpha: 1}, 100).call(()=>{
                    bombRedEffect.dispose();
                });
            }
            let bombEffect = ComponentManager.getCustomMovieClip("acthrowstone_effect_bomb", 15, 50);
            bombEffect.setScale(1.5);
            if (hitPos == 3){
                bombEffect.setPosition(bombPos.x - 100, this._bg.y - bombPos.y - 220); // -260
            }
            else{
                bombEffect.setPosition(bombPos.x - 190, this._bg.y - bombPos.y - 250); // -300
            }
            view.addChildToContainer(bombEffect);
            bombEffect.playWithTime(1);
            bombEffect.setEndCallBack(()=>{
                this.refreshMainSmoke();
                if (view._isPlayTen){
                    if (2 == count){
                        let score = view.cfg.scoreGet[2] * 10;
                        this.showThrowStoneRewardView(score);
                    }
                }
                else{
                    // if (hitPos == 3 && count == 2){
                    //     let score = this.cfg.scoreGet[hitPos-1];
                    //     this.showThrowStoneRewardView(score);
                    // }
                    // else if (hitPos == 2 && count == 1){
                    //     let score = this.cfg.scoreGet[hitPos-1];
                    //     this.showThrowStoneRewardView(score);
                    // }
                    // else if (hitPos == 1){
                    //     let score = this.cfg.scoreGet[hitPos-1];
                    //     this.showThrowStoneRewardView(score);
                    // }  
                    let score = this.cfg.scoreGet[hitPos-1];
                    this.showThrowStoneRewardView(score);
                }
                view.touchMask(false);
                bulletRoadEffect.dispose();
                bombEffect.dispose();
            }, view);
        }, view);
    }

    //投石奖励
    public showThrowStoneRewardView(score:number):void{
        let msgStr = this.getRewardScoreTipMsg(score);
        let view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":this._playTenRewards,"isPlayAni":true, tipMsg: msgStr, "callback":()=>{
            view.changeWifeStatus();
            view.refreshCamp();
            view._isPlayTen = false;
            view._isSelectPlayBtn = false;
            let endPercent = 0;
            if (this.vo.isSecond() && this.vo.isSecond() == this._isSecond) {
                endPercent = this.vo.getScore() / this.vo.getCurrMaxProNum();
            }
            else {
                endPercent = this.vo.getScore() / this._maxProNum;
            }
            view.playProgressBarAni(this._startPercent, endPercent);
            egret.Tween.resumeTweens(view._bubbleTip);
        }});
    }

    //显示气泡
    public showBubbleTip():void{
        let bubbleTip = this.createBubbleTip("acthrowstoneFightMsg-"+this.getTypeCode()+"_1", false);
        bubbleTip.setPosition(this._bg.x + this._campPos[0].x - bubbleTip.width + 30, this._bg.y - this._campPos[0].y);
        this.addChildToContainer(bubbleTip);
        bubbleTip.alpha = 0;
        this._bubbleTip = bubbleTip;

        let specialTip = this.createBubbleTip("acthrowstoneBoxMsg-"+this.getTypeCode(), false);
        specialTip.setPosition(this._progressBar.x + 150, this._progressBar.y - specialTip.height - 0);
        this.addChildToContainer(specialTip);
        specialTip.alpha = 0;
        let index = 0;
        egret.Tween.get(bubbleTip,{loop:true}).
        call(()=>{
            this.setBubbleTip(bubbleTip, index, false);
        }).to({alpha:1}, 1000).wait(4000).to({alpha:0}, 1000).wait(4000).
        call(()=>{
            egret.Tween.get(specialTip).to({alpha:1}, 1000).wait(4000).to({alpha:0}, 1000).wait(4000).call(()=>{
                if (index == 4){
                    index = 0;
                }
                else{
                    index += 1;
                }
            });
        }).wait(10000);
    }

    //设置气泡
    public setBubbleTip(container:BaseDisplayObjectContainer, index:number, isSpecialTip:boolean):void{
        App.LogUtil.log("index: "+index);
        let tipContainer = container;
        let tipBg = <BaseBitmap>tipContainer.getChildByName("tipBg");
        let tipTail = <BaseBitmap>tipContainer.getChildByName("tipTail");
        let tipDesc = <BaseTextField>tipContainer.getChildByName("tipDesc");
        let data = this.cfg.getAchievementList();
        let score = this.vo.getScore();
        let tipStr = "";
        let id = this._bubbleTipIndexs[index];
        if (data[id-1] && data[id-1].needNum > score){
            tipStr = "acthrowstoneFightMsg-"+this.getTypeCode() + "_"+id;
        }
        else{
            tipStr = "acthrowstoneBegMsg-"+this.getTypeCode() + "_"+id;
        }

        tipDesc.text = LanguageManager.getlocal(tipStr);
        tipBg.height = tipDesc.height + 20;
        tipTail.setPosition(tipBg.x + tipBg.width - tipTail.width, tipBg.y + tipBg.height);
        tipContainer.height = tipBg.height + tipTail.height + 20;
        if (id-1 == 4){
            tipContainer.x = this._campPos[0].x - tipContainer.width + 130;
            tipContainer.y = this._bg.y - this._campPos[0].y - tipContainer.height + 50;
        }
        else{
            tipContainer.x = this._campPos[id].x - tipContainer.width + 70;
            tipContainer.y = this._bg.y - this._campPos[id].y - tipContainer.height + 50;
        }  
    }

    //气泡提示
    public createBubbleTip(str:string, isSpecialTip:boolean):BaseDisplayObjectContainer{
        let tipContainer = new BaseDisplayObjectContainer();
        let tipBg = BaseBitmap.create("public_9_bg36");
        tipBg.width = 280;
        tipContainer.addChild(tipBg);
        tipBg.name = "tipBg";
        
        let tipTail = BaseBitmap.create("public_9_bg13_tail");
        tipTail.scaleX = -1;
        tipContainer.addChild(tipTail);
        tipTail.name = "tipTail";

        let tipDesc = ComponentManager.getTextField(LanguageManager.getlocal(str), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        tipDesc.width = tipBg.width - 20;
        tipBg.height = tipDesc.height + 20;
        tipTail.setPosition(tipBg.x + tipBg.width - tipTail.width + 30, tipBg.y + tipBg.height);
        if (isSpecialTip){
            tipTail.scaleY = -1;
            tipTail.y = tipBg.y;
        }
        tipDesc.setPosition(15, 10);
        tipContainer.addChild(tipDesc);
        tipDesc.name = "tipDesc";
        tipContainer.height = tipBg.height + tipTail.height + 20;
        tipContainer.width = tipBg.width;

        return tipContainer;
    }

    //切换红颜
    public changeWifeStatus():void{
        this._isShowWife = !this._isShowWife;
        let skinResStr = "acthrowstone_common_wife_txt";
        if (this._isShowWife){
            this._wifeContainer.visible = true;
            this._servantContainer.visible = false;
        }
        else{
            this._wifeContainer.visible = false;
            this._servantContainer.visible = true;
            skinResStr = "acthrowstone_common_servant_txt";
        }
        this._skinTxt.setRes(skinResStr);
        this._skinTxtEffect.setRes(skinResStr);
    }

    //创建门客或红颜
    public createWifeOrServant(skinId:string):BaseDisplayObjectContainer{
        let wifeCfg: Config.WifeItemCfg = Config.WifeCfg.getWifeCfgById(skinId);
        let servantCfg = Config.ServantCfg.getServantItemById(skinId);
        let isWife = false;
        if (wifeCfg){
            isWife = true;
        }
        let container = new BaseDisplayObjectContainer();
        if (isWife){
            let boneName = undefined;
            if (wifeCfg && wifeCfg.bone) {
                boneName = wifeCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
                droWifeIcon.setScale(0.72);
                droWifeIcon.anchorOffsetY = droWifeIcon.height;
                droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
                droWifeIcon.x = 130;
                droWifeIcon.y = 0;
                container.addChild(droWifeIcon);
            }
            else {
                let wifeImg = BaseLoadBitmap.create(wifeCfg.body);
                wifeImg.width = 640;
                wifeImg.height = 840;
                wifeImg.anchorOffsetY = wifeImg.height;
                wifeImg.setScale(0.52);
                wifeImg.x = 0;
                wifeImg.y = 0;
                container.addChild(wifeImg);
            }
        }
        else{
            let dagonBonesName = "servant_full2_" + skinId;
            let boneName = undefined;
            if (servantCfg && dagonBonesName) {
                boneName = dagonBonesName + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                droWifeIcon.setScale(0.72);
                droWifeIcon.anchorOffsetY = droWifeIcon.height;
                droWifeIcon.x = 170;
                droWifeIcon.y = 0;
                container.addChild(droWifeIcon);
            }
            else {
                let servantImg = BaseLoadBitmap.create(servantCfg.fullIcon);
                servantImg.width = 405;
                servantImg.height = 467;
                servantImg.anchorOffsetY = servantImg.height;
                servantImg.setScale(0.89);
                servantImg.x = -5;
                servantImg.y = 0;
                container.addChild(servantImg);
            }
        }
        return container;
    }

    //弹窗提示
    public showTipView():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"acthrowstoneTipTitle",
			msg:LanguageManager.getlocal("acthrowstoneTipMsg-"+this.getTypeCode()),
			callback:()=>{
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWSTONEREWARDPOPVIEW, { aid: this.aid, code: this.code });
            },
			handler:this,
            needCancel:true,
            }); 
    }

    public touchMask(isEnable:boolean):void{
        if (isEnable){
            // let container = new BaseDisplayObjectContainer();
            let alphaBg = BaseBitmap.create("public_alphabg");
            alphaBg.width = GameConfig.stageWidth;
            alphaBg.height = GameConfig.stageHeigth;
            alphaBg.y = -100;
            this.addChildToContainer(alphaBg);
            alphaBg.touchEnabled = true;
            alphaBg.name = "alphaBg";
        }
        else{
            let alphaBg = <BaseBitmap>this.container.getChildByName("alphaBg");
            if (alphaBg){
                alphaBg.dispose();
            }
        }
    }

    public getRewardScoreTipMsg(score:number){
        let str = "";
        if (score == 9){
            str = LanguageManager.getlocal("acthrowstoneKillEnemyNum-"+this.getTypeCode()+"_1");
        }
        else if (score == 10){
            str = LanguageManager.getlocal("acthrowstoneKillEnemyNum-"+this.getTypeCode()+"_2");
        }
        else if (score == 11){
            str = LanguageManager.getlocal("acthrowstoneKillEnemyNum-"+this.getTypeCode()+"_3");
        }   
        else if (score == 110){
            str = LanguageManager.getlocal("acthrowstoneKillEnemyNum-"+this.getTypeCode()+"_4");
        }
        else{
            str = LanguageManager.getlocal("acthrowstoneKillEnemyNum-"+this.getTypeCode(), [String(score)]);
        }
        return str;
    }

    public tick():void{
        this._acTimeTf.text = LanguageManager.getlocal("acthrowstoneTimeCountDown", [this.vo.getCountDown()]);
		this._timeBg.width = 60 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    }

    private get cfg():Config.AcCfg.ThrowStoneCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcThrowStoneVo{
        return <AcThrowStoneVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }
    
    protected getTitleStr():string{
        return "acthrowstoneTitle-"+this.getTypeCode();
    }

    //规则
    protected getRuleInfo(): string {
        return "acthrowstoneRuleInfo-" + this.getTypeCode();
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        if (this.getTypeCode() != "1"){
            list = ["acthrowstone_stone_icon-1",
            "acthrowstone_item_icon-1",
            "acthrowstone_wall-1","acthrowstone_bg-1","acthrowstone_army-1_1","acthrowstone_army-1_2","acthrowstone_armey_home-1_1", "acthrowstone_armey_home-1_2","acthrowstone_army_bomb-1","acthrowstone_army_home_bomb-1"
            ];
        }
        return super.getResourceList().concat([
            "forpeople_top", "acthrowstone_common_wife_txt","acthrowstone_common_servant_txt",
            "acthrowstone_reward_icon_down", "acthrowstone_reward_icon",
            "progress12_bg", "progress12", "acworshipview_slider", "acwealthcomingview_numbg",
            "acworshipview_box1", "acworshipview_box2", "acworshipview_box3","arena_bottom",
            "acwealthcomingview_lightball", "boxboomeffect1", "acwealthcomingview_box_1", "acwealthcomingview_box_2","luckydrawrewardword-2","acwealthcomingview_box_light","acwealthcomingview_progresslight", "acthrowstone_score_numbg",
            "acthrowstone_stone_icon-"+this.getTypeCode(),
            "acthrowstone_item_icon-"+this.getTypeCode(),
            "acthrowstone_wall-"+this.getTypeCode(),
            "acthrowstone_bg-"+this.getTypeCode(),
            "acthrowstone_army-"+this.getTypeCode()+"_1",
            "acthrowstone_army-"+this.getTypeCode()+"_2",
            "acthrowstone_armey_home-"+this.getTypeCode()+"_1",
            "acthrowstone_armey_home-"+this.getTypeCode()+"_2",
            "acthrowstone_army_bomb-"+this.getTypeCode(),
            "acthrowstone_army_home_bomb-"+this.getTypeCode(),
        
        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_THROWSTONE_CHANGEVIEW, this.showStoneEffect, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWSTONE_LOTTERY, this.throwStoneCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWSTONE_GETACHIEVEMENT, this.getAchievementCallback, this);
        
        this._timeBg = null;
        this._acTimeTf = null;
        this._killNumText = null;
        this._progress = null;
        this._boxList = [];
        this._stoneNum = null;
        this._freeDesc = null;
        this._playOneNeedContainer = null;
        this._rewardBtn = null;
        this._wifeContainer = null;
        this._servantContainer = null;
        this._campContainers = [];
        this._playTenRewards = null;
        this._bubbleTip = null;
        this._campContainers = [];
        this._boxList = [];
        this._progressBar = null;
        this._progressTF = null;
        this._progressBM = null;
        this._progressLight = null;
        this._numTF = null;
        this._boxBM = null;
        this._boxLightBM = null;
        this._boxRedDot = null;
        this._maxProNum = 0;
        this._isPlay = false;
        this._oldScore = 0;
        this._startPercent = 0;
        this._bg = null;
        this._isShowWife = false;

        super.dispose();
    }
}