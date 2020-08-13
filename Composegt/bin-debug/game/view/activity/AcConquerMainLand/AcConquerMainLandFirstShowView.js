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
 * author:qianjun
 * desc:定军中原城市抢夺
*/
var AcConquerMainLandFirstShowView = (function (_super) {
    __extends(AcConquerMainLandFirstShowView, _super);
    function AcConquerMainLandFirstShowView() {
        return _super.call(this) || this;
    }
    AcConquerMainLandFirstShowView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcConquerMainLandFirstShowView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandFirstShowView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandFirstShowView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandFirstShowView.prototype, "aid", {
        get: function () {
            return AcConst.AID_CONQUERMAINLAND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandFirstShowView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandFirstShowView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "mainland_show_title-" + code,
            "mainland_show_tip-" + code,
            "mainland_show_bg-" + code
        ]);
    };
    AcConquerMainLandFirstShowView.prototype.getTitleBgName = function () {
        return '';
    };
    AcConquerMainLandFirstShowView.prototype.getTitleStr = function () {
        return '';
    };
    AcConquerMainLandFirstShowView.prototype.getCloseBtnName = function () {
        return '';
    };
    AcConquerMainLandFirstShowView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcConquerMainLandFirstShowView.prototype.getBgName = function () {
        return '';
    };
    AcConquerMainLandFirstShowView.prototype.initView = function () {
        var code = this.code;
        var bg = BaseBitmap.create("public_9_black");
        var titleId = this.cfg.mainReward;
        //titleId = 3106;
        bg.alpha = 0.8;
        bg.width = GameConfig.stageWidth;
        bg.height = GameConfig.stageHeigth;
        this.addChild(bg);
        var huobg = BaseBitmap.create("mainland_show_bg-" + code);
        huobg.y = bg.height / 2 - huobg.height / 2;
        this.addChild(huobg);
        var title = BaseBitmap.create("mainland_show_title-" + code);
        title.setPosition(bg.x + bg.width / 2 - title.width / 2, huobg.y + 20);
        this.addChild(title);
        var titleStr = Config.TitleCfg.getTitleIcon3WithLv(titleId);
        var officerImg = BaseLoadBitmap.create(titleStr);
        officerImg.width = 186;
        officerImg.height = 42;
        officerImg.setPosition(title.x - 10, title.y + title.height + 30);
        this.addChild(officerImg);
        var roleNode = undefined;
        var resPath = "palace_db_" + titleId;
        if (App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske")) {
            roleNode = App.DragonBonesUtil.getLoadDragonBones(resPath, 0, "idle");
            roleNode.y = huobg.y + 240;
            this.addChild(roleNode);
            roleNode.setScale(1.1);
            var myHead = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPath());
            myHead.name = "myHead";
            myHead.setScale(0.75);
            this.addChild(myHead);
            roleNode.x = this.width / 2 - roleNode.width / 2;
            myHead.setPosition(roleNode.x - 47, roleNode.y - 34);
        }
        else {
            roleNode = Api.playerVoApi.getPlayerPortrait(titleId, 1);
            roleNode.setScale(0.8);
            roleNode.x = 170;
            roleNode.y = huobg.y + 170;
            this.addChild(roleNode);
        }
        var tip = BaseBitmap.create("mainland_show_tip-" + code);
        tip.setPosition(bg.x + bg.width / 2 - tip.width / 2, huobg.y + huobg.height - tip.height + 10);
        this.addChild(tip);
    };
    AcConquerMainLandFirstShowView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandFirstShowView;
}(CommonView));
__reflect(AcConquerMainLandFirstShowView.prototype, "AcConquerMainLandFirstShowView");
