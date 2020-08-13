/*
author : qinajun
*/
class AcSingleDay2019DetailViewTab2 extends CommonViewTab{

	private _list : ScrollList = null;
	private _timeTxt : BaseTextField = null;
	public constructor(data){
		super();
		this.param = data;
		this.initView();
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
	
	private get cfg() : Config.AcCfg.SingleDay2019Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSingleDay2019Vo{
        return <AcSingleDay2019Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
	
	protected initView():void
	{	
		let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRECHARGE),this.rewardCallBack,this);
		let baseview : any = ViewController.getInstance().getView('AcSingleDay2019DetailView');
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;
		let code = view.getUiCode();

		let topdescbg = BaseBitmap.create(`newsingledaytab2topbg-${code}`);
		view.addChild(topdescbg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg, view, [0,5], true);

		let line = BaseBitmap.create(`newsingledaytab1line-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0,-10]);
		view.addChild(line);

		let acTimeTxt = ComponentManager.getTextField("",18,TextFieldConst.COLOR_QUALITY_YELLOW);
        let stTxt = App.DateUtil.getFormatBySecond(view.vo.st,7);
        let etTxt = App.DateUtil.getFormatBySecond(view.vo.et - view.cfg.extraTime * 86400,7);
        let timeStr = App.DateUtil.getOpenLocalTime(view.vo.st,view.vo.et,true);
        acTimeTxt.multiline = true;
        acTimeTxt.lineSpacing = 3;
        acTimeTxt.text = view.vo.getAcLocalTime(true);
		acTimeTxt.setPosition(180,45);
        view.addChild(acTimeTxt);

        let deltaT = `<font color=${view.vo.isInActivity() ? TextFieldConst.COLOR_WARN_GREEN : TextFieldConst.COLOR_WARN_RED}>${view.vo.acCountDown}</font>`;
        let acCDTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acBeautyVoteViewAcTime-1`, [deltaT]),18,TextFieldConst.COLOR_QUALITY_YELLOW);
		view._timeTxt = acCDTxt;
		view.addChild(acCDTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, acCDTxt, acTimeTxt, [0,acTimeTxt.textHeight+5]);

        let rankDescTxt = ComponentManager.getTextField("",18,TextFieldConst.COLOR_QUALITY_YELLOW);
        rankDescTxt.multiline = true;
        rankDescTxt.lineSpacing = 5;
        rankDescTxt.width = 400;
        rankDescTxt.text = LanguageManager.getlocal(`acSingleDay2019Tip7-${code}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankDescTxt, acCDTxt, [0,acCDTxt.textHeight+5]);
        view.addChild(rankDescTxt);
		
		let tablebg = BaseBitmap.create(`newsingledaytab2bg-${code}`);
		tablebg.height = view.height - topdescbg.height;
		view.addChild(tablebg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tablebg, topdescbg, [0,topdescbg.height+5]);

		let vo = this.vo;
		let objList = vo.getArr("recharge");//
		let arr = view.updateArr(objList);
 		let tmpRect =  new egret.Rectangle(0,0,627,view.height - topdescbg.height - 30);
		let scrollList = ComponentManager.getScrollList(AcSingleDay2019ChargeIItem,arr,tmpRect,view.code);
        view._list = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, tablebg, [0,5]);
        view.addChild(scrollList); 
		scrollList.bounces = false;

		TickManager.addTick(this.tick, this);
	}

	private rewardCallBack(evt : egret.Event):void{
		let view = this;
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
		let cfg = view.cfg.recharge[view.vo.lastidx];
        let str = `1032_0_${cfg.specialReward}_${this.getUiCode()}|` + rewards;
		let rewardList =  GameData.formatRewardItem(str);
		let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
		this.vo.lastidx = null;
	}

	private update():void{
		let view = this;
		if(!view.vo){
			return;
		}
		let arr = view.updateArr(view.vo.getArr("recharge"));;//
		view._list.refreshData(arr,view.code);
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

	private tick():void{
		let view = this;
		let deltaT = `<font color=${view.vo.isInActivity() ? TextFieldConst.COLOR_WARN_GREEN : TextFieldConst.COLOR_WARN_RED}>${view.vo.acCountDown}</font>`;
		view._timeTxt.text = LanguageManager.getlocal(`acBeautyVoteViewAcTime-1`, [deltaT]);
	}

	public dispose():void{	
		let view = this;
		TickManager.removeTick(this.tick, this);
		view._list = null;
		view._timeTxt = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRECHARGE),this.rewardCallBack,this);
		super.dispose();
	}
}