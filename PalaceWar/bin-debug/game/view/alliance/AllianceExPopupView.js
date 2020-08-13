/**
 * 积分兑换道具板子
 * author dky
 * date 2017/12/7
 * @class AllianceExPopupView
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AllianceExPopupView = /** @class */ (function (_super) {
    __extends(AllianceExPopupView, _super);
    function AllianceExPopupView() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._dataList = [];
        return _this;
    }
    AllianceExPopupView.prototype.initView = function () {
        Api.mainTaskVoApi.checkShowGuide("AllianceExPopupView");
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM, this.doBuy, this);
        this._pointText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._pointText.y = 11;
        this.addChildToContainer(this._pointText);
        // this._pointText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
        // this._pointText.y = 11;
        // this.addChildToContainer(this._pointText);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 540, 710);
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        var dataList = new Array();
        var cfg = Config.AlliancebaseCfg.allianceShop;
        for (var index = 1; index < Object.keys(cfg).length + 1; index++) {
            var unit = cfg[index.toString()];
            if (cfg[index.toString()]) {
                if (unit.content.indexOf('1921') > -1 && !Api.switchVoApi.checkOpenCouncil()) {
                    continue;
                }
                if (unit.content.indexOf('4015') > -1 && !Api.switchVoApi.checkOpenAllianceWar()) {
                    continue;
                }
                if (unit.content.indexOf('1740') > -1 && !Api.switchVoApi.checkOpenServantLevel450()) {
                    continue;
                }
                cfg[index.toString()].id = index.toString();
                dataList.push(cfg[index.toString()]);
            }
            else {
                break;
            }
        }
        dataList.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        this._dataList = dataList;
        this._scrollList = ComponentManager.getScrollList(AllianceExScrollItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(23 + GameData.popupviewOffsetX, 40);
        this.resetPointText();
        var curTaskId = Api.mainTaskVoApi.getCurMainTaskId();
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(curTaskId);
        if (taskCfg) {
            if (taskCfg.questType == 701 && (!Api.rookieVoApi.isInGuiding) && (!Api.rookieVoApi.isGuiding)) {
                var taskIndex = this.getMainTaskCanChangeIndex();
                if (taskIndex > -1) {
                    this._scrollList.setScrollTopByIndex(taskIndex);
                }
            }
        }
    };
    AllianceExPopupView.prototype.getMainTaskCanChangeIndex = function () {
        var data = this._dataList;
        if (!data) {
            return -1;
        }
        var myAcVo = Api.allianceVoApi.getMyAllianceVo();
        var acVo = Api.allianceVoApi.getAllianceVo();
        for (var i = 0; i < data.length; i++) {
            var maxNum = 1;
            if (data[i].limitNum) {
                maxNum = data[i].limitNum;
            }
            else {
                maxNum = acVo.level - data[i].needAllianceLv + 1;
            }
            if (maxNum < 1) {
                maxNum = 1;
            }
            var num = 0;
            if (myAcVo && myAcVo.shop && myAcVo.shop[String(data[i].id)]) {
                num = myAcVo.shop[String(data[i].id)];
            }
            if (maxNum > num) {
                return i;
            }
        }
        return -1;
    };
    AllianceExPopupView.prototype.doBuy = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_ALLIANCE_SHOPBUY, { shopkey: data.key });
    };
    //请求回调
    AllianceExPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_SHOPBUY) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            var index = this._index;
            var wideItem = this._scrollList.getItemByIndex(index);
            wideItem.refreshData(index);
            // this._pointText.text = gem.toString();
            this.resetPointText();
        }
    };
    AllianceExPopupView.prototype.resetPointText = function () {
        var acVo = Api.allianceVoApi.getMyAllianceVo();
        this._pointText.text = LanguageManager.getlocal("allianceBuildScore", [acVo.ctv + "/" + acVo.tctv]);
        this._pointText.x = this.viewBg.width / 2 - this._pointText.width / 2;
        // this._pointText.text = App.DateUtil.getFormatBySecond(1,2)
    };
    AllianceExPopupView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM, this.doBuy, this);
        // this._pointText = null;
        // this._isLoading = false;
        // this._buyClickId = null;
        this._scrollList = null;
        this._pointText = null;
        this._index = null;
        this._dataList = [];
        _super.prototype.dispose.call(this);
    };
    return AllianceExPopupView;
}(PopupView));
//# sourceMappingURL=AllianceExPopupView.js.map