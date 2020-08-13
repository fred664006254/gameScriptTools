/**
 * 离线消息弹版
 * author shaoliang
 * date 2017/11/2
 * @class DinnerMessagePopupView
 */
//				ViewController.getInstance().openView(ViewConst.POPUP.DINNERMESSAGEPOPUPVIEW,{info:[{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952}]});
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
var DinnerMessagePopupView = (function (_super) {
    __extends(DinnerMessagePopupView, _super);
    function DinnerMessagePopupView() {
        return _super.call(this) || this;
    }
    DinnerMessagePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["rank_biao"]);
    };
    DinnerMessagePopupView.prototype.initView = function () {
        var myInfo = this.param.data.info;
        var totalGuset = 0;
        var bagGust = 0;
        var totalScore = 0;
        for (var k in myInfo) {
            var info = myInfo[k];
            var dinnerCfg = Config.DinnerCfg.getGoToFeastItemCfg(info.dtype);
            if (dinnerCfg.getPoint < 0) {
                bagGust += 1;
            }
            totalScore += dinnerCfg.getPoint;
            totalGuset += 1;
        }
        var titleStr = "";
        if (totalScore >= 0) {
            titleStr = LanguageManager.getlocal("dinnerMessage1", [totalGuset.toString(), bagGust.toString(), totalScore.toString()]);
        }
        else {
            titleStr = LanguageManager.getlocal("dinnerMessage2", [totalGuset.toString(), bagGust.toString(), totalScore.toString()]);
        }
        var typeBg = BaseBitmap.create("public_tc_bg01");
        typeBg.width = 538;
        typeBg.height = 426;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 12);
        this.addChildToContainer(typeBg);
        var titleText = ComponentManager.getTextField(titleStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText.width = this.viewBg.width - 104;
        titleText.lineSpacing = 6;
        titleText.setPosition(52, 14 + typeBg.y);
        this.addChildToContainer(titleText);
        var rankBg = BaseBitmap.create("public_tc_bg03");
        rankBg.width = typeBg.width - 20;
        rankBg.height = 340;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, typeBg.y + 75);
        this.addChildToContainer(rankBg);
        var titleBg = BaseBitmap.create("rank_biao");
        // titleBg.width = rankBg.width - 130;
        // titleBg.height = 36;
        titleBg.x = this.viewBg.width / 2 - titleBg.width / 2;
        titleBg.y = rankBg.y + 10;
        // titleBg.setPosition(rankBg.x , rankBg.y + 10);
        this.addChildToContainer(titleBg);
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("dinnerPlayerName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(135, titleBg.y + titleBg.height / 2 - nameText.height / 2);
        this.addChildToContainer(nameText);
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("playerScore"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(385, nameText.y);
        this.addChildToContainer(scoreText);
        var scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width, rankBg.height - titleBg.height - 15);
        this._scrollList = ComponentManager.getScrollList(DinnerMessageItem, myInfo, scroRect);
        this._scrollList.x = titleBg.x;
        this._scrollList.y = titleBg.y + titleBg.height;
        this.addChildToContainer(this._scrollList);
    };
    DinnerMessagePopupView.prototype.dispose = function () {
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return DinnerMessagePopupView;
}(PopupView));
__reflect(DinnerMessagePopupView.prototype, "DinnerMessagePopupView");
