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
var AcMergeActiveViewTab2 = (function (_super) {
    __extends(AcMergeActiveViewTab2, _super);
    function AcMergeActiveViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.aid = null;
        _this.code = null;
        _this._aidAndCode = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcMergeActiveViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMergeActiveViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMergeActiveViewTab2.prototype, "acTivityId", {
        get: function () {
            return AcMergeActiveView.AID + "-" + AcMergeActiveView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    AcMergeActiveViewTab2.prototype.initView = function () {
        this.aid = AcMergeActiveView.AID;
        this.code = AcMergeActiveView.CODE;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMT, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO, this.refreshData, this);
        this._aidAndCode = { "aid": this.aid, "code": this.code };
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = this.vo.getSortTask();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        var downBg = BaseBitmap.create("recharge_diban_01");
        downBg.width = GameConfig.stageWidth;
        downBg.x = 0;
        downBg.y = GameConfig.stageHeigth - 69 - downBg.height - 90 + 5;
        this.addChild(downBg);
        var bottomDesc = ComponentManager.getTextField(LanguageManager.getlocal("acMergeActiveBottomDesc1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        bottomDesc.x = downBg.x + downBg.width / 2 - bottomDesc.width / 2;
        bottomDesc.y = downBg.y + downBg.height / 2 - bottomDesc.height / 2 - 6;
        this.addChild(bottomDesc);
        var rect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - 160 - downBg.height);
        this._scrollList = ComponentManager.getScrollList(AcMergeActiveTaskScrollItem, taskData, rect, this._aidAndCode);
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
    AcMergeActiveViewTab2.prototype.rechargeHandler = function (event) {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcMergeActiveViewTab2.prototype.refreshData = function (event) {
        if (event) {
            if (event.data && event.data.ret) {
                var cmd = event.data.data.cmd;
                if (cmd == NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMT) {
                    var data = event.data.data.data;
                    var rewards = data.rewards;
                    var rList = GameData.formatRewardItem(rewards);
                    App.CommonUtil.playRewardFlyAction(rList);
                }
            }
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var taskData = vo.getSortTask();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(taskData, this._aidAndCode);
    };
    AcMergeActiveViewTab2.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acchristmasview_1_red"
        ]);
    };
    AcMergeActiveViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMT, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO, this.refreshData, this);
        this._scrollList = null;
        this._aidAndCode = null;
        _super.prototype.dispose.call(this);
    };
    return AcMergeActiveViewTab2;
}(CommonViewTab));
__reflect(AcMergeActiveViewTab2.prototype, "AcMergeActiveViewTab2");
