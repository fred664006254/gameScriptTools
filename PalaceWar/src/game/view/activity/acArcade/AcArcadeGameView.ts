/**
  * 拉霸机活动
  * @author 张朝阳
  * date 2019/6/6
  * @class AcArcadeGameView
  */
class AcArcadeGameView extends CommonView {


    private _lightEffect1: BaseLoadBitmap = null;

    private _lightEffect2: BaseLoadBitmap = null;

    private _gameBM: BaseLoadBitmap = null;

    private _useBg: BaseLoadBitmap = null;

    private _useTF: BaseTextField = null;

    private _machineContainer: BaseDisplayObjectContainer = null;

    private _numBg: BaseLoadBitmap = null;

    private _numTF: BaseTextField = null;

    private _pullrodUp: BaseLoadBitmap = null;

    private _pullrodDown: BaseLoadBitmap = null;

    private _leftBtn: BaseButton = null;

    private _rightBtn: BaseButton = null;

    private _leftBtnTxt: BaseTextField = null;

    private _rightBtnTxt: BaseTextField = null;

    private code: string = null;

    private aid: string = null;

    private _gameCoin: BaseLoadBitmap = null;

    private _leftPoint: BaseBitmap = null;

    private _rightPoint: BaseBitmap = null;

    private _gameCoinScale = 0.27;

    private _txtEffect: BaseLoadBitmap = null;


    /** 对象池 */
    private _rewardsPool: Object = {};

    /**位置信息1 */
    private _posList1: { x: number, y: number, visible: boolean }[] = [];

    /**位置信息2 */
    private _posList2: { x: number, y: number, visible: boolean }[] = [];

    /**位置信息3 */
    private _posList3: { x: number, y: number, visible: boolean }[] = [];

    /**reward 信息 */
    private _containerList1: BaseDisplayObjectContainer[] = [];

    /**reward 信息 */
    private _containerList2: BaseDisplayObjectContainer[] = [];

    /**reward 信息 */
    private _containerList3: BaseDisplayObjectContainer[] = [];

    private _startPosY1: number = 0;

    private _startPosY2: number = 0;

    private _startPosY3: number = 0;


    private _rewardsVoList: RewardItemVo[] = null;

    private _index1: number = 0;

    private _slideIndex1: number = 0;

    private _index2: number = 0;

    private _slideIndex2: number = 0;

    private _index3: number = 0;

    private _slideIndex3: number = 0;

    private _endPosY1: number = 0;
    private _isStop1: boolean = false;

    private _stopIndex1: number = 0;

    private _endPosY2: number = 0;
    private _isStop2: boolean = false;

    private _stopIndex2: number = 0;

    private _endPosY3: number = 0;
    private _isStop3: boolean = false;

    private _stopIndex3: number = 0;

    private _lastId1: string = null;
    private _lastId2: string = null;
    private _lastId3: string = null;

    private _isPlayAni: boolean = false;

    private _offestId1: number = 0;
    private _offestId2: number = 0;
    private _offestId3: number = 0;


    private _farmelightEffect: BaseBitmap = null;

    private _container1: BaseDisplayObjectContainer = null;

    private _container2: BaseDisplayObjectContainer = null;

    private _container3: BaseDisplayObjectContainer = null;

    private _handlerData: any = null;

    private _fireEffect1: CustomMovieClip = null;

    private _fireEffect2: CustomMovieClip = null;

    private _fireEffect3: CustomMovieClip = null;

    private _fireEffect4: CustomMovieClip = null;

    private _isBatch: boolean = false;

    private _lihuaCfg = {

        1: { color: 'hong', pos: [112, 118], scale: 1.5, wait: 0 },
        2: { color: 'huang', pos: [374, 118], scale: 1.5, wait: 200 },
        3: { color: 'lan', pos: [50, 262], scale: 1.5, wait: 400 },
        4: { color: 'huang', pos: [432, 262], scale: 1.5, wait: 650 },
        5: { color: 'hong', pos: [-36, 408], scale: 1.5, wait: 900 },
        6: { color: 'lan', pos: [524, 408], scale: 1.5, wait: 1100 },
    };

    private _bg: BaseLoadBitmap = null;

    public constructor() {
        super();
    }

    protected getContainerY():number
	{
		return 0;
	}

    public initView() {
        let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, this.lotteryHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADEGETLOGS, this.logsHandle, this);
        this.code = this.param.data.code;
        this.aid = this.param.data.aid;

        let bg = BaseLoadBitmap.create("acarcadeview_laba_bg-" + this.getUiCode());
        bg.width = 640;
        bg.height = 1136;
        bg.setPosition(0, GameConfig.stageHeigth - bg.height);
        this.addChildToContainer(bg);
        this._bg = bg;

