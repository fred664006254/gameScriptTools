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
 * 分享api
 * author jiangliuyang
 * date 2018/8/7
 * @class ShopVoApi
 */
var ShareVoApi = (function (_super) {
    __extends(ShareVoApi, _super);
    function ShareVoApi() {
        var _this = _super.call(this) || this;
        _this._callback = null;
        _this._target = null;
        return _this;
    }
    //弹出强制分享界面，如果条件不满足，则执行传入的回调函数
    ShareVoApi.prototype.showShare = function (type, lv, callback, target) {
        if (this.checkCanShowShare(type, lv)) {
            this._curType = type;
            this._curLv = lv;
            this._callback = callback;
            this._target = target;
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_GETWXSHARE, this.openSharePopup, this);
            //发送请求服务器
            NetManager.request(NetRequestConst.REQUEST_USER_GETWXSHARE, { type: type, lv: lv });
            return;
        }
        callback.call(target);
    };
    //a 红颜  b子嗣 c升官
    ShareVoApi.prototype.checkLockName = function (type, lv) {
        switch (type) {
            case ShareVoApi.TYPE_WIFE:
                return "openShareWife";
            case ShareVoApi.TYPE_CHILD:
                return "openShareChild";
            case ShareVoApi.TYPE_GRADE:
                return "openShareGrade" + lv;
        }
    };
    ShareVoApi.prototype.openSharePopup = function (event) {
        //event.data
        //event.data.wxshare
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_GETWXSHARE, this.openSharePopup, this);
        ViewController.getInstance().openView(ViewConst.POPUP.SHARECOMMONPOPUPVIEW, { type: this._curType, lv: this._curLv, wxshare: event.data.data.data.wxshare, callback: this._callback, target: this._target });
    };
    //检查是否需要展示分享
    ShareVoApi.prototype.checkCanShowShare = function (type, lv) {
        switch (type) {
            case ShareVoApi.TYPE_WIFE:
                if (!this.checkIsFirstWife()) {
                    return false;
                }
                break;
            case ShareVoApi.TYPE_CHILD:
                if (!this.checkIsFirstChild()) {
                    return false;
                }
                break;
        }
        var lockName = this.checkLockName(type, lv);
        //判断是否开启
        if (Api.switchVoApi.checkOpenByName(lockName)) {
            return true;
        }
        //平台是否有这个功能
        // if (1==1||PlatformManager.checkCommonShare()){	//本地不判断平台
        // if (PlatformManager.checkCommonShare()){
        // 	let lockName = this.checkLockName(type, lv);
        // 	//判断是否开启
        // 	if(Api.switchVoApi.checkOpenByName(lockName)){
        // 		return true;
        // 	}
        // }
        return false;
    };
    //判断是否是除了冯小怜外第一个红颜
    ShareVoApi.prototype.checkIsFirstWife = function () {
        if (Api.wifeVoApi.getWifeNum() == 2) {
            return true;
        }
        else {
            return false;
        }
    };
    //判断是否是第一个孩子 
    ShareVoApi.prototype.checkIsFirstChild = function () {
        if (Api.childVoApi.getChildNum() == 1 && Api.adultVoApi.getAdultNum() == 0 && Api.adultVoApi.getAdultMarryNum() == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    ShareVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    ShareVoApi.TYPE_WIFE = "a";
    ShareVoApi.TYPE_CHILD = "b";
    ShareVoApi.TYPE_GRADE = "c";
    return ShareVoApi;
}(BaseVoApi));
__reflect(ShareVoApi.prototype, "ShareVoApi");
//# sourceMappingURL=ShareVoApi.js.map