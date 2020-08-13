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
 * 门客item
 * author shaoliang
 * @class LadderChooseTeamItem
 */
var LadderChooseTeamItem = (function (_super) {
    __extends(LadderChooseTeamItem, _super);
    function LadderChooseTeamItem() {
        var _this = _super.call(this) || this;
        _this._sid = null;
        _this._upBtn = null;
        _this._downBtn = null;
        _this._status = 0; // 1可上阵  2已上阵  3别处上阵了
        _this._fuction = null;
        _this._fuction2 = null;
        _this._obj = null;
        return _this;
    }
    LadderChooseTeamItem.prototype.initItem = function (index, data, parms) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_TEAM_CHOOSE, this.resetInfo, this);
        this._sid = data;
        var type = parms.type;
        this._fuction = parms.f;
        this._fuction2 = parms.f2;
        this._obj = parms.o;
        var bg = BaseBitmap.create("wifebattleyonglelistbg");
        this.height = bg.height + this.getSpaceY();
        this.addChild(bg);
        var servantvo = Api.servantVoApi.getServantObj(this._sid);
        var servantIcon = BaseLoadBitmap.create(servantvo.halfImgPath);
        servantIcon.width = 125;
        servantIcon.height = 125;
        servantIcon.setPosition(2, 2);
        this.addChild(servantIcon);
        var namestr = servantvo.servantName;
        // if(servantvo.equip && servantvo.equip != ``){
        //     let skinCfg = Config.ServantskinCfg.getServantSkinItemById(servantvo.equip);
        //     namestr = namestr + "  " + skinCfg.name;
        // }
        var nameText = ComponentManager.getTextField(namestr, 20, TextFieldConst.COLOR_WARN_YELLOW2);
        nameText.setPosition(150, 20);
        this.addChild(nameText);
        var attrStr = LanguageManager.getlocal("servant_newui_zizhi" + type, [String(servantvo.getTotalBookValue(type))]);
        var attrText = ComponentManager.getTextField(attrStr, 18, TextFieldConst.COLOR_BROWN);
        attrText.setPosition(nameText.x, nameText.y + 40);
        this.addChild(attrText);
        var propStr = LanguageManager.getlocal("acLadder_servantAttr" + type, [String(servantvo.getTotalAttrValye(type))]);
        var propText = ComponentManager.getTextField(propStr, 18, TextFieldConst.COLOR_BROWN);
        propText.setPosition(nameText.x, nameText.y + 70);
        this.addChild(propText);
        var battleType = Api.laddertournamentVoApi.getServantBattleType(this._sid);
        if (battleType > 0 && battleType != type) {
            var inbattlebg = BaseLoadBitmap.create("ladder_inbattle_bg" + battleType);
            inbattlebg.width = 138;
            inbattlebg.height = 58;
            inbattlebg.setPosition(370, bg.height / 2 - inbattlebg.height / 2);
            this.addChild(inbattlebg);
            var battlestr = LanguageManager.getlocal("acLadder_team_inbattle" + battleType);
            var battleText = ComponentManager.getTextField(battlestr, 18, TextFieldConst.COLOR_WHITE);
            battleText.setPosition(inbattlebg.x + inbattlebg.width / 2 - battleText.width / 2, inbattlebg.y + inbattlebg.height / 2 - battleText.height / 2);
            ;
            this.addChild(battleText);
            this._status = 3;
        }
        else {
            var btn1 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "emperorWarBuzhenUp", this.upHandle, this);
            btn1.setPosition(bg.width - btn1.width - 30, bg.height / 2 - btn1.height / 2);
            this.addChild(btn1);
            var btn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "countryWarServantCancel", this.downHandle, this);
            btn2.setPosition(btn1.x, btn1.y);
            this.addChild(btn2);
            this._upBtn = btn1;
            this._downBtn = btn2;
            if (battleType != type) {
                btn2.visible = false;
                this._status = 1;
            }
            else {
                btn1.visible = false;
                this._status = 2;
            }
        }
    };
    LadderChooseTeamItem.prototype.upHandle = function () {
        this._fuction.apply(this._obj, [this._sid]);
    };
    LadderChooseTeamItem.prototype.downHandle = function () {
        this._fuction2.apply(this._obj, [this._sid]);
    };
    LadderChooseTeamItem.prototype.resetInfo = function (event) {
        if (this._status == 3) {
            return;
        }
        var sids = event.data;
        if (GameData.isInArray(this._sid, sids)) {
            this._upBtn.visible = false;
            this._downBtn.visible = true;
            this._status = 2;
        }
        else {
            this._upBtn.visible = true;
            this._downBtn.visible = false;
            this._status = 1;
        }
    };
    LadderChooseTeamItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_TEAM_CHOOSE, this.resetInfo, this);
        this._sid = null;
        this._upBtn = null;
        this._downBtn = null;
        this._status = 0;
        this._fuction = null;
        this._fuction2 = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return LadderChooseTeamItem;
}(ScrollListItem));
__reflect(LadderChooseTeamItem.prototype, "LadderChooseTeamItem");
//# sourceMappingURL=LadderChooseTeamItem.js.map