/**
 * 进度奖励
 * date 2020.4.24
 * @class AcWeaponMazeDetailPopupViewTab2
 */
class AcWeaponMazeDetailPopupViewTab2 extends CommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    private get vo():AcWeaponMazeVo{
        return <AcWeaponMazeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.WeaponMazeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACWEAPONMAZE_GETACHIEVT, this.requestCallback, this);
        let rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 695;
        rewardBg.setPosition(26, 53);
        this.addChild(rewardBg);
        let dataList = this.vo.getSortAchievementCfg();
        let rect = new egret.Rectangle(0, 0, 530, 680);
        let scrollList = ComponentManager.getScrollList(AcWeaponMazeDetailPopupScrollItem2, dataList, rect, {aid:this.aid, code:this.code, id: this.param.data.id});
        scrollList.setPosition(rewardBg.x, rewardBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        App.LogUtil.log("tis.paame "+this.param.data.id);
        if (this.param.data.id){
            let index = 0;
            for (let i=0; i < dataList.length; i++){
                if (dataList[i].id == Number(this.param.data.id)){
                    index = i;
                    break;
                }
            }
            this._scrollList.setScrollTopByIndex(index, 800);
        }
    }

    private requestCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return;
        }
        let rData = evt.data.data.data;
        let rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    }

    private refreshView():void{
        let dataList = this.vo.getSortAchievementCfg();
        this._scrollList.refreshData(dataList, {aid: this.aid, code: this.code});
    }

    
    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACWEAPONMAZE_GETACHIEVT, this.requestCallback, this);
        view._scrollList = null;

        super.dispose();
    }
}