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
var AtkracecrossFengyunServerItem = /** @class */ (function (_super) {
    __extends(AtkracecrossFengyunServerItem, _super);
    function AtkracecrossFengyunServerItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AtkracecrossFengyunServerItem.prototype.initItem = function (index, data) {
        this.width = 520;
        ;
        this.height = 75;
        this._data = data;
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.id) {
            if (data.id == Api.playerVoApi.getPlayerAllianceId()) {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        var rankTxt = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        var namestr = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid);
        var nameTxt = ComponentManager.getTextField(namestr, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        var scoreTxt = ComponentManager.getTextField(String(data.point), TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        if (data.type && data.type == 'rank') {
            this.width = 520;
            var desc = (570 - this.width) / 2;
            var param = [65 - desc, 236 - desc, 407 - desc];
            if (index < 3) {
                var rankbg = BaseBitmap.create("rankbgs_" + String(index + 1));
                rankbg.width = 520;
                rankbg.height = 75;
                this.addChild(rankbg);
                var rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1));
                rankImg.x = param[0] + (44 - rankImg.width) / 2;
                ; //GameConfig.stageWidth/2 - 155 - rankImg.width / 2;
                rankImg.y = this.height / 2 - rankImg.height / 2;
                this.addChild(rankImg);
                rankTxt.visible = false;
            }
            else {
                var rankbg = BaseBitmap.create("rankbgs_4");
                rankbg.width = 520;
                rankbg.height = 75;
                this.addChild(rankbg);
                rankTxt.x = param[0] + (44 - rankTxt.textWidth) / 2;
                rankTxt.y = this.height / 2 - rankTxt.height / 2;
            }
            nameTxt.x = param[1] + (44 - nameTxt.textWidth) / 2;
            ; //GameConfig.stageWidth/2 - serverTxt.textWidth/2;
            nameTxt.y = this.height / 2 - nameTxt.textHeight / 2;
            scoreTxt.x = param[2] + (88 - scoreTxt.textWidth) / 2; //GameConfig.stageWidth/2 + 155 - scoreTxt.textWidth/2;
            scoreTxt.y = this.height / 2 - scoreTxt.textHeight / 2;
        }
        else {
            rankTxt.setPosition(GameConfig.stageWidth / 2 - 155 - rankTxt.width / 2, this.height / 2 - rankTxt.height / 2);
            nameTxt.x = GameConfig.stageWidth / 2 - nameTxt.width / 2;
            nameTxt.y = rankTxt.y;
            scoreTxt.x = GameConfig.stageWidth / 2 + 155 - scoreTxt.width / 2;
            scoreTxt.y = rankTxt.y;
        }
        this.addChild(rankTxt);
        this.addChild(nameTxt);
        this.addChild(scoreTxt);
        // if(Api.mergeServerVoApi.judgeIsSameServer(data.zid, Api.mergeServerVoApi.getTrueZid())){
        // 	nameTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN; 
        //     if(rankTxt){
        //         rankTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        //     }
        // }
        this.addTouchTap(this.rankClick, this);
    };
    AtkracecrossFengyunServerItem.prototype.rankClick = function () {
        var view = this;
        if (this._data.type == 'rank') {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSRANKLISTVIEW, {
                zid: this._data.zid,
                acid: this._data.acid
            });
        }
    };
    AtkracecrossFengyunServerItem.prototype.dispose = function () {
        this.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return AtkracecrossFengyunServerItem;
}(ScrollListItem));
//# sourceMappingURL=AtkracecrossFengyunServerItem.js.map