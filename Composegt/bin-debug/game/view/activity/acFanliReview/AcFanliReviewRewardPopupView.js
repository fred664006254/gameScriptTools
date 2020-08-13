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
 * author yanyuling
 */
var AcFanliReviewRewardPopupView = (function (_super) {
    __extends(AcFanliReviewRewardPopupView, _super);
    function AcFanliReviewRewardPopupView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcFanliReviewRewardPopupView.prototype.initView = function () {
        //
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HULAOREDEEMSKIN),this.exchangeCallback,this);
        var _acvo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var config = _acvo.config;
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 620;
        bg1.x = 42;
        bg1.y = 10;
        this.addChildToContainer(bg1);
        var bg2 = BaseBitmap.create("public_tc_bg03");
        bg2.width = bg1.width - 20;
        bg2.height = bg1.height - 20;
        bg2.x = bg1.x + 10;
        bg2.y = bg1.y + 10;
        this.addChildToContainer(bg2);
        var titlebg1 = BaseBitmap.create("public_tc_bg05");
        titlebg1.width = 500;
        titlebg1.height = 40;
        titlebg1.x = bg2.x + bg2.width / 2 - bg1.width / 2;
        titlebg1.y = bg2.y + 5;
        this.addChildToContainer(titlebg1);
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("acFanliReviewReward_storytxt1"), 20, TextFieldConst.COLOR_BROWN);
        txt1.x = bg2.x + bg2.width / 2 - txt1.width / 2;
        txt1.y = titlebg1.y + titlebg1.height / 2 - txt1.height / 2;
        this.addChildToContainer(txt1);
        var txt2 = ComponentManager.getTextField(LanguageManager.getlocal("acFanliReviewView_story_desc" + this.param.data.boxid), 20, TextFieldConst.COLOR_BROWN);
        txt2.width = bg2.width - 40;
        txt2.multiline = true;
        txt2.lineSpacing = 5;
        txt2.x = bg2.x + bg2.width / 2 - txt2.width / 2;
        txt2.y = titlebg1.y + titlebg1.height + 30;
        this.addChildToContainer(txt2);
        var titlebg2 = BaseBitmap.create("public_tc_bg05");
        titlebg2.width = titlebg1.width;
        titlebg2.height = titlebg1.height;
        titlebg2.x = titlebg1.x;
        titlebg2.y = txt2.y + txt2.height + 50;
        this.addChildToContainer(titlebg2);
        var txt3 = ComponentManager.getTextField(LanguageManager.getlocal("acFanliReviewReward_storytxt2"), 20, TextFieldConst.COLOR_BROWN);
        txt3.x = bg2.x + bg2.width / 2 - txt3.width / 2;
        txt3.y = titlebg2.y + titlebg2.height / 2 - txt3.height / 2;
        this.addChildToContainer(txt3);
        var rewardbg = BaseBitmap.create("public_tc_bg01");
        rewardbg.width = 500;
        rewardbg.height = 160;
        rewardbg.x = bg1.x + 20;
        rewardbg.y = titlebg2.y + titlebg2.height + 20;
        this.addChildToContainer(rewardbg);
        var boxcfg = config.ReviewNum[this.param.data.boxid - 1];
        var getReward = boxcfg.getReward;
        if (this.param.data.boxid == 5) {
            getReward = boxcfg.getReward + "|" + config.ReviewReward;
        }
        var rewardIcons = GameData.getRewardItemIcons(getReward, true);
        var starY = rewardbg.y + 25;
        for (var index = 0; index < rewardIcons.length; index++) {
            var element = rewardIcons[index];
            element.x = (element.width + 10) * (index % 4) + rewardbg.x + 20;
            element.y = starY;
            if (index % 4 == 0 && index > 0) {
                starY = starY + element.height + 10;
                element.y = starY;
                rewardbg.height = starY - rewardbg.y + element.height + 15;
            }
            this.addChildToContainer(element);
        }
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acFanliReviewReward_storytxt3", ["" + boxcfg.needNum]), 20, TextFieldConst.COLOR_WARN_RED2);
        if (this.param.data.boxid == 5) {
            tipTxt.text = LanguageManager.getlocal("acFanliReviewReward_storytxt5", ["" + boxcfg.needNum]);
        }
        tipTxt.x = bg2.x + bg2.width / 2 - tipTxt.width / 2;
        tipTxt.y = rewardbg.y + rewardbg.height + 35;
        this.addChildToContainer(tipTxt);
        bg2.height = tipTxt.y + tipTxt.height - bg2.y + 20;
        bg1.height = bg2.height + 20;
    };
    AcFanliReviewRewardPopupView.prototype.getTitleStr = function () {
        return "acFanliReviewView_story_title" + this.param.data.boxid;
    };
    AcFanliReviewRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcFanliReviewRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcFanliReviewRewardPopupView;
}(PopupView));
__reflect(AcFanliReviewRewardPopupView.prototype, "AcFanliReviewRewardPopupView");
