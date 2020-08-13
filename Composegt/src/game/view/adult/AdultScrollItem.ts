/**
 * 成年子嗣栏位
 * author dky
 * date 2017/10/28
 * @class AdultScrollItem
 */
class AdultScrollItem extends ScrollListItem
{
	// 名字文本
	private _nameTF:BaseTextField;
	// 身份文本
	private _qualityTF:BaseTextField;
	// 属性文本
	private _attrTF:BaseTextField;

	private _childIndex:number;

	private _itemBg:BaseBitmap;

	private _inMarryBB:BaseBitmap;

	private _adultInfo:AdultInfoVo;

	public constructor() 
	{
		super();
	}

	public initItem(index:number,adultInfoVo:AdultInfoVo):void
	{	
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addTick, this); 
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTick, this); 


		// this._childIndex = posIndex;

		this.width = 604;
		this.height = 45 + this.getSpaceY();

		let adultVoList:AdultInfoVo[] = Api.adultVoApi.getAdultVoList();

		// let adultPosNum = Api.adultVoApi.getChildPosNum()
		//1孩子 2空闲 3扩展
		let itemType = 1

		// if(posIndex+1 <= adultVoList.length){
		// 	itemType = 1
		// }else if(posIndex+1 > adultVoList.length && posIndex+1 <= adultPosNum){
		// 	itemType = 2
		// }

			// let adultInfoVo = adultVoList[posIndex];

		this._itemBg = BaseBitmap.create("adult_listbg3");
		this._itemBg.width = 590;
		this._itemBg.height = 40;
		this._itemBg.x =  this.width/2 - this._itemBg.width/2;
		this._itemBg.y = this.height/2 - this._itemBg.height/2;
		this.addChild(this._itemBg);

		let childSexPic = "childview_boyicon";
		if(adultInfoVo.sex == 2){
			childSexPic = "childview_girlicon";	
		}

		let childIcon:BaseBitmap = BaseBitmap.create(childSexPic);
		childIcon.x =  17;
		childIcon.y = this.height/2 - childIcon.height/2;
		this.addChild(childIcon);

		// let itemBg2:BaseBitmap = BaseBitmap.create("adult_shuxingtiao");
		// // itemBg2.width = this.width-80;
		// itemBg2.height = this.height-25;
		// itemBg2.x =  60;
		// itemBg2.y = this.height/2 - itemBg2.height/2;
		// // itemBg2.name = "bg2";
		// this.addChild(itemBg2);

		// let itemBg3:BaseBitmap = BaseBitmap.create("adult_shuxingtiao");
		// // itemBg3.width = this.width-80;
		// itemBg3.skewY = 180;
		// itemBg3.height = this.height-25;
		// itemBg3.x =  itemBg2.x + itemBg2.width*2;
		// itemBg3.y = this.height/2 - itemBg3.height/2;
		// itemBg3.name = "bg2";
		// this.addChild(itemBg3);
		
		let childName = adultInfoVo.name;
		let nameColor = TextFieldConst.COLOR_BROWN;
		if (childName == ""){
			childName = LanguageManager.getlocal("childNeedName");
			nameColor = TextFieldConst.COLOR_WARN_RED;
		}
		this._nameTF = ComponentManager.getTextField( childName,TextFieldConst.FONTSIZE_TITLE_SMALL);
		this._nameTF.textColor = nameColor;
		this._nameTF.x = 70;
		this._nameTF.y = this.height/2 - this._nameTF.height/2;
		this.addChild(this._nameTF);


		let qualityStr = LanguageManager.getlocal("adult_quality") + LanguageManager.getlocal("adult_quality" + adultInfoVo.aquality);
		this._qualityTF = ComponentManager.getTextField( qualityStr,TextFieldConst.FONTSIZE_TITLE_SMALL);
		this._qualityTF.textColor = nameColor;
		this._qualityTF.x = 220;
		if(PlatformManager.checkIsViSp()){
			this._qualityTF.x = 175;
		}
		this._qualityTF.y = this.height/2 - this._qualityTF.height/2;
		this.addChild(this._qualityTF);


		let attrStr = LanguageManager.getlocal("servant_infoAttr") + adultInfoVo.attrVo.attTotal;

		this._attrTF = ComponentManager.getTextField( attrStr,TextFieldConst.FONTSIZE_TITLE_SMALL);
		this._attrTF.textColor = nameColor;
		this._attrTF.x = 410;
		this._attrTF.y = this.height/2 - this._attrTF.height/2;
		this.addChild(this._attrTF);
		if(adultInfoVo.visit){
			this._attrTF.textColor = TextFieldConst.COLOR_WARN_GREEN;
		}

		this._inMarryBB = BaseBitmap.create((adultInfoVo.pro && adultInfoVo.pro[1] == 3) ? "adultvisiting" : "adult_inmarry");


		//提亲中 的image  英文为长条在每个格子的右上角
		if(PlatformManager.checkIsTextHorizontal()){
			this._inMarryBB.x = this.width - this._inMarryBB.width -5;
			// this._inMarryBB.y = this.height/2 - this._inMarryBB.height/2;
			this._inMarryBB.y = this._itemBg.y
		} else {
			this._inMarryBB.x =  this.width - this._inMarryBB.width - 3;
			this._inMarryBB.y = this.height/2 - this._inMarryBB.height/2;
		}


		this.addChild(this._inMarryBB);

		let lastTime = 0;
		if(adultInfoVo.pro && adultInfoVo.pro[0]){
			
			lastTime = adultInfoVo.pro[0] - GameData.serverTime;
		}

		if(lastTime > 0){
			this._inMarryBB.visible = true;
		}else{
			this._inMarryBB.visible = false;
		}

		
		
	}
	protected eventHandler(event:egret.TouchEvent)
    {

        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				this._itemBg.texture = ResourceManager.getRes("public_9_bg28_down");
				break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
			case egret.TouchEvent.TOUCH_END:
				this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
				break;
        }
    }
	public refreshData(index:number)
	{	
		this._childIndex = index;
		let adultVoList:AdultInfoVo[] = Api.adultVoApi.getAdultVoList();
		let childInfoVo = adultVoList[index];
		let childName = childInfoVo.name;
		this._nameTF.text = childName;
		if(childInfoVo)
			{
				let lastTime = 0;
				if(childInfoVo.pro && childInfoVo.pro[0]){
					this._inMarryBB.setRes(childInfoVo.pro[1] == 3 ? "adultvisiting" : "adult_inmarry");
					lastTime = childInfoVo.pro[0] - GameData.serverTime;
				}

				if(lastTime > 0){
					this._inMarryBB.visible = true;
				}else{
					this._inMarryBB.visible = false;
				}
			}


	}

	protected tick()
	{
		// if(this.parent)
		// {
			// let adultVoList:AdultInfoVo[] = Api.adultVoApi.getAdultVoList();
			let childInfoVo = this._adultInfo;
			if(childInfoVo)
			{
				let lastTime = 0;
				if(childInfoVo.pro && childInfoVo.pro[0]){
					
					lastTime = childInfoVo.pro[0] - GameData.serverTime;
				}

				if(lastTime > 0){
					this._inMarryBB.visible = true;
				}else{
					this._inMarryBB.visible = false;
				}
			}
			
		// }
	}
	private addTick()
	{
		TickManager.addTick(this.tick,this)
	}

	private removeTick()
	{
		TickManager.removeTick(this.tick,this)
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
		this._qualityTF = null;
		// 状态文本
		this._attrTF = null;

		this._childIndex = null;
		this._itemBg.removeTouch();
		this._itemBg = null;

		this._inMarryBB = null;

		this._adultInfo = null;
		super.dispose();
	}
}