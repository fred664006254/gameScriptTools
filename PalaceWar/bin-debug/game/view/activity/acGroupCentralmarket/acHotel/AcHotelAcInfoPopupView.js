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
  * 客栈活动详情
  * @author 张朝阳
  * date 2018/12/10
  * @class AcHotelAcInfoPopupView
  */
var AcHotelAcInfoPopupView = (function (_super) {
    __extends(AcHotelAcInfoPopupView, _super);
    function AcHotelAcInfoPopupView() {
        return _super.call(this) || this;
    }
    AcHotelAcInfoPopupView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var bgStr = "achotelview_infobg-" + this.getUiCode();
        if (code == "1") {
            bgStr = "achotelview_infobg";
        }
        var bg = BaseLoadBitmap.create(bgStr);
        bg.width = 548;
        bg.height = 489;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);
        var acTimeTFKey = "acHotelAcInfoTime-" + code;
        if (code == "1") {
            acTimeTFKey = "acHotelAcInfoTime";
        }
        var acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal(acTimeTFKey, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
        acTimeTF.setPosition(bg.x + 20, bg.y + bg.height - acTimeTF.height - 80);
        this.addChildToContainer(acTimeTF);
        var acDescKey = "acHotelAcInfoDesc-" + code;
        if (code == "1") {
            acDescKey = "acHotelAcInfoDesc";
            if (Api.switchVoApi.checkServantRefuseBattle()) {
                acDescKey = "acHotelAcInfoDesc_withOpenRefusal";
            }
        }
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal(acDescKey), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.width = 508;
        acDesc.lineSpacing = 3;
        acDesc.setPosition(acTimeTF.x, acTimeTF.y + acTimeTF.height + 3);
        this.addChildToContainer(acDesc);
        var servantCfg = Config.ServantCfg.getServantItemById("1054");
        if (servantCfg.quality2) {
            var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
            cornerImg.x = 475;
            cornerImg.y = 290;
            cornerImg.setScale(1.3);
            this.addChildToContainer(cornerImg);
        }
    };
    AcHotelAcInfoPopupView.prototype.getShowHeight = function () {
        return 555;
    };
    AcHotelAcInfoPopupView.prototype.getUiCode = function () {
        // if (this.param.data.code == "3") {
        // 	return "2"
        // }
        return this.param.data.code;
    };
    AcHotelAcInfoPopupView.prototype.getTitleStr = function () {
        if (this.param.data.code == "1") {
            return "acmidAutumnAcInfoTitle";
        }
        return "acHotelAcInfoPopupViewTitle-" + this.param.data.code;
    };
    AcHotelAcInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcHotelAcInfoPopupView;
}(PopupView));
__reflect(AcHotelAcInfoPopupView.prototype, "AcHotelAcInfoPopupView");
//# sourceMappingURL=AcHotelAcInfoPopupView.js.map