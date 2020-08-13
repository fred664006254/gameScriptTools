/**
 * 兰亭荷花
 * author ycg
 * date 2020.4.14
 * @class AcLotusView
 */
class AcLotusView extends AcCommonView{
    private _timeBg:BaseBitmap = null;
    private _timeTxt:BaseTextField = null;
    private _detailBtn:BaseButton = null;
    private _playBtn:BaseButton = null;
    private _toolNum:BaseTextField = null;
    private _bgContainer:BaseDisplayObjectContainer = null;
    private _processContainer:BaseDisplayObjectContainer = null;
    private _processNum:BaseBitmapText|BaseTextField = null;
    private _isPlay:boolean = false;
    private _isMultiPlay:boolean = false;
    private _scrollView:ScrollView = null;
    private _boxList:any[] = [];
    private _isCanMove:boolean = true;
    private _rewardData:any = null;
    private _shp:egret.Shape = null;
    private _lotteryBoneList:BaseDisplayObjectContainer[] = [];
    private _pageCount:number = 7;
    private _lastProcessIndex:number = 0;
    private _rechargeInfo:BaseTextField = null;

    public constructor(){
        super();
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACLOTUS_LOTTERY, this.playCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACLOTUS_GETREWARD, this.getRewardCallback, this);
        this._timeBg = null;
        this._timeTxt = null;
        this._detailBtn = null;
        this._playBtn = null;
        this._toolNum = null;
        this._bgContainer = null;
        this._processContainer = null;
        this._isPlay = false;
        this._isMultiPlay = false;
        this._scrollView = null;
        this._boxList = [];
        this._isCanMove = true;
        this._rewardData = null;
        this._processNum = null;
        this._rechargeInfo = null;
        if (this._lotteryBoneList.length > 0){
            for (let i=0; i < this._lotteryBoneList.length; i++){
                this._lotteryBoneList[i].dispose();
            }
        }
        this._lotteryBoneList = [];

