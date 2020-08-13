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
var AcLaborRankScrollItem = (function (_super) {
    __extends(AcLaborRankScrollItem, _super);
    function AcLaborRankScrollItem() {
        return _super.call(this) || this;
    }
    AcLaborRankScrollItem.prototype.initItem = function (index, data) {
        this.width = 526;
        this.height = 76; //rankbg_1
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        var orderid = index + 1;
        if (index < 3) {
            var rankbg = BaseBitmap.create("rankbg_" + String(index + 1));
            rankbg.width = this.width;
            rankbg.height = this.height;
            rankbg.x = 0;
            rankbg.y = this.height / 2 - rankbg.height / 2;
            this.addChild(rankbg);
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1));
            rankImg.x = 63 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            rankTxt.text = String(index + 1);
            rankTxt.x = 60 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.text = data.name;
        nameTxt.x = 225 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        var powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        powerTxt.text = App.StringUtil.changeIntToText(Number(data.value));
        powerTxt.x = 420 - powerTxt.width / 2;
        powerTxt.y = nameTxt.y;
        this.addChild(powerTxt);
        // if ( this._uiData.vip != "0")
        // {
        //     let vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._uiData.vip).icon);
        //     vipFlag.setScale(0.65);
        //     vipFlag.x =   nameTxt.x + nameTxt.width  ;
        //     vipFlag.y = nameTxt.y ;
        //     this.addChild(vipFlag);
        // }
        var lineImg = BaseBitmap.create("rank_line");
        lineImg.width = this.width;
        lineImg.x = 0;
        lineImg.y = this.height - lineImg.height;
        this.addChild(lineImg);
    };
    AcLaborRankScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcLaborRankScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcLaborRankScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLaborRankScrollItem;
}(ScrollListItem));
__reflect(AcLaborRankScrollItem.prototype, "AcLaborRankScrollItem");
//# sourceMappingURL=AcLaborRankScrollItem.js.map