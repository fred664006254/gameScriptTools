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
 * 更新日志
 * author qianjun
 *
 */
var UpdateNoticeView = (function (_super) {
    __extends(UpdateNoticeView, _super);
    function UpdateNoticeView() {
        var _this = _super.call(this) || this;
        _this._arr = [];
        _this._list = null;
        _this._lastidx = 0;
        return _this;
    }
    UpdateNoticeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "update_cn", "updatenoticeview"
        ]);
    };
    UpdateNoticeView.prototype.isTouchMaskClose = function () {
        return false;
    };
    UpdateNoticeView.prototype.getTitleStr = function () {
        return LangMger.getlocal("menu_update");
    };
    UpdateNoticeView.prototype.closeHandler = function () {
        _super.prototype.closeHandler.call(this);
    };
    UpdateNoticeView.prototype.getBgName = function () {
        return "ab_task_view_bg";
    };
    UpdateNoticeView.prototype.getShowHeight = function () {
        return 841;
    };
    UpdateNoticeView.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.UPDATELOG_SHOWIDX
        ];
    };
    UpdateNoticeView.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case MsgConst.UPDATELOG_SHOWIDX:
                view.showContent(evt);
                break;
        }
    };
    // 打开该面板时，需要传参数msg
    UpdateNoticeView.prototype.initView = function () {
        var view = this;
        view._arr = [];
        var arr = [];
        var count = 0;
        var data = RES.getRes("update_cn");
        for (var i in data) {
            arr.push({
                key: i,
                content: data[i],
                show: count == 0 ? 1 : 0
            });
            ++count;
        }
        view._arr = arr;
        var list = ComponentMgr.getScrollList(UpdateNoticeItem, arr, new egret.Rectangle(0, 0, 516, 720));
        view.addChildToContainer(list);
        list.x = (this.getShowWidth() - list.width) / 2;
        list.y = 10;
        list.setEmptyTip(LangMger.getlocal("updatelogtip1"));
        list.bounces = false;
        view._list = list;
        // let json = RES.getResByUrl(`/resource/config/language/${GameData.languageUsing}_update.json`, (data)=>{
        //     if(data){
        //     }
        // }, view);
    };
    UpdateNoticeView.prototype.showContent = function (evt) {
        var view = this;
        var idx = evt.data.idx;
        var show = evt.data.show;
        if (view._arr[view._lastidx]) {
            view._arr[view._lastidx].show = 0;
        }
        view._arr[idx].show = 1;
        view._list.refreshData(view._arr);
        view._lastidx = idx;
    };
    UpdateNoticeView.prototype.resetBgSize = function () {
        var view = this;
        view.viewBg.width = this.getShowWidth();
        view.viewBg.height = this.getShowHeight();
        _super.prototype.resetBgSize.call(this);
    };
    UpdateNoticeView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    UpdateNoticeView.prototype.dispose = function () {
        var view = this;
        view._arr = [];
        view._list = null;
        view._lastidx = 0;
        _super.prototype.dispose.call(this);
    };
    return UpdateNoticeView;
}(PopupView));
__reflect(UpdateNoticeView.prototype, "UpdateNoticeView");
//# sourceMappingURL=UpdateNoticeView.js.map