/**
 *  女优活动3 依依不舍
 *  author ycg
 *  date 2019.10.14
 *  @class AcYiyibusheView
 * 
 */
class AcYiyibusheView extends AcCommonView{
    public _timeBg:BaseBitmap = null;
    public _acTimeTf:BaseTextField = null;
    public _freeDesc:BaseTextField = null;
    public _onceNeedContainer:BaseDisplayObjectContainer = null;
    public _onceNeedDesc:BaseTextField = null;
    public _isSelectPlayBtn:boolean = false;

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
    public _startPercent:number = 0;
    public _seprateIndex:number = 5;
    public _isSecond:boolean = false;
    public _isPlay:boolean = false;
    public _roleBubbleTip:BaseDisplayObjectContainer = null;
    public _playRewards:string = null;
    public _handlerData:any = null;
    private _meetBoneDB:any = null;
    private _roleEat:BaseBitmap = null;
    private _isFeeding:boolean = true;
    private _bg:BaseBitmap = null;

    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_YIYIBUSHECHOU, this.playRequestCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_YIYIBUSHE_GETREWARD, this.getAchievementCallback, this);

        let bg = BaseBitmap.create(this.getBgName());
        // bg.anchorOffsetY = bg.height;
        bg.setPosition(0, GameConfig.stageHeigth - bg.height);
        this.addChildToContainer(bg);
        this._bg = bg;

        let infoBg = BaseLoadBitmap.create(`luckdrawdescbg-5`);
        infoBg.width = GameConfig.stageWidth;
        infoBg.setPosition(this.titleBg.x + this.titleBg.width/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(infoBg);
        //活动时间
        let acTime = ComponentManager.getTextField(LanguageManager.getlocal("acYiyibusheTimeInfo", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acTime.setPosition(infoBg.x + 15, infoBg.y + 10);
        this.addChildToContainer(acTime);
        //活动介绍
        let acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acYiyibusheDesc-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.width = 600;
        acDesc.lineSpacing = 5;
        acDesc.setPosition(acTime.x, acTime.y + acTime.height + 3);
        this.addChildToContainer(acDesc);

        infoBg.height = acTime.height + acDesc.height + 30;

        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2 - 2;
		this.addChildToContainer(this._timeBg);
		this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acYiyibusheTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);

        //烤肉
        let meetBgStr = ResourceManager.hasRes("acyiyibushe_meet-"+this.getTypeCode()) ? "acyiyibushe_meet-"+this.getTypeCode() : "acyiyibushe_meet-1";
        let meetBg = BaseBitmap.create(meetBgStr);
        meetBg.setPosition(GameConfig.stageWidth/2 - 70, bg.y + infoBg.y + 340);
        this.addChildToContainer(meetBg);
        
        //bottom
        let bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = 140;
        bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2, GameConfig.stageHeigth - bottomBg.height);
        
        //进度条背景
        let progressBg = BaseLoadBitmap.create("luckdrawprogressbg-1");
        progressBg.width = 640;
        progressBg.height = 107;
        progressBg.setPosition(0, bottomBg.y - progressBg.height);
        
        //body
        let userBody = BaseLoadBitmap.create("user_body_full_"+this.cfg.show);
        userBody.width = 382;
        userBody.height = 618;
        userBody.setPosition(infoBg.x - 20, infoBg.y + 330);//320
        this.addChildToContainer(userBody);

        //userHead
        let head = Api.playerVoApi.getUserHeadContainer();
        head.setPosition(userBody.x + userBody.width/2 - 75, userBody.y - head.height + 50);
        this.addChildToContainer(head);

        let roleEatBgStr = ResourceManager.hasRes("acyiyibushe_eat-"+this.getTypeCode()) ? "acyiyibushe_eat-"+this.getTypeCode() : "acyiyibushe_eat-1";
        let roleEat = BaseBitmap.create(roleEatBgStr);
        roleEat.setPosition(bottomBg.x + bottomBg.width/2 - 100, userBody.y - 50);
        this.addChildToContainer(roleEat);
        roleEat.visible = false;
        this._roleEat = roleEat;

        let meetBone = "acyiyibusheview_barbecue";
        let meetBoneName = meetBone+"_ske";
        if (App.CommonUtil.check_dragon() && ResourceManager.hasRes(meetBoneName)){
            let dragonDB = App.DragonBonesUtil.getLoadDragonBones(meetBone, 0, "idle");
            this.addChildToContainer(dragonDB);
            dragonDB.setPosition(10, this._bg.y+20);
            this._meetBoneDB = dragonDB;
        }

        this.addChildToContainer(bottomBg);
        this.addChildToContainer(progressBg);

        //一次
        let onceBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acYiyibusheOnceBtnName-"+this.getTypeCode(), this.playBtnClick, this, [0]);
        onceBtn.setPosition(bottomBg.x + 60, bottomBg.y + 60);
        this.addChildToContainer(onceBtn);

        //免费
        let freeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acYiyibusheFree"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        freeDesc.setPosition(onceBtn.x + onceBtn.width/2 - freeDesc.width/2, onceBtn.y - 25);
        this.addChildToContainer(freeDesc);
        this._freeDesc = freeDesc;

        let onceNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(onceNeedContainer);
        let oneGemIcon = BaseLoadBitmap.create("itemicon1");
		oneGemIcon.width = 100;
        oneGemIcon.height = 100;
        oneGemIcon.setScale(0.5);
        onceNeedContainer.addChild(oneGemIcon);
        let onceNeedDesc = ComponentManager.getTextField(String(this.cfg.gemCost), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        onceNeedDesc.setPosition(oneGemIcon.x + oneGemIcon.width * oneGemIcon.scaleX, oneGemIcon.y + oneGemIcon.height * oneGemIcon.scaleY/2 - onceNeedDesc.height/2 + 4);
        onceNeedContainer.addChild(onceNeedDesc);
        onceNeedContainer.width = oneGemIcon.width * oneGemIcon.scaleX + onceNeedDesc.width;
        onceNeedContainer.setPosition(onceBtn.x + onceBtn.width/2 - onceNeedContainer.width/2 - 2,  onceBtn.y - oneGemIcon.height * oneGemIcon.scaleY + 5);
        this._onceNeedContainer = onceNeedContainer;
        this._onceNeedDesc = onceNeedDesc;
        if (this.vo.isFree()){
            freeDesc.visible = true;
            onceNeedContainer.visible = false;
        }
        else{
            freeDesc.visible = false;
            onceNeedContainer.visible = true;
        }

        //十次
        let playMultiBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acYiyibusheMultiBtnName-"+this.getTypeCode(), this.playBtnClick, this, [1]);
        playMultiBtn.setPosition(GameConfig.stageWidth - 60 - playMultiBtn.width, bottomBg.y + 60);
        this.addChildToContainer(playMultiBtn);
        let multiNeed = this.cfg.gemCost * 10;
        if (this.cfg.discount){
            multiNeed *= this.cfg.discount;
        }

        let multiNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(multiNeedContainer);
        let multiGemIcon = BaseLoadBitmap.create("itemicon1");
		multiGemIcon.width = 100;
        multiGemIcon.height = 100;
        multiGemIcon.setScale(0.5);
        multiNeedContainer.addChild(multiGemIcon);
        let multiNeedDesc = ComponentManager.getTextField(String(multiNeed), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        multiNeedDesc.setPosition(multiGemIcon.x + multiGemIcon.width * multiGemIcon.scaleX, multiGemIcon.y + multiGemIcon.height * multiGemIcon.scaleY/2 - multiNeedDesc.height/2 + 4);
        multiNeedContainer.addChild(multiNeedDesc);
        multiNeedContainer.width = multiGemIcon.width * multiGemIcon.scaleX + multiNeedDesc.width;
        multiNeedContainer.setPosition(playMultiBtn.x + playMultiBtn.width/2 - multiNeedContainer.width/2 - 2, playMultiBtn.y - multiGemIcon.height * multiGemIcon.scaleY + 5);

        //打折标记
        if (this.cfg.discount) {
            let discount = this.cfg.discount;
			let tag = BaseBitmap.create('shopview_corner');
			tag.setPosition(playMultiBtn.x, playMultiBtn.y);
            this.addChildToContainer(tag);
            tag.setScale(0.9);

			let tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('acYiyibusheDiscount', [String(discount * 10)]), 18, TextFieldConst.COLOR_WARN_YELLOW);
			let tagnum = 10 - discount * 10;
			if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
				tagTxt.text = LanguageManager.getlocal('acYiyibusheDiscount', [(tagnum * 10).toString()]);
			}
			tagTxt.width = 70;
			tagTxt.height = 20;
			tagTxt.textAlign = egret.HorizontalAlign.CENTER;
			tagTxt.anchorOffsetX = tagTxt.width / 2;
			tagTxt.anchorOffsetY = tagTxt.height / 2;
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tagTxt, tag, [-tagTxt.anchorOffsetX + 22, -tagTxt.anchorOffsetY + 21]);
			tagTxt.rotation = -45;
			this.addChildToContainer(tagTxt);
        }
       
        //衣装预览
		let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(bottomBg.x + 60, progressBg.y - 100);
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
		// skinTxteffect.touchEnabled = false;
		skinTxteffect.addTouchTap(() => {
			let topMsg = LanguageManager.getlocal("acYiyibusheClothesTip-"+this.code);
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEREWARDPOPUPVIEW, {titleIds:[this.cfg.show], bgType:1, topMsg:topMsg});
        }, this);

        //奖池展示
        let poolBtn = ComponentManager.getButton("acyiyibushe_rewardpoolbtn", "", ()=>{
            //奖池展示
            ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEREWARDPOOL, {rewards: this.cfg.getPoolRewards(), aid:this.aid, code:this.code});
        }, this);
        poolBtn.setPosition(infoBg.x + 20, infoBg.y + infoBg.height + 20);
        this.addChildToContainer(poolBtn);
        
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

        let progressNumber = LanguageManager.getlocal("acYiyibusheProNum", [String(this.vo.getScore()), String(this.vo.getCurrMaxProNum())]);
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

        //次数this._bg  24
        let numbg = BaseBitmap.create("acwealthcomingview_numbg");
        numbg.setPosition(this._progressBar.x + 13 - numbg.width, this._progressBar.y + this._progressBar.height / 2 - numbg.height / 2 + 2);
        this.addChildToContainer(numbg);

        //数量TF
        let numDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acYiyibusheProTotalNum"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        numDescTF.setPosition(numbg.x + numbg.width / 2 - numDescTF.width / 2, numbg.y + 49);
        this.addChildToContainer(numDescTF);
        numDescTF.visible = false;

        //数量TF
        let numStr = LanguageManager.getlocal("acYiyibusheProTotalNum", [String(this.vo.getScore())]);
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
            ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEACHIEVEMENTPOPUPVIEW, { aid: this.aid, code: this.code });
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

        //宝箱bubble
        let skinData = this.vo.getShowSkinData();
        let needNum = 0;
        if (skinData){
            needNum = skinData.needNum;
        }
        let bubbleStr = LanguageManager.getlocal("acYiyibusheGetBigRewardTip-"+this.getTypeCode(), [String(needNum)]);
        let bigRewardTip = this.showBubbleTip(bubbleStr, 350);
        bigRewardTip.setPosition(GameConfig.stageWidth/2 - 100, progressBg.y - 60);
        this.addChildToContainer(bigRewardTip);
        egret.Tween.get(bigRewardTip,{loop:true}).wait(5000).to({alpha:0}, 1000).wait(5000).to({alpha:1}, 1000);
    }

    //一次 十次点击事件
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
                //在此判断元宝是否足够
                if (Api.playerVoApi.getPlayerGem() < this.cfg.gemCost){
                    this.showRechargeTipView();
                    return;
                }
            }
            this._isSelectPlayBtn = true;
            //调接口
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_YIYIBUSHECHOU, { activeId: this.vo.aidAndCode, isFree:freeFlag, isTenPlay:0});
        }
        else{
            if (Api.playerVoApi.getPlayerGem() < this.cfg.gemCost * 10 * this.cfg.discount){
                this.showRechargeTipView();
                return;
            }
            this._isSelectPlayBtn = true;
            //调接口
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_YIYIBUSHECHOU, { activeId: this.vo.aidAndCode, isFree:0, isTenPlay:1});
        }
    }

    public playRequestCallback(evt:egret.Event){
        if (evt && evt.data && evt.data.ret){
            let rData = evt.data.data.data;
            if(!rData){
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                return;
            }
            this.showViewMask();
            this._playRewards = rData.rewards;
            this._handlerData = rData;
            //喂食动作->气泡->奖励
            if (this._meetBoneDB){
                this._isFeeding = true;
                this._meetBoneDB.setPosition(10, this._bg.y + 20);
                this._meetBoneDB.playDragonMovie("feeding", 1);
                this._meetBoneDB.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
                    if (this._meetBoneDB){
                        if (this._isFeeding){
                            this._isFeeding = false;
                            this.playRoleAni();
                        }
                    }
                });
            }
            else{
                this.playRoleAni();
            }
        }
        else{
            this._isSelectPlayBtn = false;
        }

        // let index = App.MathUtil.getRandom(1, 5);
        // let str = LanguageManager.getlocal("acYiyibusheEatMsg-"+this.getTypeCode()+"_"+index);
        // let tip = this.showBubbleTip(str, 300);
        // tip.setPosition(280, 360);
        // this.addChildToContainer(tip);
        // let view = this;
        // egret.Tween.get(tip).wait(500).to({alpha: 0}, 500).call(()=>{
        //     //肉消失->展示奖励
        //     ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPGETREWARDPOPUPVIEW, {
        //         rewards: rData.rewards, otherRewards: rData.otherrewards, criArr: rData.criArr, code: view.code, aid: view.aid, isPlayAni: true, aidCode: view.vo.aidAndCode, callback:()=>{
        //             let endPercent = 0;
        //             if (this.vo.isSecond() && this.vo.isSecond() == this._isSecond) {
        //                 endPercent = this.vo.getScore() / this.vo.getCurrMaxProNum();
        //             }
        //             else {
        //                 endPercent = this.vo.getScore() / this._maxProNum;
        //             }
        //             view.playProgressBarAni(this._startPercent, endPercent);
        //             this._isSelectPlayBtn = false;
        //             tip.dispose();
        //         }, handler: this});   
        // }) 
    }

    //播放kiss动画
    public playRoleAni():void{
        let view = this;
        view._roleEat.x = GameConfig.stageWidth;
        view._roleEat.visible = true;
        egret.Tween.get(view._roleEat).to({x: GameConfig.stageWidth/2 - 100}, 500).call(()=>{
            if (view._meetBoneDB){
                view._meetBoneDB.setPosition(0, view._bg.y -60);
                view._meetBoneDB.playDragonMovie("kiss", 1);
                egret.setTimeout(view.playRewardAni, view, 400);
                // view._meetBoneDB.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
                //     view.playRewardAni();
                // });
            }
            else{
                view.playRewardAni();
            }
        })
    }

    //奖励动画
    public playRewardAni():void{
        let index = App.MathUtil.getRandom(1, 5);
        let str = LanguageManager.getlocal("acYiyibusheEatMsg-"+this.getTypeCode()+"_"+index);
        let tip = this.showBubbleTip(str, 300);
        tip.setPosition(200, 360);
        this.addChildToContainer(tip);
        let view = this;
        let rData = this._handlerData;
        
        egret.Tween.get(tip).wait(400).to({alpha: 0}, 500).call(()=>{
            //肉消失->展示奖励
            ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPGETREWARDPOPUPVIEW, {
                rewards: rData.rewards, otherRewards: rData.otherrewards, criArr: rData.criArr, code: view.code, aid: view.aid, isPlayAni: true, aidCode: view.vo.aidAndCode, callback:()=>{
                    let endPercent = 0;
                    if (this.vo.isSecond() && this.vo.isSecond() == this._isSecond) {
                        endPercent = this.vo.getScore() / this.vo.getCurrMaxProNum();
                    }
                    else {
                        endPercent = this.vo.getScore() / this._maxProNum;
                    }
                    view.playProgressBarAni(this._startPercent, endPercent);
                    view._isSelectPlayBtn = false;
                    view._roleEat.visible = false;
                    if (view._meetBoneDB){
                        view._meetBoneDB.setPosition(10, view._bg.y + 20);
                        view._meetBoneDB.playDragonMovie("idle", 0);
                    }
                    view.hideViewMask();
                    tip.dispose();
                }, handler: this}); 
            
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
            }
        }) 
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
                ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEACHIEVEMENTPOPUPVIEW, { aid: this.aid, code: this.code, id: data.id });
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

    public refreshView():void{
        if (this.vo.isFree()){
            this._freeDesc.visible = true;
            this._onceNeedContainer.visible = false;
        }
        else{
            this._freeDesc.visible = false;
            this._onceNeedContainer.visible = true;
        }

        let numStr = LanguageManager.getlocal("acYiyibusheProTotalNum", [String(this.vo.getScore())]);
        this._numTF.text = numStr;
        let progressNumber = LanguageManager.getlocal("acYiyibusheProNum", [String(this.vo.getScore()), String(this.vo.getCurrMaxProNum())]);
        this._progressTF.text = progressNumber;

        if (!this.vo.isShowAchievementRewardRedDot()) {
            this._boxRedDot.setVisible(false);
        }
    }

    public getAchievementCallback():void{
        this.refreshBox(this._startPercent);
    }

    public tick():void{
        this._acTimeTf.text = LanguageManager.getlocal("acYiyibusheTimeCountDown", [this.vo.getCountDown()]);
		this._timeBg.width = 60 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    }

    //充值提示
    public showRechargeTipView():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"sweetgiftTipTitle",
            msg:LanguageManager.getlocal("sweetgiftTipMsg"),
            callback:() =>{
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handler:this,
            needCancel:true,
            });
    }

    //bubbleTip
    private showBubbleTip(str:string, bubbleWidth:number):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let bg = BaseBitmap.create("public_9_bg42");
        if (bubbleWidth){
            bg.width = bubbleWidth;
        }
        else{
            bg.width = 300;
        }
        container.addChild(bg);
        bg.name = "bubbleBg";
        let bubbleTf = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        bubbleTf.width = bg.width - 40;
        bubbleTf.setPosition(bg.x + 20, bg.y + 5);
        container.addChild(bubbleTf);
        bubbleTf.name = "bubbleTf";
        bg.height = bubbleTf.height + 18;
        bubbleTf.y = bg.y + bg.height/2 - bubbleTf.height/2;

        let tail = BaseBitmap.create("public_9_bg42_tail");
        tail.scaleX = -1;
        tail.setPosition(bg.width - 40, bg.y + bg.height - 3);
        container.addChild(tail);
        tail.name = "tail";

        return container;
    }

    private setBubbleTip(bubbleContainer:BaseDisplayObjectContainer, str:string):void{
        if (bubbleContainer){
            let bg = <BaseBitmap>bubbleContainer.getChildByName("bubbleBg");
            let bubbleTf = <BaseTextField>bubbleContainer.getChildByName("bubbleTf");
            let tail = <BaseBitmap>bubbleContainer.getChildByName("tail");
            bubbleTf.text = str;
            bg.height = bubbleTf.height + 18;
            bubbleTf.y = bg.y + bg.height/2 - bubbleTf.height/2;
            tail.y = bg.y + bg.height;
        }
    }

    private get cfg():Config.AcCfg.YiyibusheCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcYiyibusheVo{
        return <AcYiyibusheVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public getTypeCode():string{
        return this.code;
    }

    protected getRuleInfo():string{
        return "acyiyibusheRuleInfo-"+this.getTypeCode();
    }

    protected getBgName():string{
        return "acyiyibushe_bg-"+this.getTypeCode();
    }

    protected getTitleBgName():string{
        return "acyiyibushe_titlebg-"+this.getTypeCode();
    }

    protected getTitleStr():string{
        return "";
    }

    // 概率内容
	protected getProbablyInfo():string
	{
        return "acyiyibushe_probableinfo-"+this.getTypeCode();
    }

    /**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
    protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
        return { title: { key: `acyiyibusheReportTitle-${this.getTypeCode()}` }, msg: { key: `acyiyibusheReportMsg-${this.getTypeCode()}` } };
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    public getResourceList():string[]{
        let list:string[] = [];
        if (this.getTypeCode() != "1"){
            list = [
                "acyiyibushe_bg-1", "acyiyibushe_titlebg-1", "acyiyibushe_meet-1", "acyiyibushe_eat-1",
            ];
        }

        return super.getResourceList().concat([
            'shopview_corner', "acwealthcarpview_servantskintxt", "collectflag", "acworshipview_slider", "acwealthcomingview_progresslight", "acwealthcomingview_numbg", "acwealthcomingview_box_1", "acwealthcomingview_box_light", "acwealthcomingview_box_2", "luckydrawrewardword-2", "acworshipview_box1", "acworshipview_box2", "acworshipview_box3", "acyiyibushe_good_text", "acyiyibushe_rewardpoolbtn", "progress12", "progress12_bg", "acyiyibushe_rewardpoolbtn_down", "arena_bottom",
            "acyiyibushe_bg-"+this.getTypeCode(),
            "acyiyibushe_titlebg-"+this.getTypeCode(),
            "acyiyibushe_meet-"+this.getTypeCode(),
            "acyiyibushe_eat-"+this.getTypeCode(),

        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_YIYIBUSHECHOU, this.playRequestCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_YIYIBUSHE_GETREWARD, this.getAchievementCallback, this);

        this._timeBg = null;
        this._acTimeTf = null;

        this._freeDesc = null;
        this._onceNeedContainer = null;
        this._onceNeedDesc = null;
        this._isSelectPlayBtn = false;

        this._progressBar = null;
        this._progressTF = null;
        this._progressBM = null;
        this._progressLight = null;
        this._numTF = null;
        this._boxBM = null;
        this._boxLightBM = null;
        this._boxRedDot = null;
        this._boxList = [];
        this._maxProNum = 0;
        this._startPercent = 0;
        this._seprateIndex = 5;
        this._isSecond = false;
        this._isPlay = false;
        this._roleBubbleTip = null;
        this._playRewards = null;
        this._handlerData = null;
        this._meetBoneDB = null;
        this._roleEat = null;
        this._isFeeding = true;
        this._bg = null;

        super.dispose();
    }
}