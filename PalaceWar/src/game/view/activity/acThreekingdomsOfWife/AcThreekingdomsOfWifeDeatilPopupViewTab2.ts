/**
 * 进度奖励
 * author ycg
 * date 2020.2.10
 * @class AcThreekingdomsOfWifeDetailPopupViewTab2
 */
class AcThreekingdomsOfWifeDetailPopupViewTab2 extends CommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_ACHIEVE, this.requestCallback, this);
        let id = null;
        
        if (this.param && this.param.data){
            App.LogUtil.log(" aid: "+this.param.data.aid);
            id = this.param.data.id;
        }
        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 60);
        this.addChild(rewardBg);
        let dataList = this.vo.getSortAchievementCfg();
        let rect =  new egret.Rectangle(0, 0, 530, 670);
        let scrollList = ComponentManager.getScrollList(AcThreekingdomsOfWifeDetailTab2ScrollItem, dataList, rect, {aid:this.getAid(), code:this.getCode(), id: id});
        scrollList.setPosition(25, 65);
        this.addChild(scrollList);
        this._scrollList = scrollList;

        if (id) {
			for (let i = 0; i < dataList.length; i++) {
				if (dataList[i].id == Number(id)) {
					this._scrollList.setScrollTopByIndex(i, 1000);
					break;
				}
			}
		}
    }

    private requestCallback(event:egret.Event){
        if (!event.data.ret){
            return;
        }
        let rData = event.data.data.data;
        let rewards = rData.rewards;
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
        let dataList = this.vo.getSortAchievementCfg();
        this._scrollList.refreshData(dataList, {aid:this.getAid(), code:this.getCode()});
    }

	private get cfg():Config.AcCfg.ThreekingdomsOfWifeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.getAid(), this.getCode());
    }
    
    private getTypeCode():string{
        if (this.getCode() == "2"){
            return "1";
        }
        if (this.getCode() == "4"){
            return "3";
        }
        return this.getCode();
    }

    private getAid():string{
        return this.param.data.aid;
    }

    private getCode():string{
        return this.param.data.code;
    }
	
    private get vo():AcThreekingdomsOfWifeVo{
        return <AcThreekingdomsOfWifeVo>Api.acVoApi.getActivityVoByAidAndCode(this.getAid(), this.getCode());
    }

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_ACHIEVE, this.requestCallback, this);
        this._scrollList = null;
        super.dispose();
     }
}