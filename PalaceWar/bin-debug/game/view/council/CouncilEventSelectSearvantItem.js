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
 * 议事派遣门客item
 * author qianjun
 * date 2017/10/12
 */
var CouncilEventSelectSearvantItem = (function (_super) {
    __extends(CouncilEventSelectSearvantItem, _super);
    function CouncilEventSelectSearvantItem() {
        var _this = _super.call(this) || this;
        _this._Index = 0;
        _this._selectBtn = null;
        _this._joinPic = null;
        return _this;
    }
    Object.defineProperty(CouncilEventSelectSearvantItem.prototype, "api", {
        get: function () {
            return Api.councilVoApi;
        },
        enumerable: true,
        configurable: true
    });
    CouncilEventSelectSearvantItem.prototype.initItem = function (index, info) {
        var _this = this;
        var view = this;
        view._data = info;
        view._Index = index;
        view.width = 508;
        view.height = 120 + 10;
        view._servantInfoVo = info.data;
        var data = info.data;
        var bg = BaseBitmap.create("public_9_bg44");
        bg.width = 508;
        bg.height = 120;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);
        var temW = 94;
        var iconBgBt = BaseLoadBitmap.create(data.qualityBoxImgPath, null, { callback: function () {
                view.setLayoutPosition(LayoutConst.leftverticalCenter, iconBgBt, bg, [10, 0]);
                var iconBt = BaseLoadBitmap.create(data.halfImgPath, null, { callback: function () {
                        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconBt, iconBgBt);
                    }, callbackThisObj: view });
                _this.addChild(iconBt);
                iconBt.scaleX = (temW - 10) / 180;
                iconBt.scaleY = (temW - 10) / 177;
                if (data.isServantExile()) {
                    var exileBMscale = temW / 194;
                    var exileBM = BaseBitmap.create("public_servantexilelogo");
                    exileBM.setScale(exileBMscale);
                    exileBM.setPosition(iconBgBt.x + exileBMscale * 194 - exileBM.width * exileBMscale, iconBgBt.y);
                    _this.addChild(exileBM);
                }
                var nameTxt = ComponentManager.getTextField(data.servantName, 22, TextFieldConst.COLOR_QUALITY_YELLOW);
                view.setLayoutPosition(LayoutConst.lefttop, nameTxt, iconBgBt, [94 + 10, 0]);
                view.addChild(nameTxt);
                var levelTxt = ComponentManager.getTextField(LanguageManager.getlocal('discussServantLevel', [data.level.toString()]), 22);
                view.setLayoutPosition(LayoutConst.lefttop, levelTxt, nameTxt, [0, nameTxt.textHeight + 10]);
                view.addChild(levelTxt);
                //主属性 1 武力 2 智力 3政治 4魅力
                var mainAtr = '';
                var attr = '';
                switch (info.needType) {
                    case 1:
                        mainAtr = App.StringUtil.changeIntToText(data.attrVo.forceTotal);
                        attr = "emperorWarBuzhen_forceAtt";
                        break;
                    case 2:
                        mainAtr = App.StringUtil.changeIntToText(data.attrVo.brainsTotal);
                        attr = "emperorWarBuzhen_inteAtt";
                        break;
                    case 4:
                        mainAtr = App.StringUtil.changeIntToText(data.attrVo.charmTotal);
                        attr = "emperorWarBuzhen_charmAtt";
                        break;
                    case 3:
                        mainAtr = App.StringUtil.changeIntToText(data.attrVo.politicsTotal);
                        attr = "emperorWarBuzhen_policyAtt";
                        break;
                    case 0:
                        mainAtr = App.StringUtil.changeIntToText(data.total);
                        attr = "emperorWarBuzhenZsx";
                        break;
                }
                var mainatrText = ComponentManager.getTextField(LanguageManager.getlocal(attr, [mainAtr]), 22);
                view.setLayoutPosition(LayoutConst.lefttop, mainatrText, levelTxt, [0, levelTxt.textHeight + 10]);
                view.addChild(mainatrText);
            }, callbackThisObj: view });
        this.addChild(iconBgBt);
        iconBgBt.scaleX = temW / 194;
        iconBgBt.scaleY = temW / 192;
        var selectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'allianceTaskSendBtnTxt', view.selectClick, view);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, selectBtn, view, [10, 0]);
        view.addChild(selectBtn);
        selectBtn.visible = false;
        view._selectBtn = selectBtn;
        var str = '';
        var isjoin = view.api.servantIsJoined(info.eventId, data.servantId);
        switch (isjoin) {
            case 'JOIN_THIS':
                str = 'discusspqzhong';
                break;
            case 'JOIN_OTHER':
                str = 'discussypqian';
                break;
            case 'NOT_JOIN':
                str = '';
                break;
        }
        var joinText = BaseBitmap.create(str);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, joinText, view, [10, 0]);
        view.addChild(joinText);
        joinText.visible = false;
        view._joinPic = joinText;
        if (isjoin == 'NOT_JOIN') {
            view._selectBtn.visible = true;
        }
        else {
            view._joinPic.visible = true;
        }
    };
    CouncilEventSelectSearvantItem.prototype.refreshStatus = function (type) {
        var view = this;
        if (type == 'add') {
            view._selectBtn.visible = false;
            var isjoin = view.api.servantIsJoined(view._data.eventId, view._data.data.servantId);
            var str = '';
            switch (isjoin) {
                case 'JOIN_THIS':
                    str = 'discusspqzhong';
                    break;
                case 'JOIN_OTHER':
                    str = 'discussypqian';
                    break;
            }
            view._joinPic.setRes(str);
            view._joinPic.visible = true;
        }
        else {
            view._selectBtn.visible = true;
            view._joinPic.visible = false;
        }
        view.setLayoutPosition(LayoutConst.rightverticalCenter, view._joinPic, view, [10, 0], true);
    };
    CouncilEventSelectSearvantItem.prototype.selectClick = function () {
        var view = this;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_COUNCIL_TEAMCHANGE, { type: 'add', idx: view._Index, servantId: view._data.data.servantId });
    };
    CouncilEventSelectSearvantItem.prototype.getSpaceX = function () {
        return 10;
    };
    CouncilEventSelectSearvantItem.prototype.dispose = function () {
        var view = this;
        view._joinPic = null;
        view._selectBtn = null;
        _super.prototype.dispose.call(this);
    };
    return CouncilEventSelectSearvantItem;
}(ScrollListItem));
__reflect(CouncilEventSelectSearvantItem.prototype, "CouncilEventSelectSearvantItem");
//# sourceMappingURL=CouncilEventSelectSearvantItem.js.map