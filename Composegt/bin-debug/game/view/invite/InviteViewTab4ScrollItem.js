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
 * 邀请排行列表节点
 * author 赵占涛
 * date 2018/3/9
 * @class InviteViewTab4ScrollItem
 */
var InviteViewTab4ScrollItem = (function (_super) {
    __extends(InviteViewTab4ScrollItem, _super);
    function InviteViewTab4ScrollItem() {
        return _super.call(this) || this;
    }
    InviteViewTab4ScrollItem.prototype.initItem = function (index, userPid) {
        this.width = 602;
        this.height = 58;
        if (index % 2 === 0) {
            var evenNumberLine = BaseBitmap.create("public_tc_bg05");
            evenNumberLine.scaleX = this.width / evenNumberLine.width;
            evenNumberLine.scaleY = this.height / evenNumberLine.height;
            evenNumberLine.x = this.width / 2 - evenNumberLine.width * evenNumberLine.scaleX / 2;
            evenNumberLine.y = this.height / 2 - evenNumberLine.height * evenNumberLine.scaleY / 2;
            this.addChild(evenNumberLine);
        }
        if (index < 3) {
            var rankImg = BaseBitmap.create("rank_" + String(index + 1));
            rankImg.x = 92 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            rankTxt.text = String(index + 1);
            rankTxt.x = 92 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        // 玩家头像
        var head;
        var headStr = Api.inviteVoApi.getUserHeadByPid(userPid);
        if (headStr.substr(0, 4) === "http") {
            // headStr = decodeURIComponent(headStr);
            // 网络上的头像
            head = new BaseDisplayObjectContainer();
            head.width = 80;
            head.height = 80;
            var headIcon = BaseLoadBitmap.create(headStr);
            headIcon.width = 80;
            headIcon.height = 80;
            head.addChild(headIcon);
            var circle = new egret.Shape();
            circle.graphics.beginFill(0x0000ff);
            circle.graphics.drawCircle(40, 40, 40);
            circle.graphics.endFill();
            head.addChild(circle);
            headIcon.mask = circle;
            head.cacheAsBitmap = true;
            head.setScale(60 / head.width);
        }
        else {
            // 游戏内头像
            head = new BaseDisplayObjectContainer();
            var posStr = "public_chatheadbg";
            var posBg = BaseBitmap.create(posStr);
            head.addChild(posBg);
            var rect1 = egret.Rectangle.create();
            rect1.setTo(0, 0, 136, 143);
            var posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(headStr), rect1);
            posBB.x = 0;
            posBB.y = -7;
            posBB.setScale(2 / 3);
            head.addChild(posBB);
            head.setScale(60 / posBg.width);
        }
        head.x = 190 - head.width * head.scaleX;
        head.y = this.height / 2 - head.height / 2 * head.scaleY;
        this.addChild(head);
        var nameTxt = ComponentManager.getTextField(Api.inviteVoApi.getUserNicknameByPid(userPid), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTxt.x = head.x + head.width * head.scaleX + 10;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        // 区
        var serverTxt = ComponentManager.getTextField(Api.mergeServerVoApi.getAfterMergeSeverName(Api.inviteVoApi.getUserUidByPid(userPid)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        serverTxt.x = 382 - serverTxt.width / 2;
        serverTxt.y = this.height / 2 - serverTxt.height / 2;
        this.addChild(serverTxt);
        // 权势
        var powerTxt = ComponentManager.getTextField(Api.inviteVoApi.getUserPowerByPid(userPid), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        powerTxt.x = 514 - powerTxt.width / 2;
        powerTxt.y = this.height / 2 - powerTxt.height / 2;
        this.addChild(powerTxt);
        var lineImg = BaseBitmap.create("rank_line");
        lineImg.width = this.width - 20;
        lineImg.x = GameConfig.stageWidth / 2 - lineImg.width / 2;
        lineImg.y = this.height;
        this.addChild(lineImg);
        this.cacheAsBitmap = true;
    };
    InviteViewTab4ScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    InviteViewTab4ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    InviteViewTab4ScrollItem.prototype.dispose = function () {
        this.cacheAsBitmap = false;
        _super.prototype.dispose.call(this);
    };
    return InviteViewTab4ScrollItem;
}(ScrollListItem));
__reflect(InviteViewTab4ScrollItem.prototype, "InviteViewTab4ScrollItem");
