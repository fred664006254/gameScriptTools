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
 * 新邀请有礼邀请任务item
 * author qianjun
 */
var PlayerComeBackRewardItem = (function (_super) {
    __extends(PlayerComeBackRewardItem, _super);
    function PlayerComeBackRewardItem() {
        return _super.call(this) || this;
    }
    PlayerComeBackRewardItem.prototype.initItem = function (index, data) {
        var view = this;
        view.width = 510;
        view.height = 240;
        var isinviteTask = data.type == "invite";
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.width = view.width;
        bg.height = view.height;
        view.addChild(bg);
        var titlebg = BaseBitmap.create("shopview_itemtitle");
        titlebg.width = 430;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titlebg, bg, [0, 3]);
        view.addChild(titlebg);
        var cfg = data.data;
        var Txt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal(isinviteTask ? "playercomebacktasktitle" : "newinvitepowertitle", [cfg.needGem.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, Txt1, titlebg, [12, 0]);
        view.addChild(Txt1);
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = 480;
        rewardBg.height = 115;
        rewardBg.x = bg.x + 15;
        rewardBg.y = titlebg.y + titlebg.height + 8;
        view.addChild(rewardBg);
        var str = cfg.getReward;
        var contentList = GameData.formatRewardItem(str);
        var reward = "";
        var scroStartY = rewardBg.y + 10;
        var tmpX = rewardBg.x + 10;
        var deltaS = 0.8;
        for (var index_1 = 0; index_1 < contentList.length; index_1++) {
            var tmpData = contentList[index_1];
            var iconItem = GameData.getItemIcon(tmpData, true);
            iconItem.setScale(deltaS);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * deltaS + 7);
            if (tmpX > (rewardBg.x + rewardBg.width)) {
                tmpX = rewardBg.x + 10;
                scroStartY += iconItem.height * deltaS + 5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * deltaS + 10);
            }
            view.addChild(iconItem);
        }
        scroStartY += 98;
        rewardBg.height = scroStartY - rewardBg.y + 2;
        bg.height = rewardBg.y + rewardBg.height + 80;
        view.height = bg.height + 5;
        //进度条
        var progress = ComponentManager.getProgressBar("progress21", "progress21_bg", 330);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, rewardBg, [0, rewardBg.height + 20]);
        view.addChild(progress);
        var tmpVo = Api.newrebackVoApi;
        var friendnum = data.type == "invite" ? tmpVo.getInviteFriendNum() : 0;
        progress.setText(friendnum + "/" + cfg.needGem);
        progress.setPercentage(friendnum / cfg.needGem);
        //检查是否创建已经领取标签
        var flag = false;
        if (data.type == "invite") {
            flag = tmpVo.isGetInviteFriendTask(cfg.id);
        }
        if (flag) {
            var collectFlag = BaseBitmap.create("collectflag");
            collectFlag.anchorOffsetX = collectFlag.width / 2;
            collectFlag.anchorOffsetY = collectFlag.height / 2;
            collectFlag.setScale(0.7);
            collectFlag.x = progress.x + progress.width + 15 + collectFlag.anchorOffsetX;
            collectFlag.y = progress.y + progress.height / 2;
            view.addChild(collectFlag);
        }
        else {
            var collectBtn_1 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "realnamedes6", function () {
                if (friendnum < cfg.needGem) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("playercomebacktasktip" + (isinviteTask ? 1 : 2)));
                    return;
                }
                tmpVo.lastidx = cfg.id;
                tmpVo.lastpos = collectBtn_1.localToGlobal(collectBtn_1.width / 2 + 50, 20);
                if (isinviteTask) {
                    NetManager.request(NetRequestConst.REQUEST_REBACK_GETINVITEREWARD, {
                        ikey: cfg.id
                    });
                }
            }, this);
            collectBtn_1.x = progress.x + progress.width + 20;
            collectBtn_1.y = progress.y + progress.height / 2 - collectBtn_1.height / 2;
            view.addChild(collectBtn_1);
            collectBtn_1.setGray(friendnum < cfg.needGem);
        }
    };
    PlayerComeBackRewardItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return PlayerComeBackRewardItem;
}(ScrollListItem));
__reflect(PlayerComeBackRewardItem.prototype, "PlayerComeBackRewardItem");
//# sourceMappingURL=PlayerComeBackRewardItem.js.map