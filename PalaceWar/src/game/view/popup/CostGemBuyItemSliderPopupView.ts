/**
 * 商城购买二次提示面板
 * author 张朝阳
 * date 2018/7/2
 * @class CostGemBuyItemSliderPopupView
 */
class CostGemBuyItemSliderPopupView  extends PopupView
{
	/**	购买回调 */
	private _confirmCallback:Function = null;
	/** 当前指向的函数 */
	private _handler:any = null;
	/** 买的数量 */
	private _buyNum:number = 1;
	/** 显示TF */
	private _selectedNumTF:BaseTextField = null;
	/** 最大购买数量 */
	private _maxNum:number = 0;
	/** 显示的bg */
	private _numBg:BaseBitmap = null;
	/** 提示的TF */
	private _messageTF:BaseTextField = null;
	/** 取消购买的Btn */
	private _cancelBtn:BaseButton = null;
	/** 大的BG */
	private _bg:BaseBitmap = null;
	/**
	 * 所持有的数量
	 */
	private _playerNum:number = 0;
	/**
	 * 商品的数量
	 */
	private _shopItemCost:any = 0;
	/**
	 * 商品的名字
	 */
	private _shopItemName:string = null;
	/**
	 * data用于Shopnewcfg的配置数据
	 */
	private _data:any = null;
	/**
	 * 适用于shopnewcfg
	 */
	private _costSum:number = 0;
	/**
	 * 滑动条
	 */
	private _dragProgressBar:DragProgressBar = null;

