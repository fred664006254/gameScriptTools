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
 * desc:个人排行榜单item
*/
var AcCorssImacyPRank2Item = (function (_super) {
    __extends(AcCorssImacyPRank2Item, _super);
    function AcCorssImacyPRank2Item() {
        return _super.call(this) || this;
    }
    AcCorssImacyPRank2Item.prototype.initItem = function (index, data) {
        var type = data.type;
        this.width = type == 'enterIn' ? 502 : 520;
        this.height = type == 'enterIn' ? 40 : 52;
        var desc = (570 - this.width) / 2;
        var param = {
            enterIn: [40, 184, 372, 516],
            rank: [65 - desc, 160 - desc, 300 - desc, 407 - desc]
        };
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = this.width / 2 - bg.width / 2;
            bg.y = this.height / 2 - bg.height / 2;
            this.addChild(bg);
        }
        if (index < 3 && type != 'enterIn') {
            var rankImg = BaseBitmap.create("rank_" + String(index + 1));
            rankImg.x = param[type][0] + (44 - rankImg.width) / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            // let rankImg = BaseBitmap.create("rankinglist_rankbg")
            // rankImg.x = param[type][0] + (44 - rankImg.width)/2;
            // rankImg.y = this.height/2 - rankImg.height/2;
            // this.addChild(rankImg);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            rankTxt.text = String(index + 1);
            rankTxt.x = param[type][0] + (44 - rankTxt.textWidth) / 2;
            ; //62 - rankTxt.textWidth/2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTxt.x = param[type][1] + (88 - nameTxt.textWidth) / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        var sidname = '';
        if (data.uid) {
            sidname = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        }
        else {
            sidname = LanguageManager.getlocal("ranserver2", [data.zid.toString()]);
        }
        var serverTxt = ComponentManager.getTextField(sidname, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        serverTxt.x = param[type][2] + (44 - serverTxt.textWidth) / 2;
        serverTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(serverTxt);
        var scoreTxt = ComponentManager.getTextField(data.point, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        scoreTxt.x = param[type][3] + (88 - scoreTxt.textWidth) / 2;
        scoreTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(scoreTxt);
        if (Api.playerVoApi.getPlayerID() == data.uid) {
            nameTxt.textColor = serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
            if (rankTxt) {
                rankTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
            }
        }
        if (Api.playerVoApi.getPlayerID() != data.uid && Api.mergeServerVoApi.judgeIsSameServer(data.zid, Api.mergeServerVoApi.getTrueZid())) {
            nameTxt.textColor = serverTxt.textColor = scoreTxt.textColor = 0x617b9c;
            if (rankTxt) {
                rankTxt.textColor = 0x617b9c;
            }
        }
    };
    AcCorssImacyPRank2Item.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCorssImacyPRank2Item;
}(ScrollListItem));
__reflect(AcCorssImacyPRank2Item.prototype, "AcCorssImacyPRank2Item");