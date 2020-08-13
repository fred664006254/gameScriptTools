/*
    author : shaoliang
    date : 2019.10.28
    desc : 战斗门客的图标
*/
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
var LadderBattleServantIcon = (function (_super) {
    __extends(LadderBattleServantIcon, _super);
    function LadderBattleServantIcon() {
        var _this = _super.call(this) || this;
        _this._selectBitmap = null;
        _this._result = null;
        return _this;
    }
    LadderBattleServantIcon.prototype.init = function (info) {
        var bg = BaseBitmap.create("ladder_battle_servantbg");
        bg.name = "bg";
        this.addChild(bg);
        var servantpic = "";
        if (info.equip) {
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(info.equip);
            servantpic = skincfg.cell;
        }
        else {
            servantpic = "servant_cell_" + info.sid;
        }
        var icon = BaseLoadBitmap.create(servantpic);
        icon.width = bg.width;
        icon.height = bg.height;
        icon.name = "icon2";
        this.addChild(icon);
        var mask = BaseBitmap.create("ladder_battle_servantmask");
        icon.mask = mask;
        var namebg = BaseBitmap.create("ladder_battle_servant_namebg");
        namebg.name = "namebg";
        this.addChild(namebg);
        var nametext = ComponentManager.getTextField(LanguageManager.getlocal("servant_name" + info.sid), 20, TextFieldConst.COLOR_BROWN);
        nametext.setPosition(bg.width / 2 - nametext.width / 2, bg.height - 28);
        nametext.name = "nametext";
        this.addChild(nametext);
    };
    LadderBattleServantIcon.prototype.setSelect = function (s) {
        if (s) {
            if (!this._selectBitmap) {
                var bg = this.getChildByName("bg");
                this._selectBitmap = BaseBitmap.create("ladder_battle_servant_light");
                this._selectBitmap.width = 124;
                this._selectBitmap.height = 160;
                this._selectBitmap.setPosition(bg.width / 2 - this._selectBitmap.width / 2, bg.height / 2 - this._selectBitmap.height / 2);
                this.addChild(this._selectBitmap);
            }
        }
        else {
            if (this._selectBitmap) {
                this._selectBitmap.dispose();
                this._selectBitmap = null;
            }
        }
    };
    LadderBattleServantIcon.prototype.setResult = function (r) {
        if (this._result) {
            return;
        }
        if (r == 2) {
            App.DisplayUtil.changeToGray(this.getChildByName("bg"));
            // App.DisplayUtil.changeToGray(this.getChildByName("icon2"));
            this.getChildByName("icon2").alpha = 0.6;
            App.DisplayUtil.changeToGray(this.getChildByName("namebg"));
            App.DisplayUtil.changeToGray(this.getChildByName("nametext"));
        }
        var result = BaseBitmap.create("ladder_formation_icon" + r);
        result.setPosition(6, 65);
        this.addChild(result);
        this._result = result;
    };
    LadderBattleServantIcon.prototype.dispose = function () {
        this._selectBitmap = null;
        this._result = null;
        _super.prototype.dispose.call(this);
    };
    return LadderBattleServantIcon;
}(BaseDisplayObjectContainer));
__reflect(LadderBattleServantIcon.prototype, "LadderBattleServantIcon");
//# sourceMappingURL=LadderBattleServantIcon.js.map