/*
author : qinajun
desc : 累积充值
*/
class AcNewYearRedRechargeView extends CommonView
{
	//滑动列表
	private _scrollList:ScrollList = null; 

	public constructor() 
	{
		super();
    }
    
    private get cfg() : Config.AcCfg.NewYearRedCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcNewYearRedVo{
        return <AcNewYearRedVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    protected getResourceList():string[]{
		let code = this.getUiCode();
		let arr = [
            `accarnivalview_tab_red`,`progress5`,`progress3_bg`,`accarnivalview_tab_green`,`collectflag`,
		];
		return super.getResourceList().concat(arr);
	}
	
	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
			case 3:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
	}
    
    protected getTitleStr():string{
        return `acRechargeViewTitle`;
    }

	private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
    }
	
	protected initView():void
	{	
		let view = this;
		// let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWYEARRED_GEREWARD),this.rewardCallBack,this);
        
        let bg = BaseBitmap.create("public_9_bg22");
        bg.width = 640;
        bg.height = GameConfig.stageHeigth - 89;
        bg.setPosition(0, -15);
        this.addChildToContainer(bg);

        let bg2 = BaseBitmap.create("public_9_bg43");
        bg2.width = 612;
        bg2.height = bg.height - 30;
        bg2.setPosition(bg.x + bg.width / 2 - bg2.width / 2, bg.y + 15);
        this.addChildToContainer(bg2);
        
        let vo = this.vo;
        let objList = [];
        let idx = -1;
        for(let i in view.cfg.recharge){
            objList.push(view.cfg.recharge[i]);
        }
		let arr = view.updateArr(objList);
 		let tmpRect =  new egret.Rectangle(0,0,600, bg2.height - 10);
		let scrollList = ComponentManager.getScrollList(AcNewYearRedChargeItem,arr,tmpRect,{code : view.code, id : view.param.data.id});
        view._scrollList = scrollList;     
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg2, [0,5]);
        view.addChildToContainer(scrollList); 
        scrollList.bounces = false;

        for(let i in arr){
            if(arr[i].id == view.param.data.id){
                idx = Number(i);
                break;
            }
        }
        if(idx > -1){
            scrollList.setScrollTopByIndex(idx, 1000);
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
        let objList = [];
        for(let i in view.cfg.recharge){
            objList.push(view.cfg.recharge[i]);
        }
		let arr = view.updateArr(objList);
		view._scrollList.refreshData(arr,{code : view.code, id : view.param.data.id});
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
		
		let rechareTotal = vo.getChargeNum();
		for(var i:number= 0;i < arr.length; i++)
		{
			if(vo.isGetRecharge(arr[i].id)){//
				arr1.push(arr[i]);
			}
			else{
				if(rechareTotal >= arr[i].needGem)
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
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWYEARRED_GEREWARD),this.rewardCallBack,this);
		super.dispose();
	}
}