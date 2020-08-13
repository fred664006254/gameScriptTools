/**
 * 财神驾到
 * author qianjun
 */

class AcTreasureHuntWealthSucView extends BaseView
{

	private _confirmCallback:Function;
	
	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();

		return rewardPic.concat([
            "caishen_tex_png","caishen_tex_json","caishen_ske"
		]);
	}

	private get cfg() : Config.AcCfg.TreasureHuntCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcTreasureHuntVo{
        return <AcTreasureHuntVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }


	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "public_9_bg8";
    }
    
    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}
	
	protected isTouchMaskClose():boolean{
		return true;
	}

	protected isShowMask():boolean{
		return true;
	}

	protected initView():void
	{
		let view = this;
		view.addTouchTap(view.hide,view);
        let title = BaseBitmap.create(`treasurewealthtitle-${view.code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view, [0,150]);
        view.addChild(title);

        if(App.CommonUtil.check_dragon()){
			let dgbone = App.DragonBonesUtil.getLoadDragonBones('caishen',-1,'guanghuan1');
			dgbone.setAnchorOffset(-240,-150);
			dgbone.x = 70;
			dgbone.y = 323;
			//App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dgbone, title, [0,title.height + 85]);
			dgbone.playDragonMovie('guanghuan1',1);
			dgbone.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
				dgbone.playDragonMovie('guanghuan2',0);
			}, view);
			view.addChild(dgbone);

			let dgbone2 = App.DragonBonesUtil.getLoadDragonBones('caishen',-1,'jinbi1');
			dgbone2.setAnchorOffset(-240,-150);
			dgbone2.x = 70;
			dgbone2.y = 323;
			dgbone2.playDragonMovie('jinbi1',1);
			dgbone2.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
				dgbone2.playDragonMovie('jinbi2',0);
			}, view);
			view.addChild(dgbone2);

			let dgbone3 = App.DragonBonesUtil.getLoadDragonBones('caishen',-1,'juese1');
			dgbone3.setAnchorOffset(-240,-150);
			//App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dgbone3, title, [0,title.height + 85]);
			dgbone3.x = 70;
			dgbone3.y = 323;
			dgbone3.playDragonMovie('juese1',1);
			dgbone3.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
				dgbone3.playDragonMovie('juese2',0);
			}, view);
			view.addChild(dgbone3);
			// guanghuan1          光环出现
			// guanghuan2          光环循环
			// jinbi1                     金币出现
			// jinbi2                     金币循环
			// juese1                    角色出现
			// juese2                    角色循环

			
        }
        else{
            
        }

        let tipBg = BaseBitmap.create(`public_9_bg15`);
        tipBg.width = 360;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, title, [0,title.height + 450]);
        view.addChild(tipBg);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acTreasureWealthTip1-${view.code}`, [view.cfg.wealthGodTimes.toString()]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipBg);
        view.addChild(tipTxt);
    }

	private sureBtnClick():void
	{
		ViewController.getInstance().hideAllView();
		// ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
	}

    private noBtnClick():void
	{
		this.hide();
		// ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
	}

	private touchTap():void
	{
		this.hide();
	}

	public hide()
	{
		super.hide();
		if(this.param.data && this.param.data.confirmCallback){
			this.param.data.confirmCallback.apply(this.param.data.handler,[]);
		}
		
    }
    
	public dispose():void
	{
		this.removeTouchTap();
		super.dispose();
	}

}