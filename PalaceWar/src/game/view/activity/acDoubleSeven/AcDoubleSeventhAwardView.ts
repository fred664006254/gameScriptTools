/**
 * 七夕灯会奖励弹窗
 * author qianjun
 * @class AcDoubleSevenAwardView
 */

class AcDoubleSeventhAwardView  extends PopupView
{
	public constructor() {
		super();
	}

	private _list : ScrollList = null;

	private get cfg() : Config.AcCfg.DoubleSeventhCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcDoubleSeventhVo{
        return <AcDoubleSeventhVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    private get acTivityId() : string{
		let seventhview : any = <AcCommonView>ViewController.getInstance().getView('AcDoubleSeventhView');
        return `${this.param.data.aid}-${this.param.data.code}`;
    }
	
	protected getTitleStr() : string{
		return 'emperorWarRewardViewTitle';
	}

	public initView():void
	{	
		let view = this;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH,this.fresh_jindu,this); 
		view.viewBg.width = 562;
		view.viewBg.height = 782;
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0,12]);
		
		let bg1= BaseBitmap.create("public_9_bg32");
        bg1.width = 522;
		bg1.height = 690;
		view.addChild(bg1);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, bg1, view.viewBg, [0,60]);
		
		let scroRect = new egret.Rectangle(0, 0, 502, 680);
		let arr = [];
		for(let i = 0; i < Object.keys(view.cfg.recharge).length; ++ i){
			arr.push({
				key : i + 1
			});
		}
		arr.sort((a,b)=>{
			let isGeta = view.vo.isGetRecharge(a.key);
			let isGetb = view.vo.isGetRecharge(b.key);
			if(isGeta && !isGetb){
				return 1;
			}
			else if(isGetb && !isGeta){
				return -1;
			}
			else{
				return a.key - b.key;
			}
		});
		let scrollList = ComponentManager.getScrollList(AcDoubleSeventhAwardScrollItem, arr, scroRect, view.param.data.code);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, bg1);
		view.addChild(scrollList);
		view._list = scrollList;
	}
	
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"progress5","progress3_bg"
		]);
	}

	private fresh_jindu():void{
		let view = this;
		let arr = [];
		for(let i = 0; i < Object.keys(view.cfg.recharge).length; ++ i){
			arr.push({
				key : i + 1
			});
		}
		arr.sort((a,b)=>{
			let isGeta = view.vo.isGetRecharge(a.key);
			let isGetb = view.vo.isGetRecharge(b.key);
			if(isGeta && !isGetb){
				return 1;
			}
			else if(isGetb && !isGeta){
				return -1;
			}
			else{
				return a.key - b.key;
			}
		});
		view._list.refreshData(arr,view.param.data.code);
	}

    
    public dispose()
    {
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH,this.fresh_jindu,this); 
		this._list = null;
		super.dispose()
    }
}