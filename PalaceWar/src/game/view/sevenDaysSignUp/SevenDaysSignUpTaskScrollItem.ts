/**
 * 	七日好礼item
 * author 张朝阳
 * date 2019/3/19
 * @class SevenDaysSignUpTaskScrollItem
 */
class SevenDaysSignUpTaskScrollItem extends ScrollListItem {

    public constructor() {
        super();
    }
	public getSpaceY():number
	{
		return 5;
	}
    public initItem(index: number, data: any, itemParam: any): void {
        let isEnSp = Api.sevenDaysSignupLoginVoApi.isEnSp();

        this.width = 610;
        this.height = 190;

        let bgstr = isEnSp ? "public_popupscrollitembg" : "public_9_bg14";

        let itembg = BaseBitmap.create(bgstr);
        itembg.width = this.width;
        itembg.height = this.height;
        itembg.setPosition(this.x + this.width / 2 - itembg.width / 2, 0);
        this.addChild(itembg);

        let titlebgStr = isEnSp ? "shopview_itemtitle" : "activity_charge_red";	     

        let titleBg = BaseBitmap.create(titlebgStr);
        titleBg.setPosition(itembg.x, itembg.y + 5);
        this.addChild(titleBg);

        let rewardbg:BaseBitmap=null;
        if(isEnSp)
        {
            titleBg.width = 370;
            rewardbg = BaseBitmap.create("public_scrolllistbg");
            this.addChild(rewardbg);            
        }        

        let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpViewTab2tasktype_" + data.questType, [String(data.value), data.need]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (data.openType == "level") {
            let str: string = LanguageManager.getlocal("officialTitle" + data.value);
            titleTxt.text = LanguageManager.getlocal("sevenDaysSignUpViewTab2tasktype_" + data.questType, [str]);
        }
        titleTxt.setPosition(titleBg.x + 20, titleBg.y + titleBg.height / 2 - titleTxt.height / 2);
        this.addChild(titleTxt);

        let rewards = data.getReward;
        let rewardsVoList = GameData.formatRewardItem(rewards);
        for (let i = 0; i < rewardsVoList.length; i++) {
            let rewardDB = GameData.getItemIcon(rewardsVoList[i], true, true);
            rewardDB.setPosition(itembg.x + i * (rewardDB.width + 5) + 20, titleBg.y + titleBg.height + 5);
            if(isEnSp)
            {
                rewardDB.setPosition(rewardDB.x+10,rewardDB.y+13);
                if(i == 0)
                {
                    rewardbg.x = rewardDB.x-10;
                    rewardbg.y = rewardDB.y-10;
                    rewardbg.height = rewardDB.y + rewardDB.height + 10 - rewardbg.y;
                }
                if(i == rewardsVoList.length-1)
                {
                    rewardbg.width = rewardDB.x+rewardDB.width+10 - rewardbg.x;
                }
            }            
            this.addChild(rewardDB);
        }

        // Api.sevenDaysSignupLoginVoApi.nowDay()
        if (itemParam.day <= Api.sevenDaysSignupLoginVoApi.nowDay()) {
            let value: number = Api.sevenDaysSignupLoginVoApi.taskValue(itemParam.day, Number(data.id));
            let isSuccess: boolean = Api.sevenDaysSignupLoginVoApi.checkTaskSuccess(itemParam.day, Number(data.id));
            let isReceive: boolean = Api.sevenDaysSignupLoginVoApi.checkTaskReceive(itemParam.day, Number(data.id));
            if (isReceive) {
                let receiveBMScale = 0.69;
                let receiveBM = BaseBitmap.create("collectflag");
                receiveBM.setScale(receiveBMScale);
                receiveBM.setPosition(itembg.x + itembg.width - receiveBM.width * receiveBMScale - 30, itembg.y + itembg.height - receiveBM.height * receiveBMScale - 30);
                this.addChild(receiveBM);
            }
            else {
                if (isSuccess) {
                    let receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", () => {
                        if (Api.sevenDaysSignupLoginVoApi.checkTimeEnd()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                            return;
                        }
                        NetManager.request(NetRequestConst.REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNTASKREWARD, { "rKey": Number(data.id), "rDay": itemParam.day });
                    }, this);
                    receiveBtn.setPosition(itembg.x + itembg.width - receiveBtn.width - 30, itembg.y + itembg.height - receiveBtn.height - 30);
                    this.addChild(receiveBtn)

                    let dayTxt = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpViewValueTip1", [String(value), data.value]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                    if (data.openType == "level") {
                        let str: string = LanguageManager.getlocal("officialTitle" + Api.playerVoApi.getPlayerLevel());
                        dayTxt.text = LanguageManager.getlocal("sevenDaysSignUpViewTab2taskLevelValue1", [str]);
                    }
                    dayTxt.setPosition(receiveBtn.x + receiveBtn.width / 2 - dayTxt.width / 2, receiveBtn.y - dayTxt.height - 5);
                    this.addChild(dayTxt);
                }
                else {
                    let goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "sevenDaysSignUpViewgoBtn", this.goBtnClick, this, [data.openType]);
                    goBtn.setPosition(itembg.x + itembg.width - goBtn.width - 30, itembg.y + itembg.height - goBtn.height - 30);
                    this.addChild(goBtn)

                    let dayTxt = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpViewValueTip2", [String(value), data.value]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                    if (data.openType == "level") {
                        let str: string = LanguageManager.getlocal("officialTitle" + Api.playerVoApi.getPlayerLevel());
                        dayTxt.text = LanguageManager.getlocal("sevenDaysSignUpViewTab2taskLevelValue2", [str]);
                    }
                    dayTxt.setPosition(goBtn.x + goBtn.width / 2 - dayTxt.width / 2, goBtn.y - dayTxt.height - 5);
                    this.addChild(dayTxt);
                }
            }



        }
        else {
            let unBegin = BaseBitmap.create("sevendayssignupview_common_unbegin");
            unBegin.setPosition(itembg.x + itembg.width - unBegin.width - 30, itembg.y + itembg.height - unBegin.height - 30);
            this.addChild(unBegin);
        }


    }

    private goBtnClick(data) {
        if (Api.sevenDaysSignupLoginVoApi.checkTimeEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        let openType = data;
        if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
            let isShowNpc: boolean = Api[openType + "VoApi"].isShowNpc();
            if (!isShowNpc) {
                let lockedStr: string = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
                App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
                return;
            }
        }
        if (openType == "wife") {
            ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1);
        }
        else if (openType == "child") {
            ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW);
        }
        else if (openType == "search") {
            ViewController.getInstance().openView(ViewConst.COMMON.SEARCHVIEW);
        }
        else if (openType == "atkrace") {
            ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVIEW);
        }
        else if (openType == "affair") {
            ViewController.getInstance().openView(ViewConst.COMMON.AFFAIRVIEW);
        }
        else if (openType == "challenge") {
            ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
        }
        else if (openType == "servant") {
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
        }
        else if (openType == "level") {
            // ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);
            PlayerBottomUI.getInstance().show();
        }
        else if (openType == "bookroom") {
            ViewController.getInstance().openView(ViewConst.COMMON.BOOKROOMVIEW);
        }
    }
    public dispose(): void {

        super.dispose();
    }

}