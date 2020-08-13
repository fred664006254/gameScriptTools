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
 * 情缘详细弹窗
 * @class WifeSelectedPopupView
 */
var QingyuantestView = (function (_super) {
    __extends(QingyuantestView, _super);
    function QingyuantestView() {
        return _super.call(this) || this;
    }
    QingyuantestView.prototype.getResourceList = function () {
        var resArr = [
            "wifestatus_lock", "qingyuanclick", "qingyuanball", "qingyuanclicked", "qingyuanunlock"
        ];
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    QingyuantestView.prototype.getBgName = function () {
        var data = this.param.data;
        return "qingyuanpopbg" + data.type;
    };
    QingyuantestView.prototype.getCloseBtnName = function () {
        return "commonview_closebtn1";
    };
    QingyuantestView.prototype.getTitleStr = function () {
        return null;
    };
    /**
     * 需要传的参数{callback：回调函数，handler:回调函数所属对下，type：面板类型（1，2，3），itemId：使用道具时传}
     */
    QingyuantestView.prototype.initView = function () {
        var view = this;
        var data = view.param.data;
        //已解锁数目
        var haveunlock = Api.encounterVoApi.getActiveBuffNum(data.type);
        //人物形象
        var rolegroup = new BaseDisplayObjectContainer();
        rolegroup.width = 600;
        rolegroup.height = 609;
        rolegroup.x = 20;
        rolegroup.y = 0;
        rolegroup.name = "roleGroup";
        rolegroup.mask = new egret.Rectangle(0, 0, rolegroup.width, rolegroup.height);
        view.addChildToContainer(rolegroup);
        var type = data.type;
        var poscfg = data.coordinateInside["2132"];
        var group = new BaseDisplayObjectContainer();
        group.name = "group";
        rolegroup.addChild(group);
        group.x = poscfg.x;
        group.y = poscfg.y;
        var role = BaseBitmap.create("wonderLandrole2132");
        role.name = "role";
        group.addChild(role);
        var inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 535, 30, "public_9_bg5");
        inputTF2.name = "inputTFR";
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTF2, rolegroup, [0, 100]);
        view.addChildToContainer(inputTF2);
        var inputTFG = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 535, 30, "public_9_bg5");
        inputTFG.name = "inputTFG";
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTFG, rolegroup, [0, 150]);
        view.addChildToContainer(inputTFG);
        var inputTFB = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 535, 30, "public_9_bg5");
        inputTFB.name = "inputTFB";
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTFB, rolegroup, [0, 200]);
        view.addChildToContainer(inputTFB);
        var inputTFA = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 535, 30, "public_9_bg5");
        inputTFA.name = "inputTFA";
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTFA, rolegroup, [0, 250]);
        view.addChildToContainer(inputTFA);
        var btn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "\u786E\u5B9A", function () {
            var inputtxt1 = inputTF2.getChildByName("textField");
            var rstr = inputtxt1.text.split(",");
            var inputtxt2 = inputTFG.getChildByName("textField");
            var gstr = inputtxt2.text.split(",");
            ;
            var inputtxt3 = inputTFB.getChildByName("textField");
            var bstr = inputtxt3.text.split(",");
            ;
            var inputtxt4 = inputTFA.getChildByName("textField");
            var astr = inputtxt4.text.split(",");
            ;
            var colorMatrix = rstr.concat(gstr).concat(bstr).concat(astr);
            var arr = [];
            for (var i in colorMatrix) {
                arr[i] = Number(colorMatrix[i]);
            }
            role.filters = null;
            role.filters = [new egret.ColorMatrixFilter(arr)];
        }, view);
        view.addChildToContainer(btn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, btn, rolegroup, [0, 300]);
    };
    QingyuantestView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.closeBtn.x = 569;
    };
    QingyuantestView.prototype.getShowHeight = function () {
        return 832;
    };
    QingyuantestView.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useCallback,this);
        _super.prototype.dispose.call(this);
    };
    return QingyuantestView;
}(PopupView));
__reflect(QingyuantestView.prototype, "QingyuantestView");
//# sourceMappingURL=QingyuantestView.js.map