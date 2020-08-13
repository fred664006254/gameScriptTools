/**
 * 进度奖励
 * author ycg
 * date 2020.2.26
 * @class AcRecoveryDetailPopupViewTab2
 */
class AcRecoveryDetailPopupViewTab2 extends CommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACRECOVERY_ACHIEVE, this.requestCallback, this);
        let id = null;
        
        if (this.param && this.param.data){
            App.LogUtil.log(" aid: "+this.param.data.aid);
            id = this.param.data.id;
        }
        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 50);
        this.addChild(rewardBg);
        let dataList = this.vo.getSortAchievementCfg();
        let rect =  new egret.Rectangle(0, 0, 530, 670);
        let scrollList = ComponentManager.getScrollList(AcRecoveryDetailTab2ScrollItem, dataList, rect, {aid:this.aid, code:this.code, id: id});
        scrollList.setPosition(25, rewardBg.y + 5);
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
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});
    }
    
    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }
	
    private get cfg() : Config.AcCfg.RecoveryCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcRecoveryVo{
        return <AcRecoveryVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACRECOVERY_ACHIEVE, this.requestCallback, this);
        this._scrollList = null;
        super.dispose();
     }
}