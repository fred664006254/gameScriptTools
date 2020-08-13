/**
 * 用于赵氏姐妹选择一人当家
 * author shaoliang
 * date 2020/1/10
 * @class WifeDangjiaChoosePopupView
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
var WifeDangjiaChoosePopupView = (function (_super) {
    __extends(WifeDangjiaChoosePopupView, _super);
    function WifeDangjiaChoosePopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(WifeDangjiaChoosePopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    WifeDangjiaChoosePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_textbrownbg", "wife_homechoose_btn"
        ]);
    };
    WifeDangjiaChoosePopupView.prototype.getTitleStr = function () {
        return "dangjia";
    };
    WifeDangjiaChoosePopupView.prototype.initView = function () {
        var topBg = BaseBitmap.create("public_textbrownbg");
        topBg.x = this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2;
        topBg.y = 12;
        this.addChildToContainer(topBg);
        var toptext = ComponentManager.getTextField(LanguageManager.getlocal("chooseDangjia"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, toptext, topBg);
        this.addChildToContainer(toptext);
        var btn1 = ComponentManager.getButton("wife_homechoose_btn", "wifeName_236_1", this.dangjiaHandle, this, ["236_1"], 1);
        btn1.setPosition(this.viewBg.width / 2 - btn1.width / 2, topBg.y + 85);
        btn1.setTextSize(20);
        btn1.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(btn1);
        var btn2 = ComponentManager.getButton("wife_homechoose_btn", "wifeName_236_2", this.dangjiaHandle, this, ["236_2"], 1);
        btn2.setPosition(btn1.x, btn1.y + 85);
        btn2.setTextSize(20);
        btn2.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(btn2);
        var str = Api.otherInfoVoApi.getDangjiaNpc();
        var strArray = str.split("_");
        if (strArray[0] == "236") {
            var dangjiazhong = BaseBitmap.create("wifeinihomebtn");
            dangjiazhong.setPosition(200, -20);
            if (strArray[1] == "1") {
                btn1.addChild(dangjiazhong);
            }
            else {
                btn2.addChild(dangjiazhong);
            }
        }
    };
    WifeDangjiaChoosePopupView.prototype.dangjiaHandle = function (key) {
        NetManager.request(NetRequestConst.OTHERINFO_SETDANGJIA, {
            dangjia: key
        });
        this.hide();
    };
    return WifeDangjiaChoosePopupView;
}(PopupView));
__reflect(WifeDangjiaChoosePopupView.prototype, "WifeDangjiaChoosePopupView");
//# sourceMappingURL=WifeDangjiaChoosePopupView.js.map