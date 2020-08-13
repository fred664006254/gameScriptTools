/**
 * 国庆节活动 国库
 * author yangchengguo
 * date 2019.9.10
 * @class AcNationalDayRechargeView
 */
class AcNationalDayRechargeView extends CommonView{
    public _scrollList:ScrollList = null;
    public _tokenNumInfo:BaseTextField = null;
    public _tokenIcon:BaseBitmap = null;
    public _tokenNum:BaseTextField = null;
    public _acDesc:BaseTextField = null;
    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETCHARGE, this.getChargeCallback, this);
        //活动介绍背景
        let acDescBgStr = ResourceManager.hasRes("acnationalday_infobg-"+this.getTypeCode())?"acnationalday_infobg-"+this.getTypeCode():"acnationalday_infobg-1";
        let acDescBg = BaseBitmap.create(acDescBgStr);
        acDescBg.setPosition(this.titleBg.x + this.titleBg.width/2 - acDescBg.width/2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(acDescBg);

        let descIconStr = ResourceManager.hasRes("acnationalday_charge_icon-"+this.getTypeCode())?"acnationalday_charge_icon-"+this.getTypeCode():"acnationalday_charge_icon-1";
        let descIcon = BaseBitmap.create(descIconStr);
        descIcon.setPosition(0, acDescBg.y + acDescBg.height - descIcon.height - 7);
        this.addChildToContainer(descIcon);

        let acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayChargeInfo-"+this.getTypeCode(), [String(1/this.cfg.ratio)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        acDesc.width = 440;
        acDesc.lineSpacing = 6;
        acDesc.setPosition(descIcon.x + descIcon.width + 5, acDescBg.y + 15);
        this.addChildToContainer(acDesc);
        this._acDesc = acDesc;

        let tokenNumInfo = ComponentManager.getTextField(LanguageManager.getlocal( "acNationalDayTokenNumTitle-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tokenNumInfo.setPosition(acDesc.x, acDescBg.y + acDescBg.height - tokenNumInfo.height - 13);
        this.addChildToContainer(tokenNumInfo);
        this._tokenNumInfo = tokenNumInfo;

        let tokenIconStr = ResourceManager.hasRes("acnationalday_rewarditem_small_icon-"+this.getTypeCode()) ? "acnationalday_rewarditem_small_icon-"+this.getTypeCode() : "acnationalday_rewarditem_small_icon-1";
        let token = BaseBitmap.create(tokenIconStr);
        token.setPosition(tokenNumInfo.x + tokenNumInfo.width, tokenNumInfo.y + tokenNumInfo.height/2 - token.height/2);
        this.addChildToContainer(token);
        this._tokenIcon = token;

        let tokenNum = ComponentManager.getTextField(""+this.vo.getChargeNum(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tokenNum.setPosition(token.x + token.width, token.y + token.height/2 - tokenNum.height/2+2);
        this.addChildToContainer(tokenNum);
        this._tokenNum = tokenNum;
        let totalW = tokenNumInfo.width + token.width + tokenNum.width;
        tokenNumInfo.x = acDesc.x + acDesc.width/2 - totalW/2;
        token.x = tokenNumInfo.x + tokenNumInfo.width;
        tokenNum.x = token.x + token.width;

        let bottomBg = BaseBitmap.create("public_9_bg24");
		bottomBg.width = GameConfig.stageWidth - 10;
		bottomBg.height = GameConfig.stageHeigth - acDescBg.y - acDescBg.height - 10;
		bottomBg.x = 5;
		bottomBg.y = acDescBg.y + acDescBg.height + 5;
		this.addChildToContainer(bottomBg);
        
        let dataList = this.vo.getSortRechargeCfg();
        let rect =  new egret.Rectangle(0, 0, bottomBg.width - 10, bottomBg.height - 10);
        let scrollList = ComponentManager.getScrollList(AcNationalDayRechargeGroupScrollItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(bottomBg.x + 5, bottomBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;

        let scrollData = this.vo.getCanRewardItemData();
        if (scrollData.index == 0 && scrollData.chargeIndex == 1){
            return;
        }
        else{
            if (scrollData.chargeIndex == 0){
                return;
            }
            let item = <AcNationalDayRechargeGroupScrollItem>this._scrollList.getItemByIndex(scrollData.index);
            let chargeItem = item.getChargeItems()[scrollData.chargeIndex];
            let scrollY = item.y + chargeItem.y;
            App.LogUtil.log("chargeitem: "+chargeItem.y);
            this._scrollList.setScrollTop(scrollY, 200);
        }
    }

    private getChargeCallback(evt:egret.Event):void{
        let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let rewards = rData.rewards;
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    }

    private refreshView():void{
        App.LogUtil.log("nationalday rechargeview");
        let dataList = this.vo.getSortRechargeCfg();
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});
        this._tokenNum.text = ""+this.vo.getChargeNum();

        let totalW = this._tokenNumInfo.width + this._tokenIcon.width + this._tokenNum.width;
        this._tokenNumInfo.x = this._acDesc.x + this._acDesc.width/2 - totalW/2;
        this._tokenIcon.x = this._tokenNumInfo.x + this._tokenNumInfo.width;
        this._tokenNum.x = this._tokenIcon.x + this._tokenIcon.width;
    }

    private get cfg():Config.AcCfg.NationalDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcNationalDayVo{
        return <AcNationalDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    public get code():string{
        return this.param.data.code;
    }

    public get aid():string{
        return this.param.data.aid;
    }

    //背景图
    // protected getBgName():string{
    //     return "";
    // }

    //标题背景
    protected getTitleBgName():string{
        return ResourceManager.hasRes("acnationalday_charge_titlebg-" + this.getTypeCode()) ? "acnationalday_charge_titlebg-" + this.getTypeCode():"acnationalday_charge_titlebg-1";
    }

    //标题
    protected getTitleStr():string{
        return "";
    }

    //规则
    protected getRuleInfo(): string {
        return "acNationalDayChargeRuleInfo-"+this.getTypeCode();
    }

    protected getRuleInfoParam():string[]{
        return [
            String(1/this.cfg.ratio),
        ];
    }

    protected isHideTitleBgShadow():boolean{
		return true;
	}

    //资源
    public getResourceList():string[]{
        let list:string[] = []
        if (this.getTypeCode() != "1"){
            list = [
                "acnationalday_charge_titlebg-1", "acnationalday_charge_icon-1",
                "acnationalday_infobg-1", "acnationalday_charge_item_bg-1",
                "acnationalday_charge_item_flag-1_1", "acnationalday_charge_item_flag-1_2", "acnationalday_charge_item_flag-1_3",
            ];
        }
        return super.getResourceList().concat([
            "alliance_taskAttrbg1", "progress5", "progress3_bg",
            "acnationalday_charge_titlebg-"+this.getTypeCode(),
            "acnationalday_charge_icon-"+this.getTypeCode(),
            "acnationalday_infobg-"+this.getTypeCode(),
            "acnationalday_charge_item_bg-"+this.getTypeCode(),
            "acnationalday_charge_item_flag-"+this.getTypeCode()+"_1",
            "acnationalday_charge_item_flag-"+this.getTypeCode()+"_2",
            "acnationalday_charge_item_flag-"+this.getTypeCode()+"_3",
            


        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETCHARGE, this.getChargeCallback, this);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACNATIONALDAY_CHANGE_VIEW);
        this._scrollList = null;
        this._acDesc = null;
        this._tokenNumInfo = null;
        this._tokenIcon = null;
        this._tokenNum = null;
        super.dispose();
    }

}