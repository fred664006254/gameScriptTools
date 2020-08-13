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
/**
 * 风华群芳  历史排行榜
 */
var AcGroupWifeBattleHistoryRankView = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleHistoryRankView, _super);
    function AcGroupWifeBattleHistoryRankView() {
        var _this = _super.call(this) || this;
        _this._tabHeight = 0;
        _this._pranklist = [];
        _this._zranklist = [];
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleHistoryRankView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleHistoryRankView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleHistoryRankView.prototype, "code", {
        get: function () {
            return String(this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleHistoryRankView.prototype, "aid", {
        get: function () {
            return String(this.param.data.aid);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleHistoryRankView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleHistoryRankView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcGroupWifeBattleHistoryRankView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        return ["acPunishRankRewardTab1",
            "acPunishRankRewardTab2",
        ];
    };
    AcGroupWifeBattleHistoryRankView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' && Api.switchVoApi.checkOpenAtkracegChangegpoint()) {
            return "acBattleRoundRule-1_newRule_withOpenRefusal";
        }
        return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? ("acBattleRoundRule-" + this.getUiCode() + "_newRule") : ("acBattleRoundRule-" + this.getUiCode());
    };
    AcGroupWifeBattleHistoryRankView.prototype.getRuleInfoParam = function () {
        return this.vo.getRuleInfoParam();
    };
    AcGroupWifeBattleHistoryRankView.prototype.getTitleStr = function () {
        return "achistoryRank";
    };
    Object.defineProperty(AcGroupWifeBattleHistoryRankView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return view._tabHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleHistoryRankView.prototype, "tabWidth", {
        get: function () {
            var view = this;
            return view.width;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleHistoryRankView.prototype.getHistoryPrankList = function () {
        var view = this;
        var arr = [];
        /*
            "battlestaut1":"晋级",
    "battlestaut2":"淘汰",
    "battlestaut3":"已淘汰",
        */
        for (var i in this._pranklist) {
            var unit = this._pranklist[i];
            var status_1 = unit.alive ? (unit.rise ? 1 : 2) : (3);
            arr.push({
                myrank: Number(i) + 1,
                name: unit.name,
                alliname: unit.gname,
                value: unit.value,
                status: status_1,
                uid: unit.uid
            });
        }
        return arr;
    };
    AcGroupWifeBattleHistoryRankView.prototype.getHistoryArankList = function () {
        var view = this;
        var arr = [];
        for (var i in this._zranklist) {
            var unit = this._zranklist[i];
            var status_2 = unit.rjoin == 0 ? (3) : (unit.rise > 0 ? 1 : 2);
            arr.push({
                myrank: Number(i) + 1,
                alliname: unit.name,
                zid: unit.zid,
                num1: unit.rjoin ? unit.rjoin : 0,
                num2: unit.rise ? unit.rise : 0,
                status: status_2,
                id: unit.id
            });
        }
        return arr;
    };
    AcGroupWifeBattleHistoryRankView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETRANK,
            requestData: {
                activeId: this.param.data.aid + "-" + this.param.data.code,
                needround: this.param.data.round
            }
        };
    };
    AcGroupWifeBattleHistoryRankView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data) {
                this._pranklist = data.data.data.rankArr; //个人排行
                this._zranklist = data.data.data.allirankArr; //帮会排行
            }
        }
    };
    AcGroupWifeBattleHistoryRankView.prototype.initView = function () {
        var view = this;
        var data = view.param.data.data;
        var round = view.param.data.round;
        var topbg = BaseBitmap.create("battletabbg");
        topbg.setPosition(0, view.titleBg.height + view.titleBg.y);
        view.addChild(topbg);
        view.setChildIndex(view.tabbarGroup, 9999);
        var listbg = BaseBitmap.create("battlerankbg");
        listbg.width = GameConfig.stageWidth;
        listbg.height = GameConfig.stageHeigth - 65 - view.tabbarGroup.y - view.tabbarGroup.height;
        view.addChildToContainer(listbg);
        view._tabHeight = listbg.height;
        var time1 = App.DateUtil.getFormatBySecond(view.vo.versionst, 10);
        var nextSt = this.vo.versionst + data.time;
        var time2 = App.DateUtil.getFormatBySecond(nextSt, 10);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattleTimeend5", [time1, time2, round]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, listbg, [0, 10]);
        view.addChildToContainer(tipTxt);
        view.setChildIndex(view.closeBtn, 9999);
    };
    AcGroupWifeBattleHistoryRankView.prototype.getResourceList = function () {
        var code = this.code;
        return _super.prototype.getResourceList.call(this).concat([
            "arena_bottom"
        ]);
    };
    AcGroupWifeBattleHistoryRankView.prototype.dispose = function () {
        var view = this;
        this.vo.flag = false;
        view._tabHeight = 0;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleHistoryRankView;
}(CommonView));
//# sourceMappingURL=AcGroupWifeBattleHistoryRankView.js.map