/**
 * 情系良缘
 * date 2020.7.21
 * author ycg
 * @class AcGoodMatchView
 */
class AcGoodMatchView extends AcCommonView{
    private _timeBg:BaseBitmap = null;
    private _timeTxt:BaseTextField = null;
    private _rechargeTip:BaseTextField = null;
    private _detailRed:BaseBitmap = null;
    private _processContainer:BaseDisplayObjectContainer = null;
    private _scrollView:ScrollView = null;
    private _onceContainer:BaseDisplayObjectContainer = null;
    private _freeDesc:BaseTextField = null;
    private _toolNumBg:BaseBitmap = null;
    private _toolIcon:BaseBitmap = null;
    private _toolNum:BaseTextField = null;
    private _multiNeedContainer:BaseDisplayObjectContainer = null;
    private _playMultiBtn:BaseButton = null;
    private _multiBtnInfo:BaseTextField = null;
    private _processNum:BaseTextField = null;
    private _oneKeyContainer:BaseDisplayObjectContainer = null;
    private _ballContainer:BaseDisplayObjectContainer = null;
    private _boxList:any[] = [];
    private _ballList:any[] = [];
    private _lastMapData:any = null;
    private _playBallId:number[] = [];
    private _isBatch:boolean = false;
    private _isPlay:boolean = false;
    private _rewardData:any = null;

    public constructor(){
        super();
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return App.CommonUtil.getResByCode("acgoodmatch_titlebg", this.getTypeCode());
    }

    protected getBgName():string{
        return App.CommonUtil.getResByCode("acgoodmatch_bg", this.getTypeCode());
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getProbablyInfo():string{
        return App.CommonUtil.getCnByCode("acGoodMatchProbablyInfo", this.getTypeCode());
    }

    protected getRuleInfo():string{
        return App.CommonUtil.getCnByCode("acGoodMatchRuleInfo", this.getTypeCode());
    }

    protected getRuleInfoParam():string[]{
        return [""+this.cfg.needGem];
    }

    protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
    }

    protected getResourceList():string[]{
        let list:string[] = [

        ];
        return super.getResourceList().concat([
            "acgoodmatchcode1", "acgoodmatchcode1"+this.getTypeCode(), "acthrowstone_common_wife_txt",
            "acthreekingofwife_infobg-1", "examview_right", "acgoodmatch_numbg", "acgoodmatch_cloudright", "acgoodmatch_cloudleft",
        ]).concat(list);
    }

    private get cfg():Config.AcCfg.GoodMatchCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcGoodMatchVo{
        return <AcGoodMatchVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    //气球类型
    private getBallCfg():number[]{
        return [
            1,2,3,4,
            4,3,2,1,
            2,1,4,3,
            3,2,1,4,
        ];
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACGOODMATCH_LOTTERY, this.playBtnCallback, this);

        this.showStartDialog();

        let infoBg = BaseBitmap.create("acthreekingofwife_infobg-1");
        infoBg.setPosition(0, this.titleBg.y + this.titleBg.height - 7 - 95);
        this.addChildToContainer(infoBg);

        //活动时间   
        let dateText = ComponentManager.getTextField(LanguageManager.getlocal("acComm_time", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = infoBg.x + 20;
        dateText.y = this.titleBg.y + this.titleBg.height + 3;
        this.addChildToContainer(dateText);

        //活动文本
        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchDesc", this.getTypeCode()), [""+this.cfg.needGem]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 600;
        descTxt.lineSpacing = 4;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 5;
        this.addChildToContainer(descTxt);

        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height/2;
		this.addChildToContainer(this._timeBg);
		this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 40 + this._timeTxt.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 10;
		this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);

        //充值信息
        let rechargeTip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchRechargeInfo", this.getUiCode()), [""+this.vo.getNeedRecharge()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeTip.setPosition(dateText.x, infoBg.y + infoBg.height - rechargeTip.height - 3);
        this.addChildToContainer(rechargeTip);
        this._rechargeTip = rechargeTip;

        //佳人衣装
        let roleContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(roleContainer);

        //气球
        let ballContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(ballContainer);
        this._ballContainer = ballContainer;

        //ballBg
        let ballBg = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_ballbg", this.getTypeCode()));
        ballContainer.width = ballBg.width;
        ballContainer.height = ballBg.height;
        ballContainer.addChild(ballBg);

        let ballCfg = this.getBallCfg();
        for (let i=0; i < ballCfg.length; i++){
            let ball = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_ball"+ballCfg[i], this.getTypeCode()));
            ball.anchorOffsetX = ball.width/2;
            ball.anchorOffsetY = ball.height;
            ball.setPosition(128 + 84 * (i % 4), 110 + Math.floor(i/4) * 94);
            ballContainer.addChild(ball);
            let rotat = Math.floor(App.MathUtil.getRandom(2, 11) * 7 / 10 );
            egret.Tween.get(ball, {loop: true}).to({rotation: rotat}, 400).to({rotation: - rotat * 2}, 800).to({rotation: 0}, 400);
            this._ballList[i] = ball;
        }
        this.refreshBall();

        //活动详情
        let detailBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acgoodmatch_detailbtn", this.getTypeCode()), "", ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACGOODMATCHDETAILPOPUPVIEW, {aid: this.aid, code: this.code});
        }, this);
        detailBtn.setPosition(0, infoBg.y + infoBg.height);
    
