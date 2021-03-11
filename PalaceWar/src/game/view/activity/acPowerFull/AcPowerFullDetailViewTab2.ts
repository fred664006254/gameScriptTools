/**
* 进度奖励
* date 2020.6.15
* author ycg
* @name AcNightSkyDetailPopupViewTab2
*/
class AcPowerFullDetailViewTab2 extends CommonViewTab{
    private _scrollList:ScrollList = null;

    public constructor(data?:any) {
        super();
        this.param = data;
        this.initView();
    }

    private get cfg():Config.AcCfg.PowerFullCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcPowerFullVo{
        return <AcPowerFullVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_ACHIEVERWD, this.requestCallback, this);

        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 695;
        bg.setPosition(26, 53);
        this.addChild(bg);

        let dataList = this.vo.getSortAchievementCfg();
        let rect = new egret.Rectangle(0, 0, 530, 680);
        let scrollList = ComponentManager.getScrollList(AcPowerFullDetailTab2ScrollItem, dataList, rect, {aid:this.aid, code:this.code, id: this.param.data.id});
        scrollList.setPosition(bg.x, bg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        App.LogUtil.log("this.paame "+this.param.data.id);
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
        let view = this;
        let rData = evt.data.data.data;
        
        let dia = "rewardDialog_"+this.getTypeCode();
        let dialog = view.cfg[dia];
        let visitId = this.vo.getAchRewardId();
        if (dialog[visitId]){
            let bgName = App.CommonUtil.getResByCode("acpowerfull_bg", this.getTypeCode());
            ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW,{
                aid : this.aid,
                code : this.getTypeCode(),
                AVGDialog : dialog,
                visitId : visitId,
                talkKey: "acPowerFullAchieveRewardDialog",
                bgName: bgName,
                callBack : ()=>{
                    this.showReward(rData);
                },
                obj:this
            });
        }
        else{
            this.showReward(rData);
        }
    }

	private showReward(rData:any){
		let rewards = rData.rewards;
		let replacerewards = rData.replacerewards;
		let rewardVo = GameData.formatRewardItem(rewards);
		App.CommonUtil.playRewardFlyAction(rewardVo);
		if (replacerewards) {
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
		}
	}

    private refreshView():void{
        let dataList = this.vo.getSortAchievementCfg();
        this._scrollList.refreshData(dataList, {aid: this.aid, code: this.code});
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_ACHIEVERWD, this.requestCallback, this);
        
        this._scrollList = null;

        super.dispose();
    }
}