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
var StrengthenScrollItem = (function (_super) {
    __extends(StrengthenScrollItem, _super);
    function StrengthenScrollItem() {
        var _this = _super.call(this) || this;
        _this.cfgArr = [
            // ["challenge","manage","affair"],
            ["challenge"],
            ["search", "wife"],
            ["servant", "bookroom", "studyatk"]
        ];
        // wife红颜
        // search//寻访
        // servant//门客
        // bookroom//太学
        // affair//公务
        // studyatk//演武场
        // challenge//关卡 
        _this._collectBtnArr = [];
        _this._redHot = null;
        _this._redHotArr = [];
        return _this;
    }
    StrengthenScrollItem.prototype.initItem = function (index, data) {
        this._collectBtnArr = [];
        this.width = 517;
        this.height = 241;
        var bg = BaseLoadBitmap.create("strengthen_" + data);
        this.addChild(bg);
        var self = this;
        for (var i = 0; i < this.cfgArr[index].length; i++) {
            var str = this.cfgArr[index][i];
            var buttonName = LanguageManager.getlocal("" + this.cfgArr[index][i]);
            var collectBtn;
            if (PlatformManager.checkIsViSp()) {
                collectBtn = ComponentManager.getButton("strengthen_button", "", self.eventCollectHandler, self, null, null, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            }
            else {
                collectBtn = ComponentManager.getButton("strengthen_button", "", self.eventCollectHandler, self);
            }
            this.addChild(collectBtn);
            collectBtn.x = 390;
            collectBtn.y = bg.y + 50 * i + 80;
            collectBtn.setText(buttonName, false);
            collectBtn.setColor(TextFieldConst.COLOR_BROWN);
            collectBtn.name = this.cfgArr[index][i];
            collectBtn.addTouchTap(this.touchCollectHandler, this);
            var redHot = BaseBitmap.create("public_dot2");
            this.addChild(redHot);
            this._redHot = redHot;
            this._redHot.x = collectBtn.x + collectBtn.width - 18;
            this._redHot.y = collectBtn.y - 10;
            this._redHot.visible = false;
            this._redHotArr.push(this._redHot);
            this._collectBtnArr.push(collectBtn);
        }
        this.refreshButtonType();
    };
    StrengthenScrollItem.prototype.refreshButtonType = function () {
        for (var i = 0; i < this._collectBtnArr.length; i++) {
            if (this._collectBtnArr[i] && this._collectBtnArr[i].name) {
                var openType = this._collectBtnArr[i].name;
                if (openType == "servant") {
                    if ([openType + "VoApi"] && Api[openType + "VoApi"].checkRedPoint()) {
                        this._redHotArr[i].visible = true;
                    }
                }
                else if (openType == "affair") {
                    if (Api.manageVoApi.getCurAffairNums() > 0) {
                        this._redHotArr[i].visible = true;
                    }
                }
                else if (openType == "bookroom") {
                    if (Api[openType + "VoApi"] && Api[openType + "VoApi"].checkNpcMessage()) {
                        this._redHotArr[i].visible = true;
                    }
                }
                else if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
                    var isShowNpc = Api[openType + "VoApi"].isShowNpc();
                    if (isShowNpc && Api[openType + "VoApi"] && Api[openType + "VoApi"].checkNpcMessage()) {
                        this._redHotArr[i].visible = true;
                        // App.CommonUtil.addIconToBDOC(this._collectBtnArr[i])
                    }
                    else {
                        this._redHotArr[i].visible = false;
                        // App.CommonUtil.removeIconFromBDOC(this._collectBtnArr[i])
                    }
                }
            }
        }
    };
    StrengthenScrollItem.prototype.touchCollectHandler = function (event) {
        var openType = event.currentTarget.name;
        var viewName = App.StringUtil.firstCharToUper(openType);
        if (openType == "level" || openType == "arrival" || openType == "") {
            PlayerBottomUI.getInstance().show();
        }
        else {
            if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
                var isShowNpc = Api[openType + "VoApi"].isShowNpc();
                if (!isShowNpc) {
                    var lockedStr = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
                    App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
                    return;
                }
            }
            if (openType == "alliance") {
                Api.allianceVoApi.openMainView();
                return;
            }
            if (openType == "studyatk") {
                Api.studyatkVoApi.openMainView();
                return;
            }
            if (egret.getDefinitionByName(viewName + "View")) {
                ViewController.getInstance().openView(viewName + "View");
            }
            else if (egret.getDefinitionByName(viewName + "PopupView")) {
                ViewController.getInstance().openView(viewName + "PopupView");
            }
            else {
                if (openType == "recharge") {
                    ViewController.getInstance().openView(viewName + "Vip" + "View");
                }
            }
            ViewController.getInstance().hideView(ViewConst.POPUP.STRENGTHENPOPUPVIEW);
        }
    };
    StrengthenScrollItem.prototype.eventCollectHandler = function (event) {
    };
    StrengthenScrollItem.prototype.dispose = function () {
        this._collectBtnArr = [];
        this._redHotArr = [];
    };
    return StrengthenScrollItem;
}(ScrollListItem));
__reflect(StrengthenScrollItem.prototype, "StrengthenScrollItem");