
 class VipBtnScrollItem extends ScrollListItem {

	private  _currLevel:number =0;
	private  rechargevie_down:BaseBitmap  =null;
	private  newIndex:number =0;
	private  leftBg:BaseBitmap  =null;
	private  discountIcon:BaseBitmap = null;
	public   public_dot2:BaseBitmap =null;
	private	 vipImg:BaseLoadBitmap =null;
	public constructor() {
		super();
	
	}
	protected initItem(index: number, data: any) {

        this._currLevel = Api.playerVoApi.getPlayerVipLevel();
		this.newIndex = index+=1;

		if(this._currLevel>=this.newIndex )
		{
        	this.leftBg = BaseBitmap.create("rechargevie_open");
		}
		else
		{
			this.leftBg	= BaseBitmap.create("rechargevie_close");
		}
		this.leftBg.x= 0;
		this.leftBg.y =0;
		this.addChild(this.leftBg);
		
		let vipImg:BaseLoadBitmap=BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this.newIndex).icon);
		this.addChild(vipImg);
		vipImg.x =this.leftBg.width/2 -40;
		vipImg.y =this.leftBg.height/2-12;
		this.vipImg =vipImg;
		// if(this.newIndex==1)
		// {
		// 	this.vipImg =vipImg;
		// }
		

		this.public_dot2 =BaseBitmap.create("public_dot2");
		if(Api.shopVoApi.getVipRewardInfo(this.newIndex))
		{
			// console.log("已经领取"+this.newIndex);
			this.public_dot2.visible =false;
		}
		else
		{	
			if(Api.vipVoApi.getVipCfgByLevel(index).reward)
			{
				if (Api.playerVoApi.getPlayerVipLevel() >= this.newIndex) {
				  	let vip1Boo=Api.switchVoApi.checkVip1Privilege();
					this.public_dot2.visible =true;
					if(this.newIndex==1&&vip1Boo==false)
					{
						this.public_dot2.visible =false;
					}
				}
				else
				{
					this.public_dot2.visible =false;
				}	
			}
			else
			{
				this.public_dot2.visible =false;
			}
		}
		this.addChild(this.public_dot2);
		this.public_dot2.x =125;
		this.public_dot2.y =0;
		
		if (Api.acVoApi.checkIsVipDiscount()) {
			this.discountIcon = BaseBitmap.create("recharge_discount_left");
			this.discountIcon.x = 0;
			this.discountIcon.y = 0;
			this.addChild(this.discountIcon);
		}
    }

	public setRedhot():void
	{
		this.public_dot2.visible =false;
	}

	public setType():void
	{
		this.rechargevie_down= BaseBitmap.create("rechargevie_down");
		this.rechargevie_down.x=this.leftBg.x;
		this.rechargevie_down.y=this.leftBg.y;
		this.addChild(this.rechargevie_down);
		// this.setChildIndex(this.rechargevie_down,this.numChildren-1);
		this.setChildIndex(this.rechargevie_down,this.getChildIndex(this.vipImg));
	}

   public removeBitmap():void
   {
	   if(this.rechargevie_down)
	   {
		// this.removeChild(this.rechargevie_down);
		BaseBitmap.release(this.rechargevie_down);
		this.rechargevie_down =null;
	   }
   }
	public getSpaceY():number
	{
		return 1;
	}
	public dispose(): void {
		this.newIndex =0;
		this.rechargevie_down =null;
		this._currLevel =0;
		this.leftBg=null
		this.public_dot2 =null;
		this.vipImg=null;
		super.dispose();
	}
 }
	