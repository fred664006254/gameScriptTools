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
var AtkracecrossServer2Item = (function (_super) {
    __extends(AtkracecrossServer2Item, _super);
    function AtkracecrossServer2Item() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AtkracecrossServer2Item.prototype.initItem = function (index, data) {
        this.width = GameConfig.stageWidth;
        this.height = 40;
        this._data = data;
        var rankTxt = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        this.addChild(rankTxt);
        var namestr = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid);
        var nameTxt = ComponentManager.getTextField(namestr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        this.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField(String(data.point), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        this.addChild(scoreTxt);
        if (index > 0) {
            var line = BaseBitmap.create("public_line4");
            line.width = 500;
            line.x = this.width / 2 - line.width / 2;
            line.y = -line.height / 2;
            this.addChild(line);
        }
        if (data.type && data.type == 'rank') {
            this.width = GameConfig.stageWidth; //520;
            this.height = 52;
            var desc = (570 - this.width) / 2;
            var param = [65 - desc, 236 - desc, 407 - desc];
            if (index < 3) {
                var rankImg = BaseBitmap.create("rank_" + String(index + 1));
                rankImg.x = param[0] + (44 - rankImg.width) / 2;
                ; //GameConfig.stageWidth/2 - 155 - rankImg.width / 2;
                rankImg.y = this.height / 2 - rankImg.height / 2;
                this.addChild(rankImg);
                rankTxt.visible = false;
            }
            else {
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
        if (Api.mergeServerVoApi.judgeIsSameServer(data.zid, Api.mergeServerVoApi.getTrueZid())) {
            nameTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN_NEW;
            if (rankTxt) {
                rankTxt.textColor = TextFieldConst.COLOR_WARN_GREEN_NEW;
            }
        }
        // this.addTouchTap(this.rankClick, this);
    };
    // private rankClick():void{
    // 	let view = this;
    // 	if(this._data.type == 'rank'){
    // 		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSRANKLISTVIEW, {
    // 			zid : this._data.zid,
    // 			acid : this._data.acid
    // 		});
    // 	}
    // }
    AtkracecrossServer2Item.prototype.dispose = function () {
        this.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return AtkracecrossServer2Item;
}(ScrollListItem));
__reflect(AtkracecrossServer2Item.prototype, "AtkracecrossServer2Item");