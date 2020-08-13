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
 *帮会任务奖励
 * author yanyuling
 * date 2018/07/23
 * @class AllianceTaskRankScrollItem
 */
var AllianceTaskRankScrollItem = (function (_super) {
    __extends(AllianceTaskRankScrollItem, _super);
    function AllianceTaskRankScrollItem() {
        return _super.call(this) || this;
    }
    AllianceTaskRankScrollItem.prototype.initItem = function (index, data) {
        this.height = 52;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 520;
            bg.height = 40;
            bg.x = 0;
            bg.y = this.height / 2 - bg.height / 2;
            this._nodeContainer.addChild(bg);
        }
        if (data.uid) {
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                tarColor = TextFieldConst.COLOR_WARN_GREEN;
            }
        }
        else {
            if (data.id == Api.playerVoApi.getPlayerAllianceId()) {
                tarColor = TextFieldConst.COLOR_WARN_GREEN;
            }
        }
        var startY = 16;
        if (index > 2) {
            var titleTxt1 = ComponentManager.getTextField("", 20, tarColor);
            titleTxt1.text = String(index + 1);
            titleTxt1.x = 75 - titleTxt1.width / 2;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
        }
        else {
            var rankImg = BaseLoadBitmap.create("rank_" + String(index + 1));
            rankImg.width = 51;
            rankImg.height = 47;
            rankImg.x = 70 - rankImg.width / 2;
            rankImg.y = 3;
            this.addChild(rankImg);
        }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        titleTxt2.text = data.name;
        titleTxt2.x = 250 - titleTxt2.width / 2;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, tarColor);
        titleTxt3.text = App.StringUtil.changeIntToText(data.v);
        titleTxt3.x = 435 - titleTxt3.width / 2;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
        // let lineImg = BaseLoadBitmap.create("rank_line");
        // lineImg.width = 500;
        // lineImg.height = 2;
        // lineImg.x = 30;
        // lineImg.y = 50;
        // this._nodeContainer.addChild(lineImg);
    };
    AllianceTaskRankScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AllianceTaskRankScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AllianceTaskRankScrollItem.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskRankScrollItem;
}(ScrollListItem));
__reflect(AllianceTaskRankScrollItem.prototype, "AllianceTaskRankScrollItem");