        let titleBg = BaseLoadBitmap.create("acarcadeview_laba_titlebg-" + this.getUiCode());
        titleBg.width = 640;
        titleBg.height = 92;
        titleBg.setPosition(0, 0);
        this.addChildToContainer(titleBg);
        //奖池
        let rewardbtn = ComponentManager.getButton("acarcadeview_rewardbtn-" + this.getUiCode(), "", () => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACARCADEGAMEREWARDVIEW, { code: this.code, aid: this.aid });
        }, this);
        rewardbtn.setPosition(titleBg.x + 35, titleBg.y + titleBg.height + 40);
        this.addChildToContainer(rewardbtn);
        //记录
        let logBtn = ComponentManager.getButton("acarcadeview_logbtn-" + this.getUiCode(), "", () => {
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_ARCADEGETLOGS, { activeId: vo.aidAndCode });
        }, this);
        logBtn.setPosition(titleBg.x + titleBg.width - logBtn.width - 35, rewardbtn.y);
        this.addChildToContainer(logBtn);

        this._gameBM = BaseLoadBitmap.create("acarcadeview_machine-" + this.getUiCode());
        this._gameBM.width = 528;
        this._gameBM.height = 795;
        this._gameBM.setPosition(titleBg.x + titleBg.width / 2 - this._gameBM.width / 2, titleBg.y + titleBg.height + 65);

        this._pullrodUp = BaseLoadBitmap.create("acarcadeview_pullrodup-" + this.getUiCode());
        this._pullrodUp.setPosition(this._gameBM.x + 492, this._gameBM.y + 287);
        this.addChildToContainer(this._pullrodUp);

        this._pullrodDown = BaseLoadBitmap.create("acarcadeview_pullroddown-" + this.getUiCode());
        this._pullrodDown.setPosition(this._gameBM.x + 492, this._gameBM.y + 287);
        this.addChildToContainer(this._pullrodDown);

        this.addChildToContainer(this._gameBM);

        this._lightEffect1 = BaseLoadBitmap.create("acarcadeview_effect_light1");
        this._lightEffect1.setPosition(this._gameBM.x + 69, this._gameBM.y + 22);
        this.addChildToContainer(this._lightEffect1);
        this._lightEffect1.blendMode = egret.BlendMode.ADD;

        this._lightEffect2 = BaseLoadBitmap.create("acarcadeview_effect_light2");
        this._lightEffect2.setPosition(this._gameBM.x + 69, this._gameBM.y + 23);
        this.addChildToContainer(this._lightEffect2);
        this._lightEffect2.blendMode = egret.BlendMode.ADD;

        this._txtEffect = BaseLoadBitmap.create("acarcadeview_effect_txtlight");
        this._txtEffect.setPosition(this._gameBM.x + 89, this._gameBM.y + 44);
        this.addChildToContainer(this._txtEffect);
        this._txtEffect.alpha = 0;
        this._txtEffect.blendMode = egret.BlendMode.ADD;

        this._useBg = BaseLoadBitmap.create("acarcadeview_usebg-" + this.getUiCode());
        this._useBg.width = 259;
        this._useBg.height = 30;
        this._useBg.setPosition(this._gameBM.x + 135, this._gameBM.y + 260);
        this.addChildToContainer(this._useBg);

        this._useTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameViewUse-" + this.code, ["1"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._useTF.setPosition(this._useBg.x + this._useBg.width / 2 - this._useTF.width / 2, this._useBg.y + this._useBg.height / 2 - this._useTF.height / 2);
        this.addChildToContainer(this._useTF);

        this._machineContainer = new BaseDisplayObjectContainer();
        this._machineContainer.width = 384;
        this._machineContainer.height = 176;
        this._machineContainer.setPosition(this._gameBM.x + 72, this._gameBM.y + 305);
        this.addChildToContainer(this._machineContainer);
        this._machineContainer.mask = new egret.Rectangle(0, 0, 384, 176);


        let machineMask = BaseLoadBitmap.create("acarcadeview_machinemask-" + this.getUiCode());
        machineMask.setPosition(this._machineContainer.x, this._machineContainer.y);
        this.addChildToContainer(machineMask);

        this._farmelightEffect = BaseBitmap.create("acarcadeview_effect_farmelight");
        this._farmelightEffect.setPosition(this._machineContainer.x + this._machineContainer.width / 2 - this._farmelightEffect.width / 2, this._machineContainer.y + this._machineContainer.height / 2 - this._farmelightEffect.height / 2);
        this.addChildToContainer(this._farmelightEffect);
        this._farmelightEffect.blendMode = egret.BlendMode.ADD;
        this._farmelightEffect.alpha = 0;

        let fire = BaseBitmap.create("acarcadeview_fire1");

        this._fireEffect1 = ComponentManager.getCustomMovieClip("acarcadeview_fire", 10, 33);
        this._fireEffect1.anchorOffsetX = fire.width / 2;
        this._fireEffect1.anchorOffsetY = fire.height / 2;
        this._fireEffect1.blendMode = egret.BlendMode.ADD;
        this._fireEffect1.setPosition(this._machineContainer.x, this._machineContainer.y + 70);
        this.addChildToContainer(this._fireEffect1);
        this._fireEffect1.alpha = 0;
        // this._fireEffect1.playWithTime(-1);


        this._fireEffect2 = ComponentManager.getCustomMovieClip("acarcadeview_fire", 10, 33);
        this._fireEffect2.frameImages = this.getClipArr();
        this._fireEffect2.anchorOffsetX = fire.width / 2;
        this._fireEffect2.anchorOffsetY = fire.height / 2;
        this._fireEffect2.blendMode = egret.BlendMode.ADD;
        this._fireEffect2.setPosition(this._machineContainer.x + 128, this._machineContainer.y + 70);
        this.addChildToContainer(this._fireEffect2);
        this._fireEffect2.alpha = 0;
        // this._fireEffect2.playWithTime(-1);

        this._fireEffect3 = ComponentManager.getCustomMovieClip("acarcadeview_fire", 10, 33);
        this._fireEffect3.anchorOffsetX = fire.width / 2;
        this._fireEffect3.anchorOffsetY = fire.height / 2;
        this._fireEffect3.blendMode = egret.BlendMode.ADD;
        this._fireEffect3.setPosition(this._machineContainer.x + 256, this._machineContainer.y + 70);
        this.addChildToContainer(this._fireEffect3);
        this._fireEffect3.alpha = 0;
        // this._fireEffect3.playWithTime(-1);

        this._fireEffect4 = ComponentManager.getCustomMovieClip("acarcadeview_fire", 10, 33);
        this._fireEffect4.frameImages = this.getClipArr();
        this._fireEffect4.anchorOffsetX = fire.width / 2;
        this._fireEffect4.anchorOffsetY = fire.height / 2;
        this._fireEffect4.blendMode = egret.BlendMode.ADD;
        this._fireEffect4.setPosition(this._machineContainer.x + 384, this._machineContainer.y + 70);
        this.addChildToContainer(this._fireEffect4);
        this._fireEffect4.alpha = 0;
        // this._fireEffect4.playWithTime(-1);

        this.playCilp1();
        this.playCilp2();
        this.playCilp3();
        this.playCilp4();


        this._leftPoint = BaseBitmap.create("acarcadeview_point-" + this.getUiCode());
        this._leftPoint.anchorOffsetX = 13
        this._leftPoint.anchorOffsetY = 13
        this._leftPoint.setPosition(this._machineContainer.x, this._machineContainer.y + this._machineContainer.height / 2);
        this.addChildToContainer(this._leftPoint);

        this._rightPoint = BaseBitmap.create("acarcadeview_point-" + this.getUiCode());
        this._rightPoint.anchorOffsetX = 13
        this._rightPoint.anchorOffsetY = 13
        this._rightPoint.rotation = -180;
        this._rightPoint.setPosition(this._machineContainer.x + this._machineContainer.width, this._machineContainer.y + this._machineContainer.height / 2);
        this.addChildToContainer(this._rightPoint);


        this._numBg = BaseLoadBitmap.create("acarcadeview_numbg-" + this.getUiCode())
        this._numBg.width = 259;
        this._numBg.height = 30;
        this._numBg.setPosition(this._gameBM.x + 135, this._gameBM.y + 493);
        this.addChildToContainer(this._numBg);

        this._gameCoin = BaseLoadBitmap.create("acarcadeview_item_gamecoin-" + this.getUiCode());
        this._gameCoin.width = 100;
        this._gameCoin.height = 100;
        this._gameCoin.setScale(this._gameCoinScale);
        this._gameCoin.setPosition(this._numBg.x + this._numBg.width / 2 - this._gameCoin.width * this._gameCoinScale, this._numBg.y + this._numBg.height / 2 - this._gameCoin.height / 2 * this._gameCoinScale);
        this.addChildToContainer(this._gameCoin);

        this._numTF = ComponentManager.getTextField(String(vo.getCoin()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._numTF.setPosition(this._numBg.x + this._numBg.width / 2, this._numBg.y + this._numBg.height / 2 - this._numTF.height / 2)
        this.addChildToContainer(this._numTF);

        this._leftBtn = ComponentManager.getButton("acarcadeview_leftbtn-" + this.getUiCode(), "", () => {
            if (this._isPlayAni) {
                return;
            }
            let v1 = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);

            if (v1.checkIsInEndShowTime() || (!v1.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (v1.getCoin() <= 0 && vo.isFree() == false) {
                // App.CommonUtil.showTip(LanguageManager.getlocal("acArcadeGameRewardViewNotCoin-" + this.code));
                let msg = LanguageManager.getlocal("acArcadeGameViewTipMsg-" + this.code);
                let title = "itemUseConstPopupViewTitle";
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "acArcadeGameViewGoCharge-" + this.code, handler: this, callback: () => {
                        ViewController.getInstance().openView(ViewConst.COMMON.ACARCADERECHARGEVIEW, { code: this.code, aid: this.aid });
                    }
                });
                // App.CommonUtil.showTip(LanguageManager.getlocal("acLiangBiographyView_NoreviewTip-" + this.code));
                return;
            }
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, { activeId: vo.aidAndCode, isBatch: 0 });
            // this.movePos();

        }, this);
        this._leftBtn.setPosition(this._gameBM.x + 51, this._gameBM.y + 554);
        this.addChildToContainer(this._leftBtn);

        this._leftBtnTxt = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameViewUseOne-" + this.code), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
        this._leftBtnTxt.setPosition(this._leftBtn.x + this._leftBtn.width / 2 - this._leftBtnTxt.width / 2, this._leftBtn.y + this._leftBtn.height / 2 - this._leftBtnTxt.height / 2 - 10);
        this.addChildToContainer(this._leftBtnTxt);

        this._rightBtn = ComponentManager.getButton("acarcadeview_rightbtn-" + this.getUiCode(), "", () => {
            if (this._isPlayAni) {
                return;
            }
            let v1 = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);

            if (v1.checkIsInEndShowTime() || (!v1.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (v1.getCoin() < 2) {
                // App.CommonUtil.showTip(LanguageManager.getlocal("acArcadeGameRewardViewNotCoin-" + this.code));
                let msg = LanguageManager.getlocal("acArcadeGameViewTipMsg-" + this.code);
                let title = "itemUseConstPopupViewTitle";
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "acArcadeGameViewGoCharge-" + this.code, handler: this, callback: () => {
                        ViewController.getInstance().openView(ViewConst.COMMON.ACARCADERECHARGEVIEW, { code: this.code, aid: this.aid });
                    }
                });
                return;
            }
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, { activeId: vo.aidAndCode, isBatch: 1 });
            // this.movePos();
        }, this);
        this._rightBtn.setPosition(this._gameBM.x + 264, this._gameBM.y + 554);
        this.addChildToContainer(this._rightBtn);

        this._rightBtnTxt = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameViewUseTen-" + this.code), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
        this._rightBtnTxt.setPosition(this._rightBtn.x + this._rightBtn.width / 2 - this._rightBtnTxt.width / 2, this._rightBtn.y + this._rightBtn.height / 2 - this._rightBtnTxt.height / 2 - 10);
        this.addChildToContainer(this._rightBtnTxt);

        let colorribbonBM = BaseLoadBitmap.create("acarcadeview_colorribbon-" + this.getUiCode());
        colorribbonBM.setPosition(bg.x, this._gameBM.y + 485);
        this.addChildToContainer(colorribbonBM);







        this.initRewardPoolList();
        this.playLightAni(360);
        this.refreshPullrod(false);
        // this.movePos();
        this.refreshView();
    }

    /**初始化奖池 */
    private initRewardPoolList() {
        let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

        let rewards = cfg.poolListItemCfg[0].rewardPoolList();
        this._rewardsVoList = GameData.formatRewardItem(rewards);
        this._posList1 = [];
        this._containerList1 = [];
        this._posList2 = [];
        this._containerList2 = [];
        this._posList3 = [];
        this._containerList3 = [];
        //第一条
        for (let i = 0; i < this._rewardsVoList.length; i++) {
            let rewardVo = this._rewardsVoList[i];
            let rewardContainer = this.getRewardContainer(rewardVo.type + "_" + rewardVo.id + "_" + rewardVo.num + "1", rewardVo);
            rewardContainer.setPosition(10 + rewardContainer.width / 2, this._machineContainer.height / 2 - (i - 2) * (rewardContainer.height + 22));
            let itemlightEffect = rewardContainer.getChildByName("itemlight");
            if (itemlightEffect) {
                egret.Tween.removeTweens(itemlightEffect);
                itemlightEffect.alpha = 0;
            }
            this._posList1.push({ x: rewardContainer.x, y: rewardContainer.y, visible: rewardContainer.visible });
            this._containerList1.push(rewardContainer);
            this._index1++;
            if (i == 0) {
                this._startPosY1 = rewardContainer.y;
            }
            if (i == 2) {
                this._endPosY1 = rewardContainer.y;
            }
        }
        //第二条
        for (let i = 0; i < this._rewardsVoList.length; i++) {
            let rewardVo = this._rewardsVoList[i];
            let rewardContainer = this.getRewardContainer(rewardVo.type + "_" + rewardVo.id + "_" + rewardVo.num + "2", rewardVo);
            rewardContainer.setPosition(this._machineContainer.width / 2, this._machineContainer.height / 2 - (i - 2) * (rewardContainer.height + 22));
            let itemlightEffect = rewardContainer.getChildByName("itemlight");
            if (itemlightEffect) {
                egret.Tween.removeTweens(itemlightEffect);
                itemlightEffect.alpha = 0;
            }
            this._posList2.push({ x: rewardContainer.x, y: rewardContainer.y, visible: rewardContainer.visible });
            this._containerList2.push(rewardContainer);
            if (i == 0) {
                this._startPosY2 = rewardContainer.y;
            }
            if (i == 2) {
                this._endPosY2 = rewardContainer.y;
            }
        }
        //第三条
        for (let i = 0; i < this._rewardsVoList.length; i++) {
            let rewardVo = this._rewardsVoList[i];
            let rewardContainer = this.getRewardContainer(rewardVo.type + "_" + rewardVo.id + "_" + rewardVo.num + "3", rewardVo);
            rewardContainer.setPosition(this._machineContainer.width - rewardContainer.width / 2 - 10, this._machineContainer.height / 2 - (i - 2) * (rewardContainer.height + 22));
            let itemlightEffect = rewardContainer.getChildByName("itemlight");
            if (itemlightEffect) {
                egret.Tween.removeTweens(itemlightEffect);
                itemlightEffect.alpha = 0;
            }
            this._posList3.push({ x: rewardContainer.x, y: rewardContainer.y, visible: rewardContainer.visible });
            this._containerList3.push(rewardContainer);
            if (i == 0) {
                this._startPosY3 = rewardContainer.y;
            }
            if (i == 2) {
                this._endPosY3 = rewardContainer.y;
            }
        }



    }

    private refreshView() {
        let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        this._numTF.text = "X" + String(vo.getCoin());
        this._useTF.text = LanguageManager.getlocal("acArcadeGameViewUse-" + this.code, [String(vo.lotteryValue())]);
        if (vo.isFree()) {
            this._leftBtnTxt.text = LanguageManager.getlocal("acArcadeGameViewUseFree-" + this.code);
        }
        else {
            this._leftBtnTxt.text = LanguageManager.getlocal("acArcadeGameViewUseOne-" + this.code);
        }
        this._leftBtnTxt.setPosition(this._leftBtn.x + this._leftBtn.width / 2 - this._leftBtnTxt.width / 2, this._leftBtn.y + this._leftBtn.height / 2 - this._leftBtnTxt.height / 2 - 10);

        let num = 1;
        if (vo.getCoin() >= 10) {
            num = 10;
        }
        else if (vo.getCoin() < 10 && vo.getCoin() >= 2) {
            num = vo.getCoin();
        }
        else {
            num = 2;
        }
        this._rightBtnTxt.text = LanguageManager.getlocal("acArcadeGameViewUseTen-" + this.code, [String(num)]);
        this._rightBtnTxt.setPosition(this._rightBtn.x + this._rightBtn.width / 2 - this._rightBtnTxt.width / 2, this._rightBtn.y + this._rightBtn.height / 2 - this._rightBtnTxt.height / 2 - 10);

    }


    private refreshPullrod(isDown: boolean) {
        this._pullrodUp.setVisible(!isDown);
        this._pullrodDown.setVisible(isDown);
    }




    private lotteryHandle(event: egret.Event) {
        if (event.data.ret) {
            this._handlerData = event.data.data.data;
            this._lastId1 = this._handlerData.shootSet[0] + "1";
            this._lastId2 = this._handlerData.shootSet[1] + "2";
            this._lastId3 = this._handlerData.shootSet[2] + "3";
            this._isBatch = this._handlerData.isBatch == 0 ? false : true;
            this.movePos();

        }
    }

    private logsHandle(event: egret.Event) {
        if (event.data.ret) {
            let logs = event.data.data.data.logs;
            ViewController.getInstance().openView(ViewConst.POPUP.ACARCADEGAMELOGVIEW, { logs: logs, aid: this.aid, code: this.code });
        }
    }





    private movePos() {
        if (this._isPlayAni) {
            return;
        }
        this._isPlayAni = true;
        this.refreshPullrod(true);
        let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);

        // let index1 = Math.floor((Math.random() * cfg.poolListItemCfg[0].prizePool.length));
        // this._lastId1 = cfg.poolListItemCfg[0].prizePool[index1][0] + "1";

        // let index2 = Math.floor((Math.random() * cfg.poolListItemCfg[0].prizePool.length));
        // this._lastId2 = cfg.poolListItemCfg[0].prizePool[index2][0] + "2";

        // let index3 = Math.floor((Math.random() * cfg.poolListItemCfg[0].prizePool.length));
        // this._lastId3 = cfg.poolListItemCfg[0].prizePool[index3][0] + "3";
        this._farmelightEffect.alpha = 1;

        if (this._isBatch) {
            this._fireEffect1.alpha = 1;
            this._fireEffect2.alpha = 1;
            this._fireEffect3.alpha = 1;
            this._fireEffect4.alpha = 1;
        }


        let time = 20;

        this._isStop1 = false;
        this._stopIndex1 = 0;
        this._slideIndex1 = this._offestId1;

        // this._isStop1 = true;
        this.movePos1(time);
        this._isStop2 = false;
        this._stopIndex2 = 0;
        this._slideIndex2 = this._offestId2;
        this.movePos2(time);
        this._isStop3 = false;
        this._stopIndex3 = 0;
        this._slideIndex3 = this._offestId3;
        this.movePos3(time);




        this.playPointAni1();
        this.playPointAni2();
    }
    /**
    * 位置移动
    */
    private movePos1(time: number) {
        this._slideIndex1++;
        // console.log("this._slideIndex1:   " + this._slideIndex1);
        let lastid = this._lastId1;

        if (this._slideIndex1 >= (this._rewardsVoList.length * 2 + this._offestId1) && this._isStop1 == false) {
            for (let i = 0; i < this._containerList1.length; i++) {
                let rewardContainer = this._containerList1[i];
                if (rewardContainer.y == this._endPosY1 && rewardContainer.name == lastid) {
                    // this._container1 = rewardContainer;
                    this._isStop1 = true;
                    // console.log("this._slideIndex1:   " + this._slideIndex1);
                    break;
                }
            }
        }
        if (this._isStop1) {
            this._stopIndex1++;
        }
        if (this._stopIndex1 > (this._rewardsVoList.length * 2)) {
            this._offestId1 = (this._slideIndex1 % this._rewardsVoList.length - 1 + this._rewardsVoList.length) % this._rewardsVoList.length;
            console.log("this._lastId1   " + this._lastId1);
            // console.log("this._offestId1:   " + this._offestId1);
            // console.log("this._slideIndex1:   " + this._slideIndex1);
            // this._isPlayAni = false;
            if (this._isBatch) {
                this.playStopClip1();
            }
            return;
        }
        for (let i = 0; i < this._posList1.length; i++) {
            let movePos = this._posList1[(i - (this._slideIndex1 % this._posList1.length) + this._posList1.length) % this._posList1.length];
            let timetmp = time;
            if (this._containerList1[i].y == this._startPosY1) {
                let floorReward = this._rewardsVoList[this._index1 % this._rewardsVoList.length];
                this._containerList1[i] = this.getRewardContainer(floorReward.type + "_" + floorReward.id + "_" + floorReward.num + "1", floorReward);
                let itemlightEffect = this._containerList1[i].getChildByName("itemlight");
                if (itemlightEffect) {
                    egret.Tween.removeTweens(itemlightEffect);
                    itemlightEffect.alpha = 0;
                }
                this._containerList1[i].visible = false;

            }
            egret.Tween.get(this._containerList1[i]).to({ x: movePos.x, y: movePos.y, visible: movePos.visible }, time).call(() => {
                egret.Tween.removeTweens(this._containerList1[i]);
                if (i == this._posList1.length - 1) {
                    egret.Tween.get(this._containerList1[i]).wait(0).call(() => {
                        egret.Tween.removeTweens(this._containerList1[i]);
                        this._index1++
                        if (this._isStop1) {
                            // this.movePos1(16 + (this._stopIndex1 * 0.15) * (this._stopIndex1 * 0.15) * (2 + (this._stopIndex1 * 0.15)));
                            this.movePos1(20 + (this._stopIndex1 * 0.05) * (this._stopIndex1 * 0.04) * (52 * this._stopIndex1));
                        }
                        else {
                            this.movePos1(time);
                        }
                    }, this)
                }
            }, this);
        }
    }
    /**
    * 位置移动
    */
    private movePos2(time: number) {

        this._slideIndex2++;
        let lastid = this._lastId2;
        if (this._isStop2) {
            this._stopIndex2++;
        }
        if (this._slideIndex2 >= (this._rewardsVoList.length * 3 + this._offestId2) && this._isStop2 == false) {
            for (let i = 0; i < this._containerList2.length; i++) {
                if (this._containerList2[i].y == this._endPosY2 && this._containerList2[i].name == lastid) {
                    // this._container2 = this._containerList2[i];
                    if (this._isBatch) {
                        this.playStopClip2();
                    }
                    this._isStop2 = true;
                }
            }
        }

        if (this._stopIndex2 == (this._rewardsVoList.length * 2)) {
            this._offestId2 = (this._slideIndex2 % this._rewardsVoList.length - 1 + this._rewardsVoList.length) % this._rewardsVoList.length;
            return;
        }
        for (let i = 0; i < this._posList2.length; i++) {
            let movePos = this._posList2[(i - (this._slideIndex2 % this._posList2.length) + this._posList2.length) % this._posList2.length];
            let timetmp = time;
            if (this._containerList2[i].y == this._startPosY2) {
                let floorReward = this._rewardsVoList[this._index2 % this._rewardsVoList.length];
                this._containerList2[i] = this.getRewardContainer(floorReward.type + "_" + floorReward.id + "_" + floorReward.num + "2", floorReward);
                let itemlightEffect = this._containerList1[i].getChildByName("itemlight");
                if (itemlightEffect) {
                    egret.Tween.removeTweens(itemlightEffect);
                    itemlightEffect.alpha = 0;
                }
                this._containerList2[i].visible = false;

            }

            egret.Tween.get(this._containerList2[i]).to({ x: movePos.x, y: movePos.y, visible: movePos.visible }, time).call(() => {
                egret.Tween.removeTweens(this._containerList2[i]);
                if (i == this._posList2.length - 1) {
                    egret.Tween.get(this._containerList2[i]).wait(0).call(() => {
                        egret.Tween.removeTweens(this._containerList2[i]);
                        this._index2++
                        if (this._isStop2) {
                            // this.movePos2(time + 2);
                            this.movePos2(20 + (this._stopIndex2 * 0.05) * (this._stopIndex2 * 0.04) * (52 * this._stopIndex2));
                        }
                        else {
                            this.movePos2(time);
                        }
                    }, this)
                }
            }, this);
        }
    }
    /**
    * 位置移动
    */
    private movePos3(time: number) {
        this._slideIndex3++;
        let lastid = this._lastId3;
        if (this._isStop3) {
            this._stopIndex3++;
        }

        if (this._slideIndex3 >= (this._rewardsVoList.length * 4 + this._offestId3) && this._isStop3 == false) {
            for (let i = 0; i < this._containerList3.length; i++) {
                if (this._containerList3[i].y == this._endPosY3 && this._containerList3[i].name == lastid) {
                    // this._container3 = this._containerList3[i];
                    this._isStop3 = true;
                }
            }
        }

        if (this._stopIndex3 == (this._rewardsVoList.length * 2)) {
            this._offestId3 = (this._slideIndex3 % this._rewardsVoList.length - 1 + this._rewardsVoList.length) % this._rewardsVoList.length;
            // this._isPlayAni = false;
            if (this._isBatch) {
                this.playStopClip3();
            }
            else {
                this.playLotteryEndAni();
            }

            return;
        }

        for (let i = 0; i < this._posList3.length; i++) {
            let movePos = this._posList3[(i - (this._slideIndex3 % this._posList3.length) + this._posList3.length) % this._posList3.length];
            let timetmp = time;
            if (this._containerList3[i].y == this._startPosY3) {
                let floorReward = this._rewardsVoList[this._index3 % this._rewardsVoList.length];
                this._containerList3[i] = this.getRewardContainer(floorReward.type + "_" + floorReward.id + "_" + floorReward.num + "3", floorReward);
                let itemlightEffect = this._containerList1[i].getChildByName("itemlight");
                if (itemlightEffect) {
                    egret.Tween.removeTweens(itemlightEffect);
                    itemlightEffect.alpha = 0;
                }
                this._containerList3[i].visible = false;

            }
            egret.Tween.get(this._containerList3[i]).to({ x: movePos.x, y: movePos.y, visible: movePos.visible }, time).call(() => {
                egret.Tween.removeTweens(this._containerList3[i]);
                if (i == this._posList3.length - 1) {
                    egret.Tween.get(this._containerList3[i]).wait(0).call(() => {
                        egret.Tween.removeTweens(this._containerList3[i]);
                        this._index3++
                        if (this._isStop3) {
                            // this.movePos3(time + 2);
                            this.movePos3(20 + (this._stopIndex3 * 0.05) * (this._stopIndex3 * 0.04) * (52 * this._stopIndex3));
                        }
                        else {
                            this.movePos3(time);
                        }
                    }, this)
                }
            }, this);
        }
    }
    /**对象池操作 */
    private getRewardContainer(id: string, rewardVo: RewardItemVo): BaseDisplayObjectContainer {
        if (this._rewardsPool[id]) {
            return this._rewardsPool[id];
        }
        else {
            let rewardContainer = GameData.getItemIcon(rewardVo);
            rewardContainer.name = id;
            rewardContainer.anchorOffsetX = rewardContainer.width / 2;
            rewardContainer.anchorOffsetY = rewardContainer.height / 2;
            this._machineContainer.addChild(rewardContainer);
            let numLb = rewardContainer.getChildByName("numLb");
            let magnifierIcon = rewardContainer.getChildByName("magnifierIcon");
            if (numLb) {
                numLb.visible = false;
            }
            if (magnifierIcon) {
                magnifierIcon.visible = false;
            }
            if (rewardContainer.getChildByName("numbg"))
            {
                rewardContainer.getChildByName("numbg").visible = false;
            }
            let itemlightEffect = BaseBitmap.create("acarcadeview_effect_itemlight");
            itemlightEffect.anchorOffsetX = itemlightEffect.width / 2;
            itemlightEffect.anchorOffsetY = itemlightEffect.height / 2;
            itemlightEffect.setPosition(rewardContainer.width / 2, rewardContainer.height / 2);
            rewardContainer.addChild(itemlightEffect);
            itemlightEffect.name = "itemlight";
            itemlightEffect.alpha = 0;
            itemlightEffect.blendMode = egret.BlendMode.ADD;
            this._rewardsPool[id] = rewardContainer;
            return this._rewardsPool[id];
        }
    }
    /**灯光的动画 */
    private playLightAni(time: number) {
        egret.Tween.removeTweens(this._lightEffect1);
        egret.Tween.removeTweens(this._lightEffect2);
        this._lightEffect1.visible = true;
        this._lightEffect2.visible = false;
        egret.Tween.get(this._lightEffect1, { loop: true }).wait(time).call(() => {
            this._lightEffect1.visible = false;
            this._lightEffect2.visible = true;
        }, this).wait(time).call(() => {
            this._lightEffect1.visible = true;
            this._lightEffect2.visible = false;
        }, this);
    }

    private playLotteryEndAni() {

        this.playLightAni(160);
        if (this._isBatch) {
            this._lihuaIndex = 0;
            this.showLihua();
        }
        egret.Tween.removeTweens(this._txtEffect);
        this._txtEffect.alpha = 0;
        let loopNumber = 0;
        egret.Tween.get(this._txtEffect, { loop: true }).to({ alpha: 1 }, 60).wait(100).to({ alpha: 0 }, 60).call(() => {
            loopNumber++;
            if (loopNumber >= 5) {
                this._txtEffect.alpha = 0;
                egret.Tween.removeTweens(this._txtEffect);
                this.playLightAni(360);
                this.refreshPullrod(false);

                let otherRewards = "1017_0_" + this._handlerData.moonCoin + "_" + this.code
                ViewController.getInstance().openView(ViewConst.POPUP.ACARCADEGAMEGETREWARDPOPUPVIEW, {
                    rewards: this._handlerData.rewards, otherRewards: otherRewards, isPlayAni: true, buffers: this._handlerData.buffers, code: this.code, aid: this.aid, callback: () => {
                        this._isPlayAni = false;
                    }, handler: this
                });
            }
        }, this);

        let loopNum = 0;
        this._farmelightEffect.alpha = 0;
        egret.Tween.removeTweens(this._farmelightEffect);
        egret.Tween.get(this._farmelightEffect, { loop: true }).to({ alpha: 1 }, 60).wait(100).to({ alpha: 0 }, 60).call(() => {
            loopNum++;
            if (loopNum >= 5) {
                this._farmelightEffect.alpha = 0;
                egret.Tween.removeTweens(this._farmelightEffect);
            }
        }, this);

        this._container1 = <BaseDisplayObjectContainer>this._machineContainer.getChildByName(this._lastId1);
        this._container2 = <BaseDisplayObjectContainer>this._machineContainer.getChildByName(this._lastId2);
        this._container3 = <BaseDisplayObjectContainer>this._machineContainer.getChildByName(this._lastId3);

        if (this._container1) {
            let itemlightEffect = this._container1.getChildByName("itemlight");
            if (itemlightEffect) {
                itemlightEffect.alpha = 1;
                egret.Tween.removeTweens(itemlightEffect);
                let effectLoopNumber = 0;
                egret.Tween.get(itemlightEffect, { loop: true }).to({ alpha: 1 }, 60).wait(100).to({ alpha: 0 }, 60).call(() => {
                    effectLoopNumber++;
                    if (effectLoopNumber >= 5) {
                        itemlightEffect.alpha = 0;
                        egret.Tween.removeTweens(itemlightEffect);
                    }
                }, this);
            }
        }

        if (this._container2) {
            let itemlightEffect = this._container2.getChildByName("itemlight");
            if (itemlightEffect) {
                itemlightEffect.alpha = 0;
                egret.Tween.removeTweens(itemlightEffect);
                let effectLoopNumber = 0;
                egret.Tween.get(itemlightEffect, { loop: true }).to({ alpha: 1 }, 60).wait(100).to({ alpha: 0 }, 60).call(() => {
                    effectLoopNumber++;
                    if (effectLoopNumber >= 5) {
                        itemlightEffect.alpha = 0;
                        egret.Tween.removeTweens(itemlightEffect);
                    }
                }, this);
            }
        }

        if (this._container3) {
            let itemlightEffect = this._container3.getChildByName("itemlight");
            if (itemlightEffect) {
                itemlightEffect.alpha = 0;
                egret.Tween.removeTweens(itemlightEffect);
                let effectLoopNumber = 0;
                egret.Tween.get(itemlightEffect, { loop: true }).to({ alpha: 1 }, 60).wait(100).to({ alpha: 0 }, 60).call(() => {
                    effectLoopNumber++;
                    if (effectLoopNumber >= 5) {
                        itemlightEffect.alpha = 0;
                        egret.Tween.removeTweens(itemlightEffect);
                    }
                }, this);
            }
        }
    }

    /**指针动画1 */
    private playPointAni1() {
        this._leftPoint.rotation = 0;
        egret.Tween.removeTweens(this._leftPoint);
        let time = 75;
        let loopTime = 0;
        egret.Tween.get(this._leftPoint, { loop: true }).to({ rotation: -90 }, time).to({ rotation: 0 }, time).to({ rotation: 90 }, time).to({ rotation: 0 }, time).call(() => {
            loopTime++;
            if (loopTime > 8) {
                this._leftPoint.rotation = 0;
                egret.Tween.removeTweens(this._leftPoint);
            }
        }, this);
    }

    /**指针动画1 */
    private playPointAni2() {
        this._rightPoint.rotation = -180;
        egret.Tween.removeTweens(this._rightPoint);
        let time = 75;
        let loopTime = 0;
        egret.Tween.get(this._rightPoint, { loop: true }).to({ rotation: -270 }, time).to({ rotation: -180 }, time).to({ rotation: -90 }, time).to({ rotation: -180 }, time).call(() => {
            loopTime++;
            if (loopTime > 11) {
                this._rightPoint.rotation = -180;
                egret.Tween.removeTweens(this._rightPoint);
            }
        }, this);
    }

    private playCilp1() {
        this._fireEffect1.playWithTime(2)
        this._fireEffect1.setEndCallBack(() => {
            this._fireEffect1.rotation = (this._fireEffect1.rotation + 180) % 360;

            if (this._fireEffect1.rotation == 0) {
                this._fireEffect1.setPosition(this._machineContainer.x, this._machineContainer.y + 70);
            }
            else {
                this._fireEffect1.setPosition(this._machineContainer.x, this._machineContainer.y + 100);
            }
            this.playCilp1();
        }, this)
    }

    private playCilp2() {
        this._fireEffect2.playWithTime(2)
        this._fireEffect2.setEndCallBack(() => {
            this._fireEffect2.rotation = (this._fireEffect2.rotation + 180) % 360;

            if (this._fireEffect2.rotation == 0) {
                this._fireEffect2.setPosition(this._machineContainer.x + 128, this._machineContainer.y + 70);
            }
            else {
                this._fireEffect2.setPosition(this._machineContainer.x + 128, this._machineContainer.y + 100);
            }
            this.playCilp2();
        }, this)
    }
    private playCilp3() {
        this._fireEffect3.playWithTime(2)
        this._fireEffect3.setEndCallBack(() => {
            this._fireEffect3.rotation = (this._fireEffect3.rotation + 180) % 360;

            if (this._fireEffect3.rotation == 0) {
                this._fireEffect3.setPosition(this._machineContainer.x + 256, this._machineContainer.y + 70);
            }
            else {
                this._fireEffect3.setPosition(this._machineContainer.x + 256, this._machineContainer.y + 100);
            }
            this.playCilp3();
        }, this)
    }
    private playCilp4() {
        this._fireEffect4.playWithTime(2)
        this._fireEffect4.setEndCallBack(() => {
            this._fireEffect4.rotation = (this._fireEffect4.rotation + 180) % 360;

            if (this._fireEffect4.rotation == 0) {
                this._fireEffect4.setPosition(this._machineContainer.x + 384, this._machineContainer.y + 70);
            }
            else {
                this._fireEffect4.setPosition(this._machineContainer.x + 384, this._machineContainer.y + 100);
            }
            this.playCilp4();
        }, this)
    }

    private playStopClip1() {
        egret.Tween.removeTweens(this._fireEffect1);
        this._fireEffect1.alpha = 1;
        egret.Tween.get(this._fireEffect1).to({ alpha: 0 }, 500).call(() => {
            egret.Tween.removeTweens(this._fireEffect1);
            this._fireEffect1.alpha = 0;
        }, this);

        egret.Tween.removeTweens(this._fireEffect2);
        this._fireEffect2.alpha = 1;
        egret.Tween.get(this._fireEffect2).to({ alpha: 0 }, 500).call(() => {
            egret.Tween.removeTweens(this._fireEffect2);
            this._fireEffect2.alpha = 0;
        }, this);
    }
    private playStopClip2() {
        egret.Tween.removeTweens(this._fireEffect3);
        this._fireEffect3.alpha = 1;
        egret.Tween.get(this._fireEffect3).to({ alpha: 0 }, 500).call(() => {
            egret.Tween.removeTweens(this._fireEffect3);
            this._fireEffect3.alpha = 0;
        }, this);
    }

    private playStopClip3() {
        egret.Tween.removeTweens(this._fireEffect4);
        this._fireEffect4.alpha = 1;
        egret.Tween.get(this._fireEffect4).to({ alpha: 0 }, 500).call(() => {
            egret.Tween.removeTweens(this._fireEffect4);
            this._fireEffect4.alpha = 0;
            this.playLotteryEndAni();
        }, this);
    }
    private _lihuaIndex: number = 0;

    private showLihua(): void {

        let index = Math.floor(Math.random() * 6) + 1;
        let item = this._lihuaCfg[index];
        if (item) {

            let depth = this.container.getChildIndex(this._bg);
            let lihuaclip = ComponentManager.getCustomMovieClip(`lihua_${item.color}000`, 9, 115);
            lihuaclip.setScale(item.scale);
            lihuaclip.x = this._bg.x + item.pos[0];
            lihuaclip.y = this._bg.y + item.pos[1];

            this.container.addChildAt(lihuaclip, depth + 1);
            lihuaclip.playWithTime(1);
            lihuaclip.setEndCallBack(() => {
                this._lihuaIndex++;
                this.container.removeChild(lihuaclip);
                if (this._lihuaIndex >= 6) {
                    this._lihuaIndex = 0
                    return;
                }
                this.showLihua();

            }, this);
        }
        else {
            this.showLihua();
        }
    }


    /**真动画数组 */
    private getClipArr(): string[] {
        return [
            "acarcadeview_fire5",
            "acarcadeview_fire6",
            "acarcadeview_fire7",
            "acarcadeview_fire8",
            "acarcadeview_fire9",
            "acarcadeview_fire10",
            "acarcadeview_fire1",
            "acarcadeview_fire2",
            "acarcadeview_fire3",
            "acarcadeview_fire4",
            "acarcadeview_fire5",
        ];
    }

    protected getBgName(): string {
        return null;
    }

    protected getTitleBgName(): string {
        return null;
    }
    protected getTitleStr(): string {
        return null;
    }
    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "acarcadeview_leftbtn-" + this.getUiCode(), "acarcadeview_leftbtn-" + this.getUiCode() + "_down",
            "acarcadeview_rightbtn-" + this.getUiCode(), "acarcadeview_rightbtn-" + this.getUiCode() + "_down",
            "acarcadeview_effect_itemlight", "acarcadeview_effect_farmelight", "acarcadeview_fire"

        ]);
    }
    protected getUiCode(): string {
        if (this.param.data.code == "2") {
            return "1";
        }
        return this.param.data.code;
    }

    protected getProbablyInfo(): string {
        return "";
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, this.lotteryHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADEGETLOGS, this.logsHandle, this);
        this._lightEffect1 = null;
        this._lightEffect2 = null;
        this._gameBM = null;
        this._useBg = null;
        this._useTF = null;
        this._machineContainer = null;
        this._numBg = null;
        this._numTF = null;
        this._pullrodUp = null;
        this._pullrodDown = null;
        this._leftBtn = null;
        this._rightBtn = null;
        this._leftBtnTxt = null;
        this._rightBtnTxt = null;
        this.code = null;
        this.aid = null;
        this._gameCoin = null;
        this._leftPoint = null;
        this._rightPoint = null;
        this._gameCoinScale = 0.27;
        this._txtEffect = null;
        this._rewardsPool = {};
        this._posList1 = [];
        this._posList2 = [];
        this._posList3 = [];
        this._containerList1 = [];
        this._containerList2 = [];
        this._containerList3 = [];
        this._startPosY1 = 0;
        this._startPosY2 = 0;
        this._startPosY3 = 0;
        this._rewardsVoList = null;
        this._index1 = 0;
        this._slideIndex1 = 0;
        this._index2 = 0;
        this._slideIndex2 = 0;
        this._index3 = 0;
        this._slideIndex3 = 0;
        this._endPosY1 = 0;
        this._isStop1 = false;
        this._stopIndex1 = 0;
        this._endPosY2 = 0;
        this._isStop2 = false;
        this._stopIndex2 = 0;
        this._endPosY3 = 0;
        this._isStop3 = false;
        this._stopIndex3 = 0;
        this._lastId1 = null;
        this._lastId2 = null;
        this._lastId3 = null;
        this._isPlayAni = false;
        this._offestId1 = 0;
        this._offestId2 = 0;
        this._offestId3 = 0;
        this._container1 = null;
        this._container2 = null;
        this._container3 = null;
        this._handlerData = null;
        this._fireEffect1 = null;
        this._fireEffect2 = null;
        this._fireEffect3 = null;
        this._fireEffect4 = null;
        this._isBatch = false;
        this._bg = null;
        super.dispose();
    }
}
