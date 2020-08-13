/**
 * @author hyd
 * 放风筝活动
 */
class AcKiteView extends AcCommonView {
    public constructor() {
        super();
    }
    private _timeBg:BaseBitmap = null;
    private _timeTxt: BaseTextField = null;
    private _isPlayAni: boolean = false;
    private _progressBar: ProgressBar = null;
    private _numTxt: BaseTextField = null;
    private kiteCon: BaseDisplayObjectContainer = null;
    private kiteBg: BaseDisplayObjectContainer = null;
    private kiteBgImg: BaseBitmap = null;
    private kite: BaseDisplayObjectContainer = null;
    private _scollView: ScrollView = null;
    //private kiteLine: BaseBitmap = null;
    private kiteLine: egret.Shape = null;
    private lineCircle: BaseBitmap = null;
    private lineCircleAni: CustomMovieClip = null;
    private fakelineCircle: BaseBitmap = null;
    private fakelineCircleAni: CustomMovieClip = null;
    private nowPos: { x: number, y: number } = null;
    private btnParam: number = 0;
    private windsCon: BaseDisplayObjectContainer = null;
    private winds: { [key: string]: BaseDisplayObjectContainer } = {};
    private detailBtn: BaseButton = null;
    private haveNum: BaseTextField = null;
    private cloudCon: BaseDisplayObjectContainer = null;
    private clouds: { [key: string]: BaseBitmap } = {};
    private rightBarCon: BaseDisplayObjectContainer = null;
    private rightBarBg: BaseBitmap = null;
    private rightBar: BaseBitmap = null;
    private rightBarTips: BaseDisplayObjectContainer[] = null;
    private rewards: string = '';
    private _proLight:BaseBitmap = null;

    //风筝上升一个单位对应像素
    private unitPixel: number = 160;
    private nowHeightTxt:BaseTextField = null;
    private nowHeightBg:BaseBitmap = null;


    public dispose(): void {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshUi, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACKITE_LOTTERY, this.receiveRewardHandle, this);

