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
var WifeTalentPlusPopupScrollItem2 = (function (_super) {
    __extends(WifeTalentPlusPopupScrollItem2, _super);
    function WifeTalentPlusPopupScrollItem2() {
        return _super.call(this) || this;
    }
    WifeTalentPlusPopupScrollItem2.prototype.initItem = function (index, data) {
        this.width = 510;
        this.height = 40;
        var rankTxt;
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            // bg.x = 5;
            // bg.y = 10;
            bg.width = 510;
            bg.height = 40;
            bg.x = 0;
            // bg.y = 5;ß
            this.addChild(bg);
        }
        var fontSize = 22;
        if (PlatformManager.checkIsViSp()) {
            fontSize = 18;
        }
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(data.wid);
        rankTxt = ComponentManager.getTextField("", fontSize, TextFieldConst.COLOR_BROWN_NEW);
        rankTxt.text = wifeVo.name;
        rankTxt.x = 75 - rankTxt.width / 2;
        rankTxt.y = this.height / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        var nameTxt = ComponentManager.getTextField(data.artadd ? data.artadd : 0, fontSize, TextFieldConst.COLOR_BROWN_NEW);
        nameTxt.x = 230 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        var caiqing = data.talentadd;
        var caiqingp = data.taddnum ? data.taddnum : 0;
        var cqStr = caiqingp > 0 ? caiqing + "<font color=0x2b8729>(+" + caiqingp + ")</font>" : caiqing + "";
        var scoreTxt = ComponentManager.getTextField(cqStr, fontSize, TextFieldConst.COLOR_BROWN_NEW);
        scoreTxt.x = 404 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(scoreTxt);
        // if (data.isused) {
        //     rankTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        //     nameTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        //     scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        // }
    };
    WifeTalentPlusPopupScrollItem2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeTalentPlusPopupScrollItem2;
}(ScrollListItem));
__reflect(WifeTalentPlusPopupScrollItem2.prototype, "WifeTalentPlusPopupScrollItem2");
