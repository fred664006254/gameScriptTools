//
class AcWipeBossAllianceInfoViewTab1 extends CommonViewTab
{
	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	
	private get api() : WipeBossVoApi{
        return Api.wipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.WipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcWipeBossVo{
        return <AcWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected initView():void
	{
		let view = this;
		view.width = 526;
		view.height = 526;
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD),view.getrewardCallback,view);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		// let Bg = BaseBitmap.create("public_9_bg4");
		// Bg.width = 628;
		// Bg.height = 526;
		// view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, Bg, view);
		// view.addChild(Bg);
		
		let tmpRect =  new egret.Rectangle(0,0,505, view.height - 20);
		let arr = view.api.getWipeBossAllianceInfo(1);
		arr.sort((a,b)=>{
			let cfga = view.cfg.getBossNpcItemCfgById(a.bosstype);
			let cfgb = view.cfg.getBossNpcItemCfgById(b.bosstype);
			if(cfga.type == cfgb.type){
				return cfgb.id - cfga.id;
			}
			else{
				return cfga.type - cfgb.type;
			}
		});
        let scrollList = ComponentManager.getScrollList(AcWipeBossAllianceInfoScrollItem, arr, tmpRect, view.param.data.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [22, 65]);
		view.addChild(scrollList);
		scrollList.setEmptyTip(LanguageManager.getlocal('acPunishNoData'));
	}

	private rankClick():void{
		let view = this;
		// if(view.api.getCurpeirod() < 8){
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
		// 	return;
		// }
		ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        //
	}

    private rewardClick():void{
		let view = this;
		// if(view.api.getCurpeirod() < 8){
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
		// 	return;
		// }
		// else{
		// 	if(view.api.getIsWinner()){
		// 		NetManager.request(NetRequestConst.REQUST_SERVANTPK_GETPREWARD,{
		// 			activeId:view.api.vo.aidAndCode,
		// 		})
		// 	}
		// 	else{
		// 		App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip7"));
		// 		return;
		// 	}
		// }
    }


	public getrewardCallback(evt : egret.Event):void{
		let view = this;
		let rdata = evt.data.data
        if(rdata.ret != 0)
        {
            return;
        }
		//view.api.initData(evt.data.data.data);

        let rewards = rdata.data.rewards ;
        let rewardList = GameData.formatRewardItem(rewards);
		//let pos = this._rewardBtn.localToGlobal(this._rewardBtn.width/2,this._rewardBtn.height/2)
        //App.CommonUtil.playRewardFlyAction(rewardList,pos);
	}

	public dispose():void
	{
		let view = this;
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD),view.getrewardCallback,view);
		super.dispose();
	}

}