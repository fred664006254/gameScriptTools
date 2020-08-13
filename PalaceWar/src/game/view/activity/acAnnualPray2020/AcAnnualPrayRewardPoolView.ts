/**
 * 奖励预览
 * author qianjun
 */
class AcAnnualPrayRewardPoolView extends PopupView
{
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.AnnualPray2020Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcAnnualPray2020Vo{
        return <AcAnnualPray2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getUiCode() : string{
        let code = '';
        switch(Number(this.code)){
            case 2:
                code = '1';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

	protected getResourceList():string[]{
		return super.getResourceList().concat([
		]);
    }

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acAnnualPrayPrayTip10-${view.getUiCode()}`), 20, TextFieldConst.COLOR_BLACK);
		tipTxt.setPosition(this.viewBg.x + this.viewBg.width / 2 - tipTxt.width / 2,10);
		view.addChildToContainer(tipTxt);

		let rewards = view.cfg.getWealthGod(2);
		let rewardArr = GameData.getRewardItemIcons(rewards, true, true);//view.cfg.getWealthGod()
		let listbg = BaseBitmap.create(`public_9_probiginnerbg`);
		listbg.width = 520;
		listbg.height = 140;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, tipTxt, [0,tipTxt.textHeight+10]);
		view.addChildToContainer(listbg);

		let scrolNode : BaseDisplayObjectContainer =  new  BaseDisplayObjectContainer();
		view.addChildToContainer(scrolNode);
		for(let i in rewardArr){
			let icon = rewardArr[i];
			let idx = Number(i);

			icon.x = 9 + (idx % 4) * (108 + 20);
			icon.y = 5 + Math.floor(idx / 4) * (108 + 8);
			scrolNode.addChild(icon);
		}
		scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
		scrolNode.width = listbg.width - 20;
		let rect = new egret.Rectangle(listbg.x + 10, listbg.y + 5 , listbg.width - 20, listbg.height - 10);
        let scrollview : ScrollView = ComponentManager.getScrollView(scrolNode,rect)
		scrollview.bounces = false;
		scrollview.x = listbg.x + 10;
		scrollview.y = listbg.y + 12;
		scrollview.horizontalScrollPolicy = 'off';
		this.addChildToContainer(scrollview);


		let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acAnnualPrayPrayTip3-${view.getUiCode()}`), 20, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, listbg, [0,listbg.height+10]);
		view.addChildToContainer(tipTxt2);

		let rewards2 = view.cfg.getWealthGod(1);
		let rewardArr2 = GameData.getRewardItemIcons(rewards2, true, true);//view.cfg.getWealthGod()
		let listbg2 = BaseBitmap.create(`public_9_probiginnerbg`);
		listbg2.width = 520;
		listbg2.height = 210;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg2, tipTxt2, [0,tipTxt2.textHeight+10]);
		view.addChildToContainer(listbg2);

		let scrolNode2 : BaseDisplayObjectContainer =  new  BaseDisplayObjectContainer();
		view.addChildToContainer(scrolNode2);
		for(let i in rewardArr2){
			let icon = rewardArr2[i];
			let idx = Number(i);

			icon.x = 9 + (idx % 4) * (108 + 20);
			icon.y = 5 + Math.floor(idx / 4) * (108 + 8);
			scrolNode2.addChild(icon);
		}
		scrolNode2.height = Math.ceil(rewardArr2.length / 4) * (108 + 8);
		scrolNode2.width = listbg2.width - 20;
		let rect2 = new egret.Rectangle(listbg2.x + 10, listbg2.y + 5 , listbg2.width - 20, listbg2.height - 10);
        let scrollview2 : ScrollView = ComponentManager.getScrollView(scrolNode2,rect2);
		scrollview2.bounces = false;
		scrollview2.x = listbg2.x + 10;
		scrollview2.y = listbg2.y + 5;
		scrollview2.horizontalScrollPolicy = 'off';
		this.addChildToContainer(scrollview2);

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `sysConfirm`, ()=>{
			view.hide();
		}, view);	
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, listbg2, [0,listbg2.height+7]);
		this.addChildToContainer(btn);	
	}
	
	protected getShowHeight():number{
		return 580;
	}

	protected getTitleStr():string{
		return `motherdaypoolreward-${this.getUiCode()}`;
	}

	public dispose():void{
		let view = this;
		super.dispose();
	}
}