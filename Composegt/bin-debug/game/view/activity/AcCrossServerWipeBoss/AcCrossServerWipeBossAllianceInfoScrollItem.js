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
 * author : qianjun
 * date : 2018.4.14
 * desc : 帮会敌情itemrender
 */
var AcCrossServerWipeBossAllianceInfoScrollItem = (function (_super) {
    __extends(AcCrossServerWipeBossAllianceInfoScrollItem, _super);
    function AcCrossServerWipeBossAllianceInfoScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._curIdx = 0;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcCrossServerWipeBossAllianceInfoScrollItem.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossAllianceInfoScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossAllianceInfoScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossAllianceInfoScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 505;
        view.height = 120 + 25;
        view._data = data;
        view._curIdx = index;
        var wordsBg = BaseBitmap.create("public_listbg");
        wordsBg.width = view.width;
        wordsBg.height = view.height - 5;
        view.addChild(wordsBg);
        var bb = BaseBitmap.create("public_left");
        bb.width = 125;
        bb.height = 122;
        bb.x = 5;
        bb.y = 5;
        this.addChild(bb);
        //npc怪物
        var cfg = view.cfg.getBossNpcItemCfgById(data.bosstype);
        var npcBg = BaseBitmap.create(cfg.itemBg);
        // npcBg.setScale(106/194);
        npcBg.width = 106;
        npcBg.height = 106;
        npcBg.setScale(1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, npcBg, wordsBg, [15, 0]);
        view.addChild(npcBg);
        var pic = cfg.npcIcon;
        if (data.type == 2 && cfg.type == 2) {
            pic = cfg.npcPic + "_2";
        }
        var npc = BaseBitmap.create(pic);
        // npc.setScale(cfg.type == 2 ? 0.5 : 1);
        npc.setScale(0.9);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, npc, npcBg, [0, 3]);
        view.addChild(npc);
        //怪物名称
        var bpsshp = view.vo.getWipeBossMaxHp(cfg.id);
        var name = data.type == 1 ? LanguageManager.getlocal('accrossserverwipeBossAllNpcInfo', [cfg.npcName, (data.curBlood / bpsshp * 100).toFixed(2)]) : cfg.npcName;
        if (data.type == 1 && cfg.type == 2) {
            name = cfg.npcName;
        }
        var NameTxt = ComponentManager.getTextField(name, 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, NameTxt, npcBg, [106 + 15, data.type == 1 ? 20 : -5]);
        view.addChild(NameTxt);
        //发现者
        var findTxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossAllFindPlayer', [data.findname]), 18, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, findTxt, NameTxt, [0, NameTxt.textHeight + (data.type == 1 ? 20 : 5)]);
        view.addChild(findTxt);
        if (data.type == 1) {
            var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, cfg.type == 1 ? "accrossserverwipeBossAllFight" : "accrossserverwipeBossOpenBox", view.fightHandler, view);
            if (PlatformManager.checkIsViSp()) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, wordsBg, [10, 23]);
            }
            else {
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, wordsBg, [10, 0]);
            }
            view.addChild(btn);
            if (!view.vo.isInTansuoTime()) {
                btn.setEnable(false);
            }
        }
        else {
            var killTxt = ComponentManager.getTextField(LanguageManager.getlocal(cfg.type == 1 ? 'accrossserverwipeBossAllKillPlayer' : 'accrossserverwipeBossAllOpenPlayer', [data.killername]), 18, TextFieldConst.COLOR_BROWN);
            // if(PlatformManager.checkIsViSp()){
            // 	App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killTxt, findTxt, [0,findTxt.textHeight + 5 + 23]);
            // } else {
            // 	App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killTxt, findTxt, [0,findTxt.textHeight + 5]);
            // }
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killTxt, findTxt, [0, findTxt.textHeight + 5]);
            view.addChild(killTxt);
            var idx = data.rewardsidx;
            var reward = cfg.killPool[idx - 1][0];
            var reward_str = '';
            if (idx > 0 && reward) {
                var icon = GameData.formatRewardItem(reward);
                for (var i in icon) {
                    if (PlatformManager.checkIsViSp()) {
                        reward_str += ("," + icon[i].name + "+" + icon[i].num);
                    }
                    else {
                        reward_str += ("\u3001" + icon[i].name + "+" + icon[i].num);
                    }
                }
            }
            //击杀者
            if (cfg.type == 1) {
                //击杀奖励
                var killRewardTxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossAllKillReward', [cfg.killScore.toString(), reward_str]), 18, TextFieldConst.COLOR_WARN_GREEN);
                killRewardTxt.width = 350;
                killRewardTxt.lineSpacing = 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killRewardTxt, killTxt, [0, killTxt.textHeight + 5]);
                view.addChild(killRewardTxt);
            }
            else {
                reward_str = reward_str.substring(1, reward_str.length);
                var openRewardTxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossAllOpenReward', [reward_str]), 18, TextFieldConst.COLOR_WARN_GREEN);
                openRewardTxt.width = 350;
                openRewardTxt.lineSpacing = 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, openRewardTxt, killTxt, [0, killTxt.textHeight + 5]);
                view.addChild(openRewardTxt);
            }
        }
        //this.update();
    };
    AcCrossServerWipeBossAllianceInfoScrollItem.prototype.fightHandler = function (evt) {
        var view = this;
        if (!view.vo.isInTansuoTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossEnd"));
            return;
        }
        if (!view.vo.isInFightTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossMidDesc6"));
            return;
        }
        //前往战斗
        var cfg = view.cfg.getBossNpcItemCfgById(view._data.bosstype);
        if (cfg.type == 1) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIPEBOSSBATTLEVIEW, {
                aid: AcConst.AID_CROSSSERVERWIPEBOSS,
                code: view._code,
                foeId: view._data.bosstype,
                bosskey: view._data.bosskey
            });
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIPEBOSSSEARCHRESULTVIEW, {
                aid: AcConst.AID_CROSSSERVERWIPEBOSS,
                code: view._code,
                foeId: view._data.bosstype,
                bosskey: view._data.bosskey
            });
        }
        var infoview = ViewController.getInstance().getView('AcCrossServerWipeBossAllianceInfoView');
        infoview.hide();
    };
    //弹出消费提示框显示确认
    AcCrossServerWipeBossAllianceInfoScrollItem.prototype.confirmCallbackHandler = function () {
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY, {
            // activeId : view.acTivityId,
            shopId: view._data.sortId + 1
        });
    };
    AcCrossServerWipeBossAllianceInfoScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcCrossServerWipeBossAllianceInfoScrollItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossAllianceInfoScrollItem;
}(ScrollListItem));
__reflect(AcCrossServerWipeBossAllianceInfoScrollItem.prototype, "AcCrossServerWipeBossAllianceInfoScrollItem");
