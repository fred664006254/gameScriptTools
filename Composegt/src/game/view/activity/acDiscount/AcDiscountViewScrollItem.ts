/**
 * Vip折扣
 * author 张朝阳
 * date 2018/9/31
 * @class AcDiscountView
 */
class AcDiscountViewScrollItem extends ScrollListItem
{
	private _acBaseVo:AcBaseVo = null;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:AcBaseVo)
	{
		
		this._acBaseVo = data;

		//vip背景图片
		let itemBg: BaseBitmap = BaseBitmap.create("acdiscountviewbg" + this._acBaseVo.code);
		itemBg.x = 7;
		this.addChild(itemBg);

		// 倒计时文本 
		let acCDTxt = ComponentManager.getTextField(this._acBaseVo.getAcLocalTime(false), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
		this.addChild(acCDTxt);
		acCDTxt.x = 30;
		acCDTxt.y = itemBg.y + 227;
		if(PlatformManager.checkIsJPSp()&&data.code==2)
		{
			acCDTxt.visible =false;
		}

		//vip描述 
		let acDescText = ComponentManager.getTextField(LanguageManager.getlocal("acDiscount_desc_" + this._acBaseVo.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this.addChild(acDescText);
		acDescText.x = 30;
		acDescText.y = itemBg.y + 260;
		acDescText.width = 420;

		// 前往vip
		let goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acDiscount_btn_" + this._acBaseVo.code,this.goBtnClick,this);        
		goBtn.x = 473;
		goBtn.y = itemBg.y +265;
		this.addChild(goBtn);

		// //vip 1折
		// let discountBg: BaseBitmap = BaseBitmap.create("acdiscount1zhe");
		// this.addChild(discountBg);
		// discountBg.x = 563;
		// discountBg.y = itemBg.y + 213;

		// if(PlatformManager.checkIsJPSp())
		// {
		// 	discountBg.visible =false;
		// }
		if(this._acBaseVo.code == 1)
		{
			acDescText.text = LanguageManager.getlocal("acDiscount_vipDesc");
			goBtn.setText("acDiscount_goVip");
			// discountBg.setRes("acdiscount1zhe");
		}
		else if(this._acBaseVo.code == 2)
		{
			if(PlatformManager.checkIsWxSp())
			{
				itemBg.setRes("acdiscountviewbg2_wx");
				acDescText.text = LanguageManager.getlocal("acDiscount_newyearcardDesc")
			}
			else
			{
				acDescText.text = LanguageManager.getlocal("acDiscount_yearcardDesc")
				goBtn.setText("acDiscount_goYearCard");
				// discountBg.setRes("acdiscount_zhongshenkajiage");
			}
		}

	
	}
	/**
	 * 跳转
	 */
	private goBtnClick() 
	{		
        if(this._acBaseVo.isStart==false)
        {
			//活动已结束
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return
        }
		if(this._acBaseVo.code == 1)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
		}
		else if(this._acBaseVo.code == 2)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD);
		}
		else if(this._acBaseVo.code == 3)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD);
		}

		
	}


	public dispose():void
	{
		super.dispose();
	}
}