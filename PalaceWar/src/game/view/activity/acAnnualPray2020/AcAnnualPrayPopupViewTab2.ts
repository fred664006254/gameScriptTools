/*
author : qinajun
desc : 活动进度
*/
class AcAnnualPrayPopupViewTab2 extends CommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _taskArr =null;
	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
    private get cfg() : Config.AcCfg.AnnualPray2020Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcAnnualPray2020Vo{
        return <AcAnnualPray2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
	
	protected initView():void
	{	
		let view = this;
		// let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
		view.height = 660;
		view.width = 545;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ANNUALPRAY_GETJINDUREWARD),this.rewardCallBack,this);
        let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 535;
		Bg.height = 650;
        Bg.x = 32;
        Bg.y = 55;
        view.addChild(Bg);
        
        let vo = this.vo;
		let objList = vo.getArr("processingReward");//
		let arr = view.updateArr(objList);
 		let tmpRect =  new egret.Rectangle(0,0,530,Bg.height - 10);
		let scrollList = ComponentManager.getScrollList(AcAnnualPrayPrayItem,arr,tmpRect,{
			code : view.code,
			id : this.param.data.id
		});
        view._scrollList = scrollList;     
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0,5]);
        view.addChild(scrollList); 
		scrollList.bounces = false;

		if (this.param.data.id) {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].id == this.param.data.id) {
					this._scrollList.setScrollTopByIndex(i, 1000);
					break;
				}
			}
		}
	}

	private rewardCallBack(evt : egret.Event):void{
		let view = this;
		if(evt.data.ret){
			let rData = evt.data.data.data;
			if(!rData){
				App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
				return;
			}
			let rewards = rData.rewards;
			if(rData.replacerewards)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards});
			}
			let str = rewards;
			let rewardList =  GameData.formatRewardItem(str);
			let pos = this.vo.lastpos;
			App.CommonUtil.playRewardFlyAction(rewardList,pos);
			this.vo.lastidx = null;
		}
	}


	private update():void{
		let view = this;
		if(!view.vo){
			return;
		}
		let arr = view.updateArr(view.vo.getArr("processingReward"));;//
		view._scrollList.refreshData(arr,{
			code : view.code
		});
	}

	private updateArr(arr):any[]{
		let view = this;
		let vo = view.vo; 
		if(!vo)
		{
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		let pray = vo.getPrayNum();
		for(var i:number= 0;i < arr.length; i++)
		{
			if(vo.isGetJinduAward(arr[i].id)){//
				arr1.push(arr[i]);
			}
			else{
				if(pray >= arr[i].ratetime)
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

	public dispose():void
	{	
		let view = this;
		this._scrollList =null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ANNUALPRAY_GETJINDUREWARD),this.rewardCallBack,this);
		super.dispose();
	}
}