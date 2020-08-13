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
 * desc:情缘绘卷Item
*/
var QingyuanDetailItem = (function (_super) {
    __extends(QingyuanDetailItem, _super);
    function QingyuanDetailItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._num = 0;
        return _this;
    }
    QingyuanDetailItem.prototype.initItem = function (index, data) {
        var view = this;
        view._data = data;
        view.width = 565;
        var need = data.need;
        var attr = data.attr;
        var have = Api.encounterVoApi.getActiveBuffNum(data.type);
        // let flower = BaseBitmap.create(`qingyuanflower`);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flower, view, [0,10], true);
        // view.addChild(flower);
        var txtcolor = have >= (data.id) ? TextFieldConst.COLOR_LIGHT_YELLOW : TextFieldConst.COLOR_WHITE;
        var strarr = [];
        var attrarr = attr.addattr;
        var attrstring = ["strength", "intelligence", "politics", "charm", "all", "strength_Constant", "intelligence_Constant",
            "politics_Constant", "charm_Constant", "all_Constant", "wife_Intimacy", "wife_Charm", "wife_exp", "wife_Child"];
        for (var j in attr.addattr) {
            var sid = j;
            var name_1 = "";
            if (Config.ServantCfg.getServantItemById(sid)) {
                name_1 = Config.ServantCfg.getServantItemById(sid).name;
            }
            else if (Config.WifeCfg.getWifeCfgById(sid)) {
                name_1 = Config.WifeCfg.getWifeCfgById(sid).name;
            }
            var unit = attr.addattr[j];
            for (var k in attrstring) {
                var attrstr = attrstring[k];
                var num = unit[attrstr];
                if (num > 0) {
                    //处理
                    if (num < 1) {
                        num *= 100;
                    }
                    strarr.push("" + name_1 + LanguageManager.getlocal("qingyuanadd" + attrstr, [num.toString()]));
                }
            }
        }
        var childall = attr.all_Child;
        if (childall) {
            if (childall < 1) {
                childall *= 100;
            }
            strarr.push("" + LanguageManager.getlocal("qingyuanaddall_Child", [childall.toString()]));
        }
        if (attr.reward) {
            var rewardvo = GameData.formatRewardItem(attr.reward)[0];
            strarr.push("" + LanguageManager.getlocal("qingyuanaddgetrewards", [rewardvo.itemType, rewardvo.name, rewardvo.num.toString()]));
        }
        for (var i in strarr) {
            var isdouble = Number(i) % 2 == 0;
            var addtxt = ComponentManager.getTextField(strarr[i], 22, txtcolor);
            addtxt.x = isdouble ? 0 : (view.width - addtxt.width);
            addtxt.y = Math.floor(Number(i) / 2) * 28 + 5;
            addtxt.name = "str" + i;
            view.addChild(addtxt);
        }
        view._num = strarr.length;
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_SELECTED_WIFE,this.clickItemHandler,this);
    };
    QingyuanDetailItem.prototype.refresh = function () {
        var view = this;
        var have = Api.encounterVoApi.getActiveBuffNum(view._data.type);
        var txtcolor = have >= (view._index + 1) ? TextFieldConst.COLOR_LIGHT_YELLOW : TextFieldConst.COLOR_WHITE;
        for (var i = 0; i < view._num; ++i) {
            var txt = view.getChildByName("str" + i);
            if (txt) {
                txt.textColor = txtcolor;
            }
        }
    };
    /**
      * 不同格子X间距
      */
    QingyuanDetailItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    QingyuanDetailItem.prototype.getSpaceY = function () {
        return 0;
    };
    QingyuanDetailItem.prototype.dispose = function () {
        var view = this;
        view._num = 0;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return QingyuanDetailItem;
}(ScrollListItem));
__reflect(QingyuanDetailItem.prototype, "QingyuanDetailItem");
//# sourceMappingURL=QingyuanDetailItem.js.map