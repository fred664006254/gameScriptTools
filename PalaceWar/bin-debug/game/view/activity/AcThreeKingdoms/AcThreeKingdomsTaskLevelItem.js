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
 * 派遣任务奖励item
 * author qianjun
 * date 2017/9/28
 */
var AcThreeKingdomsTaskLevelItem = (function (_super) {
    __extends(AcThreeKingdomsTaskLevelItem, _super);
    function AcThreeKingdomsTaskLevelItem() {
        var _this = _super.call(this) || this;
        // 属性文本
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsTaskLevelItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_THREEKINGDOMS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsTaskLevelItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view.width = 510;
        view.height = 155 + 10;
        view._code = itemparam.code;
        var cityid = itemparam.cityId;
        var cfg = data;
        // --needExp:需要经验值升级至下一级
        // --taskSlotIndiv:任务槽最大数量-个人
        // --taskSlotFid:好友任务，每日刷新数量
        // --ratio:个人任务刷新任务概率，品质由低到高（DCBAS）。
        var bg = BaseBitmap.create("public_9_bg94");
        bg.width = view.width;
        bg.height = view.height - 5;
        view.addChild(bg);
        var levelbg = BaseBitmap.create("common_titlebg");
        view.addChild(levelbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelbg, bg, [0, -3]);
        var taskType = BaseBitmap.create("threekingdomstasktype" + cfg.id);
        view.addChild(taskType);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, taskType, levelbg, [10, 0]);
        var rewardTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip3", '1')), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(rewardTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rewardTxt, taskType, [taskType.width, 0]);
        //奖励物品
        var rewardstr = "1047_1_" + data.addHeroExp + "|" + data.getReward;
        var rIcons = GameData.getRewardItemIcons(rewardstr, true);
        var rewardGroup = new BaseDisplayObjectContainer();
        var tmp = Math.min(5, rIcons.length);
        rewardGroup.width = tmp * 88 + (tmp - 1) * 10;
        rewardGroup.x = bg.x + (bg.width - rewardGroup.width) / 2;
        rewardGroup.y = bg.y + 52;
        view.addChild(rewardGroup);
        var len = rIcons.length;
        var tmpX = 0;
        var scroStartY = 0;
        for (var innerIdx = 0; innerIdx < len; innerIdx++) {
            var element = rIcons[innerIdx];
            element.x = tmpX;
            element.y = 0;
            element.setScale(0.8);
            tmpX += (element.width * element.scaleX + 10);
            if (tmpX >= (rewardGroup.width + 10)) {
                tmpX = 0;
                scroStartY += element.height + 10;
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width * element.scaleX + 10);
            }
            element.cacheAsBitmap = true;
            rewardGroup.addChild(element);
        }
        var taskinfo = view.vo.getCityTaskStaus(cityid);
        var curlevel = taskinfo.level;
        if (data.id == curlevel) {
            var flag = BaseBitmap.create("threekingdomstaskflag");
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, flag, bg, [-2, -3]);
            view.addChild(flag);
            if (curlevel < 2) {
                view.height = 205;
                var line = BaseBitmap.create("titleupgradearrow");
                line.anchorOffsetX = line.width / 2;
                line.anchorOffsetY = line.height / 2;
                line.rotation = 90;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, bg, [0, bg.height]);
                view.addChild(line);
            }
        }
    };
    AcThreeKingdomsTaskLevelItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcThreeKingdomsTaskLevelItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcThreeKingdomsTaskLevelItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsTaskLevelItem;
}(ScrollListItem));
__reflect(AcThreeKingdomsTaskLevelItem.prototype, "AcThreeKingdomsTaskLevelItem");
//# sourceMappingURL=AcThreeKingdomsTaskLevelItem.js.map