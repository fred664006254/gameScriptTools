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
 * date 2017/9/11
 * @class BaseViewController
 */
var BaseViewController = (function (_super) {
    __extends(BaseViewController, _super);
    function BaseViewController() {
        var _this = _super.call(this) || this;
        _this._viewList = new Object();
        // private _tickList:string[]=[];
        _this._isTickStarted = false;
        return _this;
    }
    /**
     * 打开新界面
     * @param viewId 窗口id
     * @param data 传递参数，参数自己定，从view的show里面data.data原样取回
     */
    BaseViewController.prototype.openView = function (viewId, data) {
        if (viewId) {
            //37跳转新vip界面
            if (PlatformManager.checkIs37WdShenheSp() && viewId == "RechargeVipView") {
                viewId = "RechargeShenHeVipView";
            }
            var apiNameId = viewId.replace("View", "");
            apiNameId = App.StringUtil.firstCharToLower(apiNameId);
            if (Api[apiNameId + "VoApi"] && Api[apiNameId + "VoApi"].getOpenViewMessage) {
                var openViewMessage = Api[apiNameId + "VoApi"].getOpenViewMessage();
                if (openViewMessage) {
                    return App.CommonUtil.showTip(openViewMessage);
                }
            }
            var _a = this.getViewNameAndParam(viewId), viewName = _a.viewName, viewParam = _a.viewParam;
            var view = undefined;
            if (this._viewList.hasOwnProperty(viewName)) {
                view = this._viewList[viewName];
            }
            else {
                var viewClass = egret.getDefinitionByName(viewName);
                if (viewClass) {
                    view = new viewClass();
                    this._viewList[viewName] = view;
                }
                else {
                    App.LogUtil.show("缺少" + viewName);
                    return;
                }
            }
            var param = undefined;
            if (viewParam) {
                param = { tab: viewParam };
            }
            if (data) {
                if (param) {
                    param.data = data;
                }
                else {
                    param = { data: data };
                }
            }
            view.show(param);
            if (view["tick"]) {
                // let isStart:boolean = this._tickList.length<1;
                // if(this._tickList.indexOf(viewName)<0)
                // {
                // 	this._tickList.push(viewName);
                // }
                // if(isStart)
                // {
                if (this._isTickStarted == false) {
                    TickManager.addTick(this.tick, this);
                    this._isTickStarted = true;
                }
                // }
            }
        }
    };
    BaseViewController.prototype.tick = function () {
        // if(this._tickList.length>0)
        // {
        // 	let l:number=this._tickList.length;
        // 	let view:BaseView=null;
        // 	for(var i:number=l-1;i>=0;i--)
        // 	{
        // 		view=this._viewList[this._tickList[i]];
        // 		if(view&&view.parent)
        // 		{
        // 			let tick:Function=view["tick"];
        // 			tick.apply(view);
        // 		}
        // 		else
        // 		{
        // 			this._tickList.splice(i,1);
        // 		}
        // 	}
        // }
        if (this._viewList) {
            for (var key in this._viewList) {
                var view = this._viewList[key];
                if (view && view.isInit()) {
                    if (view["tick"]) {
                        view["tick"]();
                    }
                }
            }
        }
    };
    BaseViewController.prototype.viewHided = function (viewId) {
        // this.checkAndStopTick(viewId);
    };
    BaseViewController.prototype.checkAndStopTick = function (viewId) {
        // let {viewName}=this.getViewNameAndParam(viewId);
        // let viewIndex:number=this._tickList.indexOf(viewName);
        // if(viewIndex>-1)
        // {
        // 	this._tickList.splice(viewIndex,1);
        // 	if(this._tickList.length<1)
        // 	{
        // 		TickManager.removeTick(this.tick,this);
        // 	}
        // }
    };
    /**
     * 关闭界面
     * @param viewId 界面id
     */
    BaseViewController.prototype.hideView = function (viewId) {
        var viewName = this.getViewNameAndParam(viewId).viewName;
        var view = undefined;
        if (this._viewList.hasOwnProperty(viewName)) {
            view = this._viewList[viewName];
            view.hide();
        }
    };
    /**
     * 获取界面实例
     * @param viewId
     */
    BaseViewController.prototype.getView = function (viewId) {
        var viewName = this.getViewNameAndParam(viewId).viewName;
        var view = undefined;
        if (this._viewList.hasOwnProperty(viewName)) {
            view = this._viewList[viewName];
        }
        return view;
    };
    BaseViewController.prototype.getViewNameAndParam = function (viewId) {
        var idArr = viewId.split("|");
        var viewName = idArr[0];
        var paramStr = idArr[1];
        return { viewName: viewName, viewParam: paramStr };
    };
    /**
     * 关掉所有view
     */
    BaseViewController.prototype.hideAllView = function () {
        if (this._viewList) {
            for (var key in this._viewList) {
                var view = this._viewList[key];
                if (view && view.isShow()) {
                    if (LoginManager.isCreateScene == false && (view instanceof LoginView)) {
                        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST,view.refresh,view);
                        // view.showLogoAndLoginBtn();
                    }
                    else {
                        if (view.hide.length > 0) {
                            view.hide.call(view, true);
                        }
                        else {
                            view.hide();
                        }
                    }
                }
            }
        }
    };
    /**
     * 检测是否有正在显示的界面
     */
    BaseViewController.prototype.checkHasShowedView = function () {
        if (this._viewList) {
            for (var key in this._viewList) {
                var view = this._viewList[key];
                if (view && view.isShow()) {
                    return true;
                }
            }
        }
        return false;
    };
    BaseViewController.prototype.getShowedView = function () {
        var viewList = [];
        if (this._viewList) {
            for (var key in this._viewList) {
                var view = this._viewList[key];
                if (view && view.isShow()) {
                    viewList.push(view);
                }
            }
        }
        return viewList;
    };
    BaseViewController.prototype.dispose = function () {
        if (this._viewList) {
            for (var key in this._viewList) {
                var view = this._viewList[key];
                if (view) {
                    view.hide();
                }
                delete this._viewList[key];
            }
        }
    };
    return BaseViewController;
}(BaseController));
__reflect(BaseViewController.prototype, "BaseViewController");
