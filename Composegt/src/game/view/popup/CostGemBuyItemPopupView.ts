// TypeScript file
/**
 * 确认是否消耗元宝购买物品提示弹出框
 * author jiang
 * date 2018/4/10
 * 
 * this.param.data 参数如下
 * data.useNum ->物品价格
 * data.confirmCallback ->确认按钮回调函数
 * data.cancelCallback  ->取消按钮回调函数
 * data.handler ->target
 * data.num ->玩家的元宝数量
 * data.msg ->显示消息
 * data.1   ->消耗物品id  1为元宝
 * 
 * @class CostGemBuyItemPopupView
 */
class CostGemBuyItemPopupView extends PopupView
{


    private _cancelCallback: Function;
	//确认按钮回调
    private _confirmCallback: Function;
	//target
    private _handler: any;
	//取消按钮
    private _cancelBtn: BaseButton;
    public constructor()
    {
        super();
    }
    //初始化view
    protected initView(): void
    {
        let data = this.param.data;
        
		//消耗的物品id  传入1 元宝
		let itemid = data.id;
		
		if(data.cancelCallback)
		{
			this._cancelCallback = data.cancelCallback;
		}

        this._confirmCallback = data.confirmCallback;
		this._handler = data.handler;

        //弹出窗显示的字符串
        let msg: string = data.msg;
        //弹出窗口显示的玩家元宝数量
        let num = data.num;
        let useNum = data.useNum || 0;
        //背景
        let bg: BaseBitmap = BaseBitmap.create("public_tc_bg01");  //public_tc_bg03
        bg.width = 520;
        bg.height = 224;
        bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
        bg.y = 9;
        this.addChildToContainer(bg);

		let innerBg = BaseBitmap.create("public_tc_bg03");
		innerBg.width = 500;
		innerBg.height = 204;
		innerBg.x = this.viewBg.width / 2 - innerBg.width /2;
		innerBg.y = bg.y + bg.height / 2 - innerBg.height/2;
		this.addChildToContainer(innerBg);

        let temX = this.viewBg.x + this.viewBg.width/2 - 50;
		let temY = 29;
		let temW = 100;
		let temH = 100;


		//点击物品增加文字说明 添加物品iconitem
		let itemCfg : any  = Config.ItemCfg.getItemCfgById(Number(itemid));
		if(!itemCfg){
			itemCfg = GameData.getRewardItemVoByIdAndType(itemid);
		}

		//信息显示
        let cur_have = LanguageManager.getlocal("itemUseNewTip",[itemCfg.name,App.StringUtil.toString(num)]);
		//添加空行
		msg += `\n\n${cur_have}`;
		let msgTF:BaseTextField = ComponentManager.getTextField(msg,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		msgTF.width = 480;
		msgTF.setColor(TextFieldConst.COLOR_BROWN);
		msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
		msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		msgTF.y = temY + temH - 45;
		msgTF.lineSpacing = 20;
		this.addChildToContainer(msgTF);
		//取消按钮

		this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"cancelBtn",this.clickCancelHandler,this);
		this._cancelBtn.x = this.viewBg.x + this.viewBg.width/4 - this._cancelBtn.width/2;
		this._cancelBtn.y = bg.y + bg.height + 15;
		// this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._cancelBtn);


    }
    protected resetBgSize():void
	{
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
	}
    protected clickConfirmHandler(data:any):void
	{
		//判断元宝数是否足够
		if(this.param.data.useNum && this.param.data.useNum > this.param.data.num)
		{
			
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"))
			

			
			this.hide();
			return;
		}
		App.LogUtil.log("clickConfirmHandler");
		if(this._confirmCallback)
		{
			this._confirmCallback.apply(this._handler,[]);
		}
		
		this.hide();
	}

	protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}

	// protected getContainerY():number
	// {
	// 	return 0;
	// }

	private clickCancelHandler(param:any):void
	{
		if(this._cancelCallback)
		{
			this._cancelCallback.apply(this._handler,[]);
		}
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}
	//显示的title
    protected getTitleStr(){
        
        return "itemUseConstPopupViewTitle";
    }
	protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}

	public dispose():void
	{
		this._cancelCallback = null;
		this._confirmCallback = null;
		this._handler = null;
		this._cancelBtn = null;
		super.dispose();
	}

}