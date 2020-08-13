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
  * 花魁活动this--粉丝排行item
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteFanRankTab1ScrollItem
  */
var AcBeautyVoteFanRankTab1ScrollItem = (function (_super) {
    __extends(AcBeautyVoteFanRankTab1ScrollItem, _super);
    function AcBeautyVoteFanRankTab1ScrollItem() {
        return _super.call(this) || this;
    }
    AcBeautyVoteFanRankTab1ScrollItem.prototype.initItem = function (index, data) {
        this.width = 520;
        this.height = 62;
        // name: "马玉成"
        // title: ""
        // uid: 9000216
        // value: 83
        // zid: 9
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.zid == Api.mergeServerVoApi.getTrueZid()) {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        if (index < 3) {
            var rankbg = BaseBitmap.create("rankbg_" + String(index + 1));
            rankbg.width = this.width;
            rankbg.height = 62;
            this.addChild(rankbg);
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1));
            rankImg.x = 60 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankbg = BaseBitmap.create("rankbg_4");
            rankbg.width = this.width;
            rankbg.y = this.height / 2 - rankbg.height / 2;
            this.addChild(rankbg);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            rankTxt.text = String(index + 1);
            rankTxt.x = 60 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var zidTxt = ComponentManager.getTextField(Api.mergeServerVoApi.getSeverName(data.zid), TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        zidTxt.x = 220 - zidTxt.width / 2;
        zidTxt.y = this.height / 2 - zidTxt.height / 2;
        this.addChild(zidTxt);
        var scoreTxt = ComponentManager.getTextField(data.value, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        scoreTxt.x = 420 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - scoreTxt.height / 2;
        this.addChild(scoreTxt);
    };
    AcBeautyVoteFanRankTab1ScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcBeautyVoteFanRankTab1ScrollItem;
}(ScrollListItem));
__reflect(AcBeautyVoteFanRankTab1ScrollItem.prototype, "AcBeautyVoteFanRankTab1ScrollItem");
//# sourceMappingURL=AcBeautyVoteFanRankTab1ScrollItem.js.map