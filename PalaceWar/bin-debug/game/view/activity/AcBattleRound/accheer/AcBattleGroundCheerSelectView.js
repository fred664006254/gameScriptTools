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
 * 个人活动排名
 * author qianjun
 */
var AcBattleGroundCheerSelectView = (function (_super) {
    __extends(AcBattleGroundCheerSelectView, _super);
    // 滑动列表
    function AcBattleGroundCheerSelectView() {
        return _super.call(this) || this;
    }
    AcBattleGroundCheerSelectView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcBattleGroundCheerSelectView.prototype.getOffsetX = function () {
        return 41;
    };
    Object.defineProperty(AcBattleGroundCheerSelectView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerSelectView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerSelectView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerSelectView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerSelectView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundCheerSelectView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "rank_line"
        ]);
    };
    AcBattleGroundCheerSelectView.prototype.initView = function () {
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
        var tip1txt = ComponentManager.getTextField(LanguageManager.getlocal("battlegroundcheertip9-" + code), 22, TextFieldConst.COLOR_BLACK);
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
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("battlegroundcheertip10-" + code), titleTxt1.size);
        titleTxt3.x = titlebg.x + 220 - 20;
        titleTxt3.y = titleTxt1.y;
        view.addChildToContainer(titleTxt3);
        var titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("battlegroundcheertip11-" + code), titleTxt1.size);
        titleTxt4.x = titlebg.x + 330 - 20;
        titleTxt4.y = titleTxt1.y;
        view.addChildToContainer(titleTxt4);
        // let tmp = [];
        // for(let i = 1; i < 10; ++ i){
        // 	tmp.push({
        // 		name : `玩家${i}`,
        // 		zid : i,
        // 		value : App.MathUtil.getRandom(1,9999999),
        // 		add : App.MathUtil.getRandom(1,9999999),
        // 	});
        // }
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
        // let rankInfo = view.vo.getRankInfo();
        // if(rankInfo.rankList && rankInfo.rankList.length){
        // 	rankList = rankInfo.rankList;
        // }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 555, arr.length * 80);
        var scrollList = ComponentManager.getScrollList(AcBattleGroundCheerSelectItem, arr, rect2, this.code);
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
        var othertxt = ComponentManager.getTextField(LanguageManager.getlocal("battlegroundcheertip12-" + code), 22, TextFieldConst.COLOR_BLACK);
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
        var othertitleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("battlegroundcheertip10-" + code), titleTxt1.size);
        othertitleTxt3.x = othertitlebg.x + 220 - 20;
        othertitleTxt3.y = othertitleTxt1.y;
        view.addChildToContainer(othertitleTxt3);
        var othertitleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("battlegroundcheertip11-" + code), titleTxt1.size);
        othertitleTxt4.x = othertitlebg.x + 330 - 20;
        othertitleTxt4.y = othertitleTxt1.y;
        view.addChildToContainer(othertitleTxt4);
        // let tmp = [];
        // for(let i = 1; i < 10; ++ i){
        // 	tmp.push({
        // 		name : `玩家${i}`,
        // 		zid : i,
        // 		value : App.MathUtil.getRandom(1,9999999),
        // 		add : App.MathUtil.getRandom(1,9999999),
        // 	});
        // }
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
        var otherscrollList = ComponentManager.getScrollList(AcBattleGroundCheerSelectItem, arr, rect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, otherscrollList, othertitlebg, [0, othertitlebg.height]);
        view.addChildToContainer(otherscrollList);
        otherscrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        otherscrollList.bounces = false;
        otherbg.height = otherscrollList.height + otherscrollList.y - otherbg.y;
        var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal("battlegroundcheertip13-" + code), 20, TextFieldConst.COLOR_BLACK);
        tiptxt.lineSpacing = 5;
        tiptxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, otherbg, [0, otherbg.height + 10]);
        view.addChildToContainer(tiptxt);
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {	
    // 	let view = this;
    // 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_LOCTOMBRANK,requestData:{
    // 		activeId : view.vo.aidAndCode,
    // 	}};
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void
    // {
    // 	let view = this;
    // 	view.vo.setRankInfo(data.data.data);
    // }
    AcBattleGroundCheerSelectView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
    };
    AcBattleGroundCheerSelectView.prototype.getShowWidth = function () {
        return 600;
    };
    AcBattleGroundCheerSelectView.prototype.getShowHeight = function () {
        return 798;
    };
    AcBattleGroundCheerSelectView.prototype.getTitleStr = function () {
        return 'rankViewTitle';
    };
    AcBattleGroundCheerSelectView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcBattleGroundCheerSelectView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundCheerSelectView;
}(PopupView));
__reflect(AcBattleGroundCheerSelectView.prototype, "AcBattleGroundCheerSelectView");
//# sourceMappingURL=AcBattleGroundCheerSelectView.js.map