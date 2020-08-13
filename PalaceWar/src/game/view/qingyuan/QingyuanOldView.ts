/**
 * 情缘绘卷
 * author qianjun
 */
class QingyuanOldView extends CommonView{	

	private _list : ScrollList = null;
    public constructor(){
		super();
	}

	protected getResourceList():string[]{
		let arr = [`qingyuanbg`,`qingyuanred`];
		for(let k in Config.EncounterCfg.encounterList){
			let unit = Config.EncounterCfg.encounterList[k];
			for(let i in unit.need){
				let data = unit.need[i];
                let rewardvo = GameData.formatRewardItem(data)[0];
				arr.push(`${unit.type}role${rewardvo.id}`);
			}
		}
		return super.getResourceList().concat(arr);
	}

	protected initBg():void{
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;

        view.viewBg = BaseBitmap.create("qingyuanbg");
        view.viewBg.height = view.height;
      	view.viewBg.y = GameConfig.stageHeigth - view.viewBg.height;
      	view.addChild(this.viewBg);
    }
    
    protected getTitleBgName():string{
		return null;
    }

	protected getTitleStr():string{
		return null;
    }
    
    protected getRuleInfo():string{
		return "qingyuanrule";
	}

	public initView():void{
		let view = this;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL,view.checkRed,view);

		let qingyuantitle = BaseBitmap.create(`qingyuantitle`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, qingyuantitle, view);
		view.addChild(qingyuantitle);

		let scroRect = new egret.Rectangle(0, 0, 531, GameConfig.stageHeigth - qingyuantitle.y - qingyuantitle.height - 115);
		let tmp = [];
		

		for(let j in Config.EncounterCfg.encounterList){
			let type = Config.EncounterCfg.encounterList[j].type;
			if(Api.switchVoApi.checkOpenQingYuan(type)){
				tmp.push(Config.EncounterCfg.encounterList[j]);
			}
		}
		tmp.sort((a,b)=>{
			if(a.type < b.type){
				return 1;
			}
			else{
				return -1;
			}
		});
		
		let scrollList = ComponentManager.getScrollList(QingyuanItem, tmp, scroRect);
        view.addChild(scrollList);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, qingyuantitle, [0,qingyuantitle.height + 20]);
		view._list = scrollList;


		let zshi1 = BaseBitmap.create(`qingyuanzshi1`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, zshi1, view, [0,60]);
		view.addChild(zshi1);

		let zshi2 = BaseBitmap.create(`qingyuanzshi2`);	
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, zshi2, view, [0,60]);
		view.addChild(zshi2);
	}
	
	private checkRed():void{
		let view = this;
		let list : any = view._list;
		for(let i in list._scrollListItemArr){
			let item = <QingyuanItem>list._scrollListItemArr[i];
			if(item){
				item.refresh();
			}
		}
	}

    public dispose() : void{
		let view = this;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL,view.checkRed,view);
		view._list = null;
		super.dispose();
	}
}