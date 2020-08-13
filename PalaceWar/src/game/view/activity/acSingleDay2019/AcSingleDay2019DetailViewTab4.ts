/*
author : qinajun
*/
class AcSingleDay2019DetailViewTab4 extends CommonViewTab{

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
		let baseview : any = ViewController.getInstance().getView('AcSingleDay2019DetailView');
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;
		let code = view.getUiCode();

		let container = new BaseDisplayObjectContainer();
		container.width = 640;

		let topdescbg = BaseBitmap.create(`newsingledaytab3tag${code}-2`);
		container.addChild(topdescbg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg, view, [0,10], true);

		//头像框
		let tmp = [];
		let tmp2 = [];
		let shop1 = view.cfg.shop1List;
		for(let i in shop1){
			let unit : Config.AcCfg.SingleDayNewShop1Item = shop1[i];
			let rewardvo = GameData.formatRewardItem(unit.item)[0];
			if(rewardvo.type == 11){
				//头像框
				let cfg = Config.TitleCfg.getTitleCfgById(rewardvo.id);
				if(cfg && cfg.isTitle == 3){
					//皮肤
					tmp2.push(unit);
				}
				else{
					tmp.push(unit);
				}
					
			}
			else{
				//皮肤
				tmp2.push(unit);
			}
		}

		let tablebg = BaseBitmap.create(`newsingledaytab2bg-${code}`);
		view.addChild(tablebg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tablebg, topdescbg);
		tablebg.height = view.height;

		let listbg1 = BaseBitmap.create(`newsingledaytab2bottombg-${code}`);
		listbg1.height = Math.ceil(tmp2.length / 2) * 450;
		container.addChild(listbg1);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg1, topdescbg, [0,topdescbg.height+5]);
 		let tmpRect =  new egret.Rectangle(0,0,610,listbg1.height - 10);
		let scrollList = ComponentManager.getScrollList(AcSingleDay2019SkinItem,tmp2,tmpRect,view.code);

		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg1, [0,5]);
        container.addChild(scrollList); 
		scrollList.bounces = false;

		if(tmp.length){
			let topdescbg2 = BaseBitmap.create(`newsingledaytab3tag${code}-1`);
			container.addChild(topdescbg2);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg2, listbg1, [0,listbg1.height+5]);

			let listbg2 = BaseBitmap.create(`newsingledaytab2bottombg-${code}`);
			listbg2.height = Math.ceil(tmp.length / 2) * 450;
			container.addChild(listbg2);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg2, topdescbg2, [0,topdescbg2.height+5]);
			let tmpRect2 =  new egret.Rectangle(0,0,610,listbg2.height - 10);
			let scrollList2 = ComponentManager.getScrollList(AcSingleDay2019SkinItem,tmp,tmpRect2,view.code);
		
			view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList2, listbg2, [0,5]);
			container.addChild(scrollList2); 
			scrollList2.bounces = false;			
		}
		
		let scrollviewRect =  new egret.Rectangle(0,0,640,view.height - 10);
		let scrollview = ComponentManager.getScrollView(container,scrollviewRect);
		view.addChild(scrollview); 

		let line = BaseBitmap.create(`newsingledaytab1line-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0,-10]);
		view.addChild(line);

	}

	public dispose():void{	
		let view = this;
		super.dispose();
	}
}