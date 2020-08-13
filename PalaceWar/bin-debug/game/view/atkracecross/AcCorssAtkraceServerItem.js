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
 * author:qianjun
 * desc:区服排行榜单item
*/
var AcCorssAtkraceServerItem = /** @class */ (function (_super) {
    __extends(AcCorssAtkraceServerItem, _super);
    function AcCorssAtkraceServerItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AcCorssAtkraceServerItem.prototype.initItem = function (index, data) {
        var type = data.type;
        var view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = type == 'enterIn' ? GameConfig.stageWidth : 520;
        this.height = type == 'enterIn' ? 40 : 52;
        var desc = (570 - this.width) / 2;
        var param = {
            enterIn: [143, 298, 431],
            rank: [65 - desc, 236 - desc, 407 - desc]
        };
        if (index < 3 && type != 'enterIn') {
            var rankImg = BaseBitmap.create("rankinglist_rank" + String(index + 1));
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
            if (rankTxt) {
                rankTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
            }
        }
        this.addTouchTap(this.rankClick, this);
    };
    AcCorssAtkraceServerItem.prototype.rankClick = function () {
        var view = this;
        if (view._data.type == 'rank') {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSRANKLISTVIEW, {
                zid: this._data.zid,
                acid: this._data.acid
            });
        }
        // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK, {
        // 	zid : this._data.zid,
        // });
        //
    };
    AcCorssAtkraceServerItem.prototype.dispose = function () {
        var view = this;
        view.removeTouchTap();
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcCorssAtkraceServerItem;
}(ScrollListItem));
//# sourceMappingURL=AcCorssAtkraceServerItem.js.map