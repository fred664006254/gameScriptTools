/**
 * 道具使用弹板
 * author dmj
 * date 2017/9/25
 * @class ItemUsePopupView
 */
class ItemUsePopupView  extends PopupView
{
	private _useCallback:Function;
	private _handler:any;
	private _useNum:number = 1;
	private _selectedNumTF:BaseTextField;
	private _maxNumTF:BaseTextField;
	private _maxNum:number = 0;
	private _numBg:BaseBitmap;
	private _useBtn: BaseButton;
	public constructor() 
	{
		super();
	}
	// protected getBgExtraHeight():number
	// {
	// 	// return 20;
	// }
	protected initView():void
	{
		let itemId:number = this.param.data.itemId
		let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
		this._useCallback = this.param.data.callback;
		this._handler = this.param.data.handler;
		let itemName:string = itemInfoVo.name;
		let iconPic:string = itemInfoVo.icon;
		let effectDesc:string = itemInfoVo.desc;
		this._maxNum = itemInfoVo.num;
		if(this.param.data.maxNum){
			this._maxNum = Math.min(this.param.data.maxNum,Api.itemVoApi.getItemNumInfoVoById(itemId));
		} 
		if(this._maxNum >100)
		{
			this._maxNum = 100;
		}
		let effectTitle:string = LanguageManager.getlocal("effectTitle");

		let bg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		bg.width = 530;
		bg.height = 560;
		bg.setPosition((this.viewBg.width-bg.width)/2,10);
		this.addChildToContainer(bg);


        let itemBg = BaseBitmap.create("itemview_daoju_bg02");
        itemBg.x = this.viewBg.width/2 - itemBg.width/2;
        itemBg.y = 10;
        this.addChildToContainer(itemBg);

		// let txtBg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		// txtBg.width = 502;
		// txtBg.height = 145;
		// txtBg.setPosition(bg.x+(bg.width-txtBg.width)/2,bg.y+10);
		// this.addChildToContainer(txtBg);

		// let leftF = BaseBitmap.create("public_tcdw_bg01");
		// leftF.x = txtBg.x + 5 ;
		// leftF.y = 20;
		// this.addChildToContainer(leftF);

		// let rightF = BaseBitmap.create("public_tcdw_bg02");
		// rightF.x = txtBg.x + txtBg.width - rightF.width - 5 ;
		// rightF.y = 20;
		// this.addChildToContainer(rightF);


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
		let itemCfg : any  = Config.ItemCfg.getItemCfgById(Number(itemId));
		if(!itemCfg){
			itemCfg = GameData.getRewardItemVoByIdAndType(itemId);
		}
		let iconItem = GameData.getItemIcon(itemCfg,true);
		// iconItem.x =  temX;
		// iconItem.y =  temY;
		// iconItem.setPosition(txtBg.x+10,txtBg.y+(txtBg.height-iconItem.height)/2);
		iconItem.x = itemBg.x + itemBg.width/2 - iconItem.width/2;
		iconItem.y = itemBg.y + itemBg.height/2 - iconItem.height/2;
		this.addChildToContainer(iconItem);

		let numTF:BaseTextField = ComponentManager.getTextField(itemInfoVo.num.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);;
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

        let namebg = BaseBitmap.create("public_ts_bg01");
		// namebg.x = 225;
        // namebg.width = 158;
		// namebg.y = itemBg.y + itemBg.height + 3;
		this.addChildToContainer(namebg);

		let nameTF:BaseTextField = ComponentManager.getTextField(itemName,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTF.setColor(TextFieldConst.COLOR_BROWN_NEW);
		nameTF.setPosition(this.viewBg.width/2 - nameTF.width/2,itemBg.y + itemBg.height +10);
		this.addChildToContainer(nameTF);

		namebg.width = nameTF.width + 120;
		namebg.x = nameTF.x + nameTF.width/2 - namebg.width/2;
		namebg.y = nameTF.y + nameTF.height/2 - namebg.height/2;



		let offY:number=nameTF.y+nameTF.height;
		let effectDescTF:BaseTextField = itemInfoVo.getDescTxt(true);
		// effectDescTF.x = nameTF.x;
		// effectDescTF.y = nameTF.y + nameTF.height + 5;
		// effectDescTF.width = 366;
		effectDescTF.width = effectDescTF.width > 460?460:effectDescTF.width; //txtBg.width-iconItem.x+txtBg.x-iconItem.width-10-10;
		effectDescTF.setPosition(this.viewBg.width / 2 - effectDescTF.width/2,namebg.y + namebg.height + 20);
		this.addChildToContainer(effectDescTF);


		// if(effectDescTF.height>100)
		// {
		// 	txtBg.height = 145 + (effectDescTF.height - 86)
		// 	iconItem.setPosition(txtBg.x+10,txtBg.y+(txtBg.height-iconItem.height)/2);
		// 	console.log(effectDescTF.height)
		// }

		
		// progress_type1_yellow2   progress_type3_bg
		let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress_type1_yellow2","progress_type3_bg",this._maxNum,this.dragCallback,this,null,1,220);
		// dragProgressBar.width = 300;
		dragProgressBar.x = temX + 110;
		dragProgressBar.y = bg.y + bg.height - 215;//effectDescTF.y + effectDescTF.height + 35;
		this.addChildToContainer(dragProgressBar);

		this._numBg = BaseBitmap.create("public_tc_srkbg06");
		this._numBg.width = 100;
		this._numBg.height = 40;
		this._numBg.x = bg.x + bg.width - 20 - this._numBg.width;
		this._numBg.y = dragProgressBar.y - 9 ;
		this.addChildToContainer(this._numBg);

		this._selectedNumTF = ComponentManager.getTextField(this._useNum + "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
		this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW_NEW);
		
		this._selectedNumTF.y = this._numBg.y + this._numBg.height/2 - this._selectedNumTF.height/2;
		this.addChildToContainer(this._selectedNumTF);

		this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
		// this._maxNumTF.x = this._numBg.x + this._numBg.width/2;
		this._maxNumTF.y = this._numBg.y + this._numBg.height/2 - this._maxNumTF.height/2;
		this.addChildToContainer(this._maxNumTF);
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;

		let line = BaseBitmap.create("public_line4");
		line.width = 500;
		line.x = this.viewBg.width/2 - line.width/2;
		line.y = bg.y + bg.height - 160;//dragProgressBar.y + dragProgressBar.height + 25;
		this.addChildToContainer(line);

		let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"useBtn",this.useHandler,this);
		useBtn.x = bg.x + bg.width/2 - useBtn.width * useBtn.scaleX/2;
		useBtn.y = bg.y + bg.height - 50 - useBtn.height;// line.y + line.height + 40;
		// useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(useBtn);
		this._useBtn = useBtn;
		this._useBtn.setGray(this._useNum == 0);
	}

	private dragCallback(curNum:number):void
	{
		this._useNum = curNum;
		this._selectedNumTF.text = this._useNum + "";
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;

		this._useBtn.setGray(this._useNum == 0);
	}
	// protected getContainerY():number
	// {
	// 	return 0;
	// }

	private useHandler(param:any):void
	{
		if (this._useNum == 0) return;
		this._useCallback.apply(this._handler,[this._useNum,this.param.data.itemId]);
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				// "progress2_bg","progress2"
				"progress4tc_01","progress4tc_02",
				"itemview_daoju_bg02",
				"progress_type3_bg",
				"progress_type1_yellow2",
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
		this._handler = null;
		super.dispose();
	}
}