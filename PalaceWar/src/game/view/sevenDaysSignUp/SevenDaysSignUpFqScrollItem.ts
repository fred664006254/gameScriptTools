/**
 * 	七日好礼item
 * author 张朝阳
 * date 2019/3/19
 * @class SevenDaysSignUpFqScrollItem
 */
class SevenDaysSignUpFqScrollItem extends ScrollListItem {

    public constructor() {
        super();
    }

    public initItem(index: number, data: any, itemParam: any): void {
        let isEnSp = Api.sevenDaysSignupLoginVoApi.isEnSp();

        this.width = 600;

        let bgstr = isEnSp ? "public_popupscrollitembg" : "public_9_bg14";

        let itembg = BaseBitmap.create(bgstr);
        itembg.width = this.width;
        itembg.height = 314;
        itembg.setPosition(this.x + this.width / 2 - itembg.width / 2, 0);
        this.addChild(itembg);

        if (data.id == "signUp3")
        {   
            this.height = 190;
            itembg.height = this.height;

            let titleBg = BaseBitmap.create("shopview_greenbar");
            titleBg.setPosition(itembg.x, itembg.y + 5);
            this.addChild(titleBg);

            let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSign3Title",), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleTxt.setPosition(titleBg.x + 40, titleBg.y + titleBg.height / 2 - titleTxt.height / 2);
            this.addChild(titleTxt);

            let rewards = Config.SevendayssignupCfg.getSignup3CfgById(itemParam.day).getReward;
            let rewardsVoList = GameData.formatRewardItem(rewards);
            for (let i = 0; i < rewardsVoList.length; i++) {
                let rewardDB = GameData.getItemIcon(rewardsVoList[i], true, true);
                rewardDB.setPosition(itembg.x + i * (rewardDB.width + 5) + 20, titleBg.y + titleBg.height + 5);
                this.addChild(rewardDB);

            }
            if (itemParam.day <= Api.sevenDaysSignupLoginVoApi.nowDay()) 
            {
                let isReceive: boolean = Api.sevenDaysSignupLoginVoApi.checkReadReward(itemParam.day);
                 if (isReceive) {
                    let receiveBMScale = 0.69;
                    let receiveBM = BaseBitmap.create("collectflag");
                    receiveBM.setScale(receiveBMScale);
                    receiveBM.setPosition(itembg.x + itembg.width - receiveBM.width * receiveBMScale - 30, itembg.y + itembg.height - receiveBM.height * receiveBMScale - 30);
                    this.addChild(receiveBM);
                }
                else 
                {
                    let receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", () => {
                        if (Api.sevenDaysSignupLoginVoApi.checkTimeEnd()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                            return;
                        }
                        NetManager.request(NetRequestConst.REQUEST_SEVENDAYSIGN_GETSIGN3REWARD, { "rKey": itemParam.day });
                    }, this);
                    receiveBtn.setPosition(itembg.x + itembg.width - receiveBtn.width - 30, itembg.y + itembg.height - receiveBtn.height - 30);
                    this.addChild(receiveBtn);
                }
            }
            else
            {
                 let unBegin = BaseBitmap.create("sevendayssignupview_common_unbegin");
                unBegin.setPosition(itembg.x + itembg.width - unBegin.width - 30, itembg.y + itembg.height - unBegin.height - 30);
                this.addChild(unBegin);
            }

            return;
        }

        let fqbg = BaseLoadBitmap.create("sevendayssignupview_gamebg_" + itemParam.day + "_" + data.id);
        fqbg.width = 576;//576 × 290
        fqbg.height = 290;
        fqbg.setPosition(itembg.x + itembg.width / 2 - fqbg.width / 2, itembg.y + 12)
        this.addChild(fqbg);


        let offsetHeight: number = 0;
        for (let i = 1; i <= data.titleNumber; i++) {
            let singleHeight: number = 0;
            let titlebg = BaseLoadBitmap.create("acmidautumnview_titlebg");
            titlebg.width = 580;
            titlebg.height = 35;
            titlebg.setPosition(itembg.x + itembg.width / 2 - titlebg.width / 2, fqbg.y + fqbg.height + offsetHeight + 12);
            this.addChild(titlebg);

            let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpViewGameTitle_" + itemParam.day + "_" + data.id + "_" + i), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleTF.setPosition(titlebg.x + titlebg.width / 2 - titleTF.width / 2, titlebg.y + titlebg.height / 2 - titleTF.height / 2)
            this.addChild(titleTF);

            let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
            itemTopLine.width += titleTF.width;
            itemTopLine.setPosition(titlebg.x + titlebg.width / 2 - itemTopLine.width / 2, titlebg.y + titlebg.height / 2 - itemTopLine.height / 2);
            this.addChild(itemTopLine);

            let desc = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpViewGameDesc_" + itemParam.day + "_" + data.id + "_" + i), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            desc.width = fqbg.width;
            desc.setPosition(titlebg.x + titlebg.width / 2 - desc.width / 2, titlebg.y + titlebg.height + 12);
            desc.lineSpacing = 3;
            this.addChild(desc);
            singleHeight = desc.y + desc.height - titlebg.y + 12;
            offsetHeight += singleHeight;

        }
        // let desc = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpViewGameDesc_" + itemParam.day + "_" + data), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        // desc.width = fqbg.width;
        // desc.setPosition(fqbg.x, fqbg.y + fqbg.height + 5);
        // this.addChild(desc);
        itembg.height += offsetHeight + 5;
        this.height = itembg.height;

    }
    public dispose(): void {

        super.dispose();
    }

}