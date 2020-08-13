/**
 * 	彩蛋奖励item
 * author 张朝阳
 * date 2019/3/13
 * @class AcWealthCarpRewardScrollItem
 */
class AcWealthCarpRewardScrollItem extends ScrollListItem {

    private code: any = null;
    private aid: any = null;

    private rkey: string = null;

    private rankList: any = null;

    private _data: any = null;

    private _isRequest: boolean = false;

    private _isQualification: boolean = false;
    public constructor() {
        super();
    }

    public initItem(index: number, data: any, itemParam: any): void {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, this.rankHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, this.rewardsNameHandle, this);
        this.aid = itemParam.aid;
        this.code = itemParam.code;
        this._data = data;
        for (let key in itemParam.joiner) {
            if (key == String(index)) {
                this.rankList = itemParam.joiner[key];
                break;
            }
        }
        let vo = <AcWealthCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this.width = 640;
        this.height = 310;

        if (Number(this.code) >= 5) {

            this.height = 335;

            let itembg = BaseLoadBitmap.create("acwealthcarpview_itembg-" + this.code);
            itembg.width = 616;
            itembg.height = 332;
            itembg.setPosition(this.x + this.width / 2 - itembg.width / 2, 0);
            this.addChild(itembg);

            let titlebg = BaseLoadBitmap.create("acwealthcarpview_common_bluebg");
            titlebg.width = 600;
            titlebg.height = 35;
            titlebg.setPosition(itembg.x + itembg.width / 2 - titlebg.width / 2, 2);
            this.addChild(titlebg);

            let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpRewardViewCharge-" + this.code, [String(data.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleTF.setPosition(titlebg.x + titlebg.width / 2 - titleTF.width / 2, titlebg.y + titlebg.height / 2 - titleTF.height / 2);
            this.addChild(titleTF);

            let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(data.getReward1);
            let rewardScale = 0.80;

            for (let i = 0; i < rewardVoList.length; i++) {
                let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
                rewardDB.setScale(rewardScale);
                rewardDB.setPosition(itembg.x + (i % 3) * (rewardDB.width * rewardScale + 10) + 287, itembg.y + Math.floor(i / 3) * (rewardDB.height * rewardScale + 5) + 60);
                this.addChild(rewardDB);
            }

            let progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 425);
            progress.setPosition(itembg.x + 15, itembg.y + itembg.height - progress.height / 2 - 46);
            this.addChild(progress);
            progress.setPercentage(vo.getChargeNum() / data.needGem, LanguageManager.getlocal("acWealthCarpViewRechargeValue-" + this.code, [String(vo.getChargeNum()), String(data.needGem)]), TextFieldConst.COLOR_LIGHT_YELLOW);

