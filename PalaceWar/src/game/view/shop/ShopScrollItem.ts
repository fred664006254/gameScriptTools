/**
 * 商店滑动item
 * author dmj
 * date 2017/10/28
 * @class ShopScrollItem
 */
class ShopScrollItem  extends ScrollListItem
{
	//商品id
	private _shopid:number = 0;
	//限购数文本
	private _limitNumTF:BaseTextField;
	//购买按钮
	public _buyBtn:BaseButton;
	//限购描述文本
	private _limitDescTF:BaseTextField;
	private _nextViptxt:BaseTextField;
	private _selectedIndex:number = 0;
	private _shopItemCfg:Config.ShopItemCfg;
	private itemList = [];
	private _isRequesting:boolean = false;
	private _data:any  = null; 
	private _buyNum:number =0;
	private  _nextNum2:number=0; 

	private _buyItemNum :number = 1;
	private _mainTaskHandKey:string = null;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any, param?:any)
    {
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM),this.buyHandlerCallback,this);

		let temW = 600;
		let temH = 160;
		this.width = temW;
		this.height = temH;
		this._shopid = data.sortId;
		this._selectedIndex = index;
		this._data = data;
		
	
		let shopItemCfg = Config.ShopnewCfg.getnewShopItemCfgById(this._shopid);//Config.ShopnewCfg.getnewShopItemCfgById(this._shopid);// Api.shopVoApi.getShopItemCfgById(this._shopid);
		this._shopItemCfg =   shopItemCfg;
		// 显示道具列表
		let contentList:Array<RewardItemVo> = GameData.formatRewardItem(data.content);//shopItemCfg.contentList;
		// 购买价格
		let buyCost:number = shopItemCfg.buyCost;
		
		// 限制类型
		let currVipDesc:string = ""; 
		let currVip =Api.playerVoApi.getPlayerVipLevel();  
		let nextVip =Api.playerVoApi.getPlayerNextVipLevel();  
		let nextVipDesc:string = "";  
		if(data.isLimit==1)
		{
			if(currVip>=data.needVip&&currVip!=0)
			{
				var currNum = this.getVipNum();
				currVipDesc = LanguageManager.getlocal("shopvipDes1",[""+currVip,currNum+""]);
				this._buyNum = currNum;
				
				if(currVip!=Api.playerVoApi.getPlayerMaxVip())
				{	
					var nextNum:number = this.getNextVipNum(nextVip); 
					if(nextNum == this.getVipNum())
					{
						//如果一样反回下一个等级
						let num1 = this.lookupNextVipNum(nextNum);
						if(num1!=null)
						{
							let currVipNum = num1;
							let nextNum2 = data.buyNum[num1]-this.getIdBynum(); 
							this._nextNum2 = currVipNum;
							nextVipDesc = LanguageManager.getlocal("shopvipDes1",[""+currVipNum,nextNum2+""]);
						} 
						else{
							nextVipDesc = LanguageManager.getlocal("shopvipDes1",[""+nextVip,nextNum+""]);
							this._nextNum2 = nextVip;
						}
					}else
					{
						nextVipDesc = LanguageManager.getlocal("shopvipDes1",[""+nextVip,nextNum+""]);
						this._nextNum2 = nextVip;
					} 
				}
				
			}
			else if(currVip==0&&data.needVip==0)
			{
				var currNum = this.getVipNum();
				currVipDesc = LanguageManager.getlocal("shopvipDes1",[""+currVip,currNum+""]);
				this._buyNum = currNum;
			}
			else
			{	
				//低于当前限制等级
				var buyNum = this._data.buyNum[data.needVip];
				currVipDesc = LanguageManager.getlocal("shopvipDes1",[""+data.needVip,buyNum+""])
				this._buyNum = currNum;
			}
		}

		// 商品名称
		let shopName:string = shopItemCfg.name;
		// vip限制描述
		let needVipDesc:string = this.needVipDesc;// shopItemCfg.needVipDesc;

		let bg:BaseBitmap = BaseBitmap.create("public_scrollitembg");
		bg.width = temW;
		bg.height=150
		this.addChild(bg);


		if(contentList.length > 1)
		{
			// todo特惠礼包 
		}
		else
		{
			// 单个物品
			for(let i = 0;i < contentList.length;i++)
			{
				let rewardItemVo = contentList[i];
				let icon = GameData.getItemIcon(rewardItemVo,true);
				icon.x = 15;
				icon.y = 24;
				this.addChild(icon);
				this.itemList.push(icon);
		 

				let itemNameBg:BaseBitmap = BaseBitmap.create("public_titlebg");
				itemNameBg.x = icon.x + 115;
				itemNameBg.y = icon.y;
				let itemNameBgWidth:number = 240;
				// if(PlatformManager.checkIsPtLang()){
				// 	itemNameBgWidth = 220 ;
				// }
				itemNameBg.width = itemNameBgWidth;
				this.addChild(itemNameBg);

				let itemNameTF:BaseTextField = ComponentManager.getTextField(rewardItemVo.name,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);//rewardItemVo.nameColor
				itemNameTF.x = itemNameBg.x + 15;//itemNameBg.width/2 - itemNameTF.width/2;
				itemNameTF.y = itemNameBg.y + itemNameBg.height/2 - itemNameTF.height/2;
				this.addChild(itemNameTF);

				if(PlatformManager.checkIsEnLang()){
					
					// itemNameBg.width = itemNameTF.width + 52;
					itemNameTF.x = itemNameBg.x + 15;//itemNameBg.x + itemNameBg.width/2 - itemNameTF.width/2;
				} 

				let itemDescTF:BaseTextField = ComponentManager.getTextField(rewardItemVo.desc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
				itemDescTF.x = itemNameBg.x;
				itemDescTF.y = itemNameBg.y + itemNameBg.height + 7;
				itemDescTF.width = 280;
				this.addChild(itemDescTF);

				this._buyBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"nothing",this.buyHandler,this)
				var str = "";
				str = this.getBuyCost().toString(); 
				this._buyBtn.setText(str,false);
				this._buyBtn.addTextIcon("public_icon1",1);
				this._buyBtn.x = this.width - this._buyBtn.width -20;
				this._buyBtn.y = this.height/2 - this._buyBtn.height/2;
				this.addChild(this._buyBtn);
				
				if(needVipDesc != "")
				{
					let vipLimitTF:BaseTextField = ComponentManager.getTextField(needVipDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED2);
					vipLimitTF.x = itemNameBg.x;
					vipLimitTF.y = itemDescTF.y + itemDescTF.height + 7;
					this.addChild(vipLimitTF);
				}

				if(currVipDesc != "")
				{
					this._limitNumTF = ComponentManager.getTextField(currVipDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL);
					this._limitNumTF.x = this._buyBtn.x + this._buyBtn.width/2 - this._limitNumTF.width/2;
					this._limitNumTF.y = this._buyBtn.y + this._buyBtn.height + 7;
					
					// var buyNum = this._data.buyNum[data.needVip];
					if(	this._buyNum>0)
					{
						this._limitNumTF.textColor =TextFieldConst.COLOR_WARN_GREEN2;// 0x00ff00;
					} 
					else
					{
						this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_RED;
					}
					this.addChild(this._limitNumTF);
				}

				if(nextVipDesc != "")
				{
					this._nextViptxt = ComponentManager.getTextField(nextVipDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED);
					this._nextViptxt.x = this._buyBtn.x + this._buyBtn.width/2 - this._nextViptxt.width/2;
					this._nextViptxt.y = this._buyBtn.y - 27;
					this.addChild(this._nextViptxt);
				}

				
				if(shopItemCfg.discount > 0)
				{
					let cornerSp:BaseBitmap = BaseBitmap.create("shopview_corner");
					cornerSp.x = 3;
					cornerSp.y = 1;
					this.addChild(cornerSp);
					let discountTF:BaseTextField = ComponentManager.getTextField(shopItemCfg.discountDesc,18,TextFieldConst.COLOR_LIGHT_YELLOW);
					discountTF.x = 9;
					discountTF.y = 25;
					discountTF.rotation = -40;
					this.addChild(discountTF);
				
					let gemIconW = 30;
					let originalTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("originalPriceTitle")+":",18,TextFieldConst.COLOR_BLACK);
					originalTF.y = this._buyBtn.y - originalTF.height/2 - 13;
					this.addChild(originalTF);

					let gemIcon:BaseBitmap = BaseBitmap.create("public_icon1");
					gemIcon.scaleX = gemIconW/gemIcon.width;
					gemIcon.scaleY = gemIconW/gemIcon.height;
					gemIcon.y = this._buyBtn.y - gemIconW/2 - 13;
					this.addChild(gemIcon);

					let originalPriceTF:BaseTextField = ComponentManager.getTextField(shopItemCfg.preCost.toString(),18,TextFieldConst.COLOR_BLACK);
					originalPriceTF.x = itemNameBg.x;
					originalPriceTF.y = originalTF.y;
					this.addChild(originalPriceTF);

					let newW = originalTF.width + gemIconW + originalPriceTF.width;
					originalTF.x = this._buyBtn.x + this._buyBtn.width/2 - newW/2;
					gemIcon.x = originalTF.x + originalTF.width;
					originalPriceTF.x = gemIcon.x + gemIconW;

					let discountSp:BaseBitmap = BaseBitmap.create("shopview_line");
					discountSp.x = this._buyBtn.x + this._buyBtn.width/2 - discountSp.width/2;
					discountSp.y = this._buyBtn.y - discountSp.height/2 - 13;
					this.addChild(discountSp);
				}
			}
			if (this._shopid == 1001 && param && param && param.isMainTask){
				egret.callLater(()=>{
					this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
						this,
						bg.x + bg.width - 110,
						bg.y + bg.height/2 - 30,
						[this._buyBtn],
						121,
						true,
						function(){
							this.parent.setChildIndex(this, 100);
							return true;
						},
						this,
					);
				}, this, null);
			}
		}
	}

	public update():void
	{
		var nextVip = Api.playerVoApi.getPlayerNextVipLevel()
		if(this._limitNumTF)
		{
			let limitNum = this.getVipNum();
			let currVip =Api.playerVoApi.getPlayerVipLevel();  
			this._limitNumTF.text = LanguageManager.getlocal("shopvipDes1",[currVip+"",limitNum.toString()]);
			if(limitNum==0)
			{
			 	this._limitNumTF.textColor =TextFieldConst.COLOR_WARN_RED2;
			}
		}
		if(this._data.isLimit==1)
		{	
			if(this._nextViptxt)
			{ 
				let nextNum2 = this.getNextVipNum(this._nextNum2);
				this._nextViptxt.text = LanguageManager.getlocal("shopvipDes1",[""+this._nextNum2,nextNum2+""]);
			} 

			var nextNum:number = this.getNextVipNum(this._nextNum2);
			if(this._nextViptxt&&this.getVipNum() == nextNum)
			{
				let nextLookNum = this.lookupNextVipNum(nextNum);
				if(nextLookNum){
					let newNextNum = nextLookNum+1;
					let nextNum2 = this._data.buyNum[newNextNum-1]-this.getIdBynum();
					this._nextViptxt.text = LanguageManager.getlocal("shopvipDes1",[""+newNextNum,nextNum2+""]);
				}
			}
		}
		
		if(this._buyBtn)
		{
			let str = this.getBuyCost().toString();
			this._buyBtn.setText(str,false);
			this._buyBtn.removeTextIcon();
			this._buyBtn.addTextIcon("public_icon1",1);
		}
		
	}
	private lookupNextVipNum(index:number=0):number
	{
		let currVip =Api.playerVoApi.getPlayerVipLevel();
		for(var i:number =0; i<this._data.buyNum.length; i++)
		{	 
			let cfgNum = this._data.buyNum[i];
			let newNum = cfgNum - Api.shopVoApi.getNewShopBuyNumById(this._data.sortId);
			if(index<newNum&&i>=currVip)
			{
				return i;
			}  
		}
		return null;
	}

	protected playSuccessAction():void
	{
		if(this._shopItemCfg)
		{
				let rewardVo = GameData.formatRewardItem(this._shopItemCfg.content)[0];
				rewardVo.num *= this._buyItemNum;
				let icon = GameData.getItemIcon(rewardVo ,true);
				let tmpNode = this.itemList[0];
				icon.setScale(tmpNode.scaleX);
				let p = tmpNode.localToGlobal()
				let x1 =  p.x;
				let y1 = p.y;
				icon.x = p.x;
				icon.y = p.y;
				let x2 = GameConfig.stageWidth/2 + icon.width/2;
				let y2 = GameConfig.stageHeigth - 10 ;				
				LayerManager.panelLayer.addChild(icon);
				egret.Tween.get(icon).wait(200*1).to({x:x2,y:y2},500).call(this.onComplete,this,[icon]);

			// let contentList:Array<RewardItemVo> = this._shopItemCfg.contentList;
			// for (var index = contentList.length-1; index >= 0 ; index--) {
			// 	let rewardItemVo = this._shopItemCfg.content; //contentList[index];
				
			// }
		}
	}
	private onComplete(icon:BaseDisplayObjectContainer):void
	{
		if(icon)
		{
			icon.dispose();
		}
	}
	private buyHandlerCallback(event:egret.Event):void
	{
		if(this._isRequesting == false)
		{
			return;
		}
		this._isRequesting = false;
		if (event && event.data && event.data.ret){
			let rdata = event.data.data;
			if(rdata.ret == 0)
			{
				this.update();
				this.playSuccessAction();
				// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SHOP_BUY + 3,{"index":this._selectedIndex,"shopId":this._shopid});
			}else
			{
				//App.CommonUtil.showTip("购买失败");
				App.CommonUtil.showTip(LanguageManager.getlocal("shopBuyFailure"));
			}
		}
	}
	/**
	 * 新的弹板
	 */
	private confirmCallbackHandlerNew(data:any): void
	{
		//判断元宝数是否足够
		if(this.getBuyCost()> Api.playerVoApi.getPlayerGem())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		this._isRequesting = true;
		this._buyItemNum = data;
		//发送购买请求
		NetManager.request(NetRequestConst.REQUEST_SHOP_BUY_ITEM,{"shopId":this._shopid,version:Api.shopVoApi.getVersion(),"dtype":"1","buyitemnum":data});
	}

	//弹出消费提示框显示确认
	private confirmCallbackHandler(): void
	{
		//判断元宝数是否足够
		if(this.getBuyCost()> Api.playerVoApi.getPlayerGem())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		this._isRequesting = true;
		//发送购买请求
		NetManager.request(NetRequestConst.REQUEST_SHOP_BUY_ITEM,{"shopId":this._shopid,version:Api.shopVoApi.getVersion(),"dtype":"1"});
	}
	//检查是否需要弹出消费提示框
	private checkNeedWarnPopup(): void{
		//物品价格
		let shopCost = this.getBuyCost();
		//最大购买数量
		let maxlimitNum = 0;
		if(this._data.isLimit == 1)
		{
			maxlimitNum = this.getVipNum();
		}
		//检查价格是否超过购买警告阈值
		if (shopCost >= Config.ShopCfg.buyItemCheckVal || maxlimitNum >= Config.ShopCfg.buyItemNum)
		{
			
			let playerNum = Api.playerVoApi.getPlayerGem();
			let shopName = GameData.formatRewardItem(this._data.content)[0].name
			ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMSLIDERPOPUPVIEW,
			{
				"data":this._data,									//所有的数据
				"confirmCallback": this.confirmCallbackHandlerNew,	//确认回调函数
				"maxNum":maxlimitNum,								//物品的限制数量
				"shopItemCost":shopCost,							//物品的价格
				"shopItemName":shopName,							//物品的名字
				"handler": this,									//target
				"playerNum":playerNum,								//当前的拥有的元宝数
				"id":1,												//消耗物品的id
			}
			);		
		} else {
			this.confirmCallbackHandler();

		}
	}

	private buyHandler(param:any):void
	{

		if(this._shopItemCfg.needVip > Api.playerVoApi.getPlayerVipLevel())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("vipLvNotEnough"));
			return;
		}

		//当前vip可以购买的次数
		let limitNum =this.getVipNum(); //this._shopItemCfg.limitNum; //Api.shopVoApi.getCanBuyNumById(this._shopItemCfg.id);
		if(limitNum == 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("newshopNumNotEnough"));
			return;
		}
		//检查是否需要弹出消费提示框
		this.checkNeedWarnPopup();
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		this._mainTaskHandKey = null;

	}

	private getBuyCost():number
	{
		let num = Api.shopVoApi.getNewShopBuyNumById(this._data.sortId)
		var buyNum:number=0;
		if(num&&this._data.isLimit==1)
		{
			if(num>=this._data.buyCost.length)
			{
				buyNum = this._data.buyCost[this._data.buyCost.length-1];
				return buyNum; 
			}
			buyNum = this._data.buyCost[num];
		}
		else
		{
			buyNum = this._data.buyCost[0];
		}
		return buyNum;
	}

	//当前vip剩余可以购买的次数
	private getVipNum():number
	{	
		if(this._data.isLimit==1)
		{
			let currVip =Api.playerVoApi.getPlayerVipLevel();  
			if(currVip >= this._data.buyNum.length){
				currVip = this._data.buyNum.length - 1;
			}
			let sureNum = this._data.buyNum[currVip];
			let currNum = sureNum - Api.shopVoApi.getNewShopBuyNumById(this._data.sortId);
			return currNum;
		} 
	}

	//当前vip下一等级剩余可以购买的次数
	private getNextVipNum(nextVip:number=0):number
	{
		if(this._data.isLimit==1)
		{ 
			// let nextVip = Api.playerVoApi.getPlayerNextVipLevel();
			if(nextVip >= this._data.buyNum.length){
				nextVip = this._data.buyNum.length
			}  
			let sureNum = this._data.buyNum[Math.min(nextVip, this._data.buyNum.length - 1)];
			let currNum = sureNum - Api.shopVoApi.getNewShopBuyNumById(this._data.sortId);
			return currNum;
		}
	}
	
	//获取已经购买过的次数
	private getIdBynum():number
	{
		return Api.shopVoApi.getNewShopBuyNumById(this._data.sortId);
	}


	public get needVipDesc():string
	{
		if(this._shopItemCfg.needVip&&this._shopItemCfg.needVip > 0)
		{
			return LanguageManager.getlocal("shopVipLimit",[this._shopItemCfg.needVip.toString()]);
		}
		return "";
	}
	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM),this.buyHandlerCallback,this);

		this._shopid = 0;
		this._limitNumTF = null;
		this._buyBtn = null;
		this._limitDescTF = null;
		this._selectedIndex = 0;
		this._shopItemCfg = null;
		this.itemList = [];
		this._isRequesting = false;
		this._buyNum =0;
		this._buyItemNum = 1;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		this._mainTaskHandKey = null;
		super.dispose();
	}
}