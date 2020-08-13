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
 * 分封玩家item
 * author qianjun
 */
var PromotePlayerScrollItem = (function (_super) {
    __extends(PromotePlayerScrollItem, _super);
    function PromotePlayerScrollItem() {
        var _this = _super.call(this) || this;
        _this._rowIdx = 0;
        _this._uiData = undefined;
        _this._btn = null;
        _this._rqTxt = null;
        return _this;
    }
    Object.defineProperty(PromotePlayerScrollItem.prototype, "api", {
        get: function () {
            return Api.emperorwarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromotePlayerScrollItem.prototype, "cfg", {
        get: function () {
            return Config.EmperorwarCfg;
        },
        enumerable: true,
        configurable: true
    });
    PromotePlayerScrollItem.prototype.initItem = function (index, data) {
        var view = this;
        view._rowIdx = index;
        view._uiData = data;
        view.width = data.width;
        view.height = 110;
        var pos_arr = data.pos_arr;
        //头像
        var title = data.phototitle;
        // let headImg = Api.playerVoApi.getPlayerCircleHead(data.pic, title);
        // headImg.width = 93;
        // headImg.height = 93;
        // headImg.name = "headImg";
        // headImg.addTouchTap(view.showUserInfo,view,[data.uid]);
        var headImg = Api.playerVoApi.getPlayerCircleHead(data.pic, title);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, headImg, view, [pos_arr[0] + (48 - headImg.width) / 2, 0]);
        view.addChild(headImg);
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        nameTxt.text = data.name;
        view.addChild(nameTxt);
        var titleinfo = App.CommonUtil.getTitleData(view._uiData.title);
        if (titleinfo.title != "" && titleinfo.title != "{}") {
            // let officerImg = App.CommonUtil.getTitlePic(view._uiData.title);
            // let deltaV = 0.8;
            // officerImg.setScale(deltaV);
            // let spaceY = (view.height - nameTxt.textHeight - officerImg.height + 20)/3;
            // view.setLayoutPosition(LayoutConst.lefttop, nameTxt, view, [pos_arr[1] + (96 - nameTxt.textWidth)/2, spaceY]);
            // view.setLayoutPosition(LayoutConst.lefttop, officerImg, view, [pos_arr[1] + (96 - officerImg.width * officerImg.scaleX)/2,spaceY + nameTxt.textHeight + 10]);
            // view.addChild(officerImg);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, view, [pos_arr[1] + (96 - nameTxt.textWidth) / 2, 0]);
        }
        else {
            view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, view, [pos_arr[1] + (96 - nameTxt.textWidth) / 2, 0]);
        }
        var powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        powerTxt.text = App.StringUtil.changeIntToText(Number(this._uiData.power));
        view.setLayoutPosition(LayoutConst.leftverticalCenter, powerTxt, view, [pos_arr[2] + (48 - powerTxt.textWidth) / 2, 0]);
        view.addChild(powerTxt);
        if (PlatformManager.checkIsEnSp()) {
            powerTxt.x = 340;
        }
        //任命按钮   
        var button = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "PromotePlayersPopViewRm", view.appointConfirm, view);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, button, view, [pos_arr[3] + (48 - button.width) / 2, 0]);
        view.addChild(button);
        if (PlatformManager.checkIsTextHorizontal()) {
            button.x += 40;
        }
        view._btn = button;
        if (PlatformManager.checkIsRuLang()) {
            button.x = view.width - button.width - 2;
        }
        var line = BaseBitmap.create("emprankinglist_line");
        line.width = view.width;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view);
        view.addChild(line);
    };
    PromotePlayerScrollItem.prototype.appointConfirm = function () {
        var view = this;
        var data = view._uiData;
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "itemUseConstPopupViewTitle",
            msg: LanguageManager.getlocal("PromotePlayersPopViewRmConfirm", [data.name, LanguageManager.getlocal("promoteType" + data.promoteType)]),
            callback: this.appoint,
            handler: this,
            needCancel: true,
            txtcolor: 0xffffff
        });
    };
    PromotePlayerScrollItem.prototype.appoint = function () {
        var view = this;
        var data = view._uiData;
        NetManager.request(NetRequestConst.REQUEST_PROMOTE_APPOINT, {
            position: data.promoteType,
            auid: data.uid,
        });
    };
    PromotePlayerScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    PromotePlayerScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    PromotePlayerScrollItem.prototype.dispose = function () {
        this._uiData = null;
        this.cacheAsBitmap = false;
        this._btn = null;
        this._rqTxt = null;
        _super.prototype.dispose.call(this);
    };
    return PromotePlayerScrollItem;
}(ScrollListItem));
__reflect(PromotePlayerScrollItem.prototype, "PromotePlayerScrollItem");
//# sourceMappingURL=PromotePlayerScrollItem.js.map