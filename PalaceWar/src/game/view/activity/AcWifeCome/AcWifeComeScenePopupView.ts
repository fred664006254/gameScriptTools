/**
 * 红颜来了场景奖励预览
 * author ycg
 */
class AcWifeComeScenePopupView extends PopupView
{
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.WifeComeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcWifeComeVo{
        return <AcWifeComeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
			`acwifecomeview_scenebg-`+this.code,'servant_detailBtn'
		]);
    }

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;
		let bg = BaseBitmap.create(`acwifecomeview_scenebg-`+this.code);
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,0);
		view.addChildToContainer(bg);

		let detailBtn = ComponentManager.getButton("servant_detailBtn","",view.detailBtnHandler,view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, detailBtn, bg, [5,35]);
        view.addChildToContainer(detailBtn);
		
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acWifeComeOfficeTip1-${view.code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChildToContainer(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bg, [0,5]);

		let line = BaseBitmap.create(`public_line3`);
		line.width = 400;
		view.addChildToContainer(line);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt, [0,tipTxt.textHeight + 15]);

		let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acWifeComeOfficeTip2-${view.code}`), 22, TextFieldConst.COLOR_WHITE);
		view.addChildToContainer(tipTxt2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, line);

		let tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acWifeComeOfficeTip3-${view.code}`), 20, TextFieldConst.COLOR_WHITE);
		view.addChildToContainer(tipTxt3);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt3, tipTxt2, [0,tipTxt2.textHeight + 5]);

		let tipTxt4 = ComponentManager.getTextField(LanguageManager.getlocal(`acWifeComeOfficeTip4-${view.code}`), 20, TextFieldConst.COLOR_WHITE);
		view.addChildToContainer(tipTxt4);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt4, bg, [0,5]);
	}

	private detailBtnHandler():void{
		ViewController.getInstance().openView(ViewConst.POPUP.CHANGEBGDETAILPOPUPVIEW,{
			scene:'homeScene', 
			key: this.cfg.sceneID,
		});
	}
	
	protected getShowHeight():number{
		return 795+10;
	}

	protected getShowWidth():number{
		return 560;
	}

	protected getTitleStr():string{
		return `acWifeComeOfficeTitle-${this.code}`;
	}

	public dispose():void{
		let view = this;
		super.dispose();
	}
}