/**
 * 道具使用弹板
 * author shaoliang
 * date 2019/10/30
 * @class LadderItemUsePopupView
 */
class LadderItemUsePopupView  extends PopupView
{
	private _type:number = 0;
	private _useNum:number = 1;
	private _selectedNumTF:BaseTextField;
	private _maxNumTF:BaseTextField;
	private _maxNum:number = 0;
	private _numBg:BaseBitmap = null;;

	private _buffCfg:Config.AcCfg.LTBuffCfg = null;
	private _buffEffectTF:BaseTextField = null;
	public constructor() 
	{
		super();
	}

	protected getTitleStr():string
	{
		return "acLadder_useritem_title";
    }

	protected initView():void
	{   
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE,this.hide,this);
		this._type = this.param.data.type;
        this._buffCfg = Api.laddertournamentVoApi.cfg.buffList["1"];
		
		let itemId:number = Number(this._buffCfg.needItem);
		let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);

		let itemName:string = itemInfoVo.name;

		this._maxNum = Api.itemVoApi.getItemNumInfoVoById(itemId)
		if(this._maxNum >100)
		{
			this._maxNum = 100;
		}

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 245;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

		let temX = 35+GameData.popupviewOffsetX;
		let temY = 23;
		let temW = 100;
		let temH = 100;

		let itembg:BaseBitmap = BaseBitmap.create(itemInfoVo.iconBg);
		itembg.x = temX
		itembg.y = temY;
		this.addChildToContainer(itembg);
		
		//点击物品增加文字说明 添加物品iconitem
		let itemCfg : any  = Config.ItemCfg.getItemCfgById(Number(itemId));
		if(!itemCfg){
			itemCfg = GameData.getRewardItemVoByIdAndType(itemId);
		}
		let iconItem = GameData.getItemIcon(itemCfg,true,null,null,itemInfoVo.num);
		iconItem.x =  temX;
		iconItem.y =  temY;
		this.addChildToContainer(iconItem);

		// let numTF:BaseTextField = ComponentManager.getTextField(itemInfoVo.num.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);;
		// numTF.x = temX + itembg.width - numTF.width - 5;
		// numTF.y = temY + itembg.height - numTF.height - 5;
		// this.addChildToContainer(numTF);
		
		

		let bg1:BaseBitmap = BaseBitmap.create("public_9_bg1");
		bg1.width = 387;
		bg1.height = temH;
		bg1.x = temX + temW + 10;
		bg1.y = temY;
		this.addChildToContainer(bg1);

		let nameTF:BaseTextField = ComponentManager.getTextField(itemName,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTF.setColor(TextFieldConst.COLOR_LIGHT_RED);
		nameTF.x = bg1.x + 8;
		nameTF.y = bg1.y + 8;
		this.addChildToContainer(nameTF);


		let effectDescTF:BaseTextField = itemInfoVo.getDescTxt(true);
		effectDescTF.x = nameTF.x;
		effectDescTF.y = nameTF.y + nameTF.height + 5;
		effectDescTF.width = 366;
		this.addChildToContainer(effectDescTF);

		let descBg:BaseBitmap = BaseBitmap.create("godbless_tip_bg2");
		descBg.setPosition(this.viewBg.width/2 - descBg.width, itembg.y+itembg.height+8);
		this.addChildToContainer(descBg);

		let descBg2:BaseBitmap = BaseBitmap.create("godbless_tip_bg2");
		descBg2.scaleX = -1;
		descBg2.setPosition(this.viewBg.width/2+descBg2.width, descBg.y);
		this.addChildToContainer(descBg2);

		let times = this._buffCfg.effectNum *this._useNum;
		let buffTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_buff_item_times",[String(times)]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		buffTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		buffTF.x = this.viewBg.width/2 - buffTF.width/2;
		buffTF.y = descBg.y +descBg.height/2-buffTF.height/2;
		this.addChildToContainer(buffTF);
		this._buffEffectTF = buffTF;


		let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress2_bg",this._maxNum,this.dragCallback,this);
		dragProgressBar.x = temX + 55;
		dragProgressBar.y = bg1.y + bg1.height + 67;
		this.addChildToContainer(dragProgressBar);

		this._numBg = BaseBitmap.create("public_9_bg5");
		this._numBg.width = 90;
		this._numBg.x = bg.x + bg.width - 10 - this._numBg.width;
		this._numBg.y = bg1.y + bg1.height + 60;
		this.addChildToContainer(this._numBg);

		this._selectedNumTF = ComponentManager.getTextField(this._useNum + "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
		this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
		
		this._selectedNumTF.y = this._numBg.y + this._numBg.height/2 - this._selectedNumTF.height/2;
		this.addChildToContainer(this._selectedNumTF);

		this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
		this._maxNumTF.y = this._numBg.y + this._numBg.height/2 - this._maxNumTF.height/2;
		this.addChildToContainer(this._maxNumTF);
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;

		let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"useBtn",this.useHandler,this);
		useBtn.x = bg.x + bg.width/2 - useBtn.width/2;
		useBtn.y = bg.y + bg.height + 15;
		useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(useBtn);
	}

	private dragCallback(curNum:number):void
	{
		this._useNum = curNum;
		this._selectedNumTF.text = this._useNum + "";
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;

		let times = this._buffCfg.effectNum * this._useNum;
		this._buffEffectTF.text = LanguageManager.getlocal("acLadder_buff_item_times",[String(times)]);
		this._buffEffectTF.x = this.viewBg.width/2 - this._buffEffectTF.width/2;
	}

	private useHandler(param:any):void
	{	
		if (Api.laddertournamentVoApi.acVo.checkIsInEndShowTime()) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			this.hide();
			return;
		}

		NetManager.request(NetRequestConst.REQUEST_LT_ADDBUFF,{activeId:Api.laddertournamentVoApi.aidAndCode,team:this._type,rkey:this._buffCfg.id,num:this._useNum});
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"progress2_bg","progress2","godbless_tip_bg2"
		]);
	}

	protected getBgExtraHeight():number
	{
		return 20;
	}


	public dispose():void
	{	
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE,this.hide,this);
		this._useNum = 1;
		this._buffCfg = null;
		this._buffEffectTF = null;
		this._selectedNumTF = null;
		this._maxNumTF = null;
		this._maxNum = 0;
		this._numBg = null;
		this._type = 0;

		super.dispose();
	}
}