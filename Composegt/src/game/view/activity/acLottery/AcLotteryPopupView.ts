/**
 * 大奖奖池中奖名单
 * author jiangliuyang
 * date 2018/10/17
 * @class AcLotteryPopupView
 */
class AcLotteryPopupView extends PopupView
{

	private _nameList:any[] = [];
	

	public constructor() 
	{
		super();
	}

	protected initView():void
	{

		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 530;
		bg.height = 320;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

		let title = ComponentManager.getTextField(LanguageManager.getlocal("acLotteryWinTitle"),24,TextFieldConst.COLOR_LIGHT_YELLOW);
		title.x = this.viewBg.width/2 - title.width/2;
		title.y = bg.y + 20;
		this.addChildToContainer(title);


		let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bg2.width = 510;
		bg2.height = 250;
		bg2.x = this.viewBg.x + this.viewBg.width/2 - bg2.width/2;
		bg2.y = title.y + title.height + 10;
		this.addChildToContainer(bg2);

		let cor1 = BaseBitmap.create("public_tcdw_bg01");
		cor1.x = bg2.x;
		cor1.y = bg2.y;
		this.addChildToContainer(cor1);

		let cor2 = BaseBitmap.create("public_tcdw_bg02");
		cor2.x = bg2.x + bg2.width-cor2.width;
		cor2.y = bg2.y;
		this.addChildToContainer(cor2);

		let content = new BaseDisplayObjectContainer();
		content.width = 500;
		content.height = 220;
		let alphabg =BaseBitmap.create("public_alphabg");
		alphabg.width = content.width;
		alphabg.height = content.height;
		content.addChild(alphabg);
		// this.addChildToContainer(content);
		let nameObj = null;
		let startY = 20;
		for(let i = 0;i < this._nameList.length; i ++){
			nameObj = this._nameList[i];
			// let indexText = ComponentManager.getTextField(nameObj[0],22,0x8a664e);
			// indexText.x = 20;
			// indexText.y = startY + 30 * i;

			let nameText = ComponentManager.getTextField(nameObj[1],22,0x8a664e);
			nameText.x = 20;
			nameText.y = startY + 30 * i;

			let gemText = ComponentManager.getTextField(nameObj[2],22,0x8a664e);
			gemText.x = 180
			gemText.y = startY + 30 * i;

			let timeText = ComponentManager.getTextField(nameObj[3],22,0x8a664e);
			timeText.x = 290;
			timeText.y = startY + 30 * i;

			// content.addChild(indexText);
			content.addChild(nameText);
			content.addChild(gemText);
			content.addChild(timeText);
		}
		if(this._nameList.length == 0 ){
			let emptyText = ComponentManager.getTextField(LanguageManager.getlocal("acLotteryEmpty"),24,0x8a664e);
			emptyText.x = content.width/2 - emptyText.width/2;
			emptyText.y = content.height/2 - emptyText.height/2;
			content.addChild(emptyText);
		}
		if(startY + 30 * this._nameList.length + 30 > 220){
			content.height = startY + 30 * this._nameList.length + 30;
			alphabg.height = content.height;
		}

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,500,220);
		let c = ComponentManager.getScrollView(content,rect);
		c.x = bg2.x + bg2.width/2 - c.width/2;
		c.y = bg2.y + 20;
		c.bounces = false;
		c.horizontalScrollPolicy = "off";
		this.addChildToContainer(c);


		
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
	

		return {requestType:NetRequestConst.REQUEST_ACTIVITY_LOTTERYWININFO,requestData:{activeId: this.param.data.activeId}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		// let view = this;
		// view.api.setZoneRankInfo(data.data.data);
        if(data.ret){
			let d = null;
			// let hasLast = false;
			for(let i = 0; i < data.data.data["allwinfos"].length;i++){
				d = data.data.data["allwinfos"][i];
				
				if(d[4] == "last"){
					// hasLast = true;
					this._nameList.push([LanguageManager.getlocal("acLotteryWinLast"),d[1],d[2] + LanguageManager.getlocal("acLotteryWinGem"),App.DateUtil.getFormatBySecond(d[3],2)]);
				} else {
					this._nameList.push([LanguageManager.getlocal("acLotteryWinIndex",[d[4]]),d[1],d[2] + LanguageManager.getlocal("acLotteryWinGem"),App.DateUtil.getFormatBySecond(d[3],2)]);
				}
			}
			// if(!hasLast){
			// 	if(data.data.data["allwinfos"].length == 0){
			// 		this._nameList.push([LanguageManager.getlocal("acLotteryWinIndex",["1"]),LanguageManager.getlocal("acLotteryEmpty"),"",""])

			// 	} else {
			// 		this._nameList.push([LanguageManager.getlocal("acLotteryWinIndex",[data.data.data["allwinfos"].length + 1]),LanguageManager.getlocal("acLotteryEmpty"),"",""])

			// 	}
			// }

            // this.initInfo(data.data.data);
			// this._nameList.push(["第1期","炒疙瘩","23:53:42"]);
			// this._nameList.push(["第2期","炒疙瘩","23:53:42"]);
			// this._nameList.push(["第3期","炒疙瘩","23:53:42"]);
			// this._nameList.push(["第4期","炒疙瘩","23:53:42"]);
			// this._nameList.push(["第5期","炒疙瘩","23:53:42"]);
			// this._nameList.push(["第6期","炒疙瘩","23:53:42"]);
			// this._nameList.push(["第3期","炒疙瘩","23:53:42"]);
			// this._nameList.push(["第4期","炒疙瘩","23:53:42"]);
			// this._nameList.push(["第5期","炒疙瘩","23:53:42"]);
			// this._nameList.push(["第6期","炒疙瘩","23:53:42"]);
			// this._nameList.push(["第3期","炒疙瘩","23:53:42"]);
			// this._nameList.push(["第4期","炒疙瘩","23:53:42"]);
			// this._nameList.push(["第5期","炒疙瘩","23:53:42"]);
			// this._nameList.push(["第6期","炒疙瘩","23:53:42"]);
        }
        
	}







	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

	protected getTitleStr():string
	{
		return "acLotteryWinName";
	}


	public dispose():void
	{

	
		this._nameList = [];
		super.dispose();
	}
}