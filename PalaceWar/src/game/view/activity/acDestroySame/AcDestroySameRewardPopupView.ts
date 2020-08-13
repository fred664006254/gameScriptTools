/**
 * author:qianjun
 * desc:活动弹窗
*/
class AcDestroySameRewardPopupView extends PopupView{

    private _list : ScrollList = null;
	public constructor() {
		super();
	}
	
    private get cfg() : Config.AcCfg.DestroySameCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDestroySameVo{
        return <AcDestroySameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                code = `4`;
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
        if(App.CommonUtil.getResByCode(`destroysametopbg`, this.getUiCode())){
            arr.push(`destroysametopbg-${this.getUiCode()}`);
        }
        return super.getResourceList().concat([
            `destroysametopbg`,`activity_charge_red`,`collectflag`
        ]).concat(arr);
    }
	
    protected getTitleStr():string{
        return `achuntingRewardTitle`;
    }

    // protected getRequestData():{requestType:string,requestData:any}
	// {	
	// 	// let view = this;
	// 	// return {requestType:NetRequestConst.REQUEST_ACTIVITY_ARENARANK,requestData:{
	// 	// 	activeId : view.vo.aidAndCode,
	// 	// }};
	// }

	// protected receiveData(data:{ret:boolean,data:any}):void
	// {
	// 	let view = this;
	// 	//view.vo.setRankInfo(data.data.data);
	// }

	protected initView():void{	
        let view = this;
        let code = view.getUiCode();
        let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 530;
		Bg.height = 700;
        Bg.x = 25+GameData.popupviewOffsetX;
        Bg.y = 10;
        view.addChildToContainer(Bg);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DESTROYSAME_REWARD),this.rewardCallBack,this);
        let topbg = BaseBitmap.create(App.CommonUtil.getResByCode(`destroysametopbg`, code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, Bg, [0,5]);
        view.addChildToContainer(topbg); 

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDestroySameTip1`, this.code, code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 500;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, topbg, [0,8]);
        tipTxt.lineSpacing = 5;
        view.addChildToContainer(tipTxt); 

        //
        let vo = this.vo;
        let taskArr = view.getArr();
		let tmpRect =  new egret.Rectangle(0,0,510,Bg.height - 110);
		let scrollList = ComponentManager.getScrollList(AcDestroySameRoundRewardItem,taskArr,tmpRect,view.code);
        view._list = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, topbg, [0,topbg.height+5]);
		view.addChildToContainer(scrollList); 
		scrollList.bounces = false;
    }

    private getArr():any[]{
        let view = this;
        let arr = Object.keys(view.cfg.bossList);
        let arr1=[];
		let arr2=[];
		let arr3=[];
		
		let curround = view.vo.getCurround();
		for(let i in arr){
            let round = Number(arr[i]);
			if(view.vo.isGetRoundReward(round)){//
				arr1.push(arr[i]);
			}
			else{
				if(curround >= round)
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

    public freshView():void{
        let view = this;
        let taskArr = view.getArr();
        view._list.refreshData(taskArr,this.code);
    }

    private rewardCallBack(evt : egret.Event):void{
        let view = this;
        let code = view.getUiCode();
        if(!evt.data.ret){
            return;
        }
        let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDestroySameTip3`, this.code, code)));
            return;
        }
		let rewards = rData.rewards;
        let str = rewards;
		let rewardList = GameData.formatRewardItem(str);
		let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
		this.vo.lastidx = null;
	}

	public dispose():void{
        let view = this;
        view._list = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DESTROYSAME_REWARD),this.rewardCallBack,this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
		super.dispose();
	}
}