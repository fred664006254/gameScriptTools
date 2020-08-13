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
 * 元旦那个啥奖励
 */
var AcTreasureRewardView = (function (_super) {
    __extends(AcTreasureRewardView, _super);
    function AcTreasureRewardView() {
        return _super.call(this) || this;
    }
    AcTreasureRewardView.prototype.initView = function () {
        var bottom = BaseBitmap.create("arena_bottom");
        bottom.y = GameConfig.stageHeigth - this.container.y - bottom.height;
        this.addChildToContainer(bottom);
        var treasureDesTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        treasureDesTxt.text = LanguageManager.getlocal("treasureDes", [zoneStr + ""]);
        treasureDesTxt.width = bottom.width;
        treasureDesTxt.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChildToContainer(treasureDesTxt);
        treasureDesTxt.y = bottom.y + 40;
        // this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,treasureDesTxt,bottom);
        var bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - 75 - 50;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - this.getTitleButtomY() - 50;
        this.addChildToContainer(bottomBg);
        var bottomBg2 = BaseBitmap.create("public_9_bg32");
        bottomBg2.height = bottomBg.height - 110;
        bottomBg2.width = bottomBg.width - 40;
        bottomBg2.x = bottomBg.x + 20;
        bottomBg2.y = bottomBg.y + 85;
        this.addChildToContainer(bottomBg2);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS), this.useCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST, this.checkRedPoint, this);
        // this.tabbarGroup.addRedPoint(1);//.y =this.tabbarGroup.y+50;
        this.checkRedPoint();
    };
    AcTreasureRewardView.prototype.checkRedPoint = function () {
        if (this.vo.rechargeHot() && this.vo.isInActy() == true) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.taskRedHot() && this.vo.isInActy() == true) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
    };
    Object.defineProperty(AcTreasureRewardView.prototype, "vo", {
        get: function () {
            var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            return springCelebrateVo;
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureRewardView.prototype.useCallback = function (event) {
        if (event.data.ret) {
            var rewards = "";
            if (!event.data.data.data.rewards && TreasureTaskScrollItem.TASKID != null) {
                rewards = TreasureTaskScrollItem.TASKID;
            }
            else {
                rewards = event.data.data.data.rewards;
            }
            rewards = this.vo.tmpReward;
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(rewards));
            this.checkRedPoint();
        }
    };
    AcTreasureRewardView.prototype.getTabbarTextArr = function () {
        return ["acTreasureRewardViewTab1",
            "acTreasureRewardViewTab2",
        ];
    };
    AcTreasureRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "activity_charge_red",
            "progress7", "progress7_bg",
            "servant_bottombg",
            "arena_bottom",
        ]);
    };
    AcTreasureRewardView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST, this.checkRedPoint, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS), this.useCallback, this);
        _super.prototype.dispose.call(this);
    };
    return AcTreasureRewardView;
}(CommonView));
__reflect(AcTreasureRewardView.prototype, "AcTreasureRewardView");
//# sourceMappingURL=AcTreasureRewardView.js.map