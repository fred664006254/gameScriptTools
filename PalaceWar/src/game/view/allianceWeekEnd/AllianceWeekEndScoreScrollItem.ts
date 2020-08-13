/**
  * 宝箱奖励item
  * @author 张朝阳
  * date 2019/5/23
  * @class AllianceWeekEndScoreScrollItem
  */
class AllianceWeekEndScoreScrollItem extends ScrollListItem {


    public constructor() {
        super();
    }
    protected initItem(index: number, data: any, itemParam: any) {


        this.width = 510;
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 510;
        bg.height = 140;
        this.addChild(bg);

        let titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 508;
        titleBg.height = 35;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
        this.addChild(titleBg);

        let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndScorePopupViewItemTitle", [String(data.score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
        this.addChild(titleTF);

        let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
        itemTopLine.width += titleTF.width;
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);

        let rewardVoList = GameData.formatRewardItem(data.getReward);
        let scale = 0.85;
        let itemHeight = 0;
        let rewardbg = BaseBitmap.create("public_9_managebg");
        rewardbg.width = 482;
        rewardbg.setPosition(titleBg.x + titleBg.width / 2 - rewardbg.width / 2, titleBg.y + titleBg.height + 3);
        this.addChild(rewardbg);
        for (let i = 0; i < rewardVoList.length; i++) {
            let rewardDB = GameData.getItemIcon(rewardVoList[i], true);
            rewardDB.setScale(scale);
            rewardDB.setPosition(rewardbg.x + 5 + ((rewardDB.width - 13) * (i % 5)), rewardbg.y + 5 + ((rewardDB.height - 8) * Math.floor(i / 5)))
            this.addChild(rewardDB);
            itemHeight = rewardDB.height;
        }
        rewardbg.height = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        bg.height += rewardbg.height;

        let progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 355);
        progressBar.setPosition(rewardbg.x + 2, rewardbg.y + rewardbg.height + 32);
        this.addChild(progressBar);
        let percent = Api.myAllianceWeekVoApi.getScore() / data.score;
        let textStr = Api.myAllianceWeekVoApi.getScore() + "/" + data.score;
        let textColor = TextFieldConst.COLOR_WHITE;
        progressBar.setPercentage(percent, textStr, textColor);

        // let titelTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipAchievementPopupViewItemProgress-"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        // titelTxt.setPosition(progressBar.x + progressBar.width / 2 - titelTxt.width / 2, progressBar.y - titelTxt.height - 5);
        // this.addChild(titelTxt);

        if (Api.myAllianceWeekVoApi.checkBoxReceive(data.id)) {
            let flagScale = 0.6;
            let flag = BaseBitmap.create("collectflag");
            flag.setScale(flagScale);
            flag.setPosition(bg.x + bg.width - flag.width * flagScale - 10, progressBar.y + progressBar.height / 2 - flag.height * flagScale / 2);
            this.addChild(flag);
        }
        else {
            let receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'taskCollect', () => {
                if (!Api.allianceWeekVoApi.checkActivityStart()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndViewAcTimeEndTip"));
                    return;
                }
                NetManager.request(NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD, { rkey: data.id });
            }, this);
            receiveBtn.setPosition(bg.x + bg.width - receiveBtn.width - 10, progressBar.y + progressBar.height / 2 - receiveBtn.height / 2);
            this.addChild(receiveBtn);
            if (Api.myAllianceWeekVoApi.getScore() >= data.score) {
                receiveBtn.setEnable(true);
            }
            else {
                receiveBtn.setEnable(false);
            }
        }
        this.height = bg.height;
    }
    public dispose(): void {
        super.dispose();
    }
}