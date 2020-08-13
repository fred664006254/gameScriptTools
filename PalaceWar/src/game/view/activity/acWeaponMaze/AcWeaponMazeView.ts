/**
 * 神器迷宫
 * author ycg
 * date 2020.4.24
 * @class AcWeaponMazeView
 */
class AcWeaponMazeView extends AcCommonView{
    private _timeBg:BaseBitmap = null;
    private _timeTxt:BaseTextField = null;
    private _progress:BaseBitmap = null;
    private _progressTF:BaseTextField = null;
    private _processTotal:BaseTextField = null;
    private _boxList:any[] = [];
    private _detailBtn:BaseButton = null;
    private _boxContainer:BaseDisplayObjectContainer = null;
    private _playBtn:BaseButton = null;
    private _freeTxt:BaseBitmap = null;
    private _playTxt:BaseBitmap = null;
    private _toolNumBg:BaseBitmap = null;
    private _toolNum:BaseTextField = null;
    private _isPlay:boolean = false;
    private _rewardData:any = null;
    private _mapContainer:BaseDisplayObjectContainer = null;
    private _mapList:BaseBitmap[] = [];
    private _pFlag:BaseBitmap = null;
    private _mapBoxList:any[] = [];
    private _mapType:number[] = [];
    private _lastBoxVo:any[] = [];
    private _isTenPlay:boolean = false;
    private _flagMoveSpeed:number = 3;
    private _moveFlagPos:any[] = [];
    private _moveFlagCount:number = 0;
    private _isSkipAni:boolean = false;

    public constructor(){
        super();
    }

    protected getBgName():string{
        return App.CommonUtil.getResByCode("acweaponmaze_bg", this.getUiCode());
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return App.CommonUtil.getResByCode("acweaponmaze_titlebg", this.getUiCode());
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return App.CommonUtil.getCnByCode("acWeaponMazeRuleInfo",this.getUiCode());
    }

    protected getProbablyInfo():string{
        return App.CommonUtil.getCnByCode("acWeaponMazeProbablyInfo",this.getUiCode());
    }

