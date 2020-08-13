/**
 * author:qianjun
 * desc:魏征活动充值
*/
class AcWeiZhengRechargeView extends PopupView{

    private _scrollList:ScrollList = null; 
	public constructor() {
		super();
	}
	
    private get cfg() : Config.AcCfg.WeiZhengCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcWeiZhengVo{
        return <AcWeiZhengVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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

    private getUiCode():string{
        let code = ``;
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

    protected getResourceList():string[]
	{
        let view = this;
        let arr = [];
        return super.getResourceList().concat([
            `progress5`,`progress3_bg`,`accarnivalview_tab_red`,`accarnivalview_tab_green`,`collectflag`,
            `activity_charge_red`,`shopview_corner`,`shopview_line`
        ]).concat(arr);
    }

    protected getTitleStr():string{
        return `acArenaTab1-1`;
    }

    // protected getRequestData():{requestType:string,requestData:any}
	// {	
	// 	let view = this;
	// 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_LABORRANK,requestData:{
	// 		activeId : view.vo.aidAndCode,
	// 	}};
	// }

	// protected receiveData(data:{ret:boolean,data:any}):void
	// {
	// 	let view = this;
	// 	view.vo.setRankInfo(data.data.data);
	// }

	protected initView():void{	
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_GETRECHARGE),this.rewardCallBack,this);
        let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 520;
		Bg.height = 690;
        Bg.x = 30+GameData.popupviewOffsetX-6;
        Bg.y = 25;
        view.addChildToContainer(Bg);
        
        let vo = this.vo;
		let objList = view.cfg.recharge;
		let arr = view.updateArr(objList);
 		let tmpRect =  new egret.Rectangle(0,0,510, Bg.height - 15);
		let scrollList = ComponentManager.getScrollList(AcWeiZhengRechargeItem, arr, tmpRect, view.code);
        view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0,5]);
        view.addChildToContainer(scrollList); 
        scrollList.bounces = false;
        
        view.freshView();
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
		for(var i:number= 0;i < arr.length; i++){
            let id = Number(i + 1);
            arr[i].id = id;
			if(vo.getChargeLq(id)){
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


    protected getShowWidth():number{
		return 580;
    }

	protected getShowHeight():number{
		return 820;
    }

    public freshView():void{
        let view = this;
        let arr = view.updateArr(view.cfg.recharge);
        view._scrollList.refreshData(arr, view.code);
    }

    private rewardCallBack(evt : egret.Event):void{
		let view = this;
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		let rewards = rData.rewards;
		let cfg = view.cfg.recharge[view.vo.lastidx];
        let str = rewards;
		let rewardList =  GameData.formatRewardItem(str);
		let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
        this.vo.lastidx = -1;
        this.vo.lastpos = null;
	}

	public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_GETRECHARGE),this.rewardCallBack,this);
        view._scrollList = null;
        super.dispose();
	}
}