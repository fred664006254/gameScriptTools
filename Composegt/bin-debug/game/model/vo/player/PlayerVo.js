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
 * 用户信息
 * author dmj
 * date 2017/9/16
 * @class PlayerVo
 */
var PlayerVo = (function (_super) {
    __extends(PlayerVo, _super);
    function PlayerVo() {
        var _this = _super.call(this) || this;
        // 用户游戏ID
        _this.uid = 0;
        // 用户头像
        _this.pic = 0;
        // 用户名称
        _this.name = "";
        // 等级/官职
        _this.level = 0;
        // 小等级/
        _this.minlevel = 0;
        // 经验/政绩
        _this.exp = 0;
        // VIP等级
        _this.vip = 0;
        // VIP经验
        _this.vipexp = 0;
        // 钻石/元宝
        _this.gem = 0;
        // 银两
        _this.gold = 0;
        // 军团ID
        _this.mygid = 0;
        // 军团名称
        _this.mygname = "";
        // 势力值
        _this.power = 0;
        // 购买元宝数量
        _this.buyg = 0;
        // 最户购买元宝时间
        _this.buyt = 0;
        // 免费获得元宝
        _this.freeg = 0;
        // 总共消耗元宝
        _this.tcost = 0;
        // 最后在线时间
        _this.olt = 0;
        // 数据上次更新时间
        _this.updated_at = 0;
        //魅力
        _this.charm = 0;
        //智力
        _this.inte = 0;
        //武力
        _this.atk = 0;
        // 政治
        _this.politics = 0;
        // 粮食
        _this.food = 0;
        _this.soldier = 0;
        // 称号
        _this.titleid = 0;
        //今日在线时长
        _this.todayolt = 0;
        //消耗元宝数量
        _this.usegems = 0;
        _this.flogincmdst = undefined; //首次登陆服务器时间戳；
        //小官职id 和配置id对应
        _this.minlevelid = 0;
        return _this;
    }
    PlayerVo.prototype.initData = function (data) {
        if (data) {
            if (data.buyg != this.buyg || data.level != this.level) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_STORAGE);
            }
            var refreshArr = this.checkRefreshUI(data);
            if (data.uid != null) {
                this.uid = Number(data.uid);
            }
            if (data.minlevel != null) {
                this.minlevel = Number(data.minlevel);
            }
            if (data.pic != null) {
                this.pic = Number(data.pic);
            }
            if (data.name != null) {
                this.name = String(data.name);
            }
            if (data.level != null) {
                var curLevel = this.level;
                this.level = Number(data.level);
                // this.level = 3; // test code
                //酒楼分阶段引导
                // let ucLockLevel = Config.DinnerCfg.getNeedLv();
                // if(curLevel != this.level && this.level == ucLockLevel && curLevel == ucLockLevel - 1){
                // 	Api.rookieVoApi.curGuideKey = "dinner";
                // 	Api.rookieVoApi.insertWaitingGuide({"idx":"dinner_1"},true);
                // }
                //升级统计
                if (curLevel != this.level && curLevel != 0) {
                    PlatformManager.analyticsLevelup();
                    if (PlatformManager.isShowNewAnalytics()) {
                        if (curLevel == 2) {
                            PlatformManager.analyticsNineGrade();
                        }
                        else if (curLevel == 3) {
                            PlatformManager.analyticsEightGrade();
                        }
                        else if (curLevel == 4) {
                            PlatformManager.analyticsReachEight();
                        }
                    }
                }
            }
            if (data.exp != null) {
                this.exp = Number(data.exp);
            }
            if (data.vip != null) {
                var curVip = this.vip;
                this.vip = Number(data.vip);
                if (this.vip != curVip) {
                    PlatformManager.analytics37Point("custom_money_change", "vip_level", this.vip);
                }
                if (this.vip != curVip && this.vip == 1) {
                    PlatformManager.analytics37JPPoint("custom_money_change", "vip_level1", 1);
                }
            }
            if (data.vipexp != null) {
                this.vipexp = Number(data.vipexp);
            }
            if (data.gem != null) {
                var curGem = this.gem;
                this.gem = Number(data.gem);
                var curCmd = NetManager.curReceiveCmd;
                var dis = Math.abs(this.gem - curGem);
                if (this.gem - curGem > 0) {
                    if (curCmd == NetPushConst.PUSH_PAY) {
                        PlatformManager.analytics37Point("custom_money_change", "goldingot_get", dis);
                        PlatformManager.analytics37JPPoint("custom_money_change", "goldingot_pay_get", dis);
                    }
                    else {
                        PlatformManager.analytics37Point("custom_money_change", "goldingot_get_free", dis);
                        PlatformManager.analytics37JPPoint("custom_money_change", "goldingot_active_get", dis);
                    }
                }
                else if (this.gem - curGem < 0) {
                    // let dis = this.gem - curGem;
                    PlatformManager.analytics37Point("custom_money_change", "goldingot_cost", dis);
                    PlatformManager.analytics37JPPoint("custom_money_change", "goldingot_cost", dis);
                    if (curCmd == NetRequestConst.REQUEST_SHOP_BUY_ITEM) {
                        PlatformManager.analytics37JPPoint("custom_money_change", "goldingot_resource_cost", dis);
                    }
                }
            }
            if (data.gold != null) {
                this.gold = Number(data.gold);
            }
            if (data.mygid != null) {
                this.mygid = Number(data.mygid);
            }
            if (data.mygname != null) {
                this.mygname = String(data.mygname);
            }
            if (data.power != null) {
                var curPower = this.power;
                this.power = Number(data.power);
                var curCmd = NetManager.curReceiveCmd;
                if (curPower != 0 && this.power - curPower > 0 && curCmd != NetRequestConst.REQUEST_WIFE_LOVE && curCmd != NetRequestConst.REQUEST_WIFE_CALL && curCmd.indexOf("push.") !== 1) {
                    var dis = this.power - curPower;
                    var pos = egret.Point.create(320, GameConfig.stageHeigth / 2);
                    // App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);	
                    var powerFly = new PowerFly();
                    powerFly.init(dis);
                    LayerManager.msgLayer.addChild(powerFly);
                }
            }
            if (data.buyg != null) {
                var curbuyg = this.buyg;
                this.buyg = Number(data.buyg);
                if (curbuyg == 0 && curbuyg != this.buyg && this.buyg != 0) {
                    if (PlatformManager.isShowNewAnalytics()) {
                        PlatformManager.analyticsFirstPayment();
                    }
                }
            }
            if (data.buyt != null) {
                this.buyt = Number(data.buyt);
            }
            if (data.freeg != null) {
                this.freeg = Number(data.freeg);
            }
            if (data.tcost != null) {
                this.tcost = Number(data.tcost);
            }
            if (data.olt != null) {
                this.olt = Number(data.olt);
            }
            if (data.updated_at != null) {
                this.updated_at = Number(data.updated_at);
            }
            if (data.charm != null) {
                this.charm = Number(data.charm);
            }
            if (data.inte != null) {
                this.inte = Number(data.inte);
            }
            if (data.atk != null) {
                this.atk = Number(data.atk);
            }
            if (data.politics != null) {
                this.politics = Number(data.politics);
            }
            if (data.food != null) {
                this.food = Number(data.food);
            }
            if (data.soldier != null) {
                this.soldier = Number(data.soldier);
            }
            if (refreshArr.length > 0) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI, refreshArr);
            }
            if (data.title != null) {
                this.titleid = Number(data.title);
            }
            if (data.todayolt != null) {
                this.todayolt = Number(data.todayolt);
                Api.playerVoApi.checkAddiction();
            }
            if (this.flogincmdst == undefined) {
                this.flogincmdst = GameData.serverTime;
            }
            if (data.minlevelid) {
                var curMinLevel = this.minlevelid;
                this.minlevelid = data.minlevelid;
                if (this.minlevelid >= 8 && MainUI.getInstance().getUnlockIndex() < 10) {
                    MainUI.getInstance().setUnlockIndex(10);
                }
                if (curMinLevel != this.minlevelid && this.minlevelid == 5 && curMinLevel != 0) {
                    Api.rookieVoApi._waitingGuide.length = 0;
                    Api.rookieVoApi.curGuideKey = "levy";
                    Api.rookieVoApi.insertWaitingGuide({ "idx": "levy_1" });
                }
                if (curMinLevel != this.minlevelid && this.minlevelid == 8 && curMinLevel != 0) {
                    Api.rookieVoApi._waitingGuide.length = 0;
                    Api.rookieVoApi.curGuideKey = "city";
                    Api.rookieVoApi.insertWaitingGuide({ "idx": "city_1" });
                    // Api.rookieVoApi.checkWaitingGuide();
                }
                // if(curMinLevel!=this.minlevelid&& this.minlevelid == 9&&curMinLevel!=0)
                // {
                // 	//寻访分阶段引导
                // 	Api.rookieVoApi._waitingGuide.length=0;
                // 	Api.rookieVoApi.curGuideKey = "search";
                // 	Api.rookieVoApi.insertWaitingGuide({"idx":"search_1"},true);
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SET_MUI_BTNSROLL, 1);
                // 	if(PlatformManager.isShowNewAnalytics()){
                // 		PlatformManager.analyticsUnlockSearch()
                // 	}
                // }
                if (curMinLevel != this.minlevelid && this.minlevelid == 11 && curMinLevel != 0) {
                    //一键购买
                    Api.rookieVoApi._waitingGuide.length = 0;
                    Api.rookieVoApi.curGuideKey = "oneClickBuy";
                    Api.rookieVoApi.insertWaitingGuide({ "idx": "oneClickBuy_1" }, true);
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SET_MUI_BTNSROLL, 1);
                }
            }
            if (data.usegems != null) {
                this.usegems = Number(data.usegems);
            }
        }
    };
    PlayerVo.prototype.checkRefreshUI = function (data) {
        var resultArr = [];
        if (data) {
            var checkResArr = GameConfig.refreshUIResArr;
            var l = checkResArr.length;
            for (var i = l - 1; i >= 0; i--) {
                var key = checkResArr[i];
                var isDiff = false;
                if (data[key] != null) {
                    isDiff = !App.MathUtil.checkEqual(this[key], data[key]);
                }
                if (isDiff) {
                    resultArr.push(key);
                }
            }
        }
        return resultArr;
    };
    PlayerVo.prototype.dispose = function () {
        this.uid = 0;
        this.pic = 0;
        this.name = "";
        this.level = 0;
        this.minlevel = 0;
        this.exp = 0;
        this.vip = 0;
        this.vipexp = 0;
        this.gem = 0;
        this.gold = 0;
        this.mygid = 0;
        this.mygname = "";
        this.power = 0;
        this.buyg = 0;
        this.buyt = 0;
        this.freeg = 0;
        this.tcost = 0;
        this.olt = 0;
        this.updated_at = 0;
        this.charm = 0;
        this.inte = 0;
        this.atk = 0;
        this.politics = 0;
        this.food = 0;
        this.soldier = 0;
        this.titleid = 0;
        this.todayolt = 0;
        this.flogincmdst = undefined;
        this.minlevelid = 0;
        this.usegems = 0;
    };
    return PlayerVo;
}(BaseVo));
__reflect(PlayerVo.prototype, "PlayerVo");
