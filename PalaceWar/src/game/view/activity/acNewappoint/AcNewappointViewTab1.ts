/**
 * 新服庆典 tab1
 * date 2020.6.30
 * author ycg
 */
class AcNewappointViewTab1 extends AcCommonViewTab{
    public _scrollView:ScrollView = null;
    public _giftContainer:BaseDisplayObjectContainer = null;
    public _giftList:any[] = [];

    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACNEWAPPOINT_TASK_RWD, this.getGiftRewardCallback, this);
        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 534;
        bg.height = 472;
        bg.setPosition(53, 0);
        this.addChild(bg);

        let infoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_giftinfobg", this.getTypeCode()));
        infoBg.setPosition(bg.x + bg.width/2 - infoBg.width/2, bg.y + 5);
        this.addChild(infoBg);

        let topInfoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_toptxtbg", this.getTypeCode()));
        topInfoBg.setPosition(bg.x + bg.width/2 - topInfoBg.width/2, bg.y + 10);
        this.addChild(topInfoBg);

        let topInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewGiftTop", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topInfo.setPosition(topInfoBg.x + topInfoBg.width/2 - topInfo.width/2, topInfoBg.y + topInfoBg.height/2 - topInfo.height/2);
        this.addChild(topInfo);

        let giftBottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_giftbottombg", this.getTypeCode()));
        giftBottomBg.setPosition(bg.x + bg.width/2 - giftBottomBg.width/2, topInfoBg.y + topInfoBg.height);
        this.addChild(giftBottomBg);

        let giftContainer = new BaseDisplayObjectContainer();
        this._giftContainer = giftContainer;

        let scrollView = ComponentManager.getScrollView(giftContainer, new egret.Rectangle(0, 0, giftBottomBg.width, 202)); //137 65
        this.addChild(scrollView);
        scrollView.horizontalScrollPolicy = "on";
        scrollView.verticalScrollPolicy = "off";
        scrollView.bounces = false;
        scrollView.setPosition(giftBottomBg.x, giftBottomBg.y);
        this._scrollView = scrollView;

        let weekTime = App.DateUtil.getWeeTs(this.vo.st);
        let data = this.cfg.getGiftListCfg();
        for (let i=0; i < data.length; i++){
            let container = new BaseDisplayObjectContainer();
            giftContainer.addChild(container);
            let giftBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_giftitembg1", this.getTypeCode()));
            container.width = giftBg.width;
            container.height = scrollView.height;
            container.addChild(giftBg);
            giftBg.setPosition(0, 79);

            let giftImgIndex = i % 3 + 1;
            let gift = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_gift"+giftImgIndex, this.getTypeCode()));
            gift.setPosition(giftBg.x + giftBg.width/2 - gift.width/2, 11);
            container.addChild(gift);

            let giftName = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointGiftName"+(i+1), this.getTypeCode())), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            giftName.setPosition(giftBg.x + giftBg.width/2 - giftName.width/2, giftBg.y + 34);
            container.addChild(giftName);

            let alphaBg = BaseBitmap.create("public_alphabg");
            alphaBg.width = container.width;
            alphaBg.height = 137;
            container.addChild(alphaBg);
            container.setPosition(5 + i * (container.width + 10), 0);
            alphaBg.addTouchTap(this.giftClickHandler, this, [i]);

            //已领取
            let collectFlag = BaseBitmap.create("acnewappoint_collect");
            collectFlag.setScale(1);
            collectFlag.setPosition(container.width/2 - collectFlag.width * collectFlag.scaleX /2, giftBg.y + giftBg.height + 2);
            container.addChild(collectFlag);
            collectFlag.visible = false;

            //领取时间
            let timeStr = App.DateUtil.getFormatBySecond(weekTime + i * 86400, 7);
            let getTime = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointGiftGetTime", this.getTypeCode()), [""+timeStr]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
            getTime.setPosition(container.width/2 - getTime.width /2, giftBg.y + giftBg.height + 23);
            container.addChild(getTime);
            getTime.visible = true;

            //领取按钮
            let getBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", this.giftGetBtnClick, this, [data[i].id], null, null, TextFieldConst.COLOR_BLACK);
            getBtn.setScale(0.8)
            getBtn.setPosition(container.width/2 - getBtn.width * getBtn.scaleX/2, giftBg.y + giftBg.height + 10);
            container.addChild(getBtn);
            getBtn.visible = false;

            let giftItem = {giftBg: giftBg, gift: gift, container: container, collectFlag: collectFlag, getTime: getTime, getBtn: getBtn}
            this._giftList.push(giftItem);
        }
        giftContainer.width = 10 + data.length * 122 - 10;

        let giftRewadIndex = this.vo.getGiftRewardIndex();
        let offX = Math.min(Math.max(0, (giftRewadIndex - 2) * 122), giftContainer.width - scrollView.width);
        scrollView.setScrollLeft(offX);

        let line = BaseBitmap.create("acnewappoint_line");
        line.width = bg.width - 30;
        line.setPosition(bg.x + bg.width/2 - line.width /2, scrollView.y + scrollView.height + 10);
        this.addChild(line);

        let bottomInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointGiftBottomInfo", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        bottomInfo.width = bg.width - 60;
        bottomInfo.lineSpacing = 5;
        bottomInfo.textAlign = TextFieldConst.ALIGH_CENTER;
        bottomInfo.setPosition(bg.x + bg.width/2 - bottomInfo.width /2, line.y + line.height + 35);
        this.addChild(bottomInfo);

        this.refreshView();
    }

    private refreshGift():void{
        let data = this.cfg.getGiftListCfg();
        let currProcess = this.vo.getGiftProcess();
        for (let i=0; i < data.length; i++){
            let giftItem = this._giftList[i];
            if (this.vo.isGetGiftReward(data[i].id)){
                giftItem.giftBg.setRes(App.CommonUtil.getResByCode("acnewappoint_giftitembg2", this.getTypeCode()));
                giftItem.collectFlag.visible = true;
                giftItem.getTime.visible = false;
                giftItem.getBtn.visible = false;
            }
            else{
                giftItem.giftBg.setRes(App.CommonUtil.getResByCode("acnewappoint_giftitembg1", this.getTypeCode()));
                if (currProcess >= data[i].needDay){
                    giftItem.collectFlag.visible = false;
                    giftItem.getTime.visible = false;
                    giftItem.getBtn.visible = true;
                }
                else{
                    giftItem.collectFlag.visible = false;
                    giftItem.getTime.visible = true;
                    giftItem.getBtn.visible = false;
                }
            }
        }
    }

    private giftClickHandler(target:any, index:number){
        App.LogUtil.log("giftClickHandler "+index);
        let data = this.cfg.getGiftListCfg();
        let itemCfg = data[index];
        let weekTime = App.DateUtil.getWeeTs(this.vo.st);
        let timeStr = App.DateUtil.getFormatBySecond(weekTime + index * 86400, 7);
        let detailStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointGiftGetTime", this.getTypeCode()), [""+timeStr])
        ViewController.getInstance().openView(ViewConst.POPUP.ACNEWAPPOINTPREVIEWGIFTDETAILPOPUPVIEW, {aid: this.aid, code: this.code, rewards: itemCfg.getReward, infoStr: detailStr});
    }

    //领取礼包奖励
    private giftGetBtnClick(id:any):void{
        if (!this.vo.isStart){
            this.vo.showAcEndTip();
            return;
        }

        App.LogUtil.log("index "+id);
        NetManager.request(NetRequestConst.REQUEST_ACNEWAPPOINT_TASK_RWD, {activeId: this.vo.aidAndCode, rkey: id});
    }

    private getGiftRewardCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return;
        }
        let rData = evt.data.data.data;
        let rewards = rData.rewards;
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    }

    private refreshView():void{
        this.refreshGift();
    }

    private get cfg():Config.AcCfg.NewappointCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcNewappointVo{
        return <AcNewappointVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private getTypeCode():string{
        return this.code;
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACNEWAPPOINT_TASK_RWD, this.getGiftRewardCallback, this);
        this._scrollView = null;
        this._giftContainer = null;
        this._giftList = [];

        super.dispose();
    }
}