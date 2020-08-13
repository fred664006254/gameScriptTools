/*
author : qianjun---wxz
desc : 帮会争顶选取目标
*/
class AcGroupWifeBattleSelectView extends PopupView{
	private _list : ScrollList = null;
	private _itemNumtxt:BaseTextField = null;
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	  protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"acmidautumnview_titlebg","progress3_bg","progress3"
		]);
    }

	public initView():void
	{		
		let view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_SEARCH),view.searchCallback,view);
        
        let cdText = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleAvengerTip1-${view.getUiCode()}`), 20, TextFieldConst.COLOR_BROWN);
        cdText.setPosition(50,20);
        view.addChildToContainer(cdText);

		let have = Api.itemVoApi.getItemNumInfoVoById(this.cfg.needItem.chanllge);
		let itemNumtxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleSelectItemNum-${view.getUiCode()}`, [""+have]), 20, TextFieldConst.COLOR_BROWN);
		itemNumtxt.x = 570-itemNumtxt.width;
		itemNumtxt.y = cdText.y;
		view.addChildToContainer(itemNumtxt);

		let bg = BaseBitmap.create(`public_9_bg4`);
		bg.width = 530;
		bg.height = 660;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view.viewBg, [0,52]);
        view.addChildToContainer(bg);
        
		let rect = egret.Rectangle.create();
        rect.setTo(0,0,520,bg.height - 15);
        
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
					puid: unit.pUid,
					alliId : view.param.data.alliId,
				});
			}
        }


		let scrollList = ComponentManager.getScrollList(AcGroupWifeBattleSelectItem,arr,rect,view.code);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0,5]);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		view.addChildToContainer(scrollList);
		view._list = scrollList;
		// scrollList.bounces = false;
		//view.freshList();
	}

	private _end : boolean;
	private searchCallback(evt : egret.Event):void{
        let view = this;
        if (evt.data.ret == false)
        {
            return;
        }

		let have = Api.itemVoApi.getItemNumInfoVoById(this.cfg.needItem.chanllge);
		this._itemNumtxt.text = LanguageManager.getlocal(`acGroupWifeBattleSelectItemNum-${view.getUiCode()}`, [""+have]);
		this._itemNumtxt.x = 570-this._itemNumtxt.width;
	}
	
	protected getShowHeight():number{
		return 800;
	}

	protected getShowWidth():number{
		return 560;
	}

	protected getTitleStr():string{
		return `acGroupWifeBattleSelect-${this.getUiCode()}`;
	}

	public dispose():void{
		let view = this;
		view._itemNumtxt = null;
			App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_SEARCH),view.searchCallback,view);
		super.dispose();
	}
}