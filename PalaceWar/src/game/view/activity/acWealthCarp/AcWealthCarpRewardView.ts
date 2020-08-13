/**
 * 	彩蛋活动奖励
 * author 张朝阳
 * date 2019/3/12
 * @class AcWealthCarpRewardView
 */
class AcWealthCarpRewardView extends CommonView {

    private code: any = null;
    private aid: any = null;
    private _luckyinfo: any = null;
    private _scrollList: ScrollList = null;
    public constructor() {
        super();
    }

    public initView() {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCARPREWARD, this.getRewardHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, this.getLuckyHandle, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        this._luckyinfo = this.param.data.luckyinfo;
        let vo = <AcWealthCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

        let titlebgStr = "acwealthcarpview_titlebg";
        if (this.code != "1" && this.code != "2") {
            titlebgStr = "acwealthcarpview_titlebg-" + this.getUiCode();
        }
        let titlebg = BaseLoadBitmap.create(titlebgStr);
        titlebg.width = 640;
        titlebg.height = 91;

        let topbgStr = "acwealthcarpview_rewardbg";
        if (this.code != "1" && this.code != "2") {
            topbgStr = "acwealthcarpview_rewardbg-" + this.getUiCode();;
        }
        let topbg = BaseLoadBitmap.create(topbgStr);
        topbg.width = 640;
        topbg.height = 211;
        topbg.setPosition(titlebg.x, titlebg.y + titlebg.height - 7);
        this.addChildToContainer(topbg);
        this.addChildToContainer(titlebg);

        let talkbg = BaseBitmap.create("public_9_bg25");
        talkbg.width = 330;

        let talkTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpRewardViewTip-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        talkTxt.width = 300;
        talkTxt.lineSpacing = 3;

        talkbg.height = talkTxt.height + 30;
        talkbg.setPosition(topbg.x + 210, topbg.y + 60);
        this.addChildToContainer(talkbg);

        talkTxt.setPosition(talkbg.x + talkbg.width / 2 - talkTxt.width / 2, talkbg.y + talkbg.height / 2 - talkTxt.height / 2);
        this.addChildToContainer(talkTxt);

        let talktail = BaseBitmap.create("public_arrow");
        talktail.setPosition(talkbg.x - talktail.width + 3, talkbg.y + talkbg.height / 2 - talktail.height / 2);
        this.addChildToContainer(talktail);



        let midbg = BaseLoadBitmap.create("dragonboattab1bg");
        midbg.width = 640;
        midbg.height = GameConfig.stageHeigth - topbg.height - topbg.y + 2;
        midbg.setPosition(0, topbg.y + topbg.height - 2);
        this.addChildToContainer(midbg);

        let rect = new egret.Rectangle(0, 0, 640, midbg.height - 38); //18  20
        let list = vo.getSortRewards();
        if (this._luckyinfo) {
            for (let i = 0; i < list.length; i++) {
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

        list.sort((a, b) => {
            return a.sortId - b.sortId;
        });
        this._scrollList = ComponentManager.getScrollList(AcWealthCarpRewardScrollItem, list, rect, { aid: this.aid, code: this.code, joiner: this.param.data.joiner });
        this._scrollList.setPosition(midbg.x, midbg.y + 18);
        this.addChildToContainer(this._scrollList)
        // this._scrollList.bounces = false;
    }

    private getRewardHandle(event: egret.Event) {
        if (event.data.ret) {
            let vo = <AcWealthCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
            let rewards = event.data.data.data.rewards;
            let replacerewards = event.data.data.data.replacerewards;
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
            let rewardsVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardsVoList);
            // this._scrollList.refreshData(list, { aid: this.aid, code: this.code, joiner: this.param.data.joiner });

        }
    }
    private getLuckyHandle(event: egret.Event) {
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
    }
    private refreashView() {
        let vo = <AcWealthCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let list = vo.getSortRewards();
        if (this._luckyinfo) {
            for (let i = 0; i < list.length; i++) {
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
        list.sort((a, b) => {
            return a.sortId - b.sortId;
        });
        this._scrollList.refreshData(list, { aid: this.aid, code: this.code, joiner: this.param.data.joiner });
    }
    protected getResourceList(): string[] {
        let arr: string[] = [];
        if (this.param.data.code != "1" && this.param.data.code != "2") {
            arr = [
                "acwealthcarpview_balloon_title_1-" + this.getUiCode(),
                "acwealthcarpview_balloon_title_2-" + this.getUiCode(),
                "acwealthcarpview_balloon_title_3-" + this.getUiCode(),
                "acwealthcarpview_balloon_title_4-" + this.getUiCode(),
                "acwealthcarpview_balloon_title_5-" + this.getUiCode(),
                "acwealthcarpview_balloon_title_6-" + this.getUiCode(),
                "acwealthcarpview_balloon_title_7-" + this.getUiCode(),
            ]
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
            ]
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
            ]
        }
        return super.getResourceList().concat([
            "acwealthcarpview_common_line",
            "acwealthcarpeffect"
        ]).concat(arr);
    }
    protected getTitleBgName(): string {
        return null;
    }
    protected getTitleStr(): string {
        return null;
    }
    protected getRuleInfo(): string {
        return "acWealthCarpViewRule-" + this.param.data.code;
    }
    protected getUiCode() {
        if (this.param.data.code == "4") {
            return "3";
        }
        return this.param.data.code;
    }
    public dispose(): void {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCARPREWARD, this.getRewardHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, this.getLuckyHandle, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this)
        this.aid = null;
        this.code = null;
        this._scrollList = null;
        this._luckyinfo = null;
        super.dispose();
    }

}