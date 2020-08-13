/**
 * 三国类活动2
 * author ycg
 * date 2020.2.10
 * @class AcThreekingdomsOfWifeView
 */
class AcThreekingdomsOfWifeView extends AcCommonView{
    private _timeBg:BaseBitmap = null;
    private _acTimeTf:BaseTextField = null;
    private _processNum:BaseTextField = null;
    private _toolNumIcon:BaseBitmap = null;
    private _toolNum:BaseTextField = null;
    private _freeDesc:BaseTextField = null;
    private _onceNeedContainer:BaseDisplayObjectContainer = null;
    private _bottomBg:BaseBitmap = null;
    private _detailBtn:BaseButton = null;
    private _boxList:any[] = [];
    private _isSelPlayBtn:boolean = false;
    private _isPlayTen:boolean = false;
    private _lastProcessNum:number = 0;
    private _flowerBoneList:BaseLoadDragonBones[] = [];
    private _rewardData:any = null;

    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_LOTTERY, this.lotteryCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_ACHIEVE, this.refreshBox, this);

        let bgStr = ResourceManager.hasRes("acthreekingofwife_bg-"+this.getTypeCode()) ? "acthreekingofwife_bg-"+this.getTypeCode() : "acthreekingofwife_bg-1";
        let bg = BaseBitmap.create(bgStr);
        bg.setPosition(0, 0);
        this.addChildToContainer(bg);

        let infoBgStr = ResourceManager.hasRes("acthreekingofwife_infobg-"+this.getTypeCode()) ? "acthreekingofwife_infobg-"+this.getTypeCode() : "acthreekingofwife_infobg-1";
        let infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.titleBg.x + this.titleBg.width/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height - 7 - 80);
        this.addChildToContainer(infoBg);

        //活动时间
        let acDate = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsOfWifeTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDate.setPosition(infoBg.x + 20, this.titleBg.y + this.titleBg.height + 3);
        this.addChildToContainer(acDate);
         
        //活动说明
        let acDescStr = LanguageManager.getlocal("acThreekingdomsOfWifeInfo-"+this.getTypeCode());
        let acDesc = ComponentManager.getTextField(acDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.setPosition(acDate.x , acDate.y + acDate.height + 6);
        acDesc.width = 600;
        acDesc.lineSpacing = 6;
        this.addChildToContainer(acDesc);       
        
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2 - 2;
		this.addChildToContainer(this._timeBg);
		this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsOfWifeTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);

        //processNum
        let processNumBgStr = ResourceManager.hasRes("acthreekingofwife_processbg-"+this.getTypeCode()) ? "acthreekingofwife_processbg-"+this.getTypeCode() : "acthreekingofwife_processbg-1";
        let processNumBg = BaseBitmap.create(processNumBgStr);
        processNumBg.setPosition(infoBg.x + infoBg.width/2 - processNumBg.width/2, infoBg.y + infoBg.height + 10);
        this.addChildToContainer(processNumBg);

        let currProNum = this.vo.getProcessNum();
        let maxProNum = this.vo.getMaxAchieveNeedNum();
        let processNum = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsOfWifeProcess-"+this.getTypeCode(), [""+currProNum, ""+maxProNum]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        processNum.setPosition(processNumBg.x + processNumBg.width/2, processNumBg.y + processNumBg.height/2 - 4);
        processNum.anchorOffsetX = processNum.width/2;
        this.addChildToContainer(processNum);
        this._processNum = processNum;

        App.LogUtil.log("add BottomBg 00");
        //佳人衣装
        let skinId = this.cfg.show;
        App.LogUtil.log("skinId: "+skinId);
        let skinCfg = Config.WifeCfg.getWifeCfgById(skinId);
        let boneName = null;
        if (skinCfg && skinCfg.bone){
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            let wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            wife.setScale(0.75);  //0.53
            // wife.anchorOffsetY = wife.height;
            // wife.anchorOffsetX = wife.width / 2;
            if (this.getTypeCode() == "1" || this.getTypeCode() == "3"){
                wife.x = GameConfig.stageWidth/2;
                wife.y = GameConfig.stageHeigth - 172 + 40;
            }
            this.addChildToContainer(wife);
        }
        else {
            let wife = BaseLoadBitmap.create(skinCfg.body);
            wife.width = 640;
            wife.height = 840;
            wife.setScale(0.6);
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            if (this.getTypeCode() == "1"||this.getTypeCode() == "3"){
                wife.x = GameConfig.stageWidth/2;
                wife.y = GameConfig.stageHeigth - 172 + 40;
            }
            this.addChildToContainer(wife);
        }
        
        App.LogUtil.log("add BottomBg 11");
        //bottom
        let bottomBgStr = ResourceManager.hasRes("acthreekingofwife_bottombg-"+this.getTypeCode()) ? "acthreekingofwife_bottombg-"+this.getTypeCode() : "acthreekingofwife_bottombg-1";
        let bottomBg = BaseBitmap.create(bottomBgStr);
        bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2, GameConfig.stageHeigth - bottomBg.height);
        this.addChildToContainer(bottomBg);
        this._bottomBg = bottomBg;

        let toolNumIconStr = ResourceManager.hasRes("acthreekingofwife_smallitemicon-"+this.getTypeCode()) ? "acthreekingofwife_smallitemicon-"+this.getTypeCode() : "acthreekingofwife_smallitemicon-1";
        let toolNumIcon = BaseBitmap.create(toolNumIconStr);
        this.addChildToContainer(toolNumIcon);
        this._toolNumIcon = toolNumIcon;

        let currNum = this.vo.getToolNum();
        let toolNum = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsOfWifeToolNum-"+this.getTypeCode(), [""+currNum]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        toolNumIcon.setPosition(bottomBg.x + bottomBg.width/2 - (toolNumIcon.width + toolNum.width)/2 - 5, bottomBg.y + 20);
        toolNum.setPosition(toolNumIcon.x + toolNumIcon.width, toolNumIcon.y + toolNumIcon.height/2 - toolNum.height/2 + 3);
        this.addChildToContainer(toolNum);
        this._toolNum = toolNum;

        //一次
        let onceBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "acThreekingdomsOfWifeOnceBtnName-"+this.getTypeCode(), this.playBtnClick, this, [0]);
        onceBtn.setPosition(bottomBg.x + 60, bottomBg.y + bottomBg.height - onceBtn.height - 20);
        this.addChildToContainer(onceBtn);
        //免费
        let freeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsOfWifeFree"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        freeDesc.setPosition(onceBtn.x + onceBtn.width/2 - freeDesc.width/2, onceBtn.y - 25);
        this.addChildToContainer(freeDesc);
        this._freeDesc = freeDesc;
        //一次
        let onceNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(onceNeedContainer);
        this._onceNeedContainer = onceNeedContainer;
        //图标
        let oneGemIcon = BaseBitmap.create(toolNumIconStr);
        oneGemIcon.setScale(1);
        onceNeedContainer.addChild(oneGemIcon);

        let onceNeedDesc = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsOfWifeToolNum-"+this.getTypeCode(), [String(this.cfg.consume1)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        onceNeedContainer.addChild(onceNeedDesc);
        onceNeedContainer.width = oneGemIcon.width * oneGemIcon.scaleX + onceNeedDesc.width;
        onceNeedDesc.setPosition(oneGemIcon.x + oneGemIcon.width * oneGemIcon.scaleX, oneGemIcon.y + oneGemIcon.height/2 - onceNeedDesc.height/2 + 3);
        onceNeedContainer.setPosition(onceBtn.x + onceBtn.width/2 - onceNeedContainer.width/2 - 2,  onceBtn.y - oneGemIcon.height + 3);
    
        if (this.vo.isFree()){
            freeDesc.visible = true;
            onceNeedContainer.visible = false;
        }
        else{
            freeDesc.visible = false;
            onceNeedContainer.visible = true;
        }
        //十次
        let playMultiBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "acThreekingdomsOfWifeMultiBtnName-"+this.getTypeCode(), this.playBtnClick, this, [1]);
        playMultiBtn.setPosition(GameConfig.stageWidth - 60 - playMultiBtn.width, onceBtn.y);
        this.addChildToContainer(playMultiBtn);

        let multiNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(multiNeedContainer);

        let multiGemIcon = BaseBitmap.create(toolNumIconStr);
        multiGemIcon.setScale(1);
        multiNeedContainer.addChild(multiGemIcon);

        let multiNeedDesc = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsOfWifeToolNum-"+this.getTypeCode(), [String(this.cfg.consume1 * 10)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        multiNeedContainer.addChild(multiNeedDesc);
        multiNeedDesc.setPosition(multiGemIcon.x + multiGemIcon.width * multiGemIcon.scaleX, multiGemIcon.y + multiGemIcon.height/2 - multiNeedDesc.height/2 + 3);

        multiNeedContainer.width = multiGemIcon.width * multiGemIcon.scaleX + multiNeedDesc.width;
        multiNeedContainer.setPosition(playMultiBtn.x + playMultiBtn.width/2 - multiNeedContainer.width/2 - 2,  playMultiBtn.y - multiGemIcon.height + 3);
        //衣装预览
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(bottomBg.x + bottomBg.width/2 - skinTxtEffect.width/2, bottomBg.y - 90);
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
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSOFWIFEDETAILPOPUPVIEW4, {aid: this.aid, code: this.code});
        }, this);
        //活动详情
        let detailBtnBg = ResourceManager.hasRes("acthreekingofwife_detailbtn-"+this.getTypeCode()) ? "acthreekingofwife_detailbtn-"+this.getTypeCode() : "acthreekingofwife_detailbtn-1";
        let detailBtn = ComponentManager.getButton(detailBtnBg, "", ()=>{
            //详情
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSOFWIFEDETAILPOPUPVIEW, {aid:this.aid, code:this.code});
        }, this);
        detailBtn.setPosition(infoBg.x + 15, infoBg.y + infoBg.height + 20);
        this.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward()){
            App.CommonUtil.addIconToBDOC(this._detailBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }

        this.initBox();
        this.refreshBox();
    }

    private playBtnClick(index:number):void{
        App.LogUtil.log("playBtnClick "+index);
        if (!this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return;
        }
        if (this._isSelPlayBtn){
            return ;
        }
        this._lastProcessNum = this.vo.getProcessNum();
        let currNum = this.vo.getToolNum();
        if (index == 0){
            let isFree = 0;
            if (this.vo.isFree()){
                isFree = 1;
            }
            if (isFree == 0 && currNum < this.cfg.consume1){
                this.showRechargeTipView();
                return;
            }
            this._isPlayTen = false;
            this._isSelPlayBtn = true;
            NetManager.request(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_LOTTERY, { activeId: this.vo.aidAndCode, isFree: isFree, isTenPlay: 0});
        }
        else{
            if (currNum < this.cfg.consume1 * 10){
                this.showRechargeTipView();
                return;
            }
            this._isPlayTen = true;
            this._isSelPlayBtn = true;
            NetManager.request(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_LOTTERY, { activeId: this.vo.aidAndCode, isFree: 0, isTenPlay: 1});
        }
    }

    private lotteryCallback(event:egret.Event){
        if (!event.data.ret){
            this._isSelPlayBtn = false;
            return;
        }
        this.showViewMask();
        let roseBone = "acthreekingdomsofwifeview_roses";
        if (this.getTypeCode() == "3")
        {
            roseBone = "acthreekingdomsofwifeview_peony";
        }
        let roseBoneName = roseBone+"_ske";
        let view = this;
        let rData = event.data.data.data;
        view._rewardData = rData;
        let rewardId = this.vo.getProcessRewardIndex(this._lastProcessNum);
        if (App.CommonUtil.check_dragon() && ResourceManager.hasRes(roseBoneName)){
            let dragonDB = App.DragonBonesUtil.getLoadDragonBones(roseBone, 1);
            view.addChildToContainer(dragonDB);
            dragonDB.setPosition(this._bottomBg.x + this._bottomBg.width/2, this._bottomBg.y - 200);
            if (this.getTypeCode()=="3")
            {
                dragonDB.y = this._bottomBg.y +150;
            }
            dragonDB.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
                App.LogUtil.log("roseBone dispose");
                this.container.removeChild(dragonDB);
                this._flowerBoneList.push(dragonDB);
                if (!rewardId || rewardId.length == 0){
                    this.showLotteryReward();
                }
            }, view);
            if (rewardId && rewardId.length > 0){ 
                egret.Tween.get(dragonDB).wait(600).call(view.showLotteryProcessAni, view);
            }
        }
        else{
            view.showLotteryProcessAni();
        }  
    }

    //抽奖特效
    private showLotteryProcessAni():void{
        let rewardId = this.vo.getProcessRewardIndex(this._lastProcessNum);
        if (rewardId && rewardId.length > 0){
            //播特效
            for (let i = 0; i < rewardId.length; i++){
                this.playLotteryProcessAni(rewardId[i]);
            }
        }
        else{
            //展示奖励
            this.showLotteryReward();
        }
    }

    //流星的旋转角度
    private get meteorRotation():number[]{
        if (this.getTypeCode() == "1" || this.getTypeCode() == "3"){
            return [
                -120, -85, -45, -20, 15, 45, 80, 120
            ];
        }
    }

    //进度奖励特效
    private playLotteryProcessAni(index:number):void{
        let view = this;
        let meteorEff = ComponentManager.getCustomMovieClip("acthreekingofwife_meteoreff", 12, 70);
        meteorEff.width = 150;
        meteorEff.height = 400;
        meteorEff.anchorOffsetX = meteorEff.width/2;
        meteorEff.anchorOffsetY = meteorEff.height - 120;
        meteorEff.setPosition(view._bottomBg.x + view._bottomBg.width/2, view._bottomBg.y - 205);
        view.addChildToContainer(meteorEff);
        meteorEff.rotation = view.meteorRotation[index];
        meteorEff.playWithTime(1);
        meteorEff.setEndCallBack(()=>{
            let flowerOpen = ComponentManager.getCustomMovieClip("acthreekingdofwife_blossomeff", 9, 70);
            flowerOpen.width = 300;
            flowerOpen.height = 240;
            flowerOpen.anchorOffsetX = flowerOpen.width/2;
            flowerOpen.anchorOffsetY = flowerOpen.height/2;
            let boxData = view._boxList[index];
            flowerOpen.setPosition(boxData.boxBg.x + boxData.boxBg.width/2, boxData.boxBg.y + boxData.boxBg.height/2);
            view.addChildToContainer(flowerOpen);
            flowerOpen.playWithTime(1);
            view.refreshBox();
            flowerOpen.setEndCallBack(()=>{
                this.showLotteryReward();
                flowerOpen.dispose();
            }, view);
            meteorEff.dispose();
        }, view);
    }

    //奖励弹窗
    private showLotteryReward():void{
        let rData = this._rewardData;
        if (rData){
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rData.rewards, "isPlayAni":true, "callback":()=>{
                this._isSelPlayBtn = false;
                this.hideViewMask();
            }});
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
            }
        }
        else{
            this._isSelPlayBtn = false;
            this.hideViewMask();
        } 
    }

    private get boxPos():any{
        if (this.getTypeCode() == "1"){
            return [
                {x: 50, y: 140},
                {x: 15, y: 290},
                {x: 90, y: 430},
                {x: 200, y: 500},
                {x: 330, y: 500},
                {x: 440, y: 430},
                {x: 515, y: 290},
                {x: 480, y: 140},
            ];
        }
        if (this.getTypeCode() == "3"){
            return [
                {x: 50, y: 140},
                {x: 15, y: 290},
                {x: 90, y: 430},
                {x: 200, y: 500},
                {x: 330, y: 500},
                {x: 440, y: 430},
                {x: 515, y: 290},
                {x: 480, y: 140},
            ];
        }
    }

    private initBox():void{
        let data = this.cfg.getAchieveCfg();
        for (let i=0; i < data.length; i++){
            let boxBgStr = ResourceManager.hasRes("acthreekingofwife_achievebg-"+this.getTypeCode()) ? "acthreekingofwife_achievebg-"+this.getTypeCode() : "acthreekingofwife_achievebg-1";
            let boxBg = BaseBitmap.create(boxBgStr);
            boxBg.setPosition(this._bottomBg.x + this.boxPos[i].x, this._bottomBg.y - this.boxPos[i].y);

            let boxImg = ResourceManager.hasRes("acthreekingofwife_achievestate_1-"+this.getTypeCode()) ? "acthreekingofwife_achievestate_1-"+this.getTypeCode() : "acthreekingofwife_achievestate_1-1";
            let box = BaseBitmap.create(boxImg);
            box.setPosition(boxBg.x + boxBg.width/2 - box.width/2, boxBg.y + boxBg.height/2 - box.height/2);
            this.addChildToContainer(box);
            this.addChildToContainer(boxBg);

            let boxNumBgImg = ResourceManager.hasRes("acthreekingofwife_numbg-"+this.getTypeCode()) ? "acthreekingofwife_numbg-"+this.getTypeCode() : "acthreekingofwife_numbg-1";
            let boxNumBg = BaseBitmap.create(boxNumBgImg);
            boxNumBg.setPosition(boxBg.x + boxBg.width/2 - boxNumBg.width/2, boxBg.y + boxBg.height + 1);
            this.addChildToContainer(boxNumBg);

            let boxEffect = ComponentManager.getCustomMovieClip("acthreekingofwife_balleff", 12, 70);
            boxEffect.width = 251;
            boxEffect.height = 250;
            boxEffect.setPosition(boxBg.x + boxBg.width/2 - boxEffect.width/2, boxBg.y + boxBg.height/2 - boxEffect.height/2 );
            this.addChildToContainer(boxEffect);
            boxEffect.playWithTime(0);
            boxEffect.blendMode = egret.BlendMode.ADD;
            boxEffect.visible = false;

            let boxNum  = ComponentManager.getTextField(""+data[i].specialnum, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            boxNum.setPosition(boxNumBg.x + boxNumBg.width/2 - boxNum.width/2, boxNumBg.y + boxNumBg.height/2 - boxNum.height/2);
            this.addChildToContainer(boxNum);

            let boxData = {boxBg:boxBg, box: box, boxEffect: boxEffect};
            this._boxList[i] = boxData;
            boxBg.addTouchTap(this.boxClick, this, [data[i].id]);
        }
    }

    private boxClick(target:any, index:number){
        App.LogUtil.log("boxClick "+ index);
        ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSOFWIFEDETAILPOPUPVIEW2, {aid: this.aid, code: this.code, id: index});
    }

    private refreshBox():void{
        let data = this.cfg.getAchieveCfg();
        let processNum = this.vo.getProcessNum();
        for (let i = 0; i < data.length; i++){
            let boxData = this._boxList[i];
            if (this.vo.isGetAchieveRewardById(data[i].id)){
                let boxImg = ResourceManager.hasRes("acthreekingofwife_achievestate_2-"+this.getTypeCode()) ? "acthreekingofwife_achievestate_2-"+this.getTypeCode() : "acthreekingofwife_achievestate_2-1";
                boxData.box.setRes(boxImg);
                boxData.boxEffect.visible = false;
            }
            else{
                if (processNum >= data[i].specialnum){
                    let boxImg = ResourceManager.hasRes("acthreekingofwife_achievestate_2-"+this.getTypeCode()) ? "acthreekingofwife_achievestate_2-"+this.getTypeCode() : "acthreekingofwife_achievestate_2-1";
                    boxData.box.setRes(boxImg);
                    boxData.boxEffect.visible = true;
                }
                else{
                    let boxImg = ResourceManager.hasRes("acthreekingofwife_achievestate_1-"+this.getTypeCode()) ? "acthreekingofwife_achievestate_1-"+this.getTypeCode() : "acthreekingofwife_achievestate_1-1";
                    boxData.box.setRes(boxImg);
                    boxData.boxEffect.visible = false;
                }
            }
        }
    }

    private refreshView():void{
        let toolNum = this.vo.getToolNum();
        this._toolNum.text = LanguageManager.getlocal("acThreekingdomsOfWifeToolNum-"+this.getTypeCode(), [""+toolNum]);
        this._toolNumIcon.x = this._bottomBg.x + this._bottomBg.width/2 - (this._toolNumIcon.width + this._toolNum.width)/2 - 5;
        this._toolNum.x = this._toolNumIcon.x + this._toolNumIcon.width;

        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward()){
            App.CommonUtil.addIconToBDOC(this._detailBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }

        if (this.vo.isFree()){
            this._freeDesc.visible = true;
            this._onceNeedContainer.visible = false;
        }
        else{
            this._freeDesc.visible = false;
            this._onceNeedContainer.visible = true;
        }

        let currProNum = this.vo.getProcessNum();
        let maxProNum = this.vo.getMaxAchieveNeedNum();
        this._processNum.text = LanguageManager.getlocal("acThreekingdomsOfWifeProcess-"+this.getTypeCode(), [""+currProNum, ""+maxProNum]);
        this._processNum.anchorOffsetX = this._processNum.width/2;
    }

    public showRechargeTipView():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"acThreekingdomsOfWifeRechargeTipTitle-"+this.getTypeCode(),
            msg:LanguageManager.getlocal("acThreekingdomsOfWifeRechargeTipMsg-"+this.getTypeCode()),
            callback:() =>{
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSOFWIFEDETAILPOPUPVIEW, {aid: this.aid, code: this.code});
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

    public tick():void{
        this._acTimeTf.text = LanguageManager.getlocal("acThreekingdomsOfWifeTimeCountDown", [this.vo.getCountDown()]);
		this._timeBg.width = 60 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    }

    private get cfg():Config.AcCfg.ThreekingdomsOfWifeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcThreekingdomsOfWifeVo{
        return <AcThreekingdomsOfWifeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected getTitleBgName():string{
        return ResourceManager.hasRes("acthreekingofwife_titlebg-"+this.getTypeCode()) ? "acthreekingofwife_titlebg-"+this.getTypeCode() : "acthreekingofwife_titlebg-1";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getTitleStr():string{
        return "";
    }

    protected getRuleInfo():string{
        return "acThreekingdomsOfWifeRuleInfo-"+this.getTypeCode();
    }

    public getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        if (this.code == "4"){
            return "3";
        }
        return this.code;
    }

    protected getProbablyInfo():string
	{
		return "acThreekingdomsOfWifeProbablyInfo-" + this.getTypeCode();
	}

    protected getResourceList():string[]{
        let list = [];
        if (this.getTypeCode() != "1"){
           list =  [
               "threekingofwifecode1", "acthreekingofwife_infobg-1",
           ];
        }
        else if (this.getTypeCode() == "1"){
            list = [
                "acthreekingdomsofwifeview_roses_ske", "acthreekingdomsofwifeview_roses_tex_json", "acthreekingdomsofwifeview_roses_tex_png"
            ];
        }
        else if (this.getTypeCode() == "3"){
            list = [
                "acthreekingdomsofwifeview_peony_ske", "acthreekingdomsofwifeview_peony_tex_json", "acthreekingdomsofwifeview_peony_tex_png"
            ];
        }
        return super.getResourceList().concat([
            "acthreekingofwife_skinmaskbg", "acwealthcarpview_servantskintxt", "acthrowstone_common_wife_txt",
            "threekingofwifecode"+this.getTypeCode(),
            "acthreekingofwife_bg-"+this.getTypeCode(),
            "acthreekingofwife_titlebg-"+this.getTypeCode(),
            "acthreekingofwife_infobg-"+this.getTypeCode(),
        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_LOTTERY, this.lotteryCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_ACHIEVE, this.refreshBox, this);

        for (let i=0; i < this._flowerBoneList.length; i++){
            this._flowerBoneList[i].dispose();
        }
        this._flowerBoneList = [];
        this._timeBg = null;
        this._acTimeTf = null;
        this._processNum = null;
        this._toolNumIcon = null;
        this._toolNum = null;
        this._freeDesc = null;
        this._bottomBg = null;
        this._onceNeedContainer = null;
        this._detailBtn = null;
        this._boxList = [];
        this._isPlayTen = false;
        this._isSelPlayBtn = false;
        this._lastProcessNum = 0;
        
        super.dispose();
    }
}