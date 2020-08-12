/*
 *@description: 重置胜率的弹窗
 *@author: hwc 
 *@date: 2020-04-15 11:04:28
 *@version 0.0.1
 */
class RetWinPopupView extends PopupView 
{

    private confirmBtn:BaseButton;
    private needGem = 50;

    public initView(){
        let info = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, 0xCFDEFF);
        this.addChildToContainer(info);
        info.width = 534;
        info.height = 160;
        info.lineSpacing = 10;
        info.textAlign = egret.HorizontalAlign.CENTER;
        info.verticalAlign = egret.VerticalAlign.MIDDLE;
        info.stroke = 1.5;
        info.strokeColor = 0x0C2C77;
        info.text = LangMger.getlocal("user_refresh_win_info");
        info.x = (this.viewBg.width - info.width) / 2;
        info.y = 0;

    }

    private confirmBtnOnClick(){
        let gem = Api.UserinfoVoApi.getGem();
        let needGem = this.needGem;
        if(gem >= needGem){
            this.request(NetConst.USER_RESETWIN, {});
        } else {
            App.CommonUtil.gemNotEnough(1);
            // ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
            //     title : LangMger.getlocal("sysTip"),
            //     msg : LangMger.getlocal(`sysgemNotEnough`),
            //     needCancel : false,
            // });
        }
    }

    protected netEventCallBack(evt:egret.Event){
        let data = evt.data;
        if(data && data.ret){
			switch (data.data.cmd) {
				case NetConst.USER_RESETWIN:
                    this.closeHandler();
					break;
				default:
					break;
			}
		}
    }

    protected closeHandler(){
        super.closeHandler();
        ViewController.getInstance().openView(ViewConst.USERINFO_POPUPVIEW);
    }
    
    protected resetBgSize(){
        super.resetBgSize();
        let btn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, "", this.confirmBtnOnClick, this);
        this.addChild(btn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, this.viewBg, [0,15]);

        this.confirmBtn = btn;

        let icon = BaseBitmap.create("ab_mainui_gem");
        btn.addChild(icon);
        icon.x = btn.width / 2 - icon.width;
        icon.y = (btn.height - icon.height) / 2;

        let txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_28, ColorEnums.white);
        btn.addChild(txt);
        txt.width = btn.width / 2;
        // txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.text = String(this.needGem);
        txt.x = icon.x + icon.width;
        txt.y = icon.y + (icon.height - txt.height) / 2 + 5;
    }

    protected isTouchMaskClose(){
        return false;
    }

    public show(data?:any):void
    {
        super.show(data);
    }

    // 需要加载的资源
    protected getResourceList():string[]
    {
        return super.getResourceList();
    }

    protected initBg():void
    {
        super.initBg();
    }

    protected showLineFrame():boolean
    {
        return false;
    }

    protected checkShowContentBg():boolean
    {
        return false;
    }

    // 弹框面板宽度，高度动态计算
    // protected getShowWidth():number
    // {
    //     return 554;
    // }

    // 弹框面板高度，重新该方法后，不会动态计算高度
    protected getShowHeight():number
    {
        return 350;
    }

    // 计算背景高度时使用，在container高度的基础上添加该高度
    protected getBgExtraHeight():number
    {
        return super.getBgExtraHeight();
    }

    protected getTitleStr():string {
        return LangMger.getlocal("user_refresh_win_rate_title");
    }

    // 确认按钮名称
    protected getConfirmBtnName():string
    {
        return super.getConfirmBtnName();
    }

    protected getConfirmBtnStr():string
    {
        return super.getConfirmBtnStr();
    }

    public dispose():void
    {   
        this.confirmBtn = null;
        super.dispose();
    }
}