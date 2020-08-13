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
 * 转换奖励的通用面板
 * author 张朝阳
 * date 2018/10/10
 * @class CommonChangeOtherReward
 */
var CommonChangeOtherReward = (function (_super) {
    __extends(CommonChangeOtherReward, _super);
    function CommonChangeOtherReward() {
        return _super.call(this) || this;
    }
    /**UI的入口函数 */
    CommonChangeOtherReward.prototype.initView = function () {
        this._rewardName = this.param.data.name;
        this._touch = this.param.data.touch;
        var message = this.param.data.message;
        this._callback = this.param.data.callback;
        this._handler = this.param.data.handler;
        var replacerewards = this.param.data.replacerewards;
        if (replacerewards) {
            var oldReward = "";
            var newReward = "";
            for (var k in replacerewards) {
                for (var key in replacerewards[k]) {
                    if (key && replacerewards[k][key]) {
                        oldReward = String(key);
                        if (newReward) {
                            newReward += "|";
                        }
                        newReward += replacerewards[k][key];
                    }
                }
            }
            var replacerewardVo = GameData.formatRewardItem(oldReward)[0];
            if (replacerewardVo.type == 8) {
                this._rewardName = Config.ServantCfg.getServantItemById(replacerewardVo.id).name;
            }
            else if (replacerewardVo.type == 10) {
                this._rewardName = Config.WifeCfg.getWifeCfgById(replacerewardVo.id).name;
            }
            else if (replacerewardVo.type == 16) {
                this._rewardName = Config.WifeskinCfg.getWifeCfgById(replacerewardVo.id).name;
            }
            else if (replacerewardVo.type == 19) {
                this._rewardName = Config.ServantskinCfg.getServantSkinItemById(replacerewardVo.id).getSkinName();
            }
            else if (replacerewardVo.type == 11) {
                this._rewardName = Config.TitleCfg.getTitleCfgById(replacerewardVo.id).name;
            }
            else if (replacerewardVo.type == 20) {
                this._rewardName = LanguageManager.getlocal("changebg_name_" + replacerewardVo.id);
            }
            else if (replacerewardVo.type == 24) {
                this._rewardName = LanguageManager.getlocal("emoticonName_" + replacerewardVo.id);
            }
            this._touch = newReward;
            message = "changeOtherRewardTip";
        }
        this._bg = BaseBitmap.create("public_9_bg4");
        this.addChildToContainer(this._bg);
        this._bg.width = 520;
        this._bg.height = 160;
        this._bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._bg.width / 2, this.viewBg.y + this.getContainerY() / 2);
        this._tipsInfoTxt = ComponentManager.getTextField(LanguageManager.getlocal(message, [this._rewardName]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._tipsInfoTxt.width = 500;
        this.addChildToContainer(this._tipsInfoTxt);
        this._tipsInfoTxt.setPosition(this._bg.x + 10, this._bg.y + 10);
        this._itemBg = BaseBitmap.create("public_9_bg1");
        this.addChildToContainer(this._itemBg);
        this._itemBg.width = this._bg.width - 20;
        this._itemBg.height = 110;
        this._itemBg.setPosition(this._bg.x + 10, this._tipsInfoTxt.y + this._tipsInfoTxt.height + 10);
        this._bg.height = this._itemBg.height + this._tipsInfoTxt.height + 40;
        var rewardVoList = GameData.getRewardItemIcons(this._touch, true, false, true);
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardVoDB = rewardVoList[i];
            this.addChildToContainer(rewardVoDB);
            var offestX = (this._itemBg.width - rewardVoList.length * rewardVoDB.width) / (rewardVoList.length + 1);
            rewardVoDB.setPosition(this._itemBg.x + offestX + (offestX + rewardVoDB.width) * i, this._itemBg.y + this._itemBg.height / 2 - rewardVoDB.height / 2);
        }
        // let rewardVo = GameData.getRewardItemIcons(this._touch)[0];
        // this.addChildToContainer(rewardVo);
        // rewardVo.x = this._itemBg.x + this._itemBg.width / 2 - rewardVo.width / 2;
        // rewardVo.y = this._itemBg.y + this._itemBg.height / 2 - rewardVo.height / 2;
    };
    /**添加标题 */
    CommonChangeOtherReward.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    /**设置按钮上文本的内容 */
    CommonChangeOtherReward.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    /**设置按钮的需要的图片 */
    CommonChangeOtherReward.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    /**设置整个UI的高度 */
    CommonChangeOtherReward.prototype.getShowHeight = function () {
        return 360;
    };
    CommonChangeOtherReward.prototype.dispose = function () {
        if (this._callback) {
            this._callback.apply(this._handler);
        }
        this._bg = null;
        this._itemBg = null;
        this._rewardName = null;
        this._tipsInfoTxt = null;
        this._touch = null;
        this._callback = null;
        this._handler = null;
        _super.prototype.dispose.call(this);
    };
    return CommonChangeOtherReward;
}(PopupView));
__reflect(CommonChangeOtherReward.prototype, "CommonChangeOtherReward");
//# sourceMappingURL=CommonChangeOtherReward.js.map