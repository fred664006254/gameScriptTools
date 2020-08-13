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
 * 排行列表节点
 */
var AcConquerMainLandAddPreviewItem = (function (_super) {
    __extends(AcConquerMainLandAddPreviewItem, _super);
    function AcConquerMainLandAddPreviewItem() {
        return _super.call(this) || this;
    }
    AcConquerMainLandAddPreviewItem.prototype.initItem = function (index, data, itemParam) {
        var aid = itemParam.aid;
        var code = itemParam.code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        this.width = 520;
        this.height = 50;
        var tarColor = TextFieldConst.COLOR_BROWN_NEW;
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_QUALITY_GREEN_NEW;
        }
        var orderid = index + 1;
        var pos = data.pos[0];
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        rankTxt.text = String(index + 1);
        rankTxt.x = pos.x + (pos.width - rankTxt.width) / 2 - 25;
        rankTxt.y = this.height / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        pos = data.pos[1];
        var serverTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        serverTxt.text = App.StringUtil.changeIntToText3(data.attIncrease[1]);
        serverTxt.x = pos.x + (pos.width - serverTxt.width) / 2 - 25;
        serverTxt.y = this.height / 2 - serverTxt.height / 2;
        ;
        this.addChild(serverTxt);
        pos = data.pos[2];
        var powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        powerTxt.text = vo.getPowerAddBuff(index + 1) + '';
        powerTxt.x = pos.x + (pos.width - powerTxt.width) / 2 - 25;
        powerTxt.y = serverTxt.y;
        this.addChild(powerTxt);
        // if ( this._uiData.vip != "0")
        // {
        //     let vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._uiData.vip).icon);
        //     vipFlag.setScale(0.65);
        //     vipFlag.x =   nameTxt.x + nameTxt.width  ;
        //     vipFlag.y = nameTxt.y ;
        //     this.addChild(vipFlag);
        // }
        var line = BaseBitmap.create("public_line4");
        this.addChild(line);
        line.width = this.width - 10;
        line.x = 8;
        line.y = this.height - line.height;
    };
    /**
     * 不同格子Y间距
     */
    AcConquerMainLandAddPreviewItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcConquerMainLandAddPreviewItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandAddPreviewItem;
}(ScrollListItem));
__reflect(AcConquerMainLandAddPreviewItem.prototype, "AcConquerMainLandAddPreviewItem");
