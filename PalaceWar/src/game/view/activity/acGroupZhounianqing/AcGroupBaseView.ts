/**
 * 英文--周年庆
 * date 2019/6/3
 * @author 张朝阳
 * @class AcGroupBaseView
 */
class AcGroupBaseView extends AcGroupCommonView {

    private acList = null;

    private bubbleTip: AcBubbleTip = null;

    private redDotObj: Object = {};

    private brandObj: Object = {};

    protected _bg: BaseLoadBitmap = null;
    /**点击区域的位置以及牌子的位置
     * aid:key
     * buildId:  aid  和资源对应 --小写
     * buildPos:  点击区域位置
     * buildScale:  点击区域的缩放
     * brandPos:  牌子的位置
     */
    protected getBuildingCfg() {
        return [];
    }
    /**说话提示
     * aid-code:和资源对应--小写
     * pos:
     */
    protected getBubbleTipCfg() {
        return {};
    }
    public constructor() {
        super();
    }

    protected initView() {

        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this)

        let bg = BaseLoadBitmap.create("acgroup" + this.aid + "view_mainbg");
        bg.width = 640;
        bg.height = 1136;
        bg.y = GameConfig.stageHeigth - bg.height - this.getContainerY() - 104+14;
        this.addChildToContainer(bg);

        this._bg = bg;

        this.initScenceEffect();


        let buildingCfg = this.getBuildingCfg();
        for (let key in buildingCfg) {
            let item = buildingCfg[key];

            let buildPic = BaseLoadBitmap.create("acgroup" + this.aid + "view_npc_" + item.buildId);
            buildPic.setScale(item.buildScale);
            buildPic.setPosition(item.buildPos.x, item.buildPos.y + bg.y);
            buildPic.name = item.aid;
            this.addChildToContainer(buildPic);
            buildPic.addTouch(this.onNPCTouchHandler, this, null, true);
            buildPic.alpha = 0;

            let brandPic = BaseLoadBitmap.create("acgroup" + this.aid + "view_brand_" + item.buildId, null, {
                callback: () => {
                    let dot = BaseBitmap.create(`public_dot2`);
                    dot.setScale(0.88);
                    dot.x = brandPic.x + brandPic.width - 22;
                    dot.y = brandPic.y - 5;
                    this.addChildToContainer(dot);
                    dot.setVisible(false);
                    this.redDotObj[item.aid] = dot;
                    this.refreshRedDot();
                }, callbackThisObj: this, callbackParams: null
            });
            brandPic.setPosition(item.brandPos.x, item.brandPos.y + bg.y);
            this.addChildToContainer(brandPic);
            this.brandObj[item.aid] = brandPic;
        }
        this.refreshHandle();
    }
    /**初始化场景特效 */
    protected initScenceEffect() {
    }
    /**
     * 刷新红点相关
     */
    protected refreshRedDot() {
        let acVoList = this.acVo.getAcVoList()
        for (let key in acVoList) {
            let acVo = acVoList[key];
            if (acVo.isShowRedDot == true && acVo.isStart) {
                if (this.redDotObj[acVo.aid]) {
                    this.redDotObj[acVo.aid].setVisible(true);
                }
            }
            else {
                if (this.redDotObj[acVo.aid]) {
                    this.redDotObj[acVo.aid].setVisible(false);
                }
            }
        }
    }
    /**刷新牌子的状态 */
    protected refreshBrand() {
        let acVoList = this.acVo.getAcVoList();
        for (let key in this.brandObj) {
            if (acVoList[key] && acVoList[key].isStart) {
                App.DisplayUtil.changeToNormal(this.brandObj[key]);
            }
            else {
                App.DisplayUtil.changeToGray(this.brandObj[key]);
            }
        }

    }
    /**
     * 刷新返回消息
     */
    protected refreshHandle() {
        this.refreshRedDot();
        this.refreshBrand();
    }

    /**
     * 走tip
     *  */
    public tick() {

        if (GameData.serverTime % 15 == 0) {
            this.initBubbleTip();
        }
    }


    protected initBubbleTip(): void {
        let acVoList = this.acVo.getAcVoList();
        let isHasRedDot: boolean = false;
        let redDotArr: string[] = [];
        let notRedDotArr: string[] = [];
        let key: string = null;
        let l: number = 0;
        for (let key in acVoList) {
            let acVo = acVoList[key];
            if (acVoList[key] && acVoList[key].isStart) {
                if (acVoList[key].isShowRedDot) {
                    redDotArr.push(acVoList[key].aidAndCode);
                    isHasRedDot = true;
                }
                else {
                    notRedDotArr.push(acVoList[key].aidAndCode)
                }
            }
        }

        if (isHasRedDot) {
            let index = App.MathUtil.getRandom(0, redDotArr.length);
            key = redDotArr[index];
            l = 2;
        }
        else {
            let index = App.MathUtil.getRandom(0, notRedDotArr.length);
            key = notRedDotArr[index];
            l = 3;
        }

        if (this.bubbleTip) {
            if (this.container.getChildByName("bubbleTip")) {
                this.container.removeChild(this.bubbleTip);
            }
            // this.bubbleTip.dispose();
            this.bubbleTip = null;
        }
        let bubbleTipCfg = this.getBubbleTipCfg();
        let pos = bubbleTipCfg[key];
        this.bubbleTip = new AcBubbleTip();
        this.bubbleTip.init(key, l, isHasRedDot);
        this.bubbleTip.setPosition(this._bg.x + pos.x, this._bg.y + pos.y);
        this.bubbleTip.name = "bubbleTip";
        this.addChildToContainer(this.bubbleTip);
    }
    protected onNPCTouchHandler(e: egret.TouchEvent): void {
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

            this.acList = this.acVo.getAcVoList();
            var currentVo: AcBaseVo = this.acList[viewName];
            if (currentVo && currentVo.isStart) {
                let newViewName = "Ac" + App.StringUtil.firstCharToUper(viewName) + "View";
                if (egret.getDefinitionByName(newViewName)) {
                    ViewController.getInstance().openView(newViewName, currentVo.code);
                }
                else {
                    let str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                    App.CommonUtil.showTip(str);
                    App.LogUtil.show("缺少" + newViewName);
                    return;
                }
            }
            else if (currentVo && currentVo.isPreview) {
                let nameStr = currentVo.aidAndCode;
                if (currentVo.st > 0) {
                    let str = LanguageManager.getlocal(nameStr + "timerDes", [currentVo.getPreviewTime()]);
                    App.CommonUtil.showTip(str);
                    return;
                }
            }
            else {
                let str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                App.CommonUtil.showTip(str);
                return;
            }
        }
    }

    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "ac_tw_bubble",
        ]);
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this)
        this.acList = null;
        this.bubbleTip = null;
        this.redDotObj = {};
        this.brandObj = {};
        super.dispose();
    }
}