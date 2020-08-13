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
 * 成就详情Item
 * author dky
 * date 2017/11/6
 * @class AchievementDetailScrollItem
 */
var AchievementDetailScrollItem = (function (_super) {
    __extends(AchievementDetailScrollItem, _super);
    function AchievementDetailScrollItem() {
        return _super.call(this) || this;
    }
    AchievementDetailScrollItem.prototype.initItem = function (index, achIndex) {
        this.width = 516; //522;
        this.height = 103 + this.getSpaceY();
        // let parent = <AchievementDetailPopupView>this.par;
        this._achIndex = achIndex;
        var achInfoVo = Api.achievementVoApi.getAchievementInfoVoById(AchievementDetailPopupView.itemId);
        this._achInfo = achInfoVo;
        var achCfg = Config.AchievementCfg.getAchievementCfgById(achInfoVo.id);
        var bgBg = BaseBitmap.create("public_listbg");
        bgBg.width = this.width;
        bgBg.height = 103;
        this.addChild(bgBg);
        var nameStr = (achIndex + 1) + "." + achInfoVo.name;
        var nameTF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, 0x794916);
        nameTF.x = 20;
        nameTF.y = 30;
        this.addChild(nameTF);
        var rewardStr = GameData.getRewardsStr(achCfg.reward[achIndex]);
        var rewardTF = ComponentManager.getTextField(rewardStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, 0x007e00);
        rewardTF.x = 50;
        rewardTF.y = 60;
        this.addChild(rewardTF);
        // let achPro = Api.achievementVoApi.getAchProById(achInfoVo.id);
        var nn1 = App.StringUtil.changeIntToText(achInfoVo.v);
        var nn2 = App.StringUtil.changeIntToText(achCfg.value[achIndex]);
        var achProStr = "(" + nn1 + "/" + nn2 + ")";
        this._achProTF = ComponentManager.getTextField(achProStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._achProTF.x = nameTF.x + nameTF.width + 10;
        this._achProTF.y = nameTF.y;
        this.addChild(this._achProTF);
        //领取按钮
        // this._getBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "taskCollect", this.getBtnClickHandler, this);
        this._getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.getBtnClickHandler, this);
        this._getBtn.x = 435 - this._getBtn.width / 2; //370;
        this._getBtn.y = this.height / 2 - this._getBtn.height * this._getBtn.scaleY / 2 - 5;
        this.addChild(this._getBtn);
        this._stateIcon = BaseBitmap.create("achievement_state2");
        // this._stateIcon.setScale(0.85);
        this._stateIcon.x = 435 - this._stateIcon.width / 2; //380;
        this._stateIcon.y = this.height / 2 - this._stateIcon.height / 2 - 5;
        this.addChild(this._stateIcon);
        var stage = achInfoVo.stage;
        var curValue = achCfg.value[Api.achievementVoApi.getAchProById(achInfoVo.id)];
        this._getBtn.visible = false;
        this._stateIcon.visible = true;
        if (achIndex < achInfoVo.stage - 1) {
            //不是最後一個
            this._stateIcon.texture = ResourceManager.getRes("achievement_state3");
        }
        else {
            if (achCfg.value[achIndex] > achInfoVo.v) {
                //未完成
                // this._stateIcon.texture = ResourceManager.getRes("achievement_state2")
                if (this._achIndex == achInfoVo.stage - 1) {
                    //2进行种
                    this._stateIcon.texture = ResourceManager.getRes("achievement_state1");
                }
                else {
                    //未完成
                    this._stateIcon.texture = ResourceManager.getRes("achievement_state2");
                }
            }
            else {
                if (achIndex == achInfoVo.stage - 1) {
                    // this._stateIcon.texture = ResourceManager.getRes("achievement_state3")
                    if (achInfoVo.f == 2) {
                        //任务完成
                        this._getBtn.visible = false;
                        this._stateIcon.visible = true;
                        this._stateIcon.texture = ResourceManager.getRes("achievement_state3");
                    }
                    else {
                        //可领取
                        this._getBtn.visible = true;
                        this._stateIcon.visible = false;
                    }
                }
                else {
                    //进行中
                    this._stateIcon.texture = ResourceManager.getRes("achievement_state1");
                }
            }
        }
    };
    AchievementDetailScrollItem.prototype.refreshData = function (index) {
        var achInfoVo = Api.achievementVoApi.getAchievementInfoVoById(AchievementDetailPopupView.itemId);
        var stage = achInfoVo.stage;
        var achCfg = Config.AchievementCfg.getAchievementCfgById(achInfoVo.id);
        var curValue = achCfg.value[Api.achievementVoApi.getAchProById(achInfoVo.id)];
        this._getBtn.visible = false;
        this._stateIcon.visible = true;
        var achIndex = this._achIndex;
        if (achIndex < achInfoVo.stage - 1) {
            //不是最後一個
            this._stateIcon.texture = ResourceManager.getRes("achievement_state3");
        }
        else {
            if (achCfg.value[achIndex] > achInfoVo.v) {
                //未完成
                // this._stateIcon.texture = ResourceManager.getRes("achievement_state2")
                if (this._achIndex == achInfoVo.stage - 1) {
                    //2进行种
                    this._stateIcon.texture = ResourceManager.getRes("achievement_state1");
                }
                else {
                    //未完成
                    this._stateIcon.texture = ResourceManager.getRes("achievement_state2");
                }
            }
            else {
                if (achIndex == achInfoVo.stage - 1) {
                    // this._stateIcon.texture = ResourceManager.getRes("achievement_state3")
                    if (achInfoVo.f == 2) {
                        //任务完成
                        this._getBtn.visible = false;
                        this._stateIcon.visible = true;
                        this._stateIcon.texture = ResourceManager.getRes("achievement_state3");
                    }
                    else {
                        //可领取
                        this._getBtn.visible = true;
                        this._stateIcon.visible = false;
                    }
                }
                else {
                    //进行中
                    this._stateIcon.texture = ResourceManager.getRes("achievement_state1");
                }
            }
        }
    };
    AchievementDetailScrollItem.prototype.getBtnClickHandler = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD, { "achIndex": this._achIndex });
    };
    AchievementDetailScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AchievementDetailScrollItem.prototype.dispose = function () {
        this._achProTF = null;
        // 成就标题
        this._getBtn = null;
        // 状态图片
        this._stateIcon = null;
        this._achInfo = null;
        this._achIndex = null;
        ;
        _super.prototype.dispose.call(this);
    };
    return AchievementDetailScrollItem;
}(ScrollListItem));
__reflect(AchievementDetailScrollItem.prototype, "AchievementDetailScrollItem");
