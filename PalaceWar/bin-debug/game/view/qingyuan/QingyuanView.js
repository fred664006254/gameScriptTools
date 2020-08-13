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
 * 情缘新view
 * author ycg
 * date 2020.4.7
 * @class QingyuanNewView
 */
var QingyuanView = (function (_super) {
    __extends(QingyuanView, _super);
    function QingyuanView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._btnList = [];
        _this._showTypeList = [3, 4, 1, 2];
        _this._showData = [];
        _this._selectIndex = 0;
        _this._showList = [];
        return _this;
    }
    /**
     * --1门客组
         --2红颜组
         --3门客皮肤组
         --4红颜皮肤组
     */
    QingyuanView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ENCOUNTER_FRESHUI, this.refreshUI, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE, this.activateCallback, this);
        var bottomBg = BaseBitmap.create("qingyuannew_bottombg");
        bottomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2, GameConfig.stageHeigth - this.titleBg.height - bottomBg.height);
        this.addChildToContainer(bottomBg);
        this.setBigFameY(-10);
        //bottom btn
        var list = Api.encounterVoApi.getShowKindList();
        this._showList = list;
        for (var i = 0; i < list.length; i++) {
            var btnContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(btnContainer);
            var index = list[i];
            var btn = BaseBitmap.create("qingyuannew_btn" + index);
            btnContainer.addChild(btn);
            btn.name = "qingyuanbtn";
            var btnDown = BaseBitmap.create("qingyuannew_btn" + index + "_down");
            btnContainer.addChild(btnDown);
            btnDown.name = "qingyuanbtndown";
            btnDown.visible = false;
            btnContainer.width = btn.width;
            btnContainer.height = btn.height;
            btnContainer.setPosition(60 + (i) * (btn.width - 25), bottomBg.y - 15);
            btnContainer.addTouchTap(this.typeBtnClick, this, [i]);
            var redDot = BaseBitmap.create("public_dot2");
            redDot.setPosition(btnContainer.width - 40, 20);
            btnContainer.addChild(redDot);
            redDot.name = "redDot";
            this._btnList.push(btnContainer);
        }
        this.changeBtnStatus(0);
        this._selectIndex = 0;
        this._showData = Api.encounterVoApi.getEncountCfgByKind(this._showList[0]);
        this.freshShowData();
        var data = this._showData;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - this.titleBg.height - bottomBg.height - 10);
        var scrollList = ComponentManager.getScrollList(QingyuanNewScrollItem, data, rect, { kind: this._showList[0] });
        scrollList.setPosition(0, 5);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;
        this.refreshView();
    };
    QingyuanView.prototype.typeBtnClick = function (target, index) {
        App.LogUtil.log("typeBtnClick " + index);
        if (index == this._selectIndex) {
            return;
        }
        this._selectIndex = index;
        this.changeBtnStatus(index);
        var showType = this._showList[index];
        App.LogUtil.log("typeBtnClicktype " + showType);
        this._showData = Api.encounterVoApi.getEncountCfgByKind(showType);
        this.freshShowData();
        console.log(this._showData);
        this._scrollList.refreshData(this._showData, { kind: showType });
    };
    QingyuanView.prototype.refreshUI = function (param) {
        if (param && param.data) {
            var type = param.data.type;
            var tabType = param.data.tabType;
            var index = param.data.tabIndex;
            if (param.data.isFreshData) {
                this.freshShowData(type, tabType, index);
            }
        }
        this._scrollList.refreshData(this._showData, { kind: this._showList[this._selectIndex] });
    };
    QingyuanView.prototype.freshShowData = function (type, tabType, tabIndex) {
        var data = this._showData;
        for (var i = 0; i < data.length; i++) {
            if (!type) {
                data[i].collectOpen = false;
                data[i].taskOpen = false;
                data[i].tabIndex = 1;
            }
            else {
                if (data[i].type == type) {
                    if (tabIndex) {
                        data[i].tabIndex = tabIndex;
                    }
                    if (tabType) {
                        if (tabType == 1) {
                            data[i].collectOpen = !data[i].collectOpen;
                            data[i].taskOpen = data[i].collectOpen;
                        }
                        else if (tabType == 2) {
                            data[i].taskOpen = !data[i].taskOpen;
                            data[i].collectOpen = data[i].taskOpen;
                        }
                    }
                    break;
                }
            }
        }
    };
    QingyuanView.prototype.changeBtnStatus = function (index) {
        for (var i = 0; i < this._btnList.length; i++) {
            var btn = this._btnList[i].getChildByName("qingyuanbtn");
            var btnDown = this._btnList[i].getChildByName("qingyuanbtndown");
            btn.visible = true;
            btnDown.visible = false;
            if (i == index) {
                btn.visible = false;
                btnDown.visible = true;
            }
        }
    };
    QingyuanView.prototype.activateCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var rData = evt.data.data.data;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ENCOUNTER_MODEL);
            if (rData.rewards) {
                var rewardList = GameData.formatRewardItem(rData.rewards);
                App.CommonUtil.playRewardFlyAction(rewardList);
            }
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
            }
            this.refreshView();
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ENCOUNTER_MODEL);
        }
    };
    QingyuanView.prototype.refreshView = function () {
        for (var i = 0; i < this._showList.length; i++) {
            var redDot = this._btnList[i].getChildByName("redDot");
            if (Api.encounterVoApi.checkRedByKind(this._showList[i])) {
                redDot.visible = true;
            }
            else {
                redDot.visible = false;
            }
        }
    };
    Object.defineProperty(QingyuanView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    QingyuanView.prototype.getBigFrame = function () {
        // if (this.uiType=="2")
        // {
        return "commonview_bigframe";
        // }
        // return null;
    };
    QingyuanView.prototype.getTitlePic = function () {
        return "qingyuannew_titlebg";
    };
    QingyuanView.prototype.getRuleInfo = function () {
        return "qingyuanrule";
    };
    QingyuanView.prototype.getTitleStr = function () {
        return null;
    };
    QingyuanView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    QingyuanView.prototype.getResourceList = function () {
        var arr = [
            "qingyuannew_bottombg", "qingyuannew_gearitemtitlebg", "qingyuannew_itembg", "qingyuannew_itemflag", "qingyuannew_itemoffbtn", "qingyuannew_itemopenbtn",
            "qingyuannew_titlebg", "qingyuannew_rolebg1", "qingyuannew_rolebg2", "qingyuannew_rolebg3", "qingyuannew_rolebg4", "qingyuannew_btn1", "qingyuannew_btn1_down", "qingyuannew_btn2", "qingyuannew_btn2_down", "qingyuannew_btn3", "qingyuannew_btn3_down", "qingyuannew_btn4", "qingyuannew_btn4_down", "qingyuannew_newflag", "collectflag", "qingyuanrolenamebg", "qingyuannew_qingyuannamebg", "itembg_0",
        ];
        // for(let k in Config.EncounterCfg.encounterList){
        // 	let unit = Config.EncounterCfg.encounterList[k];
        // 	for(let i in unit.need){
        // 		let data = unit.need[i];
        //         let rewardvo = GameData.formatRewardItem(data)[0];
        // 		arr.push(`${unit.type}role${rewardvo.id}`);
        // 	}
        // }
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    QingyuanView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ENCOUNTER_FRESHUI, this.refreshUI, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE, this.activateCallback, this);
        this._scrollList = null;
        this._btnList = [];
        this._showData = null;
        this._selectIndex = 0;
        this._showList = [];
        _super.prototype.dispose.call(this);
    };
    return QingyuanView;
}(CommonView));
__reflect(QingyuanView.prototype, "QingyuanView");
//# sourceMappingURL=QingyuanView.js.map