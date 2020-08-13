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
/*
author : qianjun
desc : 帮会争顶 帮派详情信息
*/
var AcBattleGroundAlliInfoView = (function (_super) {
    __extends(AcBattleGroundAlliInfoView, _super);
    function AcBattleGroundAlliInfoView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._chalBtn = null;
        _this._data = [];
        return _this;
    }
    Object.defineProperty(AcBattleGroundAlliInfoView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAlliInfoView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAlliInfoView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAlliInfoView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundAlliInfoView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcBattleGroundAlliInfoView.prototype.getRequestData = function () {
        var view = this;
        var alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
        return { requestType: NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDDETAIL, requestData: {
                activeId: view.vo.aidAndCode,
                allianceId: alliinfo.mid
            } };
    };
    AcBattleGroundAlliInfoView.prototype.receiveData = function (data) {
        var view = this;
        view._data = [];
        if (data.data.data && data.data.data.allianceList) {
            view._data = data.data.data.allianceList;
            view._data.sort(function (a, b) {
                return a.myrank - b.myrank;
            });
        }
        //view.api.setBossNumInfo(data.data.data);
    };
    AcBattleGroundAlliInfoView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acmidautumnview_titlebg", "progress3_bg", "progress5"
        ]);
    }; //REQUST_ACTIVITY_BATTLEGROUNDDETAIL
    AcBattleGroundAlliInfoView.prototype.initView = function () {
        var _this = this;
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
        var topbg = BaseBitmap.create("public_9_bg14");
        topbg.width = 530;
        topbg.height = 100;
        topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 10);
        view.addChildToContainer(topbg);
        var cheericon = BaseBitmap.create("battlegroundcheericon-" + view.getUiCode());
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, cheericon, topbg, [15, 0]);
        view.addChildToContainer(cheericon);
        var cheertxt = ComponentManager.getBitmapText(alliinfo.cheerlv, "crit_fnt");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cheertxt, cheericon, [0, 25]);
        view.addChildToContainer(cheertxt);
        if (PlatformManager.checkIsThSp()) {
            var tmp = cheertxt;
            tmp.size = 24;
            tmp.setColor(0x000000);
            tmp.setPosition(cheericon.x + cheericon.width / 2 - cheertxt.width / 2, cheericon.y + cheericon.height / 2 - cheertxt.height / 2 - 5);
        }
        var cfg = view.cfg.help[alliinfo.cheerlv - 1];
        var nexcfg = view.cfg.help[alliinfo.cheerlv];
        var num = cfg ? cfg.attAdd : 0;
        var add = (num * 100).toFixed(0);
        var cheertiptxt = ComponentManager.getTextField(LanguageManager.getlocal("battlegroundcheertip16-" + view.getUiCode(), [add]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cheertiptxt, cheericon, [cheericon.width + 12, 20]);
        view.addChildToContainer(cheertiptxt);
        var progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 395);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, cheertiptxt, [0, cheertiptxt.height + 10]);
        view.addChildToContainer(progress);
        if (nexcfg) {
            var per = alliinfo.cheerexp / nexcfg.needHelp;
            progress.setPercentage(per);
            progress.setText(alliinfo.cheerexp + "/" + nexcfg.needHelp);
        }
        else {
            progress.setPercentage(1);
            progress.setText(LanguageManager.getlocal("acBattlePassMaxLevel-1"));
        }
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 565;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, topbg.y + topbg.height + 60);
        view.addChildToContainer(bg);
        var mask = BaseBitmap.create("public_9_bg37");
        mask.width = bg.width;
        mask.height = 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask, bg);
        view.addChildToContainer(mask);
        var title1Text = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundAlliRank-" + view.getUiCode()), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, title1Text, mask, [10, 0]);
        view.addChildToContainer(title1Text);
        var title2Text = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title2Text, mask);
        view.addChildToContainer(title2Text);
        var title3Text = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, title3Text, mask, [25, 0]);
        view.addChildToContainer(title3Text);
        var alliNameText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundAlliName-" + view.getUiCode(), [alliinfo.alliName]), 20, TextFieldConst.COLOR_BROWN);
        alliNameText.setPosition(view.viewBg.x + 25 + GameData.popupviewOffsetX, topbg.y + topbg.height + 5);
        view.addChildToContainer(alliNameText);
        var serverText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundAlliRankServer-" + view.getUiCode(), [Api.mergeServerVoApi.getAfterMergeSeverName(null, true, alliinfo.server)]), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, serverText, alliNameText, [0, alliNameText.textHeight + 10]);
        view.addChildToContainer(serverText);
        var numText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundAlliNum-" + view.getUiCode(), [alliinfo.num.toString(), alliinfo.total.toString()]), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, numText, bg, [5, alliNameText.textHeight + 10]);
        view.addChildToContainer(numText);
        numText.y = serverText.y;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, bg.height - 40 - 10);
        var arr = [];
        for (var i in view._data) {
            var unit = view._data[i];
            arr.push({
                name: unit.name,
                rank: unit.myrank,
                score: unit.value,
                alliId: view.param.data.alliId,
                uid: unit.uid,
                alive: unit.alive
            });
        }
        var scrollList = ComponentManager.getScrollList(AcBattleGroundAlliInfoItem, arr, rect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, mask, [0, mask.height]);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        view.addChildToContainer(scrollList);
        view._list = scrollList;
        scrollList.bounces = false;
        //view.freshList();
        var challBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "atkraceChallengeViewTitle", function () {
            if (!_this.vo.getAttendQuality()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNoAttend-" + _this.getUiCode()));
                return;
            }
            if (view.vo.isActyEnd()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                return;
            }
            if (view.vo.getCurperiod() == 3) {
                App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                return;
            }
            if (view.vo.getAttendQuality() && view.vo.getJoinIn()) {
                //打开挑战弹窗
                ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDSELECTVIEW, {
                    code: view.code,
                    aid: view.aid,
                    alliId: view.param.data.alliId,
                    mem: view._data
                });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, challBtn, bg, [0, bg.height + 10]);
        view.addChildToContainer(challBtn);
        challBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn() && !view.vo.isAlliOut(view.param.data.alliId);
        view._chalBtn = challBtn;
        if (Api.switchVoApi.checkOpenAtkracegChangegpoint()) {
            var cdText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundTip12-" + view.getUiCode()), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cdText, scrollList, [0, scrollList.height + 100]);
            view.addChildToContainer(cdText);
        }
    };
    AcBattleGroundAlliInfoView.prototype.getRoundRewardCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (!data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
        }
        // let idx = view.vo.selIdx;
        // let rewards = data.rewards;
        // if(rewards.indexOf(`20_302_1`) > -1){
        //     rewards = rewards.replace('20_302_1','27_302_1');
        // }
        // let item : any = view._list.getItemByIndex(idx);
        // let pos = item.localToGlobal(item._btn.x + 35, item._btn.y + 20);
        // let rewardList = GameData.formatRewardItem(rewards);
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
        // view._end = false;
        // view.freshList();
    };
    AcBattleGroundAlliInfoView.prototype.tick = function () {
        var view = this;
        if (view.vo.isActyEnd() && !view._end) {
            view._end = true;
            view.freshList();
        }
        view._chalBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn();
    };
    AcBattleGroundAlliInfoView.prototype.freshList = function () {
        var view = this;
        // let dataList =new Array<any>();
        // let cfg = this.cfg;
        // let curRound = view.vo.getCurRound();
        // for(let i in cfg.circleReward){
        // 	let cid = Number(i);
        // 	if(cid >= view.vo.getRoundMax() && curRound > 10){
        // 		for(let j = view.vo.getRoundMax(); j <= (view.vo.getCurRound() + 1); ++ j){
        // 			if(view.vo.getCurRoundGetState(j) < 3){
        // 				cid = j;
        // 				break;
        // 			}
        // 		}
        // 	}
        // 	dataList.push({
        // 		id : cid,
        // 		num :  cid,
        // 		getReward : cfg.circleReward[i].getReward,
        // 	});
        // }
        // dataList.sort((a,b)=>{
        // 	let flaga = view.vo.getCurRoundGetState(a.id);
        // 	let flagb = view.vo.getCurRoundGetState(b.id);
        // 	if(flaga == flagb){
        // 		return a.num - b.num;
        // 	}
        // 	else{
        // 		return flaga - flagb;
        // 	}
        // });
        // view._list.refreshData(dataList,view.code);
    };
    AcBattleGroundAlliInfoView.prototype.getShowHeight = function () {
        return 880;
    };
    AcBattleGroundAlliInfoView.prototype.getShowWidth = function () {
        return 560;
    };
    AcBattleGroundAlliInfoView.prototype.getTitleStr = function () {
        return "acBattleGroundSelect-" + this.getUiCode();
    };
    AcBattleGroundAlliInfoView.prototype.dispose = function () {
        var view = this;
        view._end = false;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD),view.getRoundRewardCallback,view);
        view._list = null;
        view._chalBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundAlliInfoView;
}(PopupView));
__reflect(AcBattleGroundAlliInfoView.prototype, "AcBattleGroundAlliInfoView");
//# sourceMappingURL=AcBattleGroundAlliInfoView.js.map