/**
 * author:qianjun
 * desc:魏征活动任务
*/
class AcWeiZhengTaskView extends PopupView{

    private _scrollList:ScrollList = null; 
    private _day : number = 1;
    private _detailBg : BaseBitmap = null;
    private _detailTxt : BaseTextField = null;
    private _leftBtn : BaseButton = null;
    private _rightBtn : BaseButton = null;
    
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
            `progress5`,`progress3_bg`, `activity_charge_red`, `collectflag`,`chatview_arrow`
        ]).concat(arr);
    }

    protected getTitleStr():string{
        return `acWeiZhengdaytask-${this.getUiCode()}`;
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
        if(view.param.data.day){
            view._day = view.param.data.day;
        }

        let code = view.getUiCode();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_GETTASK),this.rewardCallBack,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_GETBUQIANTASK),this.rewardCallBack,this);
        let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 520;
		Bg.height = 690;
        Bg.x = this.viewBg.width/2-Bg.width/2;
        Bg.y = 25;
        view.addChildToContainer(Bg);

        let topbg = BaseBitmap.create(`weizhengtaskdetailbg-${code}`);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, Bg, [0,5]);
        view.addChildToContainer(topbg);

        let detailbg = BaseBitmap.create(`weizhengtaskdetail${view._day}-${code}`);
        let detailTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acWeiZhengdaytasktip${view._day}-${code}`), 20, TextFieldConst.COLOR_WARN_YELLOW2);
        detailTxt.width = 335;
        detailbg.width = 450;

        let leftArrow = ComponentManager.getButton(`chatview_arrow`, ``, ()=>{
            let day = view._day;
            -- day;
            if(day > 0){
                view._day = day;
                view.freshDay();
            }
        }, view);
        leftArrow.anchorOffsetX = leftArrow.width / 2;
        leftArrow.anchorOffsetY = leftArrow.height / 2;
        leftArrow.rotation = 90;
        leftArrow.x = 50+GameData.popupviewOffsetX;
        leftArrow.y = 110;
        view.addChildToContainer(leftArrow);
        view._leftBtn = leftArrow;

        let rightArrow = ComponentManager.getButton(`chatview_arrow`, ``, ()=>{
            let day = view._day;
            ++ day;
            if(day < 4){
                view._day = day;
                view.freshDay();
            }
        }, view);
        rightArrow.anchorOffsetX = rightArrow.width / 2;
        rightArrow.anchorOffsetY = rightArrow.height / 2;
        rightArrow.rotation = -90;
        rightArrow.x = 530+GameData.popupviewOffsetX;
        rightArrow.y = 110;
        view.addChildToContainer(rightArrow);
        view._rightBtn = rightArrow;

        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, detailbg, topbg);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, detailTxt, detailbg, [80, 0]);
        view.addChildToContainer(detailbg);
        view.addChildToContainer(detailTxt);
        view._detailBg = detailbg;
        view._detailTxt = detailTxt;
        
 		let tmpRect =  new egret.Rectangle(0,0,510, Bg.height - 10 - topbg.height - 10);
		let scrollList = ComponentManager.getScrollList(AcWeiZhengTaskItem, [], tmpRect, view.code);
        view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, topbg, [0,topbg.height + 10]);
        view.addChildToContainer(scrollList); 
        scrollList.bounces = false;

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acWeiZhengTip3-${code}`), 18, TextFieldConst.COLOR_BLACK);
        view.addChildToContainer(tipTxt); 
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, Bg, [0,Bg.height + 10]);
        
        view.freshDay();
    }

    private freshDay():void{
        let view = this;
        let code = view.getUiCode();
        view._detailBg.setRes(`weizhengtaskdetail${view._day}-${code}`);
        view._detailTxt.text = LanguageManager.getlocal(`acWeiZhengdaytasktip${view._day}-${code}`);
        view._detailBg.width = 450;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, view._detailTxt, view._detailBg, [80, 0]);
        view._leftBtn.visible = view._day > 1;
        view._rightBtn.visible = view._day < 3;

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
	
		for(let i in arr){
            let canLq = view.vo.canTaskLq(arr[i].questType, view._day);  
            arr[i].day = view._day;
            arr[i].key = i;
			if(vo.getTaskLq(arr[i].questType, view._day)){
				arr1.push(arr[i]);
			}
			else{
				if(canLq)
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
		return 830;
    }

    public freshView():void{
        let view = this;
        let objList = Api.chatVoApi.arr_clone(view.cfg.task);
		let arr = view.updateArr(objList[view._day]);
        view._scrollList.refreshData(arr, view.code);

        App.CommonUtil.removeIconFromBDOC(view._leftBtn);
        for(let i = 1; i < view._day; ++ i){
            if(view.vo.canDayRewardLq(i)){
                App.CommonUtil.addIconToBDOC(view._leftBtn);
                let reddot = <BaseBitmap>view._leftBtn.getChildByName(`reddot`);
                if(reddot){
                    reddot.setScale(0.8);
                    reddot.x = -12;
                    reddot.y = -6;
                }
                break;
            }
            else{
                App.CommonUtil.removeIconFromBDOC(view._leftBtn);
            }
        }

        App.CommonUtil.removeIconFromBDOC(view._rightBtn);
        let day = view._day + 1;
        for(let i = day; i < 3; ++ i){
            if(view.vo.canDayRewardLq(i)){
                App.CommonUtil.addIconToBDOC(view._rightBtn);
                let reddot = <BaseBitmap>view._rightBtn.getChildByName(`reddot`);
                if(reddot){
                    reddot.setScale(0.8);
                    reddot.x = 12;
                    reddot.y = 6;
                }
                break;
            }
            else{
                App.CommonUtil.removeIconFromBDOC(view._rightBtn);
            }
        }
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
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_GETTASK),this.rewardCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_GETBUQIANTASK),this.rewardCallBack,this);
        view._scrollList = null;
        view._day = 1;
        view._detailBg = null;
        view._detailTxt = null;
        view._leftBtn = null;
        view._rightBtn = null;
        super.dispose();
	}
}