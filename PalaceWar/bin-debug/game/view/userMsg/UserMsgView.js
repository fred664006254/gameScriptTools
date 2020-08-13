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
 * @author shaoliang
 * date 2019/9/29
 * @class UserMsgView
 */
var UserMsgView = (function (_super) {
    __extends(UserMsgView, _super);
    function UserMsgView() {
        var _this = _super.call(this) || this;
        _this._progressTxt = null;
        _this._progress = null;
        _this._questionNumber = 5;
        _this._list = null;
        _this._chooseList = null;
        _this._alphaBg = null;
        _this._itemInfo = null;
        return _this;
    }
    UserMsgView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "usermsg_descbg", "usermsg_title", "progress3", "progress3_bg", "emparena_bottom",
            "common_arrow_3", "common_select_frame2",
        ]);
    };
    UserMsgView.prototype.getTitleStr = function () {
        return null;
    };
    UserMsgView.prototype.getTitleBgName = function () {
        return "usermsg_title";
    };
    UserMsgView.prototype.initView = function () {
        var view = this;
        var topBg = BaseBitmap.create("usermsg_descbg");
        this.addChild(topBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0, view.titleBg.height - 10]);
        var descbg = BaseBitmap.create("public_9_downbg");
        descbg.width = 426;
        descbg.height = 134;
        descbg.setPosition(210, topBg.y + 22);
        this.addChild(descbg);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("usermsg_desc"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc.width = 396;
        desc.lineSpacing = 5;
        desc.setPosition(descbg.x + descbg.width / 2 - desc.width / 2, descbg.y + 12);
        this.addChild(desc);
        var bottomBg = BaseLoadBitmap.create("servant_bottombg");
        bottomBg.y = topBg.y + topBg.height - 4;
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - bottomBg.y - 84;
        this.addChild(bottomBg);
        var downbg = BaseBitmap.create("emparena_bottom");
        downbg.height = 86;
        downbg.setPosition(0, GameConfig.stageHeigth - 86);
        this.addChild(downbg);
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 550);
        progress.setPercentage(0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, bottomBg, [45, 40]);
        view.addChild(progress);
        this._progress = progress;
        var progressTxt = ComponentManager.getTextField(LanguageManager.getlocal("acqaquestionjindu-1", ['0', this._questionNumber.toString()]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progressTxt, progress, [2, -4 - progressTxt.textHeight]);
        view.addChild(progressTxt);
        this._progressTxt = progressTxt;
        var rect = new egret.Rectangle(0, 0, 585, bottomBg.height - 95);
        var list = ComponentManager.getScrollList(UserMsgItem, [1, 2, 3, 4, 5], rect, { o: this, f: this.showChooseList });
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, bottomBg, [0, 78]);
        view.addChild(list);
        view._list = list;
        list.setContentPosY(6);
        var rewardbtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acqacommit-1", this.clickButton, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewardbtn, downbg, [0, 0]);
        view.addChild(rewardbtn);
        view.setChildIndex(view.titleBg, 9999);
        view.setChildIndex(view.closeBtn, 9999);
        var blossomIcon = App.DragonBonesUtil.getLoadDragonBones("acwelcome_blossom");
        // blossomIcon.anchorOffsetX = blossomIcon.width / 2;
        blossomIcon.x = 80;
        blossomIcon.y = 170;
        this.addChildToContainer(blossomIcon);
    };
    UserMsgView.prototype.clickButton = function () {
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
            this.request(NetRequestConst.REQUEST_OTHERINFO_SENDUSERMSG, { userMsg: answer2 });
        }
    };
    UserMsgView.prototype.receiveData = function (data) {
        if (data.ret) {
            // let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
            // App.CommonUtil.playRewardFlyAction(rewardList);
            App.CommonUtil.showTip(LanguageManager.getlocal("usermsg_complete"));
            this.hide();
        }
    };
    UserMsgView.prototype.getCompliteNumber = function () {
        var totalNum = 0;
        for (var i = 1; i <= this._questionNumber; ++i) {
            var item = this._list.getItemByIndex(i - 1);
            if (item && item.getIsAnswer()) {
                ++totalNum;
            }
        }
        return totalNum;
    };
    UserMsgView.prototype.tick = function () {
        var view = this;
        var totalNum = this.getCompliteNumber();
        view._progressTxt.text = LanguageManager.getlocal("acqaquestionjindu-1", [totalNum.toString(), this._questionNumber.toString()]);
        view._progress.setPercentage(totalNum / this._questionNumber);
    };
    UserMsgView.prototype.showChooseList = function (info) {
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
    UserMsgView.prototype.clickChooseList = function (evt, parms) {
        this._alphaBg.dispose();
        this._alphaBg = null;
        this._chooseList.dispose();
        this._chooseList = null;
        var f = this._itemInfo.f;
        f.apply(this._itemInfo.o);
        this._itemInfo = null;
    };
    UserMsgView.prototype.chooseListCallback = function (str) {
        this._alphaBg.dispose();
        this._alphaBg = null;
        this._chooseList.dispose();
        this._chooseList = null;
        var f = this._itemInfo.f;
        f.apply(this._itemInfo.o, [str]);
        this._itemInfo = null;
    };
    UserMsgView.prototype.dispose = function () {
        var view = this;
        view._progressTxt = null;
        view._progress = null;
        this._itemInfo = null;
        this._chooseList = null;
        this._alphaBg = null;
        _super.prototype.dispose.call(this);
    };
    return UserMsgView;
}(CommonView));
__reflect(UserMsgView.prototype, "UserMsgView");
//# sourceMappingURL=UserMsgView.js.map