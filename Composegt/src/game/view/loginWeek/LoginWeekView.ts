/**
 * 新官上任
 * @author 赵占涛
 */
class LoginWeekView extends CommonView {
    private scrollList: ScrollList = null;
    static TADAY: number = 1;
    private boxArr: { boxBg: BaseBitmap, box: BaseBitmap }[];
    /** 当前阶段，最大可以超过4，达到5 */
    private curBoxIndex = 1;
    /** 当前阶段，不会超过4，以保证有对应配置*/
    private tmpBoxIndex = 1;
    private servantImg: BaseLoadBitmap = null;
    private boxItemBg: BaseBitmap = null;
    private boxItemIcon: BaseLoadBitmap = null;
    private getRewardBtn: BaseButton = null;
    private boxDescTxt: BaseTextField = null;
    private processTxt: BaseTextField = null;
    private processBar: ProgressBar = null;
    private publicDot: BaseBitmap[] = null;
    // 倒计时
    private countdownTxt: BaseTextField;

    initView() {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO, this.update, this);
        LoginWeekView.TADAY = Api.otherInfoVoApi.getLoginWeekDiffday();
        if (!Api.otherInfoVoApi.getLoginWeekTimeout() && !Api.otherInfoVoApi.getLoginWeekFirstPopup()) {
            NetManager.request(NetRequestConst.REQUEST_OTHERINFO_SETLOGINWEEKFIRSTFLAG, {});
        }
        // 标题
        let titletxt = BaseBitmap.create("loginweek_title");
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        titletxt.y = 5;
        this.addChild(titletxt);

        // banner
        let banner = BaseBitmap.create("loginweek_banner");
        banner.y = this.titleBg.y + this.titleBg.height;
        this.addChild(banner);

        //剩余时间
        this.countdownTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        let countdownTime = Api.otherInfoVoApi.getLoginWeekEndTime() - GameData.serverTime;
        if (countdownTime > 0) {
            this.countdownTxt.text = LanguageManager.getlocal("acTigertrappass_countdown_time", [
                App.DateUtil.getFormatBySecond(Math.max(0, (Api.otherInfoVoApi.getLoginWeekEndTime() - GameData.serverTime)), 8)
            ]);
        } else {
            this.countdownTxt.text = LanguageManager.getlocal("acPunishEnd");
        }
        this.countdownTxt.x = GameConfig.stageWidth / 2 - this.countdownTxt.width / 2;
        this.countdownTxt.y = banner.y + 10;
        this.addChild(this.countdownTxt);

        // 当前阶段
        this.curBoxIndex = Api.otherInfoVoApi.getLoginWeekCurBoxIndex();
        this.tmpBoxIndex = Math.min(4, this.curBoxIndex);
        let boxCfg = GameConfig.config.loginweekCfg.totalScoreReward[this.tmpBoxIndex];
        // 4个箱子
        this.boxArr = [];
        for (var i = 0; i < 4; i++) {
            let boxBg = BaseBitmap.create("loginweek_boxboder");
            boxBg.x = 70 + i * 95 - boxBg.width / 2;
            boxBg.y = banner.y + 217 - boxBg.height / 2;
            this.addChild(boxBg);
            let imgres = "dailytask_box2_1";
            let boxImg = BaseBitmap.create(imgres);
            boxImg.x = 70 + i * 95 - boxImg.width / 2;
            boxImg.y = banner.y + 217 - boxImg.height / 2 - 6;
            this.addChild(boxImg);
            boxImg.addTouchTap(this.boxClick, this, [i]);
            this.boxArr[i] = { boxBg: boxBg, box: boxImg };

            if (i < 3) {
                let arrow = BaseBitmap.create("loginweek_arrow");
                arrow.x = 115 + i * 95 - arrow.width / 2;
                arrow.y = banner.y + 217 - arrow.height / 2;
                this.addChild(arrow);
            }

        }