        this._timeBg = null;
        this._timeTxt = null;
        this._isPlayAni = null;
        this._progressBar = null;
        this._numTxt = null;
        this.unitPixel = 160;
        this._scollView = null;
        this.kiteCon = null;
        this.kiteBg = null;
        this.kiteBgImg = null;
        this.kite = null;
        this.kiteLine = null;
        this.lineCircle = null;
        this.lineCircleAni = null;
        this.nowPos = null;
        this.btnParam = 0;
        this.windsCon = null;
        this.winds = {};
        this.detailBtn = null;
        this.haveNum = null;
        this.cloudCon = null;
        this.clouds = {};
        this.rightBarCon = null;
        this.rightBar = null;
        this.rightBarBg = null;
        this.rightBarTips = null;
        this.rewards = '';
        this.nowHeightTxt = null;
        this.nowHeightBg = null;
        this._proLight = null;
        super.dispose();
    }


    protected initView() {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshUi, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACKITE_LOTTERY, this.receiveRewardHandle, this);

        this.initKiteContainer();

        //活动背景
        let descBg = BaseBitmap.create("acthreekingofwife_infobg-1");
        descBg.y = this.titleBg.y +  this.titleBg.height - 70;
        this.addChildToContainer(descBg);
        //活动时间   
        let dateText = ComponentManager.getTextField(LanguageManager.getlocal("acKiteTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = descBg.x + 10;
        dateText.y = this.titleBg.y + this.titleBg.height + 3;
        this.addChildToContainer(dateText);
        //活动文本
        let descSkinNeed = this.vo.getSkinNeedData();
        let descTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteInfo", this.getTypeCode()), [String(this.cfg.cost), String(descSkinNeed)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 600;
        descTxt.lineSpacing = 5;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 10;
        this.addChildToContainer(descTxt);

        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = descBg.y + descBg.height - this._timeBg.height / 2 - 2;
		this.addChildToContainer(this._timeBg);
		this._timeTxt = ComponentManager.getTextField(this.vo.acCountDown, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._timeTxt.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);

        let bottomBg = BaseBitmap.create(this.getDefaultRes("ackite_bottombg"));
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
        this.addChildToContainer(bottomBg);

        let progressHead = BaseBitmap.create(this.getDefaultRes("ackite_progresshead"));

        // 血条
        this._progressBar = ComponentManager.getProgressBar(this.getDefaultRes(`ackite_progress`), this.getDefaultRes(`ackite_progressbg`), 540);
        this._progressBar.x = GameConfig.stageWidth / 2 - this._progressBar.width / 2 + progressHead.width / 2 - 20;
        this._progressBar.y = bottomBg.y + 64;
        this.addChildToContainer(this._progressBar);

        //已经攻击次数
        progressHead.x = this._progressBar.x - progressHead.width + 15;
        this.addChildToContainer(progressHead);
        progressHead.y = this._progressBar.y + this._progressBar.height / 2 - progressHead.height / 2 - 2;

        //pro light
        let proLight = BaseBitmap.create("acwealthcomingview_progresslight");
        proLight.anchorOffsetX = proLight.width - 2;
        proLight.setPosition(this._progressBar.x, this._progressBar.y + this._progressBar.height/2 - proLight.height/2);
        this.addChildToContainer(proLight);
        this._proLight = proLight;

        this._numTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteProcess", this.getTypeCode()), [String(this.vo.scorenum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._numTxt.textAlign = egret.HorizontalAlign.CENTER;
        this._numTxt.lineSpacing = 5;
        this._numTxt.x = progressHead.x + progressHead.width / 2 - this._numTxt.width / 2 - 2;
        this._numTxt.y = progressHead.y + progressHead.height / 2 - this._numTxt.height / 2 - 2;
        this.addChildToContainer(this._numTxt);

        let boxCfg = this.cfg.progressList;
        let boxShowMax = 5;
        let boxMaxNeed = boxCfg[boxShowMax-1].need;
        for (let index = 0; index < boxShowMax; index++) {
            let data = boxCfg[index];

            // 1->宝箱关闭 ,2->可以领取宝箱, 3->已经打开宝箱
            let rStatus = this.vo.getBoxStatusByIndex(data.id);
            let imgres = this.getDefaultRes(`ackite_box${rStatus}`);

            let boxImg = BaseBitmap.create(imgres);
            boxImg.width = 66;
            boxImg.height = 63;
            boxImg.anchorOffsetX = boxImg.width / 2;
            boxImg.anchorOffsetY = boxImg.height / 2;
            boxImg.name = "boxImg" + index;
            boxImg.x = this._progressBar.x + boxCfg[index].need / boxMaxNeed * this._progressBar.width;
            boxImg.y = this._progressBar.y + this._progressBar.height / 2 - 5;
            
            let lightImg = BaseBitmap.create("dailytask_box_light");
            lightImg.anchorOffsetX = 40;
            lightImg.anchorOffsetY = 40;

            if (index == boxShowMax - 1){
                boxImg.setScale(1.5);
                boxImg.x = this._progressBar.x + boxCfg[index].need / boxMaxNeed * this._progressBar.width - boxImg.width * 0.5 + 15;
                boxImg.y = this._progressBar.y + this._progressBar.height / 2 - 5;
                lightImg.setScale(1.5);
            }

            lightImg.name = "lightImg" + index;
            lightImg.x = boxImg.x;
            lightImg.y = boxImg.y;
            
            lightImg.visible = false;
            this.addChildToContainer(lightImg);
            this.addChildToContainer(boxImg);

            boxImg.addTouchTap(() => {
                if (!this.vo.isStart) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                    return;
                }
                let selId = data.id;
                if (this.vo.isSecondProcess()){
                    selId = this.vo.getCurrRedProcessId();
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACKITEDETAILPOPUPVIEWTAB2, {
                    code: this.code,
                    aid: this.aid,
                    id: selId
                });
            }, this);
        }

        let poolBtn = ComponentManager.getButton(this.getDefaultRes(`ackite_poolbtn`), "", () => {
            if (!this.vo.isStart) {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSRECHARGEPOOLVIEW, {
                aid: this.aid,
                code: this.code,
                topMsg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKitePoolTopMsg", this.getTypeCode())),
                rewards: this.cfg.getPoolRewards(),
            });

        }, this);
        poolBtn.setPosition(10, descBg.y + descBg.height + 15);
        this.addChildToContainer(poolBtn);
        
        //详情按钮
        let detailBtn = ComponentManager.getButton(this.getDefaultRes(`ackite_detailbtn`), "", this.infoBtnClick, this);
        detailBtn.x = 0;
        detailBtn.y = bottomBg.y - 160 - detailBtn.height;
        this.addChildToContainer(detailBtn);
        this.detailBtn = detailBtn;

        let haveNumBg = BaseBitmap.create(this.getDefaultRes(`ackite_havenumbg`));
        haveNumBg.setPosition(GameConfig.stageWidth / 2 - haveNumBg.width / 2, bottomBg.y - haveNumBg.height + 35);
        this.addChildToContainer(haveNumBg);

        let haveNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acKiteCanUseNum`, this.getTypeCode()), [""+this.cfg.unitLength, String(this.vo.starNum)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        haveNum.width = haveNumBg.width;
        haveNum.lineSpacing = 4;
        haveNum.textAlign = egret.HorizontalAlign.CENTER;
        haveNum.setPosition(haveNumBg.x, haveNumBg.y + 8);
        this.addChildToContainer(haveNum);
        this.haveNum = haveNum;

        let nowHeightBg = BaseBitmap.create(this.getDefaultRes("ackite_nowheightbg"));
        this.addChildToContainer(nowHeightBg);
        // nowHeightBg.width = 140;
        nowHeightBg.setPosition(GameConfig.stageWidth - nowHeightBg.width - 40, descBg.y + descBg.height + 30);
        this.nowHeightBg = nowHeightBg;
        let nowStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acKiteCurHeight`, this.getTypeCode()), [""+this.vo.nowhight*this.cfg.unitLength]);
        let nowHeightTxt = ComponentManager.getTextField(nowStr,18,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.nowHeightTxt = nowHeightTxt;
        nowHeightTxt.textAlign = TextFieldConst.ALIGH_CENTER;
        // nowHeightBg.width = nowHeightTxt.width + 30;
        // nowHeightBg.x = GameConfig.stageWidth - nowHeightBg.width - 30;

        nowHeightTxt.setPosition(nowHeightBg.x + nowHeightBg.width - nowHeightTxt.width - 5, nowHeightBg.y + nowHeightBg.height/2 - nowHeightTxt.height/2);
        this.addChildToContainer(nowHeightTxt);

        this.initRightBar();

        this.refreshUi();
    }

    private initRightBar() {
        let rightBarCon = new BaseDisplayObjectContainer();
        this.rightBarCon = rightBarCon;
        this.kiteCon.addChild(rightBarCon);
        rightBarCon.setPosition(GameConfig.stageWidth - 20, this.kiteBg.height - 1136 + 380);
        rightBarCon.rotation = -90;
        let rightBarBg = BaseBitmap.create(this.getDefaultRes(`ackite_progressbg`));
        rightBarCon.anchorOffsetY = rightBarBg.height / 2;
        rightBarBg.width = this.kiteBg.height - 210 + (1136 - GameConfig.stageHeigth);
        rightBarCon.addChild(rightBarBg);
        this.rightBarBg = rightBarBg;

        let rightBar = BaseBitmap.create(this.getDefaultRes(`ackite_progress`));
        rightBar.anchorOffsetY = rightBar.height / 2;
        rightBar.x = rightBarBg.x;
        rightBar.y = rightBarBg.height / 2;
        rightBar.width = this.kiteBg.height - 1136;
        this.rightBar = rightBar;
        rightBarCon.addChild(rightBar);

        let tipLong = rightBarBg.width;
        let tipNum = Math.round(tipLong / this.unitPixel);
        this.rightBarTips = [];
        this.rightBarTips.length = 0;
        this.refreshRightBar();

    }

    private getBgImgHeight(): number {
        let height = this.kiteBg.height;
        if (height >= 2048) {
            height = 2048;
        }
        return height;
    }
    private initKiteContainer() {
        this.nowPos = this.vo.posinfo;
        let kiteCon = new BaseDisplayObjectContainer();
        this.kiteCon = kiteCon;
        kiteCon.width = 640;
        let bgName: string = this.getBgName();
        if (bgName) {
            let kiteBg = new BaseDisplayObjectContainer();
            kiteBg.width = 640;
            this.kiteBg = kiteBg;
            kiteBg.height = this.nowPos.y * this.unitPixel + 1136;
            kiteCon.addChild(kiteBg);

            //真正的bg图片
            let kiteBgImg = BaseBitmap.create(bgName);
            this.kiteBgImg = kiteBgImg;
            kiteBgImg.height = this.getBgImgHeight();
            kiteBg.addChild(kiteBgImg);


            this.cloudCon = new BaseDisplayObjectContainer();
            kiteCon.addChild(this.cloudCon);
            this.refreshCloud();
            this.windsCon = new BaseDisplayObjectContainer();
            kiteCon.addChild(this.windsCon);
        }
        let kiteScrView = ComponentManager.getScrollView(kiteCon, new egret.Rectangle(0, 0, 640, GameConfig.stageHeigth));
        this.addChildToContainer(kiteScrView);
        this._scollView = kiteScrView;
        kiteScrView.verticalScrollPolicy = "off";
        kiteScrView.bounces = false;

        //风筝线 风筝 线轮
        let kiteLine: egret.Shape = new egret.Shape();
        kiteLine.graphics.lineStyle(2, 0x061B31);
        kiteLine.graphics.moveTo(this.kitePoint.x, this.kitePoint.y);
        kiteLine.graphics.lineTo(this.lineCirclePoint.x - this.kitePoint.x, this.lineCirclePoint.y - this.kitePoint.y);
        kiteLine.graphics.endFill();
        this.kiteCon.addChild(kiteLine);
        this.kiteLine = kiteLine;
        // let kiteLine = BaseBitmap.create(this.getDefaultRes(`ackite_kiteline`));
        // this.addChild(kiteLine);
        // this.kiteLine = kiteLine;

        let kite = new BaseDisplayObjectContainer();
        kite.anchorOffsetX = 169 / 2;
        kite.anchorOffsetY = 90;
        this.kiteCon.addChild(kite);
        this.kite = kite;

        let kiteBone = "fengzheng";
        let kiteBoneName = "fengzheng_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && RES.hasRes(kiteBoneName) && App.CommonUtil.check_dragon()) {
            let kiteDro = App.DragonBonesUtil.getLoadDragonBones(kiteBone); 
            this.kite.addChild(kiteDro);
            kiteDro.setPosition(-265, 890);

        } else {
            let kiteImg = BaseBitmap.create(this.getDefaultRes(`ackite_kite`));
            this.kite.addChild(kiteImg);
        }


        let lineCircle = BaseBitmap.create("ackite_linehandler_1");
        lineCircle.anchorOffsetX = 15;
        lineCircle.anchorOffsetY = 125;
        this.kiteCon.addChild(lineCircle);
        this.lineCircle = lineCircle;

        let lineCircleAni = ComponentManager.getCustomMovieClip("ackite_linehandler_", 3);
        lineCircleAni.anchorOffsetX = 15;
        lineCircleAni.anchorOffsetY = 125;
        this.kiteCon.addChild(lineCircleAni);
        this.lineCircleAni = lineCircleAni;
        this.lineCircleAni.visible = false;

        let fakelineCircle = BaseBitmap.create("ackite_linehandler_1");
        fakelineCircle.anchorOffsetX = 15;
        fakelineCircle.anchorOffsetY = 125;
        this.addChildToContainer(fakelineCircle);
        this.fakelineCircle = fakelineCircle;
        this.fakelineCircle.visible = false;

        let fakelineCircleAni = ComponentManager.getCustomMovieClip("ackite_linehandler_", 3);
        fakelineCircleAni.anchorOffsetX = 15;
        fakelineCircleAni.anchorOffsetY = 125;
        this.addChildToContainer(fakelineCircleAni);
        this.fakelineCircleAni = fakelineCircleAni;
        this.fakelineCircleAni.visible = false;

        this.refreshKite();

        //左上右 按钮
        for (let i = 1; i <= 3; i++) {
            let btnDirection = "left";
            if (i == 2) {
                btnDirection = "up";
            } else if (i == 3) {
                btnDirection = "right";

            }
            let goBtn = ComponentManager.getButton(this.getDefaultRes(`ackite_go${btnDirection}`), ``, this.kiteBtn, this, [i]);
            goBtn.setPosition(120 + 155 * (i - 1), GameConfig.stageHeigth - 240);
            this.addChildToContainer(goBtn);
        }


    }
    private refreshWind() {
        let kiteBottomY = this.kiteBg.height - this.kiteState[2].y;
        let kiteY = this.nowPos.y;
        let windInfo = this.vo.mapinfo;
        for (const key in windInfo) {
            if (Number(key) < this.vo.maxhight) {
                if (this.winds[key]) {
                    this.winds[key]["windInfo"] = {};
                    this.winds[key].dispose();
                    this.winds[key] = null;
                }

            } else {
                if (Number(key) <= (kiteY + 5)) {
                    if (!this.winds[key]) {
                        let windCon = new BaseDisplayObjectContainer();
                        this.windsCon.addChild(windCon);
                        let wind = ComponentManager.getCustomMovieClip("ackite_meetwind_", 8);
                        wind.playWithTime(0);
                        wind.name = "wind";
                        windCon.anchorOffsetX = 208 / 2;
                        windCon.anchorOffsetY = 159 / 2;
                        let windX = Object.keys(windInfo[key])[0];
                        let windType = Number(windInfo[key][Object.keys(windInfo[key])[0]]);
                        windCon.setPosition(this.kiteState[windX].x, this.kiteBg.height - kiteBottomY - (Number(key) - this.nowPos.y) * this.unitPixel);
                        windCon.addChild(wind);
                        windCon["windInfo"] = {
                            x: Number(windX),
                            y: Number(key),
                            type: windType,
                            bottomY: kiteBottomY + (Number(key) - this.nowPos.y) * this.unitPixel
                        };
                        let windTxtBg = BaseBitmap.create(this.getDefaultRes(`ackite_windtxtbg`));
                        windTxtBg.setPosition(wind.x + 208 / 2 - windTxtBg.width / 2 - 30, wind.y + 159 / 2 - windTxtBg.height / 2 - 20);
                        windCon.addChild(windTxtBg);

                        let dtDis = this.cfg.unitLength * this.cfg.followingWindEffect;
                        if (Number(windType) == 2){
                            dtDis = this.cfg.unitLength * this.cfg.againstWindEffect;
                        }
                        let windTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acKite_windtype${windType}`, this.getTypeCode()), [""+dtDis]), 18);
                        windTxt.textAlign = egret.HorizontalAlign.CENTER;
                        windTxt.lineSpacing = 2;
                        windTxtBg.width = windTxt.width + 12;
                        windTxtBg.height = windTxt.height + 12;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, windTxt, windTxtBg);
                        windCon.addChild(windTxt);
                        this.winds[key] = windCon;
                    }
                }
            }

        }

    }
    private refreshCloud() {
        let maxCloud = this.nowPos.y + 5;
        let minCloud = this.nowPos.y - 3;
        if (minCloud < 0) {
            return;
        }
        let beginY = 900;


        for (const ckey in this.clouds) {
            if (this.clouds.hasOwnProperty(ckey)) {
                let thisCloud = this.clouds[ckey];
                if(thisCloud && thisCloud.y>1136+3*this.unitPixel){
                    egret.Tween.removeTweens(thisCloud);
                    thisCloud["cloudInfo"] = null;
                    thisCloud.dispose();
                    thisCloud = null;
                }
            }
        }

        for (let i = minCloud; i <= maxCloud; i++) {
            if (i % 3 == 0) {
                if (!this.clouds[i] || !this.clouds[i]["cloudInfo"]) {
                    let cloudBottomY = (beginY + i * this.unitPixel);
                    let cloudId = 1;
                    let cloudRes = this.getDefaultRes(`ackite_cloud${cloudId}`);
                    let cloud = BaseBitmap.create(cloudRes);
                    this.clouds[i] = cloud;
                    cloud.anchorOffsetX = cloud.width / 2;
                    cloud.y = this.kiteBg.height - cloudBottomY;
                    if (cloudId == 2) {
                        if (Math.random() > 0.5) {
                            cloud.scaleX = -1;
                            cloud.x = GameConfig.stageWidth - cloud.width / 2
                        } else {
                            cloud.x = cloud.width / 2
                        }
                    } else {
                        if (Math.random() > 0.5) {
                            cloud.scaleX = -1;
                        }
                        cloud.setScale(0.7 + 0.3 * Math.random());
                        let beginX = -cloud.width / 2*cloud.scaleY;
                        let endX = GameConfig.stageWidth + cloud.width / 2*cloud.scaleY;
                        let bornX = 40 + 500 * Math.random();
                        if(i<3){
                            bornX = beginX;
                        }
                        let during = (30 + 5 * Math.random()) * 1000;
                        cloud.x = bornX;
                        egret.Tween.get(cloud)
                            .to({ x: endX }, during * (endX - bornX) / (endX - beginX))
                            .call(() => {
                                cloud.x = beginX;
                                egret.Tween.removeTweens(cloud);
                                egret.Tween.get(cloud, { loop: true })
                                    .to({ x: endX }, during)
                            })
                    }
                    this.cloudCon.addChild(cloud);
                    cloud["cloudInfo"] = {
                        bottomY: cloudBottomY
                    }
                }

            }
        }
    }
    private refreshKite() {
        let xPosIndex = this.nowPos.x
        this.kite.x = this.kiteState[xPosIndex].x;
        this.kite.y = this.kiteState[xPosIndex].y;
        this.kite.rotation = this.kiteState[xPosIndex].rotation;

        this.lineCircle.x = this.lineCircleState[xPosIndex].x;
        this.lineCircle.y = this.lineCircleState[xPosIndex].y;
        this.lineCircle.rotation = this.lineCircleState[xPosIndex].rotation;

        this.lineCircleAni.x = this.lineCircleState[xPosIndex].x;
        this.lineCircleAni.y = this.lineCircleState[xPosIndex].y;
        this.lineCircleAni.rotation = this.lineCircleState[xPosIndex].rotation;

        this.fakelineCircle.x = this.fakelineCircleState[xPosIndex].x;
        this.fakelineCircle.y = this.fakelineCircleState[xPosIndex].y;
        this.fakelineCircle.rotation = this.fakelineCircleState[xPosIndex].rotation;

        this.fakelineCircleAni.x = this.fakelineCircleState[xPosIndex].x;
        this.fakelineCircleAni.y = this.fakelineCircleState[xPosIndex].y;
        this.fakelineCircleAni.rotation = this.fakelineCircleState[xPosIndex].rotation;


        this.refreshKiteLine();
        this.refreshWind();
        this.refreshCloud();
        this.refreshRightBar();
        this.kiteCon.height = this.kiteBg.height;

    }
    private refreshRightBar() {

        if (this.rightBarCon && this.rightBarBg && this.rightBar) {
            this.rightBarBg.width = this.kiteBg.height - 210 + (1136 - GameConfig.stageHeigth);
            this.rightBar.width = this.kiteBg.height - 1136;
            let tipLong = this.rightBarBg.width;
            let tipNum = Math.round(tipLong / this.unitPixel);
            if (tipNum + 1 > this.rightBarTips.length) {
                for (let i = 0; i < tipNum + 1; i++) {
                    if (this.rightBarTips[i] && this.rightBarTips[i].numChildren) {
                        continue;
                    }
                    let tipCon = new BaseDisplayObjectContainer();
                    let tipBg = BaseBitmap.create(this.getDefaultRes(`ackite_kiteprogressbg`));
                    tipCon.addChild(tipBg);
                    let tipTxt = ComponentManager.getTextField(this.cfg.unitLength * i + '', 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipBg, [0, 0]);
                    tipCon.addChild(tipTxt);
                    tipCon.width = tipBg.width;
                    tipCon.height = tipBg.height;
                    tipCon.setPosition(this.rightBarBg.x + i * this.unitPixel +30, -10.5)
                    tipCon.rotation = 90;
                    this.rightBarTips.push(tipCon);
                    this.rightBarCon.addChild(tipCon);
                }
            }
        }

    }
    private refreshKiteLine() {
        // this.kiteLine.setPosition(this.kitePoint.x,this.kitePoint.y);
        // this.kiteLine.height = this.getLineHeight();
        // this.kiteLine.rotation = -Math.atan((this.lineCirclePoint.x-this.kitePoint.x)/(this.lineCirclePoint.y-this.kitePoint.y))*180/Math.PI;
        // if (this.kiteLine.height >= 620 + (1136 - GameConfig.stageHeigth)) {
        //     let baseLen = this.kiteLine.height - 620 - (1136 - GameConfig.stageHeigth);
        //     App.ShaderUtil.setAcKiteLineShader(this.kiteLine, 100 / baseLen, 150 / baseLen);
        // } else {
        //     App.ShaderUtil.removeShader(this.kiteLine)
        // }

        if(App.DeviceUtil.CheckWebglRenderMode()){
            // App.LogUtil.log("x, y ",this.lineCirclePoint.x , this.kitePoint.x, this.lineCirclePoint.y , this.kitePoint.y);
            this.kiteLine.x = this.kitePoint.x;
            this.kiteLine.y = this.kitePoint.y;
            this.kiteLine.graphics.clear();
            this.kiteLine.graphics.lineStyle(2, 0x061B31);
            this.kiteLine.graphics.moveTo(0, 0);
            this.kiteLine.graphics.lineTo(this.lineCirclePoint.x - this.kitePoint.x, this.lineCirclePoint.y - this.kitePoint.y);
            this.kiteLine.graphics.endFill();
            if (this.kiteBgImg.height >= 1136 + 2 * this.unitPixel) {
                let long = Math.sqrt((this.lineCirclePoint.x - this.kitePoint.x)*(this.lineCirclePoint.x - this.kitePoint.x)+(this.lineCirclePoint.y - this.kitePoint.y)*(this.lineCirclePoint.y - this.kitePoint.y))
                let baseLen = this.kiteBgImg.height - 620 - (1136 - GameConfig.stageHeigth);
                let baseA = 100*GameConfig.stageHeigth/1136;
                let baseB = 150*GameConfig.stageHeigth/1136;
                App.ShaderUtil.setAcKiteLineShader(this.kiteLine, baseA / long, baseB / long);
            } else {
                App.ShaderUtil.removeShader(this.kiteLine);
            }
        }else{
            this.kiteLine.x = this.kitePoint.x;
            this.kiteLine.y = this.kitePoint.y;
            this.kiteLine.graphics.clear();
            this.kiteLine.graphics.lineStyle(2, 0x061B31);
            this.kiteLine.graphics.moveTo(0, 0);
            if (this.kiteBgImg.height >= 1136 + 2 * this.unitPixel) {
                let long = Math.sqrt((this.lineCirclePoint.x - this.kitePoint.x)*(this.lineCirclePoint.x - this.kitePoint.x)+(this.lineCirclePoint.y - this.kitePoint.y)*(this.lineCirclePoint.y - this.kitePoint.y))
                this.kiteLine.graphics.lineTo((this.lineCirclePoint.x - this.kitePoint.x)*350/long, (this.lineCirclePoint.y - this.kitePoint.y)*350/long);
            }else{
                this.kiteLine.graphics.lineTo(this.lineCirclePoint.x - this.kitePoint.x, this.lineCirclePoint.y - this.kitePoint.y);
            }
            this.kiteLine.graphics.endFill();
        }
    }
    private getLineHeight() {
        return Math.sqrt(Math.pow(this.lineCirclePoint.x - this.kitePoint.x, 2) + (Math.pow(this.lineCirclePoint.y - this.kitePoint.y, 2)))
    }
    private setIsPlay(isPlayAni: boolean) {
        if (!isPlayAni) {
            let rewardList = GameData.formatRewardItem(this.rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
        }
        this._isPlayAni = isPlayAni;


    }
    private moveKite(wind?: number, rewards?: string) {
        this.setIsPlay(true);
        let aimPos = this.nowPos.x
        if (!wind) {
            if (this.btnParam == 1) {
                aimPos--;
            } else if (this.btnParam == 3) {
                aimPos++;
            }
        }

        aimPos = aimPos < 1 ? 1 : aimPos;
        aimPos = aimPos > 3 ? 3 : aimPos;

        //上升
        if (wind || this.btnParam == 2) {
            //线轮
            if (this.kiteBg.height >= 1136 + 2 * this.unitPixel) {
                this.fakelineCircle.visible = false;
                this.fakelineCircleAni.visible = true;
                this.fakelineCircleAni.goToAndPlay(0);
                this.fakelineCircleAni.playWithTime(0);
            } else {
                this.fakelineCircle.visible = false;
                this.fakelineCircleAni.visible = false;
                this.lineCircle.visible = false;
                this.lineCircleAni.visible = true;
                this.lineCircleAni.goToAndPlay(0);
                this.lineCircleAni.playWithTime(0);

            }

            let aimPosY = this.nowPos.y;
            if (wind) {
                if (wind == 1) {
                    aimPosY+=this.cfg.followingWindEffect;
                } else {
                    aimPosY-=this.cfg.againstWindEffect;
                }
            } else {
                aimPosY++;
            }

            //背景
            let aimBgHeight = aimPosY * this.unitPixel + 1136;

            egret.Tween.get(this.kiteBg, { onChange: this.updateWindPosition, onChangeObj: this })
                .to({ height: aimBgHeight }, 500)
                .call(() => {
                    this.nowPos.y = aimPosY;

                    if (this.lineCircle) {
                        this.lineCircle.visible = true;
                    }
                    if (this.lineCircleAni) {
                        this.lineCircleAni.stop()
                        this.lineCircleAni.visible = false;
                    }
                    if (this.fakelineCircle && this.fakelineCircleAni) {
                        this.fakelineCircle.visible = false;
                        this.fakelineCircleAni.visible = false;;
                    }
                }, this).wait(50).call(this.checkMeetWind,this);
        } else {
            //风筝 线轮
            if (this.kiteBg.height >= 1136 + 2 * this.unitPixel) {
                this.fakelineCircle.visible = true;
                this.fakelineCircleAni.visible = false;
                let aimfakelineCircleProp = this.fakelineCircleState[aimPos];
                egret.Tween.get(this.fakelineCircle).to(aimfakelineCircleProp, 500)
                    .call(() => {
                        if (this.fakelineCircle && this.fakelineCircleAni) {
                            this.fakelineCircle.visible = false;
                            this.fakelineCircleAni.visible = false;;
                        }
                    }, this);
            } else {
                this.lineCircle.visible = true;
                this.lineCircleAni.visible = false;
                this.fakelineCircle.visible = false;
                this.fakelineCircleAni.visible = false;
            }

            let aimKiteProp = this.kiteState[aimPos];
            egret.Tween.get(this.kite).to(aimKiteProp, 500);

            let aimlineCircleProp = this.lineCircleState[aimPos];
            egret.Tween.get(this.lineCircle, { onChange: this.refreshKiteLine, onChangeObj: this }).to(aimlineCircleProp, 500)
                .call(() => {
                    this.nowPos.x = aimPos;
                    this.checkMeetWind();
                }, this);

        }


    }
    private checkMeetWind() {
        egret.Tween.removeTweens(this.kiteBg);
        this.refreshKite();
        let isMeetWind = false;
        for (const key in this.winds) {
            let wind = this.winds[key];
            if (wind) {
                let windInfo = wind["windInfo"];
                if(windInfo){
                    if (this.nowPos.x == windInfo.x && this.nowPos.y == windInfo.y) {
                        isMeetWind = true;
                        wind["windInfo"] = {};
                        this.moveKite(windInfo.type);
                        egret.Tween.get(wind).to({ alpha: 0 }, 300).call(() => {
                            if (wind) {
                                wind.dispose();
                                wind = null;
                            }
                        })
                    }
                }
            }
        }
        if (!isMeetWind) {
            this.setIsPlay(false);
        }
        //this.refreshKite();
        //this.moveKite(1);
    }
    private updateWindPosition() {
        if (this.lineCircle) {
            this.lineCircle.y = this.lineCircleState[this.nowPos.x].y;
        }
        if (this.lineCircleAni) {
            this.lineCircleAni.y = this.lineCircleState[this.nowPos.x].y;
        }
        if (this.fakelineCircle) {
            this.fakelineCircle.y = this.fakelineCircleState[this.nowPos.x].y;
        }
        if (this.fakelineCircleAni) {
            this.fakelineCircleAni.y = this.fakelineCircleState[this.nowPos.x].y;
        }
        if (this.kiteBgImg) {
            this.kiteBgImg.height = this.getBgImgHeight();
        }
        this.refreshKiteLine();

        for (const key in this.winds) {
            let windCon = this.winds[key];
            if (windCon) {
                let windInfo = windCon["windInfo"];
                if(windInfo && windInfo.bottomY){
                    windCon.y = this.kiteBg.height - windInfo.bottomY;
                }
            }
        }

        for (const ckey in this.clouds) {
            let cloud = this.clouds[ckey];
            if (cloud) {
                let cloudInfo = cloud["cloudInfo"];
                if(cloudInfo && cloudInfo.bottomY){
                    cloud.y = this.kiteBg.height - cloudInfo.bottomY;
                }
            }
        }
        if (this.rightBarCon && this.rightBar) {
            this.rightBarCon.y = this.kiteBg.height - 1136 + 380;
            this.rightBar.width = this.kiteBg.height - 1136;
        }

    }
    private get kitePoint(): { x: number, y: number } {
        if (this.kite) {
            return { x: this.kite.x, y: this.kite.y };
        }
        return { x: 0, y: 0 };
    }
    private get lineCirclePoint(): { x: number, y: number } {
        if (this.lineCircle) {
            let _a = 43;
            let _b = 90;
            let _rot = Math.atan(_b / _a);
            let _nowAngle = _rot - this.lineCircle.rotation / 180 * Math.PI;
            let _long = Math.sqrt(_a * _a + _b * _b);
            // App.LogUtil.log("lincecircle "+_long + " lincircle.y "+this.lineCircle.y + " yy "+_long * Math.sin(_nowAngle));
            return { x: this.lineCircle.x + _long * Math.cos(_nowAngle), y: this.lineCircle.y - _long * Math.sin(_nowAngle) }
        }
        return { x: 0, y: 0 };
    }

    //1左 2上 3右
    private kiteBtn(param: number) {
        if (this._isPlayAni) {
            return;
        }

        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.vo.scorenum <= 0) {

            let message = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKite_notenough", this.getTypeCode()), ["" + this.cfg.cost]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: message,
                callback: () => {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler: this,
                needCancel: true
            });
            return;
        }
        if (this.nowPos.x == 1 && param == 1) {
            return;
        }
        if (this.nowPos.x == 3 && param == 3) {
            return;
        }
        this.btnParam = param;
        this.nowPos = this.vo.posinfo;
        this._isPlayAni = true;
        this.refreshKite();
        NetManager.request(NetRequestConst.REQUEST_ACKITE_LOTTERY, {
            activeId: this.vo.aidAndCode,
            gid: param
        })
    }


    private refreshUi() {
        this._numTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteProcess", this.getTypeCode()), ['' + this.vo.lotterynum]);
        this.haveNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acKiteCanUseNum`, this.getTypeCode()), [""+this.cfg.unitLength, String(this.vo.starNum)]);
        this.nowHeightTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acKiteCurHeight`, this.getTypeCode()), [""+this.vo.nowhight*this.cfg.unitLength]);
        // this.nowHeightBg.width = this.nowHeightTxt.width + 30;
        // this.nowHeightBg.x = GameConfig.stageWidth - 30 - this.nowHeightBg.width;
        this.nowHeightTxt.x = this.nowHeightBg.x + this.nowHeightBg.width - this.nowHeightTxt.width - 5;

        if (this.vo.isHaveTaskRedDot() || this.vo.isHaveBoxRedDot()) {
            App.CommonUtil.addIconToBDOC(this.detailBtn);
        } else {
            App.CommonUtil.removeIconFromBDOC(this.detailBtn);

        }
        this.refreshBox();
    }

    private refreshBox() {
        this._progressBar.setPercentage(this.vo.progressPercent);
        this._proLight.x = this._progressBar.x + this._progressBar.width * this.vo.progressPercent;
        let progress = this.cfg.progressList;
        for (let index = 0; index < 5; index++) {
            let rStatus = this.vo.getBoxStatusByIndex(progress[index].id);
            let imgres = this.getDefaultRes(`ackite_box${rStatus}`);
            let boxImg = this.container.getChildByName("boxImg" + index);
            let lightImg = this.container.getChildByName("lightImg" + index);
            if (boxImg instanceof (BaseBitmap)) {
                boxImg.setRes(imgres);
            }
            if (rStatus == 2) {
                lightImg.visible = true;
                egret.Tween.get(lightImg, { loop: true }).to({ rotation: lightImg.rotation + 360 }, 10000);
                egret.Tween.get(boxImg, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);

            } else {
                lightImg.visible = false;
                egret.Tween.removeTweens(lightImg);
                egret.Tween.removeTweens(boxImg);
            }
        }
        if (this.vo.isSecondProcess()){
            let rStatus = this.vo.getBoxStatusByIndex(progress[4].id);
            if (rStatus == 3){
                let boxImg = <BaseBitmap>this.container.getChildByName("boxImg4");
                let lightImg = <BaseBitmap>this.container.getChildByName("lightImg4");
                if (this.vo.isSecondProcessRed()){
                    boxImg.setRes(this.getDefaultRes(`ackite_box2`));
                    lightImg.visible = true;
                    egret.Tween.get(lightImg, { loop: true }).to({ rotation: lightImg.rotation + 360 }, 10000);
                    egret.Tween.get(boxImg, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                }
                else{
                    boxImg.setRes(this.getDefaultRes(`ackite_box3`));
                    lightImg.visible = false;
                    egret.Tween.removeTweens(lightImg);
                    egret.Tween.removeTweens(boxImg);
                }
            }
        }
    }

    private infoBtnClick() {
        ViewController.getInstance().openView(ViewConst.POPUP.ACKITEDETAILPOPUPVIEW, {aid: this.aid, code: this.code});
    }

    /**
	 * 抽奖的的返回数据
	 */
    private receiveRewardHandle(event: egret.Event) {
        let ret = event.data.ret;
        if (!ret){
            return;
        }
        let data = event.data.data.data;
        let cmd = event.data.data.cmd;
        if (ret) {
            if (data.rewards) {
                this.rewards = data.rewards;
            }
            this.moveKite();
        }

    }


    public tick() {
        this._timeTxt.text = this.vo.acCountDown;
		this._timeBg.width = 60 + this._timeTxt.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
    }

    private get cfg(): Config.AcCfg.KiteCfg {
        return this.acVo.config;
    }
    private get vo(): AcKiteVo {
        return <AcKiteVo>this.acVo;
    }

    protected getCloseBtnName():string{
        return "acchaoting_closebtn";
    }

    protected getBgName(): string {
        return this.getDefaultRes("ackite_bg")
    }

    protected getTitleBgName(): string {
        return this.getDefaultRes(`ackite_titlebg`);
    }

    protected getRuleInfo(): string {
        return App.CommonUtil.getCnByCode("acKiteRuleInfo", this.getTypeCode());
    }

    protected getRuleInfoParam(): string[] {
        let skinNeed = this.vo.getSkinNeedData();
        return [String(this.cfg.cost), String(""+skinNeed)];
    }

    protected getTitleStr(): string {
        return null;
    }

    protected getProbablyInfo(): string {
		return App.CommonUtil.getCnByCode(`acKiteProbablyInfo`, this.getTypeCode());
    }

    protected getRequestData(): { requestType: string, requestData: any } {

        if (this.vo.firstOpen != 1) {
            return { requestType: NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, requestData: { activeId: this.vo.aidAndCode, flagkey: "firstOpen", value: 1 }};
        }
        return null;
    }

    private get kiteState(): { [key: string]: { x: number, y: number, rotation: number } } {
        return {
            "1": { x: 100, y: 430, rotation: -10 },
            "2": { x: 320, y: 420, rotation: 0 },
            "3": { x: 500, y: 430, rotation: 10 },
        }

    }
    private get lineCircleState(): { [key: string]: { x: number, y: number, rotation: number } } {
        if (this.kiteBg) {
            return {
                "1": { x: 250, y: this.kiteBgImg.height - 200 - (1136 - GameConfig.stageHeigth), rotation: -50 },
                "2": { x: 300, y: this.kiteBgImg.height - 200 - (1136 - GameConfig.stageHeigth), rotation: 0 },
                "3": { x: 320, y: this.kiteBgImg.height - 200 - (1136 - GameConfig.stageHeigth), rotation: 15 },
            }
        } else {
            return {
                "1": { x: 250, y: GameConfig.stageHeigth - 200, rotation: -50 },
                "2": { x: 300, y: GameConfig.stageHeigth - 200, rotation: 0 },
                "3": { x: 320, y: GameConfig.stageHeigth - 200, rotation: 15 },
            }
        }
    }
    private get fakelineCircleState(): { [key: string]: { x: number, y: number, rotation: number } } {
        return {
            "1": { x: 250, y: GameConfig.stageHeigth - 200, rotation: -50 },
            "2": { x: 300, y: GameConfig.stageHeigth - 200, rotation: 0 },
            "3": { x: 320, y: GameConfig.stageHeigth - 200, rotation: 15 },
        }

    }

    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode ? defaultCode : "1";
        if(ResourceManager.hasRes(resName+"-"+this.code)){
            return resName+"-"+this.code;
        } 
        else if (ResourceManager.hasRes(resName+"-"+defaultCode)){
            return resName+"-"+defaultCode;
        }
        else{
            return resName;
        }
    }

    private getTypeCode():string{
        // if (this.code == "2"){
        //     return "1";
        // }
        return this.code;
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }


    private getDefaultResList(resArr: string[]): string[] {
        let arr = [];
        for (let i = 0; i < resArr.length; i++) {
            const element = resArr[i];
            let defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    }

    protected getResourceList(): string[] {
        let codeRes = this.getDefaultResList([
            "ackite_bottombg", "ackite_box1", "ackite_box2", "ackite_box3", "ackite_cloud1",
            "ackite_cloud2", "ackite_descbg", "ackite_goleft", "ackite_goright", "ackite_goup", "ackite_havenumbg", "ackite_kite",
            "ackite_kiteline", "ackite_kiteprogressbg", "ackite_progress", "ackite_progressbg", "ackite_progresshead", "ackite_poolbtn", 
            "ackite_titlebg",  "ackite_wind", "ackite_windtxtbg", "ackite_detailbtn", "ackite_bg","ackite_nowheightbg",
            "ackite_ranktitlebg1",  "ackite_ranktitlebg2",  "ackite_ranktitlebg3",  "ackite_ranktitlebg4", "ackite_tasktitlebg", "ackite_processtitlebg",
        ])
        return super.getResourceList().concat(codeRes).concat([
            "acthreekingofwife_infobg-1",
            "ackite_linehandler_1",
            "acchaoting_closebtn",
            "dailytask_box_light",
            "acwealthcomingview_progresslight",
        ]);
    }


}
