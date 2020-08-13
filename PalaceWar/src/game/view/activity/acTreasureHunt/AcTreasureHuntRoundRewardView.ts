/**
 * 圈数奖励预览
 * author qianjun
 */
class AcTreasureHuntRoundRewardView extends PopupView
{
	private _list : ScrollList = null;
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

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"acmidautumnview_titlebg","progress3_bg","progress3"
		]);
    }

	public initView():void
	{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD),view.getRoundRewardCallback,view);
		
		let bg = BaseBitmap.create(`public_9_probiginnerbg`);
		bg.width = 530;
		bg.height = 715;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,5);
		view.addChildToContainer(bg);
		
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,528,bg.height - 10);
		let scrollList = ComponentManager.getScrollList(AcTreasureHuntRoundRewardItem,null,rect,view.code);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, bg);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		view.addChildToContainer(scrollList);
		view._list = scrollList;
		scrollList.bounces = false;
		view.freshList();

		
		let cdText = ComponentManager.getTextField(LanguageManager.getlocal(`acTreasureTimeTip3-${view.code}`), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cdText, scrollList, [0, scrollList.height + 30]);
        view.addChildToContainer(cdText);
	}

	private _end : boolean;
	private getRoundRewardCallback(evt : egret.Event):void{
        let view = this;
        let data = evt.data.data.data;
        if(!data){
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
		}
		let idx = view.vo.selIdx;
		let rewards = data.rewards;
		let replacerewards = data.replacerewards;
		if (replacerewards) {
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards, "message": "changeOtherRewardTip" });
		}
        let item : any = view._list.getItemByIndex(idx);
		let pos = item.localToGlobal(item._btn.x + 35, item._btn.y + 20);
		let rewardList = GameData.formatRewardItem(rewards);
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
		view._end = false;
		view.freshList();
	}

	public tick():void{
		let view = this;
		if(view.vo.isActyEnd() && !view._end){
			view._end = true;
			view.freshList();
		}
	}

	private freshList():void{
		let view = this;
		let dataList =new Array<any>();
		let cfg = this.cfg;
		let curRound = view.vo.getCurRound();
		for(let i in cfg.circleReward){
			let cid = Number(i);
			if(cid >= view.vo.getRoundMax() && curRound > 10){
				for(let j = view.vo.getRoundMax(); j <= (view.vo.getCurRound() + 1); ++ j){
					if(view.vo.getCurRoundGetState(j) < 3){
						cid = j;
						break;
					}
				}
			}
			dataList.push({
				id : cid,
				num :  cid,
				getReward : cfg.circleReward[i].getReward,
			});
		}
		dataList.sort((a,b)=>{
			let flaga = view.vo.getCurRoundGetState(a.id);
			let flagb = view.vo.getCurRoundGetState(b.id);
			if(flaga == flagb){
				return a.num - b.num;
			}
			else{
				return flaga - flagb;
			}
		});
		view._list.refreshData(dataList,view.code);
	}
	
	protected getShowHeight():number{
		return 790;
	}

	protected getShowWidth():number{
		return 560;
	}

	protected getTitleStr():string{
		return `acTreasureRoundRewardTitle-${this.code}`;
	}

	public dispose():void{
		let view = this;
		view._end = false;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD),view.getRoundRewardCallback,view);
		view._list = null;
		super.dispose();
	}
}