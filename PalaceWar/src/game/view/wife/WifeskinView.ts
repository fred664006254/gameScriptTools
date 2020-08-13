/**
 * 红颜换皮肤界面
 * author dky
 * date 2018/3/2
 * @class WifeskinView
 */
class WifeskinView extends CommonView {

	//皮肤名称
	private _skinName: BaseTextField;
	//皮肤描述
	private _skinDesc: BaseTextField;

	// //皮肤描述
	// private _skinWord: BaseTextField;
	private _skinPic :BaseLoadBitmap;

	private _wifeInfoVo: WifeInfoVo;
	
	public static wifeId;


	private _childScrollItem:WifeskinScrollItem;
	private _droWifeIcon:BaseLoadDragonBones;

	// private _skinList

	// 滑动列表
	private _scrollList: ScrollView;
	private _itemTab:WifeskinScrollItem[] = [];
	
	private _skinBtn:BaseButton;

	private _txtList=[];

	private _skinId:string;

	private _noAddAtt: BaseTextField;

	private _inBB:BaseBitmap = null;
	private _noGetBB:BaseBitmap = null;
	private _textBg:BaseBitmap = null;
	private _getText: BaseTextField;

	private _titleBg:BaseBitmap = null;
	private _skinBg:BaseBitmap = null;

	private _wifebgParticlegroupName:string = null;

	private _bgContainer:BaseDisplayObjectContainer = null;

