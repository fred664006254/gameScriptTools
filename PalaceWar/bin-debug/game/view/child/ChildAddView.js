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
//子嗣属性加成说明
var ChildAddView = (function (_super) {
    __extends(ChildAddView, _super);
    function ChildAddView() {
        return _super.call(this) || this;
    }
    ChildAddView.prototype.initView = function () {
        var childvo = this.param.data;
        var wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
        var starEffect = Config.WifestatusbaseCfg.starEffect;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 525;
        bg.height = 220;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var add1 = 0;
        if (Api.switchVoApi.checkOpenWifeStatus()) {
            add1 = wifestatusVo.star * starEffect;
        }
        var add2 = 0;
        if (Api.switchVoApi.checkOpenQingYuanHuiJuan()) {
            add2 = Api.encounterVoApi.getChildAdd(childvo.motherId);
        }
        var addstr = LanguageManager.getlocal("wifeStatusProAdd3", [(add1 + add2).toFixed(1)]);
        var topTF = ComponentManager.getTextField(addstr, 26, TextFieldConst.COLOR_WHITE);
        topTF.setPosition(bg.x + bg.width / 2 - topTF.width / 2, bg.y + 20);
        this.addChildToContainer(topTF);
        var addstr1 = LanguageManager.getlocal("wifeStatusProAdd2", [(add1).toFixed(1)]);
        var addstr2 = LanguageManager.getlocal("wifeStatusProAdd5", [(add2).toFixed(1)]);
        Api.switchVoApi.checkOpenQingYuanHuiJuan() || Api.switchVoApi.checkOpenWifeStatus();
        var topTF1 = ComponentManager.getTextField(addstr1, 26, TextFieldConst.COLOR_WHITE);
        topTF1.setPosition(bg.x + bg.width / 2 - topTF1.width / 2, topTF.y + topTF.height + 20);
        this.addChildToContainer(topTF1);
        var topTF2 = ComponentManager.getTextField(addstr2, 26, TextFieldConst.COLOR_WHITE);
        topTF2.setPosition(bg.x + bg.width / 2 - topTF2.width / 2, topTF1.y + topTF1.height + 20);
        this.addChildToContainer(topTF2);
        if (!Api.switchVoApi.checkOpenWifeStatus()) {
            topTF1.visible = false;
            topTF2.y = topTF1.y;
        }
        if (!Api.switchVoApi.checkOpenQingYuanHuiJuan()) {
            topTF2.visible = false;
        }
    };
    ChildAddView.prototype.getTitleStr = function () {
        return "wifeStatusProAdd4";
    };
    ChildAddView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ChildAddView;
}(PopupView));
__reflect(ChildAddView.prototype, "ChildAddView");
//# sourceMappingURL=ChildAddView.js.map