        let detailRed = BaseBitmap.create("public_dot2");
        detailRed.setPosition(detailBtn.x + detailBtn.width - 28, detailBtn.y + 12);
        this._detailRed = detailRed;
        if (this.vo.checkAchieveRed() || this.vo.checkExchangeRed() || this.vo.checkServerRewardRed()){
            detailRed.visible = true;
        }
        else{
            detailRed.visible = false;
        }

        //进度相关
        let redLine = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_proredline", this.getTypeCode()));
        redLine.setPosition(detailBtn.x + detailBtn.width - 13, infoBg.y + infoBg.height + 58);
        this.addChildToContainer(redLine);

        let processContainer = new BaseDisplayObjectContainer();
        processContainer.height = 110;
        this._processContainer = processContainer;

        let scrollView = ComponentManager.getScrollView(processContainer, new egret.Rectangle(0, 0, GameConfig.stageWidth - detailBtn.x - detailBtn.width + 13, processContainer.height));
        scrollView.setPosition(redLine.x, infoBg.y + infoBg.height + 18);
        this.addChildToContainer(scrollView);
        scrollView.bounces = false;
        this._scrollView = scrollView;

        this.initProcess();
        this.refreshProcess();

        this.addChildToContainer(detailBtn);
        this.addChildToContainer(detailRed);

        //当前进度
        let processBg = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_processbg", this.getTypeCode()));
        processBg.setPosition(ballContainer.width/2 - processBg.width/2 + 25, ballContainer.y - processBg.height/2);
        ballContainer.addChild(processBg);
        let currProcess = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchProcessNum", this.getTypeCode()), [""+this.vo.getProcessNum()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        currProcess.anchorOffsetX = currProcess.width/2;
        currProcess.setPosition(processBg.x + processBg.width/2, processBg.y + processBg.height/2 - currProcess.height/2 + 5);
        ballContainer.addChild(currProcess);
        this._processNum = currProcess;

        //bottom
        let bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_bottombg", this.getTypeCode()));
        bottomBg.setPosition(0, GameConfig.stageHeigth - bottomBg.height);
        this.addChildToContainer(bottomBg);
        ballContainer.setPosition(GameConfig.stageWidth - ballBg.width, bottomBg.y + 65 - ballContainer.height);

