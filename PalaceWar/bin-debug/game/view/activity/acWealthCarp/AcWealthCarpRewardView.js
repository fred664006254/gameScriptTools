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
 * 	彩蛋活动奖励
 * author 张朝阳
 * date 2019/3/12
 * @class AcWealthCarpRewardView
 */
var AcWealthCarpRewardView = (function (_super) {
    __extends(AcWealthCarpRewardView, _super);
    function AcWealthCarpRewardView() {
        var _this = _super.call(this) || this;
        _this.code = null;
        _this.aid = null;
        _this._luckyinfo = null;
        _this._scrollList = null;
        return _this;
    }
    AcWealthCarpRewardView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCARPREWARD, this.getRewardHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, this.getLuckyHandle, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        this._luckyinfo = this.param.data.luckyinfo;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var titlebgStr = "acwealthcarpview_titlebg";
        if (this.code != "1" && this.code != "2") {
            titlebgStr = "acwealthcarpview_titlebg-" + this.getUiCode();
        }
        var titlebg = BaseLoadBitmap.create(titlebgStr);
        titlebg.width = 640;
        titlebg.height = 91;
        var topbgStr = "acwealthcarpview_rewardbg";
        if (this.code != "1" && this.code != "2") {
            topbgStr = "acwealthcarpview_rewardbg-" + this.getUiCode();
            ;
        }
        var topbg = BaseLoadBitmap.create(topbgStr);
        topbg.width = 640;
        topbg.height = 211;
        topbg.setPosition(titlebg.x, titlebg.y + titlebg.height - 7);
        this.addChildToContainer(topbg);
        this.addChildToContainer(titlebg);
        var talkbg = BaseBitmap.create("public_9_bg25");
        talkbg.width = 330;
        var talkTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpRewardViewTip-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        talkTxt.width = 300;
        talkTxt.lineSpacing = 3;
        talkbg.height = talkTxt.height + 30;
        talkbg.setPosition(topbg.x + 210, topbg.y + 60);
        this.addChildToContainer(talkbg);
        talkTxt.setPosition(talkbg.x + talkbg.width / 2 - talkTxt.width / 2, talkbg.y + talkbg.height / 2 - talkTxt.height / 2);
        this.addChildToContainer(talkTxt);
        var talktail = BaseBitmap.create("public_arrow");
        talktail.setPosition(talkbg.x - talktail.width + 3, talkbg.y + talkbg.height / 2 - talktail.height / 2);
        this.addChildToContainer(talktail);
        var midbg = BaseLoadBitmap.create("dragonboattab1bg");
        midbg.width = 640;
        midbg.height = GameConfig.stageHeigth - topbg.height - topbg.y + 2;
        midbg.setPosition(0, topbg.y + topbg.height - 2);
        this.addChildToContainer(midbg);
        var rect = new egret.Rectangle(0, 0, 640, midbg.height - 38); //18  20
        var list = vo.getSortRewards();
        if (this._luckyinfo) {
            for (var i = 0; i < list.length; i++) {
                //                 level: 1
                // name: "闻人暮雨"
                // pic: 1
                // title: ""
                // uid: "9000228"
                list[i]["level"] = null;
                list[i]["pic"] = null;
                list[i]["title"] = null;
                list[i]["name"] = null;
                list[i]["uid"] = null;
                list[i]["name"] = this._luckyinfo[Number(list[i].id) - 1] ? this._luckyinfo[Number(list[i].id) - 1].name : null;
                list[i]["level"] = this._luckyinfo[Number(list[i].id) - 1] ? this._luckyinfo[Number(list[i].id) - 1].level : null;
                list[i]["pic"] = this._luckyinfo[Number(list[i].id) - 1] ? this._luckyinfo[Number(list[i].id) - 1].pic : null;
                list[i]["title"] = this._luckyinfo[Number(list[i].id) - 1] ? this._luckyinfo[Number(list[i].id) - 1].title : null;
                list[i]["uid"] = this._luckyinfo[Number(list[i].id) - 1] ? this._luckyinfo[Number(list[i].id) - 1].uid : null;
            }
        }
        list.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        this._scrollList = ComponentManager.getScrollList(AcWealthCarpRewardScrollItem, list, rect, { aid: this.aid, code: this.code, joiner: this.param.data.joiner });
        this._scrollList.setPosition(midbg.x, midbg.y + 18);
        this.addChildToContainer(this._scrollList);
        // this._scrollList.bounces = false;
    };
    AcWealthCarpRewardView.prototype.getRewardHandle = function (event) {
        if (event.data.ret) {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            // let list = vo.getSortRewards();
            // if (this._luckyinfo) {
            //     for (let i = 0; i < list.length; i++) {
            //         list[i]["name"] = null;
            //         list[i]["name"] = this._luckyinfo[Number(list[i].id) - 1] ? this._luckyinfo[Number(list[i].id) - 1].name : null;
            //     }
            // }
            // list.sort((a, b) => {
            //     return a.sortId - b.sortId;
            // })
            var rewards = event.data.data.data.rewards;
            var replacerewards = event.data.data.data.replacerewards;
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
            var rewardsVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardsVoList);
            // this._scrollList.refreshData(list, { aid: this.aid, code: this.code, joiner: this.param.data.joiner });
        }
    };
    AcWealthCarpRewardView.prototype.getLuckyHandle = function (event) {
        if (event.data.ret) {
            this._luckyinfo = event.data.data.data.luckyinfo;
            // let vo = <AcWealthCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            // let list = vo.getSortRewards();
            // if (this._luckyinfo) {
            //     for (let i = 0; i < list.length; i++) {
            //         list[i]["name"] = null;
            //         list[i]["name"] = this._luckyinfo[Number(list[i].id) - 1] ? this._luckyinfo[Number(list[i].id) - 1].name : null;
            //     }
            // }
            // list.sort((a, b) => {
            //     return a.sortId - b.sortId;
            // });
            // this._scrollList.refreshData(list, { aid: this.aid, code: this.code, joiner: this.param.data.joiner });
        }
    };
    AcWealthCarpRewardView.prototype.refreashView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var list = vo.getSortRewards();
        if (this._luckyinfo) {
            for (var i = 0; i < list.length; i++) {
                // list[i]["name"] = null;
                // list[i]["name"] = this._luckyinfo[Number(list[i].id) - 1] ? this._luckyinfo[Number(list[i].id) - 1].name : null;
                list[i]["level"] = null;
                list[i]["pic"] = null;
                list[i]["title"] = null;
                list[i]["name"] = null;
                list[i]["uid"] = null;
                list[i]["name"] = this._luckyinfo[Number(list[i].id) - 1] ? this._luckyinfo[Number(list[i].id) - 1].name : null;
                list[i]["level"] = this._luckyinfo[Number(list[i].id) - 1] ? this._luckyinfo[Number(list[i].id) - 1].level : null;
                list[i]["pic"] = this._luckyinfo[Number(list[i].id) - 1] ? this._luckyinfo[Number(list[i].id) - 1].pic : null;
                list[i]["title"] = this._luckyinfo[Number(list[i].id) - 1] ? this._luckyinfo[Number(list[i].id) - 1].title : null;
                list[i]["uid"] = this._luckyinfo[Number(list[i].id) - 1] ? this._luckyinfo[Number(list[i].id) - 1].uid : null;
            }
        }
        list.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        this._scrollList.refreshData(list, { aid: this.aid, code: this.code, joiner: this.param.data.joiner });
    };
    AcWealthCarpRewardView.prototype.getResourceList = function () {
        var arr = [];
        if (this.param.data.code != "1" && this.param.data.code != "2") {
            arr = [
                "acwealthcarpview_balloon_title_1-" + this.getUiCode(),
                "acwealthcarpview_balloon_title_2-" + this.getUiCode(),
                "acwealthcarpview_balloon_title_3-" + this.getUiCode(),
                "acwealthcarpview_balloon_title_4-" + this.getUiCode(),
                "acwealthcarpview_balloon_title_5-" + this.getUiCode(),
                "acwealthcarpview_balloon_title_6-" + this.getUiCode(),
                "acwealthcarpview_balloon_title_7-" + this.getUiCode(),
            ];
        }
        else {
            arr = [
                "acwealthcarpview_easteregg_1_title",
                "acwealthcarpview_easteregg_2_title",
                "acwealthcarpview_easteregg_3_title",
                "acwealthcarpview_easteregg_4_title",
                "acwealthcarpview_easteregg_5_title",
                "acwealthcarpview_easteregg_6_title",
                "acwealthcarpview_easteregg_7_title"
            ];
        }
        if (Number(this.param.data.code) >= 5) {
            arr = [
                "acwealthcarpview_showitem_title_1-" + this.getUiCode(),
                "acwealthcarpview_showitem_title_2-" + this.getUiCode(),
                "acwealthcarpview_showitem_title_3-" + this.getUiCode(),
                "acwealthcarpview_showitem_title_4-" + this.getUiCode(),
                "acwealthcarpview_showitem_title_5-" + this.getUiCode(),
                "acwealthcarpview_showitem_title_6-" + this.getUiCode(),
                "acwealthcarpview_showitem_title_7-" + this.getUiCode(),
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "acwealthcarpview_common_line",
            "acwealthcarpeffect"
        ]).concat(arr);
    };
    AcWealthCarpRewardView.prototype.getTitleBgName = function () {
        return null;
    };
    AcWealthCarpRewardView.prototype.getTitleStr = function () {
        return null;
    };
    AcWealthCarpRewardView.prototype.getRuleInfo = function () {
        return "acWealthCarpViewRule-" + this.param.data.code;
    };
    AcWealthCarpRewardView.prototype.getUiCode = function () {
        if (this.param.data.code == "4") {
            return "3";
        }
        return this.param.data.code;
    };
    AcWealthCarpRewardView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCARPREWARD, this.getRewardHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, this.getLuckyHandle, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        this.aid = null;
        this.code = null;
        this._scrollList = null;
        this._luckyinfo = null;
        _super.prototype.dispose.call(this);
    };
    return AcWealthCarpRewardView;
}(CommonView));
__reflect(AcWealthCarpRewardView.prototype, "AcWealthCarpRewardView");
//# sourceMappingURL=AcWealthCarpRewardView.js.map