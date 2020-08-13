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
 * 登记玩家信息
 * author ycg
 * date 2019.10.21
 * @class AcFirstSightLoveUserMsgPopupView
 */
var AcFirstSightLoveUserMsgPopupView = (function (_super) {
    __extends(AcFirstSightLoveUserMsgPopupView, _super);
    function AcFirstSightLoveUserMsgPopupView() {
        var _this = _super.call(this) || this;
        _this._questionNumber = 4;
        _this._list = null;
        _this._chooseList = null;
        _this._alphaBg = null;
        _this._itemInfo = null;
        _this._rewardBtn = null;
        return _this;
    }
    AcFirstSightLoveUserMsgPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress3", "progress3_bg", "emparena_bottom",
            "common_arrow_3", "common_select_frame2",
        ]);
    };
    AcFirstSightLoveUserMsgPopupView.prototype.getTitleStr = function () {
        return "acFirstSightLoveSignUpTitle";
    };
    AcFirstSightLoveUserMsgPopupView.prototype.getTitleBgName = function () {
        return "";
    };
    AcFirstSightLoveUserMsgPopupView.prototype.getShowWidth = function () {
        return 600;
    };
    AcFirstSightLoveUserMsgPopupView.prototype.getShowHeight = function () {
        return 910;
    };
    Object.defineProperty(AcFirstSightLoveUserMsgPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcFirstSightLoveUserMsgPopupView.prototype.initView = function () {
        var view = this;
        var bottomBg = BaseBitmap.create("public_9_bg21");
        bottomBg.width = 560 - 32;
        bottomBg.height = 670;
        bottomBg.setPosition(20 + GameData.popupviewOffsetX, 0);
        var tip1 = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveSignUpTip1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        tip1.setPosition(bottomBg.x + bottomBg.width / 2 - tip1.width / 2, 8);
        view.addChildToContainer(tip1);
        var tip2 = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveSignUpTip2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        tip2.width = bottomBg.width - 30;
        tip2.setPosition(bottomBg.x + bottomBg.width / 2 - tip2.width / 2, tip1.y + tip1.height + 8);
        view.addChildToContainer(tip2);
        bottomBg.y = tip2.y + tip2.height + 10;
        view.addChildToContainer(bottomBg);
        var rect = new egret.Rectangle(0, 0, bottomBg.width, bottomBg.height - 10);
        var list = ComponentManager.getScrollList(AcFirstSightLoveUserMsgItem, [1, 3, 4, 5], rect, { o: this, f: this.showChooseList });
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, bottomBg, [0, 5]);
        view.addChildToContainer(list);
        view._list = list;
        // list.setContentPosY(5);
        var rewardbtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acqacommit-1", this.clickButton, this);
        rewardbtn.setPosition(bottomBg.x + bottomBg.width / 2 - rewardbtn.width / 2, bottomBg.y + bottomBg.height + 10);
        view.addChildToContainer(rewardbtn);
        this._rewardBtn = rewardbtn;
    };
    AcFirstSightLoveUserMsgPopupView.prototype.clickButton = function () {
        var view = this;
        var all = true;
        var answer2 = {};
        for (var i = 1; i <= this._questionNumber; ++i) {
            var item = view._list.getItemByIndex(i - 1);
            if (item) {
                var str = item.checkAnwser();
                if (str.answer) {
                    answer2[str.name] = str.answer;
                }
                else {
                    all = false;
                    item.showEffect();
                    view._list.setScrollTopByIndex(str.index);
                    break;
                }
            }
        }
        if (all) {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            if (!vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            this._rewardBtn.setEnable(false);
            this.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BM, { activeId: this.vo.aidAndCode, username: answer2.name, birthday: answer2.birthday, tel: answer2.tel, email: answer2.email });
        }
    };
    AcFirstSightLoveUserMsgPopupView.prototype.receiveData = function (data) {
        var _this = this;
        if (data.ret) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACFIRSTSIGHTLOVE_FRESHVIEW);
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            egret.Tween.get(this._rewardBtn).call(function () {
                App.CommonUtil.showTip(LanguageManager.getlocal("acFirstSightLoveSignUpSuccess"));
            }).wait(1000).call(function () {
                _this.hide();
            });
        }
        else {
            this._rewardBtn.setEnable(true);
        }
    };
    AcFirstSightLoveUserMsgPopupView.prototype.getCompliteNumber = function () {
        var totalNum = 0;
        for (var i = 1; i <= this._questionNumber; ++i) {
            var item = this._list.getItemByIndex(i - 1);
            if (item && item.getIsAnswer()) {
                ++totalNum;
            }
        }
        return totalNum;
    };
    AcFirstSightLoveUserMsgPopupView.prototype.showChooseList = function (info) {
        this._itemInfo = info;
        var idx = info.index;
        //
        this._alphaBg = BaseBitmap.create("public_alphabg");
        this._alphaBg.width = GameConfig.stageWidth;
        this._alphaBg.height = GameConfig.stageHeigth;
        this.addChild(this._alphaBg);
        this._alphaBg.addTouchTap(this.clickChooseList, this);
        var keys = [];
        var startIdx = 1;
        var endIdx = 1;
        var w = 77;
        if (idx == 1) {
            startIdx = 1900;
            endIdx = 2019;
            w = 100;
        }
        else if (idx == 2) {
            endIdx = 12;
        }
        else if (idx == 3) {
            var year = Number(info.year);
            var m = Number(info.month);
            endIdx = GameData.getMonthDayByYearAndMonth(year, m);
        }
        for (var i = startIdx; i <= endIdx; i++) {
            if (i < 10) {
                keys.push("0" + String(i));
            }
            else {
                keys.push(String(i));
            }
        }
        var clist = new ChooseList();
        clist.init(keys, w, this.chooseListCallback, this);
        var posy = 713 - this._list.scrollTop - clist.height;
        clist.setPosition(info.x - 3, posy);
        this.addChild(clist);
        this._chooseList = clist;
    };
    AcFirstSightLoveUserMsgPopupView.prototype.clickChooseList = function (evt, parms) {
        this._alphaBg.dispose();
        this._alphaBg = null;
        this._chooseList.dispose();
        this._chooseList = null;
        var f = this._itemInfo.f;
        f.apply(this._itemInfo.o);
        this._itemInfo = null;
    };
    AcFirstSightLoveUserMsgPopupView.prototype.chooseListCallback = function (str) {
        this._alphaBg.dispose();
        this._alphaBg = null;
        this._chooseList.dispose();
        this._chooseList = null;
        var f = this._itemInfo.f;
        f.apply(this._itemInfo.o, [str]);
        this._itemInfo = null;
    };
    AcFirstSightLoveUserMsgPopupView.prototype.dispose = function () {
        this._itemInfo = null;
        this._chooseList = null;
        this._alphaBg = null;
        this._rewardBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcFirstSightLoveUserMsgPopupView;
}(PopupView));
__reflect(AcFirstSightLoveUserMsgPopupView.prototype, "AcFirstSightLoveUserMsgPopupView");
//# sourceMappingURL=AcFirstSightLoveUserMsgPopupView.js.map