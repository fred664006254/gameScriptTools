class AcSingleDayBuild1ViewTab3 extends CommonViewTab{
	private _scrollList: ScrollList = null;
    public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

	private get cfg() : Config.AcCfg.SingleDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcSingleDayVo{
        return <AcSingleDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.param.data.code}`;
	}

	public initView():void{
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreashView,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_REWARD,this.refreashView,this);
		let view = this;
		view.height = GameConfig.stageHeigth - view.y - 110;
		let useGemData = this.vo.getSortConsume();
		useGemData.sort((a,b) =>{return a.sortId - b.sortId});
		let bg = BaseBitmap.create("public_9_bg22");
		bg.width = GameConfig.stageWidth;
		bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - 110;
		this.addChild(bg);

		let rect = new egret.Rectangle(0,0,bg.width - 40,bg.height - 45);
		this._scrollList = ComponentManager.getScrollList(AcSingleDayBuild1ViewTab3ScrollItem,useGemData,rect,{vo:this.vo});
		this._scrollList.setPosition(17,23);
		this.addChild(this._scrollList);
	}
	private refreashView(event:egret.Event)
	{
		if(event.data.ret)
		{
			if(event.data.data.cmd == NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_REWARD)
			{
				// let rewardVo = GameData.formatRewardItem(event.data.data.data.rewards);
				// App.CommonUtil.playRewardFlyAction(rewardVo);
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{rewards:event.data.data.data.rewards,isPlayAni:true});

			}
			 
		}
		let useGemData = this.vo.getSortConsume();
		useGemData.sort((a,b) =>{return a.sortId - b.sortId});
		this._scrollList.refreshData(useGemData,{vo:this.vo});
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreashView,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_REWARD,this.refreashView,this);
		this._scrollList = null;
		super.dispose();
	}
}