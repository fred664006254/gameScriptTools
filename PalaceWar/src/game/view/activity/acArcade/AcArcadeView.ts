/**
  * 电玩大本营活动
  * @author 张朝阳
  * date 2019/6/6
  * @class AcArcadeView
  */
class AcArcadeView extends AcCommonView {

    private _countDownTime: BaseTextField = null;
    private _countDownTimeBg: BaseBitmap = null;

    private bubbleTip: AcBubbleTip = null;

    private redDotObj: Object = {};

    private brandObj: Object = {};




    private buildingCfg() {
        return [
            { buildId: "charge", buildingPic: "acarcadeview_npc_charge-" + this.getUiCode(), buildPos: { x: 70, y: 620 }, buildScale: 4, brandPic: "acarcadeview_brands_charge-" + this.getUiCode(), brandPos: { x: 237 - 67, y: 939 + 10 } },
            { buildId: "claim", buildingPic: "acarcadeview_npc_claim-" + this.getUiCode(), buildPos: { x: 529, y: 516 + 10 }, buildScale: 4, brandPic: "acarcadeview_brands_claim-" + this.getUiCode(), brandPos: { x: 497, y: 471 + 10 } },
            { buildId: "game", buildingPic: "acarcadeview_npc_game-" + this.getUiCode(), buildPos: { x: 309, y: 444 + 20 }, buildScale: 4, brandPic: "acarcadeview_brands_game-" + this.getUiCode(), brandPos: { x: 305, y: 416 + 20 + 10 } },
            { buildId: "task", buildingPic: "acarcadeview_npc_task-" + this.getUiCode(), buildPos: { x: 0, y: 594 + 10 }, buildScale: 4, brandPic: "acarcadeview_brands_task-" + this.getUiCode(), brandPos: { x: 25, y: 547 + 10 } },
        ];
    }

    private _bg: BaseLoadBitmap = null;

    private _isPlay = false;
    public constructor() {
        super();
    }

    public initView() {
        let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this)

        let bg = BaseLoadBitmap.create("acarcadeview_bg-" + this.getUiCode());
        bg.width = 640;
        bg.height = 1136;
        bg.anchorOffsetX = bg.width / 2;
        bg.anchorOffsetY = bg.height / 2;
        bg.setPosition(bg.width / 2, GameConfig.stageHeigth - bg.height / 2);
        this.addChildToContainer(bg);
        this._bg = bg;



        let buildingCfg = this.buildingCfg();
        for (let key in buildingCfg) {
            let item = buildingCfg[key];
            let buildPic = BaseLoadBitmap.create(item.buildingPic);
            buildPic.setScale(item.buildScale);
            buildPic.setPosition(item.buildPos.x, item.buildPos.y + bg.y - bg.height / 2);
            buildPic.name = item.buildId;
            this.addChildToContainer(buildPic);
            buildPic.addTouch(this.onNPCTouchHandler, this, null, true);
            buildPic.alpha = 0;

            let brandPic = BaseLoadBitmap.create(item.brandPic, null, {
                callback: () => {
                    let dot = BaseBitmap.create(`public_dot2`);
                    dot.setScale(0.88);
                    dot.x = brandPic.x + brandPic.width - 22;
                    dot.y = brandPic.y - 5;
                    this.addChildToContainer(dot);
                    dot.setVisible(false);
                    this.redDotObj[item.buildId] = dot;
                    this.refreshRedDot();
                }, callbackThisObj: this, callbackParams: null
            });
            brandPic.setPosition(item.brandPos.x, item.brandPos.y + bg.y - bg.height / 2);
            brandPic.name = item.buildId;
            brandPic.addTouch(this.onNPCTouchHandler, this, null, true);
            this.addChildToContainer(brandPic);
            this.brandObj[item.buildId] = brandPic;
        }

        let titleBg = BaseLoadBitmap.create("acarcadeview_titlebg-" + this.getUiCode());
        titleBg.width = 640;
        titleBg.height = 92;
        titleBg.setPosition(0, 0);

        let topBg = BaseLoadBitmap.create("acarcadeview_topbg-" + this.code);
        topBg.width = 640;
        topBg.height = 174;
        topBg.setPosition(titleBg.x, titleBg.y + titleBg.height - 7);

        this.addChildToContainer(topBg);
        this.addChildToContainer(titleBg);

        let descBg = BaseBitmap.create("public_9_downbg");
        descBg.width = 421;
        descBg.height = 126;
        descBg.setPosition(topBg.x + 206, topBg.y + 31);
        this.addChildToContainer(descBg);

        let acTime = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeView_acTime-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        acTime.setPosition(descBg.x + 10, descBg.y + 15);
        this.addChildToContainer(acTime);