            if (vo.getChargeNum() >= data.needGem) {
                this._isQualification = true;
                if (vo.isReceive(data.id)) {
                    let receiveflagScale: number = 0.6;
                    let receiveflag = BaseBitmap.create("collectflag");
                    receiveflag.setScale(receiveflagScale);
                    receiveflag.setPosition(progress.x + progress.width + 25, progress.y + progress.height / 2 - receiveflag.height / 2 * receiveflagScale);
                    this.addChild(receiveflag);
                }
                else {
                    let receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
                        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCARPREWARD, { activeId: vo.aidAndCode, rkey: Number(data.id) });
                    }, this);
                    receiveBtn.setPosition(progress.x + progress.width + 25, progress.y + progress.height / 2 - receiveBtn.height / 2);
                    this.addChild(receiveBtn);
                }
            }
            else {
                this._isQualification = false;
                let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "gotocharge", () => {
                    let v = <AcWealthCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
                    if (v.checkIsInEndShowTime() || (!v.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                }, this);
                chargeBtn.setPosition(progress.x + progress.width + 25, progress.y + progress.height / 2 - chargeBtn.height / 2);
                this.addChild(chargeBtn);
            }



            let aureoleClip = ComponentManager.getCustomMovieClip("acwealthcarpeffect", 10, 70);
            let aureoleBM = BaseBitmap.create("acwealthcarpeffect1");
            aureoleClip.blendMode = egret.BlendMode.ADD;
            aureoleClip.anchorOffsetX = aureoleBM.width / 2;
            aureoleClip.anchorOffsetY = aureoleBM.height / 2;
            aureoleClip.setPosition(itembg.x + 130, itembg.y + 153)
            this.addChild(aureoleClip);
            aureoleClip.playWithTime(-1);

            let showItem = BaseLoadBitmap.create("acwealthcarpview_showitem_" + data.id + "-" + this.getUiCode());
            showItem.setPosition(itembg.x + 80, itembg.y + 90);
            if(this.code == "7" || this.code == "8" || this.code == "11" || this.code == "12"){
                showItem.setPosition(itembg.x + 90, itembg.y + 70);
  
            }
            this.addChild(showItem);

            let lottyStatus = BaseLoadBitmap.create("acwealthcarpview_lottystatus");
            lottyStatus.width = 167;
            lottyStatus.height = 55;
            let posY = showItem.y + 62 - lottyStatus.height / 2;
            if(this.code == "7" || this.code == "8" || this.code == "11" || this.code == "12"){
                posY += 20;
            }
            lottyStatus.setPosition(showItem.x + 53 - lottyStatus.width / 2 - 10, posY);
            this.addChild(lottyStatus);
            egret.Tween.get(lottyStatus, { loop: true }).to({ y: posY - 3 }, 1000).to({ y: posY }, 1000);

            //57
            if (vo.checkIsInEndShowTime()) {
                aureoleClip.setVisible(false);
                lottyStatus.setVisible(false);
            }
            else {
                if (vo.getChargeNum() >= data.needGem) {
                    aureoleClip.setVisible(true);
                    lottyStatus.setVisible(true);
                }
                else {
                    aureoleClip.setVisible(false);
                    lottyStatus.setVisible(false);
                }
            }

            let showItemTitle = BaseBitmap.create("acwealthcarpview_showitem_title_" + data.id + "-" + this.getUiCode());
            showItemTitle.setPosition(itembg.x + 130 - showItemTitle.width / 2, titlebg.y + titlebg.height + 5);
            this.addChild(showItemTitle);

            // let rankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewRankTxt-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            // rankTxt.setPosition(itembg.x + 130 - rankTxt.width / 2, itembg.y + 240 - rankTxt.height / 2);
            // this.addChild(rankTxt)

            // rankTxt.addTouchTap(() => {
            //     NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, { activeId: vo.aidAndCode, rKey: Number(data.id) });
            //     this._isRequest = true;
            // }, this, []);

            let openRewardBtn = ComponentManager.getButton("acwealthcarpview_openrewardbtn-" + this.getUiCode(), "", () => {
                let v = <AcWealthCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
                this._isRequest = true;
                if (v.checkIsInEndShowTime()) {
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, { activeId: vo.aidAndCode });
                    return;
                }
                // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, { activeId: vo.aidAndCode });
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, { activeId: vo.aidAndCode, rKey: Number(data.id) });
            }, this)
            openRewardBtn.setPosition(itembg.x + 10, progress.y - 5 - openRewardBtn.height);
            this.addChild(openRewardBtn)

            return;
        }

        let itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = 606;
        itembg.height = 310;
        itembg.setPosition(this.x + this.width / 2 - itembg.width / 2, 0);
        this.addChild(itembg);

        let titleBg = BaseLoadBitmap.create("acwealthcarpview_common_txtbg");
        titleBg.width = 358;
        titleBg.height = 35;
        titleBg.setPosition(itembg.x + 242, itembg.y + 5);
        this.addChild(titleBg);

        let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewItemEggType" + data.id + "-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
        this.addChild(titleTF);

        let itemTopLine: BaseBitmap = BaseBitmap.create("acwealthcarpview_common_line");
        itemTopLine.width += titleTF.width;
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);

        let eggbg = BaseLoadBitmap.create("acwealthcarpview_eggbg");
        eggbg.width = 235;
        eggbg.height = 298;
        eggbg.setPosition(itembg.x + 10, itembg.y + itembg.height / 2 - eggbg.height / 2);
        this.addChild(eggbg);

        let eggtitleStr: string = "acwealthcarpview_easteregg_" + data.id + "_title";
        if (!this.isCode1Ande2()) {
            eggtitleStr = "acwealthcarpview_balloon_title_" + data.id + "-" + this.getUiCode()
        }

        let eggtitle = BaseBitmap.create(eggtitleStr)
        eggtitle.setPosition(eggbg.x + eggbg.width / 2 - eggtitle.width / 2, eggbg.y + 20 - eggtitle.height / 2);
        this.addChild(eggtitle);



        if (vo.checkIsInEndShowTime()) {
            //擂奖得主
            let eggRankTxtStr = LanguageManager.getlocal("acWealthCarpViewRewardsNobady-" + this.code);
            if (data.name) {
                eggRankTxtStr = LanguageManager.getlocal("acWealthCarpViewRewardsName-" + this.code, [data.name])
            }
            let eggRankTxt = ComponentManager.getTextField(eggRankTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            eggRankTxt.setPosition(eggbg.x + eggbg.width / 2 - eggRankTxt.width / 2, eggbg.y + eggbg.height - 24 - eggRankTxt.height / 2);
            this.addChild(eggRankTxt)

            eggRankTxt.addTouchTap(() => {
                // ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCARPRANKPOPUPVIEW, { aid: this.aid, code: this.code, rewards: data.getReward2, rankList: this.rankList });
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, { activeId: vo.aidAndCode, rKey: Number(data.id) });
                this._isRequest = true;
            }, this, []);

            if (this.isCode1Ande2()) {
                let eggcushion = BaseLoadBitmap.create("acwealthcarpview_buttomcushion");
                eggcushion.width = 203;
                eggcushion.height = 111;
                eggcushion.setPosition(eggbg.x + 23, eggbg.y + eggbg.height - eggcushion.height - 48);
                this.addChild(eggcushion);

                let eggbuttom = BaseLoadBitmap.create("acwealthcarpview_easteregg_" + data.id + "_buttom");
                eggbuttom.width = 96;
                eggbuttom.height = 92;
                eggbuttom.setPosition(eggbg.x + eggbg.width / 2 - eggbuttom.width / 2, eggbg.y + eggbg.height - eggbuttom.height - 90);
                this.addChild(eggbuttom);

                let topcushion = BaseLoadBitmap.create("acwealthcarpview_topcushion");
                topcushion.width = 203;
                topcushion.height = 111;
                topcushion.setPosition(eggcushion.x, eggcushion.y + eggcushion.height - topcushion.height);
                this.addChild(topcushion);
            }
            else {
                let balloon = BaseLoadBitmap.create("acwealthcarpview_balloon_" + data.id + "-" + this.getUiCode());
                balloon.width = 119;
                balloon.height = 185;
                balloon.setPosition(eggbg.x + eggbg.width / 2 - balloon.width / 2, eggbg.y + eggbg.height / 2 - balloon.height / 2);
                this.addChild(balloon);
            }
        }
        else {

            //rank 入口
            let eggRankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewRankTxt-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            eggRankTxt.setPosition(eggbg.x + eggbg.width / 2 - eggRankTxt.width / 2, eggbg.y + eggbg.height - 24 - eggRankTxt.height / 2);
            this.addChild(eggRankTxt)
            eggRankTxt.addTouchTap(() => {
                // ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCARPRANKPOPUPVIEW, { aid: this.aid, code: this.code, rewards: data.getReward2, rankList: this.rankList });
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, { activeId: vo.aidAndCode, rKey: Number(data.id) });
                this._isRequest = true;
            }, this, []);




            if (vo.getChargeNum() >= data.needGem) {
                if (this.isCode1Ande2()) {

                    let mask1 = BaseLoadBitmap.create("acwealthcarpview_effect_mask1");
                    mask1.width = 235;
                    mask1.height = 298;
                    mask1.setPosition(eggbg.x + eggbg.width / 2 - mask1.width / 2, eggbg.y + eggbg.height / 2 - mask1.height / 2);
                    this.addChild(mask1);
                    mask1.blendMode = egret.BlendMode.ADD;
                    mask1.alpha = 0;
                    egret.Tween.get(mask1, { loop: true }).to({ alpha: 1 }, 1250).to({ alpha: 0 }, 1250);

                    let aureoleClip = ComponentManager.getCustomMovieClip("acwealthcarpeffect", 10, 70);
                    let aureoleBM = BaseBitmap.create("acwealthcarpeffect1");
                    aureoleClip.blendMode = egret.BlendMode.ADD;
                    aureoleClip.anchorOffsetX = aureoleBM.width / 2;
                    aureoleClip.anchorOffsetY = aureoleBM.height / 2;
                    aureoleClip.setPosition(eggbg.x + eggbg.width / 2, eggbg.y + eggbg.height - 150)
                    this.addChild(aureoleClip);
                    aureoleClip.playWithTime(-1);

                    let eggcushion = BaseLoadBitmap.create("acwealthcarpview_buttomcushion");
                    eggcushion.width = 203;
                    eggcushion.height = 111;
                    eggcushion.setPosition(eggbg.x + 23, eggbg.y + eggbg.height - eggcushion.height - 48);
                    this.addChild(eggcushion);

                    let eggbuttom = BaseLoadBitmap.create("acwealthcarpview_easteregg_" + data.id + "_buttom");
                    eggbuttom.width = 96;
                    eggbuttom.height = 92;
                    eggbuttom.setPosition(eggbg.x + eggbg.width / 2 - eggbuttom.width / 2, eggbg.y + eggbg.height - eggbuttom.height - 100);
                    this.addChild(eggbuttom);

                    let eggtop = BaseLoadBitmap.create("acwealthcarpview_easteregg_" + data.id + "_top");
                    eggtop.width = 96;
                    eggtop.height = 66;
                    eggtop.setPosition(eggbuttom.x, eggbuttom.y - 24);
                    this.addChild(eggtop);


                    let eggEffect = BaseLoadBitmap.create("acwealthcarpview_effect_egg");
                    eggEffect.width = 136;
                    eggEffect.height = 158;
                    eggEffect.setPosition(eggbuttom.x + eggbuttom.width / 2 - eggEffect.width / 2, eggbg.y + eggbg.height - eggEffect.height - 77);
                    this.addChild(eggEffect);
                    eggEffect.blendMode = egret.BlendMode.ADD;
                    egret.Tween.get(eggEffect, { loop: true }).to({ alpha: 0.2 }, 750).to({ alpha: 1 }, 750);

                    let mask2 = BaseLoadBitmap.create("acwealthcarpview_effect_mask2");
                    mask2.width = 235;
                    mask2.height = 298;
                    mask2.setPosition(eggbg.x + eggbg.width / 2 - mask2.width / 2, eggbg.y + eggbg.height / 2 - mask2.height / 2);
                    this.addChild(mask2);
                    mask2.blendMode = egret.BlendMode.ADD;
                    mask2.alpha = 1;
                    egret.Tween.get(mask2, { loop: true }).to({ alpha: 0 }, 1250).to({ alpha: 1 }, 1250);

                    let lottyStatus = BaseLoadBitmap.create("acwealthcarpview_lottystatus");
                    lottyStatus.width = 167;
                    lottyStatus.height = 55;
                    let posY = eggEffect.y + eggEffect.height / 2 - lottyStatus.height / 2;
                    lottyStatus.setPosition(eggEffect.x + eggEffect.width / 2 - lottyStatus.width / 2 - 5, posY);
                    this.addChild(lottyStatus);
                    egret.Tween.get(lottyStatus, { loop: true }).to({ y: posY - 3 }, 1000).to({ y: posY }, 1000);

                    let topcushion = BaseLoadBitmap.create("acwealthcarpview_topcushion");
                    topcushion.width = 203;
                    topcushion.height = 111;
                    topcushion.setPosition(eggcushion.x, eggcushion.y + eggcushion.height - topcushion.height);
                    this.addChild(topcushion);
                }
                else {
                    let mask1 = BaseLoadBitmap.create("acwealthcarpview_effect_mask1");
                    mask1.width = 235;
                    mask1.height = 298;
                    mask1.setPosition(eggbg.x + eggbg.width / 2 - mask1.width / 2, eggbg.y + eggbg.height / 2 - mask1.height / 2);
                    this.addChild(mask1);
                    mask1.blendMode = egret.BlendMode.ADD;
                    mask1.alpha = 0;
                    egret.Tween.get(mask1, { loop: true }).to({ alpha: 1 }, 1250).to({ alpha: 0 }, 1250);

                    let aureoleClip = ComponentManager.getCustomMovieClip("acwealthcarpeffect", 10, 70);
                    let aureoleBM = BaseBitmap.create("acwealthcarpeffect1");
                    aureoleClip.blendMode = egret.BlendMode.ADD;
                    aureoleClip.anchorOffsetX = aureoleBM.width / 2;
                    aureoleClip.anchorOffsetY = aureoleBM.height / 2;
                    aureoleClip.setPosition(eggbg.x + eggbg.width / 2, eggbg.y + eggbg.height - 150)
                    this.addChild(aureoleClip);
                    aureoleClip.playWithTime(-1);


                    let mask2 = BaseLoadBitmap.create("acwealthcarpview_effect_mask2");
                    mask2.width = 235;
                    mask2.height = 298;
                    mask2.setPosition(eggbg.x + eggbg.width / 2 - mask2.width / 2, eggbg.y + eggbg.height / 2 - mask2.height / 2);
                    this.addChild(mask2);
                    mask2.blendMode = egret.BlendMode.ADD;
                    mask2.alpha = 1;
                    egret.Tween.get(mask2, { loop: true }).to({ alpha: 0 }, 1250).to({ alpha: 1 }, 1250);

                    let balloon = BaseLoadBitmap.create("acwealthcarpview_balloon_" + data.id + "-" + this.getUiCode());
                    balloon.width = 119;
                    balloon.height = 185;
                    balloon.setPosition(eggbg.x + eggbg.width / 2 - balloon.width / 2, eggbg.y + eggbg.height / 2 - balloon.height / 2);
                    this.addChild(balloon);

                    let lottyStatus = BaseLoadBitmap.create("acwealthcarpview_lottystatus");
                    lottyStatus.width = 167;
                    lottyStatus.height = 55;
                    let posY = balloon.y + balloon.height / 2 - lottyStatus.height / 2 - 10;
                    lottyStatus.setPosition(eggbg.x + eggbg.width / 2 - lottyStatus.width / 2 - 5, posY);
                    this.addChild(lottyStatus);
                    egret.Tween.get(lottyStatus, { loop: true }).to({ y: posY - 3 }, 1000).to({ y: posY }, 1000);

                }
            }
            else {
                if (this.isCode1Ande2()) {
                    let eggcushion = BaseLoadBitmap.create("acwealthcarpview_buttomcushion");
                    eggcushion.width = 203;
                    eggcushion.height = 111;
                    eggcushion.setPosition(eggbg.x + 23, eggbg.y + eggbg.height - eggcushion.height - 48);
                    this.addChild(eggcushion);

                    let eggbuttom = BaseLoadBitmap.create("acwealthcarpview_easteregg_" + data.id + "_buttom");
                    eggbuttom.width = 96;
                    eggbuttom.height = 92;
                    eggbuttom.setPosition(eggbg.x + eggbg.width / 2 - eggbuttom.width / 2, eggbg.y + eggbg.height - eggbuttom.height - 90);
                    this.addChild(eggbuttom);

                    let eggtop = BaseLoadBitmap.create("acwealthcarpview_easteregg_" + data.id + "_top");
                    eggtop.width = 96;
                    eggtop.height = 66;
                    eggtop.setPosition(eggbuttom.x, eggbuttom.y - 24);
                    this.addChild(eggtop);

                    let topcushion = BaseLoadBitmap.create("acwealthcarpview_topcushion");
                    topcushion.width = 203;
                    topcushion.height = 111;
                    topcushion.setPosition(eggcushion.x, eggcushion.y + eggcushion.height - topcushion.height);
                    this.addChild(topcushion);
                }
                else {
                    let balloon = BaseLoadBitmap.create("acwealthcarpview_balloon_" + data.id + "-" + this.getUiCode());
                    balloon.width = 119;
                    balloon.height = 185;
                    balloon.setPosition(eggbg.x + eggbg.width / 2 - balloon.width / 2, eggbg.y + eggbg.height / 2 - balloon.height / 2);
                    this.addChild(balloon);
                }

            }
        }







        let rewardbg = BaseBitmap.create("public_9_managebg");
        rewardbg.width = 340;
        rewardbg.height = 195;
        rewardbg.setPosition(eggbg.x + eggbg.width + 3, titleBg.y + titleBg.height + 5);
        this.addChild(rewardbg);

        let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(data.getReward1);
        let rewardScale = 0.85;

        for (let i = 0; i < rewardVoList.length; i++) {
            let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(rewardbg.x + (i % 3) * (rewardDB.width * rewardScale + 14) + 20, rewardbg.y + Math.floor(i / 3) * (rewardDB.height * rewardScale + 5) + 5);
            this.addChild(rewardDB);
        }

        if (vo.getChargeNum() >= data.needGem) {
            if (vo.isReceive(data.id)) {
                let receiveflagScale: number = 0.6;
                let receiveflag = BaseBitmap.create("collectflag");
                receiveflag.setScale(receiveflagScale);
                receiveflag.setPosition(rewardbg.x + rewardbg.width / 2 - receiveflag.width / 2 * receiveflagScale, rewardbg.y + rewardbg.height + 30 - receiveflag.height / 2 * receiveflagScale);
                this.addChild(receiveflag);
            }
            else {
                let receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCARPREWARD, { activeId: vo.aidAndCode, rkey: Number(data.id) });
                }, this);
                receiveBtn.setPosition(rewardbg.x + rewardbg.width / 2 - receiveBtn.width / 2, rewardbg.y + rewardbg.height + 30 - receiveBtn.height / 2);
                this.addChild(receiveBtn);
            }
        }
        else {
            let progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 335);
            progress.setPosition(rewardbg.x + rewardbg.width / 2 - progress.width / 2, rewardbg.y + rewardbg.height + 30 - progress.height / 2);
            this.addChild(progress);
            progress.setPercentage(vo.getChargeNum() / data.needGem, LanguageManager.getlocal("acWealthCarpViewRechargeValue-" + this.code, [String(vo.getChargeNum()), String(data.needGem)]), TextFieldConst.COLOR_LIGHT_YELLOW);

        }

        let frame = BaseBitmap.create("acwealthcarpview_common_frame");
        frame.width = 352;
        frame.height = 298;
        frame.setPosition(this.x + this.width - frame.width - 5 - 23, this.y + this.height / 2 - frame.height / 2);
        this.addChild(frame);

        let addBM = BaseBitmap.create("acwealthcarpview_common_add");
        addBM.setPosition(frame.x - addBM.width / 2, frame.y + frame.height / 2 - addBM.height / 2);
        this.addChild(addBM);
    }

    private rankHandle(event: egret.Event) {
        if (event.data.ret && this._isRequest) {
            if (Number(this.code) >= 5) {
                this._isRequest = false;
                ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCARPLOTTERYREWARDSPOPUPVIEW, { aid: this.aid, code: this.code, rewards: this._data.getReward2, luckyinfo: event.data.data.data.luckyinfo, isQualification: this._isQualification, data: this._data });
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCARPRANKPOPUPVIEW, { aid: this.aid, code: this.code, rewards: this._data.getReward2, luckyinfo: event.data.data.data.luckyinfo });
            this._isRequest = false;
        }
    }
    private rewardsNameHandle(event: egret.Event) {
        if (event.data.ret && this._isRequest) {
            let vo = <AcWealthCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, { activeId: vo.aidAndCode, rKey: Number(this._data.id) });
        }
    }
    private isCode1Ande2() {
        if (this.code == "1" || this.code == "2") {
            return true;
        }
        return false;
    }

    protected getUiCode() {
        if (this.code == "4") {
            return "3";
        }
        return this.code;
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO, this.rankHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, this.rewardsNameHandle, this);
        this.aid = null;
        this.code = null;
        this.rkey = null;
        this.rankList = null;
        this._data = null;
        this._isRequest = false;
        this._isQualification = false;
        super.dispose();
    }

}