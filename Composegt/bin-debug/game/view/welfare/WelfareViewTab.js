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
 * 福利界面tab父类
 * author dmj
 * date 2017/11/03
 * @class WelfareViewTab
 */
var WelfareViewTab = (function (_super) {
    __extends(WelfareViewTab, _super);
    function WelfareViewTab() {
        var _this = _super.call(this) || this;
        _this.isWanbaBoo = false;
        return _this;
    }
    WelfareViewTab.prototype.init = function () {
        this.isWanbaBoo = Api.switchVoApi.checknewRecharge();
        var logdStr = BaseBitmap.create(this.getResPreName() + "_bg");
        var totalSignDay = Api.arrivalVoApi.getTotalSignDay();
        var hasSkillIcon = false;
        if (totalSignDay <= 6 && this.getResPreName() == "signin") {
            if (Api.switchVoApi.checkSignUp()) {
            }
            else {
                logdStr = BaseBitmap.create(this.getResPreName() + "2_bg");
                if (totalSignDay <= 2) {
                    logdStr = BaseBitmap.create(this.getResPreName() + "3_bg");
                    hasSkillIcon = true;
                }
            }
        }
        else if (this.getResPreName() == "yearcard" && Api.acVoApi.getActivityVoByAidAndCode("discount", "2") && Api.acVoApi.getActivityVoByAidAndCode("discount", "2").isStart) {
            // vip折扣
            var picname = this.getResPreName() + "_discount_bg";
            logdStr = BaseBitmap.create(picname);
        }
        else if (this.isWanbaBoo && this.getResPreName() == "firstrecharge") {
            var picname = "firstrecharge2_bg";
            logdStr = BaseBitmap.create(picname);
        }
        var bg = logdStr;
        bg.x = 7;
        this.addChild(bg);
        if (hasSkillIcon) {
            var _sid_1 = "1050";
            var _fetterBtn = ComponentManager.getButton("servantjibanicon", "", function () {
                ViewController.getInstance().openView(ViewConst.POPUP.SERVANTJIBANBUFFPOPUPVUEW, { sid: _sid_1 });
            }, this, null, 0);
            var _fetterText = BaseBitmap.create("servantjibantxt");
            _fetterText.width = 67;
            _fetterText.height = 43;
            _fetterBtn.addChild(_fetterText);
            _fetterText.setPosition((_fetterBtn.width - _fetterText.width) / 2, _fetterBtn.height - _fetterText.height);
            this.addChild(_fetterBtn);
            _fetterBtn.setPosition(bg.x + 408, 160);
            _fetterBtn.setScale(60 / _fetterBtn.width);
            var skillBar = ComponentManager.getSkillBar(_sid_1, 52);
            this.addChild(skillBar);
            skillBar.setPosition(bg.x + 49, 170);
        }
        if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && (this.getResPreName().indexOf("monthcard") > -1 || this.getResPreName().indexOf("yearcard") > -1)) {
            this.bottomBg = BaseBitmap.create("rechargevie_db_01");
            this.bottomBg.height = GameConfig.stageHeigth - 70;
            this.bottomBg.width = 490;
            this.bottomBg.y = 0;
            this.bottomBg.x = 0;
            this.addChild(this.bottomBg);
            this.removeChild(bg);
        }
        else {
            this.bottomBg = BaseBitmap.create("rechargevie_db_01");
            this.bottomBg.y = bg.height + 5;
            this.bottomBg.width = 466;
            this.bottomBg.x = 13;
            this.bottomBg.height = GameConfig.stageHeigth - 80 - bg.height;
            this.addChild(this.bottomBg);
        }
    };
    WelfareViewTab.prototype.getParent = function () {
        return null;
    };
    WelfareViewTab.prototype.getResourceList = function () {
        var preName = this.getResPreName();
        var arr = [];
        arr.push(preName + "_btn");
        if (preName == "yearcard" && Api.acVoApi.getActivityVoByAidAndCode("discount", "2") && Api.acVoApi.getActivityVoByAidAndCode("discount", "2").isStart) {
            arr.push(preName + "_discount_bg");
        }
        else {
            arr.push(preName + "_bg");
        }
        var descImage = preName + "_desc";
        var iconImage = preName + "_icon";
        if (RES.hasRes(descImage)) {
            arr.push(descImage);
        }
        if (RES.hasRes(iconImage)) {
            arr.push(iconImage);
        }
        return arr.concat([
            "servantjibanicon",
            "servantjibantxt"
        ]);
    };
    WelfareViewTab.prototype.getResPreName = function () {
        var className = egret.getQualifiedClassName(this);
        var preName = className.substring(11, className.length);
        return preName.toLowerCase();
    };
    WelfareViewTab.prototype.dispose = function () {
        if (this.bottomBg) {
            this.removeChild(this.bottomBg);
            this.bottomBg.dispose();
            this.bottomBg = null;
        }
        _super.prototype.dispose.call(this);
    };
    return WelfareViewTab;
}(BaseLoadDisplayObjectContiner));
__reflect(WelfareViewTab.prototype, "WelfareViewTab");
