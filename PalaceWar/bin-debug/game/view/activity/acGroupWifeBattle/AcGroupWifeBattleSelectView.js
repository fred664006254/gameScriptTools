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
/*
author : qianjun---wxz
desc : 帮会争顶选取目标
*/
var AcGroupWifeBattleSelectView = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleSelectView, _super);
    function AcGroupWifeBattleSelectView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleSelectView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleSelectView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleSelectView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleSelectView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleSelectView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcGroupWifeBattleSelectView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acmidautumnview_titlebg", "progress3_bg", "progress3"
        ]);
    };
    AcGroupWifeBattleSelectView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD),view.getRoundRewardCallback,view);
        var cdText = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleAvengerTip1-" + view.getUiCode()), 20, TextFieldConst.COLOR_BROWN);
        cdText.setPosition(this.viewBg.x + this.viewBg.width / 2 - cdText.width / 2, 10);
        view.addChildToContainer(cdText);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 660;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, cdText, [0, cdText.textHeight + 12]);
        view.addChildToContainer(bg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 520, bg.height - 15);
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
                    alliId: view.param.data.alliId
                });
            }
        }
        var scrollList = ComponentManager.getScrollList(AcGroupWifeBattleSelectItem, arr, rect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0, 5]);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        view.addChildToContainer(scrollList);
        view._list = scrollList;
        scrollList.bounces = false;
        //view.freshList();
    };
    AcGroupWifeBattleSelectView.prototype.getRoundRewardCallback = function (evt) {
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
    AcGroupWifeBattleSelectView.prototype.getShowHeight = function () {
        return 770;
    };
    AcGroupWifeBattleSelectView.prototype.getShowWidth = function () {
        return 560;
    };
    AcGroupWifeBattleSelectView.prototype.getTitleStr = function () {
        return "acGroupWifeBattleSelect-" + this.getUiCode();
    };
    AcGroupWifeBattleSelectView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleSelectView;
}(PopupView));
//# sourceMappingURL=AcGroupWifeBattleSelectView.js.map