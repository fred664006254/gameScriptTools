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
var PlayerComeBackTaskItem = (function (_super) {
    __extends(PlayerComeBackTaskItem, _super);
    function PlayerComeBackTaskItem() {
        return _super.call(this) || this;
    }
    PlayerComeBackTaskItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view.width = 480;
        view.height = 225;
        var isinviteTask = data.type == "invite";
        var bg = BaseBitmap.create("newinvitelistbg2");
        bg.width = view.width;
        bg.height = view.height;
        view.addChild(bg);
        var titlebg = BaseBitmap.create("public_titlebg");
        titlebg.width = 450;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titlebg, bg, [15, 15]);
        view.addChild(titlebg);
        var cfg = data.data;
        var Txt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal(isinviteTask ? "playercomebacktasktitle" : "newinvitepowertitle", [cfg.needGem.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, Txt1, titlebg, [12, 0]);
        view.addChild(Txt1);
        // let box = BaseBitmap.create("newinviterewardbox");
        // box.addTouchTap(()=>{
        //     ViewController.getInstance().openView(ViewConst.POPUP.PLAYERCOMEBACKREWARDPOPUPVIEW,{
        //         isinviteTask : isinviteTask
        //     });
        // }, view);
        var box = ComponentManager.getButton("newinviterewardbox", null, function () {
            ViewController.getInstance().openView(ViewConst.POPUP.PLAYERCOMEBACKREWARDPOPUPVIEW, {
                isinviteTask: isinviteTask
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, box, titlebg, [titlebg.width - box.width / 2 - 30, 0]);
        view.addChild(box);
        box.visible = !itemparam;
        var rewardBg = BaseBitmap.create("public_9_managebg");
        rewardBg.width = 443;
        rewardBg.height = 100;
        rewardBg.x = bg.x + 20;
        rewardBg.y = titlebg.y + titlebg.height + 8;
        view.addChild(rewardBg);
        var str = cfg.getReward;
        var contentList = GameData.formatRewardItem(str);
        var reward = "";
        var scroStartY = rewardBg.y + 7;
        var tmpX = rewardBg.x + 7;
        var deltaS = 0.74;
        for (var index_1 = 0; index_1 < contentList.length; index_1++) {
            var tmpData = contentList[index_1];
            var iconItem = GameData.getItemIcon(tmpData, true);
            iconItem.setScale(deltaS);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * deltaS + 7);
            if (tmpX > (rewardBg.x + rewardBg.width)) {
                tmpX = rewardBg.x + 7;
                scroStartY += iconItem.height * deltaS + 5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * deltaS + 7);
            }
            view.addChild(iconItem);
        }
        scroStartY += 90;
        rewardBg.height = scroStartY - rewardBg.y + 2;
        bg.height = rewardBg.y + rewardBg.height + 70;
        //进度条
        var progress = ComponentManager.getProgressBar("progress21", "progress21_bg", 260);
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
            collectFlag.x = progress.x + progress.width + 30 + collectFlag.anchorOffsetX;
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
                tmpVo.lastpos = collectBtn_1.localToGlobal(collectBtn_1.width / 2 + 10, 20);
                if (isinviteTask) {
                    NetManager.request(NetRequestConst.REQUEST_REBACK_GETINVITEREWARD, {
                        ikey: cfg.id
                    });
                }
            }, this);
            collectBtn_1.x = progress.x + progress.width + 50;
            collectBtn_1.y = progress.y + progress.height / 2 - collectBtn_1.height / 2;
            view.addChild(collectBtn_1);
            collectBtn_1.setGray(friendnum < cfg.needGem);
        }
    };
    PlayerComeBackTaskItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return PlayerComeBackTaskItem;
}(ScrollListItem));
__reflect(PlayerComeBackTaskItem.prototype, "PlayerComeBackTaskItem");
//# sourceMappingURL=PlayerComeBackTaskItem.js.map