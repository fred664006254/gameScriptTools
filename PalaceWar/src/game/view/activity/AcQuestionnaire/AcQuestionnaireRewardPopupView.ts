/**
 * 调查问卷奖励预览
 * author qianjun
 */
class AcQuestionnaireRewardPopupView extends PopupView
{
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.QuestionnaireCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getUiCode():string
	{
        let currCode = ``;
        switch(Number(this.code)){
            default:
                currCode = `1`;
                break;
        }
        return currCode;
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
		]);
    }

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;

		let rewardArr = GameData.getRewardItemIcons(view.cfg.getReward, true, true);//view.cfg.getWealthGod()
		let listbg = BaseBitmap.create(`public_9_probiginnerbg`);
		listbg.width = 520;
        listbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - listbg.width / 2,10);
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
        
        listbg.height = scrolNode.height + 15;
        let rect = new egret.Rectangle(listbg.x + 10, listbg.y + 5 , listbg.width - 20, listbg.height - 10);
        let scrollview : ScrollView = ComponentManager.getScrollView(scrolNode,rect)
		scrollview.bounces = false;
		scrollview.x = listbg.x + 10;
		scrollview.y = listbg.y + 5;
		scrollview.horizontalScrollPolicy = 'off';
		this.addChildToContainer(scrollview);

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `sysConfirm`, ()=>{
			view.hide();
		}, view);	
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, listbg, [0,listbg.height+25]);
		this.addChildToContainer(btn);	
	}

	protected getTitleStr():string{
		return `acqareward-${this.code}`;
	}

	public dispose():void{
		let view = this;
		super.dispose();
	}
}