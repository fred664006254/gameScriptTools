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
  * 花魁活动this--排行item
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteViewTab4ScrollItem
  */
var AcBeautyVoteViewTab4ScrollItem = (function (_super) {
    __extends(AcBeautyVoteViewTab4ScrollItem, _super);
    function AcBeautyVoteViewTab4ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AcBeautyVoteViewTab4ScrollItem.prototype.initItem = function (index, data, itemParam) {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_RANKG_USERSHOT, this.userShotCallback, this);
        this.width = 610;
        this.height = 62;
        // name: "马玉成"
        // title: ""
        // uid: 9000216
        // value: 83
        // zid: 9
        this._data = data;
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        var idx = itemParam.idx + index;
        if (idx < 3) {
            var rankbg = BaseBitmap.create("rankbg_" + String(idx + 1));
            rankbg.width = this.width;
            rankbg.height = 62;
            this.addChild(rankbg);
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(idx + 1));
            rankImg.x = 58 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankbg = BaseBitmap.create("rankbg_4");
            rankbg.width = this.width;
            rankbg.y = this.height / 2 - rankbg.height / 2;
            this.addChild(rankbg);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            rankTxt.text = String(idx + 1);
            rankTxt.x = 58 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.x = 186 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        var zidTxt = ComponentManager.getTextField(Api.mergeServerVoApi.getAfterMergeSeverName(data.uid), TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        zidTxt.x = 368 - zidTxt.width / 2;
        zidTxt.y = this.height / 2 - zidTxt.height / 2;
        this.addChild(zidTxt);
        var scoreTxt = ComponentManager.getTextField(data.value, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        scoreTxt.x = 525 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - scoreTxt.height / 2;
        this.addChild(scoreTxt);
        var maskImg = BaseBitmap.create("rank_select_mask");
        maskImg.x = GameConfig.stageWidth / 2 - maskImg.width / 2;
        maskImg.y = 0;
        maskImg.visible = false;
        maskImg.height = 62;
        this.addChild(maskImg);
        this.addTouch(function (event) {
            var rzid = Api.mergeServerVoApi.getTrueZid(data.uid);
            switch (event.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    maskImg.visible = true;
                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                    maskImg.visible = false;
                    break;
                case egret.TouchEvent.TOUCH_END:
                    maskImg.visible = false;
                    NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, { ruid: data.uid, rzid: rzid });
                    break;
            }
        }, this, null, true);
    };
    AcBeautyVoteViewTab4ScrollItem.prototype.userShotCallback = function (event) {
        if (event.data.ret) {
            var data = event.data.data.data;
            if (String(data.ruid) == this._data.uid) {
                var zid = Api.mergeServerVoApi.getTrueZid(data.ruid);
                data["crossZone"] = 1;
                data['zid'] = zid;
                ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
            }
        }
    };
    AcBeautyVoteViewTab4ScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_RANKG_USERSHOT, this.userShotCallback, this);
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcBeautyVoteViewTab4ScrollItem;
}(ScrollListItem));
__reflect(AcBeautyVoteViewTab4ScrollItem.prototype, "AcBeautyVoteViewTab4ScrollItem");
//# sourceMappingURL=AcBeautyVoteViewTab4ScrollItem.js.map