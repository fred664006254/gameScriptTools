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
var AcTombAllianceInfoScrollItem = (function (_super) {
    __extends(AcTombAllianceInfoScrollItem, _super);
    function AcTombAllianceInfoScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._curIdx = 0;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcTombAllianceInfoScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombAllianceInfoScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombAllianceInfoScrollItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombAllianceInfoScrollItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_TOMB;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombAllianceInfoScrollItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcTombAllianceInfoScrollItem.prototype.getUicode = function () {
        var baseview = ViewController.getInstance().getView('AcTombView');
        return baseview.getUiCode();
    };
    AcTombAllianceInfoScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 508;
        view.height = 118 + 10;
        view._data = data;
        view._curIdx = index;
        var code = view.getUicode();
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
        // let item : RewardItemVo;
        // if(data.effect){
        // 	item = GameData.formatRewardItem('6_1004_1')[0];
        // }
        // else{
        // 	item = GameData.formatRewardItem(data.goods)[0];
        // }
        var wordsBg = BaseBitmap.create("public_9_bg1");
        wordsBg.width = view.width;
        wordsBg.height = view.height - 10;
        view.addChild(wordsBg);
        //npc怪物
        var cfg = view.cfg.getBossNpcItemCfgById(data.bosstype);
        // let npcBg = BaseBitmap.create(cfg.itemBg);
        // // npcBg.setScale(106/194);
        // npcBg.width = 106;
        // npcBg.height = 106;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, npcBg, wordsBg, [10,0]);
        // view.addChild(npcBg);
        var pic = cfg.getnpcIcon(code);
        var npc = BaseLoadBitmap.create(pic);
        npc.width = 100;
        npc.height = 100;
        // npc.setScale(cfg.type == 2 ? 0.5 : 1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, npc, wordsBg, [10, 0]);
        view.addChild(npc);
        //怪物名称
        var bpsshp = view.vo.getTombMaxHp(cfg.id);
        var value = (data.curBlood / bpsshp) * 100;
        var str = parseFloat(App.MathUtil.toFixed(value, 4).slice(0, -1));
        var name = data.type == 1 ? LanguageManager.getlocal('acwipeBossAllNpcInfo', [cfg.getnpcName(code), str.toString()]) : cfg.getnpcName(code);
        if (data.type == 1 && cfg.type == 2) {
            name = cfg.getnpcName(code);
        }
        var NameTxt = ComponentManager.getTextField(name, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, NameTxt, npc, [106 + 15, (data.type == 1 ? 5 : 1)]);
        view.addChild(NameTxt);
        //发现者
        var findTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossAllFindPlayer', [data.findname]), 18);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, findTxt, NameTxt, [0, NameTxt.textHeight + (data.type == 1 ? 10 : 5)]);
        view.addChild(findTxt);
        if (data.type == 1) {
            var posTxt = ComponentManager.getTextField(LanguageManager.getlocal("loctombpos-" + code, [data.x, data.y]), 18);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, posTxt, findTxt, [0, findTxt.textHeight + (data.type == 1 ? 10 : 5)]);
            view.addChild(posTxt);
            var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, cfg.type == 1 ? "acwipeBossAllFight" : "acwipeBossOpenBox", view.fightHandler, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, wordsBg, [10, 0]);
            view.addChild(btn);
            if (!view.vo.isInFightTime()) {
                btn.setEnable(false);
            }
        }
        else {
            var killTxt = ComponentManager.getTextField(LanguageManager.getlocal(cfg.type == 1 ? 'acwipeBossAllKillPlayer' : 'acwipeBossAllOpenPlayer', [data.killername]), 18);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killTxt, findTxt, [0, findTxt.textHeight + 5]);
            view.addChild(killTxt);
            var reward = data.rewardsidx;
            var reward_str = '';
            if (reward && reward != "") {
                var icon = GameData.formatRewardItem(reward);
                for (var i in icon) {
                    reward_str += ("\u3001" + icon[i].name + "+" + icon[i].num);
                }
            }
            //击杀者
            if (cfg.type == 1) {
                //击杀奖励
                var killRewardTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossAllKillReward', [cfg.killScore.toString(), reward_str]), 18, TextFieldConst.COLOR_WARN_GREEN);
                killRewardTxt.width = 350;
                killRewardTxt.lineSpacing = 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killRewardTxt, killTxt, [0, killTxt.textHeight + 5]);
                view.addChild(killRewardTxt);
            }
            else {
                reward_str = reward_str.substring(1, reward_str.length);
                var openRewardTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossAllOpenReward', [reward_str]), 18, TextFieldConst.COLOR_WARN_GREEN);
                openRewardTxt.width = 350;
                openRewardTxt.lineSpacing = 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, openRewardTxt, killTxt, [0, killTxt.textHeight + 5]);
                view.addChild(openRewardTxt);
            }
        }
        //this.update();
    };
    AcTombAllianceInfoScrollItem.prototype.fightHandler = function (evt) {
        var view = this;
        if (!view.vo.isInFightTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            return;
        }
        if (!view.vo.isInFightTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossMidDesc6"));
            return;
        }
        //前往战斗
        var boxdata = view.vo.getBoxDataById(view._data.id);
        if (boxdata) {
            var cfg = view.cfg.getBossNpcItemCfgById(view._data.bosstype);
            if (cfg.type == 1) {
                ViewController.getInstance().openView(ViewConst.COMMON.ACTOMBBATTLEVIEW, {
                    aid: view.aid,
                    code: view.code,
                    foeId: cfg.id,
                    bosskey: view._data.bosskey,
                    id: view._data.id
                });
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.ACTOMBSEARCHRESULTVIEW, {
                    aid: view.aid,
                    code: view.code,
                    foeId: cfg.id,
                    bosskey: view._data.bosskey,
                    id: view._data.id
                });
            }
            var infoview = ViewController.getInstance().getView('AcTombAllianceInfoView');
            infoview.hide();
        }
        else {
            var arr = [];
            var floor = Math.ceil(Number(view._data.id) / 6);
            var num = Math.max(Math.floor(floor / 10) - 1, 0);
            var max = Math.floor(view.vo.getFloorNum() / 10);
            for (var i = 0; i < 3; ++i) {
                if (num + i < max) {
                    arr.push(num + i);
                }
            }
            view.vo.clickIdx = view._index;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBMAP, {
                activeId: view.vo.aidAndCode,
                indexs: arr
            });
        }
    };
    //弹出消费提示框显示确认
    AcTombAllianceInfoScrollItem.prototype.confirmCallbackHandler = function () {
        var view = this;
        var cfg = view.cfg.getBossNpcItemCfgById(view._data.bosstype);
        if (cfg.type == 1) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACTOMBBATTLEVIEW, {
                aid: view.aid,
                code: view.code,
                foeId: cfg.id,
                bosskey: view._data.bosskey,
                id: view._data.id
            });
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.ACTOMBSEARCHRESULTVIEW, {
                aid: view.aid,
                code: view.code,
                foeId: cfg.id,
                bosskey: view._data.bosskey,
                id: view._data.id
            });
        }
        var infoview = ViewController.getInstance().getView('AcTombAllianceInfoView');
        infoview.hide();
    };
    AcTombAllianceInfoScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcTombAllianceInfoScrollItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
        _super.prototype.dispose.call(this);
    };
    return AcTombAllianceInfoScrollItem;
}(ScrollListItem));
__reflect(AcTombAllianceInfoScrollItem.prototype, "AcTombAllianceInfoScrollItem");
//# sourceMappingURL=AcTombAllianceInfoScrollItem.js.map