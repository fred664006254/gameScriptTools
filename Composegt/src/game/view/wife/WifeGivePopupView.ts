/**
 * 赏赐
 * author dky
 * date 2017/11/18
 * @class WifeGivePopupView
 */
class WifeGivePopupView extends PopupView
{
	// 未婚滑动列表
	private _scrollList: ScrollList;


	private _confirmCallback:Function;
	private _handler:any;

	private _wifeInfoVo: WifeInfoVo;

	private _text1:BaseTextField;
	private _text2:BaseTextField;
	private _text3:BaseTextField;

	private _index:number = 0;

	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_GIVE,this.doGive,this);

		this._handler = this.param.data.handler;
		this._confirmCallback = this.param.data.confirmCallback;

		let id = this.param.data.id
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);


		let bg = BaseBitmap.create("commonview_woodbg");
		bg.width = 546;
		bg.height = 730;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = -5;//this.tabbarGroup.y + 10;//55;
		this.addChildToContainer(bg);

		let tBg = BaseBitmap.create("popupview_bg3");
		tBg.x = this.viewBg.width/2 - tBg.width/2;
		tBg.y = 0;
		this.addChildToContainer(tBg);

		let line = BaseBitmap.create("commonview_border3");
		line.width = tBg.width;
		line.x = tBg.x;
		line.y = 10;
		this.addChildToContainer(line);

		let topbg = BaseBitmap.create("popupview_bg4");
		topbg.x = this.viewBg.width/2 - topbg.width/2;
		topbg.y = 10;
		this.addChildToContainer(topbg);
		

		if(Api.switchVoApi.checkOpenWifeBattle()){
			//亲密度
			let icon1Bg = BaseBitmap.create("public_hb_bg01");
			icon1Bg.x = 40+40.5;//140;
			icon1Bg.y = topbg.y + topbg.height/2 - icon1Bg.height/2 - 2; //20;
			this.addChildToContainer(icon1Bg);

			let icon1 = BaseBitmap.create("wifeview_vigoricon");
			icon1.x = icon1Bg.x ;
			icon1.y = icon1Bg.y + icon1Bg.height/2 - icon1.height/2;
			this.addChildToContainer(icon1);


			this._text1 = ComponentManager.getTextField(this._wifeInfoVo.intimacy.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			this._text1.x = icon1Bg.x + icon1Bg.width/2 - icon1.width/2;
			this._text1.y = icon1.y + icon1.height/2 - this._text1.height/2;
			this.addChildToContainer(this._text1);

			//魅力
			let icon2Bg = BaseBitmap.create("public_hb_bg01");
			icon2Bg.x = 196.5+40.5;
			icon2Bg.y = icon1Bg.y;
			this.addChildToContainer(icon2Bg);

			let icon2 = BaseBitmap.create("wifeview_charmicon");
			icon2.x = icon2Bg.x ;
			icon2.y = icon2Bg.y + icon2Bg.height/2 - icon2.height/2;
			this.addChildToContainer(icon2);


			this._text2 = ComponentManager.getTextField(this._wifeInfoVo.glamour.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			this._text2.x = icon2Bg.x + icon2Bg.width/2 - icon2.width/2;
			this._text2.y = icon2.y + icon2.height/2 - this._text2.height/2;
			this.addChildToContainer(this._text2);

			//才艺
			let icon3Bg = BaseBitmap.create("public_hb_bg01");
			icon3Bg.x = 353+40.5;
			icon3Bg.y = icon1Bg.y;
			this.addChildToContainer(icon3Bg);

			let icon3 = BaseBitmap.create("wifeview_artistryicon");
			icon3.x = icon3Bg.x ;
			icon3.y = icon3Bg.y + icon3Bg.height/2 - icon3.height/2;
			this.addChildToContainer(icon3);


			this._text3 = ComponentManager.getTextField(this._wifeInfoVo.artistry.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			this._text3.x = icon3Bg.x + icon3Bg.width/2 - icon3.width/2;
			this._text3.y = icon3.y + icon3.height/2 - this._text3.height/2;
			this.addChildToContainer(this._text3);
		} else {
			//亲密度
			let icon1Bg = BaseBitmap.create("public_hb_bg01");
			icon1Bg.x = 140;
			icon1Bg.y = topbg.y + topbg.height/2 - icon1Bg.height/2 - 2;//20;
			this.addChildToContainer(icon1Bg);

			let icon1 = BaseBitmap.create("wifeview_vigoricon");
			icon1.x = icon1Bg.x ;
			icon1.y = icon1Bg.y + icon1Bg.height/2 - icon1.height/2;
			this.addChildToContainer(icon1);


			this._text1 = ComponentManager.getTextField(this._wifeInfoVo.intimacy.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			this._text1.x = icon1Bg.x + icon1Bg.width/2 - icon1.width/2;
			this._text1.y = icon1.y + icon1.height/2 - this._text1.height/2;
			this.addChildToContainer(this._text1);

			//魅力
			let icon2Bg = BaseBitmap.create("public_hb_bg01");
			icon2Bg.x = 350;
			icon2Bg.y = icon1Bg.y;
			this.addChildToContainer(icon2Bg);

			let icon2 = BaseBitmap.create("wifeview_charmicon");
			icon2.x = icon2Bg.x ;
			icon2.y = icon2Bg.y + icon2Bg.height/2 - icon2.height/2;
			this.addChildToContainer(icon2);


			this._text2 = ComponentManager.getTextField(this._wifeInfoVo.glamour.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			this._text2.x = icon2Bg.x + icon2Bg.width/2 - icon2.width/2;
			this._text2.y = icon2.y + icon2.height/2 - this._text2.height/2;
			this.addChildToContainer(this._text2);
		}


		



		// let bottomBg = BaseBitmap.create("public_tc_bg01");
		// bottomBg.width = 535;
		// bottomBg.height = 545;
		// bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;

		// bottomBg.y = 75;
		// this.addChildToContainer(bottomBg);

		let list1: Array<{index:number, isMaxIntimacyWife:boolean, isFirstHasNumIndex}> = new Array();
		// 是否是亲密度最高的红颜
		let isMaxIntimacyWife = Api.wifeVoApi.getIdOfIntimacyMax() === String(id);
		// 第一个有数量的index,如果都没有数量，那就是0
		let firstHasNumIndex = 0;

		if(Api.switchVoApi.checkOpenWifeBattle()){
			for (var index = 0; index < 6; index++) {
				let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(Config.WifebaseCfg.wifeGift[String(index + 1)].item));
				if (hasNum > 0) {
					firstHasNumIndex = index;
					break;
				}
			}
			for (var index = 0; index < 6; index++) {
				list1.push({index:index, isMaxIntimacyWife:isMaxIntimacyWife, isFirstHasNumIndex:firstHasNumIndex === index});			
			}
		} else {
			for (var index = 0; index < 4; index++) {
				let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(Config.WifebaseCfg.wifeGift[String(index + 1)].item));
				if (hasNum > 0) {
					firstHasNumIndex = index;
					break;
				}
			}
			for (var index = 0; index < 4; index++) {
				list1.push({index:index, isMaxIntimacyWife:isMaxIntimacyWife, isFirstHasNumIndex:firstHasNumIndex === index});			
			}
		}


		// let list = Config.WifebaseCfg.wifeGift;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,515,618);
		this._scrollList = ComponentManager.getScrollList(WifeGiveScrollItem,list1,rect);
		this.addChildToContainer(this._scrollList);
		// this._scrollList.setPosition(bottomBg.x + 10 ,bottomBg.y + 13);//topbg

		this._scrollList.x = this.viewBg.width/2 - this._scrollList.width/2;
		this._scrollList.y = topbg.y + topbg.height;


	}
	protected getShowHeight():number
	{
		return 820;
	}
	private doGive(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		let num = data.num
		this.request(NetRequestConst.REQUEST_WIFE_AWARD, { wifeId: this.param.data.id.toString(),key:data.key,rnum:num});
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if (data.data.cmd == NetRequestConst.REQUEST_WIFE_AWARD) {
			if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					console.log(rewards);
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}
			let index = this._index;
			let wideItem = <WifeGiveScrollItem>this._scrollList.getItemByIndex(index);
		
			wideItem.refreshData(index);

			let id = this.param.data.id
			this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
			this._text1.text = this._wifeInfoVo.intimacy.toString();
			this._text2.text = this._wifeInfoVo.glamour.toString();
			if(this._text3){
				this._text3.text = this._wifeInfoVo.artistry.toString();
			}
			
		}

		
	}
	private refreshHandler()
	{

	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"commonview_woodbg",
			"popupview_bg4",
			"commonview_border3",
			"popupview_bg3"
		]);
	}
	public hide():void
	{
		super.hide();
	}
	// protected getTabbarTextArr():Array<string>
	// {
	// 	return ["wifeViewTab1Title",
	// 			"wifeViewTab2Title"
	// 	];
	// }

	// protected getRuleInfo():string
	// {
	// 	return "wife_description";
	// }
	protected isShowOpenAni():boolean
	{
		return false;
	}
	public dispose():void
	{
	
		
		// 未婚滑动列表
		this._scrollList = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_GIVE,this.doGive,this);

		this._confirmCallback = null;
		this._handler = null;
		this._wifeInfoVo = null;
		this._text1 = null;
		this._text2 = null;
		this._text3 = null;
		this._index = null;

		super.dispose();
	}
}