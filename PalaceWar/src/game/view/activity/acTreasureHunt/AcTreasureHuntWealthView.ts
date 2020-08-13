/**
 * 财神庙奖励预览
 * author qianjun
 */
class AcTreasureHuntWealthView extends PopupView
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

		let bg = BaseBitmap.create(`treasurewealthtop-${view.code}`);
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,0);
		view.addChildToContainer(bg);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acTreasureWealthTip-${view.code}`), 20, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bg, [0,bg.height+10]);
		view.addChildToContainer(tipTxt);

		let row = Math.min(Math.ceil(view.cfg.wealthGod.length / 5) , 4);
		let height = 108 * 0.9 * row + (row - 1) * 8 + 5;
		let listbg = BaseBitmap.create(`public_9_probiginnerbg`);
		listbg.width = 530;
		listbg.height = height + 5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, tipTxt, [0,tipTxt.textHeight+10]);
		view.addChildToContainer(listbg);

		for(let i in view.cfg.wealthGod){
			let reward = view.cfg.wealthGod[i][0];
			let rIcon = GameData.getRewardItemIcons(reward, true, true);
			let icon = rIcon[0];
			let idx = Number(i);
			icon.setScale(0.9);

			icon.x = listbg.x + (listbg.width - (Math.min(5,view.cfg.wealthGod.length)) * 108 * 0.9 - (Math.min(5,view.cfg.wealthGod.length) - 1) * 8) / 2 + (idx % 5) * (108 * 0.9 + 8);
			icon.y = listbg.y + 5 + Math.floor(idx / 5) * (108 * 0.9 + 5);
			view.addChildToContainer(icon);
		}
	}
	
	protected getShowHeight():number{
		let row = Math.min(Math.ceil(this.cfg.wealthGod.length / 5) , 4);
		let height = 108 * 0.9 * row + (row - 1) * 8 + 5;
		return 335 + height;
	}

	protected getShowWidth():number{
		return 560;
	}

	protected getTitleStr():string{
		return `acTreasureWealthTitle-${this.code}`;
	}

	public dispose():void{
		let view = this;
		super.dispose();
	}
}