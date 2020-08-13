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
var AcMergeActiveViewTab3 = (function (_super) {
    __extends(AcMergeActiveViewTab3, _super);
    function AcMergeActiveViewTab3() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.aid = null;
        _this.code = null;
        _this._aidAndCode = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcMergeActiveViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMergeActiveViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMergeActiveViewTab3.prototype, "acTivityId", {
        get: function () {
            return AcMergeActiveView.AID + "-" + AcMergeActiveView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    AcMergeActiveViewTab3.prototype.initView = function () {
        this.aid = AcMergeActiveView.AID;
        this.code = AcMergeActiveView.CODE;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_BUYMERGEACTIVESHOP, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO, this.refreshData, this);
        this._aidAndCode = { "aid": this.aid, "code": this.code };
        var downBgHeight = 0;
        if (this.vo.diffday < 6) {
            var downBg = BaseBitmap.create("recharge_diban_01");
            downBg.width = GameConfig.stageWidth;
            downBg.x = 0;
            downBg.y = GameConfig.stageHeigth - 69 - downBg.height - 90 + 5;
            this.addChild(downBg);
            downBgHeight = downBg.height;
            var bottomDesc = ComponentManager.getTextField(LanguageManager.getlocal("acMergeActiveShopNextTip"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            bottomDesc.x = downBg.x + downBg.width / 2 - bottomDesc.width / 2;
            bottomDesc.y = downBg.y + downBg.height / 2 - bottomDesc.height / 2 - 6;
            this.addChild(bottomDesc);
        }
        var shadow = BaseBitmap.create("commonview_titlebgshadow");
        shadow.width = GameConfig.stageWidth - 6;
        shadow.x = GameConfig.stageWidth / 2 - shadow.width / 2;
        shadow.y = 0;
        this.addChild(shadow);
        var rect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - 160 - downBgHeight);
        var taskData = this.vo.getSortShop();
        this._scrollList = ComponentManager.getScrollList(AcMergeActiveShopScrollItem, taskData, rect, this._aidAndCode);
        this._scrollList.y = 3;
        this._scrollList.x = GameConfig.stageWidth / 2 - this._scrollList.width / 2;
        this.addChild(this._scrollList);
        //边框
        var borderBg = BaseBitmap.create("public_9v_bg03");
        borderBg.width = GameConfig.stageWidth;
        borderBg.height = GameConfig.stageHeigth - 153;
        borderBg.y = 0;
        this.addChild(borderBg);
    };
    AcMergeActiveViewTab3.prototype.rechargeHandler = function (event) {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcMergeActiveViewTab3.prototype.refreshData = function (event) {
        if (event) {
            if (event.data && event.data.ret) {
                var cmd = event.data.data.cmd;
                if (cmd == NetRequestConst.REQUEST_ACTIVITY_BUYMERGEACTIVESHOP) {
                    var data = event.data.data.data;
                    var rewards = data.rewards;
                    var rList = GameData.formatRewardItem(rewards);
                    App.CommonUtil.playRewardFlyAction(rList);
                }
            }
        }
        var taskData = this.vo.getSortShop();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(taskData, this._aidAndCode);
    };
    AcMergeActiveViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_BUYMERGEACTIVESHOP, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO, this.refreshData, this);
        this._scrollList = null;
        this._aidAndCode = null;
        _super.prototype.dispose.call(this);
    };
    return AcMergeActiveViewTab3;
}(CommonViewTab));
__reflect(AcMergeActiveViewTab3.prototype, "AcMergeActiveViewTab3");
