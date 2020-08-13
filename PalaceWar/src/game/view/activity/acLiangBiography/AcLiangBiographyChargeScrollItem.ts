/**
  * 诸葛亮传活动充值奖励item
  * @author 张朝阳
  * date 2019/5/16
  * @class AcLiangBiographyChargeScrollItem
  */
class AcLiangBiographyChargeScrollItem extends ScrollListItem {


    public constructor() {
        super();
    }
    protected initItem(index: number, data: any, itemParam: any) {

        let code = itemParam.code;
        let aid = itemParam.aid;
        let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        //创建ui
        //背景图片
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 510;
        bg.height = 130;
        this.addChild(bg);

        let titleBg = BaseBitmap.create("accarnivalview_tab_red");
        titleBg.setPosition(4, 10);
        this.addChild(titleBg);

        let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyChargeItemTitle-" + code, [String(data.needGem)]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 15, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);


        let rewards = "1012_0_" + data.specialGift + "_" + itemParam.code + "|" + data.getReward;
        // let rewards = data.getReward;
        let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
        let rewardScale = 0.82;
        let itemHeight: number = 0;
        for (let i = 0; i < rewardVoList.length; i++) {
            let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(bg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
            this.addChild(rewardDB);
            itemHeight = rewardDB.height * rewardScale + 15;
        }
        let offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        bg.height += offsetH;

        //进度条
        let progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 350);
        progress.scaleX = 0.97;
        progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 25);
        this.addChild(progress);
        progress.setPercentage(vo.getChargeValue() / data.needGem, LanguageManager.getlocal("acBeautyVoteViewTab2Itempg-1", [String(vo.getChargeValue()), String(data.needGem)]), TextFieldConst.COLOR_WHITE);
        this.height = bg.height;


        if (vo.getChargeValue() >= data.needGem) {
            titleBg.setRes("accarnivalview_tab_green");
            if (vo.checkRechargeFlag(data.id)) {
                let receiveflagScale: number = 0.6;
                let receiveflag = BaseBitmap.create("collectflag");
                receiveflag.setScale(receiveflagScale);
                receiveflag.setPosition(bg.x + bg.width - receiveflag.width * receiveflagScale - 20, bg.y + bg.height - receiveflag.height * receiveflagScale - 10);
                this.addChild(receiveflag);
            }
            else {
                let receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
                    if (!vo.isStart) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETLIANGCHARGE, { activeId: vo.aidAndCode, rkey: data.id });
                }, this);
                receiveBtn.setPosition(bg.x + bg.width - receiveBtn.width - 10, bg.y + bg.height - receiveBtn.height - 10);
                this.addChild(receiveBtn);
            }

        }
        else {
            titleBg.setRes("accarnivalview_tab_red");
            let rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "acLiangBiographyChargeItemRecharge-" + itemParam.code, () => {
                if (vo.checkIsInEndShowTime()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            }, this);
            rechargeBtn.setPosition(bg.x + bg.width - rechargeBtn.width - 10, bg.y + bg.height - rechargeBtn.height - 10);
            this.addChild(rechargeBtn);
        }
    }
    public dispose(): void {
        super.dispose();
    }
}