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
/*
author : qianjun
desc : 帮会争顶选取目标
*/
var AcBattleGroundSelectView = (function (_super) {
    __extends(AcBattleGroundSelectView, _super);
    function AcBattleGroundSelectView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    Object.defineProperty(AcBattleGroundSelectView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundSelectView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundSelectView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundSelectView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundSelectView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcBattleGroundSelectView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD),view.getRoundRewardCallback,view);
        var cdText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattileGroundAvengerTip1")), 20, TextFieldConst.COLOR_BROWN);
        cdText.setPosition(this.viewBg.x + this.viewBg.width / 2 - cdText.width / 2, 10);
        view.addChildToContainer(cdText);
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 540;
        bg.height = 660;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, cdText, [0, cdText.textHeight + 12]);
        view.addChildToContainer(bg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg.width - 20, bg.height - 20);
        var arr = [];
        for (var i in view.param.data.mem) {
            var unit = view.param.data.mem[i];
            if (unit.alive) {
                arr.push({
                    pic: unit.pic,
                    title: unit.title,
                    ptitle: unit.ptitle,
                    name: unit.name,
                    rank: unit.myrank,
                    score: unit.value,
                    alive: unit.alive,
                    uid: unit.uid,
                    alliId: view.param.data.alliId,
                });
            }
        }
        var scrollList = ComponentManager.getScrollList(AcBattleGroundSelectItem, arr, rect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0, 10]);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"), TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(scrollList);
        view._list = scrollList;
        scrollList.bounces = false;
        //view.freshList();
    };
    AcBattleGroundSelectView.prototype.getRoundRewardCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (!data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
        }
        // let idx = view.vo.selIdx;
        // let rewards = data.rewards;
        // if(rewards.indexOf(`20_302_1`) > -1){
        //     rewards = rewards.replace('20_302_1','27_302_1');
        // }
        // let item : any = view._list.getItemByIndex(idx);
        // let pos = item.localToGlobal(item._btn.x + 35, item._btn.y + 20);
        // let rewardList = GameData.formatRewardItem(rewards);
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
        // view._end = false;
        // view.freshList();
    };
    AcBattleGroundSelectView.prototype.getShowHeight = function () {
        return 800;
    };
    AcBattleGroundSelectView.prototype.getShowWidth = function () {
        return 560;
    };
    AcBattleGroundSelectView.prototype.getTitleStr = function () {
        return this.getDefaultCn("acBattleGroundSelect");
    };
    AcBattleGroundSelectView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcBattleGroundSelectView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundSelectView;
}(PopupView));
__reflect(AcBattleGroundSelectView.prototype, "AcBattleGroundSelectView");
