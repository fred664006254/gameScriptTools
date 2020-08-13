/**
 * 集市奖励预览
 * author qianjun
 */
class AcTreasureHuntMarketView extends PopupView
{
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.TreasureHuntCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcTreasureHuntVo{
        return <AcTreasureHuntVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
		]);
    }

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,544,730);

		let arr = [];
		let mapId = view.param.data.mapId;
		let relative = view.cfg.map[mapId].relative;
		for(let i in view.cfg.specialPoint[relative].arr){
			let unit = view.cfg.specialPoint[relative].arr[i];
			arr.push(unit);
		}

		let scrollList = ComponentManager.getScrollList(AcTreasureHuntMarketItem,arr,rect,view.code);
		scrollList.setPosition(this.viewBg.x + this.viewBg.width / 2 - scrollList.width / 2,0);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		view.addChildToContainer(scrollList);
		scrollList.bounces = false;
	}
	
	protected getShowHeight():number{
		return 805;
	}

	protected getShowWidth():number{
		return 560;
	}

	protected getTitleStr():string{
		return `acTreasureRoundRewardTitle${this.param.data.mapId}-${this.code}`;
	}

	public dispose():void{
		let view = this;
		super.dispose();
	}
}