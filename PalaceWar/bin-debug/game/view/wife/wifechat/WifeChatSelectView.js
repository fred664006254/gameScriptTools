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
 * author:qianjun
 * desc:飞鸽传书选择界面
*/
var WifeChatSelectView = (function (_super) {
    __extends(WifeChatSelectView, _super);
    function WifeChatSelectView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    WifeChatSelectView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeskinjuqingpopbg", "wifeskinleveltip", "battlepassline-1"
        ]);
    };
    WifeChatSelectView.prototype.getBgName = function () {
        return "wifeskinjuqingpopbg";
    };
    WifeChatSelectView.prototype.getCloseBtnName = function () {
        return null;
    };
    WifeChatSelectView.prototype.isTouchMaskClose = function () {
        return true;
    };
    WifeChatSelectView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFECHAT_END, view.getrewardCallback, view);
        var skinId = view.param.data.skinId;
        var title = BaseBitmap.create("wifeskinjuqingtitle");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view.viewBg, [5, -title.height + 30]);
        view.addChildToContainer(title);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 469, 430);
        var arr = [];
        var cfg = Config.WifechatCfg.conversation;
        var skinlv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
        var skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(skincfg.wifeId);
        for (var i in cfg) {
            var unit = cfg[i];
            if (unit && unit.unlockType && unit.unlockType == 1) {
                var lv = Number(i) + 1;
                var curid = wifeSkinVo.getCuravgId(view.param.data.skinId, lv);
                var id = skincfg.levelUp[lv - 1].levelUpUnlock;
                var concfg = Config.WifeconversationCfg.getConversatiById(id);
                if (concfg) {
                    arr.push({
                        lv: lv,
                        unlock: skinlv >= Number(unit.skinLv),
                        skinId: skinId,
                        rewardid: "" + skincfg.levelUp[unit.skinLv - 1].levelUpUnlock,
                        isnew: Object.keys(concfg).length > curid && !wifeSkinVo.havereset(view.param.data.skinId, lv)
                    });
                }
            }
        }
        var list = ComponentManager.getScrollList(WifeChatSelectItem, arr, rect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, title, [0, title.height + 15]);
        view.addChildToContainer(list);
        list.bounces = false;
        view._list = list;
        var line = BaseBitmap.create("battlepassline-1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, list, [0, list.height]);
        view.addChildToContainer(line);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifechattip"), 20, TextFieldConst.COLOR_WARN_RED2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, title, [0, title.height + 470]);
        view.addChildToContainer(tipTxt);
    };
    WifeChatSelectView.prototype.getrewardCallback = function () {
        var view = this;
        var arr = [];
        var skinId = view.param.data.skinId;
        var cfg = Config.WifechatCfg.conversation;
        var skinlv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
        var skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(skincfg.wifeId);
        for (var i in cfg) {
            var unit = cfg[i];
            if (unit && unit.unlockType && unit.unlockType == 1) {
                var lv = Number(i) + 1;
                var curid = wifeSkinVo.getCuravgId(view.param.data.skinId, lv);
                var id = skincfg.levelUp[lv - 1].levelUpUnlock;
                var concfg = Config.WifeconversationCfg.getConversatiById(id);
                if (concfg) {
                    arr.push({
                        lv: lv,
                        unlock: skinlv >= Number(unit.skinLv),
                        skinId: skinId,
                        rewardid: "" + skincfg.levelUp[unit.skinLv - 1].levelUpUnlock,
                        isnew: Object.keys(concfg).length > curid && !wifeSkinVo.havereset(view.param.data.skinId, lv)
                    });
                }
            }
        }
        view._list.refreshData(arr);
    };
    WifeChatSelectView.prototype.getShowWidth = function () {
        return 627;
    };
    WifeChatSelectView.prototype.getShowHeight = function () {
        return 577;
    };
    WifeChatSelectView.prototype.getTitleStr = function () {
        return null;
    };
    WifeChatSelectView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFECHAT_END, view.getrewardCallback, view);
        view._list = null;
        _super.prototype.dispose.call(this);
    };
    return WifeChatSelectView;
}(PopupView));
__reflect(WifeChatSelectView.prototype, "WifeChatSelectView");
//# sourceMappingURL=WifeChatSelectView.js.map