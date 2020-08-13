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
 * 称帝助威
 * author qianjun
 */
var EmperorWarCheerView = (function (_super) {
    __extends(EmperorWarCheerView, _super);
    function EmperorWarCheerView() {
        var _this = _super.call(this) || this;
        _this._timeDesc = null;
        _this._time = 0;
        _this._scrollList = null;
        _this._myrenqiTxt = null;
        return _this;
    }
    Object.defineProperty(EmperorWarCheerView.prototype, "api", {
        get: function () {
            return Api.emperorwarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarCheerView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "emperorwarcheerbg"
        ]);
    };
    //请求回调
    EmperorWarCheerView.prototype.receiveData = function (data) {
        var view = this;
        if (data.ret) {
            var cmd = data.data.cmd;
            if (cmd == NetRequestConst.REQUEST_EMPEROR_BMLIST) {
                if (data.data.data.bmlist) {
                    view.api.setBmListData(data.data.data.bmlist);
                }
            }
        }
    };
    // 背景图名称
    // protected getBgName():string
    // {
    // 	return "emperorwarcheerbg";
    // }
    EmperorWarCheerView.prototype.initView = function () {
        var view = this;
        //倒计时提示
        //时间阶段判断 1还未开始 2报名阶段 3助威阶段 4战斗 5结束 可回放
        var type = view.api.judge_time();
        view._time = view.api.getCountDownTime();
        view._timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("emperorTimeDesc" + type, [App.DateUtil.getFormatBySecond(view._time)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._timeDesc, view, [0, view.titleBg.y + view.titleBg.height + 15]);
        view.addChild(view._timeDesc);
        view._timeDesc.x = (GameConfig.stageWidth - view._timeDesc.textWidth) / 2;
        //底部
        var emparena_bottom = BaseBitmap.create("emparena_bottom");
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);
        var renqi = view.api.getSelfNumb() > 0 ? (view.api.curCheer.toString()) : (LanguageManager.getlocal("emperorWarCheerNot"));
        var rqitxt = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarCheerMy", [renqi]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, rqitxt, emparena_bottom, [15, 0]);
        view.addChild(rqitxt);
        view._myrenqiTxt = rqitxt;
        //列表
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_CHEER), view.cheerCallBack, this);
        var listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = view.width - 60;
        listBg.height = emparena_bottom.y - view._timeDesc.y - view._timeDesc.textHeight - 30;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, listBg, view, [0, view._timeDesc.y + view._timeDesc.textHeight + 15]);
        view.addChild(listBg);
        var lenth = 8; //Math.floor(Math.random() * 10) + 1;
        var zhuweiId = Math.floor(Math.random() * 8);
        var data = view.api.getBmlistData('up');
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var unit = data_1[_i];
            unit.width = listBg.width - 20;
        }
        data.sort(function (a, b) {
            if (b.uid == view.api.getZhuweiID()) {
                return 1;
            }
        });
        var scrollList = ComponentManager.getScrollList(EmperorWarCheerScrollItem, data, new egret.Rectangle(listBg.x, listBg.y, listBg.width - 20, listBg.height - 20));
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listBg, [0, 10]);
        view.addChild(scrollList);
        view._scrollList = scrollList;
    };
    EmperorWarCheerView.prototype.cheerCallBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            if (evt.data.data.ret < 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCheerFail"));
                return;
            }
            view.api.setDataInfo(data.myemperor);
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCheerSucess"));
            var listdata = view.api.getBmlistData('up');
            for (var _i = 0, listdata_1 = listdata; _i < listdata_1.length; _i++) {
                var unit = listdata_1[_i];
                if (unit.uid == view.api.getZhuweiID()) {
                    unit.getcheer += 1;
                    break;
                }
            }
            listdata.sort(function (a, b) {
                if (b.uid == view.api.getZhuweiID()) {
                    return 1;
                }
            });
            view._scrollList.setScrollTop(0);
            view._scrollList.refreshData(listdata);
            var renqi = view.api.getSelfNumb() > 0 ? (view.api.curCheer.toString()) : (LanguageManager.getlocal("emperorWarCheerNot"));
            view._myrenqiTxt.text = LanguageManager.getlocal("emperorWarCheerMy", [renqi]);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_EMPWEAR_ZHUWEI_SUCCESS);
        }
    };
    EmperorWarCheerView.prototype.tick = function () {
        var view = this;
        view._time = view.api.getCountDownTime();
        var type = view.api.type;
        view._timeDesc.text = LanguageManager.getlocal("emperorTimeDesc" + view.api.type, [App.DateUtil.getFormatBySecond(view._time)]);
        view._timeDesc.x = (GameConfig.stageWidth - view._timeDesc.textWidth) / 2;
        if (type > 3) {
            view.hide();
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCheerError"));
        }
        if (view._time <= 0) {
            view._timeDesc.text = LanguageManager.getlocal("emperorTimeDesc" + type, [App.DateUtil.getFormatBySecond(view._time)]);
            view._timeDesc.x = (GameConfig.stageWidth - view._timeDesc.textWidth) / 2;
        }
    };
    EmperorWarCheerView.prototype.dispose = function () {
        var view = this;
        view._timeDesc = null;
        view._scrollList = null;
        view._myrenqiTxt = null;
        view._timeDesc = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_CHEER), view.cheerCallBack, view);
        _super.prototype.dispose.call(this);
    };
    return EmperorWarCheerView;
}(CommonView));
__reflect(EmperorWarCheerView.prototype, "EmperorWarCheerView");
//# sourceMappingURL=EmperorWarCheerView.js.map