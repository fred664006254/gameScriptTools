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
  * 赵云物品展示
  * author 张朝阳
  * date 2018/7/10
  * @class AcMazeRewardPopupView
  */
var AcMazeRewardPopupView = (function (_super) {
    __extends(AcMazeRewardPopupView, _super);
    function AcMazeRewardPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcMazeRewardPopupView.prototype, "cfg", {
        /**
         * 配置文件数据
         */
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMazeRewardPopupView.prototype, "vo", {
        /**
         * 服务器返回数据
         */
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcMazeRewardPopupView.prototype.initView = function () {
        var type = this.param.data.type;
        var pool = this.vo.getMazePool()[type];
        var rewardPool = this.cfg.typePool(pool);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 518;
        bg.height = 350;
        bg.setPosition(this.getShowWidth() / 2 - bg.width / 2, 10);
        this.addChildToContainer(bg);
        var detailTF = ComponentManager.getTextField(LanguageManager.getlocal("AcMazeViewRewardDetailTitle"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        detailTF.setPosition(bg.x + bg.width / 2 - detailTF.width / 2, bg.y + 20);
        this.addChildToContainer(detailTF);
        var itembg = BaseBitmap.create("public_9_bg44");
        itembg.width = 492;
        itembg.height = 257;
        itembg.setPosition(detailTF.x + detailTF.width / 2 - itembg.width / 2, detailTF.y + detailTF.height + 20);
        this.addChildToContainer(itembg);
        for (var i = 0; i < rewardPool.length; i++) {
            var rewardVo = GameData.formatRewardItem(rewardPool[i][0])[0];
            var rewardItem = GameData.getItemIcon(rewardVo, true, true);
            // rewardItem.anchorOffsetX = rewardItem.width / 2;
            rewardItem.anchorOffsetY = rewardItem.height / 2;
            rewardItem.setPosition(itembg.x + itembg.width / 2 + (((i % 4) - 2) * ((rewardItem.width + 10))) + 5, itembg.y + Math.floor(i / 4) * (rewardItem.height + 22) + rewardItem.height / 2 + 10);
            this.addChildToContainer(rewardItem);
        }
        this.setConfirmBtnPosition(this.getShowWidth() / 2 - 75, this.viewBg.height - this.getContainerY() - 55 - 1150);
    };
    AcMazeRewardPopupView.prototype.getTitleStr = function () {
        return "atkracecrossDetailTitle";
    };
    AcMazeRewardPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    AcMazeRewardPopupView.prototype.getShowHeight = function () {
        return 498;
    };
    // 确认按钮名称
    AcMazeRewardPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    AcMazeRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMazeRewardPopupView;
}(PopupView));
__reflect(AcMazeRewardPopupView.prototype, "AcMazeRewardPopupView");
//# sourceMappingURL=AcMazeRewardPopupView.js.map