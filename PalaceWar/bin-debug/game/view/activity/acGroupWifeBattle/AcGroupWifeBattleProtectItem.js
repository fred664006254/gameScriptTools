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
var AcGroupWifeBattleProtectItem = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleProtectItem, _super);
    function AcGroupWifeBattleProtectItem() {
        return _super.call(this) || this;
    }
    AcGroupWifeBattleProtectItem.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcGroupWifeBattleProtectItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleProtectItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleProtectItem.prototype, "code", {
        get: function () {
            return this.param.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleProtectItem.prototype, "aid", {
        get: function () {
            return this.param.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleProtectItem.prototype.initItem = function (index, data, param) {
        var _this = this;
        this.param = param;
        var view = this;
        var code = view.getUiCode();
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 120;
        view.addChild(bg);
        var iconCon = new BaseDisplayObjectContainer();
        var head = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), Api.playerVoApi.getPlayerPtitle());
        iconCon.addChild(head);
        view.addChild(iconCon);
        iconCon.setPosition(10, bg.height / 2 - iconCon.height / 2);
        var nametxt = ComponentManager.getTextField(data.name, 20, TextFieldConst.COLOR_WHITE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nametxt, bg, [iconCon.x + iconCon.width, 20]);
        view.addChild(nametxt);
        var ranktxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleProtectItemRank-" + code, [data.rank + ""]), 20, TextFieldConst.COLOR_BROWN);
        ranktxt.setPosition(nametxt.x, nametxt.y + nametxt.height + 15);
        view.addChild(ranktxt);
        var scoretxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleProtectItemScore-" + code, [data.score + ""]), 20, TextFieldConst.COLOR_BROWN);
        scoretxt.setPosition(ranktxt.x, ranktxt.y + ranktxt.height + 10);
        view.addChild(scoretxt);
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acGroupWifeBattleProtectBtnTxt-" + code, function () {
            if (!data.ispro && data.times > 0) {
                if (param.mytimes > 0) {
                    if (param.itemnum > 0) {
                        var message = LanguageManager.getlocal("acGroupWifeBattleProtectSure-" + code);
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                            msg: message,
                            title: "itemUseConstPopupViewTitle",
                            touchMaskClose: true,
                            callback: function () {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleProtectNoItem-" + code));
                            },
                            handler: _this,
                            needClose: 1,
                            needCancel: true
                        });
                    }
                    else {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleProtectNoItem-" + code));
                    }
                }
            }
        }, this);
        btn.setPosition(bg.width - btn.width - 50, bg.height / 2 - btn.height / 2 - 10);
        this.addChild(btn);
        if (data.ispro) {
            btn.visible = false;
            var idtxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleProtectProID-" + code, [data.pid]), 20, TextFieldConst.COLOR_BLACK);
            idtxt.textAlign = egret.HorizontalAlign.CENTER;
            idtxt.lineSpacing = 3;
            idtxt.setPosition(btn.x + btn.width / 2 - idtxt.width / 2, bg.height / 2 - idtxt.height / 2);
            view.addChild(idtxt);
        }
        else {
            if (data.times > 0) {
                btn.visible = param.mytimes > 0;
                var lefttimestxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleProtectLeftTimes-" + code, [data.times + ""]), 20, TextFieldConst.COLOR_BLACK);
                lefttimestxt.setPosition(btn.x + btn.width / 2 - lefttimestxt.width / 2, btn.y + btn.height + 5);
                view.addChild(lefttimestxt);
            }
            else {
                btn.visible = false;
                var maxtxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleProtectTimesMax-" + code), 20, TextFieldConst.COLOR_BLACK);
                maxtxt.setPosition(btn.x + btn.width / 2 - maxtxt.width / 2, bg.height / 2 - maxtxt.height / 2);
                view.addChild(maxtxt);
            }
        }
    };
    AcGroupWifeBattleProtectItem.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleProtectItem;
}(ScrollListItem));
//# sourceMappingURL=AcGroupWifeBattleProtectItem.js.map