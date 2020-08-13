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
 * 七日签到 佳人展示-后
 * @author wxz
 * date 2020/6/9
 * @class SevenDaysSignUpLasShowView
 */
var SevenDaysSignUpLasShowView = (function (_super) {
    __extends(SevenDaysSignUpLasShowView, _super);
    function SevenDaysSignUpLasShowView() {
        var _this = _super.call(this) || this;
        _this._wifeCon1 = null;
        _this._isBone = false;
        _this.wifeIds = ["310"];
        _this.wifePos = [200, 385];
        _this.wifeSkinId = 3101;
        return _this;
    }
    SevenDaysSignUpLasShowView.prototype.getBgName = function () {
        return null;
        ;
    };
    SevenDaysSignUpLasShowView.prototype.getTitleBgName = function () {
        return null;
    };
    SevenDaysSignUpLasShowView.prototype.getTitleStr = function () {
        return null;
    };
    SevenDaysSignUpLasShowView.prototype.getCloseBtnName = function () {
        return null;
    };
    SevenDaysSignUpLasShowView.prototype.resetBgSize = function () {
    };
    SevenDaysSignUpLasShowView.prototype.initView = function () {
        var _this = this;
        var bg = BaseBitmap.create("sevendayssignupshowbg");
        bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
        bg.y = GameConfig.stageHeigth / 2 - bg.height / 2 - 50;
        this.addChild(bg);
        var title = BaseBitmap.create("sevendayssignupshowtitle");
        this.setLayoutPosition(LayoutConst.horizontalCentertop, title, bg, [0, -45]);
        this.addChild(title);
        var wifeCon1 = new BaseDisplayObjectContainer();
        this.addChild(wifeCon1);
        this._wifeCon1 = wifeCon1;
        var wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeIds[0]);
        var bonename = wifeCfg.bone;
        if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon()) {
            this._wifeCon1.x = 35;
            this._wifeCon1.y = 770;
            this._isBone = true;
        }
        else {
            this._wifeCon1.x = -120;
            this._wifeCon1.y = 340;
            this._isBone = false;
        }
        this._wifeCon1.y += (GameConfig.stageHeigth - 1136) / 4;
        var bot = BaseBitmap.create("sevendayssignupshowbot");
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, bot, bg, [0, -130]);
        this.addChild(bot);
        var txtimg = BaseBitmap.create("sevendayssignupshowtxt2");
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, txtimg, bot, [0, 110]);
        this.addChild(txtimg);
        var shp = new egret.Shape();
        shp.graphics.beginFill(0xff0000, 1);
        shp.graphics.drawRect(0, 0, 640, txtimg.y);
        shp.graphics.endFill();
        this.addChild(shp);
        this._wifeCon1.mask = shp;
        var txt = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpShowDesctxt1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.x = txtimg.x + txtimg.width / 2 - txt.width / 2;
        txt.y = txtimg.y + txtimg.height + 15;
        txt.lineSpacing = 3;
        txt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(txt);
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sevenDaysSignUpShowbtn", function () {
            _this.hide();
            ViewController.getInstance().openView(ViewConst.COMMON.SEVENDAYSSIGNUPVIEW);
        }, this);
        btn.setPosition(txtimg.x + txtimg.width / 2 - btn.width / 2, txt.y + txt.height + 20);
        this.addChild(btn);
        var closebtn = ComponentManager.getButton(ButtonConst.COMMON_CLOSE_2, "", function () {
            _this.hide();
        }, this);
        closebtn.x = GameConfig.stageWidth - closebtn.width - 15;
        closebtn.y = title.y - 125;
        this.addChild(closebtn);
        this.clickRightBtn1();
    };
    SevenDaysSignUpLasShowView.prototype.clickRightBtn1 = function () {
        if (this._wifeCon1.numChildren == 0) {
            for (var i = 0; i < 2; i++) {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeIds[0]);
                var wifeskinCfg = Config.WifeskinCfg.getWifeCfgById(this.wifeSkinId);
                var bonename = i == 0 ? wifeskinCfg.bone : wifeCfg.bone2;
                if (this._isBone) {
                    var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                    droWifeIcon.scaleX = 0.75;
                    droWifeIcon.scaleY = 0.75;
                    droWifeIcon.x = this.wifePos[i];
                    droWifeIcon.y = 10;
                    this._wifeCon1.addChild(droWifeIcon);
                }
                else {
                    var droWifeIcon = BaseLoadBitmap.create(i == 0 ? wifeskinCfg.body : wifeCfg.body2);
                    droWifeIcon.scaleX = 0.5;
                    droWifeIcon.scaleY = 0.5;
                    droWifeIcon.x = this.wifePos[i];
                    droWifeIcon.y = 10;
                    this._wifeCon1.addChild(droWifeIcon);
                }
            }
        }
    };
    SevenDaysSignUpLasShowView.prototype.getResourceList = function () {
        var arr = ["sevendayssignupshowbg", "sevendayssignupshowtxt2", "sevendayssignupshowtitle",
            "sevendayssignupshowbot", "sevendayssignup_btn1", "sevendayssignup_btn2", ButtonConst.COMMON_CLOSE_2];
        if (PlatformManager.checkIsEnSp()) {
            arr = ["sevendayssignupshowbg", "sevendayssignupshowtxt2", "sevendayssignupshowtitle",
                "sevendayssignupshowbot", "sevendayssignup_btn1", "sevendayssignup_btn2", ButtonConst.COMMON_CLOSE_2];
        }
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    SevenDaysSignUpLasShowView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._wifeCon1 = null;
    };
    return SevenDaysSignUpLasShowView;
}(PopupView));
__reflect(SevenDaysSignUpLasShowView.prototype, "SevenDaysSignUpLasShowView");
//# sourceMappingURL=SevenDaysSignUpLasShowView.js.map