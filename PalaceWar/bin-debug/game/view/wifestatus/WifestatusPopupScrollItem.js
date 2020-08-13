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
 * 册封详情Item
 * author dky
 * date 2018/4/26
 * @class WifestatusPopupScrollItem
 */
var WifestatusPopupScrollItem = (function (_super) {
    __extends(WifestatusPopupScrollItem, _super);
    function WifestatusPopupScrollItem() {
        return _super.call(this) || this;
    }
    WifestatusPopupScrollItem.prototype.initItem = function (index, data) {
        this.width = 520;
        this.height = 57 + this.getSpaceY();
        // let parent = <AchievementDetailPopupView>this.par
        var id = data.id;
        var wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(WifestatusPopupView.wifeId);
        var bgStr = "childview_bg1";
        //未解锁
        if (Number(id) > Number(wifestatusVo.level) && id != "2") {
            bgStr = "childview_bg2";
        }
        if (wifeVo.intimacy < data.needIntimacy || wifeVo.glamour < data.needGlamour) {
            bgStr = "childview_bg2";
        }
        if (WifestatusPopupView.wifeLevel == data.id) {
            bgStr = "childview_bg3";
        }
        var bgBg = BaseBitmap.create(bgStr);
        bgBg.width = this.width;
        bgBg.height = 57;
        this.addChild(bgBg);
        //未解锁
        if (Number(id) > Number(wifestatusVo.level) && id != "2") {
            var lockIcon = BaseBitmap.create("wifestatus_lock");
            lockIcon.x = 450;
            lockIcon.y = this.height / 2 - lockIcon.height / 2;
            this.addChild(lockIcon);
        }
        //当前位份
        if (WifestatusPopupView.wifeLevel == data.id) {
            var nodeTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusCurStatus"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            nodeTF.textColor = TextFieldConst.COLOR_BROWN;
            nodeTF.x = bgBg.width - nodeTF.width - 15;
            nodeTF.y = this.height / 2 - nodeTF.height / 2;
            this.addChild(nodeTF);
        }
        // let nameStr = LanguageManager.getlocal("wifestatusTitle" + data.id) + "(" + Api.wifestatusVoApi.getWifesNumByLevel(data.id) + "/" + data.maxNum+ ")"
        var numStr = LanguageManager.getlocal("wifestatusTitle" + data.id) + "(" + Api.wifestatusVoApi.getWifesNumByLevel(data.id) + "/" + data.maxNum + ")";
        if (data.id == "1") {
            numStr = LanguageManager.getlocal("wifestatusTitle" + data.id) + "(" + Api.wifestatusVoApi.getNoStatusWife().length + ")";
        }
        var nameTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTF.textColor = TextFieldConst.COLOR_BLACK;
        nameTF.x = this.width / 2 - nameTF.width / 2;
        nameTF.y = this.height / 2 - nameTF.height / 2;
        this.addChild(nameTF);
    };
    WifestatusPopupScrollItem.prototype.refreshData = function (index) {
    };
    WifestatusPopupScrollItem.prototype.getBtnClickHandler = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD, { "achIndex": this._achIndex });
    };
    WifestatusPopupScrollItem.prototype.getSpaceY = function () {
        return 3;
    };
    WifestatusPopupScrollItem.prototype.dispose = function () {
        this._achIndex = null;
        ;
        _super.prototype.dispose.call(this);
    };
    return WifestatusPopupScrollItem;
}(ScrollListItem));
__reflect(WifestatusPopupScrollItem.prototype, "WifestatusPopupScrollItem");
//# sourceMappingURL=WifestatusPopupScrollItem.js.map