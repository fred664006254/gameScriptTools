/**
 * 奖励预览
 * author qianjun
 */
class AcLanternPoolView extends PopupView
{
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.LanternCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcLanternVo{
        return <AcLanternVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
			case 1:
			case 2:
			case 3:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
            `public_textbrownbg`,
		]);
    }

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;

        let tipbg = BaseBitmap.create(`public_textbrownbg`);
        tipbg.width = 510;
        view.addChildToContainer(tipbg);
        tipbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - tipbg.width / 2,10);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`aclanterntip6`,view.getUiCode())), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
		view.addChildToContainer(tipTxt);

		let rewards = view.cfg.getWealthGod();
		let rewardArr = GameData.getRewardItemIcons(rewards, true, true);//view.cfg.getWealthGod()
        
        let listbg = BaseBitmap.create(`public_9_bg94`);
		listbg.width = 520;
		listbg.height = 260;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, tipbg, [0,tipbg.height+55]);
		view.addChildToContainer(listbg);

        let tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`dailyTask_rewardTip`), 18, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Txt, listbg, [3,-tip2Txt.height-2]);
        view.addChildToContainer(tip2Txt);
        
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

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `sysConfirm`, ()=>{
			view.hide();
		}, view);	
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, listbg, [0,listbg.height+25]);
		this.addChildToContainer(btn);	
	}
	
	protected getShowHeight():number{
		return 540;
	}

	protected getTitleStr():string{
		return `motherdaypoolreward-${this.getUiCode()}`;
	}

	public dispose():void{
		let view = this;
		super.dispose();
	}
}