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
  * 花魁活动view--充值奖励Item
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteViewTab2ScrollItem
  */
var AcBeautyVoteViewTab2ScrollItem = (function (_super) {
    __extends(AcBeautyVoteViewTab2ScrollItem, _super);
    function AcBeautyVoteViewTab2ScrollItem() {
        return _super.call(this) || this;
    }
    AcBeautyVoteViewTab2ScrollItem.prototype.initItem = function (index, data, itemParam) {
        //         getReward: "6_1004_1|6_1352_2|6_1354_2"
        // hashCode: (...)
        // id: 1
        // needGem: 60
        // specialGift: 10
        var code = itemParam.code;
        var aid = itemParam.aid;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        //创建ui
        //背景图片
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 610;
        bg.height = 130;
        this.addChild(bg);
        var titleBg = BaseBitmap.create("accarnivalview_tab_red");
        titleBg.setPosition(4, 10);
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab2ItemTitle-" + code, [String(data.needGem)]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 15, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var rewards = "1008_0_" + data.specialGift + "_" + itemParam.code + "|" + data.getReward;
        var rewardVoList = GameData.formatRewardItem(rewards);
        var rewardScale = 1;
        var itemHeight = 0;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(bg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
            this.addChild(rewardDB);
            itemHeight = rewardDB.height + 15;
        }
        var offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        bg.height += offsetH;
        //进度条
        var progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 386);
        progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 25);
        this.addChild(progress);
        progress.setPercentage(vo.getRechanrgeValue() / data.needGem, LanguageManager.getlocal("acBeautyVoteViewTab2Itempg-" + code, [String(vo.getRechanrgeValue()), String(data.needGem)]), TextFieldConst.COLOR_WHITE);
        this.height = bg.height;
        if (vo.getRechanrgeValue() >= data.needGem) {
            titleBg.setRes("accarnivalview_tab_green");
            if (vo.checkRechargeFlag(data.id)) {
                var receiveflagScale = 0.6;
                var receiveflag = BaseBitmap.create("collectflag");
                receiveflag.setScale(receiveflagScale);
                receiveflag.setPosition(bg.x + bg.width - receiveflag.width * receiveflagScale - 20, bg.y + bg.height - receiveflag.height * receiveflagScale - 10);
                this.addChild(receiveflag);
            }
            else {
                var receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    if (!vo.isStart) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_BEAUTYVOTE_GETRECHARGERWD, { activeId: vo.aidAndCode, rechargeId: data.id });
                }, this);
                receiveBtn.setPosition(bg.x + bg.width - receiveBtn.width - 15, bg.y + bg.height - receiveBtn.height - 10);
                this.addChild(receiveBtn);
            }
        }
        else {
            titleBg.setRes("accarnivalview_tab_red");
            var rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "acBeautyVoteViewTab2ItemRecharge-" + itemParam.code, function () {
                if (vo.checkIsInEndShowTime()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            }, this);
            rechargeBtn.setPosition(bg.x + bg.width - rechargeBtn.width - 15, bg.y + bg.height - rechargeBtn.height - 10);
            this.addChild(rechargeBtn);
        }
    };
    AcBeautyVoteViewTab2ScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcBeautyVoteViewTab2ScrollItem;
}(ScrollListItem));
__reflect(AcBeautyVoteViewTab2ScrollItem.prototype, "AcBeautyVoteViewTab2ScrollItem");
//# sourceMappingURL=AcBeautyVoteViewTab2ScrollItem.js.map