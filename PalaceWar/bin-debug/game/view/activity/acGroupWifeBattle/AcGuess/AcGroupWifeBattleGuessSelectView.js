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
 * 风华群芳 竞猜选择
 */
var AcGroupWifeBattleGuessSelectView = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleGuessSelectView, _super);
    function AcGroupWifeBattleGuessSelectView() {
        return _super.call(this) || this;
    }
    AcGroupWifeBattleGuessSelectView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcGroupWifeBattleGuessSelectView.prototype.getOffsetX = function () {
        return 41;
    };
    Object.defineProperty(AcGroupWifeBattleGuessSelectView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleGuessSelectView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleGuessSelectView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleGuessSelectView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleGuessSelectView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleGuessSelectView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "rank_line"
        ]);
    };
    AcGroupWifeBattleGuessSelectView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        var contentBg = BaseBitmap.create("battlerankbg");
        contentBg.scaleX = 530 / contentBg.width;
        contentBg.x = this.viewBg.width / 2 - 530 / 2;
        contentBg.y = 10;
        view.addChildToContainer(contentBg);
        var fontTitleBg = BaseLoadBitmap.create("battletitle");
        fontTitleBg.y = 15;
        view.addChildToContainer(fontTitleBg);
        var tip1txt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattlecheertip9-" + code), 22, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip1txt, contentBg, [0, 10]);
        view.addChildToContainer(tip1txt);
        fontTitleBg.width = 309 + tip1txt.width + 10;
        fontTitleBg.x = tip1txt.x + (tip1txt.width - fontTitleBg.width) / 2;
        var titlebg = BaseBitmap.create("battleyellow");
        titlebg.width = 560 - 33.5;
        titlebg.height = 30;
        titlebg.x = contentBg.x + 2;
        titlebg.y = contentBg.y + 40;
        view.addChildToContainer(titlebg);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank3"), 22);
        titleTxt1.x = titlebg.x + 30 - 20;
        titleTxt1.y = titlebg.y + 5;
        view.addChildToContainer(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab4ZidTile-1"), titleTxt1.size);
        titleTxt2.x = titlebg.x + 150 - 20;
        titleTxt2.y = titleTxt1.y;
        view.addChildToContainer(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattlecheertip10-" + code), titleTxt1.size);
        titleTxt3.x = titlebg.x + 220 - 20;
        titleTxt3.y = titleTxt1.y;
        view.addChildToContainer(titleTxt3);
        var titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattlecheertip11-" + code), titleTxt1.size);
        titleTxt4.x = titlebg.x + 330 - 20;
        titleTxt4.y = titleTxt1.y;
        view.addChildToContainer(titleTxt4);
        //本服帮会
        var arr = [];
        var len = view.vo.getMapLenth();
        for (var i = 1; i <= len; ++i) {
            var unit = view.vo.getAllInfoById(i);
            if (Api.mergeServerVoApi.judgeIsSameServer(unit.server, Api.mergeServerVoApi.getTrueZid())) {
                unit.pos = [
                    { width: titleTxt1.textWidth, x: titleTxt1.x },
                    { width: titleTxt2.textWidth, x: titleTxt2.x },
                    { width: titleTxt3.textWidth, x: titleTxt3.x },
                    { width: titleTxt4.textWidth, x: titleTxt4.x },
                ];
                arr.push(unit);
            }
        }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 555, arr.length * 80);
        var scrollList = ComponentManager.getScrollList(AcGroupWifeBattleGuessSelectItem, arr, rect2, this.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, titlebg, [0, titlebg.height]);
        view.addChildToContainer(scrollList);
        scrollList.bounces = false;
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        contentBg.height = scrollList.height + scrollList.y;
        //他服帮会
        var otherbg = BaseBitmap.create("battlerankbg");
        otherbg.scaleX = 530 / otherbg.width;
        otherbg.x = contentBg.x;
        otherbg.y = contentBg.y + contentBg.height + 20;
        view.addChildToContainer(otherbg);
        var othertxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattlecheertip12-" + code), 22, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, othertxt, otherbg, [0, 10]);
        var fontTitleBg2 = BaseLoadBitmap.create("battletitle");
        fontTitleBg2.y = othertxt.y - 5;
        view.addChildToContainer(fontTitleBg2);
        view.addChildToContainer(othertxt);
        var othertitlebg = BaseBitmap.create("battleyellow");
        othertitlebg.width = 560 - 33.5;
        othertitlebg.height = 30;
        othertitlebg.x = titlebg.x;
        othertitlebg.y = otherbg.y + 40;
        view.addChildToContainer(othertitlebg);
        fontTitleBg2.width = 309 + othertxt.width + 10;
        fontTitleBg2.x = othertxt.x + (othertxt.width - fontTitleBg2.width) / 2;
        var othertitleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank3"), 22);
        othertitleTxt1.x = othertitlebg.x + 30 - 20;
        othertitleTxt1.y = othertitlebg.y + 5;
        view.addChildToContainer(othertitleTxt1);
        var othertitleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab4ZidTile-1"), titleTxt1.size);
        othertitleTxt2.x = othertitlebg.x + 150 - 20;
        othertitleTxt2.y = othertitleTxt1.y;
        view.addChildToContainer(othertitleTxt2);
        var othertitleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattlecheertip10-" + code), titleTxt1.size);
        othertitleTxt3.x = othertitlebg.x + 220 - 20;
        othertitleTxt3.y = othertitleTxt1.y;
        view.addChildToContainer(othertitleTxt3);
        var othertitleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattlecheertip11-" + code), titleTxt1.size);
        othertitleTxt4.x = othertitlebg.x + 330 - 20;
        othertitleTxt4.y = othertitleTxt1.y;
        view.addChildToContainer(othertitleTxt4);
        arr = [];
        for (var i = 1; i <= len; ++i) {
            var unit = view.vo.getAllInfoById(i);
            if (!Api.mergeServerVoApi.judgeIsSameServer(unit.server, Api.mergeServerVoApi.getTrueZid())) {
                unit.pos = [
                    { width: titleTxt1.textWidth, x: titleTxt1.x },
                    { width: titleTxt2.textWidth, x: titleTxt2.x },
                    { width: titleTxt3.textWidth, x: titleTxt3.x },
                    { width: titleTxt4.textWidth, x: titleTxt4.x },
                ];
                arr.push(unit);
            }
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 555, 650 - othertitlebg.y - othertitlebg.height);
        var otherscrollList = ComponentManager.getScrollList(AcGroupWifeBattleGuessSelectItem, arr, rect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, otherscrollList, othertitlebg, [0, othertitlebg.height]);
        view.addChildToContainer(otherscrollList);
        otherscrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        otherscrollList.bounces = false;
        otherbg.height = otherscrollList.height + otherscrollList.y - otherbg.y;
        // let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattlecheertip13-${code}`), 20, TextFieldConst.COLOR_BLACK);
        // tiptxt.lineSpacing = 5;
        // tiptxt.textAlign = egret.HorizontalAlign.CENTER;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, otherbg, [0,otherbg.height + 10]);
        // view.addChildToContainer(tiptxt);
    };
    AcGroupWifeBattleGuessSelectView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
    };
    AcGroupWifeBattleGuessSelectView.prototype.getShowWidth = function () {
        return 600;
    };
    AcGroupWifeBattleGuessSelectView.prototype.getShowHeight = function () {
        return 798;
    };
    AcGroupWifeBattleGuessSelectView.prototype.getTitleStr = function () {
        return 'rankViewTitle';
    };
    AcGroupWifeBattleGuessSelectView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcGroupWifeBattleGuessSelectView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleGuessSelectView;
}(PopupView));
//# sourceMappingURL=AcGroupWifeBattleGuessSelectView.js.map