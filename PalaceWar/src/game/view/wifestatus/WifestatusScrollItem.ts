/**
 * 册封Item
 * author dky
 * date 2018/4/24
 * @class WifestatusScrollItem
 */
class WifestatusScrollItem extends ScrollListItem
{
	// //册封标题
	// private _achNameTF:BaseTextField;

	//册封完成度
	private _achProTF:BaseTextField;

	//册封背景图片
	private _bgBB:BaseBitmap;
	//册封背景图片2
	private _bgBB2:BaseBitmap;

	private _lock1:BaseBitmap;

	private _lock2:BaseBitmap;

	private _titleBB:BaseLoadBitmap 
	//册封标题
	private _getBtn:BaseButton;
	// 状态图片
	private _stateIcon:BaseBitmap;

	public itemListType: boolean = false;
	public touchNum: number = 0;
	private _data:any;
	
	public constructor() 
	{
		super();
	}

	public initItem(index: number, data: any):void
	{
		this.width = 616;
		// this.height = 200 + this.getSpaceY();

		let wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();

		this._data = data;
		let id = data.id;

		let bgImg = "wifestatus_itembg2";
		if(Number(id) <= Number(wifestatusVo.level) || id=="2")
		{
			bgImg = "wifestatus_itembg";
			// this.showIcons(index,data);
		}
		else{
			// this.showUnlock(index,data);
		}

		this._bgBB = BaseBitmap.create(bgImg);
		// this._bgBB.width = this.width;
		this._bgBB.height = 162; 
		this.addChild(this._bgBB);

		//解锁动画
		if(data.id == WifestatusView.unlockLevel)
		{
			this._bgBB2 = BaseBitmap.create("wifestatus_itembg3");
			this._bgBB2.height = 135; 
			this.addChild(this._bgBB2);

			this._lock1 = BaseBitmap.create("wifestatus_locked");
			this._lock1.x = 478
			this.addChild(this._lock1);

			this._lock2 = BaseBitmap.create("wifestatus_locked");
			this._lock2.skewY = 180;
			this._lock2.x = 140;
			this.addChild(this._lock2);
		}

		// if (this.itemListType|| index < 3) {
		// 	if(WifestatusView.currNum ==index || index < 3)
		// 	{
		// 		this.touchNum+=1;
		// 		this.showDes(index,data);
				
		// 	}
		// }
		// else {
		// 	// this.closeDes();
		// 	this._bgBB.height = 130;
		// }
		let res = `wifestatus_title${id}${Api.switchVoApi.checkIsInBlueWife()?`_male`:``}`;
		this._titleBB = BaseLoadBitmap.create(res);
		this._titleBB.width = 131;
		this._titleBB.height = 52;
		this._titleBB.x = this._bgBB.width/2 - this._titleBB.width/2;
		this._titleBB.y = this._bgBB.y -2;
		this.addChild(this._titleBB);

		if(Number(id) <= Number(wifestatusVo.level) || id=="2")
		{
			this.showIcons(index,data);
		}
		else{
			this.showUnlock(index,data);
			App.DisplayUtil.changeToGray(this._titleBB);
		}

		if(data.id == WifestatusView.unlockLevel)
		{
			App.DisplayUtil.changeToGray(this._titleBB);
		}
		let line1 = BaseBitmap.create("public_line3");
		line1.width = this.width - 150;
		line1.x = this.width/2 - line1.width/2;
		line1.y = 60;
		this.addChild(line1);

		let numStr = LanguageManager.getlocal("wifeStatusCurWifeNum") + Api.wifestatusVoApi.getWifesNumByLevel(data.id) + "/" + data.maxNum;;
		if(data.id == "1"){
			numStr = LanguageManager.getlocal("wifeStatusCurWifeNum") + Api.wifestatusVoApi.getNoStatusWife().length;
		}
		let numTF = ComponentManager.getTextField(numStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		numTF.textColor = TextFieldConst.COLOR_BLACK;
		numTF.x = this.width/2 - numTF.width/2;
		numTF.y = 60;
		this.addChild(numTF); 

		if(data.id == "1")
		{
			let rewardTitleTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusReward") + ": " + LanguageManager.getlocal("nothing"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			rewardTitleTF.textColor = TextFieldConst.COLOR_BLACK;	
			rewardTitleTF.x = this.width/2 - rewardTitleTF.width/2;
			rewardTitleTF.y = this.height - 37;
			this.addChild(rewardTitleTF);
		}
		else{
			let unluckTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusNeed"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			unluckTF.textColor = TextFieldConst.COLOR_BLACK;
			unluckTF.x = 18;
			unluckTF.y = this.height - 37;
			this.addChild(unluckTF); 

			let intimacyIcon:BaseBitmap = BaseBitmap.create("wifeview_vigoricon");
			intimacyIcon.x = unluckTF.x + unluckTF.width + 5;
			intimacyIcon.y = unluckTF.y-3;
			intimacyIcon.setScale(0.67);
			this.addChild(intimacyIcon);

			let intimacyTF = ComponentManager.getTextField(data.needIntimacy,TextFieldConst.FONTSIZE_CONTENT_COMMON);
			intimacyTF.textColor = TextFieldConst.COLOR_BLACK;		
			intimacyTF.x = intimacyIcon.x + intimacyIcon.width*0.67 + 5;
			intimacyTF.y = unluckTF.y;
			this.addChild(intimacyTF);

			let meiliIcon:BaseBitmap = BaseBitmap.create("wifeview_charmicon");
			meiliIcon.x = intimacyTF.x + intimacyTF.width + 5;
			meiliIcon.y = intimacyIcon.y;
			meiliIcon.setScale(0.67)
			this.addChild(meiliIcon);

			let glamourTF = ComponentManager.getTextField(data.needGlamour,TextFieldConst.FONTSIZE_CONTENT_COMMON);
			glamourTF.textColor = TextFieldConst.COLOR_BLACK;	
			glamourTF.x = meiliIcon.x + meiliIcon.width*0.67 + 5;
			glamourTF.y = unluckTF.y;
			this.addChild(glamourTF);

			let rewardTitleTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusReward"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			rewardTitleTF.textColor = TextFieldConst.COLOR_BLACK;	
			rewardTitleTF.x = this.width - rewardTitleTF.width - 85;
			rewardTitleTF.y = unluckTF.y;
			this.addChild(rewardTitleTF);

			let add1Icon:BaseBitmap=BaseBitmap.create("wifestatus_icon");
			add1Icon.x = rewardTitleTF.x + rewardTitleTF.width + 5;
			add1Icon.setScale(0.67);
			add1Icon.y = rewardTitleTF.y - 3;
			this.addChild(add1Icon);

			let rewardTF = ComponentManager.getTextField(data.getStar,TextFieldConst.FONTSIZE_CONTENT_COMMON);
			rewardTF.textColor = TextFieldConst.COLOR_BLACK;	
			rewardTF.x = add1Icon.x + add1Icon.width*0.67 + 5;
			rewardTF.y = unluckTF.y;
			this.addChild(rewardTF);
		}
		

		

		// this.cacheAsBitmap=true;
	}

	private showUnlock(index: number, data: any)
	{
		let container = new BaseDisplayObjectContainer()
		this._bgBB.height = 180;
		let lock1TF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusUnlock1"),TextFieldConst.FONTSIZE_TITLE_SMALL);
		lock1TF.textColor = TextFieldConst.COLOR_WARN_RED2;
		lock1TF.x = 0;
		container.addChild(lock1TF)
		let add1Icon:BaseBitmap=BaseBitmap.create("wifestatus_icon");
        add1Icon.x = lock1TF.x + lock1TF.width + 3;
		add1Icon.y = 0;
		container.addChild(add1Icon);

		lock1TF.y = container.height/2 - lock1TF.height/2;

		let lock2TF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusUnlock2",[data.needStar]),TextFieldConst.FONTSIZE_TITLE_SMALL);
		lock2TF.textColor = TextFieldConst.COLOR_WARN_RED2;
		lock2TF.x = add1Icon.x + add1Icon.width + 3;
		lock2TF.y = lock1TF.y;
		container.addChild(lock2TF); 
		this.addChild(container);
		container.x = this.width/2 - container.width/2;
		container.y =95;
		
	}
	private showIcons(index: number, data: any)
	{
		let itemBB  = BaseBitmap.create("wifestatus_itembg_9");
		itemBB.width = this.width-30;
		itemBB.height = 130; 
		itemBB.x = 15+4;
		itemBB.y = 88;
		this.addChild(itemBB);
		let wifeIconBaseWidth = 132;
		let statusContanier = new BaseDisplayObjectContainer()
		let wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
		for (var index = 0; index < Api.wifestatusVoApi.getWifesNumByLevel(data.id); index++) {
			let wifeId = Api.wifestatusVoApi.getWifestatusVo().info[data.id][index];
			let wifeIcon = this.getWifestatusIcon(data,wifeId);
			// wifeIcon.setScale(0.6)
			wifeIcon.x = (wifeIconBaseWidth + 20) *index;
			var num= index%4;
			wifeIcon.x = 10*(num + 1) + wifeIconBaseWidth * num - 10;
			wifeIcon.y = (wifeIcon.height + 5)*(Math.floor((index)/4)) ;
			statusContanier.addChild(wifeIcon);

			if (Api.switchVoApi.checkOpenBanish() && Api.wifebanishVoApi.getIsWifeBanishing(wifeId))
			{
				let banishContainer = new BaseDisplayObjectContainer();
				banishContainer.setPosition(wifeIcon.x+15,wifeIcon.y+20);
				statusContanier.addChild(banishContainer);
				let banishingbg:BaseBitmap = BaseBitmap.create("public_9_bg60");
				banishingbg.y= 64;
				banishingbg.height = 24;
				banishingbg.width = 50;
				banishContainer.addChild(banishingbg);

				let banishingbg2:BaseBitmap = BaseBitmap.create("public_9_bg60");
				banishingbg2.y= 64;
				banishingbg2.height = 24;
				banishingbg2.width = 50;
				banishingbg2.scaleX = -1;
				banishingbg2.x = banishingbg.width+banishingbg2.width;
				banishContainer.addChild(banishingbg2);

				// let banishingText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("banishing")  ,TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
				// banishingText.setColor(TextFieldConst.COLOR_WARN_GREEN3);
				// banishingText.setPosition(banishingbg.width-banishingText.width/2,64);
				// banishContainer.addChild(banishingText);

				let banishingText:BaseBitmap = BaseBitmap.create("wife_banishing_text");
				banishingText.setPosition(banishingbg.width-banishingText.width/2,64);
				banishContainer.addChild(banishingText);

				let banishInfo:WifeBanishInfoVo = Api.wifebanishVoApi.getBanishInfoVoByWife(wifeId);
				if ( banishInfo  && banishInfo.et >= GameData.serverTime)
				{
					egret.Tween.get(banishContainer).wait((banishInfo.et - GameData.serverTime)*1000).call(function () {
						banishContainer.dispose();
					});
				} 
			}

		}

		if(data.id == "1"){
			for (var index = 0; index < Api.wifestatusVoApi.getNoStatusWife().length; index++) {
				let element =  Api.wifestatusVoApi.getNoStatusWife()[index];
				let wifeIcon = this.getWifestatusIcon(data,element);
				// wifeIcon.setScale(0.6)
				wifeIcon.x = (wifeIconBaseWidth + 20) *index;
			
				var num= index%4;
				wifeIcon.x = 10*(num + 1) + wifeIconBaseWidth * num - 10;
				wifeIcon.y = (wifeIcon.height + 5)*(Math.floor((index)/4)) ;
				statusContanier.addChild(wifeIcon);

				if (Api.switchVoApi.checkOpenBanish() && Api.wifebanishVoApi.getIsWifeBanishing(element))
				{
					let banishContainer = new BaseDisplayObjectContainer();
					banishContainer.setPosition(wifeIcon.x+15,wifeIcon.y+20);
					statusContanier.addChild(banishContainer);
					let banishingbg:BaseBitmap = BaseBitmap.create("public_9_bg60");
					banishingbg.y= 64;
					banishingbg.height = 22;
					banishingbg.width = 50;
					banishContainer.addChild(banishingbg);

					let banishingbg2:BaseBitmap = BaseBitmap.create("public_9_bg60");
					banishingbg2.y= 64;
					banishingbg2.height = 22;
					banishingbg2.width = 50;
					banishingbg2.scaleX = -1;
					banishingbg2.x = banishingbg.width+banishingbg2.width;
					banishContainer.addChild(banishingbg2);

					// let banishingText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("banishing")  ,TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
					// banishingText.setColor(TextFieldConst.COLOR_WARN_GREEN3);
					// banishingText.setPosition(banishingbg.width-banishingText.width/2,64);
					// banishContainer.addChild(banishingText);

					let banishingText:BaseBitmap = BaseBitmap.create("wife_banishing_text");
					banishingText.setPosition(banishingbg.width-banishingText.width/2,64);
					banishContainer.addChild(banishingText);

					let banishInfo:WifeBanishInfoVo = Api.wifebanishVoApi.getBanishInfoVoByWife(element);
					if ( banishInfo  && banishInfo.et >= GameData.serverTime)
					{
						egret.Tween.get(banishContainer).wait((banishInfo.et - GameData.serverTime)*1000).call(function () {
							banishContainer.dispose();
						});
					} 
				}
			}
		}
		this.addChild(statusContanier);
		statusContanier.x = this.width/2 - statusContanier.width/2+5;
		statusContanier.y = 90;
	
		let wifenum = Api.wifestatusVoApi.getWifesNumByLevel(data.id)
		let addH = 140*(Math.ceil((wifenum)/4))
			
		if(data.id == "1"){
			let num = Api.wifestatusVoApi.getNoStatusWife().length;
			addH = 140*(Math.ceil((num)/4))
		}
		if(!addH){
			addH = 0;
			itemBB.visible = false;
		}
		itemBB.height = addH;
		
		this._bgBB.height = 135 + addH;

	}
	private getWifestatusIcon(data:any,wifeId:string):BaseDisplayObjectContainer
	{
		let iconContainer = new BaseDisplayObjectContainer();
		let iconBg:BaseBitmap = BaseBitmap.create("wifestatus_headbg");
		// nameBg.width = this.width;
		iconBg.name = "bg2";
		iconContainer.addChild(iconBg);

		// let iconStr = "wifestatus_headnull";
		// if(data.id == "1"){
			
			let iconStr = Api.wifeVoApi.getWifeIcon(wifeId);
		// }
		let icon = BaseLoadBitmap.create(iconStr);
		// let icon = BaseBitmap.create(iconStr);
		// icon.setScale(0.5);

		// icon.mask = egret.Rectangle.create().setTo(0,0,userContainer.width,500);

		// var circle:egret.Shape = new egret.Shape();
		// circle.graphics.beginFill(0x0000ff);
		// circle.graphics.drawCircle(55,44,44);
		// circle.graphics.endFill();
		// iconContainer.addChild(circle);
		icon.setPosition(0,5)
		
		// 
		// if(data.id == "1"){
			
			icon.setScale(0.6);
		// }
		if(App.CommonUtil.check_dragon())
		{
			let iconMask = BaseBitmap.create("wifestatus_headmask");
			iconMask.setPosition(5,5)
			iconContainer.addChild(iconMask);
			iconContainer.cacheAsBitmap = true;
			icon.mask = iconMask;
		}
		
		
		iconContainer.addChild(icon);

		iconContainer.addTouchTap(this.clickItemHandler,this,[wifeId]);

		let nameBg = BaseBitmap.create("wifestatus_namebg");
		nameBg.setPosition(iconContainer.width/2 - nameBg.width/2,105)
		iconContainer.addChild(nameBg);

		let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
		let nameTF = ComponentManager.getTextField(wifeCfg.name,TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
		// nameTF.textColor = TextFieldConst.COLOR_BLACK;
		nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2;
		nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2;
		iconContainer.addChild(nameTF); 


		if(Api.wifestatusVoApi.getIsConferById(wifeId))
		{
			let redDotSp = BaseBitmap.create("public_dot2");
			redDotSp.x = 100;
			redDotSp.y = 10;
			iconContainer.addChild(redDotSp); 
		}


		return iconContainer;
	}

	private clickItemHandler(event: egret.TouchEvent,wifeId:string): void {
		// let index: number = Number(event.data);
		// let achList = Api.achievementVoApi.getAchievementInfoVoList();
		// let achVo = achList[index]
		ViewController.getInstance().openView(ViewConst.POPUP.WIFESTATUSWIFEPOPUPVIEW,{wifeId:wifeId,level:this._data.id});

	}
	public showUnlockAni()
	{
		if(!this._lock1)
		{
			return;
		}
		let contanier = new BaseDisplayObjectContainer();
		let upgradeClip = ComponentManager.getCustomMovieClip("wifestatus_unluck",11,150);
		// let upgradeClip = ComponentManager.getCustomMovieClip("wifestatus_frame",5,100);
		contanier.addChild(upgradeClip);
		upgradeClip.setScale(2);
		upgradeClip.x = -27;
		upgradeClip.y = -40;
		this.addChildAt(contanier,10);
		upgradeClip.playWithTime(1);

		let upgradeClip2 = ComponentManager.getCustomMovieClip("wifestatus_unluck",11,150);
		// let upgradeClip = ComponentManager.getCustomMovieClip("wifestatus_frame",5,100);
		contanier.addChild(upgradeClip2);
		upgradeClip2.skewY = 180
		upgradeClip2.setScale(2);
		upgradeClip2.x = 627;
		upgradeClip2.y = -40;
		upgradeClip2.playWithTime(1);
		this.removeChild(this._lock1);
		this.removeChild(this._lock2);

		egret.Tween.get(this._bgBB2)
		// .to({y:-80},1000)
		.wait(500).to({alpha:0},300)

		let text1 = BaseBitmap.create("wifestatus_itemeffect");
		// text1.setScale(2)
		text1.x = -7;
		text1.y = -4;
		text1.alpha = 0;
		contanier.addChild(text1);
		// App.DisplayUtil.changeToNormal(this._titleBB);
		
		egret.Tween.get(text1)
		// .to({y:-80},1000)
		.to({alpha:1},800).to({alpha:0},800)
		.call(function(tf:BaseDisplayObjectContainer){
			egret.Tween.removeTweens(tf);
			// self._tfPool.push(tf);
			if(tf.parent){
				tf.parent.removeChild(tf);
			}
			App.DisplayUtil.changeToNormal(this._titleBB);
		},this,[contanier])
		// this.visible = false;
		WifestatusView.unlockLevel = null;
	}
	public refreshData(index:number)
	{	
		// let achList = Api.achievementVoApi.getAchievementInfoVoList();
		// let achInfoVo = achList[index];
		// let achInfoVo = Api.achievementVoApi.getAchievementInfoVoById(this._achInfo.id);
		// let achCfg = Config.AchievementCfg.getAchievementCfgById(achInfoVo.id);
		// let curValue = achCfg.value[Api.achievementVoApi.getAchProById(achInfoVo.id)];
		
	
		// let achProStr = achInfoVo.v + "/" + curValue;
		// this._achProTF.text = achProStr;




	}


	public getSpaceY():number
	{
		return 0;
	}

	public dispose():void
	{
		this._achProTF = null;

		//册封图片
		// this._achIcon = null;
		//册封标题
		this._getBtn = null;
		// 状态图片
		this._stateIcon = null;
		this._data = null;
		// this.cacheAsBitmap=false;
		this._bgBB2 = null;
		this._lock1 = null;
		this._lock2 = null;
		super.dispose();
	}
}