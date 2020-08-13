/**
 * 红颜换皮肤界面
 * author qianjun
 * date 2018/3/2
 * @class WifeskinView
 */
class WifeskinNewView extends CommonView {

	public constructor() {
		super();
	}

	protected getTabbarTextArr():string[]{
		return [
			"wifeskintab1",
			"wifeskintab2"
		];
	}

	  // 初始化tabbarGroup
	  protected initTabbarGroup():void{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{
			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this,null,TabBarGroup.ALIGN_VERTICAL,null,true);
            this.tabbarGroup.setSpace(0);
            let tabBarX:number=(this instanceof PopupView)?30:15;
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			// this.changeTab();
		}
	}

	protected changeTab():void{
		super.changeTab();
		this.setChildIndex(this.tabbarGroup, 999);
	}

	protected getTitleButtomY():number{
		return 89;
	}


	protected setTabBarPosition():void{
		super.setTabBarPosition();
		this.tabbarGroup.x = GameConfig.stageWidth - this.tabbarGroup.width;
		this.tabbarGroup.y = this.titleBg.y + this.titleBg.height + 100;
	}

	// 页签图名称
	protected getTabbarName():string|string[]{
        let arr = [];
        for(let i = 1; i < 3; ++ i){
            arr.push(`wifeskintab${i}`);
        }
        return arr;
    }

	protected checkTabCondition(index:number):boolean{
		let view = this;
		let id = this.param.data.id
		if(index == 1){
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(id);
			let canlevelup = false;
			if(wifeSkinVo && wifeSkinVo.skin){
				for(let i in wifeSkinVo.skin){
					let wifeskincfg = Config.WifeskinCfg.getWifeCfgById(i);
					if(wifeskincfg && wifeskincfg.levelUp){
						for(let j in wifeskincfg.levelUp){
							let unit = wifeskincfg.levelUp[j];
							if(unit && typeof unit.levelUpUnlock == `number` && Number(unit.levelUpUnlock) > 0){
								canlevelup = true;
								break;
							}
						}
						if(canlevelup){
							break;
						}
					}
				}
			}
			if(canlevelup){
				return true;
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal(`wifeskinleveluptip6`) );
				return false;
			}
		}
		else{
			return true;
		}
	}

	protected getTitleStr():string{
		return `wifeskinViewTitle`;
	}

	public tick():void{
		let view = this;
		let id = this.param.data.id
		let wifecfg = Config.WifeCfg.getWifeCfgById(id);
		let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(id);
		let canlevelup = false;
		let haveskin = false;
		if(wifeSkinVo && wifeSkinVo.skin){
			for(let i in wifeSkinVo.skin){
				let wifeskincfg = Config.WifeskinCfg.getWifeCfgById(i);
				if(wifeskincfg && wifeskincfg.levelUp){
					if(Api.wifeSkinVoApi.getSkinOneRed(id, wifeskincfg.id)){
						canlevelup = true;
					}
					for(let j in wifeskincfg.levelUp){
						let unit = wifeskincfg.levelUp[j];
						if(unit && typeof unit.levelUpUnlock == `number` && Number(unit.levelUpUnlock) > 0){
							haveskin = true;
							break;
						}
					}
				}
			}
		}
		if(haveskin){
            view.tabbarGroup.setLocked(1, false);
        }
        else{
            view.tabbarGroup.setLocked(1, true);
		}
		//红点
		// let tabview : any = this.tabViewData[0];
		// if(tabview && tabview._skinId){
		// 	if(Api.wifeSkinVoApi.getSkinOneRed(id, tabview._skinId)){
		// 		canlevelup = true;
		// 	}
		// }
		
		if(canlevelup){
			view.tabbarGroup.addRedPoint(0);
			view.tabbarGroup.setRedPos(0,70,0);
		}
		else{
			view.tabbarGroup.removeRedPoint(0);
		}
	}

	public initView(): void {
		let view = this;
		view.tick();
		// let tarbg = BaseBitmap.create(`wifeskintabbg`);
		// tarbg.width = GameConfig.stageWidth;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHILD_GUIDE,view.doGuide,view);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFENEWSKIN_CHANGESKIN,view.tick,view);
		//view.tabbarGroup.x = (GameConfig.stageWidth - view.tabbarGroup.width) / 2;
		
		// tarbg.x= 0;
		// tarbg.y = 87;
		// view.addChildAt(tarbg, view.getChildIndex(view.tabbarGroup)-1);
	}

	protected clickTabbarHandler(data:any):void
	{
		
		App.LogUtil.log("index: " + data.index);
		var index = Number(data.index);
		if(this.tabViewData[1 - index]){
			this.tabViewData[1 - index].clearDB();
		}
		super.clickTabbarHandler(data);
	}

	public clickChangeToBg(bgid : string):void{
		let view = this;
		view.clickTabbarHandler({index : 1}); 
		view.selectedTabIndex = 1;
		view.tabbarGroup.selectedIndex = 1;
		
		let tabview =<WifeskinNewViewTab2>this.tabViewData[this.selectedTabIndex];
		if(tabview){
			tabview.changeSelect(bgid);
		}
	}


	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"wifeview_namebg","wifeview_namebg","wifeview_bottombg2","wifeskin_descbg","wifeskin_barbg","wifeskin_bottombg","tailor_iconBtn","tailor_iconBtn_down","wifeview_in","wifeview_noget","wifeview_skingetbg",
			"wifeskintab1",`wifeskintab1_down`,`skin_box_namebg`,`acliangbiographyview_common_acbg`,`skin_detail_probg`,`skin_detail_pronamebg`,`wifeskintabbg`,`wifeskinrope`,`wifeskinropetop`,`mlservantselected-1`,`wifebgitemmask`,"wifeskintab2",`wifeskintab2_down`,
		]);
	}

	protected getRuleInfo(): string {
		return "wifeskin_description_wifeskinlevelup";
	}
	private doGuide()
	{
		this.hide();
	}
	
	public dispose():void{
		let view = this;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SERVANTBONE);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHILD_GUIDE,this.doGuide,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFENEWSKIN_CHANGESKIN,view.tick,view);
		super.dispose();
	}
}