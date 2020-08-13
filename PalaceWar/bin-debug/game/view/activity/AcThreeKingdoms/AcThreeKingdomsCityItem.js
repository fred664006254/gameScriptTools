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
var AcThreeKingdomsCityItem = (function (_super) {
    __extends(AcThreeKingdomsCityItem, _super);
    function AcThreeKingdomsCityItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        _this._data = null;
        _this._citySingle = null;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsCityItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_THREEKINGDOMS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsCityItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsCityItem.prototype.initItem = function (index, data, param) {
        var view = this;
        view._code = param;
        view._data = data;
        view.width = 260;
        view.height = 107;
        var code = view.getUiCode();
        var i = data.id;
        var citySingle = new BaseDisplayObjectContainer();
        citySingle.name = "citySingle" + i;
        view.addChild(citySingle);
        citySingle.width = 150;
        citySingle.height = 102;
        view._citySingle = citySingle;
        view.addChild(citySingle);
        var bg = BaseBitmap.create("threekingdomscityzhanjulistbg");
        citySingle.addChild(bg);
        bg.name = "bg";
        var playerGroup = new BaseDisplayObjectContainer();
        playerGroup.width = 230;
        playerGroup.height = 70;
        playerGroup.name = "playerGroup";
        citySingle.addChild(playerGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playerGroup, bg);
        var emptyTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip51", view.getUiCode()), [view.cfg.powerNeed.toString()]), 20, TextFieldConst.COLOR_BROWN);
        emptyTxt.name = "emptyTxt";
        emptyTxt.lineSpacing = 10;
        emptyTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, emptyTxt, bg);
        citySingle.addChild(emptyTxt);
        var flag = BaseBitmap.create("threekingdomscityzhanjuflag");
        citySingle.addChild(flag);
        flag.name = "flag";
        // citySingle.setPosition(i % 2 == 1 ? 10 : 270, 10 + (Math.ceil(i / 2) - 1) * 110);
        citySingle.addTouchTap(function () {
            //打开出站弹窗
            if (view.vo.isInWarTime()) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSPREPAREVIEW, {
                    aid: view.aid,
                    code: view.code,
                    cityId: data.cityid,
                    kingdomid: data.kingdomid,
                    judianid: i
                });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("acThreeKingdomsTip60-1"));
                // view.hide();
            }
        }, view, null);
        var order = BaseBitmap.create("threekingdomscityzhanjuorder");
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, order, bg);
        citySingle.addChild(order);
        var ordrTxt = ComponentManager.getTextField("" + i, 16);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ordrTxt, order, [0, -4]);
        citySingle.addChild(ordrTxt);
        view.freshCity();
    };
    AcThreeKingdomsCityItem.prototype.freshCity = function () {
        var view = this;
        var code = view.getUiCode();
        var citySingle = view._citySingle;
        var playerGroup = citySingle.getChildByName("playerGroup");
        var bg = citySingle.getChildByName("bg");
        var emptyTxt = citySingle.getChildByName("emptyTxt");
        var flag = citySingle.getChildByName("flag");
        flag.visible = false;
        emptyTxt.visible = false;
        if (playerGroup) {
            playerGroup.removeChildren();
        }
        var data = view.vo.getJudianPlayerInfo(view._data.kingdomid, view._data.cityid, view._data.id);
        if (data) {
            bg.setRes("threekingdomscityzhanjulistbg" + data.kingdomid);
            //头像框
            var headContainer = Api.playerVoApi.getPlayerCircleHead(Number(data.pic), (data.ptitleid));
            flag.visible = Number(data.uid) == Api.playerVoApi.getPlayerID();
            headContainer.addTouchTap(function () {
                NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {
                    ruid: data.uid,
                    rzid: Api.mergeServerVoApi.getTrueZid(data.uid)
                });
            }, this);
            headContainer.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, headContainer, playerGroup, [0, -5], true);
            var namebg = BaseBitmap.create("threekingdomscityzhanjunamebg" + data.kingdomid);
            playerGroup.addChild(namebg);
            namebg.setPosition(26, 0);
            //玩家名`<font size=18>${Number(data.uid) == Api.playerVoApi.getPlayerID() ? (`(${(data.army / data.max * 100).toFixed(0)}%)`) : ``}</font>`
            var playernameTxt = ComponentManager.getTextField(data.name, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playernameTxt, namebg);
            playerGroup.addChild(playernameTxt);
            //阵营
            var kingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip52", code), [LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTeam" + data.kingdomid, code))]), 18, TextFieldConst.COLOR_BROWN);
            playerGroup.addChild(kingdomTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, kingdomTxt, namebg, [60, 30]);
            //兵力
            var numTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip29", code), [App.StringUtil.changeIntToText3(data.army)]), 18, TextFieldConst.COLOR_BROWN);
            playerGroup.addChild(numTxt);
            playerGroup.addChild(headContainer);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, numTxt, kingdomTxt, [0, kingdomTxt.textHeight + 5]);
        }
        else {
            bg.setRes("threekingdomscityzhanjulistbg");
            emptyTxt.visible = true;
        }
    };
    AcThreeKingdomsCityItem.prototype.dispose = function () {
        var view = this;
        view._citySingle = null;
        view._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsCityItem;
}(ScrollListItem));
__reflect(AcThreeKingdomsCityItem.prototype, "AcThreeKingdomsCityItem");
//# sourceMappingURL=AcThreeKingdomsCityItem.js.map