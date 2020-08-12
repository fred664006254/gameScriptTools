/*
 *@description: 成就列表 item
 *@author: hwc
 *@date: 2020-06-09 10:25:14
 *@version 1.0.0
 */
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
var AchieveListItem = (function (_super) {
    __extends(AchieveListItem, _super);
    function AchieveListItem() {
        var _this = _super.call(this) || this;
        _this._bg = null;
        _this._rewardBtn = null;
        _this._rewardBg = null;
        _this._type = 0;
        /**成就id */
        _this._achid = null;
        return _this;
    }
    AchieveListItem.prototype.dispose = function () {
        this._bg = null;
        this._rewardBtn = null;
        this._title = null;
        this.randomProgress = null;
        this._rewardBtn = null;
        this._type = 0;
        _super.prototype.dispose.call(this);
    };
    AchieveListItem.prototype.initItem = function (index, data, itemParam) {
        this._achid = data;
        var stage = Api.AchievementVoApi.getStageByID(data);
        var achcfg = Config.AchievementCfg.getAchItemCfgByID(data, stage);
        var achvo = Api.AchievementVoApi.getAchinfoByID(data);
        this._bg = BaseBitmap.create("taskachievement");
        this._bg.width = 495;
        this._bg.y = 10;
        this.addChild(this._bg);
        this._title = ComponentMgr.getTextField('1', TextFieldConst.SIZE_28, ColorEnums.white);
        this.addChild(this._title);
        this._title.x = 14;
        this._title.y = this._bg.y + 15;
        this._title.text = Config.AchievementCfg.getAchieveTitle(data);
        this._title.strokeColor = 0x08131A;
        this.randomProgress = ComponentMgr.getProgressBar("ab_task_view_progress", "ab_task_progress_bg", 471);
        this.addChild(this.randomProgress);
        this.randomProgress.x = 13;
        this.randomProgress.y = this._bg.y + this._bg.height - this.randomProgress.height - 10;
        this.randomProgress.setPercentage(achvo.v / achcfg.value, achvo.v + "/" + achcfg.value);
        var status = achvo.f;
        switch (status) {
            case 0:
                var notreward = BaseBitmap.create("taskviewnotachieve");
                this.addChild(notreward);
                notreward.x = 350;
                notreward.y = this._bg.y + 75;
                break;
            case 1:
                var rewardBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("taskviewreward"), this.bgOnclick, this);
                this.addChild(rewardBtn);
                rewardBtn.x = 327;
                rewardBtn.y = this._bg.y + 75;
                this._rewardBtn = rewardBtn;
                // this._rewardBtn.visible = achvo.v >= achcfg.value;
                // this._rewardBtn.setEnable(achvo.v >= achcfg.value);
                break;
            case 2:
                var done = BaseBitmap.create("taskviewachieve");
                this.addChild(done);
                done.x = 350;
                done.y = this._bg.y + 75;
                break;
            default:
                break;
        }
        var startX = 13;
        var startY = this._bg.y + 65;
        var rewardvo = GameData.formatRewardItem(achcfg.getReward);
        var _loop_1 = function (index_1) {
            var rewardBg = BaseBitmap.create("ab_task_xuxian_bg");
            this_1.addChild(rewardBg);
            rewardBg.x = startX + 100 * index_1;
            rewardBg.y = startY;
            rewardBg.touchEnabled = true;
            if (index_1 == 0) {
                this_1._rewardBg = rewardBg;
                this_1._type = rewardvo[index_1].type;
            }
            var item = rewardvo[index_1];
            var rewarditem = null;
            if (item.type == 1 || item.type == 2) {
                rewarditem = GameData.getItemIcon(item, item.num, false);
                rewarditem.setScale(0.8);
                var num = rewarditem.getChildByName("numTxt");
                num.y = 90;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewarditem, rewardBg, [0, 0]);
            }
            else {
                rewarditem = GameData.getItemIcon(item, item.num, false);
                rewarditem.setScale(0.6);
                var num = rewarditem.getChildByName("numTxt");
                num.y = 110;
                num.size = 30;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewarditem, rewardBg, [0, 0]);
            }
            this_1.addChild(rewarditem);
            rewardBg.addTouchTap(function () {
                if (item.type === 100) {
                    var dicecfg = Config.DiceCfg.getCfgById(item.id);
                    ViewController.getInstance().openView(ViewConst.BUYDICECONFIRMPOPUPVIEW, {
                        title: dicecfg.name,
                        handler: null,
                        needCancel: false,
                        needClose: 1,
                        id: "100_" + dicecfg.id + "_" + item.num,
                        costnum: LangMger.getlocal("sysconfirm"),
                        // costIcon : `ab_mainui_gem`,
                        touchMaskClose: true
                    });
                }
                else if (item.type == 1 || item.type == 2) {
                    ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
                        title: item.name,
                        handler: null,
                        needCancel: false,
                        needClose: 1,
                        param: item,
                        costnum: LangMger.getlocal("sysconfirm"),
                    });
                }
            }, this_1);
        };
        var this_1 = this;
        for (var index_1 = 0; index_1 < rewardvo.length; index_1++) {
            _loop_1(index_1);
        }
    };
    AchieveListItem.prototype.bgOnclick = function (event) {
        var status = Api.AchievementVoApi.getAchinfoByID(this._achid).f;
        switch (status) {
            case 0:
            case 2:
                // NetManager.request(NetConst.TASK_GET_REWARDS, {taskId:taskId});
                break;
            case 1:
                Api.AchievementVoApi.rewardType = this._type;
                var x = GameConfig.stageWidth / 2;
                var y = GameConfig.stageHeigth / 2;
                if (this._rewardBg) {
                    x = this._rewardBg.localToGlobal(this._rewardBg.width / 2, this._rewardBg.height / 2).x;
                    y = this._rewardBg.localToGlobal(this._rewardBg.width / 2, this._rewardBg.height / 2).y;
                }
                Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(x, y));
                NetManager.request(NetConst.TASK_GETACHIEVEMENT, { rkey: this._achid });
                break;
            default:
                break;
        }
    };
    /**
     * 不同格子X间距
     */
    AchieveListItem.prototype.getSpaceX = function () {
        return _super.prototype.getSpaceX.call(this);
    };
    /**
     * 不同格子Y间距
     */
    AchieveListItem.prototype.getSpaceY = function () {
        return _super.prototype.getSpaceY.call(this);
    };
    return AchieveListItem;
}(ScrollListItem));
__reflect(AchieveListItem.prototype, "AchieveListItem");
//# sourceMappingURL=AchieveListItem.js.map