        super.dispose();
    }

    protected getUiCode():string{
        let code = "";
        switch(Number(this.code)){
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    private get cfg():Config.AcCfg.LotusCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
    }

    private get vo():AcLotusVo{
        return <AcLotusVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACLOTUS_LOTTERY, this.playCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACLOTUS_GETREWARD, this.getRewardCallback, this);

        let bgContainer = new BaseDisplayObjectContainer();
        // this.addChildToContainer(bgContainer);
        bgContainer.width = GameConfig.stageWidth;
        this._bgContainer = bgContainer;

        //进度宝箱
        let scrollView = ComponentManager.getScrollView(this._bgContainer, new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth));
        scrollView.setPosition(0, 0);
        this.addChildToContainer(scrollView);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.verticalScrollPolicy = "on";
        this._scrollView = scrollView;
        scrollView.bounces = false;

        let descBg = BaseBitmap.create("acthreekingofwife_infobg-1");
        descBg.y = this.titleBg.y +  this.titleBg.height - 60;
        this.addChildToContainer(descBg);

        //活动时间   
        let dateText = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = descBg.x + 10;
        dateText.y = this.titleBg.y + this.titleBg.height + 3;
        this.addChildToContainer(dateText);

        //活动文本
        let descSkinNeed = this.vo.getShowSkinData();
        let descTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(this.getCnByCode("acLotusInfo"), [""+this.cfg.needGem]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 620;
        descTxt.lineSpacing = 5;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 10;
        this.addChildToContainer(descTxt);

        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = descBg.y + descBg.height - this._timeBg.height / 2 - 2;
		this.addChildToContainer(this._timeBg);
		this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._timeTxt.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);

        //充值提示
        let rechargeNeed = this.cfg.needGem - this.vo.getRechargeNum() % this.cfg.needGem;
        let rechargeInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusRechargeInfo", this.code), [""+rechargeNeed]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeInfo.setPosition(dateText.x, descBg.y + descBg.height - rechargeInfo.height - 3);
        this.addChildToContainer(rechargeInfo);
        this._rechargeInfo = rechargeInfo;

        //佳人衣装
        let skinCfg = Config.WifeskinCfg.getWifeCfgById(this.cfg.show);
        let skinBoneName = null;
        if (skinCfg && skinCfg.bone){
            skinBoneName = skinCfg.bone + "_ske";
        }
        let wifeSkin = null;
        if ((!Api.switchVoApi.checkCloseBone()) && skinBoneName && RES.hasRes(skinBoneName) && App.CommonUtil.check_dragon()) {
            wifeSkin = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            wifeSkin.setScale(0.7);
            wifeSkin.x = 0;
            wifeSkin.y = GameConfig.stageHeigth;   
            if (this.getUiCode() == "1"){
                wifeSkin.scaleX = -0.7; 
                wifeSkin.x = 180;
            } 
        }
        else {
            wifeSkin = BaseLoadBitmap.create(skinCfg.body);
            wifeSkin.width = 640;
            wifeSkin.height = 840;
            wifeSkin.setScale(0.55);
            wifeSkin.anchorOffsetY = wifeSkin.height;
            wifeSkin.x = -20;
            wifeSkin.y = GameConfig.stageHeigth;  
            if (this.getUiCode() == "1"){
                wifeSkin.scaleX = -0.55; 
                wifeSkin.x = -20 + wifeSkin.width * 0.55;
            } 
        }
        this.addChildToContainer(wifeSkin);

        //详情按钮
        let detailBtn = ComponentManager.getButton(this.getResByCode(`aclotus_detailbtn`), "", ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACLOTUSDETAILPOPUPVIEW, {aid: this.aid, code: this.code});
        }, this);
        detailBtn.x = 10;
        detailBtn.y = descBg.y + descBg.height + 15;
        this.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;
        if (this.vo.isCangetAchieveReward() || this.vo.isCanExchange()){
            App.CommonUtil.addIconToBDOC(this._detailBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }

        //play btn
        let playBtnImgIndex = 1;
        if (!this.vo.isFree()){
            if (this.vo.getToolNum() < 10){
                playBtnImgIndex = 2;
            }
            else{
                playBtnImgIndex = 3;
            }
        }
        let playBtn = ComponentManager.getButton(this.getResByCode("aclotus_playbtn"+playBtnImgIndex), "", this.playBtnClick, this);
        this.addChildToContainer(playBtn);
        playBtn.setPosition(GameConfig.stageWidth - playBtn.width - 50, GameConfig.stageHeigth - playBtn.height - 60);
        this._playBtn = playBtn;

        //toolNum
        let toolNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusToolNum", this.getUiCode()), [""+this.vo.getToolNum()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        toolNum.setPosition(playBtn.x + playBtn.width/2 + 10, playBtn.y + playBtn.height + 15);
        this.addChildToContainer(toolNum);
        toolNum.anchorOffsetX = toolNum.width/2;
        this._toolNum = toolNum;

        let flower = BaseBitmap.create(this.getResByCode("aclotus_flower"));
        flower.setPosition(GameConfig.stageWidth/2 - flower.width/2, GameConfig.stageHeigth - flower.height - 15);
        this.addChildToContainer(flower);

        //衣装预览
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(50, GameConfig.stageHeigth - 150);
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
            ViewController.getInstance().openView(ViewConst.POPUP.ACLOTUSDETAILPOPUPVIEW4, {aid: this.aid, code: this.code});
        }, this);

        //宝箱
        this.initBox();
        
        //进度显示
        let processContainer = new BaseDisplayObjectContainer();
        this._processContainer = processContainer;
        this._bgContainer.addChild(processContainer);
        let processBg = BaseBitmap.create(App.CommonUtil.getResByCode("aclotus_processbg", this.getUiCode()));
        processContainer.width = processBg.width;
        processContainer.height = processBg.height;
        processContainer.setPosition(0, 500);
        processContainer.addChild(processBg);

        // let pNum = (this.vo.getProcessNum() / this.vo.getCurrMaxProNum() * 100);
        // if (pNum > 100){
        //     pNum = 100;
        // }
        let processNum = ComponentManager.getBitmapText(""+this.vo.getProcessNum(), TextFieldConst.FONTNAME_ITEMTIP, 0x004719, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        processNum.setPosition(40 + 36 - processNum.width/2, 27);
        processContainer.addChild(processNum);
        processNum.name = "processNum"; 
        this._processNum = processNum; 
        if (!Api.switchVoApi.checkOpenBMFont()){
            let pnumTxt = <BaseTextField>processNum;
            pnumTxt.bold = true;
        }

        this.refreshBox();
        this.refreshProcessInfo();
        this.moveScrollView(); 
    }

    //只需要一整屏的位置 剩余位置坐标可以不填 从下往上 宝箱底边中心点对齐  标记 左上角对齐（宝箱、标记都以屏幕左上角为(0，0)）boxsize: 1 正常 2 大， 
    private get boxPos():any[] {
        return  [
            {box:{x: 396, y: 916}, flag:{x: 427, y: 767}, boxSize: 1},
            {box:{x: 340, y: 752}, flag:{x: 365, y: 623}, boxSize: 1},
            {box:{x: 527, y: 670}, flag:{x: 507, y: 521}, boxSize: 2},
            {box:{x: 423, y: 462}, flag:{x: 467, y: 313}, boxSize: 1},
            {box:{x: 363, y: 284}, flag:{x: 406, y: 128}, boxSize: 2},
            {box:{x: 537, y: 160}, flag:{x: 521, y: 24}, boxSize: 1},
            {box:{x: 284, y: 111}, flag:{x: 326, y: -38}, boxSize: 1},
            {box:{x: 396, y: 916}, flag:{x: 427, y: 767}, boxSize: 1},
            {box:{x: 340, y: 752}, flag:{x: 365, y: 623}, boxSize: 1},
            {box:{x: 527, y: 670}, flag:{x: 507, y: 521}, boxSize: 2},
            {box:{x: 423, y: 462}, flag:{x: 467, y: 313}, boxSize: 1},
            {box:{x: 363, y: 284}, flag:{x: 406, y: 128}, boxSize: 2},
            {box:{x: 537, y: 160}, flag:{x: 521, y: 24}, boxSize: 1},
        ];
    }

    private initBox():void{
        let data = this.cfg.getAchieveList();
        let bgH = 1136;
        let pageCount = this._pageCount;
        App.LogUtil.log("initbox "+pageCount);
        let bgCount = Math.ceil(data.length/pageCount) + 1;
        this._bgContainer.height = bgH * (bgCount - 1 ) + 260 + 50;
        for (let i=0; i < bgCount; i++){
            let bg = BaseBitmap.create(App.CommonUtil.getResByCode("aclotus_bg", this.getUiCode()));
            bg.y = this._bgContainer.height - bg.height * (i+1);
            if (i > 0){
                bg.y += i;
            }
            this._bgContainer.addChild(bg);
        }
        let bgBottom = BaseBitmap.create(App.CommonUtil.getResByCode("aclotus_bgbottom", this.getUiCode()));
        bgBottom.setPosition(0, this._bgContainer.height - bgBottom.height);
        this._bgContainer.addChild(bgBottom);

        for(let i= data.length -1; i >=0; i--){
            let index = i%pageCount;
            let boxPosData = this.boxPos[index];
            let boxImg = "aclotus_box"+boxPosData.boxSize+"_1";
            let box = BaseBitmap.create(this.getResByCode(boxImg));
            box.anchorOffsetY = box.height;
            box.x = boxPosData.box.x - box.width/2;
            box.y = this._bgContainer.height - (Math.floor(i/pageCount) + 1) * 1136 + boxPosData.box.y;
            this._bgContainer.addChild(box);
            box.addTouchTap(()=>{
                ViewController.getInstance().openView(ViewConst.POPUP.ACLOTUSDETAILPOPUPVIEW2, {aid: this.aid, code: this.code, id: data[i].id});
            }, this);

            let boxLightImg = "aclotus_box"+boxPosData.boxSize+"_light";
            let boxLight = BaseBitmap.create(App.CommonUtil.getResByCode(boxLightImg, this.getUiCode()));
            boxLight.anchorOffsetY = boxLight.height;
            boxLight.x = boxPosData.box.x - boxLight.width/2;
            boxLight.y = box.y;
            this._bgContainer.addChild(boxLight);

            let boxItem:any = {box: box, boxX: box.x, boxY: box.y, boxLight:boxLight};
            this._boxList[i] = boxItem;
        }
    }

    private refreshBox():void{
        let boxCfg = this.cfg.getAchieveList();
        let data = this._boxList;
        for (let i=0; i < data.length; i++){
            let boxItem = data[i];
            let index = i % this._pageCount;
            let boxPosData = this.boxPos[index];
            if (this.vo.isGetAchieveRewardById(boxCfg[i].id)){
                boxItem.boxLight.visible = false;
                boxItem.box.setRes(App.CommonUtil.getResByCode("aclotus_box"+boxPosData.boxSize+"_2", this.getUiCode()));
            }
            else{
                boxItem.box.setRes(App.CommonUtil.getResByCode("aclotus_box"+boxPosData.boxSize+"_1", this.getUiCode()));
                if (this.vo.getProcessNum() >= boxCfg[i].specialnum){
                    boxItem.boxLight.visible = true;
                }
                else{
                    boxItem.boxLight.visible = false;
                }
            }
        }
    }

    private refreshProcessInfo():void{
        let index = this.vo.getCurProcessIndex();
        // let pNum = (this.vo.getProcessNum() / this.vo.getCurrMaxProNum() * 100);
        // if (pNum > 100){
        //     pNum = 100;
        // }
        this._processNum.text = ""+this.vo.getProcessNum();
        this._processNum.x = 40 + 36 - this._processNum.width/2;
        let pageCount = this._pageCount;
        this._processContainer.x = this.boxPos[index].flag.x;
        this._processContainer.y = this._bgContainer.height - (Math.floor(index/pageCount) + 1) * 1136 + this.boxPos[index].flag.y;
    }

    private moveScrollView():void{
        let index = this.vo.getCurProcessIndex();
        let scrollPosY = 0;
        let scrollMax = this._bgContainer.height - this._scrollView.height;
        scrollPosY = this._boxList[index].boxY - this._scrollView.height/2 - 60;
        if (scrollPosY < 0){
            scrollPosY = 0;
        }
        else if (scrollPosY > scrollMax){
            scrollPosY = scrollMax;
        }
        App.LogUtil.log("scrollPosy: "+scrollPosY);
        let time = Math.abs(this._scrollView.scrollTop - scrollPosY);
        if (scrollPosY >= 0 && time > 0 && this._isCanMove){
            let view = this;
            view._isCanMove = false;
            view.showViewMask();
            egret.Tween.get(view._scrollView).wait(200).to({scrollTop : scrollPosY}, time/2).call(()=>{
                view.hideViewMask();
                view._isCanMove = true;
                egret.Tween.removeTweens(view._scrollView);
            }, view);
        }
    }

    private playBtnClick():void{
        if (!this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return;
        }
        if (this._isPlay){
            return;
        }
        let playFlag = 0;
        if (!this.vo.isFree()){
            if (this.vo.getToolNum() > 0){
                if (this.vo.getToolNum() > 0 && this.vo.getToolNum() >= 10){
                    playFlag = 1;
                    this._isMultiPlay = true;
                }
            }
            else{
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acLotusRechargeTip`, this.code)),
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
                return ;
            }
        }
        this._lastProcessIndex = this.vo.getCurProcessIndex();
        this._isPlay = true;
        NetManager.request(NetRequestConst.REQUEST_ACLOTUS_LOTTERY, {activeId: this.vo.aidAndCode, isTenPlay: playFlag});
    }

    private playCallback(evt: egret.Event):void{
        if (!evt.data.ret){
            return ;
        }
        this.showViewMask();
        this._isPlay = false;
        let rData = evt.data.data.data;
        this._rewardData = rData;
        this.showPlayAni();
    }

    private showPlayAni():void{
        App.LogUtil.log("showPlayAni ****");
        let aniContainer = new BaseDisplayObjectContainer();
        this.addChild(aniContainer);
        aniContainer.width = GameConfig.stageWidth;
        aniContainer.height = GameConfig.stageHeigth;
        let bg = BaseBitmap.create("public_9_viewmask");
        bg.width = GameConfig.stageWidth;
        bg.height = GameConfig.stageHeigth;
        aniContainer.addChild(bg);
        let boneName = "aclotus_watering";
        let bone = boneName+"_ske";
        let view = this;
        if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && bone && RES.hasRes(bone)){
            let dragBone = App.DragonBonesUtil.getLoadDragonBones(boneName, 1);
            aniContainer.addChild(dragBone);
            dragBone.x = 370;
            dragBone.y = GameConfig.stageHeigth/2 + 490/2 - 50;
            dragBone.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
                view.removeChild(aniContainer);
                view._lotteryBoneList.push(aniContainer);
                view.showRewardView();
            }, view);
        }
        else{
            //帧动画
            App.LogUtil.log("showPlayAni **** 2");
            let ani = ComponentManager.getCustomMovieClip("aclotus_watering_eff", 5, 100);
            ani.width = 570;
            ani.height = 458;
            ani.setPosition(GameConfig.stageWidth/2 - ani.width/2, GameConfig.stageHeigth/2 - ani.height/2);
            aniContainer.addChild(ani);
            ani.playWithTime(1);
            ani.setEndCallBack(()=>{
                view.removeChild(aniContainer);
                view.showRewardView();
            }, view);
        }
    }

    private refreshUI():void{
        this.refreshBox();
        this.refreshProcessInfo();
        let currIndex = this.vo.getCurProcessIndex();
        if (this._lastProcessIndex < currIndex){
            this.moveScrollView();
        }
    }

    private getRewardCallback():void{
        this.refreshView();
        this.refreshUI();
    }

    private showRewardView():void{
        let view = this;
        let rData = view._rewardData;
        if (rData){
            ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPGETREWARDPOPUPVIEW, {
                rewards: rData.rewards, otherRewards: rData.otherrewards, criArr: rData.criArr, code: view.getUiCode(), aid: view.aid, isPlayAni: true, aidCode: view.vo.aidAndCode, msgStr: App.CommonUtil.getCnByCode("acLotusCritMsg",view.getUiCode()),callback:()=>{
                    view.hideViewMask();
                    view.refreshUI();
                    view._isPlay = false;
                }, 
                handler: view}
            ); 
        }
        else{
            App.LogUtil.log("showRewardView ****2");
            view.hideViewMask();
            view._isPlay = false;
        }
        // if (rData){
        //     ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rData.rewards, "isPlayAni":true, "callback":()=>{
        //         view.hideViewMask();
        //         view.refreshUI();
        //     }});
        //     if (rData.replacerewards) {
        //         ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        //     }
        // }
        // else{
        //     view.hideViewMask();
        // }
    }

    private refreshView():void{
        if (this.vo.isCangetAchieveReward() || this.vo.isCanExchange()){
            App.CommonUtil.addIconToBDOC(this._detailBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }

        let playBtnImgIndex = 1;
        if (!this.vo.isFree()){
            if (this.vo.getToolNum() < 10){
                playBtnImgIndex = 2;
            }
            else{
                playBtnImgIndex = 3;
            }
        }
        this._playBtn.setBtnBitMap(this.getResByCode("aclotus_playbtn"+playBtnImgIndex));
        this._toolNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusToolNum", this.getUiCode()), [""+this.vo.getToolNum()]);
        this._toolNum.anchorOffsetX = this._toolNum.width/2;

        let rechargeNeed = this.cfg.needGem - this.vo.getRechargeNum() % this.cfg.needGem;
        this._rechargeInfo.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusRechargeInfo", this.code), [""+rechargeNeed]);
    }

    public tick():void{
        this._timeTxt.text = LanguageManager.getlocal("acChaotingTimeCountDown", [this.vo.getCountDown()]);
		this._timeBg.width = 60 + this._timeTxt.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
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

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected get uiType():string{
        return "2";
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return this.getResByCode("aclotus_titlebg");
    }

    protected getBgName():string{
        return this.getResByCode("aclotus_bg");
    }

    protected getRuleInfo():string{
        return this.getCnByCode("acLotusRuleInfo");
    }

    protected getProbablyInfo():string{
        return this.getCnByCode("acLotusProbablyInfo");
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        if (this.getUiCode() == "1"){
            list = [
                "aclotus_watering_ske", "aclotus_watering_tex_json", "aclotus_watering_tex_png",
            ]
        }
        return super.getResourceList().concat([
            "aclotusviewcode"+this.code, "acthreekingofwife_infobg-1", "acwealthcarpview_servantskintxt"
        ]).concat(list);
    }
}