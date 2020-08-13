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
var ComposeSelect = (function (_super) {
    __extends(ComposeSelect, _super);
    function ComposeSelect() {
        var _this = _super.call(this) || this;
        _this._pressList = [];
        _this._psIntervalNum = -1;
        _this.init();
        return _this;
    }
    ComposeSelect.prototype.init = function () {
        var selectbg = BaseBitmap.create("composeselected");
        this._selectbg = selectbg;
        selectbg.anchorOffsetX = selectbg.width / 2;
        selectbg.anchorOffsetY = selectbg.height / 2;
        this.addChild(selectbg);
        selectbg.setPosition(0, 0);
        this.initLv();
        this._delBtn = ComponentManager.getButton("btn_composedel", "", this.delHandler, this);
        this._delBtn.setPosition(-this._delBtn.width / 2, -ComposeStatus.renSize.height - this._delBtn.height + 15 + 20);
        this.addChild(this._delBtn);
        this._delBtn.visible = false;
        this.initPress();
    };
    ComposeSelect.prototype.initLv = function () {
        var lvBg = BaseBitmap.create("composelvbg");
        this._lvbg = lvBg;
        lvBg.setPosition(-lvBg.width / 2, 15 + 20 - ComposeStatus.renSize.height - lvBg.height);
        this.addChild(lvBg);
        var lvt = ComponentManager.getTextField("1", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._lvt = lvt;
        lvt.lineSpacing = 2;
        lvt.width = lvBg.width;
        lvt.height = lvBg.height - 3;
        lvt.setPosition(lvBg.x, lvBg.y);
        lvt.textAlign = egret.HorizontalAlign.CENTER;
        lvt.verticalAlign = egret.VerticalAlign.MIDDLE;
        lvt.name = "selecttxt";
        this.addChild(lvt);
    };
    ComposeSelect.prototype.showLv = function () {
        this._lvbg.visible = true;
        this._lvt.visible = true;
    };
    ComposeSelect.prototype.hideLv = function () {
        if (this._lvbg) {
            this._lvbg.visible = false;
        }
        if (this._lvt) {
            this._lvt.visible = false;
        }
    };
    ComposeSelect.prototype.initPress = function () {
        this._press = new BaseDisplayObjectContainer();
        for (var i = 0; i < 4; i++) {
            var bg = BaseBitmap.create("composewtdelbg");
            bg.setPosition(0, bg.height * 4 / 5 * i);
            this._press.addChild(bg);
            var psbg = BaseBitmap.create("composewtdelps");
            psbg.setPosition(bg.x, bg.y);
            psbg.visible = false;
            this._press.addChild(psbg);
            this._pressList.push(psbg);
        }
        this._press.setPosition(-this._press.width / 2, -ComposeStatus.renSize.height - this._press.height + 15 + 20);
        this.addChild(this._press);
        this._press.visible = false;
    };
    ComposeSelect.prototype.isDelStatus = function () {
        return this._delBtn && this._delBtn.visible;
    };
    ComposeSelect.prototype.showDelPs = function () {
        var _this = this;
        this.hideLv();
        var psIdx = 0;
        this._press.visible = true;
        if (this._psIntervalNum == -1) {
            this._psIntervalNum = egret.setInterval(function () {
                psIdx++;
                var l = _this._pressList.length;
                _this._pressList[l - psIdx].visible = true;
                if (psIdx == l) {
                    _this.onlyHideDelPs();
                    _this._delBtn.visible = true;
                }
            }, this, 200);
        }
    };
    ComposeSelect.prototype.onlyHideDelPs = function () {
        if (this._psIntervalNum != -1) {
            egret.clearInterval(this._psIntervalNum);
            this._psIntervalNum = -1;
            var l = this._pressList.length;
            for (var i = 0; i < l; i++) {
                this._pressList[i].visible = false;
            }
            this._press.visible = false;
        }
    };
    ComposeSelect.prototype.hideDelPs = function (must) {
        var isWaiting = this._psIntervalNum != -1;
        this.onlyHideDelPs();
        if (isWaiting || must) {
            this._delBtn.visible = false;
            this.showLv();
        }
    };
    ComposeSelect.prototype.delHandler = function (e) {
        if (this.parent) {
            ComposeStatus.delId = this.parent.name;
            Api.composemapVoApi.showConfirmDel(ComposeStatus.delId, function () {
                NetManager.request(NetRequestConst.REQUEST_MAP_DELPERSON, { pos: ComposeStatus.delId });
            }, this);
        }
    };
    ComposeSelect.prototype.show = function (callback, thisObj) {
        var _this = this;
        if (!this.parent) {
            this._delBtn.visible = false;
            this.showLv();
            if (this._selectbg) {
                egret.Tween.get(this._selectbg, { loop: true }).to({ scaleX: 0.95, scaleY: 0.95, alpha: 0.5 }, 500).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500);
            }
            egret.Tween.get(this).to({ alpha: 1 }, 200).call(function () {
                egret.Tween.removeTweens(_this);
                if (callback) {
                    callback.apply(thisObj);
                }
            }, this);
        }
    };
    ComposeSelect.prototype.hide = function (callback, thisObj, noTween) {
        var _this = this;
        egret.Tween.removeTweens(this);
        this.hideDelPs();
        if (this._selectbg) {
            egret.Tween.removeTweens(this._selectbg);
            this._selectbg.setScale(1);
            this._selectbg.alpha = 1;
        }
        if (this.alpha == 1 && (!noTween)) {
            egret.Tween.get(this).to({ alpha: 0 }, 200).call(function () {
                _this._delBtn.visible = false;
                _this.showLv();
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
                if (callback) {
                    callback.apply(thisObj);
                }
            }, this);
        }
        else {
            if (this.parent) {
                this._delBtn.visible = false;
                this.showLv();
                this.parent.removeChild(this);
                if (callback) {
                    callback.apply(thisObj);
                }
            }
        }
    };
    ComposeSelect.prototype.setText = function (lv) {
        if (this._lvt) {
            var lvStr = Config.PersoninfoCfg.getPersonLocalLvByLv(Number(lv));
            var nameStr = Config.PersoninfoCfg.getPersonLocalNameByLv(Number(lv));
            this._lvt.setString(nameStr + "\n" + lvStr);
        }
    };
    ComposeSelect.prototype.dispose = function () {
        ComposeSelect._instant = null;
        this._lvt = null;
        this._selectbg = null;
        this._delBtn = null;
        this._lvbg = null;
        this._press = null;
        this._pressList.length = 0;
        if (this._psIntervalNum != -1) {
            egret.clearInterval(this._psIntervalNum);
            this._psIntervalNum = -1;
        }
        _super.prototype.dispose.call(this);
    };
    ComposeSelect.getInstant = function () {
        if (!ComposeSelect._instant) {
            ComposeSelect._instant = new ComposeSelect();
        }
        return ComposeSelect._instant;
    };
    ComposeSelect.hasInstant = function () {
        return !!ComposeSelect._instant;
    };
    return ComposeSelect;
}(BaseDisplayObjectContainer));
__reflect(ComposeSelect.prototype, "ComposeSelect");
