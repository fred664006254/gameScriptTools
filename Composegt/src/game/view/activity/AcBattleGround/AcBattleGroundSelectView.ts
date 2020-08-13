/*
author : qianjun
desc : 帮会争顶选取目标
*/
class AcBattleGroundSelectView extends PopupView{
	private _list : ScrollList = null;
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
			// "acmidautumnview_titlebg","progress3_bg","progress3"
		]);
    }

	public initView():void
	{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD),view.getRoundRewardCallback,view);
        
        let cdText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattileGroundAvengerTip1")), 20, TextFieldConst.COLOR_BROWN);
        cdText.setPosition(this.viewBg.x + this.viewBg.width / 2 - cdText.width / 2,10);
        view.addChildToContainer(cdText);

		let bg = BaseBitmap.create(`public_tc_bg01`);
		bg.width = 540;
		bg.height = 660;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, cdText, [0,cdText.textHeight + 12]);
        view.addChildToContainer(bg);
        
		let rect = egret.Rectangle.create();
        rect.setTo(0,0,bg.width - 20,bg.height - 20);
        
		let arr = [];
        for(let i in view.param.data.mem){
			let unit = view.param.data.mem[i];
			if(unit.alive){
				arr.push({
					pic : unit.pic,
					title : unit.title,
					ptitle : unit.ptitle,
					name : unit.name,
					rank : unit.myrank,
					score : unit.value,
					alive : unit.alive,
					uid : unit.uid,
					alliId : view.param.data.alliId,
				});
			}
        }


		let scrollList = ComponentManager.getScrollList(AcBattleGroundSelectItem,arr,rect,view.code);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0,10]);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"),TextFieldConst.COLOR_BROWN);
		view.addChildToContainer(scrollList);
		view._list = scrollList;
		scrollList.bounces = false;
		//view.freshList();
	}

	private _end : boolean;
	private getRoundRewardCallback(evt : egret.Event):void{
        let view = this;
        let data = evt.data.data.data;
        if(!data){
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
		}
		// let idx = view.vo.selIdx;
		// let rewards = data.rewards;
		// if(rewards.indexOf(`20_302_1`) > -1){
        //     rewards = rewards.replace('20_302_1','27_302_1');
        // }
        // let item : any = view._list.getItemByIndex(idx);
		// let pos = item.localToGlobal(item._btn.x + 35, item._btn.y + 20);
		// let rewardList = GameData.formatRewardItem(rewards);
		// App.CommonUtil.playRewardFlyAction(rewardList,pos);
		// view._end = false;
		// view.freshList();
	}

	
	protected getShowHeight():number{
		return 800;
	}

	protected getShowWidth():number{
		return 560;
	}

	protected getTitleStr():string{
		return this.getDefaultCn("acBattleGroundSelect");
	}
    private getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }
	public dispose():void{
		let view = this;
		super.dispose();
	}
}