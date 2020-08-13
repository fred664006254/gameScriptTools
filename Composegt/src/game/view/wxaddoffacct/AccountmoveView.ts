/**
 *微信迁移帐号
 * author dky
 * date 2019/2/19
 * @class AccountMoveView

 */
class AccountmoveView extends PopupView
{
    private _ranksData = null;
	public constructor() {
		super();
	}

	public initView():void
	{	

        // this.height = 750;
        
        let bg1:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg1.width = 540;
		bg1.height = 490;
		bg1.x = (this.viewBg.width-bg1.width)/2 ;
        bg1.y = 30;
		this.addChildToContainer(bg1);
		
		let rbg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		rbg.width = bg1.width - 20;
		rbg.height = bg1.height - 20;
		rbg.x = bg1.x + 10;
        rbg.y = bg1.y +10;
		this.addChildToContainer(rbg);

		   
        let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("accountmoveViewDesc1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        titleTxt1.width= 450;
		titleTxt1.x = GameConfig.stageWidth/2-titleTxt1.width/2;
        titleTxt1.y = 30 + 30;
        this.addChildToContainer(titleTxt1);

		let rbg11:BaseBitmap = BaseBitmap.create("public_tc_bg04");
		rbg11.width = 450;
		rbg11.height = 40;
		rbg11.x = GameConfig.stageWidth/2-rbg11.width/2;
        rbg11.y = titleTxt1.y +titleTxt1.height + 20;
		this.addChildToContainer(rbg11);

		let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("accountmoveViewDesc2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        // titleTxt2.width= 450;
		titleTxt2.x = rbg11.x + rbg11.width/2- titleTxt2.width/2;
        titleTxt2.y = rbg11.y + rbg11.height/2 - titleTxt2.height/2 ;
        this.addChildToContainer(titleTxt2);

		let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("accountmoveViewDesc3"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        // titleTxt3.width= 450;
		titleTxt3.x = GameConfig.stageWidth/2-titleTxt3.width/2;
        titleTxt3.y = rbg11.y + rbg11.height + 20;
        this.addChildToContainer(titleTxt3);


		let bg11:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg11.width = 540-40;
		bg11.height = 190;
		bg11.x = (this.viewBg.width-bg11.width)/2 ;
        bg11.y = titleTxt3.y + titleTxt3.height + 20;
		this.addChildToContainer(bg11);

		let titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("accountmoveViewDesc4"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        // titleTxt4.width= 450;
		titleTxt4.x = GameConfig.stageWidth/2-titleTxt4.width/2;
        titleTxt4.y = bg11.y +20;
        this.addChildToContainer(titleTxt4);

		let titleTxt5 = ComponentManager.getTextField(this._ranksData.pidtoken,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
		// let titleTxt5 = ComponentManager.getTextField("A9AOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOOAO",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt5.width= 450;
		titleTxt5.textAlign= egret.HorizontalAlign.CENTER;
		titleTxt5.x = GameConfig.stageWidth/2-titleTxt5.width/2;
        titleTxt5.y = titleTxt4.y + titleTxt4.height + 10;
        this.addChildToContainer(titleTxt5);

		//复制按钮
		let copyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "accountmoveViewDesc5", this.copyBtnHandler, this);
		copyBtn.setPosition(GameConfig.stageWidth/2-copyBtn.width/2, titleTxt5.y + titleTxt5.height + 20);
		this.addChildToContainer(copyBtn);


		let titleTxt7 = ComponentManager.getTextField(this._ranksData.pidencrypturl,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        titleTxt7.width= 470;
		titleTxt7.x = GameConfig.stageWidth/2-titleTxt7.width/2;
        titleTxt7.y = bg1.y + bg1.height + 30;
        this.addChildToContainer(titleTxt7);
		//下载按钮
		let downloadBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "accountmoveViewDesc6", this.downloadBtnHandler, this);
		downloadBtn.setPosition(GameConfig.stageWidth/2-downloadBtn.width/2, titleTxt7.y + titleTxt7.height + 20);
		this.addChildToContainer(downloadBtn);

        // let rbg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		// rbg2.width = rbg.width ;
		// rbg2.height = 120;
		// rbg2.setPosition(rbg.x,rbg.y + rbg.height + 10);
		// this.addChildToContainer(rbg2);


       
    }

	private copyBtnHandler():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			var str = this._ranksData.pidtoken;
			var input = document.createElement("input");
			input.value = str;
			document.body.appendChild(input);
			input.select();
			input.setSelectionRange(0, input.value.length),
			document.execCommand('Copy');
			document.body.removeChild(input);
			App.CommonUtil.showTip(LanguageManager.getlocal("accountmoveViewFollowSuccessdes"));
			
		}else{
			window["wx"].setClipboardData({
			data:this._ranksData.pidtoken,
			success(res) {
				window["wx"].getClipboardData({
				success(res) {
					// App.CommonUtil.showTip(LanguageManager.getlocal("accountmoveViewFollowSuccessdes"));
				}
				})
			}
			})
		}

		
       
	}

	private downloadBtnHandler():void
	{

		if(App.DeviceUtil.IsHtml5())
		{
			var str = this._ranksData.pidencrypturl;
			var input = document.createElement("input");
			input.value = str;
			document.body.appendChild(input);
			input.select();
			input.setSelectionRange(0, input.value.length),
			document.execCommand('Copy');
			document.body.removeChild(input);
			App.CommonUtil.showTip(LanguageManager.getlocal("accountmoveViewFollowSuccessdes"));
			
		}else{
			window["wx"].setClipboardData({
			data:this._ranksData.pidencrypturl,
			success(res) {
				window["wx"].getClipboardData({
				success(res) {
					// App.CommonUtil.showTip(LanguageManager.getlocal("accountmoveViewFollowSuccessdes"));
				}
				})
			}
			})
		}

		
       
	}

    /**
	 * 获取活动配置
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
         return {requestType:NetRequestConst.REQUEST_OTHERINFO_GETPIDENCRYPT,requestData:{} };
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        this._ranksData = data.data.data;
	}
	// protected getShowHeight():number
	// {
	// 	return 680;
	// }
 
    public dispose()
    {
        this._ranksData=null
        super.dispose()
    }
}