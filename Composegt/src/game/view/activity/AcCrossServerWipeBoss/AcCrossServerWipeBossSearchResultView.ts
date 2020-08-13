/**
 * author:qianjun
 * desc:围剿鳌拜探索结果界面
*/
class AcCrossServerWipeBossSearchResultView extends CommonView
{
	private _midGroup : BaseDisplayObjectContainer = null;
	private _keyText : BaseTextField = null;
	private _btn : BaseButton = null;
	public constructor(){
		super();
	}

	private get api() : CrossServerWipeBossVoApi{
        return Api.crossServerWipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerWipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerWipeBossVo{
        return <AcCrossServerWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected getResourceList():string[]{
		return super.getResourceList().concat([
			"guide_createuserbg","story_npc_3","skin_lvup_light","servant_attributemap",
			`crossserverwipeboss${this.param.data.foeId}`,
			"accrossserverwipeboss_box1",
			"accrossserverwipeboss_box2",
			"accrossserverwipeboss_box3",
			//"aobaibg1","aobaibg2","aobaibg3","aobaibg4"
		]);
	}

	protected isShowMask():boolean{
		return true;
	}

	protected initTitle() : void{
		return null;
	}

	protected getBgName():string{
		// return `guide_createuserbg`;
		return "accrossserverwipeboss_bg2";
	}

	protected getCloseBtnName():string{
		return null;
	}

	


	protected initBg():void{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseLoadBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = 0;//(GameConfig.stageHeigth - 1136);
		}
	}

	protected getTitleStr():string{
		return null;
	}

	public initView():void{	
		let view = this;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH,view.update,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_ATTACK),view.attackCallback,view);
		let data = view.param.data;
		let resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);

		let maskBmp = BaseBitmap.create("public_9_viewmask");
		maskBmp.width=GameConfig.stageWidth;
		maskBmp.height=GameConfig.stageHeigth;
		maskBmp.touchEnabled = false;
		view.addChild(maskBmp);

		let infoGroup = new BaseDisplayObjectContainer();
		infoGroup.width = GameConfig.stageWidth;
		view.addChild(infoGroup);
		view._midGroup = infoGroup;

		let res = '';
		let name = '';
		let boxId = resultInfo.id - 7;
		//Npc 宝箱
		if(resultInfo.type == 1){
			res = resultInfo.npcPic;
			name = resultInfo.npcName
		}
		else{
			res = `accrossserverwipeboss_box${boxId}`;
			name = LanguageManager.getlocal(`accrossserverwipeBossKillBox${boxId}`);
		}

		let Img = BaseBitmap.create(res);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, Img, infoGroup, [0,0], true);
		infoGroup.addChild(Img);

		//NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYPOWER, {});
		let descbg = BaseBitmap.create('public_9_wordbg');
		descbg.width = GameConfig.stageWidth;
		descbg.height = 222;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, Img, [0,Img.height + (resultInfo.type == 1 ? 0 : 60)]);
		infoGroup.addChild(descbg);
		
		let midTxt = ComponentManager.getTextField(LanguageManager.getlocal(`accrossserverwipeBossSearchTip${resultInfo.type}`, [name]), 22);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midTxt, descbg, [0,40]);
		infoGroup.addChild(midTxt);

		//按钮
		let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, 'accrossserverwipeBossSearchCancel', view.hide, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, cancelBtn, descbg, [100,55]);
		infoGroup.addChild(cancelBtn);

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, resultInfo.type == 1 ? 'sysConfirm' : 'accrossserverwipeBossSearchOpen', view.confirmClick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, confirmBtn, descbg, [100,55]);
		infoGroup.addChild(confirmBtn);
		view._btn = confirmBtn;

		// let moreBtn = ComponentManager.getButton('arena_more', '', view.moreClick, view);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, moreBtn, descbg, [25,15]);
		// view.addChild(moreBtn);
		if(resultInfo.type == 2){
			let skin_lvup_light:BaseBitmap = BaseBitmap.create("skin_lvup_light");
			skin_lvup_light.scaleX = 1.2;
			skin_lvup_light.scaleY = 4;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skin_lvup_light, Img, [-10,0]);
			infoGroup.addChild(skin_lvup_light);
			infoGroup.swapChildren(Img,skin_lvup_light);

			let keynum = view.vo.getWipeBossBoxKeyNum(resultInfo.id);
			let keyTxt = ComponentManager.getTextField(`${LanguageManager.getlocal(`accrossserverwipeBossKillKey${boxId}`)}${keynum}/1`, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
			keyTxt.textColor =  keynum > 0 ? TextFieldConst.COLOR_WARN_GREEN2 : 0xff3c3c;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, keyTxt, confirmBtn, [0,confirmBtn.height + 15]);
			infoGroup.addChild(keyTxt);
			view._keyText = keyTxt;
		}
		else{
			// if(PlatformManager.checkIsTextHorizontal())
			// {
				let nameBg = BaseBitmap.create("servant_attributemap");
				nameBg.setPosition(descbg.x + descbg.width / 2 - nameBg.width / 2,descbg.y - nameBg.height);
				infoGroup.addChild(nameBg);
				

				let nameTxt = ComponentManager.getTextField(name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
				nameTxt.setPosition(nameBg.x + nameBg.width / 2 - nameTxt.width / 2,nameBg.y + nameBg.height / 2 - nameTxt.height / 2)
				infoGroup.addChild(nameTxt);
			// }
			// else
			// {
			// 	let namebg = BaseBitmap.create("aobainamebg");
			// 	App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, namebg, infoGroup, [55,0], true);
			// 	infoGroup.addChild(namebg);

			// 	let nameTxt = ComponentManager.getTextField(name, 22);
			// 	nameTxt.width = 22;
			// 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
			// 	infoGroup.addChild(nameTxt);
			// }	
			
		}

		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, infoGroup, view);
	}

	private attackCallback(evt : egret.Event):void{
		let view = this;
		let data = view.param.data;
		if(evt.data.data.ret < 0){
			App.CommonUtil.showTip(evt.data.data.ret);
			return;
		}
		if(evt.data.data.data.hasKill){
			App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossSearchTip4"));
		}
		else{
			let resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);
			if(resultInfo.type == 2){
				ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIPEBOSSGETREWARDVIEW,{
					aid : view.param.data.aid,
					code : view.param.data.code,
					reward :evt.data.data.data.rewards
				});
			}
		}

		view.hide();
	}

	private confirmClick():void{
		let view = this;
		let data = view.param.data;
		let resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);


		if(!this.vo.isInFightTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossMidDesc6"));
			return;
		}
		if(!this.vo.isInTansuoTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
			return;
		}


		if(resultInfo.type == 1){
			//前往战斗
			ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIPEBOSSBATTLEVIEW,{
				aid : view.param.data.aid,
				code : view.param.data.code,
				foeId : view.param.data.foeId,
				bosskey : view.param.data.bosskey
			});
			view.hide();
		}
		else{
			//开启宝箱
			let curNum = view.vo.getWipeBossBoxKeyNum(resultInfo.id)
			if(curNum){

				if(this.vo.getCountDownTime() <= 0){
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
					return;
				}

				NetManager.request(NetRequestConst.REQUEST_WIPEBOSS_ATTACK, {
					activeId : view.vo.aidAndCode,
					bosstype : view.param.data.foeId,
					bosskey : view.param.data.bosskey
				});
			}
			else{
				view.moreClick();
				// ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSSHOPVIEW,{
				// 	aid : view.param.data.aid,
				// 	code : view.param.data.code,
				// });
				// App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossSearchTip3"));
			}
		}
	}

	private moreClick():void{
		let view = this;
		let data = view.param.data;
		let resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);
		let keysInfo = view.vo.getArr('actMarket');
		//let icon = GameData.getItemIcon(rewardItemVo,true);
		let goods = keysInfo[resultInfo.id - 7].goods;
		let contentList:Array<RewardItemVo> = GameData.formatRewardItem(goods);//shopItemCfg.contentList;
		let rewardItemVo = contentList[0];
		//展示信息
		let needGem = keysInfo[resultInfo.id - 7].needGem;
		let message:string = LanguageManager.getlocal("shopBuyUseGem",[needGem.toString(),rewardItemVo.name]);
		//玩家所持有的元宝数
		let playerGem = Api.playerVoApi.getPlayerGem();
		ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW,{
			goods:goods,						//物品价格
			confirmCallback:()=>{
				let vo = this.vo; 
				if(!vo)
				{
					return;
				}
				if(Api.playerVoApi.getPlayerLevel() < this.cfg.needLv){
					App.CommonUtil.showTip(LanguageManager.getlocal(`accrossserverwipeBossOpenTip`, [Api.playerVoApi.getPlayerOfficeByLevel(this.cfg.needLv)]));
					return;
				}
				if(this.vo.et < GameData.serverTime){
					App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
					return;
				}
				if(!this.vo.isInTansuoTime()){
					App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
					return;
				}

				if(Api.playerVoApi.getPlayerGem() < needGem){
					App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
					return;
				}
				NetManager.request(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY, {
					activeId : view.vo.aidAndCode,
					num : 1,
					goods : resultInfo.id - 6,
					stype : 'a'
				});	
			},	//确认回调函数
			handler: this,									//target
			num: playerGem,									//玩家元宝数
			msg: message,									//显示消息
			id:1											//消耗物品id  1->元宝
		});	

		// ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSKILLINFOIEW,{
		// 	aid : view.param.data.aid,
		// 	code : view.param.data.code
		// });
	}

	private update():void{
		let view = this;
		let data = view.param.data;
		let resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);
		if(resultInfo.type == 2){
			let keynum = view.vo.getWipeBossBoxKeyNum(resultInfo.id);
			let boxId = resultInfo.id - 7;
			view._keyText.text = `${LanguageManager.getlocal(`accrossserverwipeBossKillKey${boxId}`)}${keynum}/1`;
			view._keyText.textColor =  keynum > 0 ? TextFieldConst.COLOR_WARN_GREEN2 : 0xff3c3c;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._keyText, view._btn, [0,view._btn.height + 15]);
		}
	}

	public dispose():void{
		let view = this;
		view._keyText = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH,view.update,view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_ATTACK),view.attackCallback,view);
		view._midGroup = null;
		view._btn = null;
		super.dispose();
	}
}