	private _tipTF:BaseTextField = null;
	public constructor() 
	{
		super();
	}
	/**
	 * 入口函数
	 */
	protected initView():void
	{
		let data = this.param.data;
        if(data.data != null)
		{
			this._data = data.data;

		}
		//商品的cfg
		// this._shopItemCfg = data.shopItemCfg;
		//消耗物品的cfg
		let itemCfg : any  = Config.ItemCfg.getItemCfgById(Number(data.id));
		if(!itemCfg){
			itemCfg = GameData.getRewardItemVoByIdAndType(data.id);
		}
		//
		this._playerNum = data.playerNum;
		if(data.maxNum > 0)
			this._maxNum = data.maxNum;
		else
			this._maxNum = 100;

		this._shopItemCost = data.shopItemCost;
		this._shopItemName = data.shopItemName;
		this._confirmCallback = data.confirmCallback;
		this._handler = data.handler;


		this._bg = BaseBitmap.create("public_9_bg4");
		this._bg.width = 520;
		this._bg.height = 224;
		this._bg.setPosition(this.viewBg.x + this.viewBg.width/2 - this._bg.width/2,9);
		this.addChildToContainer(this._bg);
		let msgKey = null
		if(this._shopItemCost > this._playerNum)
		{
			msgKey = "shopBuyUseGemNotEnough";
		}
		else
		{
			msgKey = "shopBuyUseGem";
		}
		let message:string = LanguageManager.getlocal(msgKey,[String(this._shopItemCost),String(this._buyNum),this._shopItemName]);
		this._messageTF = ComponentManager.getTextField(message,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		if(PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang()){
			this._messageTF.width = 450;
			this._messageTF.textAlign = egret.HorizontalAlign.CENTER;
		}
		this._messageTF.setPosition(this._bg.x + this._bg.width / 2 - this._messageTF.width / 2,this._bg.y + this._bg.height / 2 - this._messageTF.height - 40);
		this.addChildToContainer(this._messageTF);
		if(PlatformManager.checkIsPtLang()){
			this._messageTF.y = this._bg.y + this._bg.height / 2 - this._messageTF.height - 60;
		}

		if (this._data&&this._data.buyCost&&this._data.buyCost.length > 1) {
			this._tipTF = ComponentManager.getTextField(LanguageManager.getlocal("CostGemBuyItemSliderPopupViewTip"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED2);
			if(PlatformManager.checkIsPtLang()){
				this._tipTF.width = 450;
				this._tipTF.textAlign = egret.HorizontalAlign.CENTER;
			}
			this._tipTF.setPosition(this._messageTF.x + this._messageTF.width / 2 - this._tipTF.width / 2,this._messageTF.y + this._messageTF.height + 5);
			this.addChildToContainer(this._tipTF);
		}
		

		this._dragProgressBar = ComponentManager.getDragProgressBar("progress2","progress2_bg",this._maxNum,this.dragCallback,this);
		this._dragProgressBar.setPosition(this._bg.x + 70,this._bg.y + this._bg.height - this._dragProgressBar.height - 70);
		this.addChildToContainer(this._dragProgressBar);

		this._numBg = BaseBitmap.create("public_9_bg5");
		this._numBg.width = 90;
		this._numBg.setPosition( this._bg.x + this._bg.width - 10 - this._numBg.width,this._dragProgressBar.y + this._dragProgressBar.height / 2 - this._numBg.height / 2 - 5);
		this.addChildToContainer(this._numBg);

		let numStr = String(this._buyNum) + "/" + String(this._maxNum);
		this._selectedNumTF = ComponentManager.getTextField(numStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW);
		this._selectedNumTF.setPosition(this._numBg.x + this._numBg.width / 2 - this._selectedNumTF.width / 2,this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2);
		this.addChildToContainer(this._selectedNumTF);

		let cur_have = LanguageManager.getlocal("itemUseNewTip",[itemCfg.name,String(this._playerNum)]);
		let cur_haveTF:BaseTextField = ComponentManager.getTextField(cur_have,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		cur_haveTF.setPosition(this._bg.x + this._bg.width / 2 - cur_haveTF.width / 2,this._bg.y + this._bg.height - cur_haveTF.height - 30);
		this.addChildToContainer(cur_haveTF);
		
		//取消按钮
		this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"cancelBtn",this.clickCancelHandler,this);
		this._cancelBtn.x = this.viewBg.x + this.viewBg.width/4 - this._cancelBtn.width/2 + 23;
		this._cancelBtn.y = this._bg.y + this._bg.height + 15;
		this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._cancelBtn);

	}
	/**
	 * 滑动条的监听事件
	 */
	private dragCallback(curNum:number):void
	{
		this._buyNum = curNum;
		if(this._buyNum == 0)
		{
			this._dragProgressBar.setDragPercent(1,this._maxNum);
			this._buyNum = 1;
		}
		let numStr = String(this._buyNum) + "/" + String(this._maxNum);
		this._selectedNumTF.text = numStr;
		this._selectedNumTF.setPosition(this._numBg.x + this._numBg.width / 2 - this._selectedNumTF.width / 2,this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2);


		let message = null;
		if(this._data == null)
		{

			message = this.shopItemCostSum(this._buyNum);
		}
		else
		{
			if(this._data.isLimit == 1)
			{
				message = this.shopItemCost(this._buyNum);
			}
			else
			{
				message = this.shopItemCostSum(this._buyNum);
			}
			
		}

		this._messageTF.text = message;
		this._messageTF.setPosition(this._bg.x + this._bg.width / 2 - this._messageTF.width / 2,this._bg.y + this._bg.height / 2 - this._messageTF.height - 40);
		if(this._tipTF)
		{
			this._tipTF.setPosition(this._messageTF.x + this._messageTF.width / 2 - this._tipTF.width / 2,this._messageTF.y + this._messageTF.height + 5);
		}
		

	}
	/**
	 * 商品价格不递增的处理
	 */
	private shopItemCostSum(curNum:number):string
	{
		let msgKey = null;
		if(this._shopItemCost * this._buyNum > this._playerNum)
		{
			msgKey = "shopBuyUseGemNotEnough";
		}
		else
		{
				msgKey = "shopBuyUseGem";
		}
		return LanguageManager.getlocal(msgKey,[String(this._shopItemCost * this._buyNum),String(this._buyNum),this._shopItemName]);
	}
	/**
	 * 商品价格递增的处理
	 */
	private shopItemCost(curNum:number):string
	{
		let playerVip = Api.playerVoApi.getPlayerVipLevel();
		let costNum = this._data.buyNum[playerVip];
		this._costSum = 0;
		for(let i = 0;i < curNum;i++)
		{
			let buyNum = costNum - this._maxNum + i;
			if(this._data.buyCost[buyNum] == null)
			{
				this._costSum += this._data.buyCost[this._data.buyCost.length - 1];
			}
			else
			{
				this._costSum += this._data.buyCost[buyNum];
			}
		}
		let msgKey =null;
		if(this._costSum > this._playerNum)
		{
			msgKey = "shopBuyUseGemNotEnough";
		}
		else
		{
			msgKey = "shopBuyUseGem";
		}
		return LanguageManager.getlocal(msgKey,[String(this._costSum),String(this._buyNum),this._shopItemName]);
	}
	/**
	 * 购买的事件处理
	 */
	 protected clickConfirmHandler(data:any):void
	{
		//判断元宝数是否足够
		let costNum = this._shopItemCost * this._buyNum;
		//没有递增操作
		if(this._data == null)
		{
			if(costNum > this._playerNum)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"))
				this.hide();
				return;
			}
		}
		else
		{
			//有递增操作
			if(this._data.isLimit == 1)
			{
				
				if(this._costSum > this._playerNum)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"))
					this.hide();
					return;
				}
			}
			else
			{
				//没有递增操作
				if( costNum > this._playerNum)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"))
					this.hide();
					return;
				}
			}
		}

		if(this._confirmCallback)
		{
			this._confirmCallback.apply(this._handler,[this._buyNum]);
		}
		
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"progress2_bg","progress2"
		]);
	}
	/**
	 * 取消购买
	 */
	private clickCancelHandler(param:any):void
	{
		this.hide();
	}
	/**
	 * 设置当前高度
	 */
	protected getShowHeight():number
	{
		return 400;
	}
	protected resetBgSize():void
	{
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
	}
	/**
	 * 标题
	 */
    protected getTitleStr(){
        
        return "itemUseConstPopupViewTitle";
    }
	/**设置按钮上文本的内容 */
	protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}
	/**设置按钮的需要的图片 */
	protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}
	public dispose():void
	{
		this._confirmCallback = null;
		this._handler = null;
		this._buyNum = 1;
		this._selectedNumTF = null;
		this._maxNum = 0;
		this._numBg = null;
		this._messageTF = null;
		this._cancelBtn = null;
		this._bg = null;
		this._playerNum = 0;
		this._shopItemCost = 0;
		this._shopItemName = null;
		this._data = null;
		this._costSum = null;
		this._dragProgressBar = null;
		this._tipTF = null;
		super.dispose();
	}
}