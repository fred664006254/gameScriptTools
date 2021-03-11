/**
 * 排行奖励item
 * author ycg
 * date 2020.3.24
 */
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
var AcChaoTingRankScrollItem = (function (_super) {
    __extends(AcChaoTingRankScrollItem, _super);
    function AcChaoTingRankScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AcChaoTingRankScrollItem.prototype.initItem = function (index, data, itemParam) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this._data = data;
        this.width = 520;
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid) {
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        var offHeight = 0;
        if (index > 2) {
            var rankbg = BaseBitmap.create("rankbgs_4");
            rankbg.width = 516;
            rankbg.height = 62;
            rankbg.x = this.width / 2 - rankbg.width / 2;
            rankbg.y = 0;
            this.addChild(rankbg);
            offHeight = rankbg.height;
            var rank = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            rank.x = 68 - rank.width / 2;
            rank.y = offHeight / 2 - rank.height / 2;
            this.addChild(rank);
        }
        else {
            var rankbg = BaseBitmap.create("rankbgs_" + String(index + 1));
            rankbg.width = 516;
            rankbg.height = 76;
            rankbg.x = this.width / 2 - rankbg.width / 2;
            rankbg.y = 0;
            this.addChild(rankbg);
            offHeight = rankbg.height;
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1));
            rankImg.x = 30;
            rankImg.y = 17;
            this.addChild(rankImg);
        }
        var name = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        name.x = 252 - name.width / 2;
        name.y = offHeight / 2 - name.height / 2;
        this.addChild(name);
        var score = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        if (data.value > 0) {
            score.text = App.StringUtil.changeIntToText(data.value, 1);
        }
        else {
            score.text = "" + data.value;
        }
        score.x = 430 - score.width / 2;
        score.y = offHeight / 2 - score.height / 2;
        this.addChild(score);
        var lineImg = BaseBitmap.create("rank_line");
        lineImg.width = 520;
        lineImg.height = 2;
        lineImg.x = this.width / 2 - lineImg.width / 2;
        lineImg.y = offHeight - 1;
        this.addChild(lineImg);
        // this.addTouchTap(()=>{
        //     NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {ruid:data.uid,rzid:Api.mergeServerVoApi.getTrueZid(data.uid)});
        // },this);
    };
    AcChaoTingRankScrollItem.prototype.userShotCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var data = event.data.data.data;
        if (String(data.ruid) == this._data.uid) {
            if (event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT) {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid();
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
    };
    AcChaoTingRankScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcChaoTingRankScrollItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcChaoTingRankScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcChaoTingRankScrollItem;
}(ScrollListItem));
__reflect(AcChaoTingRankScrollItem.prototype, "AcChaoTingRankScrollItem");
//# sourceMappingURL=AcChaoTingRankScrollItem.js.map