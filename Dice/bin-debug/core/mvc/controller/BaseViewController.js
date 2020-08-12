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
        App.MsgHelper.addEvt(MsgConst.DPOBJCTR_ADDSTAGE, _this.showOrHideViewHandler, _this);
        App.MsgHelper.addEvt(MsgConst.DPOBJCTR_REMOVESTAGE, _this.showOrHideViewHandler, _this);
        return _this;
    }
    BaseViewController.prototype.showOrHideViewHandler = function (e) {
        var viewName = e.data;
        var tview = this.getView(viewName);
        if (tview instanceof CommonView) {
            var tagView = null;
            if (LayerMgr.panelLayer) {
                var numChild = LayerMgr.panelLayer.numChildren;
                for (var i = numChild - 1; i >= 0; i--) {
                    var view = LayerMgr.panelLayer.getChildAt(i);
                    if (view instanceof CommonView) {
                        if (view == tview) {
                            continue;
                        }
                        tagView = view;
                        switch (e.type) {
                            case MsgConst.DPOBJCTR_ADDSTAGE:
                                tagView["onBeCoverHandler"]();
                                break;
                            case MsgConst.DPOBJCTR_REMOVESTAGE:
                                tagView["onTopHandler"]();
                                break;
                            default:
                        }
                        break;
                    }
                }
            }
        }
    };
    /**
     * 打开新界面
     * @param viewId 窗口id
     * @param data 传递参数，参数自己定，从view的show里面data.data原样取回
     */
    BaseViewController.prototype.openView = function (viewId, data, useQueue) {
        if (useQueue === void 0) { useQueue = false; }
        if (viewId) {
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
            view.setUseQueue(useQueue);
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
                    TickMgr.addTick(this.tick, this);
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
    BaseViewController.prototype.fasttick = function () {
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
                    if (view instanceof NetErrorPopupView || view instanceof OfflineView) { }
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
     * @param isAll 是否是全部view，默认是全部，false时候不包括警告界面和登录界面
     */
    BaseViewController.prototype.checkHasShowedView = function (isAll) {
        if (isAll === void 0) { isAll = true; }
        if (this._viewList) {
            for (var key in this._viewList) {
                var view = this._viewList[key];
                if (view && view.isShow()) {
                    if (isAll == false && ((view instanceof NetErrorPopupView))) { }
                    else {
                        return true;
                    }
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
    /**
     * 找到并关闭 返回true，没有要关的板子，返回false
     */
    BaseViewController.prototype.hideTopView = function () {
        // if(!LoginManager.isCreateScene)
        // {
        // 	return false;
        // }
        var msgParent = LayerMgr.maskLayer;
        if (msgParent) {
            var numChildren = msgParent.numChildren;
            if (numChildren > 0) {
                while (numChildren > 0) {
                    numChildren--;
                    var child = msgParent.getChildAt(numChildren);
                    if (child instanceof BaseView) {
                        if (child instanceof NetErrorPopupView) {
                            return false;
                        }
                        else {
                            child.hide();
                            return true;
                        }
                    }
                }
            }
        }
        var parent = LayerMgr.panelLayer;
        if (parent) {
            var numChildren = parent.numChildren;
            if (numChildren > 0) {
                while (numChildren > 0) {
                    numChildren--;
                    var child = parent.getChildAt(numChildren);
                    if (child instanceof BaseView) {
                        child.hide();
                        return true;
                    }
                }
            }
        }
        return false;
    };
    BaseViewController.prototype.dispose = function () {
        if (this._viewList) {
            for (var key in this._viewList) {
                var view = this._viewList[key];
                if (view && view.isShow()) {
                    view.hide();
                }
                delete this._viewList[key];
            }
        }
    };
    return BaseViewController;
}(BaseController));
__reflect(BaseViewController.prototype, "BaseViewController");
//# sourceMappingURL=BaseViewController.js.map