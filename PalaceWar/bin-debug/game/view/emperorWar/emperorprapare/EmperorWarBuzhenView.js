/**
 * 称帝战门客布阵
 * author qianjun
 */
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
var EmperorWarBuzhenView = (function (_super) {
    __extends(EmperorWarBuzhenView, _super);
    function EmperorWarBuzhenView() {
        var _this = _super.call(this) || this;
        _this._buzheninfo = {};
        _this._scrollList = null;
        _this._close = false;
        return _this;
    }
    EmperorWarBuzhenView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "empupbg", "empmanbg", "empzli", "empzzhi", "empwli", "empmli", "childview_addicon"
        ]);
    };
    EmperorWarBuzhenView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkOpenSeat()) {
            return "EmpWarBuzhenRuleInfo_withNewMonthYear";
        }
        return "EmpWarBuzhenRuleInfo";
    };
    Object.defineProperty(EmperorWarBuzhenView.prototype, "api", {
        get: function () {
            return Api.emperorwarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarBuzhenView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE, this.checkBuzhen, this);
        //底部
        var emparena_bottom = BaseBitmap.create("emparena_bottom");
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);
        var savebtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "emperorWarBuzhenSave", view.saveBuzhen, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, savebtn, emparena_bottom);
        view.addChild(savebtn);
        //顶部
        var topBg = BaseBitmap.create("empupbg");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view, [0, view.titleBg.height]);
        view.addChild(topBg);
        // let headImg = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());
        var headImg = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), Api.playerVoApi.getPlayerPtitle());
        headImg.name = "headImg";
        view.setLayoutPosition(LayoutConst.lefttop, headImg, topBg, [15, 5]);
        view.addChild(headImg);
        var nameTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, headImg, [headImg.width + 20, 10]);
        view.addChild(nameTxt);
        //主角属性
        var zizhi = Api.practiceVoApi.geAbilityValues();
        var totalV = App.StringUtil.changeIntToText(zizhi[0] + zizhi[1] + zizhi[2] + zizhi[3]);
        var zzhitext = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarBuzhenZzhi", [totalV]), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, zzhitext, nameTxt, [0, nameTxt.textHeight + 10]);
        view.addChild(zzhitext);
        var attrV = Api.practiceVoApi.geAttrValues();
        totalV = App.StringUtil.changeIntToText(attrV[0] + attrV[1] + attrV[2] + attrV[3]);
        var sxingtext = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarBuzhenZsx", [totalV]), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, sxingtext, zzhitext, [0, nameTxt.textHeight + 10]);
        view.addChild(sxingtext);
        var smingDesc = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarBuzhenDesc"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, smingDesc, topBg, [0, 10]);
        view.addChild(smingDesc);
        var listBg = BaseBitmap.create("public_9_bg33");
        listBg.width = GameConfig.stageWidth - 20;
        listBg.height = emparena_bottom.y - topBg.y - topBg.height - 20;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, listBg, view, [0, topBg.y + topBg.height + 10]);
        if (PlatformManager.checkIsThSp()) {
            listBg.x = topBg.x + 10;
        }
        view.addChild(listBg);
        var arr = ["wli", "zli", "zzhi", "mli"];
        view._buzheninfo = view.api.getServantInfo();
        view.api.curBuzhen = view._buzheninfo;
        var data = [];
        for (var i in view._buzheninfo) {
            var idx = Number(i);
            data.push({
                'type': idx,
                'image': arr[idx - 1],
                'empty': view._buzheninfo[i] == '',
                'servantID': view._buzheninfo[i],
            });
        }
        view._scrollList = ComponentManager.getScrollList(EmperorWarBuzhenItem, data, new egret.Rectangle(listBg.x, listBg.y, listBg.width, listBg.height - 10));
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._scrollList, listBg);
        view.addChild(view._scrollList);
        view.swapChildren(view.closeBtn, topBg);
    };
    EmperorWarBuzhenView.prototype.getNewBuzhenInfo = function () {
        var view = this;
        view._buzheninfo = {};
        for (var i = 0; i < 4; ++i) {
            var item = view._scrollList.getItemByIndex(i);
            if (item && item.curServantId) {
                view._buzheninfo[i + 1] = item.curServantId;
            }
            else {
                view._buzheninfo[i + 1] = '';
            }
        }
    };
    EmperorWarBuzhenView.prototype.saveBuzhen = function () {
        var view = this;
        view.getNewBuzhenInfo();
        if (view.api.isCanAutoSelect(view._buzheninfo)) {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: LanguageManager.getlocal('emperorWarCanNotBuzhenTip1'),
                callback: this.saveSinfo,
                handler: this,
                needCancel: true,
            });
        }
        else {
            var change = view.api.buzhewnIsChange(view._buzheninfo);
            if (change) {
                view.saveSinfo();
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarSaveBuzhen"));
            }
        }
    };
    EmperorWarBuzhenView.prototype.saveSinfo = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_SETPOS), view.setposCallBack, view);
        NetManager.request(NetRequestConst.REQUEST_EMPEROR_SETPOS, {
            setArr: view._buzheninfo,
            version: view.api.getVersion(),
        });
    };
    EmperorWarBuzhenView.prototype.setposCallBack = function (evt) {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_SETPOS), view.setposCallBack, view);
        if (evt.data.ret) {
            if (evt.data.data.ret < 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
                if (view._close) {
                    view._close = false;
                    view.hide();
                }
                return;
            }
            var data = evt.data.data.data;
            view.api.setDataInfo(data.myemperor);
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarSaveBuzhen"));
            if (view._close) {
                view._close = false;
                view.hide();
            }
        }
    };
    EmperorWarBuzhenView.prototype.closeHandler = function () {
        var view = this;
        view.getNewBuzhenInfo();
        var change = view.api.buzhewnIsChange(view._buzheninfo);
        if (change) {
            view._close = true;
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: LanguageManager.getlocal("emperorWarCanNotBuzhenTip" + (change ? 2 : 1)),
                callback: this.saveSinfo,
                handler: this,
                needCancel: true,
                cancelcallback: view.hide
            });
        }
        else {
            view._close = false;
            view.hide();
        }
    };
    EmperorWarBuzhenView.prototype.checkBuzhen = function () {
        var view = this;
        if (view._scrollList) {
            view.getNewBuzhenInfo();
            view.api.curBuzhen = view._buzheninfo;
        }
    };
    EmperorWarBuzhenView.prototype.tick = function () {
        var view = this;
        if (view.api.cannotSetBuzhen()) {
            view.hide();
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCanNotSaveBuzhen"));
        }
    };
    EmperorWarBuzhenView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE, this.checkBuzhen, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_SETPOS), view.setposCallBack, view);
        view._scrollList = null;
        view._buzheninfo = {};
        view._close = false;
        _super.prototype.dispose.call(this);
    };
    return EmperorWarBuzhenView;
}(CommonView));
__reflect(EmperorWarBuzhenView.prototype, "EmperorWarBuzhenView");
//# sourceMappingURL=EmperorWarBuzhenView.js.map