class AcRabbitComingRewardPopupViewTab3 extends CommonViewTab{  
	private _scrollList:ScrollList = null; 

	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	private get cfg() : Config.AcCfg.RabbitComingCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
  
	private get vo() : AcRabbitComingVo{
		return <AcRabbitComingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}
  
	private get acTivityId() : string{
		return `${this.aid}-${this.code}`;
	}
	
	private get aid() : string{
		return `${this.param.data.aid}`;
	}
  
	private get code() : string{
		return `${this.param.data.code}`;
	}
  
	protected getUiCode():string{
		let code = '';
		switch(Number(this.code)){
			case 1:
			case 2:
				code = `1`;
				break;
			default:
				code = this.code;
				break;
		}
		return code;
	}

    protected initView():void{
		let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RABBIT_ACHIEVE),this.rewardCallBack,this);
		view.height = 675;
        view.width = 535;
        
		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 530;
		Bg.height = 660;
        Bg.x = 25;
        Bg.y = 55;
        view.addChild(Bg);
        
        let vo = this.vo;
		let obj = vo.getArr("achievement");//
		let arr = view.updateArr(obj);
 		let tmpRect =  new egret.Rectangle(0,0,530,Bg.height - 10);
		let scrollList = ComponentManager.getScrollList(AcRabbitComingProgressItem,arr,tmpRect,{
			code : view.code,
			id : view.param.data.id
		});    
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0,3]);
		view.addChild(scrollList); 
		view._scrollList = scrollList;

		if (typeof view.param.data.id != 'undefined') {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].id == view.param.data.id) {
					this._scrollList.setScrollTopByIndex(i, 1000);
					break;
				}
			}
		}
	}

	private updateArr(arr : Config.AcCfg.RabbitComingProgressItemCfg[]):any[]{
		let view = this;
		let vo = view.vo; 
		if(!vo)
		{
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		let rechareTotal= vo.getLuckyProgress();
		for(var i:number= 0;i < arr.length; i++)
		{
			if(vo.isGetJinduAward(arr[i].id)){//
				arr1.push(arr[i]);
			}
			else{
				if(rechareTotal >= arr[i].needNum)
				{
					arr2.push(arr[i]);
				}
				else
				{
					arr3.push(arr[i]);
				} 
			}
		}
		return arr2.concat(arr3).concat(arr1); 
	}

	private rewardCallBack(evt : egret.Event):void{
		let view = this;
        if(evt.data.ret){
			let rData = evt.data.data.data;
			let rewards = rData.rewards;
			let str = rewards;
			if(rData.replacerewards){
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards});
			}
			let rewardList =  GameData.formatRewardItem(str);
			let pos = this.vo.lastpos;
			App.CommonUtil.playRewardFlyAction(rewardList,pos);
			this.vo.lastidx = null;
        }
	}


	private update():void{
		let view = this;
		let code = view.getUiCode();
		if(!view.vo){
			return;
		}
		let arr = view.updateArr(view.vo.getArr("achievement"));;//
		view._scrollList.refreshData(arr, {
			code : view.code,
			id : view.param.data.id
		});
	}
	
    public dispose(): void {
		let view = this;
		view._scrollList = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RABBIT_ACHIEVE),this.rewardCallBack,this);
		super.dispose();
	}
}
