/**
 * 服务器列表
 * author jiang
 * date 2019/10/22
 * @class ServerShowPopupView
 */

class ServerShowPopupView extends PopupView
{
	// private _useCallback:Function;
	// private _handler:any;
	private _bgHeight:number = 0
	public constructor() 
	{
		super();
	}

	private _callback = null;
	// 打开该面板时，需要传参数msg
	public initView():void
	{
        
		let bg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		bg.width = 525;
		bg.height = 432;
		bg.x = this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

		this._bgHeight = bg.height;

		let zidGroup = this.param.data.zidGroup;
        // let zidGroup = [1,2,3,4,5,6,7,7,8,9,10,11,12,13,14,15,16,17,18,19,29];
         //490 410

        let rect:egret.Rectangle = egret.Rectangle.create();
        rect.setTo(0,0,490, 410);
        let scrollContiner = new BaseDisplayObjectContainer();
        scrollContiner.width = 490;

        for(let i = 0 ; i < zidGroup.length; i++){
            let serverBg = BaseBitmap.create("public_9v_bg13");
            serverBg.width = 220;
            serverBg.height = 40;
            serverBg.x = scrollContiner.width / 4 + (i % 2) * (scrollContiner.width/2) - serverBg.width/2;
            serverBg.y = 10 + Math.floor(i/2) * (40 + 10);
            scrollContiner.addChild(serverBg);

            let str = Api.mergeServerVoApi.getAfterMergeSeverName(Api.playerVoApi.getPlayerID(),true,zidGroup[i]);
            let serverTxt = ComponentManager.getTextField(str,22,TextFieldConst.COLOR_BROWN);
            serverTxt.x = serverBg.x + serverBg.width/2 - serverTxt.width/2;
            serverTxt.y = serverBg.y + serverBg.height/2 - serverTxt.height/2;
            scrollContiner.addChild(serverTxt);
        }

        scrollContiner.height = 10 + Math.ceil(zidGroup.length/2) * (40 + 10);

        let abg = BaseBitmap.create("public_alphabg");
        abg.width = scrollContiner.width;
        abg.height = scrollContiner.height;
        scrollContiner.addChild(abg);

        let scrollView = ComponentManager.getScrollView( scrollContiner,rect);
		scrollView.x = bg.x + bg.width/2 - scrollView.width/2;
		scrollView.y = bg.y + bg.height/2 - scrollView.height/2;
		this.addChildToContainer(scrollView);
		scrollView.horizontalScrollPolicy="off";



		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"confirmBtn",this.clickConHandler,this);
		confirmBtn.x = bg.x + bg.width/2 - confirmBtn.width/2;
		confirmBtn.y = bg.y + bg.height + 20;
		this.addChildToContainer(confirmBtn);
		


		

	}



	protected resetBgSize():void
	{
		
		super.resetBgSize();
		
	}



	protected clickConHandler(data:any):void
	{
		let param=this.param;
		if (!param.data.clickNotAutoHide) {
			this.hide();
		}
		if(param.data.callback){
			param.data.callback.apply(param.data.handler,[this]);
		}
	}

  
    // protected getTitleStr(){
        
    //     return ;
    // }
	// protected getCloseBtnName():string
	// {
	// 	return  null;
	// }

	public hide()
	{
		// if(this.param.data.callback){
		// 	this.param.data.callback.apply();
		// }
		super.hide()
	}

	public dispose():void
	{
	
		super.dispose();
	}
}