/*
author : qinajun
date : 2018.4.14
desc : 励精图治 等级奖励
*/
class AcBattlePassViewTab1 extends AcCommonViewTab
{
	//滑动列表
	private _level : number = 0;
	private _scrollList:ScrollList = null; 
	private _specialReward : AcBattlePassViewTab1ScrollItem = null; 
	private _listBg : BaseBitmap = null;
	private _lqBtnGroup : BaseDisplayObjectContainer = null;
	private _topTip : BaseBitmap = null;
	private _bottomTip : BaseBitmap = null;
	private _tipTxt : BaseButton = null;
	private _tempRect:egret.Rectangle = null;

	public constructor() 
	{
		super();
		this.initView();
	}
    private get cfg() : Config.AcCfg.BattlePassCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcBattlePassVo{
        return <AcBattlePassVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcBattlePassView');
		let code = baseview.getUiCode();
		return code;
	}
    private getNewCode():string{
        if(this.vo.isNewUi())
        {
            return "8";
        }
        return this.getUiCode();
    }  	
	protected initView():void{	
		let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_GETLVRWD), view.rewardCallback, view);
		
		let baseview : any = ViewController.getInstance().getView('AcBattlePassView');
		let code = baseview.getUiCode();
		let newcode = baseview.getNewCode();
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;

		let listbg = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepassrewardbg`, code));
		listbg.height = view.height - 20;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listbg, view, [-2, 10]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop , listbg, view, [-3, 5]);
		// if(Number(this.code) >= 3){
		// 	listbg.x = -11;
		// }
		view.addChild(listbg);
		view._listBg = listbg;

		if(this.vo.isNewUi())
		{
			this.cfg.segmentation = 0;
			listbg.height = view.height - 95;

			let botbg = BaseBitmap.create(`battlepassbotbg-${this.getNewCode()}`);
			botbg.x = GameConfig.stageWidth/2 - botbg.width/2;
			botbg.y = listbg.y + listbg.height - 5;
			view.addChild(botbg);
		}

		if(!this.vo.isNewUi())
		{
			let levelbg = BaseBitmap.create(`acwealthcomingview_numbg`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelbg, listbg);
			view.addChild(levelbg);
			if(Number(this.code) >= 3){
				levelbg.x = 0;
			}
			let levelTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassRewardTxt`, code)), 20, TextFieldConst.COLOR_BLACK);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, levelTxt, levelbg);
			view.addChild(levelTxt);
		}

		let rect = {
			1 : {1 : {x : 90, width : 170, height : 85}, 2 : {x : 260, width : 355, height : 85}},
			2 : {1 : {x : 90, width : 175, height : 85}, 2 : {x : 265, width : 175, height : 85}, 3 : {x : 445, width : 175, height : 85}},
			3 : {1 : {x : 101, width : 170, height : 85}, 2 : {x : 273, width : 355, height : 85}},
		}
		//--unlockBP:解锁的战令。Primary-初级。Intermediate-中级。Advanced-高级
		let levelarr = [`primary`, `intermediate`, `advanced`];
		let curBattleLevel = view.vo.getMyBattleLevel();
		for(let i in levelarr){
			let unit = view.cfg.getBattleInfo(levelarr[i]);
			if(unit){
				let level = 1;
				switch(unit.unlockBP){
					case `primary`:
						level = 1;
						break;
					case `intermediate`:
						level = 2;
						break;
					case `advanced`:
						level = 3;
						break;
				}
				let tmp = null;
				if(!rect[code]){
					tmp = rect[3][level];
				}
				else{
					tmp = rect[code][level];
				}
				let paramX = tmp.x;

				let title = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepassrewardtitle${level}`, view.getNewCode()));
				title.setScale(0.8);
				title.name = `title${level}`;
				view.addChild(title);
				
				let lockGroup = new BaseDisplayObjectContainer();
				lockGroup.width = Number(code) == 2 ? (level == 2 ? 180 : 175) : 357;
				lockGroup.height = 80;
				lockGroup.name = `lockgroup${level}`
				view.addChild(lockGroup);
				lockGroup.visible = curBattleLevel < level;
				lockGroup.addTouchTap(()=>{
					if(!view.vo.isInActivity()){
						App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassExpiredUnlock`, view.getUiCode())));
						return;
					}
					if(Number(this.code) > 1){
						ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEPASSUNLOCKNEWREWWARDVIEW, {
							code : view.code,
							aid : view.aid
						});
					}
					else{
						ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEPASSUNLOCKREWWARDVIEW, {
							code : view.code,
							aid : view.aid
						});
					}
				}, view);

				let lockmask = BaseBitmap.create(`battlepassslockmask${Number(code) == 2 ? (level == 2 ? 2 : 1) : 1}`);
				lockmask.width = lockGroup.width;
				lockmask.height = lockGroup.height;
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, lockmask, lockGroup, [0,0], true);
				lockGroup.addChild(lockmask);

				let lock = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepasstoplock`, code));
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, lock, lockGroup, [Number(code) == 2 ? 20 : 50, 0], true);
				lockGroup.addChild(lock);

				if(lockGroup.visible){
					let shareEffect = ComponentManager.getCustomMovieClip("fenxiang_",15,1000/15);
					shareEffect.setScale(1.55);
					shareEffect.setPosition(lock.x + lock.width/2 - 59*shareEffect.scaleX/2, lock.y + lock.height/2 - 60*shareEffect.scaleY/2 - 2);
					lockGroup.addChild(shareEffect);
					shareEffect.playWithTime(0);
					shareEffect.name = `shareEffect${level}`;

					if(this.vo.isNewUi())
					{
						shareEffect.visible = false;
					}
				}

				let lockfnt = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepasslockfnt`, code));
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, lockfnt, lock, [0, -lockfnt.height/2+10]);
				lockGroup.addChild(lockfnt);

				if(lockGroup.visible)
				{
					if(this.vo.isNewUi())
					{
						lockmask.visible = false;
						lock.setScale(0.75);
						lockfnt.visible = false;
						App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, lock, lockGroup, [20, 0]);
						lock.y = 0;
					}
				}

				let flag = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepassrewardget`, code));
				flag.name = `flag${level}`;
				view.addChild(flag);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flag, listbg, [paramX, 0]);
				flag.visible = false;
				if(this.vo.isNewUi())
				{
					if(levelarr[i] == `primary`)
					{
						App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flag, listbg, [paramX-98, 0]);
					}else
					{
						App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flag, listbg, [paramX-88, 0]);
					}
				}

				let tmpX = paramX + (Number(i) == 0 ? ((tmp.width - title.width * title.scaleX) / 2) : (Number(code) == 2 ? 105 : 135));//paramX + ; 
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, title, listbg, [tmpX, (tmp.height - title.height * title.scaleY) / 2]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, lockGroup, listbg, [paramX + (Number(code) == 2 ? (level == 3 ? -3 : 0) : 0), Number(code) >= 3 ? 1 : 0]);
				if(!lockGroup.visible && Number(i) == 1){
					title.x = 368;
				}
				if(this.vo.isNewUi())
				{
					title.setScale(1);
					if(Number(i) == 0)
					{
						title.setPosition(20,0);
					}else if(Number(i) == 1)
					{
						title.setPosition(350,0);
					}
				}
			}
		}
		//解锁高级政令
		let btngroup = new BaseDisplayObjectContainer();
		view.addChild(btngroup);
		view._lqBtnGroup = btngroup;

		let btnstr = this.vo.isNewUi() ? `battlepassbuybtn-${newcode}` : App.CommonUtil.getResByCode(`battlepasslock`, code);
		let btn = ComponentManager.getButton(btnstr, ``, ()=>{
			if(!view.vo.isInActivity()){
				App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassExpiredUnlock`, view.getUiCode())));
				return;
			}
			if(Number(this.code) == 1){
				ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEPASSUNLOCKREWWARDVIEW, {
					code : view.code,
					aid : view.aid
				});
			}
			else{
				ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEPASSUNLOCKNEWREWWARDVIEW, {
					code : view.code,
					aid : view.aid
				});
			}
			
		}, view);
		btngroup.addChild(btn);
		btn.name = `btn`;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btngroup, listbg, [0, listbg.height + 25]);
		if(this.vo.isNewUi())
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btngroup, listbg, [0, listbg.height + 115]);
		}

		btn.visible = view.vo.getMyBattleLevel() < 2;
		if(Number(this.code) >= 3){
			if(Number(this.code) == 4 || Number(this.code) == 7){
				btn.y = 4;
				btn.visible = true;
			}

			if(this.vo.isNewUi())
			{
				let eff1 = ComponentManager.getCustomMovieClip(`threekingdomsentereff`, 10);
				eff1.width = 285;
				eff1.height = 85;
				btngroup.addChild(eff1);
				eff1.playWithTime(-1);
				eff1.blendMode = egret.BlendMode.ADD;
				eff1.setPosition(btn.x,btn.y);
				// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eff1, btn);
			}else
			{
				let txt = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepasslocktxt`, code));
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt, btn, [0,29]);
				btngroup.addChild(txt);
				txt.name = `locktxt`;
				if (Number(this.code) == 4 || Number(this.code) == 7){
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt, btn, [0,26]);
				}

				let framenum = 0;
				let effname = `acbattlepasslockeff${Number(this.getUiCode()) !=  4 ? 3 : this.getUiCode()}`
				let bitmap = BaseBitmap.create(`${effname}1`);
				let eff1 = ComponentManager.getCustomMovieClip(effname, framenum);
				eff1.width = bitmap.width;
				eff1.height = bitmap.height;
				eff1.playWithTime(-1);
				btngroup.addChild(eff1);
				eff1.blendMode = egret.BlendMode.ADD;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eff1, btn);
			}
		}

		let tiptxtstr = this.vo.isNewUi() ? `battlepassbuybtn2-${newcode}` : `battlepassreward`;
		let tipTxt = ComponentManager.getButton(tiptxtstr, ``, ()=>{
			if(Number(this.code) == 1){
				ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEPASSUNLOCKREWWARDVIEW, {
					code : view.code,
					aid : view.aid
				});
			}
			else{
				ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEPASSUNLOCKNEWREWWARDVIEW, {
					code : view.code,
					aid : view.aid
				});
			}
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, listbg, [0, listbg.height + 25]);
		view.addChild(tipTxt);
		view._tipTxt = tipTxt;
		tipTxt.visible = !view._lqBtnGroup.visible;
		if(this.vo.isNewUi())
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, listbg, [0,listbg.height+115]);
		}		

 		let tmpRect =  new egret.Rectangle(0,0,618,listbg.height - 195);
		if(this.vo.isNewUi())
		{
			tmpRect.height = listbg.height - 80;
		}
		this._tempRect = tmpRect;
		let scrollList = ComponentManager.getScrollList(AcBattlePassViewTab1ScrollItem, [], tmpRect, view.code);
		view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0,90]);
		if(this.vo.isNewUi())
		{
			view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0,70]);
		}
		view.addChild(scrollList); 
		scrollList.bindMoveCompleteCallback(()=>{
			let level = Math.ceil(scrollList.scrollTop / 90 + ((tmpRect.height) / 90));
			view.freshBottomSpecialReward(level);
			//当前滑动到的等级
			let toplevel = Math.ceil(scrollList.scrollTop / 90);

			let have = false;
			for(let i = 1; i < toplevel; ++ i){
				if(i <= view.vo.getLevel() && i == (view.vo.getHaveGetLevel() + 1) && !view.vo.getLevelReward(i)){
					have = true;
					break;
				}
			}
			view._topTip.visible = have;
			

			have = false;
			for(let i = (level + 1); i <= view.cfg.maxlevel; ++ i){
				if(i <= view.vo.getLevel() && i == (view.vo.getHaveGetLevel() + 1) && !view.vo.getLevelReward(i)){
					have = true;
					break;
				}
			}
			view._bottomTip.visible = have;
		}, view);

		let listmask = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepassscrollmask`,  code));
		listmask.width = listbg.width;
		listmask.height = listbg.height - 185;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listmask, listbg, [0,90]);
		view.addChild(listmask);
		if(Number(this.code) >= 3){
			listmask.x = 0;
		}
		if(this.vo.isNewUi())
		{
			listmask.visible = false;
		}

		//当前等级最接近的特殊奖励展示
		let recentSpecialRewardInfo = view.cfg.getRecentSpecialReward(view.vo.getLevel());
		let specialReward : AcBattlePassViewTab1ScrollItem = new AcBattlePassViewTab1ScrollItem();
		specialReward.initSpecialReward(recentSpecialRewardInfo, view.code);
		view._specialReward = specialReward;
		view.addChild(specialReward);
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, specialReward, listbg, [0,5]);
		if(this.vo.isNewUi())
		{
			view.setLayoutPosition(LayoutConst.horizontalCenterbottom, specialReward, listbg, [0,-95]);
		}
		
		let topTip = BaseBitmap.create(`battlepasstoptip`);
		view._topTip = topTip;
		topTip.visible = false;

		let bottomTip = BaseBitmap.create(`battlepasstip`);
		view._bottomTip = bottomTip;
		bottomTip.visible = false;

		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, topTip, listbg, [0,90]);
		view.addChild(topTip);

		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, bottomTip, listbg, [0,90]);
		view.addChild(bottomTip);

		if(this.vo.isNewUi())
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, topTip, listbg, [150,5]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, bottomTip, listbg, [150,5]);
		}

		view.update(true);	
		
		// let vo = this.vo;
		
	}

	private update(init?):void
	{
		let view = this;
		if(!view.vo){
			return;
		}
		let code = view.uiCode;
		let objList = view.cfg.getBattlePassReward();
		let arr = view.updateArr(objList);
		view._scrollList.refreshData(arr, view.code);
		//解锁状况
		let levelarr = [`primary`, `intermediate`, `advanced`];
		let battleLevel = view.vo.getMyBattleLevel();

		let rect = {
			1 : {1 : {x : 90, width : 170, height : 85}, 2 : {x : 260, width : 355, height : 85}},
			2 : {1 : {x : 90, width : 175, height : 85}, 2 : {x : 265, width : 175, height : 85}, 3 : {x : 445, width : 175, height : 85}},
			3 : {1 : {x : 96, width : 170, height : 85}, 2 : {x : 260, width : 355, height : 85}},
		}
		for(let i = 1; i <= battleLevel; ++ i){
			let tmp = null;
			if(!rect[code]){
				tmp = rect[3][i];
			}
			else{
				tmp = rect[code][i];
			}
			let paramX = tmp.x;
			//领取标记
			let flag = view.getChildByName(`flag${i}`);
			if(flag){
				flag.visible = view.vo.checkRedPoint1;
			}
			let lockgroup = <BaseDisplayObjectContainer>view.getChildByName(`lockgroup${i}`);
			let title = <BaseBitmap>view.getChildByName(`title${i}`);
			let shareEffect = <CustomMovieClip>view.getChildByName(`shareEffect${i}`);
			if(title && lockgroup && lockgroup.visible){
				lockgroup.visible = false;
				title.setRes(App.CommonUtil.getResByCode(`battlepassrewardtitle${i}`, view.getNewCode()));
	
				if(i == 2){
					title.x = 368;
				}
				if(this.vo.isNewUi())
				{
					title.setScale(1);
					if(Number(i) == 1)
					{
						title.setPosition(20,0);
					}else if(Number(i) == 2)
					{
						title.setPosition(350,0);
					}
				}
				if(shareEffect){
					shareEffect.dispose();
					shareEffect = null;
				}
			}
		}

		let level = Math.ceil(view._scrollList.scrollTop / 90 + ((this._tempRect.height) / 90));
		let toplevel = Math.ceil(view._scrollList.scrollTop / 90);

		if(init){
			toplevel = view.vo.getHaveGetLevel() + 1;
			level = Math.ceil(toplevel + (this._tempRect.height) / 90);
		}
		let have = false;
		for(let i = 1; i < toplevel; ++ i){
			if(i <= view.vo.getLevel() && i == (view.vo.getHaveGetLevel() + 1) && !view.vo.getLevelReward(i)){
				have = true;
				break;
			}
		}
		view._topTip.visible = have;
		

		have = false;
		for(let i = (level + 1); i <= view.cfg.maxlevel; ++ i){
			if(i <= view.vo.getLevel() && i == (view.vo.getHaveGetLevel() + 1) && !view.vo.getLevelReward(i)){
				have = true;
				break;
			}
		}
		view._bottomTip.visible = have;
		
		// //当前等级最接近的特殊奖励展示
		// if(view._topTip.visible || view._bottomTip.visible){
		// 	level = view.vo.getHaveGetLevel() + 1;
		// 	view._topTip.visible = view._bottomTip.visible = false;
		// }
		view.freshBottomSpecialReward(toplevel);
		view._scrollList.setScrollTopByIndex(Math.max(0,toplevel - 1));

		view._lqBtnGroup.visible = view.vo.getMyBattleLevel() < 2;
		view._tipTxt.visible = !view._lqBtnGroup.visible;
		if(Number(this.code) == 4 || Number(this.code) == 7){
			view._tipTxt.visible = false;
			view._lqBtnGroup.visible = true;
			let txtimg = <BaseBitmap>view._lqBtnGroup.getChildByName(`locktxt`);
			if(view.vo.getMyBattleLevel() >= 2){
				txtimg.setRes(`battlepasslocktxt2-4`);
			}
		}
	}

	//底部特殊奖励展示
	private freshBottomSpecialReward(level : number) : void{
		let view = this;
		let recentSpecialRewardInfo = view.cfg.getRecentSpecialReward(level);
		view._specialReward.freshSpecialReward(recentSpecialRewardInfo, view.code);
	}

	private updateArr(arr):any[]{
		let view = this;
		let vo = view.vo; 
		let tmp = [];
		if(!vo)
		{
			return tmp;
		}
		/** 
		 *  --expNeed:升级需要经验
        --specialGift:特殊档位标识。1
        --primary:普通政令奖励
        --intermediate:黄金政令奖励
        --advanced:传世政令奖励
		*/
		for(let i in arr){
			let unit = arr[i];
			tmp.push({
				expNeed : unit.expNeed,
				specialGift : unit.specialGift,
				primary : unit.primary,
				intermediate : unit.intermediate,
				advanced : unit.advanced,
				level : Number(i) + 1,
				special1 : unit.special1,
				special2 : unit.special2,
				special3 : unit.special3,
			});
		}
		return tmp;
		// let arr1=[];
		// let arr2=[];
		// let arr3=[];
		// for(var i:number= 0;i<arr.length; i++){
		// 	let questType = arr[i].questType;
		// 	let taskNum = vo.getTaskValue(questType); 
		// 	if(vo.isGetTaskReward(questType)){
		// 		arr1.push(arr[i]);
		// 	}
		// 	else{
		// 		if(taskNum>=arr[i].value)
		// 		{
		// 			arr2.push(arr[i]);
		// 		}
		// 		else
		// 		{
		// 			arr3.push(arr[i]);
		// 		} 
		// 	}
		// }
		// return arr2.concat(arr3).concat(arr1); 
	}

	private rewardCallback(evt : egret.Event) : void{
		let view = this;
		if(evt.data.ret){
			let data = evt.data.data.data;
			let rewardStr = '';
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
			if(data.special){
				rewardStr = "1009_0_" + data.special + "_" + view.code;
			}
			if(data && data.rewards){
				let rewards = data.rewards;
				if(data.special){
					rewardStr += `|${rewards}`;
				}
				else{
					rewardStr = rewards;
				}
				if(data.replacerewards)
				{
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: data.replacerewards});
				}

				let item :  AcBattlePassViewTab1ScrollItem = <AcBattlePassViewTab1ScrollItem>view._scrollList.getItemByIndex(view.vo.selIdx);
				if(item){
					item.refreshItem();
				}
				let nextitem :  AcBattlePassViewTab1ScrollItem = <AcBattlePassViewTab1ScrollItem>view._scrollList.getItemByIndex(view.vo.selIdx + 1);
				if(nextitem){
					nextitem.refreshItem();
				}
				view.vo.selIdx = -1;
			}
			if(rewardStr != ''){
				let rewardList =  GameData.formatRewardItem(rewardStr);
				App.CommonUtil.playRewardFlyAction(rewardList);
			}
			view.freshBottomSpecialReward(view.vo.getHaveGetLevel());
		}
	}

	public dispose():void{	
		let view = this;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_GETLVRWD), view.rewardCallback, view);
		view._specialReward = null;
		view._scrollList = null;
		view._level = 0;
		view._listBg = null;
		view._lqBtnGroup.dispose();
		view._lqBtnGroup = null;
		view._tipTxt = null;
		view._tempRect = null;
		super.dispose();
	}
}