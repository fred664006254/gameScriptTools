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
 * 击杀流水item
 * author qianjun
 * date 2017/12/07
 * @class AllianceBossRankScrollItem
 */
var AcCrossServerWipeBossKillInfoScrollItem = (function (_super) {
    __extends(AcCrossServerWipeBossKillInfoScrollItem, _super);
    function AcCrossServerWipeBossKillInfoScrollItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossServerWipeBossKillInfoScrollItem.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossKillInfoScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossKillInfoScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossKillInfoScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 510;
        view.height = 136 + 10;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
        // let item : RewardItemVo;
        // if(data.effect){
        // 	item = GameData.formatRewardItem('6_1004_1')[0];
        // }
        // else{
        // 	item = GameData.formatRewardItem(data.goods)[0];
        // }
        var bg = BaseBitmap.create("public_listbg");
        bg.width = view.width;
        bg.height = view.height - 5;
        view.addChild(bg);
        // this.width = GameConfig.stageWidth;
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        // let rankImg = BaseBitmap.create("rankinglist_rankbg");
        // rankImg.x = 20;
        // rankImg.y = 15;
        // view.addChild(rankImg);
        var trankTxt1 = ComponentManager.getTextField(String(index + 1) + ".", 20, TextFieldConst.COLOR_BROWN);
        trankTxt1.x = 20;
        trankTxt1.y = 15;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, trankTxt1, rankImg);
        view.addChild(trankTxt1);
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTxt.text = data.name;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, trankTxt1, [trankTxt1.width + 15, 0]);
        view.addChild(nameTxt);
        var timeTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(data.time, 2), 20, TextFieldConst.COLOR_WARN_GREEN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, timeTxt, bg, [25, 15]);
        view.addChild(timeTxt);
        var lineImg = BaseBitmap.create("public_line1");
        lineImg.width = 500;
        lineImg.height = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, lineImg, bg, [0, 43]);
        view.addChild(lineImg);
        var cfg = view.cfg.getBossNpcItemCfgById(data.bosstype);
        var servantcfg = Config.ServantCfg.getServantItemById(data.servantId);
        var str = cfg.type == 1 ? LanguageManager.getlocal('accrossserverwipeBossAllKillInfoDesc', [servantcfg.name, cfg.npcName]) : (LanguageManager.getlocal('accrossserverwipeBossAllOpenInfoDesc', [cfg.npcName]));
        var tip1Txt = ComponentManager.getTextField(str, 18, TextFieldConst.COLOR_BROWN);
        tip1Txt.width = 460;
        tip1Txt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip1Txt, lineImg, [0, 10]);
        view.addChild(tip1Txt);
        //击杀奖励
        var icon = GameData.formatRewardItem(data.reward);
        var reward_str = '';
        for (var i in icon) {
            if (PlatformManager.checkIsViSp()) {
                reward_str += ("," + icon[i].name + "+" + icon[i].num);
            }
            else {
                reward_str += ("\u3001" + icon[i].name + "+" + icon[i].num);
            }
        }
        if (cfg.type == 2) {
            reward_str = reward_str.substring(1, reward_str.length);
        }
        var rewardstr = cfg.type == 1 ? (LanguageManager.getlocal('accrossserverwipeBossAllKillReward', [cfg.killScore.toString(), reward_str])) : (LanguageManager.getlocal('accrossserverwipeBossAllOpenReward', [reward_str]));
        var killRewardTxt = ComponentManager.getTextField(rewardstr, 18, TextFieldConst.COLOR_WARN_GREEN);
        killRewardTxt.width = 460;
        killRewardTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killRewardTxt, tip1Txt, [0, tip1Txt.textHeight + 10]);
        view.addChild(killRewardTxt);
    };
    AcCrossServerWipeBossKillInfoScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcCrossServerWipeBossKillInfoScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerWipeBossKillInfoScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossKillInfoScrollItem;
}(ScrollListItem));
__reflect(AcCrossServerWipeBossKillInfoScrollItem.prototype, "AcCrossServerWipeBossKillInfoScrollItem");
