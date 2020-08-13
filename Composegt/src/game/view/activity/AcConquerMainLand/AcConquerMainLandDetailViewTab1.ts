/*
author : qinajun
*/
class AcConquerMainLandDetailViewTab1 extends CommonViewTab{

	public constructor(data){
		super();
		this.param = data;
		this.initView();
	}

	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
	}
	
	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		let code = baseview.getUiCode();
		return code;
	}

	protected initView():void
	{	
		let view = this;
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;
		// App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENACHARGE),this.rewardCallBack,this);
        let Bg = BaseBitmap.create("mainland_detailtab1_topbg");
		Bg.width = view.width;  
		view.addChild(Bg);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandDetailDesc-${view.uiCode}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt.lineSpacing = 5;
		tipTxt.width = 605;
		tipTxt.textAlign = egret.HorizontalAlign.LEFT;
		view.addChild(tipTxt);

		Bg.height = tipTxt.textHeight + 40;  
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, Bg);
		
		// let viewbg = BaseBitmap.create("public_9_bg22");
		// viewbg.height = view.height - Bg.height + 10;  
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, viewbg, Bg, [0, Bg.height]);
		// view.addChild(viewbg);

		let viewbg = App.CommonUtil.getCommonBorderFrame(this.height - Bg.height + 20);
		viewbg.y = Bg.height - 10;
		view.addChild(viewbg);


 		let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,viewbg.height - 70);
		let scrollList = ComponentManager.getScrollList(AcConquerMainLandTimebuffItem, view.cfg.timeAndBuff, tmpRect, view.code);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, viewbg, [0, 30]);
		view.addChild(scrollList); 
		
		if(this.vo.getNowDay()>2){
			scrollList.setScrollTopByIndex(2);
		}
        scrollList.bounces = false;
	}

	private rewardCallBack(evt : egret.Event):void{
		let view = this;
		// let rData = evt.data.data.data;
        // if(!rData){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        //     return;
        // }
		// let rewards = rData.rewards;
		// let cfg = view.cfg.recharge[view.vo.lastidx];
        // let str = `1011_0_${cfg.specialItem}_${this.code}|` + rewards;
		// let rewardList =  GameData.formatRewardItem(str);
		// let pos = this.vo.lastpos;
		// App.CommonUtil.playRewardFlyAction(rewardList,pos);
		// this.vo.lastidx = null;
	}


	private update():void{
		// let view = this;
		// if(!view.vo){
		// 	return;
		// }
		// let arr = view.updateArr(view.vo.getArr("recharge"));
		// view._scrollList.refreshData(arr,view.code);
	}

	public dispose():void{	
		let view = this;
		// App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENACHARGE),this.rewardCallBack,this);
		super.dispose();
	}
}