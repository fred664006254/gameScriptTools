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
desc : PromotePlayerPopViewTab1 帮会成员
*/
var PromotePlayerPopViewTab1 = (function (_super) {
    __extends(PromotePlayerPopViewTab1, _super);
    function PromotePlayerPopViewTab1() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._posArr = [];
        _this.promoteType = 1;
        _this._maskBg = null;
        _this._listBg = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(PromotePlayerPopViewTab1.prototype, "api", {
        get: function () {
            return Api.promoteVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromotePlayerPopViewTab1.prototype, "cfg", {
        get: function () {
            return Config.PromoteCfg;
        },
        enumerable: true,
        configurable: true
    });
    PromotePlayerPopViewTab1.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth - 40;
        view.height = GameConfig.stageHeigth - 370;
        var listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = GameConfig.stageWidth - 40;
        listBg.height = GameConfig.stageHeigth - 370;
        view._listBg = listBg;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, listBg, view, [0, 20]);
        view.addChild(listBg);
        var maskBg = BaseBitmap.create("public_9_bg33");
        maskBg.width = listBg.width;
        maskBg.height = 30;
        view._maskBg = maskBg;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, maskBg, listBg, [0, 0]);
        view.addChild(maskBg);
        //添加标题文字
        view.refreshTopTitle(maskBg);
        //获取数据
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_GETLIST), view.getPromotePlayerlistCallBack, view);
        NetManager.request(NetRequestConst.REQUEST_PROMOTE_GETLIST, {
            sortKey: 1
        });
    };
    PromotePlayerPopViewTab1.prototype.refreshTopTitle = function (maskBg) {
        var view = this;
        var title_nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        title_nameTxt.text = LanguageManager.getlocal("PromotePlayersPopViewList1");
        view.addChild(title_nameTxt);
        var title_officerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        title_officerTxt.text = LanguageManager.getlocal("acRankPop_title2");
        title_officerTxt.alpha = 0;
        view.addChild(title_officerTxt);
        var title_powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        title_powerTxt.text = LanguageManager.getlocal("rankpower");
        view.addChild(title_powerTxt);
        var rmTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rmTxt.text = LanguageManager.getlocal("PromotePlayersPopViewRm");
        view.addChild(rmTxt);
        if (PlatformManager.checkIsEnSp()) {
            title_nameTxt.x = 42;
        }
        view._posArr = [];
        var desc = ((maskBg.width - TextFieldConst.FONTSIZE_TITLE_SMALL * (2 + 4 + 2 + 2)) / 5);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, title_nameTxt, maskBg, [desc - 20, 0]);
        view._posArr.push(title_nameTxt.x - maskBg.x);
        view.setLayoutPosition(LayoutConst.lefttop, title_officerTxt, title_nameTxt, [title_nameTxt.textWidth + desc + 10, 0]);
        view._posArr.push(title_officerTxt.x - maskBg.x);
        view.setLayoutPosition(LayoutConst.lefttop, title_powerTxt, title_officerTxt, [title_officerTxt.textWidth + desc + 10, 0]);
        if (PlatformManager.checkIsEnSp()) {
            view.setLayoutPosition(LayoutConst.lefttop, title_powerTxt, title_officerTxt, [title_officerTxt.textWidth + desc + 10 - 72, 0]);
            view._posArr.push(360);
        }
        else {
            view._posArr.push(title_powerTxt.x - maskBg.x);
        }
        view.setLayoutPosition(LayoutConst.rightverticalCenter, rmTxt, maskBg, [50, 0]);
        view._posArr.push(rmTxt.x - maskBg.x);
    };
    PromotePlayerPopViewTab1.prototype.refreshWhenSwitchBack = function () {
        NetManager.request(NetRequestConst.REQUEST_PROMOTE_GETLIST, {
            sortKey: 1
        });
    };
    PromotePlayerPopViewTab1.prototype.getPromotePlayerlistCallBack = function (evt) {
        if (evt && evt.data && evt.data.ret) {
            var view = this;
            var data = evt.data.data.data;
            view.api.initPlayerListData(data);
            view.freshList();
        }
    };
    PromotePlayerPopViewTab1.prototype.freshList = function () {
        var view = this;
        //列表
        var data = view.api.getPromotePlayerList();
        var lenth = data.length; //Math.floor(Math.random() * 10) + 1;
        var arr = [];
        var parent = ViewController.getInstance().getView('PromotePlayerPopView');
        for (var i = 0; i < lenth; ++i) {
            var unit = data[i];
            unit.pos_arr = view._posArr;
            unit.width = view._maskBg.width;
            unit.promoteType = parent.promoteType;
            arr.push(unit);
        }
        if (!view._scrollList) {
            var scrollList = ComponentManager.getScrollList(PromotePlayerScrollItem, arr, new egret.Rectangle(view._maskBg.x, view._maskBg.y + view._maskBg.height, view._listBg.width, view._listBg.height - 80));
            view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view._maskBg, [0, view._maskBg.height + 20]);
            view.addChild(scrollList);
            view._scrollList = scrollList;
        }
        else {
            view._scrollList.refreshData(arr);
        }
        if (data.length) {
        }
        else {
            view._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        }
    };
    // protected getTabbarGroupY() : number{
    // 	return 220;
    // };
    PromotePlayerPopViewTab1.prototype.getSheepType = function () {
        return 1;
    };
    PromotePlayerPopViewTab1.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_GETLIST), view.getPromotePlayerlistCallBack, view);
        _super.prototype.dispose.call(this);
    };
    return PromotePlayerPopViewTab1;
}(CommonViewTab));
__reflect(PromotePlayerPopViewTab1.prototype, "PromotePlayerPopViewTab1");
//# sourceMappingURL=PromotePlayerPopViewTab1.js.map