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
 * 用户信息api
 * author dmj
 * date 2017/9/15
 * @class PlayerVoApi
 */
var PlayerVoApi = (function (_super) {
    __extends(PlayerVoApi, _super);
    function PlayerVoApi() {
        var _this = _super.call(this) || this;
        _this.adictionTab = [3600, 7200, 10800, 12600, 14400, 16200, 18000];
        // public adictionTab:number[] = [36,72,108,126,144,162,180];
        //第几次警告 1 ～ 7
        _this.adictionWarnTimes = 0;
        _this.lastCheckTime = 0;
        return _this;
    }
    PlayerVoApi.prototype.getPlayerMaxVip = function () {
        return Config.VipCfg.getMaxLevel();
        // return 11;
    };
    // 用户id
    PlayerVoApi.prototype.getPlayerID = function () {
        if (this.playerVo) {
            return this.playerVo.uid;
        }
        return 0;
    };
    // 获取头像ID
    PlayerVoApi.prototype.getPlayePicId = function () {
        return this.playerVo.pic;
    };
    // 获取头像ID
    PlayerVoApi.prototype.getPlayerPicStr = function () {
        var pic = this.playerVo.pic;
        var titleinfo = this.playerVo.title;
        if (titleinfo && titleinfo.clothes && Config.TitleCfg.checkHasSpecialHead(titleinfo.clothes)) {
            pic = Config.TitleCfg.getSpecialHead(titleinfo.clothes, pic);
        }
        return pic;
    };
    PlayerVoApi.prototype.getPlayerCircleHeadId = function () {
        var ptitle = this.getPlayerPtitle();
        if (ptitle && ptitle.pic) {
            return ptitle.pic;
        }
        return this.playerVo.pic;
    };
    // 获取头像
    PlayerVoApi.prototype.getPlayerSmallPic = function () {
        return "smallpic" + this.playerVo.pic;
    };
    // 获取全身像
    PlayerVoApi.prototype.getPlayerBigPic = function () {
        return "bigpic" + this.playerVo.pic;
    };
    // 获取用户名称
    PlayerVoApi.prototype.getPlayerName = function () {
        return this.playerVo.name;
    };
    // 获取用户等级
    PlayerVoApi.prototype.getPlayerLevel = function () {
        return this.playerVo.level;
    };
    // 获取用户经验值
    PlayerVoApi.prototype.getPlayerExp = function () {
        // todo
        return this.playerVo.exp;
    };
    // 获取用户vip等级
    PlayerVoApi.prototype.getPlayerVipLevel = function () {
        return this.playerVo.vip;
    };
    /**
     * 获取用户下一个VIP等级
     */
    PlayerVoApi.prototype.getPlayerNextVipLevel = function () {
        var level = this.playerVo.vip + 1;
        level = Math.min(Config.VipCfg.getMaxLevel(), level);
        return level;
    };
    // 获取用户vip经验
    PlayerVoApi.prototype.getPlayerVipExp = function () {
        return this.playerVo.vipexp;
    };
    /**
     * 获取用户元宝
     */
    PlayerVoApi.prototype.getPlayerGem = function () {
        return this.playerVo.gem;
    };
    /**
     * 获取用户元宝 用亿万显示
     */
    PlayerVoApi.prototype.getPlayerGemStr = function () {
        return App.StringUtil.changeIntToText(this.playerVo.gem);
    };
    /**
     * 获取用户银两
     */
    PlayerVoApi.prototype.getPlayerGold = function () {
        return this.playerVo.gold;
    };
    /**
     * 获取用户银两(亿万显示)
     */
    PlayerVoApi.prototype.getPlayerGoldStr = function () {
        return App.StringUtil.changeIntToText(this.playerVo.gold);
    };
    // 获取用户军团id
    PlayerVoApi.prototype.getPlayerAllianceId = function () {
        return this.playerVo.mygid;
    };
    // 获取用户军团名称
    PlayerVoApi.prototype.getPlayerAllianceName = function () {
        return this.playerVo.mygname == '' ? LanguageManager.getlocal('allianceRankNoAlliance') : this.playerVo.mygname;
    };
    /**
     * 获取用户势力值
     */
    PlayerVoApi.prototype.getPlayerPower = function () {
        return this.playerVo.power;
    };
    /**
     * 获取用户势力值(亿万显示)
     */
    PlayerVoApi.prototype.getPlayerPowerStr = function () {
        return App.StringUtil.changeIntToText(this.playerVo.power);
    };
    /**
     * 获取购买元宝的数量
     */
    PlayerVoApi.prototype.getPlayerBuyGem = function () {
        return this.playerVo.buyg;
    };
    /**
     * 获取粮食
     */
    PlayerVoApi.prototype.getFood = function () {
        return this.playerVo.food;
    };
    /**
     * 获取粮食 亿万显示
     */
    PlayerVoApi.prototype.getFoodStr = function () {
        return App.StringUtil.changeIntToText(this.playerVo.food);
    };
    /**
     * 官职
     */
    PlayerVoApi.prototype.getPlayerOffice = function () {
        return this.getPlayerOfficeByLevel(this.playerVo.level);
    };
    PlayerVoApi.prototype.getPlayerOfficeByLevel = function (level) {
        return LanguageManager.getlocal("officialTitle" + level);
    };
    /**
     * 上个官职
     */
    PlayerVoApi.prototype.getPlayerPrevOffice = function () {
        if (this.playerVo.level > 1) {
            return LanguageManager.getlocal("officialTitle" + (this.playerVo.level - 1));
        }
        return LanguageManager.getlocal("officialTitle" + this.playerVo.level);
    };
    /**
     * 获取士兵
     */
    PlayerVoApi.prototype.getSoldier = function () {
        return this.playerVo.soldier;
    };
    /**
     * 获取士兵 亿万显示
     */
    PlayerVoApi.prototype.getSoldierStr = function () {
        return App.StringUtil.changeIntToText(this.playerVo.soldier);
    };
    /**
     * 获取魅力
     */
    PlayerVoApi.prototype.getCharm = function () {
        return this.playerVo.charm;
    };
    /**
     * 获取智力
     */
    PlayerVoApi.prototype.getInte = function () {
        return this.playerVo.inte;
    };
    PlayerVoApi.prototype.getRealInte = function () {
        var force1 = Api.playerVoApi.getInte();
        var force2 = 0;
        if (Api.otherInfoVoApi.isHasScene("303", "searchScene")) {
            var abilitycfg = Config.SceneCfg.getSceneCfgBySceneName("searchScene", "303").personalityCfg;
            force2 = Math.floor(force1 * abilitycfg.buffValue + 0.5);
        }
        return force1 + force2;
    };
    /**
     * 获取武力
     */
    PlayerVoApi.prototype.getAtk = function () {
        return this.playerVo.atk;
    };
    PlayerVoApi.prototype.getRealAtk = function () {
        var force1 = Api.playerVoApi.getAtk();
        var force2 = 0;
        if (Api.otherInfoVoApi.isHasScene("302", "searchScene")) {
            var abilitycfg = Config.SceneCfg.getSceneCfgBySceneName("searchScene", "302").personalityCfg;
            force2 = Math.floor(force1 * abilitycfg.buffValue + 0.5);
        }
        return force1 + force2;
    };
    /**
     * 获取政治
     */
    PlayerVoApi.prototype.getPolitics = function () {
        return this.playerVo.politics;
    };
    /**
     * 获取称号 1 称号  2 皮肤
     */
    PlayerVoApi.prototype.getTitleid = function (type) {
        if (type === void 0) { type = 1; }
        if (type == 2) {
            return this.playerVo.titleid2;
        }
        else {
            return this.playerVo.titleid;
        }
    };
    /**
     * 获取称号信息
     */
    PlayerVoApi.prototype.getTitleInfo = function () {
        return this.playerVo.title;
    };
    /**
     * 获取称号官职 1：帝 2：王 3：公 4：侯
     */
    PlayerVoApi.prototype.getTitleOfficerType = function () {
        var ot = 0;
        var t = this.getTitleid(2);
        if (t) {
            var cfg = Config.TitleCfg.getTitleCfgById(t);
            if (cfg.isTitle == 1) {
                ot = cfg.titleType;
            }
        }
        return ot;
    };
    // 获取升级所需经验
    PlayerVoApi.prototype.getNextLevelExp = function () {
        var curLevel = Api.playerVoApi.getPlayerLevel();
        if (curLevel < Config.LevelCfg.getMaxLevel()) {
            curLevel++;
        }
        return Config.LevelCfg.getCfgByLevel(curLevel.toString()).exp;
    };
    /**
     * 根据类型获取资源数量
     * @param type 类型 ItemEnums的枚举,支持key或者value
     */
    PlayerVoApi.prototype.getValueByResType = function (type) {
        if (typeof (type) != "number") {
            type = ItemEnums[type];
        }
        var num = 0;
        if (type == 1) {
            num = Api.playerVoApi.getPlayerGem();
        }
        else if (type == 2) {
            num = Api.playerVoApi.getPlayerGold();
        }
        else if (type == 3) {
            num = Api.playerVoApi.getFood();
        }
        else if (type == 4) {
            num = Api.playerVoApi.getSoldier();
        }
        else if (type == 5) {
            num = Api.playerVoApi.getPlayerExp();
        }
        return num;
    };
    PlayerVoApi.prototype.getCurLevelPrivilegeTxtStr = function (level) {
        level = level ? level : Api.playerVoApi.getPlayerLevel();
        var curLvCfg = Config.LevelCfg.getCfgByLevel(level.toString());
        if (!curLvCfg) {
            return LanguageManager.getlocal("promotionView_topLV");
        }
        var resultStr = "";
        var idx = 1;
        if (curLvCfg.servant) {
            resultStr += idx.toString() + "." + LanguageManager.getlocal("promotion_privilege6") + LanguageManager.getlocal("servant_name" + curLvCfg.servant) + "\n";
            idx += 1;
        }
        if (curLvCfg.servantSkin) {
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(curLvCfg.servantSkin);
            resultStr += idx.toString() + "." + LanguageManager.getlocal("promotion_privilege6_3") + skincfg.servantAndSkinName + "\n";
            idx += 1;
        }
        if (Api.switchVoApi.checkOpenUpgradeAddAttribute()) {
            resultStr += (idx++) + "." + LanguageManager.getlocal("promotion_privilege1_integrated") + curLvCfg.gold + "\n";
        }
        else {
            resultStr += (idx++) + "." + LanguageManager.getlocal("promotion_privilege1") + curLvCfg.gold + "\n"
                + (idx++) + "." + LanguageManager.getlocal("promotion_privilege2") + curLvCfg.food + "\n"
                + (idx++) + "." + LanguageManager.getlocal("promotion_privilege3") + curLvCfg.soldier + "\n";
        }
        resultStr +=
            // (idx++) +"."+ LanguageManager.getlocal("promotion_privilege1")+curLvCfg.gold+ "\n"
            // +(idx++) +"."+ LanguageManager.getlocal("promotion_privilege2") + curLvCfg.food + "\n"
            // +(idx++) +"."+ LanguageManager.getlocal("promotion_privilege3") + curLvCfg.soldier + "\n"
            +(idx++) + "." + LanguageManager.getlocal("promotion_privilege4") + curLvCfg.affair + "\n"
                + (idx++) + "." + LanguageManager.getlocal("promotion_privilege7", [String(curLvCfg.gem)]);
        if (Api.practiceVoApi.isPracticeOPen()) {
            var plv = this.getPlayerLevel();
            var plvcfg = GameConfig.config.practicebaseCfg.level;
            var storeLimit = GameConfig.config.practicebaseCfg.storeLimit;
            var addV = plvcfg[plv - 1];
            var addV2 = storeLimit[plv - 1];
            if (!addV) {
                addV = plvcfg[plvcfg.length - 1];
            }
            if (!addV2) {
                addV2 = storeLimit[storeLimit.length - 1];
            }
            resultStr += "\n";
            resultStr = resultStr + (idx++) + "." + LanguageManager.getlocal("promotion_privilege8") + addV
                + "\n"
                + (idx++) + "." + LanguageManager.getlocal("promotion_privilege9") + addV2;
        }
        //升级官品增加属性开关
        if (Api.switchVoApi.checkOpenUpgradeAddAttribute()) {
            resultStr += "\n" + (idx++) + "." + LanguageManager.getlocal("promotion_privilege10") + String(curLvCfg.powerAdd);
        }
        return resultStr;
    };
    /**
     * 是否启用帝位新资源
     * @param picId 官衔 pic 用户头像
     */
    PlayerVoApi.prototype.getNewPalaceRole = function (picId) {
        var tmp = [3000, 3105, 3106, 3102, 3103, 3108, 3104, 3110, 3151];
        var isnew = tmp.indexOf(Number(picId)) > -1;
        //韩国不用
        // if(PlatformManager.checkIsKRSp()){
        // 	isnew = false;
        // }
        return isnew;
    };
    /**
     * 获取用户形象（有官职的显示官职 ，通过ID判断）
     * type : 分封时传入，默认0
     * hideBody ： 是否隐藏身体形象，默认为false
     * @param picId 官衔 pic 用户头像
     */
    PlayerVoApi.prototype.getPlayerPortrait = function (picId, pic, type, hideBody, f, o, level, isHideEffect) {
        picId = Number(picId);
        var container = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        var loadIdx = 0;
        var dbNode1 = new BaseDisplayObjectContainer(); //下层可变特效
        dbNode1.name = "dbNode1";
        container.addChild(dbNode1);
        var dbNode2 = new BaseDisplayObjectContainer(); //上层可变
        dbNode2.name = "dbNode2";
        var dbNode3 = new BaseDisplayObjectContainer(); //上层不可变
        dbNode3.name = "dbNode3";
        container.addChild(dbNode3);
        var num = 0;
        var hideHead = false;
        var titleCfg = Config.TitleCfg.getTitleCfgById(picId);
        var loadComplete = function (container) {
            if (container) {
                if (container["loadusernum"] == null) {
                    container["loadusernum"] = 0;
                }
                container["loadusernum"]++;
                if (container["loadusernum"] == container["maxNum"]) {
                    var myBody_1 = container.getChildByName("myBody");
                    var myHead_1 = container.getChildByName("myHead");
                    var myHair_1 = container.getChildByName("myHair");
                    var isnew_1 = this.getNewPalaceRole(picId);
                    if (myBody_1 && myHead_1 && myHair_1) {
                        myBody_1.visible = myHead_1.visible = myHair_1.visible = true;
                        if (hideBody) {
                            myBody_1.visible = false;
                        }
                        if (hideHead) {
                            myHair_1.visible = myHead_1.visible = false;
                        }
                        if (isnew_1) {
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, myHead_1, myBody_1, [-3]);
                            myHead_1.y = 20;
                            myHair_1.x = myHead_1.x + 24;
                            myHair_1.y = myHead_1.y - 3;
                        }
                        if (o && f) {
                            f.apply(o);
                        }
                        if (titleCfg && titleCfg.titleType == 7) {
                            myBody_1.visible = true;
                            myHead_1.visible = myHair_1.visible = false;
                        }
                    }
                    //添加特效
                    var cfg = null;
                    if (!isHideEffect) {
                        if (titleCfg && level) {
                            if (titleCfg.titleType == 7) {
                                var effobj = App.CommonUtil.getHuangEffect(picId.toString(), level);
                                if (effobj["xia"]) {
                                    container.addChild(effobj["xia"]);
                                    effobj["xia"].setPosition(myBody_1.x + myBody_1.width / 2, myBody_1.y + myBody_1.height - effobj["xia"].anchorOffsetY);
                                }
                                if (effobj["hou"]) {
                                    container.addChildAt(effobj["hou"], container.getChildIndex(myBody_1) - 1);
                                    effobj["hou"].setPosition(myBody_1.x + myBody_1.width / 2, myBody_1.y + 250);
                                }
                                if (effobj["leftlight"]) {
                                    container.addChild(effobj["leftlight"]);
                                    effobj["leftlight"].setPosition(myBody_1.x + myBody_1.width / 2 - 80, myBody_1.y + 190);
                                }
                                if (effobj["rightlight"]) {
                                    container.addChild(effobj["rightlight"]);
                                    effobj["rightlight"].setPosition(myBody_1.x + myBody_1.width / 2 + 80, myBody_1.y + 190);
                                }
                                if (effobj["dimian"]) {
                                    container.addChildAt(effobj["dimian"], container.getChildIndex(myBody_1) - 1);
                                    effobj["dimian"].setPosition(myBody_1.x + myBody_1.width / 2, myBody_1.y + effobj["dimian"].height);
                                }
                                if (effobj["db1"]) {
                                    container.addChild(effobj["db1"]);
                                    effobj["db1"].setPosition(myBody_1.x + myBody_1.width / 2, myBody_1.y);
                                }
                                if (effobj["db2"]) {
                                    container.addChildAt(effobj["db2"], container.getChildIndex(myBody_1) - 1);
                                    effobj["db2"].setPosition(myBody_1.x + myBody_1.width / 2, myBody_1.y);
                                }
                            }
                            else {
                                var roleNode1 = dbNode1.getChildByName("roleNode1");
                                var roleNode2 = dbNode2.getChildByName("roleNode2");
                                if (roleNode1 && roleNode1 instanceof BaseLoadDragonBones) {
                                    roleNode1.stop();
                                    roleNode1.dispose();
                                }
                                if (roleNode2 && roleNode2 instanceof BaseLoadDragonBones) {
                                    roleNode2.stop();
                                    roleNode2.dispose();
                                }
                                dbNode1.removeChildren(); //下层可变特效
                                dbNode2.removeChildren(); //上层可变
                                dbNode3.removeChildren(); //上层不可变
                                var isdi = titleCfg.isTitle == 1 && titleCfg.titleType == 1;
                                var iswang = titleCfg.isTitle == 1 && titleCfg.titleType == 2;
                                var ishuang = titleCfg.isTitle == 1 && titleCfg.titleType == 7;
                                if (isdi) {
                                    cfg = Config.TitleupgradeCfg.diList[level - 1];
                                }
                                if (iswang) {
                                    cfg = Config.TitleupgradeCfg.wangList[level - 1];
                                }
                                if (ishuang) {
                                    cfg = Config.TitleupgradeCfg.huangList[level - 1];
                                }
                                var xialevel = 0;
                                if (cfg && cfg.shoulder) {
                                    xialevel = 1;
                                }
                                if (cfg && cfg.head) {
                                    xialevel = 2;
                                }
                                if (cfg && cfg.body) {
                                    xialevel = 3;
                                }
                                if (cfg && cfg.dragon) {
                                    xialevel = 4;
                                }
                                if (xialevel >= 1) {
                                    if (xialevel > 1) {
                                        var xiapath = "huangdi_" + xialevel + "xia";
                                        var roleNode1_1 = App.DragonBonesUtil.getLoadDragonBones(xiapath, 0, 'idle', function () {
                                            roleNode1_1.x = myBody_1.width / 2;
                                        }, this);
                                        if (xialevel == 2) {
                                            roleNode1_1.y = 160;
                                        }
                                        else if (xialevel == 3) {
                                            roleNode1_1.y = 160;
                                        }
                                        else if (xialevel == 4) {
                                            roleNode1_1.y = 180;
                                        }
                                        dbNode1.addChild(roleNode1_1);
                                        roleNode1_1.name = "roleNode1";
                                        roleNode1_1.x = 0;
                                    }
                                    var shangpath = "huangdi_" + (xialevel >= 3 ? 3 : xialevel) + "shang";
                                    if (xialevel == 1) {
                                        shangpath = "huangdi_1";
                                    }
                                    var roleNode2_1 = App.DragonBonesUtil.getLoadDragonBones(shangpath, 0, 'idle', function () {
                                        roleNode2_1.x = myBody_1.width / 2;
                                    }, this);
                                    roleNode2_1.name = "roleNode2";
                                    roleNode2_1.y = 200;
                                    dbNode2.addChild(roleNode2_1);
                                    roleNode2_1.x = 0;
                                }
                            }
                        }
                    }
                }
            }
        };
        var picStr = "user_body";
        rect.setTo(0, 0, 300, 618);
        if (picId >= 1000 || type) {
            picStr = "user_body_full_";
            rect.setTo(0, 0, 382, 618);
        }
        //新帝位资源处理
        var isnew = this.getNewPalaceRole(picId);
        if (isnew) {
            rect.setTo(0, 0, 712, 700);
        }
        container["maxNum"] = 2;
        var offsetY = 0;
        if (titleCfg && Config.TitleCfg.checkHasSpecialHead(picId)) {
            rect.width = 712;
            rect.height = 810;
            offsetY = 0;
        }
        var hairPic = "user_hair" + pic;
        if (pic <= 5 || (!ResourceManager.hasRes(hairPic))) {
            hairPic = "user_hair" + 7;
        }
        // if(pic > 5){
        var rect12 = egret.Rectangle.create();
        rect12.setTo(0, 0, 85, 140);
        var myHair = BaseLoadBitmap.create(hairPic, rect12, { callback: loadComplete, callbackThisObj: this, callbackParams: [container] });
        myHair.visible = false;
        myHair.x = 111;
        myHair.y = -3 + offsetY;
        myHair.name = "myHair";
        container.addChild(myHair);
        container["maxNum"] = 3;
        // }
        var bodystr = '';
        if (type) {
            bodystr = "promoteclothtype" + type;
        }
        else {
            bodystr = picStr + picId;
        }
        if (picId == 999999) {
            rect.width = 462;
            rect.height = 678;
        }
        if (!ResourceManager.hasRes(bodystr)) {
            bodystr += "_" + this.getUserSex(pic);
        }
        var myBody = BaseLoadBitmap.create(bodystr, rect, { callback: loadComplete, callbackThisObj: this, callbackParams: [container] });
        myBody.visible = false;
        myBody.name = "myBody";
        container.addChildAt(myBody, 2);
        container.addChild(dbNode2);
        var rect1 = egret.Rectangle.create();
        rect1.setTo(0, 0, 136, 143);
        var myHead = BaseLoadBitmap.create("user_head" + pic, rect1, { callback: loadComplete, callbackThisObj: this, callbackParams: [container] });
        myHead.visible = false;
        myHead.x = 87;
        myHead.name = "myHead";
        container.addChild(myHead);
        if (type == 7) {
            var myHap = BaseLoadBitmap.create("promoteclothtype7_1", rect12, { callback: loadComplete, callbackThisObj: this, callbackParams: [container] });
            myHap.visible = false;
            myHap.x = 111;
            myHap.y = myHair.y - 5;
            myHap.name = "myHap";
            container.addChild(myHap);
        }
        if (picId >= 1000) {
            myHead.x = 117;
            myHair.x = 141;
        }
        myBody.y = 91 + offsetY;
        if (titleCfg && Config.TitleCfg.checkHasSpecialHead(picId)) {
            myBody.y = 0;
            hideHead = true;
        }
        return container;
    };
    /**
     * 使用这个方法之前 先使用checkHasDragonBones 方法
     * 任务龙骨的形象
     */
    PlayerVoApi.prototype.getPlayerDragonBonesPortrait = function (titleId, pic) {
        titleId = Number(titleId);
        var container = new BaseDisplayObjectContainer();
        container.width = 640;
        var rect = egret.Rectangle.create();
        var num = 0;
        var tcfg = Config.TitleCfg.getTitleCfgById(titleId);
        var boneName = "palace_db_" + titleId + (tcfg.titleType == 7 ? "_" + Api.playerVoApi.getUserSex(pic) : "");
        var loadIdx = 0;
        var myBody = App.DragonBonesUtil.getLoadDragonBones(boneName, 0, "idle", function () {
            loadIdx++;
            if (loadIdx >= 2) {
                if (myBody) {
                    myBody.visible = true;
                    myBody.x = container.width / 2;
                }
                if (myHead) {
                    if (titleId != "3151") {
                        myHead.visible = true;
                    }
                    myHead.setPosition(myBody.x - myHead.width / 2, 65);
                }
                if (myHair && myHead) {
                    if (titleId != "3151") {
                        myHair.visible = true;
                    }
                    myHair.x = myHead.x + 24;
                    myHair.y = myHead.y - 3;
                }
            }
        }, this);
        myBody.setScale(1.4);
        myBody.y = 100;
        myBody.name = "myBody";
        container.addChild(myBody);
        var hairPic = "user_hair" + pic;
        if (pic <= 5 || (!ResourceManager.hasRes(hairPic))) {
            hairPic = "user_hair" + 7;
        }
        var rect12 = egret.Rectangle.create();
        rect12.setTo(0, 0, 85, 140);
        var myHair = BaseLoadBitmap.create(hairPic, rect12);
        myHair.x = 111;
        myHair.y = -3;
        myHair.name = "myHair";
        myHair.visible = false;
        container.addChild(myHair);
        var rect1 = egret.Rectangle.create();
        rect1.setTo(0, 0, 136, 143);
        var myHead = BaseLoadBitmap.create("user_head" + pic, rect1, {
            callback: function () {
                loadIdx++;
                if (loadIdx >= 2) {
                    if (myBody) {
                        myBody.visible = true;
                        myBody.x = container.width / 2;
                    }
                    if (myHead) {
                        if (titleId != "3151") {
                            myHead.visible = true;
                        }
                        myHead.setPosition(myBody.x - myHead.width / 2, 65);
                    }
                    if (myHair && myHead) {
                        if (titleId != "3151") {
                            myHair.visible = true;
                        }
                        myHair.x = myHead.x + 24;
                        myHair.y = myHead.y - 3;
                    }
                }
            }, callbackThisObj: this
        });
        myHead.width = 136;
        myHead.height = 143;
        myHead.name = "myHead";
        // myHead.setPosition(0, myBody.y - 87)
        container.addChild(myHead);
        if (loadIdx == 0) {
            myBody.visible = false;
            myHead.visible = false;
        }
        return container;
    };
    /**判断是否有龙骨 */
    PlayerVoApi.prototype.checkHasDragonBones = function (titleId) {
        var tcfg = Config.TitleCfg.getTitleCfgById(titleId);
        if (!tcfg) {
            return false;
        }
        var boneName = "palace_db_" + titleId + (tcfg.titleType == 7 ? "_1" : "") + "_ske";
        var flag = true;
        // if ((PlatformManager.checkIsKRSp())) {
        // 	flag = Config.TitleCfg.isTheKingTitleId(String(titleId));
        // }
        if (App.CommonUtil.check_dragon() && ResourceManager.hasRes(boneName) && flag) {
            return true;
        }
        return false;
    };
    /**
     * 获取用户的性别
     * 1 男 2 女
     * */
    PlayerVoApi.prototype.getUserSex = function (pic) {
        if (pic > 12) {
            var cfg = Config.TitleCfg.getTitleCfgById(pic);
            return cfg.sex;
        }
        if (pic < 6 || pic == 11) {
            return 1;
        }
        else {
            return 2;
        }
    };
    /**获取用户头像，包括头发和头 */
    PlayerVoApi.prototype.getUserHeadContainer = function (picId) {
        var headId = 0;
        if (picId) {
            headId = picId;
        }
        else {
            headId = this.getPlayePicId();
        }
        var headImgPath = this.getUserHeadImgPathById(headId);
        var hairImgPath = "user_hair" + headId;
        var hairBM = null;
        var headBM = null;
        var container = new BaseDisplayObjectContainer();
        container.width = 136;
        container.height = 143;
        hairBM = BaseLoadBitmap.create(headImgPath);
        hairBM.width = 136;
        hairBM.height = 143;
        container.addChildAt(hairBM, 10);
        if (ResourceManager.hasRes(hairImgPath)) {
            hairBM = BaseLoadBitmap.create(hairImgPath);
            hairBM.width = 85;
            hairBM.height = 140;
            hairBM.setPosition(24, 0);
            container.addChildAt(hairBM, 0);
        }
        return container;
    };
    PlayerVoApi.prototype.getMyPortrait = function () {
        var lv = this.getPlayerLevel();
        if (this.getTitleid(2) > 0) {
            lv = this.getTitleid(2);
        }
        return this.getPlayerPortrait(lv, this.getPlayePicId());
    };
    /** 获得当前用户的头像 */
    PlayerVoApi.prototype.getUserHeadImgPath = function () {
        return "user_head" + this.getPlayePicId();
    };
    PlayerVoApi.prototype.getUserCircleHeadImgPath = function () {
        return "user_head" + this.getPlayerCircleHeadId();
    };
    // 根据ID获取头像
    PlayerVoApi.prototype.getUserHeadImgPathById = function (pic) {
        return "user_head" + pic;
    };
    PlayerVoApi.prototype.getNo = function () {
        // this.playerVo.n
        // Api.playerVoApi.getTitleid()
    };
    PlayerVoApi.prototype.getPlayerPtitle = function () {
        return this.playerVo.ptitle;
    };
    //获取聊天框图片
    PlayerVoApi.prototype.getUserChatImgById = function (id) {
        return "chatbox_" + id;
    };
    // /**
    //  * 获得自己的头像
    //  */
    // public getVipHeadBg():string
    // {	
    // 	//头像的cfg
    // 	let titleCfg = Config.TitleCfg.getTitleCfg();
    // 	for (let k in titleCfg)
    // 	{
    // 		let v = titleCfg[k];
    // 		let titleVo = Api.itemVoApi.getTitleInfoVoById(Number(k));
    // 		//自己有的戴着 并且物品栏有的
    // 		if (v.isTitle==2 && titleVo.num == 2)
    // 		{
    // 			return this.getVipHeadBgByTitle(k);
    // 		}
    // 	}
    // 	//默认头像
    // 	return "head_circle_bg";
    // }
    /**
     * 设置新的头像
     * title  -1 指的是自己
     */
    // public getVipHeadBgByTitle(title:string):string
    // {	
    // 	if(title == "-1")
    // 	{
    // 		return this.getVipHeadBg();
    // 	}
    // 	else if(title && title!="0"  && title!=""){
    // 		let cfg = Config.TitleCfg.getTitleCfgById(title);
    // 		if(cfg)
    // 		{
    // 			return cfg.getHeadBgIcon();
    // 		}
    // 		else
    // 		{
    // 			console.log("缺少配置" + title);
    // 		}
    // 		// return "head_circle_bg_" + title;
    // 	}
    // 	//默认的头像框
    // 	return "head_circle_bg";
    // }
    /**
     * 获取用户圆头象
     * @param pic 用户头像id
     * @param title 用户头像框id
     * PS: title  如果是字符串 并且是包含"head_circle_bg",就直接使用这个字符串,主要处理聊天那块的逻辑，后续不要传这样的字符串，直接传头像框的id
     */
    PlayerVoApi.prototype.getPlayerCircleHead = function (pic, ptitleinfo) {
        // let container = new BaseDisplayObjectContainer();
        // let headBg = "head_circle_bg";
        // if(title == "-1"){
        // 	if (this.getVipHeadBg())
        // 	{
        // 		headBg = this.getVipHeadBg();
        // 	}
        // }
        // else if((typeof title == "string")&&title.indexOf("head_circle_bg") > -1)
        // {
        // 	headBg = title;
        // }
        // else if (title && this.getVipHeadBgByTitle(String(title))) 
        // {
        // 	headBg = this.getVipHeadBgByTitle(String(title));
        // }
        // let myBody:BaseBitmap = BaseBitmap.create(headBg);
        // myBody.name = "myBody";
        // container.addChild(myBody);
        // // myBody.setPosition(-17,-17)
        // if(this.getVipHeadBg()){
        // 	myBody.y = -3;
        if (ptitleinfo === void 0) { ptitleinfo = null; }
        // }
        // let myBody2:BaseBitmap = BaseBitmap.create("head_circle_bg2");
        // myBody2.name = "myBody2";
        // container.addChild(myBody2);
        // let rect1:egret.Rectangle=egret.Rectangle.create();
        // rect1.setTo(0,0,136,143);
        // let myHead = BaseLoadBitmap.create("user_head" + pic,rect1);
        // myHead.x = 0;
        // myHead.y = -10;
        // myHead.setScale(2/3)
        // myHead.name = "myHead";
        // container.addChild(myHead);
        // let ptitleinfo = Api.playerVoApi.getPlayerPtitle();
        var picstr = "user_head" + pic;
        var needCircle = false;
        if (ptitleinfo && ptitleinfo.pic) {
            picstr = "user_head" + ptitleinfo.pic;
            ; //"itemicon"+ptitleinfo.pic;
            needCircle = true;
        }
        var container = ComponentManager.getHeadContainer(picstr, ptitleinfo, needCircle);
        return container;
    };
    PlayerVoApi.prototype.checkIsAddictionHalve = function () {
        if (GameData.idcardSwitch == true && GameData.idcardNormal == 1 && Api.gameinfoVoApi.getRealnameRewards() == null && GameData.isShowedHomeScene == true && this.playerVo.todayolt >= this.adictionTab[2]) {
            return true;
        }
        return false;
    };
    PlayerVoApi.prototype.checkAddiction = function (isInit) {
        if (GameData.idcardSwitch == true && GameData.idcardNormal == 1 && Api.gameinfoVoApi.getRealnameRewards() == null && GameData.isShowedHomeScene == true) {
            if (App.DateUtil.checkIsToday(this.lastCheckTime) == false) {
                this.adictionWarnTimes = 0;
            }
            this.lastCheckTime = GameData.serverTime;
            var warningLevel = 0;
            while (this.playerVo.todayolt >= this.adictionTab[warningLevel]) {
                warningLevel++;
            }
            if (warningLevel > this.adictionWarnTimes || (isInit == true && warningLevel == 7)) {
                this.adictionWarnTimes = warningLevel;
                ViewController.getInstance().openView(ViewConst.POPUP.ANTIADDICTIONPOPUPVIEW, { level: warningLevel });
            }
        }
    };
    return PlayerVoApi;
}(BaseVoApi));
__reflect(PlayerVoApi.prototype, "PlayerVoApi");
//# sourceMappingURL=PlayerVoApi.js.map