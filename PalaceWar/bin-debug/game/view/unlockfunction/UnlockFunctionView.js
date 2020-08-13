var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 功能解锁展示
 * author ycg
 * date 2020.6.19
 * @class UnlockFunctionView
 */
var UnlockFunctionView = /** @class */ (function (_super) {
    __extends(UnlockFunctionView, _super);
    function UnlockFunctionView() {
        var _this = _super.call(this) || this;
        _this._tip = null;
        _this._light1 = null;
        _this._light2 = null;
        _this._iconContainer = null;
        _this._data = null;
        return _this;
    }
    UnlockFunctionView.prototype.getTitleBgName = function () {
        return null;
    };
    UnlockFunctionView.prototype.getBgName = function () {
        return null;
    };
    UnlockFunctionView.prototype.getTitleStr = function () {
        return null;
    };
    UnlockFunctionView.prototype.getCloseBtnName = function () {
        return null;
    };
    UnlockFunctionView.prototype.getRequestData = function () {
        var id = this.param.data.data.data.id;
        return { requestType: NetRequestConst.REQUEST_OPENFUNCTION_UNLOCKLIST2, requestData: {
                unlockKey: id
            } };
    };
    UnlockFunctionView.prototype.receiveData = function (data) {
        if (data.ret) {
            var id = this.param.data.data.data.id;
            Api.unlocklist2VoApi.setShowBase("" + id);
        }
    };
    UnlockFunctionView.prototype.initView = function () {
        var _this = this;
        this._maskBmp.alpha = 0;
        this._data = this.param ? this.param.data.data : null;
        console.log("initView ", this._data);
        var nodeContainer = new BaseDisplayObjectContainer();
        nodeContainer.width = GameConfig.stageWidth;
        nodeContainer.height = GameConfig.stageHeigth;
        this.addChildToContainer(nodeContainer);
        var mask = BaseBitmap.create("public_9_viewmask");
        mask.width = nodeContainer.width;
        mask.height = nodeContainer.height;
        nodeContainer.addChild(mask);
        //光
        var light1 = BaseBitmap.create("public_rotatelight");
        nodeContainer.addChild(light1);
        light1.anchorOffsetX = light1.width / 2;
        light1.anchorOffsetY = light1.height / 2;
        light1.setPosition(nodeContainer.width / 2, nodeContainer.height / 2);
        egret.Tween.get(light1, { loop: true }).to({ rotation: -360 }, 2000);
        this._light1 = light1;
        // let light2 = BaseBitmap.create("public_rotatelight");
        // nodeContainer.addChild(light2);
        // light2.anchorOffsetX = light2.width/2;
        // light2.anchorOffsetY = light2.height/2;
        // light2.setPosition(nodeContainer.width/2, nodeContainer.height/2);
        // egret.Tween.get(light2, {loop: true}).to({rotation: 360}, 2000);
        // this._light2 = light2;
        //点击提示
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        nodeContainer.addChild(tip);
        tip.setPosition(nodeContainer.width / 2 - tip.width / 2, light1.y + light1.height / 2);
        egret.Tween.get(tip, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
        tip.visible = false;
        this._tip = tip;
        //缩放出现图标文字
        var iconContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(iconContainer);
        this._iconContainer = iconContainer;
        if (this._data.isHome) {
            var icon = BaseLoadBitmap.create(this._data.icon);
            icon.width = this._data.iconW;
            icon.height = this._data.iconH;
            iconContainer.width = icon.width;
            iconContainer.height = icon.height;
            iconContainer.addChild(icon);
            if (this._data.scrollX > -1) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_FUNCTION_CITYSCENE_SCROLL, { data: this._data });
            }
        }
        else {
            var icon = BaseBitmap.create(this._data.icon);
            iconContainer.width = icon.width;
            iconContainer.height = icon.height;
            iconContainer.addChild(icon);
            if (this._data.iconStr) {
                var iconTxt = ComponentManager.getTextField(LanguageManager.getlocal(this._data.iconStr), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_TABBAR);
                iconTxt.setPosition(icon.x + icon.width / 2 - iconTxt.width / 2, icon.y + icon.height / 2 - iconTxt.height / 2);
                iconContainer.addChild(iconTxt);
            }
        }
        iconContainer.anchorOffsetX = iconContainer.width / 2;
        iconContainer.anchorOffsetY = iconContainer.height / 2;
        iconContainer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        iconContainer.setScale(0.2);
        egret.Tween.get(iconContainer).to({ scaleX: 1, scaleY: 1 }, 500).wait(1000).call(function () {
            tip.visible = true;
            mask.addTouchTap(function () {
                nodeContainer.visible = false;
                nodeContainer.dispose();
                _this.playMoveAni();
            }, _this);
        });
    };
    UnlockFunctionView.prototype.playMoveAni = function () {
        var _this = this;
        if (this._data.isHome) {
            var desX = this._data.iconX - this._data.scrollX + this._iconContainer.width / 2;
            var desY = GameConfig.stageHeigth - this._data.sceneHeight + this._data.iconY + this._iconContainer.height / 2;
            egret.Tween.get(this._iconContainer).to({ x: desX, y: desY }, 400).call(function () {
                Api.unlocklist2VoApi.clearBaseId();
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECKNPC_SHOW, { "key": _this._data.data.gameName });
                _this.hide();
                ;
            });
        }
        else {
            var desX = this._data.iconX + this._iconContainer.width / 2;
            var desY = this._data.iconY + this._iconContainer.height / 2;
            egret.Tween.get(this._iconContainer).to({ x: desX, y: desY }, 400).call(function () {
                Api.unlocklist2VoApi.clearBaseId();
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, { "key": _this._data.data.gameName });
                _this.hide();
            });
        }
    };
    UnlockFunctionView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_rotatelight", "mainui_friends_btn", "player_tab2", "player_tab4"
        ]);
    };
    UnlockFunctionView.prototype.dispose = function () {
        if (this._tip) {
            egret.Tween.removeTweens(this._tip);
        }
        if (this._light1) {
            egret.Tween.removeTweens(this._light1);
        }
        if (this._light2) {
            egret.Tween.removeTweens(this._light2);
        }
        if (this._iconContainer) {
            egret.Tween.removeTweens(this._iconContainer);
        }
        this._tip = null;
        this._light1 = null;
        this._light2 = null;
        this._iconContainer = null;
        // this._data = null;
        _super.prototype.dispose.call(this);
        if (this._data.type) {
            App.LogUtil.log("this._data.type " + this._data.type);
            Api.unlocklist2VoApi.checkWaitingShowInFunc(this._data.type);
        }
    };
    return UnlockFunctionView;
}(BaseView));
//# sourceMappingURL=UnlockFunctionView.js.map