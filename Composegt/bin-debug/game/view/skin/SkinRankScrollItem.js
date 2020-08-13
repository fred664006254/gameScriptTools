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
 * 皮肤
 * author yanyuling
 * date 2018/08/13
 * @class SkinRankScrollItem
 */
var SkinRankScrollItem = (function (_super) {
    __extends(SkinRankScrollItem, _super);
    function SkinRankScrollItem() {
        return _super.call(this) || this;
    }
    SkinRankScrollItem.prototype.initItem = function (index, data) {
        this.height = 52;
        // this.width = GameConfig.stageWidth;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_GREEN;
        }
        var startY = 16;
        if (index > 2) {
            // let dinner_rankbg = BaseBitmap.create("dinner_rankbg");
            // dinner_rankbg.x = 80-dinner_rankbg.width/2;
            // dinner_rankbg.y = 5 ;
            // this.addChild(dinner_rankbg);
            var titleTxt1 = ComponentManager.getTextField("", 20, tarColor);
            titleTxt1.text = String(index + 1);
            titleTxt1.x = 50 - titleTxt1.width / 2;
            titleTxt1.y = this.height / 2 - titleTxt1.height / 2;
            this.addChild(titleTxt1);
        }
        else {
            var rankImg = BaseLoadBitmap.create("rank_" + String(index + 1));
            rankImg.width = 51;
            rankImg.height = 47;
            rankImg.x = 50 - rankImg.width / 2;
            rankImg.y = 3;
            this.addChild(rankImg);
        }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        titleTxt2.text = data.name;
        titleTxt2.x = 185 - titleTxt2.width / 2;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, tarColor);
        // if(data.qu){
        //     titleTxt3.text = LanguageManager.getlocal("mergeServer",[data.qu,""+data.zid]) ;
        // }else{
        //     titleTxt3.text = LanguageManager.getlocal("ranserver2",[""+data.zid]) ;
        // }
        titleTxt3.text = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        titleTxt3.x = 325 - titleTxt3.width / 2;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
        var titleTxt4 = ComponentManager.getTextField("", titleTxt2.size, tarColor);
        var v4 = data.attr;
        if (data.intimacy) {
            v4 = data.intimacy;
        }
        if (v4 > 0) {
            titleTxt4.text = App.StringUtil.changeIntToText(v4);
        }
        else {
            titleTxt4.text = "" + v4;
        }
        titleTxt4.x = 435 - titleTxt4.width / 2;
        titleTxt4.y = startY;
        this._nodeContainer.addChild(titleTxt4);
        var lineImg = BaseLoadBitmap.create("rank_line");
        lineImg.width = 500;
        lineImg.height = 2;
        lineImg.x = 0;
        lineImg.y = 50;
        this._nodeContainer.addChild(lineImg);
    };
    SkinRankScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    SkinRankScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    SkinRankScrollItem.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return SkinRankScrollItem;
}(ScrollListItem));
__reflect(SkinRankScrollItem.prototype, "SkinRankScrollItem");
