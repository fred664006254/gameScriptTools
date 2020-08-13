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
var AcConquerMainLandRankItem = (function (_super) {
    __extends(AcConquerMainLandRankItem, _super);
    function AcConquerMainLandRankItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AcConquerMainLandRankItem.prototype.initItem = function (index, data) {
        var view = this;
        view._data = data;
        view.width = 580;
        view.height = 55;
        var tarColor = TextFieldConst.COLOR_BROWN_NEW;
        if (Api.mergeServerVoApi.judgeIsSameServer(data.zid, Api.mergeServerVoApi.getTrueZid())) {
            tarColor = TextFieldConst.COLOR_QUALITY_GREEN_NEW;
        }
        var pos = data.pos[0];
        var orderid = index + 1;
        if (index < 3) {
            var rankImg = BaseBitmap.create("rank_" + orderid);
            rankImg.x = pos.x + (pos.width - rankImg.width) / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankTxt = ComponentManager.getTextField("", 22, tarColor);
            rankTxt.text = String(index + 1);
            rankTxt.x = pos.x + (pos.width - rankTxt.textWidth) / 2;
            rankTxt.y = view.height / 2 - rankTxt.textHeight / 2;
            view.addChild(rankTxt);
        }
        pos = data.pos[1];
        var zidname = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid);
        var serverTxt = ComponentManager.getTextField(zidname, 22, tarColor);
        serverTxt.x = pos.x + (pos.width - serverTxt.textWidth) / 2;
        serverTxt.y = view.height / 2 - serverTxt.textHeight / 2;
        view.addChild(serverTxt);
        pos = data.pos[2];
        var scoreTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText(data.zscore), 22, tarColor);
        scoreTxt.x = pos.x + (pos.width - scoreTxt.textWidth) / 2;
        scoreTxt.y = view.height / 2 - scoreTxt.textHeight / 2;
        view.addChild(scoreTxt);
        var line = BaseBitmap.create("public_line4");
        this.addChild(line);
        line.width = this.width - 10;
        line.x = 33;
        line.y = this.height - line.height;
    };
    AcConquerMainLandRankItem.prototype.dispose = function () {
        var view = this;
        view.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandRankItem;
}(ScrollListItem));
__reflect(AcConquerMainLandRankItem.prototype, "AcConquerMainLandRankItem");
