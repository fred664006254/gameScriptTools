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
 * 助威item
 * author qianjun
 */
var EmperorWarCheerScrollItem = (function (_super) {
    __extends(EmperorWarCheerScrollItem, _super);
    function EmperorWarCheerScrollItem() {
        var _this = _super.call(this) || this;
        _this._rowIdx = 0;
        _this._uiData = undefined;
        _this._btn = null;
        _this._rqTxt = null;
        return _this;
    }
    Object.defineProperty(EmperorWarCheerScrollItem.prototype, "api", {
        get: function () {
            return Api.emperorwarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmperorWarCheerScrollItem.prototype, "cfg", {
        get: function () {
            return Config.EmperorwarCfg;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarCheerScrollItem.prototype.initItem = function (index, data) {
        var view = this;
        view._rowIdx = index;
        view._uiData = data;
        view.width = data.width;
        view.height = 170;
        var listBg = BaseBitmap.create("public_9_bg14");
        listBg.width = view.width;
        listBg.height = view.height;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, listBg, view);
        view.addChild(listBg);
        var tarColor = TextFieldConst.COLOR_BLACK;
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.text = data.name;
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, listBg, [20, 15]);
        view.addChild(nameTxt);
        var line = BaseBitmap.create("public_line1");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0, nameTxt.y + nameTxt.textHeight + 5]);
        view.addChild(line);
        //头像
        var title = data.phototitle;
        var headImg = Api.playerVoApi.getPlayerCircleHead(data.pic, title);
        headImg.name = "headImg";
        headImg.addTouchTap(view.showUserInfo, view, [data.uid]);
        view.setLayoutPosition(LayoutConst.lefttop, headImg, nameTxt, [0, 35]);
        view.addChild(headImg);
        //权势
        var powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        powerTxt.text = LanguageManager.getlocal("powerDes", [App.StringUtil.changeIntToText(Number(data.power))]);
        view.setLayoutPosition(LayoutConst.lefttop, powerTxt, headImg, [headImg.width + 10, 10]);
        view.addChild(powerTxt);
        //官品
        var officerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        officerTxt.text = LanguageManager.getlocal("practiceStorageoffice", [LanguageManager.getlocal("officialTitle" + this._uiData.level)]);
        view.setLayoutPosition(LayoutConst.lefttop, officerTxt, powerTxt, [0, powerTxt.textHeight + 10]);
        view.addChild(officerTxt);
        //帮会
        var clubTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        clubTxt.text = LanguageManager.getlocal("emperorWarCheerBhui", [data.mygname == '' ? LanguageManager.getlocal('nothing') : data.mygname]);
        view.setLayoutPosition(LayoutConst.lefttop, clubTxt, officerTxt, [0, officerTxt.textHeight + 10]);
        view.addChild(clubTxt);
        //人气
        var renqi = data.getcheer * view.cfg.cheerEffect;
        var renqiTxt = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarCheerPower", [renqi.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        view.setLayoutPosition(LayoutConst.righttop, renqiTxt, view, [20, 15]);
        view._rqTxt = renqiTxt;
        view.addChild(renqiTxt);
        //助威按钮   
        var button = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "", view.cheerConfirm, view);
        view.setLayoutPosition(LayoutConst.righttop, button, view, [15, line.y + line.height + 20]);
        view.addChild(button);
        view._btn = button;
        view.fresh_btn_status();
    };
    EmperorWarCheerScrollItem.prototype.showUserInfo = function (evc, uid) {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: uid });
    };
    EmperorWarCheerScrollItem.prototype.userShotCallback = function (event) {
        if (event.data.ret) {
            var data = event.data.data.data;
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
            App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        }
    };
    EmperorWarCheerScrollItem.prototype.fresh_btn_status = function () {
        var view = this;
        var data = view._uiData;
        var zhuweiTxt = "";
        var renqi = 0;
        if (view.api.isHaveZhuWei()) {
            if (data.uid == view.api.getZhuweiID()) {
                zhuweiTxt = LanguageManager.getlocal("emperorWarCheerNum", [view.api.getZhuweiNum().toString()]);
                view._btn.setEnable(true);
            }
            else {
                zhuweiTxt = LanguageManager.getlocal("emperorWarCheerViewTitle");
                view._btn.setEnable(false);
            }
        }
        else {
            zhuweiTxt = LanguageManager.getlocal("emperorWarCheerViewTitle");
            view._btn.setEnable(true);
        }
        view._btn.setText(zhuweiTxt, false);
        renqi = data.getcheer * view.cfg.cheerEffect;
        view._rqTxt.text = LanguageManager.getlocal("emperorWarCheerPower", [renqi.toString()]);
    };
    EmperorWarCheerScrollItem.prototype.cheerConfirm = function () {
        var view = this;
        var data = view._uiData;
        var cfg = Config.EmperorwarCfg;
        var curLevel = Api.playerVoApi.getPlayerLevel();
        if (curLevel < cfg.cheerLv) {
            App.CommonUtil.showTip(LanguageManager.getlocal('emperorWarCheerConition', [LanguageManager.getlocal("officialTitle" + cfg.cheerLv)]));
            return;
        }
        var num = Math.min(view.api.getZhuweiNum(), cfg.cheerCost.length - 1);
        var cost = cfg.cheerCost[num];
        if (Api.playerVoApi.getPlayerGem() < cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal('emperorWarCheerNo'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "itemUseConstPopupViewTitle",
            msg: LanguageManager.getlocal("emperorWarCheertext", [cost, data.name, "+1", cfg.cheerAddAtk * 100 + "\uFF05", view.api.getZhuweiNum().toString()]),
            callback: this.cheerUp,
            handler: this,
            needCancel: true,
            height: 320,
            txtcolor: 0xffffff
        });
        // else{
        //     App.CommonUtil.showTip(LanguageManager.getlocal('emperorWarCheerMax'));
        // }
    };
    EmperorWarCheerScrollItem.prototype.cheerUp = function () {
        var view = this;
        var data = view._uiData;
        NetManager.request(NetRequestConst.REQUEST_EMPEROR_CHEER, {
            fuid: data.uid,
            version: view.api.getVersion(),
        });
    };
    EmperorWarCheerScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    EmperorWarCheerScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    EmperorWarCheerScrollItem.prototype.dispose = function () {
        this._uiData = null;
        this._rqTxt = null;
        this._btn = null;
        this.cacheAsBitmap = false;
        _super.prototype.dispose.call(this);
    };
    return EmperorWarCheerScrollItem;
}(ScrollListItem));
__reflect(EmperorWarCheerScrollItem.prototype, "EmperorWarCheerScrollItem");
//# sourceMappingURL=EmperorWarCheerScrollItem.js.map