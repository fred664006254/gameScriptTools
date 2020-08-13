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
var DinnerMsgPopupScollItem = (function (_super) {
    __extends(DinnerMsgPopupScollItem, _super);
    function DinnerMsgPopupScollItem() {
        return _super.call(this) || this;
    }
    DinnerMsgPopupScollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_HISTORYDETAILS), this.clickCallback, this);
        this.width = 502;
        this.height = 124;
        this._data = data;
        var rankImg = BaseBitmap.create("dinner_rankbg");
        rankImg.x = 37 - rankImg.width / 2;
        rankImg.y = 20;
        this.addChild(rankImg);
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        rankTxt.text = String(index + 1);
        rankTxt.x = rankImg.x + rankImg.width / 2 - rankTxt.width / 2;
        rankTxt.y = rankImg.y + rankImg.height / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        var type = LanguageManager.getlocal("dinnerTitle" + data.dtype);
        var descStr = LanguageManager.getlocal("dinnerMsgDesc", [type, data.num, data.enemy_num]);
        var descTxt = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
        descTxt.x = 70;
        descTxt.y = rankImg.y;
        descTxt.width = 435;
        this.addChild(descTxt);
        var timeStr = LanguageManager.getlocal("dinnerMsgTime", [App.DateUtil.getFormatBySecond(data.start_time, 2)]);
        var timeTxt = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        timeTxt.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
        timeTxt.x = descTxt.x;
        timeTxt.y = descTxt.y + descTxt.height + 13;
        this.addChild(timeTxt);
        var score1 = data.point;
        var score2 = data.score;
        if (score1 >= 0) {
            score1 = "+" + score1;
        }
        if (score2 >= 0) {
            score2 = "+" + score2;
        }
        var scoreStr = LanguageManager.getlocal("dinnerMsgInfo", [score1, score2]);
        var scoreTxt = ComponentManager.getTextField(scoreStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
        scoreTxt.x = descTxt.x;
        scoreTxt.width = 435;
        scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        scoreTxt.y = timeTxt.y + timeTxt.height + 13;
        this.addChild(scoreTxt);
        //描述文本过长换行，增加整体高度
        this.height += scoreTxt.height - 20;
        this.height += descTxt.height - 20;
        var lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = 520 / 2 - lineImg.width / 2;
        lineImg.y = this.height;
        this.addChild(lineImg);
        if (data.hasDetail) {
            // if (this.getDinnerDetailScore() == data.score)
            // {
            var btn = ComponentManager.getButton("dinner_detail", "", this.clickBtnHandler, this);
            btn.setPosition(this.width - btn.width - 16, this.height / 2 - btn.height / 2);
            this.addChild(btn);
            // }
        }
        rankImg.y += 20;
        rankTxt.y += 20;
    };
    DinnerMsgPopupScollItem.prototype.getDinnerDetailScore = function () {
        var s = 0;
        var dtype = this._data.dtype;
        var info = this._data.detail;
        var k = 0;
        for (var key in info) {
            var itemCfg = Config.DinnerCfg.getGoToFeastItemCfg(info[key].dtype);
            var point = itemCfg.getPoint;
            s += point;
            k++;
        }
        var totalSeat = Config.DinnerCfg.getFeastItemCfg(dtype).contain;
        var addScore = Config.DinnerCfg.getAddScore();
        for (; k < totalSeat; k++) {
            s += addScore;
        }
        return s;
    };
    DinnerMsgPopupScollItem.prototype.clickBtnHandler = function () {
        NetManager.request(NetRequestConst.REQUEST_DINNER_HISTORYDETAILS, { dinnerId: this._data.id });
    };
    DinnerMsgPopupScollItem.prototype.clickCallback = function (event) {
        if (event.data.ret) {
            if (event.data.data.data.dinnerDetails) {
                ViewController.getInstance().openView(ViewConst.POPUP.DINNERDETAILPOPUPVIEW, { dtype: this._data.dtype, info: event.data.data.data.dinnerDetails });
            }
            else {
            }
        }
    };
    DinnerMsgPopupScollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_HISTORYDETAILS), this.clickCallback, this);
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return DinnerMsgPopupScollItem;
}(ScrollListItem));
__reflect(DinnerMsgPopupScollItem.prototype, "DinnerMsgPopupScollItem");
//# sourceMappingURL=DinnerMsgPopupScollItem.js.map