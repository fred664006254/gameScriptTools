/**
 * 粮草奖励item
 * author 钱竣
 */
class AcThreeKingdomsRankFoodRewardItem extends ScrollListItem
{
	private _data:any;
	private _arrow1 : BaseBitmap = null;
	private _list1 : ScrollList = null;

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

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_THREEKINGDOMS;
    }

    private get code() : string{
        return this._code;
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
    
    private _code : string = '';

    protected initItem(index:number,data:any,itemparam:any)
    {   
        let view = this;
        view._data = data;
        view._code = itemparam;
		view.width = 520;
		let code = view.getUiCode();
		
		let separate1 = BaseBitmap.create('threekingdomscrossrewardtitle');
		separate1.width = 528;
		separate1.height = 46;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, separate1, view, [0, 7]);
		view.addChild(separate1);
		separate1.addTouchTap(view.arrow1click, view);

		let arrow1 = BaseBitmap.create('threekingdomscrossrewardarrow');
		arrow1.anchorOffsetX = arrow1.width / 2;
		arrow1.anchorOffsetY = arrow1.height / 2;
		arrow1.rotation = data.show ? 0 : 180;
		
		let qinjiaTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank3ActicityName${data.aid}`, code)), 22, TextFieldConst.COLOR_BROWN);
		let param1 = (separate1.width - arrow1.width - qinjiaTxt.textWidth - 5) / 2;
		view._arrow1 = arrow1;

		this.setLayoutPosition(LayoutConst.leftverticalCenter, qinjiaTxt, separate1, [param1, 0]);
		this.addChild(qinjiaTxt);

		this.setLayoutPosition(LayoutConst.lefttop, arrow1, qinjiaTxt, [qinjiaTxt.textWidth + 5 + arrow1.width / 2, arrow1.height / 2+7]);
		this.addChild(arrow1);

		if(data.show){
			let arr = view.cfg.getFood;
			let tmpRect =  new egret.Rectangle(0,0,528,705);
			let scrollList = ComponentManager.getScrollList(AcThreeKingdomsFoodItem, arr, tmpRect, view.code);
			view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, separate1, [0, separate1.height+5]);
			//scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") );
			view.addChild(scrollList);
			view._list1 = scrollList; 

			let listbg = BaseBitmap.create(`public_9_bg32`);
			view.addChildAt(listbg, 0);
			listbg.width = 528;
			listbg.height = arr.length * 45 + 46;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, separate1);
		}
		this.height -= 5;
	}

	private arrow1click():void{
		let view = this;
		let list: any = view.parent.parent;
		let arr = list._dataList;
        // for(let i = 0; i < 2; ++ i){
        //     // let unit = view.cfg.odds[i];
        //     arr.push({
		// 		index : Number(i),
		// 		param : i == 0 ? 'sadun' : 'notsadun',
		// 		type : view._data.type,
		// 		show : true
        //     });
        // }
		if(view._arrow1.rotation == 0){
			view._arrow1.rotation = 180;
		}
		else{
			view._arrow1.rotation = 0;
		}

		for(let i in arr){
			//let show = view._arrow1.rotation == 0;
			arr[i].show = false;
			if(Number(i) == view._index){
				arr[i].show = true;
			}
		}
		// arr[view._data.index].show = view._arrow1.rotation == 0;
		list.refreshData(arr,view.code);
	}

	public dispose():void
	{
		this._data = null;
		if(this._arrow1){
			this._arrow1.removeTouchTap();
			this._arrow1 = null;
		}
		if(this._list1){
			this._list1 = null;
		}
		super.dispose();
	}
}