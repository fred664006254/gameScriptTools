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
 * 英文--周年庆
 * date 2019/6/3
 * @author 张朝阳
 * @class AcGroupBaseView
 */
var AcGroupBaseView = (function (_super) {
    __extends(AcGroupBaseView, _super);
    function AcGroupBaseView() {
        var _this = _super.call(this) || this;
        _this.acList = null;
        _this.bubbleTip = null;
        _this.redDotObj = {};
        _this.brandObj = {};
        _this._bg = null;
        return _this;
    }
    /**点击区域的位置以及牌子的位置
     * aid:key
     * buildId:  aid  和资源对应 --小写
     * buildPos:  点击区域位置
     * buildScale:  点击区域的缩放
     * brandPos:  牌子的位置
     */
    AcGroupBaseView.prototype.getBuildingCfg = function () {
        return [];
    };
    /**说话提示
     * aid-code:和资源对应--小写
     * pos:
     */
    AcGroupBaseView.prototype.getBubbleTipCfg = function () {
        return {};
    };
    AcGroupBaseView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this);
        var bg = BaseLoadBitmap.create("acgroup" + this.aid + "view_mainbg");
        bg.width = 640;
        bg.height = 1136;
        bg.y = GameConfig.stageHeigth - bg.height - this.getContainerY() - 104 + 14;
        this.addChildToContainer(bg);
        this._bg = bg;
        this.initScenceEffect();
        var buildingCfg = this.getBuildingCfg();
        var _loop_1 = function (key) {
            var item = buildingCfg[key];
            var buildPic = BaseLoadBitmap.create("acgroup" + this_1.aid + "view_npc_" + item.buildId);
            buildPic.setScale(item.buildScale);
            buildPic.setPosition(item.buildPos.x, item.buildPos.y + bg.y);
            buildPic.name = item.aid;
            this_1.addChildToContainer(buildPic);
            buildPic.addTouch(this_1.onNPCTouchHandler, this_1, null, true);
            buildPic.alpha = 0;
            var brandPic = BaseLoadBitmap.create("acgroup" + this_1.aid + "view_brand_" + item.buildId, null, {
                callback: function () {
                    var dot = BaseBitmap.create("public_dot2");
                    dot.setScale(0.88);
                    dot.x = brandPic.x + brandPic.width - 22;
                    dot.y = brandPic.y - 5;
                    _this.addChildToContainer(dot);
                    dot.setVisible(false);
                    _this.redDotObj[item.aid] = dot;
                    _this.refreshRedDot();
                }, callbackThisObj: this_1, callbackParams: null
            });
            brandPic.setPosition(item.brandPos.x, item.brandPos.y + bg.y);
            this_1.addChildToContainer(brandPic);
            this_1.brandObj[item.aid] = brandPic;
        };
        var this_1 = this;
        for (var key in buildingCfg) {
            _loop_1(key);
        }
        this.refreshHandle();
    };
    /**初始化场景特效 */
    AcGroupBaseView.prototype.initScenceEffect = function () {
    };
    /**
     * 刷新红点相关
     */
    AcGroupBaseView.prototype.refreshRedDot = function () {
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
    AcGroupBaseView.prototype.refreshBrand = function () {
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
    AcGroupBaseView.prototype.refreshHandle = function () {
        this.refreshRedDot();
        this.refreshBrand();
    };
    /**
     * 走tip
     *  */
    AcGroupBaseView.prototype.tick = function () {
        if (GameData.serverTime % 15 == 0) {
            this.initBubbleTip();
        }
    };
    AcGroupBaseView.prototype.initBubbleTip = function () {
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
        var bubbleTipCfg = this.getBubbleTipCfg();
        var pos = bubbleTipCfg[key];
        this.bubbleTip = new AcBubbleTip();
        this.bubbleTip.init(key, l, isHasRedDot);
        this.bubbleTip.setPosition(this._bg.x + pos.x, this._bg.y + pos.y);
        this.bubbleTip.name = "bubbleTip";
        this.addChildToContainer(this.bubbleTip);
    };
    AcGroupBaseView.prototype.onNPCTouchHandler = function (e) {
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
                var newViewName = "Ac" + App.StringUtil.firstCharToUper(viewName) + "View";
                if (egret.getDefinitionByName(newViewName)) {
                    ViewController.getInstance().openView(newViewName, currentVo.code);
                }
                else {
                    var str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                    App.CommonUtil.showTip(str);
                    App.LogUtil.show("缺少" + newViewName);
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
    AcGroupBaseView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ac_tw_bubble",
        ]);
    };
    AcGroupBaseView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this);
        this.acList = null;
        this.bubbleTip = null;
        this.redDotObj = {};
        this.brandObj = {};
        _super.prototype.dispose.call(this);
    };
    return AcGroupBaseView;
}(AcGroupCommonView));
__reflect(AcGroupBaseView.prototype, "AcGroupBaseView");
//# sourceMappingURL=AcGroupBaseView.js.map