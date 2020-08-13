/**
 * 集市奖励item
 * author qianjun
 */
class AcTreasureHuntMarketItem  extends ScrollListItem
{
	private _code : string;
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
        return this._code;
    }

    private get aid():string{
        return AcConst.AID_TREASUREHUNT;
	}

	protected initItem(index:number,data:any,itemParam?:any){
		let view = this;
		view.width = 544;
		view.height = 222;
		view._code = itemParam;

		let bg = BaseBitmap.create(`treasurenpcbg-${view.code}`);
		bg.width = view.width;
		bg.height = view.height;
		view.addChild(bg);

		let npc = BaseLoadBitmap.create(data.npcId);
		if (data.npcId.indexOf("wife") > -1) {
			npc.setScale(460 / 640 * 0.45);
			npc.x = 30;
		}
		else{
			npc.setScale(0.45);
			npc.x = 50;
		}
	
		npc.y = 10;
		view.addChild(npc);
		//["npcID"]="story_npc_8",
		//["specificPool"]={{"6_1201_1",2},{"6_1202_1",2},{"6_1203_1",2},{"6_1204_1",1},{"6_1205_1",1},{"6_1411_1",1}},
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acTreasureMarketTip-${view.code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, bg, [245 + (285 - tipTxt.textWidth) / 2,55]);

		let row = Math.min(Math.ceil(data.specificPool.length / 3) , 4);
		let tmpX = 245 + (285 - Math.min(data.specificPool.length,3) * 108 * 0.7 - (Math.min(data.specificPool.length,3) - 1) * 8) / 2;
		for(let i in data.specificPool){
			let reward = data.specificPool[i];
			let rIcon = GameData.getRewardItemIcons(reward[0], true, false);
			let icon = rIcon[0];
			let idx = Number(i);
			icon.setScale(0.7);

			icon.x = tmpX + (idx % 3) * (108 * 0.7 + 8);
			icon.y = tipTxt.y + tipTxt.textHeight + 15;
			view.addChild(icon);
		}
	}

	public getSpaceY():number{
		return 0;
	}
	
	public dispose():void{
		let view = this;
		super.dispose();
	}
}