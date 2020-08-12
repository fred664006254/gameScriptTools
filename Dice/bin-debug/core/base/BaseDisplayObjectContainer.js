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
 * author 陈可
 * date 2017/9/4
 * @class BaseDisplayObjectContainer
 */
var BaseDisplayObjectContainer = (function (_super) {
    __extends(BaseDisplayObjectContainer, _super);
    function BaseDisplayObjectContainer() {
        var _this = _super.call(this) || this;
        _this.bindData = null;
        _this._touchTapHelper = null;
        _this._touchHelper = null;
        /**
         * 请求type列表
         */
        _this._requestTypeList = [];
        /**
         * 是否已经请求过
         */
        _this._isRequesed = false;
        return _this;
    }
    /**
     * 添加触摸回调
     */
    BaseDisplayObjectContainer.prototype.addTouchTap = function (touchHandler, touchHandlerThisObj, touchHandlerParams) {
        if (this._touchTapHelper == null) {
            this._touchTapHelper = TouchHelper.addTouchTap(this, touchHandler, touchHandlerThisObj, touchHandlerParams);
        }
    };
    /**
     * 移除触摸
     */
    BaseDisplayObjectContainer.prototype.removeTouchTap = function () {
        if (this._touchTapHelper) {
            this._touchTapHelper.removeTouchTap();
            this._touchTapHelper = null;
        }
    };
    BaseDisplayObjectContainer.prototype.addTouch = function (touchHandler, touchHandlerThisObj, touchHandlerParams, isMoveCancel) {
        if (!this._touchHelper) {
            this._touchHelper = TouchHelper.addTouch(this, touchHandler, touchHandlerThisObj, touchHandlerParams, isMoveCancel);
        }
    };
    BaseDisplayObjectContainer.prototype.removeTouch = function () {
        if (this._touchHelper) {
            this._touchHelper.removeTouch();
            this._touchHelper = null;
        }
    };
    /**
     * 设置坐标
     */
    BaseDisplayObjectContainer.prototype.setPosition = function (posX, posY) {
        this.x = posX;
        this.y = posY;
    };
    BaseDisplayObjectContainer.prototype.stopAllActions = function () {
        egret.Tween.removeTweens(this);
    };
    BaseDisplayObjectContainer.prototype.setVisible = function (visible) {
        this.visible = visible;
    };
    BaseDisplayObjectContainer.prototype.setScale = function (scale) {
        this.scaleX = this.scaleY = scale;
    };
    BaseDisplayObjectContainer.prototype.getClassName = function () {
        return egret.getQualifiedClassName(this);
    };
    /**
     * 相对布局
     * @param style   对齐方式 |分割 left right horizontal ｜ top bottom vertical
     * @param self    本身对象
     * @param base      相对参考对象
     * @param distance 位置距离
     */
    BaseDisplayObjectContainer.prototype.setLayoutPosition = function (style, self, base, distance, local) {
        if (distance === void 0) { distance = [0, 0]; }
        if (local === void 0) { local = false; }
        var view = this;
        var _x = 0;
        var _y = 0;
        var style_arr = style.split('|');
        for (var _i = 0, style_arr_1 = style_arr; _i < style_arr_1.length; _i++) {
            var layout = style_arr_1[_i];
            switch (layout) {
                case LayoutConst.left:
                    _x = base.x + distance[0];
                    break;
                case LayoutConst.right:
                    _x = base.x + base.width * base.scaleX - distance[0] - self.width * self.scaleX;
                    break;
                case LayoutConst.top:
                    _y = base.y + distance[1];
                    break;
                case LayoutConst.bottom:
                    _y = base.y + base.height * base.scaleY - distance[1] - self.height * self.scaleY;
                    break;
                case LayoutConst.horizontalCenter:
                    _x = base.x + (base.width * base.scaleX - self.width * self.scaleX) / 2 + distance[0];
                    break;
                case LayoutConst.verticalCenter:
                    _y = base.y + (base.height * base.scaleY - self.height * self.scaleY) / 2 + distance[1];
                    break;
            }
        }
        if (local) {
            _x -= base.x;
            _y -= base.y;
        }
        self.setPosition(_x, _y);
        return new egret.Point(_x, _y);
    };
    BaseDisplayObjectContainer.prototype.localToGlobal = function (localX, localY, resultPoint) {
        var point = _super.prototype.localToGlobal.call(this, localX, localY, resultPoint);
        if (this.parent && this.parent != GameConfig.stage) {
            point.y -= GameData.layerPosY;
            point.x -= GameData.layerPosX;
        }
        return point;
    };
    Object.defineProperty(BaseDisplayObjectContainer.prototype, "cacheAsBitmap", {
        get: function () {
            return egret.superGetter(BaseTextField, this, "cacheAsBitmap");
        },
        set: function (value) {
            if (App.DeviceUtil.isRuntime2()) {
                return;
            }
            egret.superSetter(BaseTextField, this, "cacheAsBitmap", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 从 BaseDisplayObjectContainer 实例的子级列表中删除并释放所有 child DisplayObject 实例。
     */
    BaseDisplayObjectContainer.prototype.removeChildren = function () {
        App.DisplayUtil.removeChildren(this);
        _super.prototype.removeChildren.call(this);
    };
    /**
     * 网络消息:维护NetEventCallBack, 回调走netEventCallBack
     * 非网络消息:维护MsgConstEventArr, 回调走msgEventCallBack
     */
    BaseDisplayObjectContainer.prototype.getRequestData = function () {
        return null;
    };
    BaseDisplayObjectContainer.prototype.request = function (requestType, requestData, addQueue) {
        if (addQueue === void 0) { addQueue = true; }
        if (!requestType) {
            return;
        }
        var eventType = requestType;
        if (this._requestTypeList.indexOf(eventType) < 0) {
            App.MsgHelper.addEvt(eventType, this.receiveEvent, this);
            this._requestTypeList.push(requestType);
        }
        NetManager.request(requestType, requestData, addQueue);
    };
    BaseDisplayObjectContainer.prototype.receiveEvent = function (event) {
        var requestData = this._curRequestData;
        if (requestData) {
            if (event.type == requestData.requestType) {
                this._curRequestData = null;
                if (event.data && event.data.ret == false) {
                    if (this._isRequesed == false) {
                        this.requestLoadError();
                    }
                    return;
                }
            }
        }
        this.netEventCallBack(event);
        if (requestData) {
            // if(event.type==requestData.requestType)
            // {
            // 	if(this._isRequesed==false&&this.isShow())
            // 	{//首次
            // 		this._isRequesed=true;
            // 		if(this.isLoaded&&this._isRequesed)
            // 		{
            // 			this.preInit();
            // 		}
            // 	}
            // }
        }
    };
    BaseDisplayObjectContainer.prototype.requestLoadError = function () {
        var requestErrorTip = this.getRequestErrorTip();
        if (requestErrorTip) {
            App.CommonUtil.showTip(requestErrorTip);
        }
        // this.hideLoadingMask();
        // this.hide();
    };
    /**
     * 请求失败的提示
     */
    BaseDisplayObjectContainer.prototype.getRequestErrorTip = function () {
        return LangMger.getlocal("requestLoadErrorTip");
    };
    BaseDisplayObjectContainer.prototype.removeAllRequestEvents = function () {
        var l = this._requestTypeList.length;
        if (l > 0) {
            for (var i = l - 1; i >= 0; i--) {
                this.removeRequestEvent(this._requestTypeList[i]);
            }
        }
    };
    BaseDisplayObjectContainer.prototype.removeRequestEvent = function (requestType) {
        var index = this._requestTypeList.indexOf(requestType);
        if (index > -1) {
            App.MsgHelper.removeEvt(requestType, this.receiveEvent, this);
            this._requestTypeList.splice(index, 1);
        }
    };
    BaseDisplayObjectContainer.prototype.netEventCallBack = function (evt) {
    };
    BaseDisplayObjectContainer.prototype.initEventListener = function () {
        var view = this;
        var msgConstArr = view.getMsgConstEventArr();
        var len = msgConstArr.length;
        for (var i = 0; i < len; ++i) {
            App.MsgHelper.addEvt(msgConstArr[i], view.msgEventCallBack, view);
        }
        var netConstArr = view.getNetConstEventArr();
        len = netConstArr.length;
        for (var i = 0; i < len; ++i) {
            App.MsgHelper.addEvt(netConstArr[i], view.receiveEvent, view);
        }
    };
    BaseDisplayObjectContainer.prototype.msgEventCallBack = function (evt) {
        switch (evt.type) {
            default:
                break;
        }
    };
    BaseDisplayObjectContainer.prototype.diposeEventListener = function () {
        var view = this;
        var msgConstArr = view.getMsgConstEventArr();
        var len = msgConstArr.length;
        for (var i = 0; i < len; ++i) {
            App.MsgHelper.removeEvt(msgConstArr[i], view.msgEventCallBack, view);
        }
        var netConstArr = view.getNetConstEventArr();
        len = netConstArr.length;
        for (var i = 0; i < len; ++i) {
            App.MsgHelper.removeEvt(netConstArr[i], view.receiveEvent, view);
        }
    };
    BaseDisplayObjectContainer.prototype.getMsgConstEventArr = function () {
        return [];
    };
    BaseDisplayObjectContainer.prototype.getNetConstEventArr = function () {
        return [];
    };
    /**
     * 销毁对象
     */
    BaseDisplayObjectContainer.prototype.dispose = function () {
        this.diposeEventListener();
        this.stopAllActions();
        this.removeTouchTap();
        this.removeTouch();
        App.DisplayUtil.destory(this);
        this.bindData = null;
        this._isRequesed = false;
        this._curRequestData = null;
        this._requestTypeList = [];
        if (this.parent) {
            if (this.parent instanceof ScrollView) {
                this.parent.dispose();
            }
            else {
                this.parent.removeChild(this);
            }
        }
    };
    return BaseDisplayObjectContainer;
}(egret.DisplayObjectContainer));
__reflect(BaseDisplayObjectContainer.prototype, "BaseDisplayObjectContainer", ["base.Iinteractive", "base.Ibase"]);
//# sourceMappingURL=BaseDisplayObjectContainer.js.map