        let boxReward = GameData.formatRewardItem(boxCfg.reward)[0];
        if (boxReward.type == 8) {
            // 门客
            let servantIcon = BaseLoadBitmap.create("servant_full_" + boxReward.id);
            servantIcon.scaleX = 0.7;
            servantIcon.scaleY = 0.7;
            servantIcon.x = 290;
            servantIcon.y = 85;
            this.addChild(servantIcon);
            this.servantImg = servantIcon;
        } else {
            // 道具背景
            let itemBg = BaseBitmap.create("loginweek_boxitembg");
            itemBg.x = banner.x + 523 - itemBg.width / 2;
            itemBg.y = banner.y + 136 - itemBg.height / 2;
            this.addChild(itemBg);
            this.boxItemBg = itemBg;
            // 道具图标（奸臣令）
            let icon = BaseLoadBitmap.create(boxReward.icon);
            icon.width = 100;
            icon.height = 100;
            icon.x = itemBg.x + itemBg.width / 2 - icon.width / 2;
            icon.y = itemBg.y + itemBg.height / 2 - icon.height / 2;
            this.addChild(icon);
            this.boxItemIcon = icon;

        }
        // 阶段奖励
        let descStr = ""
        if (boxReward.type == 8) {
            descStr = LanguageManager.getlocal("loginweek_box_desc_servant", [String(boxCfg.needScore), boxReward.name]);
        } else {
            descStr = LanguageManager.getlocal("loginweek_box_desc_item", [String(boxCfg.needScore), boxReward.name, String(boxReward.num)]);
        }
        let descTxt = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.x = 5;
        descTxt.y = banner.y + 288 - descTxt.height / 2;
        this.addChild(descTxt);
        this.boxDescTxt = descTxt;