        //playBtn
        let playOnceBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "", this.playBtnClick, this, [0], null, null, TextFieldConst.COLOR_BLACK);
        playOnceBtn.setPosition(70, bottomBg.y + 110);
        this.addChildToContainer(playOnceBtn);
        let playOnceInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayBtnInfo2", this.getTypeCode()), ["1"]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
        playOnceBtn.addChild(playOnceInfo);
        playOnceInfo.setPosition(playOnceBtn.width/2 - playOnceInfo.width/2, playOnceBtn.height/2 - playOnceInfo.height/2);

        //once need
        let onceContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(onceContainer);
        let onceIcon = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_smalltoolicon", this.getTypeCode()))
        onceContainer.addChild(onceIcon);
        let onceNeed = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayNeedNum", this.getTypeCode()), [""+1]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        onceContainer.addChild(onceNeed);
        onceIcon.setPosition(playOnceBtn.x + playOnceBtn.width/2 - (onceIcon.width + onceNeed.width)/2, playOnceBtn.y - onceIcon.height);
        onceNeed.setPosition(onceIcon.x + onceIcon.width, onceIcon.y + onceIcon.height/2 - onceNeed.height/2 + 10);
        this._onceContainer = onceContainer;

        let freeDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayBtnInfo1", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        this.addChildToContainer(freeDesc);
        freeDesc.setPosition(playOnceBtn.x + playOnceBtn.width/2 - freeDesc.width/2, playOnceBtn.y - freeDesc.height - 2);
        this._freeDesc = freeDesc;

        //十次
        let playMultiBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "", this.playBtnClick, this, [1], null, null, TextFieldConst.COLOR_BLACK);
        playMultiBtn.setPosition(GameConfig.stageWidth - playMultiBtn.width - 70, playOnceBtn.y);
        this.addChildToContainer(playMultiBtn);
        this._playMultiBtn = playMultiBtn;
        let playMultiInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayBtnInfo2", this.getTypeCode()), ["10"]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
        playMultiBtn.addChild(playMultiInfo);
        playMultiInfo.setPosition(playMultiBtn.width/2 - playMultiInfo.width/2, playMultiBtn.height/2 - playMultiInfo.height/2);
        this._multiBtnInfo = playMultiInfo;

        //multi need
        let multiContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(multiContainer);
        let multiIcon = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_smalltoolicon", this.getTypeCode()))
        multiContainer.addChild(multiIcon);
        multiIcon.name = "multiIcon";
        let multiNeed = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayNeedNum", this.getTypeCode()), [""+10]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        multiContainer.addChild(multiNeed);
        multiNeed.name = "multiNeed";
        multiContainer.width = multiIcon.width + multiNeed.width;
        multiContainer.anchorOffsetX = multiContainer.width/2;
        multiContainer.setPosition(playMultiBtn.x + playMultiBtn.width/2, playMultiBtn.y - multiIcon.height);
        multiIcon.setPosition(0, 0);
        multiNeed.setPosition(multiIcon.x + multiIcon.width, multiIcon.y + multiIcon.height/2 - multiNeed.height/2 + 10);
        this._multiNeedContainer = multiContainer;

        let oneKeyContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(oneKeyContainer);
        this._oneKeyContainer = oneKeyContainer;
        let oneKeyBg = BaseBitmap.create("acgoodmatch_numbg");
        oneKeyBg.setPosition(playMultiBtn.x + playMultiBtn.width/2 - oneKeyBg.width/2, playMultiBtn.y + playMultiBtn.height + 1);
        oneKeyContainer.addChild(oneKeyBg);
        let oneKeyCheckbox = BaseBitmap.create("public_select");
        oneKeyCheckbox.setScale(0.8);
        oneKeyCheckbox.setPosition(oneKeyBg.x + 20, oneKeyBg.y + 1);
        oneKeyContainer.addChild(oneKeyCheckbox);
        let oneKeyCheckFlag = BaseBitmap.create("examview_right");
        oneKeyCheckFlag.setPosition(oneKeyCheckbox.x + oneKeyCheckbox.width * oneKeyCheckbox.scaleX /2 - oneKeyCheckFlag.width/2 + 3, oneKeyBg.y - 2);
        oneKeyContainer.addChild(oneKeyCheckFlag);
        oneKeyCheckFlag.visible = false;
        let oneKeyTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayMulti", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        oneKeyTxt.setPosition(oneKeyCheckbox.x + oneKeyCheckbox.width * oneKeyCheckbox.scaleX + 4, oneKeyBg.y + oneKeyBg.height/2 - oneKeyTxt.height/2);
        oneKeyContainer.addChild(oneKeyTxt);
        oneKeyCheckbox.addTouchTap(()=>{
            this._isBatch = !this._isBatch;
            if (this._isBatch){
                oneKeyCheckFlag.visible = true;
            }
            else{
                oneKeyCheckFlag.visible = false;
            }
            this.freshPlayBtnInfo();
        }, this);

        if (this.vo.getProcessNum() >= this.getBallCfg().length * 2){
            this._oneKeyContainer.visible = true;
        }
        else{
            this._oneKeyContainer.visible = false;
        }

        this.freshPlayBtnInfo();

        //tool num
        let toolBg = BaseBitmap.create("public_9_bg80");
        this.addChildToContainer(toolBg);
        this._toolNumBg = toolBg;
        let toolIcon = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_smalltoolicon", this.getTypeCode()))
        this.addChildToContainer(toolIcon);
        this._toolIcon = toolIcon;
        let currToolNum = this.vo.getToolNum();
        let toolNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayNeedNum", this.getTypeCode()), [""+currToolNum]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(toolNum);
        this._toolNum = toolNum;
        toolBg.width = toolIcon.width + toolNum.width + 50;
        toolBg.setPosition(GameConfig.stageWidth/2 - toolBg.width/2, bottomBg.y + 70);
        toolIcon.setPosition(toolBg.x + 25, toolBg.y + toolBg.height/2 - toolIcon.height/2);
        toolNum.setPosition(toolIcon.x + toolIcon.width, toolBg.y + toolBg.height/2 - toolNum.height/2);

        //change pool btn
        let poolBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acgoodmatch_changepoolbtn", this.getTypeCode()), "", ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACGOODMATCHDETAILPOPUPVIEWTAB3, {aid: this.aid, code: this.code});
        }, this);
        poolBtn.setPosition(GameConfig.stageWidth - poolBtn.width - 30, bottomBg.y - 15);
        this.addChildToContainer(poolBtn);

        //衣装预览
        let wifeId = this.cfg.show;
        let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        let boneName = null;
        if (wifeCfg && wifeCfg.bone) {
            boneName = wifeCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            let wifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
            wifeIcon.setScale(0.7);
            wifeIcon.anchorOffsetY = wifeIcon.height;
            wifeIcon.anchorOffsetX = wifeIcon.width / 2;
            wifeIcon.x = GameConfig.stageWidth/4 - 20;
            wifeIcon.y = bottomBg.y + 20;
            roleContainer.addChild(wifeIcon);
        }
        else {
            let skinImg = BaseLoadBitmap.create(wifeCfg.body);
            skinImg.width = 640;
            skinImg.height = 840;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.setScale(0.5);
            skinImg.x = GameConfig.stageWidth/4 - 20;
            skinImg.y = bottomBg.y + 20;
            roleContainer.addChild(skinImg);
        }   
 
        //衣装预览
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(bottomBg.x + GameConfig.stageWidth/4 - skinTxtEffect.width/2 - 40, bottomBg.y - 100);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create("acthrowstone_common_wife_txt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxt1 = BaseBitmap.create("acthrowstone_common_wife_txt");
		skinTxt1.anchorOffsetX = skinTxt1.width / 2;
		skinTxt1.anchorOffsetY = skinTxt1.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
		this.addChildToContainer(skinTxt1);
		skinTxt1.blendMode = egret.BlendMode.ADD;
		skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
		skinTxt1.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACGOODMATCHDETAILPOPUPVIEWTAB4, {aid: this.aid, code: this.code});
        }, this);

    }

    //进度 间距
    private get progressOffX():number{
        return 90;
    }

    //进度
    private initProcess():void{
        let data = this.cfg.getAchieveList();
        let len = data.length;
        let proW = this.progressOffX * len;
        this._processContainer.width = proW;
        for (let i=0; i < len; i++){
            let boxCon = new BaseDisplayObjectContainer();
            let box = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_box1", this.getTypeCode()));
            boxCon.width = box.width;
            boxCon.height = this._processContainer.height;
            box.anchorOffsetX = box.width/2;
            box.anchorOffsetY = 42;
            box.setPosition(boxCon.width/2, 42);
            boxCon.addChild(box);
            box.name = "box"+i;

            let boxNum = ComponentManager.getTextField(""+data[i].needNum, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
            boxNum.setPosition(box.x - boxNum.width/2 - 2, box.y - 32);
            boxCon.addChild(boxNum);

            let boxEff = ComponentManager.getCustomMovieClip("acgoodmatch_boxeff", 15, 70);
            boxEff.width = 58;
            boxEff.height = 120;
            boxEff.setPosition(box.x - boxEff.width/2, box.y - 42 + box.height/2 - boxEff.height/2);
            boxEff.playWithTime(0);
            boxEff.visible = false;
            boxEff.name = "boxEff"+i;
            boxCon.addChild(boxEff);

            boxCon.setPosition(50 + i * this.progressOffX - boxCon.width/2, 0);
            this._processContainer.addChild(boxCon);

            boxCon.addTouchTap(()=>{
                ViewController.getInstance().openView(ViewConst.POPUP.ACGOODMATCHDETAILPOPUPVIEW, {aid: this.aid, code: this.code, id: data[i].id});
            }, this);
            this._boxList.push(boxCon);
        }

        let curId = this.vo.getCurProcessIndex();
        this._scrollView.scrollLeft =this._processContainer.width - this._scrollView.width;
        let posX = Math.min(Math.max(0, (curId + 1 - 3) * this.progressOffX), this._processContainer.width - this._scrollView.width);
        this.showViewMask();
        egret.Tween.get(this._scrollView).wait(200).to({scrollLeft : posX}, (this._scrollView.scrollLeft - posX)).call(()=>{
            this.hideViewMask();
            egret.Tween.removeTweens(this._scrollView);
        }, this);
    }

    private refreshProcess():void{
        let data = this.cfg.getAchieveList();
        let currProcess = this.vo.getProcessNum();
        for (let i=0; i < data.length; i++){
            let boxCon = this._boxList[i];
            let box = <BaseBitmap>boxCon.getChildByName("box"+i);
            let boxEff = <CustomMovieClip>boxCon.getChildByName("boxEff"+i);
            if (this.vo.isGetAchieveRewardById(data[i].id)){
                box.setRes(App.CommonUtil.getResByCode("acgoodmatch_box2", this.getTypeCode()));
                boxEff.visible = false;
            }
            else{
                box.setRes(App.CommonUtil.getResByCode("acgoodmatch_box1", this.getTypeCode()));
                if (currProcess >= data[i].needNum){
                    boxEff.visible = true;
                }
                else{
                    boxEff.visible = false;
                }
            }
        }
    }

    //刷新多次按钮
    private freshPlayBtnInfo():void{
        let currBallNum = this.vo.getCurrBallNum();
        let playNum = 10;
        let btnStr = "";
        if (this._isBatch){
            playNum = currBallNum;
            btnStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayMulti", this.getTypeCode()));
        }
        else{
            if (currBallNum < 10){
                playNum = currBallNum;
            }
            btnStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayBtnInfo2", this.getTypeCode()), [""+playNum]);
        }
        //多次按钮
        this._multiBtnInfo.text = btnStr;
        this._multiBtnInfo.x = this._playMultiBtn.width/2 - this._multiBtnInfo.width/2;

        let multiNeedIcon = <BaseBitmap>this._multiNeedContainer.getChildByName("multiIcon");
        let multiNeed = <BaseTextField>this._multiNeedContainer.getChildByName("multiNeed");
        multiNeed.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayNeedNum", this.getTypeCode()), [""+playNum]);
        this._multiNeedContainer.width = multiNeedIcon.width + multiNeed.width;
        this._multiNeedContainer.anchorOffsetX = this._multiNeedContainer.width/2;

        //一次
        if (this.vo.isFree()){
            this._freeDesc.visible = true;
            this._onceContainer.visible = false;
        }
        else{
            this._freeDesc.visible = false;
            this._onceContainer.visible = true;
        }
    }

    //刷新气球
    private refreshBall():void{
        let mapList = this.vo.getMapData();
        if (mapList){
            for (let i=0; i < this._ballList.length; i++){
                this._ballList[i].visible = mapList[i] > 0 ? false : true;
            }
        }
    }

    private playBtnClick(index:number){
        if (!this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return ;
        }
        if (this.vo.getPoolRewardId() == 0 && this.vo.getProcessNum() == 0){
            let localKey = "poolrwd"+this.vo.aidAndCode+Api.playerVoApi.getPlayerID()+this.vo.st;
            let showFlag = LocalStorageManager.get(localKey);
            if (showFlag){
               
            }
            else{
                LocalStorageManager.set(localKey, String(this.vo.st));
                ViewController.getInstance().openView(ViewConst.POPUP.ACGOODMATCHDETAILPOPUPVIEWTAB3, {aid: this.aid, code: this.code, isFirst: 1});
                return ;
            } 
        }
        if (this._isPlay){
            return;
        }
        let toolNum = this.vo.getToolNum();
        if (index == 0){
            let isFree = 0;
            if (this.vo.isFree()){
                isFree = 1;
            }
            else{
                if (toolNum <= 0){
                    this.showRechargeTip();
                    return ;
                }
            }
            this._lastMapData = this.vo.getMapData();
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACGOODMATCH_LOTTERY, {activeId: this.vo.aidAndCode, isTenPlay: 0});
        }
        else{
            let ballNum = this.vo.getCurrBallNum();
            let isBatch = 0;
            let isTen = 1;
            if (this._isBatch){
                if (ballNum > toolNum){
                    this.showRechargeTip();
                    return ;
                }
                isBatch = 1;
                isTen = 0;
            }
            else{
                let playNum = 10;
                if (ballNum < 10){
                    playNum = ballNum;
                }
                if (toolNum < playNum){
                    this.showRechargeTip();
                    return ;
                }
            }
            this._lastMapData = this.vo.getMapData();
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACGOODMATCH_LOTTERY, {activeId: this.vo.aidAndCode, isTenPlay: isTen, isAllPlay: isBatch});
        }
    }

    //被扎的气球
    private getPlayBallId():number[]{
        let mapData = this.vo.getMapData();
        let data:number[] = [];
        let currBallNum = this.vo.getCurrBallNum();
        if (currBallNum == this.getBallCfg().length){
            for (let i=0; i < this._lastMapData.length; i++){
                if (this._lastMapData[i] != 1){
                    data.push(i);
                }
            }
        }
        else{
            for (let i=0; i < mapData.length; i++){
                if (this._lastMapData[i] != 1 && this._lastMapData[i] != mapData[i]){
                    data.push(i);
                }
            }
        }
        return data;
    }

    private playBtnCallback(evt: egret.Event){
        if (!evt.data.ret){
            this._isPlay = false;
            return ;
        }
        this._rewardData = evt.data.data.data;
        this._playBallId = this.getPlayBallId();
        this._lastMapData = this.vo.getMapData();
        this.showViewMask();
        for (let i=0; i < this._playBallId.length; i++){
            egret.setTimeout(()=>{
                this.playArrowAni(this._playBallId[i]);
            }, this, 50 * i);
        }
    }

    //飞镖动画
    private playArrowAni(id:number):void{
        let ball = this._ballList[id];
        let desX = this._ballContainer.x + ball.x;
        let desY = this._ballContainer.y + ball.y - ball.height/2;
        let arrow = ComponentManager.getCustomMovieClip("acgoodmatch_arroweff", 8, 50);
        arrow.width = 100;
        arrow.height = 550;
        arrow.setPosition(desX - arrow.width/2, desY);
        this.addChildToContainer(arrow);
        arrow.playWithTime(1);
        arrow.setEndCallBack(()=>{
            arrow.dispose();
            let bombEff = ComponentManager.getCustomMovieClip("acgoodmatch_bombeff", 10, 60);
            bombEff.width = 250;
            bombEff.height = 200;
            this.addChildToContainer(bombEff);
            bombEff.setPosition(desX - bombEff.width/2, desY - bombEff.height/2);
            bombEff.playWithTime(1);
            ball.visible = false;
            bombEff.setEndCallBack(()=>{
                bombEff.dispose();
                if (id == this._playBallId[this._playBallId.length - 1]){
                    this.showRewardView();
                }
            }, this);
        }, this);
    }

    //奖励面板
    private showRewardView():void{
        this.hideViewMask();
        this._isPlay = false;
        if (this._rewardData){
            let rewards = this._rewardData.rewards;
            let replacerewards = this._rewardData.replacerewards;
            let isSameAdd = false;
            if (this._isBatch){
                isSameAdd = true;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards, "isPlayAni":true, "isSameAdd": isSameAdd, "callback":()=>{
                this.refreshProcess();
                this.freshMap();
            }});
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
        }
    }

    //刷新地图动画
    private freshMap():void{
        let ballNum = this.vo.getCurrBallNum();
        if (ballNum == this.getBallCfg().length){
            let cloudLeft = BaseBitmap.create("acgoodmatch_cloudleft");
            cloudLeft.setPosition(-cloudLeft.width, 0);
            this.addChild(cloudLeft);

            let cloudRight = BaseBitmap.create("acgoodmatch_cloudright");
            cloudRight.setPosition(GameConfig.stageWidth, 0);
            this.addChild(cloudRight);
            this.showViewMask();
            egret.Tween.get(cloudLeft, {loop: false}).to({x: 0}, 600, egret.Ease.sineIn)
            .wait(200)
            .to({x:-cloudLeft.width}, 500, egret.Ease.sineOut)
            .call(()=>{
                cloudLeft.dispose();
                cloudLeft = null;
            }, this);

            egret.Tween.get(cloudRight, {loop: false}).to({x: GameConfig.stageWidth-cloudRight.width}, 600, egret.Ease.sineIn)
            .call(()=>{
                this.refreshBall();
            }, this)
            .wait(200)
            .to({x:GameConfig.stageWidth}, 500, egret.Ease.sineOut)
            .call(()=>{
                cloudRight.dispose();
                cloudRight = null;
                this.hideViewMask();
            }, this);
        }
    }

    private refreshView():void{
        this.freshPlayBtnInfo();
        //道具
        let currToolNum = this.vo.getToolNum();
        this._toolNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayNeedNum", this.getTypeCode()), [""+currToolNum]);
        this._toolNumBg.width = this._toolIcon.width + this._toolNum.width + 50;
        this._toolNumBg.x = GameConfig.stageWidth/2 -  this._toolNumBg.width/2;
        this._toolIcon.x = this._toolNumBg.x + 25;
        this._toolNum.x = this._toolIcon.x + this._toolIcon.width;
        //当前进度
        this._processNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchProcessNum", this.getTypeCode()), [""+this.vo.getProcessNum()]);
        this._processNum.anchorOffsetX = this._processNum.width/2;
        //红点
        if (this.vo.checkAchieveRed() || this.vo.checkExchangeRed() || this.vo.checkServerRewardRed()){
            this._detailRed.visible = true;
        }
        else{
            this._detailRed.visible = false;
        }
        //充值提示
        this._rechargeTip.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchRechargeInfo", this.getTypeCode()), [""+this.vo.getNeedRecharge()]);
        //一键
        if (this.vo.getProcessNum() >= this.getBallCfg().length * 2){
            this._oneKeyContainer.visible = true;
        }
        else{
            this._oneKeyContainer.visible = false;
        }
        //进度
        if (!this._isPlay){
            this.refreshProcess();
        }
    }

    public tick():void{
        this._timeTxt.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
		this._timeBg.width = 40 + this._timeTxt.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 10;
		this._timeTxt.x = this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2;
    }

    // //首次点击扔飞镖弹奖池
    // public showFirstPoolView():void{
    //     let localKey = "poolrwd"+this.vo.aidAndCode+Api.playerVoApi.getPlayerID()+this.vo.st;
    //     let showFlag = LocalStorageManager.get(localKey);
    //     if (showFlag){
    //         return ;
    //     }
    //     LocalStorageManager.set(localKey, String(this.vo.st));
    //     ViewController.getInstance().openView(ViewConst.POPUP.ACGOODMATCHDETAILPOPUPVIEWTAB3, {aid: this.aid, code: this.code});
    // }

    //首次进入对话
    private showStartDialog():void{
        let localKey = "startDialog"+this.vo.aidAndCode+Api.playerVoApi.getPlayerID()+this.vo.st;
        let showFlag = LocalStorageManager.get(localKey);
        if (showFlag){
            return ;
        }
        LocalStorageManager.set(localKey, String(this.vo.st));
        let view = this;
        let keyStr = "startDialog_"+this.getTypeCode();
        let startCfg = view.cfg[keyStr];

        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW,{
            aid : view.aid,
            code : view.getTypeCode(),
            AVGDialog : startCfg,
            visitId : "1",
            talkKey: "acGoodMatchStartDialog",
            // bgName: bgName,
            obj: view,
        });
    }

    //充值提示
    public showRechargeTip():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acGoodMatchToolNotFull`, this.getTypeCode())),
            touchMaskClose : true,
            title : `itemUseConstPopupViewTitle`,
            callback : ()=>{
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handle : this,
            needClose : 1,
            needCancel : true,
            confirmTxt : `taskGoBtn`,
            // recommand : false
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

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACGOODMATCH_LOTTERY, this.playBtnCallback, this);

        this.hideViewMask();
        this._timeBg = null;
        this._timeTxt = null;
        this._rechargeTip = null;
        this._detailRed = null;
        this._processContainer = null;
        this._scrollView = null;
        this._onceContainer = null;
        this._freeDesc = null;
        this._toolNumBg = null;
        this._toolIcon = null;
        this._toolNum = null;
        this._multiNeedContainer = null;
        this._multiBtnInfo= null;
        this._processNum = null;
        this._oneKeyContainer = null;
        this._ballContainer = null;
        this._boxList = [];
        this._ballList = [];
        this._lastMapData = null;
        this._playBallId = [];
        this._isBatch = false;
        this._isPlay = false;

        super.dispose();
    }

}