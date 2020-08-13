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
 * 排行奖励item
 * author ycg
 * date 2020.3.24
 */
var AcChaoTingViewTabScrollItem1 = (function (_super) {
    __extends(AcChaoTingViewTabScrollItem1, _super);
    function AcChaoTingViewTabScrollItem1() {
        var _this = _super.call(this) || this;
        _this._code = null;
        _this._aid = null;
        return _this;
    }
    AcChaoTingViewTabScrollItem1.prototype.initItem = function (index, data, param) {
        var aid = param.aid;
        var code = param.code;
        this._aid = aid;
        this._code = code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        this.width = 640;
        var bgImg = ResourceManager.hasRes("acchaoting_itembg-" + this.getTypeCode()) ? "acchaoting_itembg-" + this.getTypeCode() : "acchaoting_itembg-1";
        var bg = BaseBitmap.create(bgImg);
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var offHeight = 0;
        if (index < 3) {
            var titleBgImg = ResourceManager.hasRes("acchaoting_ranktitle" + (index + 1) + "-" + this.getTypeCode()) ? "acchaoting_ranktitle" + (index + 1) + "-" + this.getTypeCode() : "acchaoting_ranktitle" + (index + 1) + "-1";
            var titleBg = BaseBitmap.create(titleBgImg);
            titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, 0);
            bg.y = titleBg.y + titleBg.height - 34;
            this.addChild(titleBg);
            offHeight = titleBg.height - 34;
            var titleTf = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankRewardRank" + (index + 1)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleTf.setPosition(titleBg.x + titleBg.width / 2 - titleTf.width / 2, titleBg.y + 47);
            this.addChild(titleTf);
        }
        else {
            var titleTf = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankRewardRank4", ["" + data.rank[0], "" + data.rank[1]]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleTf.setPosition(bg.x + bg.width / 2 - titleTf.width / 2, bg.y + 6);
            this.addChild(titleTf);
        }
        var rewardVoList = GameData.formatRewardItem(data.getReward);
        var scale = 0.95;
        var itemHeight = 108;
        var itemWidth = 108;
        var spaceX = 14;
        var spaceY = 12;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(scale);
            rewardDB.setPosition(bg.x + 21 + ((rewardDB.width * scale + spaceX) * (i % 5)), bg.y + 45 + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
            this.addChild(rewardDB);
        }
        var bgHeight = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.ceil(rewardVoList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 45 + 20;
        if (bgHeight > bg.height) {
            bg.height = bgHeight;
        }
        this.height = bg.height + offHeight + this.getSpaceY();
    };
    AcChaoTingViewTabScrollItem1.prototype.getTypeCode = function () {
        return this._code;
    };
    AcChaoTingViewTabScrollItem1.prototype.getSpaceY = function () {
        return 5;
    };
    AcChaoTingViewTabScrollItem1.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcChaoTingViewTabScrollItem1;
}(ScrollListItem));
__reflect(AcChaoTingViewTabScrollItem1.prototype, "AcChaoTingViewTabScrollItem1");
//# sourceMappingURL=AcChaoTingViewTabScrollItem1.js.map