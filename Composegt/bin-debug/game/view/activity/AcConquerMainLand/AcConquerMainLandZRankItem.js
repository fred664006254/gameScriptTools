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
var AcConquerMainLandZRankItem = (function (_super) {
    __extends(AcConquerMainLandZRankItem, _super);
    function AcConquerMainLandZRankItem() {
        return _super.call(this) || this;
    }
    AcConquerMainLandZRankItem.prototype.initItem = function (index, data) {
        this.width = 520;
        this.height = 50; //rankbg_1
        var tarColor = TextFieldConst.COLOR_BROWN_NEW;
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_QUALITY_GREEN_NEW;
        }
        var orderid = index + 1;
        var pos = data.pos[0];
        if (index < 3) {
            var rankImg = BaseBitmap.create("rank_" + orderid);
            rankImg.x = pos.x + (pos.width - rankImg.width) / 2 - 25;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            rankTxt.text = String(index + 1);
            rankTxt.x = pos.x + (pos.width - rankTxt.width) / 2 - 25;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        pos = data.pos[1];
        var serverTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        serverTxt.text = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid);
        serverTxt.x = pos.x + (pos.width - serverTxt.width) / 2 - 25;
        serverTxt.y = this.height / 2 - serverTxt.height / 2;
        ;
        this.addChild(serverTxt);
        pos = data.pos[2];
        var powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        powerTxt.text = App.StringUtil.changeIntToText(Number(data.zscore));
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
    AcConquerMainLandZRankItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcConquerMainLandZRankItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandZRankItem;
}(ScrollListItem));
__reflect(AcConquerMainLandZRankItem.prototype, "AcConquerMainLandZRankItem");
