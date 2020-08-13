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
 * 新官上任阶段奖励预览
 * @author 赵占涛
 */
var LoginWeekBoxDetailView = (function (_super) {
    __extends(LoginWeekBoxDetailView, _super);
    function LoginWeekBoxDetailView() {
        return _super.call(this) || this;
    }
    LoginWeekBoxDetailView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 538;
        bg.height = 835;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        this._nodeContainer.addChild(bg);
        var tmpy = 25;
        for (var i = 0; i < 4; i++) {
            var cfg = GameConfig.config.loginweekCfg.totalScoreReward[i + 1];
            var rewardsArr = GameData.formatRewardItem(cfg.reward);
            var reward = rewardsArr[0];
            // 背景
            var cellbg = BaseBitmap.create(reward.type == 8 ? "loginweek_boxdetailbg" : "loginweek_boxdetail2bg");
            cellbg.x = this.viewBg.x + this.viewBg.width / 2 - cellbg.width / 2;
            cellbg.y = tmpy;
            tmpy += (cellbg.height + 5);
            this._nodeContainer.addChild(cellbg);
            // 标题
            var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("loginweek_setp", [LanguageManager.getlocal("acChristmasViewFloor" + (i + 1))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleTxt.x = cellbg.x + cellbg.width / 2 - titleTxt.width / 2;
            titleTxt.y = cellbg.y + 16 - titleTxt.height / 2;
            this._nodeContainer.addChild(titleTxt);
            if (reward.type == 8) {
                // 门客形象
                var servantIcon = BaseLoadBitmap.create("servant_full_" + reward.id);
                servantIcon.scaleX = 0.4;
                servantIcon.scaleY = 0.4;
                servantIcon.x = cellbg.x - 15;
                servantIcon.y = cellbg.y + 28;
                this._nodeContainer.addChild(servantIcon);
                // 名称
                var servantName = ComponentManager.getTextField(reward.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
                servantName.x = cellbg.x + 20;
                servantName.y = cellbg.y + 48 - servantName.height / 2;
                this._nodeContainer.addChild(servantName);
                // 综合资质
                var servantCfg = Config.ServantCfg.getServantItemById(reward.id);
                var starNum = Config.ServantCfg.getServantItemById(reward.id).getStarNums();
                var str = LanguageManager.getlocal("servantInfo_title", [String(starNum)]);
                var totalTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
                totalTxt.x = cellbg.x + 103 - totalTxt.width / 2;
                totalTxt.y = cellbg.y + 196 - totalTxt.height / 2;
                this._nodeContainer.addChild(totalTxt);
                // 特殊光环文字
                var light_txt = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeoplea_light"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
                light_txt.x = cellbg.x + 355 - light_txt.width / 2;
                light_txt.y = cellbg.y + 62 - light_txt.height / 2;
                ;
                this._nodeContainer.addChild(light_txt);
                // 光环1
                var aura1Name = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeoplea_force2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
                aura1Name.x = cellbg.x + 219;
                aura1Name.y = cellbg.y + 97 - aura1Name.height / 2;
                this._nodeContainer.addChild(aura1Name);
                // 光环2
                var aura2Name = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeoplea_attribute2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
                aura2Name.x = cellbg.x + 219;
                aura2Name.y = cellbg.y + 125 - aura2Name.height / 2;
                this._nodeContainer.addChild(aura2Name);
            }
            else if (reward.type == 6) {
                // 图标
                var iconList = GameData.getRewardItemIcons(cfg.reward, true);
                var icon = iconList[0];
                icon.x = cellbg.x + 103 - icon.width / 2;
                icon.y = cellbg.y + 96 - icon.height / 2;
                this._nodeContainer.addChild(icon);
                // 名称
                var itemName = ComponentManager.getTextField(reward.name + "x" + reward.num, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
                itemName.x = cellbg.x + 219;
                itemName.y = cellbg.y + 55 - itemName.height / 2;
                this._nodeContainer.addChild(itemName);
                // 描述
                var itemDesc = ComponentManager.getTextField(reward.desc, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
                itemDesc.width = 280;
                itemDesc.x = cellbg.x + 219;
                itemDesc.y = cellbg.y + 73;
                this._nodeContainer.addChild(itemDesc);
            }
            // 领取条件
            var howToGet = ComponentManager.getTextField(LanguageManager.getlocal("loginweek_howtoget", [String(cfg.needScore)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            howToGet.x = cellbg.x + 219;
            howToGet.y = cellbg.y + cellbg.height - 27 - howToGet.height / 2;
            this._nodeContainer.addChild(howToGet);
            if (Api.otherInfoVoApi.getLoginWeekSinfo()[i + 1] == 1) {
                //	已领取 
                var collectflag = BaseBitmap.create("collectflag");
                collectflag.x = cellbg.x + 458 - collectflag.width / 2;
                collectflag.y = cellbg.y + cellbg.height - 42 - collectflag.height / 2;
                this._nodeContainer.addChild(collectflag);
            }
        }
    };
    LoginWeekBoxDetailView.prototype.getShowHeight = function () {
        return 935;
    };
    LoginWeekBoxDetailView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    LoginWeekBoxDetailView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return LoginWeekBoxDetailView;
}(PopupView));
__reflect(LoginWeekBoxDetailView.prototype, "LoginWeekBoxDetailView");