    /**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
    protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
        return { title: { key: App.CommonUtil.getCnByCode("acWeaponMazeReportTitle", this.getUiCode())}, msg: { key: App.CommonUtil.getCnByCode("acWeaponMazeReportMsg", this.getUiCode())}};
    }

    protected getResourceList():string[]{
        return super.getResourceList().concat([
            "acweaponmazecode1", "acweaponmazecode"+this.getUiCode(),
            "acthreekingofwife_infobg-1", "luckydrawrewardword-2", "servantweapontxt", "acwealthcarpview_skineffect", "acheroine_free", "public_9_powertipbg2", "acrecovery_boxlight", "acweaponmazeboxopenlighteff", "acweaponmazebox2openeff", "acweaponmazebox1openeff", "acweaponmazeboxyanwueff"
        ]);
    }

    protected getUiCode():string{
        let code = "";
        switch(Number(this.code)){
            case 2:
                code = "1";
                break;
            case 4:
                code = "3";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    private get vo():AcWeaponMazeVo{
        return <AcWeaponMazeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.WeaponMazeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshUi, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACWEAPONMAZE_LOTTERY, this.lotteryCallback, this);
        this._timeBg = null;
        this._timeTxt = null;
        this._progress = null;
        this._progressTF = null;
        this._processTotal = null;
        this._boxList = [];
        this._detailBtn = null;
        this._boxContainer = null;
        this._playBtn = null;
        this._freeTxt = null;
        this._playTxt = null;
        this._toolNumBg = null;
        this._toolNum = null;
        this._isPlay = false;
        this._rewardData = null;
        this._mapContainer = null;
        this._mapList = [];
        this._pFlag = null;
        this._mapBoxList = [];
        this._lastBoxVo = [];
        this._isTenPlay = false;
        this._moveFlagPos = [];
        this._moveFlagCount = 0;
        this._isSkipAni = false;

        super.dispose();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshUi, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACWEAPONMAZE_LOTTERY, this.lotteryCallback, this);

        let mapContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(mapContainer);
        let map = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_mapbg", this.getUiCode()));
        mapContainer.width = map.width;
        mapContainer.height = map.height;
        mapContainer.x = GameConfig.stageWidth/2 - map.width/2;
        mapContainer.y = GameConfig.stageHeigth - map.height;
        this._mapContainer = mapContainer;

        let mapType = this.vo.getMapType();
        this._mapType = mapType;
        for (let i=0; i < mapType.length; i++){
            let map = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_mapbg", this.getUiCode()));
            mapContainer.addChild(map);
            if (i == 0){
                map.y = 0;
            }
            else{
                map.y = -map.height * i;
            }
            if (mapType[i] == -1){
                map.scaleY = -1;
                if (i == 0){
                    map.y = map.height;
                }
                else{
                    map.y = -map.height * (i - 1);
                }
            }
            this._mapList.push(map);
            App.LogUtil.log("map.y " + map.y + " type "+mapType[i]);
        }

        let pContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(pContainer);
        pContainer.width = mapContainer.width;
        pContainer.height = mapContainer.height;
        pContainer.x = GameConfig.stageWidth/2 - pContainer.width/2;
        pContainer.y = GameConfig.stageHeigth - pContainer.height;
        let pFlag = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_red", this.getUiCode()));
        pFlag.anchorOffsetX = pFlag.width/2;
        pFlag.anchorOffsetY = pFlag.height/2;
        pFlag.setPosition(231, 597);
        pContainer.addChild(pFlag);
        this._pFlag = pFlag;

        let topBg = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_bgtop", this.getUiCode()));
        topBg.y = 0;
        this.addChildToContainer(topBg);

        let descBgImg = "acthreekingofwife_infobg-1";
        if (this.getUiCode() == "3"){
            descBgImg = "acweaponmaze_infobg-"+this.getUiCode();
        }
        let descBg = BaseBitmap.create(descBgImg);
        this.addChildToContainer(descBg);
        if (this.getUiCode() == "3"){
            descBg.y = this.titleBg.y +  this.titleBg.height - 7;
        }
        else{
            descBg.y = this.titleBg.y +  this.titleBg.height - 80;
        }

        let boxContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(boxContainer);
        this._boxContainer = boxContainer;

        //神器
        if (this.getUiCode() == "1"){
            let weaponCfg = Config.ServantweaponCfg.getWeaponItemById(this.cfg.coreReward);
            let weaponIcon = BaseLoadBitmap.create(weaponCfg.icon);
            weaponIcon.width = 346;
            weaponIcon.height = 346;
            this.addChildToContainer(weaponIcon);
            weaponIcon.setScale(0.65);
            weaponIcon.setPosition(-20, this.titleBg.y + this.titleBg.height - 50);
        }
        
        //活动时间   
        let dateText = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = descBg.x + 170;
        dateText.y = this.titleBg.y + this.titleBg.height + 3;
        this.addChildToContainer(dateText);

        //活动文本
        let descTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeDesc", this.getUiCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 470;
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

        boxContainer.width = GameConfig.stageWidth;
        boxContainer.setPosition(0, descBg.y + descBg.height);
        let boxBg = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_processbg", this.getUiCode()));
        boxBg.setPosition(0, 0);
        boxContainer.addChild(boxBg);
        boxContainer.height = boxBg.height;

        let progressBg = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_progressbg", this.getUiCode()));
        progressBg.setPosition(90, boxBg.y + 40);
        boxContainer.addChild(progressBg);
        this._progress = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_progress", this.getUiCode()));
        this._progress.setPosition(progressBg.x, progressBg.y);
        boxContainer.addChild(this._progress);
        
        let percent = this.vo.getProcessNum() / this.vo.getCurrMaxProNum();
        if (percent > 1){
            percent = 1;
        }
        let proMask = new egret.Rectangle(0, 0, this._progress.width * percent, this._progress.height);
        this._progress.mask = proMask;

        let progressNumber = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeProcessNum", this.getUiCode()) , [String(this.vo.getProcessNum()), String(this.vo.getCurrMaxProNum())]);
        this._progressTF = ComponentManager.getTextField(progressNumber, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._progressTF.anchorOffsetX = this._progressTF.width/2;
        this._progressTF.setPosition(boxBg.x + boxBg.width / 2, progressBg.y + progressBg.height + 12);
        boxContainer.addChild(this._progressTF);

        //总进度
        let processNumbg = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_numbg", this.getUiCode()));
        processNumbg.setPosition(15, boxBg.y + boxBg.height / 2 - processNumbg.height / 2 + 2);
        boxContainer.addChild(processNumbg);

        //进度数量TF
        let numStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeProcessTotalNum", this.getUiCode()), [String(this.vo.getProcessNum())]);
        this._processTotal = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._processTotal.textAlign = TextFieldConst.ALIGH_CENTER;
        this._processTotal.anchorOffsetX = this._processTotal.width/2;
        this._processTotal.setPosition(processNumbg.x + processNumbg.width / 2, processNumbg.y + 21);
        boxContainer.addChild(this._processTotal);

        //预览
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(descBg.x - 15, descBg.y + descBg.height - skinTxtEffect.height / 2 - 30);
		this.addChildToContainer(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);

        let skinTxt = BaseBitmap.create("servantweapontxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect,[0, 0]);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxt1 = BaseBitmap.create("servantweapontxt");
		skinTxt1.anchorOffsetX = skinTxt1.width / 2;
		skinTxt1.anchorOffsetY = skinTxt1.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
		this.addChildToContainer(skinTxt1);
		skinTxt1.blendMode = egret.BlendMode.ADD;
		skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
		// skinTxt1.addTouchTap(() => {
        //     ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONMAZEDETAILPOPUPVIEW4, {aid: this.aid, code: this.code});
        // }, this);

        let skinAlpha = BaseBitmap.create(`public_alphabg`);
        skinAlpha.width = 160;
        skinAlpha.height = 70;
        skinAlpha.setPosition(skinTxt.x - skinAlpha.width/2, skinTxt.y - 40);
        this.addChildToContainer(skinAlpha);

        skinAlpha.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONMAZEDETAILPOPUPVIEW4, {aid: this.aid, code: this.code});
        }, this);

        //详情按钮
        let detailBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acweaponmaze_detailbtn", this.getUiCode()), "", ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONMAZEDETAILPOPUPVIEW, {aid: this.aid, code: this.code});
        }, this);
        detailBtn.setPosition(20, boxContainer.y + boxContainer.height + 20);
        this.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;

        //play btn
        let playBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acweaponmaze_playbtn", this.getUiCode()), "", this.playBtnClick, this);
        playBtn.setPosition(GameConfig.stageWidth/2 - playBtn.width/2, GameConfig.stageHeigth - playBtn.height - 49 + 23);
        this.addChildToContainer(playBtn);
        this._playBtn = playBtn;

        let freeTxt = BaseBitmap.create("acheroine_free");
        freeTxt.setPosition(playBtn.x + playBtn.width/2 - freeTxt.width/2, playBtn.y + playBtn.height/2 - freeTxt.height/2 - 6);
        // freeTxt.setPosition(playBtn.width/2 - freeTxt.width/2, playBtn.height/2 - freeTxt.height/2 - 5);
        this.addChildToContainer(freeTxt);
        this._freeTxt = freeTxt;

        let toolNumBg = BaseBitmap.create("public_9_powertipbg2");
        this.addChildToContainer(toolNumBg);
        this._toolNumBg = toolNumBg;

        let toolNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeToolNum", this.getUiCode()), ["0"]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this.addChildToContainer(toolNum);
        this._toolNum = toolNum;
        toolNumBg.width = toolNum.width + 30;
        toolNumBg.setPosition(GameConfig.stageWidth/2 - toolNumBg.width/2, GameConfig.stageHeigth - toolNumBg.height + 3);
        toolNum.setPosition(toolNumBg.x + toolNumBg.width/2 - toolNum.width/2, toolNumBg.y + toolNumBg.height/2 - toolNum.height/2 + 7);

        let playTxt = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_playtxt1", this.getUiCode()));
        playTxt.setPosition(playBtn.x + playBtn.width/2 - freeTxt.width/2, playBtn.y + playBtn.height - playTxt.height + 5);
        // playTxt.setPosition(playBtn.width/2 - freeTxt.width/2, playBtn.height - playTxt.height + 5);
        this.addChildToContainer(playTxt);
        this._playTxt = playTxt;

        //跳过动画
        let skipContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(skipContainer);
        let skipBg = BaseBitmap.create("public_select");
        skipBg.setPosition(playBtn.x + playBtn.width + 30, playBtn.y + 50);
        skipContainer.addChild(skipBg);
        skipBg.addTouchTap(()=>{
            this._isSkipAni = !this._isSkipAni;
            if (this._isSkipAni){
                skipBg.setRes("public_select_down");
            }
            else{
                skipBg.setRes("public_select");
            }
        }, this);
        let skipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_skipAni"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        skipTxt.setPosition(skipBg.x + skipBg.width + 5, skipBg.y + skipBg.height/2 - skipTxt.height/2);
        skipContainer.addChild(skipTxt);

        this.initBox();
        this.refreshBox();

        //mapBox
        this.initMapBox();

        this.refreshView();
    }  

    private initBox():void{
        let dataList = this.cfg.getAchieveCfgList();
        let dataLen = dataList.length;
        let sepIndex = this.vo.getSepIndex();
        let maxNum = dataList[sepIndex - 1].needNum;
        for (let i=0; i < sepIndex; i++){
            let data = dataList[i];
            let boxImg = App.CommonUtil.getResByCode("acweaponmaze_box2_1", this.getUiCode());
            if (i == sepIndex - 1){
                boxImg = App.CommonUtil.getResByCode("acweaponmaze_bigbox", this.getUiCode());
            }
            let box = BaseBitmap.create(boxImg);
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            let per = data.needNum / maxNum;
            box.setPosition(this._progress.x + this._progress.width * per, this._progress.y + this._progress.height / 2 + 5);
            box.addTouchTap(() => {
                let selId = data.id;
                let rewardId = this.vo.getAchieveRewardId();
                if (rewardId > 0 && rewardId >= dataList[sepIndex - 1].id){
                    selId = rewardId;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONMAZEDETAILPOPUPVIEW2, { aid: this.aid, code: this.code, id: selId});
            }, this);
            let boxLight = BaseBitmap.create("acrecovery_boxlight");
            boxLight.anchorOffsetX = boxLight.width/2;
            boxLight.anchorOffsetY = boxLight.height/2;
            this._boxContainer.addChild(boxLight);
            this._boxContainer.addChild(box);
            boxLight.setPosition(box.x, box.y);
            egret.Tween.get(boxLight, {loop: true}).to({rotation: 360}, 2500);
            boxLight.visible = false;
            let redDot = null;
            if (i == sepIndex - 1){
                boxLight.setScale(1.5);
                let boxWordBM = BaseBitmap.create("luckydrawrewardword-2")
                boxWordBM.setPosition(box.x - boxWordBM.width / 2, box.y + 15);
                this._boxContainer.addChild(boxWordBM);
                redDot = BaseBitmap.create("public_dot2");
                redDot.setPosition(box.x + box.width/2 - redDot.height, box.y - box.height/2);
                redDot.visible = false;
                this._boxContainer.addChild(redDot);
            }
            let boxInfo = {box: box, boxLight: boxLight,redDot: redDot};
            this._boxList[i] = boxInfo;
        }
    }

    private refreshBox():void{
        let data = this.cfg.getAchieveCfgList();
        let currNum = this.vo.getProcessNum();
        let len = this._boxList.length;
        for (let i=0; i < len - 1; i++){
            let boxInfo = this._boxList[i];
            egret.Tween.removeTweens(boxInfo.box);
            boxInfo.box.rotation = 0;
            if (this.vo.isGetAchieveRewardById(data[i].id)){
                boxInfo.boxLight.visible = false;
                boxInfo.box.setRes(App.CommonUtil.getResByCode("acweaponmaze_box2_2", this.getUiCode()));
            }
            else{
                if (currNum >= data[i].needNum){
                    boxInfo.boxLight.visible = true;
                    egret.Tween.get(boxInfo.box, {loop:true}).to({rotation: 5}, 80).to({rotation: -10}, 160).to({rotation: 0}, 80);
                }
                else{
                    boxInfo.box.setRes(App.CommonUtil.getResByCode("acweaponmaze_box2_1", this.getUiCode()));
                }
            }
        }
        let sepIndex = this.vo.getSepIndex();
        let sepMaxNum = data[sepIndex - 1].needNum;
        let lastBox = this._boxList[this._boxList.length - 1];
        if (this.vo.isCangetAchieveReward()){
            lastBox.redDot.visible = true;
            lastBox.boxLight.visible = true;
        }
        else{
            lastBox.redDot.visible = false;
            lastBox.boxLight.visible = false;
        }
    }

    //迷宫宝箱
    private initMapBox():void{
        let boxInfo = this.vo.box;
        let boxPosCfg = this.mapBoxPos[0];
        if (this._mapType[0] == -1){
            boxPosCfg = this.mapBoxPos[1]; 
        }
        for (let i=0; i< boxInfo.length; i++){
            let data = boxInfo[i];
            let boxType = 1;
            if (data.t == 1){
                boxType = 2;
            }
            let boxStatus = 1;
            if (data.f == 1){
                boxStatus = 2;
            }
            let boxImg = App.CommonUtil.getResByCode("acweaponmaze_box"+boxType+"_"+boxStatus, this.getUiCode());
            let box = BaseBitmap.create(boxImg);
            box.anchorOffsetX = box.width/2;
            box.anchorOffsetY = box.height/2;
            
            let posLen = boxPosCfg[i].length;
            box.x = boxPosCfg[i][posLen - 1].x;
            box.y = boxPosCfg[i][posLen - 1].y;

            //掉落特效
            let downEff = ComponentManager.getCustomMovieClip("acweaponmazeboxyanwueff", 8, 70);
            downEff.width = 87;
            downEff.height = 75;
            downEff.anchorOffsetX = downEff.width/2;
            downEff.anchorOffsetY = downEff.height/2;
            downEff.setPosition(box.x, box.y);
            downEff.visible = false;
            this._mapContainer.addChild(downEff);
            this._mapContainer.addChild(box);

            let boxData = {box: box, downEff: downEff};
            this._mapBoxList.push(boxData);
        }
    }

    public getOpenBoxArr():number[]{
        console.log("openboxArr ", this._lastBoxVo);
        console.log("openboxArr new ", this.vo.box);
        let arr:number[] = [];
        if (this._isTenPlay){
            for (let i=0; i < this._lastBoxVo.length; i++){
                if (this._lastBoxVo[i].f != 1){
                    arr.push(i);
                }
            }
        }
        else{
            if (this._rewardData && this._rewardData.fullFlag){
                for (let i=0; i < this._lastBoxVo.length; i++){
                    if (this._lastBoxVo[i].f != 1){
                        arr.push(i);
                        break;
                    }
                }
            }
            else{
                for (let i=0; i < this._lastBoxVo.length; i++){
                    if (this._lastBoxVo[i].f != this.vo.box[i].f){
                        arr.push(i);
                        break;
                    }
                }
            }
        }
        return arr;
    }

    private refreshMapBox(isNewMap:boolean):void{
        App.LogUtil.log("refreshMapBox "+isNewMap);
        if (isNewMap){
            let boxInfo = this.vo.box;
            let boxPosCfg = this.mapBoxPos[0];
            if (this._mapType[0] == -1){
                boxPosCfg = this.mapBoxPos[1]; 
            }
            for (let i=0; i < boxInfo.length; i++){
                let boxType = 1;
                if (boxInfo[i].t == 1){
                    boxType = 2;
                }
                let boxStatus = 1;
                if (boxInfo[i].f == 1){
                    boxStatus = 2;
                }
                let boxImg = App.CommonUtil.getResByCode("acweaponmaze_box"+boxType+"_"+boxStatus, this.getUiCode());
                this._mapBoxList[i].box.setRes(boxImg);
                let posLen = boxPosCfg[i].length;
                this._mapBoxList[i].box.x = boxPosCfg[i][posLen - 1].x;
                this._mapBoxList[i].box.y = boxPosCfg[i][posLen - 1].y;
            }
        }
        else{
            let openBox = this.getOpenBoxArr();
            console.log("openbox ", openBox);
            let data = this._lastBoxVo;
            for (let i=0; i < openBox.length; i++){
                let boxType = 1;
                if (data[openBox[i]].t == 1){
                    boxType = 2;
                }
                let boxStatus = 2;
                let boxImg = App.CommonUtil.getResByCode("acweaponmaze_box"+boxType+"_"+boxStatus, this.getUiCode());
                this._mapBoxList[openBox[i]].box.setRes(boxImg);
            }
        }
    }

    //地图宝箱动画
    private showMapBoxDownAni():void{
        App.LogUtil.log("showMapBoxDownAni ");
        let len = this._mapBoxList.length;
        for (let i=0; i < len; i++){
            let box = <BaseBitmap>this._mapBoxList[i].box;
            let offY = box.y;
            box.visible = true;
            if (i == len - 1){
                egret.Tween.get(box, {loop: false}).to({y: offY - 250}).to({y: offY}, 300, egret.Ease.sineInOut).call(()=>{
                    App.LogUtil.log("showMapBoxDownAni end ");
                    let downEff = this.getMapBoxDownAni();
                    downEff.playWithTime(1);
                    downEff.setPosition(box.x, box.y + 10);
                    this._mapContainer.addChildAt(downEff, this._mapContainer.getChildIndex(box) - 1);
                    downEff.setEndCallBack(()=>{
                        downEff.dispose();
                    }, this);
                    this.hideViewMask();
                });
            }
            else{
                egret.Tween.get(box, {loop: false}).to({y: offY - 250}).to({y: offY}, 300, egret.Ease.sineInOut).call(()=>{
                    let downEff = this.getMapBoxDownAni();
                    downEff.playWithTime(1);
                    downEff.setPosition(box.x, box.y + 10);
                    this._mapContainer.addChildAt(downEff, this._mapContainer.getChildIndex(box) - 1);
                    downEff.setEndCallBack(()=>{
                        downEff.dispose();
                    }, this);
                });
            }
        }
    }

    //掉落特效
    private getMapBoxDownAni():CustomMovieClip{
        let downEff = ComponentManager.getCustomMovieClip("acweaponmazeboxyanwueff", 8, 70);
        downEff.width = 87;
        downEff.height = 75;
        downEff.anchorOffsetX = downEff.width/2;
        downEff.anchorOffsetY = downEff.height/2;
        return downEff;
    }

    private playBtnClick():void{
        if (!this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return;
        }
        if (this._isPlay){
            return;
        }
        let toolNum = this.vo.getToolNum();
        if (toolNum > 0 || this.vo.isFree()){
            let isTen = 0;
            this._isTenPlay = false;
            if (!this.vo.isFree() && toolNum >= 10){
                isTen = 1;
                this._isTenPlay = true;
            }
            this._lastBoxVo = this.vo.box;
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACWEAPONMAZE_LOTTERY, {activeId: this.vo.aidAndCode, isTenPlay: isTen});
        }
        else{
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acWeaponMazeRechargeTip`, this.getUiCode())),
                touchMaskClose : true,
                title : `itemUseConstPopupViewTitle`,
                callback : ()=>{
                    ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONMAZEDETAILPOPUPVIEW, {aid: this.aid, code: this.code});
                },
                handle : this,
                needClose : 1,
                needCancel : true,
                confirmTxt : `taskGoBtn`,
                // recommand : false
            });
        }
    }

    private lotteryCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            this._isPlay = false;
            return ;
        }
        let rData = evt.data.data.data;
        this._rewardData = rData;
        if (this._isSkipAni){
            this.refreshMapBox(false);
            this.showRewardView();
        }
        else{
            this.showBoxAni();
        }
    }

    private showBoxAni():void{
        let view = this;
        view.showViewMask();
        if (view._isTenPlay){
            let openArr = this.getOpenBoxArr();
            for (let i=0; i < openArr.length; i++){
                if (i == openArr.length - 1){
                    view.playOpenAni(openArr[i], true, true);
                }
                else{
                    view.playOpenAni(openArr[i], true, false);
                }   
            }
            // view.refreshMapBox(false);
            // egret.Tween.get(view).wait(100).call(()=>{
            //     view.showRewardView();
            // });
        }
        else{
            let openBoxArr = this.getOpenBoxArr();
            if (openBoxArr.length == 1){
                let boxPosCfg = this.mapBoxPos[0];
                if (this._mapType[0] == -1){
                    boxPosCfg = this.mapBoxPos[1]; 
                }
                this._moveFlagPos = boxPosCfg[openBoxArr[0]];
                // this._moveFlagPos = boxPosCfg[0];
                this._moveFlagCount = 0;
                this.moveFlag();
            }
            else{
                view.refreshMapBox(false);
                egret.Tween.get(view).wait(100).call(()=>{
                    view.showRewardView();
                });
            }
        }
    }

    //红点移动
    private moveFlag():void{
        if (this._moveFlagCount >= this._moveFlagPos.length){
            //此处添加宝箱动画
            // this.refreshMapBox(false);
            // egret.Tween.get(this).wait(100).call(()=>{
            //     this.showRewardView();
            // });
            this._pFlag.visible = false;
            let openBoxArr = this.getOpenBoxArr();
            let index = openBoxArr[0];
            this.playOpenAni(index);
            return ;
        }
        let desPos = this._moveFlagPos[this._moveFlagCount];
        if (this._moveFlagCount == 0){
            this.moveFlagAni({x: this._pFlag.x, y: this._pFlag.y}, desPos);
        }
        else{
            this.moveFlagAni(this._moveFlagPos[this._moveFlagCount - 1], desPos);
        }
    }

    private moveFlagAni(origPos:any, desPos:any):void{
        let view = this;
        if (origPos.x == desPos.x){
            let dt = Math.abs(desPos.y - origPos.y) * this._flagMoveSpeed;
            egret.Tween.get(view._pFlag, {loop: false}).to({y: desPos.y}, dt).call(()=>{
                view._moveFlagCount += 1;
                view.moveFlag();
            });
        }
        else{
            let dt = Math.abs(desPos.x - origPos.x) * this._flagMoveSpeed;
            egret.Tween.get(view._pFlag, {loop: false}).to({x: desPos.x}, dt).call(()=>{
                view._moveFlagCount += 1;
                view.moveFlag();
            })
        }
    }

    private resetMoveFlagInfo():void{
        this._pFlag.visible = true;
        this._pFlag.setPosition(231, 597);
        this._moveFlagCount = 0;
        this._moveFlagPos = null;
    }

    private playOpenAni(index:number, isMulti?:boolean, isEnd?:boolean):void{
        let view = this;
        let box = view._mapBoxList[index].box;
        let type = view._lastBoxVo[index].t;
        let openEff:CustomMovieClip = null;
        if (type == 2){
            openEff = ComponentManager.getCustomMovieClip("acweaponmazebox1openeff", 12, 70);
            openEff.width = 57;
            openEff.height = 110;
            openEff.anchorOffsetX= openEff.width/2;
            openEff.anchorOffsetY = 87;
            openEff.setPosition(box.x, box.y);
            this._mapContainer.addChild(openEff);
        }
        else{
            openEff = ComponentManager.getCustomMovieClip("acweaponmazebox2openeff", 12, 70);
            openEff.width = 60;
            openEff.height = 110;
            openEff.anchorOffsetX= openEff.width/2;
            openEff.anchorOffsetY = 85;
            openEff.setPosition(box.x, box.y);
            this._mapContainer.addChild(openEff);
        }
        App.LogUtil.log("playOpenAni "+ index);
        box.visible = false;
        openEff.playWithTime(1);
        openEff.setFrameEvent(10, ()=>{
            view.refreshMapBox(false);
            //光特效
            App.LogUtil.log("playOpenAni frame 10 ");
            let light = ComponentManager.getCustomMovieClip("acweaponmazeboxopenlighteff", 13, 70);
            light.width = 152;
            light.height = 152;
            light.anchorOffsetX = light.width/2;
            light.anchorOffsetY = light.height/2;
            light.setPosition(box.x, box.y - 85);
            view._mapContainer.addChild(light);
            light.playWithTime(1);
            light.setEndCallBack(()=>{
                App.LogUtil.log("light frame end ");
                box.visible = true;
                light.dispose();
                openEff.dispose();
                if (isMulti){
                    if (isEnd){
                        view.showRewardView();
                    }
                }
                else{
                    view.showRewardView();
                }
            }, view);

        }, view);
        openEff.setEndCallBack(()=>{
            openEff.visible = false;
            // box.visible = true;
            App.LogUtil.log("eff frame end ");
        }, view);
    }

    //mapBox 第一个数组 无翻转 第二个数组 图片翻转 以左上角为0，0
    private get mapBoxPos(){
        return  [
            [
                [{x: 231, y: 567}, {x: 53, y: 566}, {x: 53, y: 539}, {x: 53, y: 510}],
                [{x: 231, y: 567}, {x: 171, y: 566}, {x: 171, y: 504}, {x: 405, y: 504}, {x: 405, y: 567}, {x: 348, y: 567}],
                [{x: 231, y: 567}, {x: 171, y: 566}, {x: 171, y: 504}, {x: 287, y: 504}, {x: 287, y: 385}, {x: 231, y: 385}, {x: 231, y: 415}, {x: 230, y: 446}],
                [{x: 231, y: 567}, {x: 171, y: 566}, {x: 171, y: 504}, {x: 287, y: 504}, {x: 287, y: 385}, {x: 345, y: 385}, {x: 345, y: 449}, {x: 410, y: 449}, {x: 410, y: 322}],
                [{x: 231, y: 567}, {x: 171, y: 566}, {x: 171, y: 504}, {x: 287, y: 504}, {x: 287, y: 326},  {x: 229, y: 326}],
                [{x: 231, y: 567}, {x: 171, y: 566}, {x: 171, y: 504}, {x: 287, y: 504}, {x: 287, y: 326}, {x: 345, y: 326}, {x: 345, y: 263}, {x: 411, y: 263}, {x: 411, y: 244}, {x: 410, y: 211}],
                [{x: 231, y: 567}, {x: 171, y: 566}, {x: 171, y: 504}, {x: 287, y: 504}, {x: 287, y: 326}, {x: 345, y: 326}, {x: 345, y: 263}, {x: 287, y: 263}, {x: 287, y: 203}, {x: 310, y: 203}, {x: 345, y: 201}],
                [{x: 231, y: 567}, {x: 171, y: 566}, {x: 171, y: 504}, {x: 113, y: 504}, {x: 113, y: 445}, {x: 53, y: 445}, {x: 53, y: 356}, {x: 53, y: 324}],
                [{x: 231, y: 567}, {x: 171, y: 566}, {x: 171, y: 263}, {x: 185, y: 263}, {x: 220, y: 261}],
                [{x: 231, y: 567}, {x: 171, y: 566}, {x: 171, y: 263}, {x: 53, y: 263}, {x: 53, y: 205}, {x: 133, y: 205}, {x: 166, y: 201}],
            ],
            [
                [{x: 231, y: 567}, {x: 310, y: 567}, {x: 346, y: 562}],
                [{x: 231, y: 567}, {x: 287, y: 567}, {x: 287, y: 506}, {x: 411, y: 506}, {x: 411, y: 525}, {x: 410, y: 556}],
                [{x: 231, y: 567}, {x: 287, y: 567}, {x: 287, y: 506}, {x: 345, y: 506}, {x: 345, y: 442}, {x: 266, y: 442}, {x: 231, y: 442}],
                [{x: 231, y: 567}, {x: 287, y: 567}, {x: 287, y: 506}, {x: 345, y: 506}, {x: 345, y: 442}, {x: 287, y: 442}, {x: 287, y: 384}, {x: 346, y: 384}, {x: 346, y: 324}, {x: 406, y: 324}, {x: 406, y: 444}],
                [{x: 231, y: 567}, {x: 287, y: 567}, {x: 287, y: 506}, {x: 345, y: 506}, {x: 345, y: 442}, {x: 287, y: 442}, {x: 287, y: 384}, {x: 231, y: 384}, {x: 231, y: 354}, {x: 230, y: 319}],
                [{x: 231, y: 567}, {x: 287, y: 567}, {x: 287, y: 506}, {x: 345, y: 506}, {x: 345, y: 442}, {x: 287, y: 442}, {x: 287, y: 266}, {x: 405, y: 266}, {x: 405, y: 202}, {x: 385, y: 202}, {x: 352, y: 200}],
                [{x: 231, y: 567}, {x: 287, y: 567}, {x: 287, y: 506}, {x: 345, y: 506}, {x: 345, y: 442}, {x: 287, y: 442}, {x: 287, y: 266}, {x: 172, y: 266}, {x: 172, y: 203}, {x: 53, y: 203}, {x: 53, y: 230}, {x: 56, y: 262}],
                [{x: 231, y: 567}, {x: 287, y: 567}, {x: 287, y: 506}, {x: 345, y: 506}, {x: 345, y: 442}, {x: 287, y: 442}, {x: 287, y: 266}, {x: 113, y: 266}, {x: 113, y: 324}, {x: 53, y: 324}, {x: 53, y: 413}, {x: 53, y: 445}],
                [{x: 231, y: 567}, {x: 287, y: 567}, {x: 287, y: 506}, {x: 345, y: 506}, {x: 345, y: 442}, {x: 287, y: 442}, {x: 287, y: 266}, {x: 172, y: 266}, {x: 172, y: 506}, {x: 185, y: 506}, {x: 221, y: 504}],
                [{x: 231, y: 567}, {x: 287, y: 567}, {x: 287, y: 506}, {x: 345, y: 506}, {x: 345, y: 442}, {x: 287, y: 442}, {x: 287, y: 266}, {x: 172, y: 266}, {x: 172, y: 506}, {x: 53, y: 506}, {x: 53, y: 564}, {x: 133, y: 564}, {x: 169, y: 564}],
            ]
        ];
    }

    //地图移动
    private moveMap():void{
        this._mapType = this.vo.getMapType();
        this._pFlag.visible = false;
        egret.Tween.get(this._mapContainer, {loop: false}).to({y: GameConfig.stageHeigth}, 500).call(()=>{
            for (let i=0; i < this._mapBoxList.length; i++){
                this._mapBoxList[i].box.visible = false;
            }
            this.freshMap();
            this.refreshMapBox(true);
            this._pFlag.visible = true;
            this.showMapBoxDownAni();
        });  
    }

    //刷新底图
    private freshMap():void{
        let mapType = this._mapType;
        for (let i=0; i < mapType.length; i++){
            let map = <BaseBitmap>this._mapList[i];
            map.scaleY = 1;
            if (i == 0){
                map.y = 0;
            }
            else{
                map.y = -map.height * i;
            }
            if (mapType[i] == -1){
                map.scaleY = -1;
                if (i == 0){
                    map.y = map.height;
                }
                else{
                    map.y = -map.height * (i - 1);
                }
            }
            App.LogUtil.log("freshMap "+ map.y+ " ii "+mapType[i]);
        }
        App.LogUtil.log("mapCon h "+this._mapContainer.height);
        this._mapContainer.y = GameConfig.stageHeigth - this._mapContainer.height;
        App.LogUtil.log("_mapContainer y "+this._mapContainer.y);
    }

    //展示奖励
    private showRewardView():void{
        let view = this;
        let rData = view._rewardData;
        view._isPlay = false;
        if (rData){
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rData.rewards, "isPlayAni":true, "callback":()=>{
                view.resetMoveFlagInfo();
                if (rData.fullFlag){
                    view.refreshUi();
                    view.moveMap();
                }
                else{
                    view.hideViewMask();
                    view.refreshUi();
                }
            }});
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
            }
        }
        else{
            view.resetMoveFlagInfo();
            view.hideViewMask();
        }
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


    private refreshView():void{
        //进度相关
        let currProcess = this.vo.getProcessNum();
        let processMaxNum = this.vo.getCurrMaxProNum();
        this._processTotal.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeProcessTotalNum", this.getUiCode()), [String(currProcess)]);
        this._processTotal.anchorOffsetX = this._processTotal.width/2;
        this._progressTF.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeProcessNum", this.getUiCode()) , [String(currProcess), String(processMaxNum)]);
        this._progressTF.anchorOffsetX = this._progressTF.width/2;

        let data = this.cfg.getAchieveCfgList();
        let sepIndex = this.vo.getSepIndex();
        let sepMaxNum = data[sepIndex - 1].needNum;
        let percent = currProcess / sepMaxNum;
        if (currProcess >= sepMaxNum){
            percent = 1;
        } 
        let proMask = new egret.Rectangle(0, 0, this._progress.width * percent, this._progress.height);
        this._progress.mask = proMask;

        if (this.vo.isCangetAchieveReward() || this.vo.isCanGetRechargeReward()){
            App.CommonUtil.addIconToBDOC(this._detailBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }

        //play btn
        if (this.vo.isFree()){
            this._freeTxt.visible = true;
        }
        else{
            this._freeTxt.visible = false;
        }
        let toolNum = this.vo.getToolNum();
        let playTxtImg = App.CommonUtil.getResByCode("acweaponmaze_playtxt1", this.getUiCode());
        if (!this.vo.isFree() && toolNum >= 10){
            playTxtImg = App.CommonUtil.getResByCode("acweaponmaze_playtxt2", this.getUiCode());
        }
        this._playTxt.setRes(playTxtImg);

        this._toolNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeToolNum", this.getUiCode()), [""+toolNum]);
        this._toolNumBg.width = this._toolNum.width + 30;
        this._toolNumBg.x = GameConfig.stageWidth/2 - this._toolNumBg.width/2;
        this._toolNum.x = this._toolNumBg.x + this._toolNumBg.width/2 - this._toolNum.width/2;

    }

    private refreshUi():void{
        if (this._isPlay){
            return;
        }
        this.refreshView();
        this.refreshBox();
    }

    public tick():void{
        this._timeTxt.text = LanguageManager.getlocal("acChaotingTimeCountDown", [this.vo.getCountDown()]);
		this._timeBg.width = 60 + this._timeTxt.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
    
    }
}