        // 领取
        let getRewardBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.reviceBtnClick, this);
        getRewardBtn.x = banner.x + 523 - getRewardBtn.width / 2;
        getRewardBtn.y = banner.y + 312 - getRewardBtn.height / 2;
        this.addChild(getRewardBtn);
        this.getRewardBtn = getRewardBtn;


        let progress = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 340);
        progress.x = 212 - progress.width / 2;
        progress.y = banner.y + 320 - progress.height / 2;
        this.addChild(progress);
        progress.setPercentage(Api.otherInfoVoApi.getLoginWeekScore() / boxCfg.needScore);
        this.processBar = progress;
        let progressTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        progressTxt.text = Api.otherInfoVoApi.getLoginWeekScore() + "/" + boxCfg.needScore;
        progressTxt.x = progress.x + progress.width / 2 - progressTxt.width / 2;
        progressTxt.y = progress.y + progress.height / 2 - progressTxt.height / 2 + 2;
        this.addChild(progressTxt);
        this.processTxt = progressTxt;
        // 标签页
        let tabBg = BaseBitmap.create("loginweek_tabbg");
        tabBg.y = banner.y + banner.height;
        this.addChild(tabBg);
        let btnArr = ["newayearDate1", "newayearDate2", "newayearDate3", "newayearDate4", "newayearDate5", "newayearDate6", "newayearDate7",];
        let tabCount = 3;
        let tabbarGroup = ComponentManager.getTabBarGroup(
            "loginweek_tab",
            btnArr,
            this.clickTabbarHandler,
            this
        );
        tabbarGroup.setSpace(0);
        tabbarGroup.x = 20;
        tabbarGroup.y = tabBg.y + 7;
        this.addChild(tabbarGroup);
        this.tabbarGroup = tabbarGroup;
        this.tabbarGroup.selectedIndex = LoginWeekView.TADAY - 1;
        this.publicDot = [];
        for (var i = 0; i < 7; i++) {
            let public_dot1 = BaseBitmap.create("public_dot2");
            this.addChild(public_dot1);
            public_dot1.x = tabbarGroup.x + 70 + i * 86;
            public_dot1.y = tabbarGroup.y;
            public_dot1.visible = false;
            this.publicDot[i] = public_dot1;
        }
        // 下方背景
        let bg1 = BaseBitmap.create("public_9v_bg02");
        bg1.width = 640;
        bg1.height = GameConfig.stageHeigth - tabBg.y - tabBg.height + 10;
        bg1.y = tabBg.y + tabBg.height - 10;
        this.addChild(bg1);

        let bottomBg = BaseBitmap.create("public_9v_bg03"); bottomBg.width = 640;
        bottomBg.height = GameConfig.stageHeigth - tabBg.y - tabBg.height + 10;
        bottomBg.y = tabBg.y + tabBg.height - 10;
        this.addChild(bottomBg);

        // 列表
        let tmpRect = new egret.Rectangle(0, 0, 606, bg1.height - 30);
        let list = this.getCurrDayData(LoginWeekView.TADAY);
        let scrollList = ComponentManager.getScrollList(LoginWeekCell, list, tmpRect, undefined, undefined, true);
        scrollList.y = bg1.y + 8;
        scrollList.x = GameConfig.stageWidth / 2 - scrollList.width / 2;
        this.addChild(scrollList);
        this.scrollList = scrollList;
        this.update();
    }

    protected clickTabbarHandler(data: any): void {
        if (data.index + 1 > Api.otherInfoVoApi.getLoginWeekDiffday()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("loginweek_time_not_enough", [String(data.index + 1 - Api.otherInfoVoApi.getLoginWeekDiffday())]));
            this.tabbarGroup.selectedIndex = LoginWeekView.TADAY - 1;
            return;
        }
        LoginWeekView.TADAY = data.index + 1;
        let list = this.getCurrDayData(LoginWeekView.TADAY);
        this.scrollList.refreshData(list);
    }
    private getCurrDayData(num: number = 0): Array<any> {
        var arr: Array<any> = GameConfig.config.loginweekCfg.dailyTask[num];
        var buyArr = [];
        let newArr: Array<any> = [];
        for (let key in arr) {
            if (arr[key].sortId) {
                if (PlatformManager.checkHideIconByIP()) {
                    if (arr[key].openType && arr[key].openType == "recharge" && arr[key].questType != "1002") {

                    } else {
                        newArr.push(key);
                    }
                } else {
                    newArr.push(key);
                }
            }
            else {
                buyArr.push(key)
            }
        }

        newArr.sort(function (a: any, b: any): number {
            if (arr[a].sortId > arr[b].sortId) return 1;
            else if (arr[a].sortId == arr[b].sortId) return 0;
            return -1;
        });
        return buyArr.concat(newArr);
    }
    private reviceBtnClick() {
        App.LogUtil.log("reviceBtnClick");
        if (Api.otherInfoVoApi.getLoginWeekTimeout()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.tmpBoxIndex != this.curBoxIndex) {
            // 已领取过不能再领
            App.CommonUtil.showTip(LanguageManager.getlocal("acMergeActiveSignTip2"));
            return;
        }
        let boxCfg = GameConfig.config.loginweekCfg.totalScoreReward[this.curBoxIndex];
        let boxReward = GameData.formatRewardItem(boxCfg.reward)[0];
        if (Api.otherInfoVoApi.getLoginWeekScore() < boxCfg.needScore) {
            App.CommonUtil.showTip(LanguageManager.getlocal("loginweek_token_not_enough"));
            return;
        }

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETLOGINWEEKREWARD), this.refreshUIInfo, this);
        NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETLOGINWEEKREWARD, { taskId: this.curBoxIndex, ftype: 2 });
    }
    /** 点击箱子 */
    private boxClick(target, index) {
        if (index + 1 == this.curBoxIndex) {
            let boxCfg = GameConfig.config.loginweekCfg.totalScoreReward[this.curBoxIndex];
            if (Api.otherInfoVoApi.getLoginWeekScore() >= boxCfg.needScore) {
                this.reviceBtnClick();// 直接领奖
                return;
            }
        }
        ViewController.getInstance().openView(ViewConst.POPUP.LOGINWEEKBOXDETAILVIEW);
    }
    private refreshUIInfo(evt: egret.Event) {

        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETLOGINWEEKREWARD, this.refreshUIInfo, this);

        if (evt) {
            if (evt.data && evt.data.ret) {
                let data = evt.data.data.data;
                let rewards = data.rewards;
                let rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);
                this.update();
            }
        }
    }
    private update() {
        this.curBoxIndex = Api.otherInfoVoApi.getLoginWeekCurBoxIndex();
        this.tmpBoxIndex = Math.min(4, this.curBoxIndex);
        let boxCfg = GameConfig.config.loginweekCfg.totalScoreReward[this.tmpBoxIndex];

        let boxReward = GameData.formatRewardItem(boxCfg.reward)[0];

        for (let i = 0; i < 4; i++) {
            this.boxArr[i].boxBg.texture = ResourceManager.getRes(this.curBoxIndex == i + 1 ? "loginweek_boxboder_light" : "loginweek_boxboder");
            let boxIcon = "";
            if (Api.otherInfoVoApi.getLoginWeekSinfo()[i + 1] == 1) {
                boxIcon = "dailytask_box2_3";
            } else if (Api.otherInfoVoApi.getLoginWeekScore() > GameConfig.config.loginweekCfg.totalScoreReward[i + 1].needScore) {
                boxIcon = "dailytask_box2_2";
            } else {
                boxIcon = "dailytask_box2_1";
            }
            this.boxArr[i].box.texture = ResourceManager.getRes(boxIcon);
        }
        // 阶段奖励
        let descStr = ""
        if (boxReward.type == 8) {
            descStr = LanguageManager.getlocal("loginweek_box_desc_servant", [String(boxCfg.needScore), boxReward.name]);
        } else {
            descStr = LanguageManager.getlocal("loginweek_box_desc_item", [String(boxCfg.needScore), boxReward.name, String(boxReward.num)]);
        }
        this.boxDescTxt.text = descStr;

        // 进度
        this.processBar.setPercentage(Api.otherInfoVoApi.getLoginWeekScore() / boxCfg.needScore);
        this.processTxt.text = Api.otherInfoVoApi.getLoginWeekScore() + "/" + boxCfg.needScore;


        if (boxReward.type == 8) {
            // 门客
            if (!this.servantImg) {
                let servantIcon = BaseLoadBitmap.create("servant_full_" + boxReward.id);
                servantIcon.scaleX = 0.7;
                servantIcon.scaleY = 0.7;
                servantIcon.x = 290;
                servantIcon.y = 85;
                this.addChild(servantIcon);
                this.servantImg = servantIcon;
            }
            this.servantImg.visible = true;
            this.servantImg.setload("servant_full_" + boxReward.id);
            if (this.boxItemBg) {
                this.boxItemBg.visible = false;
            }
            if (this.boxItemIcon) {
                this.boxItemIcon.visible = false;
            }
        } else {
            // 道具背景
            if (!this.boxItemBg) {
                let itemBg = BaseBitmap.create("loginweek_boxitembg");
                itemBg.x = 523 - itemBg.width / 2;
                itemBg.y = this.titleBg.y + this.titleBg.height + 136 - itemBg.height / 2;
                this.addChild(itemBg);
                this.boxItemBg = itemBg;
            }
            this.boxItemBg.visible = true;
            // 道具图标（奸臣令）
            if (!this.boxItemIcon) {
                let icon = BaseLoadBitmap.create(boxReward.icon);
                icon.width = 100;
                icon.height = 100;
                icon.x = this.boxItemBg.x + this.boxItemBg.width / 2 - icon.width / 2;
                icon.y = this.boxItemBg.y + this.boxItemBg.height / 2 - icon.height / 2;
                this.addChild(icon);
                this.boxItemIcon = icon;
            }
            this.boxItemIcon.visible = true;
            if (this.servantImg) {
                this.servantImg.visible = false;
            }
        }
        this.getRewardBtn.setText(this.tmpBoxIndex == this.curBoxIndex ? "taskCollect" : "candyGetAlready");
        // 页签红点
        for (var i = 0; i < 7; i++) {
            this.publicDot[i].visible = Api.otherInfoVoApi.getLoginWeekRedOneDay(i + 1);
        }
    }

    private tick() {
        let countdownTime = Api.otherInfoVoApi.getLoginWeekEndTime() - GameData.serverTime;
        if (countdownTime > 0) {
            this.countdownTxt.text = LanguageManager.getlocal("acTigertrappass_countdown_time", [
                App.DateUtil.getFormatBySecond(Math.max(0, (Api.otherInfoVoApi.getLoginWeekEndTime() - GameData.serverTime)), 8)
            ]);
        } else {
            this.countdownTxt.text = LanguageManager.getlocal("acPunishEnd");
        }
        this.countdownTxt.x = GameConfig.stageWidth / 2 - this.countdownTxt.width / 2;
    }
    protected getTitleBgName(): string {
        return "loginweek_titlebg";
    }

    protected getCloseBtnName(): string {
        return ButtonConst.BTN_WIN_CLOSEBTN;
    }
    protected getTitleStr(): string {
        return "";
    }
    protected getResourceList(): string[] {
        let resList = super.getResourceList().concat([
            "loginweek_arrow",
            "loginweek_banner",
            "loginweek_boxboder",
            "loginweek_boxboder_light",
            "loginweek_boxdetail2bg",
            "loginweek_boxdetailbg",
            "loginweek_buybg",
            "loginweek_tab",
            "loginweek_tab_down",
            "loginweek_tabbg",
            "loginweek_title",
            "loginweek_titlebg",
            "loginweek_token",
            "loginweek_boxitembg",
            "progress_type1_yellow2",
            "progress_type3_bg",
            "dailytask_box2_1",
            "dailytask_box2_2",
            "dailytask_box2_3",
            "acnewyear_itembg",
            "activity_db_01",
            "activity_charge_red",
            "progress6_bg",
            "acnewyear_cloud",
        ]);
        return resList;
    }

    public dispose(): void {

        this.scrollList = null;
        this.boxArr = null;
        this.curBoxIndex = 1;
        this.servantImg = null;
        this.boxItemBg = null;
        this.boxItemIcon = null;
        this.boxDescTxt = null;
        this.processTxt = null;
        this.processBar = null;
        this.countdownTxt = null;
        this.getRewardBtn = null;

        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO, this.update, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETLOGINWEEKREWARD, this.refreshUIInfo, this);

        super.dispose();
    }
}