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
 * 成就Item
 * author dky
 * date 2017/11/4
 * @class AchievementScrollItem
 */
var AchievementScrollItem = (function (_super) {
    __extends(AchievementScrollItem, _super);
    function AchievementScrollItem() {
        var _this = _super.call(this) || this;
        _this._expProgress = null;
        _this._achRedDotSp = null;
        return _this;
    }
    AchievementScrollItem.prototype.initItem = function (index, achInfoVo) {
        this.width = 600;
        this.height = 146;
        this._achInfo = achInfoVo;
        var achCfg = Config.AchievementCfg.getAchievementCfgById(achInfoVo.id);
        var bgBg = BaseBitmap.create("public_scrollitembg");
        this.addChild(bgBg);
        var iconBg = BaseBitmap.create("progress19_bg");
        iconBg.x = 7;
        iconBg.y = bgBg.height / 2 - iconBg.height / 2;
        this.addChild(iconBg);
        var achPro = Api.achievementVoApi.getAchProById(achInfoVo.id);
        var pro = ComponentManager.getCircleProgressBar("progress19");
        pro.setPercentage(achPro / achCfg.value.length * 100);
        pro.x = iconBg.x;
        pro.y = iconBg.y;
        this.addChild(pro);
        var iconCloud = BaseBitmap.create("progress19_cloud");
        iconCloud.x = 30;
        iconCloud.y = iconBg.y + iconBg.height - iconCloud.height;
        this.addChild(iconCloud);
        //放在名字上面防止遮挡文字
        var iconContainer = new BaseDisplayObjectContainer();
        this.addChild(iconContainer);
        iconContainer.x = iconBg.x + iconBg.width / 2 - 44;
        iconContainer.y = iconBg.y + iconBg.height / 2 - 44;
        iconContainer.width = 88;
        iconContainer.height = 88;
        var achIcon = BaseLoadBitmap.create(achInfoVo.icon);
        // achIcon.x = iconBg.x + iconBg.width/2 - 44;
        // //todo achIcon的宽高尺寸需要固定
        // achIcon.y = iconBg.y + iconBg.height/2 - 44;
        iconContainer.addChild(achIcon);
        var nameIcon = BaseLoadBitmap.create(achInfoVo.nameIcon, null, { callback: function (container) {
                if (container) {
                    nameIcon.x = container.width / 2 - nameIcon.width / 2;
                }
            }, callbackThisObj: this, callbackParams: [iconContainer] });
        // nameIcon.x = 17;
        nameIcon.y = 58;
        iconContainer.addChild(nameIcon);
        App.CommonUtil.addTouchScaleEffect(iconContainer, this.clickItemHandler, this);
        this._achRedDotSp = BaseBitmap.create("public_dot2");
        this._achRedDotSp.x = iconBg.x + iconBg.width - this._achRedDotSp.width - 20;
        this._achRedDotSp.y = iconBg.y + 2;
        this.addChild(this._achRedDotSp);
        if (achInfoVo.f == 1) {
            this._achRedDotSp.visible = true;
        }
        else {
            this._achRedDotSp.visible = false;
        }
        var nameBg = BaseBitmap.create("public_titlebg");
        nameBg.width = 240;
        nameBg.x = 140;
        nameBg.y = 26;
        this.addChild(nameBg);
        var nameTF = ComponentManager.getTextField(achInfoVo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTF.x = nameBg.x + 15;
        nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2;
        this.addChild(nameTF);
        //成就名字根据自身变化
        // if(PlatformManager.checkIsTextHorizontal())
        // {
        // 	nameBg.width = nameTF.width + 30;
        // }
        this._expProgress = ComponentManager.getProgressBar("progress17", "progress17_bg", 260);
        this._expProgress.setPosition(140, 85);
        this.addChild(this._expProgress);
        var curValue = achCfg.value[Api.achievementVoApi.getAchProById(achInfoVo.id)];
        if (!curValue) {
            curValue = achInfoVo.v;
        }
        this._expProgress.setPercentage(achInfoVo.v / curValue);
        var achProStr = achInfoVo.v + "/" + curValue;
        this._achProTF = ComponentManager.getTextField(achProStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._achProTF.x = this._expProgress.x + this._expProgress.width / 2 - this._achProTF.width / 2;
        this._achProTF.y = this._expProgress.y + this._expProgress.height / 2 - this._achProTF.height / 2;
        this.addChild(this._achProTF);
        //领取按钮
        this._getBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", this.getBtnClickHandler, this);
        this._getBtn.x = 450;
        this._getBtn.y = 140 / 2 - this._getBtn.height / 2;
        this._getBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChild(this._getBtn);
        this._stateIcon = BaseBitmap.create("achievement_state1");
        this._stateIcon.x = 450;
        this._stateIcon.y = 140 / 2 - this._stateIcon.height / 2;
        this.addChild(this._stateIcon);
        if (achInfoVo.f == 0) {
            //进行中
            this._getBtn.visible = false;
        }
        else if (achInfoVo.f == 1) {
            //已完成
            this._stateIcon.visible = false;
        }
        else if (achInfoVo.f == 2) {
            this._stateIcon.visible = false;
            this._getBtn.visible = false;
            pro.setPercentage(100);
        }
        this.cacheAsBitmap = true;
    };
    AchievementScrollItem.prototype.clickItemHandler = function (event) {
        // let index: number = Number(event.data);
        // let achList = Api.achievementVoApi.getAchievementInfoVoList();
        // let achVo = achList[index]
        ViewController.getInstance().openView(ViewConst.POPUP.ACHIEVEMENTDETAILPOPUPVIEW, { achId: this._achInfo.id });
    };
    AchievementScrollItem.prototype.refreshData = function (index) {
        // let achList = Api.achievementVoApi.getAchievementInfoVoList();
        // let achInfoVo = achList[index];
        var achInfoVo = Api.achievementVoApi.getAchievementInfoVoById(this._achInfo.id);
        var achCfg = Config.AchievementCfg.getAchievementCfgById(achInfoVo.id);
        var curValue = achCfg.value[Api.achievementVoApi.getAchProById(achInfoVo.id)];
        this._expProgress.setPercentage(achInfoVo.v / curValue);
        var achProStr = achInfoVo.v + "/" + curValue;
        this._achProTF.text = achProStr;
        if (achInfoVo.f == 0) {
            //进行中
            this._getBtn.visible = false;
            this._stateIcon.visible = true;
        }
        else if (achInfoVo.f == 1) {
            //已完成
            this._getBtn.visible = false;
            this._stateIcon.visible = true;
        }
        else if (achInfoVo.f == 2) {
            this._stateIcon.visible = false;
            this._getBtn.visible = false;
        }
        if (achInfoVo.f == 1) {
            this._achRedDotSp.visible = true;
        }
        else {
            this._achRedDotSp.visible = false;
        }
    };
    AchievementScrollItem.prototype.getBtnClickHandler = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD, { "achId": this._achInfo.id });
    };
    AchievementScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AchievementScrollItem.prototype.dispose = function () {
        this._achProTF = null;
        // 成就图片
        // this._achIcon = null;
        // 成就标题
        this._getBtn = null;
        // 状态图片
        this._stateIcon = null;
        this._expProgress = null;
        this._achInfo = null;
        this._achRedDotSp = null;
        this.cacheAsBitmap = false;
        _super.prototype.dispose.call(this);
    };
    return AchievementScrollItem;
}(ScrollListItem));
__reflect(AchievementScrollItem.prototype, "AchievementScrollItem");
//# sourceMappingURL=AchievementScrollItem.js.map