	 public constructor() {
		super();
		
	}
	public initView(): void {



		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHILD_GUIDE,this.doGuide,this);

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshInfoAfterLove,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshInfoAfterLove,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFE,this.checkRedPoint,this);

		let id = this.param.data.id

		WifeskinView.wifeId = id;


		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);

		// this.playEffect(this._wifeInfoVo.sound,true);
		//大背景
		let bigBg:BaseLoadBitmap = BaseLoadBitmap.create("wifeview_optbg");
		bigBg.y = GameConfig.stageHeigth - 1136 - 120;
		this.addChildToContainer(bigBg);
		//描述背景
		this._titleBg = BaseBitmap.create("wifeskin_descbg");
		// titleBg.width = GameConfig.stageWidth;
		// titleBg.height = 70;
		this._titleBg.y = -17;
		this.addChildToContainer(this._titleBg);

		let downTitleLine: BaseBitmap = BaseBitmap.create("public_line3");
		downTitleLine.width = 400;
		downTitleLine.setPosition(GameConfig.stageWidth/2 - downTitleLine.width/2,-5); 
		this.addChildToContainer(downTitleLine);
		if(PlatformManager.checkIsEnLang())
		{
			downTitleLine.setVisible(false);
		}

		//红颜描述文字
		this._skinName = ComponentManager.getTextField("" ,TextFieldConst.FONTSIZE_TITLE_SMALL);
		this._skinName.setColor(0xaf0052);
		this._skinName.x = GameConfig.stageWidth/2 - this._skinName.width/2;
		this._skinName.y = -8;
		this.addChildToContainer(this._skinName);
	
		//红颜描述文字
		this._skinDesc = ComponentManager.getTextField(this._wifeInfoVo.desc ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._skinDesc.setColor(TextFieldConst.COLOR_BROWN);
		this._skinDesc.x = 10;
		this._skinDesc.y = 18;
		this._skinDesc.width = GameConfig.stageWidth - this._skinDesc.x*2;
		this.addChildToContainer(this._skinDesc);



		
		



		let wifeScale = 0.55;
		//红颜图像
		this._skinPic = BaseLoadBitmap.create(this._wifeInfoVo.body);
		this._skinPic.x = 130;
		
		this._skinPic.setScale(wifeScale);
		this.addChildToContainer(this._skinPic);

		// let npc=App.DragonBonesUtil.getLoadDragonBones("wife_full2_306");
		// npc.setScale(0.7)
		// npc.x = 200;
		// npc.y = 800;
		// this.addChildToContainer(npc);


						//下面属性背景
		this._skinBg = BaseBitmap.create("wifeskin_barbg");
		this._skinBg.x = 0;
		this._skinBg.y = GameConfig.stageHeigth - this.container.y - this._skinBg.height;
		this.addChildToContainer(this._skinBg);




		// let bottomBg2:BaseBitmap = BaseBitmap.create("wifeskin_bottombg");
		// bottomBg2.width = GameConfig.stageWidth;
		// bottomBg2.height = 96;
		// bottomBg2.x = 0;
		// this.addChildToContainer(bottomBg2);
				//下面属性背景
		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_bg22");
		// bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = 241;
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
		this.addChildToContainer(bottomBg);

		let bottomBg3:BaseBitmap = BaseBitmap.create("public_9_managebg");
		bottomBg3.width = 594;
		bottomBg3.height = 138;
		bottomBg3.x = GameConfig.stageWidth/2 - bottomBg3.width/2;
		bottomBg3.y = bottomBg.y + 44;
		this.addChildToContainer(bottomBg3);

		this._skinBg.y = bottomBg.y - this._skinBg.height;

				//换装按钮
		this._skinBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"wifeskinViewTitle",this.skinHander,this,null,0);
		this._skinBtn.x = 470;
		this._skinBtn.y = this._skinBg.y -60 ;
		// this._skinBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._skinBtn);

		this._inBB = BaseBitmap.create("wifeview_in");
		this._inBB.x = 490;
		this._inBB.y = this._skinBg.y - 80;
		this.addChildToContainer(this._inBB);

		this._noGetBB = BaseBitmap.create("wifeview_noget");
		this._noGetBB.x = 470;
		this._noGetBB.y = this._skinBg.y - 80;
		this.addChildToContainer(this._noGetBB);

		this._textBg = BaseBitmap.create("wifeview_skingetbg");
		this._textBg.x = 470;
		this._textBg.y = this._skinBg.y - 32;
		this.addChildToContainer(this._textBg);

		this._getText = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinGetDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._textBg.width = this._getText.width + 50;
		this._textBg.x = GameConfig.stageWidth - this._textBg.width;

		this._getText.x = GameConfig.stageWidth - this._getText.width - 10;
		this._getText.y = this._skinBg.y - 27;
		this.addChildToContainer(this._getText);

		

		//下面属性背景
	
		// bottomBg2.y = bottomBg.y + bottomBg.height - 20;
		

		this._skinPic.y = 58;
		if(this._skinPic.y + 840*wifeScale <  bottomBg.y + 50){
			this._skinPic.y = bottomBg.y - 50 - 840*wifeScale;
		}
		//横版的 。去掉名字
		if(!PlatformManager.checkIsTextHorizontal())
		{
			//红颜名字背景
			let nameBg:BaseBitmap = BaseBitmap.create("wifeview_namebg");
			nameBg.x = 25;
			nameBg.y = 200;
			this.addChildToContainer(nameBg);
			//红颜名字
			let nameTF = ComponentManager.getTextField(this._wifeInfoVo.name,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WHITE);
			nameTF.width = 27;
			nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2;
			nameTF.y = nameBg.y + 190/2 - nameTF.height/2;
				this.addChildToContainer(nameTF);
		}
		let skinList = Api.wifeSkinVoApi.getWifeSkinListById(id);
		skinList.unshift(null);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 14,110);
		let itemNode = new BaseDisplayObjectContainer();
		this._scrollList= ComponentManager.getScrollView(itemNode,rect);
		// scrollList.setEmptyTip(LanguageManager.getlocal("wifeNoUnlockWife"));
		this._scrollList.verticalScrollPolicy = "off";
		for (let i=0; i<skinList.length; i++)
		{
			let item = new WifeskinScrollItem();
			item.initItem(i,skinList[i]);
			item.setPosition(i*140,0);
			itemNode.addChild(item);
			item.addTouchTap(this.clickItemHandler, this,[i]);
			this._itemTab.push(item);
		}

		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(7,this._skinBg.y + 10);
		// this._scrollList.addTouchTap(this.clickItemHandler, this);
		this._scrollList.setShowArrow(false);
		this._scrollList.setArrow();
		// this.setData("1011");

		let downTitleLine2: BaseBitmap = BaseBitmap.create("public_line3");
		downTitleLine2.width = 400;
		downTitleLine2.setPosition(GameConfig.stageWidth/2 - downTitleLine2.width/2,bottomBg.y + 23); 
		this.addChildToContainer(downTitleLine2);

		//红颜描述文字
		let attTitle = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinAdd") ,TextFieldConst.FONTSIZE_TITLE_SMALL);
		attTitle.setColor(TextFieldConst.COLOR_BROWN);
		attTitle.x = GameConfig.stageWidth/2 - attTitle.width/2;
		attTitle.y = bottomBg.y + 19;
		this.addChildToContainer(attTitle);

		let startY = bottomBg.y + 50;
        for (var index = 0; index < 9; index++) {
			let addX = 0;
			if(index%2>0){
				addX = 300;
			}
            let attrNameTxt =  ComponentManager.getTextField("0",22,TextFieldConst.COLOR_BROWN);
            attrNameTxt.x = bottomBg.x + 45 + addX;
            attrNameTxt.y = startY;
			if(index%2>0){
				startY = startY + attrNameTxt.height+5;
			}
            
            this.addChildToContainer(attrNameTxt);
            this._txtList.push(attrNameTxt);
        }

		this._noAddAtt = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinNoAdd") ,TextFieldConst.FONTSIZE_TITLE_BIG);
		this._noAddAtt.setColor(TextFieldConst.COLOR_BROWN);
		this._noAddAtt.x = GameConfig.stageWidth/2 - this._noAddAtt.width/2;
		this._noAddAtt.y = bottomBg.y + 100;
		this.addChildToContainer(this._noAddAtt);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinDesc"),22,TextFieldConst.COLOR_BROWN);
        tipTxt.setColor(0xaf0052);
		tipTxt.x = GameConfig.stageWidth/2 - tipTxt.width/2;
        tipTxt.y = bottomBg.y + bottomBg.height - 50;
        this.addChildToContainer(tipTxt);

		this.checkRedPoint();

		this.initState();
		
		// }else{

		// }
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


	private clickItemHandler(evt:any, idx:number): void {
		let index: number = idx;//Number(event.data);
		// if (this._childInfoVoList) {

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
				// let id = skinCfg.id;
				// this.setData(id)
				// this.setSelect(id);
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
		this._childScrollItem =  <WifeskinScrollItem>this._itemTab[childIndex];
		// let bg2Index = this._childScrollItem.getChildIndex(this._childScrollItem.getChildByName("bg2"));
		
		let bg = <BaseBitmap>this._childScrollItem.getChildByName("bg2")
		bg.texture = ResourceManager.getRes("tailor_iconBtn_down")

		if(this._childScrollItem.getChildByName("redsp"))
		{
			let bg = <BaseBitmap>this._childScrollItem.getChildByName("redsp")
			bg.visible = false;
			
		}

	}

	private setData(skinId:string)
	{
		// if(this._skinId == skinId)
		// {
		// 	return;
		// }
		if(skinId)
		{
			let skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
			this._skinDesc.text = skinCfg.desc;
			this._skinName.text = skinCfg.name;
			this._skinName.x = GameConfig.stageWidth/2 - this._skinName.width/2;
			this._skinPic.setload(skinCfg.body)

			let resultStr = this.dealAttrChangeInfo(skinId);
			for (var index = 0; index < this._txtList.length; index++) {
				// this._txtList[index].text = resultStr[index];
				this._txtList[index].visible = true;
				let str = resultStr[index];
				if(str){
					this._txtList[index].text = resultStr[index];
				}else{
					this._txtList[index].text = "";
				}
			}
			this._noAddAtt.visible = false;

			if(this._droWifeIcon)
			{
				this._droWifeIcon.dispose();
				this._droWifeIcon = null;
			}
				
			if(Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske"))
			{
				// let bg2Index = this.container.getChildIndex(this._skinPic);
				let bg2Index = this.container.getChildIndex(this._titleBg);
				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
				this._droWifeIcon.setScale(0.8)
				this._droWifeIcon.x = this._skinPic.x + 190;
				this._droWifeIcon.y = this._titleBg.y + this._titleBg.height + 800*0.6;
				this.container.addChildAt(this._droWifeIcon,bg2Index);
				this._skinPic.visible = false;
				if(this._droWifeIcon.y)
				{

				}
			}
			else{
				// this.
			}
		}
		else{
			
			this._skinDesc.text = this._wifeInfoVo.desc;
			this._skinName.text = this._wifeInfoVo.name;
			this._skinName.x = GameConfig.stageWidth/2 - this._skinName.width/2;
			this._skinPic.setload(this._wifeInfoVo.body)

			for (var index = 0; index < this._txtList.length; index++) {
				this._txtList[index].visible = false;
			}
			this._noAddAtt.visible = true;
			if(this._droWifeIcon)
			{
				this._droWifeIcon.dispose();
				this._droWifeIcon = null;
			}
				
			if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske"))
			{
				// let bg2Index = this.container.getChildIndex(this._skinPic);
				let bg2Index = this.container.getChildIndex(this._titleBg);
				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
				this._droWifeIcon.setScale(0.8)
				this._droWifeIcon.x = this._skinPic.x + 150;
				this._droWifeIcon.y = this._titleBg.y + this._titleBg.height + 800*0.6;
				this.container.addChildAt(this._droWifeIcon,bg2Index);
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
		
		//穿戴中
		if(wifeSkinVo &&wifeSkinVo.equip == skId ||(!wifeSkinVo &&skId == "" ))
		{
			this._skinBtn.visible = false;
			this._inBB.visible = true;
			this._getText.visible = false;
			this._textBg.visible = false;
			this._noGetBB.visible = false;
		}
		else{
			if(skId==""||Api.wifeSkinVoApi.isOwnSkinOfSkinId(skId))
			{
				//未穿戴
				this._skinBtn.visible = true;
				this._inBB.visible = false;
				this._getText.visible = false;
				this._textBg.visible = false;
				this._noGetBB.visible = false
			}
			else{
				//未获得
				this._skinBtn.visible = false;
				this._inBB.visible = false;
				this._getText.visible = true;
				this._textBg.visible = true;
				this._noGetBB.visible = true;
				this._getText.text = LanguageManager.getlocal("skinDropDesc_"+skId);
				this._textBg.width = this._getText.width + 50;
				this._textBg.x = GameConfig.stageWidth - this._textBg.width;
				this._getText.x = GameConfig.stageWidth - this._getText.width - 10;
			}
			
		}
		// this.checkDro();
		if(this._droWifeIcon)
		{
			// this._droWifeIcon.x = this._skinPic.x + 230;
			// this._droWifeIcon.y = this._skinPic.y + 760*0.7 + 40;
			this._droWifeIcon.x = this._skinPic.x + 150;
			// this._droWifeIcon.y = this._titleBg.y + this._titleBg.height + 800*0.6;
			this._droWifeIcon.y = this._skinPic.y + 760*0.7 - 90;
	
		}
		else{
			this._skinPic.visible = true;
		}
		// this.refreshWifeBg(skinId);
	}

	private checkDro()
	{

		if(this._droWifeIcon)
		{
			this._droWifeIcon.dispose()
			this._droWifeIcon = null;
		}
		// let bg2Index = this.container.getChildIndex(this._skinPic);
		let bg2Index = this.container.getChildIndex(this._titleBg);
		if(Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				if(RES.hasRes(skinCfg.bone + "_ske")&&App.CommonUtil.check_dragon()&&!Api.switchVoApi.checkCloseBone())
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
					// this._droWifeIcon.setScale(0.7) 
					// this._droWifeIcon.x = 0;
					// this._droWifeIcon.y = 0;
					this.container.addChildAt(this._droWifeIcon,bg2Index);
					this._skinPic.visible = false;
				}
			}
			else{
				if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
					// this._droWifeIcon.setScale(0.7)
					// this._droWifeIcon.x = this._skinPic.x;
					// this._droWifeIcon.y = this._skinPic.y;
					this.container.addChildAt(this._droWifeIcon,bg2Index);
				}
			}
			
		}else{
			if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo+ "_ske"))
			{

				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
				// this._droWifeIcon.setScale(0.7)
				// this._droWifeIcon.x = this._skinPic.x;
				// this._droWifeIcon.y = this._skinPic.y;
				this.container.addChildAt(this._droWifeIcon,bg2Index);
				this._skinPic.visible = false;
			}
		}
		if(this._droWifeIcon)
		{
			this._droWifeIcon.x = this._skinPic.x + 230;
			this._droWifeIcon.y = this._skinPic.y + 760*0.7 + 40;
		}
		else{
			this._skinPic.visible = true;
		}

	}

	protected dealAttrChangeInfo(skinId:string)
    {
        let skinCfg =  Config.WifeskinCfg.getWifeCfgById(skinId);
        // let skinCfg = GameConfig.config.wifeskinCfg[this._curSkinId];
        let resultStr = [];
        let atkAdd = skinCfg.atkAdd ;
        let inteAdd = skinCfg.inteAdd ;
        let politicsAdd = skinCfg.politicsAdd;
        let charmAdd = skinCfg.charmAdd;
        let wifeIntimacy = skinCfg.wifeIntimacy;
        let wifeGlamour = skinCfg.wifeGlamour;
        let childReduce = skinCfg.childReduce;
        let searchReduce = skinCfg.searchReduce;
        let wifeReduce = skinCfg.wifeReduce;

        if (atkAdd)
		{
			if (atkAdd[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1]]));
			} else {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1] * 100 + "%"]));
			}
		}
		
		if (inteAdd)
		{
			if (inteAdd[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1]]));
			} else {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1] * 100 + "%"]));
			}
		}

		if (politicsAdd)
		{
			if (politicsAdd[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1]]));
			} else {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1] * 100 + "%"]));
			}
		}
		
		if (charmAdd)
		{
			if (charmAdd[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1]]));
			} else {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1] * 100 + "%"]));
			}
		}	
		let atkAdd2 = skinCfg.atkAdd2;
		let inteAdd2 = skinCfg.inteAdd2;
		let politicsAdd2 = skinCfg.politicsAdd2;
		let charmAdd2 = skinCfg.charmAdd2;
		let wifeCfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
		let servantName = LanguageManager.getlocal("servant_name"+wifeCfg.servantId);
		if (atkAdd2)
		{
			if (atkAdd2[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd10", [servantName,atkAdd2[1]]));
			} else {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd10", [servantName,atkAdd2[1] * 100 + "%"]));
			}
		}
		
		if (inteAdd2)
		{
			if (inteAdd2[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd11", [servantName,inteAdd2[1]]));
			} else {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd11", [servantName,inteAdd2[1] * 100 + "%"]));
			}
		}

		if (politicsAdd2)
		{
			if (politicsAdd2[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd12", [servantName,politicsAdd2[1]]));
			} else {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd12", [servantName,politicsAdd2[1] * 100 + "%"]));
			}
		}
		
		if (charmAdd2)
		{ 
			if (charmAdd2[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd13", [servantName,charmAdd2[1]]));
			} else {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd13", [servantName,charmAdd2[1] * 100 + "%"]));
			}
		}	

        if(wifeIntimacy && wifeIntimacy > 0){
            resultStr.push( LanguageManager.getlocal("acTailAttrAdd5",[wifeIntimacy.toString()])  );
        }
        if(wifeGlamour && wifeGlamour > 0)  {
            resultStr.push( LanguageManager.getlocal("acTailAttrAdd6",[wifeGlamour.toString()])  );
        }      
        if(childReduce && childReduce > 0){
            resultStr.push( LanguageManager.getlocal("acTailAttrAdd7",[childReduce.toString()])  );
        }
        if(searchReduce && searchReduce > 0){
            resultStr.push( LanguageManager.getlocal("acTailAttrAdd8",[searchReduce.toString()])  );
        }
        if(wifeReduce && wifeReduce > 0){
            resultStr.push( LanguageManager.getlocal("acTailAttrAdd9",[wifeReduce.toString()])  );
        }

        return resultStr;
    }

	private checkRedPoint(){
		//赏赐红点
		// if(Api.wifeVoApi.getGiveRed())
		// {
		// 	if(this._giveDotSp == null)
		// 	{
		// 		this._giveDotSp = BaseBitmap.create("public_dot2");
		// 		this._giveDotSp.x = this._giveBtn.x + this._giveBtn.width - this._giveDotSp.width ;
		// 		this._giveDotSp.y = this._giveBtn.y;
		// 		this.addChildToContainer(this._giveDotSp);
		// 	}
		// 	else
		// 	{
		// 		if(this._giveDotSp)
		// 		{
		// 			this._giveDotSp.visible = true;
		// 		}
		// 	}
		// }
		// else
		// {
		// 	if(this._giveDotSp)
		// 	{
		// 		this._giveDotSp.visible = false;
		// 	}
		// }
		
	}

	private skinHander(){
		let skinId = this._skinId;
		if(!skinId)
		{
			skinId = "";
		}
		this.request(NetRequestConst.REQUEST_WIFE_EQUIP,{wifeId:String(this.param.data.id),wifeSkinId:skinId});
	}
	

	//宠幸之后刷新数据
	protected receiveData(data:{ret:boolean,data:any}):void
	{	
		if(data.ret){
			if(data.data.ret < 0){
				return;
			}
			if(data.data.cmd == NetRequestConst.REQUEST_WIFE_EQUIP){
				this.initState();
				this.hide();
			}
		}
	}

	protected refreshInfoAfterLove(event : egret.Event)
	{
		if(!event.data.ret){
			return;
		}
		let id = this.param.data.id
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		//亲密度
		let IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
		// this._intimateValueText.text = IntimacyValue;

		
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			 "wifeview_namebg","wifeview_namebg","wifeview_bottombg2",
			  "wifeskin_descbg","wifeskin_barbg","wifeskin_bottombg",
			  "tailor_iconBtn","tailor_iconBtn_down",
			  "wifeview_in","wifeview_noget","wifeview_skingetbg"

		]);
	}



	protected getRuleInfo(): string {
		return "wifeskin_description";
	}
	private doGuide()
	{
		this.hide();
	}

	public dispose(): void {
		
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFE_LOVECOM);

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHILD_GUIDE,this.doGuide,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshInfoAfterLove,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshInfoAfterLove,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFE,this.checkRedPoint,this);
		

		this._skinDesc = null;
		this._wifeInfoVo = null;
		this._skinPic = null;

		WifeskinView.wifeId= null;

		this._childScrollItem = null;
		this._scrollList = null;
		this._txtList = [];
		this._skinId = null;
		this._inBB = null;
		this._getText = null;
		this._textBg = null;
		this._noGetBB = null;
		this._droWifeIcon = null;
		this._titleBg = null;
		this._skinBg = null;
		if (this._wifebgParticlegroupName) {
			ResourceManager.destroyRes(this._wifebgParticlegroupName);
			this._wifebgParticlegroupName = null;
		}
		this._bgContainer = null;
		this._itemTab.length = 0;

		super.dispose();
	}
}