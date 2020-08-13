/**
 * author qianjun
 * date 2017/10/9
 * @class WifeskinViewTab2
 */
class WifeskinNewViewTab2 extends CommonViewTab
{
	//皮肤描述
	//皮肤名称
	private _skinName: BaseTextField;
	private _skinDesc: BaseTextField;
	private _skinPic :BaseLoadBitmap;
	private _wifeInfoVo: WifeInfoVo;
	private _bottomBg : BaseBitmap = null;
	private _childScrollItem:WifeskinNewScrollItem;
	private _droWifeIcon:BaseLoadDragonBones;
	private _bigBg : BaseLoadBitmap;
	// 滑动列表
	private _scrollList: ScrollList;
	private _bgGroup: BaseDisplayObjectContainer;
	private _bgScrollview: ScrollView;
	private _skinId:string;
	private _titleBg:BaseBitmap = null;
	private _wifebgParticlegroupName:string = null;
	private _bgContainer:BaseDisplayObjectContainer = null;
	private _bgarr = [];
	private _skinBtn : BaseButton = null;
	
	private _curBgIdx = -1;
	private _isMoveTween = false;
	private _dgbone : BaseLoadDragonBones = null;
	
    public constructor(data?) 
	{
        super();
        this.param = data;
		this.initView();
	}
	private _pos = {
		"scene_wifeskin_1" : {y : 120, height : 970},
		"scene_wifeskin_2" : {y : 100, height : 1010},
	};

	public refreshWhenSwitchBack():void{
		egret.callLater(()=>{
			if(this._dgbone){
				this._dgbone.dispose();
				this._dgbone = null;
			}
			let bigbg : any = this._bigBg;
			let bgres = bigbg._resurl;
			if(App.CommonUtil.check_dragon() && bgres != `wifeview_optbg` && bgres != `malewifebg`){
				if(!this._dgbone){
					let info = Api.wifeVoApi.getWifeInfoVoById(this.param.data.id);
					let arr = bgres.split(`_`);
					let dgbone = App.DragonBonesUtil.getLoadDragonBones(`scene_wifeskin_${arr[1]}`);
					dgbone.x = 0;
					dgbone.y = this._pos[`scene_wifeskin_${arr[1]}`].y;
					dgbone.setAnchorOffset(0,0-this._pos[`scene_wifeskin_${arr[1]}`].height);
					this.addChildAt(dgbone, this.getChildIndex(this._bigBg) + 1);
					this._dgbone = dgbone;
				}
			}
		}, this);

	}

	public clearDB():void{
		if(this._dgbone){
			this._dgbone.dispose();
			this._dgbone = null;
		}
	}
	

