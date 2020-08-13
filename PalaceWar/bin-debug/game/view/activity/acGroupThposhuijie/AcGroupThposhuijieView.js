var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 泰国--泼水节
 * date 2019/3/4
 * @author 张朝阳
 * @class AcGroupThposhuijieView
 */
var AcGroupThposhuijieView = (function (_super) {
    __extends(AcGroupThposhuijieView, _super);
    function AcGroupThposhuijieView() {
        var _this = _super.call(this) || this;
        _this.acList = null;
        _this.bubbleTip = null;
        _this.redDotObj = {};
        _this.brandObj = {};
        _this.ThposhuijieCfg = [
            { buildId: "christmas", buildPos: { x: 407, y: 820 }, buildScale: 4, brandPos: { x: 401, y: 809 } },
            { buildId: "courier", buildPos: { x: 298, y: 355 }, buildScale: 4, brandPos: { x: 365, y: 339 } },
            { buildId: "marry", buildPos: { x: 0, y: 400 }, buildScale: 4, brandPos: { x: 44, y: 367 } },
        ];
        _this.bubbleTipCfg = {
            "christmas-5": { x: 401, y: 609 },
            "courier-2": { x: 365, y: 139 },
            "marry-2": { x: 44, y: 217 },
        };
        return _this;
    }
    AcGroupThposhuijieView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this);
        var bg = BaseLoadBitmap.create("acgroupthposhuijieview_mainbg");
        bg.width = 640;
        bg.height = 1136;
        bg.y = GameConfig.stageHeigth - bg.height - this.getContainerY() - 104 + 14;
        this.addChildToContainer(bg);
        var _loop_1 = function (key) {
            var item = this_1.ThposhuijieCfg[key];
            var buildPic = BaseLoadBitmap.create("acgroupthposhuijieview_npc_" + item.buildId);
            buildPic.setScale(item.buildScale);
            buildPic.setPosition(item.buildPos.x, item.buildPos.y + bg.y);
            buildPic.name = item.buildId;
            this_1.addChildToContainer(buildPic);
            buildPic.addTouch(this_1.onNPCTouchHandler, this_1, null, true);
            buildPic.alpha = 0;
            var brandPic = BaseLoadBitmap.create("acgroupthposhuijieview_brand_" + item.buildId, null, {
                callback: function () {
                    var dot = BaseBitmap.create("public_dot2");
                    dot.setScale(0.88);
                    dot.x = brandPic.x + brandPic.width - 22;
                    dot.y = brandPic.y - 5;
                    _this.addChildToContainer(dot);
                    dot.setVisible(false);
                    _this.redDotObj[item.buildId] = dot;
                    _this.refreshRedDot();
                }, callbackThisObj: this_1, callbackParams: null
            });
            brandPic.setPosition(item.brandPos.x, item.brandPos.y + bg.y);
            this_1.addChildToContainer(brandPic);
            this_1.brandObj[item.buildId] = brandPic;
        };
        var this_1 = this;
        for (var key in this.ThposhuijieCfg) {
            _loop_1(key);
        }
        this.refreshHandle();
    };
    /**
     * 刷新红点相关
     */
    AcGroupThposhuijieView.prototype.refreshRedDot = function () {
        var acVoList = this.acVo.getAcVoList();
        for (var key in acVoList) {
            var acVo = acVoList[key];
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
    };
    /**刷新牌子的状态 */
    AcGroupThposhuijieView.prototype.refreshBrand = function () {
        var acVoList = this.acVo.getAcVoList();
        for (var key in this.brandObj) {
            if (acVoList[key] && acVoList[key].isStart) {
                App.DisplayUtil.changeToNormal(this.brandObj[key]);
            }
            else {
                App.DisplayUtil.changeToGray(this.brandObj[key]);
            }
        }
    };
    /**
     * 刷新返回消息
     */
    AcGroupThposhuijieView.prototype.refreshHandle = function () {
        this.refreshRedDot();
        this.refreshBrand();
    };
    /**
     * 走tip
     *  */
    AcGroupThposhuijieView.prototype.tick = function () {
        if (GameData.serverTime % 5 == 0) {
            this.initBubbleTip();
        }
    };
    AcGroupThposhuijieView.prototype.initBubbleTip = function () {
        var acVoList = this.acVo.getAcVoList();
        var isHasRedDot = false;
        var redDotArr = [];
        var notRedDotArr = [];
        var key = null;
        var l = 0;
        for (var key_1 in acVoList) {
            var acVo = acVoList[key_1];
            if (acVoList[key_1] && acVoList[key_1].isStart) {
                if (acVoList[key_1].isShowRedDot) {
                    redDotArr.push(acVoList[key_1].aidAndCode);
                    isHasRedDot = true;
                }
                else {
                    notRedDotArr.push(acVoList[key_1].aidAndCode);
                }
            }
        }
        if (isHasRedDot) {
            var index = App.MathUtil.getRandom(0, redDotArr.length);
            key = redDotArr[index];
            l = 2;
        }
        else {
            var index = App.MathUtil.getRandom(0, notRedDotArr.length);
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
        this.bubbleTip = new AcBubbleTip();
        this.bubbleTip.init(key, l, isHasRedDot);
        this.bubbleTip.setPosition(this.bubbleTipCfg[key].x, this.bubbleTipCfg[key].y);
        this.bubbleTip.name = "bubbleTip";
        this.addChildToContainer(this.bubbleTip);
    };
    AcGroupThposhuijieView.prototype.onNPCTouchHandler = function (e) {
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
            var viewName = e.currentTarget.name;
            this.acList = this.acVo.getAcVoList();
            var currentVo = this.acList[viewName];
            if (currentVo && currentVo.isStart) {
                var newViewName = App.StringUtil.firstCharToUper(viewName);
                if (egret.getDefinitionByName("Ac" + newViewName + "View")) {
                    ViewController.getInstance().openView("Ac" + newViewName + "View", currentVo.code);
                }
                else {
                    var str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                    App.CommonUtil.showTip(str);
                    return;
                }
            }
            else if (currentVo && currentVo.isPreview) {
                var nameStr = currentVo.aidAndCode;
                if (currentVo.st > 0) {
                    var str = LanguageManager.getlocal(nameStr + "timerDes", [currentVo.getPreviewTime()]);
                    App.CommonUtil.showTip(str);
                    return;
                }
            }
            else {
                var str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                App.CommonUtil.showTip(str);
                return;
            }
        }
    };
    AcGroupThposhuijieView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ac_tw_bubble",
        ]);
    };
    AcGroupThposhuijieView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this);
        this.acList = null;
        this.bubbleTip = null;
        this.redDotObj = {};
        this.brandObj = {};
        _super.prototype.dispose.call(this);
    };
    return AcGroupThposhuijieView;
}(AcGroupCommonView));
__reflect(AcGroupThposhuijieView.prototype, "AcGroupThposhuijieView");
//# sourceMappingURL=AcGroupThposhuijieView.js.map