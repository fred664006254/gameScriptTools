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
var AcGroupWifeBattleGuessView = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleGuessView, _super);
    function AcGroupWifeBattleGuessView() {
        var _this = _super.call(this) || this;
        _this._btn = null;
        _this._cheerTxt = null;
        return _this;
    }
    AcGroupWifeBattleGuessView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcGroupWifeBattleGuessView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleGuessView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleGuessView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleGuessView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleGuessView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleGuessView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat(["battle-purport", "activity_charge_red"
        ]);
    };
    AcGroupWifeBattleGuessView.prototype.getRuleInfo = function () {
        var code = this.getUiCode();
        // if(Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' &&Api.switchVoApi.checkOpenAtkracegChangegpoint()){
        // 	return "acBattleRoundRule-1_newRule_withOpenRefusal";
        // }
        // return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? (`acBattleRoundRule-${this.getUiCode()}_newRule`) : (`acBattleRoundRule-${this.getUiCode()}`);
        return "acGroupWifeBattleRule-" + code;
    };
    AcGroupWifeBattleGuessView.prototype.getRuleInfoParam = function () {
        return this.vo.getRuleInfoParam();
    };
    AcGroupWifeBattleGuessView.prototype.getTitleStr = function () {
        return "acGroupWifeBattlecheerTitle-" + this.getUiCode();
    };
    AcGroupWifeBattleGuessView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcGroupWifeBattleGuessView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHEER), view.prankCallback, view);
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var bouttom = BaseBitmap.create("battledownbg");
        bouttom.width = GameConfig.stageWidth;
        bouttom.height = GameConfig.stageHeigth;
        this.addChildToContainer(bouttom);
        this.container.y = 0;
        var bg = BaseBitmap.create("battle-purport");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view, [0, 100]);
        view.addChild(bg);
        var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattlecheertip-" + code, [App.DateUtil.formatSvrHourByLocalTimeZone(22).hour.toString()]), 22, TextFieldConst.COLOR_BLACK);
        tiptxt.width = 555;
        tiptxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, bg, [0, 20]);
        view.addChild(tiptxt);
        var tip2txt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattlecheertip2-" + code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip2txt, bg, [0, bg.height + 10]);
        view.addChild(tip2txt);
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", function () {
            if (view.vo.getCurRound() > 1 && !view.vo.getCheerId()) {
                var str = LanguageManager.getlocal("acGroupWifeBattlecheertip3-" + code);
                App.CommonUtil.showTip(str);
                view.hide();
                return;
            }
            if (view.vo.getCheerId()) {
                //打开排行
                ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEDETAILSVIEW, {
                    aid: view.aid,
                    code: view.code,
                    type: "rank"
                });
            }
            else {
                //打开选择帮会
                if (Api.wifebattleVoApi.isBaseWifeBattleOpen()) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLEGUESSSELECTVIEW, {
                        aid: view.aid,
                        code: view.code
                    });
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattlecheertip6-" + code));
                }
            }
        }, view);
        view._btn = btn;
        view.addChild(btn);
        var info = view.vo.getCheerId();
        var txt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt, tiptxt, [85, tiptxt.height + 30]);
        view._cheerTxt = txt;
        view.addChild(txt);
        var bottomBg = BaseBitmap.create("acgroupwifebattlebottombg-" + code);
        bottomBg.height = 80;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0, -60]);
        view.addChild(bottomBg);
        var bottomleft = BaseBitmap.create("acgroupwifebattlecorner-" + code);
        bottomleft.setPosition(0, GameConfig.stageHeigth - bottomleft.height);
        view.addChild(bottomleft);
        var bottomright = BaseBitmap.create("acgroupwifebattlecorner-" + code);
        bottomright.scaleX = -1;
        bottomright.setPosition(GameConfig.stageWidth, GameConfig.stageHeigth - bottomright.height);
        view.addChild(bottomright);
        for (var i in this.cfg.audienceReward) {
            var unit = this.cfg.audienceReward[i];
            unit.idvRank = unit.allianceRank;
        }
        var rewardData = this.cfg.audienceReward;
        var rect = new egret.Rectangle(0, 0, 640, bottomBg.y - (bg.y + bg.height + 40));
        var data = {};
        data.type = 1;
        data.code = this.param.data.code;
        var list = ComponentManager.getScrollList(AcBattleRewardScrollItem, rewardData, rect, data);
        list.setPosition(-3, bg.y + bg.height + 40);
        list.bounces = false;
        view.addChild(list);
        view.freshview();
    };
    AcGroupWifeBattleGuessView.prototype.freshview = function () {
        var view = this;
        var code = view.getUiCode();
        var info = view.vo.getCheerId();
        if (info) {
            var param = [info.name];
            var str = "acGroupWifeBattlecheertip4";
            view._btn.visible = false;
            if (info.isout) {
                param.push(LanguageManager.getlocal("acBattleRoundOut-" + code));
            }
            else if (view.vo.getCurperiod() > 2) {
                if (Number(view.vo.getWinnerAlliance().mid) == Number(info.id)) {
                    param.push(LanguageManager.getlocal("acBattleRoundWin-" + code));
                }
                else {
                    param.push(LanguageManager.getlocal("acBattleRoundOut-" + code));
                }
            }
            else {
                view._btn.visible = true;
                str = "acGroupWifeBattlecheertip14";
            }
            view._cheerTxt.text = LanguageManager.getlocal(str + "-" + code, param);
            view._cheerTxt.visible = true;
            view._btn.setText("acGroupWifeBattlecheertip5-" + code, true);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._btn, view._cheerTxt, [view._cheerTxt.textWidth + 25, 0]);
            App.CommonUtil.removeIconFromBDOC(view._btn);
        }
        else {
            if (view.vo.getCurRound() == 1) {
                view._btn.visible = true;
                view._btn.setText("acGroupWifeBattlecheertip7-" + code, true);
                view._cheerTxt.visible = false;
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._btn, view._cheerTxt, [110, 0]);
                if (Api.atkraceVoApi.isShowNpc()) {
                    App.CommonUtil.addIconToBDOC(view._btn);
                }
            }
            else {
                view._btn.visible = false;
                view._cheerTxt.text = LanguageManager.getlocal("acGroupWifeBattlecheertip3-" + code);
                view._cheerTxt.visible = true;
                App.DisplayUtil.changeToGray(view._cheerTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._cheerTxt, view, [0]);
            }
        }
    };
    AcGroupWifeBattleGuessView.prototype.prankCallback = function (evt) {
        var view = this;
        if (evt.data.ret && evt.data.data.data) {
            view.freshview();
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCheerSucess"));
            var baseview = ViewController.getInstance().getView('AcGroupWifeBattleGuessSelectView');
            baseview.hide();
        }
    };
    AcGroupWifeBattleGuessView.prototype.dispose = function () {
        var view = this;
        view._btn = null;
        view._cheerTxt = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHEER), view.prankCallback, view);
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleGuessView;
}(CommonView));
//# sourceMappingURL=AcGroupWifeBattleGuessView.js.map