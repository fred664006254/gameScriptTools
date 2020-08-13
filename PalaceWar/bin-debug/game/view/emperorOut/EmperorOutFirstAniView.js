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
 * 明君出巡 动画展示
 * date 2019.12.14
 * author ycg
 * @calss EmperorOutFirstAniView
 */
var EmperorOutFirstAniView = (function (_super) {
    __extends(EmperorOutFirstAniView, _super);
    function EmperorOutFirstAniView() {
        var _this = _super.call(this) || this;
        _this._showData = null;
        return _this;
    }
    EmperorOutFirstAniView.prototype.getRequestData = function () {
        // this.request(NetRequestConst.REQUEST_EMPERORACHIEVE_GETOUTING_INFO, {fuid: this.param.data.uid});
        return { requestType: NetRequestConst.REQUEST_EMPERORACHIEVE_SHOW_NOTICE, requestData: null };
    };
    EmperorOutFirstAniView.prototype.receiveData = function (data) {
        if (data && data.ret) {
            if (data.data.cmd == NetRequestConst.REQUEST_EMPERORACHIEVE_SHOW_NOTICE) {
                Api.emperorAchieveVoApi.setShowAni(true);
            }
            else if (data.data.cmd == NetRequestConst.REQUEST_EMPERORACHIEVE_GETOUTING_INFO) {
                this._showData = Api.emperorAchieveVoApi.getOutDataByuid(this.param.data.uid);
            }
        }
    };
    EmperorOutFirstAniView.prototype.initView = function () {
        var _this = this;
        App.LogUtil.log("EmperorOutFirstAniView initview");
        this._showData = Api.emperorAchieveVoApi.getOutDataByuid(this.param.data.uid);
        var title = BaseBitmap.create("emperorout_showani_titlebg"); //122
        title.setPosition(GameConfig.stageWidth / 2 - title.width / 2 + 30, 20);
        var role = this.getRoleContainer(this._showData, 1.4);
        role.setPosition(-20, title.y + title.height + 10);
        this.addChildToContainer(role);
        role.visible = false;
        var scrollAni = ComponentManager.getCustomMovieClip("emeprorout_showani_effect", 12, 70); //282
        scrollAni.setPosition(10, role.y + role.height - 282 + 30);
        if (scrollAni.y + 282 - 50 > GameConfig.stageHeigth) {
            App.LogUtil.log("max********");
            scrollAni.y = GameConfig.stageHeigth - 282 - 30;
        }
        else {
            var offY = GameConfig.stageHeigth - scrollAni.y - 282;
            if (offY > 50) {
                title.y = title.y + offY / 2;
                role.y = title.y + title.height + 10;
                scrollAni.y = scrollAni.y + offY / 2;
            }
        }
        this.addChildToContainer(scrollAni);
        scrollAni.playWithTime(1);
        this.addChildToContainer(title);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutFirstAniViewTip", [this._showData.data.name]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        tip.lineSpacing = 8;
        tip.textAlign = TextFieldConst.ALIGH_CENTER;
        tip.anchorOffsetX = tip.width / 2;
        tip.setPosition(GameConfig.stageWidth / 2, scrollAni.y + 141 - tip.height / 2);
        this.addChildToContainer(tip);
        tip.visible = false;
        var view = this;
        scrollAni.setEndCallBack(function () {
            App.LogUtil.log("aaaa firstani");
            tip.visible = true;
            role.visible = true;
            _this._maskBmp.addTouchTap(view.hide, view);
            egret.Tween.get(view).wait(3000).call(function () {
                view.hide();
            }, view);
        }, view);
    };
    EmperorOutFirstAniView.prototype.getRoleContainer = function (roleData, roleScale) {
        var data = roleData.data;
        var titleData = App.CommonUtil.getTitleData(data.title);
        var curLevel = titleData.clv;
        var titleCfg = Config.TitleCfg;
        var titleconfig = null;
        var curTitleId = null;
        if (titleData.clothes) {
            titleconfig = titleCfg.getTitleCfgById(titleData.clothes);
            curTitleId = titleData.clothes;
        }
        if (titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7)) {
            curTitleId = titleData.clothes;
            curLevel = titleData.tlv;
            if (curLevel == 0) {
                curLevel = 1;
            }
        }
        var userContainer = null;
        App.LogUtil.log("EmperorOutFirstAniView:curTitleId " + curTitleId);
        if (curTitleId) {
            // userContainer.x = posX;
            // userContainer.y = 20;
            userContainer = new BaseDisplayObjectContainer();
            userContainer.name = "userContainer";
            this.addChildToContainer(userContainer);
            var role = null;
            var tcfg = Config.TitleCfg.getTitleCfgById(curTitleId);
            var resPath = "palace_db_" + curTitleId + (tcfg.titleType == 7 ? "_" + Api.playerVoApi.getUserSex(data.pic) : "");
            if ((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && ResourceManager.hasRes(resPath + "_ske")) {
                App.LogUtil.log("aaa dragonbone ");
                role = App.CommonUtil.getPlayerDragonRole(curTitleId, data.pic, curLevel);
                role.x = 340; //w432, h508
                role.y = 35;
                userContainer.addChild(role);
                role.name = 'role';
                userContainer.height = 790;
            }
            else {
                role = Api.playerVoApi.getPlayerPortrait(Number(curTitleId), data.pic);
                role.y = -30;
                var isnew = Api.playerVoApi.getNewPalaceRole(curTitleId);
                if (isnew) {
                    role.x = 0;
                }
                else {
                    role.x = 155;
                }
                userContainer.addChild(role);
                userContainer.height = 765;
            }
        }
        else {
            userContainer = new BaseDisplayObjectContainer();
            var role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic, 0, false, null, null, curLevel);
            role.width = 300;
            role.y = -30;
            role.x = 190;
            userContainer.name = "userContainer";
            userContainer.addChild(role);
            userContainer.height = 765;
        }
        return userContainer;
    };
    EmperorOutFirstAniView.prototype.getTitleStr = function () {
        return null;
    };
    EmperorOutFirstAniView.prototype.getTitleBgName = function () {
        return "";
    };
    EmperorOutFirstAniView.prototype.getBgName = function () {
        return "";
    };
    // protected getShowWidth():number{
    // 	return GameConfig.stageWidth;
    // }
    // protected getShowHeight():number{
    // 	return GameConfig.stageHeigth;
    // }
    EmperorOutFirstAniView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    EmperorOutFirstAniView.prototype.getRuleInfo = function () {
        return "";
    };
    EmperorOutFirstAniView.prototype.getCloseBtnName = function () {
        return null;
    };
    EmperorOutFirstAniView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "emperorout_showani_titlebg", "emeprorout_showani_effect",
        ]);
    };
    EmperorOutFirstAniView.prototype.dispose = function () {
        this._showData = null;
        _super.prototype.dispose.call(this);
    };
    return EmperorOutFirstAniView;
}(BaseView));
__reflect(EmperorOutFirstAniView.prototype, "EmperorOutFirstAniView");
//# sourceMappingURL=EmperorOutFirstAniView.js.map