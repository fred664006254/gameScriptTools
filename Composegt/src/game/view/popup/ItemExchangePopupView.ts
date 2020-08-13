/**
 * 道具使用弹板
 * author jiangliuyang
 * date 2019/7/1
 * @class ItemExchangePopupView
 */
class ItemExchangePopupView  extends PopupView
{
	private _useCallback:Function;
	private _handler:any;
	private _useNum:number = 1;
	private _selectedNumTF:BaseTextField;
	private _maxNumTF:BaseTextField;
	private _maxNum:number = 0;
	private _numBg:BaseBitmap;
	private _sendId:number = 0;
	private _curScoreTxt:BaseTextField;
	private _curScoreStrKey:string;
	private _ownScore:number = 0;
	private _needScore:number = 0;
	private _curScoreBg:BaseBitmap;
	

	public constructor() 
	{
		super();
	}
	
	protected initView():void
	{
		let itemRewardId:string = this.param.data.itemRewardId
		let itemReward:RewardItemVo[] =  GameData.formatRewardItem(itemRewardId);//GameData.getItemIcon(itemCfg,true);
		let itemId = itemReward[0].id;
		let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
		this._useCallback = this.param.data.callback;
		this._handler = this.param.data.handler;
		this._sendId = this.param.data.sendId;
		this._ownScore = this.param.data.ownScore;
		this._needScore = this.param.data.needScore;
		this._curScoreStrKey = this.param.data.curScoreStrKey;
		// let itemName:string = itemInfoVo.name;
		// let iconPic:string = itemInfoVo.icon;
		// let effectDesc:string = itemInfoVo.desc;
		// this._maxNum = itemInfoVo.num;
		if(this.param.data.maxNum){
			this._maxNum = this.param.data.maxNum;//Math.min(this.param.data.maxNum,Api.itemVoApi.getItemNumInfoVoById(itemId));
		} 
		if(this._maxNum >100)
		{
			this._maxNum = 100;
		}
        let haveNum = Api.itemVoApi.getItemNumInfoVoById(itemId);

		let effectTitle:string = LanguageManager.getlocal("effectTitle");

		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 528;
		bg.height = 292+15;
		bg.setPosition((this.viewBg.width-bg.width)/2,10);
		this.addChildToContainer(bg);

		let txtBg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		txtBg.width = 502;
		txtBg.height = 145;
		txtBg.setPosition(bg.x+(bg.width-txtBg.width)/2,bg.y+10);
		this.addChildToContainer(txtBg);

		let leftF = BaseBitmap.create("public_tcdw_bg01");
		leftF.x = txtBg.x + 5 ;
		leftF.y = 20;
		this.addChildToContainer(leftF);

		let rightF = BaseBitmap.create("public_tcdw_bg02");
		rightF.x = txtBg.x + txtBg.width - rightF.width - 5 ;
		rightF.y = 20;
		this.addChildToContainer(rightF);


		let temX = 35;
		let temY = 23;
		let temW = 100;
		let temH = 100;

		// let itembg:BaseBitmap = BaseBitmap.create(itemInfoVo.iconBg);
		// // itembg.x = temX
		// // itembg.y = temY;
		// itembg.setPosition(txtBg.x+10,txtBg.y+(txtBg.height-itembg.height)/2);
		// this.addChildToContainer(itembg);
		
		//点击物品增加文字说明 添加物品iconitem
		let itemCfg : Config.ItemItemCfg|RewardItemVo  = Config.ItemCfg.getItemCfgById(Number(itemId));
        // let itemCfg : Config.ItemItemCfg  = Config.ItemCfg.getItemCfgById(Number(itemId));
		if(!itemCfg){
			itemCfg = GameData.getRewardItemVoByIdAndType(itemId);
		}
		let iconItem = GameData.getItemIcon(itemCfg,true);
		let numLb = iconItem.getChildByName("numLb");
		if(numLb){
			numLb.visible = false;
		}
		
		// iconItem.x =  temX;
		// iconItem.y =  temY;
		iconItem.setPosition(txtBg.x+10,txtBg.y+(txtBg.height-iconItem.height)/2);
		this.addChildToContainer(iconItem);

		let numTF:BaseTextField = ComponentManager.getTextField(haveNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);;
		// numTF.x = temX + iconItem.width - numTF.width - 5;
		// numTF.y = temY + iconItem.height - numTF.height - 5;
		numTF.setPosition(iconItem.x + iconItem.width - 5 - numTF.width,iconItem.y + iconItem.height - 5 - numTF.height);
		this.addChildToContainer(numTF);
		
		

		// let bg1:BaseBitmap = BaseBitmap.create("public_9_bg1");
		// bg1.width = 387;
		// bg1.height = temH;
		// bg1.x = temX + temW + 10;
		// bg1.y = temY;
		// this.addChildToContainer(bg1);

		let nameTF:BaseTextField = ComponentManager.getTextField(itemCfg.name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTF.setColor(TextFieldConst.COLOR_BROWN_NEW);
		nameTF.setPosition(iconItem.x + iconItem.width + 10,iconItem.y + 3);
		this.addChildToContainer(nameTF);

		let offY:number=nameTF.y+nameTF.height;
		let effectDescTF:BaseTextField = itemCfg.getDescTxt(true);
		// effectDescTF.x = nameTF.x;
		// effectDescTF.y = nameTF.y + nameTF.height + 5;
		// effectDescTF.width = 366;
		effectDescTF.width=txtBg.width-iconItem.x+txtBg.x-iconItem.width-10-10;
		effectDescTF.setPosition(nameTF.x,offY+10);
		this.addChildToContainer(effectDescTF);

		let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress4tc_01","progress4tc_02",this._maxNum,this.dragCallback,this,null,null,220);
		// dragProgressBar.width = 300;
		dragProgressBar.x = temX + 110;
		dragProgressBar.y = txtBg.y + txtBg.height + 60;
		this.addChildToContainer(dragProgressBar);

		this._numBg = BaseBitmap.create("public_9_bg5");
		this._numBg.width = 90;
		this._numBg.x = bg.x + bg.width - 10 - this._numBg.width;
		this._numBg.y = txtBg.y + txtBg.height + 45;
		this.addChildToContainer(this._numBg);

		this._selectedNumTF = ComponentManager.getTextField(this._useNum + "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
		this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
		
		this._selectedNumTF.y = this._numBg.y + this._numBg.height/2 - this._selectedNumTF.height/2;
		this.addChildToContainer(this._selectedNumTF);

		this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
		// this._maxNumTF.x = this._numBg.x + this._numBg.width/2;
		this._maxNumTF.y = this._numBg.y + this._numBg.height/2 - this._maxNumTF.height/2;
		this.addChildToContainer(this._maxNumTF);
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;

		let curScoreBg = BaseBitmap.create("public_tc_bg06");
		curScoreBg.height = 40;
		curScoreBg.width = 250;
		curScoreBg.x = bg.x + bg.width/2 - curScoreBg.width/2;
		curScoreBg.y = bg.y + bg.height - 10 - curScoreBg.height;
		this.addChildToContainer(curScoreBg);
		this._curScoreBg = curScoreBg;
		curScoreBg.visible = false;

		this._curScoreTxt = ComponentManager.getTextField(LanguageManager.getlocal(this._curScoreStrKey,[this._needScore.toString(),this._ownScore.toString()]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._curScoreTxt.x = curScoreBg.x + curScoreBg.width/2 - this._curScoreTxt.width/2;
		this._curScoreTxt.y = curScoreBg.y + curScoreBg.height/2 - this._curScoreTxt.height/2;
		this.addChildToContainer(this._curScoreTxt);

		let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"useBtn",this.useHandler,this);
		useBtn.x = bg.x + bg.width/2 - useBtn.width * useBtn.scaleX/2;
		useBtn.y = bg.y + bg.height + 15;
		// useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(useBtn);
	}

	private dragCallback(curNum:number):void
	{
		this._useNum = curNum;
		this._selectedNumTF.text = this._useNum + "";
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
		this._curScoreTxt.text = LanguageManager.getlocal(this._curScoreStrKey,[String(this._useNum * this._needScore),this._ownScore.toString()]);
		this._curScoreTxt.x = this._curScoreBg.x + this._curScoreBg.width/2 - this._curScoreTxt.width/2;
		this._curScoreTxt.y = this._curScoreBg.y + this._curScoreBg.height/2 - this._curScoreTxt.height/2;
	}
	// protected getContainerY():number
	// {
	// 	return 0;
	// }

	private useHandler(param:any):void
	{
		this._useCallback.apply(this._handler,[this._useNum,this._sendId]);
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				// "progress2_bg","progress2"
				"progress4tc_01","progress4tc_02"
		]);
	}

	public dispose():void
	{
		this._useCallback = null;
		this._useNum = 1;
		if(this._selectedNumTF)
		{
			this.removeChildFromContainer(this._selectedNumTF);
			this._selectedNumTF.dispose();
			this._selectedNumTF = null;
		}
		if(this._maxNumTF)
		{
			this.removeChildFromContainer(this._maxNumTF);
			this._maxNumTF.dispose();
			this._maxNumTF = null;
		}
		this._maxNum = 0;
		if(this._numBg)
		{
			this.removeChildFromContainer(this._numBg);
			this._numBg.dispose();
			this._numBg = null;
		}


		this._sendId = 0;
		this._curScoreTxt = null;
		this._curScoreStrKey = null;
		this._ownScore = 0;
		this._needScore = 0;
		this._curScoreBg = null;
		this._handler = null;
		super.dispose();
	}
}