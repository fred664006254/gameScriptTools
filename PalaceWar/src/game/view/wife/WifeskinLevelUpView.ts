/**
 * 红颜皮肤升级解锁界面
 * author qianjun
 */
class WifeskinLevelUpView extends CommonView {

	private _arr : any[] = [];
	private _costGroup : BaseDisplayObjectContainer = null;
	private _levelCostTxt : BaseTextField = null;
	private _levelbtn : BaseButton = null;
	private _curLevel = 0;
	private _curLevelTxt : BaseTextField = null;
	private _stopTouch : boolean = false;
	private _list : ScrollList = null;
	private _topbg : BaseBitmap = null;

	public constructor() {
		super();
	}

	protected get uiType():string
	{
		return "2";
	}

	protected getTitleStr():string{
		return `wifeskinlvup`;
	}

	// protected getContainerY():number{
	// 	return 90;
	// }

	public initView(): void {
		let view = this;
		view.height = GameConfig.stageHeigth;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFESKIN_UPGRADE), this.upgradeCallback, this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFECHAT_RESET),this.freshView,this);
		view.width = GameConfig.stageWidth;
		let skinId = view.param.data.skinId;
		let skinCfg =  Config.WifeskinCfg.getWifeCfgById(skinId);
		let wifeid =skinCfg.wifeId;
		let skinLevel = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
		view._curLevel = skinLevel;
		view.container.height = view.height - view.titleBg.height;

		let topBg = BaseBitmap.create(`wifeskinleveltopbg`);
		view.addChildToContainer(topBg);
		view._topbg = topBg;

	// 	let wcfg = Config.WifeskinCfg.getWifeCfgById(this.cfg.corePrize);
		let wife = BaseLoadBitmap.create(skinCfg.body);
		wife.width = 640;
		wife.height = 840;
		wife.setScale(0.4);
		view.addChildToContainer(wife);
		wife.mask = new egret.Rectangle(0,0,640,450);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, topBg, [0,0]);

		let skinNameTxt = ComponentManager.getTextField(skinCfg.name,24,TextFieldConst.COLOR_BROWN);
		view.addChildToContainer(skinNameTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, skinNameTxt, topBg, [304 + (165 - skinNameTxt.width) / 2, 50 + (50 - skinNameTxt.height) / 2]);

		let levelTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifanglevel`, [skinLevel.toString()]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChildToContainer(levelTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelTxt, topBg, [297 + (165 - levelTxt.width) / 2, 90 + (40 - levelTxt.height) / 2]);
		view._curLevelTxt = levelTxt;

		let juqingbtn = ComponentManager.getButton(`wifeskinleveljuqingbtn`, ``, ()=>{
			//打开剧情
			ViewController.getInstance().openView(ViewConst.POPUP.WIFECHATSELECTVIEW, {
				skinId : skinId,
			});
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, juqingbtn, topBg, [15,15]);
		view.addChildToContainer(juqingbtn);
		juqingbtn.visible = false;

		let descbg = BaseBitmap.create(`arena_bottom`);
		descbg.height = 140;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, view.container, [0,0], true);
		view.addChildToContainer(descbg);

		
		let levelBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, `servantInfoLevelup`, ()=>{
			if(view._stopTouch){
				return;
			}
			// let item = <WifeSkinLevelItem>view._list.getItemByIndex(8);
			// if(item){
			// 	item.showLevelEff(()=>{
			// 		// view.freshView();
			// 		view._stopTouch = false;
			// 	},view);
			// }
			// return;
			view._stopTouch = true;
			let skinLevel = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
			if(skinLevel < levelup.length){
				let levelUpCost = levelup[skinLevel].levelUpCost;
				if(levelUpCost && levelUpCost != ``){
					let rewardvo = GameData.formatRewardItem(levelUpCost);
					for(let i in rewardvo){
						let unit = rewardvo[i];
						let have = Api.itemVoApi.getItemNumInfoVoById(unit.id);
						let need = unit.num;
						if(need > have){
							App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinleveluptip3"));
							view._stopTouch = false;
							return;
						}
					}
				}
				//升级消息
				NetManager.request(NetRequestConst.REQUEST_WIFESKIN_UPGRADE,{
					wifeId : wifeid,
					wifeSkinId : skinId
				});
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinlevelupmaxtip"));
				view._stopTouch = false;
			}

		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, levelBtn, descbg, [0,25]);
		view.addChildToContainer(levelBtn);
		view._levelbtn = levelBtn;

		let costGroup = new BaseDisplayObjectContainer();
		costGroup.height = 40;
		view.addChildToContainer(costGroup);
		view._costGroup = costGroup;

		let costtxt = ComponentManager.getTextField(LanguageManager.getlocal(`wifeskinlvupcost`), 22);
		costGroup.addChild(costtxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costtxt, costGroup, [0,0],true);

		let haveTxt = ComponentManager.getTextField(``, 22);
		view._levelCostTxt = haveTxt;
		costGroup.addChild(haveTxt);

		
		let levelup = skinCfg.levelUp;
		for(let i in levelup){
			let unit = levelup[i];
			if(unit && unit.levelUpUnlock){
				let tmp = String(unit.levelUpUnlock).split(`_`);
				//剧情、配音、背景
				let type = ``;
				if(tmp.length == 1){
					//背景
					type = `scene`;
				}
				else{
					let id = Number(tmp[1]);
					if(id < 200){
						//剧情
						type = `avg`;
						juqingbtn.visible = true;
					}
					else if(id < 300){
						//有开关
						if(Api.switchVoApi.checkWifeSkinSoundOpen(skinId)){
							//配音
							type = `sound`;
						}
						else{
							
						}
					}
				}
				view._arr.push({
					level : Number(i) + 1,
					data : unit,
					type : type,
					skinId : skinId
				});
			}
			else if(unit){
				view._arr.push({
					level : Number(i) + 1,
					data : unit,
					type : ``,
					skinId : skinId
				});
			}
		}

		let bgrect = new egret.Rectangle(0,0,614,descbg.y - topBg.y - topBg.height - 5);
        let list = ComponentManager.getScrollList(WifeSkinLevelItem, view._arr, bgrect, view._curLevel);
		list.bounces = false;
		view.addChildToContainer(list);
		view._list = list;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, topBg, [0,topBg.height]);
		
		this.freshView();
	}

	// 初始化标题
	protected initTitle():void{
		super.initTitle();
		this.titleTF.size = 28;
		this.titleTF.y = this.titleBg.y+54;
	}

	private upgradeCallback(evt : egret.Event):void{
		let view = this;
		if(!evt.data.ret){
			view._stopTouch = false;
			return;
		}
		if(evt.data.data.data){
			view.showUpgradeEffect();
		}
	}

	protected showUpgradeEffect()
	{	
		let view = this;
		let skinId = view.param.data.skinId;
		SoundManager.playEffect(SoundConst.EFFECT_UPD); 

		let upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame",5,100);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, upgradeClip, view._levelbtn, [-20, -110]);
		this.addChildToContainer(upgradeClip);
        upgradeClip.playWithTime(1);

		let upBg = BaseBitmap.create("battlelvup");
        this.addChildToContainer(upBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, upBg, this, [0, 0]);
        egret.Tween.get(upBg).to({y:upBg.y - 20},700).call(
            function(upBg:BaseBitmap){
                BaseBitmap.release(upBg);
                upBg = null;
            },
            this,
            [upBg]
        )
         
		let tmpthis = this;
		egret.Tween.get(this,{loop:false}).wait(500).call(function(){
			//字体刷新加个延时
			this.container.removeChild(upgradeClip);
			upgradeClip = null;
			let skinCfg =  Config.WifeskinCfg.getWifeCfgById(skinId);
			let lv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
			//解锁弹窗
			let idx = 0;

			if ( !view._arr || view._arr.length == 0 )
			{
				return;
			}

			for(let i in view._arr){
				let unit = view._arr[i];
				if(unit.level == lv){
					idx = Number(i);
					if(unit.type != ``){
						ViewController.getInstance().openView(ViewConst.POPUP.WIFECHATUNLOCKSUCVIEW, {
							skinId : skinId,
							level : unit.level,
							callback : ()=>{
								let item = <WifeSkinLevelItem>view._list.getItemByIndex(idx);
								if(item){
									item.showLevelEff(()=>{
										view.freshView();
										view._stopTouch = false;
									},view);
								}
							},
							handle : view,
						});
						break;
					}
					else{
						let item = <WifeSkinLevelItem>view._list.getItemByIndex(idx);
						if(item){
							item.showLevelEff(()=>{
								view.freshView();
								view._stopTouch = false;
							},view);
						}
					}
				}
			}
			
		});
	}

	private freshView():void{
		let view = this;
		let skinId = view.param.data.skinId;
		let skinCfg =  Config.WifeskinCfg.getWifeCfgById(skinId);
		let levelup = skinCfg.levelUp;

		let lv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
		// if(!lv){
		// 	lv = Math.max(1, Api.wifeSkinVoApi.getWifeSkinLV(skinId));
		// }
		//进度条显示
		let first = true;
		let skinLevel = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
		// for(let i in levelup){
		// 	let unit = levelup[i];
		// 	if(unit && unit.levelUpUnlock){
		// 		let tmp = String(unit.levelUpUnlock).split(`_`);
		// 		//剧情、配音、背景
		// 		let type = ``;
		// 		if(tmp.length == 1){
		// 			//背景
		// 			type = `scene`;
		// 		}
		// 		else{
		// 			let id = Number(tmp[1]);
		// 			if(id < 200){
		// 				//剧情
		// 				type = `avg`;
		// 			}
		// 			else if(id < 300){
		// 				//有开关
		// 				if(Api.switchVoApi.checkWifeSkinSoundOpen(skinId)){
		// 					//配音
		// 					type = `sound`;
		// 				}
		// 				else{
		// 					continue;
		// 				}
		// 			}
		// 		}
		// 		view._arr.push({
		// 			level : Number(i) + 1,
		// 			data : unit,
		// 			type : type,
		// 			skinId : skinId
		// 		});
		// 	}
		// 	else if(unit){
		// 		view._arr.push({
		// 			level : Number(i) + 1,
		// 			data : unit,
		// 			type : ``,
		// 			skinId : skinId
		// 		});
		// 	}
		// }
		view._list.refreshData(view._arr,view._curLevel);
		view._curLevelTxt.text = LanguageManager.getlocal(`zhenqifanglevel`, [skinLevel.toString()]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._curLevelTxt, view._topbg, [297 + (165 - view._curLevelTxt.width) / 2, 90 + (40 - view._curLevelTxt.height) / 2]);
		if(lv == levelup.length){
			view._costGroup.visible = false;
			view._levelbtn.setGray(true);
		}	
		else{
			view._costGroup.visible = true;
			view._levelbtn.setGray(false);
			//消耗材料
			let levelUpCost = levelup[lv].levelUpCost;
			if(levelUpCost && levelUpCost != ``){
				let rewardvo = GameData.formatRewardItem(levelUpCost);
				let itemicon = null;
				let unit = rewardvo[0];
				if(view._costGroup.getChildByName(`itemicon`)){
					itemicon = view._costGroup.getChildByName(`itemicon`);
					// let itemicon = <BaseDisplayObjectContainer>view._costGroup.getChildByName(`itemicon`);
					// itemicon.dispose();
					// itemicon
				}
				else{
					itemicon = GameData.getItemIcon(unit, true);
					itemicon.name = `itemicon`;
					itemicon.setScale(40 / 108);
					App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, view._costGroup, [73,0],true);
					view._costGroup.addChild(itemicon);
					if (PlatformManager.checkIsEnLang()){
						App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, view._costGroup, [100,0],true);
					}
					let numLb = itemicon.getChildByName("numLb");
					if (numLb) {
						numLb.visible = false;
					}
					if (itemicon.getChildByName("numbg"))
					{
						itemicon.getChildByName("numbg").visible = false;
					}
					if (itemicon.getChildByName("iconBg"))
					{
						itemicon.getChildByName("iconBg").visible = false;
					}
				}
				
				let have = Api.itemVoApi.getItemNumInfoVoById(unit.id);
				let need = unit.num;
				view._levelCostTxt.text = LanguageManager.getlocal(`wifeskinlvupcostnunm2`, [String(have >= need ? TextFieldConst.COLOR_WHITE : TextFieldConst.COLOR_WARN_RED), need.toString(), have.toString()]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._levelCostTxt, itemicon, [itemicon.width*itemicon.scaleX+2,0]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._costGroup, view._levelbtn, [0,-view._costGroup.height]);
			}
		}

	}


	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			`wifeskinlevelview`,`battlepassrewardlevelbg2-1`,`battlepassrewardlevelbg1-1`,`progress13`,`progress13_bg`,`skin_box_namebg`,`skin_detail_probg`,`battlelvup`,`arena_bottom`,
			`commonview_bigframe`
		]);
	}

	protected getRuleInfo(): string {
		return "wifeskin_description_wifeskinlevelup";
	}
	
	public dispose():void{
		let view = this;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFESKIN_UPGRADE), this.upgradeCallback, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFECHAT_RESET),this.freshView,this);
		view._arr.length = 0;
		view._costGroup = null;
		view._levelCostTxt = null;
		view._levelbtn = null;
		view._stopTouch = false;
		view._list = null;
		view._curLevelTxt = null;
		view._topbg = null;
		egret.Tween.removeTweens(this);
		super.dispose();
	}
}