	protected initView():void
	{
		this.height = GameConfig.stageHeigth - 89;
		this.mask = new egret.Rectangle(0,0,GameConfig.stageWidth,this.height);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshInfoAfterLove,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshInfoAfterLove,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFESKIN_SELECTBG),this.selectbg,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFE,this.checkRedPoint,this);
		
		let id = this.param.data.id
		WifeskinView.wifeId = id;
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		//大背景
		let info = Api.wifeVoApi.getWifeInfoVoById(this.param.data.id);
		let bigBg:BaseLoadBitmap = BaseLoadBitmap.create(info.bgRes);
		this.addChild(bigBg);
		bigBg.y = -100;
		this._bigBg = bigBg;

		egret.callLater(()=>{
			if(this._dgbone){
				this._dgbone.dispose();
				this._dgbone = null;
			}
			if(App.CommonUtil.check_dragon() && info.bgRes != `wifeview_optbg` && info.bgRes != `malewifebg`){
				let info = Api.wifeVoApi.getWifeInfoVoById(this.param.data.id);
				let arr = info.bgRes.split(`_`);
				let dgbone = App.DragonBonesUtil.getLoadDragonBones(`scene_wifeskin_${arr[1]}`);
				dgbone.x = 0;
				dgbone.y = this._pos[`scene_wifeskin_${arr[1]}`].y;
				dgbone.setAnchorOffset(0,0-this._pos[`scene_wifeskin_${arr[1]}`].height);
				this.addChildAt(dgbone, this.getChildIndex(this._bigBg) + 1);
				this._dgbone = dgbone;
			}
		}, this);
		
		//描述背景
		this._titleBg = BaseBitmap.create("acliangbiographyview_common_acbg");
		this._titleBg.width = GameConfig.stageWidth;
		this.addChild(this._titleBg);

		let downTitleLine: BaseBitmap = BaseBitmap.create("public_line3");
		downTitleLine.width = 400;
		downTitleLine.setPosition(GameConfig.stageWidth/2 - downTitleLine.width/2,7); 
		this.addChild(downTitleLine);
		if(PlatformManager.checkIsEnLang())
		{
			downTitleLine.setVisible(false);
		}

		this._skinName = ComponentManager.getTextField("" ,TextFieldConst.FONTSIZE_TITLE_SMALL);
		// this._skinName.setColor();、、0xaf0052
		this._skinName.x = GameConfig.stageWidth/2 - this._skinName.width/2;
		this._skinName.y = 5;
		this.addChild(this._skinName);

		//红颜描述文字
		this._skinDesc = ComponentManager.getTextField(this._wifeInfoVo.desc ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._skinDesc.lineSpacing = 5;
		this._skinDesc.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		this._skinDesc.x = 10;
		this._skinDesc.y = 30;
		this._skinDesc.width = GameConfig.stageWidth - this._skinDesc.x*2;
		this.addChild(this._skinDesc);
		this._titleBg.height =  this._skinDesc.y + this._skinDesc.textHeight + 10;

		let wifeScale = 0.55;
		//红颜图像
		this._skinPic = BaseLoadBitmap.create(this._wifeInfoVo.body);
		this._skinPic.x = 130;
		
		this._skinPic.setScale(wifeScale);
		this.addChild(this._skinPic);

		//下面属性背景
		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_bg22");
		this._bottomBg = bottomBg;
		bottomBg.height = 250;
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - 89 - bottomBg.height - 90;
		this.addChild(bottomBg);

		let descbg = BaseBitmap.create(`skin_box_namebg`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, this, [0,0], true);
		this.addChild(descbg);

		//换装按钮
		let skinBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"wifeskinchangebg",this.skinHander,this,null,0);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinBtn, descbg);
		this.addChild(skinBtn);
		this._skinBtn = skinBtn;

		this._skinPic.y = 58;
		if(this._skinPic.y + 840*wifeScale < bottomBg.y + 50){
			this._skinPic.y = bottomBg.y - 50 - 840*wifeScale + 89;
		}

		let skinList = Api.wifeSkinVoApi.getWifeSkinListById(id)
		skinList.unshift(null);
		
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,100,bottomBg.y - 100);
		this._scrollList= ComponentManager.getScrollList(WifeskinNewScrollItem,skinList,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(12,this._titleBg.y+this._titleBg.height);
		this._scrollList.addTouchTap(this.clickItemHandler, this);
		this._scrollList.bounces = false;

		for(let i = 0; i < skinList.length; ++ i){
			let item = this._scrollList.getItemByIndex(i);
			let bg = item.getChildByName("redsp");
			if(bg){
				bg.visible = false;
			}
		}
		//下部背景
		let group = new BaseDisplayObjectContainer();
		group.height = 190;
		this._bgGroup = group;
		this._bgarr.push({
			empty : true,
		});
		this._bgarr.push({
			skinId : ``,
			lv : 1,
			bg : ``
		});
		for(let i in skinList){
			if(skinList[i]){
				let skinId = skinList[i].id;
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
				if(skinCfg.levelUp){
					for(let j in skinCfg.levelUp){
						let unit = skinCfg.levelUp[j];
						if(unit){
							if(typeof unit.levelUpUnlock == `number`){
								this._bgarr.push({
									skinId : skinId,
									lv : Number(j) + 1,
									bg : `${skinId}_${unit.levelUpUnlock}`
								});
							}
						}
					}
				}
			}
		}
		this._bgarr.push({
			empty : true,
		});

		this.createBgView();

		let bgrect = new egret.Rectangle(0,0,570,190);
        let scrollview : ScrollView = ComponentManager.getScrollView(group,bgrect)
		scrollview.bounces = false;
		this.addChild(scrollview);
		this._bgScrollview = scrollview;
		scrollview.bindMoveCompleteCallback(()=>{
			if(this._isMoveTween){

			}
			else{
				let leftX = scrollview.scrollLeft;
				let idx = Math.floor(leftX / 165) + 1; 

				for(let i in this._bgarr){
					let item = <BaseDisplayObjectContainer>this._bgGroup.getChildByName(`item${i}`);
					item.setScale(Number(i) == idx ? 1 : 0.9);
					item.x = Number(i) * 165;
					item.y = (this._bgGroup.height - item.height * item.scaleY) / 2;

					// if(Number(i) < idx - 1 || Number(i) > idx + 1){
					// 	item.alpha = 0;
					// }
					// else{
					// 	item.alpha = 1;
					// }
				}

				let item1 = <BaseDisplayObjectContainer>this._bgGroup.getChildByName(`item${idx - 1}`);
				if(item1){
					this._bgGroup.setChildIndex(item1, 999);
				}

				let item3 = <BaseDisplayObjectContainer>this._bgGroup.getChildByName(`item${idx + 1}`);
				if(item3){
					this._bgGroup.setChildIndex(item3, 999);
				}

				let item2 = <BaseDisplayObjectContainer>this._bgGroup.getChildByName(`item${idx}`);
				if(item2){
					this._bgGroup.setChildIndex(item2, 999);
				}
			}
			
			
			// if(this._isMoveTween){

			// }
			// else{
			// 	let leftX = scrollview.scrollLeft;
			// 	let idx = Math.floor(leftX / 266); 
			// 	this.selectBgHandle(null, idx);
			// }
		}, this);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, bottomBg, [0,30]);
		
		let curBgIdx = this.getCurBgIdx();
		this._curBgIdx = curBgIdx;
		this._isMoveTween = true;
		this.selectBgHandle(null, curBgIdx);
		
		this.initState();
	}

	private getCurBgIdx():number{
		let info = Api.wifeVoApi.getWifeInfoVoById(this.param.data.id);
		let bg = info.bgId;
		let selIdx = 0;
		for(let i in this._bgarr){
			let unit = this._bgarr[i];
			if(unit.bg === bg){
				selIdx = Number(i);
			}
		}
		return selIdx;
	}

	private initState()
	{
		let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this.param.data.id);
		if(this.param.data.wifeSkinId)
		{
			this.setData(this.param.data.wifeSkinId)
			this.setSelect(this.param.data.wifeSkinId);
			return;
		}
		if(wifeSkinVo)
		{
			let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
			if(skinCfg)
			{
				let id = skinCfg.id;
				this.setData(id)
				this.setSelect(id);
			}else{
				this.setData(null)
				this.setSelect(null);
			}
		}
		else{
			this.setData(null)
			this.setSelect(null);
		}
	}


	private clickItemHandler(event: egret.TouchEvent): void {
		let index: number = Number(event.data);
			let skinList = Api.wifeSkinVoApi.getWifeSkinListById(WifeskinView.wifeId);
			skinList.unshift(null);
			let skinCfg = skinList[index];
			if(skinCfg)
			{
				let id = skinCfg.id;
				if(Api.wifeSkinVoApi.getSkinOneRed(WifeskinView.wifeId,id))
				{
					this.request(NetRequestConst.REQUEST_WIFE_READSKINRED,{wifeId:String(this.param.data.id),wifeSkinId:id});
				}
				if(this._skinId == id)
				{
					return;
				}
				this.setData(id)
				this.setSelect(id);
				
				
			}else{
				if(this._skinId == null)
				{
					return;
				}
				this.setData(null)
				this.setSelect(null);
			}
		
			
		// }
	}

	//刷新选中状态
	private setSelect(skinId)
	{	
		
		this._skinId = skinId;
		let childIndex
		if(skinId){
			childIndex = Api.wifeSkinVoApi.getWifeSkinIndexVoById(skinId) + 1;
		}	
		else{
			childIndex = 0;
		}
		
		
		if(this._childScrollItem)
		{
			if(this._childScrollItem.getChildByName("bg2"))
			{
				let bg = <BaseBitmap>this._childScrollItem.getChildByName("bg2")
				bg.texture = ResourceManager.getRes("tailor_iconBtn")
				
			}

		}
		this._childScrollItem =  <WifeskinNewScrollItem>this._scrollList.getItemByIndex(childIndex);

		let bg = <BaseBitmap>this._childScrollItem.getChildByName("bg2")
		bg.texture = ResourceManager.getRes("tailor_iconBtn_down")

		if(this._childScrollItem.getChildByName("redsp"))
		{
			let bg = <BaseBitmap>this._childScrollItem.getChildByName("redsp")
			bg.visible = false;
		}

	}

	private selectBgHandle(obj:any,param:any){
		let index = param;
		let view = this;
		let count = 0;
		
		view._curBgIdx = param;
		view.freshBgView();
		let data = view._bgarr[param];
		let bgres = ``;
		if(data.bg && data.bg != ``){
			bgres = `wifeskinbg${data.bg}`
		}
		else{
			bgres = `wifeview_optbg`
		}
		this._bigBg.setload(bgres);
		if(this._dgbone){
			this._dgbone.dispose();
			this._dgbone = null;
		}
		egret.callLater(()=>{
			if(!this._dgbone){
				let bigbg : any = this._bigBg;
				let resurl = bigbg._resurl;
				if(App.CommonUtil.check_dragon() && resurl != `wifeview_optbg` && resurl != `malewifebg`){
					let info = Api.wifeVoApi.getWifeInfoVoById(this.param.data.id);
					let arr = resurl.split(`_`);
					let dgbone = App.DragonBonesUtil.getLoadDragonBones(`scene_wifeskin_${arr[1]}`);
					dgbone.x = 0;
					dgbone.y = this._pos[`scene_wifeskin_${arr[1]}`].y;
					dgbone.setAnchorOffset(0,0-this._pos[`scene_wifeskin_${arr[1]}`].height);
					this.addChildAt(dgbone, this.getChildIndex(this._bigBg) + 1);
					this._dgbone = dgbone;
				}
			}
		}, view);
		
		let curlv = Api.wifeSkinVoApi.getWifeSkinLV(data.skinId);
		let curSelBgIdx = this.getCurBgIdx();

		if(curlv < data.lv || curSelBgIdx == param){
			view._skinBtn.setGray(true);
		}
		else{
			view._skinBtn.setGray(false);
		}
		
		// view._skinBtn.visible = ;
		
		let item1 = <BaseDisplayObjectContainer>view._bgGroup.getChildByName(`item${param - 1}`);
		if(item1){
			view._bgGroup.setChildIndex(item1, 999);
		}

		let item3 = <BaseDisplayObjectContainer>view._bgGroup.getChildByName(`item${param + 1}`);
		if(item3){
			view._bgGroup.setChildIndex(item3, 999);
		}

		let item2 = <BaseDisplayObjectContainer>view._bgGroup.getChildByName(`item${param}`);
		if(item2){
			view._bgGroup.setChildIndex(item2, 999);
		}
		

		let left = 0;
		if(param == 0){
			left = - 165;
		}
		else if(param == view._bgarr.length){
			left = view._bgGroup.width - 570 + 165;
		}
		else{
			left = (param - 1)* 165;
		}

		if(this._isMoveTween){
			view._bgScrollview.scrollLeft = left;
			this._isMoveTween = false;
		}
		else{
			this._isMoveTween = true;
			egret.Tween.get(view._bgScrollview).to({scrollLeft : left}, 300).call(()=>{
				this._isMoveTween = false;
			},view);
			// view._bgScrollview.setScrollLeft(left);
		}
	}

	private freshBgView():void{
		let view = this;
		let index = view._curBgIdx;
		let curSelBgIdx = this.getCurBgIdx();
		for(let i in this._bgarr){
			let unit = this._bgarr[i];
			let isdefault = unit.lv == 1;
			let skinId = unit.skinId;
			let curlv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);

			let item = <BaseDisplayObjectContainer>view._bgGroup.getChildByName(`item${i}`);
			item.setScale(Number(i) == index ? 1 : 0.9);
			item.x = Number(i) * 165;
			item.y = (view._bgGroup.height - item.height * item.scaleY) / 2;

			let select = item.getChildByName(`select${i}`);
			if(select){
				select.visible = Number(i) == Number(curSelBgIdx);
			}
			
			let maskGroup = item.getChildByName(`mask${i}`);
			if(maskGroup){
				maskGroup.visible = curlv < unit.lv; 
			}
		}
	}

	public changeSelect(bg):void{
		let view = this;
		let selIdx = 0;
		for(let i in this._bgarr){
			let unit = this._bgarr[i];
			if(unit.bg === bg){
				selIdx = Number(i);
			}
		}
		view.selectBgHandle(null, selIdx);
	}

	private createBgView():void{
		let view = this;
		this._bgGroup.removeChildren();
		let curBgIdx = 0;
		for(let i in this._bgarr){
			let unit = this._bgarr[i];

			let itemgroup = new BaseDisplayObjectContainer();
			itemgroup.width = 266;
			itemgroup.height = 190;

			let bgitem = BaseLoadBitmap.create(unit.empty ? `wifebgitemempty` : `wifebgitem`);
			bgitem.width = 266;
			bgitem.height = 184;
			itemgroup.addChild(bgitem);
			if(unit.empty){
			}
			else{
				let isdefault = unit.lv == 1;
				let skinId = unit.skinId;
				if(!isdefault){
					let cfg = Config.WifeskinCfg.getWifeCfgById(skinId);
					let curlv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);

					bgitem.setload(`wifebgitem${unit.bg}`);

					let maskGroup = new BaseDisplayObjectContainer();
					maskGroup.width = 266;
					maskGroup.height = 184;
					maskGroup.name = `mask${i}`
					itemgroup.addChild(maskGroup);

					maskGroup.visible = curlv < unit.lv; 

					let mask = BaseBitmap.create(`wifebgitemmask`);
					mask.alpha = 0.5;
					maskGroup.addChild(mask);

					let maskTxt = ComponentManager.getTextField(LanguageManager.getlocal(`wifeskinlvunlock`, [cfg.name, unit.lv]), 20, TextFieldConst.COLOR_WARN_GREEN);
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, maskTxt, mask);
					maskGroup.addChild(maskTxt);
					
				}

				let selected = BaseBitmap.create(`mlservantselected-1`);
				selected.name = `select${i}`;
				App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, selected, bgitem, [40,35]);
				itemgroup.addChild(selected);
				selected.visible = curBgIdx == Number(i);

				let nameTxt = ComponentManager.getTextField(isdefault ? LanguageManager.getlocal(`wifeskincdefaultbg`) : LanguageManager.getlocal(`wifeskinbgname${unit.bg}`), 22);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameTxt, bgitem, [0,8]);
				itemgroup.addChild(nameTxt);

				itemgroup.addTouchTap(this.selectBgHandle, this, [Number(i)]);
			}
			itemgroup.name = `item${i}`;
			itemgroup.x = Number(i) * 160;
			itemgroup.y = (this._bgGroup.height - itemgroup.height * itemgroup.scaleY) / 2;
		
			this._bgGroup.addChild(itemgroup);
		}
	}

	private showSkinAni(){
		let ths=this;
		// let bg2Index = this.container.getChildIndex(this._bottomBg);
		// let mask1:BaseBitmap = BaseBitmap.create("wifeview_skinmask");
		// mask1.x = -640;
		// mask1.y = -20;
		// this.container.addChildAt(mask1,bg2Index)

		// egret.Tween.get(mask1).to({x:0}, 800).to({x:-30}, 100).wait(200).call(function(){
		// 		// egret.Tween.removeTweens(ths);
		// 		// ths._tweenTo=null;
				
		// 	},this)
		// .wait(1700).to({x:0}, 100).to({x:-640}, 600);

		// let mask2:BaseBitmap = BaseBitmap.create("wifeview_skinmask");
		// mask2.$setSkewY(180);
		// mask2.x = GameConfig.stageWidth*2;
		// mask2.y = -20;
		// this.container.addChildAt(mask2,bg2Index)

		// egret.Tween.get(mask2).to({x:640}, 800).to({x:670}, 100).wait(200).call(this.addMask,this)
		// .wait(1700).to({x:640}, 100).to({x:GameConfig.stageWidth*2}, 600)
	
	}

	private setData(skinId:string)
	{
		if(skinId)
		{
			let skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
			this._skinDesc.text = skinCfg.desc;
			this._titleBg.height =  this._skinDesc.y + this._skinDesc.textHeight + 10;
			this._scrollList.setPosition(12,this._titleBg.y+this._titleBg.height);
			this._skinPic.setload(skinCfg.body);
			this._skinName.text = skinCfg.name;
			this._skinName.x = GameConfig.stageWidth/2 - this._skinName.width/2;

			if(this._droWifeIcon)
			{
				this._droWifeIcon.dispose();
				this._droWifeIcon = null;
			}
				
			if(Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske"))
			{
				let bg2Index = this.getChildIndex(this._titleBg);
				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone,0,`idle`,()=>{
					if(this._droWifeIcon){
						App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this._bottomBg, [320,this._bottomBg.height - this._droWifeIcon.height * this._droWifeIcon.scaleY - 60]);
					}
				}, this);
				this._droWifeIcon.setScale(0.8);
				this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2,0);

				this.addChildAt(this._droWifeIcon,bg2Index);
				this._skinPic.visible = false;
				if(this._droWifeIcon.y)
				{

				}
			}
			else{
			}
		}
		else{
			this._skinDesc.text = this._wifeInfoVo.desc;
			this._titleBg.height =  this._skinDesc.y + this._skinDesc.textHeight + 10;
			this._scrollList.setPosition(12,this._titleBg.y+this._titleBg.height);
			this._skinPic.setload(this._wifeInfoVo.body);
			this._skinName.text = this._wifeInfoVo.name;
			this._skinName.x = GameConfig.stageWidth/2 - this._skinName.width/2;

			if(this._droWifeIcon)
			{
				this._droWifeIcon.dispose();
				this._droWifeIcon = null;
			}
				
			if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske"))
			{
				let bg2Index = this.getChildIndex(this._titleBg);
				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone,0,`idle`,()=>{
					if(this._droWifeIcon){
						App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this._bottomBg, [320,this._bottomBg.height - this._droWifeIcon.height * this._droWifeIcon.scaleY - 60]);
					}
				}, this);
				this._droWifeIcon.setScale(0.8)
				this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2,0);
			
				this.addChildAt(this._droWifeIcon,bg2Index);
				this._skinPic.visible = false;
				if(this._droWifeIcon.y)
				{

				}
			}
			else{
				// this.
			}
		}


		let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this.param.data.id);
		
		//穿戴中
		let skId = skinId;
		if(!skId)
		{
			skId = "";
		}
		
		if(this._droWifeIcon)
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this._bottomBg, [320,this._bottomBg.height - this._droWifeIcon.height * this._droWifeIcon.scaleY]);
			this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2,0);
		}
		else{
			this._skinPic.visible = true;
		}
	}

	private checkDro()
	{

		if(this._droWifeIcon)
		{
			this._droWifeIcon.dispose()
			this._droWifeIcon = null;
		}
		let bg2Index = this.getChildIndex(this._titleBg);
		if(Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				if(RES.hasRes(skinCfg.bone + "_ske")&&App.CommonUtil.check_dragon()&&!Api.switchVoApi.checkCloseBone())
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone,0,`idle`,()=>{
						if(this._droWifeIcon){
							App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this._bottomBg, [320,this._bottomBg.height - this._droWifeIcon.height * this._droWifeIcon.scaleY]);
						}
					}, this);
					this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2,0);
					this.addChildAt(this._droWifeIcon,bg2Index);
					this._skinPic.visible = false;
				}
			}
			else{
				if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone,0,`idle`,()=>{
						if(this._droWifeIcon){
							App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this._bottomBg, [320,this._bottomBg.height - this._droWifeIcon.height * this._droWifeIcon.scaleY]);
						}
					}, this);
					this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2,0);
					this.addChildAt(this._droWifeIcon,bg2Index);
				}
			}
			
		}else{
			if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo+ "_ske"))
			{

				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone,0,`idle`,()=>{
					if(this._droWifeIcon){
						App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this._bottomBg, [320,this._bottomBg.height - this._droWifeIcon.height * this._droWifeIcon.scaleY]);
					}
				}, this);
				this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2,0);
				this.addChildAt(this._droWifeIcon,bg2Index);
				this._skinPic.visible = false;
			}
		}
		if(this._droWifeIcon)
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this._bottomBg, [320,this._bottomBg.height - this._droWifeIcon.height * this._droWifeIcon.scaleY]);
			this._droWifeIcon.setAnchorOffset(this._droWifeIcon.width / 2,0);
		}
		else{
			this._skinPic.visible = true;
		}

	}

	private checkRedPoint(){
		//背景切换
		let view = this;
		if(1){
			// App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinchangebgsuc"));
			view.freshBgView();
			let info = Api.wifeVoApi.getWifeInfoVoById(this.param.data.id);
			this._bigBg.setload(info.bgRes);
			if(this._dgbone){
				this._dgbone.dispose();
				this._dgbone = null;
			}
			if(App.CommonUtil.check_dragon() && info.bgRes != `wifeview_optbg` && info.bgRes != `malewifebg`){
				let info = Api.wifeVoApi.getWifeInfoVoById(this.param.data.id);
				let arr = info.bgRes.split(`_`);
				let dgbone = App.DragonBonesUtil.getLoadDragonBones(`scene_wifeskin_${arr[1]}`);
				dgbone.x = 0;
				dgbone.y = this._pos[`scene_wifeskin_${arr[1]}`].y;
				dgbone.setAnchorOffset(0,0-this._pos[`scene_wifeskin_${arr[1]}`].height);
				this.addChildAt(dgbone, this.getChildIndex(this._bigBg) + 1);
				this._dgbone = dgbone;
			}
		}
	}

	private skinHander(){
		let view = this;
		if(this._skinBtn.getIsGray()){
			let data = view._bgarr[view._curBgIdx];
			let curlv = Api.wifeSkinVoApi.getWifeSkinLV(data.skinId);
			let curSelBgIdx = this.getCurBgIdx();
	
			if(curlv < data.lv){
				App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinleveluptip2"));
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinleveluptip8"));
			}
			
		}
		else{
			//切换背景
			let data = this._bgarr[this._curBgIdx].bg;
			this.request(NetRequestConst.REQUEST_WIFESKIN_SELECTBG,{
				wifeId:String(this.param.data.id),
				bgId:data
			});
		}
		//
	}

	private selectbg(evt : egret.Event):void{
		if(!evt.data.ret){
			return;
		}
		if(evt.data.data.data){
			//App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinchangebgsuc"));
			let baseview = ViewController.getInstance().getView(`WifeskinNewView`);
			baseview.hide();
		}
		//this.checkRedPoint();
	}

	//刷新数据
	protected receiveData(data:{ret:boolean,data:any}):void{	
		if(data.ret){
			if(data.data.ret < 0){
				return;
			}
			let baseview = ViewController.getInstance().getView(`WifeskinNewView`);
			if(data.data.cmd == NetRequestConst.REQUEST_WIFE_EQUIP){
				this.initState();
				baseview.hide();
			}
		}
	}

	protected refreshInfoAfterLove(event : egret.Event){
		if(!event.data.ret){
			return;
		}
		let id = this.param.data.id
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		//亲密度
		let IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
	}

	public dispose(): void {
		super.dispose();
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFE_LOVECOM);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshInfoAfterLove,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshInfoAfterLove,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFESKIN_SELECTBG),this.selectbg,this);
		this._skinDesc = null;
		this._wifeInfoVo = null;
		this._skinPic = null;

		WifeskinView.wifeId= null;

		this._childScrollItem = null;
		this._scrollList = null;
		this._skinId = null;
		this._droWifeIcon = null;
		this._titleBg = null;
		if (this._wifebgParticlegroupName) {
			ResourceManager.destroyRes(this._wifebgParticlegroupName);
			this._wifebgParticlegroupName = null;
		}
		this._bgContainer = null;
		this._bottomBg = null;
		this._bigBg = null;
		this._bgarr = [];
		this._bgGroup = null;
		this._bgScrollview = null;
		this._skinBtn = null;
		this._curBgIdx = -1;
		this._isMoveTween = false;
		if(this._dgbone){
			this._dgbone.dispose();
			this._dgbone = null;
		}
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFE,this.checkRedPoint,this);
	}
}