        let descTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeView_acDesc-" + this.code, ), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTF.width = 400;
        descTF.lineSpacing = 3;
        descTF.setPosition(acTime.x, acTime.y + acTime.height + 5);
        this.addChildToContainer(descTF);

        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(topBg.x + 120 - skinTxtEffectBM.width / 2, topBg.y + 150 - skinTxtEffectBM.height / 2);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);

        let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(topBg.x + 120, topBg.y + 150);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);


        let skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(topBg.x + 120, topBg.y + 150);
        this.addChildToContainer(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);


        //透明点击区域
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 180;
        touchPos.height = 200;
        touchPos.setPosition(topBg.x, topBg.y);
        this.addChildToContainer(touchPos);
        touchPos.addTouchTap(() => {
            let topMsg = LanguageManager.getlocal("acArcadeViewTopMsg-" + this.code, [String(cfg.showGem)]);
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONWIFESKINREWARDPOPUPVIEW, { skinId: cfg.show, topMsg: topMsg });
        }, this);

        this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
        this._countDownTimeBg.y = topBg.y + topBg.height - this._countDownTimeBg.height / 2;
        this.addChildToContainer(this._countDownTimeBg);

        this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeView_acCountTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
        this.addChildToContainer(this._countDownTime);


    }

    protected onNPCTouchHandler(e: egret.TouchEvent): void {
        if (this._isPlay) {
            return;
        }
        if (e.type != egret.TouchEvent.TOUCH_BEGIN && e.type != egret.TouchEvent.TOUCH_CANCEL && e.type != egret.TouchEvent.TOUCH_END) {
            return;
        }
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            if (e.currentTarget.alpha != 1) {
                e.currentTarget.alpha = 0.3;
            }

        }
        else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
            if (e.currentTarget.alpha != 1) {
                e.currentTarget.alpha = 0;
            }

        }
        if (e.type == egret.TouchEvent.TOUCH_END) {
            if (e.currentTarget.alpha != 1) {
                e.currentTarget.alpha = 0;
            }
            let viewName = e.currentTarget.name;
            switch (viewName) {
                case "charge":
                    this.chargeClick();
                    break;
                case "claim":
                    this.scoreClick();
                    break;
                case "game":
                    this._isPlay = true;
                    this.labaClick();
                    break;
                case "task":
                    this.taskClick();
                    break;
            }
        }
    }
    private labaClick() {
        egret.Tween.removeTweens(this._bg);
        egret.Tween.get(this._bg).to({ scaleX: 1.7, scaleY: 1.7 }, 1000).call(() => {
            ViewController.getInstance().openView(ViewConst.COMMON.ACARCADEGAMEVIEW, { code: this.code, aid: this.aid });
        }, this).wait(100).call(() => {
            egret.Tween.removeTweens(this._bg);
            this._bg.setScale(1);
            this._isPlay = false;
        }, this);
        // ViewController.getInstance().openView(ViewConst.COMMON.ACARCADEGAMEVIEW, { code: this.code, aid: this.aid });
    }
    private scoreClick() {
        ViewController.getInstance().openView(ViewConst.COMMON.ACARCADECLAIMVIEW, { code: this.code, aid: this.aid });
    }
    private chargeClick() {
        ViewController.getInstance().openView(ViewConst.COMMON.ACARCADERECHARGEVIEW, { code: this.code, aid: this.aid });
    }
    private taskClick() {
        ViewController.getInstance().openView(ViewConst.COMMON.ACARCADETASKVIEW, { code: this.code, aid: this.aid });
    }
    protected tick(): void {
        let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

        if (vo.checkIsInEndShowTime()) {
            this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            this._countDownTime.text = LanguageManager.getlocal("acArcadeView_acCountTime-" + this.code, [vo.acCountDown]);
        }
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);

    }

    /**
     * 刷新红点相关
     */
    protected refreshRedDot() {
        let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (this.redDotObj["task"]) {
            if (vo.checTaskRedDot()) {
                this.redDotObj["task"].setVisible(true);
            }
            else {
                this.redDotObj["task"].setVisible(false);
            }
        }
        if (this.redDotObj["game"]) {
            if (vo.checkGameRedDot()) {
                this.redDotObj["game"].setVisible(true);
            }
            else {
                this.redDotObj["game"].setVisible(false);
            }
        }

        if (this.redDotObj["charge"]) {
            if (vo.checkRechargeRedDot()) {
                this.redDotObj["charge"].setVisible(true);
            }
            else {
                this.redDotObj["charge"].setVisible(false);
            }
        }

        if (this.redDotObj["claim"]) {
            if (vo.getScore() > 0) {
                this.redDotObj["claim"].setVisible(true);
            }
            else {
                this.redDotObj["claim"].setVisible(false);
            }
        }
    }
    private refreshView() {
        this.refreshRedDot();
    }

    protected getRuleInfo(): string {
        return "acArcadeRuleInfo-" + this.code;
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
            "acwealthcarpview_skineffect", "acwealthcarpview_servantskintxt", "acarcadeview-" + this.getUiCode()
        ]);
    }
    protected getUiCode(): string {
        if (this.code == "2") {
            return "1";
        }
        return super.getUiCode();
    }

    protected getProbablyInfo(): string {
        return "";
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._countDownTime = null;
        this._countDownTimeBg = null;
        this.bubbleTip = null;
        this.redDotObj = {};
        this.brandObj = {};
        this._bg = null;
        this._isPlay = false;
        super.dispose();
    }
}
