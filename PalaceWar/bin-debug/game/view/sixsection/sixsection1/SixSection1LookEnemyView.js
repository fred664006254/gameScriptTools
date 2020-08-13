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
* 侦查敌情
* date 2020.
* author ycg
* @name SixSection1LookEnemyView
*/
var SixSection1LookEnemyView = (function (_super) {
    __extends(SixSection1LookEnemyView, _super);
    function SixSection1LookEnemyView() {
        return _super.call(this) || this;
    }
    SixSection1LookEnemyView.prototype.getBgName = function () {
        return "";
    };
    SixSection1LookEnemyView.prototype.getTitleStr = function () {
        return null;
    };
    SixSection1LookEnemyView.prototype.getTitleBgName = function () {
        return "";
    };
    SixSection1LookEnemyView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    SixSection1LookEnemyView.prototype.getRuleInfo = function () {
        return "";
    };
    SixSection1LookEnemyView.prototype.getProbablyInfo = function () {
        return "";
    };
    SixSection1LookEnemyView.prototype.getCloseBtnName = function () {
        if (this.uiType == "2") {
            return ButtonConst.POPUP_CLOSE_BTN_2;
        }
        return ButtonConst.POPUP_CLOSE_BTN_1;
    };
    SixSection1LookEnemyView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat().concat(list);
    };
    SixSection1LookEnemyView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        var data = this.param.data.data;
        var bg = BaseBitmap.create("sixsection1_looksuccessbg");
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2);
        this.addChildToContainer(bg);
        var successTxt = BaseBitmap.create("sixsection1_looksuccesstxt");
        successTxt.x = GameConfig.stageWidth / 2 - successTxt.width / 2;
        successTxt.y = bg.y - 20;
        this.addChildToContainer(successTxt);
        this.closeBtn.setPosition(bg.x + bg.width - 60, bg.y);
        var hudieClip = ComponentManager.getCustomMovieClip("popupviewhudie", 10);
        hudieClip.x = this.closeBtn.x - 45;
        hudieClip.y = this.closeBtn.y - 45;
        hudieClip.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(hudieClip);
        hudieClip.playWithTime();
        //title
        var title = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        title.setPosition(successTxt.x + successTxt.width / 2 - title.width / 2, successTxt.y + successTxt.height + 15);
        this.addChildToContainer(title);
        //门客
        var servantList = data.sids;
        var scale = 0.5;
        for (var i = 0; i < 5; i++) {
            var cardBgImg = "servant_cardbg_0";
            var iconImg = null;
            var cfg = null;
            if (servantList[i]) {
                cfg = Config.ServantCfg.getServantItemById(servantList[i]);
                cardBgImg = "servant_cardbg_" + data.clvs[i];
                iconImg = cfg.halfIcon;
                if (data.equips && data.equips[i]) {
                    var skinCfg = Config.ServantskinCfg.getServantSkinItemById(data.equips[i]);
                    iconImg = skinCfg.icon;
                }
            }
            var iconBgBt = BaseLoadBitmap.create(cardBgImg);
            iconBgBt.width = 194;
            iconBgBt.height = 192;
            iconBgBt.setScale(scale);
            iconBgBt.setPosition(bg.x + 50 + i * (iconBgBt.width * scale + 5), title.y + title.height + 20);
            this.addChildToContainer(iconBgBt);
            if (iconImg) {
                var iconBt = BaseLoadBitmap.create(iconImg);
                iconBt.width = 180;
                iconBt.height = 177;
                iconBt.setScale(scale);
                iconBt.setPosition(iconBgBt.x + iconBgBt.width / 2 * scale - iconBt.width / 2 * scale, iconBgBt.y + iconBgBt.height / 2 * scale - iconBt.height / 2 * scale);
                this.addChildToContainer(iconBt);
            }
        }
        //总资质
        // let talent = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTalent", [""+data.totAbility]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // talent.setPosition(bg.x + 150, bg.y + 260);
        // this.addChildToContainer(talent);
        // //总属性
        // let totalAttr = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTotalAttr", [""+data.totAttr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // totalAttr.setPosition(bg.x + bg.width/2 + 50, talent.y);
        // this.addChildToContainer(totalAttr);
        //确定
        var enterBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "confirmBtn", this.hide, this);
        enterBtn.setPosition(GameConfig.stageWidth / 2 - enterBtn.width / 2, bg.y + bg.height - 8);
        this.addChildToContainer(enterBtn);
    };
    SixSection1LookEnemyView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        _super.prototype.dispose.call(this);
    };
    return SixSection1LookEnemyView;
}(CommonView));
__reflect(SixSection1LookEnemyView.prototype, "SixSection1LookEnemyView");
//# sourceMappingURL=SixSection1LookEnemyView.js.map