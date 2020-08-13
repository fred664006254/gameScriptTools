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
 * 大奖奖池中奖名单
 * author jiangliuyang
 * date 2018/10/17
 * @class AcLotteryRewardView
 */
var AcLotteryRewardView = (function (_super) {
    __extends(AcLotteryRewardView, _super);
    function AcLotteryRewardView() {
        var _this = _super.call(this) || this;
        // CommonRewardPopupView 
        _this._nameList = [];
        return _this;
    }
    AcLotteryRewardView.prototype.initView = function () {
        // ViewController.getInstance().openView(ViewConst.POPUP.ACLOTTERYREWARDVIEW,{"rewards":realRewards,"otherRewards":otherReward,"isPlayAni":true});
        var rewards = this.param.data.rewards; //必得奖励
        var otherRewards = this.param.data.otherRewards; //随机奖励
        var isPlayAni = this.param.data.isPlayAni;
        var bg = BaseBitmap.create("aclotteryview_popbg");
        // bg.width = 530;
        // bg.height = 320;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = this.viewBg.y + this.viewBg.height / 2 - bg.height / 2;
        ;
        this.addChildToContainer(bg);
        var title = BaseBitmap.create("aclotteryview_poptitle");
        title.x = bg.x + bg.width / 2 - title.width / 2 + 20;
        title.y = bg.y + 50;
        this.addChildToContainer(title);
        var closeBtn = ComponentManager.getButton("btn_lantern", "", this.hide, this);
        closeBtn.x = bg.x + bg.width - closeBtn.width;
        closeBtn.y = title.y;
        this.addChildToContainer(closeBtn);
        var listbg1 = BaseBitmap.create("aclotteryview_popbg2");
        listbg1.width = 510;
        listbg1.height = 160;
        listbg1.x = bg.x + bg.width / 2 - listbg1.width / 2 + 5;
        listbg1.y = bg.y + 260;
        this.addChildToContainer(listbg1);
        var txtbg1 = BaseBitmap.create("aclotteryview_popbg3");
        txtbg1.x = listbg1.x + 2;
        txtbg1.y = listbg1.y + 2;
        this.addChildToContainer(txtbg1);
        var extraTxt = ComponentManager.getTextField(LanguageManager.getlocal("extraRewardDesc2"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        extraTxt.x = bg.x + bg.width / 2 - extraTxt.width;
        extraTxt.y = title.y + title.height + 30;
        this.addChildToContainer(extraTxt);
        var extra = rewards.split("|")[0];
        var extraFrom = GameData.formatRewardItem(extra)[0];
        var extraIcon = BaseLoadBitmap.create(extraFrom.icon);
        extraIcon.setScale(0.5);
        extraIcon.x = extraTxt.x + extraTxt.width + 10;
        extraIcon.y = extraTxt.y + 11 - 25;
        this.addChildToContainer(extraIcon);
        var numTxt = ComponentManager.getTextField("x" + extraFrom.num, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        numTxt.x = extraIcon.x + 50;
        numTxt.y = extraTxt.y;
        this.addChildToContainer(numTxt);
        rewards = rewards.substring(rewards.indexOf("|") + 1, rewards.length);
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("acLotteryRewardView_txt1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt1.x = txtbg1.x + 20;
        txt1.y = txtbg1.y + txtbg1.height / 2 - txt1.height / 2;
        this.addChildToContainer(txt1);
        var content1 = new BaseDisplayObjectContainer();
        // let rewardArr = GameData.getRewardItemIcons(otherRewards,true,isPlayAni);
        var rewardArr = new Array();
        var rewardsArr = GameData.formatRewardItem(otherRewards);
        rewardsArr
            .sort(function (a, b) {
            if (b.quality == a.quality) {
                return a.id - b.id;
            }
            return b.quality - a.quality;
        });
        for (var i = 0; i < rewardsArr.length; i++) {
            var rewardItemIcon = GameData.getItemIcon(rewardsArr[i], true, isPlayAni);
            rewardArr.push(rewardItemIcon);
        }
        for (var index = 0; index < rewardArr.length; index++) {
            var rewardIcon = rewardArr[index];
            rewardIcon.setScale(0);
            rewardIcon.height = 42;
            rewardIcon.width = 42;
            rewardIcon.anchorOffsetX = rewardIcon.width / 2;
            rewardIcon.anchorOffsetY = rewardIcon.height / 2;
            rewardIcon.setPosition(10 + 115 * index + rewardIcon.anchorOffsetX, 10 + rewardIcon.anchorOffsetY);
            content1.addChild(rewardIcon);
            egret.Tween.get(rewardIcon, { loop: false }).wait(100 * index).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 50);
        }
        var rect1 = new egret.Rectangle(0, 0, listbg1.width - 20, listbg1.height - 30);
        var scrollList1 = ComponentManager.getScrollView(content1, rect1);
        scrollList1.horizontalScrollPolicy = "on";
        scrollList1.verticalScrollPolicy = "off";
        scrollList1.x = listbg1.x + 10;
        scrollList1.y = listbg1.y + 35;
        this.addChildToContainer(scrollList1);
        var listbg2 = BaseBitmap.create("aclotteryview_popbg2");
        listbg2.width = listbg1.width;
        listbg2.height = listbg1.height;
        listbg2.x = bg.x + bg.width / 2 - listbg1.width / 2;
        listbg2.y = listbg1.y + listbg1.height + 20;
        this.addChildToContainer(listbg2);
        var txtbg2 = BaseBitmap.create("aclotteryview_popbg3");
        txtbg2.x = listbg2.x + 2;
        txtbg2.y = listbg2.y + 2;
        this.addChildToContainer(txtbg2);
        var txt2 = ComponentManager.getTextField(LanguageManager.getlocal("acLotteryRewardView_txt2"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt2.x = txt1.x;
        txt2.y = txtbg2.y + txtbg2.height / 2 - txt2.height / 2;
        this.addChildToContainer(txt2);
        var content2 = new BaseDisplayObjectContainer();
        // let rewardArr2 = GameData.getRewardItemIcons(rewards,true,isPlayAni);
        var rewardArr2 = new Array();
        var rewardsArr2 = GameData.formatRewardItem(rewards);
        rewardsArr2
            .sort(function (a, b) {
            if (b.quality == a.quality) {
                return a.id - b.id;
            }
            return b.quality - a.quality;
        });
        for (var i = 0; i < rewardsArr2.length; i++) {
            var rewardItemIcon = GameData.getItemIcon(rewardsArr2[i], true, isPlayAni);
            rewardArr2.push(rewardItemIcon);
        }
        for (var index = 0; index < rewardArr2.length; index++) {
            var rewardIcon = rewardArr2[index];
            rewardIcon.setScale(0);
            rewardIcon.height = 42;
            rewardIcon.width = 42;
            rewardIcon.anchorOffsetX = rewardIcon.width / 2;
            rewardIcon.anchorOffsetY = rewardIcon.height / 2;
            rewardIcon.setPosition(10 + 115 * (index) + rewardIcon.anchorOffsetX, 10 + rewardIcon.anchorOffsetY);
            content2.addChild(rewardIcon);
            egret.Tween.get(rewardIcon, { loop: false }).wait(100 * index).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 50);
        }
        var scrollList2 = ComponentManager.getScrollView(content2, rect1);
        scrollList2.horizontalScrollPolicy = "on";
        scrollList2.verticalScrollPolicy = "off";
        scrollList2.x = listbg2.x + 10;
        scrollList2.y = listbg2.y + 35;
        this.addChildToContainer(scrollList2);
        var okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        okBtn.x = bg.x + bg.width / 2 - okBtn.width / 2 + 5;
        okBtn.y = bg.y + bg.height - okBtn.height - 10;
        this.addChildToContainer(okBtn);
    };
    AcLotteryRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "aclotteryview_popbg3",
            "aclotteryview_popbg",
            "aclotteryview_popbg2",
            "aclotteryview_poptitle",
        ]);
    };
    AcLotteryRewardView.prototype.getTitleStr = function () {
        return "";
    };
    AcLotteryRewardView.prototype.dispose = function () {
        this._nameList = [];
        _super.prototype.dispose.call(this);
    };
    return AcLotteryRewardView;
}(BaseView));
__reflect(AcLotteryRewardView.prototype, "AcLotteryRewardView");
