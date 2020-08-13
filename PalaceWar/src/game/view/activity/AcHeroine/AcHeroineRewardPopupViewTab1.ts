/**
 * 巾帼英雄充值奖励
 */
class AcHeroineRewardPopupViewTab1 extends AcCommonViewTab{
    private _scrollList:ScrollList = null;

    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_HEROINE_RECHARGE, this.requestCallback, this);
        let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 532;
		bg.height = 670;
		bg.setPosition(34, 50);
        this.addChild(bg);

        let dataList = this.vo.getSortRechargeCfg();
        let rect =  new egret.Rectangle(0, 0, bg.width-10, bg.height - 14);
        let scrollList = ComponentManager.getScrollList(AcHeroineRewardPopupTab1ScrollItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(bg.x + 5, bg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        // let id = this.param.data.id;
		// if (id) {
		// 	for (let i = 0; i < dataList.length; i++) {
		// 		if (dataList[i].id == id) {
		// 			this._scrollList.setScrollTopByIndex(i, 1000);
		// 			break;
		// 		}
		// 	}
		// }
        
    }

    private requestCallback(event:egret.Event){
        if (event && event.data && event.data.ret){
            let rData = event.data.data.data;
            let rewards = rData.rewards;
            if (rData.specialGift){
                rewards = "1034_0_" + rData.specialGift + "_" + this.getTypeCode() + "|" + rewards;
            }
            let rewardVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
            }
        }
    }

    private refreshView():void{
        if (!this.vo){
            return;
        }
        let dataList = this.vo.getSortRechargeCfg();
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});
    }

    private get cfg():Config.AcCfg.HeroineCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcHeroineVo{
        return <AcHeroineVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        else if (this.code == "4"){
            return "3";
        }
        else if (this.code == "6"){
            return "5";
        }
        else if (this.code == "8"){
            return "7";
        }
        else if (this.code == "10"){
            return "9";
        }
        return this.code;
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_HEROINE_RECHARGE, this.requestCallback, this);
        this._scrollList = null;
        super.dispose();
    }
}