var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 	区服排行item相关
 * author 张朝阳
 * date 2018/11/19
 * @class CountryWarRewardServerRankItem
 */
var CountryWarRewardServerRankItem = /** @class */ (function (_super) {
    __extends(CountryWarRewardServerRankItem, _super);
    function CountryWarRewardServerRankItem() {
        return _super.call(this) || this;
    }
    CountryWarRewardServerRankItem.prototype.initItem = function (index, data, itemParam) {
        this.width = 530;
        // this.height = 150;
        var offestX = 0;
        var offestY = 0;
        if (index <= 2) {
            var rankBM = BaseLoadBitmap.create("rank_" + String(index + 1));
            rankBM.width = 42;
            rankBM.height = 41;
            rankBM.x = this.x + 75 - rankBM.width / 2;
            this.addChild(rankBM);
            offestX = rankBM.width / 2;
            offestY = rankBM.height / 2;
        }
        else {
            var rankBg = BaseBitmap.create("rankinglist_rankbg");
            rankBg.x = this.x + 75 - rankBg.width / 2;
            this.addChild(rankBg);
            var rankTF = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            rankTF.setPosition(rankBg.x + rankBg.width / 2 - rankTF.width / 2, rankBg.y + rankBg.height / 2 - rankTF.height / 2);
            this.addChild(rankTF);
            offestX = rankBg.width / 2;
            offestY = rankBg.height / 2;
            if (Api.mergeServerVoApi.getFuByZid() == Number(data.zid)) {
                rankTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            }
        }
        //区服
        var rankServer = ComponentManager.getTextField(Api.mergeServerVoApi.getSeverName(Number(data.zid)), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        rankServer.setPosition(this.x + 260 - rankServer.width / 2, offestY - rankServer.height / 2);
        this.addChild(rankServer);
        //分数
        var scoreTxt = ComponentManager.getTextField(data.score, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        scoreTxt.setPosition(this.x + 430 - scoreTxt.width / 2, rankServer.y + rankServer.height / 2 - scoreTxt.height / 2);
        this.addChild(scoreTxt);
        //文本线
        var lineSp = BaseBitmap.create("public_line1");
        lineSp.setPosition(this.x + this.width / 2 - lineSp.width / 2, scoreTxt.y + scoreTxt.height + 15);
        this.addChild(lineSp);
        if (Api.mergeServerVoApi.getFuByZid() == Number(data.zid)) {
            rankServer.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            scoreTxt.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        }
    };
    CountryWarRewardServerRankItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return CountryWarRewardServerRankItem;
}(ScrollListItem));
//# sourceMappingURL=CountryWarRewardServerRankItem.js.map