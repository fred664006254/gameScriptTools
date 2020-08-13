/**
 * author yanyuling
 * @class PalaceEmperorLvupView
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
var PalaceEmperorLvupView = (function (_super) {
    __extends(PalaceEmperorLvupView, _super);
    function PalaceEmperorLvupView() {
        return _super.call(this) || this;
    }
    // 标题背景名称
    PalaceEmperorLvupView.prototype.getTitleStr = function () {
        return "";
    };
    PalaceEmperorLvupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._curTitleId = this.param.data.titleId;
        var roleinfo = Api.palaceVoApi.getRoleInfoByTitleId(this._curTitleId);
        var titlecfg = Config.TitleCfg.getTitleCfgById(this._curTitleId);
        var nameBg = BaseBitmap.create("palace_titlebg3");
        nameBg.x = GameConfig.stageWidth / 2 - nameBg.width / 2;
        nameBg.y = 30; // GameConfig.stageHeigth -  110;
        this._nodeContainer.addChild(nameBg);
        var titlepath = Config.TitleCfg.getTitleIcon3WithLv(this._curTitleId, roleinfo ? roleinfo.titlelv : null);
        var officerImg = BaseLoadBitmap.create(titlepath);
        var deltaV = 0.8;
        officerImg.width = 186 * deltaV;
        officerImg.height = 42 * deltaV;
        officerImg.x = nameBg.x + nameBg.width / 2 - officerImg.width / 2;
        officerImg.y = nameBg.y + nameBg.height / 2 - officerImg.height / 2;
        this._nodeContainer.addChild(officerImg);
        var roleNode = undefined;
        if ((Config.TitleCfg.isTheKingTitleId(this._curTitleId) && roleinfo.uid != "") || (roleinfo instanceof PalaceRoleInfoVo && roleinfo.uid > 0)) {
            var resPath = "palace_db_" + this._curTitleId;
            var _loadNum_1 = 0;
            var _maxLoadNum_1 = 2;
            if (App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske")) {
                var myHead_1 = undefined;
                var loadComplete = function (container) {
                    _loadNum_1++;
                    if (_loadNum_1 == _maxLoadNum_1) {
                        if (roleNode) {
                            roleNode.visible = true;
                        }
                        if (myHead_1) {
                            myHead_1.visible = true;
                        }
                    }
                };
                roleNode = App.DragonBonesUtil.getLoadDragonBones(resPath, 0, "idle", loadComplete, this);
                roleNode.setScale(1.4);
                roleNode.y = nameBg.y + 140;
                this._nodeContainer.addChild(roleNode);
                var rect1 = egret.Rectangle.create();
                rect1.setTo(0, 0, 136, 143);
                myHead_1 = BaseLoadBitmap.create("user_head" + roleinfo.pic, rect1, { callback: loadComplete, callbackThisObj: this });
                myHead_1.visible = false;
                myHead_1.width = 136 * 0.92;
                myHead_1.height = 143 * 0.92;
                myHead_1.name = "myHead";
                myHead_1.visible = false;
                myHead_1.x = GameConfig.stageWidth / 2 - myHead_1.width / 2;
                myHead_1.y = roleNode.y - 37 + 6;
                this._nodeContainer.addChild(myHead_1);
                roleNode.x = GameConfig.stageWidth / 2;
            }
            else {
                roleNode = Api.playerVoApi.getPlayerPortrait(Number(roleinfo.titleId), roleinfo.pic);
                this._nodeContainer.addChild(roleNode);
                if (Config.TitleCfg.isTheKingTitleId(this._curTitleId)) {
                    var rect12 = egret.Rectangle.create();
                    rect12.setTo(0, 0, 712, 668);
                    var myBody = roleNode.getChildByName("myBody");
                    myBody.setload("user_body_full_3201_2", rect12);
                    myBody.width = 712;
                    myBody.height = 668;
                    myBody.visible = true;
                    var myHead = roleNode.getChildByName("myHead");
                    myHead.setScale(0.92);
                    myHead.x = 356 - 70 + 4;
                    myHead.y = 10;
                    myHead.visible = true;
                }
                roleNode.y = nameBg.y + 83;
                roleNode.x = GameConfig.stageWidth / 2 - 185;
                if ((Number(this._curTitleId) >= 3101 && Number(this._curTitleId) <= 3108)) {
                    // roleNode.x =  GameConfig.stageWidth/2 - roleNode.width/2+165;
                    roleNode.x = GameConfig.stageWidth / 2 - 185;
                }
                else {
                    roleNode.x = GameConfig.stageWidth / 2 - roleNode.width / 2;
                }
            }
            roleNode.name = "roleNode";
        }
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        confirmBtn.x = GameConfig.stageWidth / 2 - confirmBtn.width / 2;
        confirmBtn.y = GameConfig.stageHeigth - this.container.y - confirmBtn.height - 20;
        this._nodeContainer.addChild(confirmBtn);
        var palace_titlebg7 = BaseBitmap.create("palace_titlebg5");
        palace_titlebg7.x = GameConfig.stageWidth / 2 - palace_titlebg7.width / 2;
        palace_titlebg7.y = confirmBtn.y - palace_titlebg7.height - 10;
        this._nodeContainer.addChild(palace_titlebg7);
        var palace_title_txt2 = BaseBitmap.create("palace_title_txt3");
        palace_title_txt2.x = GameConfig.stageWidth / 2 - palace_title_txt2.width / 2;
        palace_title_txt2.y = palace_titlebg7.y + 30;
        this._nodeContainer.addChild(palace_title_txt2);
        var palace_title_txt3 = BaseBitmap.create("palace_title_txt1");
        palace_title_txt3.x = GameConfig.stageWidth / 2 - palace_title_txt2.width / 2 - 30;
        palace_title_txt3.y = palace_title_txt2.y + palace_title_txt2.height - 5;
        this._nodeContainer.addChild(palace_title_txt3);
        var str1 = LanguageManager.getlocal("palace_titleName" + this.param.data.titleId);
        var txt = ComponentManager.getTextField(str1, 30, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.x = palace_title_txt3.x - txt.width - 5;
        txt.y = palace_title_txt3.y + 15;
        this._nodeContainer.addChild(txt);
        var titleinfo = Api.itemVoApi.getTitleInfoVoById(Number(this._curTitleId));
        var lv = titleinfo.lv;
        var txt2 = ComponentManager.getTextField("" + lv, 30, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt2.x = palace_title_txt3.x + palace_title_txt3.width - 80 - txt2.width / 2;
        txt2.y = txt.y;
        this._nodeContainer.addChild(txt2);
        if (PlatformManager.checkIsViSp()) {
            txt.y += 5;
            palace_title_txt3.x = GameConfig.stageWidth / 2 - palace_title_txt2.width / 2 + 50;
            txt.x = palace_title_txt3.x - txt.width - 5;
            txt2.size = 40;
            txt2.x = palace_title_txt3.x + palace_title_txt3.width + 5;
        }
        else if (PlatformManager.checkIsJPSp()) {
            txt.y += 5;
            palace_title_txt3.x = GameConfig.stageWidth / 2 - palace_title_txt2.width / 2 + 70;
            txt.x = palace_title_txt3.x - txt.width - 5;
            txt2.size = 40;
            txt2.x = palace_title_txt3.x + 105;
        }
        else if (PlatformManager.checkIsKRSp() || PlatformManager.checkIsKRNewSp()) {
            txt.y += 5;
            palace_title_txt3.x = palace_title_txt2.x + 100;
            txt.x = palace_title_txt3.x - txt.width - 5;
            txt2.size = 40;
            txt2.x = palace_title_txt3.x + 65;
        }
        this.addTouchTap(this.hide, this);
    };
    PalaceEmperorLvupView.prototype.getRequestData = function () {
        if (!Api.palaceVoApi.isDataInit() || !Api.palaceVoApi.getRoleInfoByTitleId(this.param.data.titleId)) {
            return { requestType: NetRequestConst.REQUEST_PALACE_GETCROSSPALACE, requestData: {} };
        }
    };
    PalaceEmperorLvupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "palace_title_txt1",
            "palace_title_txt2",
            "palace_title_txt3",
            "palace_titlebg3",
            "palace_titlebg5",
        ]);
    };
    PalaceEmperorLvupView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._curTitleId = null;
        _super.prototype.dispose.call(this);
    };
    return PalaceEmperorLvupView;
}(BaseView));
__reflect(PalaceEmperorLvupView.prototype, "PalaceEmperorLvupView");
