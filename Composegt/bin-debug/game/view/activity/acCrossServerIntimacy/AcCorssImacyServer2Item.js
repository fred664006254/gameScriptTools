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
 * author:qianjun
 * desc:区服排行榜单item
*/
var AcCorssImacyServer2Item = (function (_super) {
    __extends(AcCorssImacyServer2Item, _super);
    function AcCorssImacyServer2Item() {
        return _super.call(this) || this;
    }
    AcCorssImacyServer2Item.prototype.initItem = function (index, data) {
        var type = data.type;
        this.width = type == 'enterIn' ? GameConfig.stageWidth : 520;
        this.height = type == 'enterIn' ? 40 : 52;
        var desc = (570 - this.width) / 2;
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = this.width / 2 - bg.width / 2;
            bg.y = this.height / 2 - bg.height / 2;
            this.addChild(bg);
        }
        var param = {
            enterIn: [143, 298, 431],
            rank: [65 - desc, 236 - desc, 407 - desc]
        };
        if (index < 3 && type != 'enterIn') {
            var rankImg = BaseBitmap.create("rank_" + String(index + 1));
            rankImg.x = param[type][0] + (44 - rankImg.width) / 2;
            ; //GameConfig.stageWidth/2 - 155 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            // let rankImg = BaseBitmap.create("rankinglist_rankbg")
            // rankImg.x = GameConfig.stageWidth/2 - 155 - rankImg.width/2;
            // rankImg.y = this.height/2 - rankImg.height/2;
            // this.addChild(rankImg);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rankTxt.text = String(index + 1);
            rankTxt.x = param[type][0] + (44 - rankTxt.textWidth) / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var zidname = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid);
        var serverTxt = ComponentManager.getTextField(zidname, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        serverTxt.x = param[type][1] + (44 - serverTxt.textWidth) / 2;
        ; //GameConfig.stageWidth/2 - serverTxt.textWidth/2;
        serverTxt.y = this.height / 2 - serverTxt.textHeight / 2;
        this.addChild(serverTxt);
        var scoreTxt = ComponentManager.getTextField(String(data.point), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        scoreTxt.x = param[type][2] + (88 - scoreTxt.textWidth) / 2; //GameConfig.stageWidth/2 + 155 - scoreTxt.textWidth/2;
        scoreTxt.y = this.height / 2 - scoreTxt.textHeight / 2;
        this.addChild(scoreTxt);
        if (Api.mergeServerVoApi.judgeIsSameServer(data.zid, Api.mergeServerVoApi.getTrueZid())) {
            serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        }
        else {
            serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_BROWN;
        }
        if (rankTxt) {
            rankTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        }
    };
    AcCorssImacyServer2Item.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCorssImacyServer2Item;
}(ScrollListItem));
__reflect(AcCorssImacyServer2Item.prototype, "AcCorssImacyServer2Item");
