/**
 * 充值奖励
 * author ycg
 * date 2020.2.10
 * @class AcThreekingdomsOfWifeDetailPopupViewTab1
 */
class AcThreekingdomsOfWifeDetailPopupViewTab1 extends CommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_CHARGE, this.requestCallback, this);
        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 60);
        this.addChild(rewardBg);
        let dataList = this.vo.getSortRechargeCfg();
        let rect =  new egret.Rectangle(0, 0, 530, 670);
        let scrollList = ComponentManager.getScrollList(AcThreekingdomsOfWifeDetailTab1ScrollItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(25, 65);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    }

    private requestCallback(event:egret.Event){
        if (!event.data.ret){
            this.refreshView();
            return;
        }
        let rData = event.data.data.data;
        let rewards = rData.rewards;
        if (rData.specialGift){
            rewards = "1040_0_" + rData.specialGift + "_" + this.getTypeCode() + "|" + rewards;
        }
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    }

    private refreshView():void{
        if (!this.vo){
            return;
        }
        let dataList = this.vo.getSortRechargeCfg();
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});
    }

	private get cfg():Config.AcCfg.ThreekingdomsOfWifeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    
    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        if (this.code == "4"){
            return "3";
        }
        return this.code;
    }
	
    private get vo():AcThreekingdomsOfWifeVo{
        return <AcThreekingdomsOfWifeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_CHARGE, this.requestCallback, this);
        this._scrollList = null;
        super.dispose();
     }
}