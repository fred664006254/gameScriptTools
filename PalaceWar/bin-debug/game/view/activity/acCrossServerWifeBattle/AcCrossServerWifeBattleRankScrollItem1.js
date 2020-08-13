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
 * 榜
 * author dky
 * date 2017/11/23
 * @class AcCrossServerWifeBattleRankScrollItem1
 */
var AcCrossServerWifeBattleRankScrollItem1 = (function (_super) {
    __extends(AcCrossServerWifeBattleRankScrollItem1, _super);
    function AcCrossServerWifeBattleRankScrollItem1() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossServerWifeBattleRankScrollItem1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleRankScrollItem1.prototype.initItem = function (index, data, itemParam) {
        this.aid = itemParam.aid;
        this.code = itemParam.code;
        this.height = 40;
        this.width = 610;
        var rankbg;
        if (index < 3) {
            var bgpic = "";
            if (index == 0) {
                bgpic = "public_9_bg66";
            }
            else if (index == 1) {
                bgpic = "public_9_bg69";
            }
            else {
                bgpic = "public_9_bg68";
            }
            this.height = 88;
            rankbg = BaseBitmap.create(bgpic);
            rankbg.width = 610;
            rankbg.scaleY = 88 / rankbg.height;
            rankbg.x = 0;
            rankbg.y = 0;
            this.addChild(rankbg);
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1));
            rankImg.x = 68 - rankImg.width / 2;
            rankImg.y = 44 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            this.height = 70;
            rankbg = BaseBitmap.create("public_9_bg70");
            rankbg.width = 610;
            rankbg.scaleY = 70 / rankbg.height;
            rankbg.x = 0;
            rankbg.y = 0;
            this.addChild(rankbg);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            rankTxt.text = String(index + 1);
            rankTxt.x = 68 - rankTxt.width / 2;
            rankTxt.y = 25;
            this.addChild(rankTxt);
        }
        var server = "";
        if (this.vo.getQuByZid(data.zid) > 0) {
            // server = LanguageManager.getlocal("mergeServer",[String(data[1]),String(data[0])]);
            server = LanguageManager.getlocal("mergeServerOnlyqu", [String(this.vo.getQuByZid(data.zid))]);
        }
        else {
            // "ranserver2":"{1}服",
            server = LanguageManager.getlocal("ranserver2", [String(data.zid)]);
        }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt2.text = server;
        titleTxt2.x = 290 - titleTxt2.width / 2 - 30;
        titleTxt2.y = rankbg.y + (rankbg.height * rankbg.scaleY - titleTxt2.textHeight) / 2;
        this.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, TextFieldConst.COLOR_BROWN);
        titleTxt3.text = String(data.point);
        titleTxt3.x = 480 - titleTxt3.width / 2 - 20;
        titleTxt3.y = titleTxt2.y;
        this.addChild(titleTxt3);
        // Api.mergeServerVoApi.getTrueZid()
        var zid = Api.mergeServerVoApi.getTrueZid();
        var qu = Api.mergeServerVoApi.getQuByZid(zid);
        if (data.zid == zid) {
            titleTxt2.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
            titleTxt3.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
        }
        // if(data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()){
        //     titleTxt2.textColor = TextFieldConst.COLOR_WARN_GREEN;
        //     titleTxt3.textColor = TextFieldConst.COLOR_WARN_GREEN;
        //  }
    };
    AcCrossServerWifeBattleRankScrollItem1.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcCrossServerWifeBattleRankScrollItem1.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerWifeBattleRankScrollItem1.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleRankScrollItem1;
}(ScrollListItem));
__reflect(AcCrossServerWifeBattleRankScrollItem1.prototype, "AcCrossServerWifeBattleRankScrollItem1");
//# sourceMappingURL=AcCrossServerWifeBattleRankScrollItem1.js.map