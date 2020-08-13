/**
 * 新官上任，任务item
 */
class LoginWeekCell extends ScrollListItem {

    private _tadayTaskTxt: BaseTextField = null;
    private _data = null;
    private _key = null;
    private _goBtn: BaseButton;
    private _goBtn2: BaseButton = null;
    private _gobtnTypeNum: number = 0;
    private _goBtn3: BaseButton = null;
    private _collectflag: BaseBitmap = null;
    private public_dot: BaseBitmap = null;
    protected initItem(index: number, data: any) {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO, this.update, this);
        let cfg = GameConfig.config.loginweekCfg.dailyTask[LoginWeekView.TADAY];
        this._data = cfg[data];
        this._key = data;
        this.height = 174;
        // getTaskLength
        let wordsBg: BaseBitmap = null;
        if (this._data.questType == "123") {
            wordsBg = BaseBitmap.create("acnewyear_itembg");
            wordsBg.width = 606;
            wordsBg.height = 200;
            this.height = 208;
        } else {
            wordsBg = BaseBitmap.create("activity_db_01");
            wordsBg.width = 606;
            wordsBg.height = 170;
        }


        this.addChild(wordsBg);

        if (this._data.questType == "123") {
            let rewardsArr: Array<RewardItemVo> = GameData.formatRewardItem(this._data.reward);
            let reward = rewardsArr[0];
            if (reward.type == 8) {
                // 门客形象
                let servantIcon = BaseLoadBitmap.create("servant_full_" + reward.id);
                servantIcon.scaleX = 0.4;
                servantIcon.scaleY = 0.4;
                servantIcon.x = -30;
                servantIcon.y = 0;
                this.addChild(servantIcon);

                // 条件
                let rechargeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
                var num1 = 0;
                let task = Api.otherInfoVoApi.getLoginWeekTask();
                if (task && task[this._data.questType]) {
                    num1 = task[this._data.questType];
                }
                rechargeTxt.text = LanguageManager.getlocal("loginweek_recharge_get", [num1 + "", this._data.value]);
                rechargeTxt.x = 228;
                rechargeTxt.y = 57 - rechargeTxt.height / 2;
                this._tadayTaskTxt = rechargeTxt;
                this.addChild(rechargeTxt);
                // 名称
                let servantName = ComponentManager.getTextField(reward.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
                servantName.x = 228;
                servantName.y = 100 - servantName.height / 2;
                this.addChild(servantName);

                // 综合资质
                let servantCfg = Config.ServantCfg.getServantItemById(reward.id);
                let starNum = Config.ServantCfg.getServantItemById(reward.id).getStarNums();
                let str = LanguageManager.getlocal("servantInfo_title", [String(starNum)]);
                let totalTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
                totalTxt.x = 228;
                totalTxt.y = 145 - totalTxt.height / 2;
                this.addChild(totalTxt);

            } else {

                // 图标背景
                let small_package_bg: BaseBitmap = BaseBitmap.create("progress6_bg");
                this.addChild(small_package_bg);
                small_package_bg.x = 40;
                small_package_bg.y = 40;
                let cloud = BaseBitmap.create("acnewyear_cloud");
                cloud.x = small_package_bg.x + small_package_bg.width - cloud.width - 7;
                cloud.y = small_package_bg.y + small_package_bg.height - cloud.height - 7;
                this.addChild(cloud);
                // 图标
                let icon = BaseLoadBitmap.create(reward.icon);
                icon.width = 100;
                icon.height = 100;
                icon.x = small_package_bg.x + small_package_bg.width / 2 - icon.width / 2;
                icon.y = small_package_bg.y + small_package_bg.height / 2 - icon.height / 2;
                this.addChild(icon);

                // 条件
                let rechargeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
                var num1 = 0;
                let task = Api.otherInfoVoApi.getLoginWeekTask();
                if (task && task[this._data.questType]) {
                    num1 = task[this._data.questType];
                }
                rechargeTxt.text = LanguageManager.getlocal("loginweek_recharge_get", [num1 + "", this._data.value]);
                rechargeTxt.x = 228;
                rechargeTxt.y = 57 - rechargeTxt.height / 2;
                this._tadayTaskTxt = rechargeTxt;
                this.addChild(rechargeTxt);
                // 名称
                let itemName = ComponentManager.getTextField(reward.name + "x" + reward.num, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
                itemName.x = 228;
                itemName.y = 100 - itemName.height / 2;
                this.addChild(itemName);
            }
        }
        if (this._data.questType != "123") {
            //任务红色底
            let bottom2: BaseBitmap = BaseBitmap.create("activity_charge_red");
            this.addChild(bottom2);
            bottom2.x = -1;


            //任务：1／10
            let tadayTaskTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            var num1 = 0;
            let task = Api.otherInfoVoApi.getLoginWeekTask();
            if (task && task[this._data.questType]) {
                num1 = task[this._data.questType];
            }
            if (this._data.questType == 105) {
                tadayTaskTxt.text = LanguageManager.getlocal("acNewYearquestType" + this._data.questType, [
                    LanguageManager.getlocal("officialTitle"+ num1),
                    LanguageManager.getlocal("officialTitle"+ this._data.value)
                ]);
            } else {
                tadayTaskTxt.text = LanguageManager.getlocal("acNewYearquestType" + this._data.questType, [num1 + "", this._data.value]);
            }
            tadayTaskTxt.x = 10;
            tadayTaskTxt.y = 5;
            this._tadayTaskTxt = tadayTaskTxt;
            this.addChild(tadayTaskTxt);
            bottom2.width = tadayTaskTxt.textWidth + 35;

            //可获得
            let needNumTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
            needNumTxt.text = LanguageManager.getlocal("acNewYearViewneedNum");
            needNumTxt.x = 50;
            needNumTxt.y = 80;
            this.addChild(needNumTxt);

            let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(this._data.reward, true);
            if (iconList && iconList.length > 0) {

                //额外赠送ICON
                let startX: number = 150;
                let startY: number = 50;
                let l: number = iconList.length;
                var _icon: BaseDisplayObjectContainer;
                for (let i: number = 0; i < l; i++) {
                    let icon: BaseDisplayObjectContainer = iconList[i];
                    icon.scaleX = 0.78;
                    icon.scaleY = 0.78;
                    icon.setPosition(startX + i * (icon.width * icon.scaleX + 12), startY);
                    this.addChild(icon);
                }
            }

        }

        //令牌
        var tokenIcon: BaseBitmap = BaseBitmap.create("loginweek_token");
        tokenIcon.setScale(0.5);
        tokenIcon.x = 475 - tokenIcon.width / 2 * tokenIcon.scaleX;
        tokenIcon.y = wordsBg.height - 104 - tokenIcon.height / 2 * tokenIcon.scaleY;
        this.addChild(tokenIcon);

        //令牌数量
        let tokenNumTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        tokenNumTxt.text = "+" + this._data.getScore;
        tokenNumTxt.x = 535 - tokenNumTxt.width / 2;
        tokenNumTxt.y = wordsBg.height - 98 - tokenNumTxt.height / 2;
        this.addChild(tokenNumTxt);

        //前往
        this._goBtn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "taskGoBtn", this.collectHandler, this);
        this._goBtn2.x = 509 - this._goBtn2.width / 2;
        this._goBtn2.y = wordsBg.height - 53 - this._goBtn2.height / 2;
        this.addChild(this._goBtn2);

        //领取
        this._goBtn3 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._goBtn3.x = 509 - this._goBtn3.width / 2;
        this._goBtn3.y = wordsBg.height - 53 - this._goBtn3.height / 2;
        this._goBtn3.visible = false;
        this.addChild(this._goBtn3);

        //	购买按钮
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", this.buyHandler, this);
        this._goBtn.x = 509 - this._goBtn.width / 2;
        this._goBtn.y = wordsBg.height - 53 - this._goBtn.height / 2;
        this.addChild(this._goBtn);
        let buyTxt = ComponentManager.getTextField(this._data.value, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        let gemIcon = BaseLoadBitmap.create("itemicon1");
        gemIcon.width = 100;
        gemIcon.height = 100;
        gemIcon.scaleX = 0.4;
        gemIcon.scaleY = 0.4;
        this._goBtn.addChild(gemIcon);
        this._goBtn.addChild(buyTxt);
        gemIcon.x = this._goBtn.width / 2 - (gemIcon.width * gemIcon.scaleX + buyTxt.width + 4) / 2;
        buyTxt.x = gemIcon.x + gemIcon.width * gemIcon.scaleX + 4;
        gemIcon.y = this._goBtn.height / 2 - gemIcon.height * gemIcon.scaleY / 2;
        buyTxt.y = this._goBtn.height / 2 - buyTxt.height / 2;

        this.public_dot = BaseBitmap.create("public_dot2");
        this.addChild(this.public_dot);
        this.public_dot.x = this._goBtn3.x + this._goBtn3.width - 20;
        this.public_dot.y = this._goBtn3.y - 3;
        this.public_dot.visible = false;
        //	已领取 
        let collectflag = BaseBitmap.create("collectflag");
        collectflag.x = 509 - collectflag.width / 2;
        collectflag.y = wordsBg.height - 55 - collectflag.height / 2;
        this.addChild(collectflag);
        collectflag.visible = false;
        collectflag.touchEnabled = false;
        this._collectflag = collectflag;

        this.update();
    }
    private collectHandler() {

        if (Api.otherInfoVoApi.getLoginWeekTimeout()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._gobtnTypeNum == 1) {
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETLOGINWEEKREWARD), this.refreshUIInfo, this);
            NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETLOGINWEEKREWARD, { taskId: this._key, choseday: LoginWeekView.TADAY, ftype: 1 });
            return;
        }

        let openType = this._data.openType;
        let viewName = App.StringUtil.firstCharToUper(openType);
        if (openType == "level" || openType == "arrival" || openType == "") {
            // ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONVIEW);
            PlayerBottomUI.getInstance().show();
        }
        else {
            if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
                let isShowNpc: boolean = Api[openType + "VoApi"].isShowNpc();
                if (!isShowNpc) {
                    let lockedStr: string = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
                    App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
                    return;
                }
            }
            if (openType == "alliance") {
                Api.allianceVoApi.openMainView();
                return;
            }

            if (openType == "studyatk") {
                Api.studyatkVoApi.openMainView();
                return;
            }
            if (egret.getDefinitionByName(viewName + "View")) {
                ViewController.getInstance().openView(viewName + "View");

            } else if (egret.getDefinitionByName(viewName + "PopupView")) //可以跳转
            {
                ViewController.getInstance().openView(viewName + "PopupView");
            }
            else {
                if (openType == "recharge") {
                    ViewController.getInstance().openView(viewName + "Vip" + "View");
                }
            }
        }
    }
    /** 直接购买物品 */
    private buyHandler(param: any): void {

        if (Api.otherInfoVoApi.getLoginWeekTimeout()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        //显示弹出框
        ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW, {
            useNum: this._data.value,								//物品价格
            confirmCallback: this.confirmBuy,	//确认回调函数
            handler: this,									//target
            num: Api.playerVoApi.getPlayerGem(),									//玩家元宝数
            msg: LanguageManager.getlocal('loginweekBuyTip1', [this._data.value.toString(), LanguageManager.getlocal("itemBtn")]),									//显示消息
            id: 1											//消耗物品id  1->元宝
        });
    }
    private confirmBuy() {
        //任务 1 礼包购买
        if (this._data.value > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_BUYLOGINWEEKGIFT), this.useCallback, this);
        NetManager.request(NetRequestConst.REQUEST_OTHERINFO_BUYLOGINWEEKGIFT, { choseday: LoginWeekView.TADAY });
    }

    private useCallback(event: egret.Event): void {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_BUYLOGINWEEKGIFT, this.useCallback, this);
        if (event.data.ret) {
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards));
        }
    }
    private refreshUIInfo(evt: egret.Event): void {
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
    public update(): void {
        // 0不可领 1未领取 2已领取
        if (this._data && this._data.questType) {
            if (Api.otherInfoVoApi.getLoginWeekFlags()[LoginWeekView.TADAY] && Api.otherInfoVoApi.getLoginWeekFlags()[LoginWeekView.TADAY][this._key] == "1") {
                this._gobtnTypeNum = 2;
            } else if (Api.otherInfoVoApi.getLoginWeekTask()[this._data.questType] >= this._data.value) {
                this._gobtnTypeNum = 1;
            } else {
                this._gobtnTypeNum = 0;
            }
        }


        if (this._collectflag) {
            this._collectflag.visible = this._gobtnTypeNum == 2;
        }
        if (this._goBtn2) {
            this._goBtn2.visible = this._gobtnTypeNum == 0 && this._data.questType != 124;
        }
        if (this._goBtn3) {
            this._goBtn3.visible = this._gobtnTypeNum == 1 && this._data.questType != 124;
        }
        if (this._goBtn) {
            this._goBtn.visible = this._gobtnTypeNum != 2 && this._data.questType == 124;;
        }
        if (this.public_dot) {
            this.public_dot.visible = this._gobtnTypeNum == 1 && this._data.questType != 124;;
        }

        this._tadayTaskTxt.text = "";

        if (this._data.questType == "123") {
            var num1 = 0;
            let task = Api.otherInfoVoApi.getLoginWeekTask();
            if (task && task[this._data.questType]) {
                num1 = task[this._data.questType];
            }
            this._tadayTaskTxt.text = LanguageManager.getlocal("loginweek_recharge_get", [num1 + "", this._data.value]);
        } else {
            var num1 = 0;
            let task = Api.otherInfoVoApi.getLoginWeekTask();
            if (task && task[this._data.questType]) {
                num1 = task[this._data.questType];
            }

            if (this._data.questType == 105) {
                this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYearquestType" + this._data.questType, [
                    LanguageManager.getlocal("officialTitle"+ num1),
                    LanguageManager.getlocal("officialTitle"+ this._data.value)
                ]);
            } else {
                this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYearquestType" + this._data.questType, [num1 + "", this._data.value]);
            }
        }
    }

    public dispose(): void {
        this._goBtn3 = null;
        this._goBtn2 = null;
        this._goBtn = null;
        this._tadayTaskTxt = null;
        this._collectflag = null;
        // NewYear2ScrollItem.TADAY =0;

        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO, this.update, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETLOGINWEEKREWARD), this.refreshUIInfo, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_BUYLOGINWEEKGIFT), this.useCallback, this);
        super.dispose();
    }
}