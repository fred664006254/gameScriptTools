/**
 * 粮草奖励展示
 * author 钱竣
 */
class AcThreeKingdomsRankFoodRewardView extends PopupView
{
	
	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get acTivityId():string{
        return `${this.aid}-${this.code}`;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
	
	protected getTitleStr() : string{
		return App.CommonUtil.getCnByCode(`acThreeKingdomsRank3Tip2`, this.getUiCode());
	}

	
    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
		]);
	}

	// protected getRequestData():{requestType:string,requestData:any}
	// {	
	// 	let childInfo = Api.adultVoApi.getAdultInfoVoById(this.param.data.childid);
	// 	return {requestType:NetRequestConst.REQUEST_SADUN_GETVISITME,requestData:{ aquality: childInfo.aquality ,sex : childInfo.sex}};
	// }

	// protected receiveData(data:{ret:boolean,data:any}):void
	// {	
	// 	if(data.ret){
	// 		Api.adultVoApi.setVisitInfo(data.data.data.visitedmelist);
	// 	}
	// }

	protected getShowHeight():number{
		return 780;
	}

	protected initView():void{
		let view = this;
		let arr = [];
		let tmp = [
			AcConst.AID_ACCROSSSERVERPOWER,
			AcConst.AID_ACCROSSSERVERINTIMACY,
			AcConst.AID_ACCROSSSERVERATKRACE,
			AcConst.AID_NEWACCROSSSERVERATKRACE,
			AcConst.AID_BATTLEGROUND,
			AcConst.AID_TOMB,
			AcConst.AID_CONQUERMAINLAND,
			AcConst.AID_ACCROSSSERVERWIFEBATTLE
		];
        for(let i = 0; i < 8; ++ i){
			// let unit = view.cfg.odds[i];
			arr.push({
				index : Number(i),
				show : i == 0,
				aid : tmp[i]
			});
		}
        let tmpRect =  new egret.Rectangle(0,0,528,685);
		let scrollList = ComponentManager.getScrollList(AcThreeKingdomsRankFoodRewardItem, arr, tmpRect, view.code);
		view.addChildToContainer(scrollList);
		scrollList.x = 50;
	}
	public dispose():void{
		super.dispose();
	}
}