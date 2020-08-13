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
 * @class AcAnswerRankRewardScrollItem
 */
var AcAnswerRankRewardScrollItem = (function (_super) {
    __extends(AcAnswerRankRewardScrollItem, _super);
    function AcAnswerRankRewardScrollItem() {
        return _super.call(this) || this;
    }
    AcAnswerRankRewardScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._cfgData = data;
        this._itemIndex = index;
        var rankInfo = itemParam.rankInfo;
        var config = itemParam.cfg;
        this.width = GameConfig.stageWidth - 30;
        var rank = data.rank;
        var view = this;
        var scroStartY = 8;
        var winBottomBg = BaseBitmap.create("rechargevie_db_01");
        winBottomBg.width = GameConfig.stageWidth - 30;
        winBottomBg.x = 6;
        this.addChild(winBottomBg);
        this.rewardContainer = new BaseDisplayObjectContainer();
        this.addChild(this.rewardContainer);
        this.rewardContainer.width = winBottomBg.width;
        var winbg = null;
        if (index == 0) {
            var titleBg = BaseBitmap.create("public_up3");
            titleBg.width = winBottomBg.width;
            titleBg.height = 160;
            titleBg.x = winBottomBg.x + winBottomBg.width / 2 - titleBg.width / 2;
            titleBg.y = 12;
            this.rewardContainer.addChild(titleBg);
            winbg = BaseBitmap.create("accrossserverwipeboss_first");
            winbg.width = winBottomBg.width + 10;
            winbg.y = -6;
            winbg.x = winBottomBg.x + winBottomBg.width / 2 - winbg.width / 2;
            this.rewardContainer.addChild(winbg);
            var firstData = rankInfo[0];
            if (firstData) {
                var playerContainer = new BaseDisplayObjectContainer;
                this.rewardContainer.addChild(playerContainer);
                var playerHead = Api.playerVoApi.getPlayerCircleHead(firstData.pic, config.titleId);
                playerContainer.addChild(playerHead);
                var playerName = ComponentManager.getTextField(firstData.name, 24, TextFieldConst.COLOR_BROWN);
                playerName.x = playerHead.x + playerHead.width + 50;
                playerName.y = playerHead.y + 25;
                playerContainer.addChild(playerName);
                var playerScore = ComponentManager.getTextField(LanguageManager.getlocal("acAnswerScore", [String(firstData.value)]), 24, TextFieldConst.COLOR_BROWN);
                playerScore.x = playerName.x;
                playerScore.y = playerName.y + playerName.height + 25;
                playerContainer.addChild(playerScore);
                var vipImg = BaseLoadBitmap.create("vip_icon_" + firstData.vip);
                vipImg.width = 65;
                vipImg.height = 27;
                vipImg.x = playerName.x + playerName.width + 10;
                vipImg.y = playerName.y + playerName.height / 2 - vipImg.height / 2;
                playerContainer.addChild(vipImg);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playerContainer, titleBg, [0, 20]);
            }
            else {
                var noData = ComponentManager.getTextField(LanguageManager.getlocal("acPunishNoData"), 30, TextFieldConst.COLOR_BROWN);
                noData.x = GameConfig.stageWidth / 2 - noData.width / 2;
                noData.y = winbg.y + 100;
                this.rewardContainer.addChild(noData);
            }
        }
        else {
            winBottomBg.height = 250;
            this.rewardContainer.height = winBottomBg.height;
            winbg = BaseBitmap.create("public_ts_bg01");
            winbg.width = 250;
            winbg.y = scroStartY + 13;
            winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
            this.rewardContainer.addChild(winbg);
            var txt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
            if (rank[0] < rank[1]) {
                txt.text = txt.text = LanguageManager.getlocal("acRank_rank4", [String(rank[0]), String(rank[1])]);
            }
            else {
                txt.text = LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
            }
            txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
            txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
            this.rewardContainer.addChild(txt);
        }
        var rewardList = GameData.formatRewardItem(data.getReward);
        // let rewardList = GameData.formatRewardItem("6_1004_6|6_1302_5|6_1301_5|6_1303_5|6_1004_6|6_1302_5");
        var finalY = 0;
        var startY = index == 0 ? 200 : 80;
        if (rewardList) {
            var temX = 0;
            var temScale = 1;
            for (var i = 0; i < rewardList.length; i++) {
                var icon = GameData.getItemIcon(rewardList[i], true, true);
                // icon.x = 110 + 7*(i + 1) + icon.width*temScale*i;
                var num = i % 5;
                icon.x = 17 + 10 * (num + 1) + icon.width * temScale * num;
                // icon.y = this.height/2 - icon.height/2;
                icon.y = (icon.height + 5) * (Math.floor((i) / 5)) + startY;
                if (rewardList.length <= 5) {
                    icon.y = (icon.height + 5) * (Math.floor((i) / 5)) + startY + 10;
                }
                icon.scaleX = icon.scaleY = temScale;
                this.rewardContainer.addChild(icon);
                if (i == rewardList.length - 1) {
                    finalY = icon.y + icon.height;
                }
            }
        }
        winBottomBg.height = finalY + 50;
        this.rewardContainer.height = winBottomBg.height;
    };
    AcAnswerRankRewardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcAnswerRankRewardScrollItem.prototype.dispose = function () {
        // this._numTF = null;
        this._itemIndex = null;
        _super.prototype.dispose.call(this);
    };
    return AcAnswerRankRewardScrollItem;
}(ScrollListItem));
__reflect(AcAnswerRankRewardScrollItem.prototype, "AcAnswerRankRewardScrollItem");
