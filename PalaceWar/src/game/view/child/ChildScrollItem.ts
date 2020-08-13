/**
 * 子嗣栏位
 * author dky
 * date 2017/10/12
 * @class ChildScrollItem
 */
class ChildScrollItem extends ScrollListItem
{
	// 名字文本
	private _nameTF:BaseTextField;
	// 等级文本
	private _levelTF:BaseTextField;
	// 状态文本
	private _stateTF:BaseTextField;

	private _childIndex:number;

	private _itemBg:BaseBitmap;
	//孩子图片
	private _child_Icon: BaseLoadBitmap;
	//
	private _dataList:ChildInfoVo[] =[];
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,posIndex:number, itemParam?:any):void
	{
		
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTick, this); 

		this.width = 295;
		this.height = 133 + this.getSpaceY();

		let childVoList:ChildInfoVo[] = Api.childVoApi.getChildrenVoList();
		if (itemParam && itemParam.data){
			childVoList = itemParam.data;
			this._dataList = childVoList;
		}

		let childPosNum = Api.childVoApi.getChildPosNum()
		//1孩子 2空闲 3扩展
		let itemType = 1

		if(posIndex+1 <= childVoList.length){
			itemType = 1
		}else if(posIndex+1 > childVoList.length && posIndex+1 <= childPosNum){
			itemType = 2
		}else{
			itemType = 3
		}

		if (itemType == 1){

			// let childInfoVo = childVoList[posIndex];
			let childInfoVo = Api.childVoApi.getChildrenInfoVoById(childVoList[posIndex].id);

			this._itemBg = BaseBitmap.create("childview_bg1");
			this._itemBg.width = this.width;
			this._itemBg.height = this.height;
			this._itemBg.x =  this.width/2 - this._itemBg.width/2;
			this._itemBg.y = this.height/2 - this._itemBg.height/2;
			this._itemBg.name = "bg1";
			this.addChild(this._itemBg);


			let itemBg2:BaseBitmap = BaseBitmap.create("childview_itembg");
			// itemBg2.width = this.width-80;
			// itemBg2.height = this.height-25;
			itemBg2.x =  10;
			itemBg2.y = 12;
			itemBg2.name = "bg2";
			this.addChild(itemBg2);

			this._child_Icon = BaseLoadBitmap.create(Api.childVoApi.getChildPic(childInfoVo.id));
			this._child_Icon.x = 10;
			this._child_Icon.y = 12;
			this._child_Icon.setScale(0.4);
			this.addChild(this._child_Icon);
			// this._child_Icon.setload( Api.childVoApi.getChildPic(childInfoVo.id));
			
			let childName = childInfoVo.name;
			let nameColor = TextFieldConst.COLOR_BLACK;
			if (childName == ""){
				childName = LanguageManager.getlocal("childNeedName");
				nameColor = TextFieldConst.COLOR_WARN_RED;
			}
			this._nameTF = ComponentManager.getTextField( childName,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
			this._nameTF.textColor = nameColor;
			// this._nameTF.text = "mwmwmwmwmwm";
			// if(PlatformManager.checkIsEnLang()){
			// 	this._nameTF.x = 152;
			// } else {
				this._nameTF.x = 160;
			// }
			
			this._nameTF.y = 17;
			this.addChild(this._nameTF);

			let sexStr = LanguageManager.getlocal("child_sex",[LanguageManager.getlocal("child_boy")]);
			if(childInfoVo.sex == 2){
				sexStr = LanguageManager.getlocal("child_sex",[LanguageManager.getlocal("child_girl")]);
			}
			let sexTF = ComponentManager.getTextField( sexStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
			sexTF.x = this._nameTF.x ;
			sexTF.y = this._nameTF.y + this._nameTF.height + 10;
			this.addChild(sexTF);

			let childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
			let levelStr = LanguageManager.getlocal("servant_infoLv") + "：" + + childInfoVo.level + "/" + childCfg.lv
			this._levelTF = ComponentManager.getTextField( levelStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
			// this._levelTF.textColor = nameColor;
			this._levelTF.x = this._nameTF.x ;
			this._levelTF.y = sexTF.y + sexTF.height + 10;
			this.addChild(this._levelTF);

			let vigour = Api.childVoApi.getChildrenVigourById(childInfoVo.id);
			let maxV = Api.vipVoApi.getCurLevelVipCfg().maxVigour;
			let statelStr = LanguageManager.getlocal("childVigour") + "：" + vigour+ "/" + maxV;
			if (childInfoVo.level >= childCfg.lv){
				statelStr = LanguageManager.getlocal("childWaitGrowup")
			}
			this._stateTF = ComponentManager.getTextField( statelStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
			// this._stateTF.textColor = nameColor;
			this._stateTF.x = this._nameTF.x ;
			this._stateTF.y = this._levelTF.y + this._levelTF.height + 10;
			this.addChild(this._stateTF);

		}else if (itemType == 2){
			this._itemBg = BaseBitmap.create("childview_bg1");
			this._itemBg.width = this.width;
			this._itemBg.height = this.height-5;
			this._itemBg.x =  this.width/2 - this._itemBg.width/2;
			this._itemBg.y = this.height/2 - this._itemBg.height/2;
			this.addChild(this._itemBg);
			let itemBg2:BaseBitmap = BaseBitmap.create("childview_itembg");
			// itemBg2.width = this.width-80;
			// itemBg2.height = this.height-25;
			itemBg2.x =  10;
			itemBg2.y = 12;
			itemBg2.name = "bg2";
			this.addChild(itemBg2);

			// let itemBg2:BaseBitmap = BaseBitmap.create("public_9_bg26");
			// itemBg2.width = this.width-80;
			// itemBg2.height = this.height-25;
			// itemBg2.x =  this.width/2 - itemBg2.width/2 + 20;
			// itemBg2.y = this.height/2 - itemBg2.height/2;
			// this.addChild(itemBg2);


			let idleTf  = ComponentManager.getTextField(LanguageManager.getlocal("childItemPosIdle"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
			idleTf.x = 200;
			idleTf.y = this.height/2 - idleTf.height/2;
			this.addChild(idleTf);
		}else{
			this._itemBg = BaseBitmap.create("childview_bg2");
			this._itemBg.width = this.width;
			this._itemBg.height = this.height-10;
			this._itemBg.x =  this.width/2 - this._itemBg.width/2;
			this._itemBg.y = this.height/2 - this._itemBg.height/2;
			this.addChild(this._itemBg);

			// let extendTf  = ComponentManager.getTextField(LanguageManager.getlocal("childExtendItem"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			// extendTf.x = this.width/2;
			// extendTf.y = this.height/2;
			// extendTf.anchorOffsetX = extendTf.width/2;
			// extendTf.anchorOffsetY = extendTf.height/2;
			// this.addChild(extendTf);

			let addIcon = BaseBitmap.create("childview_addicon");

			addIcon.x =  this.width/2 - addIcon.width/2;
			addIcon.y = this.height/2 - addIcon.height/2;
			this.addChild(addIcon);

			// egret.Tween.get(addIcon, {
			// 	loop: true,//设置循环播放
			// }).to({scaleX:0.9,scaleY:0.9},1000).to({scaleX:1,scaleY:1.0},1000);
			

			this._itemBg.addTouch(this.eventHandler,this,null);	
		}	
		
	}
	protected eventHandler(event:egret.TouchEvent)
    {

        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				// this._itemBg.texture = ResourceManager.getRes("public_9_bg28_down");
				break;
            case egret.TouchEvent.TOUCH_CANCEL:
                // this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
			case egret.TouchEvent.TOUCH_END:
				// this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
				break;
        }
    }
	public refreshData(index:number, childId:string)
	{	
		this._childIndex = index;
		// let childVoList:ChildInfoVo[] = Api.childVoApi.getChildrenVoList();
		// let childInfoVo = childVoList[index];
		let childInfoVo = Api.childVoApi.getChildrenInfoVoById(childId);
		let childName = childInfoVo.name;
		let nameColor = TextFieldConst.COLOR_BLACK;
		if (childName == ""){
			childName = LanguageManager.getlocal("childNeedName");
			nameColor = TextFieldConst.COLOR_QUALITY_ORANGE;
		}
		this._nameTF.textColor = nameColor;
		this._nameTF.text = childName;

		let childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
		let levelStr = LanguageManager.getlocal("servant_infoLv") +"：" + childInfoVo.level + "/" + childCfg.lv
		// this._levelTF.textColor = nameColor;
		this._levelTF.text = levelStr;

		let vigour = Api.childVoApi.getChildrenVigourById(childInfoVo.id);
		let maxV = Api.vipVoApi.getCurLevelVipCfg().maxVigour;
		let statelStr = LanguageManager.getlocal("childVigour") + "：" + vigour+ "/" + maxV;
		if (childInfoVo.level >= childCfg.lv){
			statelStr = LanguageManager.getlocal("childWaitGrowup")
		}
		// this._stateTF.textColor = nameColor;
		this._stateTF.text = statelStr;
		// if(this._child_Icon.texture == ){
			this._child_Icon.setload( Api.childVoApi.getChildPic(childInfoVo.id));
		// }
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addTick, this); 
		
	}

	public showEvent():void{
		let servant_upgrade_word = BaseBitmap.create("childeventtitle")
		servant_upgrade_word.x = (this.width - servant_upgrade_word.width) / 2;
		servant_upgrade_word.y = (this.height - servant_upgrade_word.height) / 2;
		this.addChild(servant_upgrade_word);
		egret.Tween.get(servant_upgrade_word,{loop:false}).to({y:servant_upgrade_word.y-50},700).to({alpha:0},100).call(()=>{
			this.removeChild(servant_upgrade_word);
			servant_upgrade_word = null;
		}, this);
	}

	protected tick()
	{
		if(this.parent)
		{
			let childVoList:ChildInfoVo[] = Api.childVoApi.getChildrenVoList();
			if (this._dataList && this._dataList.length > 0){
				childVoList = this._dataList;
			}
			let childInfoVo = null;
			if (childVoList && childVoList[this._childIndex]){
				childInfoVo = Api.childVoApi.getChildrenInfoVoById(childVoList[this._childIndex].id);
			}
			
			if(childInfoVo)
			{
				// let childVoList:ChildInfoVo[] = Api.childVoApi.getChildrenVoList();
				// let childInfoVo = childVoList[this._childIndex];
				let vigour = Api.childVoApi.getChildrenVigourById(childInfoVo.id);
				let maxV = Api.vipVoApi.getCurLevelVipCfg().maxVigour;
				let statelStr = LanguageManager.getlocal("childVigour") + "：" + vigour+ "/" + maxV;
				let childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
				if (childInfoVo.level >= childCfg.lv){
					statelStr = LanguageManager.getlocal("childWaitGrowup")
				}
				// this._stateTF.textColor = nameColor;
				this._stateTF.text = statelStr;
			}
			
		}
	}

	private addTick()
	{
		TickManager.addTick(this.tick,this)
	}

	private removeTick()
	{
		TickManager.removeTick(this.tick,this)
	}

	public getSpaceX():number
	{
		return 5;
	}
	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{
		// 名字文本
		this._nameTF = null;
		// 等级文本
		this._levelTF = null;
		// 状态文本
		this._stateTF = null;

		this._childIndex = null;
		this._child_Icon = null;
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addTick, this); 
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTick, this); 
		this._itemBg.removeTouch();
		this._itemBg = null;
		this._dataList = [];
		super.dispose();
	}
}