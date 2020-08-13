/*
author : qinajun
*/
class AcSingleDay2019DetailViewTab5 extends CommonViewTab{

	private _list1 : ScrollList = null;
	private _list2 : ScrollList = null;


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
	
	public refreshWhenSwitchBack():void{
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRANK,{
            activeId:this.acTivityId,
        })
	}
	
	protected initView():void
	{	
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWBUY), view.buyShopCallback, view);
		let baseview : any = ViewController.getInstance().getView('AcSingleDay2019DetailView');
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;
		let code = view.getUiCode();

		let container = new BaseDisplayObjectContainer();
		container.width = 640;


		//礼包、道具
		let tmp = [];
		let tmp2 = [];
		let shop2 = view.cfg.shop2List;
		for(let i in shop2){
			let unit : Config.AcCfg.SingleDayNewShop2Item = shop2[i];
			if(unit.type == 1){
				//礼包
				tmp.push(unit);
			}
			else{
				//道具
				tmp2.push(unit);
			}
		}

		let tablebg = BaseBitmap.create(`newsingledaytab2bg-${code}`);
		container.addChild(tablebg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tablebg, view);

 		let tmpRect =  new egret.Rectangle(0,0,640,215*tmp.length);
		let scrollList = ComponentManager.getScrollList(AcSingleDay2019GiftItem,tmp,tmpRect,view.code);

		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0,5]);
        container.addChild(scrollList); 
		scrollList.bounces = false;

		view._list1 = scrollList;

		// let topdescbg2 = BaseBitmap.create(`newsingledaytab3tag${code}-2`);
		// container.addChild(topdescbg2);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg2, listbg1, [0,listbg1.height+5]);

		let listbg2 = BaseBitmap.create(`newsingledaytab2bottombg-${code}`);
		listbg2.height = Math.ceil(tmp2.length / 3) * 300;
		container.addChild(listbg2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg2, scrollList, [0,scrollList.height+5]);
 		let tmpRect2 =  new egret.Rectangle(0,0,627,listbg2.height - 10);
		let scrollList2 = ComponentManager.getScrollList(AcSingleDay2019ShopItem,tmp2,tmpRect2,view.code);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList2, listbg2, [0,5]);
        container.addChild(scrollList2); 
		scrollList2.bounces = false;
		view._list2 = scrollList2;

		tablebg.height = container.height;
		
		let scrollviewRect =  new egret.Rectangle(0,0,640,view.height - 10);
		let scrollview = ComponentManager.getScrollView(container,scrollviewRect);
		view.addChild(scrollview); 

		let line = BaseBitmap.create(`newsingledaytab1line-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0,-10]);
		view.addChild(line);
	}

	private buyShopCallback(evt : egret.Event):void{
		let view = this;
		if(view.vo.lasttype == 2){
			let data = evt.data.data.data;
			if(!data){
				App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
				return;
			}
			let rewards = data.rewards;
			let idx = view.vo.lastidx;
			let type = view.vo.buytype;
			let item = null;
			if(type == 1){
				//礼包
				item = <AcSingleDay2019GiftItem>view._list1.getItemByIndex(idx)
			}
			else if(type == 2){
				//道具
				item = <AcSingleDay2019GiftItem>view._list2.getItemByIndex(idx)
			}
			item.refresh();
			let rewardList =  GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardList,view.vo.lastpos);
		}
	}


	public dispose():void{	
		let view = this;
		view._list1 = null;
		view._list2 = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWBUY), view.buyShopCallback, view);
		super.dispose();
	}
}